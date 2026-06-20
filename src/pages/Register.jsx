import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

const perks = ['Free store setup', 'Instant payments', 'No monthly fees', '0% commission on first $100']

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useApp()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    login({ name: form.name, email: form.email })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div className="hidden md:block">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-bold text-2xl gradient-text">NexaSell</span>
          </Link>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Start selling digital products <span className="gradient-text">today</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">Join thousands of creators monetizing their skills and products on NexaSell.</p>
          <div className="space-y-3">
            {perks.map(perk => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" />
                </div>
                <span className="text-gray-300 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="md:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <span className="font-bold text-2xl gradient-text">NexaSell</span>
            </Link>
          </div>

          <div className="card">
            <h1 className="text-xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-gray-400 text-sm mb-6">Free forever · No credit card required</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" className="input" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" className="input" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Password</label>
                <input type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" className="input" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account — It\'s Free'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">Sign in</Link>
            </p>
            <p className="text-center text-xs text-gray-600 mt-3">By creating an account you agree to our Terms & Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}
