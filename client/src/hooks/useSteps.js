import { useState, useEffect, useCallback } from 'react'
import { stepService } from '../services/stepService'

export function useSteps() {
  const [todaySteps, setTodaySteps] = useState(0)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchToday = useCallback(async () => {
    try { const { data } = await stepService.getToday(); setTodaySteps(data.steps || 0) } catch {}
  }, [])
  const fetchHistory = useCallback(async () => {
    try { const { data } = await stepService.getHistory(); setHistory(data) } catch {}
  }, [])
  const syncSteps = useCallback(async () => {
    setLoading(true)
    try { const { data } = await stepService.sync(); setTodaySteps(data.steps || 0) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { fetchToday() }, [fetchToday])
  return { todaySteps, history, loading, fetchToday, fetchHistory, syncSteps, setTodaySteps }
}
