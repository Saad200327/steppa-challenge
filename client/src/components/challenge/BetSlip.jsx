import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { challengeService } from '../../services/challengeService';

export default function BetSlip({ challenge }) {
  const [amount, setAmount] = useState(challenge?.betAmount || challenge?.minBet || 5);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  if (!challenge) return null;

  const loserPool = challenge.loserPool || 0;
  const winnerPool = challenge.winnerPool || 0;
  const projected = winnerPool > 0 ? amount + (loserPool * (amount / (winnerPool + amount))) : amount;

  const submit = async () => {
    if (!confirm) { setConfirm(true); return; }
    setLoading(true);
    try {
      await challengeService.join(challenge.id, amount);
      toast.success('Bet placed!');
      nav('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to join');
    } finally { setLoading(false); setConfirm(false); }
  };

  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl p-6">
      <h3 className="font-display font-bold text-white mb-4">Bet Slip — {challenge.title}</h3>
      <div className="space-y-4">
        <div>
          <label className="label">Bet Amount (${challenge.minBet}–${challenge.maxBet})</label>
          <input
            type="number"
            className="input font-mono"
            value={amount}
            min={challenge.minBet}
            max={challenge.maxBet}
            onChange={e => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <div className="text-steppa-muted text-sm">
          Projected payout: <span className="text-steppa-green font-mono font-bold">${projected.toFixed(2)}</span>
        </div>
        <button
          className={`btn w-full ${confirm ? 'bg-steppa-red border-steppa-red text-white' : 'btn-primary'}`}
          onClick={submit}
          disabled={loading}
        >
          {loading ? 'Placing...' : confirm ? 'Confirm Bet — Are you sure?' : 'Place Bet'}
        </button>
        {confirm && <button className="text-xs text-steppa-muted w-full text-center hover:text-white" onClick={() => setConfirm(false)}>Cancel</button>}
      </div>
    </div>
  );
}
