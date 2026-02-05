
import { LMSService } from "@/services/lms-service"
import { notFound, redirect } from "next/navigation"
import SidebarClient from "@/components/courses/SidebarClient"

export default async function LearningLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ courseId: string }>
}) {
    const { courseId } = await params
    const course = await LMSService.getCourseById(courseId)

    if (!course) {
        notFound()
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex w-80 flex-col border-r bg-card z-20">
                <SidebarClient course={course} />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Mobile Header could go here */}
                <div className="md:hidden p-4 border-b flex items-center justify-between">
                    <span className="font-bold truncate">{course.title}</span>
                    {/* Mobile Menu Trigger would go here */}
                </div>
                {children}
            </main>
        </div>
    )
}
