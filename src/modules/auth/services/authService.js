import { authApiClient, registerApiClient } from '../../../services/apiClient.js'

export const authService = {
  login: (credentials) => authApiClient.post('/auth/login', credentials),
  register: (formData) => registerApiClient.post('/auth/register', formData),
  resetPassword: (payload) => authApiClient.post('/auth/reset-password', payload),
}
