import { create } from 'zustand'
export const useChallengeStore = create((set) => ({
  challenges: [], activeBet: null, currentChallenge: null, leaderboard: [], loading: false,
  setChallenges: (challenges) => set({ challenges }),
  setActiveBet: (activeBet) => set({ activeBet }),
  setCurrentChallenge: (c) => set({ currentChallenge: c }),
  setLeaderboard: (leaderboard) => set({ leaderboard }),
  setLoading: (loading) => set({ loading }),
  updateLeaderboardEntry: (entry) => set((s) => ({
    leaderboard: s.leaderboard.map((r) => r.userId === entry.userId ? { ...r, ...entry } : r),
  })),
}))
