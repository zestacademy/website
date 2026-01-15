# UI Micro-Interactions & Enhancements

This document describes the UI micro-interactions and enhancements implemented across the Zest Academy platform.

## Overview

The implementation focuses on creating a premium, engaging learning experience with subtle animations, smooth transitions, and accessible interactions. All animations respect the `prefers-reduced-motion` setting for accessibility.

## Components

### 1. Animation Utilities (`lib/animations.ts`)

Core animation utilities and helpers.

**Features:**
- Predefined easing functions (smooth, bounce, swift, dramatic)
- Animation duration constants
- `prefersReducedMotion()` check
- `createRipple()` for button ripple effects

**Usage:**
```typescript
import { createRipple, animations, easings } from '@/lib/animations'

// Check if user prefers reduced motion
if (prefersReducedMotion()) {
  // Skip animation
}

// Apply animation class
<div className={animations.fadeIn}>Content</div>
```

### 2. Reading Progress Bar

Shows reading progress at the top of article pages.

**Usage:**
```tsx
import { ReadingProgressBar } from '@/components/ui/reading-progress-bar'

<ReadingProgressBar />
```

### 3. Skeleton Loaders

Loading placeholders for content.

**Usage:**
```tsx
import { Skeleton, ArticleCardSkeleton, CourseCardSkeleton } from '@/components/ui/skeleton'

// Basic skeleton
<Skeleton className="h-4 w-full" />

// Preset patterns
<ArticleCardSkeleton />
<CourseCardSkeleton />
```

### 4. Toast Notifications

Modern toast notification system with animations.

**Setup:**
Wrap your app with `ToastProvider` in the root layout.

**Usage:**
```tsx
import { useToast } from '@/components/ui/toast-provider'

const { showToast } = useToast()

// Show notifications
showToast("Success!", "success")
showToast("Error occurred", "error")
showToast("Information", "info")
showToast("Warning!", "warning")
```

### 5. Animated Counter

Counts up to a target number with smooth animation.

**Usage:**
```tsx
import { AnimatedCounter } from '@/components/ui/animated-counter'

<AnimatedCounter 
  value={100} 
  duration={1000}
  prefix="$"
  suffix=" points"
/>
```

### 6. Circular Progress

Animated circular progress indicator.

**Usage:**
```tsx
import { CircularProgress } from '@/components/ui/circular-progress'

<CircularProgress 
  value={75}
  size={120}
  strokeWidth={8}
  showValue={true}
/>
```

### 7. Celebration Effect

Confetti animation for achievements and completions.

**Usage:**
```tsx
import { CelebrationEffect } from '@/components/ui/celebration-effect'

const [showCelebration, setShowCelebration] = useState(false)

<CelebrationEffect 
  show={showCelebration}
  message="Level Up!"
  onComplete={() => setShowCelebration(false)}
/>
```

### 8. Feature Spotlight

Highlight new features with overlay tooltips.

**Usage:**
```tsx
import { FeatureSpotlight } from '@/components/ui/feature-spotlight'

<FeatureSpotlight
  title="New Feature!"
  description="Check out this amazing new capability"
  position="center"
  onClose={() => setShowSpotlight(false)}
>
  <Button>Try it now</Button>
</FeatureSpotlight>
```

### 9. Tooltip

Hover-reveal tooltips with smooth animations.

**Usage:**
```tsx
import { Tooltip } from '@/components/ui/tooltip'

<Tooltip content="This is a helpful tip" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

### 10. XP Gain Animation

Show XP gains with animated notification.

**Usage:**
```tsx
import { XPGainAnimation } from '@/components/ui/xp-gain-animation'

<XPGainAnimation 
  amount={50}
  show={showXP}
  onComplete={() => setShowXP(false)}
/>
```

### 11. Instant Search

Real-time search with animated results.

**Usage:**
```tsx
import { InstantSearch } from '@/components/ui/instant-search'

<InstantSearch
  placeholder="Search courses..."
  onSearch={async (query) => {
    // Return search results
    return [
      { id: '1', title: 'Result 1', description: 'Description' }
    ]
  }}
  onSelect={(result) => {
    console.log('Selected:', result)
  }}
/>
```

### 12. Onboarding Flow

Step-by-step onboarding with progress indicator.

**Usage:**
```tsx
import { OnboardingFlow } from '@/components/ui/onboarding-flow'
import { BookOpen, Zap, Trophy } from 'lucide-react'

const steps = [
  {
    title: "Welcome!",
    description: "Let's get you started",
    icon: <BookOpen className="h-8 w-8 text-accent" />
  },
  {
    title: "Learn Fast",
    description: "Access quality content",
    icon: <Zap className="h-8 w-8 text-accent" />
  },
  {
    title: "Track Progress",
    description: "Monitor your achievements",
    icon: <Trophy className="h-8 w-8 text-accent" />
  }
]

<OnboardingFlow
  steps={steps}
  onComplete={() => console.log('Onboarding complete')}
  onSkip={() => console.log('Onboarding skipped')}
  storageKey="app-onboarding"
/>
```

## Enhanced Components

### Button
- **Ripple effect** on click
- **Scale-down animation** (98%) for tactile feedback
- Smooth transitions

### Card
- **Interactive prop** for hover effects
- Subtle lift on hover with `interactive={true}`

### Badge
- New **achievement variant** with glow animation
- Smooth transitions

### Navbar
- **Scroll detection** for backdrop blur
- **Active section highlighting** with animated underline
- Logo hover scale effect

### Quiz Section
- **Animated checkmark** for correct answers (`animate-scaleIn`)
- **Shake animation** for wrong answers (`animate-shake`)
- Smooth completion banner

## Custom Hooks

### useScrollProgress

Tracks scroll progress on a page (0-100).

**Usage:**
```tsx
import { useScrollProgress } from '@/hooks/useScrollProgress'

const progress = useScrollProgress()
```

### useAnimatedCounter

Animates number counting.

**Usage:**
```tsx
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

const count = useAnimatedCounter(100, 1000)
```

## CSS Animations

Global animations defined in `app/globals.css`:

- `animate-fadeIn` - Fade in effect
- `animate-slideUp` - Slide up from bottom
- `animate-scaleIn` - Scale in with bounce
- `animate-shake` - Shake for errors
- `animate-pulse-subtle` - Subtle pulse effect
- `animate-glow` - Glow effect for achievements
- `.skeleton` - Shimmer loading effect

## Accessibility

All animations are designed with accessibility in mind:

- **Respects `prefers-reduced-motion`** - Animations are skipped or simplified
- **Keyboard navigation** - All interactive elements are keyboard accessible
- **Focus indicators** - High-contrast focus rings on all focusable elements
- **ARIA labels** - Proper labels for screen readers

## Performance

- **GPU-accelerated animations** - Using `transform` and `opacity`
- **Debounced search** - 300ms delay for instant search
- **Optimized re-renders** - React hooks with proper dependencies
- **Lazy animations** - Effects only run when needed

## Design Principles

1. **Subtle, not distracting** - Animations enhance, don't obstruct
2. **Fast feedback** - Under 100ms response feel
3. **Consistent easing** - Using predefined easing functions
4. **Engineering-grade clarity** - Professional, polished feel
5. **Minimal cognitive load** - Simple, intuitive interactions

## Browser Support

All features work on modern browsers supporting:
- CSS animations and transitions
- CSS transforms
- Backdrop filter (with fallback)
- Intersection Observer API
- Local Storage

## Examples

### Complete Quiz Flow
```tsx
// Show celebration on quiz completion
const [showCelebration, setShowCelebration] = useState(false)
const [showXP, setShowXP] = useState(false)

const handleQuizComplete = (passed: boolean) => {
  if (passed) {
    setShowCelebration(true)
    setTimeout(() => {
      setShowXP(true)
    }, 1000)
  }
}

return (
  <>
    <QuizSection {...quizProps} />
    <CelebrationEffect 
      show={showCelebration}
      message="Great Job!"
      onComplete={() => setShowCelebration(false)}
    />
    <XPGainAnimation
      amount={50}
      show={showXP}
      onComplete={() => setShowXP(false)}
    />
  </>
)
```

### Dashboard Stats
```tsx
<Card interactive>
  <CardContent>
    <AnimatedCounter value={totalLessons} />
    <CircularProgress value={completionPercentage} />
  </CardContent>
</Card>
```

## Testing

To test animations:
1. Enable "Reduce motion" in OS settings to verify accessibility
2. Test on different devices for performance
3. Verify keyboard navigation works for all interactive elements
4. Check focus indicators are visible
5. Test toast notifications don't interfere with content

## Future Enhancements

Potential additions:
- Haptic feedback on mobile devices
- Sound effects (optional, user-controlled)
- More sophisticated loading animations
- Advanced gamification elements
- Dark mode specific animations
