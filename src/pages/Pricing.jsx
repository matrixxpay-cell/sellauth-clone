import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Zap, Star } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for beginners just starting out',
    features: ['Up to 5 products', 'Basic analytics', 'Instant delivery', 'Email support', '5% commission'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: { monthly: 19, yearly: 15 },
    description: 'For serious sellers scaling their business',
    features: ['Unlimited products', 'Advanced analytics', 'Custom domain', 'Priority support', 'Affiliate system', '2% commission', 'Custom checkout'],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 49, yearly: 39 },
    description: 'For high-volume sellers and agencies',
    features: ['Everything in Pro', 'Team members', 'API access', 'White-label', 'Dedicated manager', '0% commission', 'Custom integrations'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-400 text-lg mb-8">Start free. Scale as you grow. No hidden fees.</p>
          <div className="inline-flex items-center gap-3 glass rounded-full p-1">
            <button onClick={() => setYearly(false)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'text-gray-400'}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${yearly ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-xs ml-1 text-green-400">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.name} className={`card flex flex-col relative ${plan.highlight ? 'gradient-border ring-2 ring-primary-500/30' : ''}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-xs font-bold text-white">
                    <Star size={10} fill="currentColor" /> Most Popular
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">${yearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-gray-500 mb-1">/mo</span>
                </div>
                {yearly && plan.price.yearly > 0 && (
                  <p className="text-xs text-green-400 mt-1">Billed ${plan.price.yearly * 12}/year</p>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-primary-400" />
                    </div>
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register" className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <Zap size={14} className="text-primary-400" />
            All plans include instant delivery, SSL security, and fraud protection
          </p>
        </div>
      </div>
    </div>
  )
}
