import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  return (
    <div className="card-glass p-6">
      <h2 className="text-xl font-semibold">Profile</h2>
      <div className="mt-4 space-y-2">
        <div><span className="text-slate-400">Username:</span> <span className="font-medium">{user?.username}</span></div>
      </div>
    </div>
  )
}
