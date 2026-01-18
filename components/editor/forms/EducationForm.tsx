'use client'

import React from 'react'
import { Education } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2 } from 'lucide-react'

interface EducationFormProps {
    data: Education[]
    onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
    const addEducation = () => {
        const newEducation: Education = {
            id: crypto.randomUUID(),
            institutionName: '',
            degree: '',
            major: '',
            endYear: new Date().getFullYear().toString()
        }
        onChange([...data, newEducation])
    }

    const updateEducation = (index: number, field: keyof Education, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeEducation = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-6">
            {data.map((edu, index) => (
                <div key={edu.id || index} className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 relative group">
                    <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-danger-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="space-y-4">
                        <Input
                            label="School / Institution"
                            value={edu.institutionName}
                            onChange={(e) => updateEducation(index, 'institutionName', e.target.value)}
                            placeholder="e.g. Stanford University"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Degree"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                placeholder="e.g. Bachelor of Science"
                            />
                            <Input
                                label="Major / Field of Study"
                                value={edu.major || ''}
                                onChange={(e) => updateEducation(index, 'major', e.target.value)}
                                placeholder="e.g. Computer Science"
                            />
                        </div>

                        <Input
                            label="Location"
                            value={edu.location || ''}
                            onChange={(e) => updateEducation(index, 'location', e.target.value)}
                            placeholder="e.g. Boston, MA"
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <Input
                                label="Start Year"
                                type="number"
                                value={edu.startYear?.toString() || ''}
                                onChange={(e) => updateEducation(index, 'startYear', e.target.value ? parseInt(e.target.value) : undefined)}
                                placeholder="2019"
                            />
                            <Input
                                label="Graduation Year"
                                type="number"
                                value={edu.endYear?.toString() || ''}
                                onChange={(e) => updateEducation(index, 'endYear', e.target.value ? parseInt(e.target.value) : undefined)}
                                placeholder="2023"
                            />
                            <Input
                                label="GPA"
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                placeholder="e.g. 3.8/4.0"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-6 text-neutral-500 hover:text-primary-600 hover:border-primary-500 hover:bg-primary-50"
                onClick={addEducation}
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Education
            </Button>
        </div>
    )
}
