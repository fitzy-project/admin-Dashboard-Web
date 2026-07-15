import React, { useState } from 'react'
import { Plus, Edit2, Trash2, SlidersHorizontal, Save, X, ToggleLeft, ToggleRight } from 'lucide-react'
import { colorCompatibilityRules, colorsList } from '../data/mockData.js'

export default function ColorCompatPage() {
  const [rules, setRules] = useState(colorCompatibilityRules)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newRule, setNewRule] = useState({ color1: 'Black', color2: 'White', score: 8, note: '' })
  const [editingId, setEditingId] = useState(null)
  const [editingForm, setEditingForm] = useState({ color1: '', color2: '', score: 8, note: '' })

  function handleAddSubmit(e) {
    e.preventDefault()
    if (newRule.color1 === newRule.color2) {
      alert('Vui lòng chọn hai màu sắc khác nhau!')
      return
    }
    const id = `CC-${Math.max(...rules.map((r) => parseInt(r.id.replace('CC-', ''), 10))) + 1}`
    setRules([...rules, { ...newRule, id, score: Number(newRule.score), active: true }])
    setNewRule({ color1: 'Black', color2: 'White', score: 8, note: '' })
    setShowAddForm(false)
  }

  function handleDelete(id) {
    if (confirm('Bạn muốn xóa quy tắc phối màu này?')) {
      setRules(rules.filter((r) => r.id !== id))
    }
  }

  function toggleRuleActive(id) {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    )
  }

  function updateScoreDirectly(id, val) {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, score: Number(val) } : r))
    )
  }

  function startEditing(r) {
    setEditingId(r.id)
    setEditingForm({ color1: r.color1, color2: r.color2, score: r.score, note: r.note })
  }

  function handleEditSave(id) {
    setRules(
      rules.map((r) =>
        r.id === id ? { ...r, ...editingForm, score: Number(editingForm.score) } : r
      )
    )
    setEditingId(null)
  }

  // Find HEX color for visual dots
  function getHexColor(colorName) {
    const found = colorsList.find((c) => c.name.toLowerCase() === colorName.toLowerCase())
    return found ? found.hex : '#94A3B8'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Quy tắc phối màu (Color Compatibility)
          </h1>
          <p className="text-sm text-mute mt-1">
            Điều chỉnh điểm số tương thích giữa các cặp màu nền tảng để công cụ AI gợi ý bộ trang phục thẩm mỹ.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2.5 text-sm font-bold hover:bg-slate-800 transition-colors shadow-card"
        >
          <Plus className="w-4 h-4" /> Thêm quy tắc phối màu
        </button>
      </div>

      {/* Add Form Card */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-white border border-line rounded-2xl p-5 shadow-card grid gap-4 sm:grid-cols-4 items-end">
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Màu 1</span>
            <select
              value={newRule.color1}
              onChange={(e) => setNewRule({ ...newRule, color1: e.target.value })}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            >
              {colorsList.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Màu 2</span>
            <select
              value={newRule.color2}
              onChange={(e) => setNewRule({ ...newRule, color2: e.target.value })}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-amber-500"
            >
              {colorsList.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Điểm số (0 - 10): {newRule.score}</span>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={newRule.score}
              onChange={(e) => setNewRule({ ...newRule, score: parseInt(e.target.value, 10) })}
              className="w-full accent-amber-500 mt-2"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-mute">Ghi chú</span>
            <input
              type="text"
              value={newRule.note}
              onChange={(e) => setNewRule({ ...newRule, note: e.target.value })}
              placeholder="Nhập ghi chú phối màu..."
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
              Lưu quy tắc
            </button>
          </div>
        </form>
      )}

      {/* Rules Table */}
      <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-line bg-slate-50/50 text-xs uppercase tracking-wider text-mute font-bold">
                <th className="px-6 py-4">Mã quy tắc</th>
                <th className="px-6 py-4">Màu sắc phối hợp</th>
                <th className="px-6 py-4">Điểm thẩm mỹ (0-10)</th>
                <th className="px-6 py-4">Ghi chú giải nghĩa</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rules.map((rule) => {
                const isEditing = editingId === rule.id

                return (
                  <tr key={rule.id} className="hover:bg-slate-50/20">
                    <td className="px-6 py-4 font-mono font-bold text-mute">{rule.id}</td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <div className="flex gap-2 items-center">
                          <select
                            value={editingForm.color1}
                            onChange={(e) => setEditingForm({ ...editingForm, color1: e.target.value })}
                            className="rounded border border-line p-1 text-xs"
                          >
                            {colorsList.map((c) => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                          <span>+</span>
                          <select
                            value={editingForm.color2}
                            onChange={(e) => setEditingForm({ ...editingForm, color2: e.target.value })}
                            className="rounded border border-line p-1 text-xs"
                          >
                            {colorsList.map((c) => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-1.5">
                            <span className="w-4.5 h-4.5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: getHexColor(rule.color1) }} />
                            <span className="w-4.5 h-4.5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: getHexColor(rule.color2) }} />
                          </div>
                          <span className="font-bold text-ink">{rule.color1} + {rule.color2}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="10"
                            value={editingForm.score}
                            onChange={(e) => setEditingForm({ ...editingForm, score: parseInt(e.target.value, 10) })}
                            className="w-20 accent-amber-500"
                          />
                          <span className="font-bold text-ink">{editingForm.score}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${rule.score * 10}%` }} />
                          </div>
                          <span className="font-bold text-ink">{rule.score} / 10</span>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            value={rule.score}
                            onChange={(e) => updateScoreDirectly(rule.id, e.target.value)}
                            className="w-16 accent-amber-500 opacity-60 hover:opacity-100 transition-opacity"
                            aria-label="Chỉnh điểm"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingForm.note}
                          onChange={(e) => setEditingForm({ ...editingForm, note: e.target.value })}
                          className="rounded border border-line px-2 py-1 text-xs w-full"
                        />
                      ) : (
                        <span className="text-mute text-xs font-semibold">{rule.note || 'Chưa có ghi chú'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => toggleRuleActive(rule.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border
                          ${rule.active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'}`}
                      >
                        {rule.active ? 'Đang bật' : 'Tạm tắt'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
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
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
