"use client"

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({ 
  value, 
  duration = 1000, 
  className,
  prefix = '',
  suffix = ''
}: AnimatedCounterProps) {
  const count = useAnimatedCounter(value, duration)
  
  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}{count}{suffix}
    </span>
  )
}
