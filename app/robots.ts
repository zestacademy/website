import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zestacademyonline.vercel.app'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/my-learning/',
                '/onboarding/',
                '/login/',
                '/register/',
                '/forgot-password/'
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
