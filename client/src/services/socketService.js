import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

let socket = null;

export const connectSocket = (token) => {
  if (socket) return socket;
  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
  socket.on('connect', () => console.log('[Socket] Connected:', socket.id));
  socket.on('disconnect', (reason) => console.log('[Socket] Disconnected:', reason));
  socket.on('connect_error', (err) => console.error('[Socket] Error:', err.message));
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) { socket.disconnect(); socket = null; }
};

export const subscribeToChallenge = (challengeId) => {
  if (socket) socket.emit('challenge:subscribe', { challengeId });
};

export const submitSteps = (steps) => {
  if (socket) socket.emit('steps:submit', { steps });
};

export default { connectSocket, getSocket, disconnectSocket, subscribeToChallenge, submitSteps };
