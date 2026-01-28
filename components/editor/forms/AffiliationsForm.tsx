'use client'

import React from 'react'
import { ProfessionalAffiliation } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Users } from 'lucide-react'

interface AffiliationsFormProps {
    data: ProfessionalAffiliation[]
    onChange: (data: ProfessionalAffiliation[]) => void
}

export function AffiliationsForm({ data = [], onChange }: AffiliationsFormProps) {
    const addAffiliation = () => {
        const newAff: ProfessionalAffiliation = {
            id: crypto.randomUUID(),
            organizationName: '',
            roleOrMembership: '',
            yearsActive: ''
        }
        onChange([...data, newAff])
    }

    const updateAff = (index: number, field: keyof ProfessionalAffiliation, value: any) => {
        const newData = [...data]
        newData[index] = { ...newData[index], [field]: value }
        onChange(newData)
    }

    const removeAff = (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        onChange(newData)
    }

    return (
        <div className="space-y-4">
            {data.map((aff, index) => (
                <div key={aff.id || index} className="flex flex-col md:flex-row gap-4 items-end bg-neutral-50 p-4 rounded-xl border border-neutral-200 relative">
                    <button
                        onClick={() => removeAff(index)}
                        className="absolute -top-2 -right-2 bg-white text-neutral-400 hover:text-danger-500 transition-colors rounded-full p-1 border border-neutral-200 shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex-[2] w-full">
                        <Input
                            label="Organization Name"
                            value={aff.organizationName}
                            onChange={(e) => updateAff(index, 'organizationName', e.target.value)}
                            placeholder="e.g. Interaction Design Association"
                        />
                    </div>

                    <div className="flex-1 w-full">
                        <Input
                            label="Role / Membership"
                            value={aff.roleOrMembership || ''}
                            onChange={(e) => updateAff(index, 'roleOrMembership', e.target.value)}
                            placeholder="e.g. Active Member"
                        />
                    </div>

                    <div className="flex-1 w-full">
                        <Input
                            label="Years Active"
                            value={aff.yearsActive || ''}
                            onChange={(e) => updateAff(index, 'yearsActive', e.target.value)}
                            placeholder="e.g. 2018 - Present"
                        />
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                className="w-full border-dashed py-4 text-neutral-500 hover:text-primary-600 hover:border-primary-500"
                onClick={addAffiliation}
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Professional Affiliation
            </Button>
        </div>
    )
}
