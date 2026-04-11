
"use client"

import React, { useEffect, useState, use } from 'react'
import { Calendar, CheckCircle, ExternalLink, Loader2, MessageSquare, PlayCircle, Star, Video, X, Check, BookOpen, Layers, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../../hooks/useAuth'
import { LMSService } from '../../../../services/lms-service'
import { Course, Enrollment } from '../../../../types/lms'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    courseId: string
  }>
}

function LearnCourse({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [liveSessions, setLiveSessions] = useState<any[]>([])

  useEffect(() => {
    let isMounted = true

    const initializeDashboard = async () => {
      if (!user?.uid) return
      setIsLoading(true)
      try {
        const fetchedCourse = await LMSService.getCourseById(params.courseId)
        if (isMounted) setCourse(fetchedCourse)

        if (!fetchedCourse) {
          setIsLoading(false)
          return
        }

        const userEnrollment = await LMSService.getEnrollment(user.uid, params.courseId)
        if (isMounted) setEnrollment(userEnrollment)

        const sessions = await LMSService.getLiveSessionsByCourse(params.courseId)
        if (isMounted) setLiveSessions(sessions)
      } catch (err: any) {
        console.error("Failed to load course state:", err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    initializeDashboard()

    return () => {
      isMounted = false
    }
  }, [user?.uid, params.courseId])

  if (isLoading) {
    return (
      <div className="section-shell py-16 flex items-center justify-center gap-3 text-ink/60 dark:text-gray-400">
        <Loader2 size={24} className="animate-spin text-primary" /> Syncing Dashboard...
      </div>
    )
  }

  if (!course) return (
    <div className="section-shell py-20 text-center mx-auto max-w-xl">
      <h1 className="text-3xl font-bold dark:text-white">Course Not Found</h1>
      <p className="mt-4 text-ink/60 mb-8 dark:text-gray-400">The course you're looking for doesn't exist.</p>
      <a href="/courses" className="btn-primary">Back to Courses</a>
    </div>
  )

  if (!enrollment) {
    return (
      <div className="section-shell py-20 text-center mx-auto max-w-xl">
        <h1 className="text-3xl font-bold dark:text-white">Access Denied</h1>
        <p className="mt-4 text-ink/60 mb-8 dark:text-gray-400">Enroll in this course to access the dashboard.</p>
        <Link href={`/courses/${course.id}`} className="btn-primary">Return to Course Page</Link>
      </div>
    )
  }

  const handleClaimCertificate = async () => {
    if (!user || !course || !enrollment || progress < 75) return
    setIsLoading(true)
    try {
      const certificateId = await LMSService.issueCertificate(enrollment.id, {
        userId: user.uid,
        userName: user.displayName || user.email || 'Student',
        courseId: course.id,
        courseTitle: course.title,
        courseStartDate: enrollment.enrolledAt ? new Date((enrollment.enrolledAt as any).seconds * 1000).toISOString() : undefined,
        courseEndDate: new Date().toISOString()
      })
      if (certificateId) {
        alert("Certificate issued successfully! You can view it in your profile.")
        const updatedEnrollment = await LMSService.getEnrollment(user.uid, course.id)
        setEnrollment(updatedEnrollment)
      }
    } catch (err) {
      console.error("Error claiming certificate:", err)
      alert("Failed to issue certificate. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const progress = enrollment.progress?.attendancePercentage || 0;
  const completedCount = enrollment.progress?.completedLessons?.length || 0;
  const totalLessons = course.modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0);

  return (
    <div className="space-y-10 pb-20">
      <section className="section-shell">
        <div className="hero-panel grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <p className="section-kicker">Course Dashboard</p>
            <h1 className="mt-4 text-4xl font-extrabold dark:text-white">{course.title}</h1>
            <p className="mt-3 text-ink/60 dark:text-gray-400">Continue your learning journey and track your progress.</p>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Course Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{completedCount} of {totalLessons} lessons completed</span>
                {progress >= 75 && <Badge className="bg-green-500"><Trophy className="h-3 w-3 mr-1" /> Eligible for Certificate</Badge>}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-shell grid gap-8 lg:grid-cols-3">
        {/* Curriculum */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                <BookOpen size={24} className="text-primary" /> Course Curriculum
            </h2>
            <div className="space-y-4">
                {course.modules.map((module, mIdx) => (
                    <Card key={module.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/30 py-4">
                            <CardTitle className="text-lg flex items-center gap-3">
                                <span className="text-primary/40 font-normal">M{mIdx + 1}</span>
                                {module.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                {module.lessons.map((lesson) => {
                                    const isCompleted = enrollment.progress?.completedLessons?.includes(lesson.id);
                                    return (
                                        <Link 
                                            key={lesson.id} 
                                            href={`/courses/${course.id}/learn/${lesson.id}`}
                                            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                {isCompleted ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500 fill-green-500/10" />
                                                ) : (
                                                    <PlayCircle className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors" />
                                                )}
                                                <span className={`text-sm font-medium ${isCompleted ? "text-muted-foreground" : ""}`}>
                                                    {lesson.title}
                                                </span>
                                            </div>
                                            {lesson.isFree && <Badge variant="outline" className="text-[10px]">Preview</Badge>}
                                        </Link>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {/* Live Sessions & Info */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                <Video size={24} className="text-primary" /> Live Sessions
            </h2>
            {liveSessions.length === 0 ? (
                <div className="surface-card bg-slate-50/50 border-dashed dark:bg-gray-900/40 py-12 flex flex-col items-center justify-center text-center">
                <Video size={40} className="text-ink/10 dark:text-gray-600 mb-4" />
                <p className="text-sm text-ink/40 dark:text-gray-500 font-medium px-4">No live sessions scheduled yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {liveSessions.map((cls) => (
                        <Card key={cls.id} className="hover:border-primary/30 transition-all">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-sm">{cls.title}</h3>
                                    <Badge variant={cls.status === 'active' ? "destructive" : "secondary"} className="text-[9px] h-5">
                                        {cls.status === 'active' ? 'Live' : 'Past'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{cls.description}</p>
                                <div className="flex gap-2">
                                    {cls.status === 'active' && (
                                        <a href={cls.meetingLink} target="_blank" rel="noopener noreferrer" className="btn-primary py-1.5 px-3 text-[10px] flex-1 text-center">
                                            Join Now
                                        </a>
                                    )}
                                    {cls.recordedVideoUrl && (
                                        <a href={cls.recordedVideoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary py-1.5 px-3 text-[10px] flex-1 text-center">
                                            Watch Recording
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                <Trophy size={24} className="text-primary" /> Certification
            </h2>
            <Card className={progress >= 75 ? "bg-green-500/5 border-green-500/20" : ""}>
                <CardContent className="p-6 text-center space-y-4">
                    <Trophy className={`h-12 w-12 mx-auto ${progress >= 75 ? "text-green-500" : "text-muted-foreground/30"}`} />
                    <div>
                        <h3 className="font-bold">Course Certificate</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            Complete all lessons and achieve at least 75% attendance to unlock your certificate.
                        </p>
                    </div>
                    <Button 
                        variant={progress >= 75 ? "default" : "outline"} 
                        disabled={progress < 75 || isLoading} 
                        className="w-full"
                        onClick={handleClaimCertificate}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {progress >= 75 ? "Claim Certificate" : `Need ${75 - progress}% more`}
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function LearnPage({ params }: PageProps) {
  const resolvedParams = React.use(params)
  return (
    <LearnCourse params={{ courseId: resolvedParams.courseId }} />
  )
}
