import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Activity, Zap, Wallet, Trophy } from 'lucide-react';

const STEPS = [
  { title: 'Connect Fitness Tracker', icon: <Activity size={32} className="text-steppa-green" /> },
  { title: 'Set Daily Step Goal', icon: <Zap size={32} className="text-steppa-yellow" /> },
  { title: 'Fund Wallet', icon: <Wallet size={32} className="text-steppa-blue" /> },
  { title: 'Join First Challenge', icon: <Trophy size={32} className="text-steppa-green" /> },
];

const GOALS = [5000, 7500, 10000, 15000];

export default function Onboard() {
  const [step, setStep] = useState(0);
  const [provider, setProvider] = useState('');
  const [goal, setGoal] = useState(10000);
  const nav = useNavigate();

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else { toast.success('Setup complete! Let\'s go!'); nav('/dashboard'); }
  };

  return (
    <div className="min-h-screen bg-steppa-bg flex flex-col items-center justify-center p-8">
      {/* Progress dots */}
      <div className="flex gap-2 mb-10">
        {STEPS.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${i <= step ? 'bg-steppa-green' : 'bg-steppa-border'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="bg-steppa-surface border border-steppa-border rounded-2xl p-10 max-w-md w-full text-center"
        >
          <div className="flex justify-center mb-4">{STEPS[step].icon}</div>
          <h2 className="font-display text-2xl font-bold text-white mb-6">{STEPS[step].title}</h2>

          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {['Google Fit', 'Fitbit', 'Apple Health', 'Manual'].map(p => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={`py-3 rounded-lg border text-sm font-medium transition-all ${provider === p ? 'border-steppa-green bg-green-900/30 text-white' : 'border-steppa-border text-steppa-muted hover:border-steppa-green'}`}
                >{p}</button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {GOALS.map(g => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`py-3 rounded-lg border text-sm font-mono font-bold transition-all ${goal === g ? 'border-steppa-green bg-green-900/30 text-white' : 'border-steppa-border text-steppa-muted hover:border-steppa-green'}`}
                >{g.toLocaleString()}</button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="text-steppa-muted text-sm">
              You start with <span className="text-steppa-green font-bold">100 StepCoins</span> free.
              You can deposit more anytime from your Wallet.
            </div>
          )}

          {step === 3 && (
            <div className="text-steppa-muted text-sm">
              Your first challenge awaits. Stake your coins and start walking.
            </div>
          )}

          <button onClick={next} className="btn btn-primary w-full mt-8">
            {step < STEPS.length - 1 ? 'Continue' : "Let's Go"}
          </button>

          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="text-steppa-muted text-sm mt-3 hover:text-white">Back</button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
