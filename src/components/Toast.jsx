import React from 'react'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null

  const isError = toast.type === 'error'
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl shadow-black/30 glass border transition-all duration-300 animate-in slide-in-from-right-5 ${isError ? 'border-red-500/30' : 'border-primary-500/30'}`}>
      {isError ? <AlertCircle size={18} className="text-red-400" /> : <CheckCircle size={18} className="text-primary-400" />}
      <span className="text-sm text-white">{toast.message}</span>
    </div>
  )
}
