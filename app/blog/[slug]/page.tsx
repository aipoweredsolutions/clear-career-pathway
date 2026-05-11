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
        <div className="min-h-screen bg-white pb-24">
            {/* ── CINEMATIC HEADER ── */}
            <header className="relative pt-32 pb-20 bg-neutral-950 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),transparent)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                <div className="relative max-w-4xl mx-auto px-6 z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-500 font-black text-[10px] uppercase tracking-[0.3em] mb-12 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
                    </Link>

                    <div className="flex flex-col gap-6">
                        <div className="bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-xl w-max">
                            {post.category}
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] italic mb-4">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-primary-500" />
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-3.5 h-3.5 text-primary-500" />
                                By {post.author || 'Clarity Team'}
                            </div>
                            <div className="flex items-center gap-2 text-neutral-400">
                                <Clock className="w-3.5 h-3.5 text-primary-500" />
                                {Math.max(3, Math.round(post.content.split(' ').length / 200) + 2)} min read
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
            />
            
            <article className="max-w-4xl mx-auto px-6 mt-20">

                <div 
                    className="prose prose-neutral max-w-2xl mx-auto
                    prose-headings:text-neutral-950 prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic
                    prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-10 prose-h2:leading-tight
                    prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
                    prose-p:text-neutral-600 prose-p:text-[18px] prose-p:leading-[1.8] prose-p:mb-10 prose-p:font-medium
                    prose-strong:text-neutral-900 prose-strong:font-black
                    prose-li:text-neutral-600 prose-li:font-medium prose-li:mb-6 prose-li:text-[17px]
                    prose-ul:list-none prose-ul:pl-0
                    prose-blockquote:border-l-0 prose-blockquote:bg-neutral-50 prose-blockquote:py-12 prose-blockquote:px-12 prose-blockquote:rounded-[2rem] prose-blockquote:italic prose-blockquote:text-neutral-800 prose-blockquote:text-2xl prose-blockquote:font-black prose-blockquote:tracking-tight prose-blockquote:leading-snug prose-blockquote:my-16"
                >
                    <style jsx global>{`
                        .prose ul li {
                            position: relative;
                            padding-left: 2rem;
                        }
                        .prose ul li::before {
                            content: "—";
                            position: absolute;
                            left: 0;
                            color: #e5e5e5;
                            font-weight: 900;
                        }
                    `}</style>
                    <MDXRemote source={post.content} />
                </div>



            </article>
        </div>
    )
}
