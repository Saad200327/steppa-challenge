export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'
export const STEP_GOALS = [5000, 7500, 10000, 15000]
export const DEFAULT_STEP_GOAL = 10000
export const PLATFORM_FEE = 0.05
export const ACHIEVEMENTS = [
  { id: 'first_win', emoji: '🥇', name: 'First Win', desc: 'Win your first challenge' },
  { id: 'on_fire', emoji: '🔥', name: 'On Fire', desc: '7-day win streak' },
  { id: 'marathon_man', emoji: '🏃', name: 'Marathon Man', desc: '30-day win streak' },
  { id: 'money_maker', emoji: '💰', name: 'Money Maker', desc: 'Earn 100 SC total' },
  { id: 'late_bloomer', emoji: '🌸', name: 'Late Bloomer', desc: 'Win after being below goal at 11pm' },
  { id: 'ghost_walker', emoji: '👻', name: 'Ghost Walker', desc: 'Hit goal without app open all day' },
  { id: 'sharpshooter', emoji: '🎯', name: 'Sharpshooter', desc: '10 wins in a row' },
]
