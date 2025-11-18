import React from 'react'

export default function ScreenSharePanel({ stream }) {
  if (!stream) return (
    <div className="aspect-video rounded-lg border border-white/10 flex items-center justify-center text-slate-400 bg-black/40">
      Screen not shared
    </div>
  )
  return (
    <video autoPlay playsInline muted className="w-full h-full object-cover rounded-lg border border-white/10" srcObject={stream} />
  )
}
