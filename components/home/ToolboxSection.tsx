'use client'

import React from 'react'
import { 
    LayoutTemplate, 
    FileText, 
    Target, 
    Sparkles, 
    Briefcase, 
    Rocket,
    CheckCircle2,
    Search,
    ShieldCheck,
    PenTool
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tools = [
    {
        title: "Intelligent Resume Builder",
        description: "25+ Recruiter-approved templates designed for human resonance and ATS compliance across all industries.",
        achievement: "Land 3x more interviews",
        icon: LayoutTemplate,
        color: "text-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        title: "AI Cover Letter Generator",
        description: "Draft highly-tailored, persuasive cover letters in seconds that perfectly match your resume and job description.",
        achievement: "Apply 10x faster",
        icon: FileText,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50"
    },
    {
        title: "Keyword Matching Engine",
        description: "Scan job postings to identify critical skill gaps. Automatically optimize your resume to beat the ATS filters.",
        achievement: "99% ATS Pass Rate",
        icon: Target,
        color: "text-amber-600",
        bgColor: "bg-amber-50"
    },
    {
        title: "Real-Time AI Career Coach",
        description: "Get instant, professional feedback on your content, impact metrics, and professional storytelling as you type.",
        achievement: "Expert-level writing",
        icon: Rocket,
        color: "text-purple-600",
        bgColor: "bg-purple-50"
    },
    {
        title: "Integrated Job Tracker",
        description: "A unified dashboard to manage your application pipeline, interview dates, and status across multiple platforms.",
        achievement: "Never miss an opportunity",
        icon: Briefcase,
        color: "text-rose-600",
        bgColor: "bg-rose-50"
    },
    {
        title: "Career Intelligence Hub",
        description: "Deep-dive into industry-specific strategies, interview preparation guides, and high-performance career resources.",
        achievement: "Strategic Advantage",
        icon: ShieldCheck,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50"
    }
]

export function ToolboxSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-neutral-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <PenTool className="w-3.5 h-3.5" />
                        <span>The Ultimate Toolkit</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-neutral-950 mb-8 tracking-tighter uppercase italic leading-none">
                        Built for Your <br />
                        <span className="text-primary-600">Unfair Advantage.</span>
                    </h2>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium">
                        A full suite of world-class tools designed to streamline your job search and elevate your professional story.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool, idx) => (
                        <div 
                            key={idx} 
                            className="group p-8 rounded-[2.5rem] bg-white border border-neutral-100 shadow-xl shadow-neutral-200/20 hover:shadow-2xl hover:shadow-primary-100/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                        >
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12", tool.bgColor, tool.color)}>
                                <tool.icon className="w-7 h-7" />
                            </div>
                            
                            <h3 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                                {tool.title}
                            </h3>
                            
                            <p className="text-neutral-500 font-medium leading-relaxed mb-8 flex-grow">
                                {tool.description}
                            </p>
                            
                            <div className="pt-6 border-t border-neutral-50 flex items-center gap-2 mt-auto">
                                <CheckCircle2 className={cn("w-4 h-4", tool.color)} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                    Result: <span className="text-neutral-900">{tool.achievement}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 p-10 bg-neutral-50 rounded-[3rem] border border-neutral-100 shadow-inner">
                        <div className="text-center">
                            <div className="text-3xl font-black text-neutral-950 tracking-tighter">25+</div>
                            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Templates</div>
                        </div>
                        <div className="text-center border-l border-neutral-200 pl-8">
                            <div className="text-3xl font-black text-neutral-950 tracking-tighter">99%</div>
                            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">ATS Pass</div>
                        </div>
                        <div className="text-center border-l border-neutral-200 pl-8">
                            <div className="text-3xl font-black text-neutral-950 tracking-tighter">10k+</div>
                            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Users</div>
                        </div>
                        <div className="text-center border-l border-neutral-200 pl-8">
                            <div className="text-3xl font-black text-neutral-950 tracking-tighter">3x</div>
                            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Interviews</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
