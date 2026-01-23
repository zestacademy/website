import { Metadata } from "next"
import AIToolsGuideContent from "./content"

export const metadata: Metadata = {
    title: "The Ultimate Guide to AI Tools | Zest Academy",
    description: "Discover 84 powerful AI tools across 8 categories to transform your content creation, design, analytics, and productivity.",
    openGraph: {
        title: "The Ultimate Guide to AI Tools",
        description: "Supercharge your workflow with these 84 AI tools.",
        type: "article",
        url: "https://zestacademyonline.vercel.app/articles/ai-tools-guide",
    },
}

export default function AIToolsGuidePage() {
    return <AIToolsGuideContent />
}
