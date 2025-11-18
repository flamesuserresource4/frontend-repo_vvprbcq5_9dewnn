import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export default function ResumePreview() {
  const [resume] = useLocalStorage('airecruiter:resume', null)
  return (
    <div className="card-glass p-6">
      <h2 className="text-xl font-semibold">Resume Preview</h2>
      {!resume && <p className="mt-4 text-slate-400">No resume uploaded yet.</p>}
      {resume && (
        <div className="mt-4">
          <p className="text-sm text-slate-300">{resume.name}</p>
          {resume.type.includes('pdf') ? (
            <iframe title="resume" src={resume.data} className="w-full h-[70vh] rounded-lg border border-white/10" />
          ) : (
            <div className="text-slate-400">Preview not available for this format. Download: <a href={resume.data} download className="text-teal-300">{resume.name}</a></div>
          )}
        </div>
      )}
    </div>
  )
}
