import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useChallengeStore } from '../store/challengeStore';
import { useWalletStore } from '../store/walletStore';
import { useChallenge } from '../hooks/useChallenge';
import { useWallet } from '../hooks/useWallet';
import { useSteps } from '../hooks/useSteps';
import { useCountdown } from '../hooks/useCountdown';
import ProgressRing from '../components/ui/ProgressRing';
import CountdownTimer from '../components/ui/CountdownTimer';
import StepBar from '../components/ui/StepBar';
import PanicBanner from '../components/challenge/PanicBanner';
import ChallengeCard from '../components/challenge/ChallengeCard';
import WalletCard from '../components/wallet/WalletCard';

export default function Dashboard() {
  const user = useAuthStore(s => s.user);
  const { challenges, fetchChallenges } = useChallenge();
  const { wallet, fetchWallet } = useWallet();
  const { todaySteps, fetchToday, syncSteps } = useSteps();
  const { timeLeft, isUrgent } = useCountdown();

  const stepGoal = 10000;
  const pct = Math.min(100, Math.round((todaySteps / stepGoal) * 100));
  const stepsMissing = Math.max(0, stepGoal - todaySteps);
  const now = new Date();
  const isLateNight = now.getHours() >= 23;

  useEffect(() => {
    fetchChallenges();
    fetchWallet();
    fetchToday();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
        <span className="text-steppa-muted text-sm">Hey, {user?.displayName || user?.username} 👋</span>
      </div>

      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Countdown */}
        <div className={`bg-steppa-surface border rounded-xl p-5 flex flex-col items-center gap-2 ${isUrgent ? 'border-steppa-red animate-pulse-border' : 'border-steppa-border'}`}>
          <div className="text-steppa-muted text-xs uppercase tracking-widest">Time Remaining</div>
          <CountdownTimer />
          <div className="text-steppa-muted text-xs">Until midnight settlement</div>
        </div>

        {/* Step Progress Ring */}
        <div className="bg-steppa-surface border border-steppa-border rounded-xl p-5 flex flex-col items-center gap-2">
          <div className="text-steppa-muted text-xs uppercase tracking-widest">Today's Steps</div>
          <ProgressRing percentage={pct} steps={todaySteps} />
          <button onClick={syncSteps} className="flex items-center gap-1 text-xs text-steppa-muted hover:text-white mt-1">
            <RefreshCw size={12} /> Sync
          </button>
        </div>

        {/* Wallet */}
        <WalletCard wallet={wallet} />
      </div>

      {/* Panic Banner */}
      {isLateNight && stepsMissing > 0 && (
        <PanicBanner stepsMissing={stepsMissing} minutesLeft={Math.floor(timeLeft / 60)} betAmount={wallet?.balance || 0} />
      )}

      {/* Step Progress Bar */}
      <div className="bg-steppa-surface border border-steppa-border rounded-xl p-5">
        <div className="text-steppa-muted text-xs uppercase tracking-widest mb-3">Step Progress</div>
        <StepBar current={todaySteps} goal={stepGoal} />
      </div>

      {/* Open Challenges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-bold text-white">Open Challenges</h2>
          <Link to="/leaderboard" className="text-steppa-green text-sm hover:underline">View All</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(challenges || []).slice(0, 3).map(c => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
