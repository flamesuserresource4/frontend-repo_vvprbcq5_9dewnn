import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('airecruiter:user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('airecruiter:user', JSON.stringify(user))
    else localStorage.removeItem('airecruiter:user')
  }, [user])

  const login = (username, password) => {
    // Hardcoded admin/admin OR any signed up user from localStorage
    if (username === 'admin' && password === 'admin') {
      setUser({ username: 'admin' })
      return { success: true }
    }
    const users = JSON.parse(localStorage.getItem('airecruiter:users') || '[]')
    const found = users.find(u => u.username === username && u.password === password)
    if (found) {
      setUser({ username: found.username })
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, logout, setUser }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
