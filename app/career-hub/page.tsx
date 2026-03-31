'use client'

import React, { useState, useEffect } from 'react'
import { ResumeDocument, UserSubscription } from '@/lib/types/resume'
import { fetchUserDocuments } from '@/lib/supabase/documents'
import { fetchUserSubscription, canAccessCareerHubFeature, CareerHubFeature } from '@/lib/supabase/subscriptions'
import { SkillsGapAnalysis } from '@/components/career/SkillsGapAnalysis'
import { InterviewPrep } from '@/components/career/InterviewPrep'
import { CareerRoadmap } from '@/components/career/CareerRoadmap'
import { SalaryNegotiation } from '@/components/career/SalaryNegotiation'
import { JobTracker } from '@/components/career/JobTracker'
import { LinkedInOptimizer } from '@/components/career/LinkedInOptimizer'
import { FeatureGate } from '@/components/career/FeatureGate'
import { Target, MessageSquare, TrendingUp, Loader2, Banknote, Sparkles, ChevronRight, Lock, Linkedin, ClipboardList, Briefcase } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { cn } from '@/lib/utils'

export default function CareerHubPage() {
    const [activeTab, setActiveTab] = useState<CareerHubFeature>('skills_gap')
    const [resumes, setResumes] = useState<ResumeDocument[]>([])
    const [subscription, setSubscription] = useState<(UserSubscription & { downloadCredits?: number }) | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    useEffect(() => {
        async function loadData() {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session) {
                    window.location.href = '/auth/login'
                    return
                }
                
                // Fetch both documents and subscription in parallel
                const [docs, sub] = await Promise.all([
                    fetchUserDocuments(supabase, session.user.id),
                    fetchUserSubscription(supabase, session.user.id)
                ])
                
                setResumes(docs || [])
                setSubscription(sub)
            } catch (err: any) {
                console.error('Error loading career hub data:', err)
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [supabase])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-4" />
                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Initialising Studio...</p>
                </div>
            </div>
        )
    }

    const tierName = subscription?.tierId || 'free'
    const isLocked = !canAccessCareerHubFeature(tierName, activeTab)

    // Config for locked features
    const lockConfig: Record<Exclude<CareerHubFeature, 'skills_gap'>, { name: string, desc: string, tier: string }> = {
        'interview_prep': {
            name: 'Interview Simulator',
            desc: 'Get personalized, high-stakes interview questions and real-time response strategies based on your resume and target role.',
            tier: 'Single Download or Power User'
        },
        'salary_negotiation': {
            name: 'Salary Negotiation Playbook',
            desc: 'Don\'t leave money on the table. Generate custom negotiation scripts and market value insights tailored to your experience.',
            tier: 'Single Download or Power User'
        },
        'career_roadmap': {
            name: '5-Year Career Roadmap',
            desc: 'Map out your professional growth with a strategic roadmap. Identify the exact skills and milestones needed to reach your dream role.',
            tier: 'Power User'
        },
        'job_tracker': {
            name: 'Application Command Center',
            desc: 'Track every application, interview, and offer in one high-performance dashboard.',
            tier: 'Single Download or Power User'
        },
        'linkedin_optimizer': {
            name: 'LinkedIn Brand Optimizer',
            desc: 'Convert your resume into a high-impact LinkedIn profile that attracts elite recruiters.',
            tier: 'Single Download or Power User'
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Sparkles className="w-3 h-3 fill-primary-600" />
                            Premium Career Tools
                        </div>
                        <h1 className="text-5xl font-black text-neutral-900 mb-4 tracking-tighter">
                            Career <span className="text-primary-600">Studio</span>
                        </h1>
                        <p className="text-xl text-neutral-500 max-w-2xl font-medium leading-relaxed">
                            A high-performance suite of AI tools designed to help you navigate your career path with clinical precision.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-neutral-200 shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400">
                            <Target className="w-6 h-6" />
                        </div>
                        <div className="pr-4">
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Current Plan</p>
                            <p className="text-sm font-bold text-neutral-900">
                                {tierName.charAt(0).toUpperCase() + tierName.slice(1)} Tier
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-4">
                        <nav className="flex flex-col space-y-2">
                            {[
                                { id: 'skills_gap', label: 'Skills Gap Analysis', icon: Target },
                                { id: 'linkedin_optimizer', label: 'LinkedIn Optimizer', icon: Linkedin },
                                { id: 'job_tracker', label: 'Application Tracker', icon: ClipboardList },
                                { id: 'interview_prep', label: 'Interview Simulator', icon: MessageSquare },
                                { id: 'salary_negotiation', label: 'Salary Negotiation', icon: Banknote },
                                { id: 'career_roadmap', label: '5-Year Roadmap', icon: TrendingUp },
                            ].map((tab) => {
                                const locked = !canAccessCareerHubFeature(tierName, tab.id as CareerHubFeature)
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as CareerHubFeature)}
                                        className={cn(
                                            "group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all border-2",
                                            activeTab === tab.id
                                                ? "bg-white border-primary-600 text-primary-600 shadow-xl shadow-primary-200/50"
                                                : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-white/50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon className={cn(
                                                "w-5 h-5 transition-colors",
                                                activeTab === tab.id ? "text-primary-600" : "text-neutral-400 group-hover:text-neutral-600"
                                            )} />
                                            <span className="font-bold text-sm tracking-tight">{tab.label}</span>
                                        </div>
                                        {locked && <Lock className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-400 transition-colors" />}
                                    </button>
                                )
                            })}
                        </nav>

                        <div className="mt-8 p-6 bg-neutral-900 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Sparkles className="w-16 h-16" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-xs font-black text-primary-400 uppercase tracking-widest mb-3">AI Expert Insight</h4>
                                <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                                    {activeTab === 'skills_gap'
                                        ? "Targeted resumes receive 3x more interview callbacks. Use this tool for every job description."
                                        : activeTab === 'linkedin_optimizer'
                                            ? "Your LinkedIn is your digital first impression. Make it count with AI-driven branding."
                                            : activeTab === 'job_tracker'
                                                ? "Staying organized is the key to a high-volume, high-success job search."
                                                : activeTab === 'interview_prep'
                                                    ? "Refine your pitch before the high-stakes call. AI-generated scenarios prepare you for the unexpected."
                                                    : activeTab === 'salary_negotiation'
                                                        ? "Salary is most effective when you have market data and a clear value proposition."
                                                        : "Systematically acquire the skills needed for your dream role by following your strategic roadmap."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            {isLocked ? (
                                <FeatureGate 
                                    featureName={lockConfig[activeTab as keyof typeof lockConfig].name}
                                    description={lockConfig[activeTab as keyof typeof lockConfig].desc}
                                    requiredTier={lockConfig[activeTab as keyof typeof lockConfig].tier}
                                />
                            ) : (
                                <>
                                    {activeTab === 'skills_gap' && <SkillsGapAnalysis resumes={resumes} />}
                                    {activeTab === 'linkedin_optimizer' && <LinkedInOptimizer resumes={resumes} />}
                                    {activeTab === 'job_tracker' && <JobTracker resumes={resumes} />}
                                    {activeTab === 'interview_prep' && <InterviewPrep resumes={resumes} />}
                                    {activeTab === 'career_roadmap' && <CareerRoadmap resumes={resumes} />}
                                    {activeTab === 'salary_negotiation' && <SalaryNegotiation resumes={resumes} />}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
