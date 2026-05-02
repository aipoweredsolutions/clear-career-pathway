import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/constants/blog-posts'
import { ArrowRight, BookOpen, Calendar } from 'lucide-react'

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

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-black text-neutral-950 mb-8 tracking-tighter leading-none italic">
                        Career <span className="text-primary-600">Insights.</span>
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-3xl mx-auto font-bold leading-relaxed">
                        Master the art of professional storytelling and technical compliance to land your dream role.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map(post => (
                        <Link 
                            key={post.slug} 
                            href={`/blog/${post.slug}`}
                            className="group bg-white rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/20 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary-50 px-3 py-1.5 rounded-lg text-primary-700 text-[10px] font-black uppercase tracking-widest border border-primary-100">
                                        {post.category}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-neutral-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-primary-600 font-black text-xs uppercase tracking-widest">
                                    Read Full Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
