
import {
    Course,
    Module,
    Lesson,
    User,
    UserRole,
    Enrollment,
    LiveSession,
    AttendanceRecord,
    Certificate,
    Payment,
    UserCourseProgress
} from "@/types/lms";
import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    onSnapshot
} from "firebase/firestore";

export const LMSService = {
    // User Management
    async getUserById(userId: string): Promise<User | null> {
        try {
            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
                return { uid: userDoc.id, ...userDoc.data() } as User;
            }
            return null;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    },

    async updateUserRole(userId: string, role: UserRole): Promise<boolean> {
        try {
            await updateDoc(doc(db, "users", userId), {
                role,
                updatedAt: Timestamp.now()
            });
            return true;
        } catch (error) {
            console.error("Error updating user role:", error);
            return false;
        }
    },

    async getUsersByRole(role: UserRole): Promise<User[]> {
        try {
            const q = query(collection(db, "users"), where("role", "==", role));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            } as User));
        } catch (error) {
            console.error("Error fetching users by role:", error);
            return [];
        }
    },

    // Course Management
    async getAllCourses(): Promise<Course[]> {
        try {
            const querySnapshot = await getDocs(
                query(collection(db, "courses"), where("status", "==", "published"))
            );
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Course));
        } catch (error) {
            console.error("Error fetching courses:", error);
            return [];
        }
    },

    async getCourseById(courseId: string): Promise<Course | null> {
        try {
            const courseDoc = await getDoc(doc(db, "courses", courseId));
            if (courseDoc.exists()) {
                return { id: courseDoc.id, ...courseDoc.data() } as Course;
            }
            return null;
        } catch (error) {
            console.error("Error fetching course:", error);
            return null;
        }
    },

    async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'totalEnrollments'>): Promise<string | null> {
        try {
            // Generate slug-based ID from title
            const courseId = courseData.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove non-word chars
                .replace(/\s+/g, '-')     // Replace spaces with -
                .replace(/--+/g, '-')     // Replace multiple - with single -
                .trim();

            // Check if course with this ID already exists
            const existingCourse = await this.getCourseById(courseId);
            const finalId = existingCourse ? `${courseId}-${Date.now().toString().slice(-4)}` : courseId;

            await setDoc(doc(db, "courses", finalId), {
                ...courseData,
                id: finalId,
                slug: finalId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                totalEnrollments: 0
            });
            return finalId;
        } catch (error) {
            console.error("Error creating course:", error);
            return null;
        }
    },

    async updateCourse(courseId: string, updates: Partial<Course>): Promise<boolean> {
        try {
            await updateDoc(doc(db, "courses", courseId), {
                ...updates,
                updatedAt: Timestamp.now()
            });
            return true;
        } catch (error) {
            console.error("Error updating course:", error);
            return false;
        }
    },

    async getCoursesByInstructor(instructorId: string): Promise<Course[]> {
        try {
            const q = query(collection(db, "courses"), where("instructorId", "==", instructorId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Course));
        } catch (error) {
            console.error("Error fetching instructor courses:", error);
            return [];
        }
    },

    // Enrollment Management
    async enrollInCourse(userId: string, courseId: string, paymentId?: string): Promise<string | null> {
        try {
            // Check if already enrolled
            const existingEnrollment = await this.getEnrollment(userId, courseId);
            if (existingEnrollment) {
                return existingEnrollment.id;
            }

            const course = await this.getCourseById(courseId);
            if (!course) return null;

            const now = new Date().toISOString();
            const enrollmentData = {
                userId,
                courseId,
                enrolledAt: Timestamp.now(),
                status: 'confirmed' as const,
                paymentId: paymentId || null,
                paymentStatus: (course.price === 0 || paymentId) ? 'completed' : 'pending',
                amount: course.price,
                progress: {
                    userId,
                    courseId,
                    enrolledAt: now,
                    completedLessons: [],
                    quizScores: {},
                    status: 'active',
                    lastAccessedAt: now,
                    attendancePercentage: 0,
                    totalAttendanceTime: 0
                } as UserCourseProgress,
                certificateIssued: false
            };

            const docRef = await addDoc(collection(db, "enrollments"), enrollmentData);

            // Update course enrollment count
            await this.updateCourse(courseId, {
                totalEnrollments: (course.totalEnrollments || 0) + 1
            });

            return docRef.id;
        } catch (error) {
            console.error("Error enrolling in course:", error);
            return null;
        }
    },

    async getEnrollment(userId: string, courseId: string): Promise<Enrollment | null> {
        try {
            const q = query(
                collection(db, "enrollments"),
                where("userId", "==", userId),
                where("courseId", "==", courseId)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return { id: doc.id, ...doc.data() } as Enrollment;
            }
            return null;
        } catch (error) {
            console.error("Error fetching enrollment:", error);
            return null;
        }
    },

    async getUserEnrollments(userId: string): Promise<Enrollment[]> {
        try {
            const q = query(collection(db, "enrollments"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Enrollment));
        } catch (error) {
            console.error("Error fetching user enrollments:", error);
            return [];
        }
    },

    async getCourseEnrollments(courseId: string): Promise<Enrollment[]> {
        try {
            const q = query(collection(db, "enrollments"), where("courseId", "==", courseId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Enrollment));
        } catch (error) {
            console.error("Error fetching course enrollments:", error);
            return [];
        }
    },

    async getCourseEnrollmentsFromSubcollection(courseId: string): Promise<Enrollment[]> {
        try {
            const enrollmentsRef = collection(db, "courses", courseId, "enrollments");
            const querySnapshot = await getDocs(enrollmentsRef);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Enrollment));
        } catch (error) {
            console.error("Error fetching course enrollments from subcollection:", error);
            return [];
        }
    },

    subscribeToCourseEnrollments(courseId: string, callback: (enrollments: Enrollment[]) => void) {
        const enrollmentsRef = collection(db, "courses", courseId, "enrollments");
        return onSnapshot(enrollmentsRef, (snapshot) => {
            const enrollments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Enrollment));
            callback(enrollments);
        });
    },

    subscribeToAllEnrollments(callback: (totalCount: number) => void) {
        const enrollmentsRef = collection(db, "enrollments");
        return onSnapshot(enrollmentsRef, (snapshot) => {
            callback(snapshot.size);
        });
    },

    // Live Session Management
    async createLiveSession(sessionData: Omit<LiveSession, 'id' | 'createdAt' | 'attendees'>): Promise<string | null> {
        try {
            const docRef = await addDoc(collection(db, "liveSessions"), {
                ...sessionData,
                createdAt: Timestamp.now(),
                attendees: []
            });
            return docRef.id;
        } catch (error) {
            console.error("Error creating live session:", error);
            return null;
        }
    },

    async getLiveSessionsByCourse(courseId: string): Promise<LiveSession[]> {
        try {
            const q = query(
                collection(db, "liveSessions"),
                where("courseId", "==", courseId),
                orderBy("scheduledAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as LiveSession));
        } catch (error) {
            console.error("Error fetching live sessions:", error);
            return [];
        }
    },

    async updateLiveSession(sessionId: string, updates: Partial<LiveSession>): Promise<boolean> {
        try {
            await updateDoc(doc(db, "liveSessions", sessionId), updates);
            return true;
        } catch (error) {
            console.error("Error updating live session:", error);
            return false;
        }
    },

    // Attendance Management
    async recordAttendance(attendanceData: Omit<AttendanceRecord, 'id'>): Promise<string | null> {
        try {
            const docRef = await addDoc(collection(db, "attendance"), attendanceData);
            return docRef.id;
        } catch (error) {
            console.error("Error recording attendance:", error);
            return null;
        }
    },

    async getUserAttendance(userId: string, courseId: string): Promise<AttendanceRecord[]> {
        try {
            const q = query(
                collection(db, "attendance"),
                where("userId", "==", userId),
                where("courseId", "==", courseId)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as AttendanceRecord));
        } catch (error) {
            console.error("Error fetching attendance:", error);
            return [];
        }
    },

    async calculateAttendancePercentage(userId: string, courseId: string): Promise<number> {
        try {
            const attendanceRecords = await this.getUserAttendance(userId, courseId);
            if (attendanceRecords.length === 0) return 0;

            const totalSessions = attendanceRecords.length;
            const presentSessions = attendanceRecords.filter(record =>
                record.status === 'present' || record.status === 'partial'
            ).length;

            return Math.round((presentSessions / totalSessions) * 100);
        } catch (error) {
            console.error("Error calculating attendance percentage:", error);
            return 0;
        }
    },

    // Certificate Management
    async issueCertificate(enrollmentId: string, certificateData: Omit<Certificate, 'id' | 'issuedAt' | 'certificateUrl' | 'verificationId'>): Promise<string | null> {
        try {
            const verificationId = `ZEST-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
            const certificatePayload = {
                ...certificateData,
                issuedAt: new Date().toISOString(),
                verificationId,
                certificateUrl: "",
            } as Omit<Certificate, 'id'>

            const docRef = await addDoc(collection(db, "certificates"), certificatePayload)
            const certificateUrl = `/certificates/${docRef.id}`

            await updateDoc(doc(db, "certificates", docRef.id), {
                certificateUrl
            })

            // Update enrollment
            await updateDoc(doc(db, "enrollments", enrollmentId), {
                certificateIssued: true,
                certificateId: docRef.id
            })

            return docRef.id
        } catch (error) {
            console.error("Error issuing certificate:", error)
            return null
        }
    },

    async getUserCertificates(userId: string): Promise<Certificate[]> {
        try {
            const q = query(collection(db, "certificates"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Certificate));
        } catch (error) {
            console.error("Error fetching certificates:", error);
            return [];
        }
    },

    async getCertificateById(certificateId: string): Promise<Certificate | null> {
        try {
            const certDoc = await getDoc(doc(db, "certificates", certificateId));
            if (!certDoc.exists()) return null;
            return { id: certDoc.id, ...certDoc.data() } as Certificate;
        } catch (error) {
            console.error("Error fetching certificate by ID:", error);
            return null;
        }
    },

    async getCertificateByVerificationId(verificationId: string): Promise<Certificate | null> {
        try {
            const q = query(collection(db, "certificates"), where("verificationId", "==", verificationId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) return null;
            const certDoc = querySnapshot.docs[0];
            return { id: certDoc.id, ...certDoc.data() } as Certificate;
        } catch (error) {
            console.error("Error fetching certificate by verification ID:", error);
            return null;
        }
    },

    async getAllCertificates(): Promise<Certificate[]> {
        try {
            const querySnapshot = await getDocs(collection(db, "certificates"));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Certificate));
        } catch (error) {
            console.error("Error fetching all certificates:", error);
            return [];
        }
    },

    async getAllUsers(): Promise<User[]> {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            return querySnapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            } as User));
        } catch (error) {
            console.error("Error fetching all users:", error);
            return [];
        }
    },

    async suspendUser(userId: string, suspend: boolean): Promise<boolean> {
        try {
            await updateDoc(doc(db, "users", userId), {
                suspended: suspend,
                updatedAt: Timestamp.now()
            });
            return true;
        } catch (error) {
            console.error("Error suspending user:", error);
            return false;
        }
    },

    async deleteCourse(courseId: string): Promise<boolean> {
        try {
            await deleteDoc(doc(db, "courses", courseId));
            return true;
        } catch (error) {
            console.error("Error deleting course:", error);
            return false;
        }
    },

    // Payment Management
    async createPayment(paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
        try {
            const docRef = await addDoc(collection(db, "payments"), {
                ...paymentData,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error creating payment:", error);
            return null;
        }
    },

    async updatePaymentStatus(paymentId: string, status: PaymentStatus, transactionId?: string): Promise<boolean> {
        try {
            const updates: any = {
                status,
                updatedAt: Timestamp.now()
            };
            if (transactionId) {
                updates.transactionId = transactionId;
            }
            await updateDoc(doc(db, "payments", paymentId), updates);
            return true;
        } catch (error) {
            console.error("Error updating payment status:", error);
            return false;
        }
    },

    // Access Control
    async canAccessCourse(userId: string, courseId: string): Promise<boolean> {
        try {
            const enrollment = await this.getEnrollment(userId, courseId);
            if (!enrollment) return false;

            // Check if payment is completed
            return enrollment.paymentStatus === 'completed';
        } catch (error) {
            console.error("Error checking course access:", error);
            return false;
        }
    },

    // Progress Tracking
    async updateProgress(userId: string, courseId: string, progressUpdates: Partial<UserCourseProgress>): Promise<boolean> {
        try {
            const enrollment = await this.getEnrollment(userId, courseId);
            if (!enrollment) return false;

            const updatedProgress = { 
                ...enrollment.progress, 
                ...progressUpdates,
                lastAccessedAt: new Date().toISOString()
            };

            // Calculate attendance percentage based on lesson completion
            const course = await this.getCourseById(courseId);
            if (course) {
                const totalLessons = course.modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0);
                if (totalLessons > 0) {
                    updatedProgress.attendancePercentage = Math.round((updatedProgress.completedLessons.length / totalLessons) * 100);
                }
            }

            await updateDoc(doc(db, "enrollments", enrollment.id), {
                progress: updatedProgress
            });
            return true;
        } catch (error) {
            console.error("Error updating progress:", error);
            return false;
        }
    },

    async completeLesson(userId: string, courseId: string, lessonId: string): Promise<boolean> {
        try {
            const enrollment = await this.getEnrollment(userId, courseId);
            if (!enrollment) return false;

            const completedLessons = [...(enrollment.progress.completedLessons || [])];
            if (!completedLessons.includes(lessonId)) {
                completedLessons.push(lessonId);
            }

            return await this.updateProgress(userId, courseId, { completedLessons });
        } catch (error) {
            console.error("Error completing lesson:", error);
            return false;
        }
    },

    // Legacy methods for backward compatibility
    async getLessonById(courseId: string, lessonId: string): Promise<Lesson | null> {
        const course = await LMSService.getCourseById(courseId);
        if (!course) return null;

        for (const module of course.modules) {
            const lesson = module.lessons.find(l => l.id === lessonId);
            if (lesson) return lesson;
        }
        return null;
    }
};
