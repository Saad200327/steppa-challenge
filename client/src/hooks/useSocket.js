import { useEffect, useRef } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '../services/socketService';
import { useAuthStore } from '../store/authStore';

export const useSocket = () => {
  const token = useAuthStore((s) => s.token);
  const socketRef = useRef(null);

  useEffect(() => {
    if (token) {
      socketRef.current = connectSocket(token);
    }
    return () => { if (!token) disconnectSocket(); };
  }, [token]);

  return getSocket();
};
