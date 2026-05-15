'use client'

import React from 'react'
import { VolunteerExperience } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Heart } from 'lucide-react'

interface VolunteerFormProps {
    data: VolunteerExperience[]
    onChange: (data: VolunteerExperience[]) => void
}

export function VolunteerForm({ data = [], onChange }: VolunteerFormProps) {
    const addVolunteer = () => {
        const newVol: VolunteerExperience = {
            id: crypto.randomUUID(),
            roleTitle: '',
            organizationName: '',
            startDate: '',
            endDate: '',
            contributions: ''
        }
        onChange([...data, newVol])
    }

    const updateVol = (index: number, field: keyof VolunteerExperience, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeVol = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-8">
            {data.map((vol, index) => (
                <div key={vol.id || index} className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 relative">
                    <button
                        onClick={() => removeVol(index)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-danger-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Role Title"
                            value={vol.roleTitle}
                            onChange={(e) => updateVol(index, 'roleTitle', e.target.value)}
                            placeholder="e.g. Volunteer Design Mentor"
                        />
                        <Input
                            label="Organization"
                            value={vol.organizationName}
                            onChange={(e) => updateVol(index, 'organizationName', e.target.value)}
                            placeholder="e.g. Girls Who Code"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Start Date"
                            type="month"
                            value={vol.startDate || ''}
                            onChange={(e) => updateVol(index, 'startDate', e.target.value)}
                            min="1950-01"
                            max="2050-12"
                        />
                        <Input
                            label="End Date"
                            type="month"
                            value={vol.endDate || ''}
                            onChange={(e) => updateVol(index, 'endDate', e.target.value)}
                            min="1950-01"
                            max="2050-12"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Contributions</label>
                        <Textarea
                            value={vol.contributions || ''}
                            onChange={(e) => updateVol(index, 'contributions', e.target.value)}
                            placeholder="Describe your volunteer impact and responsibilities..."
                            rows={3}
                        />
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-6 text-neutral-500 hover:text-primary-600 hover:border-primary-500"
                onClick={addVolunteer}
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Volunteer Experience
            </Button>
        </div>
    )
}
