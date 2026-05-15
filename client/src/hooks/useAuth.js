import { useCallback } from 'react'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

export function useAuth() {
  const { user, token, login, logout } = useAuthStore()
  const handleLogin = useCallback(async (email, password) => {
    const { data } = await authService.login({ email, password })
    login(data.user, data.accessToken, data.refreshToken)
    return data
  }, [login])
  const handleLogout = useCallback(async () => {
    try { await authService.logout() } catch {}
    logout()
    toast.success('Logged out')
  }, [logout])
  return { user, token, login: handleLogin, logout: handleLogout, isAuthenticated: !!token }
}
