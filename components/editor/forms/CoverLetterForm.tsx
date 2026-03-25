'use client'

import React, { useState } from 'react'
import { CoverLetterContent, ResumeDocument } from '@/lib/types/resume'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Sparkles, Loader2, Send, Building2, User } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CoverLetterFormProps {
    data: CoverLetterContent
    fullResumeData: ResumeDocument
    onChange: (data: CoverLetterContent) => void
}

export function CoverLetterForm({ data, fullResumeData, onChange }: CoverLetterFormProps) {
    const [isGenerating, setIsGenerating] = useState(false)

    const handleChange = (field: keyof CoverLetterContent, value: string) => {
        onChange({
            ...data,
            [field]: value
        })
    }

    const handleGenerate = async () => {
        if (!data.jobTitle || !data.jobDescription) {
            toast.error('Please enter the Job Title and Description first.')
            return
        }

        setIsGenerating(true)
        try {
            // Prepare resume context for AI
            const resumeContext = {
                personalInfo: fullResumeData.personalInfo,
                summary: fullResumeData.professionalSummary?.summaryText,
                experience: fullResumeData.workExperience?.map(e => ({
                    role: e.jobTitle,
                    company: e.companyName,
                    achievements: e.achievements?.map(a => a.achievementText)
                })),
                skills: fullResumeData.skills?.map(s => s.skillName)
            }

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'generate_cover_letter',
                    jobTitle: data.jobTitle,
                    jobDescription: data.jobDescription,
                    tone: data.tone || 'formal',
                    resumeContent: JSON.stringify(resumeContext)
                })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to generate')
            }

            const result = await response.json()
            if (result.data?.content) {
                handleChange('content', result.data.content)
                toast.success('Cover letter generated with AI precision!')
            }
        } catch (error: any) {
            console.error('Generation failed', error)
            toast.error(error.message || 'Failed to generate cover letter.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="space-y-8 pb-12">
            {/* AI Generator Section */}
            <div className="bg-primary-50/50 border border-primary-100 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <Sparkles className="w-32 h-32 text-primary-600" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-200">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-black text-neutral-900 tracking-tight">AI Letter Architect</h3>
                    </div>

                    <p className="text-sm text-neutral-600 mb-8 max-w-md leading-relaxed">
                        Paste the job details and let Gemini craft a persuasive, tailored cover letter that bridges your experience to their requirements.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Input
                            label="Target Job Title"
                            value={data.jobTitle || ''}
                            onChange={(e) => handleChange('jobTitle', e.target.value)}
                            placeholder="e.g. Senior Software Engineer"
                            className="bg-white border-primary-100 focus:border-primary-500"
                        />
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-primary-800/60 mb-2">Select Tone</label>
                            <div className="flex flex-wrap gap-2">
                                {(['formal', 'confident', 'persuasive'] as const).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => handleChange('tone', t)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                                            data.tone === t
                                                ? "bg-primary-600 text-white border-primary-600 shadow-md"
                                                : "bg-white text-primary-700 border-primary-100 hover:border-primary-300"
                                        )}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Textarea
                        label="Job Description"
                        value={data.jobDescription || ''}
                        onChange={(e) => handleChange('jobDescription', e.target.value)}
                        placeholder="Paste the key responsibilities and requirements here..."
                        rows={5}
                        className="bg-white border-primary-100 focus:border-primary-500 mb-6"
                    />

                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full md:w-auto px-8 py-6 rounded-2xl shadow-xl shadow-primary-100 group"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                Architecting Your Letter...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                                Generate Custom Letter
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Recipient Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-neutral-400" />
                        <h4 className="text-sm font-black uppercase tracking-widest text-neutral-400">Recipient Details</h4>
                    </div>
                    <Input
                        label="Hiring Manager/Name"
                        value={data.recipientName || ''}
                        onChange={(e) => handleChange('recipientName', e.target.value)}
                        placeholder="e.g. Hiring Manager or Jane Doe"
                    />
                    <Input
                        label="Recipient Title"
                        value={data.recipientTitle || ''}
                        onChange={(e) => handleChange('recipientTitle', e.target.value)}
                        placeholder="e.g. Director of Engineering"
                    />
                </div>

                <div className="space-y-6 bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-neutral-400" />
                        <h4 className="text-sm font-black uppercase tracking-widest text-neutral-400">Company Details</h4>
                    </div>
                    <Input
                        label="Company Name"
                        value={data.companyName || ''}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        placeholder="e.g. Google"
                    />
                    <Input
                        label="Company Address"
                        value={data.companyAddress || ''}
                        onChange={(e) => handleChange('companyAddress', e.target.value)}
                        placeholder="e.g. Mountain View, CA"
                    />
                </div>
            </div>

            {/* Editable Content */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter">Your Cover Letter</h3>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
                        {data.content?.split(/\s+/).filter(Boolean).length || 0} Words
                    </span>
                </div>
                <Textarea
                    value={data.content || ''}
                    onChange={(e) => handleChange('content', e.target.value)}
                    placeholder="Your generated or manual cover letter content will appear here..."
                    rows={15}
                    className="font-serif leading-relaxed text-lg p-8 rounded-3xl border-neutral-200 focus:border-primary-500 shadow-2xl shadow-neutral-100"
                />
            </div>
        </div>
    )
}
