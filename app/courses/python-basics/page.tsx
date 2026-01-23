import { Metadata } from "next"
import PythonBasicsContent from "./content"

export const metadata: Metadata = {
    title: "20-Day Python Learning Course | Zest Academy",
    description: "Complete Python journey from basics to advanced concepts. Build real projects and master Python in just 20 days!",
    openGraph: {
        title: "20-Day Python Learning Course",
        description: "Master Python from scratch with our structured 20-day learning path. Includes projects, exercises, and notes.",
        url: "https://zestacademyonline.vercel.app/courses/python-basics",
        type: "website",
    },
    alternates: {
        canonical: "/courses/python-basics",
    },
}

export default function PythonBasicsCoursePage() {
    return <PythonBasicsContent />
}
