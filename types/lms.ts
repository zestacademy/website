export interface LmsQuizQuestion {
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface LmsLesson {
  id: string;
  chapterId: string;
  courseId: string;
  title: string;
  contentType: 'text' | 'video' | 'quiz';
  contentBody?: string; // Markdown text content
  videoUrl?: string; // Embedded video url
  quizQuestions?: LmsQuizQuestion[];
  order: number;
}

export interface LmsChapter {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessonIds: string[]; // List of lesson IDs
}

export interface LmsCourse {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnailUrl: string;
  introVideoUrl?: string;
  tags: string[];
  duration: string; // e.g., "6 hours"
  rating?: number;
  status: 'draft' | 'published';
  createdAt?: any;
  updatedAt?: any;
}

export interface LmsEnrollment {
  id: string;
  userId: string;
  courseId: string;
  progressPercentage: number; // 0 to 100
  completedLessons: string[]; // List of completed lesson IDs
  enrolledAt: any;
  completedAt?: any;
  status: 'active' | 'completed';
}

export interface LmsCertificate {
  id: string;
  courseId: string;
  userId: string;
  recipientName: string;
  courseTitle: string;
  issuedAt: any;
  verificationUrl?: string;
}
