import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_POSTS } from '@/lib/data/blog'
import { ArrowLeft, Calendar, User, Clock, ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { ShareButton } from '@/components/blog/ShareButton'

interface PageProps {
    params: Promise<{ slug: string }>
}

// SSG: Pre-generate all blog post routes
export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }))
}

// SEO: Dynamic metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const post = BLOG_POSTS.find((p) => p.slug === slug)
    
    if (!post) return { title: 'Post Not Found' }

    return {
        title: `${post.title} | Clear Career Path Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [{ url: post.image }],
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        }
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = BLOG_POSTS.find(p => p.slug === slug)

    if (!post) notFound()

    // Calculate reading time (roughly 200 wpm)
    const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://clearcareerpath.com'
    const fullUrl = `${baseUrl}/blog/${slug}`

    return (
        <article className="min-h-screen bg-[#FDFDFD]">
            {/* Minimal Navigation Over Hero */}
            <div className="absolute top-0 left-0 w-full z-20 h-24 flex items-center px-6 pointer-events-none">
                <div className="max-w-7xl mx-auto w-full flex pointer-events-auto">
                    <Link href="/blog" className="group flex items-center gap-2 text-white/70 hover:text-white font-bold transition-all bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-white/20">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Library
                    </Link>
                </div>
            </div>

            {/* Immersive Hero Header */}
            <header className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-24 text-white overflow-hidden bg-black">
                {/* Background Image with Cinematic Overlay */}
                <div className="absolute inset-0 opacity-60">
                    <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white">
                            {post.category}
                        </span>
                        <div className="h-px w-8 bg-white/20" />
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                            <Clock className="w-4 h-4" />
                            {readingTime} min read
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black mb-10 leading-[1.05] tracking-tight text-white italic drop-shadow-2xl">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-10 text-white/80 border-t border-white/10 pt-10">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-lg shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                {post.author.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-widest text-white/40 mb-1 leading-none">Written by</span>
                                <span className="font-black text-lg tracking-tight group-hover:text-white transition-colors">{post.author}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white/40" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-widest text-white/40 mb-1 leading-none">Published</span>
                                <span className="font-black text-lg tracking-tight">
                                    {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
                
                {/* Left Sidebar: Sticky Meta/Sharing */}
                <aside className="lg:col-span-3 space-y-10">
                    <div className="lg:sticky lg:top-40 space-y-12">
                        {/* Summary Capsule */}
                        <div className="p-8 bg-white border border-neutral-100 rounded-3xl shadow-sm space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400">Quick Recap</h3>
                            <p className="text-sm font-bold text-neutral-600 leading-relaxed italic border-l-2 border-indigo-100 pl-4">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Interactive Share Component (Client) */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 ml-2">Spread the Word</h3>
                            <ShareButton title={post.title} url={fullUrl} />
                        </div>

                        {/* Recommendation Prompt */}
                        <div className="p-8 rounded-3xl bg-neutral-900 text-white space-y-6 relative overflow-hidden group">
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-600/20 blur-3xl rounded-full" />
                            <h4 className="text-lg font-black italic relative z-10 leading-tight">Ready to stand out <br/> from the crowd?</h4>
                            <p className="text-xs text-white/60 font-medium relative z-10 leading-relaxed">
                                Our AI-powered builder implements every tip mentioned here automatically.
                            </p>
                            <Link href="/editor/setup" className="relative z-10 block w-full bg-white text-black text-center py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                                Start Your Journey
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="lg:col-span-7 bg-white p-2 md:p-10">
                    <div
                        className="prose prose-xl prose-neutral max-w-none 
                        prose-headings:font-black prose-headings:italic prose-headings:tracking-tighter prose-headings:text-neutral-900
                        prose-p:text-neutral-600 prose-p:leading-[1.8] prose-p:font-medium
                        prose-strong:text-neutral-900 prose-strong:font-black
                        prose-a:text-indigo-600 prose-a:font-black prose-a:underline-offset-8
                        prose-blockquote:border-l-4 prose-blockquote:border-indigo-600 prose-blockquote:bg-indigo-50/50 prose-blockquote:p-10 prose-blockquote:rounded-3xl prose-blockquote:not-italic
                        prose-li:text-neutral-600 prose-li:font-medium
                        prose-lead:text-xl md:prose-lead:text-2xl prose-lead:font-black prose-lead:text-neutral-900 prose-lead:italic prose-split-header"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Footer Nav */}
                    <footer className="mt-20 pt-16 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-8">
                        <Link href="/blog" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            Browse More Articles
                        </Link>
                        <div className="flex items-center gap-6">
                            <Link href="/editor/setup" className="text-primary-600 font-black text-sm uppercase tracking-widest flex items-center gap-2 group">
                                Create Your Resume <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </footer>
                </main>
            </div>
        </article>
    )
}
