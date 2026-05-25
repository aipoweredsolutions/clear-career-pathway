'use client'

import React, { useState, useEffect } from 'react'
import { 
    Zap, 
    MessageSquare, 
    ArrowRight, 
    ChevronLeft, 
    Send, 
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Lock
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'

interface Question {
    id: number
    text: string
    userAnswer?: string
    feedback?: string
    score?: number
}

export default function InterviewToolPage() {
    const [isPro, setIsPro] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkTier() {
            const isMock = typeof document !== 'undefined' && document.cookie.includes('mock_session=true')
            if (isMock || process.env.NODE_ENV === 'development') {
                setIsPro(true)
                setLoading(false)
                return
            }

            try {
                const res = await fetch('/api/auth/me')
                if (res.ok) {
                    const data = await res.json()
                    setIsPro(data.isPro)
                } else {
                    setIsPro(false)
                }
            } catch (e) {
                setIsPro(false)
            } finally {
                setLoading(false)
            }
        }
        checkTier()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        )
    }

    if (!isPro) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <Lock className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-4xl font-black text-neutral-900 mb-4 tracking-tighter">Pro Feature Only.</h1>
                    <p className="text-lg text-neutral-500 font-bold mb-10 max-w-md mx-auto leading-relaxed">
                        The Interview Simulator is part of our Professional Intelligence suite. Upgrade to Pro to unlock unlimited mock interviews and expert AI feedback.
                    </p>
                    <Link href="/pricing">
                        <Button className="h-16 px-10 rounded-2xl bg-primary-600 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-600/30">
                            Upgrade to Pro <Zap className="w-5 h-5 ml-2 fill-white" />
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return <InterviewClient />
}

function InterviewClient() {
    const { user } = useAuth()
    const [step, setStep] = useState<'jd' | 'questions'>('jd')
    const [jobDescription, setJobDescription] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false)

    async function handleGenerateQuestions() {
        if (!jobDescription.trim()) {
            toast.error('Please enter a job description first.')
            return
        }

        setIsGenerating(true)
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'interview_prep',
                    jobDescription: jobDescription
                })
            })

            const { data, error } = await res.json()
            if (error) throw new Error(error)

            // Expecting data.questions = ["string", ...]
            const formatted = (data.questions || []).map((q: string, i: number) => ({
                id: i,
                text: q
            }))

            setQuestions(formatted)
            setStep('questions')
            toast.success('Interview simulation started!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to generate questions.')
        } finally {
            setIsGenerating(false)
        }
    }

    async function handleSubmitAnswer(answer: string) {
        if (!answer.trim()) return

        setIsSubmittingAnswer(true)
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'interview_feedback',
                    targetContent: answer,
                    context: questions[currentQuestionIndex].text
                })
            })

            const { data, error } = await res.json()
            if (error) throw new Error(error)

            // Update questions with answer and feedback
            const newQuestions = [...questions]
            newQuestions[currentQuestionIndex] = {
                ...newQuestions[currentQuestionIndex],
                userAnswer: answer,
                feedback: data.feedback,
                score: data.score
            }
            setQuestions(newQuestions)
            toast.success('Feedback received!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to get feedback.')
        } finally {
            setIsSubmittingAnswer(false)
        }
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Back Button */}
                <Link 
                    href="/career-tools"
                    className="inline-flex items-center gap-2 text-xs font-black text-neutral-400 uppercase tracking-widest hover:text-primary-600 mb-8 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Hub
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-black text-neutral-950 tracking-tighter italic">Interview <span className="text-primary-600">Simulator.</span></h1>
                    </div>
                    <p className="text-lg text-neutral-500 font-bold max-w-2xl leading-relaxed">
                        Simulate high-stakes interviews with realistic questions and get instant, actionable feedback to sharpen your delivery.
                    </p>
                </div>

                {step === 'jd' ? (
                    <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-10 shadow-2xl shadow-neutral-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <label className="block text-sm font-black text-neutral-400 uppercase tracking-widest mb-4">Target Job Description</label>
                        <textarea 
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job requirements here..."
                            className="w-full h-64 bg-neutral-50 border border-neutral-100 rounded-2xl p-6 text-sm font-bold text-neutral-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none resize-none mb-8"
                        />
                        <Button 
                            onClick={handleGenerateQuestions}
                            disabled={isGenerating || !jobDescription}
                            className="w-full h-16 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-black text-xs uppercase tracking-widest gap-2 shadow-2xl shadow-primary-600/30"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing Requirements...
                                </>
                            ) : (
                                <>
                                    Start Simulation
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Progress Bar */}
                        <div className="flex gap-2">
                            {questions.map((_, i) => (
                                <div 
                                    key={i}
                                    className={cn(
                                        "h-2 flex-1 rounded-full transition-all duration-500",
                                        i === currentQuestionIndex ? "bg-primary-600 shadow-lg shadow-primary-200" : 
                                        i < currentQuestionIndex ? "bg-primary-200" : "bg-neutral-100"
                                    )}
                                />
                            ))}
                        </div>

                        {/* Question Content */}
                        <div className="bg-white rounded-[2.5rem] border border-neutral-200 p-12 shadow-2xl shadow-neutral-100 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="text-xs font-black text-primary-600 uppercase tracking-[0.2em] mb-4">Question {currentQuestionIndex + 1} of {questions.length}</div>
                                <h3 className="text-2xl font-black text-neutral-950 tracking-tight leading-tight mb-8 italic">
                                    &quot;{currentQuestion.text}&quot;
                                </h3>

                                {currentQuestion.feedback ? (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-widest">
                                                    <CheckCircle2 className="w-4 h-4" /> AI Feedback
                                                </div>
                                                <div className="text-2xl font-black text-emerald-800 tracking-tighter">
                                                    {currentQuestion.score}/100
                                                </div>
                                            </div>
                                            <p className="text-emerald-900 font-bold leading-relaxed">
                                                {currentQuestion.feedback}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {currentQuestionIndex < questions.length - 1 ? (
                                                <Button 
                                                    onClick={() => setCurrentQuestionIndex(i => i + 1)}
                                                    className="flex-1 h-16 rounded-2xl bg-neutral-950 text-white font-black text-xs uppercase tracking-widest hover:bg-neutral-800"
                                                >
                                                    Next Question
                                                </Button>
                                            ) : (
                                                <Link href="/career-tools" className="flex-1">
                                                    <Button className="w-full h-16 rounded-2xl bg-primary-600 text-white font-black text-xs uppercase tracking-widest hover:bg-primary-500">
                                                        Finish Simulation
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button 
                                                onClick={() => {
                                                    const q = [...questions]
                                                    q[currentQuestionIndex].userAnswer = undefined
                                                    q[currentQuestionIndex].feedback = undefined
                                                    setQuestions(q)
                                                }}
                                                variant="outline"
                                                className="h-16 rounded-2xl border-neutral-200 text-neutral-500 font-black text-xs uppercase tracking-widest px-8"
                                            >
                                                Retry
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <textarea 
                                            placeholder="Type your answer here..."
                                            className="w-full h-48 bg-neutral-50 border border-neutral-100 rounded-2xl p-6 text-sm font-bold text-neutral-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none resize-none"
                                            id="interview-answer"
                                        />
                                        <Button 
                                            onClick={() => {
                                                const el = document.getElementById('interview-answer') as HTMLTextAreaElement
                                                handleSubmitAnswer(el.value)
                                            }}
                                            disabled={isSubmittingAnswer}
                                            className="w-full h-16 rounded-2xl bg-primary-600 text-white font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-primary-600/20"
                                        >
                                            {isSubmittingAnswer ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Analyzing Response...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Answer
                                                    <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Decorative background mark */}
                            <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 text-neutral-50" />
                        </div>

                        {/* Tip */}
                        <div className="flex items-start gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-800 font-bold leading-relaxed italic">
                                Tip: Be specific. Use the STAR method (Situation, Task, Action, Result) to give the AI more context for higher scores.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
