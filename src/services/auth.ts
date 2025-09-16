import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1]
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

export const authAPI = {
  // Google OAuth login
  googleAuth: async (credential: string, role: string) => {
    const response = await api.post('/auth/google', { credential, role })
    return response.data
  },

  // SMS OTP request
  requestOTP: async (phone: string) => {
    const response = await api.post('/auth/sms/request-otp', { phone })
    return response.data
  },

  // SMS OTP verification
  verifyOTP: async (phone: string, otp: string, role: string) => {
    const response = await api.post('/auth/sms/verify-otp', { phone, otp, role })
    return response.data
  },

  // Email/Password login (fallback)
  login: async (credentials: { email?: string, phone?: string, password?: string }, role: string) => {
    const response = await api.post('/auth/login', { ...credentials, role })
    return response.data
  },

  // Registration
  register: async (userData: any, role: string) => {
    const response = await api.post('/auth/register', { ...userData, role })
    return response.data
  },

  // Profile update
  updateProfile: async (data: any, token: string) => {
    const response = await api.put('/auth/profile', data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  },

  // Phone validation
  validatePhone: (phone: string) => {
    // Tunisia phone number validation (+216 followed by 8 digits)
    const tunisianPhoneRegex = /^\+216[0-9]{8}$/
    return tunisianPhoneRegex.test(phone)
  },

  // Format phone number for Tunisia
  formatTunisianPhone: (phone: string) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '')
    
    // If starts with 216, add + prefix
    if (digits.startsWith('216')) {
      return `+${digits}`
    }
    
    // If 8 digits, add +216 prefix
    if (digits.length === 8) {
      return `+216${digits}`
    }
    
    return phone // Return as-is if doesn't match patterns
  }
}