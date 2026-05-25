'use client'

import React, { useState, useEffect } from 'react'
import { 
    Zap, 
    Map, 
    ArrowRight, 
    ChevronLeft, 
    Sparkles,
    Loader2,
    Target,
    Flag,
    Calendar,
    Briefcase,
    ChevronDown,
    ChevronUp,
    Lock
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface RoadmapStep {
    id: number
    title: string
    description: string
    timeframe: string
    actionItems: string[]
}

export default function RoadmapToolPage() {
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
                        The Career Roadmap is part of our Professional Intelligence suite. Upgrade to Pro to visualize your path to senior roles and executive positions.
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

    return <RoadmapClient />
}

function RoadmapClient() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [formData, setFormData] = useState({
        currentRole: '',
        targetRole: '',
        experience: ''
    })

    async function handleGenerate() {
        if (!formData.currentRole || !formData.targetRole || !formData.experience) {
            toast.error('Please fill in all required fields.')
            return
        }

        setIsGenerating(true)
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'career_roadmap',
                    userProfile: {
                        jobTitle: formData.currentRole,
                        experienceLevel: formData.experience
                    },
                    targetRole: formData.targetRole
                })
            })

            const { data, error } = await res.json()
            if (error) throw new Error(error)

            setResult(data)
            toast.success('Roadmap generated!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to generate roadmap.')
        } finally {
            setIsGenerating(false)
        }
    }

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
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                            <Map className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-black text-neutral-950 tracking-tighter italic">Career <span className="text-primary-600">Roadmap.</span></h1>
                    </div>
                    <p className="text-lg text-neutral-500 font-bold max-w-2xl leading-relaxed">
                        Visualize your professional ascent. Get a strategic, step-by-step timeline that outlines exactly how to bridge the gap between where you are and where you want to be.
                    </p>
                </div>

                {!result ? (
                    <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-10 shadow-2xl shadow-neutral-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Current Role</label>
                                <input 
                                    type="text"
                                    value={formData.currentRole}
                                    onChange={(e) => setFormData({...formData, currentRole: e.target.value})}
                                    placeholder="e.g. Junior Developer"
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Target Role</label>
                                <input 
                                    type="text"
                                    value={formData.targetRole}
                                    onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                                    placeholder="e.g. Senior Project Manager"
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Current Experience Level</label>
                                <select 
                                    value={formData.experience}
                                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition appearance-none"
                                >
                                    <option value="">Select Level</option>
                                    <option value="entry">Entry Level (0-2 years)</option>
                                    <option value="mid">Mid Level (3-7 years)</option>
                                    <option value="senior">Senior Level (8+ years)</option>
                                </select>
                            </div>
                        </div>

                        <Button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full h-16 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-black text-xs uppercase tracking-widest gap-2 shadow-2xl shadow-primary-600/30"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Mapping Your Future...
                                </>
                            ) : (
                                <>
                                    Generate Strategic Roadmap
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Summary Header */}
                        <div className="bg-neutral-900 rounded-[2.5rem] p-10 text-white border border-neutral-800 shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-primary-400 text-[10px] font-black uppercase tracking-widest mb-4">
                                    <Flag className="w-4 h-4" /> Strategy Overview
                                </div>
                                <h2 className="text-3xl font-black italic tracking-tighter mb-4">
                                    Path to <span className="text-primary-500 not-italic">{formData.targetRole}</span>
                                </h2>
                                <p className="text-neutral-400 font-bold leading-relaxed max-w-xl">
                                    {result.summary || "This roadmap outlines the key transitions and skill acquisitions required to reach your target role."}
                                </p>
                            </div>
                            <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.05]" />
                        </div>

                        {/* Timeline */}
                        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary-500 before:via-neutral-200 before:to-transparent">
                            {(result.steps || []).map((step: RoadmapStep, i: number) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    {/* Icon */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    {/* Content */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/50 hover:shadow-2xl hover:shadow-neutral-200/50 transition-all hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <time className="text-[10px] font-black text-primary-600 uppercase tracking-widest flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {step.timeframe}
                                            </time>
                                            <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center">
                                                <span className="text-[10px] font-black text-neutral-400">{i + 1}</span>
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-black text-neutral-900 tracking-tight mb-2 italic">{step.title}</h4>
                                        <p className="text-sm font-bold text-neutral-500 leading-relaxed mb-6">{step.description}</p>
                                        
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black text-neutral-300 uppercase tracking-widest mb-2">Key Action Items</p>
                                            {(step.actionItems || []).map((item, j) => (
                                                <div key={j} className="flex items-start gap-2 text-xs font-bold text-neutral-600 bg-neutral-50 p-2 rounded-lg border border-neutral-100/50">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <Button 
                                onClick={() => setResult(null)}
                                variant="outline"
                                className="flex-1 h-16 rounded-2xl border-2 border-neutral-100 text-neutral-400 font-black text-xs uppercase tracking-widest hover:border-primary-600 hover:text-primary-600 transition-all"
                            >
                                Generate New Path
                            </Button>
                            <Link href="/dashboard" className="flex-1">
                                <Button className="w-full h-16 rounded-2xl bg-neutral-950 text-white font-black text-xs uppercase tracking-widest hover:bg-neutral-800">
                                    Return to Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
