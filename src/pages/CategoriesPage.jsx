import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Tag, Save, X } from 'lucide-react'
import { categoriesList } from '../data/mockData.js'

export default function CategoriesPage() {
  const [categories, setCategories] = useState(categoriesList)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '' })
  const [editingId, setEditingId] = useState(null)
  const [editingForm, setEditingForm] = useState({ name: '', slug: '', description: '' })

  function handleAddSubmit(e) {
    e.preventDefault()
    if (!newCat.name) return
    const id = `CAT-${Math.max(...categories.map((c) => parseInt(c.id.replace('CAT-', ''), 10))) + 1}`
    const slug = newCat.slug || newCat.name.toLowerCase().replace(/\s+/g, '-')
    setCategories([...categories, { ...newCat, id, slug, itemCount: 0 }])
    setNewCat({ name: '', slug: '', description: '' })
    setShowAddForm(false)
  }

  function handleDelete(id) {
    if (confirm('Bạn chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter((cat) => cat.id !== id))
    }
  }

  function startEditing(cat) {
    setEditingId(cat.id)
    setEditingForm({ name: cat.name, slug: cat.slug, description: cat.description })
  }

  function handleEditSave(id) {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, ...editingForm } : cat
      )
    )
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Quản lý Danh mục (Categories)
          </h1>
          <p className="text-sm text-mute mt-1">
            Định nghĩa và phân loại các cấu trúc trang phục trong hệ thống để AI YOLOv8 gán nhãn thuộc tính.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2.5 text-sm font-bold hover:bg-slate-800 transition-colors shadow-card"
        >
          <Plus className="w-4 h-4" /> Thêm danh mục
        </button>
      </div>

      {/* Add Form Card */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-white border border-line rounded-2xl p-5 shadow-card grid gap-4 sm:grid-cols-3 items-end">
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Tên danh mục</span>
            <input
              required
              type="text"
              value={newCat.name}
              onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
              placeholder="Ví dụ: Hoodie"
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Mã định danh (Slug)</span>
            <input
              type="text"
              value={newCat.slug}
              onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
              placeholder="Tự động nếu để trống"
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Mô tả chi tiết</span>
            <input
              type="text"
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
              placeholder="Nhập mô tả..."
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </label>
          <div className="flex gap-2 sm:col-span-3 justify-end pt-2">
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
              Lưu danh mục
            </button>
          </div>
        </form>
      )}

      {/* Grid view of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isEditing = editingId === cat.id

          return (
            <div key={cat.id} className="bg-white border border-line rounded-2xl p-5 shadow-card space-y-4 flex flex-col justify-between">
              {isEditing ? (
                <div className="space-y-3 flex-1">
                  <input
                    type="text"
                    value={editingForm.name}
                    onChange={(e) => setEditingForm({ ...editingForm, name: e.target.value })}
                    className="w-full rounded-lg border border-line px-2.5 py-1.5 text-sm font-bold text-ink"
                  />
                  <input
                    type="text"
                    value={editingForm.slug}
                    onChange={(e) => setEditingForm({ ...editingForm, slug: e.target.value })}
                    className="w-full rounded-lg border border-line px-2.5 py-1.5 text-xs font-mono text-mute"
                  />
                  <textarea
                    value={editingForm.description}
                    onChange={(e) => setEditingForm({ ...editingForm, description: e.target.value })}
                    className="w-full rounded-lg border border-line px-2.5 py-1.5 text-xs text-mute h-16 resize-none"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-600">
                        <Tag className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-ink text-base">{cat.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-mute font-bold bg-slate-50 px-2 py-0.5 rounded border border-line">
                      {cat.id}
                    </span>
                  </div>
                  <p className="text-xs text-mute font-semibold">Slug: <span className="font-mono text-ink bg-slate-100 px-1 rounded">{cat.slug}</span></p>
                  <p className="text-xs text-mute leading-relaxed">{cat.description || 'Chưa có mô tả chi tiết cho danh mục này.'}</p>
                </div>
              )}

              <div className="border-t border-slate-50 pt-4 mt-2 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-mute font-bold uppercase tracking-wider">Số trang phục</p>
                  <p className="font-display font-bold text-ink text-sm mt-0.5">
                    {new Intl.NumberFormat('vi-VN').format(cat.itemCount)} items
                  </p>
                </div>

                <div className="flex gap-1.5">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditSave(cat.id)}
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
                        onClick={() => startEditing(cat)}
                        className="p-2 bg-slate-50 text-slate-600 border border-line rounded-xl hover:bg-slate-100 transition-colors"
                        aria-label="Sửa"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                        aria-label="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
