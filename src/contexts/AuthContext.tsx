'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { authAPI } from '@/services/auth'

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
    const savedToken = Cookies.get('auth_token')
    const savedUser = Cookies.get('user_data')
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        Cookies.remove('auth_token')
        Cookies.remove('user_data')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (credentials: any, role: string) => {
    try {
      setIsLoading(true)
      const response = await authAPI.login(credentials, role)
      
      setUser(response.user)
      setToken(response.token)
      
      // Save to cookies
      Cookies.set('auth_token', response.token, { expires: 7 })
      Cookies.set('user_data', JSON.stringify(response.user), { expires: 7 })
      
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
      const response = await authAPI.register(userData, role)
      
      if (response.user && response.token) {
        setUser(response.user)
        setToken(response.token)
        
        Cookies.set('auth_token', response.token, { expires: 7 })
        Cookies.set('user_data', JSON.stringify(response.user), { expires: 7 })
      }
      
      return response
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
      const response = await authAPI.verifyOTP(phone, otp, role)
      
      setUser(response.user)
      setToken(response.token)
      
      Cookies.set('auth_token', response.token, { expires: 7 })
      Cookies.set('user_data', JSON.stringify(response.user), { expires: 7 })
      
    } catch (error) {
      console.error('OTP verification error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const requestOTP = async (phone: string) => {
    try {
      await authAPI.requestOTP(phone)
    } catch (error) {
      console.error('OTP request error:', error)
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(data, token!)
      setUser(response.user)
      
      Cookies.set('user_data', JSON.stringify(response.user), { expires: 7 })
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    Cookies.remove('auth_token')
    Cookies.remove('user_data')
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