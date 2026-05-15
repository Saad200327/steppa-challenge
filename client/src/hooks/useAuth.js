import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { getMe } from '../services/authService';

export const useAuth = () => {
  const { user, token, setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      setLoading(true);
      getMe()
        .then(setUser)
        .catch(() => logout())
        .finally(() => setLoading(false));
    }
  }, [token]);

  return { user, token, isAuthenticated: !!token };
};
