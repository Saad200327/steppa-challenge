import { useEffect, useCallback } from 'react'
import { io } from 'socket.io-client'
import { SOCKET_URL } from '../utils/constants'
import { useAuthStore } from '../store/authStore'

let socket = null

export function useSocket() {
  const token = useAuthStore((s) => s.token)
  useEffect(() => {
    if (!token || socket) return
    socket = io(SOCKET_URL, { auth: { token }, transports: ['websocket'] })
    return () => {}
  }, [token])
  const subscribe = useCallback((event, handler) => {
    if (!socket) return () => {}
    socket.on(event, handler)
    return () => socket.off(event, handler)
  }, [])
  const emit = useCallback((event, data) => {
    if (socket) socket.emit(event, data)
  }, [])
  return { socket, subscribe, emit }
}
