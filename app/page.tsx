'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CheckSquare, Trash2, Plus, ListTodo, User } from 'lucide-react'
import { Task, FilterType } from '@/types/task'
import DemoControls from '@/components/DemoControls'

const STORAGE_KEY = 'taskflow-tasks'
const FILTER_KEY = 'taskflow-filter'

// Default tasks for first-time users
const defaultTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: 'Review pull requests',
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: crypto.randomUUID(),
    title: 'Update documentation',
    completed: true,
    createdAt: Date.now() - 7200000,
  },
  {
    id: crypto.randomUUID(),
    title: 'Fix bug in authentication',
    completed: false,
    createdAt: Date.now() - 1800000,
  },
]

export default function TaskFlow() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load tasks and filter from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    const storedFilter = localStorage.getItem(FILTER_KEY) as FilterType | null

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      // First time user - set default tasks
      setTasks(defaultTasks)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks))
    }

    if (storedFilter && ['all', 'active', 'completed'].includes(storedFilter)) {
      setFilter(storedFilter)
    }

    setIsLoaded(true)
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  // Save filter to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FILTER_KEY, filter)
    }
  }, [filter, isLoaded])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    const title = newTaskTitle.trim()
    if (!title) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    }

    setTasks([newTask, ...tasks])
    setNewTaskTitle('')
    inputRef.current?.focus()
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id === id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const activeCount = tasks.filter(task => !task.completed).length

  // Don't render until loaded to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <ListTodo className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Task<span className="text-indigo-500">Flow</span>
              </span>
            </div>

            {/* User Avatar */}
            <div className="flex items-center">
              <button className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium hover:opacity-90 transition-opacity">
                JD
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-500 mt-1">Stay organized and get things done</p>
        </div>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="mb-6">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="px-5 py-3 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
        </form>

        {/* Filter Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 w-fit">
          {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                filter === f
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'active' && activeCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded-full">
                  {activeCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                {filter === 'all'
                  ? 'No tasks yet. Add one above to get started!'
                  : filter === 'active'
                  ? 'No active tasks. Time to add some!'
                  : 'No completed tasks yet. Keep going!'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`task-enter bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 group hover:border-gray-300 hover:shadow-sm transition-all ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="checkbox-custom"
                  aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-gray-900 ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-0.5 truncate">
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  aria-label={`Delete "${task.title}"`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {activeCount === 0
                ? 'All tasks completed!'
                : `${activeCount} active task${activeCount !== 1 ? 's' : ''}`}
              {tasks.filter(t => t.completed).length > 0 && (
                <span className="ml-2">
                  · {tasks.filter(t => t.completed).length} completed
                </span>
              )}
            </p>
          </div>
        )}
      </main>

      {/* Demo Controls - Hidden admin menu (Cmd+Shift+D to open) */}
      <DemoControls />
    </div>
  )
}
