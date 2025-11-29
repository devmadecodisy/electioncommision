import React, { useEffect, useState } from 'react'
import { fetchRaces } from '../services/api'
import RaceCard from '../components/RaceCard'
import { useAppState, useAppDispatch } from '../context/AppContext'
import useLocalStorage from '../hooks/useLocalStorage'
import usePolling from '../hooks/usePolling'
import { Container, Typography, CircularProgress, Alert, Button } from '@mui/material'

export default function Dashboard() {
  const [races, setRaces] = useState([])
  const [loading, setLoading] = useState(true)
  const state = useAppState()
  const dispatch = useAppDispatch()
  const [stored, setStored] = useLocalStorage('watched', [])
  const [error, setError] = useState(null)

  useEffect(() => {
    // restore watched from localStorage into context
    if (stored && stored.length) {
      stored.forEach((id) => dispatch({ type: 'TOGGLE_WATCH', payload: id }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchRaces()
      setRaces(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch races')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // poll for updates every 8s
  usePolling(load, 8000, true)

  useEffect(() => {
    setStored(state.watched)
  }, [state.watched])

  function handleWatch(id) {
    dispatch({ type: 'TOGGLE_WATCH', payload: id })
  }

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Live Races</Typography>
      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
          <Button onClick={load} sx={{ ml: 2 }} variant="outlined">
            Retry
          </Button>
        </Alert>
      )}
      {!loading && races.length === 0 && !error && <Typography>No races</Typography>}
      {races.map((r) => (
        <RaceCard key={r.id} race={r} onWatch={handleWatch} watched={state.watched.includes(r.id)} />
      ))}
    </Container>
  )
}
