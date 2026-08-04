import React, { useState, useEffect } from 'react'
import api from '../services/api.js'
import { Search, ShieldAlert, Eye, Ban, CheckCircle, X, Shield, Calendar, UserCheck, Loader2 } from 'lucide-react'

export default function UserManagementPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [roleFilter])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await api.getUsers(roleFilter)
      setUsers(res)
    } catch (err) {
      console.error("Lỗi tải danh sách người dùng:", err)
    } finally {
      setLoading(false)
    }
  }

  // Filters logic
  const filteredUsers = users.filter((u) => {
    const displayName = u.full_name || u.username || ''
    const matchesSearch = displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const userStatus = u.is_active ? 'active' : 'banned'
    const matchesStatus = statusFilter === 'all' || userStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  // Toggle Ban / Unban status
  async function handleToggleStatus(userId, currentActive) {
    const actionText = currentActive ? 'khóa' : 'mở khóa'
    if (window.confirm(`Bạn có chắc chắn muốn ${actionText} tài khoản này?`)) {
      try {
        await api.toggleUserStatus(userId, !currentActive)
        setUsers(users.map(u => u.id === userId ? { ...u, is_active: !currentActive } : u))
      } catch (err) {
        alert("Lỗi cập nhật trạng thái: " + err.message)
      }
    }
  }

  // Open User Detail
  function handleOpenDetail(user) {
    setSelectedUser(user)
    setShowDetailModal(true)
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'N/A'
    const date = new Date(dateStr)
    return date.toLocaleDateString('vi-VN')
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center gap-3 text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
        <span className="text-sm font-semibold">Đang tải danh sách người dùng...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors">
          Quản lý Người dùng
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">
          Quản lý tài khoản đăng ký Fitzy, kiểm duyệt quyền lợi Stylist/User và giám sát hồ sơ cá nhân hóa (Body & Style Preferences).
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md group">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Tìm kiếm theo email, tên người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>

        {/* Action Select Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="all">Tất cả Vai trò</option>
            <option value="Admin">Admin</option>
            <option value="Stylist">Stylist</option>
            <option value="User">User</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="all">Tất cả Trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="banned">Bị khóa (Banned)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/55 dark:bg-slate-800/10 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-5">Tên người dùng</th>
                <th className="py-4 px-5">Email</th>
                <th className="py-4 px-5">Ngày đăng ký</th>
                <th className="py-4 px-5">Phân quyền (RBAC)</th>
                <th className="py-4 px-5">Trạng thái</th>
                <th className="py-4 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
              {filteredUsers.map((user) => {
                const displayName = user.full_name || user.username || 'User'
                const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2)
                return (
                  <tr key={user.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                    {/* Name Initials & Display Name */}
                    <td className="py-3 px-5 font-semibold text-slate-900 dark:text-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8.5 h-8.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold grid place-items-center text-xs shadow-sm">
                          {initials.toUpperCase()}
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-900 dark:text-slate-200">{displayName}</span>
                          <span className="block text-[10px] text-slate-400 text-left">ID: {user.id}</span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Email */}
                    <td className="py-3 px-5 text-slate-600 dark:text-slate-400 font-medium">{user.email}</td>
                    
                    {/* Register Date */}
                    <td className="py-3 px-5 text-slate-500 dark:text-slate-400 text-xs font-bold">{formatDate(user.created_at)}</td>
                    
                    {/* RBAC Role Select */}
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {user.role}
                        </span>
                      </div>
                    </td>
                    
                    {/* Status Badge */}
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border
                        ${user.is_active 
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40' 
                          : 'bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/40'}`}>
                        {user.is_active ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <ShieldAlert className="w-3 h-3" />
                        )}
                        {user.is_active ? 'Đang hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    
                    {/* Action Buttons */}
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(user)}
                          className="p-1.5 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors cursor-pointer"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id, user.is_active)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer
                            ${user.is_active
                              ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20'
                              : 'text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                            }`}
                          title={user.is_active ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                        >
                          {user.is_active ? (
                            <Ban className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 dark:text-slate-500">
                    Không tìm thấy người dùng nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transition-all duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Hồ sơ Người dùng Chi tiết
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500 text-white font-bold text-lg grid place-items-center shadow-md">
                  {(selectedUser.full_name || selectedUser.username || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{selectedUser.full_name || selectedUser.username}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{selectedUser.email}</p>
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 px-1.5 py-0.5 rounded mt-1.5 border border-indigo-200/20">
                    {selectedUser.role}
                  </span>
                </div>
              </div>

              {/* Stats & Personalization Details */}
              <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {/* Wardrobe count */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Tủ đồ cá nhân:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded-lg border border-indigo-200/20">
                    {selectedUser.item_count} món đồ đã lưu
                  </span>
                </div>

                {/* Body Info */}
                <div className="flex items-center justify-between py-3.5 first:pt-1">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Hồ sơ hình thể:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedUser.height_cm ? `${selectedUser.height_cm} cm / ${selectedUser.weight_kg} kg` : 'Chưa cập nhật'}
                  </span>
                </div>

                {/* Size Info */}
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Size Áo / Quần:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedUser.top_size ? `Top: ${selectedUser.top_size} | Bottom: ${selectedUser.bottom_size}` : 'Chưa cập nhật'}
                  </span>
                </div>

                {/* Style Preferences */}
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Gu phối đồ ưa thích:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">{selectedUser.style_preference || 'Chưa thiết lập'}</span>
                </div>

                {/* Phone number */}
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Số điện thoại:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedUser.phone_number || 'N/A'}</span>
                </div>

                {/* Registration Date */}
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1"><Calendar className="w-4 h-4" /> Ngày đăng ký:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{formatDate(selectedUser.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 dark:hover:bg-slate-700 text-white cursor-pointer"
              >
                Đóng hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
