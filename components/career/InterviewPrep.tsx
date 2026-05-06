'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, Loader2, Check, User, Briefcase, Award, MessageSquare, Star, ArrowRight, Play, RotateCcw, AlertCircle, ShieldCheck } from 'lucide-react'
import { ResumeDocument } from '@/lib/types/resume'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { saveInterviewSession, fetchLatestInterviewSession } from '@/app/career-hub/actions'

interface Question {
    question: string
    reason: string
    suggestedApproach: string
    sampleAnswerSnippet: string
}

interface Feedback {
    strengths: string[]
    improvements: string[]
    score: number
    improvedAnswer: string
    starCheck: {
        situation: boolean
        task: boolean
        action: boolean
        result: boolean
    }
}

interface InterviewPrepProps {
    resumes: ResumeDocument[]
}

export function InterviewPrep({ resumes }: InterviewPrepProps) {
    const [selectedResumeId, setSelectedResumeId] = useState<string>('')
    const [category, setCategory] = useState<'general' | 'behavioral' | 'technical'>('general')
    const [isGenerating, setIsGenerating] = useState(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [feedbacks, setFeedbacks] = useState<(Feedback | null)[]>([])
    const [isEvaluating, setIsEvaluating] = useState(false)
    const [roleContext, setRoleContext] = useState('')
    const [mode, setMode] = useState<'setup' | 'practice' | 'review'>('setup')

    const handleStart = async () => {
        if (!selectedResumeId) {
            toast.error('Please select a resume to practice with')
            return
        }

        setIsGenerating(true)
        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'interview_prep',
                    category,
                    resumeContent: JSON.stringify(selectedResume)
                })
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Generation failed')
            
            setQuestions(data.data.questions)
            setRoleContext(data.data.roleContext)
            setUserAnswers(new Array(data.data.questions.length).fill(''))
            setFeedbacks(new Array(data.data.questions.length).fill(null))
            setMode('practice')
            setCurrentQuestionIndex(0)
            toast.success('Interview guide generated!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to start interview prep')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleEvaluate = async () => {
        const answer = userAnswers[currentQuestionIndex]
        if (!answer || answer.length < 20) {
            toast.error('Please provide a more detailed answer for evaluation')
            return
        }

        setIsEvaluating(true)
        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'interview_feedback',
                    question: questions[currentQuestionIndex].question,
                    answer,
                    roleContext,
                    resumeContent: JSON.stringify(selectedResume)
                })
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Evaluation failed')
            
            const newFeedbacks = [...feedbacks]
            newFeedbacks[currentQuestionIndex] = data.data
            setFeedbacks(newFeedbacks)
            
            toast.success('Feedback received!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to evaluate answer')
        } finally {
            setIsEvaluating(false)
        }
    }

    const handleSaveSession = async () => {
        const result = await saveInterviewSession({
            resumeId: selectedResumeId,
            targetRole: roleContext,
            category,
            roleContext,
            questions,
            userAnswers,
            feedbacks
        })

        if (result.success) {
            toast.success('Interview practice saved to your history')
        } else {
            toast.error('Failed to save session')
        }
    }

    if (mode === 'setup') {
        return (
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-neutral-100 bg-neutral-50/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 tracking-tight">AI Interview Simulator</h3>
                    </div>
                    <p className="text-neutral-500 font-medium">
                        Prepare for high-stakes interviews with role-specific simulations and real-time STAR method feedback.
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    <div>
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 block mb-6">1. Select Career Source</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resumes.map(r => (
                                <button
                                    key={r.id}
                                    onClick={() => setSelectedResumeId(r.id!)}
                                    className={cn(
                                        "p-5 rounded-[1.5rem] border-2 text-left transition-all group relative",
                                        selectedResumeId === r.id 
                                            ? "border-primary-600 bg-primary-50/30" 
                                            : "border-neutral-100 hover:border-neutral-300"
                                    )}
                                >
                                    {selectedResumeId === r.id && (
                                        <div className="absolute top-4 right-4 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                    <p className="font-black text-neutral-900 group-hover:text-primary-600 transition-colors">{r.title}</p>
                                    <p className="text-[10px] text-neutral-400 mt-1 uppercase font-black tracking-widest">{r.jobType} • {r.careerLevel}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 block mb-6">2. Choose Focus Area</label>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'general', label: 'General', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
                                { id: 'behavioral', label: 'Behavioral', icon: User, color: 'bg-emerald-100 text-emerald-600' },
                                { id: 'technical', label: 'Technical', icon: Award, color: 'bg-violet-100 text-violet-600' },
                            ].map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategory(cat.id as any)}
                                    className={cn(
                                        "flex flex-col items-center gap-3 p-6 rounded-[1.5rem] border-2 transition-all",
                                        category === cat.id ? "border-primary-600 bg-primary-50/50" : "border-neutral-100 hover:border-neutral-200"
                                    )}
                                >
                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", cat.color)}>
                                        <cat.icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-black text-[10px] uppercase tracking-widest">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button
                        size="lg"
                        onClick={handleStart}
                        disabled={isGenerating || !selectedResumeId}
                        className="w-full h-16 rounded-[1.5rem] bg-neutral-900 text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-neutral-800 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Analyzing Career Path...
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5 fill-current" />
                                Start Simulation
                            </>
                        )}
                    </Button>
                </div>
            </div>
        )
    }

    if (mode === 'practice') {
        const q = questions[currentQuestionIndex]
        const f = feedbacks[currentQuestionIndex]

        return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Question Area */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-neutral-200 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 px-3 py-1 bg-primary-50 rounded-full border border-primary-100">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </span>
                            <button 
                                onClick={() => setMode('setup')}
                                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-neutral-900 leading-tight mb-4 italic">
                            &quot;{q.question}&quot;
                        </h2>
                        <p className="text-neutral-400 text-sm font-medium italic mb-10">
                            Recruiter Intent: {q.reason}
                        </p>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block ml-1">Your Answer (STAR Method Recommended)</label>
                            <textarea
                                value={userAnswers[currentQuestionIndex]}
                                onChange={(e) => {
                                    const newAnswers = [...userAnswers]
                                    newAnswers[currentQuestionIndex] = e.target.value
                                    setUserAnswers(newAnswers)
                                }}
                                placeholder="Type your response here..."
                                className="w-full h-64 bg-neutral-50 border-2 border-neutral-100 rounded-[1.5rem] p-6 text-neutral-700 font-medium focus:outline-none focus:border-primary-500 transition-colors resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                    disabled={currentQuestionIndex === 0}
                                    className="rounded-full font-black uppercase tracking-widest text-[10px]"
                                >
                                    Previous
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        if (currentQuestionIndex < questions.length - 1) {
                                            setCurrentQuestionIndex(currentQuestionIndex + 1)
                                        } else {
                                            setMode('review')
                                        }
                                    }}
                                    className="rounded-full font-black uppercase tracking-widest text-[10px]"
                                >
                                    {currentQuestionIndex === questions.length - 1 ? 'Finish & Review' : 'Next Question'}
                                </Button>
                            </div>
                            
                            <Button
                                onClick={handleEvaluate}
                                disabled={isEvaluating || !userAnswers[currentQuestionIndex].trim()}
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full font-black uppercase tracking-widest text-[10px] px-8 h-12 shadow-lg shadow-emerald-500/20"
                            >
                                {isEvaluating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Evaluating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Get AI Feedback
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="bg-neutral-900 rounded-[2.5rem] p-8 text-white">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary-400 mb-4">Coach Tip: How to approach this</h4>
                        <p className="text-white/70 text-sm font-medium leading-relaxed italic">
                            {q.suggestedApproach}
                        </p>
                    </div>
                </div>

                {/* Right: Feedback Area */}
                <div className="lg:col-span-5">
                    {f ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="bg-white rounded-[2.5rem] border border-neutral-200 p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-black text-neutral-900 uppercase tracking-widest text-xs italic">Performance Score</h3>
                                    <div className="text-3xl font-black text-primary-600">{f.score}%</div>
                                </div>
                                
                                {/* STAR Check */}
                                <div className="grid grid-cols-4 gap-2 mb-10">
                                    {[
                                        { label: 'S', active: f.starCheck.situation, name: 'Situation' },
                                        { label: 'T', active: f.starCheck.task, name: 'Task' },
                                        { label: 'A', active: f.starCheck.action, name: 'Action' },
                                        { label: 'R', active: f.starCheck.result, name: 'Result' },
                                    ].map((star) => (
                                        <div key={star.label} className="flex flex-col items-center gap-1">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all",
                                                star.active ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-neutral-100 text-neutral-300"
                                            )}>
                                                {star.label}
                                            </div>
                                            <span className="text-[8px] font-black uppercase text-neutral-400">{star.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
                                            <Check className="w-3 h-3" /> Strengths
                                        </h4>
                                        <ul className="space-y-2">
                                            {f.strengths.map((s, i) => (
                                                <li key={i} className="text-xs font-medium text-neutral-600 flex gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-3 flex items-center gap-2">
                                            <AlertCircle className="w-3 h-3" /> Improvements
                                        </h4>
                                        <ul className="space-y-2">
                                            {f.improvements.map((s, i) => (
                                                <li key={i} className="text-xs font-medium text-neutral-600 flex gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary-500/20">
                                <h4 className="text-xs font-black uppercase tracking-widest text-primary-200 mb-4">AI Improved Answer</h4>
                                <p className="text-sm font-medium leading-relaxed italic text-white/90">
                                    &quot;{f.improvedAnswer}&quot;
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-neutral-50 rounded-[2.5rem] border-2 border-dashed border-neutral-200 opacity-50">
                            <Star className="w-12 h-12 text-neutral-300 mb-4" />
                            <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Feedback will appear here <br />after you submit your answer</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    if (mode === 'review') {
        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="text-center py-12">
                    <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter mb-4 italic">Simulation Complete</h2>
                    <p className="text-neutral-500 font-medium">Review your performance across all questions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {questions.map((q, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-neutral-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Question {i+1}</span>
                                {feedbacks[i] && (
                                    <div className="text-xl font-black text-primary-600">{feedbacks[i]?.score}%</div>
                                )}
                            </div>
                            <h4 className="font-black text-neutral-900 mb-4 italic leading-tight">&quot;{q.question}&quot;</h4>
                            <p className="text-xs text-neutral-500 font-medium line-clamp-2 italic mb-6">Your Answer: {userAnswers[i]}</p>
                            <Button 
                                variant="outline" 
                                className="w-full rounded-full text-[10px] font-black uppercase tracking-widest h-10"
                                onClick={() => {
                                    setCurrentQuestionIndex(i)
                                    setMode('practice')
                                }}
                            >
                                Re-examine Detail
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 justify-center pt-8">
                    <Button 
                        variant="primary" 
                        onClick={handleSaveSession}
                        className="px-12 h-14 rounded-full font-black uppercase tracking-widest text-xs"
                    >
                        Save Session to History
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={() => setMode('setup')}
                        className="px-12 h-14 rounded-full font-black uppercase tracking-widest text-xs border-2"
                    >
                        Start New Session
                    </Button>
                </div>
            </div>
        )
    }

    return null
}
