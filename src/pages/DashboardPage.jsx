import React, { useState, useEffect } from 'react'
import api from '../services/api.js'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Users, Shirt, Sparkles, Eye, TrendingUp, Palette, Award, Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getDashboardStats()
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        console.error("Lỗi lấy thống kê dashboard:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center gap-3 text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <span className="text-sm font-semibold">Đang tải báo cáo phân tích...</span>
      </div>
    )
  }

  // Fallback to empty structures if fails
  const stats = data || {
    total_users: 0,
    active_today: 0,
    total_sample_items: 0,
    outfits_created_daily: 0,
    ai_scans_count: 0,
    user_growth: [],
    category_distribution: [],
    top_brands: [],
    top_colors: []
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors">
            Thống kê & Tổng quan
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors mt-1">
            Bảng theo dõi tổng quan các chỉ số người dùng, tủ đồ mẫu và hiệu năng phối đồ AI từ hệ thống.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Users */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tổng Người dùng</span>
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total_users}</h3>
            <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <span>Active hôm nay:</span>
              <span className="bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded text-[10px]">{stats.active_today}</span>
            </p>
          </div>
        </div>

        {/* Total Items */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Thư viện Mẫu</span>
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600 dark:text-amber-400">
              <Shirt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total_sample_items}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Món đồ chuẩn hóa</p>
          </div>
        </div>

        {/* Outfits Created */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Outfits AI Lên Lịch</span>
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.outfits_created_daily}</h3>
            <p className="text-xs text-emerald-600 font-bold mt-1">+8.2% tuần này</p>
          </div>
        </div>

        {/* AI Scans */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lượt AI Detection</span>
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.ai_scans_count}</h3>
            <p className="text-xs text-emerald-600 font-bold mt-1">+11.5% quét ảnh</p>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Độ chính xác AI</span>
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">93.0%</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">YOLOv8n-Fitzy Model</p>
          </div>
        </div>
      </div>

      {/* Line Chart: User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4">
            Tốc độ tăng trưởng Người dùng (Tuần)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.user_growth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" className="hidden dark:block" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Category Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4">
            Tỷ lệ Danh mục Quần áo
          </h3>
          <div className="h-60 flex-1 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.category_distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.category_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold mt-2">
            {stats.category_distribution.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-slate-600 dark:text-slate-300">{cat.name} ({cat.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Brands & Colors Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Brands */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-indigo-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Top 5 Thương hiệu trong hệ thống
            </h3>
          </div>
          <div className="space-y-4">
            {stats.top_brands.map((brand, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{idx + 1}. {brand.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">{brand.count} món ({brand.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${brand.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Colors */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-amber-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Top 5 Màu sắc phổ biến nhất
            </h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {stats.top_colors.map((color, idx) => (
              <div key={idx} className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-400 w-4">{idx + 1}</span>
                  <div
                    className="w-5.5 h-5.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{color.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{color.count} lượt</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
