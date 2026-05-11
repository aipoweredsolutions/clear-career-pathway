'use client'

import React, { useState } from 'react'
import { ProfessionalSummary, ResumeDocument } from '@/lib/types/resume'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface SummaryFormProps {
    data: ProfessionalSummary
    // We need the full resume structure to generate a good summary
    fullResumeData?: ResumeDocument
    onChange: (data: ProfessionalSummary) => void
}

export function SummaryForm({ data, fullResumeData, onChange }: SummaryFormProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [suggestions, setSuggestions] = useState<string[]>([])

    const handleChange = (field: keyof ProfessionalSummary, value: string) => {
        onChange({
            ...data,
            [field]: value
        })
    }

    const [tone, setTone] = useState<'professional' | 'creative' | 'minimalist' | 'executive' | 'ats-optimized'>('professional')

    const handleGenerate = async () => {
        if (!fullResumeData) return

        setIsGenerating(true)
        setSuggestions([])

        try {
            const skills = fullResumeData.skills?.map(s => s.skillName) || []
            const experience = fullResumeData.workExperience?.map(e => ({
                role: e.jobTitle,
                company: e.companyName,
                achievements: e.achievements?.map(a => a.achievementText)
            })) || []

            const userProfile = {
                jobTitle: fullResumeData.personalInfo?.professionalTitle || 'Professional',
                skills,
                experience,
                tone
            }

            const targetJD = (document.getElementById('summary-jd-input') as HTMLTextAreaElement)?.value || ''

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'summary',
                    userProfile,
                    jobDescription: targetJD
                })
            })
            if (response.status === 401) {
                toast.error('Please sign up or log in to use AI features.')
                return
            }

            if (response.status === 403) {
                toast.error('Monthly AI limit reached. Please upgrade your plan.')
                return
            }

            const result = await response.json()
            console.log('AI Summary Result:', result)

            if (result.data && Array.isArray(result.data.suggestions) && result.data.suggestions.length > 0) {
                setSuggestions(result.data.suggestions)
                toast.success('Suggestions generated!')
            } else {
                console.error('No suggestions found in result:', result)
                toast.error(result.error || 'AI did not provide suggestions. Please try again.')
            }

        } catch (error) {
            console.error('Failed to generate summary', error)
            toast.error('Connection error. Please check your internet and try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 mb-4">
                <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-2 rounded-lg">
                        <Sparkles className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-primary-900 mb-1">
                            Elite AI Summary Writer
                        </h3>
                        <p className="text-sm text-primary-700 mb-4">
                            Choose a style and Gemini will craft the perfect introduction using your background.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {(['professional', 'executive', 'creative', 'minimalist', 'ats-optimized'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t as any)}
                                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${tone === t
                                        ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                                        : 'bg-white text-primary-700 border-primary-200 hover:border-primary-400'
                                        }`}
                                >
                                    {t.replace('-', ' ')}
                                </button>
                            ))}
                        </div>

                        {tone === 'ats-optimized' && (
                            <div className="mb-4 animate-in fade-in slide-in-from-top-2">
                                <label className="block text-[10px] font-black text-primary-600 uppercase tracking-widest mb-2">Paste Target Job Description (Optional)</label>
                                <textarea 
                                    placeholder="Paste JD here for extreme targeting..."
                                    className="w-full p-3 text-xs border border-primary-100 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none min-h-[80px] bg-white/50"
                                    id="summary-jd-input"
                                />
                            </div>
                        )}

                        <Button
                            size="sm"
                            variant="primary"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="shadow-sm"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Crafting...
                                </>
                            ) : (
                                'Generate Suggestions'
                            )}
                        </Button>

                        {suggestions.length > 0 && (
                            <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-xs font-black uppercase tracking-widest text-primary-800/50 mb-2">Pick a version to use:</p>
                                {suggestions.map((suggestion, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white p-4 rounded-lg border border-primary-200 hover:border-primary-500 hover:shadow-md cursor-pointer transition-all text-sm text-neutral-800 leading-relaxed relative group"
                                        onClick={() => handleChange('summaryText', suggestion)}
                                    >
                                        {suggestion}
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded">Use This</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Textarea
                label="Professional Summary"
                value={data.summaryText || ''}
                onChange={(e) => handleChange('summaryText', e.target.value)}
                placeholder="e.g. Accomplished Software Engineer with 5+ years of experience..."
                rows={6}
                helperText="Briefly describe your professional background and key achievements."
                showCount={true}
            />
        </div>
    )
}
