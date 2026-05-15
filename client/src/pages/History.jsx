import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import api from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function History() {
  const [tab, setTab] = useState('challenges');
  const [challenges, setChallenges] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get('/challenges/history').then(r => setChallenges(r.data)).catch(() => {});
    api.get('/wallet/transactions').then(r => setTransactions(r.data)).catch(() => {});
  }, []);

  const earningsData = transactions
    .filter(t => t.type === 'bet_won')
    .slice(-30)
    .map(t => ({ date: format(new Date(t.createdAt), 'MM/dd'), amount: t.amount }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-white mb-6">History</h1>
      <div className="flex gap-2 mb-6">
        {['challenges', 'transactions'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? 'bg-steppa-green text-black' : 'bg-steppa-surface border border-steppa-border text-steppa-muted hover:border-steppa-green'}`}>{t}</button>
        ))}
      </div>

      {tab === 'challenges' && (
        <div className="space-y-3">
          {challenges.length === 0 && <div className="text-steppa-muted p-6 text-center">No challenge history yet.</div>}
          {challenges.map(c => (
            <div key={c.id} className="bg-steppa-surface border border-steppa-border rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-white">{c.title}</div>
                <div className="text-steppa-muted text-xs">{format(new Date(c.endTime), 'MMM d, yyyy')} · {c.stepGoal?.toLocaleString()} steps</div>
              </div>
              <div className="text-right">
                <div className={`font-mono font-bold ${c.won ? 'text-steppa-green' : 'text-steppa-red'}`}>{c.won ? `+$${c.payout?.toFixed(2)}` : `-$${c.amount?.toFixed(2)}`}</div>
                <div className="text-steppa-muted text-xs">{c.stepsAchieved?.toLocaleString()} steps</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'transactions' && (
        <div>
          {earningsData.length > 0 && (
            <div className="bg-steppa-surface border border-steppa-border rounded-xl p-4 mb-4 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <XAxis dataKey="date" stroke="#7a7a9a" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#7a7a9a" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#12121a', border: '1px solid #2a2a3d' }} />
                  <Line type="monotone" dataKey="amount" stroke="#00ff88" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="space-y-2">
            {transactions.map(t => (
              <div key={t.id} className="bg-steppa-surface border border-steppa-border rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-white text-sm">{t.description}</div>
                  <div className="text-steppa-muted text-xs">{format(new Date(t.createdAt), 'MMM d, h:mm a')}</div>
                </div>
                <div className={`font-mono font-bold text-sm ${t.amount > 0 ? 'text-steppa-green' : 'text-steppa-red'}`}>{t.amount > 0 ? '+' : ''}${t.amount?.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
