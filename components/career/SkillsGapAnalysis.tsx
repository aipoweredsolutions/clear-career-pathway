'use client'

import React, { useState } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import {
    Search,
    FileText,
    AlertCircle,
    CheckCircle2,
    Zap,
    ArrowRight,
    Loader2,
    Sparkles,
    Target,
    MinusCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface AnalysisResult {
    matchScore: number
    strengths: string[]
    gaps: string[]
    keywords: { found: string[], missing: string[] }
    recommendations: string[]
}

export function SkillsGapAnalysis({ resumes }: { resumes: ResumeDocument[] }) {
    const [selectedResumeId, setSelectedResumeId] = useState<string>('')
    const [jobDescription, setJobDescription] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<AnalysisResult | null>(null)

    const handleAnalyze = async () => {
        if (!selectedResumeId) {
            toast.error('Please select a resume to analyze')
            return
        }
        if (!jobDescription.trim() || jobDescription.length < 50) {
            toast.error('Please provide a more detailed job description')
            return
        }

        setIsAnalyzing(true)
        setResult(null)

        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'skills_gap_analysis',
                    currentContent: jobDescription,
                    userProfile: {
                        resumeContent: JSON.stringify(selectedResume)
                    }
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Analysis failed')
            }

            setResult(data.data)
            toast.success('Analysis complete!')
        } catch (error: any) {
            console.error('Analysis error:', error)
            toast.error(error.message || 'Failed to analyze skills gap')
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
                        <Target className="w-5 h-5 text-primary-600" />
                        Analyze Your Fit
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                        Compare your resume against a specific job description to find missing skills and optimization opportunities.
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Resume Selector */}
                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            1. Select Resume
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {resumes.map((resume) => (
                                <button
                                    key={resume.id}
                                    onClick={() => setSelectedResumeId(resume.id!)}
                                    className={cn(
                                        "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                                        selectedResumeId === resume.id
                                            ? "border-primary-600 bg-primary-50/50"
                                            : "border-neutral-100 bg-white hover:border-neutral-300"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center",
                                        selectedResumeId === resume.id ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-400"
                                    )}>
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-bold text-neutral-900 truncate">{resume.title || 'Untitled Resume'}</p>
                                        <p className="text-xs text-neutral-500">Updated {new Date(resume.updatedAt!).toLocaleDateString()}</p>
                                    </div>
                                    {selectedResumeId === resume.id && (
                                        <CheckCircle2 className="w-5 h-5 text-primary-600" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Job Description Input */}
                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            2. Job Description
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the full job description here..."
                            className="w-full min-h-[250px] p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm leading-relaxed"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !selectedResumeId || !jobDescription}
                            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-600/20 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing Profile...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    Run Gap Analysis
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Score Card */}
                        <div className="md:col-span-1 bg-white rounded-2xl border border-neutral-200 p-8 flex flex-col items-center justify-center text-center shadow-sm">
                            <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6">Match Score</h4>
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-neutral-100"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 60}
                                        strokeDashoffset={2 * Math.PI * 60 * (1 - result.matchScore / 100)}
                                        className={cn(
                                            "transition-all duration-1000 ease-out",
                                            result.matchScore > 75 ? "text-green-500" : result.matchScore > 50 ? "text-amber-500" : "text-red-500"
                                        )}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-3xl font-black text-neutral-900">{result.matchScore}%</span>
                            </div>
                            <p className="mt-6 text-sm text-neutral-600 font-medium">
                                {result.matchScore > 75
                                    ? "Strong contender! Your profile aligns well."
                                    : result.matchScore > 50
                                        ? "Good match, but some key gaps exist."
                                        : "Significant gaps detected. Customization needed."}
                            </p>
                        </div>

                        {/* Summary Cards */}
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 text-green-600 font-bold mb-4">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Key Strengths
                                </div>
                                <ul className="space-y-2">
                                    {result.strengths.map((s, i) => (
                                        <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 text-rose-600 font-bold mb-4">
                                    <MinusCircle className="w-5 h-5" />
                                    Skills Gaps
                                </div>
                                <ul className="space-y-2">
                                    {result.gaps.map((g, i) => (
                                        <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                                            {g}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Keywords Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                            <h4 className="font-bold text-neutral-900 mb-4">Keywords Found</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.keywords.found.map((k, i) => (
                                    <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                                        {k}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                            <h4 className="font-bold text-neutral-900 mb-4">Keywords Missing</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.keywords.missing.map((k, i) => (
                                    <span key={i} className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-semibold rounded-full border border-rose-100">
                                        {k}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actionable Recommendations */}
                    <div className="bg-neutral-900 rounded-2xl p-8 mt-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Sparkles className="w-24 h-24" />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Search className="w-6 h-6 text-primary-400" />
                                Actionable Roadmap
                            </h4>
                            <div className="space-y-4">
                                {result.recommendations.map((rec, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                            {i + 1}
                                        </div>
                                        <p className="text-neutral-300 leading-relaxed py-1">
                                            {rec}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
