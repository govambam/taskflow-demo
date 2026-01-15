#!/bin/bash

set -e

echo "🚀 Creating demo branch with intentional bugs..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Check if gh CLI is available (required for PR creation)
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is required but not installed.${NC}"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${RED}Error: You have uncommitted changes. Please commit or stash them first.${NC}"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Ensure we're on main
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "Switching to main branch..."
    git checkout main
fi

# Pull latest changes
echo "Pulling latest changes from main..."
git pull origin main 2>/dev/null || echo -e "${YELLOW}Note: Could not pull from origin (may not exist yet)${NC}"

# Delete local demo-bugs branch if it exists
if git show-ref --verify --quiet refs/heads/demo-bugs; then
    echo "Deleting existing local demo-bugs branch..."
    git branch -D demo-bugs
fi

# Create and checkout demo-bugs branch
echo "Creating demo-bugs branch..."
git checkout -b demo-bugs

# Introduce Bug 1: Inverted comparison in deleteTask filter
# Change: task.id !== id  →  task.id === id (deletes everything EXCEPT clicked task)
echo "Introducing Bug 1: Inverted comparison in deleteTask..."
sed -i '' 's/task\.id !== id/task.id === id/' app/page.tsx

# Introduce Bug 2: State mutation in toggleTask
# Replace the correct immutable update with direct state mutation
# This causes React to not re-render because it sees the same reference
echo "Introducing Bug 2: State mutation in toggleTask..."
perl -i -0pe 's/const toggleTask = \(id: string\) => \{\n    setTasks\(tasks\.map\(task =>\n      task\.id === id \? \{ \.\.\.task, completed: !task\.completed \} : task\n    \)\)\n  \}/const toggleTask = (id: string) => {\n    const task = tasks.find(t => t.id === id)\n    if (task) {\n      task.completed = !task.completed\n      setTasks(tasks)\n    }\n  }/s' app/page.tsx

# Verify bugs were introduced
echo ""
echo "Verifying bugs were introduced..."

BUG1=$(grep -c "task.id === id" app/page.tsx || true)
BUG2=$(grep -c "task.completed = !task.completed" app/page.tsx || true)

if [ "$BUG1" -eq 0 ] || [ "$BUG2" -eq 0 ]; then
    echo -e "${RED}Error: Failed to introduce all bugs. Rolling back...${NC}"
    git checkout -- app/page.tsx
    git checkout main
    git branch -D demo-bugs
    exit 1
fi

echo -e "${GREEN}✓ All 2 bugs successfully introduced${NC}"

# Change tab title to demo mode
echo ""
echo "Changing tab title to demo mode..."
sed -i '' "s/title: 'TaskFlow - Simple Task Management'/title: 'DEMO - TASKFLOW'/" app/layout.tsx

if grep -q "DEMO - TASKFLOW" app/layout.tsx; then
    echo -e "${GREEN}✓ Tab title changed to 'DEMO - TASKFLOW'${NC}"
else
    echo -e "${YELLOW}⚠️ Warning: Tab title may not have been changed${NC}"
fi

# Stage and commit changes
echo ""
echo "Committing changes..."
git add app/page.tsx app/layout.tsx
git commit -m "feat: Optimize task operations for better performance

- Optimized delete task function
- Refactored toggle task for efficiency
- Updated page title for demo"

# Push to origin
echo ""
echo "Pushing demo-bugs branch to origin..."
if git push -u origin demo-bugs 2>/dev/null; then
    echo -e "${GREEN}✓ Branch pushed successfully${NC}"
else
    echo -e "${RED}Error: Could not push to origin. Please set up the remote first.${NC}"
    exit 1
fi

# Create Pull Request
echo ""
echo "Creating Pull Request..."
gh pr create --base main --head demo-bugs \
  --title "feat: Optimize task operations for better performance" \
  --body "This PR optimizes task management with improved delete and toggle logic." \
  --web

# Print success message
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Demo setup complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo ""
echo "What was created:"
echo "  • Branch 'demo-bugs' pushed to GitHub"
echo "  • Pull Request created and opened in browser"
echo "  • Tab title changed to 'DEMO - TASKFLOW'"
echo ""
echo "Bugs introduced:"
echo "  1. Inverted comparison in deleteTask (line ~97)"
echo "     task.id === id  (should be !==)"
echo ""
echo "  2. State mutation in toggleTask (line ~91)"
echo "     Mutates task directly instead of creating new array"
echo "     Causes checkbox to not visually update"
echo ""
echo -e "To reset the demo later: ${YELLOW}npm run reset-demo${NC}"
echo ""
