import { MetadataRoute } from 'next'
import { SEO_TEMPLATES } from '@/lib/constants/templates-seo'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.clearcareerpath.com'
    
    // Core static pages
    const routes = [
        '',
        '/pricing',
        '/samples',
        '/blog',
        '/career-hub',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Legal pages (lower priority)
    const legalRoutes = [
        '/privacy',
        '/terms'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    // Dynamic Template Pages
    const templateRoutes = SEO_TEMPLATES.map((template) => ({
        url: `${baseUrl}/templates/${template.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...routes, ...legalRoutes, ...templateRoutes]
}
