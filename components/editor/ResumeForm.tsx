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

    const handleUploadSuccess = async (result: any) => {
        const { sections, contactInfo } = result

        if (!sections) {
            toast.error('Could not identify sections in the file')
            return
        }

        // Map heuristic result to our schema
        const newDoc: ResumeDocument = {
            ...data,
            personalInfo: {
                ...data.personalInfo,
                fullName: contactInfo?.fullName || data.personalInfo?.fullName || '',
                email: contactInfo?.email || data.personalInfo?.email || '',
                phone: contactInfo?.phone || data.personalInfo?.phone || '',
                linkedinUrl: contactInfo?.websites?.find((w: string) => w.includes('linkedin.com')) || data.personalInfo?.linkedinUrl || '',
                websiteUrl: contactInfo?.websites?.find((w: string) => !w.includes('linkedin.com') && !w.includes('github.com')) || data.personalInfo?.websiteUrl || '',
                githubUrl: contactInfo?.websites?.find((w: string) => w.includes('github.com')) || data.personalInfo?.githubUrl || '',
            },
            professionalSummary: {
                ...data.professionalSummary,
                summaryText: sections.summary || data.professionalSummary?.summaryText || ''
            },
            workExperience: sections.experience ? [
                {
                    id: crypto.randomUUID(),
                    jobTitle: 'Imported Experience',
                    companyName: 'Draft',
                    startDate: new Date().toISOString().split('T')[0],
                    roleDescription: sections.experience,
                    achievements: []
                }
            ] : data.workExperience,
            education: sections.education ? [
                {
                    id: crypto.randomUUID(),
                    institutionName: 'Imported Education',
                    degree: 'Draft',
                    fieldOfStudy: sections.education,
                }
            ] : data.education,
            skills: sections.skills ? sections.skills.split('\n').filter((s: string) => s.trim().length > 0).map((s: string) => ({
                id: crypto.randomUUID(),
                skillName: s.trim()
            })) : data.skills,
            projects: sections.projects ? [
                {
                    id: crypto.randomUUID(),
                    projectName: 'Imported Projects',
                    description: sections.projects
                }
            ] : data.projects,
            certifications: sections.certifications ? [
                {
                    id: crypto.randomUUID(),
                    certificationName: 'Imported Certification',
                    issuingOrganization: 'Draft',
                    credentialId: sections.certifications
                }
            ] : data.certifications,
            languages: sections.languages ? sections.languages.split('\n').filter((s: string) => s.trim().length > 0).map((s: string) => ({
                id: crypto.randomUUID(),
                languageName: s.trim(),
                proficiencyLevel: 'fluent'
            })) : data.languages,
            achievements: sections.awards ? [
                {
                    id: crypto.randomUUID(),
                    achievementTitle: 'Imported Awards',
                    description: sections.awards
                }
            ] : data.achievements,
            volunteerExperience: sections.volunteer ? [
                {
                    id: crypto.randomUUID(),
                    roleTitle: 'Imported Volunteer Work',
                    organizationName: 'Draft',
                    contributions: sections.volunteer
                }
            ] : data.volunteerExperience,
            publications: sections.publications ? [
                {
                    id: crypto.randomUUID(),
                    title: 'Imported Publications',
                    platformOrPublisher: 'Draft',
                    url: sections.publications
                }
            ] : data.publications,
            professionalAffiliations: sections.affiliations ? [
                {
                    id: crypto.randomUUID(),
                    organizationName: 'Imported Affiliation',
                    roleOrMembership: sections.affiliations
                }
            ] : data.professionalAffiliations,
            references: sections.references ? [
                {
                    id: crypto.randomUUID(),
                    referenceName: 'Imported Reference',
                    availabilityStatement: sections.references
                }
            ] : data.references,
        }

        onChange(newDoc)
        setShowUpload(false)
        setIsAnalyzing(false)
        toast.success('Resume imported! Review and enhance each section with Gemini.')
    }

    const [tabs, setTabs] = useState([
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
    ])

    // Sync tabs with document sectionOrder
    React.useEffect(() => {
        if (data.sectionOrder && data.sectionOrder.length > 0) {
            const orderedTabs = data.sectionOrder
                .map(id => tabs.find(t => t.id === id))
                .filter(Boolean) as { id: string, label: string }[]

            // Add any missing tabs that might be in the default list but not in sectionOrder
            const missingTabs = tabs.filter(t => !data.sectionOrder?.includes(t.id))
            setTabs([...orderedTabs, ...missingTabs])
        }
    }, [data.id, data.sectionOrder, tabs]) // Only on initial load or document change

    const moveTab = (index: number, direction: 'up' | 'down') => {
        const newTabs = [...tabs]
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= tabs.length) return

        const temp = newTabs[index]
        newTabs[index] = newTabs[targetIndex]
        newTabs[targetIndex] = temp
        setTabs(newTabs)

        // Update sectionOrder in the document
        onChange({
            ...data,
            sectionOrder: newTabs.map(t => t.id)
        })
    }

    return (
        <div className="flex h-full bg-white relative overflow-hidden">
            {/* Vertical Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 border-r border-neutral-100 flex flex-col bg-neutral-50/30">
                <div className="p-4 border-b border-neutral-200">
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 bg-white shadow-sm border border-neutral-200 hover:border-primary-300"
                        onClick={() => setShowUpload(true)}
                    >
                        <Upload className="w-4 h-4 text-primary-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Import Data</span>
                    </Button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
                    <div className="px-3 space-y-1">
                        {tabs.map((tab, idx) => (
                            <div key={tab.id} className="group relative">
                                <div
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all cursor-pointer
                                        ${activeTab === tab.id
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 font-bold'
                                            : 'text-neutral-500 hover:text-neutral-900 hover:bg-white'}
                                    `}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setActiveTab(tab.id)
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-1.5 h-1.5 rounded-full ${activeTab === tab.id ? 'bg-white' : 'bg-neutral-300'}`} />
                                        {tab.label}
                                    </div>

                                    {/* Mini Reorder Controls */}
                                    <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === tab.id ? 'text-white/60' : 'text-neutral-400'}`}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); moveTab(idx, 'up') }}
                                            disabled={idx === 0}
                                            className="p-0.5 hover:bg-black/10 rounded disabled:opacity-30"
                                        >
                                            <svg className="w-3 h-3 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); moveTab(idx, 'down') }}
                                            disabled={idx === tabs.length - 1}
                                            className="p-0.5 hover:bg-black/10 rounded disabled:opacity-30"
                                        >
                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </nav>

                {/* Footer Help or Status */}
                <div className="p-4 border-t border-neutral-100 bg-white/50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        AI Assistant Active
                    </div>
                </div>
            </aside>

            {/* Main Form Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="max-w-3xl mx-auto p-8 pb-32">
                {activeTab === 'personal' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-neutral-900">Personal Information</h2>
                        </div>
                        <div className="flex flex-col gap-4 mb-8 bg-primary-50/50 p-6 rounded-2xl border border-primary-100/50">
                            <label className="text-sm font-bold text-primary-900 uppercase tracking-wider">Career Level</label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {['student', 'entry', 'mid', 'senior', 'executive'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => updateField('careerLevel', level)}
                                        className={`
                                            px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all border-2
                                            ${data.careerLevel === level
                                                ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-200'
                                                : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300'}
                                        `}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-neutral-500 italic mt-1">
                                Adjusting this will help Gemini tailor suggestions to your experience level.
                            </p>
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

                {/* Next Section Button */}
                <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-end">
                    {tabs.findIndex(t => t.id === activeTab) < tabs.length - 1 ? (
                        <Button
                            onClick={() => {
                                const nextIdx = tabs.findIndex(t => t.id === activeTab) + 1
                                setActiveTab(tabs[nextIdx].id)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className="bg-primary-600 text-white shadow-lg shadow-primary-200"
                        >
                            Continue to {tabs[tabs.findIndex(t => t.id === activeTab) + 1].label}
                        </Button>
                    ) : (
                        <p className="text-sm font-medium text-neutral-400 italic">This is the final section. Your resume is looking great!</p>
                    )}
                </div>
            </div>
        </div>
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
