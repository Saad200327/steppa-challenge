import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Trophy, History, Wallet, Users, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const links = [
  { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/leaderboard', icon: <Trophy size={18} />, label: 'Leaderboard' },
  { to: '/history', icon: <History size={18} />, label: 'History' },
  { to: '/wallet', icon: <Wallet size={18} />, label: 'Wallet' },
  { to: '/social', icon: <Users size={18} />, label: 'Friends' },
  { to: '/settings', icon: <Settings size={18} />, label: 'Settings' },
];

export default function Sidebar() {
  const logout = useAuthStore(s => s.logout);
  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-steppa-surface border-r border-steppa-border py-6">
      <div className="px-6 mb-8">
        <span className="font-display text-xl font-extrabold text-white">STEPPA</span>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'bg-green-900/30 text-steppa-green' : 'text-steppa-muted hover:text-white hover:bg-steppa-elevated'
              }`
            }
          >
            {l.icon}{l.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 mt-4">
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-steppa-muted hover:text-steppa-red w-full transition-all">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
