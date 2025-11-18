import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Dashboard() {
  const nav = useNavigate()
  const [role, setRole] = useLocalStorage('airecruiter:role', '')
  const [resume, setResume] = useLocalStorage('airecruiter:resume', null)
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('airecruiter:history')||'[]'))

  useEffect(() => {
    const listener = () => setHistory(JSON.parse(localStorage.getItem('airecruiter:history')||'[]'))
    window.addEventListener('storage', listener)
    return () => window.removeEventListener('storage', listener)
  }, [])

  const onStart = () => {
    nav('/interview')
  }

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10*1024*1024) return alert('File too large (>10MB)')
    const reader = new FileReader()
    reader.onload = () => setResume({ name: file.name, type: file.type, data: reader.result })
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-glass p-6">
          <h3 className="font-semibold text-lg">Profile</h3>
          <p className="text-sm text-slate-400">Welcome back. Set your target role and upload resume.</p>
          <div className="mt-4 space-y-3">
            <input value={role} onChange={e=>setRole(e.target.value)} placeholder="Seeking Job Role" className="w-full px-4 py-3 rounded-md bg-black/50 border border-white/10" />
            <label className="block">
              <span className="text-sm text-slate-400">Upload Resume (PDF/DOC/DOCX, max 10MB)</span>
              <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={onFile} className="mt-2 block w-full text-sm" />
            </label>
            {resume && (
              <div className="mt-2 text-sm text-slate-300">Saved: {resume.name} <Link to="/resume/preview" className="text-teal-300 ml-2">Preview</Link></div>
            )}
          </div>
          <button onClick={onStart} className="mt-4 w-full px-4 py-3 rounded-md bg-teal-600 hover:bg-teal-500 btn-neon">Start AI Interview</button>
        </div>

        <div className="card-glass p-6 md:col-span-2">
          <h3 className="font-semibold text-lg">Previous Interviews</h3>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.length === 0 && <p className="text-slate-400">No interviews yet.</p>}
            {history.map(h => (
              <Link key={h.id} to="/history" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10">
                <div className="text-sm text-slate-400">{new Date(h.timestamp).toLocaleString()}</div>
                <div className="font-medium">{h.role || 'Interview'}</div>
                <div className="text-xs text-slate-500">Duration: {Math.round(h.duration/1000)}s</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
