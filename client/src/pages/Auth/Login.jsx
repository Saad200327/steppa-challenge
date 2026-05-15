import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore(s => s.setAuth);
  const nav = useNavigate();

  const handle = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.login(form.email, form.password);
      setAuth(data.user, data.accessToken);
      toast.success('Welcome back!');
      nav('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-steppa-bg">
      {/* Left branding panel */}
      <div className="hidden md:flex flex-col items-center justify-center bg-steppa-surface border-r border-steppa-border p-12">
        <span className="font-display text-4xl font-extrabold text-white mb-4">STEPPA</span>
        <p className="text-steppa-muted text-center max-w-xs">Your laziness is someone else's paycheck.</p>
        <div className="mt-10 font-mono text-steppa-green text-5xl font-bold tabular-nums animate-pulse">10,000</div>
        <div className="text-steppa-muted text-sm mt-2">steps to freedom</div>
      </div>
      {/* Right form */}
      <div className="flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Login</h2>
          <form onSubmit={handle} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>
            <label className="flex items-center gap-2 text-steppa-muted text-sm cursor-pointer">
              <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} />
              Remember me
            </label>
            <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </form>
          <p className="mt-4 text-steppa-muted text-sm text-center">
            No account? <Link to="/register" className="text-steppa-green hover:underline">Register</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
