'use client'

import React from 'react'
import Link from 'next/link'
import { 
    LayoutTemplate, 
    Target, 
    Zap, 
    TrendingUp, 
    Linkedin, 
    ArrowRight,
    Search,
    ShieldCheck,
    PenTool
} from 'lucide-react'
import { cn } from '@/lib/utils'

const products = [
    {
        title: "ATS Resume Builder",
        description: "The gold standard of resume creation. 25+ premium, recruiter-approved templates engineered for 100% ATS compliance.",
        link: "/editor/setup",
        icon: LayoutTemplate,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        badge: "Core Product"
    },
    {
        title: "ATS Resume Scanner",
        description: "Clinical keyword matching engine. Scan job postings to identify critical skill gaps and optimize your resume to beat the filters.",
        link: "/ats-resume-scanner",
        icon: Search,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        badge: "Optimizer"
    }
]

export function ProductSuite() {
    return (
        <section className="py-20 bg-neutral-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[120px] opacity-50 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] opacity-40 -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            <PenTool className="w-3.5 h-3.5" />
                            <span>The Full Ecosystem</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tighter uppercase italic leading-[0.95]">
                            Everything You Need to <br />
                            <span className="text-primary-500">Command Your Career.</span>
                        </h2>
                        <p className="text-lg text-neutral-200 font-medium leading-relaxed max-w-xl">
                            We&apos;ve built a comprehensive suite of elite tools designed to give you an unfair advantage in the modern job market.
                        </p>
                    </div>
                    
                    <Link href="/editor/setup" className="btn-premium btn-premium-primary !px-8 !py-4 group flex items-center gap-2">
                        Get Full Access
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, idx) => (
                        <Link 
                            href={product.link}
                            key={idx} 
                            className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden backdrop-blur-sm shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className={cn("w-14 h-14 rounded-[1.25rem] flex items-center justify-center transition-transform duration-700 group-hover:rotate-12 shadow-inner", product.bgColor, product.color)}>
                                    <product.icon className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                    {product.badge}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-primary-400 transition-colors">
                                {product.title}
                            </h3>
                            
                            <p className="text-neutral-300 font-medium leading-relaxed mb-8 flex-grow text-base">
                                {product.description}
                            </p>
                            
                            <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <span>Launch Product</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>

                            {/* Hover accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
