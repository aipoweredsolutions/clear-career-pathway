'use client'

import React from 'react'
import { Skill } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, X } from 'lucide-react'

interface SkillsFormProps {
    data: Skill[]
    onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
    const [newSkill, setNewSkill] = React.useState('')

    const addSkill = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!newSkill.trim()) return

        const skill: Skill = {
            id: crypto.randomUUID(),
            skillName: newSkill.trim(),
            skillType: 'technical' // Default to technical, could be enhanced with categorization
        }

        onChange([...data, skill])
        setNewSkill('')
    }

    const removeSkill = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                <h3 className="text-sm font-medium text-neutral-700 mb-4">Add Skills</h3>
                <form onSubmit={addSkill} className="flex gap-2">
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
                {data.length === 0 && (
                    <p className="text-neutral-500 italic w-full text-center py-4">
                        No skills added yet. Add your key technical and soft skills.
                    </p>
                )}
            </div>
        </div>
    )
}
