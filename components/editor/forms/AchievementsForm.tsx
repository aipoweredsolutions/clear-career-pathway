'use client'

import React from 'react'
import { Achievement } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Award } from 'lucide-react'

interface AchievementsFormProps {
    data: Achievement[]
    onChange: (data: Achievement[]) => void
}

export function AchievementsForm({ data = [], onChange }: AchievementsFormProps) {
    const addAchievement = () => {
        const newAch: Achievement = {
            id: crypto.randomUUID(),
            achievementTitle: '',
            issuingBody: '',
            year: new Date().getFullYear(),
            description: ''
        }
        onChange([...data, newAch])
    }

    const updateAch = (index: number, field: keyof Achievement, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeAch = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-6">
            {data.map((ach, index) => (
                <div key={ach.id || index} className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 relative">
                    <button
                        onClick={() => removeAch(index)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-danger-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Achievement Title"
                            value={ach.achievementTitle}
                            onChange={(e) => updateAch(index, 'achievementTitle', e.target.value)}
                            placeholder="e.g. Employee of the Month"
                        />
                        <Input
                            label="Issuing Body"
                            value={ach.issuingBody || ''}
                            onChange={(e) => updateAch(index, 'issuingBody', e.target.value)}
                            placeholder="e.g. Acme Corp"
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Year"
                            type="number"
                            value={ach.year || ''}
                            onChange={(e) => updateAch(index, 'year', parseInt(e.target.value))}
                            placeholder="2023"
                        />
                    </div>

                    <div className="mb-0">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                        <Textarea
                            value={ach.description || ''}
                            onChange={(e) => updateAch(index, 'description', e.target.value)}
                            placeholder="Briefly describe the significance of this achievement..."
                            rows={2}
                        />
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-6 text-neutral-500 hover:text-primary-600 hover:border-primary-500"
                onClick={addAchievement}
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Achievement
            </Button>
        </div>
    )
}
