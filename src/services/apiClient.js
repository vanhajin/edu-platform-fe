import axios from 'axios'
import { requireApiUrl } from '../config/apiUrls.js'

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
      const originalRequest = error.config

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = localStorage.getItem('refresh_token')

        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
              refreshToken,
            })
            const accessToken =
              refreshResponse.data.accessToken ?? refreshResponse.data.data?.accessToken

            if (accessToken) {
              localStorage.setItem('access_token', accessToken)
              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              return client(originalRequest)
            }
          } catch {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('auth_user')
            window.location.href = '/login'
          }
        }
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
