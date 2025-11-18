import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Dashboard from './dashboard/Dashboard'
import InterviewRoom from './interview/InterviewRoom'
import InterviewHistory from './history/InterviewHistory'
import ResumeUpload from './resume/ResumeUpload'
import ResumePreview from './resume/ResumePreview'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Sidebar from './layout/Sidebar'
import { AuthProvider, useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function Shell({ children }) {
  return (
    <div className="min-h-screen gradient-animate">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center">
      <div className="absolute inset-0 opacity-70 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(900px_400px_at_10%_20%,rgba(168,85,247,0.15),transparent_60%),radial-gradient(800px_400px_at_90%_10%,rgba(20,184,166,0.14),transparent_60%),radial-gradient(1000px_600px_at_50%_90%,rgba(59,130,246,0.12),transparent_60%)] animate-pulse"></div>
      </div>
      <div className="relative z-10 px-6 md:px-12 pt-24 md:pt-36 max-w-5xl">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold text-white text-neon">
          AIRecruiter
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} className="mt-4 text-lg md:text-2xl text-teal-200 max-w-2xl">
          Your AI-powered mock interview studio with webcam, coding editor, and smart questions.
        </motion.p>
        <div className="mt-8 flex gap-3 flex-wrap">
          <a href="/login" className="px-5 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 transition btn-neon">Login</a>
          <a href="/signup" className="px-5 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 transition">Create account</a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<ProtectedRoute><Shell><Home /></Shell></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Shell><Dashboard /></Shell></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Shell><Profile /></Shell></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><Shell><ResumeUpload /></Shell></ProtectedRoute>} />
          <Route path="/resume/preview" element={<ProtectedRoute><Shell><ResumePreview /></Shell></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><Shell><InterviewRoom /></Shell></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><Shell><InterviewHistory /></Shell></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
