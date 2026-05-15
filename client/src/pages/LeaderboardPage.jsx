import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { challengeService } from '../services/challengeService';
import LeaderRow from '../components/leaderboard/LeaderRow';

const TABS = ['Global', 'Weekly', 'Friends'];

export default function LeaderboardPage() {
  const [tab, setTab] = useState('Global');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const map = { Global: 'global', Weekly: 'weekly', Friends: 'friends' };
    import('../services/api').then(({ default: api }) => {
      api.get(`/leaderboard/${map[tab]}`).then(r => setRows(r.data)).catch(() => {});
    });
  }, [tab]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-white mb-6">Leaderboard</h1>
      <div className="flex gap-2 mb-6">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-steppa-green text-black' : 'bg-steppa-surface border border-steppa-border text-steppa-muted hover:border-steppa-green'}`}>{t}</button>
        ))}
      </div>
      <div className="bg-steppa-surface border border-steppa-border rounded-xl overflow-hidden">
        <div className="divide-y divide-steppa-border">
          {rows.length === 0 ? (
            <div className="p-10 text-center text-steppa-muted">No data yet. Start walking!</div>
          ) : rows.map((row, i) => <LeaderRow key={row.userId || row.id} row={row} rank={i + 1} />)}
        </div>
      </div>
    </div>
  );
}
