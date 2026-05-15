import { useEffect, useState } from 'react'
import { formatCountdown } from '../../utils/formatters'
import { calcMidnightMs } from '../../utils/stepCalculator'

export default function CountdownTimer({ className='', showLabel=true }) {
  const [msLeft, setMsLeft] = useState(calcMidnightMs())
  useEffect(() => {
    const i = setInterval(() => setMsLeft(calcMidnightMs()), 1000)
    return () => clearInterval(i)
  }, [])
  const isCritical = msLeft < 3600000
  const isUrgent = msLeft < 600000
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {showLabel && <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">Time Left</span>}
      <span className={`font-stats text-2xl font-bold tracking-widest transition-all ${isUrgent?'text-accent-red':isCritical?'text-accent-yellow':'text-text-primary'}`}
        style={isUrgent?{textShadow:'0 0 10px rgba(255,59,92,0.6)'}:{}}>
        {formatCountdown(msLeft)}
      </span>
      {isCritical && <span className="text-xs mt-1" style={{color:isUrgent?'#ff3b5c':'#ffb800'}}>{isUrgent?'⚠ UNDER 10 MIN':'⚠ Under 1 hour'}</span>}
    </div>
  )
}
