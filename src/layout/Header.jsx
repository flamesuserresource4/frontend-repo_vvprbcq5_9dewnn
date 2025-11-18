import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const onLogout = () => { logout(); nav('/login') }
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={user ? '/dashboard' : '/'} className="font-extrabold tracking-tight text-white text-xl">AIRecruiter</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          {user && <>
            <Link to="/dashboard" className={loc.pathname==='/dashboard'?'text-white':''}>Dashboard</Link>
            <Link to="/interview" className={loc.pathname==='/interview'?'text-white':''}>Interview</Link>
            <Link to="/history" className={loc.pathname==='/history'?'text-white':''}>History</Link>
          </>}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:block text-slate-300">{user.username}</span>
              <button onClick={onLogout} className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-500 btn-neon">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-500 btn-neon">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
