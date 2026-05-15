import { motion } from 'framer-motion';
import { Trophy, XCircle } from 'lucide-react';

export default function SettlementModal({ result, onClose }) {
  const won = result?.status === 'won';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-steppa-surface border border-steppa-border rounded-2xl p-10 max-w-sm w-full text-center"
      >
        {won ? <Trophy size={48} className="text-steppa-green mx-auto mb-4" /> : <XCircle size={48} className="text-steppa-red mx-auto mb-4" />}
        <h2 className="font-display text-3xl font-extrabold text-white mb-2">{won ? 'You Won!' : 'You Lost'}</h2>
        <div className={`font-mono text-2xl font-bold mb-4 ${won ? 'text-steppa-green' : 'text-steppa-red'}`}>
          {won ? `+$${result.payout?.toFixed(2)}` : `-$${result.amount?.toFixed(2)}`}
        </div>
        <button onClick={onClose} className="btn btn-primary w-full">Close</button>
      </motion.div>
    </div>
  );
}
