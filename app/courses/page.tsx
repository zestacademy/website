"use client"

import { Search, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Course } from '../../types/lms'

const categoryOptions = ['All', 'Programming', 'Hardware', 'AI', 'Security']
const difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced']

function CoursesPage() {
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [search, setSearch] = useState('')
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "courses"), where("status", "==", "published"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course))
      setCourses(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = category === 'All' || course.category === category
      const matchesDifficulty = difficulty === 'All' || course.level === difficulty
      const queryStr = search.trim().toLowerCase()
      const matchesSearch = course.title?.toLowerCase().includes(queryStr) || course.instructorName?.toLowerCase().includes(queryStr)

      return matchesCategory && matchesDifficulty && matchesSearch
    })
  }, [category, difficulty, search, courses])

  return (
    <div className="space-y-10 pb-8 sm:space-y-14">
      <section className="section-shell">
        <div className="hero-panel">
          <h1 className="text-4xl font-semibold sm:text-5xl dark:text-gray-100">Find The Right Course For Your Next Leap</h1>
          <p className="mt-3 max-w-3xl text-ink/70 dark:text-gray-300">
            Filter by category, skill level, and goals. Every program includes guided projects and mentor support.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_2fr]">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="input-clean"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className="input-clean"
            >
              {difficultyOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <label className="relative">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50 dark:text-gray-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses or instructors"
                className="input-clean pl-10 pr-3"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex h-40 items-center justify-center">
              <span className="animate-pulse text-lg text-ink/60 dark:text-slate-400">Loading courses...</span>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="col-span-full flex h-40 items-center justify-center">
              <span className="text-lg text-ink/60 dark:text-slate-400">No courses found matching your criteria.</span>
            </div>
          ) : filteredCourses.map((course) => (
            <article key={course.id} className="surface-card p-0">
              <div className="relative">
                <img src={course.thumbnail} alt={course.title} className="h-44 w-full rounded-t-2xl object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary dark:bg-slate-700/90 dark:text-sky-400">
                  {course.level}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-semibold leading-tight dark:text-slate-100">{course.title}</h2>
                <p className="mt-1 text-sm text-ink/65 dark:text-slate-400">Instructor: {course.instructorName}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1 text-amber-500">
                    <Star size={14} className="fill-amber-500" /> {course.rating || 0}
                  </span>
                  <span className="text-ink/65 dark:text-slate-400">{course.duration}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-primary dark:text-sky-400">{course.price === 0 ? 'Free' : `$${course.price}`}</p>
                  <Link href={`/courses/${course.slug || course.id}`} className="btn-primary">View Course</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CoursesPage
