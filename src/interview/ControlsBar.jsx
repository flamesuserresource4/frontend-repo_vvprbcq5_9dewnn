import React from 'react'

export default function ControlsBar({ onStartCam, onStopCam, onToggleMic, onToggleCam, onStartShare, onStopShare, onStartRec, onStopRec, isCamOn, isMicOn, isSharing, canShare }) {
  return (
    <div className="card-glass p-3 fixed md:static bottom-3 left-3 right-3 flex items-center justify-between gap-2">
      <div className="flex gap-2">
        <button onClick={onStartCam} className="px-3 py-2 bg-teal-600 rounded-md">Start</button>
        <button onClick={onStopCam} className="px-3 py-2 bg-slate-700 rounded-md">Stop</button>
        <button onClick={onToggleMic} className={`px-3 py-2 rounded-md ${isMicOn? 'bg-violet-600':'bg-slate-700'}`}>Mic</button>
        <button onClick={onToggleCam} className={`px-3 py-2 rounded-md ${isCamOn? 'bg-violet-600':'bg-slate-700'}`}>Cam</button>
      </div>
      <div className="flex gap-2">
        <button disabled={!canShare} onClick={onStartShare} className={`px-3 py-2 rounded-md ${canShare? 'bg-emerald-600':'bg-slate-700 cursor-not-allowed'}`}>Share</button>
        <button onClick={onStopShare} className="px-3 py-2 bg-slate-700 rounded-md">Stop Share</button>
        <button onClick={onStartRec} className="px-3 py-2 bg-rose-600 rounded-md">Record</button>
        <button onClick={onStopRec} className="px-3 py-2 bg-slate-700 rounded-md">Stop</button>
      </div>
    </div>
  )
}
