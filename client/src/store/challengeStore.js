import { create } from 'zustand';

export const useChallengeStore = create((set) => ({
  challenges: [],
  activeChallenge: null,
  userBets: [],
  isLoading: false,

  setChallenges: (challenges) => set({ challenges }),
  setActiveChallenge: (challenge) => set({ activeChallenge: challenge }),
  setUserBets: (bets) => set({ userBets: bets }),
  setLoading: (isLoading) => set({ isLoading }),

  updateChallengePool: (challengeId, pool) =>
    set((state) => ({
      challenges: state.challenges.map((c) =>
        c.id === challengeId ? { ...c, totalPool: pool } : c
      ),
    })),
}));
