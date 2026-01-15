import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const OWNER = 'govambam'
const REPO = 'flowmetrics-demo'
const BASE_BRANCH = 'main'
const DEMO_BRANCH = 'demo-bugs'
const FILE_PATH = 'app/page.tsx'

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

    log('🚀 Creating demo branch with intentional bugs...')
    log('')

    const octokit = new Octokit({ auth: token })

    // Step 1: Get the SHA of the main branch
    log('Getting reference to main branch...')
    const { data: mainRef } = await octokit.git.getRef({
      owner: OWNER,
      repo: REPO,
      ref: `heads/${BASE_BRANCH}`,
    })
    const mainSha = mainRef.object.sha
    log(`✓ Main branch SHA: ${mainSha.substring(0, 7)}`)

    // Step 2: Check if demo-bugs branch exists and delete it
    log('')
    log('Checking for existing demo-bugs branch...')
    try {
      await octokit.git.getRef({
        owner: OWNER,
        repo: REPO,
        ref: `heads/${DEMO_BRANCH}`,
      })
      // Branch exists, delete it
      log('Deleting existing demo-bugs branch...')
      await octokit.git.deleteRef({
        owner: OWNER,
        repo: REPO,
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
      owner: OWNER,
      repo: REPO,
      ref: `refs/heads/${DEMO_BRANCH}`,
      sha: mainSha,
    })
    log('✓ Branch created')

    // Step 4: Get the current file content
    log('')
    log('Reading app/page.tsx from main...')
    const { data: fileData } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      ref: BASE_BRANCH,
    })

    if (Array.isArray(fileData) || fileData.type !== 'file') {
      throw new Error('Expected a file but got a directory')
    }

    const originalContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
    const fileSha = fileData.sha
    log(`✓ File retrieved (${originalContent.length} bytes)`)

    // Step 5: Apply bug modifications
    log('')
    log('Introducing bugs...')
    log('  Bug 1: Inverted comparison in deleteTask (!== to ===)')
    log('  Bug 2: State mutation in toggleTask (direct mutation)')
    const modifiedContent = applyBugModifications(originalContent)

    // Verify bugs were applied
    const bug1Applied = modifiedContent.includes('task.id === id)')
    const bug2Applied = modifiedContent.includes('task.completed = !task.completed')

    if (!bug1Applied || !bug2Applied) {
      log('')
      log('⚠️ Warning: Some bugs may not have been applied')
      log(`  Bug 1 applied: ${bug1Applied}`)
      log(`  Bug 2 applied: ${bug2Applied}`)
    } else {
      log('✓ All 2 bugs successfully introduced')
    }

    // Step 6: Commit the modified file to demo-bugs branch
    log('')
    log('Committing changes...')
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: `feat: Optimize task operations for better performance

- Optimized delete task function
- Refactored toggle task for efficiency`,
      content: Buffer.from(modifiedContent).toString('base64'),
      sha: fileSha,
      branch: DEMO_BRANCH,
    })
    log('✓ Changes committed')

    // Step 7: Create pull request
    log('')
    log('Creating Pull Request...')
    const { data: pr } = await octokit.pulls.create({
      owner: OWNER,
      repo: REPO,
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
