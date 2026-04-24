import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { SEO_TEMPLATES } from '@/lib/constants/templates-seo'
import { Briefcase, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Professional Resume Examples for 2026 | Clear Career Path',
    description: 'Explore 25+ professional resume examples for every industry. ATS-compliant, recruiter-approved, and ready to use. Find the perfect format for your next role.',
    keywords: ['resume examples', 'resume samples', 'job resume', 'CV examples', 'professional resume'],
}

export default function ResumeExamplesPage() {
    // Group templates by industry for better organization
    const industries = Array.from(new Set(SEO_TEMPLATES.map(t => t.industry)))

    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Hero Header */}
                <div className="text-center mb-24 relative">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-black tracking-widest uppercase mb-6 border border-primary-100 relative z-10">
                        <Star className="w-4 h-4 fill-primary-600" />
                        Industry Approved Samples
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-neutral-950 mb-8 tracking-tighter leading-none italic relative z-10">
                        Resume Examples <br />
                        <span className="text-primary-600">Built to Win.</span>
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-3xl mx-auto font-bold leading-relaxed relative z-10">
                        Don&apos;t start from scratch. Browse our curated collection of job-specific resume examples, 
                        all engineered for 100% ATS compliance and maximum recruiter impact.
                    </p>
                </div>

                {/* Industry Grid */}
                <div className="grid gap-20">
                    {industries.map(industry => {
                        const templates = SEO_TEMPLATES.filter(t => t.industry === industry)
                        return (
                            <div key={industry} className="space-y-10">
                                <div className="flex items-center gap-4 border-b border-neutral-100 pb-6">
                                    <div className="p-3 bg-neutral-900 rounded-2xl text-white">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-neutral-950 tracking-tight italic uppercase">{industry}</h2>
                                    <div className="flex-1 h-px bg-neutral-100 hidden md:block ml-4" />
                                    <span className="text-neutral-400 font-black text-sm uppercase tracking-widest">{templates.length} Examples</span>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {templates.map(template => (
                                        <Link 
                                            key={template.slug} 
                                            href={`/templates/${template.slug}`}
                                            className="group bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/20 hover:shadow-2xl hover:shadow-primary-100/40 hover:border-primary-200 hover:-translate-y-2 transition-all duration-500 flex flex-col"
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="p-3 bg-primary-50 rounded-xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-500">
                                                    <ShieldCheck className="w-6 h-6" />
                                                </div>
                                                <div className="bg-success-50 text-success-700 text-[10px] font-black px-3 py-1 rounded-full border border-success-100 uppercase tracking-widest">
                                                    99% Match
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                                                {template.title}
                                            </h3>
                                            <p className="text-neutral-500 font-medium text-sm leading-relaxed mb-8 line-clamp-2">
                                                {template.description}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-xs font-black text-neutral-400 uppercase tracking-widest group-hover:text-primary-400 transition-colors">View Details</span>
                                                <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-900 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Final CTA */}
                <div className="mt-40 p-16 md:p-24 rounded-[4rem] bg-neutral-950 text-white text-center relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 p-24 opacity-10 rotate-12 scale-150"><Zap className="w-64 h-64 text-primary-500" /></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px]" />
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-black mb-10 leading-[0.95] tracking-tighter uppercase italic">Ready to Clear <br />Your Path?</h2>
                        <p className="text-neutral-400 mb-14 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
                            Join 10,000+ top-tier professionals who have already claimed their seat at the table.
                        </p>
                        <Link href="/editor/setup" className="inline-flex items-center gap-4 bg-primary-600 text-white px-16 py-8 rounded-2xl font-black text-xl hover:bg-primary-700 hover:scale-105 transition-all shadow-2xl">
                            Get Started for Free
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
