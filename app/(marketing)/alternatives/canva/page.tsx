import React from 'react'
import { Metadata } from 'next'
import { Check, X, ShieldCheck, Zap, Target, Star, ArrowRight, Layout, MousePointer2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Canva Resume Alternative | Why Canva Resumes Fail ATS (2026)',
    description: 'Stop using Canva for your resume. Discover why Canva templates fail ATS filters and why Clear Career Path is the premium, 100% ATS-safe alternative for professionals.',
    alternates: {
        canonical: '/alternatives/canva',
    },
    openGraph: {
        title: 'Canva Resume Alternative | Why Canva Resumes Fail ATS',
        description: 'Stop using Canva for your resume. Discover why Canva templates fail ATS filters and why Clear Career Path is the premium, 100% ATS-safe alternative for professionals.',
        type: 'website',
        url: '/alternatives/canva',
        images: [
            {
                url: '/api/og?title=The%20Canva%20Resume%20Alternative&description=Professional%20Grade%20Engineering',
                width: 1200,
                height: 630,
                alt: 'Canva Alternative - Clear Career Path',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Canva Resume Alternative | Why Canva Resumes Fail ATS',
        description: 'Stop using Canva for your resume. Discover why Canva templates fail ATS filters and why Clear Career Path is the premium, 100% ATS-safe alternative for professionals.',
        images: ['/api/og?title=The%20Canva%20Resume%20Alternative&description=Professional%20Grade%20Engineering'],
    }
}

export default function CanvaAlternativePage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-violet-50 -skew-x-12 translate-x-20 z-0" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-black uppercase tracking-widest mb-6">
                            <ShieldCheck className="w-4 h-4" />
                            PROFESSIONAL GRADE ALTERNATIVE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-neutral-900 leading-[1.1] mb-8 uppercase tracking-tighter">
                            The <span className="text-violet-600">Canva Resume</span> Alternative
                        </h1>
                        <p className="text-xl text-neutral-600 font-medium leading-relaxed mb-10 max-w-2xl">
                            Canva is great for Instagram, but terrible for your career. Graphic-heavy resumes are the #1 reason qualified candidates are rejected by ATS systems. Switch to professional-grade engineering.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="px-10 h-14 rounded-full font-black uppercase tracking-widest text-xs bg-violet-600 hover:bg-violet-700">
                                <Link href="/editor/setup">Create an ATS-Safe Resume</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="px-10 h-14 rounded-full font-black uppercase tracking-widest text-xs border-2">
                                <Link href="/templates">See Pro Designs</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Canva Fails Section */}
            <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
                                Why Canva Resumes <br /><span className="text-rose-500">Fail ATS Filters</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <X className="w-5 h-5 text-rose-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Non-Selectable Text</h4>
                                        <p className="text-white/50 text-sm">Canva often exports text as flattened images, making it impossible for recruiters to search for your skills.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <X className="w-5 h-5 text-rose-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Graphic Overload</h4>
                                        <p className="text-white/50 text-sm">Icons, shapes, and complex layouts confuse Applicant Tracking Systems (ATS), leading to garbled data parsing.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <X className="w-5 h-5 text-rose-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Inconsistent PDF Metadata</h4>
                                        <p className="text-white/50 text-sm">Canva PDFs lack the semantic structure needed for professional HR software to read your career history correctly.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-[3rem] p-12 border border-white/10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="font-black uppercase tracking-widest text-sm italic">Clear Career Solution</h3>
                            </div>
                            <p className="text-white/80 text-lg font-medium leading-relaxed mb-8">
                                &quot;Clear Career Path uses proprietary <span className="text-violet-400">ATS-Series</span> rendering. We guarantee that your resume looks like a designer piece while reading like a technical document to the bots.&quot;
                            </p>
                            <div className="flex items-center gap-4 text-sm font-bold text-violet-400">
                                <Check className="w-5 h-5" /> Trusted by Fortune 500 Applicants
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight mb-16">Clear Career vs. Canva</h2>
                    
                    <div className="max-w-4xl mx-auto border-2 border-neutral-100 rounded-[2.5rem] overflow-hidden">
                        <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-100">
                            <div className="p-6 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Benefit</div>
                            <div className="p-6 text-center bg-violet-100 text-violet-700 font-black uppercase tracking-widest text-[10px]">Clear Career</div>
                            <div className="p-6 text-center text-neutral-400 font-black uppercase tracking-widest text-[10px]">Canva</div>
                        </div>
                        {[
                            { label: 'ATS Parsing Guarantee', cc: true, canva: false },
                            { label: 'Professional Typography', cc: true, canva: true },
                            { label: 'AI Keyword Optimization', cc: true, canva: false },
                            { label: 'HR-Specific Templates', cc: true, canva: false },
                            { label: 'PDF/DOCX/HTML Export', cc: true, canva: false },
                        ].map((row, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-neutral-50 last:border-0">
                                <div className="p-6 text-left text-sm font-bold text-neutral-900">{row.label}</div>
                                <div className="p-6 text-center bg-violet-50/30">
                                    <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                                </div>
                                <div className="p-6 text-center">
                                    {row.canva ? <Check className="w-5 h-5 text-neutral-300 mx-auto" /> : <X className="w-5 h-5 text-rose-400 mx-auto" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-violet-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                        Stop Decorating. <br />Start Getting Hired.
                    </h2>
                    <p className="text-white/80 text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of professionals who switched from Canva to Clear Career Path and finally beat the Applicant Tracking Systems.
                    </p>
                    <Button size="lg" className="px-12 h-16 rounded-full font-black uppercase tracking-widest text-sm bg-white text-violet-600 hover:bg-neutral-100">
                        <Link href="/editor/setup">Build My Professional Resume</Link>
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </section>
        </div>
    )
}
