'use client'

import React, { useState, useEffect } from 'react'
import { Linkedin, Sparkles, Loader2, Copy, Check, User, Briefcase, Award, Terminal } from 'lucide-react'
import { ResumeDocument } from '@/lib/types/resume'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { saveLinkedInOptimization, fetchLatestLinkedInOptimization } from '@/app/career-hub/actions'

interface LinkedInContent {
    headline: string
    about: string
    experiences: { title: string; company: string; description: string }[]
    skills: string[]
}

export function LinkedInOptimizer({ resumes }: { resumes: ResumeDocument[] }) {
    const [selectedResumeId, setSelectedResumeId] = useState<string>('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<LinkedInContent | null>(null)
    const [copiedField, setCopiedField] = useState<string | null>(null)
    const [isLoadingPrevious, setIsLoadingPrevious] = useState(false)

    // Load latest optimization when resume is selected
    useEffect(() => {
        if (!selectedResumeId) return
        
        async function loadPrevious() {
            setIsLoadingPrevious(true)
            const content = await fetchLatestLinkedInOptimization(selectedResumeId)
            if (content) {
                setResult(content)
                toast.success('Loaded last optimization for this resume')
            }
            setIsLoadingPrevious(false)
        }
        loadPrevious()
    }, [selectedResumeId])

    const handleGenerate = async () => {
        if (!selectedResumeId) {
            toast.error('Please select a resume to use as source')
            return
        }

        setIsGenerating(true)
        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'linkedin_optimizer',
                    resumeContent: JSON.stringify(selectedResume)
                })
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Generation failed')
            
            setResult(data.data)
            
            // Save to database
            await saveLinkedInOptimization(selectedResumeId, data.data)
            
            toast.success('LinkedIn profile optimized and saved!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to generate content')
        } finally {
            setIsGenerating(false)
        }
    }

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(field)
        toast.success(`${field} copied to clipboard`)
        setTimeout(() => setCopiedField(null), 2000)
    }

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-neutral-100 bg-neutral-50/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#0077b5] flex items-center justify-center text-white">
                            <Linkedin className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 tracking-tight">LinkedIn Profile Optimizer</h3>
                    </div>
                    <p className="text-neutral-500 font-medium">
                        Transform your resume into a high-converting LinkedIn profile that attracts recruiters and builds your personal brand.
                    </p>
                </div>

                <div className="p-8 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-bold text-neutral-700">Choose your source resume</label>
                        {isLoadingPrevious && (
                            <div className="flex items-center gap-2 text-primary-600">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">Syncing...</span>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {resumes.map(r => (
                            <button
                                key={r.id}
                                onClick={() => setSelectedResumeId(r.id!)}
                                className={cn(
                                    "p-4 rounded-2xl border-2 text-left transition-all group",
                                    selectedResumeId === r.id 
                                        ? "border-primary-600 bg-primary-50/30" 
                                        : "border-neutral-100 hover:border-neutral-300"
                                )}
                            >
                                <p className="font-black text-neutral-900 group-hover:text-primary-600 transition-colors">{r.title}</p>
                                <p className="text-xs text-neutral-400 mt-1 uppercase font-black tracking-widest">{r.jobType} • {r.careerLevel}</p>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !selectedResumeId}
                        className="w-full bg-[#0077b5] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-[#006396] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Analyzing Resume...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-6 h-6" />
                                Generate Optimized Content
                            </>
                        )}
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Headline */}
                    <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm relative group">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-[#0077b5] font-black uppercase tracking-widest text-xs">
                                <Terminal className="w-4 h-4" />
                                Professional Headline
                            </div>
                            <button 
                                onClick={() => copyToClipboard(result.headline, 'Headline')}
                                className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
                            >
                                {copiedField === 'Headline' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-neutral-400" />}
                            </button>
                        </div>
                        <p className="text-2xl font-black text-neutral-900 leading-tight">
                            {result.headline}
                        </p>
                    </div>

                    {/* About Section */}
                    <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm relative group">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-[#0077b5] font-black uppercase tracking-widest text-xs">
                                <User className="w-4 h-4" />
                                About / Summary
                            </div>
                            <button 
                                onClick={() => copyToClipboard(result.about, 'About section')}
                                className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
                            >
                                {copiedField === 'About section' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-neutral-400" />}
                            </button>
                        </div>
                        <div className="text-neutral-600 leading-relaxed font-medium space-y-4 whitespace-pre-wrap text-lg">
                            {result.about}
                        </div>
                    </div>

                    {/* Experience Optimization */}
                    <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
                        <div className="flex items-center gap-2 text-[#0077b5] font-black uppercase tracking-widest text-xs mb-8">
                            <Briefcase className="w-4 h-4" />
                            LinkedIn Experience Bullets
                        </div>
                        <div className="space-y-8">
                            {result.experiences.map((exp, i) => (
                                <div key={i} className="border-l-4 border-neutral-100 pl-6 relative group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-black text-neutral-900">{exp.title}</h4>
                                            <p className="text-sm font-bold text-[#0077b5]">{exp.company}</p>
                                        </div>
                                        <button 
                                            onClick={() => copyToClipboard(exp.description, `${exp.company} description`)}
                                            className="p-2 hover:bg-neutral-100 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Copy className="w-4 h-4 text-neutral-400" />
                                        </button>
                                    </div>
                                    <p className="text-neutral-500 text-sm leading-relaxed whitespace-pre-wrap">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills to Feature */}
                    <div className="bg-neutral-900 rounded-3xl border border-neutral-800 p-8 shadow-2xl text-white">
                        <div className="flex items-center gap-2 text-primary-400 font-black uppercase tracking-widest text-xs mb-6">
                            <Award className="w-4 h-4" />
                            Top Skills to Feature
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {result.skills.map((skill, i) => (
                                <span key={i} className="px-4 py-2 bg-white/10 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/20 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
