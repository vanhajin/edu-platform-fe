import { categoryApiClient } from '../apiClient.js'

export const categoryService = {
  getCategories: (params) => categoryApiClient.get('/categories', { params }),
  createCategory: (data) => categoryApiClient.post('/categories', data),
}
