import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlowMetrics - Project Management & Resource Allocation',
  description: 'Project management and resource optimization platform for creative agencies and professional services firms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50">{children}</body>
    </html>
  )
}
