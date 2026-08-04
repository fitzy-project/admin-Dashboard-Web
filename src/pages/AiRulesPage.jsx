import React, { useState, useEffect } from 'react'
import api from '../services/api.js'
import { Plus, Edit2, Trash2, Sliders, AlertTriangle, FileText, Check, X, Search, CheckCircle, Loader2 } from 'lucide-react'

export default function AiRulesPage() {
  const [activeTab, setActiveTab] = useState('colors')
  const [loading, setLoading] = useState(true)

  // Tab 1: Color Compatibility States
  const [colorMatrix, setColorMatrix] = useState([])
  const [colorSearch, setColorSearch] = useState('')
  const [showColorModal, setShowColorModal] = useState(false)
  const [colorForm, setColorForm] = useState({ id: '', color1_name: 'Trắng', color2_name: 'Đen', compatibility: 'excellent', score: 10, notes: '' })

  // Tab 2: Incompatible Combos States
  const [incompatibleCombos, setIncompatibleCombos] = useState([])
  const [comboSearch, setComboSearch] = useState('')
  const [showComboModal, setShowComboModal] = useState(false)
  const [comboForm, setComboForm] = useState({ id: '', rule_name: '', category1_name: '', category2_name: '', reason: '', is_active: true })

  // Tab 3: Stylist Notes States
  const [stylistNotes, setStylistNotes] = useState([])
  const [notesSearch, setNotesSearch] = useState('')
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [notesForm, setNotesForm] = useState({ id: '', name: '', rule_text: '', is_active: true })

  useEffect(() => {
    fetchRulesData()
  }, [])

  const fetchRulesData = async () => {
    setLoading(true)
    try {
      const [colorsRes, combosRes, notesRes] = await Promise.all([
        api.getColorMatrix(),
        api.getIncompatibleCombos(),
        api.getStylistNotes()
      ])
      setColorMatrix(colorsRes)
      setIncompatibleCombos(combosRes)
      setStylistNotes(notesRes)
    } catch (err) {
      console.error("Lỗi lấy danh sách quy tắc phối đồ:", err)
    } finally {
      setLoading(false)
    }
  }

  // ----------------------------------------------------
  // Color Compatibility Actions
  // ----------------------------------------------------
  const filteredColors = colorMatrix.filter(c => 
    c.color1_name.toLowerCase().includes(colorSearch.toLowerCase()) ||
    c.color2_name.toLowerCase().includes(colorSearch.toLowerCase()) ||
    (c.notes && c.notes.toLowerCase().includes(colorSearch.toLowerCase()))
  )

  function handleOpenColorModal(rule = null) {
    if (rule) {
      setColorForm({ ...rule })
    } else {
      setColorForm({ id: '', color1_name: 'Trắng', color2_name: 'Đen', compatibility: 'excellent', score: 10, notes: '' })
    }
    setShowColorModal(true)
  }

  async function handleSaveColor(e) {
    e.preventDefault()
    try {
      const payload = {
        color1_name: colorForm.color1_name,
        color2_name: colorForm.color2_name,
        compatibility: colorForm.compatibility,
        score: parseInt(colorForm.score),
        notes: colorForm.notes,
        is_active: true
      }
      if (colorForm.id) {
        const res = await api.updateColorMatrix(colorForm.id, payload)
        setColorMatrix(colorMatrix.map(c => c.id === colorForm.id ? res : c))
      } else {
        const res = await api.createColorMatrix(payload)
        setColorMatrix([res, ...colorMatrix])
      }
      setShowColorModal(false)
    } catch (err) {
      alert("Lỗi lưu quy tắc màu: " + err.message)
    }
  }

  async function handleDeleteColor(id) {
    if (window.confirm('Xóa quy tắc tương thích màu này?')) {
      try {
        await api.deleteColorMatrix(id)
        setColorMatrix(colorMatrix.filter(c => c.id !== id))
      } catch (err) {
        alert("Lỗi xóa quy tắc màu: " + err.message)
      }
    }
  }

  // ----------------------------------------------------
  // Incompatible Combinations Actions
  // ----------------------------------------------------
  const filteredCombos = incompatibleCombos.filter(c => 
    c.category1_name.toLowerCase().includes(comboSearch.toLowerCase()) ||
    c.category2_name.toLowerCase().includes(comboSearch.toLowerCase()) ||
    (c.reason && c.reason.toLowerCase().includes(comboSearch.toLowerCase()))
  )

  function handleOpenComboModal(combo = null) {
    if (combo) {
      setComboForm({ ...combo })
    } else {
      setComboForm({ id: '', rule_name: '', category1_name: '', category2_name: '', reason: '', is_active: true })
    }
    setShowComboModal(true)
  }

  async function handleSaveCombo(e) {
    e.preventDefault()
    if (!comboForm.category1_name.trim() || !comboForm.category2_name.trim()) {
      alert('Vui lòng điền đủ 2 loại danh mục trang phục!')
      return
    }
    try {
      const ruleName = comboForm.rule_name.trim() || `${comboForm.category1_name} vs ${comboForm.category2_name}`
      const payload = {
        rule_name: ruleName,
        category1_name: comboForm.category1_name.trim(),
        category2_name: comboForm.category2_name.trim(),
        reason: comboForm.reason.trim(),
        is_active: comboForm.is_active
      }
      if (comboForm.id) {
        const res = await api.updateIncompatibleCombo(comboForm.id, payload)
        setIncompatibleCombos(incompatibleCombos.map(c => c.id === comboForm.id ? res : c))
      } else {
        const res = await api.createIncompatibleCombo(payload)
        setIncompatibleCombos([res, ...incompatibleCombos])
      }
      setShowComboModal(false)
    } catch (err) {
      alert("Lỗi lưu tổ hợp cấm: " + err.message)
    }
  }

  async function handleDeleteCombo(id) {
    if (window.confirm('Xóa quy tắc cấm phối này?')) {
      try {
        await api.deleteIncompatibleCombo(id)
        setIncompatibleCombos(incompatibleCombos.filter(c => c.id !== id))
      } catch (err) {
        alert("Lỗi xóa tổ hợp cấm: " + err.message)
      }
    }
  }

  // ----------------------------------------------------
  // Stylist Notes Actions
  // ----------------------------------------------------
  const filteredNotes = stylistNotes.filter(n => 
    n.name.toLowerCase().includes(notesSearch.toLowerCase()) ||
    n.rule_text.toLowerCase().includes(notesSearch.toLowerCase())
  )

  function handleOpenNotesModal(note = null) {
    if (note) {
      setNotesForm({ ...note })
    } else {
      setNotesForm({ id: '', name: '', rule_text: '', is_active: true })
    }
    setShowNotesModal(true)
  }

  async function handleSaveNotes(e) {
    e.preventDefault()
    if (!notesForm.name.trim() || !notesForm.rule_text.trim()) {
      alert('Vui lòng điền đủ tên luật và mô tả!')
      return
    }
    try {
      const payload = {
        name: notesForm.name,
        rule_text: notesForm.rule_text,
        is_active: notesForm.is_active
      }
      if (notesForm.id) {
        const res = await api.updateStylistNote(notesForm.id, payload)
        setStylistNotes(stylistNotes.map(n => n.id === notesForm.id ? res : n))
      } else {
        const res = await api.createStylistNote(payload)
        setStylistNotes([res, ...stylistNotes])
      }
      setShowNotesModal(false)
    } catch (err) {
      alert("Lỗi lưu ghi chú stylist: " + err.message)
    }
  }

  async function handleDeleteNotes(id) {
    if (window.confirm('Xóa ghi chú chuyên gia này?')) {
      try {
        await api.deleteStylistNote(id)
        setStylistNotes(stylistNotes.filter(n => n.id !== id))
      } catch (err) {
        alert("Lỗi xóa ghi chú: " + err.message)
      }
    }
  }

  async function handleToggleNoteActive(note) {
    try {
      const payload = { ...note, is_active: !note.is_active }
      const res = await api.updateStylistNote(note.id, payload)
      setStylistNotes(stylistNotes.map(n => n.id === note.id ? res : n))
    } catch (err) {
      alert("Lỗi thay đổi trạng thái quy tắc: " + err.message)
    }
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center gap-3 text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <span className="text-sm font-semibold">Đang tải cấu hình Quy tắc AI...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors">
          Quản lý Quy tắc AI & Stylist
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">
          Quản trị tri thức phối đồ thời trang: cấu hình ma trận màu tương sinh/khắc, định nghĩa cặp đồ kỵ nhau và cập nhật triết lý phối đồ từ Stylist.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('colors')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer inline-flex items-center gap-2 ${
            activeTab === 'colors'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Sliders className="w-4 h-4" /> Ma trận phối màu (Color Compatibility)
        </button>
        <button
          onClick={() => setActiveTab('combos')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer inline-flex items-center gap-2 ${
            activeTab === 'combos'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> Tổ hợp cấm (Incompatible Combos)
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer inline-flex items-center gap-2 ${
            activeTab === 'notes'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <FileText className="w-4 h-4" /> Ghi chú Chuyên gia (Stylist Notes)
        </button>
      </div>

      {/* ===== Tab 1: Color Compatibility ===== */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500" />
              <input
                type="text"
                placeholder="Tìm theo màu sắc, mô tả..."
                value={colorSearch}
                onChange={(e) => setColorSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <button
              onClick={() => handleOpenColorModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-glow-amber cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" strokeWidth={2.5} /> Thêm phối màu
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/55 dark:bg-slate-800/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-5">Màu 1</th>
                  <th className="py-4 px-5">Màu 2</th>
                  <th className="py-4 px-5">Độ tương thích</th>
                  <th className="py-4 px-5">Điểm (Rule Score)</th>
                  <th className="py-4 px-5">Ghi chú chi tiết</th>
                  <th className="py-4 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                {filteredColors.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-800 dark:text-slate-200">{c.color1_name}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-800 dark:text-slate-200">{c.color2_name}</td>
                    <td className="py-3.5 px-5">
                      <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                        c.compatibility === 'excellent' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-200 dark:border-emerald-800/20' :
                        c.compatibility === 'good' ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border-indigo-200 dark:border-indigo-800/20' :
                        'bg-rose-50 dark:bg-rose-950/20 text-rose-600 border-rose-200 dark:border-rose-800/20'
                      }`}>
                        {c.compatibility}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-700 dark:text-slate-300">{c.score}/10</td>
                    <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400 max-w-xs truncate">{c.notes}</td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleOpenColorModal(c)} className="p-1.5 text-slate-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-lg cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteColor(c.id)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== Tab 2: Incompatible Combos ===== */}
      {activeTab === 'combos' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500" />
              <input
                type="text"
                placeholder="Tìm quy tắc cấm..."
                value={comboSearch}
                onChange={(e) => setComboSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <button
              onClick={() => handleOpenComboModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-glow-amber cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" strokeWidth={2.5} /> Thêm tổ hợp cấm
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCombos.map(combo => (
              <div key={combo.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3.5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
                <div className="flex justify-between items-start pl-2">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{combo.rule_name}</h4>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                      <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{combo.category1_name}</span>
                      <span>kỵ</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{combo.category2_name}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => handleOpenComboModal(combo)} className="p-1 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-lg cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteCombo(combo.id)} className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 pl-2 leading-relaxed italic">"{combo.reason}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== Tab 3: Stylist Notes ===== */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500" />
              <input
                type="text"
                placeholder="Tìm ghi chú stylist..."
                value={notesSearch}
                onChange={(e) => setNotesSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <button
              onClick={() => handleOpenNotesModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-glow-amber cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" strokeWidth={2.5} /> Thêm ghi chú Stylist
            </button>
          </div>

          <div className="space-y-4">
            {filteredNotes.map(note => (
              <div key={note.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-start gap-4 transition-all">
                <button
                  onClick={() => handleToggleNoteActive(note)}
                  className={`w-10 h-10 rounded-full grid place-items-center cursor-pointer shrink-0 transition-colors ${
                    note.is_active
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{note.name}</h4>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => handleOpenNotesModal(note)} className="p-1 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-lg cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteNotes(note.id)} className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{note.rule_text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== Color Modal ===== */}
      {showColorModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-slate-900 dark:text-white">Quy tắc phối tương hợp màu</h3>
              <button onClick={() => setShowColorModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveColor}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Màu 1</label>
                    <input type="text" required value={colorForm.color1_name} onChange={(e) => setColorForm({ ...colorForm, color1_name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Màu 2</label>
                    <input type="text" required value={colorForm.color2_name} onChange={(e) => setColorForm({ ...colorForm, color2_name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tương thích</label>
                    <select value={colorForm.compatibility} onChange={(e) => setColorForm({ ...colorForm, compatibility: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none">
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="avoid">Avoid</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score (1 - 10)</label>
                    <input type="number" min={1} max={10} value={colorForm.score} onChange={(e) => setColorForm({ ...colorForm, score: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ghi chú stylist</label>
                  <textarea rows={3} value={colorForm.notes} onChange={(e) => setColorForm({ ...colorForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs focus:outline-none" placeholder="Lý do hoặc triết lý phối phối màu..." />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setShowColorModal(false)} className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer">Hủy</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-500 text-white shadow-glow-amber cursor-pointer">Lưu quy tắc</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== Combo Modal ===== */}
      {showComboModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-slate-900 dark:text-white">Quy tắc cấm phối đồ</h3>
              <button onClick={() => setShowComboModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveCombo}>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tên quy tắc (Rule Name)</label>
                  <input type="text" value={comboForm.rule_name} onChange={(e) => setComboForm({ ...comboForm, rule_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="Tự động sinh nếu để trống" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Danh mục 1 *</label>
                    <input type="text" required value={comboForm.category1_name} onChange={(e) => setComboForm({ ...comboForm, category1_name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="Ví dụ: Áo thun" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Danh mục 2 *</label>
                    <input type="text" required value={comboForm.category2_name} onChange={(e) => setComboForm({ ...comboForm, category2_name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="Ví dụ: Quần âu" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lý do kỵ nhau</label>
                  <textarea rows={3} required value={comboForm.reason} onChange={(e) => setComboForm({ ...comboForm, reason: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs focus:outline-none" placeholder="Giải thích lý do thẩm mỹ hoặc ngữ cảnh kỵ phối..." />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setShowComboModal(false)} className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer">Hủy</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-500 text-white shadow-glow-amber cursor-pointer">Lưu quy tắc</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== Stylist Note Modal ===== */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-slate-900 dark:text-white">Ghi chú Stylist / Luật tư vấn</h3>
              <button onClick={() => setShowNotesModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveNotes}>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tên luật tư vấn *</label>
                  <input type="text" required value={notesForm.name} onChange={(e) => setNotesForm({ ...notesForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="Ví dụ: Quy tắc phối đồ dáng quả lê" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nội dung luật / Lời khuyên Stylist *</label>
                  <textarea rows={4} required value={notesForm.rule_text} onChange={(e) => setNotesForm({ ...notesForm, rule_text: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs focus:outline-none" placeholder="Nhập lời khuyên hoặc quy tắc tư vấn chi tiết..." />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setShowNotesModal(false)} className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer">Hủy</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-500 text-white shadow-glow-amber cursor-pointer">Lưu ghi chú</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
