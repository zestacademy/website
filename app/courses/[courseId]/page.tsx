
"use client"

import React, { useEffect, useState } from 'react'
import { Award, Bell, BookOpenCheck, Calendar, Clock3, ExternalLink, Loader2, Star, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../hooks/useAuth'
import { getCourseBySlug } from '../../../lib/courses'
import { enrollUserInCourse, isUserEnrolledInCourse, subscribeToCourseConfigs, subscribeToNotifications } from '../../../services/databaseService'

interface PageProps {
    params: Promise<{
        courseId: string
    }>
}

function CourseDetails({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const course = getCourseBySlug(params.courseId)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [enrollmentMessage, setEnrollmentMessage] = useState('')
  const [courseConfig, setCourseConfig] = useState<Record<string, any> | null>(null)
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false)
  const [isEnablingNotifications, setIsEnablingNotifications] = useState(false)

  useEffect(() => {
    let isMounted = true
    let unsubscribe: (() => void) | null = null

    const initializeData = async () => {
      // 1. Subscription to admin configs (start date, links)
      unsubscribe = subscribeToCourseConfigs((configs) => {
        if (isMounted) setCourseConfig(configs[params.courseId] || null)
      })

      if (!user?.uid || !course?.slug) {
        if (isMounted) setIsAlreadyEnrolled(false)
        return
      }

      try {
        const enrolled = await isUserEnrolledInCourse(user.uid, course.slug)
        if (isMounted) setIsAlreadyEnrolled(enrolled)
      } catch {
        if (isMounted) setIsAlreadyEnrolled(false)
      }
    }

    initializeData()

    return () => {
      isMounted = false
      if (unsubscribe) unsubscribe()
    }
  }, [user?.uid, course?.slug, params.courseId])

  const handleEnroll = async () => {
    if (!user || !course) {
      if (!user) {
        const courseSlug = course?.slug ?? ''
        router.push(`/login?redirect=${encodeURIComponent(`/courses/${courseSlug}`)}`)
      }
      return
    }

    if (isAlreadyEnrolled) {
      setEnrollmentMessage('You are already enrolled in this course.')
      return
    }

    setIsEnrolling(true)
    setEnrollmentMessage('')

    try {
      await enrollUserInCourse(user, course)
      setIsAlreadyEnrolled(true)
      setEnrollmentMessage('Enrollment successful! Please enable notifications below for class updates.')

      // Show notification prompt after short delay
      setTimeout(() => setShowNotificationPrompt(true), 800)
    } catch (error: any) {
      setEnrollmentMessage(error?.message ?? 'Unable to complete enrollment. Please try again.')
    } finally {
      setIsEnrolling(false)
    }
  }

  const handleEnableNotifications = async () => {
    setIsEnablingNotifications(true)
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        const dummySub = { endpoint: 'browser-native', timestamp: Date.now() }
        await subscribeToNotifications(user.uid, dummySub)
        setShowNotificationPrompt(false)
        setEnrollmentMessage('Success! You will receive live class updates here.')
      } else {
        setShowNotificationPrompt(false)
      }
    } catch (err) {
      console.error('Notification error:', err)
      setShowNotificationPrompt(false)
    } finally {
      setIsEnablingNotifications(false)
    }
  }

  if (!course) {
    return (
      <div className="section-shell py-20 text-center mx-auto max-w-xl">
        <h1 className="text-3xl font-bold dark:text-white">Course Not Found</h1>
        <p className="mt-4 text-ink/60 mb-8 dark:text-gray-400">The course you're looking for doesn't exist.</p>
        <a href="/courses" className="btn-primary">Back to Courses</a>
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-10 sm:space-y-14">
      <section className="section-shell">
        <div className="hero-panel grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-kicker">{course.category} Course</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl dark:text-gray-100">{course.title}</h1>
            <p className="mt-4 text-ink/70 dark:text-gray-300">{course.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink/75 dark:border-gray-700 dark:text-gray-300">
                <UserRound size={16} /> Instructor: {course.instructor}
              </p>
              <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink/75 dark:border-gray-700 dark:text-gray-300">
                <Clock3 size={16} /> Duration: {course.duration}
              </p>
              <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink/75 dark:border-gray-700 dark:text-gray-300">
                <Calendar size={16} /> Status: {courseConfig?.startDate ? `Starts ${courseConfig.startDate}` : 'Check dashboard for dates'}
              </p>
              <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink/75 dark:border-gray-700 dark:text-gray-300">
                <Award size={16} /> {course.certificateName}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {isAlreadyEnrolled ? (
                <>
                  <a href={`/courses/${course.slug}/learn`} className="btn-primary gap-2">
                    Enter Class Dashboard <ExternalLink size={16} />
                  </a>
                </>
              ) : (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                >
                  {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}
              <a href="/courses" className="btn-secondary">Back to Courses</a>
            </div>

            {enrollmentMessage && (
              <p className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink/75 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                {enrollmentMessage}
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-gray-700">
            <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <article className="surface-card">
          <h2 className="text-2xl font-semibold dark:text-gray-100">Learning Outcomes</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {course.learningOutcomes.map((item) => (
              <div key={item} className="inline-flex items-start gap-4 rounded-xl border border-slate-100 p-4 text-ink/80 dark:border-gray-700/50 dark:text-gray-300">
                <BookOpenCheck size={20} className="mt-0.5 shrink-0 text-primary dark:text-sky-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Notification Request Modal */}
      {showNotificationPrompt && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
           <article className="surface-card w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300 border-primary/20">
              <div className="mb-6 h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto dark:bg-sky-500/10">
                 <Bell className="text-primary dark:text-sky-400 animate-bounce" size={32} />
              </div>
              <h3 className="text-2xl font-black text-center dark:text-white">Don't Miss a Session!</h3>
              <p className="mt-3 text-center text-ink/60 dark:text-gray-400 leading-relaxed">
                Stay updated with the latest live class links and announcements. We'll send helpful alerts directly to your browser.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                 <button
                   onClick={handleEnableNotifications}
                   disabled={isEnablingNotifications}
                   className="btn-primary w-full py-4 text-base font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                 >
                   {isEnablingNotifications ? (
                     <Loader2 className="animate-spin" size={20} />
                   ) : (
                     <>Allow Notifications</>
                   )}
                 </button>
                 <button
                   onClick={() => setShowNotificationPrompt(false)}
                   className="py-3 text-sm font-bold text-ink/40 hover:text-ink/60 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                 >
                   Maybe later
                 </button>
              </div>
           </article>
        </div>
      )}
    </div>
  )
}

export default function CoursePage({ params }: PageProps) {
  const resolvedParams = React.use(params)
  return (
    <CourseDetails params={{ courseId: resolvedParams.courseId }} />
  )
}
