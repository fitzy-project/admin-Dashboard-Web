import React, { useState } from 'react'
import {
  Settings,
  Shield,
  FileText,
  UserCheck,
  UserX,
  Server,
  HardDrive,
  Database,
  Save,
  Key,
} from 'lucide-react'
import {
  adminAccounts,
  rolesList,
  systemLogs,
  systemConfig,
  storageStats,
} from '../data/mockData.js'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('config')
  const [admins, setAdmins] = useState(adminAccounts)
  const [logs, setLogs] = useState(systemLogs)
  const [config, setConfig] = useState(systemConfig)

  function toggleAdminStatus(username) {
    setAdmins((current) =>
      current.map((adm) =>
        adm.username === username
          ? { ...adm, status: adm.status === 'active' ? 'suspended' : 'active' }
          : adm
      )
    )
    // Add a system log entry dynamically
    const newLog = {
      id: `LOG-${Math.max(...logs.map((l) => parseInt(l.id.replace('LOG-', ''), 10))) + 1}`,
      timestamp: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
      type: 'Access Mod',
      actor: 'duc.nguyen',
      message: `Thay đổi trạng thái quản trị viên @${username}`,
    }
    setLogs([newLog, ...logs])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Hệ thống & Cài đặt (Settings)
          </h1>
          <p className="text-sm text-mute mt-1">
            Cấu hình tham số hệ thống, quản trị tài khoản phân quyền RBAC và theo dõi nhật ký hoạt động.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex rounded-xl border border-line bg-white p-1 shadow-card">
          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              activeTab === 'config' ? 'bg-ink text-white' : 'text-mute hover:bg-slate-50 hover:text-ink'
            }`}
          >
            <Server className="h-4 w-4" />
            Cấu hình & Storage
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rbac')}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              activeTab === 'rbac' ? 'bg-ink text-white' : 'text-mute hover:bg-slate-50 hover:text-ink'
            }`}
          >
            <Shield className="h-4 w-4" />
            Phân quyền (RBAC)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              activeTab === 'logs' ? 'bg-ink text-white' : 'text-mute hover:bg-slate-50 hover:text-ink'
            }`}
          >
            <FileText className="h-4 w-4" />
            Nhật ký hệ thống
          </button>
        </div>
      </div>

      {/* Tab CONTENT 1: System Config & Storage Monitor */}
      {activeTab === 'config' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Storage Monitors */}
            <div className="bg-white border border-line rounded-2xl p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-ink text-base">Bộ nhớ đối tượng (MinIO)</h3>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                  {storageStats.minio.status}
                </span>
              </div>
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-mute">MinIO Buckets Space:</span>
                    <span className="text-ink">{storageStats.minio.usedSize} / {storageStats.minio.totalSize}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-line">
                    <p className="text-mute font-bold uppercase tracking-wider">Buckets</p>
                    <p className="font-display font-bold text-ink mt-0.5">{storageStats.minio.bucketCount}</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-line">
                    <p className="text-mute font-bold uppercase tracking-wider">Tổng ảnh lưu trữ</p>
                    <p className="font-display font-bold text-ink mt-0.5">{storageStats.minio.fileCount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-line rounded-2xl p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-900/10 rounded-xl text-slate-800">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-ink text-base">SQL Server 2014</h3>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                  {storageStats.sqlServer.status}
                </span>
              </div>
              <div className="space-y-3.5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-line rounded-xl">
                    <span className="text-[10px] text-mute font-bold uppercase tracking-wider block">Kích thước Data</span>
                    <span className="text-sm font-display font-bold text-ink mt-0.5 block">{storageStats.sqlServer.dbSize}</span>
                  </div>
                  <div className="p-3 border border-line rounded-xl">
                    <span className="text-[10px] text-mute font-bold uppercase tracking-wider block">Kích thước Logs</span>
                    <span className="text-sm font-display font-bold text-ink mt-0.5 block">{storageStats.sqlServer.logSize}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <p className="text-[10px] text-mute font-bold uppercase tracking-wider">Tên DB</p>
                    <p className="font-bold text-ink mt-0.5">{storageStats.sqlServer.dbName}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <p className="text-[10px] text-mute font-bold uppercase tracking-wider">Kết nối</p>
                    <p className="font-bold text-ink mt-0.5">{storageStats.sqlServer.connectionCount}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <p className="text-[10px] text-mute font-bold uppercase tracking-wider">Số Bảng</p>
                    <p className="font-bold text-ink mt-0.5">{storageStats.sqlServer.tableCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Settings Configurations */}
          <div className="bg-white border border-line rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="font-display text-lg font-bold text-ink border-b border-slate-50 pb-2">Tham số cấu hình toàn cục</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-mute">Định dạng ảnh được phép</span>
                <input
                  type="text"
                  value={config.allowedFileTypes}
                  onChange={(e) => setConfig({ ...config, allowedFileTypes: e.target.value })}
                  className="w-full rounded-xl border border-line px-3 py-2 text-sm font-mono font-semibold text-ink outline-none focus:border-amber-500"
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-mute">Dung lượng tải lên tối đa (Bytes)</span>
                <input
                  type="number"
                  value={config.maxUploadSizeBytes}
                  onChange={(e) => setConfig({ ...config, maxUploadSizeBytes: parseInt(e.target.value, 10) })}
                  className="w-full rounded-xl border border-line px-3 py-2 text-sm font-mono font-semibold text-ink outline-none focus:border-amber-500"
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-mute">Redis Endpoint</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={config.redisHost}
                    onChange={(e) => setConfig({ ...config, redisHost: e.target.value })}
                    className="w-2/3 rounded-xl border border-line px-3 py-2 text-sm font-mono font-semibold text-ink outline-none focus:border-amber-500"
                  />
                  <input
                    type="number"
                    value={config.redisPort}
                    onChange={(e) => setConfig({ ...config, redisPort: parseInt(e.target.value, 10) })}
                    className="w-1/3 rounded-xl border border-line px-3 py-2 text-sm font-mono font-semibold text-ink outline-none focus:border-amber-500"
                  />
                </div>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-mute">MinIO Endpoint S3</span>
                <input
                  type="text"
                  value={config.minioEndpoint}
                  onChange={(e) => setConfig({ ...config, minioEndpoint: e.target.value })}
                  className="w-full rounded-xl border border-line px-3 py-2 text-sm font-mono font-semibold text-ink outline-none focus:border-amber-500"
                />
              </label>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2.5 text-sm font-bold hover:bg-slate-800 transition-colors shadow-card"
              >
                <Save className="w-4 h-4" /> Lưu cấu hình
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab CONTENT 2: Role Management & Admins list */}
      {activeTab === 'rbac' && (
        <div className="space-y-6">
          {/* Admin Table */}
          <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden">
            <div className="p-5 border-b border-line flex justify-between items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-ink">Thành viên Ban quản trị</h3>
                <p className="text-xs text-mute font-semibold">Cấp quyền truy cập hệ thống theo đúng vai trò nghiên cứu</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-line bg-slate-50/50 text-xs uppercase tracking-wider text-mute font-bold">
                    <th className="px-6 py-4">Nhân viên</th>
                    <th className="px-6 py-4">Username</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Vai trò (Role)</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admins.map((adm) => (
                    <tr key={adm.username} className="hover:bg-slate-50/20">
                      <td className="px-6 py-4 font-bold text-ink">{adm.name}</td>
                      <td className="px-6 py-4 text-mute font-semibold">@{adm.username}</td>
                      <td className="px-6 py-4 text-mute">{adm.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border
                          ${
                            adm.role === 'Super Admin'
                              ? 'bg-purple-50 border-purple-200 text-purple-750'
                              : adm.role === 'Stylist Lead'
                              ? 'bg-amber-50 border-amber-200 text-amber-700'
                              : 'bg-blue-50 border-blue-200 text-blue-700'
                          }`}
                        >
                          {adm.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border
                          ${adm.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}
                        >
                          {adm.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => toggleAdminStatus(adm.username)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border
                            ${
                              adm.status === 'active'
                                ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                            }`}
                        >
                          {adm.status === 'active' ? (
                            <>
                              <UserX className="w-3.5 h-3.5" /> Khóa
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3.5 h-3.5" /> Kích hoạt
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Roles Permission Explanation */}
          <div className="bg-white border border-line rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="font-display text-base font-bold text-ink flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-500" /> Bản đồ phân quyền chức năng
            </h3>
            <div className="divide-y divide-slate-100">
              {rolesList.map((r, idx) => (
                <div key={idx} className="py-3.5 grid gap-2 md:grid-cols-4 text-sm">
                  <span className="font-bold text-slate-800">{r.role}</span>
                  <span className="md:col-span-3 text-mute font-semibold leading-relaxed">{r.permissions}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab CONTENT 3: System Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden">
          <div className="p-5 border-b border-line">
            <h3 className="font-display text-lg font-bold text-ink">Nhật ký tác vụ hệ thống (System Logs)</h3>
            <p className="text-xs text-mute font-semibold">Theo dõi vết thay đổi cấu hình, cập nhật luật phối đồ và triển khai AI models.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-line bg-slate-50/50 text-xs uppercase tracking-wider text-mute font-bold">
                  <th className="px-6 py-4">Thời gian</th>
                  <th className="px-6 py-4">Loại tác vụ</th>
                  <th className="px-6 py-4">Tài khoản thực hiện</th>
                  <th className="px-6 py-4">Nội dung chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/20">
                    <td className="px-6 py-3.5 text-slate-500">{log.timestamp}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] border
                        ${
                          log.type === 'Config Change'
                            ? 'bg-amber-50 border-amber-200 text-amber-700'
                            : log.type === 'Rule Override'
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : 'bg-blue-50 border-blue-200 text-blue-700'
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-slate-800">@{log.actor}</td>
                    <td className="px-6 py-3.5 text-slate-700 font-semibold">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
