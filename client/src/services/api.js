import axios from 'axios'
import { API_URL } from '../utils/constants'
import { useAuthStore } from '../store/authStore'

const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } })

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const orig = err.config
    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true
      try {
        const rt = useAuthStore.getState().refreshToken
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken: rt })
        useAuthStore.getState().setTokens(data.accessToken, data.refreshToken)
        orig.headers.Authorization = `Bearer ${data.accessToken}`
        return api(orig)
      } catch {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api
