"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/home/HeroSection";
import { ExploreSection } from "@/components/home/ExploreSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { OnboardingFlow } from "@/components/ui/onboarding-flow"
import { Button } from "@/components/ui/button"
import { BookOpen, Trophy, Target, Rocket } from "lucide-react"

import { useUserEnrollments } from "@/lib/hooks/useUserEnrollments"

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { user, loading } = useUserEnrollments()

  // Trigger spotlight after a delay
  useEffect(() => {
    // Check if we should show onboarding (could be handled inside component, but strictly here for demo)
    // Actually OnboardingFlow handles its own storage key check usually if specific prop is set, 
    // but looking at usage in page.tsx, it seems the parent controls visibility.
    // However, the demo passed `storageKey`, implying the component MIGHT check it.
    // Let's blindly set it to true and let the component logic (if any) or user interaction handle it.
    // Or better: Use a simple effect.
    if (user && !loading) {
      setShowOnboarding(true)
    }
  }, [user, loading])

  const onboardingSteps = [
    {
      title: "Welcome to Zest Academy!",
      description: "Your journey to mastering engineering fundamentals starts here",
      icon: <BookOpen className="h-10 w-10 text-primary" />
    },
    {
      title: "Track Your Progress",
      description: "Monitor your learning with detailed analytics and achievements",
      icon: <Target className="h-10 w-10 text-primary" />
    },
    {
      title: "Earn Rewards",
      description: "Complete courses and earn XP, badges, and certificates",
      icon: <Trophy className="h-10 w-10 text-primary" />
    },
    {
      title: "Ready to Start?",
      description: "Let's begin your learning adventure!",
      icon: <Rocket className="h-10 w-10 text-primary" />
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ExploreSection />
      <RoadmapSection />
      <HowItWorksSection />
      <CategoriesSection />
      <CoursesSection />

      {!loading && user && (
        <OnboardingFlow
          steps={onboardingSteps}
          onComplete={() => setShowOnboarding(false)}
          onSkip={() => setShowOnboarding(false)}
          storageKey="zest-onboarding-v1"
        />
      )}
    </div>
  );
}
