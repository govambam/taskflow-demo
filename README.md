# TaskFlow

A clean, modern task management app for teams to track their work.

## Features

- **Add tasks** - Create new tasks with a simple form
- **Mark complete** - Toggle task completion with a checkbox
- **Delete tasks** - Remove tasks you no longer need
- **Filter tasks** - View All, Active, or Completed tasks
- **Persistent storage** - Tasks saved to localStorage
- **Task count** - See how many active tasks remain

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **localStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd taskflow

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Project Structure

```
taskflow/
├── app/
│   ├── api/demo/       # API routes for demo controls
│   │   ├── create/route.ts
│   │   └── reset/route.ts
│   ├── globals.css     # Global styles and Tailwind
│   ├── layout.tsx      # Root layout + GrowthBook provider
│   └── page.tsx        # Main TaskFlow component
├── components/
│   ├── DemoControls.tsx      # Hidden admin menu (Cmd+Shift+D)
│   └── GrowthBookProvider.tsx # Feature flag provider
├── hooks/
│   └── useFeatureFlag.ts     # Feature flag hooks
├── lib/
│   └── growthbook.ts         # GrowthBook initialization
├── types/
│   └── task.ts         # TypeScript interfaces
├── scripts/
│   ├── create-demo.sh  # Creates demo branch with bugs
│   └── reset-demo.sh   # Resets demo environment
├── .env.example        # Environment variables template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Usage

1. **Add a task** - Type in the input field and press Enter or click "Add Task"
2. **Complete a task** - Click the checkbox to mark as done
3. **Delete a task** - Hover over a task and click the trash icon
4. **Filter tasks** - Use the All/Active/Completed tabs

## Data Persistence

Tasks are stored in your browser's localStorage. They persist across page refreshes and browser sessions. To clear all data, open browser DevTools and clear localStorage.

## Demo Workflow (Macroscope)

This repository includes automated scripts for demonstrating Macroscope's AI code review capabilities.

### Quick Start

**Option 1: From the UI (recommended for live demos)**

Press `Cmd+Shift+D` (Mac) or `Ctrl+Shift+D` (Windows/Linux) to open the Demo Controls panel. Click the buttons to create or reset the demo.

**Option 2: From the terminal**

```bash
# 1. Create demo branch with bugs + PR (opens in browser)
npm run create-demo

# 2. When done, reset for the next demo
npm run reset-demo
```

### What the Demo Does

**`npm run create-demo`** creates a `demo-bugs` branch with 2 intentional bugs, pushes to GitHub, and opens a PR in your browser:

| Bug | Location | Issue | Should Be |
|-----|----------|-------|-----------|
| 1 | `deleteTask()` | `task.id === id` (inverted) | `task.id !== id` |
| 2 | `toggleTask()` | Direct state mutation | Immutable update with spread |

These are realistic bugs that Macroscope's code review should catch:
- **Bug 1:** Inverted filter logic (deletes everything EXCEPT the clicked task)
- **Bug 2:** React state mutation anti-pattern (checkbox won't visually update)

**`npm run reset-demo`** cleans up everything:
- Deletes local `demo-bugs` branch
- Deletes remote `demo-bugs` branch
- Closes any open PRs on that branch

### Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- Git repository with remote `origin` configured
- Must be on `main` branch with no uncommitted changes
- GrowthBook feature flag `demo-controls-enabled` set to `true`

### Feature Flag Setup (GrowthBook)

Demo controls are gated behind a GrowthBook feature flag. This allows instant enable/disable without redeploying.

**Environment Variable:**
```bash
NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY=sdk-P4DMEHEVFh7tZAUk
```

**Setting up in Vercel:**
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add `NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY` with the value above
4. Redeploy

**Toggling the Feature Flag:**
1. Log into [GrowthBook Dashboard](https://app.growthbook.io)
2. Find the `demo-controls-enabled` feature flag
3. Toggle it on/off as needed
4. Changes take effect immediately (no redeploy required)

### Demo Flow

1. **Setup:** Run `npm run create-demo` (creates branch, pushes, opens PR in browser)
2. **Demo:** Show Macroscope reviewing the PR
3. **Discuss:** Walk through the bugs it found
4. **Reset:** Run `npm run reset-demo`
5. **Repeat:** Ready for next demo

## License

MIT
