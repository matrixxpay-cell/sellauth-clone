import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCard, Bitcoin, Shield, Lock, ChevronLeft, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const payMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'crypto', label: 'Cryptocurrency', icon: Bitcoin },
]

export default function Checkout() {
  const { cart, cartTotal, clearCart, showToast } = useApp()
  const navigate = useNavigate()
  const [payMethod, setPayMethod] = useState('card')
  const [step, setStep] = useState(1) // 1=details, 2=payment, 3=success
  const [form, setForm] = useState({ email: '', name: '' })
  const [loading, setLoading] = useState(false)

  const handleOrder = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setStep(3)
    clearCart()
  }

  if (step === 3) return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Order Complete!</h2>
        <p className="text-gray-400 mb-6">Your digital products have been delivered to <strong className="text-white">{form.email || 'your email'}</strong></p>
        <Link to="/store" className="btn-primary px-8 py-3 inline-block">Continue Shopping</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm">
          <ChevronLeft size={16} /> Back to Cart
        </Link>
        <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Step 1: Contact */}
            <div className="card">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-xs font-bold text-white">1</div>
                <h3 className="font-semibold text-white">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" className="input" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Email Address</label>
                  <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" placeholder="you@example.com" className="input" />
                </div>
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="card">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-xs font-bold text-white">2</div>
                <h3 className="font-semibold text-white">Payment Method</h3>
              </div>
              <div className="flex gap-3 mb-5">
                {payMethods.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setPayMethod(id)}
                    className={`flex-1 flex items-center gap-2 p-4 rounded-xl border transition-all ${payMethod === id ? 'border-primary-500 bg-primary-500/10 text-white' : 'border-dark-500 text-gray-400 hover:border-dark-400'}`}>
                    <Icon size={18} /> <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>

              {payMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Card Number</label>
                    <input placeholder="1234 5678 9012 3456" className="input" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1.5 block">Expiry</label>
                      <input placeholder="MM / YY" className="input" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1.5 block">CVV</label>
                      <input placeholder="•••" className="input" />
                    </div>
                  </div>
                </div>
              )}

              {payMethod === 'crypto' && (
                <div className="bg-dark-700 rounded-xl p-5 text-center">
                  <div className="text-3xl mb-3">₿</div>
                  <p className="text-sm text-gray-400 mb-3">You'll be redirected to our crypto payment gateway after clicking "Place Order"</p>
                  <div className="flex gap-3 justify-center">
                    {['BTC', 'ETH', 'LTC', 'USDT'].map(c => (
                      <span key={c} className="badge bg-dark-600 text-gray-400">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400 truncate mr-2">{item.name}</span>
                    <span className="text-white shrink-0">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2 mb-5">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Processing Fee</span><span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/5">
                  <span className="text-white">Total</span>
                  <span className="gradient-text">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handleOrder} disabled={loading}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-base disabled:opacity-50">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : (
                  <><Lock size={16} /> Place Order</>
                )}
              </button>
              <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-500">
                <Shield size={12} /> <span>SSL secured & encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
