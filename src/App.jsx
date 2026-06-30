import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'

export default function App() {
  const [active, setActive] = useState('dashboard')

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar active={active} onNavigate={setActive} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6">
          {active === 'dashboard' ? (
            <DashboardPage />
          ) : (
            <PlaceholderPage pageKey={active} />
          )}
        </main>
      </div>
    </div>
  )
}
