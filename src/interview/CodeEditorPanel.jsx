import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'

export default function CodeEditorPanel({ mobileFull, onClose }) {
  const [code, setCode] = useState("// Write your solution here\nfunction solve() {\n  return true\n}")

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        if (onClose) onClose('toggle')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const editor = (
    <div className="h-[50vh] md:h-full rounded-lg overflow-hidden border border-white/10">
      <Editor height="100%" defaultLanguage="javascript" theme="vs-dark" value={code} onChange={v=>setCode(v)} options={{ fontSize: 14, minimap: { enabled: false } }} />
    </div>
  )

  if (mobileFull) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Code Editor</div>
          <button onClick={() => onClose && onClose()} className="px-3 py-1 rounded-md bg-violet-600">Close</button>
        </div>
        {editor}
      </div>
    )
  }
  return editor
}
