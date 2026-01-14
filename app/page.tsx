'use client'

import React from 'react'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  BarChart3,
  Puzzle,
  Settings,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  DollarSign,
  Star,
  Activity,
  Calendar,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  Filter,
  Home,
  FileText,
  PieChart,
  Briefcase,
  Target,
  Zap,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

// Team capacity data for bar chart
const teamCapacityData = [
  { name: 'Sarah M.', allocation: 95, available: 5, color: '#ef4444' },
  { name: 'James L.', allocation: 82, available: 18, color: '#06b6d4' },
  { name: 'Emma W.', allocation: 78, available: 22, color: '#06b6d4' },
  { name: 'Michael R.', allocation: 100, available: 0, color: '#ef4444' },
  { name: 'Sophie T.', allocation: 65, available: 35, color: '#22c55e' },
  { name: 'David K.', allocation: 88, available: 12, color: '#f59e0b' },
  { name: 'Lisa P.', allocation: 72, available: 28, color: '#06b6d4' },
  { name: 'Alex C.', allocation: 45, available: 55, color: '#22c55e' },
]

// Project timeline data
const projectsTimeline = [
  {
    id: 1,
    name: 'Acme Corp Rebrand',
    client: 'Acme Corp',
    progress: 75,
    startWeek: 0,
    duration: 8,
    status: 'on-track',
    team: ['SM', 'EW'],
  },
  {
    id: 2,
    name: 'TechStart Website',
    client: 'TechStart Inc',
    progress: 45,
    startWeek: 2,
    duration: 6,
    status: 'on-track',
    team: ['JL', 'MR'],
  },
  {
    id: 3,
    name: 'GlobalBank App UI',
    client: 'GlobalBank',
    progress: 90,
    startWeek: 0,
    duration: 4,
    status: 'completed',
    team: ['ST', 'DK'],
  },
  {
    id: 4,
    name: 'Velocity Campaign',
    client: 'Velocity Motors',
    progress: 30,
    startWeek: 3,
    duration: 5,
    status: 'at-risk',
    team: ['LP', 'AC'],
  },
  {
    id: 5,
    name: 'HealthPlus Portal',
    client: 'HealthPlus',
    progress: 60,
    startWeek: 1,
    duration: 7,
    status: 'on-track',
    team: ['SM', 'JL', 'EW'],
  },
  {
    id: 6,
    name: 'EcoStore Packaging',
    client: 'EcoStore',
    progress: 15,
    startWeek: 4,
    duration: 4,
    status: 'on-track',
    team: ['MR', 'ST'],
  },
]

// Activity feed data
const recentActivity = [
  {
    id: 1,
    user: 'Emma Watson',
    initials: 'EW',
    action: 'completed',
    item: 'Brand Guidelines',
    project: 'Acme Corp',
    time: '12 min ago',
    color: 'bg-emerald-500',
  },
  {
    id: 2,
    user: 'James Liu',
    initials: 'JL',
    action: 'added',
    item: 'Website Redesign',
    project: 'TechStart Inc',
    time: '45 min ago',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    user: 'Sarah Mitchell',
    initials: 'SM',
    action: 'commented on',
    item: 'Homepage Mockup',
    project: 'HealthPlus',
    time: '1 hour ago',
    color: 'bg-purple-500',
  },
  {
    id: 4,
    user: 'Michael Reed',
    initials: 'MR',
    action: 'uploaded',
    item: 'Final Deliverables',
    project: 'GlobalBank',
    time: '2 hours ago',
    color: 'bg-cyan-500',
  },
  {
    id: 5,
    user: 'Sophie Turner',
    initials: 'ST',
    action: 'flagged',
    item: 'Timeline Review',
    project: 'Velocity Motors',
    time: '3 hours ago',
    color: 'bg-amber-500',
  },
]

// Upcoming deadlines
const upcomingDeadlines = [
  {
    id: 1,
    task: 'Final presentation',
    project: 'GlobalBank App UI',
    date: 'Today',
    priority: 'high',
  },
  {
    id: 2,
    task: 'Design review meeting',
    project: 'Acme Corp Rebrand',
    date: 'Tomorrow',
    priority: 'medium',
  },
  {
    id: 3,
    task: 'Content delivery',
    project: 'HealthPlus Portal',
    date: 'Wed, Jan 15',
    priority: 'medium',
  },
  {
    id: 4,
    task: 'Sprint retrospective',
    project: 'TechStart Website',
    date: 'Thu, Jan 16',
    priority: 'low',
  },
  {
    id: 5,
    task: 'Client feedback session',
    project: 'Velocity Campaign',
    date: 'Fri, Jan 17',
    priority: 'high',
  },
]

// Active projects table data
const activeProjects = [
  {
    id: 1,
    name: 'Acme Corp Rebrand',
    client: 'Acme Corporation',
    status: 'In Progress',
    progress: 75,
    budget: '$45,000',
    spent: '$33,750',
    team: ['SM', 'EW', 'JL'],
    deadline: 'Feb 28, 2026',
  },
  {
    id: 2,
    name: 'TechStart Website Redesign',
    client: 'TechStart Inc',
    status: 'In Progress',
    progress: 45,
    budget: '$32,000',
    spent: '$14,400',
    team: ['JL', 'MR'],
    deadline: 'Mar 15, 2026',
  },
  {
    id: 3,
    name: 'GlobalBank App UI',
    client: 'GlobalBank Financial',
    status: 'Review',
    progress: 90,
    budget: '$78,000',
    spent: '$70,200',
    team: ['ST', 'DK', 'LP'],
    deadline: 'Jan 20, 2026',
  },
  {
    id: 4,
    name: 'Velocity Campaign',
    client: 'Velocity Motors',
    status: 'At Risk',
    progress: 30,
    budget: '$28,000',
    spent: '$8,400',
    team: ['LP', 'AC'],
    deadline: 'Feb 10, 2026',
  },
  {
    id: 5,
    name: 'HealthPlus Portal',
    client: 'HealthPlus Medical',
    status: 'In Progress',
    progress: 60,
    budget: '$55,000',
    spent: '$33,000',
    team: ['SM', 'JL', 'EW'],
    deadline: 'Mar 1, 2026',
  },
]

// Metric Card Component
function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBg,
  subtitle,
}: {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ElementType
  iconBg: string
  subtitle?: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-card card-hover border border-slate-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          )}
          <div className="flex items-center mt-2">
            {changeType === 'positive' ? (
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            ) : changeType === 'negative' ? (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            ) : null}
            <span
              className={`text-sm font-medium ${
                changeType === 'positive'
                  ? 'text-emerald-600'
                  : changeType === 'negative'
                  ? 'text-red-600'
                  : 'text-slate-500'
              }`}
            >
              {change}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}

// Avatar Component
function Avatar({
  initials,
  size = 'md',
  color = 'bg-primary-500',
}: {
  initials: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  }

  return (
    <div
      className={`${sizeClasses[size]} ${color} rounded-full flex items-center justify-center text-white font-medium`}
    >
      {initials}
    </div>
  )
}

// Avatar Group Component
function AvatarGroup({ members }: { members: string[] }) {
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
  ]

  return (
    <div className="flex -space-x-2">
      {members.slice(0, 3).map((member, index) => (
        <div
          key={index}
          className={`w-7 h-7 ${colors[index % colors.length]} rounded-full flex items-center justify-center text-white text-xs font-medium ring-2 ring-white`}
        >
          {member}
        </div>
      ))}
      {members.length > 3 && (
        <div className="w-7 h-7 bg-slate-300 rounded-full flex items-center justify-center text-slate-600 text-xs font-medium ring-2 ring-white">
          +{members.length - 3}
        </div>
      )}
    </div>
  )
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-700',
    'Review': 'bg-purple-100 text-purple-700',
    'At Risk': 'bg-red-100 text-red-700',
    'Completed': 'bg-emerald-100 text-emerald-700',
    'On Hold': 'bg-amber-100 text-amber-700',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        statusStyles[status] || 'bg-slate-100 text-slate-700'
      }`}
    >
      {status}
    </span>
  )
}

// Progress Bar Component
function ProgressBar({
  progress,
  size = 'md',
  showLabel = false,
}: {
  progress: number
  size?: 'sm' | 'md'
  showLabel?: boolean
}) {
  const getColor = (p: number) => {
    if (p >= 80) return 'bg-emerald-500'
    if (p >= 50) return 'bg-primary-500'
    if (p >= 30) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex-1 bg-slate-100 rounded-full overflow-hidden ${
          size === 'sm' ? 'h-1.5' : 'h-2'
        }`}
      >
        <div
          className={`h-full ${getColor(progress)} rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-slate-600 w-10 text-right">
          {progress}%
        </span>
      )}
    </div>
  )
}

// Custom Tooltip for Bar Chart
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 shadow-lg rounded-lg border border-slate-100">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-sm text-slate-600">
          Allocated: <span className="font-medium">{payload[0].value}%</span>
        </p>
        <p className="text-sm text-slate-600">
          Available:{' '}
          <span className="font-medium">{100 - payload[0].value}%</span>
        </p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // TODO: Verify utilization calculation
  const totalUtilization = teamCapacityData.reduce((sum, member) => sum + member.allocation, 0) // Initialize accumulator
  const avgUtilization = totalUtilization / teamCapacityData.length

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Main Nav */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  Flow<span className="text-primary-500">Metrics</span>
                </span>
              </div>

              {/* Main Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg flex items-center space-x-2 hover:bg-primary-600 transition-colors">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition-colors">
                  <FolderKanban className="w-4 h-4" />
                  <span>Projects</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition-colors">
                  <Users className="w-4 h-4" />
                  <span>Team</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  <span>Capacity</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition-colors">
                  <Puzzle className="w-4 h-4" />
                  <span>Integrations</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search projects, team..."
                    className="w-64 pl-10 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-lg focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
                  />
                  <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-1.5 py-0.5 text-xs text-slate-400 bg-white border border-slate-200 rounded">
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full pulse-dot" />
              </button>

              {/* User Profile */}
              <button className="flex items-center space-x-3 pl-4 border-l border-slate-200 hover:bg-slate-50 rounded-lg pr-2 py-1 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  SM
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-900">
                    Sarah Mitchell
                  </p>
                  <p className="text-xs text-slate-500">Creative Director</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden xl:flex flex-col w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-65px)] sticky top-[65px]">
          <div className="p-4 flex-1">
            {/* Quick Actions */}
            <div className="mb-6">
              <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Quick Actions
              </p>
              <nav className="space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                  <div className="p-1.5 bg-primary-100 rounded-lg">
                    <Zap className="w-4 h-4 text-primary-600" />
                  </div>
                  <span>New Project</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                  <div className="p-1.5 bg-secondary-100 rounded-lg">
                    <Users className="w-4 h-4 text-secondary-600" />
                  </div>
                  <span>Add Team Member</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                  <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span>Generate Report</span>
                </button>
              </nav>
            </div>

            {/* Favorites */}
            <div className="mb-6">
              <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Favorite Projects
              </p>
              <nav className="space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="truncate">Acme Corp Rebrand</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="truncate">TechStart Website</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="truncate">GlobalBank App UI</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="truncate">HealthPlus Portal</span>
                </button>
              </nav>
            </div>

            {/* Views */}
            <div>
              <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Views
              </p>
              <nav className="space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>Overview</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Timeline</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <PieChart className="w-4 h-4 text-slate-400" />
                  <span>Analytics</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>Resources</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Target className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Monthly Goal
                  </p>
                  <p className="text-xs text-slate-500">87% completed</p>
                </div>
              </div>
              <div className="w-full bg-white rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  style={{ width: '87%' }}
                />
              </div>
              <p className="text-xs text-slate-600">
                $123,500 / $142,000 revenue target
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px]">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                  Good morning, Sarah
                </h1>
                <p className="text-slate-500 mt-1">{currentDate}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 shadow-sm">
                  <Zap className="w-4 h-4" />
                  <span>New Project</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="flex flex-col gap-4 lg:gap-6 mb-8">
            <MetricCard
              title="Active Projects"
              value="12"
              change="+2 from last month"
              changeType="positive"
              icon={FolderKanban}
              iconBg="bg-primary-500"
            />
            <MetricCard
              title="Team Utilization"
              value={`${Math.round(avgUtilization)}%`}
              change="+5% vs target"
              changeType="positive"
              icon={Users}
              iconBg="bg-secondary-500"
            />
            <MetricCard
              title="Revenue This Month"
              value="$142,500"
              change="+12% vs last month"
              changeType="positive"
              icon={DollarSign}
              iconBg="bg-emerald-500"
            />
            <MetricCard
              title="Projects At Risk"
              value="2"
              change="-1 from last week"
              changeType="positive"
              icon={AlertTriangle}
              iconBg="bg-amber-500"
            />
            <MetricCard
              title="Billable Hours"
              value="267 hrs"
              change="this week"
              changeType="neutral"
              icon={Clock}
              iconBg="bg-blue-500"
              subtitle="32 hrs avg/person"
            />
            <MetricCard
              title="Client Satisfaction"
              value="4.8/5.0"
              change="+0.2 this quarter"
              changeType="positive"
              icon={Star}
              iconBg="bg-rose-500"
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Project Timeline - Takes 2 columns */}
            <div className="xl:col-span-2 bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Project Timeline
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Active projects overview
                    </p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-x-auto">
                {/* Timeline Header */}
                <div className="flex mb-4 min-w-[700px]">
                  <div className="w-48 flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-8 gap-1">
                    {weeks.map((week, i) => (
                      <div
                        key={i}
                        className="text-xs font-medium text-slate-400 text-center"
                      >
                        {week}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Rows */}
                <div className="space-y-3 min-w-[700px]">
                  {projectsTimeline.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center group hover:bg-slate-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                    >
                      <div className="w-48 flex-shrink-0 pr-4">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-slate-500">{project.client}</p>
                      </div>
                      <div className="flex-1 grid grid-cols-8 gap-1 relative">
                        {/* Background grid */}
                        {weeks.map((_, i) => (
                          <div
                            key={i}
                            className="h-8 border-l border-slate-100 first:border-l-0"
                          />
                        ))}
                        {/* Progress bar */}
                        <div
                          className="absolute top-1 h-6 rounded-full flex items-center px-2 transition-all"
                          style={{
                            left: `${(project.startWeek / 8) * 100}%`,
                            width: `${(project.duration / 8) * 100}%`,
                            backgroundColor:
                              project.status === 'completed'
                                ? '#d1fae5'
                                : project.status === 'at-risk'
                                ? '#fee2e2'
                                : '#e0f2fe',
                          }}
                        >
                          <div
                            className="h-4 rounded-full"
                            style={{
                              width: `${project.progress}%`,
                              backgroundColor:
                                project.status === 'completed'
                                  ? '#10b981'
                                  : project.status === 'at-risk'
                                  ? '#ef4444'
                                  : '#0ea5e9',
                            }}
                          />
                          <span
                            className="absolute right-2 text-xs font-medium"
                            style={{
                              color:
                                project.status === 'completed'
                                  ? '#059669'
                                  : project.status === 'at-risk'
                                  ? '#dc2626'
                                  : '#0284c7',
                            }}
                          >
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="w-20 flex-shrink-0 flex justify-end">
                        <AvatarGroup members={project.team} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Capacity - Takes 1 column */}
            <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Team Capacity
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Current allocation
                    </p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={teamCapacityData}
                      layout="vertical"
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        width={70}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="allocation"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      >
                        {teamCapacityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary-500" />
                    <span className="text-xs text-slate-600">Optimal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-xs text-slate-600">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-slate-600">Overloaded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid - Activity, Deadlines, Projects Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Recent Activity
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Latest updates from your team
                    </p>
                  </div>
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                    View all
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}
                      >
                        {activity.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}{' '}
                          <span className="font-medium">{activity.item}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {activity.project} · {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Upcoming Deadlines
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Tasks due this week
                    </p>
                  </div>
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                    View calendar
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            deadline.priority === 'high'
                              ? 'border-red-400 text-red-400'
                              : deadline.priority === 'medium'
                              ? 'border-amber-400 text-amber-400'
                              : 'border-slate-300 text-slate-300'
                          }`}
                        >
                          {deadline.priority === 'high' && (
                            <Circle className="w-2 h-2 fill-current" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {deadline.task}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {deadline.project}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          deadline.date === 'Today'
                            ? 'bg-red-100 text-red-700'
                            : deadline.date === 'Tomorrow'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {deadline.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Projects Table - Takes remaining space on large screens */}
            <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Project Status
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Quick overview
                    </p>
                  </div>
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center space-x-1">
                    <span>All projects</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {activeProjects.slice(0, 5).map((project) => (
                  <div
                    key={project.id}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-slate-500">{project.client}</p>
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                    <ProgressBar progress={project.progress} showLabel />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Width Projects Table */}
          <div className="mt-8 bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Active Projects
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Detailed project information and progress
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-1">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="table-row-hover transition-colors"
                    >
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-slate-900">
                          {project.name}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-slate-600">{project.client}</p>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-32">
                          <ProgressBar
                            progress={project.progress}
                            size="sm"
                            showLabel
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {project.spent}
                          </p>
                          <p className="text-xs text-slate-500">
                            of {project.budget}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <AvatarGroup members={project.team} />
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-slate-600">
                          {project.deadline}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">12</span> projects
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
