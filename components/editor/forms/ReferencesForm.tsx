'use client'

import React from 'react'
import { Reference } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, UserCheck } from 'lucide-react'

interface ReferencesFormProps {
    data: Reference[]
    onChange: (data: Reference[]) => void
}

export function ReferencesForm({ data = [], onChange }: ReferencesFormProps) {
    const addReference = () => {
        const newRef: Reference = {
            id: crypto.randomUUID(),
            referenceName: '',
            role: '',
            organization: '',
            contactDetails: '',
            availabilityStatement: 'Available upon request'
        }
        onChange([...data, newRef])
    }

    const updateRef = (index: number, field: keyof Reference, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeRef = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-8">
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 mb-6">
                <p className="text-sm text-primary-800">
                    <strong>Tip:</strong> You can either list references directly or use an availability statement like &quot;Available upon request&quot; to save space.
                </p>
            </div>

            {data.map((ref, index) => (
                <div key={ref.id || index} className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 relative">
                    <button
                        onClick={() => removeRef(index)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-danger-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Reference Name"
                            value={ref.referenceName || ''}
                            onChange={(e) => updateRef(index, 'referenceName', e.target.value)}
                            placeholder="e.g. Jane Smith"
                        />
                        <Input
                            label="Role / Title"
                            value={ref.role || ''}
                            onChange={(e) => updateRef(index, 'role', e.target.value)}
                            placeholder="e.g. Design Director"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                            label="Organization"
                            value={ref.organization || ''}
                            onChange={(e) => updateRef(index, 'organization', e.target.value)}
                            placeholder="e.g. TechFlow Solutions"
                        />
                        <Input
                            label="Contact Details"
                            value={ref.contactDetails || ''}
                            onChange={(e) => updateRef(index, 'contactDetails', e.target.value)}
                            placeholder="e.g. email@example.com, +1-555-0199"
                        />
                    </div>

                    <div className="mb-0">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Availability Statement</label>
                        <Input
                            value={ref.availabilityStatement || ''}
                            onChange={(e) => updateRef(index, 'availabilityStatement', e.target.value)}
                            placeholder="e.g. Available upon request"
                        />
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-6 text-neutral-500 hover:text-primary-600 hover:border-primary-500"
                onClick={addReference}
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Reference
            </Button>
        </div>
    )
}
