import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

export default function GroupChallenge() {
  const [form, setForm] = useState({ name: '', description: '', stepGoal: 10000, betAmount: 10, maxMembers: 20 });
  const [created, setCreated] = useState(null);

  const create = async () => {
    try {
      const r = await api.post('/social/groups', form);
      setCreated(r.data);
      toast.success('Group created!');
    } catch { toast.error('Failed to create group'); }
  };

  if (created) return (
    <div className="bg-steppa-surface border border-steppa-green/40 rounded-xl p-6 text-center">
      <div className="font-bold text-white mb-2">{created.name}</div>
      <div className="text-steppa-muted text-sm mb-3">Share invite code:</div>
      <div className="font-mono text-steppa-green text-lg bg-green-900/20 rounded-lg py-2">{created.inviteCode}</div>
    </div>
  );

  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl p-6 space-y-4">
      <h3 className="font-bold text-white">Create a Group</h3>
      {[['Group Name','name','text'],['Description','description','text']].map(([l,k,t]) => (
        <div key={k}><label className="label">{l}</label><input className="input" type={t} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} /></div>
      ))}
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">Step Goal</label><input className="input font-mono" type="number" value={form.stepGoal} onChange={e => setForm(f => ({ ...f, stepGoal: +e.target.value }))} /></div>
        <div><label className="label">Bet Amount</label><input className="input font-mono" type="number" value={form.betAmount} onChange={e => setForm(f => ({ ...f, betAmount: +e.target.value }))} /></div>
      </div>
      <button className="btn btn-primary w-full" onClick={create}>Create Group</button>
    </div>
  );
}
