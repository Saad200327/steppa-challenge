import { useState, useEffect } from 'react'
import { calcMidnightMs } from '../utils/stepCalculator'
import { formatCountdown } from '../utils/formatters'

export function useCountdown() {
  const [msLeft, setMsLeft] = useState(calcMidnightMs())
  useEffect(() => {
    const i = setInterval(() => setMsLeft(calcMidnightMs()), 1000)
    return () => clearInterval(i)
  }, [])
  return {
    msLeft, display: formatCountdown(msLeft),
    isCritical: msLeft < 3600000,
    isUrgent: msLeft < 600000,
  }
}
