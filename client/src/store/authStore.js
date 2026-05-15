import { create } from 'zustand'
export const useAuthStore = create((set) => ({
  user: null, token: null, refreshToken: null,
  setUser: (user) => set({ user }),
  setTokens: (token, refreshToken) => set({ token, refreshToken }),
  login: (user, token, refreshToken) => set({ user, token, refreshToken }),
  logout: () => set({ user: null, token: null, refreshToken: null }),
  updateUser: (data) => set((s) => ({ user: { ...s.user, ...data } })),
}))
