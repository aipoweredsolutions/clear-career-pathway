'use client'

import React, { useState } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import {
    MessageSquare,
    FileText,
    CheckCircle2,
    Zap,
    Loader2,
    Sparkles,
    UserCircle,
    BrainCircuit,
    ChevronRight,
    ChevronLeft,
    Lightbulb
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface InterviewQuestion {
    question: string
    reason: string
    suggestedApproach: string
    sampleAnswerSnippet: string
}

interface InterviewResult {
    roleContext: string
    questions: InterviewQuestion[]
}

export function InterviewPrep({ resumes }: { resumes: ResumeDocument[] }) {
    const [selectedResumeId, setSelectedResumeId] = useState<string>('')
    const [targetRole, setTargetRole] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<InterviewResult | null>(null)
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

    const handleGenerate = async () => {
        if (!selectedResumeId) {
            toast.error('Please select a resume')
            return
        }
        if (!targetRole.trim()) {
            toast.error('Please enter the target job title')
            return
        }

        setIsGenerating(true)
        setResult(null)
        setActiveQuestionIndex(0)

        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'interview_prep',
                    currentContent: targetRole,
                    userProfile: {
                        resumeContent: JSON.stringify(selectedResume)
                    }
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate questions')
            }

            setResult(data.data)
            toast.success('Interview guide ready!')
        } catch (error: any) {
            console.error('Interview prep error:', error)
            toast.error(error.message || 'Failed to generate interview prep')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="space-y-8">
            {/* Input Section */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 bg-neutral-50/50">
                    <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-indigo-600" />
                        AI Interview Simulator
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                        Get personalized behavioral and technical questions based on your specific background and target role.
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Resume Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                1. Basis for Experience
                            </label>
                            <select
                                value={selectedResumeId}
                                onChange={(e) => setSelectedResumeId(e.target.value)}
                                className="w-full p-3 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                            >
                                <option value="">Select a resume...</option>
                                {resumes.map((resume) => (
                                    <option key={resume.id} value={resume.id}>{resume.title || 'Untitled Resume'}</option>
                                ))}
                            </select>
                        </div>

                        {/* Target Role */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                2. Target Job Title
                            </label>
                            <input
                                type="text"
                                value={targetRole}
                                onChange={(e) => setTargetRole(e.target.value)}
                                placeholder="e.g. Senior Frontend Engineer"
                                className="w-full p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !selectedResumeId || !targetRole}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generating Guide...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Interview Prep
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                        <h4 className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-2">Context</h4>
                        <p className="text-indigo-900 font-medium leading-relaxed">{result.roleContext}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Question List (Left) */}
                        <div className="lg:col-span-1 space-y-3">
                            {result.questions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveQuestionIndex(i)}
                                    className={cn(
                                        "w-full text-left p-4 rounded-xl border-2 transition-all group",
                                        activeQuestionIndex === i
                                            ? "border-indigo-600 bg-white shadow-md ring-4 ring-indigo-50"
                                            : "border-transparent bg-neutral-100/50 hover:bg-neutral-100"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0",
                                            activeQuestionIndex === i ? "bg-indigo-600 text-white" : "bg-neutral-200 text-neutral-500"
                                        )}>
                                            Q{i + 1}
                                        </div>
                                        <p className={cn(
                                            "text-sm font-bold truncate",
                                            activeQuestionIndex === i ? "text-indigo-900" : "text-neutral-600"
                                        )}>
                                            {q.question}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Active Question Detail (Right) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm min-h-[400px] flex flex-col">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-black text-neutral-900 leading-tight">
                                        {result.questions[activeQuestionIndex].question}
                                    </h2>
                                </div>

                                <div className="space-y-6 flex-1">
                                    <div>
                                        <h5 className="flex items-center gap-2 text-primary-600 font-bold text-sm mb-3">
                                            <Lightbulb className="w-4 h-4" />
                                            Why they&apos;re asking:
                                        </h5>
                                        <p className="text-neutral-600 text-sm leading-relaxed">
                                            {result.questions[activeQuestionIndex].reason}
                                        </p>
                                    </div>

                                    <div>
                                        <h5 className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-3">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Strategy:
                                        </h5>
                                        <p className="text-neutral-600 text-sm leading-relaxed font-medium">
                                            {result.questions[activeQuestionIndex].suggestedApproach}
                                        </p>
                                    </div>

                                    <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                                        <h5 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">Sample Highlight for Your Resume:</h5>
                                        <p className="text-neutral-800 italic text-sm border-l-4 border-indigo-200 pl-4 py-1">
                                            &quot;{result.questions[activeQuestionIndex].sampleAnswerSnippet}&quot;
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between items-center pt-6 border-t border-neutral-100">
                                    <button
                                        disabled={activeQuestionIndex === 0}
                                        onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                                        className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 disabled:opacity-0 transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        Previous
                                    </button>
                                    <span className="text-xs font-black text-neutral-300">
                                        {activeQuestionIndex + 1} / {result.questions.length}
                                    </span>
                                    <button
                                        disabled={activeQuestionIndex === result.questions.length - 1}
                                        onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                                        className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 disabled:opacity-0 transition-all"
                                    >
                                        Next
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
