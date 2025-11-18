import React from 'react'

export default function AIQuestionsPanel({ questions, onNext, onFollow }) {
  return (
    <div className="card-glass p-4 h-full flex flex-col">
      <div className="font-semibold mb-2">AI Questions</div>
      <div className="flex-1 space-y-2 overflow-auto pr-2">
        {questions.map((q, i) => (
          <div key={i} className="p-3 rounded-md bg-white/5 border border-white/10 text-sm">{q}</div>
        ))}
        {questions.length===0 && <div className="text-slate-400 text-sm">No questions yet.</div>}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={onNext} className="px-3 py-2 rounded-md bg-teal-600">Next Question</button>
        <button onClick={onFollow} className="px-3 py-2 rounded-md bg-violet-600">Follow-up</button>
      </div>
    </div>
  )
}
