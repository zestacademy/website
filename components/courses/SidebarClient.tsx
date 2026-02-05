
"use client"

import { Course } from "@/types/lms"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, CheckCircle, PlayCircle, Lock, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface SidebarClientProps {
    course: Course
}

export default function SidebarClient({ course }: SidebarClientProps) {
    const pathname = usePathname()
    // In a real app, these would come from useCourseProgress
    const completedLessons = ["d1-l1"]; // Mock
    const currentLessonId = pathname?.split('/').pop()

    return (
        <>
            <div className="p-4 border-b">
                <Link href={`/courses/${course.id}`} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Course Home
                </Link>
                <h2 className="font-semibold text-lg line-clamp-2 leading-tight mb-2">
                    {course.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <div className="flex-1 bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-[10%]" />
                    </div>
                    <span>10% Complete</span>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4">
                    <Accordion type="multiple" defaultValue={course.modules.map(m => m.id)} className="space-y-4">
                        {course.modules.map((module) => (
                            <AccordionItem key={module.id} value={module.id} className="border-none">
                                <AccordionTrigger className="py-2 hover:no-underline text-sm font-medium">
                                    {module.title}
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                    <div className="mt-1 space-y-1">
                                        {module.lessons.map((lesson) => {
                                            const isActive = currentLessonId === lesson.id
                                            const isCompleted = completedLessons.includes(lesson.id)
                                            // const isLocked = !isCompleted && ... logic

                                            return (
                                                <Link
                                                    key={lesson.id}
                                                    href={`/courses/${course.id}/learn/${lesson.id}`}
                                                    className={cn(
                                                        "flex items-center gap-3 p-2 rounded-md text-sm transition-colors relative",
                                                        isActive
                                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium"
                                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                    )}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    ) : lesson.type === 'video' ? (
                                                        <PlayCircle className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-blue-500" : "")} />
                                                    ) : (
                                                        <FileText className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-blue-500" : "")} />
                                                    )}

                                                    <span className="line-clamp-1 flex-1">{lesson.title}</span>

                                                    {lesson.content.duration && (
                                                        <span className="text-[10px] opacity-70">{lesson.content.duration}m</span>
                                                    )}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </ScrollArea>
        </>
    )
}
