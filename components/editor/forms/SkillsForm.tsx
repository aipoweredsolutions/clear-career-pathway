'use client'

import React from 'react'
import { Skill } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, X, Sparkles, Loader2 } from 'lucide-react'

interface SkillsFormProps {
    data: Skill[]
    jobTitle?: string
    onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, jobTitle, onChange }: SkillsFormProps) {
    const [newSkill, setNewSkill] = React.useState('')
    const [isSuggesting, setIsSuggesting] = React.useState(false)
    const [aiSuggestions, setAiSuggestions] = React.useState<string[]>([])

    const addSkill = (name: string) => {
        if (!name.trim()) return
        if (data.some(s => s.skillName.toLowerCase() === name.toLowerCase())) return

        const skill: Skill = {
            id: crypto.randomUUID(),
            skillName: name.trim(),
            skillType: 'technical'
        }

        onChange([...data, skill])
    }

    const handleSuggest = async () => {
        if (!jobTitle) {
            alert('Please enter a professional title in Personal Info first')
            return
        }

        setIsSuggesting(true)
        setAiSuggestions([])

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'suggest_skills',
                    userProfile: { jobTitle }
                })
            })

            const result = await response.json()
            if (result.data?.suggestions) {
                setAiSuggestions(result.data.suggestions)
            }
        } catch (error) {
            console.error('Failed to suggest skills', error)
        } finally {
            setIsSuggesting(false)
        }
    }

    const removeSkill = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-neutral-700">Add Skills</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSuggest}
                        disabled={isSuggesting || !jobTitle}
                        className="text-primary-600 h-8"
                    >
                        {isSuggesting ? (
                            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        ) : (
                            <Sparkles className="w-3.5 h-3.5 mr-2" />
                        )}
                        Suggest with AI
                    </Button>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        addSkill(newSkill)
                        setNewSkill('')
                    }}
                    className="flex gap-2"
                >
                    <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="e.g. React, Project Management, Public Speaking"
                        className="flex-1"
                    />
                    <Button type="submit" disabled={!newSkill.trim()}>
                        <Plus className="w-5 h-5" />
                    </Button>
                </form>

                {aiSuggestions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Recommended for your role:</p>
                        <div className="flex flex-wrap gap-2">
                            {aiSuggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        addSkill(suggestion)
                                        setAiSuggestions(prev => prev.filter(s => s !== suggestion))
                                    }}
                                    className="text-xs bg-white text-neutral-600 px-2.5 py-1 rounded-full border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3 text-primary-500" />
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {data.map((skill, index) => (
                    <div
                        key={skill.id || index}
                        className="group flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-sm hover:border-primary-300 hover:ring-1 hover:ring-primary-200 transition-all"
                    >
                        <span className="text-neutral-700">{skill.skillName}</span>
                        <button
                            onClick={() => removeSkill(index)}
                            className="text-neutral-400 hover:text-danger-500 rounded-full p-0.5"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                {data.length === 0 && !aiSuggestions.length && (
                    <p className="text-neutral-500 italic w-full text-center py-4">
                        No skills added yet. Add your key technical and soft skills or use AI.
                    </p>
                )}
            </div>
        </div>
    )
}
