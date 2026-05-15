import { Link } from 'react-router-dom';
import { Clock, Users, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ChallengeCard({ challenge }) {
  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl p-5 flex flex-col gap-3 hover:border-steppa-green transition-colors">
      <div className="flex items-center justify-between">
        <span className="font-display font-bold text-white">{challenge.title}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          challenge.status === 'active' ? 'bg-green-900/40 text-steppa-green' :
          challenge.status === 'open' ? 'bg-blue-900/40 text-steppa-blue' : 'bg-gray-800 text-steppa-muted'
        }`}>{challenge.status}</span>
      </div>
      <div className="font-mono text-steppa-muted text-sm">{challenge.stepGoal?.toLocaleString()} steps</div>
      <div className="flex gap-4 text-xs text-steppa-muted">
        <span className="flex items-center gap-1"><DollarSign size={12} /> Stake: ${challenge.betAmount}</span>
        <span className="flex items-center gap-1"><DollarSign size={12} /> Pool: ${challenge.totalPool?.toFixed(0)}</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-steppa-muted flex items-center gap-1">
          <Clock size={11} /> {challenge.endTime ? formatDistanceToNow(new Date(challenge.endTime), { addSuffix: true }) : 'N/A'}
        </span>
        <Link to={`/challenge/${challenge.id}`} className="btn btn-primary text-xs px-3 py-1.5">Join</Link>
      </div>
    </div>
  );
}
