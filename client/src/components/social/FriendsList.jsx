import Avatar from '../ui/Avatar';
import { CheckCircle, Clock, XCircle, Zap } from 'lucide-react';

const STATUS = {
  won: <CheckCircle size={14} className="text-steppa-green" />,
  active: <Clock size={14} className="text-steppa-yellow" />,
  lost: <XCircle size={14} className="text-steppa-red" />,
};

export default function FriendsList({ friends, onTaunt }) {
  if (!friends.length) return <div className="text-steppa-muted text-center p-8 text-sm">No friends yet. Search above!</div>;
  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl divide-y divide-steppa-border">
      {friends.map(f => (
        <div key={f.id} className="flex items-center gap-3 px-5 py-3">
          <Avatar user={f.receiver || f} size="sm" />
          <div className="flex-1">
            <div className="text-white text-sm">{f.receiver?.displayName || f.displayName}</div>
            <div className="text-steppa-muted text-xs">@{f.receiver?.username || f.username}</div>
          </div>
          <div className="flex items-center gap-2">
            {STATUS[f.todayStatus] || <Clock size={14} className="text-steppa-muted" />}
            <button onClick={() => onTaunt(f.receiverId || f.id)} className="text-steppa-yellow hover:text-yellow-300 transition-colors" title="Taunt">
              <Zap size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
