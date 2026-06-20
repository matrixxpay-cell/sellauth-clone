import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Home from './pages/Home'
import Store from './pages/Store'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'

const noFooterRoutes = ['/login', '/register', '/dashboard']

function Layout() {
  const path = window.location.pathname
  const hideFooter = noFooterRoutes.some(r => path.startsWith(r))

  return (
    <AppProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
      <Toast />
    </AppProvider>
  )
}

export default function App() {
  return <Layout />
}
