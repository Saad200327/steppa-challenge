import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Trophy, TrendingUp, Shield } from 'lucide-react';

const LIVE_FEED = [
  { user: '@alex_j', action: 'won', amount: '$47.20' },
  { user: '@sarah_k', action: 'hit 10,000 steps', amount: '' },
  { user: '@mike_t', action: 'lost', amount: '$25.00' },
  { user: '@priya_m', action: 'won', amount: '$88.50' },
  { user: '@derek_w', action: 'hit goal late', amount: '' },
  { user: '@lisa_n', action: 'won', amount: '$33.10' },
];

export default function Landing() {
  const [stepCount, setStepCount] = useState(0);
  const [feedIndex, setFeedIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    let count = 0;
    const target = 9847;
    intervalRef.current = setInterval(() => {
      count += Math.floor(Math.random() * 80) + 20;
      if (count >= target) { count = target; clearInterval(intervalRef.current); }
      setStepCount(count);
    }, 30);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFeedIndex(i => (i + 1) % LIVE_FEED.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-steppa-bg text-steppa-text">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-steppa-border">
        <span className="font-display text-xl font-bold text-white tracking-tight">STEPPA</span>
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-ghost text-sm">Login</Link>
          <Link to="/register" className="btn btn-primary text-sm">Start Winning</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-green-900/20 via-transparent to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="z-10"
        >
          <div className="font-mono text-steppa-green text-6xl font-bold mb-2 tabular-nums">
            {stepCount.toLocaleString()}
          </div>
          <div className="text-steppa-muted text-sm mb-6 uppercase tracking-widest">steps tracked live</div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-none mb-4">
            Your laziness is<br />
            <span className="text-steppa-green">someone else's paycheck.</span>
          </h1>
          <p className="text-steppa-muted max-w-xl mx-auto text-lg mb-10">
            Stake real coins on hitting your daily step goal. Win money from those who fail. Lose yours if you quit.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn btn-primary text-base px-8 py-3 flex items-center gap-2">
              Start Winning <ArrowRight size={18} />
            </Link>
            <a href="#how" className="btn btn-ghost text-base px-8 py-3">How It Works</a>
          </div>
        </motion.div>
      </section>

      {/* Live Feed Ticker */}
      <div className="bg-steppa-surface border-y border-steppa-border py-3 overflow-hidden">
        <motion.div
          key={feedIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-center text-sm"
        >
          <span className="text-steppa-green font-mono">{LIVE_FEED[feedIndex].user}</span>
          <span className="text-steppa-muted mx-2">{LIVE_FEED[feedIndex].action}</span>
          {LIVE_FEED[feedIndex].amount && (
            <span className="text-white font-bold">{LIVE_FEED[feedIndex].amount}</span>
          )}
        </motion.div>
      </div>

      {/* How It Works */}
      <section id="how" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap size={32} className="text-steppa-yellow" />, title: 'Stake', desc: 'Pick a challenge and put your coins on the line. If you fail, they go to the winners.' },
            { icon: <TrendingUp size={32} className="text-steppa-green" />, title: 'Walk', desc: 'Hit your daily step goal. Track via Google Fit, Fitbit, or manual submission.' },
            { icon: <Trophy size={32} className="text-steppa-blue" />, title: 'Collect', desc: "Winners split the losers' pool proportionally. The more you stake, the more you earn." },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-steppa-surface border border-steppa-border rounded-xl p-6 flex flex-col items-center text-center gap-4"
            >
              {s.icon}
              <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="text-steppa-muted text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Block */}
      <section className="py-16 px-6 bg-steppa-surface border-y border-steppa-border">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { label: 'Total Paid Out', value: '$124,880' },
            { label: 'Active Today', value: '3,241' },
            { label: 'Biggest Win Ever', value: '$892.40' },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display text-3xl font-extrabold text-steppa-green tabular-nums">{s.value}</div>
              <div className="text-steppa-muted text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Shields / Trust */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <Shield size={40} className="text-steppa-yellow mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-white mb-3">Steppa Shields</h3>
        <p className="text-steppa-muted">
          Win 7 days in a row and earn a Shield — your one free pass to void a loss each month.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-steppa-border py-8 px-8 flex items-center justify-between text-steppa-muted text-sm">
        <span className="font-display text-white font-bold">STEPPA</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
