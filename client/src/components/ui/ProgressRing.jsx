import { useMemo } from 'react'
export default function ProgressRing({ progress=0, size=120, strokeWidth=8, label, sublabel }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  const color = useMemo(() => {
    if (progress >= 75) return '#00ff88'
    if (progress >= 50) return '#ffb800'
    if (progress >= 25) return '#ff8800'
    return '#ff3b5c'
  }, [progress])
  return (
    <div className="relative inline-flex items-center justify-center" style={{width:size,height:size}}>
      <svg width={size} height={size} className="progress-ring">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#2a2a3d" strokeWidth={strokeWidth}/>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} className="progress-ring__circle"
          style={{filter:`drop-shadow(0 0 6px ${color}60)`}}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="font-stats text-lg font-bold" style={{color}}>{label}</span>}
        {sublabel && <span className="text-xs text-text-secondary">{sublabel}</span>}
      </div>
    </div>
  )
}
