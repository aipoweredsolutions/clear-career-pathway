'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_POSTS } from '@/lib/data/blog'
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react'

export default function BlogPostPage() {
    const params = useParams()
    const slug = params.slug as string

    const post = BLOG_POSTS.find(p => p.slug === slug)

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <Link href="/blog" className="text-primary-600 font-bold flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <article className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="bg-neutral-900 py-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover blur-sm"
                        priority
                    />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-primary-400 font-bold mb-8 hover:text-primary-300 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Resources
                    </Link>
                    <div className="flex justify-center gap-4 mb-6">
                        <span className="bg-primary-600/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                            {post.category}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{post.title}</h1>
                    <div className="flex flex-wrap items-center justify-center gap-8 text-neutral-300">
                        <div className="flex items-center gap-2">
                            <span className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-sm">
                                {post.author.charAt(0)}
                            </span>
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-20">
                {/* Content */}
                <div
                    className="prose prose-lg prose-neutral max-w-none 
                    prose-headings:font-bold prose-headings:text-neutral-900
                    prose-p:text-neutral-600 prose-p:leading-relaxed
                    prose-strong:text-neutral-900 prose-a:text-primary-600
                    prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-neutral-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-16 pt-8 border-t border-neutral-100 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="p-3 rounded-xl bg-neutral-50 text-neutral-600 hover:bg-neutral-100 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                    <Link href="/editor/setup" className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Build Your Resume Now
                    </Link>
                </div>
            </div>
        </article>
    )
}
