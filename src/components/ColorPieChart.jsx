import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { colorDistribution } from '../data/mockData.js'

export default function ColorPieChart() {
  return (
    <div className="bg-white border border-line rounded-2xl p-5 shadow-card h-full transition-all duration-300 hover:shadow-card-hover">
      <div className="mb-4">
        <h3 className="font-display text-base font-bold text-ink">
          Phân bố màu sắc (K-Means)
        </h3>
        <p className="text-xs text-mute">Màu chủ đạo người dùng ưa chuộng</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width="100%" height={180} className="sm:w-[50%]">
          <PieChart>
            <Pie
              data={colorDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={4}
            >
              {colorDistribution.map((entry) => (
                <Cell key={entry.name} fill={entry.color} stroke="#fff" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 12px rgba(15,23,42,0.05)',
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <ul className="flex-1 w-full space-y-2.5">
          {colorDistribution.map((entry) => (
            <li key={entry.name} className="flex items-center justify-between text-sm p-2 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-slate-100/50">
              <span className="flex items-center gap-2.5 text-mute font-medium">
                <span
                  className="w-3.5 h-3.5 rounded-lg shadow-sm border border-black/10"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="font-bold text-ink bg-white px-2 py-0.5 rounded-md border border-slate-100 shadow-sm text-xs">{entry.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
