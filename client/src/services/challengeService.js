import api from './api'
export const challengeService = {
  list: (p) => api.get('/challenges', { params: p }),
  get: (id) => api.get(`/challenges/${id}`),
  create: (d) => api.post('/challenges', d),
  join: (id, d) => api.post(`/challenges/${id}/join`, d),
  getLeaderboard: (id) => api.get(`/challenges/${id}/leaderboard`),
  getHistory: () => api.get('/challenges/history'),
}
