import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, BookOpen } from "lucide-react"
import Link from "next/link"

import { courses } from "@/lib/courses"

export function AllCourses() {
    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold">Explore Courses</h2>
                    <Button variant="link" className="text-blue-500">View All Courses</Button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">All Courses</Button>
                    <Button variant="outline" className="rounded-full">Web Development</Button>
                    <Button variant="outline" className="rounded-full">Data Science</Button>
                    <Button variant="outline" className="rounded-full">Cybersecurity</Button>
                    <Button variant="outline" className="rounded-full">Mobile Dev</Button>
                    <Button variant="outline" className="rounded-full">Design</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, idx) => {
                        const Content = (
                            <>
                                <div className="h-40 relative overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-60 z-10 transition-opacity group-hover:opacity-80`} />
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <Badge className={`absolute top-4 left-4 z-20 text-white border-0 ${course.level === 'Beginner' ? 'bg-green-500' : course.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                        {course.level}
                                    </Badge>
                                </div>

                                <div className="p-5 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{course.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>
                                    </div>

                                    {/* Progress dots or visual element */}
                                    <div className="flex gap-1 h-1.5 w-full">
                                        <div className="flex-1 bg-blue-600 rounded-full" />
                                        <div className="flex-1 bg-blue-600/50 rounded-full" />
                                        <div className="flex-1 bg-muted rounded-full" />
                                        <div className="flex-1 bg-muted rounded-full" />
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="h-3.5 w-3.5" />
                                            <span>{course.courses} {course.duration.includes("Days") ? "Days" : course.duration.includes("Weeks") ? "Lectures" : "Courses"}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );

                        return course.link ? (
                            <Link key={idx} href={course.link} className="block h-full">
                                <Card interactive className="h-full overflow-hidden border-border group hover:border-blue-500/50 p-0">
                                    {Content}
                                </Card>
                            </Link>
                        ) : (
                            <div key={idx} className="block h-full">
                                <Card interactive className="h-full overflow-hidden border-border group hover:border-blue-500/50 p-0">
                                    {Content}
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
