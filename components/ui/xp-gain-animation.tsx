"use client"

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

interface XPGainAnimationProps {
  amount: number
  show: boolean
  onComplete?: () => void
}

export function XPGainAnimation({ amount, show, onComplete }: XPGainAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg animate-slideUp">
        <Zap className="h-5 w-5 animate-pulse-subtle" />
        <span className="text-xl font-bold">+{amount} XP</span>
      </div>
    </div>
  )
}
