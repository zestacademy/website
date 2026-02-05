
export type ContentType = 'video' | 'text' | 'pdf' | 'quiz' | 'project';

export interface LessonContent {
    type: ContentType;
    // For video
    videoId?: string; // YouTube ID or URL
    duration?: number; // in minutes
    // For text/article
    markdown?: string;
    // For quiz
    quizId?: string;
    questions?: QuizQuestion[];
    // Common
    resources?: Resource[];
}

export interface Resource {
    title: string;
    url: string;
    type: 'pdf' | 'link' | 'code';
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation?: string;
}

export interface Lesson {
    id: string;
    title: string;
    description?: string;
    type: ContentType;
    content: LessonContent;
    isFree?: boolean; // For preview
}

export interface Module {
    id: string;
    title: string;
    description?: string;
    lessons: Lesson[];
    order: number;
}

export interface Course {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    thumbnail: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string; // e.g., "20 Hours" or "20 Days"
    modules: Module[];
    tags: string[];
    price?: number; // 0 for free
    certificateAvailable?: boolean;
}

export interface UserCourseProgress {
    userId: string;
    courseId: string;
    enrolledAt: string;
    completedLessons: string[]; // array of lesson IDs
    currentLessonId?: string;
    quizScores: Record<string, number>; // quizId -> score (0-100)
    status: 'active' | 'completed';
    lastAccessedAt: string;
}
