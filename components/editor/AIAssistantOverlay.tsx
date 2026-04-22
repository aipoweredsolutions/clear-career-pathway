'use client'

import React, { useState } from 'react'
import { 
    Sparkles, 
    X, 
    Loader2, 
    Zap, 
    Target, 
    FileText, 
    Check, 
    ArrowRight,
    Brain,
    ShieldCheck,
    AlertCircle
} from 'lucide-react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

interface AIAssistantOverlayProps {
    data: ResumeDocument
    onUpdate: (data: ResumeDocument) => void
    isOpen: boolean
    onClose: () => void
}

export function AIAssistantOverlay({ data, onUpdate, isOpen, onClose }: AIAssistantOverlayProps) {
    const [mode, setMode] = useState<'menu' | 'optimize' | 'review'>('menu')
    const [jobDescription, setJobDescription] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [optimizedData, setOptimizedData] = useState<Partial<ResumeDocument> | null>(null)

    const handleOptimize = async () => {
        if (!jobDescription.trim()) {
            toast.error('Please paste a job description first.')
            return
        }

        setIsProcessing(true)
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'optimize_resume',
                    jobDescription,
                    resumeContent: JSON.stringify(data)
                })
            })

            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'Optimization failed')

            setOptimizedData(result.data)
            setMode('review')
            toast.success('Resume optimized for the job!')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsProcessing(false)
        }
    }

    const applyChanges = () => {
        if (!optimizedData) return

        const newData = { ...data }
        
        if (optimizedData.professionalSummary) {
            newData.professionalSummary = {
                ...newData.professionalSummary,
                ...optimizedData.professionalSummary
            }
        }

        if (optimizedData.workExperience) {
            newData.workExperience = newData.workExperience?.map(exp => {
                const optExp = optimizedData.workExperience?.find((e: any) => e.id === exp.id)
                if (optExp && optExp.achievements) {
                    return {
                        ...exp,
                        achievements: exp.achievements?.map(ach => {
                            const optAch = optExp.achievements?.find((a: any) => a.id === ach.id)
                            return optAch ? { ...ach, achievementText: optAch.achievementText } : ach
                        })
                    }
                }
                return exp
            })
        }

        onUpdate(newData)
        toast.success('Changes applied to your resume')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md" onClick={onClose} />
            
            <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-neutral-900 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 animate-pulse">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tighter italic leading-none mb-1">Elite AI Assistant</h3>
                            <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest leading-none">Hyper-Personalized Content Engine</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-10">
                    {mode === 'menu' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
                            <button 
                                onClick={() => setMode('optimize')}
                                className="group p-8 rounded-[2rem] border-2 border-neutral-100 hover:border-primary-500 hover:bg-primary-50/30 transition-all text-left flex flex-col h-full"
                            >
                                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Target className="w-7 h-7 text-primary-600" />
                                </div>
                                <h4 className="text-2xl font-black text-neutral-900 mb-2 tracking-tight">Job-Targeted Rewrite</h4>
                                <p className="text-neutral-500 font-medium leading-relaxed mb-6">
                                    Paste a job description and Gemini will rewrite your summary and experience to match exactly what the recruiter is looking for.
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-primary-600 font-black uppercase tracking-widest text-xs">
                                    Start Optimization <ArrowRight className="w-4 h-4" />
                                </div>
                            </button>

                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-amber-500"><Zap className="w-5 h-5" /></div>
                                    <div>
                                        <h5 className="font-bold text-neutral-900 mb-1">Impact-First Language</h5>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-medium">Converts passive tasks into results-driven achievements with quantified metrics.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-500"><ShieldCheck className="w-5 h-5" /></div>
                                    <div>
                                        <h5 className="font-bold text-neutral-900 mb-1">ATS Safeguard</h5>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-medium">Maintains 100% machine readability while maximizing keyword density.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-violet-500"><Brain className="w-5 h-5" /></div>
                                    <div>
                                        <h5 className="font-bold text-neutral-900 mb-1">Executive Tone Control</h5>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-medium">Automatically adjusts vocabulary to match your desired seniority level.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'optimize' && (
                        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-10">
                                <h4 className="text-3xl font-black text-neutral-900 mb-4 tracking-tighter">Targeted Re-write</h4>
                                <p className="text-neutral-500 font-medium leading-relaxed">
                                    Paste the job description below. Gemini will analyze the requirements and align your professional narrative.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                    <FileText className="w-3.5 h-3.5" />
                                    Job Description
                                </label>
                                <textarea 
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="e.g. Senior Software Engineer at Stripe... Requirements: 5+ years experience with React, Distributed Systems..."
                                    className="w-full h-64 p-6 rounded-[2rem] border-2 border-neutral-100 focus:border-primary-500 focus:ring-0 outline-none transition-all text-sm font-medium leading-relaxed bg-neutral-50/30"
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button 
                                    variant="outline" 
                                    className="flex-1 h-14 rounded-2xl font-black"
                                    onClick={() => setMode('menu')}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    className="flex-[2] h-14 rounded-2xl font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200"
                                    onClick={handleOptimize}
                                    disabled={isProcessing || !jobDescription}
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                            Analyzing Requirements...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 mr-3" />
                                            Optimize My Resume
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}

                    {mode === 'review' && optimizedData && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="text-2xl font-black text-neutral-900 tracking-tight">Review AI Enhancements</h4>
                                    <p className="text-sm text-neutral-500 font-medium">Gemini has optimized your summary and achievements for the target role.</p>
                                </div>
                                <div className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                                    <Check className="w-3.5 h-3.5" />
                                    Ready to Apply
                                </div>
                            </div>

                            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 scrollbar-hide">
                                {optimizedData.professionalSummary && (
                                    <div className="p-8 rounded-[2rem] bg-primary-50 border border-primary-100 relative group">
                                        <div className="absolute top-4 right-4 text-primary-300 group-hover:text-primary-500 transition-colors">
                                            <Zap className="w-6 h-6 fill-current" />
                                        </div>
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-primary-700 mb-4">Optimized Summary</h5>
                                        <p className="text-neutral-800 font-medium leading-relaxed text-lg italic">
                                            &ldquo;{optimizedData.professionalSummary.summaryText}&rdquo;
                                        </p>
                                    </div>
                                )}

                                {optimizedData.workExperience?.map((exp: any, i: number) => (
                                    <div key={i} className="space-y-4">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-4">Experience: {exp.jobTitle || 'Role'}</h5>
                                        {exp.achievements?.map((ach: any, j: number) => (
                                            <div key={j} className="p-6 rounded-2xl bg-white border border-neutral-100 hover:border-primary-200 transition-all group relative">
                                                <div className="absolute -left-1 top-6 bottom-6 w-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                                                    {ach.achievementText}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-neutral-100 flex gap-4">
                                <Button 
                                    variant="outline" 
                                    className="flex-1 h-14 rounded-2xl font-black"
                                    onClick={() => setMode('optimize')}
                                >
                                    Try Different JD
                                </Button>
                                <Button 
                                    className="flex-[2] h-14 rounded-2xl font-black bg-neutral-900 hover:bg-black text-white shadow-xl shadow-neutral-200"
                                    onClick={applyChanges}
                                >
                                    Update My Resume
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="p-8 bg-neutral-50 border-t border-neutral-100 flex items-center gap-4 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-primary-600 shadow-sm">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <p className="text-[10px] text-neutral-400 font-bold leading-relaxed uppercase tracking-widest max-w-2xl">
                        AI-generated content should be reviewed for accuracy. While Gemini optimizes for impact, ensure all facts remain true to your career history.
                    </p>
                </div>
            </div>
        </div>
    )
}
