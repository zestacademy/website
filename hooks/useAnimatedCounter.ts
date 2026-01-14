"use client"

import { useState, useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/animations'

/**
 * Hook to animate numbers counting up
 * @param end - Target number
 * @param duration - Animation duration in ms
 * @param start - Starting number (default: 0)
 */
export function useAnimatedCounter(
  end: number,
  duration: number = 1000,
  start: number = 0
) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(end)
      return
    }

    const startTime = Date.now()
    const range = end - start

    const updateCount = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const currentCount = start + range * easeOutQuad(progress)

      setCount(Math.floor(currentCount))

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    const animationFrame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start])

  return count
}
