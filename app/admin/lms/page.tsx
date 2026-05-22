"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Save, 
  Lock, 
  Loader2, 
  BookOpen, 
  Video, 
  FileText, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  ArrowLeft,
  Sparkles,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  getAllCourses, 
  getCourseChapters, 
  getChapterLessons, 
  createOrUpdateCourse,
  createOrUpdateChapter,
  createOrUpdateLesson,
  MOCK_COURSES
} from "@/services/lmsService"
import { LmsCourse, LmsChapter, LmsLesson, LmsQuizQuestion } from "@/types/lms"

export default function LmsAdminDashboard() {
  const router = useRouter()
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(true)
  
  // LMS management states
  const [courses, setCourses] = useState<LmsCourse[]>([])
  const [selectedCourse, setSelectedCourse] = useState<LmsCourse | null>(null)
  const [chapters, setChapters] = useState<LmsChapter[]>([])
  const [lessonsMap, setLessonsMap] = useState<Record<string, LmsLesson[]>>({})
  
  // Selection states
  const [activeChapterId, setActiveChapterId] = useState<string>("")
  const [activeLessonId, setActiveLessonId] = useState<string>("")
  
  // Loading & alerts
  const [loadingData, setLoadingData] = useState(false)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSimulated, setIsSimulated] = useState(false)

  // Creation forms toggle
  const [isCreatingCourse, setIsCreatingCourse] = useState(false)
  
  // Form fields states
  const [courseForm, setCourseForm] = useState<Partial<LmsCourse>>({
    id: "",
    title: "",
    description: "",
    level: "beginner",
    thumbnailUrl: "",
    tags: [],
    duration: "4 Hours",
    status: "draft"
  })

  const [newChapterTitle, setNewChapterTitle] = useState("")
  const [newLessonForm, setNewLessonForm] = useState<Partial<LmsLesson>>({
    title: "",
    contentType: "text",
    contentBody: "",
    videoUrl: "",
    quizQuestions: []
  })

  // Quiz creation inputs
  const [newQuestionText, setNewQuestionText] = useState("")
  const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>(["", "", "", ""])
  const [newQuestionCorrectIdx, setNewQuestionCorrectIdx] = useState(0)

  useEffect(() => {
    // 1. Auth checkpoint check
    import("@/lib/firebase").then(({ auth, db }) => {
      if (!auth) {
        setLoadingAuth(false)
        setIsAdmin(true) // Mockup development authorization
        setIsSimulated(true)
        loadMockCourses()
        return
      }

      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          setCurrentUser(user)
          
          if (db) {
            const { doc, getDoc } = await import("firebase/firestore")
            try {
              const userDocRef = doc(db, "users", user.uid)
              const userSnapshot = await getDoc(userDocRef)
              if (userSnapshot.exists() && userSnapshot.data().role === "admin") {
                setIsAdmin(true)
                loadLmsData()
              } else {
                setIsAdmin(false)
              }
            } catch (err) {
              console.error("Auth role check failed, falling back:", err)
              setIsAdmin(true)
              setIsSimulated(true)
              loadMockCourses()
            }
          } else {
            setIsAdmin(false)
          }
        } else {
          setCurrentUser(null)
          setIsAdmin(false)
        }
        setLoadingAuth(false)
      })
      return () => unsubscribe()
    })
  }, [])

  const loadMockCourses = () => {
    setCourses(MOCK_COURSES)
    if (MOCK_COURSES.length > 0) {
      handleSelectCourse(MOCK_COURSES[0])
    }
  }

  const loadLmsData = async () => {
    setLoadingData(true)
    try {
      const data = await getAllCourses()
      setCourses(data)
      if (data.length > 0) {
        handleSelectCourse(data[0])
      }
    } catch (e) {
      console.error("LMS service load failure:", e)
      loadMockCourses()
    } finally {
      setLoadingData(false)
    }
  }

  const triggerAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 5000)
  }

  const handleSelectCourse = async (course: LmsCourse) => {
    setSelectedCourse(course)
    setLoadingData(true)
    setIsCreatingCourse(false)
    try {
      const chaps = await getCourseChapters(course.id)
      setChapters(chaps)
      
      const lessonsData: Record<string, LmsLesson[]> = {}
      for (const ch of chaps) {
        const les = await getChapterLessons(ch.id)
        lessonsData[ch.id] = les
      }
      setLessonsMap(lessonsData)
      
      if (chaps.length > 0) {
        setActiveChapterId(chaps[0].id)
      } else {
        setActiveChapterId("")
      }
      setActiveLessonId("")
    } catch (err) {
      console.error("Failed to load syllabus items:", err)
    } finally {
      setLoadingData(false)
    }
  }

  // Course Actions
  const handleSaveCourse = async () => {
    if (!courseForm.title || !courseForm.id) {
      triggerAlert("error", "Syllabus ID and Course Title are required.")
      return
    }
    
    setSaving(true)
    const newCourse: LmsCourse = {
      id: courseForm.id.trim().toLowerCase(),
      title: courseForm.title,
      description: courseForm.description || "",
      level: courseForm.level as any || "beginner",
      thumbnailUrl: courseForm.thumbnailUrl || "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=600&q=80",
      tags: typeof courseForm.tags === 'string' ? (courseForm.tags as string).split(',').map(s=>s.trim()) : courseForm.tags || [],
      duration: courseForm.duration || "4 Hours",
      status: courseForm.status as any || "draft"
    }

    try {
      await createOrUpdateCourse(newCourse)
      triggerAlert("success", `Pathway ${newCourse.title} logged successfully.`)
      
      // Update courses lists
      const updated = [...courses]
      const idx = updated.findIndex(c => c.id === newCourse.id)
      if (idx >= 0) updated[idx] = newCourse
      else updated.push(newCourse)
      setCourses(updated)
      
      setSelectedCourse(newCourse)
      setIsCreatingCourse(false)
    } catch (err) {
      triggerAlert("error", "Failed to store course path.")
    } finally {
      setSaving(false)
    }
  }

  // Chapter Actions
  const handleAddChapter = async () => {
    if (!selectedCourse || !newChapterTitle.trim()) return
    setSaving(true)

    const chapId = `${selectedCourse.id}_ch_${Date.now().toString().slice(-4)}`
    const newChap: LmsChapter = {
      id: chapId,
      courseId: selectedCourse.id,
      title: newChapterTitle.trim(),
      order: chapters.length + 1,
      lessonIds: []
    }

    try {
      await createOrUpdateChapter(newChap)
      triggerAlert("success", `Chapter '${newChap.title}' integrated successfully.`)
      setChapters([...chapters, newChap])
      setLessonsMap(prev => ({ ...prev, [chapId]: [] }))
      setActiveChapterId(chapId)
      setNewChapterTitle("")
    } catch (err) {
      triggerAlert("error", "Failed to integrate chapter.")
    } finally {
      setSaving(false)
    }
  }

  // Lesson Actions
  const handleAddLesson = async () => {
    if (!selectedCourse || !activeChapterId || !newLessonForm.title) return
    setSaving(true)

    const lessonId = `${selectedCourse.id}_l_${Date.now().toString().slice(-4)}`
    const chapterLessons = lessonsMap[activeChapterId] || []
    
    const newLesson: LmsLesson = {
      id: lessonId,
      chapterId: activeChapterId,
      courseId: selectedCourse.id,
      title: newLessonForm.title,
      contentType: newLessonForm.contentType as any || "text",
      contentBody: newLessonForm.contentBody || "",
      videoUrl: newLessonForm.videoUrl || "",
      quizQuestions: newLessonForm.quizQuestions || [],
      order: chapterLessons.length + 1
    }

    try {
      await createOrUpdateLesson(newLesson)
      triggerAlert("success", `Unit '${newLesson.title}' integrated successfully.`)
      
      const updatedLessons = [...chapterLessons, newLesson]
      setLessonsMap(prev => ({ ...prev, [activeChapterId]: updatedLessons }))
      
      // Reset lesson form
      setNewLessonForm({
        title: "",
        contentType: "text",
        contentBody: "",
        videoUrl: "",
        quizQuestions: []
      })
    } catch (err) {
      triggerAlert("error", "Failed to integrate lesson unit.")
    } finally {
      setSaving(false)
    }
  }

  // Quiz Question Actions
  const handleAddQuizQuestion = () => {
    if (!newQuestionText.trim()) return
    
    const newQ: LmsQuizQuestion = {
      questionText: newQuestionText.trim(),
      options: newQuestionOptions.filter(o => o.trim() !== ""),
      correctOptionIndex: newQuestionCorrectIdx
    }

    const currentQuestions = newLessonForm.quizQuestions || []
    setNewLessonForm(prev => ({
      ...prev,
      quizQuestions: [...currentQuestions, newQ]
    }))

    // Reset inputs
    setNewQuestionText("")
    setNewQuestionOptions(["", "", "", ""])
    setNewQuestionCorrectIdx(0)
    triggerAlert("success", "Competency assessment question appended.")
  }

  if (loadingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">Verifying administrative clearance...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 max-w-md mx-auto text-center">
        <div className="bg-destructive/10 p-4 rounded-full mb-6 border border-destructive/20 animate-pulse">
          <Lock className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Access Restrict</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          LMS Academic outline management requires authenticated administrator role clearance.
        </p>
        <Button onClick={() => router.push("/login")} className="shadow-sm font-semibold">
          Log In As Admin
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-6 w-6 text-primary dark:text-sky-400 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-sky-400">
              LMS System Console
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Academic Syllabus Builder</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Construct pathways, register-level chapters, textual tutorials, streaming assets, and assessment quizzes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSimulated && (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 font-medium text-xs rounded-full">
              Mock Simulation Active
            </Badge>
          )}
          
          <Button
            onClick={() => {
              setIsCreatingCourse(true)
              setSelectedCourse(null)
              setCourseForm({
                id: "",
                title: "",
                description: "",
                level: "beginner",
                thumbnailUrl: "",
                tags: [],
                duration: "4 Hours",
                status: "draft"
              })
            }}
            className="bg-primary hover:bg-primary/90 text-white shadow-sm font-bold text-xs rounded-xl flex items-center gap-1.5 h-10"
          >
            <Plus className="h-4 w-4" />
            Create Pathway
          </Button>
        </div>
      </div>

      {/* Alert toast info */}
      {alert && (
        <Card className={`p-4 mb-8 flex items-start gap-3 border shadow-inner animate-slideUp ${
          alert.type === "success" 
            ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400" 
            : "bg-destructive/10 text-destructive border-destructive/20"
        }`}>
          {alert.type === "success" ? <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" /> : <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />}
          <p className="text-xs font-semibold leading-relaxed">{alert.message}</p>
        </Card>
      )}

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left pathways navigator panel */}
        <aside className="lg:col-span-1 space-y-4">
          <Card className="border border-border bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm">
            <CardHeader className="p-4 border-b border-border bg-muted/20">
              <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                Active Pathways
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-1">
              {courses.map((c) => {
                const isSelected = selectedCourse?.id === c.id
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCourse(c)}
                    className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between border ${
                      isSelected 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    }`}
                  >
                    <span className="truncate">{c.title}</span>
                    <Badge variant="outline" className="text-[8px] px-1 py-0.2 rounded font-medium border-border">
                      {c.status}
                    </Badge>
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </aside>

        {/* Right workspace outline console */}
        <main className="lg:col-span-3 space-y-6">
          {/* COURSE CREATOR FORM VIEW */}
          {isCreatingCourse && (
            <Card className="border border-border bg-card/20 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary shrink-0" />
                  Define Course Pathway
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setIsCreatingCourse(false)} className="text-xs font-semibold">
                  Cancel
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Unique ID</label>
                  <Input
                    placeholder="e.g. embedded-c-rtos"
                    value={courseForm.id}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, id: e.target.value }))}
                    className="h-10 bg-card rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pathway Title</label>
                  <Input
                    placeholder="e.g. Mastering Embedded Systems"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                    className="h-10 bg-card rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description summary</label>
                  <Textarea
                    placeholder="Provide a syllabus summary describing objectives..."
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-card rounded-xl text-xs min-h-24 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Difficulty Level</label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, level: e.target.value as any }))}
                    className="w-full h-10 px-3 bg-card border border-input rounded-xl text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration</label>
                  <Input
                    placeholder="e.g. 8 Hours"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="h-10 bg-card rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Thumbnail Image URL</label>
                  <Input
                    placeholder="https://images.unsplash.com/..."
                    value={courseForm.thumbnailUrl}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                    className="h-10 bg-card rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tags (Comma split)</label>
                  <Input
                    placeholder="Embedded, ARM, Firmware"
                    value={typeof courseForm.tags === 'string' ? courseForm.tags : courseForm.tags?.join(', ')}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, tags: e.target.value as any }))}
                    className="h-10 bg-card rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</label>
                  <select
                    value={courseForm.status}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full h-10 px-3 bg-card border border-input rounded-xl text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={handleSaveCourse}
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-white font-bold text-xs tracking-wide shadow-sm h-11 px-6 rounded-xl flex items-center gap-1.5 ml-auto"
              >
                <Save className="h-4 w-4" />
                Commit Pathway Configuration
              </Button>
            </Card>
          )}

          {/* DYNAMIC SYLLABUS STRUCTURE CONSOLE */}
          {selectedCourse && (
            <div className="space-y-6">
              {/* Course Title metadata detail card */}
              <Card className="border border-border bg-card/30 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-2 py-0.5 rounded font-bold uppercase text-[9px] tracking-wider mb-2">
                    {selectedCourse.level}
                  </Badge>
                  <h2 className="text-xl font-extrabold tracking-tight leading-tight">{selectedCourse.title}</h2>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed max-w-2xl">{selectedCourse.description}</p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreatingCourse(true)
                    setCourseForm({ ...selectedCourse })
                  }}
                  className="text-xs font-semibold h-9 rounded-xl px-4 shrink-0 shadow-sm border border-border"
                >
                  Edit Configuration
                </Button>
              </Card>

              {/* Chapters Outline accordion manager */}
              <Card className="border border-border bg-card/20 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
                  <div>
                    <h3 className="font-extrabold text-base flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Chapters curriculum ({chapters.length})
                    </h3>
                    <p className="text-muted-foreground text-[10px] mt-0.5">Integrate modules and lessons recursively.</p>
                  </div>
                  
                  {/* Inline Chapter creator input */}
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Input
                      placeholder="e.g. Memory structures..."
                      value={newChapterTitle}
                      onChange={(e) => setNewChapterTitle(e.target.value)}
                      className="h-9 bg-card rounded-lg text-xs w-full sm:w-48"
                    />
                    <Button onClick={handleAddChapter} disabled={saving} size="sm" className="h-9 rounded-lg font-bold text-xs px-3">
                      Add Chapter
                    </Button>
                  </div>
                </div>

                {chapters.length === 0 ? (
                  <p className="text-muted-foreground text-xs italic text-center py-10">No chapters integrated in this pathway curriculum structure yet.</p>
                ) : (
                  <div className="space-y-4">
                    {chapters.map((ch, idx) => {
                      const isActive = activeChapterId === ch.id
                      const lessons = lessonsMap[ch.id] || []

                      return (
                        <div key={ch.id} className="border border-border bg-card/30 rounded-2xl overflow-hidden">
                          {/* Chapter row header */}
                          <div className={`px-4 py-3 flex items-center justify-between transition-colors ${isActive ? "bg-muted/10" : ""}`}>
                            <button
                              onClick={() => {
                                setActiveChapterId(ch.id)
                                setActiveLessonId("")
                              }}
                              className="text-left flex items-center gap-3"
                            >
                              <span className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-extrabold text-xs text-primary shrink-0">
                                {idx + 1}
                              </span>
                              <div>
                                <h4 className="font-bold text-xs md:text-sm text-foreground leading-tight">{ch.title}</h4>
                                <span className="text-[10px] text-muted-foreground">{lessons.length} active units</span>
                              </div>
                            </button>

                            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isActive ? "rotate-180" : ""}`} />
                          </div>

                          {/* Chapter lessons list & unit adding manager */}
                          {isActive && (
                            <div className="px-4 pb-4 border-t border-border/40 bg-background/20 space-y-4 pt-4">
                              {/* Lessons checklist */}
                              <div className="space-y-1.5 pl-0 md:pl-10 divide-y divide-border/60">
                                {lessons.length === 0 ? (
                                  <p className="text-muted-foreground text-[10px] italic py-2">No units associated yet.</p>
                                ) : (
                                  lessons.map((les, lidx) => (
                                    <div key={les.id} className="flex items-center justify-between py-2.5">
                                      <div className="flex items-center gap-2 text-xs font-semibold">
                                        {les.contentType === "video" && <Video className="h-3.5 w-3.5 text-sky-400 shrink-0" />}
                                        {les.contentType === "text" && <FileText className="h-3.5 w-3.5 text-indigo-400 shrink-0" />}
                                        {les.contentType === "quiz" && <HelpCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                                        <span>Unit {lidx+1}: {les.title}</span>
                                      </div>

                                      <Badge variant="outline" className="text-[8px] rounded uppercase font-bold py-0.5">{les.contentType}</Badge>
                                    </div>
                                  ))
                                )}
                              </div>

                              {/* Inline Lesson unit builder form */}
                              <Card className="bg-card/50 border border-border/80 rounded-xl p-4 space-y-4">
                                <h5 className="font-extrabold text-xs uppercase tracking-wider text-muted-foreground">Add Lesson Unit</h5>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-muted-foreground">Lesson Title</label>
                                    <Input
                                      placeholder="e.g. Vector Ingestion pipelines"
                                      value={newLessonForm.title}
                                      onChange={(e) => setNewLessonForm(prev => ({ ...prev, title: e.target.value }))}
                                      className="h-8 bg-card rounded-lg text-xs"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-muted-foreground">Content Type</label>
                                    <select
                                      value={newLessonForm.contentType}
                                      onChange={(e) => setNewLessonForm(prev => ({ ...prev, contentType: e.target.value as any }))}
                                      className="w-full h-8 px-2 bg-card border border-input rounded-lg text-[10px] cursor-pointer"
                                    >
                                      <option value="text">Rich Text / Markdown</option>
                                      <option value="video">Embedded Video Stream</option>
                                      <option value="quiz">Interactive MCQ Assessment</option>
                                    </select>
                                  </div>

                                  {/* Conditionally render Content inputs based on type selection */}
                                  {newLessonForm.contentType === "text" && (
                                    <div className="space-y-1 md:col-span-2">
                                      <label className="text-[10px] font-bold uppercase text-muted-foreground">Markdown Body</label>
                                      <Textarea
                                        placeholder="## Header\nWrite content body using styled markdown..."
                                        value={newLessonForm.contentBody}
                                        onChange={(e) => setNewLessonForm(prev => ({ ...prev, contentBody: e.target.value }))}
                                        className="bg-card rounded-lg text-[10px] min-h-24 leading-relaxed"
                                      />
                                    </div>
                                  )}

                                  {newLessonForm.contentType === "video" && (
                                    <>
                                      <div className="space-y-1 md:col-span-2">
                                        <label className="text-[10px] font-bold uppercase text-muted-foreground">Embedded Video Link</label>
                                        <Input
                                          placeholder="https://www.youtube.com/embed/..."
                                          value={newLessonForm.videoUrl}
                                          onChange={(e) => setNewLessonForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                                          className="h-8 bg-card rounded-lg text-xs"
                                        />
                                      </div>
                                      <div className="space-y-1 md:col-span-2">
                                        <label className="text-[10px] font-bold uppercase text-muted-foreground">Supporting Text Notes</label>
                                        <Textarea
                                          placeholder="Summarize the core learnings of the video context..."
                                          value={newLessonForm.contentBody}
                                          onChange={(e) => setNewLessonForm(prev => ({ ...prev, contentBody: e.target.value }))}
                                          className="bg-card rounded-lg text-[10px] min-h-16"
                                        />
                                      </div>
                                    </>
                                  )}

                                  {newLessonForm.contentType === "quiz" && (
                                    <div className="md:col-span-2 border border-border bg-background/40 p-3 rounded-lg space-y-4">
                                      <h6 className="font-bold text-[10px] uppercase text-amber-500">Configure MCQ Assessment Question</h6>
                                      
                                      <div className="space-y-1.5">
                                        <label className="text-[9px] font-bold text-muted-foreground uppercase">Question text statement</label>
                                        <Input
                                          placeholder="e.g. Which logic gate performs inversion operations?"
                                          value={newQuestionText}
                                          onChange={(e) => setNewQuestionText(e.target.value)}
                                          className="h-8 bg-card rounded-lg text-xs"
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-3">
                                        {newQuestionOptions.map((opt, oidx) => (
                                          <div key={oidx} className="space-y-1">
                                            <label className="text-[9px] font-bold text-muted-foreground">Option {oidx+1}</label>
                                            <Input
                                              placeholder={`Option ${oidx+1}`}
                                              value={opt}
                                              onChange={(e) => {
                                                const updated = [...newQuestionOptions]
                                                updated[oidx] = e.target.value
                                                setNewQuestionOptions(updated)
                                              }}
                                              className="h-8 bg-card rounded-lg text-xs"
                                            />
                                          </div>
                                        ))}
                                      </div>

                                      <div className="flex gap-4 items-center">
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-bold text-muted-foreground uppercase block">Correct index</label>
                                          <select
                                            value={newQuestionCorrectIdx}
                                            onChange={(e) => setNewQuestionCorrectIdx(parseInt(e.target.value))}
                                            className="h-8 bg-card border border-input rounded-lg text-[10px] px-2"
                                          >
                                            <option value={0}>Option 1</option>
                                            <option value={1}>Option 2</option>
                                            <option value={2}>Option 3</option>
                                            <option value={3}>Option 4</option>
                                          </select>
                                        </div>

                                        <Button
                                          onClick={handleAddQuizQuestion}
                                          size="sm"
                                          variant="outline"
                                          className="h-8 text-[10px] font-bold mt-4"
                                        >
                                          Add MCQ Question
                                        </Button>
                                      </div>

                                      {/* Added Questions count log */}
                                      {newLessonForm.quizQuestions && newLessonForm.quizQuestions.length > 0 && (
                                        <div className="space-y-1.5 pt-2 border-t border-border/40">
                                          <span className="text-[9px] font-bold uppercase text-muted-foreground">Questions Drafted ({newLessonForm.quizQuestions.length}):</span>
                                          <div className="flex flex-wrap gap-1.5">
                                            {newLessonForm.quizQuestions.map((q, idx) => (
                                              <Badge key={idx} variant="outline" className="text-[8px] bg-muted/40 font-bold px-2 py-0.5 rounded">
                                                Q.{idx+1}: {q.questionText.slice(0, 16)}...
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <Button
                                  onClick={handleAddLesson}
                                  disabled={saving || !newLessonForm.title}
                                  className="bg-primary hover:bg-primary/90 text-white font-bold text-[10px] tracking-wider uppercase h-9 px-4 rounded-lg flex items-center gap-1 ml-auto"
                                >
                                  <Plus className="h-4.5 w-4.5" />
                                  Commit Lesson Unit
                                </Button>
                              </Card>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
