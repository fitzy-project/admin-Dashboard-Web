import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Palette, Save, X } from 'lucide-react'
import { colorsList } from '../data/mockData.js'

export default function ColorsPage() {
  const [colors, setColors] = useState(colorsList)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newColor, setNewColor] = useState({ name: '', hex: '#000000', description: '' })
  const [editingId, setEditingId] = useState(null)
  const [editingForm, setEditingForm] = useState({ name: '', hex: '#000000', description: '' })

  function handleAddSubmit(e) {
    e.preventDefault()
    if (!newColor.name) return
    const id = `COL-${Math.max(...colors.map((c) => parseInt(c.id.replace('COL-', ''), 10))) + 1}`
    setColors([...colors, { ...newColor, id }])
    setNewColor({ name: '', hex: '#000000', description: '' })
    setShowAddForm(false)
  }

  function handleDelete(id) {
    if (confirm('Bạn chắc chắn muốn xóa màu sắc này?')) {
      setColors(colors.filter((c) => c.id !== id))
    }
  }

  function startEditing(c) {
    setEditingId(c.id)
    setEditingForm({ name: c.name, hex: c.hex, description: c.description })
  }

  function handleEditSave(id) {
    setColors(
      colors.map((c) =>
        c.id === id ? { ...c, ...editingForm } : c
      )
    )
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Quản lý Màu sắc (Colors)
          </h1>
          <p className="text-sm text-mute mt-1">
            Định nghĩa bảng màu chuẩn của hệ thống kèm mã màu HEX để thuật toán so khớp phối màu.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2.5 text-sm font-bold hover:bg-slate-800 transition-colors shadow-card"
        >
          <Plus className="w-4 h-4" /> Thêm màu sắc
        </button>
      </div>

      {/* Add Form Card */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-white border border-line rounded-2xl p-5 shadow-card grid gap-4 sm:grid-cols-4 items-end">
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Tên màu sắc</span>
            <input
              required
              type="text"
              value={newColor.name}
              onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
              placeholder="Ví dụ: Olive"
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Mã HEX</span>
            <div className="flex gap-2">
              <input
                type="color"
                value={newColor.hex}
                onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                className="w-10 h-9 p-0.5 rounded-lg border border-line cursor-pointer"
              />
              <input
                required
                type="text"
                value={newColor.hex}
                onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                className="w-full rounded-xl border border-line px-3 py-2 text-sm font-mono text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </label>
          <label className="block space-y-1.5 sm:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Ghi chú / Mô tả</span>
            <input
              type="text"
              value={newColor.description}
              onChange={(e) => setNewColor({ ...newColor, description: e.target.value })}
              placeholder="Mô tả sắc độ hoặc vai trò..."
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
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
              Lưu màu sắc
            </button>
          </div>
        </form>
      )}

      {/* Color Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {colors.map((c) => {
          const isEditing = editingId === c.id

          return (
            <div key={c.id} className="bg-white border border-line rounded-2xl p-5 shadow-card space-y-4 flex flex-col justify-between">
              {isEditing ? (
                <div className="space-y-3 flex-1">
                  <input
                    type="text"
                    value={editingForm.name}
                    onChange={(e) => setEditingForm({ ...editingForm, name: e.target.value })}
                    className="w-full rounded-lg border border-line px-2.5 py-1.5 text-sm font-bold text-ink"
                  />
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={editingForm.hex}
                      onChange={(e) => setEditingForm({ ...editingForm, hex: e.target.value })}
                      className="w-9 h-9 p-0.5 rounded border border-line cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingForm.hex}
                      onChange={(e) => setEditingForm({ ...editingForm, hex: e.target.value })}
                      className="w-full rounded-lg border border-line px-2.5 py-1.5 text-xs font-mono font-bold text-ink"
                    />
                  </div>
                  <input
                    type="text"
                    value={editingForm.description}
                    onChange={(e) => setEditingForm({ ...editingForm, description: e.target.value })}
                    className="w-full rounded-lg border border-line px-2.5 py-1.5 text-xs text-mute"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Color Circle Preview */}
                      <span
                        className="w-8 h-8 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div>
                        <h3 className="font-display font-bold text-ink text-base">{c.name}</h3>
                        <span className="font-mono text-xs text-mute font-bold">{c.hex}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-mute font-bold bg-slate-50 px-2 py-0.5 rounded border border-line">
                      {c.id}
                    </span>
                  </div>
                  <p className="text-xs text-mute leading-relaxed">{c.description || 'Chưa có ghi chú.'}</p>
                </div>
              )}

              <div className="border-t border-slate-50 pt-3 mt-1 flex justify-end gap-1.5">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleEditSave(c.id)}
                      className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors"
                      aria-label="Lưu sửa"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="p-2 bg-slate-50 text-mute border border-line rounded-xl hover:bg-slate-100 transition-colors"
                      aria-label="Hủy sửa"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => startEditing(c)}
                      className="p-2 bg-slate-50 text-slate-600 border border-line rounded-xl hover:bg-slate-100 transition-colors"
                      aria-label="Sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id)}
                      className="p-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                      aria-label="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
