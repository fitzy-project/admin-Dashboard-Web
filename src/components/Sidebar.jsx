import React from 'react'
import {
  LayoutGrid,
  Users,
  Shirt,
  BrainCircuit,
  Settings,
  Sparkles,
} from 'lucide-react'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'users', label: 'Quản lý người dùng', icon: Users },
  { key: 'wardrobe', label: 'Kho tủ đồ', icon: Shirt },
  { key: 'ai-rules', label: 'AI Rules & Training', icon: BrainCircuit },
  { key: 'settings', label: 'Cài đặt', icon: Settings },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="w-64 shrink-0 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 flex flex-col h-screen sticky top-0 shadow-xl border-r border-slate-800">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="p-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <Sparkles className="w-5 h-5 text-ember animate-pulse" strokeWidth={2.5} />
        </div>
        <span className="font-display text-lg text-white font-bold tracking-wide">
          Fitzy <span className="text-ember drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]">Admin</span>
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map(({ key, label, icon: Icon }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
                ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-white border-l-2 border-ember shadow-[inset_1px_0_0_rgba(245,158,11,0.2)]'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-white border-l-2 border-transparent'
                }`}
            >
              <Icon
                className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-ember drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]' : 'text-slate-400'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="translate-y-[0.5px]">{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-ember shadow-[0_0_8px_#F59E0B]" />
              )}
            </button>
          )
        })}
      </nav>

      <div className="px-6 py-4 border-t border-slate-800/60 bg-slate-900/20 text-xs text-slate-500 flex items-center justify-between">
        <span>v0.2 · Premium Slate</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>
    </aside>
  )
}
