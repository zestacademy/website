
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Trophy, BookOpen } from "lucide-react"
import { useQuiz } from "@/lib/hooks/useQuiz"

interface MCQ {
    question: string
    options: string[] // e.g., ["5 billion", "10 billion", ...]
    answer: string    // e.g., "c"
}

interface QuizSectionProps {
    weekNumber: number
    title: string
    mcqs: MCQ[]
    courseId: string
    isEnrolled: boolean
}

export function QuizSection({ weekNumber, title, mcqs, courseId, isEnrolled }: QuizSectionProps) {
    const { params: { user, quizScores }, saveScore } = useQuiz(courseId)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [localResult, setLocalResult] = useState<{ score: number, total: number, passed: boolean } | null>(null)

    const existingScore = quizScores?.[weekNumber]

    // Initialize local result if existing score is found
    useEffect(() => {
        if (existingScore) {
            setLocalResult(existingScore)
        }
    }, [existingScore])

    const handleOptionSelect = (questionIdx: number, optionIdx: number) => {
        if (existingScore || localResult) return // Prevent changing if already done (unless we add retake)

        const optionLetter = String.fromCharCode(97 + optionIdx) // 0 -> 'a', 1 -> 'b'
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIdx]: optionLetter
        }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        let correctCount = 0

        mcqs.forEach((mcq, idx) => {
            if (selectedAnswers[idx] === mcq.answer) {
                correctCount++
            }
        })

        const total = mcqs.length

        try {
            await saveScore(weekNumber, correctCount, total)
            setLocalResult({
                score: correctCount,
                total: total,
                passed: correctCount / total >= 0.6
            })
        } catch (error) {
            console.error("Failed to submit quiz:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const isQuizComplete = !!localResult

    if (!isEnrolled) {
        return (
            <div className="bg-muted/30 p-6 rounded-lg border border-dashed text-center">
                <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3 opacity-50" />
                <h4 className="font-semibold text-lg mb-2">Quiz Locked</h4>
                <p className="text-muted-foreground">Start the course to unlock this assignment and track your progress.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {isQuizComplete && (
                <div className={`p-6 rounded-lg border animate-slideUp ${localResult.passed ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900' : 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full animate-scaleIn ${localResult.passed ? 'bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-orange-200 dark:bg-orange-900 text-orange-700 dark:text-orange-300'}`}>
                            {localResult.passed ? <Trophy className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">
                                {localResult.passed ? "Assignment Completed!" : "Assignment Completed"}
                            </h3>
                            <p className="text-muted-foreground">
                                You scored <span className="font-bold text-foreground">{localResult.score}/{localResult.total}</span>
                                {localResult.passed ? " Great job!" : " Keep learning!"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {mcqs.map((mcq, idx) => {
                    const isCorrect = mcq.answer === selectedAnswers[idx]
                    const showFeedback = isQuizComplete

                    return (
                        <Card key={idx} className={`shadow-sm ${showFeedback ? (isCorrect ? 'border-green-200 dark:border-green-900' : 'border-red-200 dark:border-red-900') : ''}`}>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-medium flex items-start gap-3">
                                    <span className="text-muted-foreground min-w-[24px]">{idx + 1}.</span>
                                    <span>{mcq.question}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mcq.options.map((option, optIdx) => {
                                        const optionLetter = String.fromCharCode(97 + optIdx)
                                        const isSelected = selectedAnswers[idx] === optionLetter
                                        const isAnswer = mcq.answer === optionLetter

                                        let optionStyle = "hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-200"

                                        if (showFeedback) {
                                            if (isAnswer) {
                                                optionStyle = "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-900 dark:text-green-100 animate-scaleIn"
                                            } else if (isSelected && !isAnswer) {
                                                optionStyle = "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-900 dark:text-red-100 animate-shake"
                                            } else {
                                                optionStyle = "opacity-50"
                                            }
                                        } else if (isSelected) {
                                            optionStyle = "bg-primary text-primary-foreground ring-2 ring-primary"
                                        }

                                        return (
                                            <div
                                                key={optIdx}
                                                onClick={() => handleOptionSelect(idx, optIdx)}
                                                className={`
                                                    relative flex items-center gap-3 p-3 rounded-lg border transition-all
                                                    ${optionStyle}
                                                `}
                                            >
                                                <div className={`
                                                    w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium
                                                    ${isSelected ? 'bg-background text-primary border-transparent' : 'border-muted-foreground/30'}
                                                    ${showFeedback && isAnswer ? 'bg-green-500 text-white border-transparent' : ''}
                                                    ${showFeedback && isSelected && !isAnswer ? 'bg-red-500 text-white border-transparent' : ''}
                                                `}>
                                                    {optionLetter.toUpperCase()}
                                                </div>
                                                <span className="flex-1 text-sm">{option}</span>

                                                {showFeedback && isAnswer && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                                                {showFeedback && isSelected && !isAnswer && <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {!isQuizComplete && (
                <div className="flex justify-end pt-4">
                    <Button
                        size="lg"
                        onClick={handleSubmit}
                        disabled={Object.keys(selectedAnswers).length < mcqs.length || isSubmitting}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        {isSubmitting ? "Submitting..." : user ? "Submit Assignment" : "Login to Submit"}
                    </Button>
                </div>
            )}
        </div>
    )
}
