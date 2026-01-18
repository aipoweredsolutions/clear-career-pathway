'use client'

import React, { useState } from 'react'
import { ProfessionalSummary, ResumeDocument } from '@/lib/types/resume'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Sparkles, Loader2 } from 'lucide-react'

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

    const handleGenerate = async () => {
        if (!fullResumeData) return

        setIsGenerating(true)
        setSuggestions([])

        try {
            // Construct a light profile from available data
            const skills = fullResumeData.skills?.map(s => s.skillName) || []
            const experience = fullResumeData.workExperience?.map(e => ({
                role: e.jobTitle,
                company: e.companyName,
                achievements: e.achievements?.map(a => a.achievementText)
            })) || []

            const userProfile = {
                jobTitle: fullResumeData.personalInfo?.professionalTitle || 'Professional',
                skills,
                experience
            }

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'summary',
                    userProfile
                })
            })

            const result = await response.json()

            if (result.data && result.data.suggestions) {
                setSuggestions(result.data.suggestions)
            }

        } catch (error) {
            console.error('Failed to generate summary', error)
            alert('Failed to generate summary. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-primary-900 mb-1">
                            AI Suggestion
                        </h3>
                        <p className="text-sm text-primary-700 mb-3">
                            We can write a professional summary based on your experience and skills.
                        </p>
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                'Generate Summary'
                            )}
                        </Button>

                        {suggestions.length > 0 && (
                            <div className="mt-4 space-y-3">
                                <p className="text-sm font-medium text-primary-800">Select a suggestion:</p>
                                {suggestions.map((suggestion, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white p-3 rounded border border-primary-200 hover:border-primary-400 cursor-pointer transition-colors text-sm text-neutral-700"
                                        onClick={() => handleChange('summaryText', suggestion)}
                                    >
                                        {suggestion}
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
            />
        </div>
    )
}
