import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns'

export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return '0.00'
  return Number(amount).toFixed(2)
}
export function formatSteps(steps) {
  if (!steps) return '0'
  return Number(steps).toLocaleString()
}
export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  if (isToday(d)) return 'Today'
  if (isYesterday(d)) return 'Yesterday'
  return format(d, 'MMM d, yyyy')
}
export function formatTime(date) {
  if (!date) return ''
  return format(new Date(date), 'HH:mm')
}
export function formatRelativeTime(date) {
  if (!date) return ''
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
export function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00'
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}
export function getProfitClass(amount) {
  if (amount > 0) return 'text-accent-green'
  if (amount < 0) return 'text-accent-red'
  return 'text-text-secondary'
}
export function getProfitPrefix(amount) {
  return amount > 0 ? '+' : ''
}
