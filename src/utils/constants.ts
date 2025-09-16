// Default location for Moulares, Gafsa, Tunisia
export const DEFAULT_LOCATION = {
  lat: 34.4667,
  lng: 8.6667,
  name: 'Moulares, Gafsa, Tunisia'
}

// Tunisia phone country code
export const TUNISIA_COUNTRY_CODE = '+216'

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇹🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

// Order statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  RIDER_ASSIGNED: 'rider_assigned',
  PICKED_UP: 'picked_up',
  ON_THE_WAY: 'on_the_way',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

// User roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT: 'restaurant',
  RIDER: 'rider',
  ADMIN: 'admin'
}

// Payment methods
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card' // Coming soon
}

// Delivery radius in kilometers
export const DEFAULT_DELIVERY_RADIUS = 10

// Min order amount in TND
export const MIN_ORDER_AMOUNT = 5

// Delivery fee in TND
export const BASE_DELIVERY_FEE = 3

// Currency
export const CURRENCY = {
  CODE: 'TND',
  SYMBOL: 'د.ت',
  NAME: 'Tunisian Dinar'
}

// Sample restaurant categories
export const RESTAURANT_CATEGORIES = [
  'Tunisian',
  'Fast Food',
  'Pizza',
  'Grills',
  'Seafood',
  'Desserts',
  'Beverages',
  'Traditional',
  'Healthy',
  'Vegetarian'
]

// Operating hours format
export const OPERATING_HOURS_FORMAT = 'HH:mm'

// Image constraints
export const IMAGE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080
}

// Notification types
export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  DELIVERY: 'delivery',
  SYSTEM: 'system',
  PROMOTION: 'promotion'
}

// Default coordinates bounds for Moulares area
export const MOULARES_BOUNDS = {
  north: 34.5,
  south: 34.4,
  east: 8.7,
  west: 8.6
}