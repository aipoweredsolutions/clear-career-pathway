import { MetadataRoute } from 'next'
import { SEO_TEMPLATES } from '@/lib/constants/templates-seo'
import { BLOG_POSTS } from '@/lib/constants/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.clearcareerpath.com'
    
    // Core static pages
    const routes = [
        '',
        '/pricing',
        '/samples',
        '/blog',
        '/ats-resume-scanner',
        '/resume-examples',
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

    // Dynamic Blog Pages
    const blogRoutes = BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...legalRoutes, ...templateRoutes, ...blogRoutes]
}
