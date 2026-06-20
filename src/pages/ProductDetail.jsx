import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Shield, Zap, Package, ChevronLeft, Heart, Share2, CheckCircle } from 'lucide-react'
import { products, reviews } from '../data/products'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useApp()
  const [activeTab, setActiveTab] = useState('description')
  const [liked, setLiked] = useState(false)

  const product = products.find(p => p.id === +id)
  if (!product) return (
    <div className="min-h-screen pt-28 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Product not found</h2>
        <Link to="/store" className="btn-primary mt-4 inline-block">Back to Store</Link>
      </div>
    </div>
  )

  const productReviews = reviews.filter(r => r.productId === product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/store" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm">
          <ChevronLeft size={16} /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Product Image */}
            <div className={`h-72 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <Package size={80} className="text-white/70 relative z-10" />
              {discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-xl z-10">-{discount}% OFF</div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 glass rounded-xl p-1">
              {['description', 'reviews', 'seller'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                  {tab} {tab === 'reviews' && `(${productReviews.length})`}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div className="card">
                <h2 className="text-xl font-bold text-white mb-4">About this product</h2>
                <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {[['Category', product.category], ['Type', product.type], ['Delivery', product.deliveryMethod], ['Stock', typeof product.stock === 'number' ? product.stock : 'Unlimited']].map(([k, v]) => (
                    <div key={k} className="bg-dark-700 rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">{k}</div>
                      <div className="text-sm font-medium text-white">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-white mb-3">Tags</h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.tags.map(tag => (
                      <span key={tag} className="badge bg-dark-600 text-gray-400">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {productReviews.length > 0 ? productReviews.map(r => (
                  <div key={r.id} className="card">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {r.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white text-sm">{r.user}</span>
                          <span className="text-xs text-gray-500">{r.date}</span>
                        </div>
                        <div className="flex items-center gap-1 my-1">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />)}
                        </div>
                        <p className="text-sm text-gray-300">{r.text}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="card text-center py-10">
                    <p className="text-gray-400">No reviews yet. Be the first!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'seller' && (
              <div className="card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold">
                    {product.seller.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{product.seller.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(product.seller.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />)}
                      </div>
                      <span className="text-sm text-gray-400">{product.seller.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{product.seller.sales.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Total Sales</div>
                  </div>
                  <div className="bg-dark-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{product.seller.rating}</div>
                    <div className="text-xs text-gray-500 mt-1">Rating</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card sticky top-24">
              <div className="flex items-start justify-between mb-1">
                <h1 className="text-xl font-bold text-white leading-tight">{product.name}</h1>
                <button onClick={() => setLiked(!liked)} className={`p-1 transition-colors ${liked ? 'text-red-400' : 'text-gray-500 hover:text-red-400'}`}>
                  <Heart size={20} className={liked ? 'fill-current' : ''} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />)}
                </div>
                <span className="text-sm text-gray-400">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-black text-white">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="badge bg-red-500/20 text-red-400">-{discount}%</span>
                  </>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {[
                  [Zap, 'Instant delivery after payment'],
                  [Shield, 'Buyer protection guarantee'],
                  [CheckCircle, `${product.sales.toLocaleString()} happy customers`],
                ].map(([Icon, text]) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-300">
                    <Icon size={15} className="text-primary-400 shrink-0" /> {text}
                  </div>
                ))}
              </div>

              <button onClick={() => addToCart(product)} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base mb-3">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <Link to="/checkout" onClick={() => addToCart(product)} className="w-full btn-secondary py-3 flex items-center justify-center gap-2 text-sm">
                Buy Now
              </Link>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/5">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  <Share2 size={13} /> Share
                </button>
                <span className="text-gray-700">|</span>
                <span className="text-xs text-gray-500">
                  {typeof product.stock === 'number' ? `${product.stock} left in stock` : 'Unlimited stock'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
