import { Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Avatar from '../ui/Avatar';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const user = useAuthStore(s => s.user);
  return (
    <header className="h-14 border-b border-steppa-border bg-steppa-surface flex items-center px-6 gap-4 sticky top-0 z-30">
      <span className="font-display font-bold text-white text-lg md:hidden">STEPPA</span>
      <div className="flex-1" />
      <button className="text-steppa-muted hover:text-white"><Bell size={18} /></button>
      <Link to={`/profile/${user?.username}`}>
        <Avatar user={user} size="sm" />
      </Link>
    </header>
  );
}
