"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Menu, 
  ChevronRight, 
  ChevronLeft, 
  Video, 
  FileText, 
  HelpCircle, 
  CheckCircle,
  Circle,
  PlayCircle,
  Trophy,
  ArrowRight,
  BookOpen,
  Award,
  Sparkles,
  Lock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  getCourseById, 
  getCourseChapters, 
  getChapterLessons, 
  getStudentEnrollment, 
  updateLessonCompletion 
} from "@/services/lmsService"
import { LmsCourse, LmsChapter, LmsLesson, LmsEnrollment } from "@/types/lms"

export default function CourseLearnPlayer({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const courseId = resolvedParams.courseId

  const [course, setCourse] = useState<LmsCourse | null>(null)
  const [chapters, setChapters] = useState<LmsChapter[]>([])
  const [lessonsMap, setLessonsMap] = useState<Record<string, LmsLesson[]>>({})
  const [enrollment, setEnrollment] = useState<LmsEnrollment | null>(null)
  const [currentLesson, setCurrentLesson] = useState<LmsLesson | null>(null)
  
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<any | null>(null)
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({})

  // Quiz assessment states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  useEffect(() => {
    // 1. Authenticate check
    import("@/lib/firebase").then(({ auth }) => {
      if (auth) {
        auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            setUser(currentUser)
          } else {
            // Require login
            router.push(`/login?redirect=/courses/${courseId}/learn`)
          }
        })
      }
    })

    // 2. Load Pathway Curriculum
    async function loadCurriculum() {
      try {
        const c = await getCourseById(courseId)
        if (!c) {
          setLoading(false)
          return
        }
        setCourse(c)

        const chaps = await getCourseChapters(courseId)
        setChapters(chaps)

        const lessonsData: Record<string, LmsLesson[]> = {}
        let firstAvailableLesson: LmsLesson | null = null

        for (const ch of chaps) {
          const les = await getChapterLessons(ch.id)
          lessonsData[ch.id] = les
          if (!firstAvailableLesson && les.length > 0) {
            firstAvailableLesson = les[0]
          }
        }
        setLessonsMap(lessonsData)
        setCurrentLesson(firstAvailableLesson)

        // Fetch Enrollment tracking
        import("@/lib/firebase").then(async ({ auth }) => {
          if (auth && auth.currentUser) {
            const enroll = await getStudentEnrollment(auth.currentUser.uid, courseId)
            setEnrollment(enroll)
          }
        })
      } catch (err) {
        console.error("Failed to load learn curriculum:", err)
      } finally {
        setLoading(false)
      }
    }
    loadCurriculum()
  }, [courseId, router])

  const selectLesson = (lesson: LmsLesson) => {
    setCurrentLesson(lesson)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    // On mobile, automatically collapse sidebar on selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const toggleChapterCollapse = (chapterId: string) => {
    setCollapsedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  const handleToggleCompletion = async (lessonId: string, currentStatus: boolean) => {
    if (!user) return
    try {
      const updatedEnroll = await updateLessonCompletion(
        user.uid,
        courseId,
        lessonId,
        !currentStatus
      )
      setEnrollment(updatedEnroll)
    } catch (err) {
      console.error("Failed to update completion:", err)
    }
  }

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  const handleSubmitQuiz = () => {
    if (!currentLesson?.quizQuestions) return
    let score = 0
    currentLesson.quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        score++
      }
    })
    setQuizScore(score)
    setQuizSubmitted(true)

    // Automatically mark quiz lesson as completed upon review
    if (score === currentLesson.quizQuestions.length) {
      handleToggleCompletion(currentLesson.id, false)
    }
  }

  const getOrderedLessons = (): LmsLesson[] => {
    const list: LmsLesson[] = []
    chapters.forEach(ch => {
      const les = lessonsMap[ch.id] || []
      list.push(...les)
    })
    return list
  }

  const handleNextLesson = () => {
    const all = getOrderedLessons()
    if (!currentLesson) return
    const idx = all.findIndex(l => l.id === currentLesson.id)
    if (idx >= 0 && idx < all.length - 1) {
      selectLesson(all[idx + 1])
    }
  }

  const handlePrevLesson = () => {
    const all = getOrderedLessons()
    if (!currentLesson) return
    const idx = all.findIndex(l => l.id === currentLesson.id)
    if (idx > 0) {
      selectLesson(all[idx - 1])
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm font-medium animate-pulse">Initializing academic workspace...</p>
      </div>
    )
  }

  if (!course || !currentLesson) {
    return (
      <div className="container max-w-md mx-auto py-20 text-center px-4">
        <Lock className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Please complete your enrollment to access the active learning workspace.
        </p>
        <Link href={`/courses/${courseId}`}>
          <Button className="font-semibold shadow-sm">View Syllabus Details</Button>
        </Link>
      </div>
    )
  }

  const allLessons = getOrderedLessons()
  const currentIdx = allLessons.findIndex(l => l.id === currentLesson.id)
  const isFirstLesson = currentIdx === 0
  const isLastLesson = currentIdx === allLessons.length - 1
  const isLessonCompleted = !!enrollment?.completedLessons?.includes(currentLesson.id)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Dynamic Player Top Header */}
      <header className="h-14 border-b border-border bg-card/40 backdrop-blur-md px-4 flex items-center justify-between shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href={`/courses/${courseId}`} className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 shrink-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit Player</span>
          </Link>
          
          <div className="h-4 w-[1px] bg-border hidden sm:block shrink-0" />
          <h2 className="font-extrabold text-sm truncate max-w-[200px] sm:max-w-xs md:max-w-md leading-none">
            {course.title}
          </h2>
        </div>

        {/* Global Progress telemetry */}
        {enrollment && (
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider leading-none">Pathway progress</span>
              <span className="text-xs font-extrabold leading-none text-sky-400">{enrollment.progressPercentage}% Complete</span>
            </div>
            
            <div className="w-20 sm:w-28 h-2.5 bg-muted rounded-full overflow-hidden border border-border/40 shrink-0">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${enrollment.progressPercentage}%` }}
              />
            </div>

            {enrollment.progressPercentage >= 100 && (
              <Badge variant="outline" className="hidden lg:inline-flex bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1 rounded-full text-[10px] font-bold px-2 py-0.5 animate-bounce">
                <Trophy className="h-3 w-3" />
                Certified
              </Badge>
            )}
          </div>
        )}
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left collapsable syllabus sidebar */}
        {sidebarOpen && (
          <aside className="w-80 border-r border-border bg-card/10 backdrop-blur-md shrink-0 flex flex-col overflow-y-auto absolute md:relative inset-y-0 left-0 z-30 shadow-2xl md:shadow-none bg-background md:bg-transparent">
            <div className="p-4 border-b border-border/80 flex items-center justify-between shrink-0">
              <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Pathway modules</span>
              <Badge variant="outline" className="text-[9px] font-bold rounded bg-muted/40">{allLessons.length} units</Badge>
            </div>

            <nav className="flex-1 p-2 space-y-4">
              {chapters.map((ch, idx) => {
                const isCollapsed = !!collapsedChapters[ch.id]
                const lessons = lessonsMap[ch.id] || []

                return (
                  <div key={ch.id} className="space-y-1.5">
                    {/* Chapter Header row */}
                    <button
                      onClick={() => toggleChapterCollapse(ch.id)}
                      className="w-full px-3 py-2.5 rounded-xl hover:bg-muted/30 transition-colors flex items-start justify-between text-left group"
                    >
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded h-fit shrink-0">
                          Ch.{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold leading-tight group-hover:text-primary transition-colors text-foreground">
                            {ch.title}
                          </h4>
                        </div>
                      </div>
                      <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5 transition-transform ${isCollapsed ? "" : "rotate-90"}`} />
                    </button>

                    {/* Lessons list */}
                    {!isCollapsed && (
                      <div className="pl-6 space-y-1">
                        {lessons.map((les) => {
                          const isActive = currentLesson.id === les.id
                          const isCompleted = !!enrollment?.completedLessons?.includes(les.id)

                          return (
                            <button
                              key={les.id}
                              onClick={() => selectLesson(les)}
                              className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-all group ${
                                isActive
                                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                {les.contentType === "video" && <Video className="h-3.5 w-3.5 text-sky-400 shrink-0" />}
                                {les.contentType === "text" && <FileText className="h-3.5 w-3.5 text-indigo-400 shrink-0" />}
                                {les.contentType === "quiz" && <HelpCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                                <span className="truncate">{les.title}</span>
                              </div>

                              {isCompleted ? (
                                <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 ml-2" />
                              ) : (
                                <Circle className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0 ml-2 group-hover:text-muted-foreground/60 transition-colors" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </aside>
        )}

        {/* Content Viewer Main Panel */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-background/20 relative">
          <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
            {/* Completion Success banner */}
            {enrollment && enrollment.progressPercentage >= 100 && (
              <Card className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:text-emerald-400 rounded-3xl p-6 mb-8 relative overflow-hidden group shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                <div className="flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 animate-bounce">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold flex items-center gap-1.5">
                      Congratulations! Pathway Completed
                      <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                    </h3>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed max-w-md">
                      You have met all curriculum syllabus milestones. Your verifiable student certificate has been generated successfully.
                    </p>
                  </div>
                </div>
                
                <Link href={`/certificates/${user?.uid}_${courseId}`} className="shrink-0">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide shadow-sm flex items-center gap-2 rounded-xl h-10 px-4">
                    Claim Certificate
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            )}

            <div className="space-y-6">
              {/* Module Path Details */}
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                <span>Pathway learn player</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">{currentLesson.title}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                  {currentLesson.title}
                </h1>
                
                {/* Complete lesson button controller */}
                <Button
                  variant={isLessonCompleted ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleToggleCompletion(currentLesson.id, isLessonCompleted)}
                  className={`h-9 font-bold text-xs tracking-wide rounded-xl px-4 shrink-0 flex items-center gap-2 border border-border shadow-sm ${
                    isLessonCompleted 
                      ? "hover:bg-muted text-foreground" 
                      : "bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700"
                  }`}
                >
                  <CheckCircle className={`h-4 w-4 shrink-0 ${isLessonCompleted ? "text-emerald-500" : "fill-white text-sky-500"}`} />
                  {isLessonCompleted ? "Completed" : "Mark Complete"}
                </Button>
              </div>

              {/* RENDER VIDEO CONTENT */}
              {currentLesson.contentType === "video" && currentLesson.videoUrl && (
                <div className="space-y-6">
                  <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black border border-border/80 shadow-md">
                    <iframe
                      src={currentLesson.videoUrl}
                      title={currentLesson.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {currentLesson.contentBody && (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-xs md:text-sm text-muted-foreground leading-relaxed">
                      <p>{currentLesson.contentBody}</p>
                    </div>
                  )}
                </div>
              )}

              {/* RENDER TEXT / MARKDOWN CONTENT */}
              {currentLesson.contentType === "text" && currentLesson.contentBody && (
                <article className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-muted/40 prose-pre:border prose-pre:border-border/60 prose-pre:rounded-2xl text-xs md:text-sm leading-relaxed text-muted-foreground space-y-4">
                  {/* Clean Markdown parsing simulation mapping basics */}
                  {currentLesson.contentBody.split('\n\n').map((block, bidx) => {
                    if (block.startsWith('## ')) {
                      return <h2 key={bidx} className="text-lg md:text-xl font-bold tracking-tight text-foreground pt-4 mb-2">{block.replace('## ', '')}</h2>
                    }
                    if (block.startsWith('### ')) {
                      return <h3 key={bidx} className="text-base font-bold text-foreground pt-2 mb-1">{block.replace('### ', '')}</h3>
                    }
                    if (block.startsWith('* ') || block.startsWith('- ')) {
                      return (
                        <ul key={bidx} className="list-disc list-inside space-y-1.5 pl-4 text-xs md:text-sm">
                          {block.split('\n').map((li, lidx) => (
                            <li key={lidx}>{li.replace(/^[\*\-]\s+/, '')}</li>
                          ))}
                        </ul>
                      )
                    }
                    if (block.startsWith('1. ')) {
                      return (
                        <ol key={bidx} className="list-decimal list-inside space-y-1.5 pl-4 text-xs md:text-sm">
                          {block.split('\n').map((li, lidx) => (
                            <li key={lidx}>{li.replace(/^\d+\.\s+/, '')}</li>
                          ))}
                        </ol>
                      )
                    }
                    if (block.startsWith('```')) {
                      const lines = block.split('\n')
                      const codeLines = lines.slice(1, lines.length - 1).join('\n')
                      return (
                        <pre key={bidx} className="bg-muted/30 border border-border p-4 rounded-2xl font-mono text-[10px] md:text-xs overflow-x-auto text-foreground my-4 leading-relaxed">
                          <code>{codeLines}</code>
                        </pre>
                      )
                    }
                    return <p key={bidx} className="leading-relaxed mb-4">{block}</p>
                  })}
                </article>
              )}

              {/* RENDER INTERACTIVE MCQ ASSESSMENT QUIZ */}
              {currentLesson.contentType === "quiz" && currentLesson.quizQuestions && (
                <div className="space-y-8">
                  <div className="border border-border/80 bg-card/20 rounded-3xl p-6 md:p-8 space-y-8">
                    <div className="space-y-2">
                      <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 text-[9px] uppercase font-bold rounded-full">
                        Curriculum Assessment
                      </Badge>
                      <h2 className="text-lg md:text-xl font-extrabold tracking-tight">Evaluate your skillset</h2>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        To validate your comprehension, complete the multiple-choice questions below. You must answer all questions correctly to unlock completion credit.
                      </p>
                    </div>

                    <div className="space-y-8 divide-y divide-border/60">
                      {currentLesson.quizQuestions.map((q, qidx) => {
                        const selectedOpt = selectedAnswers[qidx]
                        
                        return (
                          <div key={qidx} className={`space-y-4 ${qidx > 0 ? "pt-8" : ""}`}>
                            <h3 className="font-extrabold text-sm md:text-base flex items-start gap-3">
                              <span className="h-6 w-6 bg-muted border border-border rounded-lg flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                                {qidx + 1}
                              </span>
                              <span className="text-foreground">{q.questionText}</span>
                            </h3>

                            <div className="grid grid-cols-1 gap-3 pl-0 md:pl-9">
                              {q.options.map((opt, oidx) => {
                                const isSelected = selectedOpt === oidx
                                const isCorrect = q.correctOptionIndex === oidx
                                
                                let buttonStyle = "bg-card/40 border-border text-foreground hover:bg-muted/20"
                                if (isSelected) {
                                  buttonStyle = "bg-primary/10 border-primary text-primary font-bold"
                                }
                                if (quizSubmitted) {
                                  if (isCorrect) {
                                    buttonStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold"
                                  } else if (isSelected) {
                                    buttonStyle = "bg-destructive/10 border-destructive text-destructive font-bold"
                                  } else {
                                    buttonStyle = "bg-card/20 border-border/40 text-muted-foreground opacity-60"
                                  }
                                }

                                return (
                                  <button
                                    key={oidx}
                                    onClick={() => handleQuizAnswer(qidx, oidx)}
                                    disabled={quizSubmitted}
                                    className={`w-full px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${buttonStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {quizSubmitted && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 ml-2" />}
                                  </button>
                                )
                              })}
                            </div>

                            {/* Question Explanations */}
                            {quizSubmitted && q.explanation && (
                              <div className="pl-0 md:pl-9 mt-3">
                                <Card className="bg-muted/10 border border-border/40 rounded-xl p-3.5 text-xs text-muted-foreground leading-relaxed">
                                  <div className="font-extrabold text-[10px] uppercase text-muted-foreground tracking-wider mb-1 flex items-center gap-1">
                                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                                    Explanation
                                  </div>
                                  {q.explanation}
                                </Card>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Quiz Controller action */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60">
                      {!quizSubmitted ? (
                        <Button
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(selectedAnswers).length < (currentLesson.quizQuestions?.length || 0)}
                          className="h-10 px-6 font-bold text-xs bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-indigo-700 w-full sm:w-auto ml-auto"
                        >
                          Submit Assessment
                        </Button>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                          <div className="text-xs font-bold uppercase tracking-wider">
                            Your score: <span className={quizScore === currentLesson.quizQuestions.length ? "text-emerald-500 font-extrabold" : "text-amber-500 font-extrabold"}>{quizScore} / {currentLesson.quizQuestions.length}</span>
                          </div>
                          {quizScore < currentLesson.quizQuestions.length ? (
                            <Button
                              onClick={() => {
                                setSelectedAnswers({})
                                setQuizSubmitted(false)
                                setQuizScore(0)
                              }}
                              variant="outline"
                              className="h-9 px-4 font-bold text-xs rounded-xl shadow-sm border border-border bg-card w-full sm:w-auto"
                            >
                              Retry Assessment
                            </Button>
                          ) : (
                            <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 font-bold text-xs rounded-full flex items-center gap-1.5 w-fit ml-auto">
                              <CheckCircle className="h-4 w-4" />
                              Perfect Score
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Navigation control */}
            <footer className="mt-16 pt-6 border-t border-border/60 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevLesson}
                disabled={isFirstLesson}
                className="h-9 text-xs font-bold rounded-xl border border-border shadow-sm bg-card hover:bg-muted flex items-center gap-1.5"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                Previous Unit
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextLesson}
                disabled={isLastLesson}
                className="h-9 text-xs font-bold rounded-xl border border-border shadow-sm bg-card hover:bg-muted flex items-center gap-1.5"
              >
                Next Unit
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Button>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
