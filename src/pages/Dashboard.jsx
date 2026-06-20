import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { DollarSign, Package, ShoppingCart, TrendingUp, Plus, Eye, Edit, Trash2, Star, ArrowUpRight, Bell, Settings, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'

const revenueData = [
  { month: 'Jan', revenue: 1200, orders: 45 }, { month: 'Feb', revenue: 1800, orders: 62 },
  { month: 'Mar', revenue: 1400, orders: 51 }, { month: 'Apr', revenue: 2100, orders: 78 },
  { month: 'May', revenue: 2800, orders: 95 }, { month: 'Jun', revenue: 3200, orders: 112 },
  { month: 'Jul', revenue: 2600, orders: 88 }, { month: 'Aug', revenue: 3800, orders: 128 },
]

const recentOrders = [
  { id: '#5821', product: 'NexaBot Pro', buyer: 'Alex K.', amount: 29.99, status: 'completed', time: '2 min ago' },
  { id: '#5820', product: 'Premium UI Kit', buyer: 'Sarah M.', amount: 39.99, status: 'completed', time: '15 min ago' },
  { id: '#5819', product: 'MC SkyBlock', buyer: 'Jake R.', amount: 49.99, status: 'processing', time: '1 hr ago' },
  { id: '#5818', product: 'Web Dev Course', buyer: 'Emma W.', amount: 59.99, status: 'completed', time: '3 hr ago' },
  { id: '#5817', product: 'Roblox Scripts', buyer: 'Tom B.', amount: 14.99, status: 'refunded', time: '5 hr ago' },
]

const statusStyle = {
  completed: 'bg-green-500/20 text-green-400',
  processing: 'bg-yellow-500/20 text-yellow-400',
  refunded: 'bg-red-500/20 text-red-400',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl p-3 text-xs border border-white/10">
      <p className="text-gray-400 mb-1">{label}</p>
      <p className="text-primary-400 font-semibold">${payload[0]?.value?.toLocaleString()}</p>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useApp()
  const [activeTab, setActiveTab] = useState('overview')
  const myProducts = products.slice(0, 4)

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: '$18,240', change: '+23%', color: 'from-green-500 to-emerald-400' },
    { icon: ShoppingCart, label: 'Total Orders', value: '659', change: '+18%', color: 'from-blue-500 to-cyan-400' },
    { icon: Package, label: 'Products', value: '4', change: '+1', color: 'from-purple-500 to-pink-400' },
    { icon: Users, label: 'Customers', value: '412', change: '+31%', color: 'from-orange-500 to-amber-400' },
  ]

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-0.5">Welcome back, <span className="text-white">{user?.name || 'Seller'}</span> 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 glass rounded-xl text-gray-400 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
            </button>
            <button className="p-2.5 glass rounded-xl text-gray-400 hover:text-white transition-colors">
              <Settings size={18} />
            </button>
            <Link to="/store/new" className="btn-primary flex items-center gap-2 text-sm py-2.5">
              <Plus size={16} /> New Product
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 glass rounded-xl p-1 w-fit">
          {['overview', 'products', 'orders'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map(({ icon: Icon, label, value, change, color }) => (
                <div key={label} className="card">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-xs font-medium">
                      <ArrowUpRight size={12} /> {change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
              <div className="lg:col-span-2 card">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-white">Revenue Overview</h3>
                  <span className="badge bg-green-500/20 text-green-400">+23% this month</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#grad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="card">
                <h3 className="font-semibold text-white mb-5">Orders by Month</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Bar dataKey="orders" fill="url(#barGrad)" radius={[4, 4, 0, 0]}>
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                      </defs>
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-white">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-sm text-primary-400 hover:text-primary-300 transition-colors">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b border-white/5">
                      {['Order', 'Product', 'Buyer', 'Amount', 'Status', 'Time'].map(h => (
                        <th key={h} className="text-left py-3 px-2 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="py-3 px-2 text-gray-400 font-mono text-xs">{order.id}</td>
                        <td className="py-3 px-2 text-white">{order.product}</td>
                        <td className="py-3 px-2 text-gray-400">{order.buyer}</td>
                        <td className="py-3 px-2 text-white font-semibold">${order.amount}</td>
                        <td className="py-3 px-2">
                          <span className={`badge ${statusStyle[order.status]}`}>{order.status}</span>
                        </td>
                        <td className="py-3 px-2 text-gray-500 text-xs">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white">My Products ({myProducts.length})</h3>
              <Link to="/store/new" className="btn-primary text-sm py-2 flex items-center gap-2">
                <Plus size={14} /> Add Product
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myProducts.map(p => (
                <div key={p.id} className="card flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${p.gradient} shrink-0 flex items-center justify-center`}>
                    <Package size={22} className="text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{p.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-primary-400 font-semibold text-sm">${p.price}</span>
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-gray-500">{p.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{p.sales} sales</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link to={`/product/${p.id}`} className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                      <Eye size={15} />
                    </Link>
                    <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                      <Edit size={15} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="card">
            <h3 className="font-semibold text-white mb-5">All Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-white/5">
                    {['Order', 'Product', 'Buyer', 'Amount', 'Status', 'Time'].map(h => (
                      <th key={h} className="text-left py-3 px-2 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...recentOrders, ...recentOrders.map(o => ({ ...o, id: `#${Math.floor(Math.random()*1000)}` }))].map((order, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="py-3 px-2 text-gray-400 font-mono text-xs">{order.id}</td>
                      <td className="py-3 px-2 text-white">{order.product}</td>
                      <td className="py-3 px-2 text-gray-400">{order.buyer}</td>
                      <td className="py-3 px-2 text-white font-semibold">${order.amount}</td>
                      <td className="py-3 px-2"><span className={`badge ${statusStyle[order.status]}`}>{order.status}</span></td>
                      <td className="py-3 px-2 text-gray-500 text-xs">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
