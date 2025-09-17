'use client'

import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { User, UtensilsCrossed, Bike, Shield, Mail, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { validators, sanitizers } from '../../utils/validation'

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login, verifyOTP, requestOTP, isLoading } = useAuth()
  const { t } = useLanguage()
  
  const role = searchParams.get('role') || 'customer'
  const [loginMethod, setLoginMethod] = useState<'google' | 'sms' | 'email'>('email')
  const [step, setStep] = useState<'method' | 'phone' | 'otp'>('method')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '+216',
    otp: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [otpLoading, setOtpLoading] = useState(false)

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

    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = t('validation.email_required', 'Email is required')
      } else if (!validators.email(formData.email)) {
        newErrors.email = t('validation.email_invalid', 'Invalid email format')
      }

      if (!formData.password) {
        newErrors.password = t('validation.password_required', 'Password is required')
      } else if (formData.password.length < 6) {
        newErrors.password = t('validation.password_min', 'Password must be at least 6 characters')
      }
    } else if (loginMethod === 'sms') {
      if (!formData.phone || formData.phone === '+216') {
        newErrors.phone = t('validation.phone_required', 'Phone number is required')
      } else if (!validators.phone(formData.phone)) {
        newErrors.phone = t('validation.phone_invalid', 'Invalid Tunisia phone number format')
      }

      if (step === 'otp') {
        if (!formData.otp) {
          newErrors.otp = t('validation.otp_required', 'OTP is required')
        } else if (!validators.otp(formData.otp)) {
          newErrors.otp = t('validation.otp_invalid', 'OTP must be 6 digits')
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      if (loginMethod === 'email') {
        await login({
          email: formData.email,
          password: formData.password
        }, role)
        navigate(`/${role}/dashboard`)
      } else if (loginMethod === 'sms') {
        if (step === 'phone') {
          setOtpLoading(true)
          await requestOTP(formData.phone)
          setStep('otp')
          setOtpLoading(false)
        } else if (step === 'otp') {
          await verifyOTP(formData.phone, formData.otp, role)
          navigate(`/${role}/dashboard`)
        }
      }
    } catch (error: any) {
      setErrors({ general: error.response?.data?.message || t('errors.login_failed', 'Login failed. Please try again.') })
      if (loginMethod === 'sms' && step === 'otp') {
        setOtpLoading(false)
      }
    }
  }

  const handleBackToMethod = () => {
    setStep('method')
    setFormData({ ...formData, phone: '+216', otp: '' })
    setErrors({})
  }

  if (step === 'method') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back_home', 'Back to Home')}
            </button>
            
            <div className={`mx-auto w-16 h-16 ${currentRole.bg} ${currentRole.border} border-2 rounded-full flex items-center justify-center mb-4`}>
              <currentRole.icon className={`w-8 h-8 ${currentRole.color}`} />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t('auth.login_as', 'Login as')} {currentRole.title}
            </h2>
            <p className="text-gray-600">
              {t('auth.choose_login_method', 'Choose your login method')}
            </p>
          </div>

          {/* Login Methods */}
          <div className="space-y-4">
            {/* Email Login */}
            <button
              onClick={() => setLoginMethod('email')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <Mail className="w-5 h-5 mr-3" />
              {t('auth.login_email', 'Continue with Email')}
            </button>

            {/* SMS Login */}
            <button
              onClick={() => {
                setLoginMethod('sms')
                setStep('phone')
              }}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <Phone className="w-5 h-5 mr-3" />
              {t('auth.login_sms', 'Continue with Phone Number')}
            </button>
          </div>

          {loginMethod === 'email' && (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {errors.general && (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                  <p className="text-error-800 text-sm">{errors.general}</p>
                </div>
              )}

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

              <Button
                type="submit"
                loading={isLoading}
                fullWidth
              >
                {t('auth.login', 'Login')}
              </Button>
            </form>
          )}

          <div className="text-center">
            <p className="text-gray-600">
              {t('auth.no_account', "Don't have an account?")}{' '}
              <button
                onClick={() => navigate(`/auth/register?role=${role}`)}
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                {t('auth.register', 'Register')}
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <button
            onClick={handleBackToMethod}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back', 'Back')}
          </button>
          
          <div className={`mx-auto w-16 h-16 ${currentRole.bg} ${currentRole.border} border-2 rounded-full flex items-center justify-center mb-4`}>
            <Phone className={`w-8 h-8 ${currentRole.color}`} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 'phone' ? t('auth.enter_phone', 'Enter Phone Number') : t('auth.verify_otp', 'Verify OTP')}
          </h2>
          <p className="text-gray-600">
            {step === 'phone' 
              ? t('auth.sms_description', 'We\'ll send you a verification code')
              : t('auth.otp_sent', `Code sent to ${formData.phone}`)
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
              <p className="text-error-800 text-sm">{errors.general}</p>
            </div>
          )}

          {step === 'phone' && (
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
              <p className="text-gray-500 text-xs mt-2">
                {t('auth.tunisia_format', 'Tunisia phone number format: +216 XX XXX XXX')}
              </p>
            </div>
          )}

          {step === 'otp' && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                {t('fields.otp', 'Verification Code')}
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6}
                value={formData.otp}
                onChange={handleInputChange}
                className={`input-field text-center text-2xl tracking-widest ${errors.otp ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
                placeholder="000000"
              />
              {errors.otp && <p className="text-error-600 text-sm mt-1">{errors.otp}</p>}
              
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => requestOTP(formData.phone)}
                  className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                >
                  {t('auth.resend_otp', 'Resend Code')}
                </button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            loading={isLoading || otpLoading}
            fullWidth
          >
            {step === 'phone' 
              ? t('auth.send_otp', 'Send Verification Code')
              : t('auth.verify_login', 'Verify & Login')
            }
          </Button>
        </form>
      </div>
    </div>
  )
}