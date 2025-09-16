import { TUNISIA_COUNTRY_CODE } from './constants'

export const validators = {
  // Tunisia phone number validation
  phone: (phone: string): boolean => {
    const tunisianPhoneRegex = /^\+216[0-9]{8}$/
    return tunisianPhoneRegex.test(phone)
  },

  // Email validation
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Password validation (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
  password: (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  },

  // Name validation (at least 2 characters, only letters and spaces)
  name: (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/
    return nameRegex.test(name.trim())
  },

  // Price validation (positive number with max 2 decimal places)
  price: (price: number): boolean => {
    return price > 0 && Number.isFinite(price) && Number(price.toFixed(2)) === price
  },

  // Image URL validation (must be valid URL ending with image extension)
  imageUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      const extension = urlObj.pathname.toLowerCase().split('.').pop()
      return ['jpg', 'jpeg', 'png', 'webp'].includes(extension || '')
    } catch {
      return false
    }
  },

  // Coordinates validation
  coordinates: (lat: number, lng: number): boolean => {
    return (
      lat >= -90 && lat <= 90 &&
      lng >= -180 && lng <= 180 &&
      Number.isFinite(lat) && Number.isFinite(lng)
    )
  },

  // Restaurant hours validation (HH:mm format)
  time: (time: string): boolean => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    return timeRegex.test(time)
  },

  // OTP validation (6 digits)
  otp: (otp: string): boolean => {
    const otpRegex = /^[0-9]{6}$/
    return otpRegex.test(otp)
  }
}

export const formatters = {
  // Format phone number for display
  phone: (phone: string): string => {
    if (phone.startsWith(TUNISIA_COUNTRY_CODE)) {
      const number = phone.slice(4)
      return `${TUNISIA_COUNTRY_CODE} ${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`
    }
    return phone
  },

  // Format price with currency
  price: (amount: number, currency: string = 'TND'): string => {
    return `${amount.toFixed(2)} ${currency}`
  },

  // Format distance
  distance: (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`
    }
    return `${(meters / 1000).toFixed(1)}km`
  },

  // Format duration
  duration: (seconds: number): string => {
    if (seconds < 60) {
      return `${Math.round(seconds)}s`
    }
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
      return `${minutes}min`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}min`
  },

  // Format date for display
  date: (date: string | Date, locale: string = 'en'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  // Truncate text
  text: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }
}

export const sanitizers = {
  // Remove HTML tags
  html: (text: string): string => {
    return text.replace(/<[^>]*>/g, '').trim()
  },

  // Clean phone number (remove all non-digits except +)
  phone: (phone: string): string => {
    const cleaned = phone.replace(/[^\d+]/g, '')
    if (cleaned.startsWith('216') && !cleaned.startsWith('+216')) {
      return `+${cleaned}`
    }
    if (cleaned.length === 8 && !cleaned.startsWith('+')) {
      return `${TUNISIA_COUNTRY_CODE}${cleaned}`
    }
    return cleaned
  },

  // Clean text input
  text: (text: string): string => {
    return text.trim().replace(/\s+/g, ' ')
  }
}