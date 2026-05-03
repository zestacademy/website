import { Metadata } from "next"
import WhatIsApiContent from "./content"

export const metadata: Metadata = {
    title: "What Is an API? A Beginner's Complete Guide | Zest Academy",
    description: "Understand APIs from scratch — what they are, how REST and GraphQL APIs work, authentication methods, real-world examples, and how to start building your own API.",
    openGraph: {
        title: "What Is an API? A Beginner's Complete Guide",
        description: "A clear, practical explanation of APIs — REST, GraphQL, authentication, and real-world usage for developers and engineering students.",
        type: "article",
        url: "https://zestacademy.tech/articles/what-is-api",
    },
    authors: [{ name: "Zest Academy Editorial Team" }],
    keywords: ["what is an API", "REST API", "GraphQL", "API tutorial", "API for beginners", "HTTP methods", "API authentication", "JSON API", "web API"],
}

export default function WhatIsApiPage() {
    return <WhatIsApiContent />
}
