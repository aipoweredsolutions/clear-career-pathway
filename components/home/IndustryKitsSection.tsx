'use client'

import React from 'react'
import { 
    Cpu, 
    Stethoscope, 
    GraduationCap, 
    Globe, 
    Users, 
    RefreshCcw,
    Zap,
    ArrowRight,
    Terminal,
    HeartPulse,
    Headset,
    Briefcase
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const KITS = [
    {
        id: 'tech',
        title: "Tech Resume Kit",
        tag: "Engineers & Data Science",
        description: "Optimized for engineering, product, and data roles with technical skill matrices and project highlight sections.",
        icon: Terminal,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-100",
        templateId: "ats-modern"
    },
    {
        id: 'healthcare',
        title: "Healthcare Resume Kit",
        tag: "Clinical & Nursing",
        description: "Credential-heavy designs that emphasize clinical rotations, certifications, and high-impact patient care results.",
        icon: HeartPulse,
        color: "text-rose-600",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-100",
        templateId: "ats-nursing"
    },
    {
        id: 'graduate',
        title: "Graduate Resume Kit",
        tag: "Internships & New Grads",
        description: "Potential-first layouts that prioritize education, internships, and extracurricular achievements for new professionals.",
        icon: GraduationCap,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-100",
        templateId: "ats-graduate"
    },
    {
        id: 'remote',
        title: "Remote Work Kit",
        tag: "Distributed Teams",
        description: "Highlight your distributed teamwork skills, remote toolkit proficiency, and ability to thrive in a global environment.",
        icon: Globe,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-100",
        templateId: "ats-modern"
    },
    {
        id: 'customer',
        title: "Customer Service Kit",
        tag: "Support & Administration",
        description: "Focus on soft skills, performance metrics, and high-volume inquiry resolution with clean, professional layouts.",
        icon: Headset,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-100",
        templateId: "classic-clean"
    },
    {
        id: 'career-changer',
        title: "Career Changer Kit",
        tag: "The AI Transition Layer",
        description: "Bridge the gap between your previous background and your new industry using our AI transition layer.",
        icon: RefreshCcw,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-100",
        templateId: "ats-professional"
    }
]

export function IndustryKitsSection() {
    return (
        <section id="kits" className="py-32 bg-neutral-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl shadow-primary-600/20">
                            <Zap className="w-3.5 h-3.5 fill-white/20" />
                            <span>Job-Specific Solutions</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-neutral-950 mb-8 tracking-tighter uppercase italic leading-[0.9]">
                            Specialized <br /> 
                            <span className="text-primary-600">Resume Kits.</span>
                        </h2>
                        <p className="text-xl text-neutral-500 font-medium leading-relaxed">
                            Whether you’re a tech lead, a graduate, or making a bold career pivot, our industry-specific kits provide the exact strategy and style you need to dominate your market.
                        </p>
                    </div>

                    <div className="flex gap-4 mb-2">
                        <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center">
                                <Users className="w-5 h-5 text-neutral-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Global Reach</p>
                                <p className="text-sm font-bold text-neutral-900 leading-none">US & EU Formats</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-neutral-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Levels</p>
                                <p className="text-sm font-bold text-neutral-900 leading-none">Entry to Executive</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {KITS.map((kit) => (
                        <div 
                            key={kit.id} 
                            className="group relative flex flex-col p-8 rounded-[3rem] bg-white border border-neutral-100 hover:border-primary-100 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] overflow-hidden"
                        >
                            {/* Accent Background */}
                            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700", kit.bgColor)} />

                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110", kit.bgColor, kit.color)}>
                                    <kit.icon className="w-7 h-7" />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-neutral-50 rounded-full text-neutral-400">
                                    Ready to Deploy
                                </div>
                            </div>

                            <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", kit.color)}>
                                {kit.tag}
                            </p>
                            
                            <h3 className="text-3xl font-black text-neutral-950 mb-4 tracking-tight leading-[1.1] italic">
                                {kit.title}
                            </h3>
                            
                            <p className="text-neutral-500 font-medium leading-relaxed mb-10 flex-grow text-sm">
                                {kit.description}
                            </p>
                            
                            <div className="relative z-10">
                                <Link 
                                    href={`/editor/setup?template=${kit.templateId}`}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-neutral-950 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-600/30 group-hover:translate-y-[-2px]"
                                >
                                    Select Kit <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-12 lg:p-16 rounded-[4rem] bg-gradient-to-br from-neutral-950 via-neutral-900 to-primary-950 text-white relative overflow-hidden">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-600 rounded-full blur-[150px] opacity-20 animate-pulse" />
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 w-max">
                                <Cpu className="w-4 h-4" />
                                <span>The Secret Sauce</span>
                            </div>
                            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-none tracking-tighter uppercase italic">
                                Add an <br />
                                <span className="text-primary-500">AI Transition Layer.</span>
                            </h3>
                            <p className="text-xl text-neutral-400 leading-relaxed font-medium">
                                Our platform doesn&apos;t just fill templates. It provides a strategic AI layer that translates your unique experience into terms that recruiters in your new target industry understand perfectly. 
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                "Industry-specific keyword injection",
                                "Country-specific formatting (US, EU, UK, AU)",
                                "Career-level customized strategy",
                                "Remote work credibility builder",
                                "Internship potential multiplier"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold text-lg tracking-tight">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
