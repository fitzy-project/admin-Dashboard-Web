import React from 'react'
import { ArrowUpRight, ArrowDownRight, Users, Shirt, BrainCircuit, Sparkles } from 'lucide-react'

const iconMap = {
  users: { icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  items: { icon: Shirt, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  accuracy: { icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  outfits: { icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
}

export default function StatCard({ id, label, value, delta, trend }) {
  const isUp = trend === 'up'
  const config = iconMap[id] || { icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-500/10' }
  const Icon = config.icon

  return (
    <div className={`bg-white border border-line rounded-2xl p-5 shadow-card transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5
      ${isUp ? 'hover:shadow-card-hover hover:border-emerald-200' : 'hover:shadow-card-hover hover:border-rose-200'}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-mute uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2 rounded-xl ${config.bg} ${config.color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-3xl font-display font-bold text-ink">
          {value}
        </span>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg
            ${isUp ? 'text-emerald-600 bg-emerald-500/10' : 'text-rose-600 bg-rose-500/10'}`}
        >
          {isUp ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {delta}
        </span>
      </div>
    </div>
  )
}
