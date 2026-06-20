import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Zap, User, ChevronDown, Store, LayoutDashboard, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { cartCount, user, logout } = useApp()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">NexaSell</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[['/', 'Home'], ['/store', 'Marketplace'], ['/pricing', 'Pricing']].map(([path, label]) => (
              <Link key={path} to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === path ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-xs font-bold text-white">
                    {user.name?.[0] || 'U'}
                  </div>
                  <span className="text-sm text-gray-300">{user.name}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl shadow-black/30 overflow-hidden">
                    <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link to="/store" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                      <Store size={15} /> My Store
                    </Link>
                    <hr className="border-white/10" />
                    <button onClick={() => { logout(); setUserMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-2">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm py-2">Get Started</Link>
              </div>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {[['/', 'Home'], ['/store', 'Marketplace'], ['/pricing', 'Pricing']].map(([path, label]) => (
              <Link key={path} to={path}
                className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                {label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" className="btn-secondary text-center text-sm">Sign In</Link>
              <Link to="/register" className="btn-primary text-center text-sm">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
