"use client"

import { useState, useEffect, useCallback } from "react"
import { LMSService } from "@/services/lms-service"
import {
    Course,
    Enrollment,
    LiveSession,
    AttendanceRecord,
    Certificate,
    UserCourseProgress,
    UserRole
} from "@/types/lms"
import { useAuth } from "./useAuth"

export function useLMS() {
    const { user } = useAuth()
    const [courses, setCourses] = useState<Course[]>([])
    const [userEnrollments, setUserEnrollments] = useState<Enrollment[]>([])
    const [loading, setLoading] = useState(false)

    // Load all published courses
    const loadCourses = useCallback(async () => {
        setLoading(true)
        try {
            const allCourses = await LMSService.getAllCourses()
            setCourses(allCourses)
        } catch (error) {
            console.error("Error loading courses:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    // Load user enrollments
    const loadUserEnrollments = useCallback(async () => {
        if (!user?.uid) return

        setLoading(true)
        try {
            const enrollments = await LMSService.getUserEnrollments(user.uid)
            setUserEnrollments(enrollments)
        } catch (error) {
            console.error("Error loading enrollments:", error)
        } finally {
            setLoading(false)
        }
    }, [user?.uid])

    // Check if user is enrolled in a course
    const isEnrolled = useCallback((courseId: string) => {
        return userEnrollments.some(enrollment => enrollment.courseId === courseId)
    }, [userEnrollments])

    // Check if user can access a course
    const canAccessCourse = useCallback(async (courseId: string) => {
        if (!user?.uid) return false
        return await LMSService.canAccessCourse(user.uid, courseId)
    }, [user?.uid])

    // Enroll in a course
    const enrollInCourse = useCallback(async (courseId: string, paymentId?: string) => {
        if (!user?.uid) return null

        try {
            const enrollmentId = await LMSService.enrollInCourse(user.uid, courseId, paymentId)
            if (enrollmentId) {
                await loadUserEnrollments() // Refresh enrollments
            }
            return enrollmentId
        } catch (error) {
            console.error("Error enrolling in course:", error)
            return null
        }
    }, [user?.uid, loadUserEnrollments])

    // Get course by ID
    const getCourse = useCallback(async (courseId: string) => {
        return await LMSService.getCourseById(courseId)
    }, [])

    // Get enrollment details
    const getEnrollment = useCallback(async (courseId: string) => {
        if (!user?.uid) return null
        return await LMSService.getEnrollment(user.uid, courseId)
    }, [user?.uid])

    // Update progress
    const updateProgress = useCallback(async (courseId: string, progress: Partial<UserCourseProgress>) => {
        if (!user?.uid) return false
        return await LMSService.updateProgress(user.uid, courseId, progress)
    }, [user?.uid])

    // Get live sessions for a course
    const getLiveSessions = useCallback(async (courseId: string) => {
        return await LMSService.getLiveSessionsByCourse(courseId)
    }, [])

    // Record attendance
    const recordAttendance = useCallback(async (attendanceData: Omit<AttendanceRecord, 'id'>) => {
        return await LMSService.recordAttendance(attendanceData)
    }, [])

    // Get user certificates
    const getUserCertificates = useCallback(async () => {
        if (!user?.uid) return []
        return await LMSService.getUserCertificates(user.uid)
    }, [user?.uid])

    // Check user role
    const hasRole = useCallback((role: UserRole) => {
        return String(user?.role || '').toLowerCase() === role
    }, [user?.role])

    const isStudent = hasRole('student')
    const isInstructor = hasRole('instructor')
    const isAdmin = hasRole('admin')

    // Initialize data on mount
    useEffect(() => {
        loadCourses()
        if (user?.uid) {
            loadUserEnrollments()
        }
    }, [loadCourses, loadUserEnrollments, user?.uid])

    return {
        // Data
        courses,
        userEnrollments,
        loading,

        // Methods
        loadCourses,
        loadUserEnrollments,
        isEnrolled,
        canAccessCourse,
        enrollInCourse,
        getCourse,
        getEnrollment,
        updateProgress,
        getLiveSessions,
        recordAttendance,
        getUserCertificates,

        // Role checks
        hasRole,
        isStudent,
        isInstructor,
        isAdmin
    }
}