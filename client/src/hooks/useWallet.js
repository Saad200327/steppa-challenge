import { useState, useEffect, useCallback } from 'react'
import { walletService } from '../services/walletService'
import { useWalletStore } from '../store/walletStore'

export function useWallet() {
  const { wallet, transactions, setWallet, setTransactions, setLoading } = useWalletStore()
  const fetchWallet = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await walletService.get()
      setWallet(data.wallet)
      setTransactions(data.recentTransactions || [])
    } catch {} finally { setLoading(false) }
  }, [setWallet, setTransactions, setLoading])
  useEffect(() => { fetchWallet() }, [fetchWallet])
  return { wallet, transactions, fetchWallet }
}
