'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { Store, Plus, BarChart3, Clock, Bell, Settings } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function RestaurantDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== 'restaurant') {
      router.push('/auth/login?role=restaurant')
    }
  }, [user, router])

  if (!user) {
    return <LoadingSpinner />
  }

  const mockStats = {
    todayOrders: 12,
    todayRevenue: 245.50,
    pendingOrders: 3,
    totalMenuItems: 24
  }

  const mockOrders = [
    {
      id: '#ORD001',
      customer: 'Ahmed Ben Ali',
      items: 'Couscous Royal, Harissa',
      total: 28.50,
      status: 'preparing',
      time: '10 min ago'
    },
    {
      id: '#ORD002',
      customer: 'Fatma Trabelsi',
      items: 'Pizza Margherita, Coca Cola',
      total: 22.00,
      status: 'ready',
      time: '15 min ago'
    },
    {
      id: '#ORD003',
      customer: 'Mohamed Sassi',
      items: 'Grilled Lamb, Salad',
      total: 35.00,
      status: 'confirmed',
      time: '20 min ago'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-yellow-100 text-yellow-800'
      case 'ready': return 'bg-green-100 text-green-800'
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
              <Store className="w-8 h-8 text-secondary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Restaurant Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your restaurant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
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
                <p className="text-sm text-gray-600">Today's Orders</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.todayOrders}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.todayRevenue} TND</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Menu Items</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.totalMenuItems}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </div>
              
              <div className="divide-y">
                {mockOrders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{order.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{order.time}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">Customer: {order.customer}</p>
                    <p className="text-sm text-gray-600 mb-2">Items: {order.items}</p>
                    <p className="font-semibold text-gray-900">{order.total} TND</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Button fullWidth variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Menu Item
                </Button>
                
                <Button fullWidth variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                
                <Button fullWidth variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Restaurant Settings
                </Button>
              </div>
            </div>

            {/* Restaurant Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Restaurant Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                    Open
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Accepting Orders</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                    Yes
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Prep Time</span>
                  <span className="text-sm font-medium text-gray-900">25 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}