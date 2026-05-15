import { useEffect } from 'react';
import { useWalletStore } from '../store/walletStore';
import { getWallet } from '../services/walletService';

export const useWallet = () => {
  const { wallet, isLoading, setWallet, setLoading } = useWalletStore();

  const fetchWallet = async () => {
    setLoading(true);
    try {
      const data = await getWallet();
      setWallet(data.wallet);
    } catch (err) {
      console.error('Failed to fetch wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWallet(); }, []);

  return { wallet, isLoading, refetch: fetchWallet };
};
