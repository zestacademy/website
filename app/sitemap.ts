import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zestacademy.tech'

    const routes = [
        '',
        '/explore',
        '/categories',
        '/courses',
        '/courses/python-basics',
        '/courses/internet-of-things',
        '/articles/ai-tools-guide',
        '/articles/comprehensive-guide-to-ai',
        '/articles/placement-interview-questions',
        '/articles/what-is-api',
        '/articles/resistor-guide',
        '/articles/digital-electronics-interview-questions',
        '/articles/electronics-to-embedded-mastery',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
