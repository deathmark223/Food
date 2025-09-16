'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { User, UtensilsCrossed, Bike, Shield, Mail, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { validators, sanitizers } from '@/utils/validation'
import Link from 'next/link'

function RegisterForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const { t } = useLanguage()
  
  const role = searchParams.get('role') || 'customer'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+216',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    address: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const roleInfo = {
    customer: {
      title: t('roles.customer.title', 'Customer'),
      icon: User,
      color: 'text-primary-600',
      bg: 'bg-primary-50',
      border: 'border-primary-200'
    },
    restaurant: {
      title: t('roles.restaurant.title', 'Restaurant'),
      icon: UtensilsCrossed,
      color: 'text-secondary-600',
      bg: 'bg-secondary-50',
      border: 'border-secondary-200'
    },
    rider: {
      title: t('roles.rider.title', 'Rider'),
      icon: Bike,
      color: 'text-accent-600',
      bg: 'bg-accent-50',
      border: 'border-accent-200'
    },
    admin: {
      title: t('roles.admin.title', 'Admin'),
      icon: Shield,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200'
    }
  }

  const currentRole = roleInfo[role as keyof typeof roleInfo] || roleInfo.customer

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      const cleanPhone = sanitizers.phone(value)
      setFormData(prev => ({ ...prev, [name]: cleanPhone }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('validation.name_required', 'Name is required')
    } else if (!validators.name(formData.name)) {
      newErrors.name = t('validation.name_invalid', 'Name must be at least 2 characters')
    }

    if (!formData.email) {
      newErrors.email = t('validation.email_required', 'Email is required')
    } else if (!validators.email(formData.email)) {
      newErrors.email = t('validation.email_invalid', 'Invalid email format')
    }

    if (!formData.phone || formData.phone === '+216') {
      newErrors.phone = t('validation.phone_required', 'Phone number is required')
    } else if (!validators.phone(formData.phone)) {
      newErrors.phone = t('validation.phone_invalid', 'Invalid Tunisia phone number format')
    }

    if (!formData.password) {
      newErrors.password = t('validation.password_required', 'Password is required')
    } else if (formData.password.length < 6) {
      newErrors.password = t('validation.password_min', 'Password must be at least 6 characters')
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.confirm_password_required', 'Please confirm your password')
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwords_match', 'Passwords do not match')
    }

    if (role === 'restaurant') {
      if (!formData.restaurantName.trim()) {
        newErrors.restaurantName = t('validation.restaurant_name_required', 'Restaurant name is required')
      }
      if (!formData.address.trim()) {
        newErrors.address = t('validation.address_required', 'Address is required')
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase(),
        phone: formData.phone,
        password: formData.password,
        ...(role === 'restaurant' && {
          restaurant_name: formData.restaurantName.trim(),
          address: formData.address.trim()
        })
      }

      await register(userData, role)
      router.push(`/${role}/dashboard`)
    } catch (error: any) {
      setErrors({ general: error.response?.data?.message || t('errors.registration_failed', 'Registration failed. Please try again.') })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href={`/auth/login?role=${role}`} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back_to_login', 'Back to Login')}
          </Link>
          
          <div className={`mx-auto w-16 h-16 ${currentRole.bg} ${currentRole.border} border-2 rounded-full flex items-center justify-center mb-4`}>
            <currentRole.icon className={`w-8 h-8 ${currentRole.color}`} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.register_as', 'Register as')} {currentRole.title}
          </h2>
          <p className="text-gray-600">
            {t('auth.create_account', 'Create your account to get started')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
              <p className="text-error-800 text-sm">{errors.general}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('fields.full_name', 'Full Name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`input-field ${errors.name ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
              placeholder={t('placeholders.full_name', 'Enter your full name')}
            />
            {errors.name && <p className="text-error-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('fields.email', 'Email Address')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input-field ${errors.email ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
              placeholder={t('placeholders.email', 'Enter your email')}
            />
            {errors.email && <p className="text-error-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t('fields.phone', 'Phone Number')}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className={`input-field ${errors.phone ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
              placeholder="+216 12 345 678"
            />
            {errors.phone && <p className="text-error-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          {role === 'restaurant' && (
            <>
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('fields.restaurant_name', 'Restaurant Name')}
                </label>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.restaurantName ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
                  placeholder={t('placeholders.restaurant_name', 'Enter restaurant name')}
                />
                {errors.restaurantName && <p className="text-error-600 text-sm mt-1">{errors.restaurantName}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('fields.address', 'Address')}
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`input-field ${errors.address ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
                  placeholder={t('placeholders.address', 'Enter restaurant address')}
                />
                {errors.address && <p className="text-error-600 text-sm mt-1">{errors.address}</p>}
              </div>
            </>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t('fields.password', 'Password')}
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className={`input-field pr-12 ${errors.password ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
                placeholder={t('placeholders.password', 'Enter your password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-error-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              {t('fields.confirm_password', 'Confirm Password')}
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`input-field pr-12 ${errors.confirmPassword ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
                placeholder={t('placeholders.confirm_password', 'Confirm your password')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-error-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <Button
            type="submit"
            loading={isLoading}
            fullWidth
          >
            {t('auth.create_account', 'Create Account')}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            {t('auth.have_account', 'Already have an account?')}{' '}
            <Link href={`/auth/login?role=${role}`} className="text-primary-600 hover:text-primary-500 font-medium">
              {t('auth.login', 'Login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterForm />
    </Suspense>
  )
}