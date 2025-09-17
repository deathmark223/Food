import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Providers } from './providers'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CustomerDashboard from './pages/customer/Dashboard'
import RestaurantView from './pages/customer/RestaurantView'
import CartPage from './pages/customer/CartPage'
import OrderTrackingPage from './pages/customer/OrderTrackingPage'
import RestaurantDashboard from './pages/restaurant/Dashboard'
import MenuManagement from './pages/restaurant/MenuManagement'
import RiderDashboard from './pages/rider/Dashboard'
import RiderOrders from './pages/rider/Orders'
import AdminDashboard from './pages/admin/Dashboard'

function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          
          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/restaurant/:id" element={<RestaurantView />} />
          <Route path="/customer/cart" element={<CartPage />} />
          <Route path="/customer/order/:id" element={<OrderTrackingPage />} />
          
          {/* Restaurant Routes */}
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurant/menu" element={<MenuManagement />} />
          
          {/* Rider Routes */}
          <Route path="/rider/dashboard" element={<RiderDashboard />} />
          <Route path="/rider/orders" element={<RiderOrders />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Providers>
  )
}

export default App