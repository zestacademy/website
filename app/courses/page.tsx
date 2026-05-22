"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, BookOpen, Clock, Star, Award, Compass, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { getAllCourses } from "@/services/lmsService"
import { LmsCourse } from "@/types/lms"

export default function CoursesCatalogPage() {
  const [courses, setCourses] = useState<LmsCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllCourses()
        setCourses(data)
      } catch (err) {
        console.error("Failed to load courses:", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesLevel
  })

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 animate-fadeIn">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden py-20 px-4 border-b border-border bg-gradient-to-br from-indigo-950/20 via-background to-sky-950/25">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />

        <div className="container max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            Empowering Tech Innovation
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Structured Technology & <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">Engineering Academics</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
            Ditch fragmented tutorials. Access curated, industrial-grade pathways structured exactly like university modules, engineered to transition you from core basics to advanced mastery.
          </p>

          {/* Catalog Search & Filters Controls */}
          <div className="max-w-xl mx-auto relative mb-6">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search pathways, skillsets, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-card/60 border border-border rounded-xl text-foreground text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-card focus-visible:border-transparent transition-all shadow-md"
            />
          </div>

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  selectedLevel === level
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20 scale-105"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/80 border border-border"
                }`}
              >
                {level === "all" ? "All Pathways" : level}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways List Grid */}
      <section className="container max-w-6xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <Compass className="h-5 w-5 text-sky-400" />
              Academic Pathways
            </h2>
            <p className="text-muted-foreground text-xs mt-1">Explore structured syllabus programs designed for direct skillset acquisition.</p>
          </div>
          <Badge variant="outline" className="px-3 py-1 font-semibold text-xs border border-border bg-card">
            {filteredCourses.length} {filteredCourses.length === 1 ? "Pathway" : "Pathways"}
          </Badge>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card/50 rounded-3xl p-5 border border-border space-y-4 animate-pulse">
                <div className="h-44 bg-muted rounded-2xl w-full" />
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-6 bg-muted rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-card/20 rounded-3xl border border-dashed border-border p-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-bold">No Pathways Found</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
              We couldn't find any courses matching your search. Try resetting your query or exploring other difficulty tiers.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedLevel("all")
              }}
              variant="outline"
              className="mt-6"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const levelColorMap: Record<string, string> = {
                beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
                advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20"
              }

              return (
                <Link key={course.id} href={`/courses/${course.id}`} className="group">
                  <Card className="h-full bg-card/40 border border-border backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 flex flex-col">
                    {/* Thumbnail wrapper */}
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <Image
                        src={course.thumbnailUrl}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                      
                      {/* Floating Difficulty Tag */}
                      <Badge className={`absolute top-4 left-4 border px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full shadow-md ${levelColorMap[course.level]}`}>
                        {course.level}
                      </Badge>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {course.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-extrabold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-xs leading-relaxed mb-6 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Metrics Footer */}
                      <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                          <span>{course.rating || 4.7}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
