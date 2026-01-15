import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'
import { LinearClient } from '@linear/sdk'

const OWNER = 'govambam'
const REPO = 'flowmetrics-demo'
const DEMO_BRANCH = 'demo-bugs'
const LINEAR_PROJECT_NAME = 'Web-Demo'

export async function POST() {
  const logs: string[] = []
  const log = (message: string) => {
    console.log(message)
    logs.push(message)
  }

  try {
    // Check for GitHub token
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({
        success: false,
        output: 'Error: GITHUB_TOKEN environment variable is not set',
        error: 'Missing GitHub token',
      })
    }

    log('🧹 Resetting demo environment...')
    log('')

    const octokit = new Octokit({ auth: token })

    // Step 1: Find and close ALL open PRs in the repo
    log('Looking for all open PRs...')
    const { data: openPRs } = await octokit.pulls.list({
      owner: OWNER,
      repo: REPO,
      state: 'open',
    })

    if (openPRs.length > 0) {
      log(`Found ${openPRs.length} open PR(s) to close`)
      for (const pr of openPRs) {
        log(`  Closing PR #${pr.number}: ${pr.title}`)
        await octokit.pulls.update({
          owner: OWNER,
          repo: REPO,
          pull_number: pr.number,
          state: 'closed',
        })
        log(`  ✓ PR #${pr.number} closed`)
      }
    } else {
      log('No open PRs found')
    }

    // Step 2: Delete the demo-bugs branch if it exists
    log('')
    log('Checking for demo-bugs branch...')
    try {
      await octokit.git.getRef({
        owner: OWNER,
        repo: REPO,
        ref: `heads/${DEMO_BRANCH}`,
      })
      // Branch exists, delete it
      log('Deleting demo-bugs branch...')
      await octokit.git.deleteRef({
        owner: OWNER,
        repo: REPO,
        ref: `heads/${DEMO_BRANCH}`,
      })
      log('✓ Branch deleted')
    } catch (error: any) {
      if (error.status === 404) {
        log('No demo-bugs branch found (already deleted or never created)')
      } else {
        throw error
      }
    }

    // Step 3: Delete Linear issues in the Web-Demo project
    log('')
    log('Checking for Linear issues...')
    const linearApiKey = process.env.LINEAR_API_KEY

    if (!linearApiKey) {
      log('⚠️ LINEAR_API_KEY not set - skipping Linear cleanup')
    } else {
      try {
        const linearClient = new LinearClient({ apiKey: linearApiKey })

        // Find the Web-Demo project
        const projects = await linearClient.projects({
          filter: { name: { eq: LINEAR_PROJECT_NAME } }
        })

        const project = projects.nodes[0]

        if (!project) {
          log(`No "${LINEAR_PROJECT_NAME}" project found in Linear`)
        } else {
          log(`Found project "${LINEAR_PROJECT_NAME}" (${project.id})`)

          // Get all issues in the project
          const issues = await linearClient.issues({
            filter: { project: { id: { eq: project.id } } }
          })

          if (issues.nodes.length === 0) {
            log('No issues found in project')
          } else {
            log(`Found ${issues.nodes.length} issue(s) to delete`)

            for (const issue of issues.nodes) {
              log(`  Deleting issue ${issue.identifier}: ${issue.title}`)
              await issue.delete()
              log(`  ✓ Issue ${issue.identifier} deleted`)
            }
          }
        }
      } catch (linearError: any) {
        log(`⚠️ Linear cleanup failed: ${linearError.message}`)
        log('Continuing with reset...')
      }
    }

    log('')
    log('════════════════════════════════════════════════════════════════')
    log('✓ Demo reset complete!')
    log('════════════════════════════════════════════════════════════════')
    log('')
    log('Ready to create a fresh demo PR.')

    return NextResponse.json({
      success: true,
      output: logs.join('\n'),
    })
  } catch (error: any) {
    log('')
    log(`❌ Error: ${error.message}`)

    // Add more detailed error info for debugging
    if (error.response) {
      log(`Status: ${error.response.status}`)
      log(`Details: ${JSON.stringify(error.response.data, null, 2)}`)
    }

    return NextResponse.json({
      success: false,
      output: logs.join('\n'),
      error: error.message,
    })
  }
}
