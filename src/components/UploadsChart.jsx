import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { uploadsByDay } from '../data/mockData.js'

export default function UploadsChart() {
  return (
    <div className="bg-white border border-line rounded-2xl p-5 shadow-card h-full transition-all duration-300 hover:shadow-card-hover">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-base font-bold text-ink">
            Trang phục tải lên mỗi ngày
          </h3>
          <p className="text-xs text-mute">7 ngày gần nhất</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={uploadsByDay} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 12px rgba(15,23,42,0.05)',
              fontSize: 12,
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <Area
            type="monotone"
            dataKey="uploads"
            stroke="#F59E0B"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorUploads)"
            dot={{ r: 4, stroke: '#F59E0B', strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: '#F59E0B' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
