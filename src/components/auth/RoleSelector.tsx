'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, UtensilsCrossed, Bike, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Role {
  id: string
  title: string
  description: string
  icon: any
  color: string
  path: string
}

export default function RoleSelector() {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles: Role[] = [
    {
      id: 'customer',
      title: t('roles.customer.title', 'Customer'),
      description: t('roles.customer.description', 'Order delicious food from local restaurants'),
      icon: User,
      color: 'bg-primary-600 hover:bg-primary-700',
      path: '/auth/login?role=customer'
    },
    {
      id: 'restaurant',
      title: t('roles.restaurant.title', 'Restaurant'),
      description: t('roles.restaurant.description', 'Manage your restaurant and receive orders'),
      icon: UtensilsCrossed,
      color: 'bg-secondary-600 hover:bg-secondary-700',
      path: '/auth/login?role=restaurant'
    },
    {
      id: 'rider',
      title: t('roles.rider.title', 'Rider'),
      description: t('roles.rider.description', 'Deliver orders and earn money'),
      icon: Bike,
      color: 'bg-accent-600 hover:bg-accent-700',
      path: '/auth/login?role=rider'
    },
    {
      id: 'admin',
      title: t('roles.admin.title', 'Admin'),
      description: t('roles.admin.description', 'Manage the platform and users'),
      icon: Shield,
      color: 'bg-gray-600 hover:bg-gray-700',
      path: '/auth/login?role=admin'
    }
  ]

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role.id)
    router.push(role.path)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {roles.map((role) => {
        const Icon = role.icon
        return (
          <div
            key={role.id}
            onClick={() => handleRoleSelect(role)}
            className={`p-8 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
              selectedRole === role.id
                ? 'border-primary-500 bg-primary-50 shadow-lg'
                : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${role.color} flex items-center justify-center transition-colors duration-200`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
  )
}