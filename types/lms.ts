
export type ContentType = 'video' | 'text' | 'pdf' | 'quiz' | 'project' | 'live' | 'recorded';

export type UserRole = 'student' | 'instructor' | 'admin';

export type CourseStatus = 'draft' | 'published' | 'archived';

export type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled';

export type SessionType = 'live' | 'recorded';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    role: UserRole;
    zestId?: string;
    profilePicture?: string;
    bio?: string;
    createdAt: string;
    updatedAt: string;
}

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
    // For live/recorded sessions
    sessionId?: string;
    meetingLink?: string;
    recordedVideoUrl?: string;
    scheduledAt?: string;
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
    price: number; // 0 for free
    certificateAvailable: boolean;
    instructorId: string;
    instructorName: string;
    status: CourseStatus;
    createdAt: string;
    updatedAt: string;
    totalEnrollments: number;
    rating?: number;
}

export interface LiveSession {
    id: string;
    courseId: string;
    title: string;
    description: string;
    scheduledAt: string;
    duration: number; // in minutes
    meetingLink: string;
    instructorId: string;
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    recordedVideoUrl?: string;
    createdAt: string;
    attendees: string[]; // user IDs who attended
}

export interface AttendanceRecord {
    id: string;
    userId: string;
    courseId: string;
    sessionId: string;
    joinedAt: string;
    leftAt?: string;
    duration: number; // in minutes
    status: 'present' | 'partial' | 'absent';
}

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    enrolledAt: string;
    status: EnrollmentStatus;
    paymentId?: string;
    paymentStatus: PaymentStatus;
    amount: number;
    progress: UserCourseProgress;
    certificateIssued?: boolean;
    certificateId?: string;
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
    attendancePercentage: number;
    totalAttendanceTime: number; // in minutes
}

export interface Certificate {
    id: string;
    userId: string;
    courseId: string;
    courseTitle: string;
    userName: string;
    issuedAt: string;
    certificateUrl: string;
    verificationId: string;
}

export interface Payment {
    id: string;
    userId: string;
    courseId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMethod: string;
    transactionId?: string;
    createdAt: string;
    updatedAt: string;
}
