'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { MapPin, Search, Star, Clock, Truck, Heart, Filter } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function CustomerDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [location, setLocation] = useState('Moulares, Gafsa')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'customer') {
      router.push('/auth/login?role=customer')
    }
  }, [user, router])

  if (!user) {
    return <LoadingSpinner />
  }

  const mockRestaurants = [
    {
      id: 1,
      name: 'Restaurant Al Andalous',
      cuisine: 'Tunisian Traditional',
      rating: 4.8,
      deliveryTime: '25-35 min',
      deliveryFee: 3,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 2,
      name: 'Pizza Corner',
      cuisine: 'Italian & Fast Food',
      rating: 4.5,
      deliveryTime: '20-30 min',
      deliveryFee: 2.5,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 3,
      name: 'Grillades Moulares',
      cuisine: 'Grills & BBQ',
      rating: 4.7,
      deliveryTime: '30-40 min',
      deliveryFee: 3.5,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Carthago Food</h1>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <Button variant="ghost" onClick={logout}>
                {t('auth.logout', 'Logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('search.restaurants', 'Search restaurants, cuisines...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Truck className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{t('quick.delivery', 'Delivery')}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-secondary-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{t('quick.favorites', 'Favorites')}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-accent-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{t('quick.orders', 'Orders')}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Filter className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{t('quick.filter', 'Filter')}</p>
          </div>
        </div>

        {/* Featured Restaurants */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('restaurants.featured', 'Featured Restaurants')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/customer/restaurant/${restaurant.id}`)}
              >
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  {restaurant.featured && (
                    <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {t('restaurants.featured', 'Featured')}
                    </div>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{restaurant.rating}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {restaurant.deliveryTime}
                      </div>
                    </div>
                    
                    <div className="text-gray-600">
                      {restaurant.deliveryFee} TND delivery
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('categories.title', 'Browse by Category')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Tunisian', icon: '🇹🇳' },
              { name: 'Pizza', icon: '🍕' },
              { name: 'Burgers', icon: '🍔' },
              { name: 'Grills', icon: '🥩' },
              { name: 'Desserts', icon: '🍰' },
              { name: 'Beverages', icon: '🥤' }
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white p-4 rounded-lg shadow-sm border text-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="text-sm font-medium text-gray-900">{category.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}