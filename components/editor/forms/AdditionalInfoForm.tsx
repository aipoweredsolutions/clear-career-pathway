'use client'

import React from 'react'
import { AdditionalInfo } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface AdditionalInfoFormProps {
    data: AdditionalInfo
    onChange: (data: AdditionalInfo) => void
}

export function AdditionalInfoForm({ data, onChange }: AdditionalInfoFormProps) {
    const updateField = (field: keyof AdditionalInfo, value: any) => {
        onChange({ ...data, [field]: value })
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Security Clearance"
                    value={data.securityClearance || ''}
                    onChange={(e) => updateField('securityClearance', e.target.value)}
                    placeholder="e.g. Secret, Top Secret"
                />
                <Input
                    label="Work Authorization"
                    value={data.workAuthorization || ''}
                    onChange={(e) => updateField('workAuthorization', e.target.value)}
                    placeholder="e.g. US Citizen, Visa H1-B"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Availability"
                    value={data.availability || ''}
                    onChange={(e) => updateField('availability', e.target.value)}
                    placeholder="e.g. Immediate, 2 weeks notice"
                />
                <div className="flex flex-col justify-center pt-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={data.willingToRelocate || false}
                            onChange={(e) => updateField('willingToRelocate', e.target.checked)}
                            className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-neutral-700">Willing to Relocate</span>
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Other Information</label>
                <Textarea
                    value={data.otherInfo || ''}
                    onChange={(e) => updateField('otherInfo', e.target.value)}
                    placeholder="Any additional details, hobbies, or info you'd like to include..."
                    rows={6}
                />
            </div>
        </div>
    )
}
