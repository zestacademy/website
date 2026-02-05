
import { Course, Module, Lesson } from "@/types/lms";
import { ALL_COURSES_DATA } from "@/lib/lms-data";

export const LMSService = {
    getAllCourses: async (): Promise<Course[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        return ALL_COURSES_DATA;
    },

    getCourseById: async (courseId: string): Promise<Course | null> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return ALL_COURSES_DATA.find(c => c.id === courseId) || null;
    },

    // In a real app, this would fetch specific lesson content
    getLessonById: async (courseId: string, lessonId: string): Promise<Lesson | null> => {
        const course = ALL_COURSES_DATA.find(c => c.id === courseId);
        if (!course) return null;

        for (const module of course.modules) {
            const lesson = module.lessons.find(l => l.id === lessonId);
            if (lesson) return lesson;
        }
        return null;
    }
};
