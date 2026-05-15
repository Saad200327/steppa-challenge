import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Trophy, History, Wallet, Users } from 'lucide-react'
const tabs = [
  { to:'/dashboard', icon:LayoutDashboard, label:'Home' },
  { to:'/leaderboard', icon:Trophy, label:'Ranks' },
  { to:'/history', icon:History, label:'History' },
  { to:'/wallet', icon:Wallet, label:'Wallet' },
  { to:'/social', icon:Users, label:'Social' },
]
export default function MobileNav() {
  const location = useLocation()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border flex">
      {tabs.map(({ to, icon:Icon, label }) => (
        <Link key={to} to={to} className={`flex-1 flex flex-col items-center py-3 gap-1 text-xs transition-all ${
          location.pathname===to?'text-accent-green':'text-text-secondary'
        }`}>
          <Icon size={20}/>{label}
        </Link>
      ))}
    </nav>
  )
}
