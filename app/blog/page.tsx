import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { getAllPosts } from '@/lib/utils/mdx'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Career Advice & Resume Writing Guides | Clear Career Path',
    description: 'Expert advice on resume writing, job searching, and career growth. Learn how to optimize your resume for ATS and land more interviews.',
    keywords: ['resume writing tips', 'career advice blog', 'ATS optimization guide', 'job search strategies', 'interview preparation'],
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        title: 'Career Advice & Resume Writing Guides | Clear Career Path',
        description: 'Expert advice on resume writing, job searching, and career growth. Learn how to optimize your resume for ATS and land more interviews.',
        url: '/blog',
    },
}

// Rough reading time estimate
function readingTime(excerpt: string) {
    const words = excerpt.split(' ').length
    const mins = Math.max(3, Math.round(words / 200) + 3)
    return `${mins} min read`
}

export default function BlogIndexPage() {
    const BLOG_POSTS = getAllPosts()
    const [featured, ...rest] = BLOG_POSTS

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-24">
            {/* ── CINEMATIC HEADER ── */}
            <header className="relative pt-32 pb-20 bg-neutral-950 overflow-hidden mb-20">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),transparent)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                <div className="relative max-w-6xl mx-auto px-6 z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="h-px w-8 bg-primary-500" />
                        <span className="text-primary-400 text-[10px] font-black uppercase tracking-[0.3em]">
                            Career Intelligence
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] italic mb-6">
                        Expert <span className="text-primary-500">Insights.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-medium">
                        Master the art of professional storytelling, ATS compliance, and high-impact job search strategy.
                    </p>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6">

                {/* ── Divider ── */}
                <div className="h-px bg-neutral-100 mb-12" />

                {/* ── Featured Post ── */}
                {featured && (
                    <Link
                        href={`/blog/${featured.slug}`}
                        className="group block mb-12"
                    >
                        <article className="relative bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-500 md:grid md:grid-cols-5">
                            {/* Accent strip */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-500 rounded-l-3xl" />

                            {/* Content — wider column */}
                            <div className="md:col-span-3 p-8 md:p-12 flex flex-col">
                                {/* Meta row */}
                                <div className="flex items-center flex-wrap gap-3 mb-6">
                                    <span className="bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                                        {featured.category}
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>

                                {/* Heading */}
                                <h2 className="text-xl md:text-3xl font-black text-neutral-900 tracking-tight leading-tight mb-5 group-hover:text-primary-600 transition-colors duration-300">
                                    {featured.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-neutral-500 font-medium text-[15px] leading-relaxed mb-10 line-clamp-3">
                                    {featured.excerpt}
                                </p>

                                {/* CTA */}
                                <div className="mt-auto inline-flex items-center gap-2 text-primary-600 font-black text-[11px] uppercase tracking-[0.18em]">
                                    Read Full Guide
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>

                            {/* Right decorative panel */}
                            <div className="hidden md:flex md:col-span-2 bg-gradient-to-br from-primary-50 via-primary-50/60 to-white items-center justify-center p-10">
                                <div className="text-center space-y-2">
                                    <div className="text-[4.5rem] font-black text-primary-200 tracking-tighter leading-none italic select-none">
                                        01
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-primary-400">
                                        Featured Guide
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                )}

                {/* ── Section label ── */}
                {rest.length > 0 && (
                    <div className="flex items-center gap-4 mb-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-neutral-400">
                            All Articles
                        </span>
                        <span className="h-px flex-1 bg-neutral-100" />
                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-neutral-300">
                            {BLOG_POSTS.length} guides
                        </span>
                    </div>
                )}

                {/* ── Post Grid ── */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group bg-white rounded-2xl border border-neutral-100 shadow-md shadow-neutral-200/20 overflow-hidden flex flex-col hover:shadow-lg hover:shadow-neutral-200/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            {/* Top colour bar — subtle */}
                            <div className="h-0.5 w-full bg-gradient-to-r from-primary-400 to-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="p-7 flex flex-col flex-1">
                                {/* Meta */}
                                <div className="flex items-center gap-3 mb-5 flex-wrap">
                                    <span className="bg-neutral-50 border border-neutral-200 text-neutral-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                                        {post.category}
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {readingTime(post.excerpt)}
                                    </span>
                                </div>

                                {/* Heading */}
                                <h3 className="text-xl font-black text-neutral-900 tracking-tight leading-snug mb-3 group-hover:text-primary-600 transition-colors duration-200">
                                    {post.title}
                                </h3>

                                {/* Date */}
                                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>

                                {/* Excerpt */}
                                <p className="text-neutral-500 text-sm font-medium leading-relaxed line-clamp-3 mb-7">
                                    {post.excerpt}
                                </p>

                                {/* CTA */}
                                <div className="mt-auto flex items-center gap-1.5 text-primary-600 font-black text-[10px] uppercase tracking-[0.18em]">
                                    Read Guide
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ── Empty state ── */}
                {BLOG_POSTS.length === 0 && (
                    <div className="text-center py-32 px-6 bg-white border border-neutral-100 rounded-[2.5rem] shadow-xl shadow-neutral-200/40 relative overflow-hidden">
                        {/* Background subtle elements */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.03),transparent_50%)]" />
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 bg-neutral-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-neutral-100">
                                <Clock className="w-10 h-10 text-neutral-300" />
                            </div>
                            <h3 className="text-3xl font-black text-neutral-900 tracking-tight mb-4">
                                Strategic Insights <span className="text-primary-600 italic">Incoming.</span>
                            </h3>
                            <p className="text-neutral-500 font-bold max-w-md mx-auto leading-relaxed mb-8">
                                Our career experts are currently drafting new high-impact guides. Check back soon for actionable advice to accelerate your job search.
                            </p>
                            
                            <Link href="/editor/setup">
                                <button className="inline-flex items-center gap-2 bg-neutral-900 text-white font-black text-[11px] uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-neutral-800 transition shadow-xl hover:-translate-y-0.5">
                                    Build Your Resume Now <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
