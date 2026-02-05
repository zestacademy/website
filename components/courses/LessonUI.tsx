
"use client"

import { Lesson } from "@/types/lms"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface LessonUIProps {
    lesson: Lesson
}

export default function LessonUI({ lesson }: LessonUIProps) {
    const { content } = lesson

    if (content.type === 'video' && content.videoId) {
        // Simple YouTube embed
        // Assuming videoId is a URL or ID. If URL, extract ID or use generic iframe
        const isUrl = content.videoId.startsWith("http")
        return (
            <div className="space-y-6">
                <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        className="w-full h-full"
                        src={content.videoId.replace("watch?v=", "embed/")}
                        title={lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                    {/* Resources or summary could go here */}
                </div>
            </div>
        )
    }

    if (content.type === 'quiz' && content.questions) {
        return <QuizInterface questions={content.questions} />
    }

    return (
        <div className="prose dark:prose-invert max-w-none">
            {content.markdown?.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.replace('# ', '')}</h1>
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2>
                if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>
                return <p key={i} className="mb-4">{line}</p>
            })}
        </div>
    )
}

function QuizInterface({ questions }: { questions: any[] }) {
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [submitted, setSubmitted] = useState(false)

    const handleSelect = (qId: string, optionIdx: number) => {
        if (submitted) return
        setAnswers(prev => ({ ...prev, [qId]: optionIdx }))
    }

    const handleSubmit = () => {
        setSubmitted(true)
    }

    const score = questions.reduce((acc, q) => {
        return acc + (answers[q.id] === q.correctOptionIndex ? 1 : 0)
    }, 0)

    return (
        <div className="space-y-8">
            {questions.map((q, idx) => {
                const isCorrect = submitted && answers[q.id] === q.correctOptionIndex
                const isWrong = submitted && answers[q.id] !== undefined && answers[q.id] !== q.correctOptionIndex

                return (
                    <Card key={q.id}>
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
                                            ${submitted && optIdx === q.correctOptionIndex ? 'border-green-500 bg-green-50/10' : ''}
                                            ${submitted && answers[q.id] === optIdx && optIdx !== q.correctOptionIndex ? 'border-red-500 bg-red-50/10' : ''}
                                        `}
                                        onClick={() => handleSelect(q.id, optIdx)}
                                    >
                                        <span>{option}</span>
                                        {submitted && optIdx === q.correctOptionIndex && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                        {submitted && answers[q.id] === optIdx && optIdx !== q.correctOptionIndex && <XCircle className="h-5 w-5 text-red-500" />}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )
            })}

            {!submitted ? (
                <Button size="lg" onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length}>
                    Submit Quiz
                </Button>
            ) : (
                <div className="p-4 rounded-lg bg-secondary flex items-center justify-between">
                    <div>
                        <p className="font-bold text-lg">You scored {score} / {questions.length}</p>
                        <p className="text-muted-foreground">Great job! Continue to the next lesson.</p>
                    </div>
                    {/* Retry button could go here */}
                </div>
            )}
        </div>
    )
}
