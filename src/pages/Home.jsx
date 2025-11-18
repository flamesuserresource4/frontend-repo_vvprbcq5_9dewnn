import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-8">
        <h1 className="text-3xl font-bold text-white text-neon">Welcome to AIRecruiter</h1>
        <p className="text-teal-200 mt-2">Run AI-powered mock interviews with webcam, coding, and auto-saved history.</p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link to="/dashboard" className="px-5 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 transition btn-neon">Go to Dashboard</Link>
          <Link to="/interview" className="px-5 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 transition">Start Interview</Link>
        </div>
      </motion.div>
    </div>
  )
}
