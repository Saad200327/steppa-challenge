import { useState, useEffect } from 'react';
import { getTodaySteps } from '../services/stepService';

export const useSteps = () => {
  const [steps, setSteps] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSteps = async () => {
    setIsLoading(true);
    try {
      const data = await getTodaySteps();
      setSteps(data.steps || 0);
    } catch {}
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchSteps(); }, []);

  return { steps, isLoading, refetch: fetchSteps };
};
