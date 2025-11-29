import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AppProvider } from '../context/AppContext'

// Mock UI libs and components before importing the page to avoid transform issues
vi.mock('@mui/material', () => ({
  Container: ({ children }) => <div>{children}</div>,
  Typography: ({ children }) => <div>{children}</div>,
  CircularProgress: () => <div data-testid="loading" />,
  Alert: ({ children }) => <div>{children}</div>,
  Button: ({ children, ...rest }) => <button {...rest}>{children}</button>
}))

vi.mock('../components/RaceCard', () => ({
  default: ({ race }) => <div data-testid="racecard">{race.office}</div>
}))

// Mock the api module so Dashboard gets predictable data
vi.mock('../services/api', () => {
  return {
    fetchRaces: async () => [
      { id: 'r1', office: 'Test Office', candidates: [{ name: 'A', votes: 10 }], reporting: 50 }
    ]
  }
})

// Import after mocks
import Dashboard from '../pages/Dashboard'

test('renders dashboard and shows races', async () => {
  render(
    <AppProvider>
      <Dashboard />
    </AppProvider>
  )

  expect(screen.getByText(/Live Races/i)).toBeInTheDocument()

  // wait for the mocked race to render
  await waitFor(() => expect(screen.getByTestId('racecard')).toHaveTextContent('Test Office'))
})
