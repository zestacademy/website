"use client"

import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface FeatureSpotlightProps {
  title: string
  description: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  targetElement?: string // CSS selector
  onClose: () => void
  children?: ReactNode
}

export function FeatureSpotlight({
  title,
  description,
  position = 'center',
  onClose,
  children
}: FeatureSpotlightProps) {
  const positionClasses = {
    top: 'top-20 left-1/2 -translate-x-1/2',
    bottom: 'bottom-20 left-1/2 -translate-x-1/2',
    left: 'left-20 top-1/2 -translate-y-1/2',
    right: 'right-20 top-1/2 -translate-y-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  }

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Spotlight content */}
      <div className={cn(
        "absolute max-w-md animate-in slide-in-from-bottom-4 duration-500",
        positionClasses[position]
      )}>
        <div className="bg-card border-2 border-accent rounded-lg shadow-2xl p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {children && (
            <div className="pt-2">
              {children}
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Got it!</Button>
          </div>
        </div>
        
        {/* Arrow indicator */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-r-2 border-b-2 border-accent rotate-45" />
      </div>
    </div>
  )
}
