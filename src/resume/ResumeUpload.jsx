import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export default function ResumeUpload() {
  const [resume, setResume] = useLocalStorage('airecruiter:resume', null)

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10*1024*1024) return alert('File too large (>10MB)')
    const reader = new FileReader()
    reader.onload = () => setResume({ name: file.name, type: file.type, data: reader.result })
    reader.readAsDataURL(file)
  }

  return (
    <div className="card-glass p-6">
      <h2 className="text-xl font-semibold">Resume Upload</h2>
      <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={onFile} className="mt-4" />
      {resume && <p className="mt-3 text-sm text-slate-300">Saved: {resume.name}</p>}
    </div>
  )
}
