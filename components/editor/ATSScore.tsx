import React, { useMemo, useRef, useState } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import {
    AlertCircle, CheckCircle2, Trophy, ChevronDown, ChevronUp,
    Zap, Target, Layout, ShieldCheck, Sparkles, ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { analyzeATS, ATSAnalysis } from '@/lib/utils/ats-analyzer'

interface ATSScoreProps {
    data: ResumeDocument
    className?: string
}

export function ATSScore({ data, className }: ATSScoreProps) {
    const [isOpen, setIsOpen] = useState(false)

    // Cache analysis to avoid recomputing when data reference changes but content hasn't
    const lastDataHash = useRef<string>('')
    const cachedAnalysis = useRef<ATSAnalysis | null>(null)

    const analysis = useMemo(() => {
        const hash = JSON.stringify({
            pi: data.personalInfo?.fullName,
            ps: data.professionalSummary?.summaryText?.length,
            we: data.workExperience?.length,
            wea: data.workExperience?.reduce((n, j) => n + (j.achievements?.length || 0), 0),
            ed: data.education?.length,
            sk: data.skills?.length,
            ce: data.certifications?.length,
        })
        if (hash === lastDataHash.current && cachedAnalysis.current) {
            return cachedAnalysis.current
        }
        lastDataHash.current = hash
        cachedAnalysis.current = analyzeATS(data)
        return cachedAnalysis.current
    }, [data])

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-600'
        if (score >= 60) return 'text-amber-500'
        return 'text-rose-500'
    }

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'bg-emerald-50 border-emerald-100'
        if (score >= 60) return 'bg-amber-50 border-amber-100'
        return 'bg-rose-50 border-rose-100'
    }

    const ringColor = (score: number) => {
        if (score >= 80) return 'stroke-emerald-500'
        if (score >= 60) return 'stroke-amber-500'
        return 'stroke-rose-500'
    }

    const CategoryScore = ({ label, score, icon: Icon, color }: { label: string, score: number, icon: any, color: string }) => (
        <div className="flex flex-col gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 group transition-all hover:bg-white hover:shadow-sm">
            <div className="flex items-center justify-between">
                <div className={cn("p-1.5 rounded-lg", color.replace('text-', 'bg-').replace('600', '100').replace('500', '100'))}>
                    <Icon className={cn("w-4 h-4", color)} />
                </div>
                <span className={cn("text-sm font-black", color)}>{score}%</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-neutral-500 transition-colors">{label}</span>
                <div className="w-full bg-neutral-200 h-1 rounded-full mt-1.5 overflow-hidden">
                    <div
                        className={cn("h-full transition-all duration-1000", color.replace('text-', 'bg-'))}
                        style={{ width: `${score}%` }}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className={cn("relative", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 group",
                    getScoreBg(analysis.score),
                    isOpen && "ring-2 ring-offset-2 ring-primary-200 bg-white"
                )}
            >
                <div className="relative w-9 h-9 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="18"
                            cy="18"
                            r="15"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="opacity-10"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="15"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={94.24}
                            strokeDashoffset={94.24 - (analysis.score / 100) * 94.24}
                            className={cn("transition-all duration-1000 ease-out", ringColor(analysis.score))}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className={cn("absolute text-[10px] font-black", getScoreColor(analysis.score))}>
                        {analysis.score}
                    </span>
                </div>
                <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-neutral-500 transition-colors">Resume Strength</span>
                    <span className={cn("text-sm font-black italic uppercase", getScoreColor(analysis.score))}>
                        {analysis.score >= 80 ? 'Excellent' : analysis.score >= 60 ? 'Good' : 'Needs Work'}
                    </span>
                </div>
                <div className="ml-1 text-neutral-400 group-hover:text-neutral-600 transition-colors">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-4 w-[380px] bg-white rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-neutral-100 overflow-hidden z-[100] animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
                    {/* Header */}
                    <div className="p-8 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl -ml-12 -mb-12" />

                        <div className="relative z-10 flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-400" />
                                <h3 className="font-black uppercase tracking-widest text-xs italic">Pulse Analysis</h3>
                            </div>
                            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-black">
                                v4.2 Stable
                            </div>
                        </div>

                        <div className="relative z-10 flex items-end gap-3 translate-y-2">
                            <span className="text-7xl font-black leading-none tracking-tighter italic">{analysis.score}</span>
                            <div className="flex flex-col justify-end pb-1">
                                <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Strength Score</span>
                                <div className="flex items-center gap-1">
                                    <div className={cn("w-2 h-2 rounded-full animate-pulse", analysis.score >= 80 ? 'bg-emerald-400' : analysis.score >= 60 ? 'bg-amber-400' : 'bg-rose-400')} />
                                    <span className={cn("font-black uppercase text-xs italic", getScoreColor(analysis.score))}>
                                        {analysis.score >= 80 ? 'Market Ready' : analysis.score >= 60 ? 'Competitive' : 'Developing'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {/* Breakdown */}
                        <div className="grid grid-cols-2 gap-4">
                            <CategoryScore
                                label="Structure"
                                score={analysis.breakdown.structure}
                                icon={Layout}
                                color="text-blue-500"
                            />
                            <CategoryScore
                                label="Impact"
                                score={analysis.breakdown.impact}
                                icon={Zap}
                                color="text-amber-500"
                            />
                            <CategoryScore
                                label="Keywords"
                                score={analysis.breakdown.keywords}
                                icon={Target}
                                color="text-purple-500"
                            />
                            <CategoryScore
                                label="ATS Ready"
                                score={analysis.breakdown.ats}
                                icon={ShieldCheck}
                                color="text-emerald-500"
                            />
                        </div>

                        {/* Improvements */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-primary-500" />
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Recommended Improvements</h4>
                            </div>

                            <div className="space-y-3">
                                {analysis.feedback.length === 0 ? (
                                    <div className="p-6 text-center bg-emerald-50 rounded-3xl border border-emerald-100 border-dashed">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                                        <p className="font-black text-emerald-900 uppercase italic text-sm">Perfect Score!</p>
                                        <p className="text-xs text-emerald-700/70 font-medium">Your resume is optimized for recruiter impact.</p>
                                    </div>
                                ) : (
                                    analysis.feedback.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group flex gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-100 hover:bg-white hover:border-primary-100 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
                                        >
                                            <div className={cn(
                                                "w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12",
                                                item.type === 'error' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'
                                            )}>
                                                <AlertCircle className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                                                        {item.section}
                                                    </span>
                                                    <ArrowRight className="w-3 h-3 text-neutral-300 group-hover:text-primary-500 transition-colors" />
                                                </div>
                                                <p className="text-sm font-bold text-neutral-800 leading-tight group-hover:text-neutral-900 transition-colors">
                                                    {item.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Tip */}
                        <div className="bg-primary-50 p-6 rounded-3xl border border-primary-100 flex items-start gap-4">
                            <div className="bg-white p-2 rounded-xl shadow-sm">
                                <ShieldCheck className="w-4 h-4 text-primary-600" />
                            </div>
                            <div>
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-1">Expert Tip</h5>
                                <p className="text-xs text-primary-800/80 font-medium leading-relaxed">
                                    Our high-fidelity templates are designed to be 100% ATS-readable. Focus on impact and keywords.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

