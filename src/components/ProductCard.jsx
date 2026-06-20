import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Zap, Package } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ProductCard({ product }) {
  const { addToCart } = useApp()
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null

  return (
    <div className="card group cursor-pointer flex flex-col gap-4">
      <Link to={`/product/${product.id}`}>
        <div className={`h-40 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <Package size={48} className="text-white/80 relative z-10" />
          {discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
              -{discount}%
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-accent-500/90 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10 flex items-center gap-1">
              <Zap size={10} /> HOT
            </div>
          )}
        </div>
      </Link>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-1">{product.name}</h3>
          </Link>
          <span className="badge bg-dark-600 text-gray-400 shrink-0">{product.category}</span>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mt-auto">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
            ))}
          </div>
          <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
          <span className="text-xs text-gray-600 ml-auto">{product.sales.toLocaleString()} sold</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all active:scale-95 hover:shadow-lg hover:shadow-primary-500/25">
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
