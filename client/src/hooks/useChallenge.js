import { useEffect } from 'react';
import { useChallengeStore } from '../store/challengeStore';
import { getChallenges } from '../services/challengeService';

export const useChallenge = () => {
  const { challenges, isLoading, setChallenges, setLoading } = useChallengeStore();

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const data = await getChallenges();
      setChallenges(data.challenges || []);
    } catch (err) {
      console.error('Failed to fetch challenges:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchChallenges(); }, []);

  return { challenges, isLoading, refetch: fetchChallenges };
};
