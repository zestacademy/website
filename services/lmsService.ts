import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db, isFirebaseInitialized } from '../lib/firebase'
import { LmsCourse, LmsChapter, LmsLesson, LmsEnrollment, LmsCertificate } from '../types/lms'

function ensureDatabaseReady() {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firestore is not configured. Database connection is required.')
  }
}

// Load courses from Firestore database
export async function getAllCourses(): Promise<LmsCourse[]> {
  try {
    ensureDatabaseReady()
    const coursesSnapshot = await getDocs(collection(db!, 'lmsCourses'))
    const courses: LmsCourse[] = []
    coursesSnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() } as LmsCourse)
    })
    return courses
  } catch (e) {
    console.error("getAllCourses: Firestore connection failed.", e)
    return []
  }
}

export async function getCourseById(courseId: string): Promise<LmsCourse | null> {
  try {
    ensureDatabaseReady()
    const courseSnap = await getDoc(doc(db!, 'lmsCourses', courseId))
    if (!courseSnap.exists()) {
      return null
    }
    return { id: courseSnap.id, ...courseSnap.data() } as LmsCourse
  } catch (e) {
    console.error("getCourseById: Firestore query failed.", e)
    return null
  }
}

export async function getCourseChapters(courseId: string): Promise<LmsChapter[]> {
  try {
    ensureDatabaseReady()
    const chaptersSnap = await getDocs(
      query(collection(db!, 'lmsChapters'), where('courseId', '==', courseId), orderBy('order', 'asc'))
    )
    const chapters: LmsChapter[] = []
    chaptersSnap.forEach((doc) => {
      chapters.push({ id: doc.id, ...doc.data() } as LmsChapter)
    })
    return chapters
  } catch (e) {
    console.error("getCourseChapters: Firestore query failed.", e)
    return []
  }
}

export async function getLessonById(lessonId: string): Promise<LmsLesson | null> {
  try {
    ensureDatabaseReady()
    const lessonSnap = await getDoc(doc(db!, 'lmsLessons', lessonId))
    if (!lessonSnap.exists()) {
      return null
    }
    return { id: lessonSnap.id, ...lessonSnap.data() } as LmsLesson
  } catch (e) {
    console.error("getLessonById: Firestore query failed.", e)
    return null
  }
}

export async function getChapterLessons(chapterId: string): Promise<LmsLesson[]> {
  try {
    ensureDatabaseReady()
    const lessonsSnap = await getDocs(
      query(collection(db!, 'lmsLessons'), where('chapterId', '==', chapterId), orderBy('order', 'asc'))
    )
    const lessons: LmsLesson[] = []
    lessonsSnap.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() } as LmsLesson)
    })
    return lessons
  } catch (e) {
    console.error("getChapterLessons: Firestore query failed.", e)
    return []
  }
}

// Student Enrollment & Progress tracking
export async function enrollStudentInCourse(userId: string, courseId: string): Promise<LmsEnrollment> {
  const enrollmentId = `${userId}_${courseId}`
  try {
    ensureDatabaseReady()
    const enrollmentRef = doc(db!, 'lmsEnrollments', enrollmentId)
    const enrollmentSnap = await getDoc(enrollmentRef)

    if (enrollmentSnap.exists()) {
      return { id: enrollmentSnap.id, ...enrollmentSnap.data() } as LmsEnrollment
    }

    const newEnrollment: Omit<LmsEnrollment, 'id'> = {
      userId,
      courseId,
      progressPercentage: 0,
      completedLessons: [],
      enrolledAt: new Date(),
      status: 'active'
    }

    await setDoc(enrollmentRef, newEnrollment)
    return { id: enrollmentId, ...newEnrollment } as LmsEnrollment
  } catch (e) {
    console.warn("enrollStudentInCourse: Fallback to localStorage simulation.", e)
    const localKey = `zest_enroll_${enrollmentId}`
    const cached = localStorage.getItem(localKey)
    if (cached) return JSON.parse(cached)

    const newLocalEnrollment: LmsEnrollment = {
      id: enrollmentId,
      userId,
      courseId,
      progressPercentage: 0,
      completedLessons: [],
      enrolledAt: new Date().toISOString(),
      status: 'active'
    }
    localStorage.setItem(localKey, JSON.stringify(newLocalEnrollment))
    return newLocalEnrollment
  }
}

export async function getStudentEnrollment(userId: string, courseId: string): Promise<LmsEnrollment | null> {
  const enrollmentId = `${userId}_${courseId}`
  try {
    ensureDatabaseReady()
    const enrollmentSnap = await getDoc(doc(db!, 'lmsEnrollments', enrollmentId))
    if (!enrollmentSnap.exists()) {
      return simulateGetEnrollment(userId, courseId)
    }
    return { id: enrollmentSnap.id, ...enrollmentSnap.data() } as LmsEnrollment
  } catch (e) {
    return simulateGetEnrollment(userId, courseId)
  }
}

function simulateGetEnrollment(userId: string, courseId: string): LmsEnrollment | null {
  if (typeof window === 'undefined') return null
  const localKey = `zest_enroll_${userId}_${courseId}`
  const cached = localStorage.getItem(localKey)
  return cached ? JSON.parse(cached) : null
}

export async function updateLessonCompletion(
  userId: string,
  courseId: string,
  lessonId: string,
  isCompleted: boolean
): Promise<LmsEnrollment> {
  const enrollmentId = `${userId}_${courseId}`
  
  // Calculate potential completion updates dynamically
  let totalLessons = 0;
  try {
    const chapters = await getCourseChapters(courseId)
    for (const ch of chapters) {
      const lessons = await getChapterLessons(ch.id)
      totalLessons += lessons.length
    }
  } catch (err) {
    console.error("updateLessonCompletion: Error calculating total lessons:", err)
  }
  if (totalLessons === 0) totalLessons = 4; // safety default

  try {
    ensureDatabaseReady()
    const enrollmentRef = doc(db!, 'lmsEnrollments', enrollmentId)
    const enrollmentSnap = await getDoc(enrollmentRef)
    
    if (!enrollmentSnap.exists()) {
      throw new Error("Student is not enrolled in this course.")
    }

    const data = enrollmentSnap.data() as Omit<LmsEnrollment, 'id'>
    let completed = [...(data.completedLessons || [])]

    if (isCompleted && !completed.includes(lessonId)) {
      completed.push(lessonId)
    } else if (!isCompleted) {
      completed = completed.filter(id => id !== lessonId)
    }

    const progress = Math.round((completed.length / totalLessons) * 100)
    const updates: Partial<LmsEnrollment> = {
      completedLessons: completed,
      progressPercentage: Math.min(progress, 100),
      status: progress >= 100 ? 'completed' : 'active',
      completedAt: progress >= 100 ? new Date() : null
    }

    await updateDoc(enrollmentRef, updates)

    // Trigger certificate generation automatically if completed
    if (progress >= 100) {
      try {
        const userSnap = await getDoc(doc(db!, 'users', userId))
        const recipientName = userSnap.exists() ? (userSnap.data().displayName || "Learner") : "Learner"
        const courseSnap = await getDoc(doc(db!, 'lmsCourses', courseId))
        const courseTitle = courseSnap.exists() ? (courseSnap.data().title || "Zest Course") : "Zest Academy Program"
        await issueCertificate(userId, courseId, recipientName, courseTitle)
      } catch (certError) {
        console.error("Certificate generation error:", certError)
      }
    }

    return { id: enrollmentId, ...data, ...updates } as LmsEnrollment
  } catch (e) {
    console.warn("updateLessonCompletion: Fallback to localStorage.", e)
    const localKey = `zest_enroll_${enrollmentId}`
    const cached = localStorage.getItem(localKey)
    let enrollment: LmsEnrollment = cached 
      ? JSON.parse(cached) 
      : { id: enrollmentId, userId, courseId, progressPercentage: 0, completedLessons: [], enrolledAt: new Date().toISOString(), status: 'active' }

    let completed = [...(enrollment.completedLessons || [])]
    if (isCompleted && !completed.includes(lessonId)) {
      completed.push(lessonId)
    } else if (!isCompleted) {
      completed = completed.filter(id => id !== lessonId)
    }

    const progress = Math.round((completed.length / totalLessons) * 100)
    enrollment.completedLessons = completed
    enrollment.progressPercentage = Math.min(progress, 100)
    enrollment.status = progress >= 100 ? 'completed' : 'active'
    enrollment.completedAt = progress >= 100 ? new Date().toISOString() : undefined

    localStorage.setItem(localKey, JSON.stringify(enrollment))

    if (progress >= 100) {
      // Local storage certificate simulation
      const certId = `${userId}_${courseId}_cert`
      let courseTitle = "Advanced Technology Program"
      try {
        const courseObj = await getCourseById(courseId)
        if (courseObj) courseTitle = courseObj.title
      } catch (err) {}

      const mockCert: LmsCertificate = {
        id: certId,
        courseId,
        userId,
        recipientName: "Certified Zest Learner",
        courseTitle: courseTitle,
        issuedAt: new Date().toISOString()
      }
      localStorage.setItem(`zest_cert_${certId}`, JSON.stringify(mockCert))
    }

    return enrollment
  }
}

// Certificate Issuance & verification
export async function issueCertificate(
  userId: string,
  courseId: string,
  recipientName: string,
  courseTitle: string
): Promise<LmsCertificate> {
  const certificateId = `${userId}_${courseId}`
  try {
    ensureDatabaseReady()
    const certRef = doc(db!, 'lmsCertificates', certificateId)
    const certSnap = await getDoc(certRef)

    if (certSnap.exists()) {
      return { id: certSnap.id, ...certSnap.data() } as LmsCertificate
    }

    const newCert: Omit<LmsCertificate, 'id'> = {
      courseId,
      userId,
      recipientName,
      courseTitle,
      issuedAt: new Date(),
      verificationUrl: `/certificates/${certificateId}`
    }

    await setDoc(certRef, newCert)
    return { id: certificateId, ...newCert } as LmsCertificate
  } catch (e) {
    console.warn("issueCertificate: Fallback to localStorage simulation.", e)
    const localKey = `zest_cert_${certificateId}`
    const newLocalCert: LmsCertificate = {
      id: certificateId,
      courseId,
      userId,
      recipientName,
      courseTitle,
      issuedAt: new Date().toISOString(),
      verificationUrl: `/certificates/${certificateId}`
    }
    localStorage.setItem(localKey, JSON.stringify(newLocalCert))
    return newLocalCert
  }
}

export async function getCertificateById(certificateId: string): Promise<LmsCertificate | null> {
  try {
    ensureDatabaseReady()
    const certSnap = await getDoc(doc(db!, 'lmsCertificates', certificateId))
    if (!certSnap.exists()) {
      return simulateGetCertificate(certificateId)
    }
    return { id: certSnap.id, ...certSnap.data() } as LmsCertificate
  } catch (e) {
    return simulateGetCertificate(certificateId)
  }
}

function simulateGetCertificate(certificateId: string): LmsCertificate | null {
  if (typeof window === 'undefined') return null
  const localKey = `zest_cert_${certificateId}`
  const cached = localStorage.getItem(localKey)
  if (cached) return JSON.parse(cached)
  
  return {
    id: certificateId,
    courseId: "embedded-systems-rtos",
    userId: "mock-user",
    recipientName: "Alex Carter",
    courseTitle: "Mastering Embedded Systems & RTOS",
    issuedAt: new Date().toISOString(),
    verificationUrl: `/certificates/${certificateId}`
  }
}

// Course Editing & Admin CRUD Services
export async function createOrUpdateCourse(course: LmsCourse): Promise<void> {
  ensureDatabaseReady()
  const courseRef = doc(db!, 'lmsCourses', course.id)
  await setDoc(courseRef, {
    ...course,
    updatedAt: serverTimestamp()
  }, { merge: true })
}

export async function createOrUpdateChapter(chapter: LmsChapter): Promise<void> {
  ensureDatabaseReady()
  const chapRef = doc(db!, 'lmsChapters', chapter.id)
  await setDoc(chapRef, chapter, { merge: true })
  
  // Add to course chapter order if not present
  const courseRef = doc(db!, 'lmsCourses', chapter.courseId)
  const courseSnap = await getDoc(courseRef)
  if (courseSnap.exists()) {
    const data = courseSnap.data()
    const currentChapterIds = data.chapterIds || []
    if (!currentChapterIds.includes(chapter.id)) {
      await updateDoc(courseRef, {
        chapterIds: [...currentChapterIds, chapter.id]
      })
    }
  }
}

export async function createOrUpdateLesson(lesson: LmsLesson): Promise<void> {
  ensureDatabaseReady()
  const lessonRef = doc(db!, 'lmsLessons', lesson.id)
  await setDoc(lessonRef, lesson, { merge: true })

  // Add to chapter lessonIds if not present
  const chapRef = doc(db!, 'lmsChapters', lesson.chapterId)
  const chapSnap = await getDoc(chapRef)
  if (chapSnap.exists()) {
    const data = chapSnap.data()
    const currentLessonIds = data.lessonIds || []
    if (!currentLessonIds.includes(lesson.id)) {
      await updateDoc(chapRef, {
        lessonIds: [...currentLessonIds, lesson.id]
      })
    }
  }
}
