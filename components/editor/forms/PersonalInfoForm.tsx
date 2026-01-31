'use client'

import React from 'react'
import { PersonalInfo } from '@/lib/types/resume'
import { Input } from '@/components/ui/Input'

interface PersonalInfoFormProps {
    data: PersonalInfo
    onChange: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
    const handleChange = (field: keyof PersonalInfo, value: string) => {
        onChange({
            ...data,
            [field]: value
        })
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Full Name"
                    value={data.fullName || ''}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. John Doe"
                />
                <Input
                    label="Professional Title"
                    value={data.professionalTitle || ''}
                    onChange={(e) => handleChange('professionalTitle', e.target.value)}
                    placeholder="e.g. Software Engineer"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Email"
                    type="email"
                    value={data.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="e.g. john@example.com"
                />
                <Input
                    label="Phone"
                    type="tel"
                    value={data.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="e.g. (555) 123-4567"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="City"
                    value={data.city || ''}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="e.g. San Francisco"
                />
                <Input
                    label="Country"
                    value={data.country || ''}
                    onChange={(e) => handleChange('country', e.target.value)}
                    placeholder="e.g. USA"
                />
            </div>

            <Input
                label="LinkedIn URL"
                value={data.linkedinUrl || ''}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                placeholder="e.g. linkedin.com/in/johndoe"
            />

            <Input
                label="Website / Portfolio"
                value={data.websiteUrl || ''}
                onChange={(e) => handleChange('websiteUrl', e.target.value)}
                placeholder="e.g. portfolio.com"
            />

            <Input
                label="Photo URL"
                value={data.photoUrl || ''}
                onChange={(e) => handleChange('photoUrl', e.target.value)}
                placeholder="e.g. https://example.com/photo.jpg"
            />
        </div>
    )
}
