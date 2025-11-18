import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const res = login(form.username, form.password)
    if (res.success) nav('/dashboard')
    else setError(res.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-animate">
      <div className="card-glass p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign in to AIRecruiter</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full px-4 py-3 rounded-md bg-black/50 border border-neon/40 outline-none" placeholder="Username" value={form.username} onChange={e=>setForm({...form, username: e.target.value})} />
          <input type="password" className="w-full px-4 py-3 rounded-md bg-black/50 border border-neon/40 outline-none" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button className="w-full px-4 py-3 rounded-md bg-violet-600 hover:bg-violet-500 transition btn-neon">Login</button>
        </form>
        <p className="text-sm text-center mt-4 text-slate-400">No account? <Link to="/signup" className="text-teal-300">Create one</Link> (demo)</p>
        <p className="text-xs text-slate-500 mt-3 text-center">Demo credentials: admin / admin</p>
      </div>
    </div>
  )
}
