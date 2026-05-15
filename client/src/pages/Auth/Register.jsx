import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';

export default function Register() {
  const [form, setForm] = useState({ email: '', username: '', displayName: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore(s => s.setAuth);
  const nav = useNavigate();

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handle = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const data = await authService.register(form);
      setAuth(data.user, data.accessToken);
      toast.success('Account created!');
      nav('/onboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-steppa-bg">
      <div className="hidden md:flex flex-col items-center justify-center bg-steppa-surface border-r border-steppa-border p-12">
        <span className="font-display text-4xl font-extrabold text-white mb-4">STEPPA</span>
        <p className="text-steppa-muted text-center max-w-xs">Join thousands of challengers. Stake your commitment.</p>
      </div>
      <div className="flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Create Account</h2>
          <form onSubmit={handle} className="space-y-4">
            {[['Email','email','email'],['Username','username','text'],['Display Name','displayName','text'],['Password','password','password'],['Confirm Password','confirm','password']].map(([label, key, type]) => (
              <div key={key}>
                <label className="label">{label}</label>
                <input className="input" type={type} required value={form[key]} onChange={set(key)} />
              </div>
            ))}
            <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
          <p className="mt-4 text-steppa-muted text-sm text-center">
            Already have an account? <Link to="/login" className="text-steppa-green hover:underline">Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
