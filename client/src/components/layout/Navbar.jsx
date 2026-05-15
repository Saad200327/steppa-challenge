import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Trophy, History, Wallet, Users, Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../services/authService'
import Avatar from '../ui/Avatar'
import toast from 'react-hot-toast'

const navLinks = [
  { to:'/dashboard', icon:LayoutDashboard, label:'Dashboard' },
  { to:'/leaderboard', icon:Trophy, label:'Leaderboard' },
  { to:'/history', icon:History, label:'History' },
  { to:'/wallet', icon:Wallet, label:'Wallet' },
  { to:'/social', icon:Users, label:'Social' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const handleLogout = async () => {
    try { await authService.logout() } catch {}
    logout(); navigate('/')
    toast.success('Logged out')
  }
  return (
    <nav className="hidden md:flex flex-col w-64 min-h-screen border-r border-border bg-surface p-6 fixed left-0 top-0 bottom-0 z-40">
      <Link to="/dashboard" className="flex items-center gap-3 mb-10">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#0a0a0f"/>
          <path d="M6 24 L12 8 L16 16 L20 10 L26 24" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="26" cy="24" r="2" fill="#00ff88"/>
        </svg>
        <span className="font-display font-bold text-xl">STEPPA</span>
      </Link>
      <div className="flex flex-col gap-1 flex-1">
        {navLinks.map(({ to, icon:Icon, label }) => (
          <Link key={to} to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
            location.pathname===to?'bg-surface-elevated text-accent-green border border-border':'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}>
            <Icon size={18}/>{label}
          </Link>
        ))}
      </div>
      <div className="mt-6 border-t border-border pt-6">
        {user && (
          <Link to={`/profile/${user.username}`} className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
            <Avatar user={user} size="sm"/>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.displayName}</p>
              <p className="text-xs text-text-secondary truncate">@{user.username}</p>
            </div>
          </Link>
        )}
        <div className="flex gap-2">
          <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all flex-1">
            <Settings size={14}/> Settings
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-accent-red transition-all">
            <LogOut size={14}/>
          </button>
        </div>
      </div>
    </nav>
  )
}
