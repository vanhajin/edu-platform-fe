import { authApiClient, createApiClient } from '../../../services/apiClient.js'

const registrationApiClient = import.meta.env.DEV
  ? createApiClient('/auth-proxy')
  : authApiClient

export const authService = {
  login: (credentials) => authApiClient.post('/auth/login', credentials),
  register: (formData) => registrationApiClient.post('/register-student', formData),
  resetPassword: (payload) => authApiClient.post('/auth/reset-password', payload),
}
