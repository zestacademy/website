"use client"

import { ReactNode, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: string | ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top',
  delay = 200 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-accent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-accent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-accent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-accent'
  }

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 whitespace-nowrap px-3 py-2 text-sm font-medium text-accent-foreground bg-accent rounded-md shadow-lg animate-in fade-in slide-in-from-bottom-1 duration-200",
            positionClasses[position]
          )}
          role="tooltip"
        >
          {content}
          <div 
            className={cn(
              "absolute w-2 h-2 bg-accent rotate-45",
              arrowClasses[position]
            )} 
          />
        </div>
      )}
    </div>
  )
}
