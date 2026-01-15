"use client"

import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'

interface ReadingProgressBarProps {
  className?: string
  color?: string
}

export function ReadingProgressBar({ className, color = 'bg-accent' }: ReadingProgressBarProps) {
  const progress = useScrollProgress()

  return (
    <div className={cn("fixed top-0 left-0 right-0 h-1 z-50", className)}>
      <div
        className={cn("h-full transition-all duration-150 ease-out", color)}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  )
}
