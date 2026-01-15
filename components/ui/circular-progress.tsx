"use client"

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/animations'

interface CircularProgressProps {
  value: number // 0-100
  size?: number
  strokeWidth?: number
  className?: string
  showValue?: boolean
  color?: string
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  showValue = true,
  color = 'hsl(var(--accent))'
}: CircularProgressProps) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayValue(value)
      return
    }

    let frameId: number
    let cancelled = false
    const duration = 1000
    const startTime = Date.now()
    
    const animate = () => {
      if (cancelled) return
      
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuad = (t: number) => t * (2 - t)
      
      setDisplayValue(Math.round(value * easeOutQuad(progress)))
      
      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }
    
    frameId = requestAnimationFrame(animate)
    
    return () => {
      cancelled = true
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [value])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (displayValue / 100) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums">{displayValue}%</span>
        </div>
      )}
    </div>
  )
}
