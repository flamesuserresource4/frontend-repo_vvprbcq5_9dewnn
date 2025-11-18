import React, { useEffect } from 'react'

export default function VideoPanel({ videoRef, error }) {
  useEffect(() => {}, [])
  return (
    <div className="relative bg-black/50 rounded-lg overflow-hidden border border-white/10 aspect-video">
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-red-300 bg-black/60">
          {error}
        </div>
      )}
    </div>
  )
}
