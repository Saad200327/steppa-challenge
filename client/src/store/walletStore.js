import { create } from 'zustand'
export const useWalletStore = create((set) => ({
  wallet: null, transactions: [], loading: false,
  setWallet: (wallet) => set({ wallet }),
  setTransactions: (transactions) => set({ transactions }),
  setLoading: (loading) => set({ loading }),
  updateBalance: (balance) => set((s) => ({ wallet: s.wallet ? { ...s.wallet, balance } : { balance } })),
}))
