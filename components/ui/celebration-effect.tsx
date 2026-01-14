"use client"

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
}

interface CelebrationEffectProps {
  show: boolean
  message?: string
  onComplete?: () => void
  confettiCount?: number
}

const CONFETTI_COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']

export function CelebrationEffect({ 
  show, 
  message = "Amazing!", 
  onComplete,
  confettiCount = 50 
}: CelebrationEffectProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (show) {
      const pieces: ConfettiPiece[] = []
      
      for (let i = 0; i < confettiCount; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          delay: Math.random() * 0.5
        })
      }
      
      setConfetti(pieces)
      
      const timer = setTimeout(() => {
        setConfetti([])
        onComplete?.()
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [show, onComplete, confettiCount])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`
          }}
        />
      ))}
      
      {message && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm border-2 border-accent px-6 py-3 rounded-full shadow-lg animate-scaleIn">
            <Sparkles className="h-6 w-6 text-accent animate-pulse-subtle" />
            <span className="text-2xl font-bold text-foreground">{message}</span>
            <Sparkles className="h-6 w-6 text-accent animate-pulse-subtle" />
          </div>
        </div>
      )}
    </div>
  )
}
