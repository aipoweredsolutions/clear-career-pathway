'use client'

import React, { useState } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { fetchUserDocuments } from '@/lib/supabase/documents'
import { SkillsGapAnalysis } from '@/components/career/SkillsGapAnalysis'
import { InterviewPrep } from '@/components/career/InterviewPrep'
import { CareerRoadmap } from '@/components/career/CareerRoadmap'
import { SalaryNegotiation } from '@/components/career/SalaryNegotiation'
import { Target, MessageSquare, TrendingUp, Loader2, Banknote } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { cn } from '@/lib/utils'

export default function CareerHubPage() {
    const [activeTab, setActiveTab] = useState<'gap' | 'interview' | 'roadmap' | 'negotiation'>('gap')
    const [resumes, setResumes] = useState<ResumeDocument[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    React.useEffect(() => {
        async function loadData() {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session) {
                    window.location.href = '/auth/login'
                    return
                }
                const docs = await fetchUserDocuments(supabase, session.user.id)
                setResumes(docs || [])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [supabase])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-serif">
                        Career Studio
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl">
                        A suite of AI-powered tools designed to help you navigate your career path with precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-2">
                        <nav className="flex flex-col space-y-1">
                            <button
                                onClick={() => setActiveTab('gap')}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    activeTab === 'gap'
                                        ? "bg-white text-primary-600 font-semibold shadow-sm border border-neutral-200"
                                        : "text-neutral-600 hover:bg-white hover:text-neutral-900 font-medium"
                                )}
                            >
                                <Target className="w-5 h-5" />
                                <span>Skills Gap Analysis</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('interview')}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    activeTab === 'interview'
                                        ? "bg-white text-primary-600 font-semibold shadow-sm border border-neutral-200"
                                        : "text-neutral-600 hover:bg-white hover:text-neutral-900 font-medium"
                                )}
                            >
                                <MessageSquare className="w-5 h-5" />
                                <span>Interview Prep</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('negotiation')}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    activeTab === 'negotiation'
                                        ? "bg-white text-primary-600 font-semibold shadow-sm border border-neutral-200"
                                        : "text-neutral-600 hover:bg-white hover:text-neutral-900 font-medium"
                                )}
                            >
                                <Banknote className="w-5 h-5" />
                                <span>Salary Negotiation</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('roadmap')}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    activeTab === 'roadmap'
                                        ? "bg-white text-primary-600 font-semibold shadow-sm border border-neutral-200"
                                        : "text-neutral-600 hover:bg-white hover:text-neutral-900 font-medium"
                                )}
                            >
                                <TrendingUp className="w-5 h-5" />
                                <span>Career Roadmap</span>
                            </button>
                        </nav>

                        <div className="mt-8 p-6 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl text-white shadow-lg">
                            <h4 className="font-bold mb-2">Pro Tip</h4>
                            <p className="text-sm text-primary-50/90 leading-relaxed">
                                {activeTab === 'gap'
                                    ? "Use the Skills Gap Analysis for every job you apply to. Targeted resumes receive 3x more interview callbacks."
                                    : activeTab === 'interview'
                                        ? "Practice makes perfect. Use the AI Interview Simulator to refine your pitch before the high-stakes call."
                                        : activeTab === 'negotiation'
                                            ? "Know your worth. Salary negotiation is most effective when you have data and a clear value proposition."
                                            : "Growth is a marathon, not a sprint. Follow your roadmap to systematically acquire the skills needed for your dream role."}
                            </p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'gap' && <SkillsGapAnalysis resumes={resumes} />}
                        {activeTab === 'interview' && <InterviewPrep resumes={resumes} />}
                        {activeTab === 'roadmap' && <CareerRoadmap resumes={resumes} />}
                        {activeTab === 'negotiation' && <SalaryNegotiation resumes={resumes} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
