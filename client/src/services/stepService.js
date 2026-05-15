import api from './api';

export const getTodaySteps = async () => {
  const { data } = await api.get('/steps/today');
  return data;
};

export const submitManualSteps = async (steps, proofUrl) => {
  const { data } = await api.post('/steps/manual', { steps, proofUrl });
  return data;
};

export const syncSteps = async () => {
  const { data } = await api.post('/steps/sync');
  return data;
};

export const getStepHistory = async () => {
  const { data } = await api.get('/steps/history');
  return data;
};
