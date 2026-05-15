import { create } from 'zustand';

export const useWalletStore = create((set) => ({
  wallet: null,
  transactions: [],
  isLoading: false,

  setWallet: (wallet) => set({ wallet }),
  setTransactions: (transactions) => set({ transactions }),
  setLoading: (isLoading) => set({ isLoading }),

  updateBalance: (balance) =>
    set((state) => ({
      wallet: state.wallet ? { ...state.wallet, balance } : null,
    })),
}));
