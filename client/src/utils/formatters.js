import { format, formatDistanceToNow } from 'date-fns';

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount);

export const formatCoins = (amount) =>
  `${Number(amount).toFixed(2)} SC`;

export const formatSteps = (steps) =>
  new Intl.NumberFormat('en-US').format(steps);

export const formatDate = (date) =>
  format(new Date(date), 'MMM d, yyyy');

export const formatDateTime = (date) =>
  format(new Date(date), 'MMM d, yyyy h:mm a');

export const formatRelative = (date) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

export const formatPercent = (value, total) =>
  total === 0 ? '0%' : `${Math.round((value / total) * 100)}%`;

export const formatCountdown = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;
  if (diff <= 0) return '00:00:00';
  const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
  const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
  const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};
