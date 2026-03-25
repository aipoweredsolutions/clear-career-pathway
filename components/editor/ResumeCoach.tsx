'use client'

import React, { useMemo } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import {
    Sparkles, Zap, Target, AlertCircle, CheckCircle2,
    ArrowRight, Lightbulb, TrendingUp, Search, Info, X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { analyzeWithCoach, CoachSuggestion } from '@/lib/utils/resume-coach'

interface ResumeCoachProps {
    data: ResumeDocument
    onUpdate: (data: ResumeDocument) => void
    isOpen: boolean
    onClose: () => void
}

export function ResumeCoach({ data, onUpdate, isOpen, onClose }: ResumeCoachProps) {
    const suggestions = useMemo(() => analyzeWithCoach(data), [data])

    const applyFix = (suggestion: CoachSuggestion) => {
        if (!suggestion.suggestedText || !suggestion.originalText) return

        const newData = { ...data }
        const path = suggestion.fieldPath.split('.')

        // Helper to update nested object
        let current: any = newData
        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i]
            if (Array.isArray(current)) {
                current[parseInt(key)] = { ...current[parseInt(key)] }
                current = current[parseInt(key)]
            } else {
                current[key] = { ...current[key] }
                current = current[key]
            }
        }

        const lastKey = path[path.length - 1]
        const currentValue = current[lastKey]

        if (typeof currentValue === 'string') {
            // Case-insensitive replace for the specific match
            const regex = new RegExp(suggestion.originalText, 'i')
            current[lastKey] = currentValue.replace(regex, suggestion.suggestedText)
            onUpdate(newData)
        }
    }

    if (!isOpen) return null

    return (
        <div className="w-[400px] border-l border-neutral-100 bg-white flex flex-col h-full shadow-2xl relative z-40 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-neutral-900 text-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-black uppercase tracking-widest text-xs italic">AI Resume Coach</h3>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">Live Intelligence</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Performance Overview */}
            <div className="p-8 bg-neutral-50 border-b border-neutral-100">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Current Workload</span>
                    <span className={cn(
                        "px-2 py-0.5 rounded-md text-[10px] font-black uppercase",
                        suggestions.length > 5 ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500"
                    )}>
                        {suggestions.length} issues found
                    </span>
                </div>

                <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                    <div
                        className={cn("h-full transition-all duration-1000", suggestions.length === 0 ? "bg-emerald-500 w-full" : "bg-primary-500")}
                        style={{ width: suggestions.length === 0 ? '100%' : `${Math.max(10, 100 - (suggestions.length * 10))}%` }}
                    />
                </div>
            </div>

            {/* Suggestions List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {suggestions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h4 className="font-black text-neutral-900 uppercase italic mb-2 tracking-tight">Excellent Work</h4>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                            Your content is looking sharp. Recruiters appreciate this level of detail.
                        </p>
                    </div>
                ) : (
                    suggestions.map((item) => (
                        <div
                            key={item.id}
                            className="group p-5 bg-white rounded-[2rem] border border-neutral-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className={cn(
                                    "w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center",
                                    item.type === 'error' ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-500"
                                )}>
                                    {item.category === 'impact' ? <Zap className="w-5 h-5" /> :
                                        item.category === 'keywords' ? <Target className="w-5 h-5" /> :
                                            <Lightbulb className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                                            {item.section} • {item.category}
                                        </span>
                                    </div>
                                    <h5 className="text-sm font-black text-neutral-900 mb-1">{item.title}</h5>
                                    <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-4">
                                        {item.message}
                                    </p>

                                    {item.suggestedText && (
                                        <button
                                            onClick={() => applyFix(item)}
                                            className="w-full flex items-center justify-between p-3 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all group/btn"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="opacity-50 line-through lowercase italic font-bold">{item.originalText}</span>
                                                <ArrowRight className="w-3 h-3 text-primary-400" />
                                                <span className="text-primary-400 italic">Quick Fix: {item.suggestedText}</span>
                                            </div>
                                            <Zap className="w-3 h-3 group-hover/btn:scale-125 transition-transform" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer Tip */}
            <div className="p-8 border-t border-neutral-100 bg-neutral-50">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl border-2 border-primary-100 flex items-center justify-center text-primary-500 bg-white">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-900 mb-1">Coach Tip</p>
                        <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
                            Resumes with at least 5 quantified metrics receive 2.5x more interview requests.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
