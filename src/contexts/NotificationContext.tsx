'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './AuthContext'

interface Notification {
  id: string
  type: 'order' | 'delivery' | 'system' | 'promotion'
  title: string
  message: string
  data?: any
  read: boolean
  created_at: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'created_at' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
  socket: Socket | null
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)
  const { user, token } = useAuth()

  // Initialize Socket.IO connection
  useEffect(() => {
    if (user && token) {
      const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
        auth: {
          token: token
        }
      })

      newSocket.on('connect', () => {
        console.log('Connected to notification server')
      })

      newSocket.on('notification', (data: Notification) => {
        addNotification(data)
        
        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification(data.title, {
            body: data.message,
            icon: '/favicon.ico'
          })
        }
      })

      newSocket.on('order_update', (data: any) => {
        addNotification({
          type: 'order',
          title: 'Order Update',
          message: `Your order #${data.order_id} is now ${data.status}`,
          data: data
        })
      })

      setSocket(newSocket)

      return () => {
        newSocket.close()
      }
    }
  }, [user, token])

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const addNotification = (notification: Omit<Notification, 'id' | 'created_at' | 'read'>) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      read: false,
      ...notification
    }

    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    socket
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}