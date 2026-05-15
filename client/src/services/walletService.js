import api from './api'
export const walletService = {
  get: () => api.get('/wallet'),
  deposit: (d) => api.post('/wallet/deposit', d),
  withdraw: (d) => api.post('/wallet/withdraw', d),
  getTransactions: (p) => api.get('/wallet/transactions', { params: p }),
}
