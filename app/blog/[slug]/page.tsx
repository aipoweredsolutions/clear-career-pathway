import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/utils/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return { title: 'Post Not Found' }

    const ogUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.clearcareerpath.com'}/api/og`)
    ogUrl.searchParams.set('title', post.title)
    ogUrl.searchParams.set('description', post.excerpt)
    ogUrl.searchParams.set('score', '99') // High score for social proof

    return { 
        title: post.title, 
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [{ url: ogUrl.toString() }]
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [ogUrl.toString()]
        }
    }
}

export async function generateStaticParams() {
    return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) notFound()

    // Article Schema for AI SEO
    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "author": {
            "@type": "Organization",
            "name": "Clear Career Path"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Clear Career Path"
        }
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
            />
            <article className="max-w-4xl mx-auto px-6">
                
                <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-400 font-black text-[10px] uppercase tracking-[0.2em] mb-12 hover:text-primary-600 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary-50 px-4 py-2 rounded-xl text-primary-700 text-xs font-black uppercase tracking-widest border border-primary-100">
                        {post.category}
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-neutral-950 mb-8 tracking-tighter leading-tight italic">
                    {post.title}
                </h1>

                <div className="flex items-center gap-6 border-b border-neutral-100 pb-12 mb-12">
                    <div className="flex items-center gap-2 text-neutral-400 text-xs font-black uppercase tracking-widest">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-xs font-black uppercase tracking-widest">
                        <User className="w-4 h-4" />
                        By Clarity Team
                    </div>
                </div>

                <div 
                    className="prose prose-lg prose-neutral max-w-none 
                    prose-headings:text-neutral-950 prose-headings:font-black prose-headings:tracking-tight prose-headings:italic
                    prose-p:text-neutral-600 prose-p:font-medium prose-p:leading-relaxed
                    prose-strong:text-neutral-950 prose-strong:font-black
                    prose-li:text-neutral-600 prose-li:font-medium"
                >
                    <MDXRemote source={post.content} />
                </div>



            </article>
        </div>
    )
}
