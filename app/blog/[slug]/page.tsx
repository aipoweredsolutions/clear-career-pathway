import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, BLOG_POSTS } from '@/lib/constants/blog-posts'
import { getTemplateBySlug } from '@/lib/constants/templates-seo'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'

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
    return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) notFound()

    const relatedTemplates = post.relatedTemplates
        .map(slug => getTemplateBySlug(slug))
        .filter(t => !!t)

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

                {/* Main Content Area */}
                <div 
                    className="prose prose-lg prose-neutral max-w-none 
                    prose-headings:text-neutral-950 prose-headings:font-black prose-headings:tracking-tight prose-headings:italic
                    prose-p:text-neutral-600 prose-p:font-medium prose-p:leading-relaxed
                    prose-strong:text-neutral-950 prose-strong:font-black
                    prose-li:text-neutral-600 prose-li:font-medium"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Related Templates Sidebar/Bottom Section */}
                <div className="mt-24 pt-24 border-t border-neutral-100">
                    <h2 className="text-3xl font-black text-neutral-950 mb-10 tracking-tight italic uppercase">Recommended Templates</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {relatedTemplates.map(template => (
                            <Link 
                                key={template.slug} 
                                href={`/templates/${template.slug}`}
                                className="group bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 hover:bg-white hover:shadow-2xl hover:border-primary-100 transition-all duration-500"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <ShieldCheck className="w-5 h-5 text-primary-600" />
                                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest group-hover:text-primary-400 transition-colors">ATS-Compliant</span>
                                </div>
                                <h3 className="text-xl font-black text-neutral-950 mb-2 tracking-tight group-hover:text-primary-600 transition-colors">{template.title}</h3>
                                <p className="text-neutral-500 text-xs font-medium mb-6 line-clamp-1">{template.description}</p>
                                <div className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                    Use This Template <ArrowRight className="w-3 h-3" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </article>
        </div>
    )
}
