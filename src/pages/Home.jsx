import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, Shield, CreditCard, TrendingUp, Star, ArrowRight, Package, Users, DollarSign, Globe } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const stats = [
  { icon: DollarSign, label: 'Total Payouts', value: '$2.4M+', color: 'text-green-400' },
  { icon: Users, label: 'Active Sellers', value: '12,400+', color: 'text-blue-400' },
  { icon: Package, label: 'Products Sold', value: '890K+', color: 'text-purple-400' },
  { icon: Globe, label: 'Countries', value: '150+', color: 'text-orange-400' },
]

const features = [
  { icon: Zap, title: 'Instant Delivery', description: 'Products delivered automatically the second payment clears. No manual work needed.', color: 'from-yellow-500 to-orange-500' },
  { icon: Shield, title: 'Fraud Protection', description: 'Advanced AI-powered fraud detection keeps your store and buyers safe 24/7.', color: 'from-green-500 to-teal-500' },
  { icon: CreditCard, title: 'Global Payments', description: 'Accept crypto, cards, PayPal and more. Get paid in 150+ countries instantly.', color: 'from-blue-500 to-cyan-500' },
  { icon: TrendingUp, title: 'Smart Analytics', description: 'Real-time dashboards with detailed sales, conversion, and revenue insights.', color: 'from-purple-500 to-pink-500' },
]

const testimonials = [
  { name: 'Marcus T.', role: 'Discord Bot Seller', avatar: 'MT', text: 'NexaSell helped me scale from $200/mo to $8,000/mo in just 3 months. The platform is incredible.', rating: 5 },
  { name: 'Luna K.', role: 'Roblox Script Dev', avatar: 'LK', text: 'Best platform I\'ve tried. Instant delivery works flawlessly, customers love it and my refunds dropped to zero.', rating: 5 },
  { name: 'Jake R.', role: 'UI/UX Designer', avatar: 'JR', text: 'Selling design assets has never been easier. Setup took 10 minutes and I made my first sale the same day.', rating: 5 },
]

export default function Home() {
  const featured = products.filter(p => p.featured)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-gray-400 mb-8 border border-white/10">
            <Zap size={14} className="text-primary-400" />
            <span>Trusted by <strong className="text-white">12,400+</strong> sellers worldwide</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-white">Sell Digital</span><br />
            <span className="gradient-text">Products Instantly</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The most powerful platform for selling digital goods. Launch your store in minutes, reach customers globally, and get paid automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary px-8 py-4 text-base inline-flex items-center justify-center gap-2 group">
              Start Selling Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/store" className="btn-secondary px-8 py-4 text-base inline-flex items-center justify-center gap-2">
              Browse Marketplace
            </Link>
          </div>

          <p className="mt-5 text-sm text-gray-600">No credit card required · Free forever plan available</p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card text-center">
              <Icon size={24} className={`${color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <p className="text-gray-500 text-sm mt-1">Top picks handpicked by our team</p>
          </div>
          <Link to="/store" className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Everything you need to succeed</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Built for digital creators who want to focus on their product, not the platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="card group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Loved by thousands of sellers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="card">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 p-12 text-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative">
            <h2 className="text-4xl font-black text-white mb-4">Ready to start selling?</h2>
            <p className="text-white/80 text-lg mb-8">Join 12,400+ sellers already making money on NexaSell</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark-900 font-bold rounded-2xl hover:bg-gray-100 transition-colors text-base">
              Create Your Store — It's Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
