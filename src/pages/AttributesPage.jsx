import React, { useState, useEffect } from 'react'
import api from '../services/api.js'
import { Plus, Edit2, Trash2, X, Search, Layers, Tag, Palette, Shirt, ChevronRight, Loader2 } from 'lucide-react'

// Category tree fallback (chuẩn Fitzy DB)
const initialCategoryTree = [
  {
    id: 'CAT-AO',
    name: 'Áo',
    slug: 'ao',
    children: [
      { id: 'SUB-01', name: 't-shirts', label: 'Áo thun cổ tròn/V/họa tiết' },
      { id: 'SUB-02', name: 'shirts', label: 'Sơ mi' },
      { id: 'SUB-03', name: 'blouses', label: 'Áo kiểu nữ' },
      { id: 'SUB-04', name: 'long_sleeved_tops', label: 'Tay dài' },
      { id: 'SUB-05', name: 'short_sleeve_tops', label: 'Tay ngắn' },
      { id: 'SUB-06', name: 'sleeveless_and_tank_tops', label: 'Ba lỗ / 2 dây' },
      { id: 'SUB-07', name: 'jackets', label: 'Áo khoác' },
    ],
  },
  {
    id: 'CAT-QUAN',
    name: 'Quần',
    slug: 'quan',
    children: [
      { id: 'SUB-08', name: 'full_length_pants', label: 'Quần dài' },
      { id: 'SUB-09', name: 'straight-leg_pants', label: 'Ống đứng' },
      { id: 'SUB-10', name: 'wide-leg_and_palazzo_pants', label: 'Ống rộng / Palazzo' },
      { id: 'SUB-11', name: 'cropped_pants', label: 'Quần lửng / 9 tấc' },
      { id: 'SUB-12', name: 'skinny_pants', label: 'Quần ôm' },
      { id: 'SUB-13', name: 'cargo_pants', label: 'Quần túi hộp' },
    ],
  },
  {
    id: 'CAT-DOBO',
    name: 'Đồ bộ',
    slug: 'do-bo',
    children: [
      { id: 'SUB-14', name: 'lounge_sets', label: 'Bộ mặc nhà / nỉ' },
      { id: 'SUB-15', name: 'sport_sets', label: 'Bộ thể thao' },
    ],
  },
]

export default function AttributesPage() {
  const [activeTab, setActiveTab] = useState('categories')
  const [loading, setLoading] = useState(true)

  // Categories
  const [categories, setCategories] = useState([])
  const [categoryTree] = useState(initialCategoryTree)
  const [expandedCat, setExpandedCat] = useState('CAT-AO')

  // Brands
  const [brands, setBrands] = useState([])
  const [brandSearch, setBrandSearch] = useState('')
  const [showBrandModal, setShowBrandModal] = useState(false)
  const [brandForm, setBrandForm] = useState({ id: '', name: '', country: '' })

  // Colors
  const [colors, setColors] = useState([])
  const [colorSearch, setColorSearch] = useState('')
  const [showColorModal, setShowColorModal] = useState(false)
  const [colorForm, setColorForm] = useState({ id: '', name: '', hex_code: '#000000' })

  // Materials
  const [materials, setMaterials] = useState([])
  const [materialSearch, setMaterialSearch] = useState('')
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [materialForm, setMaterialForm] = useState({ id: '', name: '', description: '' })

  useEffect(() => {
    fetchAttributesData()
  }, [])

  const fetchAttributesData = async () => {
    setLoading(true)
    try {
      const [catRes, brandRes, colorRes, matRes] = await Promise.all([
        api.getCategories(),
        api.getBrands(),
        api.getColors(),
        api.getMaterials()
      ])
      setCategories(catRes)
      setBrands(brandRes)
      setColors(colorRes)
      setMaterials(matRes)
    } catch (err) {
      console.error("Lỗi lấy dữ liệu thuộc tính:", err)
    } finally {
      setLoading(false)
    }
  }

  // --- Brands CRUD ---
  const filteredBrands = brands.filter(b =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
    (b.country && b.country.toLowerCase().includes(brandSearch.toLowerCase()))
  )

  function handleOpenBrandModal(brand = null) {
    setBrandForm(brand ? { ...brand } : { id: '', name: '', country: '' })
    setShowBrandModal(true)
  }

  async function handleSaveBrand(e) {
    e.preventDefault()
    if (!brandForm.name.trim()) return alert('Vui lòng nhập tên thương hiệu!')
    try {
      const payload = {
        name: brandForm.name.trim(),
        country: brandForm.country.trim()
      }
      if (brandForm.id) {
        const res = await api.updateBrand(brandForm.id, payload)
        setBrands(brands.map(b => b.id === brandForm.id ? res : b))
      } else {
        const res = await api.createBrand(payload)
        setBrands([res, ...brands])
      }
      setShowBrandModal(false)
    } catch (err) {
      alert("Lỗi lưu thương hiệu: " + err.message)
    }
  }

  async function handleDeleteBrand(id) {
    if (window.confirm('Xóa thương hiệu này?')) {
      try {
        await api.deleteBrand(id)
        setBrands(brands.filter(b => b.id !== id))
      } catch (err) {
        alert("Lỗi xóa thương hiệu: " + err.message)
      }
    }
  }

  // --- Colors CRUD ---
  const filteredColors = colors.filter(c =>
    c.name.toLowerCase().includes(colorSearch.toLowerCase())
  )

  function handleOpenColorModal(color = null) {
    setColorForm(color ? { ...color } : { id: '', name: '', hex_code: '#000000' })
    setShowColorModal(true)
  }

  async function handleSaveColor(e) {
    e.preventDefault()
    if (!colorForm.name.trim()) return alert('Vui lòng nhập tên màu!')
    try {
      const payload = {
        name: colorForm.name.trim(),
        hex_code: colorForm.hex_code.trim()
      }
      if (colorForm.id) {
        const res = await api.updateColor(colorForm.id, payload)
        setColors(colors.map(c => c.id === colorForm.id ? res : c))
      } else {
        const res = await api.createColor(payload)
        setColors([res, ...colors])
      }
      setShowColorModal(false)
    } catch (err) {
      alert("Lỗi lưu màu sắc: " + err.message)
    }
  }

  async function handleDeleteColor(id) {
    if (window.confirm('Xóa màu này?')) {
      try {
        await api.deleteColor(id)
        setColors(colors.filter(c => c.id !== id))
      } catch (err) {
        alert("Lỗi xóa màu sắc: " + err.message)
      }
    }
  }

  // --- Materials CRUD ---
  const filteredMaterials = materials.filter(m =>
    m.name.toLowerCase().includes(materialSearch.toLowerCase()) ||
    (m.description && m.description.toLowerCase().includes(materialSearch.toLowerCase()))
  )

  function handleOpenMaterialModal(mat = null) {
    setMaterialForm(mat ? { ...mat } : { id: '', name: '', description: '' })
    setShowMaterialModal(true)
  }

  async function handleSaveMaterial(e) {
    e.preventDefault()
    if (!materialForm.name.trim()) return alert('Vui lòng nhập tên chất liệu!')
    try {
      const payload = {
        name: materialForm.name.trim(),
        description: materialForm.description.trim(),
        is_active: true
      }
      if (materialForm.id) {
        const res = await api.updateMaterial(materialForm.id, payload)
        setMaterials(materials.map(m => m.id === materialForm.id ? res : m))
      } else {
        const res = await api.createMaterial(payload)
        setMaterials([res, ...materials])
      }
      setShowMaterialModal(false)
    } catch (err) {
      alert("Lỗi lưu chất liệu: " + err.message)
    }
  }

  async function handleDeleteMaterial(id) {
    if (window.confirm('Xóa chất liệu này?')) {
      try {
        await api.deleteMaterial(id)
        setMaterials(materials.filter(m => m.id !== id))
      } catch (err) {
        alert("Lỗi xóa chất liệu: " + err.message)
      }
    }
  }

  // Reusable inline modal
  function renderModal(title, isOpen, onClose, onSubmit, children) {
    if (!isOpen) return null
    return (
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm grid place-items-center p-4 z-50">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-display font-bold text-slate-900 dark:text-white">{title}</h3>
            <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="p-6 space-y-4">{children}</div>
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer">Hủy</button>
              <button type="submit" className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-500 text-white shadow-glow-amber cursor-pointer">Lưu</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const tabs = [
    { key: 'categories', label: 'Cây Danh mục', icon: Layers },
    { key: 'brands', label: 'Thương hiệu', icon: Tag },
    { key: 'colors', label: 'Màu sắc', icon: Palette },
    { key: 'materials', label: 'Chất liệu', icon: Shirt },
  ]

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center gap-3 text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <span className="text-sm font-semibold">Đang tải từ điển thuộc tính...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors">
          Quản lý Danh mục & Thuộc tính
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">
          Quản lý cây danh mục quần áo, từ điển thương hiệu, bảng màu hệ thống và chất liệu vải dùng chung.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer inline-flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'border-amber-500 text-amber-500'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          )
        })}
      </div>

      {/* ===== Tab 1: Category Tree ===== */}
      {activeTab === 'categories' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6">
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4">Cây Danh mục Quần áo (Category & Subcategory)</h3>
          <div className="space-y-3">
            {categoryTree.map(cat => (
              <div key={cat.id} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 grid place-items-center font-bold text-xs">{cat.children.length}</div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{cat.name}</span>
                      <span className="text-xs text-slate-400 ml-2">slug: {cat.slug}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedCat === cat.id ? 'rotate-90' : ''}`} />
                </button>
                {expandedCat === cat.id && (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {cat.children.map(sub => (
                      <div key={sub.id} className="flex items-center justify-between px-5 py-3 pl-14">
                        <div className="flex items-center gap-3">
                          <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">{sub.name}</code>
                          <span className="text-sm text-slate-700 dark:text-slate-300">{sub.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">{sub.id}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== Tab 2: Brands ===== */}
      {activeTab === 'brands' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500" />
              <input type="text" placeholder="Tìm thương hiệu..." value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
            </div>
            <button onClick={() => handleOpenBrandModal()} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-glow-amber cursor-pointer">
              <Plus className="w-4.5 h-4.5" strokeWidth={2.5} /> Thêm thương hiệu
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/55 dark:bg-slate-800/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-5">ID</th>
                  <th className="py-4 px-5">Tên thương hiệu</th>
                  <th className="py-4 px-5">Quốc gia</th>
                  <th className="py-4 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                {filteredBrands.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                    <td className="py-3 px-5 text-slate-400 text-xs font-bold">{b.id}</td>
                    <td className="py-3 px-5 font-semibold text-slate-900 dark:text-slate-200">{b.name}</td>
                    <td className="py-3 px-5 text-slate-600 dark:text-slate-400">{b.country || 'N/A'}</td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => handleOpenBrandModal(b)} className="p-1.5 text-slate-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-lg cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteBrand(b.id)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== Tab 3: Colors ===== */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500" />
              <input type="text" placeholder="Tìm tên màu sắc..." value={colorSearch} onChange={(e) => setColorSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
            </div>
            <button onClick={() => handleOpenColorModal()} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-glow-amber cursor-pointer">
              <Plus className="w-4.5 h-4.5" strokeWidth={2.5} /> Thêm màu sắc
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/55 dark:bg-slate-800/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-5">ID</th>
                  <th className="py-4 px-5">Xem trước</th>
                  <th className="py-4 px-5">Tên màu sắc</th>
                  <th className="py-4 px-5">Mã Hex Code</th>
                  <th className="py-4 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                {filteredColors.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                    <td className="py-3 px-5 text-slate-400 text-xs font-bold">{c.id}</td>
                    <td className="py-3 px-5">
                      <div className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" style={{ backgroundColor: c.hex_code }} />
                    </td>
                    <td className="py-3 px-5 font-semibold text-slate-900 dark:text-slate-200">{c.name}</td>
                    <td className="py-3 px-5"><code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">{c.hex_code}</code></td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
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

      {/* ===== Tab 4: Materials ===== */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500" />
              <input type="text" placeholder="Tìm tên chất liệu..." value={materialSearch} onChange={(e) => setMaterialSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
            </div>
            <button onClick={() => handleOpenMaterialModal()} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-glow-amber cursor-pointer">
              <Plus className="w-4.5 h-4.5" strokeWidth={2.5} /> Thêm chất liệu
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/55 dark:bg-slate-800/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-5">ID</th>
                  <th className="py-4 px-5">Tên chất liệu</th>
                  <th className="py-4 px-5">Mô tả</th>
                  <th className="py-4 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                {filteredMaterials.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                    <td className="py-3 px-5 text-slate-400 text-xs font-bold">{m.id}</td>
                    <td className="py-3 px-5 font-semibold text-slate-900 dark:text-slate-200">{m.name}</td>
                    <td className="py-3 px-5 text-slate-500 dark:text-slate-400">{m.description || 'N/A'}</td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => handleOpenMaterialModal(m)} className="p-1.5 text-slate-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-lg cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteMaterial(m.id)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== Modals ===== */}
      {renderModal('Quản lý Thương hiệu', showBrandModal, () => setShowBrandModal(false), handleSaveBrand, (
        <>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tên thương hiệu *</label>
            <input type="text" required value={brandForm.name} onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="Ví dụ: Uniqlo" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quốc gia</label>
            <input type="text" value={brandForm.country || ''} onChange={(e) => setBrandForm({ ...brandForm, country: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="Ví dụ: Nhật Bản" />
          </div>
        </>
      ))}

      {renderModal('Quản lý Màu sắc', showColorModal, () => setShowColorModal(false), handleSaveColor, (
        <>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tên màu sắc *</label>
            <input type="text" required value={colorForm.name} onChange={(e) => setColorForm({ ...colorForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="Ví dụ: Xanh Navy" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mã Hex Code</label>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative cursor-pointer" style={{ backgroundColor: colorForm.hex_code }}>
                <input type="color" value={colorForm.hex_code} onChange={(e) => setColorForm({ ...colorForm, hex_code: e.target.value })} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
              </div>
              <input type="text" value={colorForm.hex_code} onChange={(e) => setColorForm({ ...colorForm, hex_code: e.target.value })}
                className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="#1E3A8A" />
            </div>
          </div>
        </>
      ))}

      {renderModal('Quản lý Chất liệu', showMaterialModal, () => setShowMaterialModal(false), handleSaveMaterial, (
        <>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tên chất liệu *</label>
            <input type="text" required value={materialForm.name} onChange={(e) => setMaterialForm({ ...materialForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none" placeholder="Ví dụ: Silk" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mô tả</label>
            <textarea rows={3} value={materialForm.description || ''} onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs focus:outline-none" placeholder="Ví dụ: Vải lụa mềm mại sang trọng..." />
          </div>
        </>
      ))}
    </div>
  )
}
