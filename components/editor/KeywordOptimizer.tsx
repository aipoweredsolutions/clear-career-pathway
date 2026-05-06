'use client'

import React, { useState, useCallback } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import {
    X, Search, Loader2, Target, CheckCircle2, AlertCircle,
    Sparkles, ZapIcon, TrendingUp, Plus, ChevronDown, ChevronUp,
    FileText, Lightbulb, ArrowRight, BadgeCheck, Brain,
    BarChart3, Hash
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import { useAuth } from '@/components/auth/AuthProvider'

interface KeywordAnalysis {
    matchScore: number
    strengths: string[]
    gaps: string[]
    keywords: {
        found: string[]
        missing: string[]
    }
    recommendations: string[]
}

interface KeywordOptimizerProps {
    data: ResumeDocument
    onUpdate: (data: ResumeDocument) => void
    isOpen: boolean
    onClose: () => void
}

export function KeywordOptimizer({ data, onUpdate, isOpen, onClose }: KeywordOptimizerProps) {
    const { profile } = useAuth()
    const isPro = profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'enterprise'
    const [jobDescription, setJobDescription] = useState('')
    const [analysis, setAnalysis] = useState<KeywordAnalysis | null>(null)
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<'missing' | 'found' | 'gaps' | 'recommendations'>('missing')
    const [addedKeywords, setAddedKeywords] = useState<Set<string>>(new Set())
    const [expandedSection, setExpandedSection] = useState<string | null>('missing')

    const buildResumeContext = useCallback(() => {
        const parts: string[] = []
        if (data.personalInfo?.fullName) parts.push(`Name: ${data.personalInfo.fullName}`)
        if (data.personalInfo?.professionalTitle) parts.push(`Title: ${data.personalInfo.professionalTitle}`)
        if (data.professionalSummary?.summaryText) parts.push(`Summary: ${data.professionalSummary.summaryText}`)
        if (data.skills?.length) parts.push(`Skills: ${data.skills.map(s => s.skillName).join(', ')}`)
        if (data.workExperience?.length) {
            const expText = data.workExperience.map(exp =>
                `${exp.jobTitle} at ${exp.companyName}: ${exp.achievements?.map(a => a.achievementText).join('; ')}`
            ).join('\n')
            parts.push(`Experience:\n${expText}`)
        }
        if (data.certifications?.length) parts.push(`Certifications: ${data.certifications.map(c => c.certificationName).join(', ')}`)
        if (data.education?.length) parts.push(`Education: ${data.education.map(e => `${e.degree} in ${e.major || e.fieldOfStudy || ''} from ${e.institutionName}`).join('; ')}`)
        return parts.join('\n\n')
    }, [data])

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            toast.error('Please paste a job description first.')
            return
        }
        setLoading(true)
        setAnalysis(null)
        setAddedKeywords(new Set())
        try {
            const resumeContent = buildResumeContext()
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'skills_gap_analysis',
                    content: jobDescription,
                    resumeContent,
                    userProfile: { resumeContent }
                })
            })
            const json = await res.json()
            if (!res.ok) {
                toast.error(json.message || json.error || 'Analysis failed. Please try again.')
                return
            }
            setAnalysis(json.data)
            setExpandedSection('missing')
        } catch (err) {
            toast.error('Failed to analyze. Check your connection.')
        } finally {
            setLoading(false)
        }
    }

    const handleAddKeyword = (keyword: string) => {
        if (addedKeywords.has(keyword)) return

        // Add as a skill to the resume
        const newSkill = {
            id: `kw-${Date.now()}-${Math.random()}`,
            skillName: keyword,
            skillType: 'technical' as const
        }
        const updated: ResumeDocument = {
            ...data,
            skills: [...(data.skills || []), newSkill]
        }
        onUpdate(updated)
        setAddedKeywords(prev => new Set([...prev, keyword]))
        toast.success(`"${keyword}" added to your skills.`)
    }

    const getScoreColor = (score: number) => {
        if (score >= 75) return { text: 'text-emerald-400', bg: 'bg-emerald-500', ring: 'rgb(52,211,153)' }
        if (score >= 50) return { text: 'text-amber-400', bg: 'bg-amber-500', ring: 'rgb(251,191,36)' }
        return { text: 'text-rose-400', bg: 'bg-rose-500', ring: 'rgb(251,113,133)' }
    }

    const getScoreLabel = (score: number) => {
        if (score >= 75) return 'Strong Match'
        if (score >= 50) return 'Partial Match'
        return 'Low Match'
    }

    if (!isOpen) return null

    const colors = analysis ? getScoreColor(analysis.matchScore) : null

    const sections = [
        {
            id: 'missing',
            label: 'Missing Keywords',
            icon: AlertCircle,
            count: analysis?.keywords.missing.length || 0,
            color: 'text-rose-400',
            bgColor: 'bg-rose-500/10',
            borderColor: 'border-rose-500/20'
        },
        {
            id: 'found',
            label: 'Matched Keywords',
            icon: CheckCircle2,
            count: analysis?.keywords.found.length || 0,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20'
        },
        {
            id: 'gaps',
            label: 'Skill Gaps',
            icon: ZapIcon,
            count: analysis?.gaps.length || 0,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20'
        },
        {
            id: 'recommendations',
            label: 'AI Recommendations',
            icon: Lightbulb,
            count: analysis?.recommendations.length || 0,
            color: 'text-violet-400',
            bgColor: 'bg-violet-500/10',
            borderColor: 'border-violet-500/20'
        }
    ]

    return (
        <div className="w-[440px] border-l border-white/5 bg-[#0f0f12] flex flex-col h-full shadow-2xl relative z-40 animate-in slide-in-from-right duration-300">
            {/* ── Header ── */}
            <div className="relative p-6 border-b border-white/5 overflow-hidden">
                {/* bg glow */}
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-white uppercase tracking-widest text-xs italic">Keyword Optimizer</h3>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-0.5">Job Description Analyzer</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ── Job Description Input ── */}
            <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
                    <FileText className="w-3.5 h-3.5" />
                    Paste Job Description
                </label>
                <textarea
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here to discover keyword gaps and get AI-powered optimization advice..."
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white/80 placeholder-white/20 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all duration-200 font-medium leading-relaxed"
                />
                <button
                    onClick={() => {
                        if (!isPro) {
                            toast.error('The Keyword Scanner is a Pro feature.', {
                                description: 'Upgrade to analyze job descriptions and optimize your resume.',
                                action: {
                                    label: 'Upgrade',
                                    onClick: () => window.location.href = '/pricing'
                                }
                            })
                            return
                        }
                        handleAnalyze()
                    }}
                    disabled={loading || !jobDescription.trim()}
                    className={cn(
                        "mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300",
                        loading || !jobDescription.trim()
                            ? "bg-white/5 text-white/20 cursor-not-allowed"
                            : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:-translate-y-0.5 active:translate-y-0"
                    )}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Brain className="w-4 h-4" />
                            Analyze & Optimize
                            {!isPro && <Sparkles className="w-3 h-3 ml-1 text-amber-400" />}
                        </>
                    )}
                </button>
            </div>

            {/* ── Pro Gate Overlay ── */}
            {!isPro && !analysis && (
                <div className="absolute inset-x-0 bottom-0 top-[260px] bg-[#0f0f12]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center border-t border-white/5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center mb-6 shadow-xl shadow-amber-500/20 rotate-3">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">Pro Keyword Scanner</h4>
                    <p className="text-white/40 text-xs font-medium leading-relaxed mb-8 max-w-[280px]">
                        Unlock our proprietary AI engine to match your resume against any job description with 99.9% accuracy.
                    </p>
                    <div className="space-y-3 w-full">
                        <button 
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-none font-black uppercase tracking-widest text-[10px] h-12 shadow-xl shadow-amber-500/10 rounded-xl transition-all"
                            onClick={() => window.location.href = '/pricing'}
                        >
                            Upgrade to Unlock
                        </button>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Unlimited AI Analysis • $12/mo</p>
                    </div>
                </div>
            )}

            {/* ── Loading State ── */}
            {loading && (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border border-violet-500/20 animate-ping absolute inset-0" />
                        <div className="w-20 h-20 rounded-full border border-violet-500/40 animate-spin" style={{ borderTopColor: 'rgb(139,92,246)' }} />
                        <Brain className="w-8 h-8 text-violet-400 absolute inset-0 m-auto" />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-black uppercase tracking-widest text-xs italic mb-1">AI Thinking...</p>
                        <p className="text-white/30 text-xs font-medium">Matching keywords against your resume</p>
                    </div>
                </div>
            )}

            {/* ── Empty State ── */}
            {!loading && !analysis && (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                    <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
                        <Search className="w-9 h-9 text-white/20" />
                    </div>
                    <div>
                        <p className="text-white/60 font-black text-sm uppercase tracking-wide italic mb-2">Job-Ready Analysis</p>
                        <p className="text-white/25 text-xs font-medium leading-relaxed max-w-64">Paste any job description above to instantly discover which keywords your resume is missing and get an AI match score.</p>
                    </div>
                    <div className="flex flex-col gap-2 text-left w-full max-w-64">
                        {[
                            { icon: BarChart3, text: 'Match score vs job requirements' },
                            { icon: Hash, text: 'Missing keyword detection' },
                            { icon: Plus, text: 'One-click skill injection' },
                            { icon: Sparkles, text: 'AI-powered recommendations' },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-3 text-white/30">
                                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <Icon className="w-3 h-3" />
                                </div>
                                <span className="text-[11px] font-bold">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Results ── */}
            {!loading && analysis && (
                <div className="flex-1 overflow-y-auto">
                    {/* Match Score Hero */}
                    <div className="relative p-6 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-5 blur-3xl pointer-events-none"
                            style={{ background: `radial-gradient(circle at center, ${colors!.ring}, transparent 70%)` }}
                        />
                        <div className="relative flex items-center gap-5">
                            {/* Circular Score */}
                            <div className="relative w-20 h-20 shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                    <circle
                                        cx="40" cy="40" r="34" fill="none"
                                        stroke={colors!.ring}
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={213.6}
                                        strokeDashoffset={213.6 - (analysis.matchScore / 100) * 213.6}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={cn("text-2xl font-black", colors!.text)}>{analysis.matchScore}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Match Score</p>
                                <p className={cn("text-xl font-black uppercase italic tracking-tight", colors!.text)}>{getScoreLabel(analysis.matchScore)}</p>
                                <p className="text-xs text-white/40 font-medium mt-1 leading-relaxed">
                                    {analysis.matchScore >= 75
                                        ? 'Your resume strongly matches this role.'
                                        : analysis.matchScore >= 50
                                        ? 'Some keyword gaps detected. See below.'
                                        : 'Significant gaps found. Follow recommendations.'}
                                </p>
                            </div>
                        </div>

                        {/* Quick stat pills */}
                        <div className="relative mt-4 grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <div>
                                    <span className="text-emerald-300 font-black text-sm">{analysis.keywords.found.length}</span>
                                    <span className="text-emerald-400/60 text-[10px] font-bold ml-1">matched</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                <div>
                                    <span className="text-rose-300 font-black text-sm">{analysis.keywords.missing.length}</span>
                                    <span className="text-rose-400/60 text-[10px] font-bold ml-1">missing</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="p-4 space-y-2">
                        {sections.map(section => {
                            const Icon = section.icon
                            const isExpanded = expandedSection === section.id
                            const items =
                                section.id === 'missing' ? analysis.keywords.missing :
                                section.id === 'found' ? analysis.keywords.found :
                                section.id === 'gaps' ? analysis.gaps :
                                analysis.recommendations

                            if (items.length === 0) return null

                            return (
                                <div
                                    key={section.id}
                                    className={cn(
                                        "rounded-2xl border overflow-hidden transition-all duration-300",
                                        section.bgColor, section.borderColor
                                    )}
                                >
                                    <button
                                        onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                        className="w-full flex items-center justify-between p-4 text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center bg-black/20")}>
                                                <Icon className={cn("w-3.5 h-3.5", section.color)} />
                                            </div>
                                            <div>
                                                <span className={cn("text-xs font-black uppercase tracking-widest", section.color)}>{section.label}</span>
                                                <span className="ml-2 text-[10px] font-bold text-white/30">({items.length})</span>
                                            </div>
                                        </div>
                                        {isExpanded
                                            ? <ChevronUp className="w-4 h-4 text-white/20" />
                                            : <ChevronDown className="w-4 h-4 text-white/20" />}
                                    </button>

                                    {isExpanded && (
                                        <div className="px-4 pb-4 space-y-2">
                                            {section.id === 'missing' && (
                                                <p className="text-[10px] text-white/30 font-medium mb-3 flex items-start gap-1.5">
                                                    <Plus className="w-3 h-3 mt-0.5 shrink-0" />
                                                    Click any keyword to instantly add it to your resume skills.
                                                </p>
                                            )}
                                            {items.map((item, idx) => {
                                                const isAdded = section.id === 'missing' && addedKeywords.has(item)
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={cn(
                                                            "flex items-start gap-3 p-3 rounded-xl border transition-all duration-200",
                                                            section.id === 'missing'
                                                                ? isAdded
                                                                    ? "bg-emerald-500/10 border-emerald-500/20 cursor-default"
                                                                    : "bg-black/20 border-white/5 hover:border-white/10 hover:bg-black/30 cursor-pointer active:scale-[0.98]"
                                                                : "bg-black/20 border-white/5"
                                                        )}
                                                        onClick={section.id === 'missing' && !isAdded ? () => handleAddKeyword(item) : undefined}
                                                    >
                                                        {section.id === 'missing' ? (
                                                            <div className={cn(
                                                                "w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all",
                                                                isAdded ? "bg-emerald-500" : "bg-white/10"
                                                            )}>
                                                                {isAdded
                                                                    ? <BadgeCheck className="w-3 h-3 text-white" />
                                                                    : <Plus className="w-3 h-3 text-white/40" />}
                                                            </div>
                                                        ) : section.id === 'found' ? (
                                                            <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", section.color)} />
                                                        ) : section.id === 'gaps' ? (
                                                            <ZapIcon className={cn("w-4 h-4 shrink-0 mt-0.5", section.color)} />
                                                        ) : (
                                                            <ArrowRight className={cn("w-4 h-4 shrink-0 mt-0.5", section.color)} />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className={cn(
                                                                "text-xs font-bold leading-relaxed",
                                                                isAdded ? "text-emerald-300 line-through opacity-60" : "text-white/70"
                                                            )}>
                                                                {item}
                                                            </p>
                                                            {section.id === 'missing' && !isAdded && (
                                                                <p className="text-[9px] text-white/25 font-medium mt-0.5">Tap to add to skills</p>
                                                            )}
                                                            {isAdded && (
                                                                <p className="text-[9px] text-emerald-400 font-bold mt-0.5">✓ Added to skills</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        {/* Strengths */}
                        {analysis.strengths.length > 0 && (
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                                <button
                                    onClick={() => setExpandedSection(expandedSection === 'strengths' ? null : 'strengths')}
                                    className="w-full flex items-center justify-between p-4 text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-xl bg-sky-500/10 flex items-center justify-center">
                                            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-sky-400">
                                            Strengths <span className="text-white/30">({analysis.strengths.length})</span>
                                        </span>
                                    </div>
                                    {expandedSection === 'strengths'
                                        ? <ChevronUp className="w-4 h-4 text-white/20" />
                                        : <ChevronDown className="w-4 h-4 text-white/20" />}
                                </button>
                                {expandedSection === 'strengths' && (
                                    <div className="px-4 pb-4 space-y-2">
                                        {analysis.strengths.map((s, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 bg-sky-500/5 border border-sky-500/10 rounded-xl">
                                                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                                                <p className="text-xs text-white/60 font-medium leading-relaxed">{s}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-5 border-t border-white/5 m-4 mt-0 rounded-2xl bg-white/[0.02]">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Pro Tip</p>
                                <p className="text-[10px] text-white/25 font-medium leading-relaxed">
                                    Resumes that match 70%+ of job description keywords are 3x more likely to pass ATS screening.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
