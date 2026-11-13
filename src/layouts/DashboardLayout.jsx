import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import Header from '../components/dashboard/Header.jsx'
import { roleDashboardConfig } from '../components/dashboard/roleDashboardConfig.js'
import './dashboard.css'
import './dashboard-overrides.css'
import { authService } from '../modules/auth/services/authService.js'
import { clearAuthSession, isTokenExpired, saveRefreshedSession } from '../modules/auth/utils/authSession.js'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('access_token')
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  useEffect(() => {
    let timeout
    async function verifySession() {
      if (!accessToken) {
        clearAuthSession()
        navigate('/login', { replace: true })
        return
      }

      if (isTokenExpired(accessToken)) {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
          clearAuthSession()
          navigate('/login', { replace: true })
          return
        }

        try {
          const response = await authService.refresh(refreshToken)
          saveRefreshedSession(response)
        } catch {
          clearAuthSession()
          navigate('/login', { replace: true })
          return
        }
      }

      const currentToken = localStorage.getItem('access_token')
      const payload = JSON.parse(atob(currentToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
      timeout = window.setTimeout(verifySession, Math.max(payload.exp * 1000 - Date.now(), 0))
      setIsCheckingSession(false)
    }

    verifySession()
    return () => window.clearTimeout(timeout)
  }, [accessToken, navigate])

  if (isCheckingSession) return null
  if (!localStorage.getItem('access_token')) return <Navigate to="/login" replace />
  const role = location.pathname.split('/').filter(Boolean)[0] || 'student'
  const config = roleDashboardConfig[role] ?? roleDashboardConfig.student
  const current = location.pathname.split('/').filter(Boolean).at(-1)
  const currentItem = config.groups.flatMap((group) => group.items).find(([to]) => to === location.pathname)
  const title = currentItem?.[2] ?? current.replaceAll('-', ' ')
  const toggleSidebar = () => setCollapsed((value) => !value)
  return <div className={collapsed ? 'dashboard-shell collapsed' : 'dashboard-shell'}><Sidebar groups={config.groups} role={role} /><div className="app"><Header title={title} account={config.account} onToggle={toggleSidebar} /><main className="main"><Outlet /></main></div></div>
}
