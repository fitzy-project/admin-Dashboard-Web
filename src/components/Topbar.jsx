import React, { useState, useEffect } from 'react'
import { Search, Bell, ChevronDown, LogOut, Sun, Moon } from 'lucide-react'

export default function Topbar({ currentUser, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const user = currentUser || {
    name: 'Quản trị viên',
    initials: 'AD',
    role: 'Admin',
  }

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-line dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-300">
      {/* Search Bar */}
      <div className="relative w-80 max-w-full group">
        <Search className="w-4 h-4 text-mute dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500 transition-colors" />
        <input
          type="text"
          placeholder="Tìm kiếm tác vụ, quy tắc, mẫu..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-line dark:border-slate-800 bg-canvas/50 dark:bg-slate-800/30 text-ink dark:text-slate-100
                     focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                     placeholder:text-mute dark:placeholder:text-slate-500 transition-all duration-300 focus:bg-white dark:focus:bg-slate-900 focus:shadow-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Dark/Light Mode Switcher */}
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-9 h-9 grid place-items-center rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 text-mute dark:text-slate-400 hover:text-ink dark:hover:text-white"
          title={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
        >
          {isDarkMode ? (
            <Sun className="w-4.5 h-4.5 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
          ) : (
            <Moon className="w-4.5 h-4.5" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 grid place-items-center rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group">
          <Bell className="w-4.5 h-4.5 text-mute dark:text-slate-400 group-hover:text-ink dark:group-hover:text-white transition-colors group-hover:animate-[ring-wiggle_0.6s_ease-in-out_infinite]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900 shadow-[0_0_8px_#F59E0B]" />
        </button>

        {/* User Info & Profile */}
        <div className="relative ml-2">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 pl-3 border-l border-line dark:border-slate-800 cursor-pointer group py-1 outline-none text-left"
          >
            <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white grid place-items-center text-xs font-bold shadow-sm border border-slate-700/10 dark:border-slate-600/30 group-hover:border-slate-800/25 transition-all">
              {user.initials}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink dark:text-slate-200 group-hover:text-amber-500 transition-colors">{user.name}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-mute dark:text-slate-400 mt-0.5">{user.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-mute dark:text-slate-400 group-hover:text-ink dark:group-hover:text-white transition-colors" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-line dark:border-slate-800 rounded-2xl p-1.5 shadow-xl z-20">
              <button
                type="button"
                onClick={() => {
                  setShowDropdown(false)
                  onLogout()
                }}
                className="w-full inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
