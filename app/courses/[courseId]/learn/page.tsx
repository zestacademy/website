
"use client"

import React, { useEffect, useState } from 'react'
import { Calendar, CheckCircle, ExternalLink, Loader2, MessageSquare, PlayCircle, Star, Video, X, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../../hooks/useAuth'
import { getCourseBySlug } from '../../../../lib/courses'
import {
  getUserCourseLearningState,
  subscribeToLiveClasses,
  submitClassFeedback
} from '../../../../services/databaseService'

interface PageProps {
    params: Promise<{
        courseId: string
    }>
}

function LearnCourse({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const course = getCourseBySlug(params.courseId)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [learningState, setLearningState] = useState({ isEnrolled: false })
  const [liveSessions, setLiveSessions] = useState<any[]>([])

  // Feedback state
  const [feedbackTarget, setFeedbackTarget] = useState<any>(null)
  const [feedbackForm, setFeedbackForm] = useState({ rating: 5, comment: '' })
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)

  useEffect(() => {
    let isMounted = true
    let unsubscribeClasses: (() => void) | null = null

    const initializeDashboard = async () => {
      if (!user?.uid || !course?.slug) return
      setIsLoading(true)
      try {
        const prog = await getUserCourseLearningState(user.uid, course)
        if (isMounted) setLearningState(prog)

        // Start live class subscription
        unsubscribeClasses = subscribeToLiveClasses(course.slug, (sessions) => {
          if (isMounted) setLiveSessions(sessions)
          setIsLoading(false) // Ready once sessions load
        })
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message ?? 'Failed to load course state.')
          setIsLoading(false)
        }
      }
    }

    initializeDashboard()

    return () => {
      isMounted = false
      if (unsubscribeClasses) unsubscribeClasses()
    }
  }, [user?.uid, course])

  const handleFeedbackSubmit = async (e: any) => {
    e.preventDefault()
    if (!feedbackTarget || !user || !course) return
    setIsSubmittingFeedback(true)
    try {
      await submitClassFeedback({
        userId: user.uid,
        userName: user.displayName || 'Anonymous Student',
        courseSlug: course.slug,
        classId: feedbackTarget.id,
        rating: feedbackForm.rating,
        comment: feedbackForm.comment
      })
      alert('Thank you for your feedback!')
      setFeedbackTarget(null)
      setFeedbackForm({ rating: 5, comment: '' })
    } catch (err: any) {
      alert('Error submitting feedback: ' + err.message)
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  if (!course) return (
    <div className="section-shell py-20 text-center mx-auto max-w-xl">
      <h1 className="text-3xl font-bold dark:text-white">Course Not Found</h1>
      <p className="mt-4 text-ink/60 mb-8 dark:text-gray-400">The course you're looking for doesn't exist.</p>
      <a href="/courses" className="btn-primary">Back to Courses</a>
    </div>
  )

  if (isLoading) {
    return (
      <div className="section-shell py-16 flex items-center justify-center gap-3 text-ink/60 dark:text-gray-400">
        <Loader2 size={24} className="animate-spin text-primary" /> Syncing Dashboard...
      </div>
    )
  }

  if (!learningState.isEnrolled) {
    return (
      <div className="section-shell py-20 text-center mx-auto max-w-xl">
        <h1 className="text-3xl font-bold dark:text-white">Access Denied</h1>
        <p className="mt-4 text-ink/60 mb-8 dark:text-gray-400">Enroll in this course to join live sessions.</p>
        <a href={`/courses/${course.slug}`} className="btn-primary">Return to Course Page</a>
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-20">
      <section className="section-shell">
        <div className="hero-panel">
          <p className="section-kicker">Course Dashboard</p>
          <h1 className="mt-4 text-4xl font-extrabold dark:text-white">{course.title}</h1>
          <p className="mt-3 text-ink/60 dark:text-gray-400">Real-time updates for schedules, sessions, and live classes.</p>
        </div>
      </section>

      <section className="section-shell grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <Video size={24} className="text-primary" /> Class Timeline
          </h2>
          {liveSessions.length === 0 ? (
            <div className="surface-card bg-slate-50/50 border-dashed dark:bg-gray-900/40 py-16 flex flex-col items-center justify-center text-center">
               <Video size={48} className="text-ink/10 dark:text-gray-600 mb-4" />
               <p className="text-sm text-ink/40 dark:text-gray-500 font-medium max-w-[280px]">No live sessions added yet. They will appear here instantly when published!</p>
            </div>
          ) : (
            <div className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-20px)] before:w-0.5 before:bg-slate-200 dark:before:bg-gray-800">
               {liveSessions.map((cls, idx) => (
                 <div key={cls.id} className="relative mb-10 last:mb-0 animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${idx * 100}ms` }}>
                    {/* Dot */}
                    <div className={`absolute -left-[27px] top-1.5 z-10 h-4 w-4 rounded-full border-4 border-white dark:border-gray-900 shadow-sm transition-colors ${cls.recordedLink ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`} />

                    <article className="surface-card p-5 group hover:border-primary/30 transition-all dark:bg-gray-900/40">
                       <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                             <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="font-bold text-lg dark:text-gray-100">{cls.title}</h3>
                                <span className={`text-[9px] uppercase font-black px-2.5 py-1 rounded-full tracking-wider shadow-sm ${cls.status === 'active' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 animate-pulse' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30'}`}>
                                   {cls.status === 'active' ? 'Live Now' : 'Completed'}
                                </span>
                             </div>
                             <p className="text-sm text-ink/60 dark:text-gray-400 mt-1 leading-relaxed line-clamp-3">{cls.description}</p>
                          </div>
                       </div>

                       <div className="mt-8 flex flex-wrap items-center gap-4">
                          {cls.status === 'active' && (
                            <a href={cls.classLink} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                               Join Session <ExternalLink size={14} />
                            </a>
                          )}
                          {cls.recordedLink && (
                            <a href={cls.recordedLink} target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 py-2.5 text-xs font-bold flex items-center gap-2 dark:bg-gray-800 hover:border-primary/50 hover:bg-slate-50 transition-all">
                               Play Recording <PlayCircle size={15} />
                            </a>
                          )}
                          <button
                            onClick={() => {
                              setFeedbackTarget(cls)
                              setFeedbackForm({ rating: 5, comment: '' })
                            }}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ink/30 hover:text-primary transition-all ml-auto hover:bg-primary/5 px-2 py-1 rounded-lg"
                          >
                            <MessageSquare size={13} /> Class Feedback
                          </button>
                       </div>
                    </article>
                 </div>
               ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
           <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2 text-primary">
              <Calendar size={24} /> Learning Guidance
           </h2>
           <div className="surface-card border-emerald-500/20 bg-emerald-500/5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400">Class Highlights</h3>
              <p className="mt-2 text-sm text-ink/70 dark:text-gray-400 leading-relaxed">
                 Focused on practical learning with hands-on projects. Access provided only to enrolled students.
              </p>
           </div>
        </div>
      </section>

      {/* Feedback Modal */}
      {feedbackTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
           <div className="surface-card w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border-none dark:bg-gray-900">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h3 className="text-2xl font-bold dark:text-gray-100">Review Lesson</h3>
                    <p className="text-xs text-ink/40 dark:text-gray-400 mt-1 uppercase tracking-widest font-bold">{feedbackTarget.title}</p>
                 </div>
                 <button onClick={() => setFeedbackTarget(null)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                    <X size={20} className="text-ink/30" />
                 </button>
              </div>

              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                 <div>
                    <label className="text-[10px] uppercase font-black text-ink/40 dark:text-gray-500 tracking-widest mb-3 block">Overall Rating</label>
                    <div className="flex gap-3">
                       {[1, 2, 3, 4, 5].map(val => (
                         <button key={val} type="button" onClick={() => setFeedbackForm(p => ({ ...p, rating: val }))} className={`h-14 w-14 rounded-2xl flex items-center justify-center border-2 transition-all group active:scale-90 ${feedbackForm.rating >= val ? 'bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/40' : 'bg-slate-50 text-slate-300 border-slate-100 dark:bg-gray-800 dark:border-gray-700'}`}>
                           <Star size={24} className={`${feedbackForm.rating >= val ? 'fill-amber-500 group-hover:scale-110 transition-transform' : ''}`} />
                         </button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] uppercase font-black text-ink/40 dark:text-gray-500 tracking-widest mb-3 block">Share your thoughts</label>
                    <textarea rows={4} placeholder="What did you learn? Any questions?" className="input-clean min-h-[120px] resize-none" value={feedbackForm.comment} onChange={e => setFeedbackForm(p => ({ ...p, comment: e.target.value }))} required />
                 </div>

                 <div className="flex gap-4 pt-4 border-t dark:border-gray-800">
                    <button type="button" onClick={() => setFeedbackTarget(null)} className="btn-secondary h-12 flex-1 rounded-2xl font-bold">Cancel</button>
                    <button type="submit" disabled={isSubmittingFeedback || !feedbackForm.comment} className="btn-primary h-12 flex-1 rounded-2xl font-bold shadow-xl shadow-primary/20 disabled:opacity-50 disabled:grayscale transition-all">
                       {isSubmittingFeedback ? <Loader2 size={18} className="animate-spin" /> : 'Send Feedback'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  )
}

export default function LearnPage({ params }: PageProps) {
  const resolvedParams = React.use(params)
  return (
    <LearnCourse params={{ courseId: resolvedParams.courseId }} />
  )
}
