import React, { useState, useEffect } from 'react'
import api from '../services/api.js'
import { Search, Eye, CheckCircle, AlertTriangle, XCircle, RefreshCw, MessageSquare, X, Loader2 } from 'lucide-react'

export default function AiLogsPage() {
  const [activeTab, setActiveTab] = useState('scan-history')
  const [loading, setLoading] = useState(true)

  // Tab 1: AI Scan History States
  const [logs, setLogs] = useState([])
  const [logSearch, setLogSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedLog, setSelectedLog] = useState(null)
  const [showOverrideModal, setShowOverrideModal] = useState(false)
  const [overrideValue, setOverrideValue] = useState('')

  // Tab 2: Feedback Reports States
  const [reports, setReports] = useState([])
  const [reportSearch, setReportSearch] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [logsRes, reportsRes] = await Promise.all([
        api.getScanLogs(),
        api.getFeedbackReports()
      ])
      setLogs(logsRes)
      setReports(reportsRes)
    } catch (err) {
      console.error("Lỗi tải dữ liệu AI Logs:", err)
    } finally {
      setLoading(false)
    }
  }

  // --- Tab 1: Scan History Logic ---
  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      (log.id && String(log.id).toLowerCase().includes(logSearch.toLowerCase())) ||
      (log.detected_class && log.detected_class.toLowerCase().includes(logSearch.toLowerCase())) ||
      (log.color_name && log.color_name.toLowerCase().includes(logSearch.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter
    return matchesSearch && matchesStatus
  })

  function handleOpenOverride(log) {
    setSelectedLog(log)
    setOverrideValue(log.detected_class)
    setShowOverrideModal(true)
  }

  async function handleSaveOverride(e) {
    e.preventDefault()
    if (!overrideValue.trim()) return
    try {
      const res = await api.overrideScanLog(selectedLog.id, overrideValue)
      setLogs(logs.map(l => l.id === selectedLog.id ? res : l))
      setShowOverrideModal(false)
    } catch (err) {
      alert("Lỗi ghi đè nhãn: " + err.message)
    }
  }

  // --- Tab 2: Reports Logic ---
  const filteredReports = reports.filter(r =>
    (r.user_name && r.user_name.toLowerCase().includes(reportSearch.toLowerCase())) ||
    (r.ai_prediction && r.ai_prediction.toLowerCase().includes(reportSearch.toLowerCase())) ||
    (r.user_correction && r.user_correction.toLowerCase().includes(reportSearch.toLowerCase()))
  )

  async function handleResolveReport(id) {
    try {
      const res = await api.resolveFeedbackReport(id)
      setReports(reports.map(r => r.id === id ? res : r))
    } catch (err) {
      alert("Lỗi đánh dấu đã xử lý: " + err.message)
    }
  }

  // Status rendering helper
  function renderStatusBadge(status) {
    if (status === 'success') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
          <CheckCircle className="w-3 h-3" /> Thành công
        </span>
      )
    } else if (status === 'review') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
          <AlertTriangle className="w-3 h-3" /> Cần xem xét
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40">
          <XCircle className="w-3 h-3" /> Thất bại
        </span>
      )
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'N/A'
    const date = new Date(dateStr)
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center gap-3 text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <span className="text-sm font-semibold">Đang tải nhật ký AI & báo lỗi...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors">
          Nhật ký AI & Kiểm duyệt
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">
          Theo dõi lịch sử quét nhận diện AI, ghi đè sửa nhãn sai và quản lý phản hồi lỗi nhận diện từ người dùng.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('scan-history')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer inline-flex items-center gap-2 ${
            activeTab === 'scan-history'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Eye className="w-4 h-4" /> Nhật ký quét AI (Scan History)
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer inline-flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Báo lỗi nhận diện (Feedback)
          {reports.filter(r => r.status === 'pending').length > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold grid place-items-center shadow">
              {reports.filter(r => r.status === 'pending').length}
            </span>
          )}
        </button>
      </div>

      {/* ===== Tab 1: AI Scan History ===== */}
      {activeTab === 'scan-history' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500" />
              <input
                type="text"
                placeholder="Tìm theo ID, nhãn nhận diện, màu sắc..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="success">Thành công</option>
              <option value="review">Cần xem xét</option>
              <option value="failed">Thất bại</option>
            </select>
          </div>

          {/* Scan Log Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/55 dark:bg-slate-800/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-5">Ảnh quét</th>
                    <th className="py-4 px-5">Nhãn nhận diện</th>
                    <th className="py-4 px-5">Màu phát hiện</th>
                    <th className="py-4 px-5">Confidence</th>
                    <th className="py-4 px-5">Trạng thái</th>
                    <th className="py-4 px-5">Thời gian</th>
                    <th className="py-4 px-5 text-right">Override</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                      <td className="py-3 px-5">
                        {log.image_url ? (
                          <img src={log.image_url} alt="scan" className="w-11 h-11 object-cover rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm" />
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800 grid place-items-center text-slate-400">
                            <Eye className="w-4 h-4" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-5">
                        <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">{log.detected_class}</code>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border border-slate-200 dark:border-slate-700" style={{ backgroundColor: log.color_hex || '#ccc' }} />
                          <span className="text-xs text-slate-600 dark:text-slate-400">{log.color_name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`font-bold text-sm ${
                          typeof log.confidence === 'string' ? 'text-indigo-500' :
                          parseFloat(log.confidence) >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                          parseFloat(log.confidence) >= 70 ? 'text-amber-600 dark:text-amber-400' :
                          'text-rose-600 dark:text-rose-400'
                        }`}>
                          {typeof log.confidence === 'number' ? `${log.confidence}%` : log.confidence}
                        </span>
                      </td>
                      <td className="py-3 px-5">{renderStatusBadge(log.status)}</td>
                      <td className="py-3 px-5 text-slate-500 dark:text-slate-400 text-xs font-medium">{formatDate(log.created_at)}</td>
                      <td className="py-3 px-5 text-right">
                        {(log.status === 'review' || log.status === 'failed') && (
                          <button
                            onClick={() => handleOpenOverride(log)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold hover:bg-indigo-100 dark:hover:bg-indigo-950/40 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Ghi đè
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr><td colSpan={7} className="py-8 text-center text-slate-400">Không tìm thấy log phù hợp.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===== Tab 2: Feedback Reports ===== */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500" />
            <input
              type="text"
              placeholder="Tìm theo tên người dùng, nhãn AI..."
              value={reportSearch}
              onChange={(e) => setReportSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="space-y-4">
            {filteredReports.map(report => (
              <div
                key={report.id}
                className={`bg-white dark:bg-slate-900 border rounded-2xl shadow-sm overflow-hidden transition-all ${
                  report.status === 'pending'
                    ? 'border-amber-500/40'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row gap-5 p-5">
                  {/* Image */}
                  {report.image_url ? (
                    <img
                      src={report.image_url}
                      alt="reported"
                      className="w-24 h-24 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shadow-sm shrink-0"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-slate-100 dark:bg-slate-800 grid place-items-center shrink-0 text-slate-400">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">#{report.id}</span>
                        <span className="text-xs text-slate-400">• Từ: <strong className="text-slate-700 dark:text-slate-200">{report.user_name || 'Ẩn danh'}</strong></span>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase
                        ${report.status === 'pending'
                          ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200/40'
                          : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200/40'
                        }`}>
                        {report.status === 'pending' ? 'Chờ xử lý' : 'Đã giải quyết'}
                      </span>
                    </div>

                    {/* Comparison: AI vs User */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/20">
                        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-1">AI dự đoán (sai)</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{report.ai_prediction}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/20">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block mb-1">User sửa lại (đúng)</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{report.user_correction}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {report.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                        "{report.notes}"
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 font-medium">Báo lúc: {formatDate(report.created_at)} • Log: #{report.scan_log_id || 'N/A'}</span>
                      {report.status === 'pending' && (
                        <button
                          onClick={() => handleResolveReport(report.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold cursor-pointer transition-all shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Đánh dấu đã xử lý
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                Không có báo lỗi nhận diện nào phù hợp.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Override Modal */}
      {showOverrideModal && selectedLog && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-slate-900 dark:text-white">Ghi đè nhãn nhận diện AI</h3>
              <button onClick={() => setShowOverrideModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveOverride}>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  {selectedLog.image_url ? (
                    <img src={selectedLog.image_url} alt="override" className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shadow" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 grid place-items-center text-slate-400"><Eye className="w-6 h-6" /></div>
                  )}
                  <div>
                    <p className="text-xs text-slate-400 font-bold">#{selectedLog.id}</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      AI nhận diện: <code className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 px-1.5 py-0.5 rounded text-xs">{selectedLog.detected_class}</code>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Confidence: {typeof selectedLog.confidence === 'number' ? `${selectedLog.confidence}%` : selectedLog.confidence}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nhãn mới (Override)</label>
                  <select
                    value={overrideValue}
                    onChange={(e) => setOverrideValue(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <optgroup label="Áo">
                      <option value="t-shirts">t-shirts (Áo thun)</option>
                      <option value="shirts">shirts (Sơ mi)</option>
                      <option value="blouses">blouses (Áo kiểu nữ)</option>
                      <option value="long_sleeved_tops">long_sleeved_tops (Tay dài)</option>
                      <option value="short_sleeve_tops">short_sleeve_tops (Tay ngắn)</option>
                      <option value="sleeveless_and_tank_tops">sleeveless_and_tank_tops (Ba lỗ)</option>
                      <option value="jackets">jackets (Áo khoác)</option>
                    </optgroup>
                    <optgroup label="Quần">
                      <option value="full_length_pants">full_length_pants (Quần dài)</option>
                      <option value="straight-leg_pants">straight-leg_pants (Ống đứng)</option>
                      <option value="wide-leg_and_palazzo_pants">wide-leg_and_palazzo_pants (Ống rộng)</option>
                      <option value="cropped_pants">cropped_pants (Quần lửng)</option>
                      <option value="skinny_pants">skinny_pants (Quần ôm)</option>
                      <option value="cargo_pants">cargo_pants (Quần túi hộp)</option>
                    </optgroup>
                    <optgroup label="Đồ bộ">
                      <option value="lounge_sets">lounge_sets (Bộ mặc nhà)</option>
                      <option value="sport_sets">sport_sets (Bộ thể thao)</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setShowOverrideModal(false)} className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer">Hủy</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm">Xác nhận ghi đè</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
