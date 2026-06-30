import React from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { recentAiLogs } from '../data/mockData.js'

export default function AiLogsTable() {
  return (
    <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <div className="px-6 py-5 border-b border-line flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 className="font-display text-base font-bold text-ink">
            Nhật ký phân tích AI gần đây
          </h3>
          <p className="text-xs text-mute mt-0.5">YOLOv8 nhận diện · K-Means màu sắc</p>
        </div>
        <button className="text-xs font-bold text-amber-600 hover:text-amber-500 transition-colors bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/20">
          Xem tất cả →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-xs text-mute uppercase tracking-wider border-b border-line bg-slate-50/30">
              <th className="px-6 py-4 font-bold">Ảnh</th>
              <th className="px-6 py-4 font-bold">Kết quả YOLO</th>
              <th className="px-6 py-4 font-bold">Màu (K-Means)</th>
              <th className="px-6 py-4 font-bold">Người dùng</th>
              <th className="px-6 py-4 font-bold">Trạng thái</th>
              <th className="px-6 py-4 font-bold text-right">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentAiLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-3.5">
                  <span className="w-10 h-10 grid place-items-center rounded-xl bg-slate-100/80 text-xl border border-slate-200/40 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    {log.thumbnail}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-ink font-semibold">{log.yolo}</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium border border-slate-200/30">
                    {log.kmeans}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-mute font-medium">@{log.user}</td>
                <td className="px-6 py-3.5">
                  {log.status === 'success' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Thành công
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200/30">
                      <XCircle className="w-3.5 h-3.5" /> Thất bại
                    </span>
                  )}
                </td>
                <td className="px-6 py-3.5 text-right text-xs font-semibold text-slate-400 group-hover:text-slate-500">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
