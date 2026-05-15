import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function PanicBanner({ stepsMissing, minutesLeft, betAmount }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-2 border-steppa-red rounded-xl p-4 bg-red-950/40 flex items-start gap-3 relative animate-pulse-border"
    >
      <AlertTriangle size={20} className="text-steppa-red flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-bold text-white">⚠️ {minutesLeft} minutes left</div>
        <div className="text-sm text-steppa-muted mt-0.5">
          You need <span className="text-white font-mono font-bold">{stepsMissing?.toLocaleString()}</span> more steps or you lose <span className="text-steppa-red font-bold">${betAmount?.toFixed(2)}</span>
        </div>
      </div>
      <button onClick={() => setDismissed(true)} className="text-xs text-steppa-muted hover:text-white mt-0.5">I'll walk now 🚶</button>
    </motion.div>
  );
}
