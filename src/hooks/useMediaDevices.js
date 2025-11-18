import { useCallback, useEffect, useRef, useState } from 'react'

export function useMediaDevices() {
  const videoRef = useRef(null)
  const mediaStream = useRef(null)
  const screenStream = useRef(null)
  const mediaRecorder = useRef(null)
  const chunks = useRef([])
  const [recordingURL, setRecordingURL] = useState(null)
  const [isCamOn, setIsCamOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [error, setError] = useState(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      mediaStream.current = stream
      setIsCamOn(true)
      setIsMicOn(true)
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch (e) {
      setError('Camera/Microphone permission denied or unavailable')
    }
  }, [])

  const stopCamera = useCallback(() => {
    mediaStream.current?.getTracks().forEach(t => t.stop())
    mediaStream.current = null
    setIsCamOn(false)
    setIsMicOn(false)
    if (videoRef.current) videoRef.current.srcObject = null
  }, [])

  const toggleMic = useCallback(() => {
    if (!mediaStream.current) return
    const audioTracks = mediaStream.current.getAudioTracks()
    audioTracks.forEach(t => (t.enabled = !t.enabled))
    setIsMicOn(audioTracks.some(t => t.enabled))
  }, [])

  const toggleCam = useCallback(() => {
    if (!mediaStream.current) return
    const videoTracks = mediaStream.current.getVideoTracks()
    videoTracks.forEach(t => (t.enabled = !t.enabled))
    setIsCamOn(videoTracks.some(t => t.enabled))
  }, [])

  const startShare = useCallback(async () => {
    if (!navigator.mediaDevices.getDisplayMedia) return setError('Screen share not supported in this browser')
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      screenStream.current = stream
      setIsSharing(true)
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        stopShare()
      })
      return stream
    } catch (e) {
      setError('Screen share permission denied')
    }
  }, [])

  const stopShare = useCallback(() => {
    screenStream.current?.getTracks().forEach(t => t.stop())
    screenStream.current = null
    setIsSharing(false)
  }, [])

  const startRecording = useCallback(() => {
    const combinedStream = new MediaStream([
      ...(mediaStream.current ? mediaStream.current.getTracks() : []),
      ...(screenStream.current ? screenStream.current.getTracks() : []),
    ])
    try {
      mediaRecorder.current = new MediaRecorder(combinedStream, { mimeType: 'video/webm;codecs=vp9,opus' })
    } catch {
      mediaRecorder.current = new MediaRecorder(combinedStream)
    }
    chunks.current = []
    mediaRecorder.current.ondataavailable = e => {
      if (e.data.size > 0) chunks.current.push(e.data)
    }
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setRecordingURL(url)
    }
    mediaRecorder.current.start()
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop()
    }
  }, [])

  useEffect(() => {
    return () => {
      stopRecording()
      stopShare()
      stopCamera()
    }
  }, [stopCamera, stopShare, stopRecording])

  return {
    videoRef,
    startCamera,
    stopCamera,
    toggleMic,
    toggleCam,
    startShare,
    stopShare,
    startRecording,
    stopRecording,
    recordingURL,
    isCamOn,
    isMicOn,
    isSharing,
    error,
  }
}
