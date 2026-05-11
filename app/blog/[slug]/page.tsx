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
    ogUrl.searchParams.set('score', 'Premium') // Quality label instead of fabricated score

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

                <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-8 tracking-tight leading-[1.2]">
                    {post.title}
                </h1>

                <div className="flex items-center gap-6 border-b border-neutral-100 pb-10 mb-10">
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <User className="w-3.5 h-3.5" />
                        By Clarity Team
                    </div>
                </div>

                <div 
                    className="prose prose-lg prose-neutral max-w-none 
                    prose-headings:text-neutral-900 prose-headings:font-extrabold prose-headings:tracking-tight
                    prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-8
                    prose-p:text-neutral-600 prose-p:text-[17px] prose-p:leading-[1.8] prose-p:mb-8
                    prose-strong:text-neutral-900 prose-strong:font-bold
                    prose-li:text-neutral-600 prose-li:font-medium prose-li:mb-4
                    prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-neutral-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-neutral-700"
                >
                    <MDXRemote source={post.content} />
                </div>



            </article>
        </div>
    )
}
