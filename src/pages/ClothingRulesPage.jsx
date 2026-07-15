import React, { useState } from 'react'
import { Plus, Edit2, Trash2, GitBranch, Save, X, ToggleLeft, ToggleRight, ChevronRight } from 'lucide-react'
import { clothingRules, categoriesList } from '../data/mockData.js'

function ScoreBar({ value }) {
  const colorClass =
    value >= 8 ? 'bg-emerald-500' : value >= 6 ? 'bg-amber-500' : 'bg-rose-500'

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${value * 10}%` }} />
      </div>
      <span className="w-8 text-right text-xs font-bold text-ink">{value} / 10</span>
    </div>
  )
}

export default function ClothingRulesPage() {
  const [rules, setRules] = useState(clothingRules)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newRule, setNewRule] = useState({
    name: '',
    topCategory: 'T-Shirt',
    bottomCategory: 'Jeans',
    outerCategory: 'Không bắt buộc',
    shoesCategory: 'Shoes',
    occasion: 'Casual',
    score: 8,
  })
  const [editingId, setEditingId] = useState(null)
  const [editingForm, setEditingForm] = useState({
    name: '',
    topCategory: 'T-Shirt',
    bottomCategory: 'Jeans',
    outerCategory: 'Không bắt buộc',
    shoesCategory: 'Shoes',
    occasion: 'Casual',
    score: 8,
  })

  function handleAddSubmit(e) {
    e.preventDefault()
    if (!newRule.name) return
    const id = `CR-${Math.max(...rules.map((r) => parseInt(r.id.replace('CR-', ''), 10))) + 1}`
    setRules([
      ...rules,
      {
        ...newRule,
        id,
        score: Number(newRule.score),
        active: true,
        updatedAt: new Date().toLocaleDateString('vi-VN'),
      },
    ])
    setNewRule({
      name: '',
      topCategory: 'T-Shirt',
      bottomCategory: 'Jeans',
      outerCategory: 'Không bắt buộc',
      shoesCategory: 'Shoes',
      occasion: 'Casual',
      score: 8,
    })
    setShowAddForm(false)
  }

  function handleDelete(id) {
    if (confirm('Bạn muốn xóa quy tắc phối đồ này?')) {
      setRules(rules.filter((r) => r.id !== id))
    }
  }

  function toggleRuleActive(id) {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    )
  }

  function startEditing(r) {
    setEditingId(r.id)
    setEditingForm({
      name: r.name,
      topCategory: r.topCategory,
      bottomCategory: r.bottomCategory,
      outerCategory: r.outerCategory || 'Không bắt buộc',
      shoesCategory: r.shoesCategory || 'Shoes',
      occasion: r.occasion,
      score: r.score,
    })
  }

  function handleEditSave(id) {
    setRules(
      rules.map((r) =>
        r.id === id
          ? {
              ...r,
              ...editingForm,
              score: Number(editingForm.score),
              updatedAt: new Date().toLocaleDateString('vi-VN'),
            }
          : r
      )
    )
    setEditingId(null)
  }

  const categoryNames = ['Không bắt buộc', ...categoriesList.map((c) => c.name)]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Quy tắc phối đồ (Clothing Rules)
          </h1>
          <p className="text-sm text-mute mt-1">
            Thiết lập "Trí tuệ thời trang" cho hệ thống. Quy định cách kết hợp các danh mục áo quần cho từng dịp cụ thể.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2.5 text-sm font-bold hover:bg-slate-800 transition-colors shadow-card"
        >
          <Plus className="w-4 h-4" /> Thêm quy tắc phối đồ
        </button>
      </div>

      {/* Add Form Card */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-white border border-line rounded-2xl p-5 shadow-card grid gap-4 sm:grid-cols-3 items-end">
          <label className="block space-y-1.5 sm:col-span-3">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Tên quy tắc phối đồ</span>
            <input
              required
              type="text"
              value={newRule.name}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              placeholder="Ví dụ: Lịch lãm công sở nam"
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Áo trên (Top)</span>
            <select
              value={newRule.topCategory}
              onChange={(e) => setNewRule({ ...newRule, topCategory: e.target.value })}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            >
              {categoriesList.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Quần dưới (Bottom)</span>
            <select
              value={newRule.bottomCategory}
              onChange={(e) => setNewRule({ ...newRule, bottomCategory: e.target.value })}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            >
              {categoriesList.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Áo khoác (Outer - tùy chọn)</span>
            <select
              value={newRule.outerCategory}
              onChange={(e) => setNewRule({ ...newRule, outerCategory: e.target.value })}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            >
              {categoryNames.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Dịp sử dụng (Occasion)</span>
            <select
              value={newRule.occasion}
              onChange={(e) => setNewRule({ ...newRule, occasion: e.target.value })}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            >
              <option value="Casual">Casual (Mặc thường ngày)</option>
              <option value="Office">Office (Công sở lịch sự)</option>
              <option value="Party">Party (Tiệc tùng nổi bật)</option>
              <option value="Sporty">Sporty (Thể thao thoải mái)</option>
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Điểm đánh giá (0-10): {newRule.score}</span>
            <input
              type="range"
              min="0"
              max="10"
              value={newRule.score}
              onChange={(e) => setNewRule({ ...newRule, score: parseInt(e.target.value, 10) })}
              className="w-full accent-amber-500 mt-2"
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
              Lưu quy tắc
            </button>
          </div>
        </form>
      )}

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => {
          const isEditing = editingId === rule.id

          return (
            <div key={rule.id} className="bg-white border border-line rounded-2xl p-5 shadow-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-600">
                      <GitBranch className="w-4 h-4" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingForm.name}
                        onChange={(e) => setEditingForm({ ...editingForm, name: e.target.value })}
                        className="rounded border border-line px-2 py-1 text-sm font-bold text-ink"
                      />
                    ) : (
                      <h3 className="font-display font-bold text-ink text-base">{rule.name}</h3>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-mute font-bold bg-slate-50 px-2 py-0.5 rounded border border-line">
                    {rule.id}
                  </span>
                </div>

                {/* Outfit Structure Visual */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-line flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700">
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <select
                        value={editingForm.topCategory}
                        onChange={(e) => setEditingForm({ ...editingForm, topCategory: e.target.value })}
                        className="rounded border border-line p-1 text-xs"
                      >
                        {categoriesList.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      <select
                        value={editingForm.bottomCategory}
                        onChange={(e) => setEditingForm({ ...editingForm, bottomCategory: e.target.value })}
                        className="rounded border border-line p-1 text-xs"
                      >
                        {categoriesList.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <>
                      <span className="bg-white border border-line px-2 py-1 rounded shadow-sm">{rule.topCategory}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-mute" />
                      <span className="bg-white border border-line px-2 py-1 rounded shadow-sm">{rule.bottomCategory}</span>
                      {rule.outerCategory && rule.outerCategory !== 'Không bắt buộc' && (
                        <>
                          <ChevronRight className="w-3.5 h-3.5 text-mute" />
                          <span className="bg-white border border-line px-2 py-1 rounded shadow-sm">{rule.outerCategory}</span>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="space-y-0.5">
                    <p className="text-mute font-semibold">Dịp sử dụng (Occasion)</p>
                    {isEditing ? (
                      <select
                        value={editingForm.occasion}
                        onChange={(e) => setEditingForm({ ...editingForm, occasion: e.target.value })}
                        className="rounded border border-line p-1 text-xs"
                      >
                        <option value="Casual">Casual</option>
                        <option value="Office">Office</option>
                        <option value="Party">Party</option>
                        <option value="Sporty">Sporty</option>
                      </select>
                    ) : (
                      <p className="font-bold text-ink">{rule.occasion}</p>
                    )}
                  </div>
                  <div className="space-y-0.5 text-right">
                    <p className="text-mute font-semibold">Cập nhật cuối</p>
                    <p className="font-bold text-ink">{rule.updatedAt || '08/07/2026'}</p>
                  </div>
                </div>

                {/* Score */}
                <div className="pt-2">
                  <p className="text-xs text-mute font-semibold mb-1">Điểm tương thích thiết kế</p>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={editingForm.score}
                        onChange={(e) => setEditingForm({ ...editingForm, score: parseInt(e.target.value, 10) })}
                        className="w-full accent-amber-500"
                      />
                      <span className="font-bold text-ink text-sm">{editingForm.score} / 10</span>
                    </div>
                  ) : (
                    <ScoreBar value={rule.score} />
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="border-t border-slate-50 pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleRuleActive(rule.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg border
                    ${rule.active 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-slate-100 text-slate-500 border-slate-200'}`}
                >
                  {rule.active ? 'Đang kích hoạt' : 'Tạm dừng'}
                </button>

                <div className="flex gap-1.5">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditSave(rule.id)}
                        className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-100"
                        aria-label="Lưu"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="p-1.5 bg-slate-50 text-mute border border-line rounded-lg hover:bg-slate-100"
                        aria-label="Hủy"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => startEditing(rule)}
                        className="p-1.5 bg-slate-50 text-slate-600 border border-line rounded-lg hover:bg-slate-100"
                        aria-label="Sửa"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(rule.id)}
                        className="p-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-100"
                        aria-label="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
