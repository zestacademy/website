"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  HelpCircle,
  Video,
  FileText,
  BookmarkCheck,
  Zap,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  getCourseById, 
  getCourseChapters, 
  getChapterLessons, 
  getStudentEnrollment, 
  enrollStudentInCourse 
} from "@/services/lmsService"
import { LmsCourse, LmsChapter, LmsLesson, LmsEnrollment } from "@/types/lms"

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const courseId = resolvedParams.courseId

  const [course, setCourse] = useState<LmsCourse | null>(null)
  const [chapters, setChapters] = useState<LmsChapter[]>([])
  const [lessonsMap, setLessonsMap] = useState<Record<string, LmsLesson[]>>({})
  const [enrollment, setEnrollment] = useState<LmsEnrollment | null>(null)
  
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // 1. Auth check
    import("@/lib/firebase").then(({ auth }) => {
      if (auth) {
        auth.onAuthStateChanged((currentUser) => {
          setUser(currentUser)
        })
      }
    })

    // 2. Load Course Syllabus Details
    async function loadCourseDetails() {
      try {
        const c = await getCourseById(courseId)
        if (!c) {
          setLoading(false)
          return
        }
        setCourse(c)

        const chaps = await getCourseChapters(courseId)
        setChapters(chaps)

        // Initialize first chapter as open
        if (chaps.length > 0) {
          setOpenChapters({ [chaps[0].id]: true })
        }

        // Fetch lessons for each chapter
        const lessonsData: Record<string, LmsLesson[]> = {}
        for (const ch of chaps) {
          const les = await getChapterLessons(ch.id)
          lessonsData[ch.id] = les
        }
        setLessonsMap(lessonsData)

        // Check student enrollment
        import("@/lib/firebase").then(async ({ auth }) => {
          if (auth && auth.currentUser) {
            const enroll = await getStudentEnrollment(auth.currentUser.uid, courseId)
            setEnrollment(enroll)
          }
        })
      } catch (err) {
        console.error("Error loading course syllabus detail:", err)
      } finally {
        setLoading(false)
      }
    }
    loadCourseDetails()
  }, [courseId, user?.uid])

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${courseId}`)
      return
    }
    
    setEnrolling(true)
    try {
      const enroll = await enrollStudentInCourse(user.uid, courseId)
      setEnrollment(enroll)
      router.push(`/courses/${courseId}/learn`)
    } catch (err) {
      console.error("Enrollment failed:", err)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm font-medium animate-pulse">Loading syllabus and credentials...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container max-w-md mx-auto py-20 text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Pathway Not Found</h2>
        <p className="text-muted-foreground text-sm mb-6">
          The requested course pathway could not be found. It may have been retired or moved to a different syllabus track.
        </p>
        <Link href="/courses">
          <Button className="font-semibold shadow-sm">Back To Catalog</Button>
        </Link>
      </div>
    )
  }

  const levelColors: Record<string, string> = {
    beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20"
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 animate-fadeIn">
      {/* Course Detail Hero Header */}
      <section className="relative py-12 md:py-16 border-b border-border bg-gradient-to-br from-indigo-950/20 via-background to-slate-900/10">
        <div className="container max-w-6xl mx-auto px-4">
          <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Course Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-5">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge className={`border px-3 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm ${levelColors[course.level]}`}>
                  {course.level}
                </Badge>
                {course.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/40">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground font-semibold">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>Syllabus Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>Rating: {course.rating || 4.7}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>Modules: {chapters.length} Chapters</span>
                </div>
              </div>
            </div>

            {/* Premium CTA Card widget */}
            <Card className="bg-card/50 border border-border backdrop-blur-md rounded-3xl overflow-hidden shadow-lg p-6 lg:mt-6 space-y-6">
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-muted border border-border/40 shadow-inner">
                {course.thumbnailUrl ? (
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                    <PlayCircle className="h-10 w-10 animate-pulse" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {enrollment ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                        <span>Pathway Progress</span>
                        <span className="text-sky-400">{enrollment.progressPercentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/40">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-500 rounded-full"
                          style={{ width: `${enrollment.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                    
                    <Link href={`/courses/${courseId}/learn`} className="block w-full">
                      <Button className="w-full h-11 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold tracking-wide shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-indigo-700 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                        Resume Learning
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full h-11 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold tracking-wide shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-indigo-700 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                  >
                    {enrolling ? (
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Zap className="h-4 w-4 shrink-0 fill-white" />
                        Enroll in Pathway
                      </>
                    )}
                  </Button>
                )}

                <div className="text-[10px] text-muted-foreground text-center font-medium leading-relaxed">
                  Academic pathways are 100% free. Gain verifiable certificates upon completing all requirements.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main syllabus and Overview Content */}
      <section className="container max-w-6xl mx-auto px-4 mt-12">
        <Tabs defaultValue="syllabus" className="w-full">
          <TabsList className="bg-muted/40 border border-border p-1 rounded-xl mb-8">
            <TabsTrigger value="syllabus" className="rounded-lg text-xs font-bold uppercase tracking-wider py-2 px-5">
              Syllabus Outline
            </TabsTrigger>
            <TabsTrigger value="overview" className="rounded-lg text-xs font-bold uppercase tracking-wider py-2 px-5">
              Course Overview
            </TabsTrigger>
          </TabsList>

          {/* Syllabus Section */}
          <TabsContent value="syllabus" className="space-y-6">
            <div className="border border-border/80 bg-card/20 rounded-3xl overflow-hidden p-6 space-y-4">
              <h3 className="font-extrabold text-lg flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Curriculum Structure
              </h3>
              
              {chapters.length === 0 ? (
                <p className="text-muted-foreground text-xs italic">The curriculum structure is being refined. Check back shortly.</p>
              ) : (
                <div className="space-y-4">
                  {chapters.map((ch, idx) => {
                    const isOpen = !!openChapters[ch.id]
                    const lessons = lessonsMap[ch.id] || []

                    return (
                      <div key={ch.id} className="border border-border bg-card/30 rounded-2xl overflow-hidden transition-all duration-300">
                        {/* Chapter Header bar */}
                        <button
                          onClick={() => toggleChapter(ch.id)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <span className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-extrabold text-sm text-primary shrink-0">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="font-bold text-sm md:text-base text-foreground leading-tight">
                                {ch.title}
                              </h4>
                              {ch.description && (
                                <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                                  {ch.description}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground shrink-0 ml-4">
                            <span className="text-[10px] font-bold bg-muted/60 px-2 py-0.5 rounded-md border border-border/40">
                              {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
                            </span>
                            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </div>
                        </button>

                        {/* Chapter Lessons List */}
                        {isOpen && (
                          <div className="px-5 pb-4 border-t border-border/50 bg-background/20 divide-y divide-border/60">
                            {lessons.length === 0 ? (
                              <p className="text-muted-foreground text-xs italic py-3 pl-12">No lessons assigned yet.</p>
                            ) : (
                              lessons.map((les, lidx) => {
                                const isCompleted = enrollment?.completedLessons?.includes(les.id)

                                return (
                                  <div key={les.id} className="flex items-center justify-between py-3.5 pl-2 md:pl-12 group">
                                    <div className="flex items-center gap-3">
                                      {les.contentType === "video" && <Video className="h-4 w-4 text-sky-400 shrink-0" />}
                                      {les.contentType === "text" && <FileText className="h-4 w-4 text-indigo-400 shrink-0" />}
                                      {les.contentType === "quiz" && <HelpCircle className="h-4 w-4 text-amber-500 shrink-0" />}
                                      
                                      <span className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {les.title}
                                      </span>
                                    </div>

                                    {isCompleted ? (
                                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                                    ) : (
                                      <Badge variant="outline" className="text-[9px] uppercase tracking-wider font-bold rounded-md bg-muted/20 border-border/40 py-0.5">
                                        {les.contentType}
                                      </Badge>
                                    )}
                                  </div>
                                )
                              })
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Overview Section */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6 border border-border bg-card/20 rounded-3xl p-6">
                <div>
                  <h3 className="font-extrabold text-base mb-2">Pathway Objective</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    This program has been engineered in alignment with current hardware development and software engineering demands. We bypass standard high-level abstractions, forcing you to engage with core logic, registers, and system paradigms directly to foster authentic technical intuition.
                  </p>
                </div>

                <div>
                  <h3 className="font-extrabold text-base mb-2">Prerequisites</h3>
                  <ul className="list-disc list-inside text-muted-foreground text-xs md:text-sm leading-relaxed space-y-1.5">
                    <li>Basic literacy in programming logics (variables, conditional structures, loops).</li>
                    <li>Strong curiosity about hardware architectures and how computations interact with registers.</li>
                    <li>No complex electronics certifications required; we bootstrap you from zero.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-extrabold text-base mb-2">Target Audience</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    Designed for aspiring embedded engineers, machine learning developers seeking to optimize RAG architectures, and computer engineering students looking for practical register-level laboratory experience.
                  </p>
                </div>
              </div>

              {/* Sidebar Checklist */}
              <div className="space-y-6 border border-border bg-card/20 rounded-3xl p-6">
                <h3 className="font-extrabold text-base mb-2 flex items-center gap-1.5">
                  <BookmarkCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                  What You Get
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-start text-xs">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Verifiable Certificate</h4>
                      <p className="text-muted-foreground text-[10px] leading-relaxed mt-0.5">Secure, shareable online record confirming completion of all syllabus chapters.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start text-xs">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Register Laboratory Assignments</h4>
                      <p className="text-muted-foreground text-[10px] leading-relaxed mt-0.5">Gain confidence writing real memory and firmware operations.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start text-xs">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Lifetime Support Portal</h4>
                      <p className="text-muted-foreground text-[10px] leading-relaxed mt-0.5">Discuss questions inside the tech community with professional mentors.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
