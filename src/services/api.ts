import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1]
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export const restaurantAPI = {
  // Get restaurants near location
  getNearby: async (lat: number, lon: number, radius: number = 10) => {
    const response = await api.get(`/restaurants?lat=${lat}&lon=${lon}&radius=${radius}`)
    return response.data
  },

  // Get restaurant details
  getById: async (id: string) => {
    const response = await api.get(`/restaurants/${id}`)
    return response.data
  },

  // Get restaurant menu
  getMenu: async (id: string) => {
    const response = await api.get(`/restaurants/${id}/menu`)
    return response.data
  },

  // Restaurant owner endpoints
  create: async (data: any) => {
    const response = await api.post('/restaurants', data)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/restaurants/${id}`, data)
    return response.data
  },

  // Menu management
  createMenuItem: async (restaurantId: string, data: any) => {
    const response = await api.post(`/restaurants/${restaurantId}/menu-items`, data)
    return response.data
  },

  updateMenuItem: async (restaurantId: string, itemId: string, data: any) => {
    const response = await api.put(`/restaurants/${restaurantId}/menu-items/${itemId}`, data)
    return response.data
  },

  deleteMenuItem: async (restaurantId: string, itemId: string) => {
    const response = await api.delete(`/restaurants/${restaurantId}/menu-items/${itemId}`)
    return response.data
  },

  // Categories
  createCategory: async (restaurantId: string, data: any) => {
    const response = await api.post(`/restaurants/${restaurantId}/categories`, data)
    return response.data
  },

  updateCategory: async (restaurantId: string, categoryId: string, data: any) => {
    const response = await api.put(`/restaurants/${restaurantId}/categories/${categoryId}`, data)
    return response.data
  },

  deleteCategory: async (restaurantId: string, categoryId: string) => {
    const response = await api.delete(`/restaurants/${restaurantId}/categories/${categoryId}`)
    return response.data
  },
}

export const orderAPI = {
  // Create order
  create: async (data: any) => {
    const response = await api.post('/orders', data)
    return response.data
  },

  // Get order details
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },

  // Customer order history
  getHistory: async (page: number = 1, limit: number = 10) => {
    const response = await api.get(`/orders/history?page=${page}&limit=${limit}`)
    return response.data
  },

  // Update order status (restaurant/rider)
  updateStatus: async (id: string, status: string, data?: any) => {
    const response = await api.patch(`/orders/${id}/status`, { status, ...data })
    return response.data
  },

  // Cancel order
  cancel: async (id: string, reason?: string) => {
    const response = await api.patch(`/orders/${id}/cancel`, { reason })
    return response.data
  },

  // Rate order
  rate: async (id: string, rating: number, review?: string) => {
    const response = await api.post(`/orders/${id}/rating`, { rating, review })
    return response.data
  },
}

export const riderAPI = {
  // Get available orders for rider
  getAvailableOrders: async () => {
    const response = await api.get('/rider/available-orders')
    return response.data
  },

  // Accept order
  acceptOrder: async (orderId: string) => {
    const response = await api.post(`/rider/orders/${orderId}/accept`)
    return response.data
  },

  // Update rider location
  updateLocation: async (lat: number, lon: number) => {
    const response = await api.patch('/rider/location', { lat, lon })
    return response.data
  },

  // Mark order as picked up
  markPickedUp: async (orderId: string) => {
    const response = await api.patch(`/rider/orders/${orderId}/pickup`)
    return response.data
  },

  // Mark order as delivered
  markDelivered: async (orderId: string, proof?: any) => {
    const response = await api.patch(`/rider/orders/${orderId}/delivered`, { proof })
    return response.data
  },

  // Get rider earnings
  getEarnings: async (period?: string) => {
    const response = await api.get(`/rider/earnings?period=${period || 'today'}`)
    return response.data
  },

  // Update availability
  setAvailability: async (available: boolean) => {
    const response = await api.patch('/rider/availability', { available })
    return response.data
  },
}

export const adminAPI = {
  // Dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  // Manage restaurants
  getRestaurants: async (filters?: any) => {
    const response = await api.get('/admin/restaurants', { params: filters })
    return response.data
  },

  approveRestaurant: async (id: string) => {
    const response = await api.patch(`/admin/restaurants/${id}/approve`)
    return response.data
  },

  rejectRestaurant: async (id: string, reason?: string) => {
    const response = await api.patch(`/admin/restaurants/${id}/reject`, { reason })
    return response.data
  },

  // Manage orders
  getOrders: async (filters?: any) => {
    const response = await api.get('/admin/orders', { params: filters })
    return response.data
  },

  // Manage users
  getUsers: async (filters?: any) => {
    const response = await api.get('/admin/users', { params: filters })
    return response.data
  },

  banUser: async (id: string, reason?: string) => {
    const response = await api.patch(`/admin/users/${id}/ban`, { reason })
    return response.data
  },

  unbanUser: async (id: string) => {
    const response = await api.patch(`/admin/users/${id}/unban`)
    return response.data
  },

  // Analytics
  getAnalytics: async (period: string, metric: string) => {
    const response = await api.get(`/admin/analytics?period=${period}&metric=${metric}`)
    return response.data
  },

  // Export data
  exportOrders: async (filters?: any) => {
    const response = await api.get('/admin/export/orders', { 
      params: filters,
      responseType: 'blob'
    })
    return response.data
  },
}

export const mapAPI = {
  // Get location suggestions
  searchPlaces: async (query: string, bounds?: any) => {
    const response = await api.get(`/maps/places/search?query=${encodeURIComponent(query)}`, {
      params: bounds
    })
    return response.data
  },

  // Reverse geocoding
  reverseGeocode: async (lat: number, lon: number) => {
    const response = await api.get(`/maps/geocode/reverse?lat=${lat}&lon=${lon}`)
    return response.data
  },

  // Calculate distance and duration
  getDirections: async (origin: {lat: number, lon: number}, destination: {lat: number, lon: number}) => {
    const response = await api.get(`/maps/directions`, {
      params: {
        origin_lat: origin.lat,
        origin_lon: origin.lon,
        dest_lat: destination.lat,
        dest_lon: destination.lon
      }
    })
    return response.data
  },
}

export const imageAPI = {
  // Upload image
  upload: async (file: File, folder: string = 'general') => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('folder', folder)

    const response = await api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Validate image URL
  validateUrl: async (url: string) => {
    const response = await api.post('/images/validate-url', { url })
    return response.data
  },
}

export default api