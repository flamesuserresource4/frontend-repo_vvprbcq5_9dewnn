import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const loc = useLocation()
  return (
    <aside className="hidden md:block w-64 p-4 border-r border-white/10 bg-black/20 min-h-[calc(100vh-56px-64px)]">
      <nav className="space-y-2">
        <Item to="/dashboard" active={loc.pathname==='/dashboard'}>Dashboard</Item>
        <Item to="/resume" active={loc.pathname.startsWith('/resume')}>Resume</Item>
        <Item to="/interview" active={loc.pathname==='/interview'}>Interview</Item>
        <Item to="/history" active={loc.pathname==='/history'}>History</Item>
        <Item to="/profile" active={loc.pathname==='/profile'}>Profile</Item>
      </nav>
    </aside>
  )
}

function Item({ to, active, children }) {
  return (
    <Link to={to} className={`block px-4 py-3 rounded-lg ${active? 'bg-violet-600/30 text-white border border-violet-400/40':'hover:bg-white/5 text-slate-200'} transition`}>
      {children}
    </Link>
  )
}
