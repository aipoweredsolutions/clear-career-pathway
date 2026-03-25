'use client'

import React, { useState } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import {
    Banknote,
    Target,
    Zap,
    Loader2,
    Sparkles,
    MessageSquare,
    Lightbulb,
    ChevronRight,
    TrendingUp,
    MapPin,
    Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface NegotiationScript {
    scenario: string
    scriptText: string
}

interface NegotiationResult {
    marketResearch: string
    strategy: string
    scripts: NegotiationScript[]
    tips: string[]
}

export function SalaryNegotiation({ resumes }: { resumes: ResumeDocument[] }) {
    const [selectedResumeId, setSelectedResumeId] = useState<string>('')
    const [jobTitle, setJobTitle] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [offerDetails, setOfferDetails] = useState('')
    const [location, setLocation] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<NegotiationResult | null>(null)

    const handleGenerate = async () => {
        if (!selectedResumeId) {
            toast.error('Please select your target resume/profile')
            return
        }
        if (!jobTitle.trim() || !companyName.trim()) {
            toast.error('Please enter the Role and Company')
            return
        }

        setIsGenerating(true)
        setResult(null)

        try {
            const selectedResume = resumes.find(r => r.id === selectedResumeId)

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'salary_negotiation',
                    jobTitle,
                    companyName,
                    offerDetails,
                    location,
                    resumeContent: JSON.stringify(selectedResume)
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate scripts')
            }

            setResult(data.data)
            toast.success('Negotiation playbook generated!')
        } catch (error: any) {
            console.error('Negotiation error:', error)
            toast.error(error.message || 'Failed to generate negotiation guide')
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
                        <Banknote className="w-5 h-5 text-emerald-600" />
                        Salary Negotiation Architect
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                        Craft winning negotiation scripts and strategies based on market value and your unique background.
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Target Profile</label>
                            <select
                                value={selectedResumeId}
                                onChange={(e) => setSelectedResumeId(e.target.value)}
                                className="w-full p-3 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                            >
                                <option value="">Select a resume...</option>
                                {resumes.map((resume) => (
                                    <option key={resume.id} value={resume.id}>{resume.title || 'Untitled Resume'}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Job Title</label>
                            <div className="relative">
                                <Target className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="e.g. Senior Project Manager"
                                    className="w-full pl-10 p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Company Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="e.g. TechCorp Inc."
                                    className="w-full pl-10 p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Location (Optional)</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g. Remote or San Francisco, CA"
                                    className="w-full pl-10 p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Offer Details (if received)</label>
                        <textarea
                            value={offerDetails}
                            onChange={(e) => setOfferDetails(e.target.value)}
                            placeholder="e.g. $120k base, 10% bonus, 0.1% equity. Currently asking for $140k."
                            className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm min-h-[100px]"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !selectedResumeId || !jobTitle || !companyName}
                            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Drafting Playbook...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Negotiation Scripts
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                    {/* Strategy & Market Context */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
                            <h4 className="flex items-center gap-2 text-emerald-800 font-black uppercase tracking-widest text-xs mb-4">
                                <TrendingUp className="w-4 h-4" />
                                Market Intelligence
                            </h4>
                            <p className="text-emerald-900 leading-relaxed font-serif text-lg">{result.marketResearch}</p>
                        </div>
                        <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
                            <h4 className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-widest text-xs mb-4">
                                <Zap className="w-4 h-4" />
                                Strategic Pillars
                            </h4>
                            <p className="text-neutral-700 leading-relaxed">{result.strategy}</p>
                        </div>
                    </div>

                    {/* Scripts */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-neutral-900 px-2">Negotiation Scripts</h3>
                        <div className="grid grid-cols-1 gap-6">
                            {result.scripts.map((script, i) => (
                                <div key={i} className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm group hover:border-emerald-200 transition-colors">
                                    <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex justify-between items-center group-hover:bg-emerald-50/50 transition-colors">
                                        <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">{script.scenario}</span>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(script.scriptText)
                                                toast.success('Copied to clipboard!')
                                            }}
                                            className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-tighter"
                                        >
                                            Copy Script
                                        </button>
                                    </div>
                                    <div className="p-8">
                                        <p className="text-neutral-800 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                                            &quot;{script.scriptText}&quot;
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-neutral-900 rounded-3xl p-8 text-white">
                        <h4 className="flex items-center gap-2 font-black uppercase tracking-widest text-xs mb-6 text-neutral-400">
                            <Lightbulb className="w-4 h-4" />
                            Expert Negotiation Tips
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.tips.map((tip, i) => (
                                <li key={i} className="flex gap-3 text-sm text-neutral-300">
                                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
