import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment
} from 'firebase/firestore'
import { db, isFirebaseInitialized } from '../lib/firebase'
import { LmsCourse, LmsChapter, LmsLesson, LmsEnrollment, LmsCertificate } from '../types/lms'

// Hardcoded premium mock data as seamless fallback for local sandboxes or empty databases
export const MOCK_COURSES: LmsCourse[] = [
  {
    id: "embedded-systems-rtos",
    title: "Mastering Embedded Systems & RTOS",
    description: "Deep dive into bare-metal firmware engineering, register-level architecture programming, and thread scheduling using Real-Time Operating Systems (RTOS) on ARM Cortex-M microcontrollers.",
    level: "intermediate",
    thumbnailUrl: "https://images.unsplash.com/photo-1608420312520-209166f272a0?auto=format&fit=crop&w=600&q=80",
    tags: ["Embedded", "ARM Cortex", "C/C++", "RTOS"],
    duration: "8 Hours",
    rating: 4.8,
    status: "published"
  },
  {
    id: "ai-agents-rag",
    title: "Advanced AI Agents & RAG Architectures",
    description: "Design and orchestrate production-grade autonomous agent systems, integrate advanced Retrieval-Augmented Generation (RAG) pipelines, and implement vector databases for semantic search.",
    level: "advanced",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
    tags: ["AI & ML", "LLMs", "Vector DBs", "LangChain"],
    duration: "12 Hours",
    rating: 4.9,
    status: "published"
  },
  {
    id: "digital-electronics-101",
    title: "Introduction to Digital Electronics",
    description: "A foundational course covering Boolean algebra, logic gate design, combinational circuitry, flip-flops, registers, and synchronous state machines.",
    level: "beginner",
    thumbnailUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=600&q=80",
    tags: ["Hardware", "Digital", "Foundations", "Circuitry"],
    duration: "4 Hours",
    rating: 4.6,
    status: "published"
  }
];

export const MOCK_CHAPTERS: Record<string, LmsChapter[]> = {
  "embedded-systems-rtos": [
    {
      id: "es-ch1",
      courseId: "embedded-systems-rtos",
      title: "Cortex-M Bootup & registers",
      description: "Understand hardware interrupt vectors, start scripts, and bare-metal registers.",
      order: 1,
      lessonIds: ["es-l1", "es-l2"]
    },
    {
      id: "es-ch2",
      courseId: "embedded-systems-rtos",
      title: "Real-Time Scheduling & RTOS",
      description: "Master priority-based scheduling, semaphores, mutexes, and queues.",
      order: 2,
      lessonIds: ["es-l3", "es-l4"]
    }
  ],
  "ai-agents-rag": [
    {
      id: "ai-ch1",
      courseId: "ai-agents-rag",
      title: "Semantic Embedding & Vector Search",
      description: "How to chunk, embed, and store textual knowledge for high-efficiency querying.",
      order: 1,
      lessonIds: ["ai-l1", "ai-l2"]
    },
    {
      id: "ai-ch2",
      courseId: "ai-agents-rag",
      title: "Multi-Agent Systems & Tool-Calling",
      description: "Implement routing, feedback loops, and function calling workflows.",
      order: 2,
      lessonIds: ["ai-l3"]
    }
  ],
  "digital-electronics-101": [
    {
      id: "de-ch1",
      courseId: "digital-electronics-101",
      title: "Boolean Algebra & Gates",
      description: "Universal gates, logic equations, and De Morgan's theorems.",
      order: 1,
      lessonIds: ["de-l1", "de-l2"]
    }
  ]
};

export const MOCK_LESSONS: Record<string, LmsLesson> = {
  "es-l1": {
    id: "es-l1",
    chapterId: "es-ch1",
    courseId: "embedded-systems-rtos",
    title: "ARM Cortex-M Memory Map",
    contentType: "text",
    contentBody: "## Embedded Memory Architectures\n\nIn ARM Cortex-M microcontrollers, memory is mapped into a single unified 4GB address space. This address space is segmented into standard regions:\n\n1. **Flash Memory (Code)**: Begins at `0x00000000`. Contains the vector table, start-up code, and application binaries.\n2. **SRAM (RAM)**: Begins at `0x20000000`. Used for dynamic variables, stack, and heap.\n3. **Peripherals**: Begins at `0x40000000`. Maps physical peripheral registers (GPIO, timers, USART) directly to memory addresses.\n\n### Accessing Registers in C\nTo access registers directly, we cast raw memory addresses to volatile pointers:\n\n```c\n#define GPIOA_ODR *((volatile uint32_t*)0x40020014)\n\nvoid toggle_pin() {\n    GPIOA_ODR ^= (1 << 5); // Toggles pin 5\n}\n```",
    order: 1
  },
  "es-l2": {
    id: "es-l2",
    chapterId: "es-ch1",
    courseId: "embedded-systems-rtos",
    title: "Register-Level GPIO Controls",
    contentType: "video",
    videoUrl: "https://www.youtube.com/embed/3V9a1E0w_j0",
    contentBody: "Watch this interactive register programming demonstration explaining how clock routing and configuration flags enable simple LED pulsing on an STM32 board.",
    order: 2
  },
  "es-l3": {
    id: "es-l3",
    chapterId: "es-ch2",
    courseId: "embedded-systems-rtos",
    title: "RTOS Task Scheduling & Context Switching",
    contentType: "text",
    contentBody: "## Real-Time Schedulers\n\nAn RTOS kernel manages task execution through priority-based scheduling. Tasks reside in three principal states:\n\n* **Running**: The CPU is currently executing this task.\n* **Ready**: The task can run but a higher priority task is active.\n* **Blocked**: The task is waiting for an event (timer, semaphore, queue).\n\n### The Scheduler Mechanism\nDuring a context switch, the kernel triggers a **PendSV** exception. The CPU pushes core registers (`R0-R3`, `R12`, `LR`, `PC`, `xPSR`) to the stack. The software then stores the remaining registers (`R4-R11`) to the current task's Stack Pointer (SP) and restores the target task's stack registers before exiting the exception.",
    order: 1
  },
  "es-l4": {
    id: "es-l4",
    chapterId: "es-ch2",
    courseId: "embedded-systems-rtos",
    title: "RTOS Concurrency Quiz",
    contentType: "quiz",
    quizQuestions: [
      {
        questionText: "Which mechanism avoids priority inversion in RTOS environments?",
        options: [
          "Spinlocks",
          "Priority Inheritance",
          "First-In First-Out (FIFO)",
          "Round-Robin Slicing"
        ],
        correctOptionIndex: 1,
        explanation: "Priority Inheritance temporarily raises the priority of the low-priority lock-holding task to match the high-priority waiting task, resolving inversion bottlenecks."
      },
      {
        questionText: "What register maps the dynamic stack frame address during active thread runtime?",
        options: [
          "R15 (PC)",
          "R14 (LR)",
          "R13 (SP)",
          "R0 (Return)"
        ],
        correctOptionIndex: 2,
        explanation: "R13 acts as the Stack Pointer (SP) holding the active address boundary of the dynamic call stack."
      }
    ],
    order: 2
  },
  "ai-l1": {
    id: "ai-l1",
    chapterId: "ai-ch1",
    courseId: "ai-agents-rag",
    title: "Intro to Retrieval-Augmented Generation",
    contentType: "text",
    contentBody: "## What is RAG?\n\nRetrieval-Augmented Generation (RAG) optimizes LLM processing by pulling semantic background information from an external vector index to supplement the active prompt.\n\n### The Core RAG Workflow\n1. **Ingest & Process**: Clean documents, split them into optimal semantic chunks (e.g. 500-1000 characters).\n2. **Vector Ingestion**: Generate dense math vectors from chunks using embedding engines (e.g., text-embedding-ada-002) and write to a vector table.\n3. **Query Retrieval**: Perform Cosine Similarity or K-Nearest Neighbors search using the user's prompt as the search target.\n4. **Supplement & Generate**: Inject retrieved chunks into the LLM system context as dynamic grounding context, then request completion.\n\n```python\n# Conceptual representation of prompt enhancement\ncontext = vector_db.similarity_search(user_query, k=3)\nfull_prompt = f\"Context: {context}\\n\\nQuestion: {user_query}\"\nresponse = llm.generate(full_prompt)\n```",
    order: 1
  },
  "ai-l2": {
    id: "ai-l2",
    chapterId: "ai-ch1",
    courseId: "ai-agents-rag",
    title: "Chunking Strategies & Context Poisoning",
    contentType: "quiz",
    quizQuestions: [
      {
        questionText: "What vector operation is commonly evaluated to gauge semantic similarity between two chunk vectors?",
        options: [
          "Dot Product scaling",
          "Cosine Similarity / Dot Product on normalized coordinates",
          "Euclidean Distance summation",
          "Cross-product integration"
        ],
        correctOptionIndex: 1,
        explanation: "Cosine Similarity evaluates the angle between high-dimensional embedding vectors, making it size-invariant and perfect for assessing semantic similarity."
      }
    ],
    order: 2
  },
  "ai-l3": {
    id: "ai-l3",
    chapterId: "ai-ch2",
    courseId: "ai-agents-rag",
    title: "Building Router Agents from Scratch",
    contentType: "text",
    contentBody: "## Router Architectures\n\nRouter agents inspect user input and dynamically direct the request to specialized model interfaces, local tools, or distinct sub-graph agents.\n\n### Implementation Template (Typescript)\n\n```typescript\ntype TargetAgent = 'EmbeddedExpert' | 'AIEngineer' | 'GeneralHelp';\n\nasync function routeRequest(prompt: string): Promise<TargetAgent> {\n  const checkPrompt = `Examine this request: \"${prompt}\"\\nRoute it to one of: EmbeddedExpert, AIEngineer, GeneralHelp. Return ONLY the category name.`;\n  const response = await llm.complete(checkPrompt);\n  return response.trim() as TargetAgent;\n}\n```",
    order: 1
  },
  "de-l1": {
    id: "de-l1",
    chapterId: "de-ch1",
    courseId: "digital-electronics-101",
    title: "Fundamentals of Logic Gates",
    contentType: "text",
    contentBody: "## Logic Foundations\n\nAll digital computers rely on three core logical operations:\n\n* **AND**: Output is high ONLY if all inputs are high (`Y = A • B`).\n* **OR**: Output is high if at least one input is high (`Y = A + B`).\n* **NOT**: Inverts the input (`Y = A'`).\n\n### The NAND Universal Gate\nNAND (`(A • B)'`) and NOR (`(A + B)'`) gates are classified as **universal gates**. This is because any standard Boolean equation can be wired using exclusively NAND or exclusively NOR gates.",
    order: 1
  },
  "de-l2": {
    id: "de-l2",
    chapterId: "de-ch1",
    courseId: "digital-electronics-101",
    title: "Truth Tables & Gates Assessment",
    contentType: "quiz",
    quizQuestions: [
      {
        questionText: "Which gate outputs high only when inputs are mismatched (one high, one low)?",
        options: [
          "NAND",
          "XOR",
          "NOR",
          "XNOR"
        ],
        correctOptionIndex: 1,
        explanation: "XOR (Exclusive OR) outputs a 1 if and only if the inputs differ (e.g. 1 and 0, or 0 and 1)."
      }
    ],
    order: 2
  }
};

function ensureDatabaseReady() {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firestore is not configured. Falling back to local data service.')
  }
}

// Check database connection and load, fallback automatically
export async function getAllCourses(): Promise<LmsCourse[]> {
  try {
    ensureDatabaseReady()
    const coursesSnapshot = await getDocs(collection(db!, 'lmsCourses'))
    if (coursesSnapshot.empty) {
      // Seed mockup data inside firestore if empty and connected
      await seedMockData()
      return MOCK_COURSES
    }
    const courses: LmsCourse[] = []
    coursesSnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() } as LmsCourse)
    })
    return courses
  } catch (e) {
    console.warn("getAllCourses: Firestore connection failed. Fallback to mock catalog.", e)
    return MOCK_COURSES
  }
}

export async function getCourseById(courseId: string): Promise<LmsCourse | null> {
  try {
    ensureDatabaseReady()
    const courseSnap = await getDoc(doc(db!, 'lmsCourses', courseId))
    if (!courseSnap.exists()) {
      return MOCK_COURSES.find(c => c.id === courseId) || null
    }
    return { id: courseSnap.id, ...courseSnap.data() } as LmsCourse
  } catch (e) {
    console.warn("getCourseById: Fallback to mock item.", e)
    return MOCK_COURSES.find(c => c.id === courseId) || null
  }
}

export async function getCourseChapters(courseId: string): Promise<LmsChapter[]> {
  try {
    ensureDatabaseReady()
    const chaptersSnap = await getDocs(
      query(collection(db!, 'lmsChapters'), where('courseId', '==', courseId), orderBy('order', 'asc'))
    )
    if (chaptersSnap.empty) {
      return MOCK_CHAPTERS[courseId] || []
    }
    const chapters: LmsChapter[] = []
    chaptersSnap.forEach((doc) => {
      chapters.push({ id: doc.id, ...doc.data() } as LmsChapter)
    })
    return chapters
  } catch (e) {
    console.warn("getCourseChapters: Fallback to mock chapters.", e)
    return MOCK_CHAPTERS[courseId] || []
  }
}

export async function getLessonById(lessonId: string): Promise<LmsLesson | null> {
  try {
    ensureDatabaseReady()
    const lessonSnap = await getDoc(doc(db!, 'lmsLessons', lessonId))
    if (!lessonSnap.exists()) {
      return MOCK_LESSONS[lessonId] || null
    }
    return { id: lessonSnap.id, ...lessonSnap.data() } as LmsLesson
  } catch (e) {
    console.warn("getLessonById: Fallback to mock lesson.", e)
    return MOCK_LESSONS[lessonId] || null
  }
}

export async function getChapterLessons(chapterId: string): Promise<LmsLesson[]> {
  try {
    ensureDatabaseReady()
    const lessonsSnap = await getDocs(
      query(collection(db!, 'lmsLessons'), where('chapterId', '==', chapterId), orderBy('order', 'asc'))
    )
    if (lessonsSnap.empty) {
      return Object.values(MOCK_LESSONS).filter(l => l.chapterId === chapterId).sort((a,b) => a.order - b.order)
    }
    const lessons: LmsLesson[] = []
    lessonsSnap.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() } as LmsLesson)
    })
    return lessons
  } catch (e) {
    console.warn("getChapterLessons: Fallback to mock lessons.", e)
    return Object.values(MOCK_LESSONS).filter(l => l.chapterId === chapterId).sort((a,b) => a.order - b.order)
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
  
  // Calculate potential completion updates
  let totalLessons = 0;
  const chapters = MOCK_CHAPTERS[courseId] || [];
  chapters.forEach(ch => {
    totalLessons += ch.lessonIds.length;
  });
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
      const mockCert: LmsCertificate = {
        id: certId,
        courseId,
        userId,
        recipientName: "Certified Zest Learner",
        courseTitle: MOCK_COURSES.find(c => c.id === courseId)?.title || "Advanced Technology Program",
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
  
  // Create an on-demand mock certificate for rendering previews if none exists
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
  try {
    ensureDatabaseReady()
    const courseRef = doc(db!, 'lmsCourses', course.id)
    await setDoc(courseRef, {
      ...course,
      updatedAt: serverTimestamp()
    }, { merge: true })
  } catch (e) {
    console.warn("createOrUpdateCourse: Fallback to local memory update.", e)
    const idx = MOCK_COURSES.findIndex(c => c.id === course.id)
    if (idx >= 0) {
      MOCK_COURSES[idx] = { ...MOCK_COURSES[idx], ...course }
    } else {
      MOCK_COURSES.push(course)
    }
  }
}

export async function createOrUpdateChapter(chapter: LmsChapter): Promise<void> {
  try {
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
  } catch (e) {
    console.warn("createOrUpdateChapter: Fallback to local cache.", e)
    const list = MOCK_CHAPTERS[chapter.courseId] || []
    const idx = list.findIndex(c => c.id === chapter.id)
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...chapter }
    } else {
      list.push(chapter)
      MOCK_CHAPTERS[chapter.courseId] = list
    }
  }
}

export async function createOrUpdateLesson(lesson: LmsLesson): Promise<void> {
  try {
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
  } catch (e) {
    console.warn("createOrUpdateLesson: Fallback to local cache.", e)
    MOCK_LESSONS[lesson.id] = { ...lesson }
    
    // Maintain mock chapter references
    const courseId = lesson.courseId
    const chapters = MOCK_CHAPTERS[courseId] || []
    const chapter = chapters.find(ch => ch.id === lesson.chapterId)
    if (chapter && !chapter.lessonIds.includes(lesson.id)) {
      chapter.lessonIds.push(lesson.id)
    }
  }
}

// Seed helper to populate Firestore with high-quality content if configured but blank
async function seedMockData() {
  try {
    console.log("Seeding initial LMS content into Firestore database...")
    for (const c of MOCK_COURSES) {
      await setDoc(doc(db!, 'lmsCourses', c.id), c)
    }
    for (const courseId of Object.keys(MOCK_CHAPTERS)) {
      for (const ch of MOCK_CHAPTERS[courseId]) {
        await setDoc(doc(db!, 'lmsChapters', ch.id), ch)
      }
    }
    for (const lessonId of Object.keys(MOCK_LESSONS)) {
      await setDoc(doc(db!, 'lmsLessons', lessonId), MOCK_LESSONS[lessonId])
    }
    console.log("Firestore database seeded successfully.")
  } catch (err) {
    console.error("Failed to seed mock data:", err)
  }
}
