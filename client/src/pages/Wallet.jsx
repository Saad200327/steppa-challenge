import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import DepositModal from '../components/wallet/DepositModal';
import TransactionList from '../components/wallet/TransactionList';

export default function Wallet() {
  const { wallet, transactions, fetchWallet, fetchTransactions } = useWallet();
  const [showDeposit, setShowDeposit] = useState(false);

  useEffect(() => { fetchWallet(); fetchTransactions(); }, []);

  const totalWagered = (transactions || []).filter(t => t.type === 'bet_placed').reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalWon = (transactions || []).filter(t => t.type === 'bet_won').reduce((s, t) => s + t.amount, 0);
  const totalLost = (transactions || []).filter(t => t.type === 'bet_lost').reduce((s, t) => s + Math.abs(t.amount), 0);
  const roi = totalWagered > 0 ? (((totalWon - totalLost) / totalWagered) * 100).toFixed(1) : '0.0';

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Wallet</h1>

      {/* Balance Hero */}
      <div className="bg-steppa-surface border border-steppa-border rounded-2xl p-8 text-center">
        <div className="text-steppa-muted text-sm uppercase tracking-widest mb-2">Balance</div>
        <div className="font-display text-5xl font-extrabold text-steppa-green tabular-nums">{wallet?.balance?.toFixed(2) || '0.00'}</div>
        <div className="text-steppa-muted text-sm mt-1">StepCoins</div>
        <div className="flex gap-4 justify-center mt-6">
          <button onClick={() => setShowDeposit(true)} className="btn btn-primary flex items-center gap-2"><ArrowDownCircle size={16} /> Deposit</button>
          <button className="btn btn-ghost flex items-center gap-2"><ArrowUpCircle size={16} /> Withdraw</button>
        </div>
      </div>

      {/* Lifetime Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[['Wagered', `$${totalWagered.toFixed(2)}`],['Won', `$${totalWon.toFixed(2)}`],['Lost', `$${totalLost.toFixed(2)}`],['ROI', `${roi}%`]].map(([l, v]) => (
          <div key={l} className="bg-steppa-surface border border-steppa-border rounded-xl p-4 text-center">
            <div className="text-steppa-muted text-xs uppercase">{l}</div>
            <div className="font-mono text-white font-bold mt-1">{v}</div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <TransactionList transactions={transactions || []} />

      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} onDeposit={() => { fetchWallet(); setShowDeposit(false); }} />}
    </div>
  );
}
