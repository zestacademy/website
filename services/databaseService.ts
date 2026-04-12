import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  writeBatch,
  type DocumentData,
  type DocumentReference,
  type CollectionReference,
} from 'firebase/firestore'
import { db, isFirebaseInitialized } from '../lib/firebase'
import { sendEnrollmentEmail, sendCertificateEmail, sendCourseStartedEmail } from './emailService'

function showBrowserNotification(title: string, body: string) {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/logo.png' })
  }
}

function ensureDatabaseReady() {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firestore is not configured. Add Firebase keys to .env to enable database operations.')
  }
}

export async function upsertUserProfile(user: any, extraFields: Record<string, any> = {}) {
  if (!user) return
  ensureDatabaseReady()

  await setDoc(
    doc(db!, 'users', user.uid),
    {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      updatedAt: serverTimestamp(),
      ...extraFields,
    },
    { merge: true },
  )
}

export async function ensureUserProfileData(user: any) {
  if (!user) return
  ensureDatabaseReady()

  await upsertUserProfile(user)

  const summaryRef = doc(db!, 'users', user.uid, 'profile', 'summary')
  const summarySnapshot = await getDoc(summaryRef)

  if (!summarySnapshot.exists()) {
    await setDoc(summaryRef, {
      completedCourses: 0,
      certificatesAchieved: 0,
      hoursLearned: 0,
      updatedAt: serverTimestamp(),
    })
  }
}

function normalizeDate(value: any): Date | null {
  if (!value) return null
  if (typeof value?.toDate === 'function') return value.toDate()
  return new Date(value)
}

function mapDocWithDate(snapshotDoc: any, dateFields: string[]) {
  const data = snapshotDoc.data()
  const mapped: any = { id: snapshotDoc.id, ...data }

  dateFields.forEach((fieldName) => {
    mapped[fieldName] = normalizeDate(data[fieldName])
  })

  return mapped
}

export async function getUserProfileData(uid: string) {
  ensureDatabaseReady()

  const userSnapshot = await getDoc(doc(db!, 'users', uid))
  const summarySnapshot = await getDoc(doc(db!, 'users', uid, 'profile', 'summary'))

  const completedCoursesSnapshot = await getDocs(
    query(collection(db!, 'users', uid, 'completedCourses'), orderBy('completedAt', 'desc')),
  )

  const certificatesSnapshot = await getDocs(
    query(collection(db!, 'users', uid, 'certificates'), orderBy('issuedAt', 'desc')),
  )

  const enrolledCoursesSnapshot = await getDocs(
    query(collection(db!, 'users', uid, 'enrolledCourses'), orderBy('enrolledAt', 'desc')),
  )

  const completedCourses = completedCoursesSnapshot.docs.map((snapshotDoc) =>
    mapDocWithDate(snapshotDoc, ['completedAt']),
  )

  const certificates = certificatesSnapshot.docs.map((snapshotDoc) =>
    mapDocWithDate(snapshotDoc, ['issuedAt']),
  )

  const enrolledCourses = enrolledCoursesSnapshot.docs.map((snapshotDoc) =>
    mapDocWithDate(snapshotDoc, ['enrolledAt']),
  )

  const summaryData = summarySnapshot.exists() ? summarySnapshot.data() : {}

  return {
    user: userSnapshot.exists() ? userSnapshot.data() : null,
    summary: {
      completedCourses: summaryData.completedCourses ?? completedCourses.length,
      certificatesAchieved: summaryData.certificatesAchieved ?? certificates.length,
      hoursLearned: summaryData.hoursLearned ?? 0,
      updatedAt: normalizeDate(summaryData.updatedAt),
    },
    completedCourses,
    enrolledCourses,
    certificates,
  }
}

export async function isUserEnrolledInCourse(uid: string, courseSlug: string) {
  ensureDatabaseReady()

  const enrollmentSnapshot = await getDoc(doc(db!, 'users', uid, 'enrolledCourses', courseSlug))
  return enrollmentSnapshot.exists()
}

export async function enrollUserInCourse(user: any, course: any) {
  if (!user?.uid) {
    throw new Error('You need to sign in before enrolling in a course.')
  }

  const activeSlug = course?.slug || course?.id
  if (!activeSlug) {
    throw new Error('Invalid course details. Please refresh and try again.')
  }

  ensureDatabaseReady()

  const userEnrollmentRef = doc(db!, 'users', user.uid, 'enrolledCourses', activeSlug)
  const courseEnrollmentRef = doc(db!, 'courses', activeSlug, 'enrollments', user.uid)
  const progressRef = doc(db!, 'users', user.uid, 'courseProgress', activeSlug)

  const totalLessons = course.modules?.reduce((acc: number, module: any) => acc + (module.lessons?.length || 0), 0) || 0

  const enrollmentData = {
    userId: user.uid,
    courseSlug: activeSlug,
    courseTitle: course.title || "Untitled Course",
    courseCategory: course.category || "Uncategorized",
    instructor: course.instructorName || course.instructor || "Unknown Instructor",
    enrolledAt: serverTimestamp(),
    status: 'enrolled',
  }

  const batch = writeBatch(db!)
  batch.set(userEnrollmentRef, enrollmentData, { merge: true })
  batch.set(courseEnrollmentRef, {
    userId: user.uid,
    email: user.email ?? '',
    displayName: user.displayName ?? '',
    enrolledAt: serverTimestamp(),
  }, { merge: true })
  batch.set(progressRef, {
    courseSlug: activeSlug,
    totalLessons,
    completedLessonIds: [],
    completedLessonsCount: 0,
    progressPercent: 0,
    isCompleted: false,
    startedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true })
  await batch.commit()

  // Send an Enrollment Email!
  try {
    const courseUrl = `${window.location.origin}/courses/${course.slug || course.id}/learn`
    await sendEnrollmentEmail(user.email ?? '', user.displayName || 'Student', course.title, courseUrl)
  } catch (error) {
    console.error("Failed to send enrollment email:", error)
  }

  // Browser notification
  showBrowserNotification(
    `Enrolled in ${course.title}`,
    'You have successfully enrolled. Start learning now!'
  )
}

export async function getUserCourseLearningState(uid: string, course: any) {
  ensureDatabaseReady()

  if (!uid) {
    throw new Error('Missing user id while fetching learning state.')
  }

  const activeSlug = course?.slug || course?.id
  if (!activeSlug) {
    throw new Error('Invalid course selected.')
  }

  const enrollmentRef = doc(db!, 'users', uid, 'enrolledCourses', activeSlug)
  const progressRef = doc(db!, 'users', uid, 'courseProgress', activeSlug)

  const [enrollmentSnapshot, progressSnapshot] = await Promise.all([
    getDoc(enrollmentRef),
    getDoc(progressRef),
  ])

  const totalLessons = course.modules?.reduce((acc: number, module: any) => acc + (module.lessons?.length || 0), 0) || 0

  const progress = progressSnapshot.exists()
    ? mapDocWithDate(progressSnapshot, ['startedAt', 'updatedAt', 'completedAt'])
    : {
      courseSlug: activeSlug,
      totalLessons,
      completedLessonIds: [],
      completedLessonsCount: 0,
      progressPercent: 0,
      isCompleted: false,
      startedAt: null,
      updatedAt: null,
      completedAt: null,
    }

  return {
    isEnrolled: enrollmentSnapshot.exists(),
    enrollment: enrollmentSnapshot.exists() ? mapDocWithDate(enrollmentSnapshot, ['enrolledAt']) : null,
    progress,
  }
}

export async function setCourseLessonCompletion(user: any, course: any, lessonId: string, shouldComplete: boolean) {
  ensureDatabaseReady()

  if (!user?.uid) {
    throw new Error('Sign in to update course progress.')
  }

  const activeSlug = course?.slug || course?.id
  if (!activeSlug || !lessonId) {
    throw new Error('Invalid course lesson update request.')
  }

  const progressRef = doc(db!, 'users', user.uid, 'courseProgress', activeSlug)
  const completedCourseRef = doc(db!, 'users', user.uid, 'completedCourses', activeSlug)
  const certificateRef = doc(db!, 'users', user.uid, 'certificates', activeSlug)
  const summaryRef = doc(db!, 'users', user.uid, 'profile', 'summary')

  const totalLessons = course.modules?.reduce((acc: number, module: any) => acc + (module.lessons?.length || 0), 0) || 0

  const progressSnapshot = await getDoc(progressRef)
  const progressData = progressSnapshot.exists() ? progressSnapshot.data() : null
  const existingLessonIds = progressData?.completedLessonIds || []
  const currentLessonSet = new Set(existingLessonIds)

  if (shouldComplete) {
    currentLessonSet.add(lessonId)
  } else {
    currentLessonSet.delete(lessonId)
  }

  const completedLessonIds = Array.from(currentLessonSet)
  const completedLessonsCount = completedLessonIds.length
  const progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0
  const nowCompleted = totalLessons > 0 && completedLessonsCount >= totalLessons
  const previouslyCompleted = Boolean(progressData?.isCompleted)

  const batch = writeBatch(db!)
  batch.set(progressRef, {
    courseSlug: activeSlug,
    totalLessons,
    completedLessonIds,
    completedLessonsCount,
    progressPercent,
    isCompleted: nowCompleted,
    updatedAt: serverTimestamp(),
    completedAt: nowCompleted ? serverTimestamp() : null,
  }, { merge: true })

  if (nowCompleted) {
    batch.set(completedCourseRef, {
      title: course.title,
      slug: activeSlug,
      score: 100,
      completedAt: serverTimestamp(),
    }, { merge: true })

    const certificateData = {
      title: course.certificateName,
      credentialId: `${activeSlug.toUpperCase()}-${user.uid.slice(0, 8)}`,
      issuedAt: serverTimestamp(),
      courseSlug: activeSlug,
      verificationId: `${activeSlug.toUpperCase()}-${user.uid.slice(0, 8)}`
    }

    batch.set(certificateRef, certificateData, { merge: true })

    if (!previouslyCompleted) {
      batch.set(summaryRef, {
        completedCourses: increment(1),
        certificatesAchieved: increment(1),
        hoursLearned: increment(course.estimatedHours || 0),
        updatedAt: serverTimestamp(),
      }, { merge: true })
    }
  }

  await batch.commit()

  // After the commit correctly updates all state, fire the email request 
  if (nowCompleted && !previouslyCompleted) {
      try {
         const certId = `${activeSlug.toUpperCase()}-${user.uid.slice(0, 8)}`
         const certUrl = `${window.location.origin}/certificates/${certId}`
         await sendCertificateEmail(
            user.email ?? '',
            user.displayName || 'Student',
            course.title,
            certId,
            certUrl
         )
      } catch (error) {
         console.error("Failed to send certificate email:", error)
      }

      // Browser notification
      showBrowserNotification(
        'Certificate Earned!',
        `Congratulations! You completed ${course.title}`
      )
  }

  return {
    completedLessonIds,
    completedLessonsCount,
    progressPercent,
    isCompleted: nowCompleted,
  }
}

export async function createContactLead(payload: any) {
  ensureDatabaseReady()
  return addDoc(collection(db!, 'leads'), {
    ...payload,
    createdAt: serverTimestamp(),
  })
}

export async function upsertNewsletterSubscription(email: string) {
  ensureDatabaseReady()

  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail) {
    throw new Error('Email is required for newsletter subscription.')
  }

  const subscriberId = encodeURIComponent(normalizedEmail)
  const subscriberRef = doc(db!, 'newsletterSubscribers', subscriberId)

  await setDoc(
    subscriberRef,
    {
      email: normalizedEmail,
      source: 'home-page',
      subscribedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'active',
    },
    { merge: true },
  )
}

export async function getAllUsers() {
  ensureDatabaseReady()
  const usersSnapshot = await getDocs(collection(db!, 'users'))
  return usersSnapshot.docs.map((snapshotDoc) => ({
    id: snapshotDoc.id,
    ...snapshotDoc.data(),
  }))
}

export async function issueCertificateToUser({
  userId,
  courseTitle,
  courseSlug,
  startingDate,
  endingDate,
  issueDate,
  regNo,
}: {
  userId: string
  courseTitle: string
  courseSlug: string
  startingDate: any
  endingDate: any
  issueDate: any
  regNo: string
}) {
  ensureDatabaseReady()

  const certificateRef = doc(db!, 'users', userId, 'certificates', `${courseSlug}-${regNo}`)
  const summaryRef = doc(db!, 'users', userId, 'profile', 'summary')

  const certificateData = {
    title: courseTitle,
    courseSlug,
    startingDate,
    endingDate,
    issuedAt: issueDate ? new Date(issueDate) : serverTimestamp(),
    regNo,
    credentialId: regNo,
    type: 'manual',
  }

  const batch = writeBatch(db!)
  batch.set(certificateRef, certificateData, { merge: true })
  batch.set(summaryRef, {
    certificatesAchieved: increment(1),
    updatedAt: serverTimestamp(),
  }, { merge: true })

  await batch.commit()
  return certificateData
}

export async function updateCourseAdminDetails({ courseSlug, startDate, classLink }: { courseSlug: string, startDate: any, classLink: string }) {
  ensureDatabaseReady()
  const courseRef = doc(db!, 'courseConfigs', courseSlug)

  await setDoc(courseRef, {
    courseSlug,
    startDate,
    classLink,
    updatedAt: serverTimestamp()
  }, { merge: true })
}

export async function getCourseAdminConfigs() {
  ensureDatabaseReady()
  const snapshot = await getDocs(collection(db!, 'courseConfigs'))
  const configs: Record<string, any> = {}
  snapshot.forEach(doc => {
    configs[doc.id] = doc.data()
  })
  return configs
}

export async function subscribeToNotifications(uid: string, subscription: any) {
  ensureDatabaseReady()
  const subRef = doc(db!, 'notificationSubscriptions', uid)
  await setDoc(subRef, {
    uid,
    subscription,
    updatedAt: serverTimestamp()
  }, { merge: true })
}

export async function getAllNotificationSubscriptions() {
  ensureDatabaseReady()
  const snapshot = await getDocs(collection(db!, 'notificationSubscriptions'))
  return snapshot.docs.map(doc => doc.data())
}

export async function savePushNotification(payload: any) {
  ensureDatabaseReady()
  await addDoc(collection(db!, 'notifications'), {
    ...payload,
    sentAt: serverTimestamp()
  })
}

export async function getEnrollmentsForCourse(courseSlug: string) {
  ensureDatabaseReady()
  const q = collection(db!, 'courses', courseSlug, 'enrollments')
  const snap = await getDocs(q)
  return snap.docs.map(doc => doc.id) // Return list of UIDs
}

export async function createLiveClassWithNotifications({ courseSlug, title, description, classLink }: { courseSlug: string, title: string, description: string, classLink: string }) {
  ensureDatabaseReady()

  // 1. Create the class
  const classRef = doc(collection(db!, 'courses', courseSlug, 'liveClasses'))
  const classData = {
    id: classRef.id,
    title,
    description,
    classLink,
    recordedLink: '',
    status: 'active',
    createdAt: serverTimestamp()
  }

  const batch = writeBatch(db!)
  batch.set(classRef, classData)

  // 2. Target only enrolled users for notifications
  const enrolledUserIds = await getEnrollmentsForCourse(courseSlug)

  enrolledUserIds.forEach(uid => {
    const notifRef = doc(collection(db!, 'notifications'))
    batch.set(notifRef, {
      targetUid: uid,
      courseSlug,
      title: `New Live Class: ${title}`,
      message: `A new live session has been scheduled for your course. Click to join!`,
      url: `/courses/${courseSlug}/learn`,
      sentAt: serverTimestamp(),
      type: 'live-class-alert'
    })
  })

  await batch.commit()

  // 3. Send course started emails to enrolled users
  const courseLink = `/courses/${courseSlug}/learn`
  for (const uid of enrolledUserIds) {
    try {
      const userDoc = await getDoc(doc(db!, 'users', uid))
      const userData = userDoc.data()
      if (userData?.email) {
        sendCourseStartedEmail(
          userData.email,
          userData.displayName || 'Student',
          title,
          courseLink
        ).catch(console.error)
      }
    } catch (e) {
      console.error(`Failed to send email to user ${uid}:`, e)
    }
  }

  return classData
}

export async function updateRecordedLink(courseSlug: string, classId: string, recordedLink: string) {
  ensureDatabaseReady()
  const classRef = doc(db!, 'courses', courseSlug, 'liveClasses', classId)
  await setDoc(classRef, {
    recordedLink,
    status: 'completed',
    updatedAt: serverTimestamp()
  }, { merge: true })
}

export async function getLiveClasses(courseSlug: string) {
  ensureDatabaseReady()
  const q = query(
    collection(db!, 'courses', courseSlug, 'liveClasses'),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function submitClassFeedback({
  userId,
  userName,
  courseSlug,
  classId,
  rating,
  comment,
}: {
  userId: string
  userName: string
  courseSlug: string
  classId: string
  rating: number
  comment: string
}) {
  ensureDatabaseReady()
  const feedbackRef = doc(collection(db!, 'courses', courseSlug, 'liveClasses', classId, 'feedback'))
  await setDoc(feedbackRef, {
    userId,
    userName,
    rating,
    comment,
    submittedAt: serverTimestamp()
  })
}

export function subscribeToLiveClasses(courseSlug: string, callback: (sessions: any[]) => void): () => void {
  ensureDatabaseReady()
  const q = query(
    collection(db!, 'courses', courseSlug, 'liveClasses'),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    callback(list)
  })
}

export function subscribeToCourseConfigs(callback: (configs: Record<string, any>) => void): () => void {
  ensureDatabaseReady()
  const collRef = collection(db!, 'courseConfigs')
  return onSnapshot(collRef, (snapshot) => {
    const configs: Record<string, any> = {}
    snapshot.forEach(doc => {
      configs[doc.id] = doc.data()
    })
    callback(configs)
  })
}

export async function getCourseEnrollments(courseSlug: string) {
  ensureDatabaseReady()
  const q = query(
    collection(db!, 'courses', courseSlug, 'enrollments'),
    orderBy('enrolledAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getClassFeedback(courseSlug: string, classId: string) {
  ensureDatabaseReady()
  const q = query(
    collection(db!, 'courses', courseSlug, 'liveClasses', classId, 'feedback'),
    orderBy('submittedAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}