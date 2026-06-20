import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev
      showToast(`${product.name} added to cart!`)
      return [...prev, { ...product, qty: 1 }]
    })
  }, [showToast])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = cart.length

  const login = useCallback((userData) => {
    setUser(userData)
    showToast('Welcome back!')
  }, [showToast])

  const logout = useCallback(() => {
    setUser(null)
    showToast('Logged out successfully')
  }, [showToast])

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount, user, login, logout, toast, showToast }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
