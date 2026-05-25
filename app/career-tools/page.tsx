import React from 'react'
import Link from 'next/link'
import { 
    Zap, 
    MessageSquare, 
    DollarSign, 
    Linkedin, 
    Map, 
    ArrowRight,
    Sparkles,
    Target,
    Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

const TOOLS = [
    {
        id: 'interview',
        title: 'Interview Simulator',
        description: 'AI-generated mock interviews tailored to any job description. Get instant feedback on your answers.',
        icon: MessageSquare,
        href: '/career-tools/interview',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        badge: 'Popular'
    },
    {
        id: 'salary',
        title: 'Salary Negotiator',
        description: 'Get custom negotiation scripts and market salary ranges based on your experience and location.',
        icon: DollarSign,
        href: '/career-tools/salary',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        badge: 'Pro'
    },
    {
        id: 'linkedin',
        title: 'LinkedIn Optimizer',
        description: 'Transform your LinkedIn headline and about section to attract recruiters and rank higher in search.',
        icon: Linkedin,
        href: '/career-tools/linkedin',
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        border: 'border-sky-100',
        badge: 'AI Powered'
    },
    {
        id: 'roadmap',
        title: 'Career Roadmap',
        description: 'Visualize your path from your current role to your dream job with step-by-step actionable goals.',
        icon: Map,
        href: '/career-tools/roadmap',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        badge: 'New'
    }
]

export default function CareerToolsPage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-neutral-100 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.25em] w-fit">
                            <Zap className="w-3.5 h-3.5 fill-primary-600/20" />
                            Career Intelligence Hub
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-neutral-950 tracking-tighter italic leading-none">
                            Career <span className="text-primary-600">Hub.</span>
                        </h1>
                        <p className="max-w-xl text-lg text-neutral-500 font-bold leading-relaxed">
                            Elite AI tools designed to help you dominate the job market, from first application to final salary negotiation.
                        </p>
                    </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TOOLS.map((tool) => (
                        <Link 
                            key={tool.id} 
                            href={tool.href}
                            className={cn(
                                "group relative bg-white rounded-[2.5rem] border p-10 transition-all hover:shadow-2xl hover:shadow-neutral-200/50 hover:-translate-y-1",
                                tool.border
                            )}
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3", tool.bg)}>
                                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                                </div>
                                <span className={cn("text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full", tool.bg, tool.color)}>
                                    {tool.badge}
                                </span>
                            </div>
                            
                            <h2 className="text-3xl font-black text-neutral-900 tracking-tighter mb-4 group-hover:text-primary-600 transition-colors">
                                {tool.title}
                            </h2>
                            <p className="text-neutral-500 font-bold leading-relaxed mb-10 max-w-sm">
                                {tool.description}
                            </p>

                            <div className="flex items-center gap-2 text-xs font-black text-neutral-900 uppercase tracking-widest">
                                Launch Tool
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>

                            {/* Background Glow Effect */}
                            <div className={cn("absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl", tool.bg)} />
                        </Link>
                    ))}
                </div>

                {/* Pro Feature Teaser */}
                <div className="mt-20 bg-neutral-900 rounded-[3rem] p-12 text-white relative overflow-hidden border border-neutral-800 shadow-2xl">
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-2 text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            <Shield className="w-4 h-4" /> Professional Intelligence
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter italic mb-6">
                            Unlock Unlimited <span className="text-primary-500 not-italic">Strategic Support.</span>
                        </h2>
                        <p className="text-neutral-400 font-bold text-lg leading-relaxed mb-8">
                            Pro members get unlimited access to our full suite of career intelligence tools, priority AI processing, and advanced market insights.
                        </p>
                        <Link 
                            href="/pricing"
                            className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-500 text-white font-black px-10 py-5 rounded-[1.5rem] transition-all shadow-2xl hover:scale-105 active:scale-95"
                        >
                            Upgrade to Pro
                            <Zap className="w-5 h-5 fill-white" />
                        </Link>
                    </div>
                    
                    {/* Decorative element */}
                    <Sparkles className="absolute -bottom-20 -right-20 w-80 h-80 text-white/[0.03] rotate-12" />
                </div>
            </div>
        </div>
    )
}
