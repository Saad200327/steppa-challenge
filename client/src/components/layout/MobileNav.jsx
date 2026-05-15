import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Trophy, History, Wallet, Users } from 'lucide-react';

const links = [
  { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Home' },
  { to: '/leaderboard', icon: <Trophy size={20} />, label: 'Ranks' },
  { to: '/history', icon: <History size={20} />, label: 'History' },
  { to: '/wallet', icon: <Wallet size={20} />, label: 'Wallet' },
  { to: '/social', icon: <Users size={20} />, label: 'Social' },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-steppa-surface border-t border-steppa-border flex">
      {links.map(l => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-3 gap-1 text-xs transition-all ${
              isActive ? 'text-steppa-green' : 'text-steppa-muted'
            }`
          }
        >
          {l.icon}
          <span>{l.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
