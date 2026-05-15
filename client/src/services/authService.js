import api from './api';
import { useAuthStore } from '../store/authStore';

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const logout = async () => {
  const { refreshToken } = useAuthStore.getState();
  try { await api.post('/auth/logout', { refreshToken }); } catch {}
  useAuthStore.getState().logout();
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.put('/auth/me', payload);
  return data;
};
