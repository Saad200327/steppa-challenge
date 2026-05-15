export default function StepBar({ current, goal, className='' }) {
  const pct = Math.min(100, Math.round((current/goal)*100))
  const color = pct>=75?'#00ff88':pct>=50?'#ffb800':'#ff3b5c'
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-xs text-text-secondary mb-1">
        <span>{(current||0).toLocaleString()} steps</span>
        <span>{pct}% of {(goal||0).toLocaleString()}</span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden border border-border" style={{background:'#1a1a26'}}>
        <div className="h-full rounded-full transition-all duration-500" style={{width:`${pct}%`,background:color,boxShadow:`0 0 8px ${color}60`}}/>
        {[25,50,75].map(m => <div key={m} className="absolute top-0 bottom-0 w-px bg-bg opacity-60" style={{left:`${m}%`}}/>)}
      </div>
      <div className="flex justify-between mt-1">
        {[25,50,75,100].map(m => <span key={m} className="text-xs" style={{color:pct>=m?color:'#2a2a3d'}}>{m}%</span>)}
      </div>
    </div>
  )
}
