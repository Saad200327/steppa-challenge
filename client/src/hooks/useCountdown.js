import { useState, useEffect } from 'react';

export const useCountdown = (endTime) => {
  const getTimeLeft = () => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = Math.max(end - now, 0);
    return {
      total: diff,
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      formatted: [
        Math.floor(diff / 3600000).toString().padStart(2, '0'),
        Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0'),
        Math.floor((diff % 60000) / 1000).toString().padStart(2, '0'),
      ].join(':'),
      isExpired: diff === 0,
      isUrgent: diff < 3600000,
      isPanic: diff < 600000,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    if (!endTime) return;
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return timeLeft;
};
