import api from './api'
export const stepService = {
  getToday: () => api.get('/steps/today'),
  submitManual: (d) => api.post('/steps/manual', d),
  sync: () => api.post('/steps/sync'),
  getHistory: () => api.get('/steps/history'),
}
