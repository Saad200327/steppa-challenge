import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import { challengeService } from '../services/challengeService';
import LeaderRow from '../components/leaderboard/LeaderRow';
import BetSlip from '../components/challenge/BetSlip';
import { RefreshCw } from 'lucide-react';

export default function ActiveChallenge() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    challengeService.getById(id).then(setChallenge);
    challengeService.getLeaderboard(id).then(setLeaderboard);
  }, [id]);

  useEffect(() => {
    if (!socket) return;
    socket.emit('challenge:subscribe', id);
    socket.on('leaderboard:update', data => { if (data.challengeId === id) setLeaderboard(data.rows); });
    return () => { socket.off('leaderboard:update'); };
  }, [socket, id]);

  if (!challenge) return <div className="p-6 text-steppa-muted">Loading...</div>;

  const fee = challenge.totalPool * (challenge.platformFee || 0.05);
  const winnersTake = challenge.totalPool - fee;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{challenge.title}</h1>
        <p className="text-steppa-muted text-sm">{challenge.description}</p>
      </div>

      {/* Pool Breakdown */}
      <div className="bg-steppa-surface border border-steppa-border rounded-xl p-5 flex flex-wrap gap-6">
        <div><div className="text-steppa-muted text-xs uppercase">Total Pool</div><div className="font-mono text-white text-xl">${challenge.totalPool?.toFixed(2)}</div></div>
        <div><div className="text-steppa-muted text-xs uppercase">Winners Take</div><div className="font-mono text-steppa-green text-xl">${winnersTake.toFixed(2)}</div></div>
        <div><div className="text-steppa-muted text-xs uppercase">Platform Fee</div><div className="font-mono text-steppa-muted text-xl">${fee.toFixed(2)}</div></div>
        <div><div className="text-steppa-muted text-xs uppercase">Goal</div><div className="font-mono text-white text-xl">{challenge.stepGoal?.toLocaleString()} steps</div></div>
      </div>

      {/* Leaderboard */}
      <div className="bg-steppa-surface border border-steppa-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-steppa-border flex items-center justify-between">
          <span className="font-display font-bold text-white">Live Leaderboard</span>
          <span className="text-xs text-steppa-green animate-pulse">● LIVE</span>
        </div>
        <div className="divide-y divide-steppa-border">
          {leaderboard.map((row, i) => <LeaderRow key={row.userId} row={row} rank={i + 1} />)}
        </div>
      </div>

      {/* Bet Slip */}
      <BetSlip challenge={challenge} />
    </div>
  );
}
