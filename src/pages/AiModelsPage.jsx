import React, { useState } from 'react'
import { Cpu, Calendar, Sliders, Settings, Zap, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { aiModelsList } from '../data/mockData.js'

export default function AiModelsPage() {
  const [models, setModels] = useState(aiModelsList)
  const [updatingId, setUpdatingId] = useState(null)

  function handleTriggerUpdate(id) {
    setUpdatingId(id)
    setTimeout(() => {
      setUpdatingId(null)
      alert('Đã đồng bộ thành công trọng số mô hình mới nhất!')
    }, 1500)
  }

  function toggleModelStatus(id) {
    setModels(
      models.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Quản lý Mô hình AI (AI Models)
          </h1>
          <p className="text-sm text-mute mt-1">
            Giám sát các cấu hình công cụ học máy: YOLOv8n (Nhận dạng), K-Means (Màu sắc) và Decision Tree (Phối đồ).
          </p>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {models.map((model) => {
          const isSyncing = updatingId === model.id

          return (
            <div key={model.id} className="bg-white border border-line rounded-2xl p-6 shadow-card flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-slate-900/10 rounded-xl text-slate-800">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-ink text-base">{model.name}</h3>
                      <span className="text-[10px] text-mute font-mono font-bold">ID: {model.id}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-lg text-xs font-bold border
                    ${model.active 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-slate-100 text-slate-500 border-slate-200'}`}
                  >
                    {model.active ? 'Active' : 'Offline'}
                  </span>
                </div>

                {/* Specs List */}
                <div className="space-y-3 pt-2 text-sm border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-mute font-semibold">Phiên bản hiện hành:</span>
                    <span className="font-bold text-ink bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">{model.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mute font-semibold">Độ chính xác (Accuracy):</span>
                    <span className="font-bold text-emerald-600">{model.accuracy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mute font-semibold">Độ trễ xử lý (Latency):</span>
                    <span className="font-bold text-ink">{model.latency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mute font-semibold flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-mute" /> Ngày cập nhật:</span>
                    <span className="font-bold text-ink">{model.updateDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-50 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleTriggerUpdate(model.id)}
                  disabled={isSyncing}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white hover:bg-slate-50 text-ink py-2 text-xs font-bold transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ Weight'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleModelStatus(model.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors
                    ${model.active
                      ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                      : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'}`}
                >
                  {model.active ? 'Tắt' : 'Bật'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Warning Box */}
      <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-5 shadow-card flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs font-semibold leading-relaxed text-amber-800">
          <p className="font-bold text-sm mb-0.5 text-amber-900">Huấn luyện mô hình ngoại tuyến (Offline Training)</p>
          Các mô hình YOLOv8n và Decision Tree của Fitzy được huấn luyện định kỳ trên server GPU riêng biệt. Sau khi hoàn thành xuất trọng số (.pt / .json), quản trị viên có thể nhấn nút "Đồng bộ Weight" để hệ thống FastAPI của trang sản phẩm tự động cập nhật mà không cần dừng dịch vụ.
        </div>
      </div>
    </div>
  )
}
