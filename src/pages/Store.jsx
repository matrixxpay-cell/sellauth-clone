import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Best Rated', 'Most Sold']

export default function Store() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('Featured')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'All') list = list.filter(p => p.category === category)
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price)
    else if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price)
    else if (sort === 'Best Rated') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'Most Sold') list.sort((a, b) => b.sales - a.sales)
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    return list
  }, [search, category, sort, priceRange])

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
          <p className="text-gray-400">Discover thousands of digital products from top sellers</p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="input pl-11" />
            {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><X size={16} /></button>}
          </div>
          <div className="relative">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="input pr-10 appearance-none cursor-pointer min-w-[180px]">
              {sortOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? 'text-primary-400 border-primary-500/50' : ''}`}>
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">Price Range: $0 - ${priceRange[1]}</label>
                <input type="range" min="0" max="200" value={priceRange[1]} onChange={e => setPriceRange([0, +e.target.value])}
                  className="w-full accent-primary-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">Delivery Type</label>
                <div className="flex gap-2 flex-wrap">
                  {['All', 'Instant', 'Scheduled'].map(t => (
                    <button key={t} className="badge bg-dark-600 text-gray-300 hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${category === c ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25' : 'glass text-gray-400 hover:text-white'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">{filtered.length} products found</p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your filters or search term</p>
            <button onClick={() => { setSearch(''); setCategory('All') }} className="btn-primary mt-6">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
