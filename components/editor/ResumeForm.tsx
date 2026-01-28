'use client'


import React, { useState } from 'react'
import { toast } from 'sonner'
import { ResumeDocument } from '@/lib/types/resume'
import { PersonalInfoForm } from '@/components/editor/forms/PersonalInfoForm'
import { SummaryForm } from '@/components/editor/forms/SummaryForm'
import { ExperienceForm } from '@/components/editor/forms/ExperienceForm'
import { EducationForm } from '@/components/editor/forms/EducationForm'
import { SkillsForm } from '@/components/editor/forms/SkillsForm'
import { ProjectsForm } from '@/components/editor/forms/ProjectsForm'
import { CertificationsForm } from '@/components/editor/forms/CertificationsForm'
import { AchievementsForm } from '@/components/editor/forms/AchievementsForm'
import { LanguagesForm } from '@/components/editor/forms/LanguagesForm'
import { VolunteerForm } from '@/components/editor/forms/VolunteerForm'
import { PublicationsForm } from '@/components/editor/forms/PublicationsForm'
import { AffiliationsForm } from '@/components/editor/forms/AffiliationsForm'
import { ReferencesForm } from '@/components/editor/forms/ReferencesForm'
import { AdditionalInfoForm } from '@/components/editor/forms/AdditionalInfoForm'
import { CustomSectionsForm } from '@/components/editor/forms/CustomSectionsForm'
import { UploadDialog } from '@/components/upload/UploadDialog'
import { Button } from '@/components/ui/Button'
import { Upload, Loader2 } from 'lucide-react'

interface ResumeFormProps {
    data: ResumeDocument
    onChange: (data: ResumeDocument) => void
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
    const [activeTab, setActiveTab] = useState('personal')
    const [showUpload, setShowUpload] = useState(false)

    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // Helper to update specific fields
    const updateField = (section: keyof ResumeDocument, value: any) => {
        onChange({
            ...data,
            [section]: value
        })
    }

    const handleUploadSuccess = async (parsedData: any) => {
        if (!parsedData.rawText) return

        setIsAnalyzing(true)
        setShowUpload(false)

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'parse_resume_from_text',
                    currentContent: parsedData.rawText,
                    userProfile: {}
                })
            })

            const result = await response.json()
            if (result.data) {
                const mapped = result.data
                // Map AI result to our schema
                // Note: We generate new IDs to avoid conflicts
                const newDoc: ResumeDocument = {
                    ...data,
                    personalInfo: {
                        ...data.personalInfo,
                        ...mapped.personalInfo
                    },
                    professionalSummary: {
                        ...data.professionalSummary,
                        ...mapped.professionalSummary
                    },
                    workExperience: mapped.workExperience?.map((exp: any) => ({
                        ...exp,
                        id: crypto.randomUUID(),
                        achievements: exp.achievements?.map((a: any) => ({
                            ...a,
                            id: crypto.randomUUID()
                        })) || []
                    })) || [],
                    education: mapped.education?.map((edu: any) => ({
                        ...edu,
                        id: crypto.randomUUID(),
                        major: edu.fieldOfStudy || edu.major,
                        startYear: edu.startDate ? parseInt(edu.startDate.split('-')[0]) : undefined,
                        endYear: edu.endDate ? parseInt(edu.endDate.split('-')[0]) : undefined
                    })) || [],
                    skills: mapped.skills?.map((s: any) => ({
                        ...s,
                        id: crypto.randomUUID()
                    })) || [],
                    projects: mapped.projects?.map((p: any) => ({
                        ...p,
                        id: crypto.randomUUID(),
                        toolsUsed: Array.isArray(p.toolsUsed) ? p.toolsUsed : (typeof p.toolsUsed === 'string' ? p.toolsUsed.split(',').map((t: string) => t.trim()) : [])
                    })) || [],
                    certifications: mapped.certifications?.map((c: any) => ({
                        ...c,
                        id: crypto.randomUUID()
                    })) || [],
                    languages: mapped.languages?.map((l: any) => ({
                        ...l,
                        id: crypto.randomUUID()
                    })) || [],
                    volunteerExperience: mapped.volunteerExperience?.map((v: any) => ({
                        ...v,
                        id: crypto.randomUUID()
                    })) || [],
                    publications: mapped.publications?.map((p: any) => ({
                        ...p,
                        id: crypto.randomUUID()
                    })) || [],
                    professionalAffiliations: mapped.professionalAffiliations?.map((a: any) => ({
                        ...a,
                        id: crypto.randomUUID()
                    })) || [],
                    references: mapped.references?.map((r: any) => ({
                        ...r,
                        id: crypto.randomUUID()
                    })) || [],
                    additionalInfo: {
                        ...data.additionalInfo,
                        ...mapped.additionalInfo
                    },
                    customSections: mapped.customSections?.map((cs: any) => ({
                        ...cs,
                        id: crypto.randomUUID(),
                        items: cs.items?.map((item: any) => ({
                            ...item,
                            id: crypto.randomUUID()
                        })) || []
                    })) || []
                }

                onChange(newDoc)
                toast.success('Resume imported and analyzed successfully!')
            } else {
                throw new Error('No data returned from AI')
            }
        } catch (error) {
            console.error('Import Analysis Error:', error)
            toast.error('Failed to analyze resume. Please try again or fill manually.')
        } finally {
            setIsAnalyzing(false)
        }
    }

    const tabs = [
        { id: 'personal', label: 'Personal' },
        { id: 'summary', label: 'Summary' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'certifications', label: 'Certs' },
        { id: 'achievements', label: 'Awards' },
        { id: 'volunteer', label: 'Volunteer' },
        { id: 'languages', label: 'Languages' },
        { id: 'publications', label: 'Publications' },
        { id: 'affiliations', label: 'Affiliations' },
        { id: 'references', label: 'References' },
        { id: 'additional', label: 'Extra Info' },
        { id: 'custom', label: 'Custom' },
    ]

    return (
        <div className="flex flex-col h-full bg-white border-r border-neutral-200 relative">
            {/* Upload Banner */}
            <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center gap-3">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowUpload(true)}
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Import from Resume
                </Button>
            </div>

            {/* Tabs Navigation - Scrollable */}
            <div className="flex overflow-x-auto border-b border-neutral-200 scrollbar-hide bg-white sticky top-0 z-10">
                <div className="flex px-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-4 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2
                                ${activeTab === tab.id
                                    ? 'text-primary-600 border-primary-600 bg-primary-50/30'
                                    : 'text-neutral-500 border-transparent hover:text-neutral-900 hover:bg-neutral-50'}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-20">
                {activeTab === 'personal' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-neutral-900">Personal Information</h2>
                        </div>
                        <PersonalInfoForm
                            data={data.personalInfo || { fullName: '' }}
                            onChange={(info) => updateField('personalInfo', info)}
                        />
                    </div>
                )}

                {activeTab === 'summary' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Professional Summary</h2>
                        <SummaryForm
                            data={data.professionalSummary || {}}
                            fullResumeData={data}
                            onChange={(summary) => updateField('professionalSummary', summary)}
                        />
                    </div>
                )}

                {activeTab === 'experience' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Work Experience</h2>
                        <ExperienceForm
                            data={data.workExperience || []}
                            onChange={(exp) => updateField('workExperience', exp)}
                        />
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Projects</h2>
                        <ProjectsForm
                            data={data.projects || []}
                            onChange={(projects) => updateField('projects', projects)}
                        />
                    </div>
                )}

                {activeTab === 'education' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Education</h2>
                        <EducationForm
                            data={data.education || []}
                            onChange={(edu) => updateField('education', edu)}
                        />
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Skills</h2>
                        <SkillsForm
                            data={data.skills || []}
                            jobTitle={data.personalInfo?.professionalTitle}
                            onChange={(skills) => updateField('skills', skills)}
                        />
                    </div>
                )}

                {activeTab === 'certifications' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Certifications</h2>
                        <CertificationsForm
                            data={data.certifications || []}
                            onChange={(certs) => updateField('certifications', certs)}
                        />
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Achievements & Awards</h2>
                        <AchievementsForm
                            data={data.achievements || []}
                            onChange={(achs) => updateField('achievements', achs)}
                        />
                    </div>
                )}

                {activeTab === 'volunteer' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Volunteer Experience</h2>
                        <VolunteerForm
                            data={data.volunteerExperience || []}
                            onChange={(vol) => updateField('volunteerExperience', vol)}
                        />
                    </div>
                )}

                {activeTab === 'languages' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Languages</h2>
                        <LanguagesForm
                            data={data.languages || []}
                            onChange={(langs) => updateField('languages', langs)}
                        />
                    </div>
                )}

                {activeTab === 'publications' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Publications</h2>
                        <PublicationsForm
                            data={data.publications || []}
                            onChange={(pubs) => updateField('publications', pubs)}
                        />
                    </div>
                )}

                {activeTab === 'affiliations' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Professional Affiliations</h2>
                        <AffiliationsForm
                            data={data.professionalAffiliations || []}
                            onChange={(affs) => updateField('professionalAffiliations', affs)}
                        />
                    </div>
                )}

                {activeTab === 'references' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">References</h2>
                        <ReferencesForm
                            data={data.references || []}
                            onChange={(refs) => updateField('references', refs)}
                        />
                    </div>
                )}

                {activeTab === 'additional' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Additional Information</h2>
                        <AdditionalInfoForm
                            data={data.additionalInfo || {}}
                            onChange={(info) => updateField('additionalInfo', info)}
                        />
                    </div>
                )}

                {activeTab === 'custom' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-neutral-900">Custom Sections</h2>
                        <CustomSectionsForm
                            data={data.customSections || []}
                            onChange={(sections) => updateField('customSections', sections)}
                        />
                    </div>
                )}
            </div>

            <UploadDialog
                isOpen={showUpload}
                onClose={() => setShowUpload(false)}
                onUpload={handleUploadSuccess}
            />

            {/* Analyzing Overlay */}
            {isAnalyzing && (
                <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
                    <div className="bg-primary-50 p-4 rounded-full">
                        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">Analyzing Resume...</h3>
                    <p className="text-neutral-500 text-center max-w-xs">
                        Our AI is extracting your experience, skills, and education. This usually takes about 10-20 seconds.
                    </p>
                </div>
            )}
        </div>
    )
}
