/**
 * Animation utilities for micro-interactions
 * All animations respect prefers-reduced-motion
 */

// Easing functions
export const easings = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  swift: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  dramatic: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

// Animation durations
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Apply animation only if user doesn't prefer reduced motion
export const withReducedMotion = (animation: string) => {
  return prefersReducedMotion() ? 'none' : animation
}

// Animation classes
export const animations = {
  // Button interactions
  buttonPress: 'active:scale-[0.98] transition-transform duration-75',
  buttonRipple: 'relative overflow-hidden',
  
  // Hover effects
  hoverLift: 'transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg',
  hoverScale: 'transition-transform duration-300 hover:scale-105',
  hoverGlow: 'transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(var(--accent),0.3)]',
  
  // Loading states
  fadeIn: 'animate-in fade-in duration-500',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
  slideDown: 'animate-in slide-in-from-top-4 duration-500',
  
  // Focus states
  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  
  // Progress indicators
  progressPulse: 'animate-pulse',
} as const

// Create ripple effect on click
export const createRipple = (event: React.MouseEvent<HTMLElement>) => {
  if (prefersReducedMotion()) return

  const button = event.currentTarget
  const ripple = document.createElement('span')
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.classList.add('ripple-effect')

  const existingRipple = button.querySelector('.ripple-effect')
  if (existingRipple) {
    existingRipple.remove()
  }

  button.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}
