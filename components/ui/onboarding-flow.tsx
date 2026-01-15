"use client"

import { useState, useEffect } from 'react'
import { Button } from './button'
import { Progress } from './progress'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OnboardingStep {
  title: string
  description: string
  icon?: React.ReactNode
}

interface OnboardingFlowProps {
  steps: OnboardingStep[]
  onComplete: () => void
  onSkip?: () => void
  storageKey?: string
}

export function OnboardingFlow({ 
  steps, 
  onComplete, 
  onSkip,
  storageKey = 'onboarding-completed' 
}: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const checkCompletion = async () => {
      // Check if onboarding was already completed
      const completed = localStorage.getItem(storageKey)
      if (!completed) {
        setShow(true)
      }
    }
    
    checkCompletion()
  }, [storageKey])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem(storageKey, 'true')
    setShow(false)
    onComplete()
  }

  const handleSkipOnboarding = () => {
    localStorage.setItem(storageKey, 'true')
    setShow(false)
    onSkip?.()
  }

  if (!show) return null

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-card border-2 border-accent/50 rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </p>
              <Progress value={progress} className="h-1 w-32" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkipOnboarding}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" key={currentStep}>
            {step.icon && (
              <div className="flex justify-center">
                <div className="p-4 bg-accent/10 rounded-full">
                  {step.icon}
                </div>
              </div>
            )}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{step.title}</h2>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={cn(currentStep === 0 && "invisible")}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button onClick={handleNext} className="gap-2">
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* Skip link */}
          <div className="text-center">
            <button
              onClick={handleSkipOnboarding}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip onboarding
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
