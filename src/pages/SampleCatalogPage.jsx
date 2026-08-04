import React, { useState, useEffect } from 'react'
import api from '../services/api.js'
import { Plus, Edit2, Trash2, Search, Filter, Download, X, Upload, Loader2 } from 'lucide-react'

// Subcategory lists mapped to main categories (sử dụng slug/name đồng bộ DB)
const subcategoriesMap = {
  'Áo': [
    { value: 't-shirts', label: 't-shirts (Áo thun cổ tròn/V/họa tiết)' },
    { value: 'shirts', label: 'shirts (Sơ mi)' },
    { value: 'blouses', label: 'blouses (Áo kiểu nữ)' },
    { value: 'long_sleeved_tops', label: 'long_sleeved_tops (Tay dài)' },
    { value: 'short_sleeve_tops', label: 'short_sleeve_tops (Tay ngắn)' },
    { value: 'sleeveless_and_tank_tops', label: 'sleeveless_and_tank_tops (Ba lỗ/2 dây)' },
    { value: 'jackets', label: 'jackets (Áo khoác)' },
  ],
  'Quần': [
    { value: 'full_length_pants', label: 'full_length_pants (Quần dài)' },
    { value: 'straight-leg_pants', label: 'straight-leg_pants (Ống đứng)' },
    { value: 'wide-leg_and_palazzo_pants', label: 'wide-leg_and_palazzo_pants (Ống rộng/Palazzo)' },
    { value: 'cropped_pants', label: 'cropped_pants (Quần lửng/9 tấc)' },
    { value: 'skinny_pants', label: 'skinny_pants (Quần ôm)' },
    { value: 'cargo_pants', label: 'cargo_pants (Quần túi hộp)' },
  ],
  'Đồ bộ': [
    { value: 'lounge_sets', label: 'lounge_sets (Bộ mặc nhà/nỉ)' },
    { value: 'sport_sets', label: 'sport_sets (Bộ thể thao)' },
  ]
}

export default function SampleCatalogPage() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [colors, setColors] = useState([])
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Form / Modal State
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add') // 'add' or 'edit'
  const [currentItemId, setCurrentItemId] = useState(null)
  
  // Form values
  const [formName, setFormName] = useState('')
  const [formCategoryId, setFormCategoryId] = useState('')
  const [formSubcategory, setFormSubcategory] = useState('t-shirts')
  const [formBrandId, setFormBrandId] = useState('')
  const [formColorId, setFormColorId] = useState('')
  const [formMaterial, setFormMaterial] = useState('')
  const [formSeason, setFormSeason] = useState('all')
  const [formTags, setFormTags] = useState('Casual')
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    fetchMetadataAndItems()
  }, [])

  const fetchMetadataAndItems = async () => {
    setLoading(true)
    try {
      const [itemsRes, catRes, brandRes, colorRes, matRes] = await Promise.all([
        api.getSampleItems(),
        api.getCategories(),
        api.getBrands(),
        api.getColors(),
        api.getMaterials()
      ])
      setItems(itemsRes)
      setCategories(catRes)
      setBrands(brandRes)
      setColors(colorRes)
      setMaterials(matRes)
      
      if (catRes.length > 0) setFormCategoryId(catRes[0].id)
      if (brandRes.length > 0) setFormBrandId(brandRes[0].id)
      if (colorRes.length > 0) setFormColorId(colorRes[0].id)
      if (matRes.length > 0) setFormMaterial(matRes[0].name)
    } catch (err) {
      console.error("Lỗi lấy dữ liệu mẫu:", err)
    } finally {
      setLoading(false)
    }
  }

  // Filter & Search Logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.brand_rel?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category_rel?.name === categoryFilter
    const matchesBrand = brandFilter === 'all' || item.brand_rel?.name === brandFilter
    return matchesSearch && matchesCategory && matchesBrand
  })

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle Form Category changes (resets subcategory dynamically)
  function handleFormCategoryChange(catId) {
    setFormCategoryId(catId)
    const cat = categories.find(c => c.id === parseInt(catId))
    if (cat) {
      const availableSubs = subcategoriesMap[cat.name]
      if (availableSubs && availableSubs.length > 0) {
        setFormSubcategory(availableSubs[0].value)
      }
    }
  }

  // Open Add Modal
  function handleOpenAdd() {
    setModalMode('add')
    setCurrentItemId(null)
    setFormName('')
    if (categories.length > 0) handleFormCategoryChange(categories[0].id)
    if (brands.length > 0) setFormBrandId(brands[0].id)
    if (colors.length > 0) setFormColorId(colors[0].id)
    if (materials.length > 0) setFormMaterial(materials[0].name)
    setFormSeason('all')
    setFormTags('Casual')
    setFormImage('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80')
    setShowModal(true)
  }

  // Open Edit Modal
  function handleOpenEdit(item) {
    setModalMode('edit')
    setCurrentItemId(item.id)
    setFormName(item.name || '')
    setFormCategoryId(item.category_id || '')
    setFormSubcategory(item.sub_category || 't-shirts')
    setFormBrandId(item.brand_id || '')
    setFormColorId(item.color_id || '')
    setFormMaterial(item.material || '')
    setFormSeason(item.season || 'all')
    setFormTags(item.style_tag || 'Casual')
    setFormImage(item.image_url || '')
    setShowModal(true)
  }

  // Handle Delete
  async function handleDelete(id) {
    if (window.confirm('Bạn có chắc chắn muốn xóa món đồ mẫu này?')) {
      try {
        await api.deleteSampleItem(id)
        setItems(items.filter(item => item.id !== id))
        if (currentPage > 1 && paginatedItems.length === 1) {
          setCurrentPage(currentPage - 1)
        }
      } catch (err) {
        alert("Lỗi xóa món đồ mẫu: " + err.message)
      }
    }
  }

  // Handle Submit Form
  async function handleSubmit(e) {
    e.preventDefault()
    if (!formName.trim()) {
      alert('Vui lòng điền tên món đồ!')
      return
    }

    const payload = {
      name: formName,
      image_url: formImage,
      category_id: parseInt(formCategoryId),
      brand_id: parseInt(formBrandId),
      color_id: parseInt(formColorId),
      material: formMaterial,
      season: formSeason,
      style_tag: formTags,
      sub_category: formSubcategory,
      is_favorite: false,
      is_archived: false,
      price: 0.0
    }

    try {
      if (modalMode === 'add') {
        const newItem = await api.createSampleItem(payload)
        setItems([newItem, ...items])
      } else {
        const updatedItem = await api.updateSampleItem(currentItemId, payload)
        setItems(items.map(it => it.id === currentItemId ? updatedItem : it))
      }
      setShowModal(false)
    } catch (err) {
      alert("Lỗi lưu món đồ mẫu: " + err.message)
    }
  }

  // Real Image Upload
  async function handleImageFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    await uploadFile(file)
  }

  async function uploadFile(file) {
    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await api.uploadImage(formData)
      const imageUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${res.url}`
      setFormImage(imageUrl)
    } catch (err) {
      alert("Lỗi tải ảnh lên: " + err.message)
    } finally {
      setUploadingImage(false)
    }
  }

  // Drag and Drop
  function handleDragOver(e) {
    e.preventDefault()
    setDragOver(true)
  }
  function handleDragLeave() {
    setDragOver(false)
  }
  async function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      await uploadFile(file)
    }
  }

  // Export CSV
  function handleExportCSV() {
    const headers = ['ID', 'Tên món đồ', 'Danh mục', 'Danh mục con', 'Thương hiệu', 'Màu sắc', 'Chất liệu', 'Mùa', 'Style Tag']
    const rows = filteredItems.map((i) => [
      i.id,
      i.name,
      i.category_rel?.name || '',
      i.sub_category || '',
      i.brand_rel?.name || '',
      i.color_rel?.name || '',
      i.material || '',
      i.season || '',
      i.style_tag || '',
    ])

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n')
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `fitzy_sample_catalog_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center gap-3 text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <span className="text-sm font-semibold">Đang tải kho quần áo mẫu...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors">
            Quản lý Thư viện Mẫu
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">
            Quản lý kho danh mục quần áo mẫu chuẩn hóa để người dùng di động nạp nhanh vào tủ đồ cá nhân.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-white dark:bg-slate-900 shadow-sm text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Xuất CSV
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-glow-amber cursor-pointer transition-all"
          >
            <Plus className="w-4.5 h-4.5" strokeWidth={2.5} /> Thêm món mẫu
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md group">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500 transition-colors" />
          <input
            type="text"
            placeholder="Tìm theo tên món, thương hiệu..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>

        {/* Category & Brand Select Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" /> Lọc theo:
          </div>
          
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            className="px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="all">Tất cả Danh mục</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>

          {/* Brand Filter */}
          <select
            value={brandFilter}
            onChange={(e) => { setBrandFilter(e.target.value); setCurrentPage(1); }}
            className="px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="all">Tất cả Thương hiệu</option>
            {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
          </select>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
            {/* Image Wrap */}
            <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                {item.category_rel?.name || 'Mẫu'}
              </span>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded shrink-0">
                    ID: {item.id}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Subcategory: {item.sub_category}</p>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 dark:border-slate-800/60 pt-4">
                <div>
                  <span className="text-slate-400 font-medium block">Thương hiệu</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{item.brand_rel?.name || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Màu sắc</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
                    <span className="w-3.5 h-3.5 rounded border border-slate-200 dark:border-slate-700 shadow-sm" style={{ backgroundColor: item.color_rel?.hex_code }} />
                    <span>{item.color_rel?.name || 'N/A'}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Chất liệu</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{item.material || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Mùa / Style Tag</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 capitalize">{item.season} / {item.style_tag}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-rose-100 dark:border-rose-950/20 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-400 dark:text-slate-500 font-semibold">Không tìm thấy món đồ mẫu nào phù hợp.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 disabled:opacity-40 cursor-pointer"
          >
            Trở lại
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 disabled:opacity-40 cursor-pointer"
          >
            Tiếp theo
          </button>
        </div>
      )}

      {/* Modal Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm grid place-items-center p-4 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-slate-900 dark:text-white">
                {modalMode === 'add' ? 'Thêm mới món đồ mẫu' : 'Chỉnh sửa món mẫu'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto">
                {/* Column 1: Image & Upload */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Ảnh sản phẩm mẫu</span>
                  
                  {/* Preview Container */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`aspect-video rounded-2xl border-2 border-dashed relative overflow-hidden flex flex-col justify-center items-center transition-all ${
                      dragOver ? 'border-amber-500 bg-amber-500/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50'
                    }`}
                  >
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
                        <span className="text-xs text-slate-400 font-semibold">Đang tải ảnh lên...</span>
                      </div>
                    ) : formImage ? (
                      <>
                        <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormImage('')}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 text-white hover:bg-slate-900 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 animate-bounce" />
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Kéo thả ảnh hoặc click chọn</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Manual URL input fallback */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hoặc nhập ảnh URL tĩnh</label>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Column 2: Metadata */}
                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tên sản phẩm *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ví dụ: Áo sơ mi lụa tơ tằm"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Danh mục chính</label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => handleFormCategoryChange(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Danh mục con (Subcategory)</label>
                    <select
                      value={formSubcategory}
                      onChange={(e) => setFormSubcategory(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      {(() => {
                        const selectedCat = categories.find(c => c.id === parseInt(formCategoryId))
                        const list = selectedCat ? subcategoriesMap[selectedCat.name] : null
                        if (!list) return <option value="other">Chưa có danh mục con</option>
                        return list.map(sub => <option key={sub.value} value={sub.value}>{sub.label}</option>)
                      })()}
                    </select>
                  </div>

                  {/* Brand */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Thương hiệu</label>
                    <select
                      value={formBrandId}
                      onChange={(e) => setFormBrandId(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      {brands.map(b => <option key={b.id} value={b.id}>{b.name} ({b.country})</option>)}
                    </select>
                  </div>

                  {/* Color */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Màu sắc chuẩn</label>
                    <select
                      value={formColorId}
                      onChange={(e) => setFormColorId(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      {colors.map(c => <option key={c.id} value={c.id}>{c.name} ({c.hex_code})</option>)}
                    </select>
                  </div>

                  {/* Material */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Chất liệu chính</label>
                    <select
                      value={formMaterial}
                      onChange={(e) => setFormMaterial(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      {materials.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                      {materials.length === 0 && <option value="Cotton">Cotton</option>}
                    </select>
                  </div>

                  {/* Season */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mùa sử dụng</label>
                    <select
                      value={formSeason}
                      onChange={(e) => setFormSeason(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="all">Tất cả</option>
                      <option value="spring">Xuân</option>
                      <option value="summer">Hè</option>
                      <option value="fall">Thu</option>
                      <option value="winter">Đông</option>
                    </select>
                  </div>

                  {/* Tags */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Style Tag (cách nhau bởi dấu phẩy)</label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="Ví dụ: Casual, Elegant"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4.5 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-500 text-white shadow-glow-amber cursor-pointer"
                >
                  {modalMode === 'add' ? 'Thêm mới' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
