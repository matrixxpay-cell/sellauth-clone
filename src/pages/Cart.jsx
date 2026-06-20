import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight, Shield, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Cart() {
  const { cart, removeFromCart, cartTotal } = useApp()

  if (cart.length === 0) return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Discover amazing digital products in our marketplace</p>
        <Link to="/store" className="btn-primary px-8 py-3 inline-block">Browse Marketplace</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart <span className="text-gray-500 text-xl font-normal">({cart.length} items)</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="card flex items-center gap-4">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.gradient} shrink-0 flex items-center justify-center`}>
                  <ShoppingBag size={24} className="text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-semibold text-white hover:text-primary-400 transition-colors block truncate">{item.name}</Link>
                  <p className="text-xs text-gray-500 mt-0.5">{item.category} · {item.deliveryMethod} delivery</p>
                  <div className="text-lg font-bold text-white mt-1">${item.price}</div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors shrink-0">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400 truncate mr-2">{item.name}</span>
                    <span className="text-white shrink-0">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-white">Total</span>
                  <span className="gradient-text">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-base">
                Checkout <ArrowRight size={18} />
              </Link>
            </div>
            <div className="card">
              <div className="space-y-2">
                {[[Shield, 'Secure payment processing'], [Zap, 'Instant delivery guaranteed']].map(([Icon, text]) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-400">
                    <Icon size={13} className="text-primary-400 shrink-0" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
