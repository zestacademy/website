import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zestacademyonline.vercel.app'

    const routes = [
        '',
        '/explore',
        '/categories',
        '/roadmaps',
        '/roadmaps/python-basics',
        '/articles/ai-tools-guide',
        '/articles/comprehensive-guide-to-ai',
        '/articles/placement-interview-questions',
        '/articles/what-is-api',
        '/articles/resistor-guide',
        '/articles/digital-electronics-interview-questions',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
