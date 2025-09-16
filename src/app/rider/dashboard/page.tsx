'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { Bike, MapPin, Clock, DollarSign, CheckCircle, Navigation } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function RiderDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'rider') {
      router.push('/auth/login?role=rider')
    }
  }, [user, router])

  if (!user) {
    return <LoadingSpinner />
  }

  const mockStats = {
    todayEarnings: 45.50,
    todayDeliveries: 8,
    totalDistance: 32.5,
    avgRating: 4.8
  }

  const mockOrders = [
    {
      id: '#ORD001',
      restaurant: 'Restaurant Al Andalous',
      customer: 'Ahmed Ben Ali',
      pickup: 'Rue Habib Bourguiba, Moulares',
      delivery: 'Avenue de la République, Moulares',
      amount: 28.50,
      distance: '2.3 km',
      status: 'ready_for_pickup'
    },
    {
      id: '#ORD002',
      restaurant: 'Pizza Corner',
      customer: 'Fatma Trabelsi',
      pickup: 'Centre Ville, Moulares',
      delivery: 'Cité El Nour, Moulares',
      amount: 22.00,
      distance: '1.8 km',
      status: 'available'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-100 text-blue-800'
      case 'ready_for_pickup': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Bike className="w-8 h-8 text-accent-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Rider Dashboard</h1>
                <p className="text-sm text-gray-600">Deliver orders and earn money</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status:</span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isOnline 
                      ? 'bg-success-100 text-success-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </button>
              </div>
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <Button variant="ghost" onClick={logout}>
                {t('auth.logout', 'Logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Earnings</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.todayEarnings} TND</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deliveries</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.todayDeliveries}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Distance</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.totalDistance} km</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <Navigation className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.avgRating}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Available Orders */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Available Orders</h2>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Moulares, Gafsa</span>
              </div>
            </div>
          </div>
          
          {!isOnline ? (
            <div className="p-8 text-center">
              <Bike className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">You're Offline</h3>
              <p className="text-gray-600 mb-4">Go online to start receiving delivery requests</p>
              <Button onClick={() => setIsOnline(true)}>
                Go Online
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {mockOrders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.amount} TND</p>
                      <p className="text-sm text-gray-600">{order.distance}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pickup: {order.restaurant}</p>
                        <p className="text-sm text-gray-600">{order.pickup}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivery: {order.customer}</p>
                        <p className="text-sm text-gray-600">{order.delivery}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="primary" size="sm">
                      Accept Order
                    </Button>
                    <Button variant="outline" size="sm">
                      <Navigation className="w-4 h-4 mr-2" />
                      View Route
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}