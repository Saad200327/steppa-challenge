import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TYPE_ICON = {
  deposit: <ArrowDownRight size={14} className="text-steppa-green" />,
  withdraw: <ArrowUpRight size={14} className="text-steppa-red" />,
  bet_placed: <ArrowUpRight size={14} className="text-steppa-yellow" />,
  bet_won: <ArrowDownRight size={14} className="text-steppa-green" />,
  bet_lost: <ArrowUpRight size={14} className="text-steppa-red" />,
};

export default function TransactionList({ transactions }) {
  if (!transactions.length) return <div className="text-steppa-muted text-center p-8">No transactions yet.</div>;
  return (
    <div className="bg-steppa-surface border border-steppa-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-steppa-border"><span className="font-bold text-white text-sm">Transactions</span></div>
      <div className="divide-y divide-steppa-border">
        {transactions.map(t => (
          <div key={t.id} className="px-5 py-3 flex items-center gap-3">
            <div className="w-6">{TYPE_ICON[t.type] || <ArrowDownRight size={14} className="text-steppa-muted" />}</div>
            <div className="flex-1">
              <div className="text-white text-sm">{t.description}</div>
              <div className="text-steppa-muted text-xs">{format(new Date(t.createdAt), 'MMM d, h:mm a')}</div>
            </div>
            <div className={`font-mono text-sm font-bold ${t.amount >= 0 ? 'text-steppa-green' : 'text-steppa-red'}`}>
              {t.amount >= 0 ? '+' : ''}${Math.abs(t.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
