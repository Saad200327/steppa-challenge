export default function Avatar({ user, size='md' }) {
  const sizes = { sm:'w-8 h-8 text-xs', md:'w-10 h-10 text-sm', lg:'w-14 h-14 text-lg', xl:'w-20 h-20 text-2xl' }
  const initials = user?.displayName?.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || user?.username?.[0]?.toUpperCase() || '?'
  if (user?.avatarUrl) return <img src={user.avatarUrl} alt={user.displayName||user.username} className={`${sizes[size]} rounded-full object-cover`}/>
  const colors = ['#00ff88','#4d9eff','#ffb800','#ff3b5c','#a855f7']
  const c = colors[(user?.username?.charCodeAt(0)||0)%colors.length]
  return <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold`} style={{background:`${c}20`,color:c,border:`2px solid ${c}40`}}>{initials}</div>
}
