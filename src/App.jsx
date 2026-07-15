import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import ColorsPage from './pages/ColorsPage.jsx'
import ColorCompatPage from './pages/ColorCompatPage.jsx'
import ClothingRulesPage from './pages/ClothingRulesPage.jsx'
import AiAnalysisPage from './pages/AiAnalysisPage.jsx'
import RecommendationsPage from './pages/RecommendationsPage.jsx'
import AiModelsPage from './pages/AiModelsPage.jsx'
import DatasetPage from './pages/DatasetPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [active, setActive] = useState('dashboard')

  function handleLoginSuccess(user) {
    setCurrentUser(user)
    setIsAuthenticated(true)
  }

  function handleLogout() {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setActive('dashboard')
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar active={active} onNavigate={setActive} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar currentUser={currentUser} onLogout={handleLogout} />
        <main className="flex-1 p-6">
          {active === 'dashboard' ? (
            <DashboardPage />
          ) : active === 'categories' ? (
            <CategoriesPage />
          ) : active === 'colors' ? (
            <ColorsPage />
          ) : active === 'color-compat' ? (
            <ColorCompatPage />
          ) : active === 'clothing-rules' ? (
            <ClothingRulesPage />
          ) : active === 'ai-analysis' ? (
            <AiAnalysisPage />
          ) : active === 'recommendations' ? (
            <RecommendationsPage />
          ) : active === 'ai-models' ? (
            <AiModelsPage />
          ) : active === 'dataset' ? (
            <DatasetPage />
          ) : active === 'settings' ? (
            <SettingsPage />
          ) : (
            <div className="p-6">Trang không tồn tại</div>
          )}
        </main>
      </div>
    </div>
  )
}
