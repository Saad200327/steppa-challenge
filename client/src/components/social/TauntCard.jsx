import { Zap } from 'lucide-react';

const TAUNTS = [
  'Still need more steps? Yikes.',
  "Couch potato energy. 🛋️",
  'Your wallet called. It\'s scared.',
  'Every step you skip, I earn.',
];

export default function TauntCard({ taunt }) {
  return (
    <div className="bg-yellow-950/30 border border-steppa-yellow/30 rounded-xl p-4 flex items-start gap-3">
      <Zap size={16} className="text-steppa-yellow flex-shrink-0 mt-0.5" />
      <div>
        <div className="text-white text-sm font-medium">{taunt?.senderName || 'Someone'} taunted you</div>
        <div className="text-steppa-muted text-xs mt-0.5">{taunt?.message || TAUNTS[0]}</div>
      </div>
    </div>
  );
}
