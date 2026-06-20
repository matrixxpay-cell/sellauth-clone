import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, Twitter, Github, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">NexaSell</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">The next-gen platform for digital product sellers. Fast, secure, beautiful.</p>
            <div className="flex items-center gap-3 mt-4">
              {[Twitter, Github, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Product', links: ['Marketplace', 'Pricing', 'Features', 'Changelog'] },
            { title: 'Sellers', links: ['Sell with us', 'Dashboard', 'Analytics', 'Payouts'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Terms', 'Privacy'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">© 2024 NexaSell. All rights reserved.</p>
          <p className="text-gray-600 text-sm">Made with ❤️ for digital creators</p>
        </div>
      </div>
    </footer>
  )
}
