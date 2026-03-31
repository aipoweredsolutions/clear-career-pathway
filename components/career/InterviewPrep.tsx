'use client'

import React, { useState, useEffect } from 'react'
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
    Lightbulb,
    History
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { saveInterviewSession, fetchLatestInterviewSession } from '@/app/career-hub/actions'

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
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [selectedResumeId, setSelectedResumeId] = useState<string>('')
    const [targetRole, setTargetRole] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<InterviewResult | null>(null)
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [category, setCategory] = useState<'general' | 'behavioral' | 'technical'>('general')
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
    const [feedbacks, setFeedbacks] = useState<Record<number, any>>({})
    const [isMockMode, setIsMockMode] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isRestoring, setIsRestoring] = useState(false)

    // Load latest session when resume is selected
    useEffect(() => {
        if (!selectedResumeId) return
        
        async function loadPreviousSession() {
            setIsRestoring(true)
            const session = await fetchLatestInterviewSession(selectedResumeId)
            if (session) {
                setSessionId(session.id)
                setTargetRole(session.target_role)
                setCategory(session.category as any)
                setResult({
                    roleContext: session.role_context,
                    questions: session.questions
                })
                setUserAnswers(session.user_answers || {})
                setFeedbacks(session.feedbacks || {})
                toast.success('Loaded last practice session')
            }
            setIsRestoring(false)
        }
        loadPreviousSession()
    }, [selectedResumeId])

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
        setSessionId(null)
        setActiveQuestionIndex(0)

        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'interview_prep',
                    category,
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
            
            // Auto-save the initial session
            const saveResult = await saveInterviewSession({
                resumeId: selectedResumeId,
                targetRole,
                category,
                roleContext: data.data.roleContext,
                questions: data.data.questions,
                userAnswers: {},
                feedbacks: {}
            })
            
            if (saveResult.success) setSessionId(saveResult.id!)

            toast.success(`${category.charAt(0).toUpperCase() + category.slice(1)} interview guide ready!`)
        } catch (error: any) {
            console.error('Interview prep error:', error)
            toast.error(error.message || 'Failed to generate interview prep')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleAnalyzeAnswer = async () => {
        const currentAnswer = userAnswers[activeQuestionIndex]
        if (!currentAnswer?.trim()) {
            toast.error('Please type your answer first.')
            return
        }

        setIsAnalyzing(true)
        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'interview_feedback',
                    question: result?.questions[activeQuestionIndex].question,
                    answer: currentAnswer,
                    roleContext: result?.roleContext,
                    userProfile: {
                        resumeContent: JSON.stringify(selectedResume)
                    }
                })
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error)

            const newFeedbacks = {
                ...feedbacks,
                [activeQuestionIndex]: data.data
            }
            setFeedbacks(newFeedbacks)

            // Sync update to database
            if (sessionId) {
                await saveInterviewSession({
                    id: sessionId,
                    resumeId: selectedResumeId,
                    targetRole,
                    category,
                    roleContext: result?.roleContext,
                    questions: result?.questions,
                    userAnswers: userAnswers,
                    feedbacks: newFeedbacks
                })
            }

            toast.success('AI feedback received and saved!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to analyze answer')
        } finally {
            setIsAnalyzing(false)
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
                            <div className="relative">
                                <select
                                    value={selectedResumeId}
                                    onChange={(e) => setSelectedResumeId(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm appearance-none"
                                >
                                    <option value="">Select a resume...</option>
                                    {resumes.map((resume) => (
                                        <option key={resume.id} value={resume.id}>{resume.title || 'Untitled Resume'}</option>
                                    ))}
                                </select>
                                {isRestoring && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/80 px-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                                        <span className="text-[8px] font-black uppercase text-indigo-600">Syncing...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Target Role */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                2. Target Job Title/Description
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

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-3">
                            3. Focus Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {(['general', 'behavioral', 'technical'] as const).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border",
                                        category === cat
                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                                            : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
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
                                <div className="flex justify-between items-start mb-8">
                                    <h2 className="text-2xl font-black text-neutral-900 leading-tight flex-1">
                                        {result.questions[activeQuestionIndex].question}
                                    </h2>
                                    <button
                                        onClick={() => setIsMockMode(!isMockMode)}
                                        className={cn(
                                            "ml-4 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                            isMockMode ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
                                        )}
                                    >
                                        Mock Mode: {isMockMode ? 'ON' : 'OFF'}
                                    </button>
                                </div>

                                <div className="space-y-6 flex-1">
                                    {isMockMode ? (
                                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Type Your Answer</label>
                                                <textarea
                                                    value={userAnswers[activeQuestionIndex] || ''}
                                                    onChange={(e) => setUserAnswers({ ...userAnswers, [activeQuestionIndex]: e.target.value })}
                                                    placeholder="Practice your response here... Try using the STAR method."
                                                    className="w-full h-40 p-6 bg-neutral-50 rounded-2xl border border-neutral-200 focus:ring-4 focus:ring-primary-50 transition-all font-medium text-sm leading-relaxed outline-none"
                                                />
                                            </div>

                                            <button
                                                onClick={handleAnalyzeAnswer}
                                                disabled={isAnalyzing || !userAnswers[activeQuestionIndex]}
                                                className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                {isAnalyzing ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Evaluating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-5 h-5" />
                                                        Analyze MY Answer
                                                    </>
                                                )}
                                            </button>

                                            {feedbacks[activeQuestionIndex] && (
                                                <div className="mt-8 space-y-6 animate-in fade-in duration-500">
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                        {Object.entries(feedbacks[activeQuestionIndex].starCheck).map(([point, hit]) => (
                                                            <div key={point} className={cn(
                                                                "p-3 rounded-xl border flex flex-col items-center gap-1",
                                                                hit ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-neutral-50 border-neutral-100 text-neutral-400"
                                                            )}>
                                                                {hit ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-neutral-300" />}
                                                                <span className="text-[10px] font-black uppercase tracking-widest">{point}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 relative pt-10">
                                                        <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary-600 text-white w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white">
                                                            <span className="text-lg font-black leading-none">{feedbacks[activeQuestionIndex].score}</span>
                                                            <span className="text-[8px] font-bold opacity-70">Score</span>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h5 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-2">Strengths</h5>
                                                                <ul className="space-y-1">
                                                                    {feedbacks[activeQuestionIndex].strengths.map((s: string, i: number) => (
                                                                        <li key={i} className="text-xs font-bold text-neutral-700 flex items-start gap-2">
                                                                            <span className="text-emerald-500 mt-0.5">•</span> {s}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div>
                                                                <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Areas for Growth</h5>
                                                                <ul className="space-y-1">
                                                                    {feedbacks[activeQuestionIndex].improvements.map((s: string, i: number) => (
                                                                        <li key={i} className="text-xs font-bold text-neutral-700 flex items-start gap-2">
                                                                            <span className="text-amber-500 mt-0.5">•</span> {s}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-neutral-900 rounded-3xl p-6 text-white overflow-hidden relative group">
                                                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                                                            <Zap className="w-16 h-16" />
                                                        </div>
                                                        <h5 className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-4">Elite Re-Write (Suggested)</h5>
                                                        <p className="text-sm font-medium leading-relaxed italic opacity-90 relative z-10">
                                                            &quot;{feedbacks[activeQuestionIndex].improvedAnswer}&quot;
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
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
                                    )}
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
