import React, { useMemo } from 'react'

export default function InterviewHistory() {
  const history = useMemo(() => JSON.parse(localStorage.getItem('airecruiter:history')||'[]'), [])
  const download = (url) => {
    const a = document.createElement('a')
    a.href = url
    a.download = 'interview.webm'
    a.click()
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Interview History</h2>
      {history.length===0 && <p className="text-slate-400">No history yet.</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map(item => (
          <div key={item.id} className="card-glass p-4">
            <div className="text-sm text-slate-400">{new Date(item.timestamp).toLocaleString()}</div>
            <div className="font-medium">{item.role}</div>
            <div className="text-xs text-slate-500">Duration: {Math.round(item.duration/1000)}s</div>
            {item.recordingURL && <button onClick={()=>download(item.recordingURL)} className="mt-3 px-3 py-2 rounded-md bg-rose-600">Download Recording</button>}
            {item.notes && <div className="mt-2 text-xs text-slate-300">Notes: {item.notes.slice(0,140)}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
