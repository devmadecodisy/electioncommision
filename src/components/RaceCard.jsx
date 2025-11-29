import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, LinearProgress, Button } from '@mui/material'

export default function RaceCard({ race, onWatch, watched }) {
  const leading = [...race.candidates].sort((a,b)=>b.votes-a.votes)[0]
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{race.office}</Typography>
        <Typography variant="body2">Leading: {leading.name} ({leading.party})</Typography>
        <LinearProgress variant="determinate" value={race.reporting} sx={{ my: 1 }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Link to={`/race/${race.id}`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Details</Button>
          </Link>
          <Button variant={watched ? 'contained' : 'outlined'} onClick={() => onWatch(race.id)}>
            {watched ? 'Watching' : 'Watch'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
