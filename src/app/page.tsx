'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import RoleSelector from '@/components/auth/RoleSelector'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { User, UtensilsCrossed, Bike, Shield } from 'lucide-react'

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const { t, currentLanguage } = useLanguage()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  useEffect(() => {
    if (user && !isLoading) {
      // Redirect based on user role
      switch (user.role) {
        case 'customer':
          router.push('/customer/dashboard')
          break
        case 'restaurant':
          router.push('/restaurant/dashboard')
          break
        case 'rider':
          router.push('/rider/dashboard')
          break
        case 'admin':
          router.push('/admin/dashboard')
          break
        default:
          // Stay on home page for role selection
          break
      }
    }
  }, [user, isLoading, router])

  const roles = [
    {
      id: 'customer',
      title: t('roles.customer.title', 'Customer'),
      description: t('roles.customer.description', 'Order delicious food from local restaurants'),
      icon: User,
      color: 'bg-primary-600',
      hoverColor: 'hover:bg-primary-700',
      path: '/auth/login?role=customer'
    },
    {
      id: 'restaurant',
      title: t('roles.restaurant.title', 'Restaurant'),
      description: t('roles.restaurant.description', 'Manage your restaurant and receive orders'),
      icon: UtensilsCrossed,
      color: 'bg-secondary-600',
      hoverColor: 'hover:bg-secondary-700',
      path: '/auth/login?role=restaurant'
    },
    {
      id: 'rider',
      title: t('roles.rider.title', 'Rider'),
      description: t('roles.rider.description', 'Deliver orders and earn money'),
      icon: Bike,
      color: 'bg-accent-600',
      hoverColor: 'hover:bg-accent-700',
      path: '/auth/login?role=rider'
    },
    {
      id: 'admin',
      title: t('roles.admin.title', 'Admin'),
      description: t('roles.admin.description', 'Manage the platform and users'),
      icon: Shield,
      color: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-700',
      path: '/auth/login?role=admin'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <LoadingSpinner />
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-tunisian-red to-accent-500 rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Carthago Food</h1>
                <p className="text-sm text-gray-600">Moulares, Gafsa, Tunisia</p>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <select
                value={currentLanguage}
                onChange={(e) => {/* Language change logic */}}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="ar">العربية</option>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('hero.title', 'Delicious Food')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-tunisian-red to-accent-500">
              {t('hero.subtitle', 'Delivered Fast')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description', 'Order from the best restaurants in Moulares, Gafsa. Fresh ingredients, fast delivery, and amazing taste.')}
          </p>
          
          {/* Payment Info Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-12 max-w-md mx-auto">
            <p className="text-amber-800 font-medium">
              💰 {t('payment.cash_only', 'Cash on Delivery Only')}
            </p>
            <p className="text-sm text-amber-600 mt-1">
              💳 {t('payment.cards_coming', 'Card payments coming soon')}
            </p>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('roles.select_title', 'Choose Your Role')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('roles.select_description', 'How would you like to use Carthago Food?')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <div
                  key={role.id}
                  onClick={() => router.push(role.path)}
                  className="card cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${role.color} ${role.hoverColor} flex items-center justify-center transition-colors duration-200`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('features.title', 'Why Choose Carthago Food?')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.local_restaurants', 'Local Restaurants')}
              </h3>
              <p className="text-gray-600">
                {t('features.local_description', 'Support local businesses in Moulares and enjoy authentic Tunisian cuisine')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <Bike className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.fast_delivery', 'Fast Delivery')}
              </h3>
              <p className="text-gray-600">
                {t('features.delivery_description', 'Quick and reliable delivery to your doorstep with real-time tracking')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('features.easy_ordering', 'Easy Ordering')}
              </h3>
              <p className="text-gray-600">
                {t('features.ordering_description', 'Simple and intuitive ordering process with multiple payment options')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-tunisian-red to-accent-500 rounded-lg flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Carthago Food</span>
              </div>
              <p className="text-gray-400">
                {t('footer.description', 'Bringing delicious food to Moulares, Gafsa, Tunisia')}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.company', 'Company')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.about', 'About Us')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact', 'Contact')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.careers', 'Careers')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.legal', 'Legal')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms', 'Terms of Service')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy', 'Privacy Policy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.cookies', 'Cookie Policy')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.location', 'Location')}</h4>
              <p className="text-gray-400">
                Moulares, Gafsa<br />
                Tunisia 🇹🇳<br />
                Phone: +216 XX XXX XXX
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Carthago Food. {t('footer.rights', 'All rights reserved.')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}