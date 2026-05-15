import Avatar from '../ui/Avatar';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function LeaderRow({ row, rank }) {
  const statusIcon = row.goalMet
    ? <CheckCircle size={16} className="text-steppa-green" />
    : row.status === 'lost'
      ? <XCircle size={16} className="text-steppa-red" />
      : <Clock size={16} className="text-steppa-yellow" />;

  return (
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-steppa-elevated transition-colors">
      <span className="font-mono text-steppa-muted text-sm w-6 text-center">#{rank}</span>
      <Avatar user={row.user || row} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-medium truncate">{row.user?.displayName || row.displayName || row.username}</div>
        <div className="text-steppa-muted text-xs">@{row.user?.username || row.username}</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-white text-sm">{row.stepsAchieved?.toLocaleString() || row.steps?.toLocaleString() || '–'}</div>
        <div className="text-steppa-muted text-xs">{row.amount ? `$${row.amount}` : ''}</div>
      </div>
      <div className="ml-2">{statusIcon}</div>
    </div>
  );
}
