import React, { useState } from 'react'
import { Database, Plus, Search, Folder, Save, Trash2, Edit2, Play, CheckCircle } from 'lucide-react'
import { datasetList } from '../data/mockData.js'

export default function DatasetPage() {
  const [datasets, setDatasets] = useState(datasetList)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDataset, setNewDataset] = useState({ name: '', type: 'train', imageCount: 1000, status: 'Active' })

  function handleAddSubmit(e) {
    e.preventDefault()
    if (!newDataset.name) return
    const id = `DAT-${Math.max(...datasets.map((d) => parseInt(d.id.replace('DAT-', ''), 10))) + 1}`
    setDatasets([...datasets, { ...newDataset, id, imageCount: Number(newDataset.imageCount) }])
    setNewDataset({ name: '', type: 'train', imageCount: 1000, status: 'Active' })
    setShowAddForm(false)
  }

  function handleDelete(id) {
    if (confirm('Bạn có chắc chắn muốn xóa tập dữ liệu này?')) {
      setDatasets(datasets.filter((d) => d.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Quản lý Tập dữ liệu (Dataset Manager)
          </h1>
          <p className="text-sm text-mute mt-1">
            Quản lý kho dữ liệu huấn luyện (Training), kiểm định (Validation) và kiểm thử (Test) cho các tác vụ học máy YOLOv8.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2.5 text-sm font-bold hover:bg-slate-800 transition-colors shadow-card"
        >
          <Plus className="w-4 h-4" /> Nhập Dataset mới
        </button>
      </div>

      {/* Add Form Card */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-white border border-line rounded-2xl p-5 shadow-card grid gap-4 sm:grid-cols-4 items-end">
          <label className="block space-y-1.5 sm:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Tên tập dữ liệu</span>
            <input
              required
              type="text"
              value={newDataset.name}
              onChange={(e) => setNewDataset({ ...newDataset, name: e.target.value })}
              placeholder="Ví dụ: Brand Collection 2026 Winter"
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Loại dữ liệu</span>
            <select
              value={newDataset.type}
              onChange={(e) => setNewDataset({ ...newDataset, type: e.target.value })}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            >
              <option value="train">Train (Huấn luyện)</option>
              <option value="validation">Validation (Kiểm định)</option>
              <option value="test">Test (Kiểm thử)</option>
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Số lượng ảnh</span>
            <input
              required
              type="number"
              min="1"
              value={newDataset.imageCount}
              onChange={(e) => setNewDataset({ ...newDataset, imageCount: e.target.value })}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            />
          </label>
          <div className="flex gap-2 sm:col-span-4 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-xl border border-line px-4 py-2 text-sm font-bold text-mute hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-xl bg-ink text-white px-4 py-2 text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              Lưu Dataset
            </button>
          </div>
        </form>
      )}

      {/* Grid of Datasets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <div key={dataset.id} className="bg-white border border-line rounded-2xl p-6 shadow-card space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-ink text-base">{dataset.name}</h3>
                    <span className="text-[10px] text-mute font-mono font-bold">{dataset.id}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-50 text-xs font-semibold text-mute">
                <div className="flex justify-between">
                  <span>Loại phân mục (Split):</span>
                  <span className="font-bold text-ink uppercase">{dataset.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Số lượng ảnh gán nhãn:</span>
                  <span className="font-bold text-ink">{new Intl.NumberFormat('vi-VN').format(dataset.imageCount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trạng thái hoạt động:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> {dataset.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => handleDelete(dataset.id)}
                className="p-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                aria-label="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
