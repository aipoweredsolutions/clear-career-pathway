'use client'

import React from 'react'
import { WorkExperience, WorkAchievement } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, GripVertical, Sparkles } from 'lucide-react'

interface ExperienceFormProps {
    data: WorkExperience[]
    onChange: (data: WorkExperience[]) => void
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
    const addExperience = () => {
        const newExperience: WorkExperience = {
            id: crypto.randomUUID(),
            jobTitle: '',
            companyName: '',
            startDate: '',
            isCurrent: false,
            achievements: []
        }
        onChange([...data, newExperience])
    }

    const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeExperience = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    // Achievement helpers
    const addAchievement = (experienceIndex: number) => {
        const newData = [...data]
        const currentAchievements = newData[experienceIndex].achievements || []
        newData[experienceIndex].achievements = [
            ...currentAchievements,
            { id: crypto.randomUUID(), achievementText: '' }
        ]
        onChange(newData)
    }

    const updateAchievement = (expIndex: number, achIndex: number, text: string) => {
        const newData = [...data]
        if (newData[expIndex].achievements) {
            newData[expIndex].achievements![achIndex].achievementText = text
            onChange(newData)
        }
    }

    const removeAchievement = (expIndex: number, achIndex: number) => {
        const newData = [...data]
        if (newData[expIndex].achievements) {
            newData[expIndex].achievements = newData[expIndex].achievements!.filter((_, i) => i !== achIndex)
            onChange(newData)
        }
    }

    return (
        <div className="space-y-8">
            {data.map((exp, index) => (
                <div key={exp.id || index} className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 relative group">
                    <button
                        onClick={() => removeExperience(index)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-danger-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Job Title"
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                            placeholder="e.g. Senior Product Manager"
                        />
                        <Input
                            label="Company"
                            value={exp.companyName}
                            onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
                            placeholder="e.g. Google"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Start Date"
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        />
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">End Date</label>
                            <div className="flex gap-2">
                                <Input
                                    type="date"
                                    value={exp.endDate || ''}
                                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                    disabled={exp.isCurrent}
                                    className="flex-1"
                                />
                                <label className="flex items-center gap-2 text-sm text-neutral-600">
                                    <input
                                        type="checkbox"
                                        checked={exp.isCurrent}
                                        onChange={(e) => updateExperience(index, 'isCurrent', e.target.checked)}
                                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    Current
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Location"
                            value={exp.location || ''}
                            onChange={(e) => updateExperience(index, 'location', e.target.value)}
                            placeholder="e.g. New York, NY"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-neutral-700">Role Description</label>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={async () => {
                                    if (!exp.roleDescription) return
                                    const response = await fetch('/api/generate', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            type: 'improve_experience',
                                            currentContent: exp.roleDescription
                                        })
                                    })
                                    const result = await response.json()
                                    if (result.data?.suggestion) {
                                        updateExperience(index, 'roleDescription', result.data.suggestion)
                                    }
                                }}
                                className="text-primary-600 h-7 text-xs"
                                disabled={!exp.roleDescription || exp.roleDescription.length < 10}
                            >
                                <Sparkles className="w-3 h-3 mr-1.5" />
                                Improve with AI
                            </Button>
                        </div>
                        <Textarea
                            value={exp.roleDescription || ''}
                            onChange={(e) => updateExperience(index, 'roleDescription', e.target.value)}
                            placeholder="Briefly describe your role and responsibilities..."
                            rows={3}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-neutral-700">Key Achievements</label>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={async () => {
                                    if (!exp.jobTitle) {
                                        alert('Please enter a job title first')
                                        return
                                    }
                                    const response = await fetch('/api/generate', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            type: 'suggest_achievements',
                                            userProfile: { jobTitle: exp.jobTitle, companyName: exp.companyName }
                                        })
                                    })
                                    const result = await response.json()
                                    if (result.data?.suggestions) {
                                        const newAchs = result.data.suggestions.map((text: string) => ({
                                            id: crypto.randomUUID(),
                                            achievementText: text
                                        }))
                                        const newData = [...data]
                                        newData[index].achievements = [...(newData[index].achievements || []), ...newAchs]
                                        onChange(newData)
                                    }
                                }}
                                className="text-primary-600 h-7 text-xs"
                                disabled={!exp.jobTitle}
                            >
                                <Sparkles className="w-3 h-3 mr-1.5" />
                                Suggest Achievements
                            </Button>
                        </div>

                        {exp.achievements?.map((ach, achIndex) => (
                            <div key={ach.id || achIndex} className="flex flex-col gap-2 p-3 bg-white rounded-lg border border-neutral-100 shadow-sm relative group/ach">
                                <div className="flex gap-2">
                                    <Input
                                        value={ach.achievementText}
                                        onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                                        placeholder="e.g. Increased revenue by 20%..."
                                        className="flex-1 border-none focus:ring-0 p-0 text-sm shadow-none"
                                    />
                                    <div className="flex gap-1 opacity-0 group-hover/ach:opacity-100 transition-opacity">
                                        <button
                                            onClick={async () => {
                                                if (ach.achievementText.length < 5) return
                                                const response = await fetch('/api/generate', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        type: 'improve_experience',
                                                        currentContent: ach.achievementText
                                                    })
                                                })
                                                const result = await response.json()
                                                if (result.data?.suggestion) {
                                                    updateAchievement(index, achIndex, result.data.suggestion)
                                                }
                                            }}
                                            className="text-primary-500 hover:text-primary-700 p-1"
                                            title="Improve with AI"
                                        >
                                            <Sparkles className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => removeAchievement(index, achIndex)}
                                            className="text-neutral-400 hover:text-danger-500 p-1"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addAchievement(index)}
                            className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Achievement
                        </Button>
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-6 text-neutral-500 hover:text-primary-600 hover:border-primary-500 hover:bg-primary-50"
                onClick={addExperience}
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Work Experience
            </Button>
        </div>
    )
}
