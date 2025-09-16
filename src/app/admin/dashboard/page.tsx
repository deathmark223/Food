'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { Shield, Users, Store, Bike, BarChart3, TrendingUp, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login?role=admin')
    }
  }, [user, router])

  if (!user) {
    return <LoadingSpinner />
  }

  const mockStats = {
    totalUsers: 1247,
    totalRestaurants: 23,
    totalRiders: 45,
    totalOrders: 3892,
    todayRevenue: 2847.50,
    pendingApprovals: 5
  }

  const mockRecentActivity = [
    {
      id: 1,
      type: 'restaurant_registration',
      message: 'New restaurant "Café Central" registered',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'rider_application',
      message: 'Rider application from Mohamed Trabelsi',
      time: '4 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'order_issue',
      message: 'Customer complaint about order #ORD123',
      time: '6 hours ago',
      status: 'resolved'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-gray-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage Carthago Food platform</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-primary-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Restaurants</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalRestaurants}</p>
              </div>
              <Store className="w-8 h-8 text-secondary-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Riders</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalRiders}</p>
              </div>
              <Bike className="w-8 h-8 text-accent-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalOrders}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-success-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.todayRevenue} TND</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.pendingApprovals}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-error-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              
              <div className="divide-y">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'pending' 
                          ? 'bg-warning-100 text-warning-800'
                          : 'bg-success-100 text-success-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
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
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                
                <Button fullWidth variant="outline">
                  <Store className="w-4 h-4 mr-2" />
                  Approve Restaurants
                </Button>
                
                <Button fullWidth variant="outline">
                  <Bike className="w-4 h-4 mr-2" />
                  Manage Riders
                </Button>
                
                <Button fullWidth variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Platform Status</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                    Operational
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment System</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                    Online
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SMS Service</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Maps Service</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}