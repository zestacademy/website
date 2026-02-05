
"use client"

import { Course } from "@/types/lms"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle, CheckCircle2, Lock, Clock, BarChart, BookOpen, FileText, Video, Trophy } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CourseLandingProps {
    course: Course
}

export default function CourseLanding({ course }: CourseLandingProps) {
    const router = useRouter()
    const [isEnrolled, setIsEnrolled] = useState(false) // Demo state
    const progress = 0;

    const handleEnroll = () => {
        setIsEnrolled(true)
    }

    const totalLessons = course.modules.reduce((acc, output) => acc + output.lessons.length, 0)

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-b from-blue-900/10 to-background pt-24 pb-12 border-b">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column: Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                    {course.level}
                                </Badge>
                                <Badge variant="outline">{course.duration}</Badge>
                                {course.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="opacity-70">{tag}</Badge>
                                ))}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{course.title}</h1>
                            <p className="text-xl text-muted-foreground">{course.subtitle}</p>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{course.modules.length} Modules</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span>{totalLessons} Lessons</span>
                                </div>
                                {course.certificateAvailable && (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <Trophy className="h-4 w-4" />
                                        <span>Certificate Included</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Floating Card (Desktop) */}
                        {/* Hidden on mobile, we'll put a sticky bottom bar or inline card instead */}
                    </div>
                </div>
            </div>

            <div className="container px-4 mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">

                    <Tabs defaultValue="curriculum" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                            <TabsTrigger value="description">Description</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-6 space-y-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p>{course.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="curriculum" className="mt-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold">Course Content</h2>
                                    <span className="text-muted-foreground text-sm">{totalLessons} lessons • {course.duration}</span>
                                </div>

                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {course.modules.map((module) => (
                                        <AccordionItem key={module.id} value={module.id} className="border rounded-lg bg-card px-4">
                                            <AccordionTrigger className="hover:no-underline py-4">
                                                <div className="flex items-center gap-4 text-left">
                                                    <div className="font-semibold text-lg">{module.title}</div>
                                                    <Badge variant="secondary" className="text-xs font-normal">
                                                        {module.lessons.length} lessons
                                                    </Badge>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4">
                                                <div className="space-y-2 pt-2">
                                                    {module.lessons.map((lesson) => (
                                                        <div key={lesson.id} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors group cursor-pointer border border-transparent hover:border-border"
                                                            onClick={() => {
                                                                // If enrolled, navigate to learn page
                                                                if (isEnrolled || lesson.isFree) {
                                                                    router.push(`/courses/${course.id}/learn/${lesson.id}`)
                                                                }
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                {lesson.type === 'video' ? (
                                                                    <PlayCircle className="h-4 w-4 text-blue-500" />
                                                                ) : lesson.type === 'quiz' ? (
                                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                ) : (
                                                                    <FileText className="h-4 w-4 text-orange-500" />
                                                                )}
                                                                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                                                    {lesson.title}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {lesson.content.duration && (
                                                                    <span className="text-xs text-muted-foreground">{lesson.content.duration} min</span>
                                                                )}
                                                                {(!isEnrolled && !lesson.isFree) && (
                                                                    <Lock className="h-3 w-3 text-muted-foreground/50" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <Card className="border-2 border-primary/10 shadow-lg overflow-hidden">
                            {/* <div className="aspect-video bg-muted relative">
                                <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <PlayCircle className="h-16 w-16 text-white opacity-90 drop-shadow-lg" />
                                </div>
                            </div> */}
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    {isEnrolled ? "Continue Learning" : "Start Learning"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {isEnrolled ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Progress</span>
                                            <span className="font-bold">{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                        <Button className="w-full text-lg" size="lg" onClick={() => {
                                            // Find first uncompleted or last accessed lesson
                                            router.push(`/courses/${course.id}/learn`)
                                        }}>
                                            Resume Course
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm text-muted-foreground p-2 bg-muted rounded-lg">
                                            <span className="flex items-center gap-2"><BarChart className="h-4 w-4" /> {course.level}</span>
                                            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {course.duration}</span>
                                        </div>
                                        <Button className="w-full text-lg font-semibold shadow-blue-500/20 shadow-xl" size="lg"
                                            onClick={handleEnroll}
                                        >
                                            Enroll for Free
                                        </Button>
                                        <p className="text-xs text-center text-muted-foreground">
                                            Instant access. No credit card required.
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-3 pt-4 border-t">
                                    <div className="font-semibold text-sm">This course includes:</div>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2"><Video className="h-4 w-4 text-blue-500" /> On-demand video</li>
                                        <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-orange-500" /> Articles & Resources</li>
                                        <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-green-500" /> Certificate of Completion</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
