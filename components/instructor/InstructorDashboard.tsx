"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    BookOpen, Plus, Users, Video, Pencil, Trash2, ChevronDown, ChevronRight,
    GraduationCap, Eye, Globe, Archive, Layers, FileText, CheckCircle
} from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { Course, Module, Lesson, ContentType } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"
import { db } from "@/lib/firebase"
import { doc, updateDoc, Timestamp, collection, query, where, onSnapshot } from "firebase/firestore"

// ─── Helpers ──────────────────────────────────────────────────────────────────
function genId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

const STATUS_COLORS: Record<string, string> = {
    draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    published: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    archived: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function LessonRow({
    lesson,
    onEdit,
    onDelete,
}: {
    lesson: Lesson
    onEdit: (l: Lesson) => void
    onDelete: (id: string) => void
}) {
    const TYPE_ICON: Record<string, React.ReactNode> = {
        video: <Video size={14} className="text-sky-500" />,
        text: <FileText size={14} className="text-violet-500" />,
        live: <Video size={14} className="text-rose-500" />,
        recorded: <Video size={14} className="text-emerald-500" />,
        quiz: <CheckCircle size={14} className="text-amber-500" />,
    }
    return (
        <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900/30 group">
            <div className="flex items-center gap-2.5 text-sm font-medium dark:text-gray-200">
                {TYPE_ICON[lesson.type] ?? <FileText size={14} />}
                <span>{lesson.title}</span>
                {lesson.isFree && (
                    <span className="ml-1 rounded-full bg-sky-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                        Free Preview
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={() => onEdit(lesson)} className="h-7 w-7 p-0">
                    <Pencil size={13} />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(lesson.id)}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <Trash2 size={13} />
                </Button>
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function InstructorDashboard() {
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    const normalizedRole = String(user?.role || "").toLowerCase()

    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)

    // Active course editing state
    const [activeCourse, setActiveCourse] = useState<Course | null>(null)
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

    // Module dialog
    const [moduleDialog, setModuleDialog] = useState(false)
    const [editingModule, setEditingModule] = useState<Module | null>(null)
    const [moduleForm, setModuleForm] = useState({ title: "", description: "" })

    // Lesson dialog
    const [lessonDialog, setLessonDialog] = useState(false)
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
    const [targetModuleId, setTargetModuleId] = useState<string | null>(null)
    const [lessonForm, setLessonForm] = useState({
        title: "",
        description: "",
        type: "video" as ContentType,
        videoId: "",
        markdown: "",
        meetingLink: "",
        isFree: false,
    })

    const [saving, setSaving] = useState(false)

    // ── Subscribe to instructor's courses ──────────────────────────────────────
    useEffect(() => {
        if (!user?.uid || (normalizedRole !== "instructor" && normalizedRole !== "admin")) return

        setLoading(true)
        const q = query(
            collection(db, "courses"),
            where("instructorId", "==", user.uid)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Course))

            // Sort courses (e.g. by creation date if available, or just keeping the fetched order)
            setCourses(data)
            
            // If there's an active course, keep its data synced
            setActiveCourse(prev => {
                if (!prev) return null
                const updated = data.find(c => c.id === prev.id)
                return updated || null
            })
            
            setLoading(false)
        }, (err) => {
            console.error("Error subscribing to instructor courses:", err)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [user?.uid, normalizedRole])

    // ── Auth guards ───────────────────────────────────────────────────────────
    if (authLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex items-center justify-center text-muted-foreground">
                <span className="animate-pulse">Loading dashboard…</span>
            </div>
        )
    }

    if (!user || (normalizedRole !== "instructor" && normalizedRole !== "admin")) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>
                            Only instructors can access this dashboard. Contact an admin to upgrade your account.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    // ── Persist modules back to Firestore ─────────────────────────────────────
    const persistModules = async (courseId: string, modules: Module[]) => {
        await updateDoc(doc(db, "courses", courseId), {
            modules,
            updatedAt: Timestamp.now(),
        })
    }

    // ── Publish / Unpublish / Archive ─────────────────────────────────────────
    const updateStatus = async (course: Course, status: "draft" | "published" | "archived") => {
        setSaving(true)
        try {
            await LMSService.updateCourse(course.id, { status })
            // onSnapshot will automatically update state, no need to manually reload:
            // await loadCourses()
            // if (activeCourse?.id === course.id) setActiveCourse(prev => prev ? { ...prev, status } : null)
        } finally {
            setSaving(false)
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MODULE CRUD
    // ─────────────────────────────────────────────────────────────────────────
    const openAddModule = () => {
        setEditingModule(null)
        setModuleForm({ title: "", description: "" })
        setModuleDialog(true)
    }

    const openEditModule = (mod: Module) => {
        setEditingModule(mod)
        setModuleForm({ title: mod.title, description: mod.description ?? "" })
        setModuleDialog(true)
    }

    const saveModule = async () => {
        if (!activeCourse || !moduleForm.title.trim()) return
        setSaving(true)
        try {
            let updatedModules: Module[]
            if (editingModule) {
                updatedModules = (activeCourse.modules || []).map(m =>
                    m.id === editingModule.id ? { ...m, ...moduleForm } : m
                )
            } else {
                const newMod: Module = {
                    id: genId(),
                    title: moduleForm.title.trim(),
                    description: moduleForm.description,
                    lessons: [],
                    order: (activeCourse.modules || []).length + 1,
                }
                updatedModules = [...(activeCourse.modules || []), newMod]
            }
            await persistModules(activeCourse.id, updatedModules)
            // state gets auto-updated by onSnapshot
            setModuleDialog(false)
        } finally {
            setSaving(false)
        }
    }

    const deleteModule = async (moduleId: string) => {
        if (!activeCourse || !confirm("Delete this module and all its lessons?")) return
        setSaving(true)
        try {
            const updatedModules = (activeCourse.modules || []).filter(m => m.id !== moduleId)
            await persistModules(activeCourse.id, updatedModules)
            // state auto-updates

        } finally {
            setSaving(false)
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LESSON CRUD
    // ─────────────────────────────────────────────────────────────────────────
    const openAddLesson = (moduleId: string) => {
        setTargetModuleId(moduleId)
        setEditingLesson(null)
        setLessonForm({ title: "", description: "", type: "video", videoId: "", markdown: "", meetingLink: "", isFree: false })
        setLessonDialog(true)
    }

    const openEditLesson = (lesson: Lesson, moduleId: string) => {
        setTargetModuleId(moduleId)
        setEditingLesson(lesson)
        setLessonForm({
            title: lesson.title,
            description: lesson.description ?? "",
            type: lesson.type,
            videoId: lesson.content?.videoId ?? "",
            markdown: lesson.content?.markdown ?? "",
            meetingLink: lesson.content?.meetingLink ?? "",
            isFree: lesson.isFree ?? false,
        })
        setLessonDialog(true)
    }

    const saveLesson = async () => {
        if (!activeCourse || !targetModuleId || !lessonForm.title.trim()) return
        setSaving(true)
        try {
            const newLesson: Lesson = {
                id: editingLesson?.id ?? genId(),
                title: lessonForm.title.trim(),
                description: lessonForm.description,
                type: lessonForm.type,
                isFree: lessonForm.isFree,
                content: {
                    type: lessonForm.type,
                    videoId: lessonForm.videoId,
                    markdown: lessonForm.markdown,
                    meetingLink: lessonForm.meetingLink,
                },
            }
            const updatedModules = (activeCourse.modules || []).map(m => {
                if (m.id !== targetModuleId) return m
                const lessons = editingLesson
                    ? m.lessons.map(l => l.id === editingLesson.id ? newLesson : l)
                    : [...(m.lessons || []), newLesson]
                return { ...m, lessons }
            })
            await persistModules(activeCourse.id, updatedModules)
            // state gets auto-updated by onSnapshot
            setLessonDialog(false)
        } finally {
            setSaving(false)
        }
    }

    const deleteLesson = async (moduleId: string, lessonId: string) => {
        if (!activeCourse || !confirm("Delete this lesson?")) return
        setSaving(true)
        try {
            const updatedModules = (activeCourse.modules || []).map(m => {
                if (m.id !== moduleId) return m
                return { ...m, lessons: (m.lessons || []).filter(l => l.id !== lessonId) }
            })
            await persistModules(activeCourse.id, updatedModules)
            // state gets auto-updated by onSnapshot
        } finally {
            setSaving(false)
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    const stats = {
        total: courses.length,
        published: courses.filter(c => c.status === "published").length,
        draft: courses.filter(c => c.status === "draft").length,
        totalEnrollments: courses.reduce((s, c) => s + (c.totalEnrollments ?? 0), 0),
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
            {/* ── Header ───────────────────────────────────────────────────── */}
            <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage your courses, modules, and lessons</p>
                </div>
                <Button onClick={() => router.push("/create-course")}>
                    <Plus className="h-4 w-4 mr-2" /> Create New Course
                </Button>
            </div>

            {/* ── Stats Row ─────────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Courses", value: stats.total, icon: <BookOpen className="h-5 w-5 text-blue-500" /> },
                    { label: "Published", value: stats.published, icon: <Globe className="h-5 w-5 text-emerald-500" /> },
                    { label: "Drafts", value: stats.draft, icon: <Archive className="h-5 w-5 text-yellow-500" /> },
                    { label: "Enrollments", value: stats.totalEnrollments, icon: <Users className="h-5 w-5 text-purple-500" /> },
                ].map(s => (
                    <Card key={s.label}>
                        <CardContent className="p-4 flex items-center gap-3">
                            {s.icon}
                            <div>
                                <p className="text-xs text-muted-foreground">{s.label}</p>
                                <p className="text-2xl font-bold">{s.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ── Main Layout: Course List + Editor ─────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">

                {/* Course List */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Your Courses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 p-3 pt-0">
                        {loading && (
                            <p className="text-sm text-muted-foreground text-center py-6 animate-pulse">Loading courses…</p>
                        )}
                        {!loading && courses.length === 0 && (
                            <div className="text-center py-8 space-y-3">
                                <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground/30" />
                                <p className="text-sm text-muted-foreground">No courses yet</p>
                                <Button size="sm" variant="outline" onClick={() => router.push("/create-course")}>
                                    <Plus className="h-3 w-3 mr-1" /> Create Course
                                </Button>
                            </div>
                        )}
                        {courses.map(course => (
                            <button
                                key={course.id}
                                onClick={() => setActiveCourse(course)}
                                className={`w-full text-left rounded-xl border px-3 py-3 transition-all hover:border-primary/40 hover:bg-primary/5 ${activeCourse?.id === course.id ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20" : "border-slate-100 dark:border-gray-800"}`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <p className="font-medium text-sm leading-snug dark:text-gray-200 line-clamp-2">{course.title}</p>
                                    <span className={`shrink-0 text-[9px] uppercase font-black px-1.5 py-0.5 rounded-full ${STATUS_COLORS[course.status] ?? ""}`}>
                                        {course.status}
                                    </span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><Layers size={11} /> {course.modules?.length ?? 0} modules</span>
                                    <span className="flex items-center gap-1"><Users size={11} /> {course.totalEnrollments ?? 0}</span>
                                </div>
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Course Editor */}
                {activeCourse ? (
                    <div className="space-y-4">
                        {/* Course header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between flex-wrap gap-3">
                                    <div>
                                        <CardTitle className="text-xl">{activeCourse.title}</CardTitle>
                                        <CardDescription className="mt-1">{activeCourse.subtitle}</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {activeCourse.status === "draft" && (
                                            <Button
                                                variant="default"
                                                size="sm"
                                                disabled={saving}
                                                onClick={() => updateStatus(activeCourse, "published")}
                                            >
                                                <Globe className="h-3 w-3 mr-1" /> Publish
                                            </Button>
                                        )}
                                        {activeCourse.status === "published" && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={saving}
                                                onClick={() => updateStatus(activeCourse, "draft")}
                                            >
                                                <Archive className="h-3 w-3 mr-1" /> Unpublish
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.push(`/courses/${activeCourse.id}/edit`)}
                                        >
                                            <Pencil className="h-3 w-3 mr-1" /> Edit Details
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${STATUS_COLORS[activeCourse.status]}`}>{activeCourse.status}</span>
                                    <span>{activeCourse.level}</span>
                                    <span>₹{activeCourse.price === 0 ? "Free" : activeCourse.price}</span>
                                    <span>{activeCourse.totalEnrollments} enrolled</span>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Modules & Lessons */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Layers size={16} /> Course Content
                                    </CardTitle>
                                    <Button size="sm" onClick={openAddModule} disabled={saving}>
                                        <Plus className="h-3 w-3 mr-1" /> Add Module
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {activeCourse.modules?.length === 0 && (
                                    <div className="text-center py-10 border border-dashed rounded-xl dark:border-gray-800">
                                        <Layers className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                                        <p className="text-sm text-muted-foreground">No modules yet. Add your first module to get started.</p>
                                    </div>
                                )}
                                {activeCourse.modules?.map((mod, idx) => {
                                    const isExpanded = expandedModules.has(mod.id)
                                    return (
                                        <div key={mod.id} className="border rounded-xl overflow-hidden dark:border-gray-800">
                                            {/* Module header */}
                                            <div
                                                className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-gray-900/50 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-gray-800/80 transition-colors"
                                                onClick={() => setExpandedModules(prev => {
                                                    const next = new Set(prev)
                                                    next.has(mod.id) ? next.delete(mod.id) : next.add(mod.id)
                                                    return next
                                                })}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {isExpanded ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
                                                    <div>
                                                        <p className="font-semibold text-sm dark:text-gray-100">
                                                            <span className="text-muted-foreground mr-1.5 font-normal text-xs">{`M${idx + 1}`}</span>
                                                            {mod.title}
                                                        </p>
                                                        {mod.description && <p className="text-xs text-muted-foreground">{mod.description}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                                                    <span className="text-xs text-muted-foreground">{mod.lessons.length} lessons</span>
                                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openEditModule(mod)}>
                                                        <Pencil size={12} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost" size="sm"
                                                        className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        onClick={() => deleteModule(mod.id)}
                                                    >
                                                        <Trash2 size={12} />
                                                    </Button>
                                                </div>
                                            </div>
                                            {/* Lessons */}
                                            {isExpanded && (
                                                <div className="p-3 space-y-2 bg-white dark:bg-gray-950">
                                                    {mod.lessons.map(lesson => (
                                                        <LessonRow
                                                            key={lesson.id}
                                                            lesson={lesson}
                                                            onEdit={l => openEditLesson(l, mod.id)}
                                                            onDelete={id => deleteLesson(mod.id, id)}
                                                        />
                                                    ))}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full mt-1 text-xs border-dashed"
                                                        onClick={() => openAddLesson(mod.id)}
                                                        disabled={saving}
                                                    >
                                                        <Plus size={12} className="mr-1" /> Add Lesson
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-xl text-center dark:border-gray-800">
                        <BookOpen className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <p className="text-muted-foreground">Select a course from the list to manage its content</p>
                    </div>
                )}
            </div>

            {/* ── Module Dialog ─────────────────────────────────────────────── */}
            <Dialog open={moduleDialog} onOpenChange={setModuleDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingModule ? "Edit Module" : "Add Module"}</DialogTitle>
                        <DialogDescription>Modules group related lessons together in your course.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-1.5">
                            <Label>Module Title *</Label>
                            <Input
                                value={moduleForm.title}
                                onChange={e => setModuleForm(p => ({ ...p, title: e.target.value }))}
                                placeholder="e.g., Introduction to Python"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Description</Label>
                            <Textarea
                                value={moduleForm.description}
                                onChange={e => setModuleForm(p => ({ ...p, description: e.target.value }))}
                                placeholder="What will students learn in this module?"
                                rows={3}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <Button variant="outline" onClick={() => setModuleDialog(false)}>Cancel</Button>
                        <Button onClick={saveModule} disabled={saving || !moduleForm.title.trim()}>
                            {saving ? "Saving…" : editingModule ? "Update Module" : "Add Module"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ── Lesson Dialog ─────────────────────────────────────────────── */}
            <Dialog open={lessonDialog} onOpenChange={setLessonDialog}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editingLesson ? "Edit Lesson" : "Add Lesson"}</DialogTitle>
                        <DialogDescription>Add a topic or lesson to the selected module.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5 col-span-2">
                                <Label>Lesson Title *</Label>
                                <Input
                                    value={lessonForm.title}
                                    onChange={e => setLessonForm(p => ({ ...p, title: e.target.value }))}
                                    placeholder="e.g., Variables and Data Types"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Content Type</Label>
                                <Select
                                    value={lessonForm.type}
                                    onValueChange={v => setLessonForm(p => ({ ...p, type: v as ContentType }))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="video">Video</SelectItem>
                                        <SelectItem value="text">Text / Article</SelectItem>
                                        <SelectItem value="live">Live Session</SelectItem>
                                        <SelectItem value="recorded">Recorded Session</SelectItem>
                                        <SelectItem value="quiz">Quiz</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5 flex flex-col justify-end">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isFree"
                                        checked={lessonForm.isFree}
                                        onChange={e => setLessonForm(p => ({ ...p, isFree: e.target.checked }))}
                                        className="rounded"
                                    />
                                    <Label htmlFor="isFree" className="cursor-pointer">Free Preview</Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label>Description</Label>
                            <Textarea
                                value={lessonForm.description}
                                onChange={e => setLessonForm(p => ({ ...p, description: e.target.value }))}
                                placeholder="Brief description of this lesson"
                                rows={2}
                            />
                        </div>

                        {(lessonForm.type === "video" || lessonForm.type === "recorded") && (
                            <div className="space-y-1.5">
                                <Label>YouTube Video ID or URL</Label>
                                <Input
                                    value={lessonForm.videoId}
                                    onChange={e => setLessonForm(p => ({ ...p, videoId: e.target.value }))}
                                    placeholder="e.g., dQw4w9WgXcQ"
                                />
                            </div>
                        )}

                        {lessonForm.type === "text" && (
                            <div className="space-y-1.5">
                                <Label>Article Content (Markdown)</Label>
                                <Textarea
                                    value={lessonForm.markdown}
                                    onChange={e => setLessonForm(p => ({ ...p, markdown: e.target.value }))}
                                    placeholder="Write your lesson content in Markdown..."
                                    rows={6}
                                    className="font-mono text-sm"
                                />
                            </div>
                        )}

                        {lessonForm.type === "live" && (
                            <div className="space-y-1.5">
                                <Label>Meeting Link</Label>
                                <Input
                                    value={lessonForm.meetingLink}
                                    onChange={e => setLessonForm(p => ({ ...p, meetingLink: e.target.value }))}
                                    placeholder="https://meet.google.com/..."
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <Button variant="outline" onClick={() => setLessonDialog(false)}>Cancel</Button>
                        <Button onClick={saveLesson} disabled={saving || !lessonForm.title.trim()}>
                            {saving ? "Saving…" : editingLesson ? "Update Lesson" : "Add Lesson"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
