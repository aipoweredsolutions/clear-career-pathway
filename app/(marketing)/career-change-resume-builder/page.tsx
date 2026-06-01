import React from 'react'
import { Metadata } from 'next'
import { Check, ShieldCheck, Zap, Target, Star, ArrowRight, RefreshCw, Briefcase, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Career Change Resume Builder | Switch Careers with Confidence (2026)',
    description: 'Transitioning to a new field? Our AI-powered career change resume builder helps you translate your existing skills into terms your new industry understands.',
    alternates: {
        canonical: '/career-change-resume-builder',
    },
    openGraph: {
        title: 'Career Change Resume Builder | Switch Careers with Confidence',
        description: 'Transitioning to a new field? Our AI-powered career change resume builder helps you translate your existing skills into terms your new industry understands.',
        type: 'website',
        url: '/career-change-resume-builder',
        images: [
            {
                url: '/api/og?title=Career%20Change%20Resume%20Builder&description=Switch%20Careers%20with%20Confidence',
                width: 1200,
                height: 630,
                alt: 'Career Change Resume Builder',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Career Change Resume Builder | Switch Careers with Confidence',
        description: 'Transitioning to a new field? Our AI-powered career change resume builder helps you translate your existing skills into terms your new industry understands.',
        images: ['/api/og?title=Career%20Change%20Resume%20Builder&description=Switch%20Careers%20with%20Confidence'],
    }
}

export default function CareerChangePage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-neutral-950 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#3b82f633,transparent_40%),radial-gradient(circle_at_70%_60%,#8b5cf633,transparent_40%)]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                            <RefreshCw className="w-4 h-4" />
                            TRANSITION SPECIALIST ENGINE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 uppercase tracking-tighter">
                            The Resume Builder for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Career Changers</span>
                        </h1>
                        <p className="text-xl text-white/60 font-medium leading-relaxed mb-10 max-w-2xl">
                            Pivot your professional identity without losing your expertise. Our AI identifies &quot;Transferable Skills&quot; and re-writes your history to perfectly match your new target industry.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="px-10 h-14 rounded-full font-black uppercase tracking-widest text-xs bg-blue-600 hover:bg-blue-700">
                                <Link href="/editor/setup">Start My Career Pivot</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategy Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter mb-4">How We Solve the <span className="text-blue-600">&quot;Experience Gap&quot;</span></h2>
                        <p className="text-neutral-500 font-medium max-w-2xl mx-auto">Transitioning industries requires a tactical shift in how you present your past. We automate that shift.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 hover:border-blue-200 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase italic tracking-tight mb-4">Skill Translation</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Our AI translates industry-specific jargon into &quot;Universal Professional Competencies&quot; that recruiters in your new field will immediately recognize.
                            </p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 hover:border-blue-200 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
                                <Briefcase className="w-6 h-6 text-violet-600" />
                            </div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase italic tracking-tight mb-4">Hybrid Templates</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Access specialized &quot;Functional&quot; and &quot;Hybrid&quot; layouts designed specifically to de-emphasize linear industry growth and highlight transferable impact.
                            </p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 hover:border-blue-200 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase italic tracking-tight mb-4">Gap Explanation</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Automatically generate high-impact professional summaries that explain your &quot;Why&quot; and bridge the gap between your old role and your new ambition.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial / Social Proof */}
            <section className="py-24 bg-blue-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative">
                        <Star className="absolute top-8 right-8 w-12 h-12 text-blue-100" />
                        <p className="text-2xl md:text-3xl font-bold text-neutral-900 italic mb-8 leading-relaxed">
                            &quot;I was a teacher for 10 years and wanted to move into Tech Sales. Clear Career Path re-wrote my &apos;classroom management&apos; into &apos;client relationship management&apos; and I landed 3 interviews in two weeks.&quot;
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden" />
                            <div>
                                <h4 className="font-black text-neutral-900 uppercase tracking-widest text-xs">Sarah Jenkins</h4>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase">SDR at Salesforce (Former Educator)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                        Your Old Career is <br />Your New Competitive Edge.
                    </h2>
                    <p className="text-white/60 text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Let our AI build the bridge between where you&apos;ve been and where you&apos;re going.
                    </p>
                    <Button size="lg" className="px-12 h-16 rounded-full font-black uppercase tracking-widest text-sm bg-blue-600 hover:bg-blue-700">
                        <Link href="/editor/setup">Build My Pivot Resume</Link>
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </section>
        </div>
    )
}
