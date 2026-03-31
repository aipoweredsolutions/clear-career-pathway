'use client'

import React, { useState, useEffect } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import {
    TrendingUp,
    Zap,
    Loader2,
    Sparkles,
    Flag,
    Award,
    BookOpen,
    ArrowRightCircle,
    ChevronDown,
    ChevronUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { saveCareerRoadmap, fetchLatestCareerRoadmap } from '@/app/career-hub/actions'

interface RoadmapMilestone {
    title: string
    timeframe: string
    skillsToAcquire: string[]
    description: string
    actionSteps: string[]
}

interface CareerRoadmapResult {
    ultimateGoal: string
    marketOutlook: string
    milestones: RoadmapMilestone[]
}

export function CareerRoadmap({ resumes }: { resumes: ResumeDocument[] }) {
    const [selectedResumeId, setSelectedResumeId] = useState<string>('')
    const [targetCareerGoal, setTargetCareerGoal] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<CareerRoadmapResult | null>(null)
    const [expandedMilestone, setExpandedMilestone] = useState<number | null>(0)
    const [isRestoring, setIsRestoring] = useState(false)

    // Load latest roadmap when resume is selected
    useEffect(() => {
        if (!selectedResumeId) return
        
        async function loadPrevious() {
            setIsRestoring(true)
            const roadmap = await fetchLatestCareerRoadmap(selectedResumeId)
            if (roadmap) {
                setResult(roadmap.data)
                setTargetCareerGoal(roadmap.targetGoal)
                toast.success('Loaded your latest career journey')
            }
            setIsRestoring(false)
        }
        loadPrevious()
    }, [selectedResumeId])

    const handleGenerate = async () => {
        if (!selectedResumeId) {
            toast.error('Please select a resume')
            return
        }
        if (!targetCareerGoal.trim()) {
            toast.error('Please enter your career goal')
            return
        }

        setIsGenerating(true)
        setResult(null)

        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'career_roadmap',
                    currentContent: targetCareerGoal,
                    userProfile: {
                        resumeContent: JSON.stringify(selectedResume)
                    }
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate roadmap')
            }

            setResult(data.data)
            
            // Save to cloud
            await saveCareerRoadmap(selectedResumeId, targetCareerGoal, data.data)
            
            toast.success('Your Career Roadmap is ready and saved!')
        } catch (error: any) {
            console.error('Roadmap error:', error)
            toast.error(error.message || 'Failed to generate roadmap')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Input Section */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 bg-neutral-50/50">
                    <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        5-Year Growth Roadmap
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                        Map out your professional journey from your current experience level to your ultimate career goal.
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                1. Start from
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedResumeId}
                                    onChange={(e) => setSelectedResumeId(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm appearance-none"
                                >
                                    <option value="">Select current profile...</option>
                                    {resumes.map((resume) => (
                                        <option key={resume.id} value={resume.id}>{resume.title || 'Untitled Resume'}</option>
                                    ))}
                                </select>
                                {isRestoring && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/80 px-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                                        <span className="text-[8px] font-black uppercase text-emerald-600">Syncing...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                2. &quot;In 5 years, I want to be a...&quot;
                            </label>
                            <input
                                type="text"
                                value={targetCareerGoal}
                                onChange={(e) => setTargetCareerGoal(e.target.value)}
                                placeholder="e.g. CTO, Principal Architect, Head of Design"
                                className="w-full p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !selectedResumeId || !targetCareerGoal}
                            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Mapping Journey...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Visual Roadmap
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                    {/* Header Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl">
                            <h4 className="text-emerald-100 text-xs font-black uppercase tracking-[0.2em] mb-4">The Strategic Goal</h4>
                            <h2 className="text-3xl font-black mb-4 leading-tight">{result.ultimateGoal}</h2>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 w-fit">
                                <TrendingUp className="w-4 h-4 text-emerald-300" />
                                <span className="text-sm font-medium">{result.marketOutlook}</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl border border-neutral-200 p-8 flex flex-col justify-center shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Flag className="w-5 h-5 text-emerald-600" />
                                </div>
                                <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Progress Map</span>
                            </div>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                We&apos;ve broken your path into <span className="font-bold text-neutral-900">{result.milestones.length} major phases</span> based on your current background.
                            </p>
                        </div>
                    </div>

                    {/* Timeline View */}
                    <div className="relative mt-12 pb-12">
                        {/* Vertical Line */}
                        <div className="absolute left-[32px] top-4 bottom-0 w-1 bg-gradient-to-b from-emerald-200 via-neutral-100 to-transparent hidden md:block" />

                        <div className="space-y-12">
                            {result.milestones.map((ms, i) => (
                                <div key={i} className="relative pl-0 md:pl-20">
                                    {/* Number Circle */}
                                    <div className={cn(
                                        "absolute left-0 top-0 w-[64px] h-[64px] rounded-full flex items-center justify-center font-black text-xl z-10 transition-all hidden md:flex ring-8 ring-neutral-50",
                                        expandedMilestone === i ? "bg-emerald-600 text-white scale-110 shadow-lg" : "bg-white text-neutral-300 border-2 border-neutral-100"
                                    )}>
                                        {i + 1}
                                    </div>

                                    {/* Content Card */}
                                    <div
                                        onClick={() => setExpandedMilestone(expandedMilestone === i ? null : i)}
                                        className={cn(
                                            "bg-white rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden",
                                            expandedMilestone === i ? "ring-2 ring-emerald-500/20" : ""
                                        )}
                                    >
                                        <div className="p-6 md:p-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                <div>
                                                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 mb-2">
                                                        Phase {i + 1}: {ms.timeframe}
                                                    </span>
                                                    <h3 className="text-2xl font-black text-neutral-900 leading-tight">
                                                        {ms.title}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2 text-neutral-400 group-hover:text-emerald-600 transition-colors">
                                                    {expandedMilestone === i ? <ChevronUp /> : <ChevronDown />}
                                                </div>
                                            </div>

                                            <div className={cn(
                                                "grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden transition-all duration-500 ease-in-out",
                                                expandedMilestone === i ? "max-h-[1000px] opacity-100 mt-8" : "max-h-0 opacity-0"
                                            )}>
                                                <div className="md:col-span-2 space-y-6">
                                                    <div>
                                                        <h5 className="flex items-center gap-2 text-neutral-900 font-bold text-sm mb-3">
                                                            <ArrowRightCircle className="w-4 h-4 text-emerald-600" />
                                                            Role Description
                                                        </h5>
                                                        <p className="text-neutral-600 text-sm leading-relaxed">
                                                            {ms.description}
                                                        </p>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                        <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                                                            <h5 className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-4 uppercase tracking-wider">
                                                                <BookOpen className="w-4 h-4" />
                                                                Skill Mastery
                                                            </h5>
                                                            <div className="flex flex-wrap gap-2">
                                                                {ms.skillsToAcquire.map((skill, si) => (
                                                                    <span key={si} className="px-3 py-1 bg-white text-neutral-700 text-xs font-semibold rounded-lg border border-neutral-200">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="p-6 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                                                            <h5 className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-4 uppercase tracking-wider">
                                                                <Zap className="w-4 h-4" />
                                                                Action Items
                                                            </h5>
                                                            <ul className="space-y-2">
                                                                {ms.actionSteps.map((step, ai) => (
                                                                    <li key={ai} className="text-xs text-neutral-600 flex items-start gap-2">
                                                                        <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                                                                        {step}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="md:col-span-1">
                                                    <div className="bg-neutral-900 rounded-2xl p-6 text-white h-full relative overflow-hidden group">
                                                        <Award className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500 opacity-10 group-hover:scale-110 transition-transform" />
                                                        <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Success Metric</h5>
                                                        <p className="text-sm text-neutral-300 leading-relaxed italic">
                                                            &quot;You&apos;ll know you&apos;ve cleared this level when you&apos;ve consistently demonstrating impact in {ms.title.toLowerCase()} and mastered the core {ms.skillsToAcquire[0]} toolset.&quot;
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
