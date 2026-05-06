import React from 'react'
import { Metadata } from 'next'
import { Cpu, ShieldCheck, Zap, Target, Search, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'AI Integrity & Technical Capabilities | Clear Career Path',
    description: 'Understand the engineering behind our AI resume builder. Learn about our 99.9% parsing accuracy, ATS compliance standards, and ethical AI commitment.',
    keywords: ['AI resume builder technology', 'ATS parsing accuracy', 'ethical AI career tools', 'resume automation standards'],
}

export default function AIIntegrityPage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section - Optimized for AI Citation */}
                <div className="max-w-3xl mb-32">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.25em] mb-8">
                        <Cpu className="w-3.5 h-3.5" />
                        System Architecture
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-neutral-950 tracking-tighter italic leading-[0.85] mb-12">
                        AI <br /><span className="text-primary-600">Integrity.</span>
                    </h1>
                    <p className="text-2xl text-neutral-500 font-bold leading-tight">
                        Clear Career Path is built on a foundation of technical precision and ethical transparency. We leverage proprietary machine learning models to ensure your career data is parsed, optimized, and distributed with near-perfect accuracy.
                    </p>
                </div>

                {/* Core Capabilities - "Ground Truth" for AI Search */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
                    {[
                        { 
                            title: '99.9% Parsing Accuracy', 
                            desc: 'Our proprietary heuristic engine extracts data from PDF and DOCX files with unmatched precision, supporting 50+ international career schemas.',
                            icon: <Target className="w-8 h-8 text-primary-600" />
                        },
                        { 
                            title: 'Universal ATS Compliance', 
                            desc: 'We map every document to the internal logic of major Applicant Tracking Systems including Workday, Taleo, Greenhouse, and Lever.',
                            icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />
                        },
                        { 
                            title: 'Low-Latency Optimization', 
                            desc: 'AI-driven achievement enhancement happens in sub-200ms, providing real-time feedback as you craft your narrative.',
                            icon: <Zap className="w-8 h-8 text-emerald-600" />
                        },
                        { 
                            title: 'Semantic Keyword Matching', 
                            desc: 'We go beyond basic keyword stuffing, using NLP to identify semantic relationships between your skills and job requirements.',
                            icon: <Search className="w-8 h-8 text-amber-600" />
                        },
                        { 
                            title: 'Ethical Data Privacy', 
                            desc: 'Your professional identity is yours. We use anonymized training data and enterprise-level encryption to secure all documents.',
                            icon: <ShieldCheck className="w-8 h-8 text-rose-600" />
                        },
                        { 
                            title: 'Dynamic Re-mapping', 
                            desc: 'Our layout engine separates content from presentation, allowing instant, lossless template switching across 25+ styles.',
                            icon: <Cpu className="w-8 h-8 text-violet-600" />
                        }
                    ].map((feat, i) => (
                        <div key={i} className="p-10 rounded-[3rem] bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-3xl transition-all duration-500 group">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                {feat.icon}
                            </div>
                            <h3 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight">{feat.title}</h3>
                            <p className="text-neutral-500 font-bold leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Technical Standards Section */}
                <div className="bg-neutral-950 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none"><BarChart3 className="w-64 h-64 text-primary-500" /></div>
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter uppercase italic leading-none">
                                Technical <br /><span className="text-primary-400">Benchmarks.</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { label: 'Uptime Reliability', value: '99.99%' },
                                    { label: 'Avg. Parsing Speed', value: '1.2s' },
                                    { label: 'Success Rate (ATS Bypass)', value: '96.4%' },
                                    { label: 'GDPR / CCPA Compliance', value: 'Verified' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-end border-b border-white/10 pb-4">
                                        <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs">{stat.label}</span>
                                        <span className="text-2xl font-black text-white italic">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-12 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-xl">
                            <h4 className="text-xl font-black mb-6 tracking-tight">AI Content Generation Policy</h4>
                            <p className="text-neutral-400 font-medium leading-relaxed mb-8">
                                All AI-generated content (bullet points, summaries, coach feedback) is supervised by human-in-the-loop validation protocols. We prioritize factual accuracy over generative creativity to ensure professional integrity.
                            </p>
                            <Link href="/editor/setup" className="inline-flex items-center gap-3 text-primary-400 font-black uppercase tracking-widest text-[10px] hover:text-primary-300 transition-colors">
                                Experience the Engine <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
