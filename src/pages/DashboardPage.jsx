import React from 'react'
import { summaryStats } from '../data/mockData.js'
import StatCard from '../components/StatCard.jsx'
import UploadsChart from '../components/UploadsChart.jsx'
import ColorPieChart from '../components/ColorPieChart.jsx'
import AiLogsTable from '../components/AiLogsTable.jsx'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Tổng quan hệ thống
        </h1>
        <p className="text-sm text-mute mt-1">
          Theo dõi người dùng, dữ liệu tủ đồ và hiệu suất AI của Fitzy theo thời gian thực.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <UploadsChart />
        </div>
        <div className="lg:col-span-2">
          <ColorPieChart />
        </div>
      </div>

      <AiLogsTable />
    </div>
  )
}
