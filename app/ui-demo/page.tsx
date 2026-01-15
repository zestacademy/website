"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArticleCardSkeleton, CourseCardSkeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast-provider'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { CircularProgress } from '@/components/ui/circular-progress'
import { CelebrationEffect } from '@/components/ui/celebration-effect'
import { FeatureSpotlight } from '@/components/ui/feature-spotlight'
import { Tooltip } from '@/components/ui/tooltip'
import { XPGainAnimation } from '@/components/ui/xp-gain-animation'
import { InstantSearch } from '@/components/ui/instant-search'
import { OnboardingFlow } from '@/components/ui/onboarding-flow'
import { Badge } from '@/components/ui/badge'
import { ReadingProgressBar } from '@/components/ui/reading-progress-bar'
import { 
  Sparkles, 
  Zap, 
  Trophy, 
  BookOpen, 
  Target,
  Rocket 
} from 'lucide-react'

export default function ComponentDemoPage() {
  const { showToast } = useToast()
  const [showCelebration, setShowCelebration] = useState(false)
  const [showXP, setShowXP] = useState(false)
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [loading, setLoading] = useState(false)

  const demoSearchResults = [
    { id: '1', title: 'Python Basics', description: 'Learn Python from scratch', category: 'Programming' },
    { id: '2', title: 'Web Development', description: 'Build modern web applications', category: 'Web' },
    { id: '3', title: 'Data Structures', description: 'Master algorithms and data structures', category: 'CS Fundamentals' }
  ]

  const onboardingSteps = [
    {
      title: "Welcome to Zest Academy!",
      description: "Your journey to mastering engineering fundamentals starts here",
      icon: <BookOpen className="h-10 w-10 text-accent" />
    },
    {
      title: "Track Your Progress",
      description: "Monitor your learning with detailed analytics and achievements",
      icon: <Target className="h-10 w-10 text-accent" />
    },
    {
      title: "Earn Rewards",
      description: "Complete courses and earn XP, badges, and certificates",
      icon: <Trophy className="h-10 w-10 text-accent" />
    },
    {
      title: "Ready to Start?",
      description: "Let's begin your learning adventure!",
      icon: <Rocket className="h-10 w-10 text-accent" />
    }
  ]

  const handleSearch = async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return demoSearchResults.filter(r => 
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  const triggerLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <ReadingProgressBar />
      
      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <h1 className="text-4xl font-bold">UI Component Showcase</h1>
          <p className="text-muted-foreground text-lg">
            Explore the micro-interactions and UI enhancements
          </p>
        </div>

        {/* Toast Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Click to see different toast types</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => showToast("Operation successful!", "success")}>
              Success Toast
            </Button>
            <Button onClick={() => showToast("An error occurred", "error")} variant="destructive">
              Error Toast
            </Button>
            <Button onClick={() => showToast("Here's some information", "info")} variant="secondary">
              Info Toast
            </Button>
            <Button onClick={() => showToast("Warning: Check this out", "warning")} variant="outline">
              Warning Toast
            </Button>
          </CardContent>
        </Card>

        {/* Animated Counters & Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Animated Stats</CardTitle>
            <CardDescription>Numbers count up smoothly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-4xl font-bold">
                  <AnimatedCounter value={42} duration={1500} />
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Students</p>
                <p className="text-4xl font-bold">
                  <AnimatedCounter value={1234} duration={1500} />
                </p>
              </div>
              <div className="flex justify-center">
                <CircularProgress value={75} size={120} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Celebration & XP */}
        <Card>
          <CardHeader>
            <CardTitle>Celebration & XP Gain</CardTitle>
            <CardDescription>Achievement animations</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => setShowCelebration(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              Trigger Celebration
            </Button>
            <Button onClick={() => setShowXP(true)}>
              <Zap className="mr-2 h-4 w-4" />
              Show XP Gain
            </Button>
          </CardContent>
        </Card>

        {/* Tooltips & Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltips & Badges</CardTitle>
            <CardDescription>Hover to reveal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Tooltip content="This is a helpful tip!" position="top">
                <Button variant="outline">Hover for Tooltip</Button>
              </Tooltip>
              <Tooltip content="Left positioned tooltip" position="left">
                <Button variant="outline">Left Tooltip</Button>
              </Tooltip>
              <Tooltip content="Right positioned tooltip" position="right">
                <Button variant="outline">Right Tooltip</Button>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="achievement">Achievement</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Instant Search */}
        <Card>
          <CardHeader>
            <CardTitle>Instant Search</CardTitle>
            <CardDescription>Search with real-time animated results</CardDescription>
          </CardHeader>
          <CardContent>
            <InstantSearch
              placeholder="Search courses..."
              onSearch={handleSearch}
              onSelect={(result) => showToast(`Selected: ${result.title}`, "success")}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Skeleton Loaders */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loaders</CardTitle>
            <CardDescription>Loading states with shimmer effect</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={triggerLoading} className="mb-4">
              Toggle Loading
            </Button>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ArticleCardSkeleton />
                <CourseCardSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card interactive>
                  <CardHeader>
                    <CardTitle>Sample Article</CardTitle>
                    <CardDescription>Click to explore</CardDescription>
                  </CardHeader>
                </Card>
                <Card interactive>
                  <CardHeader>
                    <CardTitle>Sample Course</CardTitle>
                    <CardDescription>Start learning today</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feature Spotlight & Onboarding */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding & Feature Highlights</CardTitle>
            <CardDescription>Guide users through new features</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => setShowSpotlight(true)}>
              Show Feature Spotlight
            </Button>
            <Button onClick={() => setShowOnboarding(true)} variant="secondary">
              Show Onboarding Flow
            </Button>
          </CardContent>
        </Card>

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card interactive>
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2 text-blue-500" />
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Hover to see the effect</CardDescription>
            </CardHeader>
          </Card>
          <Card interactive>
            <CardHeader>
              <Trophy className="h-8 w-8 mb-2 text-yellow-500" />
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
          </Card>
          <Card interactive>
            <CardHeader>
              <Zap className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Fast and responsive</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Button Variations */}
        <Card>
          <CardHeader>
            <CardTitle>Enhanced Buttons</CardTitle>
            <CardDescription>Click to see ripple effects</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </CardContent>
        </Card>
      </div>

      {/* Effects */}
      <CelebrationEffect 
        show={showCelebration}
        message="Amazing Work!"
        onComplete={() => setShowCelebration(false)}
      />
      
      <XPGainAnimation
        amount={50}
        show={showXP}
        onComplete={() => setShowXP(false)}
      />

      {showSpotlight && (
        <FeatureSpotlight
          title="New Feature!"
          description="Check out this amazing new capability that helps you learn faster"
          position="center"
          onClose={() => setShowSpotlight(false)}
        >
          <Button onClick={() => setShowSpotlight(false)}>Try it now</Button>
        </FeatureSpotlight>
      )}

      {showOnboarding && (
        <OnboardingFlow
          steps={onboardingSteps}
          onComplete={() => {
            setShowOnboarding(false)
            showToast("Welcome to Zest Academy!", "success")
          }}
          onSkip={() => setShowOnboarding(false)}
          storageKey="demo-onboarding"
        />
      )}
    </div>
  )
}
