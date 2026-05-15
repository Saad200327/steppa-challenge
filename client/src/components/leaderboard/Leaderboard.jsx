import LeaderRow from './LeaderRow';

export default function Leaderboard({ rows = [] }) {
  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-steppa-border flex items-center justify-between">
        <span className="font-display font-bold text-white">Leaderboard</span>
        <span className="text-xs text-steppa-green animate-pulse">● LIVE</span>
      </div>
      <div className="divide-y divide-steppa-border">
        {rows.length === 0
          ? <div className="p-6 text-center text-steppa-muted text-sm">No participants yet.</div>
          : rows.map((row, i) => <LeaderRow key={row.userId || row.id} row={row} rank={i + 1} />)}
      </div>
    </div>
  );
}
