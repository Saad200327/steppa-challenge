export function calcStepsLeft(current, goal) { return Math.max(0, goal - current) }
export function calcProgressPercent(current, goal) {
  if (!goal) return 0
  return Math.min(100, Math.round((current / goal) * 100))
}
export function calcProjectedPayout(betAmount, winnerPool, loserPool, fee = 0.05) {
  if (!winnerPool) return betAmount
  const dist = loserPool - loserPool * fee
  return betAmount + dist * (betAmount / winnerPool)
}
export function calcMidnightMs() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  return midnight.getTime() - now.getTime()
}
export function isCriticalTime() {
  return new Date().getHours() === 23
}
