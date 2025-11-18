import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useMediaDevices } from '../hooks/useMediaDevices'
import VideoPanel from './VideoPanel'
import ControlsBar from './ControlsBar'
import CodeEditorPanel from './CodeEditorPanel'
import AIQuestionsPanel from './AIQuestionsPanel'
import { fetchFollowUp, fetchNextQuestion } from '../utils/aiClient'
import useLocalStorage from '../hooks/useLocalStorage'

export default function InterviewRoom() {
  const { videoRef, startCamera, stopCamera, toggleMic, toggleCam, startShare, stopShare, startRecording, stopRecording, recordingURL, isCamOn, isMicOn, isSharing, error } = useMediaDevices()
  const [role] = useLocalStorage('airecruiter:role', '')
  const [questions, setQuestions] = useState([])
  const [notes, setNotes] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [mobileEditor, setMobileEditor] = useState(false)

  const canShare = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)

  useEffect(() => {
    startCamera()
    setStartTime(Date.now())
    nextQuestion()
    // cleanup handled in hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nextQuestion = async () => {
    const q = await fetchNextQuestion(role)
    setQuestions(qs => [...qs, q])
  }

  const followUp = async () => {
    const q = await fetchFollowUp(questions[questions.length-1]||'')
    setQuestions(qs => [...qs, q])
  }

  const saveSession = () => {
    const end = Date.now()
    const item = {
      id: crypto.randomUUID(),
      role,
      questions,
      timestamp: end,
      duration: startTime ? end - startTime : 0,
      recordingURL: recordingURL || null,
      notes,
    }
    const history = JSON.parse(localStorage.getItem('airecruiter:history')||'[]')
    localStorage.setItem('airecruiter:history', JSON.stringify([item, ...history]))
    alert('Interview saved to history')
  }

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <VideoPanel videoRef={videoRef} error={error} />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="hidden md:block">
              <CodeEditorPanel />
            </div>
            <div className="block md:hidden">
              {!mobileEditor ? (
                <button onClick={()=>setMobileEditor(true)} className="w-full px-4 py-3 rounded-md bg-violet-600">Open Code Editor</button>
              ) : (
                <CodeEditorPanel mobileFull onClose={()=>setMobileEditor(false)} />
              )}
            </div>
            <div className="card-glass p-4">
              <div className="font-semibold mb-2">Notes</div>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} className="w-full h-40 bg-black/40 border border-white/10 rounded-md p-2" placeholder="Type notes here..." />
              <button onClick={saveSession} className="mt-3 px-4 py-2 rounded-md bg-teal-600">Save Session</button>
              {recordingURL && <a href={recordingURL} download className="ml-2 text-sm text-teal-300">Download recording</a>}
            </div>
          </div>
        </div>
        <AIQuestionsPanel questions={questions} onNext={nextQuestion} onFollow={followUp} />
      </div>

      <ControlsBar
        onStartCam={startCamera}
        onStopCam={stopCamera}
        onToggleMic={toggleMic}
        onToggleCam={toggleCam}
        onStartShare={startShare}
        onStopShare={stopShare}
        onStartRec={() => { startRecording() }}
        onStopRec={() => { stopRecording() }}
        isCamOn={isCamOn}
        isMicOn={isMicOn}
        isSharing={isSharing}
        canShare={canShare}
      />
    </div>
  )
}
