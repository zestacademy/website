import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zestacademy.tech'

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/explore',
        '/categories',
        '/about-us',
        '/contact',
        '/privacy-policy',
        '/terms-conditions',
    ]

    const staticEntries = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }))

    // 2. Dynamic Articles from File System
    let articleEntries: MetadataRoute.Sitemap = []
    try {
        const articlesDirectory = path.join(process.cwd(), 'app/articles')
        const articleFolders = fs.readdirSync(articlesDirectory, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)

        articleEntries = articleFolders.map((slug) => ({
            url: `${baseUrl}/articles/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    } catch (error) {
        console.error("Sitemap: Error reading articles directory:", error)
        // Fallback to a few known articles if fs fails
        const fallbackArticles = ['ai-tools-guide', 'placement-interview-questions']
        articleEntries = fallbackArticles.map(slug => ({
            url: `${baseUrl}/articles/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    }

    return [...staticEntries, ...articleEntries]
}
