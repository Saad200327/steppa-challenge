import api from './api'
export const googleFitService = {
  getAuthUrl: () => api.get('/auth/connect/google-fit'),
  sync: () => api.post('/steps/sync'),
}
