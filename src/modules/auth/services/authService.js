import { authApiClient, createApiClient } from '../../../services/apiClient.js'

const authServiceApiClient = import.meta.env.DEV
  ? createApiClient('/auth-proxy')
  : authApiClient

export const authService = {
  login: (credentials) => authServiceApiClient.post('/login', credentials),
  refresh: (refreshToken) => authServiceApiClient.post('/refresh', { refreshToken }),
  register: (formData) => authServiceApiClient.post('/register-student', formData),
  resetPassword: (payload) =>
    authServiceApiClient.post('/reset-password', payload),
}
