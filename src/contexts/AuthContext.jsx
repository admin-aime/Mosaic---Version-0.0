import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mosaic_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // For prototype: accept any credentials
    const userData = {
      id: Date.now().toString(),
      email,
      firstName: email.split('@')[0],
      lastName: 'User',
      profilePicture: null,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    
    setUser(userData)
    localStorage.setItem('mosaic_user', JSON.stringify(userData))
    return { success: true, user: userData }
  }

  const register = async (userData) => {
    // For prototype: accept any registration
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      profilePicture: null,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    
    setUser(newUser)
    localStorage.setItem('mosaic_user', JSON.stringify(newUser))
    return { success: true, user: newUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mosaic_user')
    localStorage.removeItem('mosaic_assessments')
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('mosaic_user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
