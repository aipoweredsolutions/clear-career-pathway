import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.clearcareerpath.com'

    return {
        rules: {
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
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
