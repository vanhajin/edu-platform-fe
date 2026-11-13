import axios from 'axios'
import { requireApiUrl } from '../config/apiUrls.js'
import { clearAuthSession, saveRefreshedSession } from '../modules/auth/utils/authSession.js'

const fallbackBaseURL = import.meta.env.VITE_API_BASE_URL || requireApiUrl('auth')

export function createApiClient(baseURL = fallbackBaseURL) {
  const client = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  })

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken && !error.config?._retry && !error.config?.url?.endsWith('/refresh')) {
          try {
            const refreshResponse = await axios.post(`${baseURL}/refresh`, { refreshToken })
            const refreshed = saveRefreshedSession(refreshResponse)
            error.config._retry = true
            error.config.headers.Authorization = `Bearer ${refreshed.accessToken}`
            return client(error.config)
          } catch {
            clearAuthSession()
          }
        } else {
          clearAuthSession()
        }
        window.location.href = '/login'
      }

      return Promise.reject(error)
    },
  )

  return client
}

export const authApiClient = createApiClient(
  requireApiUrl('auth'),
)
export const registerApiClient = createApiClient(requireApiUrl('register'))
export const categoryApiClient = createApiClient(requireApiUrl('category'))
export const courseApiClient = createApiClient(
  requireApiUrl('course'),
)
export const orderApiClient = createApiClient(
  requireApiUrl('order'),
)

export default createApiClient()
