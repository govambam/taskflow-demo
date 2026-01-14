# FlowMetrics Dashboard Demo

A high-fidelity static demo of FlowMetrics - a project management and resource allocation platform for creative agencies and professional services firms.

## Overview

This is a **static demo/mockup** showcasing the FlowMetrics dashboard UI. It's designed to look like a real, polished B2B SaaS product suitable for sales demos or investor pitches.

**Note:** This is purely a visual mockup. No functionality is implemented - navigation, buttons, and interactions are visual only.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualizations

## Features Displayed

- Top navigation bar with branding and navigation items
- Sidebar with quick actions and favorite projects
- 6 key metric cards with hover effects
- Interactive-looking project timeline/Gantt chart
- Team capacity bar chart visualization
- Recent activity feed
- Upcoming deadlines section
- Active projects data table with pagination UI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd flowmetrics

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Deploy to Vercel

The easiest way to deploy this app is using [Vercel](https://vercel.com):

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via GitHub

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

The app will be automatically built and deployed. Any subsequent pushes to the main branch will trigger automatic redeployments.

## Project Structure

```
flowmetrics/
├── app/
│   ├── globals.css      # Global styles and Tailwind utilities
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main dashboard page
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind configuration with custom colors
├── tsconfig.json        # TypeScript configuration
├── next.config.js       # Next.js configuration
└── postcss.config.js    # PostCSS configuration
```

## Design System

### Colors

- **Primary (Teal/Cyan):** `#06B6D4` - Used for primary actions and highlights
- **Secondary (Indigo):** `#6366F1` - Used for secondary elements and accents
- **Status Colors:**
  - Success: Emerald (`#10B981`)
  - Warning: Amber (`#F59E0B`)
  - Danger: Red (`#EF4444`)
  - Info: Blue (`#3B82F6`)

### Typography

Uses system fonts for optimal performance:
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

### Components

- **Cards:** Rounded corners (12px), subtle shadows, hover lift effect
- **Buttons:** Consistent padding, smooth color transitions
- **Badges:** Color-coded status indicators
- **Progress bars:** Animated fill with color coding based on percentage

## Customization

To customize the demo with your own branding:

1. Update colors in `tailwind.config.ts`
2. Replace the logo in `app/page.tsx` (search for "FlowMetrics")
3. Modify sample data arrays at the top of `app/page.tsx`

## License

This is a demo project. Feel free to use it as a starting point for your own projects.
