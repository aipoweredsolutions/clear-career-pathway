'use client'

import React, { useState, useEffect } from 'react'
import { 
    Zap, 
    Linkedin, 
    ArrowRight, 
    ChevronLeft, 
    Sparkles,
    Loader2,
    Target,
    LayoutGrid,
    CheckCircle2,
    Copy,
    ArrowDown
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

import { Lock } from 'lucide-react'

export default function LinkedInToolPage() {
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
                        The LinkedIn Optimizer is part of our Professional Intelligence suite. Upgrade to Pro to unlock AI-powered profile optimization and recruiter search dominance.
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

    return <LinkedInClient />
}

function LinkedInClient() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [content, setContent] = useState('')

    async function handleGenerate() {
        if (!content.trim()) {
            toast.error('Please enter your current LinkedIn content.')
            return
        }

        setIsGenerating(true)
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'linkedin_optimizer',
                    targetContent: content
                })
            })

            const { data, error } = await res.json()
            if (error) throw new Error(error)

            setResult(data)
            toast.success('Profile optimized!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to optimize profile.')
        } finally {
            setIsGenerating(false)
        }
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard!')
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
                        <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100">
                            <Linkedin className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-black text-neutral-950 tracking-tighter italic">LinkedIn <span className="text-primary-600">Optimizer.</span></h1>
                    </div>
                    <p className="text-lg text-neutral-500 font-bold max-w-2xl leading-relaxed">
                        Stand out to recruiters and rank higher in searches. Our AI optimizes your headline and about section for maximum visibility and impact.
                    </p>
                </div>

                {!result ? (
                    <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-10 shadow-2xl shadow-neutral-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Current Headline or About Section</label>
                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Paste your current LinkedIn profile content here..."
                            className="w-full h-64 bg-neutral-50 border border-neutral-100 rounded-2xl p-6 text-sm font-bold text-neutral-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none resize-none mb-8"
                        />
                        <Button 
                            onClick={handleGenerate}
                            disabled={isGenerating || !content}
                            className="w-full h-16 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-black text-xs uppercase tracking-widest gap-2 shadow-2xl shadow-primary-600/30"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Optimizing Profile...
                                </>
                            ) : (
                                <>
                                    Optimize My Profile
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Headline Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary-600 text-[10px] font-black uppercase tracking-widest">
                                <Target className="w-4 h-4" /> Optimized Headline
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 opacity-60">
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Original</div>
                                    <p className="text-sm font-bold text-neutral-600 italic leading-relaxed truncate">{content.substring(0, 100)}...</p>
                                </div>
                                <div className="p-8 bg-white rounded-3xl border-2 border-primary-100 shadow-xl shadow-primary-50 relative group">
                                    <div className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-3 flex justify-between items-center">
                                        Optimized
                                        <button onClick={() => copyToClipboard(result.headline)} className="p-1 hover:text-primary-700 transition">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-lg font-black text-neutral-900 tracking-tight leading-tight">{result.headline}</p>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary-600 text-[10px] font-black uppercase tracking-widest">
                                <LayoutGrid className="w-4 h-4" /> Optimized About Section
                            </div>
                            <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-2xl shadow-neutral-100 p-10 relative group">
                                <button 
                                    onClick={() => copyToClipboard(result.about)}
                                    className="absolute top-8 right-8 bg-neutral-50 p-3 rounded-xl text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                                <div className="prose prose-neutral max-w-none">
                                    <p className="text-base font-bold text-neutral-700 leading-relaxed whitespace-pre-wrap">
                                        {result.about}
                                    </p>
                                </div>
                                
                                <div className="mt-10 pt-8 border-t border-neutral-100">
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Strategic Improvements:</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(result.improvements || ['Keywords optimized for ATS/Search', 'Enhanced value proposition', 'Stronger Call to Action', 'Improved formatting for readability']).map((imp: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-neutral-500 bg-neutral-50 px-4 py-2 rounded-lg">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                {imp}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button 
                                onClick={() => setResult(null)}
                                variant="outline"
                                className="flex-1 h-16 rounded-2xl border-2 border-neutral-100 text-neutral-400 font-black text-xs uppercase tracking-widest hover:border-primary-600 hover:text-primary-600 transition-all"
                            >
                                Optimize New Section
                            </Button>
                            <Link href="/career-tools" className="flex-1">
                                <Button className="w-full h-16 rounded-2xl bg-neutral-900 text-white font-black text-xs uppercase tracking-widest hover:bg-neutral-800">
                                    Explore More Tools
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
