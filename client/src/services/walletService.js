import api from './api';

export const getWallet = async () => {
  const { data } = await api.get('/wallet');
  return data;
};

export const deposit = async (amount) => {
  const { data } = await api.post('/wallet/deposit', { amount });
  return data;
};

export const getTransactions = async () => {
  const { data } = await api.get('/wallet/transactions');
  return data;
};
