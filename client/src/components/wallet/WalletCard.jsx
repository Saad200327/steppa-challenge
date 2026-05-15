import { TrendingUp, TrendingDown } from 'lucide-react';

export default function WalletCard({ wallet }) {
  const pl = (wallet?.totalDeposit || 0) - (wallet?.totalWithdraw || 0);
  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl p-5 flex flex-col gap-2">
      <div className="text-steppa-muted text-xs uppercase tracking-widest">Wallet Balance</div>
      <div className="font-display text-3xl font-extrabold text-steppa-green tabular-nums">
        {wallet?.balance?.toFixed(2) || '0.00'}
        <span className="text-steppa-muted text-base font-normal ml-1">SC</span>
      </div>
      <div className={`flex items-center gap-1 text-xs font-mono ${pl >= 0 ? 'text-steppa-green' : 'text-steppa-red'}`}>
        {pl >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        Today: {pl >= 0 ? '+' : ''}${pl.toFixed(2)}
      </div>
    </div>
  );
}
