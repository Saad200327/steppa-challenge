import { useState, useEffect, useCallback } from 'react'
import { challengeService } from '../services/challengeService'
import { useChallengeStore } from '../store/challengeStore'

export function useChallenge(id) {
  const { setCurrentChallenge, setLeaderboard } = useChallengeStore()
  const [loading, setLoading] = useState(false)
  const fetchChallenge = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try { const { data } = await challengeService.get(id); setCurrentChallenge(data) }
    catch {} finally { setLoading(false) }
  }, [id, setCurrentChallenge])
  const fetchLeaderboard = useCallback(async () => {
    if (!id) return
    try { const { data } = await challengeService.getLeaderboard(id); setLeaderboard(data) } catch {}
  }, [id, setLeaderboard])
  useEffect(() => { fetchChallenge(); fetchLeaderboard() }, [fetchChallenge, fetchLeaderboard])
  return { loading, fetchChallenge, fetchLeaderboard }
}
