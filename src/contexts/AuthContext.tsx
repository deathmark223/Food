'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'customer' | 'restaurant' | 'rider' | 'admin'
  verified_phone: boolean
  preferred_language: string
  avatar?: string
  created_at: string
  restaurant_id?: string
  is_approved?: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (credentials: any, role: string) => Promise<void>
  logout: () => void
  register: (userData: any, role: string) => Promise<void>
  verifyOTP: (phone: string, otp: string, role: string) => Promise<void>
  requestOTP: (phone: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (credentials: any, role: string) => {
    try {
      setIsLoading(true)
      
      // Mock authentication - replace with real API call
      if (credentials.email === 'zedsolmi@gmail.com' && credentials.password === 'iyed2000') {
        const mockUser = {
          id: '1',
          name: 'Iyed Solmi',
          email: credentials.email,
          phone: '+21612345678',
          role: role as any,
          verified_phone: true,
          preferred_language: 'en',
          created_at: new Date().toISOString()
        }
        const mockToken = 'mock-jwt-token-' + Date.now()
        
        setUser(mockUser)
        setToken(mockToken)
        
        // Save to localStorage
        localStorage.setItem('auth_token', mockToken)
        localStorage.setItem('user_data', JSON.stringify(mockUser))
      } else {
        throw new Error('Invalid credentials')
      }
      
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any, role: string) => {
    try {
      setIsLoading(true)
      
      // Mock registration
      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: role as any,
        verified_phone: true,
        preferred_language: 'en',
        created_at: new Date().toISOString()
      }
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      setUser(mockUser)
      setToken(mockToken)
      
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      return { user: mockUser, token: mockToken }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async (phone: string, otp: string, role: string) => {
    try {
      setIsLoading(true)
      
      // Mock OTP verification
      if (otp === '123456') {
        const mockUser = {
          id: Date.now().toString(),
          name: 'User',
          email: 'user@example.com',
          phone: phone,
          role: role as any,
          verified_phone: true,
          preferred_language: 'en',
          created_at: new Date().toISOString()
        }
        const mockToken = 'mock-jwt-token-' + Date.now()
        
        setUser(mockUser)
        setToken(mockToken)
        
        localStorage.setItem('auth_token', mockToken)
        localStorage.setItem('user_data', JSON.stringify(mockUser))
      } else {
        throw new Error('Invalid OTP')
      }
      
    } catch (error) {
      console.error('OTP verification error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const requestOTP = async (phone: string) => {
    try {
      // Mock OTP request
      console.log('OTP sent to:', phone)
    } catch (error) {
      console.error('OTP request error:', error)
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = { ...user!, ...data }
      setUser(updatedUser)
      
      localStorage.setItem('user_data', JSON.stringify(updatedUser))
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    window.location.href = '/'
  }

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    register,
    verifyOTP,
    requestOTP,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}