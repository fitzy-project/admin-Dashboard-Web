import React, { useState } from 'react'
import { Search, Eye, Check, AlertTriangle, Edit2, Play, Cpu, Sparkles } from 'lucide-react'
import { aiAnalysisLogs } from '../data/mockData.js'

export default function AiAnalysisPage() {
  const [logs, setLogs] = useState(aiAnalysisLogs)
  const [selectedLogId, setSelectedLogId] = useState(aiAnalysisLogs[0]?.id)
  const [overrideType, setOverrideType] = useState('')
  const [overrideColor, setOverrideColor] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const selectedLog = logs.find((l) => l.id === selectedLogId) ?? logs[0]

  function handleOverride(e) {
    e.preventDefault()
    if (!selectedLog) return

    setLogs((current) =>
      current.map((l) =>
        l.id === selectedLog.id
          ? {
              ...l,
              detectedType: overrideType || l.detectedType,
              colorName: overrideColor || l.colorName,
              confidence: 1.0, // Override sets confidence to 100%
              status: 'success',
            }
          : l
      )
    )
    setOverrideType('')
    setOverrideColor('')
  }

  function handleApprove(id) {
    setLogs((current) =>
      current.map((l) => (l.id === id ? { ...l, status: 'success' } : l))
    )
  }

  const filteredLogs = logs.filter((l) => {
    if (filterStatus === 'all') return true
    return l.status === filterStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Nhật ký phân tích AI (AI Analysis)
        </h1>
        <p className="text-sm text-mute mt-1">
          Giám sát kết quả nhận diện thời trang thời gian thực từ YOLOv8n & K-Means. Ghi đè (Override) nhãn trực tiếp nếu AI nhận diện sai.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-6">
        {/* Left Side: Logs List */}
        <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative min-w-0 flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mute w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm log theo mã tệp, loại trang phục..."
                className="w-full rounded-xl border border-line bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="inline-flex rounded-xl border border-line bg-white p-1 self-stretch sm:self-auto justify-center">
              {['all', 'review', 'success', 'failed'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilterStatus(st)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors uppercase
                    ${filterStatus === st ? 'bg-amber-500 text-white' : 'text-mute hover:text-ink'}`}
                >
                  {st === 'all' ? 'Tất cả' : st === 'review' ? 'Cần check' : st === 'success' ? 'Thành công' : 'AI lỗi'}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-line bg-slate-50/30 text-xs uppercase tracking-wider text-mute font-bold">
                  <th className="px-5 py-3">Ảnh</th>
                  <th className="px-5 py-3">Loại nhận diện (YOLO)</th>
                  <th className="px-5 py-3">Màu (K-Means)</th>
                  <th className="px-5 py-3">Tin cậy</th>
                  <th className="px-5 py-3">Trạng thái</th>
                  <th className="px-5 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className={`hover:bg-slate-50/40 cursor-pointer transition-colors ${selectedLogId === log.id ? 'bg-amber-50/30' : ''}`}
                    onClick={() => setSelectedLogId(log.id)}
                  >
                    <td className="px-5 py-3.5">
                      <img src={log.imageUrl} alt="Analysis thumbnail" className="w-12 h-12 object-cover rounded-xl border border-line bg-slate-100" />
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-ink">{log.detectedType}</p>
                      <p className="text-[10px] text-mute font-bold">{log.id}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: log.hexColor }} />
                        <span className="font-semibold text-slate-700">{log.colorName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-ink">
                      {Math.round(log.confidence * 100)}%
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border
                        ${
                          log.status === 'success'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : log.status === 'review'
                            ? 'bg-amber-50 border-amber-200 text-amber-700 animate-pulse'
                            : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}
                      >
                        {log.status === 'success' ? 'Đã duyệt' : log.status === 'review' ? 'Cần check' : 'AI lỗi'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        className="p-1.5 text-mute hover:text-amber-600 transition-colors"
                        aria-label="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Override Panel & Overlay Box */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-card space-y-6 self-start">
          <h2 className="font-display text-lg font-bold text-ink">Bản xem trước Bounding Box</h2>

          {selectedLog ? (
            <div className="space-y-4">
              {/* Image Preview with Bounding Box overlays */}
              <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-100 aspect-[4/5] flex items-center justify-center">
                <img src={selectedLog.imageUrl} className="w-full h-full object-cover" alt="Selected Preview" />

                {selectedLog.box && (
                  <div
                    className="absolute border-2 border-amber-500 bg-amber-500/10 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg"
                    style={{
                      left: `${selectedLog.box[0] * 100}%`,
                      top: `${selectedLog.box[1] * 100}%`,
                      width: `${(selectedLog.box[2] - selectedLog.box[0]) * 100}%`,
                      height: `${(selectedLog.box[3] - selectedLog.box[1]) * 100}%`,
                    }}
                  >
                    <span className="bg-amber-600 px-1 py-0.5 rounded mr-1">
                      {selectedLog.detectedType}
                    </span>
                    {Math.round(selectedLog.confidence * 100)}%
                  </div>
                )}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-mute font-semibold block">Model YOLO:</span>
                  <span className="font-bold text-ink block">{selectedLog.modelName} ({selectedLog.version})</span>
                </div>
                <div>
                  <span className="text-mute font-semibold block text-right">Inference Speed:</span>
                  <span className="font-bold text-ink block text-right">{selectedLog.inferenceTimeMs} ms</span>
                </div>
              </div>

              {/* Override Form */}
              <form onSubmit={handleOverride} className="space-y-4">
                <label className="block space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-mute">Ghi đè nhãn loại đồ</span>
                  <input
                    type="text"
                    value={overrideType}
                    onChange={(e) => setOverrideType(e.target.value)}
                    placeholder={`AI: ${selectedLog.detectedType}`}
                    className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-mute">Ghi đè nhãn màu sắc</span>
                  <input
                    type="text"
                    value={overrideColor}
                    onChange={(e) => setOverrideColor(e.target.value)}
                    placeholder={`AI: ${selectedLog.colorName}`}
                    className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </label>

                <div className="flex gap-2 pt-1">
                  {selectedLog.status !== 'success' && (
                    <button
                      type="button"
                      onClick={() => handleApprove(selectedLog.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-2.5 text-xs font-bold hover:bg-emerald-100 transition-colors"
                    >
                      Duyệt nhãn gốc
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2.5 text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Ghi đè nhãn
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p className="text-xs text-mute text-center py-6">Chọn một dòng log bên trái để tiến hành ghi đè nhãn.</p>
          )}
        </div>
      </div>
    </div>
  )
}
