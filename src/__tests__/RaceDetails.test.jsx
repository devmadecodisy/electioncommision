import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

// Mock MUI and recharts so the page import doesn't pull heavy ESM that breaks transforms
vi.mock('@mui/material', () => ({
  Container: ({ children }) => <div>{children}</div>,
  Typography: ({ children }) => <div>{children}</div>,
  Paper: ({ children }) => <div>{children}</div>
}))

vi.mock('recharts', () => ({
  PieChart: ({ children }) => <div>{children}</div>,
  Pie: ({ children }) => <div>{children}</div>,
  Cell: () => <div />, 
  Tooltip: () => <div />, 
  Legend: () => <div />, 
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}))

vi.mock('../services/api', () => {
  return {
    fetchRaceById: async (id) => ({
      id,
      office: 'Mock Office',
      reporting: 80,
      candidates: [
        { name: 'X', votes: 100 },
        { name: 'Y', votes: 80 }
      ]
    })
  }
})

// Import after mocks
import RaceDetails from '../pages/RaceDetails'

test('renders race details and chart', async () => {
  render(
    <MemoryRouter initialEntries={["/race/mock-id"]}>
      <Routes>
        <Route path="/race/:id" element={<RaceDetails />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => expect(screen.getByText(/Mock Office/)).toBeInTheDocument())
  expect(screen.getByText(/Reporting: 80%/i)).toBeInTheDocument()
})
