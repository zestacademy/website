"use client"

import { Lesson } from "@/types/lms"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CheckCircle2, XCircle, AlertCircle, Loader2, Check } from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { useAuth } from "@/hooks/useAuth"

interface LessonUIProps {
    lesson: Lesson
    courseId: string
}

export default function LessonUI({ lesson, courseId }: LessonUIProps) {
    const { user } = useAuth()
    const { content } = lesson
    const [completing, setCompleting] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        const checkStatus = async () => {
            if (!user || !courseId) return
            const enrollment = await LMSService.getEnrollment(user.uid, courseId)
            if (enrollment?.progress?.completedLessons?.includes(lesson.id)) {
                setIsCompleted(true)
            }
        }
        checkStatus()
    }, [user, courseId, lesson.id])

    const handleComplete = async () => {
        if (!user || !courseId || isCompleted) return
        setCompleting(true)
        try {
            const success = await LMSService.completeLesson(user.uid, courseId, lesson.id)
            if (success) {
                setIsCompleted(true)
            }
        } catch (error) {
            console.error("Error completing lesson:", error)
        } finally {
            setCompleting(false)
        }
    }

    return (
        <div className="space-y-8">
            {content.type === 'video' && content.videoId && (
                <div className="space-y-6">
                    <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg border border-border">
                        <iframe
                            className="w-full h-full"
                            src={content.videoId.includes("youtube.com") || content.videoId.includes("youtu.be") 
                                ? content.videoId.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")
                                : `https://www.youtube.com/embed/${content.videoId}`}
                            title={lesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {content.type === 'quiz' && content.questions && (
                <QuizInterface 
                    questions={content.questions} 
                    onComplete={handleComplete}
                    isAlreadyCompleted={isCompleted}
                />
            )}

            {content.type === 'text' && (
                <div className="prose dark:prose-invert max-w-none bg-card p-6 md:p-10 rounded-xl border border-border">
                    {content.markdown?.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.replace('# ', '')}</h1>
                        if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2>
                        if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc">{line.replace('- ', '')}</li>
                        return <p key={i} className="mb-4 leading-relaxed">{line}</p>
                    })}
                </div>
            )}

            {content.type !== 'quiz' && (
                <div className="flex items-center justify-between p-6 bg-muted/50 rounded-xl border border-dashed">
                    <div>
                        <h3 className="font-bold">Finished this lesson?</h3>
                        <p className="text-sm text-muted-foreground">Mark it as complete to track your progress.</p>
                    </div>
                    <Button 
                        onClick={handleComplete} 
                        disabled={completing || isCompleted}
                        className={isCompleted ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                    >
                        {completing ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : isCompleted ? (
                            <Check className="h-4 w-4 mr-2" />
                        ) : null}
                        {isCompleted ? "Completed" : "Mark as Complete"}
                    </Button>
                </div>
            )}
        </div>
    )
}

function QuizInterface({ questions, onComplete, isAlreadyCompleted }: { questions: any[], onComplete: () => void, isAlreadyCompleted: boolean }) {
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [submitted, setSubmitted] = useState(isAlreadyCompleted)

    const handleSelect = (qId: string, optionIdx: number) => {
        if (submitted) return
        setAnswers(prev => ({ ...prev, [qId]: optionIdx }))
    }

    const handleSubmit = () => {
        setSubmitted(true)
        const score = questions.reduce((acc, q) => {
            return acc + (answers[q.id] === q.correctOptionIndex ? 1 : 0)
        }, 0)
        
        // Only mark as complete if they passed (e.g., > 70%)
        if (score / questions.length >= 0.7) {
            onComplete()
        }
    }

    const score = questions.reduce((acc, q) => {
        return acc + (answers[q.id] === q.correctOptionIndex ? 1 : 0)
    }, 0)

    const passed = score / questions.length >= 0.7

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Lesson Quiz</h2>
                {submitted && (
                    <Badge variant={passed ? "default" : "destructive"} className={passed ? "bg-green-500" : ""}>
                        {passed ? "PASSED" : "FAILED"}
                    </Badge>
                )}
            </div>

            {questions.map((q, idx) => {
                const isCorrect = submitted && answers[q.id] === q.correctOptionIndex
                const isWrong = submitted && answers[q.id] !== undefined && answers[q.id] !== q.correctOptionIndex

                return (
                    <Card key={q.id} className={submitted ? (isCorrect ? "border-green-500/50" : isWrong ? "border-red-500/50" : "") : ""}>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-medium mb-4">
                                {idx + 1}. {q.question}
                            </h3>
                            <div className="space-y-3">
                                {q.options.map((option: string, optIdx: number) => (
                                    <div
                                        key={optIdx}
                                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between
                                            ${answers[q.id] === optIdx ? 'border-primary bg-primary/5' : 'hover:bg-muted'}
                                            ${submitted && optIdx === q.correctOptionIndex ? 'border-green-500 bg-green-500/10' : ''}
                                            ${submitted && answers[q.id] === optIdx && optIdx !== q.correctOptionIndex ? 'border-red-500 bg-red-500/10' : ''}
                                        `}
                                        onClick={() => handleSelect(q.id, optIdx)}
                                    >
                                        <span>{option}</span>
                                        {submitted && optIdx === q.correctOptionIndex && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                        {submitted && answers[q.id] === optIdx && optIdx !== q.correctOptionIndex && <XCircle className="h-5 w-5 text-red-500" />}
                                    </div>
                                ))}
                            </div>
                            {submitted && q.explanation && (
                                <div className="mt-4 p-3 bg-muted rounded-md text-sm text-muted-foreground flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>{q.explanation}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )
            })}

            {!submitted ? (
                <Button size="lg" className="w-full" onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length}>
                    Submit Quiz
                </Button>
            ) : (
                <div className={`p-6 rounded-xl flex items-center justify-between border ${passed ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                    <div>
                        <p className={`font-bold text-xl ${passed ? "text-green-600" : "text-red-600"}`}>
                            You scored {score} / {questions.length} ({Math.round(score/questions.length*100)}%)
                        </p>
                        <p className="text-muted-foreground mt-1">
                            {passed ? "Excellent! You've successfully completed this lesson." : "You need at least 70% to pass this quiz. Try again to complete the lesson."}
                        </p>
                    </div>
                    {!passed && (
                        <Button variant="outline" onClick={() => {
                            setAnswers({})
                            setSubmitted(false)
                        }}>
                            Retry Quiz
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}
