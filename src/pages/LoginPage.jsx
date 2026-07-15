import React, { useState } from 'react'
import { ShieldAlert, LogIn, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { adminAccounts } from '../data/mockData.js'

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate network delay
    setTimeout(() => {
      const foundAdmin = adminAccounts.find(
        (adm) => adm.username === username.trim()
      )

      if (!foundAdmin) {
        setError('Tài khoản quản trị viên không tồn tại!')
        setIsLoading(false)
        return
      }

      if (foundAdmin.status !== 'active') {
        setError('Tài khoản của bạn đã bị khóa hoặc đình chỉ hoạt động!')
        setIsLoading(false)
        return
      }

      if (foundAdmin.password !== password) {
        setError('Mật khẩu không khớp!')
        setIsLoading(false)
        return
      }

      // Success
      setIsLoading(false)
      onLoginSuccess(foundAdmin)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Background glow graphics */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">
              Fitzy Admin Portal
            </h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Trung tâm điều phối tri thức & AI
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-start gap-3 text-rose-400 text-xs font-semibold leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tên tài khoản (Username)</span>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="duc.nguyen"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm font-semibold text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-600"
              />
            </div>
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mật khẩu (Password)</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/50 py-2.5 pl-10 pr-10 text-sm font-semibold text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label="Xem mật khẩu"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-50 text-slate-950 py-3 text-sm font-bold transition-all shadow-[0_4px_20px_rgba(245,158,11,0.2)] mt-2"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4.5 text-xs text-slate-400 space-y-2">
          <p className="font-bold text-slate-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Tài khoản thử nghiệm (Demo Credentials)
          </p>
          <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
            <div className="bg-slate-900 border border-slate-800/50 p-2 rounded-xl">
              <span className="block text-slate-500">Super Admin:</span>
              <span className="block text-slate-200">duc.nguyen</span>
              <span className="block text-slate-400">Pass: admin123</span>
            </div>
            <div className="bg-slate-900 border border-slate-800/50 p-2 rounded-xl">
              <span className="block text-slate-500">Stylist Lead:</span>
              <span className="block text-slate-200">stylist.thao</span>
              <span className="block text-slate-400">Pass: admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
