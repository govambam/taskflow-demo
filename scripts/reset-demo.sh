#!/bin/bash

set -e

echo "🧹 Resetting demo environment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Linear project name to clean up
LINEAR_PROJECT_NAME="Web-Demo"

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Switch to main if we're on demo-bugs
if [ "$CURRENT_BRANCH" = "demo-bugs" ]; then
    echo "Switching from demo-bugs to main..."
    git checkout main
fi

# Close ALL open PRs in the repo using gh CLI
if command -v gh &> /dev/null; then
    echo "Checking for all open PRs..."

    # Get all open PR numbers
    PR_NUMBERS=$(gh pr list --state open --json number --jq '.[].number' 2>/dev/null || true)

    if [ -n "$PR_NUMBERS" ]; then
        PR_COUNT=$(echo "$PR_NUMBERS" | wc -l | tr -d ' ')
        echo "Found $PR_COUNT open PR(s) to close"
        echo "$PR_NUMBERS" | while read -r PR_NUMBER; do
            if [ -n "$PR_NUMBER" ]; then
                echo "  Closing PR #$PR_NUMBER..."
                gh pr close "$PR_NUMBER" --comment "Closing for demo reset" 2>/dev/null || echo -e "${YELLOW}  Note: Could not close PR #$PR_NUMBER${NC}"
                echo -e "  ${GREEN}✓ PR #$PR_NUMBER closed${NC}"
            fi
        done
    else
        echo "No open PRs found"
    fi
else
    echo -e "${YELLOW}Note: GitHub CLI (gh) not installed. Skipping PR cleanup.${NC}"
fi

# Delete local demo-bugs branch if it exists
if git show-ref --verify --quiet refs/heads/demo-bugs; then
    echo "Deleting local demo-bugs branch..."
    git branch -D demo-bugs
    echo -e "${GREEN}✓ Local branch deleted${NC}"
else
    echo "No local demo-bugs branch found"
fi

# Delete remote demo-bugs branch if it exists
echo "Checking for remote demo-bugs branch..."
if git ls-remote --heads origin demo-bugs 2>/dev/null | grep -q demo-bugs; then
    echo "Deleting remote demo-bugs branch..."
    git push origin --delete demo-bugs 2>/dev/null || echo -e "${YELLOW}Note: Could not delete remote branch${NC}"
    echo -e "${GREEN}✓ Remote branch deleted${NC}"
else
    echo "No remote demo-bugs branch found"
fi

# Delete Linear issues in the Web-Demo project
echo ""
echo "Checking for Linear issues..."

if [ -z "$LINEAR_API_KEY" ]; then
    echo -e "${YELLOW}⚠️ LINEAR_API_KEY not set - skipping Linear cleanup${NC}"
else
    # Find the Web-Demo project
    PROJECT_RESPONSE=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -H "Authorization: $LINEAR_API_KEY" \
        -d "{\"query\": \"query { projects(filter: { name: { eq: \\\"$LINEAR_PROJECT_NAME\\\" } }) { nodes { id name } } }\"}" \
        https://api.linear.app/graphql 2>/dev/null || true)

    PROJECT_ID=$(echo "$PROJECT_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4 || true)

    if [ -z "$PROJECT_ID" ]; then
        echo "No \"$LINEAR_PROJECT_NAME\" project found in Linear"
    else
        echo "Found project \"$LINEAR_PROJECT_NAME\" ($PROJECT_ID)"

        # Get all issues in the project
        ISSUES_RESPONSE=$(curl -s -X POST \
            -H "Content-Type: application/json" \
            -H "Authorization: $LINEAR_API_KEY" \
            -d "{\"query\": \"query { issues(filter: { project: { id: { eq: \\\"$PROJECT_ID\\\" } } }) { nodes { id identifier title } } }\"}" \
            https://api.linear.app/graphql 2>/dev/null || true)

        # Extract issue IDs and identifiers
        ISSUE_DATA=$(echo "$ISSUES_RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    issues = data.get('data', {}).get('issues', {}).get('nodes', [])
    for issue in issues:
        print(f\"{issue['id']}|{issue['identifier']}|{issue['title']}\")
except:
    pass
" 2>/dev/null || true)

        if [ -z "$ISSUE_DATA" ]; then
            echo "No issues found in project"
        else
            ISSUE_COUNT=$(echo "$ISSUE_DATA" | wc -l | tr -d ' ')
            echo "Found $ISSUE_COUNT issue(s) to delete"

            echo "$ISSUE_DATA" | while IFS='|' read -r ISSUE_ID ISSUE_IDENTIFIER ISSUE_TITLE; do
                if [ -n "$ISSUE_ID" ]; then
                    echo "  Deleting issue $ISSUE_IDENTIFIER: $ISSUE_TITLE"
                    DELETE_RESPONSE=$(curl -s -X POST \
                        -H "Content-Type: application/json" \
                        -H "Authorization: $LINEAR_API_KEY" \
                        -d "{\"query\": \"mutation { issueDelete(id: \\\"$ISSUE_ID\\\") { success } }\"}" \
                        https://api.linear.app/graphql 2>/dev/null || true)

                    if echo "$DELETE_RESPONSE" | grep -q '"success":true'; then
                        echo -e "  ${GREEN}✓ Issue $ISSUE_IDENTIFIER deleted${NC}"
                    else
                        echo -e "  ${YELLOW}⚠️ Could not delete issue $ISSUE_IDENTIFIER${NC}"
                    fi
                fi
            done
        fi
    fi
fi

# Print success message
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Demo reset complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo ""
echo "The demo environment has been cleaned up:"
echo "  • All open PRs closed"
echo "  • Local demo-bugs branch deleted"
echo "  • Remote demo-bugs branch deleted"
echo "  • Linear issues in Web-Demo project deleted"
echo ""
echo "To start a fresh demo:"
echo -e "  ${YELLOW}npm run create-demo${NC}"
echo ""
