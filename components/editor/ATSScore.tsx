import React, { useMemo, useState } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { AlertCircle, CheckCircle2, Trophy, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

import { analyzeATS, ATSAnalysis } from '@/lib/utils/ats-analyzer'

interface ATSScoreProps {
    data: ResumeDocument
    className?: string
}

export function ATSScore({ data, className }: ATSScoreProps) {
    const [isOpen, setIsOpen] = useState(false)

    const analysis = useMemo(() => {
        return analyzeATS(data)
    }, [data])

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200 shadow-emerald-100/50'
        if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200 shadow-amber-100/50'
        return 'text-red-600 bg-red-50 border-red-200 shadow-red-100/50'
    }

    const ringColor = (score: number) => {
        if (score >= 90) return 'stroke-emerald-500'
        if (score >= 70) return 'stroke-amber-500'
        return 'stroke-red-500'
    }


    return (
        <div className={cn("relative", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-3 px-3 py-1.5 rounded-full border transition-all",
                    getScoreColor(analysis.score),
                    isOpen && "ring-2 ring-offset-1 ring-primary-100"
                )}
            >
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="16"
                            cy="16"
                            r="12"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="opacity-20"
                        />
                        <circle
                            cx="16"
                            cy="16"
                            r="12"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={75.36}
                            strokeDashoffset={75.36 - (analysis.score / 100) * 75.36}
                            className={cn("transition-all duration-1000 ease-out", ringColor(analysis.score))}
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold">{analysis.score}</span>
                </div>
                <div className="text-sm font-bold hidden sm:block">
                    ATS Score
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 p-0 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex justify-between items-center">
                        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            Resume Health
                        </h3>
                        <span className="text-sm font-bold text-neutral-500">{analysis.score}/100</span>
                    </div>

                    <div className="max-h-80 overflow-y-auto p-2">
                        {analysis.feedback.length === 0 ? (
                            <div className="p-4 flex flex-col items-center text-center text-emerald-600">
                                <CheckCircle2 className="w-10 h-10 mb-2" />
                                <p className="font-medium">Excellent!</p>
                                <p className="text-xs opacity-80">Your resume is optimized for ATS parsing.</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {analysis.feedback.map((item) => (
                                    <div key={item.id} className="flex gap-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors">
                                        {item.type === 'error' ? (
                                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-neutral-800">{item.message}</p>
                                            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mt-0.5">
                                                {item.section}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="p-3 border-t border-neutral-100 mt-2">
                            <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
                                <span>ℹ️</span>
                                <div>Our strict layout ensures your formatting is always readable by Applicant Tracking Systems.</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
