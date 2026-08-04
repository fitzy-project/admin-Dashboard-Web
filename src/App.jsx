import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import SampleCatalogPage from './pages/SampleCatalogPage.jsx'
import UserManagementPage from './pages/UserManagementPage.jsx'
import AiRulesPage from './pages/AiRulesPage.jsx'
import AttributesPage from './pages/AttributesPage.jsx'
import AiLogsPage from './pages/AiLogsPage.jsx'
import api from './services/api.js'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [active, setActive] = useState('dashboard')

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      api.getCurrentUser()
        .then(user => {
          if ((user.role === 'Admin' || user.role === 'Stylist') && user.is_active) {
            setCurrentUser(user)
            setIsAuthenticated(true)
          } else {
            api.logout()
          }
        })
        .catch(() => {
          api.logout()
        })
    }
  }, [])

  function handleLoginSuccess(user) {
    setCurrentUser(user)
    setIsAuthenticated(true)
  }

  function handleLogout() {
    api.logout()
    setIsAuthenticated(false)
    setCurrentUser(null)
    setActive('dashboard')
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="flex min-h-screen bg-canvas dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Sidebar active={active} onNavigate={setActive} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar currentUser={currentUser} onLogout={handleLogout} />
        <main className="flex-1 p-6">
          {active === 'dashboard' ? (
            <DashboardPage />
          ) : active === 'sample-catalog' ? (
            <SampleCatalogPage />
          ) : active === 'users' ? (
            <UserManagementPage />
          ) : active === 'ai-rules' ? (
            <AiRulesPage />
          ) : active === 'attributes' ? (
            <AttributesPage />
          ) : active === 'ai-logs' ? (
            <AiLogsPage />
          ) : (
            <div className="p-6">Trang không tồn tại</div>
          )}
        </main>
      </div>
    </div>
  )
}

