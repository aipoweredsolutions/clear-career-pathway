'use client'

import React, { useState } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { PersonalInfoForm } from '@/components/editor/forms/PersonalInfoForm'
import { SummaryForm } from '@/components/editor/forms/SummaryForm'
import { ExperienceForm } from '@/components/editor/forms/ExperienceForm'
import { EducationForm } from '@/components/editor/forms/EducationForm'
import { SkillsForm } from '@/components/editor/forms/SkillsForm'
import { UploadDialog } from '@/components/upload/UploadDialog'
import { Button } from '@/components/ui/Button'
import { Upload } from 'lucide-react'

interface ResumeFormProps {
    data: ResumeDocument
    onChange: (data: ResumeDocument) => void
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
    const [activeTab, setActiveTab] = useState('personal')
    const [showUpload, setShowUpload] = useState(false)

    // Helper to update specific fields
    const updateField = (section: keyof ResumeDocument, value: any) => {
        onChange({
            ...data,
            [section]: value
        })
    }

    const handleUploadSuccess = (parsedData: any) => {
        // In a real app, we would intelligently merge the parsed data
        // For now, we'll just alert the raw text to show proof of concept
        console.log('Parsed Data:', parsedData)
        if (parsedData.rawText) {
            alert('File uploaded successfully! Check the console for the raw parsed output.')
        }
    }

    const tabs = [
        { id: 'personal', label: 'Personal Info' },
        { id: 'summary', label: 'Summary' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
    ]

    return (
        <div className="flex flex-col h-full bg-white border-r border-neutral-200">
            {/* Upload Banner */}
            <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowUpload(true)}
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Import from Resume
                </Button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto border-b border-neutral-200">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
              ${activeTab === tab.id
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {activeTab === 'personal' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-neutral-900">Personal Information</h2>
                        <PersonalInfoForm
                            data={data.personalInfo || { fullName: '' }}
                            onChange={(info) => updateField('personalInfo', info)}
                        />
                    </div>
                )}

                {activeTab === 'summary' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-neutral-900">Professional Summary</h2>
                        <SummaryForm
                            data={data.professionalSummary || {}}
                            fullResumeData={data}
                            onChange={(summary) => updateField('professionalSummary', summary)}
                        />
                    </div>
                )}

                {activeTab === 'experience' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-neutral-900">Work Experience</h2>
                        <ExperienceForm
                            data={data.workExperience || []}
                            onChange={(exp) => updateField('workExperience', exp)}
                        />
                    </div>
                )}

                {activeTab === 'education' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-neutral-900">Education</h2>
                        <EducationForm
                            data={data.education || []}
                            onChange={(edu) => updateField('education', edu)}
                        />
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-neutral-900">Skills</h2>
                        <SkillsForm
                            data={data.skills || []}
                            onChange={(skills) => updateField('skills', skills)}
                        />
                    </div>
                )}
            </div>

            <UploadDialog
                isOpen={showUpload}
                onClose={() => setShowUpload(false)}
                onUpload={handleUploadSuccess}
            />
        </div>
    )
}
