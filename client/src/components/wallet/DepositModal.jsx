import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import Modal from '../ui/Modal';

export default function DepositModal({ onClose, onDeposit }) {
  const [amount, setAmount] = useState(50);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await api.post('/wallet/deposit', { amount });
      toast.success(`${amount} StepCoins deposited!`);
      onDeposit();
    } catch { toast.error('Deposit failed'); }
    finally { setLoading(false); }
  };

  return (
    <Modal onClose={onClose} title="Deposit StepCoins">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[25, 50, 100, 250, 500, 1000].map(a => (
            <button key={a} onClick={() => setAmount(a)} className={`py-2 rounded-lg text-sm font-mono font-bold border transition-all ${amount === a ? 'border-steppa-green bg-green-900/30 text-white' : 'border-steppa-border text-steppa-muted hover:border-steppa-green'}`}>{a}</button>
          ))}
        </div>
        <input type="number" className="input font-mono" value={amount} onChange={e => setAmount(Number(e.target.value))} min={1} />
        <button className="btn btn-primary w-full" onClick={submit} disabled={loading}>{loading ? 'Depositing...' : `Deposit ${amount} SC`}</button>
      </div>
    </Modal>
  );
}
