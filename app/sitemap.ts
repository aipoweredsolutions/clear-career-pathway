import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/constants/blog-posts'
import { SEO_TEMPLATES } from '@/lib/constants/templates-seo'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.clearcareerpath.com'

    // 1. Core Product Pages
    const coreRoutes = [
        '',
        '/pricing',
        '/templates',
        '/resume-examples',
        '/blog',
        '/ats-resume-scanner',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Marketing & SEO Pages (app/(marketing))
    const marketingRoutes = [
        '/alternatives/zety',
        '/alternatives/canva',
        '/career-change-resume-builder',
        '/ai-integrity'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // 2. Dynamic Blog Posts
    const blogRoutes = BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // 3. Dynamic SEO Templates
    const templateRoutes = SEO_TEMPLATES.map((template) => ({
        url: `${baseUrl}/templates/${template.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...coreRoutes, ...marketingRoutes, ...blogRoutes, ...templateRoutes]
}
