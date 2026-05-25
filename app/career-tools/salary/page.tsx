'use client'

import React, { useState, useEffect } from 'react'
import { 
    Zap, 
    DollarSign, 
    ArrowRight, 
    ChevronLeft, 
    Sparkles,
    Loader2,
    Target,
    BarChart,
    MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

import { Lock } from 'lucide-react'

export default function SalaryToolPage() {
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
                <Loader2 className="w-8 h-8 animate-spin text-primary-600 animate-spin" />
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
                        The Salary Negotiator is part of our Professional Intelligence suite. Upgrade to Pro to unlock data-backed negotiation scripts and market analysis.
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

    return <SalaryClient />
}

function SalaryClient() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [formData, setFormData] = useState({
        role: '',
        experience: '',
        location: '',
        currentSalary: ''
    })

    async function handleGenerate() {
        if (!formData.role || !formData.experience || !formData.location) {
            toast.error('Please fill in all required fields.')
            return
        }

        setIsGenerating(true)
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'salary_negotiation',
                    userProfile: {
                        jobTitle: formData.role,
                        experienceLevel: formData.experience,
                        location: formData.location
                    },
                    currentSalary: formData.currentSalary
                })
            })

            const { data, error } = await res.json()
            if (error) throw new Error(error)

            setResult(data)
            toast.success('Strategy generated!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to generate strategy.')
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
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-black text-neutral-950 tracking-tighter italic">Salary <span className="text-primary-600">Negotiator.</span></h1>
                    </div>
                    <p className="text-lg text-neutral-500 font-bold max-w-2xl leading-relaxed">
                        Master the most critical part of the job offer. Get data-backed market ranges and personalized scripts to secure the compensation you deserve.
                    </p>
                </div>

                {!result ? (
                    <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-10 shadow-2xl shadow-neutral-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Target Role</label>
                                <input 
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    placeholder="e.g. Senior Software Engineer"
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Location</label>
                                <input 
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    placeholder="e.g. New York, Remote"
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Experience Level</label>
                                <select 
                                    value={formData.experience}
                                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition appearance-none"
                                >
                                    <option value="">Select Level</option>
                                    <option value="entry">Entry Level (0-2 years)</option>
                                    <option value="mid">Mid Level (3-7 years)</option>
                                    <option value="senior">Senior Level (8+ years)</option>
                                    <option value="executive">Executive</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Current/Base Salary (Optional)</label>
                                <input 
                                    type="text"
                                    value={formData.currentSalary}
                                    onChange={(e) => setFormData({...formData, currentSalary: e.target.value})}
                                    placeholder="e.g. $120,000"
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                />
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
                                    Analyzing Market Data...
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
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Market Overview Card */}
                        <div className="bg-neutral-900 rounded-[2.5rem] p-10 text-white border border-neutral-800 shadow-2xl relative overflow-hidden">
                            <div className="relative z-10 grid md:grid-cols-3 gap-10">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-primary-400 text-[10px] font-black uppercase tracking-widest">
                                        <BarChart className="w-4 h-4" /> Market Range
                                    </div>
                                    <div className="text-3xl font-black italic tracking-tighter">
                                        {result.marketRange || '$145k – $185k'}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                        <Target className="w-4 h-4" /> Ideal Target
                                    </div>
                                    <div className="text-3xl font-black italic tracking-tighter">
                                        {result.targetSalary || '$172k'}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">
                                        {formData.location} • {formData.experience}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Script & Strategy */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-10 shadow-xl shadow-neutral-100">
                                <div className="flex items-center gap-2 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-6">
                                    <MessageCircle className="w-4 h-4" /> Negotiation Script
                                </div>
                                <p className="text-sm font-bold text-neutral-800 leading-relaxed whitespace-pre-wrap italic bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                                    &quot;{result.script}&quot;
                                </p>
                            </div>

                            <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-10 shadow-xl shadow-neutral-100">
                                <div className="flex items-center gap-2 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-6">
                                    <Sparkles className="w-4 h-4" /> Leverage Points
                                </div>
                                <ul className="space-y-4">
                                    {(result.talkingPoints || []).map((point: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                                            </div>
                                            <span className="text-sm font-bold text-neutral-600 leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <Button 
                            onClick={() => setResult(null)}
                            variant="outline"
                            className="w-full h-16 rounded-2xl border-2 border-neutral-100 text-neutral-400 font-black text-xs uppercase tracking-widest hover:border-primary-600 hover:text-primary-600 transition-all"
                        >
                            Reset & New Calculation
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
