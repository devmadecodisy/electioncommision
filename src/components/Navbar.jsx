import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">Election Monitor</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Dashboard</Link>
      </div>
    </nav>
  )
}
