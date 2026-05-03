import { Metadata } from "next"
import PlacementInterviewQuestionsContent from "./content"

export const metadata: Metadata = {
    title: "Top 50 Placement Interview Questions & Expert Answers | Zest Academy",
    description: "Comprehensive guide to ace your job interviews. Expert answers to the 50 most common HR and technical placement interview questions for engineering students.",
    openGraph: {
        title: "Top 50 Placement Interview Questions & Expert Answers",
        description: "Expert answers to the most common placement interview questions for engineering students. Ace your HR and technical rounds with this comprehensive guide.",
        type: "article",
        url: "https://zestacademy.tech/articles/placement-interview-questions",
    },
    authors: [{ name: "Zest Academy Editorial Team" }],
}

export default function PlacementInterviewQuestionsPage() {
    return <PlacementInterviewQuestionsContent />
}
