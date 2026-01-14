"use client"

import { useState, useEffect } from 'react'

/**
 * Hook to track scroll progress on a page
 * Returns a value between 0 and 100
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const scrollableHeight = documentHeight - windowHeight
      const currentProgress = scrollableHeight > 0 
        ? (scrollTop / scrollableHeight) * 100 
        : 0

      setProgress(Math.min(100, Math.max(0, currentProgress)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return progress
}
