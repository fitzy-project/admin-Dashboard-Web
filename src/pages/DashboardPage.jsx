import React from 'react'
import { summaryStats, aiVersionInfo, uploadsByDay, categoryDistribution } from '../data/mockData.js'
import StatCard from '../components/StatCard.jsx'
import UploadsChart from '../components/UploadsChart.jsx'
import ColorPieChart from '../components/ColorPieChart.jsx'
import { Cpu, Calendar, TrendingUp, Zap } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Tổng quan hệ thống
        </h1>
        <p className="text-sm text-mute mt-1">
          Theo dõi tổng lượng ảnh đã xử lý, trang phục số hóa, hoạt động phân tích AI và cấu hình mô hình hiện tại.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Charts & Model Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Uploads Chart */}
        <div className="lg:col-span-2 bg-white border border-line rounded-2xl p-5 shadow-card">
          <UploadsChart />
        </div>

        {/* AI Model Health Card */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-card space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Mô hình AI hiện tại</h3>
                  <p className="text-xs text-mute font-semibold">Công cụ nhận diện YOLOv8n</p>
                </div>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg border border-emerald-200">
                Active
              </span>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-mute font-semibold flex items-center gap-1.5"><Zap className="w-4 h-4 text-mute" /> Phiên bản:</span>
                <span className="font-bold text-ink">{aiVersionInfo.version}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-mute font-semibold flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-mute" /> Độ chính xác:</span>
                <span className="font-bold text-emerald-600">{aiVersionInfo.accuracy}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-mute font-semibold flex items-center gap-1.5"><Zap className="w-4 h-4 text-mute" /> Độ trễ phản hồi:</span>
                <span className="font-bold text-ink">{aiVersionInfo.latency}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-mute font-semibold flex items-center gap-1.5"><Calendar className="w-4 h-4 text-mute" /> Cập nhật cuối:</span>
                <span className="font-bold text-ink">{aiVersionInfo.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-line text-xs text-mute leading-relaxed">
            Mô hình được huấn luyện dựa trên tập dữ liệu Local Brands Việt Nam để nhận dạng chính xác phom dáng và nhãn quần áo phổ biến.
          </div>
        </div>
      </div>

      {/* Category distribution chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-line rounded-2xl p-5 shadow-card">
          <h3 className="font-display text-base font-bold text-ink mb-4">Phân bố chủng loại trang phục đã số hóa</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categoryDistribution.map((cat, idx) => (
              <div key={idx} className="p-3 border border-line rounded-xl flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <div>
                  <span className="block text-xs text-mute font-bold">{cat.name}</span>
                  <span className="block text-sm font-display font-bold text-ink">{cat.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-line rounded-2xl p-5 shadow-card flex flex-col justify-center items-center text-center space-y-3">
          <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600 font-display font-bold text-lg">
            93%
          </div>
          <div>
            <h4 className="font-bold text-ink">Chất lượng nhận dạng đạt chỉ tiêu</h4>
            <p className="text-xs text-mute mt-1 leading-relaxed max-w-[200px]">
              Tỷ lệ nhận diện đúng (Accuracy) của YOLOv8n trên tập validation ổn định ở mức 93%.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
