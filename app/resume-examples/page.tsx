'use client'

import React from 'react'
import Link from 'next/link'
import { SEO_TEMPLATES } from '@/lib/constants/templates-seo'
import { Briefcase, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react'
import { LiveTemplatePreview } from '@/components/home/LiveTemplatePreview'

export default function ResumeExamplesPage() {
    // Deduplicate templates by templateId to avoid repetition
    // We sort to prioritize industry-specific examples over "General" ones
    const uniqueTemplates = [...SEO_TEMPLATES]
        .sort((a, b) => {
            if (a.industry !== 'General' && b.industry === 'General') return -1;
            if (a.industry === 'General' && b.industry !== 'General') return 1;
            return 0;
        })
        .reduce((acc, current) => {
            const x = acc.find(item => item.templateId === current.templateId);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, [] as typeof SEO_TEMPLATES);

    // Group templates by industry for better organization
    const industries = Array.from(new Set(uniqueTemplates.map(t => t.industry))).sort((a, b) => {
        if (a === 'General') return -1;
        if (b === 'General') return 1;
        return a.localeCompare(b);
    })

    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Hero Header */}
                <div className="text-center mb-12 relative">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-[10px] font-black tracking-widest uppercase mb-4 border border-primary-100 relative z-10">
                        <Star className="w-3.5 h-3.5 fill-primary-600" />
                        Industry Approved Samples
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-neutral-950 mb-4 tracking-tighter leading-none italic relative z-10">
                        Resume Examples <br />
                        <span className="text-primary-600">Built to Win.</span>
                    </h1>
                    <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-bold leading-relaxed relative z-10">
                        Browse our curated collection of job-specific resume examples, 
                        engineered for 100% ATS compliance and maximum recruiter impact.
                    </p>
                </div>

                {/* Sticky Category Navigation */}
                <div className="sticky top-20 z-40 bg-[#FDFDFD]/80 backdrop-blur-md py-4 mb-12 border-b border-neutral-100 overflow-x-auto no-scrollbar -mx-6 px-6">
                    <div className="flex items-center gap-2 min-w-max">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mr-4">Jump To:</span>
                        {industries.map(industry => (
                            <a 
                                key={industry} 
                                href={`#${industry.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-all whitespace-nowrap border border-transparent hover:border-primary-100"
                            >
                                {industry}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Industry Grid */}
                <div className="grid gap-10">
                    {industries.map(industry => {
                        const templates = uniqueTemplates.filter(t => t.industry === industry)
                        const industryId = industry.toLowerCase().replace(/\s+/g, '-')
                        return (
                            <div key={industry} id={industryId} className="space-y-4 scroll-mt-48">
                                <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                                    <div className="p-1.5 bg-neutral-900 rounded-lg text-white">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-lg font-black text-neutral-950 tracking-tight italic uppercase">{industry}</h2>
                                    <div className="flex-1 h-px bg-neutral-100 hidden md:block ml-3" />
                                    <span className="text-neutral-400 font-black text-[9px] uppercase tracking-[0.2em]">{templates.length} Examples</span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                    {templates.map(template => (
                                        <Link 
                                            key={template.slug} 
                                            href={`/templates/${template.slug}`}
                                            className="group bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                        >
                                            {/* Live WYSIWYG Preview */}
                                            <div className="aspect-[3/4] bg-white rounded-xl mb-3 overflow-hidden relative border border-neutral-100 group-hover:border-primary-300 transition-all shadow-sm">
                                                <LiveTemplatePreview 
                                                    templateId={template.templateId}
                                                    sampleDataKey={template.sampleDataKey}
                                                    title={template.title}
                                                />
                                                
                                                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="bg-white/95 backdrop-blur-md text-primary-600 font-black text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all border border-primary-100">
                                                        Use This Example
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-[11px] font-black text-neutral-950 tracking-tight leading-tight group-hover:text-primary-600 transition-colors line-clamp-1 mb-0.5">
                                                    {template.title.replace('ATS Resume Template for ', '')}
                                                </h3>
                                                <div className="text-[8px] text-neutral-400 font-black uppercase tracking-widest">
                                                    {template.name}
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
                <div className="mt-20 p-10 md:p-16 rounded-[3rem] bg-neutral-950 text-white text-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5">
                    {/* Premium Glow Effects */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                    <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 scale-125 pointer-events-none"><Zap className="w-48 h-48 text-primary-500" /></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic">
                            Ready to Clear <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-200 to-white">Your Path?</span>
                        </h2>
                        <p className="text-neutral-100 mb-10 text-lg max-w-xl mx-auto font-bold leading-relaxed">
                            Join 10,000+ top-tier professionals already using Clear Career Path.
                        </p>
                        <Link href="/editor/setup" className="inline-flex items-center gap-3 bg-primary-600 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-primary-700 hover:scale-105 transition-all shadow-2xl shadow-primary-900/40">
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
