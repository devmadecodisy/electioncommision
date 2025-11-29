
import mock from '../data/mockData.json'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

async function fetchFromRemote(path) {
  const url = API_URL.replace(/\/$/, '') + path
  const resp = await axios.get(url, { timeout: 7000 })
  return resp.data
}

// Simple service layer with two modes:
// - If VITE_API_URL is set, call the real backend endpoints.
// - Otherwise, fall back to local mock data for development.

export async function fetchRaces() {
  // simulate network delay for mock mode
  if (!API_URL) await new Promise((r) => setTimeout(r, 250))
  try {
    if (API_URL) {
      // Expecting remote API to return { races: [...] } or [...]
      const data = await fetchFromRemote('/races')
      return Array.isArray(data) ? data : data.races || []
    }
    return mock.races
  } catch (err) {
    // normalize error
    const msg = err?.response?.data?.message || err.message || 'Failed to load races'
    throw new Error(msg)
  }
}

export async function fetchRaceById(id) {
  if (!API_URL) await new Promise((r) => setTimeout(r, 150))
  try {
    if (API_URL) {
      const data = await fetchFromRemote(`/races/${encodeURIComponent(id)}`)
      return data
    }
    const found = mock.races.find((r) => r.id === id)
    if (!found) throw new Error('Race not found')
    return found
  } catch (err) {
    const msg = err?.response?.data?.message || err.message || 'Failed to load race'
    throw new Error(msg)
  }
}
