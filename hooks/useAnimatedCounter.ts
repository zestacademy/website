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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(end)
      return
    }

    let frameId: number
    let cancelled = false
    const startTime = Date.now()
    const range = end - start

    const updateCount = () => {
      if (cancelled) return
      
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const currentCount = start + range * easeOutQuad(progress)

      setCount(Math.floor(currentCount))

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    frameId = requestAnimationFrame(updateCount)
    return () => {
      cancelled = true
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [end, duration, start])

  return count
}
