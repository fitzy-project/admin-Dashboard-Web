import React from 'react'
import { Search, Bell, ChevronDown } from 'lucide-react'
import { adminUser } from '../data/mockData.js'

export default function Topbar() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-line flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="relative w-80 max-w-full group">
        <Search className="w-4 h-4 text-mute absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500 transition-colors" />
        <input
          type="text"
          placeholder="Tìm người dùng theo Email hoặc ID…"
          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-line bg-canvas/50
                     focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                     placeholder:text-mute transition-all duration-300 focus:bg-white focus:shadow-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-9 h-9 grid place-items-center rounded-xl hover:bg-slate-100/80 transition-all duration-300 group">
          <Bell className="w-4.5 h-4.5 text-mute group-hover:text-ink transition-colors group-hover:animate-[ring-wiggle_0.6s_ease-in-out_infinite]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white shadow-[0_0_8px_#F59E0B]" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-line cursor-pointer group py-1">
          <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 text-white grid place-items-center text-xs font-bold shadow-sm border border-slate-700/10 group-hover:border-slate-800/25 transition-all">
            {adminUser.initials}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink group-hover:text-amber-600 transition-colors">{adminUser.name}</p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-mute mt-0.5">{adminUser.role}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-mute group-hover:text-ink transition-colors" />
        </div>
      </div>
    </header>
  )
}
