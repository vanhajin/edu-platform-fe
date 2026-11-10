import { courseApiClient } from '../apiClient.js';
export const courseService = {
    getCourses: (filters) => courseApiClient.get('/courses', { params: filters }),
    createCourse: (data) => courseApiClient.post('/courses', data)
};
