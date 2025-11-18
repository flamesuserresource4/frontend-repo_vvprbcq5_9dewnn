import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const nav = useNavigate()
  const { setUser } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.username || !form.password) return setError('Please fill all fields')
    const users = JSON.parse(localStorage.getItem('airecruiter:users') || '[]')
    if (users.find(u => u.username === form.username)) return setError('Username already exists')
    const newUsers = [...users, { username: form.username, password: form.password }]
    localStorage.setItem('airecruiter:users', JSON.stringify(newUsers))
    setUser({ username: form.username })
    nav('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-animate">
      <div className="card-glass p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create your account</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full px-4 py-3 rounded-md bg-black/50 border border-neon/40 outline-none" placeholder="Username" value={form.username} onChange={e=>setForm({...form, username: e.target.value})} />
          <input type="password" className="w-full px-4 py-3 rounded-md bg-black/50 border border-neon/40 outline-none" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button className="w-full px-4 py-3 rounded-md bg-teal-600 hover:bg-teal-500 transition btn-neon">Sign up</button>
        </form>
        <p className="text-sm text-center mt-4 text-slate-400">Already have an account? <Link to="/login" className="text-teal-300">Login</Link></p>
      </div>
    </div>
  )
}
