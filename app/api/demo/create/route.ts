import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const BASE_BRANCH = 'main'
const DEMO_BRANCH = 'demo-bugs'
const PAGE_FILE_PATH = 'app/page.tsx'
const LAYOUT_FILE_PATH = 'app/layout.tsx'
const DEMO_TITLE = 'DEMO - TASKFLOW'
const NORMAL_TITLE = 'TaskFlow - Simple Task Management'

// User to repository mapping
const USER_REPOS: Record<string, { owner: string; repo: string }> = {
  'Ryan': { owner: 'rkp2525', repo: 'taskflow-demo' },
  'Ivan': { owner: 'govambam', repo: 'taskflow-demo' },
}

// Get repository config from userName
function getRepoConfig(userName: string): { owner: string; repo: string } | { error: string } {
  const config = USER_REPOS[userName]
  if (!config) {
    const validUsers = Object.keys(USER_REPOS).join(', ')
    return {
      error: `Invalid user "${userName}". Valid users: ${validUsers}`
    }
  }
  return config
}

// Apply bug modifications to the file content
function applyBugModifications(content: string): string {
  let modified = content

  // Bug 1: Inverted comparison in deleteTask filter
  // Change: task.id !== id → task.id === id (deletes everything EXCEPT clicked task)
  modified = modified.replace(
    /setTasks\(tasks\.filter\(task => task\.id !== id\)\)/g,
    'setTasks(tasks.filter(task => task.id === id))'
  )

  // Bug 2: State mutation in toggleTask
  // Replace the correct immutable update with direct state mutation
  // This causes React to not re-render because it sees the same reference
  const correctToggle = `const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }`

  const buggyToggle = `const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      setTasks(tasks)
    }
  }`

  modified = modified.replace(correctToggle, buggyToggle)

  return modified
}

export async function POST(request: Request) {
  const logs: string[] = []
  const log = (message: string) => {
    console.log(message)
    logs.push(message)
  }

  try {
    // Get userName from request body
    const body = await request.json().catch(() => ({}))
    const userName = body.userName

    if (!userName) {
      return NextResponse.json({
        success: false,
        output: '❌ Error: No user selected. Please select your name from the dropdown.',
        error: 'No user selected',
      })
    }

    // Check for GitHub token
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({
        success: false,
        output: `❌ Error: GITHUB_TOKEN environment variable is not set.

To fix this:
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add GITHUB_TOKEN with a GitHub Personal Access Token
3. The token needs 'repo' scope
4. Redeploy your project

Create a token at: https://github.com/settings/tokens`,
        error: 'Missing GitHub token',
      })
    }

    // Get repository configuration from userName
    const repoConfig = getRepoConfig(userName)
    if ('error' in repoConfig) {
      return NextResponse.json({
        success: false,
        output: `❌ Error: ${repoConfig.error}`,
        error: 'Invalid user',
      })
    }

    const { owner, repo } = repoConfig

    log('🚀 Creating demo branch with intentional bugs...')
    log(`User: ${userName}`)
    log(`Repository: ${owner}/${repo}`)
    log('')

    const octokit = new Octokit({ auth: token })

    // Verify we can access the repository
    log('Verifying repository access...')
    try {
      await octokit.repos.get({ owner, repo })
      log('✓ Repository accessible')
    } catch (error: any) {
      if (error.status === 404) {
        return NextResponse.json({
          success: false,
          output: `❌ Error: Cannot access repository "${owner}/${repo}"

Possible causes:
1. The repository doesn't exist
2. Your GITHUB_TOKEN doesn't have access to this repository
3. The repository is private and the token lacks permissions

To fix:
• Make sure the repository exists at https://github.com/${owner}/${repo}
• Ensure your token has 'repo' scope`,
          error: 'Repository not accessible',
        })
      }
      throw error
    }

    // Step 1: Get the SHA of the main branch
    log('')
    log('Getting reference to main branch...')
    const { data: mainRef } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${BASE_BRANCH}`,
    })
    const mainSha = mainRef.object.sha
    log(`✓ Main branch SHA: ${mainSha.substring(0, 7)}`)

    // Step 2: Check if demo-bugs branch exists and delete it
    log('')
    log('Checking for existing demo-bugs branch...')
    try {
      await octokit.git.getRef({
        owner,
        repo,
        ref: `heads/${DEMO_BRANCH}`,
      })
      // Branch exists, delete it
      log('Deleting existing demo-bugs branch...')
      await octokit.git.deleteRef({
        owner,
        repo,
        ref: `heads/${DEMO_BRANCH}`,
      })
      log('✓ Existing branch deleted')
    } catch (error: any) {
      if (error.status === 404) {
        log('No existing demo-bugs branch found')
      } else {
        throw error
      }
    }

    // Step 3: Create the demo-bugs branch from main
    log('')
    log('Creating demo-bugs branch...')
    await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${DEMO_BRANCH}`,
      sha: mainSha,
    })
    log('✓ Branch created')

    // Step 4: Get the current file contents
    log('')
    log('Reading app/page.tsx from main...')
    const { data: pageFileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: PAGE_FILE_PATH,
      ref: BASE_BRANCH,
    })

    if (Array.isArray(pageFileData) || pageFileData.type !== 'file') {
      throw new Error('Expected a file but got a directory')
    }

    const originalPageContent = Buffer.from(pageFileData.content, 'base64').toString('utf-8')
    const pageSha = pageFileData.sha
    log(`✓ File retrieved (${originalPageContent.length} bytes)`)

    log('Reading app/layout.tsx from main...')
    const { data: layoutFileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: LAYOUT_FILE_PATH,
      ref: BASE_BRANCH,
    })

    if (Array.isArray(layoutFileData) || layoutFileData.type !== 'file') {
      throw new Error('Expected a file but got a directory')
    }

    const originalLayoutContent = Buffer.from(layoutFileData.content, 'base64').toString('utf-8')
    const layoutSha = layoutFileData.sha
    log(`✓ File retrieved (${originalLayoutContent.length} bytes)`)

    // Step 5: Apply modifications
    log('')
    log('Introducing bugs...')
    log('  Bug 1: Inverted comparison in deleteTask (!== to ===)')
    log('  Bug 2: State mutation in toggleTask (direct mutation)')
    const modifiedPageContent = applyBugModifications(originalPageContent)

    // Verify bugs were applied
    const bug1Applied = modifiedPageContent.includes('task.id === id)')
    const bug2Applied = modifiedPageContent.includes('task.completed = !task.completed')

    if (!bug1Applied || !bug2Applied) {
      log('')
      log('⚠️ Warning: Some bugs may not have been applied')
      log(`  Bug 1 applied: ${bug1Applied}`)
      log(`  Bug 2 applied: ${bug2Applied}`)
    } else {
      log('✓ All 2 bugs successfully introduced')
    }

    // Modify layout to change tab title
    log('')
    log('Changing tab title to demo mode...')
    const modifiedLayoutContent = originalLayoutContent.replace(
      `title: '${NORMAL_TITLE}'`,
      `title: '${DEMO_TITLE}'`
    )
    const titleChanged = modifiedLayoutContent.includes(DEMO_TITLE)
    if (titleChanged) {
      log(`✓ Tab title changed to "${DEMO_TITLE}"`)
    } else {
      log('⚠️ Warning: Tab title may not have been changed')
    }

    // Step 6: Commit the modified files to demo-bugs branch
    log('')
    log('Committing changes...')

    // Commit page.tsx with bugs
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: PAGE_FILE_PATH,
      message: `feat: Optimize task operations for better performance

- Optimized delete task function
- Refactored toggle task for efficiency`,
      content: Buffer.from(modifiedPageContent).toString('base64'),
      sha: pageSha,
      branch: DEMO_BRANCH,
    })
    log('✓ app/page.tsx committed')

    // Commit layout.tsx with demo title
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: LAYOUT_FILE_PATH,
      message: `chore: Update page title for demo`,
      content: Buffer.from(modifiedLayoutContent).toString('base64'),
      sha: layoutSha,
      branch: DEMO_BRANCH,
    })
    log('✓ app/layout.tsx committed')

    // Step 7: Create pull request
    log('')
    log('Creating Pull Request...')
    const { data: pr } = await octokit.pulls.create({
      owner,
      repo,
      title: 'feat: Optimize task operations for better performance',
      body: 'This PR optimizes task management with improved delete and toggle logic.',
      head: DEMO_BRANCH,
      base: BASE_BRANCH,
    })
    log(`✓ PR #${pr.number} created`)
    log('')
    log('════════════════════════════════════════════════════════════════')
    log('✓ Demo setup complete!')
    log('════════════════════════════════════════════════════════════════')
    log('')
    log(`PR URL: ${pr.html_url}`)
    log('')
    log('Bugs introduced:')
    log('  1. Inverted comparison in deleteTask')
    log('     task.id === id  (should be !==)')
    log('')
    log('  2. State mutation in toggleTask')
    log('     Mutates task directly instead of creating new array')
    log('     Causes checkbox to not visually update')

    return NextResponse.json({
      success: true,
      output: logs.join('\n'),
      prUrl: pr.html_url,
      prNumber: pr.number,
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
