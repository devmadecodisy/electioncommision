import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRaceById } from '../services/api'
import { Container, Typography, Paper } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function RaceDetails() {
  const { id } = useParams()
  const [race, setRace] = useState(null)

  useEffect(() => {
    async function load() {
      const r = await fetchRaceById(id)
      setRace(r)
    }
    load()
  }, [id])

  if (!race) return <Container sx={{ py: 4 }}>Loading...</Container>

  const data = race.candidates.map((c) => ({ name: c.name, value: c.votes }))

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h5">{race.office}</Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Reporting: {race.reporting}%</Typography>
      <Paper sx={{ p: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  )
}
