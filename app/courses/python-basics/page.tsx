"use client"


import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CommentsSection } from "@/components/comments-section"
import { Clock, Calendar, Target, CheckCircle2, Loader2, PlayCircle, Trophy, Terminal, FileText, ExternalLink } from "lucide-react"
import { useCourseProgress } from "@/lib/hooks/useCourseProgress"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PythonBasicsCoursePage() {
    const router = useRouter()
    const { user, loading, progress, startCourse, toggleDayCompletion } = useCourseProgress("python-basics")

    const courseDays = [
        {
            day: 1,
            title: "Introduction + Setup",
            topics: [
                "What is Python? Where it is used?",
                "Install Python & VS Code",
                "Run your first Python program (print('Hello World'))",
                "Learn how to run Python from terminal"
            ],
            practice: "10 print statements"
        },
        {
            day: 2,
            title: "Variables + Data Types",
            topics: [
                "Variables",
                "Data Types: int, float, str, bool",
                "Type casting",
                "input() function"
            ],
            practice: "Create a calculator that takes user input"
        },
        {
            day: 3,
            title: "Operators",
            topics: [
                "Arithmetic, Assignment, Comparison, Logical",
                "Practical mini tasks"
            ],
            practice: "Find area of circle, Check if a number is positive/negative"
        },
        {
            day: 4,
            title: "Strings (Very Important)",
            topics: [
                "String indexing & slicing",
                "String methods (upper, lower, replace etc.)",
                "String formatting (f-strings)"
            ],
            practice: "Reverse a string"
        },
        {
            day: 5,
            title: "Lists",
            topics: [
                "Creating lists",
                "Indexing, Slicing",
                "Basic methods: append, remove, pop, sort",
                "Nested lists"
            ],
            practice: "Grocery list program"
        },
        {
            day: 6,
            title: "Tuples + Sets",
            topics: [
                "Why tuples are immutable",
                "Tuple functions",
                "Set basics",
                "Operations: union, intersection"
            ],
            practice: "Find common elements between two sets"
        },
        {
            day: 7,
            title: "Dictionary (Super Important)",
            topics: [
                "Key-value pairs",
                "Add, update, delete items",
                "Loop through dictionary"
            ],
            practice: "Student data system using dictionary"
        },
        {
            day: 8,
            title: "If-Else Conditions",
            topics: [
                "Simple if",
                "If-else",
                "If-elif-else ladder",
                "Nested if"
            ],
            practice: "Age verification, login system"
        },
        {
            day: 9,
            title: "Loops",
            topics: [
                "for loop",
                "while loop",
                "break, continue, pass"
            ],
            practice: "Number guessing game"
        },
        {
            day: 10,
            title: "Functions",
            topics: [
                "Defining functions",
                "Parameters, return value",
                "Default arguments",
                "Lambda functions"
            ],
            practice: "Create functions for calculator operations"
        },
        {
            day: 11,
            title: "File Handling",
            topics: [
                "Read & write files",
                "Append mode",
                "Using with open()"
            ],
            practice: "Write a diary entry program"
        },
        {
            day: 12,
            title: "Error Handling",
            topics: [
                "try, except, finally",
                "Common Python errors"
            ],
            practice: "Build a safe calculator (handles errors)"
        },
        {
            day: 13,
            title: "Modules & Packages",
            topics: [
                "Importing modules",
                "Built-in modules: math, random, datetime",
                "Create your own module"
            ],
            practice: "Dice game using random"
        },
        {
            day: 14,
            title: "Object-Oriented Programming - Part 1",
            topics: [
                "Class & object",
                "Constructor (__init__)",
                "Instance & class variables"
            ],
            practice: "Create a class"
        },
        {
            day: 15,
            title: "OOP - Part 2",
            topics: [
                "Inheritance",
                "Method overriding",
                "Polymorphism",
                "Encapsulation"
            ],
            practice: "Build a shape calculator (circle, rectangle)"
        },
        {
            day: 16,
            title: "Python Advanced Concepts",
            topics: [
                "List comprehension",
                "Generators",
                "Iterators",
                "Decorators (basic)"
            ],
            practice: "Write list comprehension for filtering even numbers"
        },
        {
            day: 17,
            title: "Working With APIs",
            topics: [
                "What is API",
                "requests module",
                "Fetch data from a public API",
                "Parse JSON"
            ],
            practice: "Build a weather data fetcher"
        },
        {
            day: 18,
            title: "Data Handling + Pandas",
            topics: [
                "Install pandas",
                "Read CSV",
                "Data cleaning basics"
            ],
            practice: "Load a CSV and print summary"
        },
        {
            day: 19,
            title: "Mini Project Day",
            topics: [
                "Choose any 1 small project:"
            ],
            projects: [
                "To-Do App (CLI)",
                "Contact book",
                "Password generator",
                "Expense tracker",
                "Quiz game"
            ],
            practice: "Complete one mini project"
        },
        {
            day: 20,
            title: "Final Project (Advanced)",
            topics: [
                "Pick one:"
            ],
            projects: [
                {
                    option: "Option A: Python Automation",
                    examples: ["Automate WhatsApp message", "Automate file organizer"]
                },
                {
                    option: "Option B: Web Scraping",
                    examples: ["requests + BeautifulSoup", "Scrape product prices"]
                },
                {
                    option: "Option C: Flask Mini App",
                    examples: ["Build a small web app with Flask", "Example: Notes app"]
                }
            ],
            practice: "Complete one advanced project"
        }
    ]

    const bonusTips = [
        "Practice daily on HackerRank/CodeChef/LeetCode (Easy)",
        "Build 3-5 small projects",
        "Learn Git + GitHub basics"
    ]

    const completionPercentage = progress ? Math.round((progress.completedDays.length / courseDays.length) * 100) : 0
    const isEnrolled = !!progress

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background border-b relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Badge className="bg-green-500 text-white border-0">Beginner Friendly</Badge>
                        <Badge className="bg-blue-500 text-white border-0">20 Days</Badge>
                        <Badge className="bg-purple-500 text-white border-0">Basic to Advanced</Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        20-Day Python Learning Course
                    </h1>
                    <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                        Complete Python journey from basics to advanced concepts. Build real projects and master Python in just 20 days!
                    </p>

                    {/* Action Area */}
                    <div className="flex flex-col items-center justify-center gap-6 mt-8">
                        {loading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        ) : !user ? (
                            <div className="text-center space-y-4">
                                <p className="text-muted-foreground">Log in to track your progress and earn certificates.</p>
                                <Button size="lg" onClick={() => router.push('/login')} className="font-semibold shadow-lg">
                                    Login to Start Learning
                                </Button>
                            </div>
                        ) : !isEnrolled ? (
                            <div className="text-center space-y-4">
                                <Button size="lg" onClick={() => startCourse(courseDays.length)} className="font-semibold shadow-lg text-lg px-8 bg-blue-600 hover:bg-blue-700">
                                    <PlayCircle className="mr-2 h-5 w-5" /> Start This Course
                                </Button>
                                <p className="text-sm text-muted-foreground">Join 1,200+ students learning Python today.</p>
                            </div>
                        ) : (
                            <div className="w-full max-w-md space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>Your Progress</span>
                                    <span>{completionPercentage}% ({progress.completedDays.length}/{courseDays.length} Days)</span>
                                </div>
                                <Progress value={completionPercentage} className="h-3" />
                                {completionPercentage === 100 && (
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2 justify-center mt-4 border border-green-200 dark:border-green-800">
                                        <Trophy className="h-5 w-5" />
                                        <span className="font-bold">Course Completed! Great job!</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>



                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                        <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
                            <Clock className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-2xl font-bold">1-2 hours</p>
                                <p className="text-sm text-muted-foreground">Per day</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
                            <Calendar className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-2xl font-bold">20 Days</p>
                                <p className="text-sm text-muted-foreground">Total duration</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
                            <Target className="h-8 w-8 text-purple-500" />
                            <div>
                                <p className="text-2xl font-bold">5+ Projects</p>
                                <p className="text-sm text-muted-foreground">Hands-on practice</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-background flex-1">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Daily Learning Path</h2>
                            <p className="text-muted-foreground">
                                Follow this structured 20-day curriculum to master Python programming.
                            </p>
                        </div>
                    </div>

                    {/* Course Days */}
                    <div className="space-y-6">
                        {courseDays.map((day, idx) => {
                            const isCompleted = progress?.completedDays.includes(day.day) || false

                            return (
                                <Card key={idx} className={`transition-all ${isCompleted ? 'border-green-500/50 bg-green-50/10' : 'hover:border-blue-500/50'}`}>
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
                                                {isCompleted ? <CheckCircle2 className="h-8 w-8" /> : day.day}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className={`text-2xl mb-2 ${isCompleted ? 'text-green-700 dark:text-green-400' : ''}`}>
                                                            Day {day.day}: {day.title}
                                                        </CardTitle>
                                                        <div className="flex gap-2">
                                                            {day.day === 4 && (
                                                                <Badge variant="outline" className="text-red-500 border-red-500">Very Important</Badge>
                                                            )}
                                                            {day.day === 7 && (
                                                                <Badge variant="outline" className="text-red-500 border-red-500">Super Important</Badge>
                                                            )}
                                                            {isCompleted && (
                                                                <Badge variant="default" className="bg-green-500 hover:bg-green-600">Completed</Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {isEnrolled && (
                                                        <Button
                                                            variant={isCompleted ? "outline" : "default"}
                                                            onClick={() => toggleDayCompletion(day.day)}
                                                            className={isCompleted ? "border-green-500 text-green-600 hover:bg-green-50" : ""}
                                                        >
                                                            {isCompleted ? "Mark Incomplete" : "Mark as Done"}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Topics */}
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                                Topics to Learn
                                            </h4>
                                            <ul className="space-y-1 ml-6">
                                                {day.topics.map((topic, topicIdx) => (
                                                    <li key={topicIdx} className="text-muted-foreground list-disc">
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Projects for Days 19 & 20 */}
                                        {day.projects && (
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">Project Options</h4>
                                                {typeof day.projects[0] === 'string' ? (
                                                    <ul className="space-y-1 ml-6">
                                                        {(day.projects as string[]).map((project, projectIdx) => (
                                                            <li key={projectIdx} className="text-muted-foreground list-disc">
                                                                {project}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {(day.projects as { option: string; examples: string[] }[]).map((projectOption, projectIdx) => (
                                                            <div key={projectIdx} className="ml-4">
                                                                <p className="font-medium text-foreground">{projectOption.option}</p>
                                                                <ul className="ml-6 mt-1 space-y-1">
                                                                    {projectOption.examples.map((example, exampleIdx) => (
                                                                        <li key={exampleIdx} className="text-muted-foreground list-disc text-sm">
                                                                            {example}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <Separator />

                                        {/* Practice */}
                                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                                            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                <Target className="h-4 w-4 text-blue-500" />
                                                Practice Task
                                            </h4>
                                            <p className="text-foreground">{day.practice}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Bonus Tips Section */}
                    <Card className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <span>🎯</span> Bonus Tips
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {bonusTips.map((tip, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl">What&apos;s Next?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                After completing this 20-day course, you&apos;ll have a solid foundation in Python programming.
                                Here are some recommended next steps:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>Build 3-5 more complex projects to solidify your learning</li>
                                <li>Contribute to open-source Python projects on GitHub</li>
                                <li>Learn Python frameworks like Django or Flask for web development</li>
                                <li>Explore data science libraries like NumPy, Pandas, and Matplotlib</li>
                                <li>Practice algorithmic problems on coding platforms</li>
                                <li>Join Python communities and attend meetups</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Python Resources Section */}
                    <Card className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <FileText className="h-6 w-6 text-blue-500" />
                                Python Handwritten Notes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Comprehensive handwritten notes covering Python fundamentals and advanced concepts.
                                Perfect companion to this course for revision and quick reference.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <Link href="/pdfs/python-handwritten-notes.pdf" target="_blank" rel="noopener noreferrer">
                                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                                        <FileText className="h-4 w-4" />
                                        Download Python Notes (PDF)
                                    </Button>
                                </Link>
                            </div>
                            <Separator />
                            <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                <p className="text-sm font-semibold text-foreground mb-2">Credits:</p>
                                <p className="text-sm text-muted-foreground">
                                    These notes were created and shared by{" "}
                                    <Link
                                        href="https://www.linkedin.com/in/dheerendra-singh45/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1"
                                    >
                                        Dheerendra Singh
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                    . Special thanks for making this resource available to the community.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Comments Section */}
                    <div className="mt-12">
                        <CommentsSection courseId="python-basics" />
                    </div>
                </div>
            </section>

            {/* Floating Compiler Button */}
            <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button
                    size="lg"
                    onClick={() => window.open("https://zestcompilers.vercel.app/compilers/python", "_blank")}
                    className="gap-2 shadow-2xl rounded-full px-6 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all text-white border-2 border-white/20"
                >
                    <Terminal className="h-5 w-5" />
                    <span className="hidden sm:inline">Python Compiler</span>
                </Button>
            </div>
        </div>
    )
}
