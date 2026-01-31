'use client'

import React from 'react'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/data/blog'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Career Resources & Insights</h1>
                    <p className="text-xl text-neutral-600">
                        Expert advice on resume writing, job searching, and career advancement to help you clear your path.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                                        <Tag className="w-3 h-3" />
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {post.author}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-neutral-600 mb-8 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="mt-auto inline-flex items-center text-primary-600 font-bold hover:gap-2 transition-all"
                                >
                                    Read Article
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
