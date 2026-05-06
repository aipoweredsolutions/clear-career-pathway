import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.clearcareerpath.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/auth/',
                    '/dashboard/',
                    '/editor/',
                    '/studio/',
                    '/account/',
                    '/preview/'
                ],
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'Google-Extended', 'PerplexityBot'],
                allow: ['/', '/blog/', '/templates/', '/resume-examples/', '/samples/', '/ai-integrity'],
                disallow: ['/api/', '/editor/'],
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
