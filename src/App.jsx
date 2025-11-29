import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import RaceDetails from './pages/RaceDetails'
import Navbar from './components/Navbar'
import './App.css'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/race/:id" element={<RaceDetails />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
