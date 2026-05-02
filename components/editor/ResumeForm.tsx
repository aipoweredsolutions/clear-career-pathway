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

    const ALL_TABS = [
        { id: 'personal', label: 'Personal' },
        { id: 'summary', label: 'Summary' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'certifications', label: 'Certs' },
        { id: 'achievements', label: 'Awards' },
        { id: 'volunteer', label: 'Volunteer' },
        { id: 'languages', label: 'Languages' },
        { id: 'publications', label: 'Publications' },
        { id: 'affiliations', label: 'Affiliations' },
        { id: 'references', label: 'References' },
        { id: 'additional', label: 'Extra Info' },
        { id: 'custom', label: 'Custom' },
    ];

    const CORE_TABS = ['personal', 'summary', 'experience', 'education', 'skills'];

    const [tabs, setTabs] = useState<{id: string, label: string}[]>([]);

    // Sync tabs with document sectionOrder or initialize with defaults
    React.useEffect(() => {
        if (data.sectionOrder && data.sectionOrder.length > 0) {
            const orderedTabs = data.sectionOrder
                .map(id => ALL_TABS.find(t => t.id === id))
                .filter(Boolean) as { id: string, label: string }[];
            setTabs(orderedTabs);
        } else {
            // Check what has data to not hide user's existing info
            const activeIds = new Set(CORE_TABS);
            if (data.projects?.length) activeIds.add('projects');
            if (data.certifications?.length) activeIds.add('certifications');
            if (data.achievements?.length) activeIds.add('achievements');
            if (data.volunteerExperience?.length) activeIds.add('volunteer');
            if (data.languages?.length) activeIds.add('languages');
            if (data.publications?.length) activeIds.add('publications');
            if (data.professionalAffiliations?.length) activeIds.add('affiliations');
            if (data.references?.length) activeIds.add('references');
            if (data.additionalInfo && Object.keys(data.additionalInfo).length > 0) activeIds.add('additional');
            if (data.customSections?.length) activeIds.add('custom');

            const defaultTabs = ALL_TABS.filter(t => activeIds.has(t.id));
            setTabs(defaultTabs);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.id, data.sectionOrder]); 

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

    const availableToAdd = ALL_TABS.filter(t => !tabs.find(vt => vt.id === t.id));

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
                                    onClick={() => {
                                        setActiveTab(tab.id)
                                        const el = document.getElementById(`section-${tab.id}`)
                                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                                    }}
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
                                            const el = document.getElementById(`section-${tab.id}`)
                                            if (el) el.scrollIntoView({ behavior: 'smooth' })
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

                    {/* Add Section Dropdown */}
                    <div className="px-3 mt-4 mb-2">
                        {availableToAdd.length > 0 && (
                            <div className="relative">
                                <select
                                    className="w-full bg-white border border-neutral-200 text-primary-600 text-sm font-bold rounded-xl px-4 py-2.5 cursor-pointer outline-none hover:border-primary-300 appearance-none shadow-sm transition-colors"
                                    value=""
                                    onChange={(e) => {
                                        if (!e.target.value) return;
                                        const tabToAdd = ALL_TABS.find(t => t.id === e.target.value);
                                        if (tabToAdd) {
                                            const newTabs = [...tabs, tabToAdd];
                                            setTabs(newTabs);
                                            onChange({
                                                ...data,
                                                sectionOrder: newTabs.map(t => t.id)
                                            });
                                            setActiveTab(tabToAdd.id);
                                        }
                                    }}
                                >
                                    <option value="" disabled>+ Add Section</option>
                                    {availableToAdd.map(t => (
                                        <option key={t.id} value={t.id}>{t.label}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                </div>
                            </div>
                        )}
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
                <div className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth" id="form-scroll-container">
                    <div className="max-w-3xl mx-auto p-8 pb-32 space-y-12">
                        {tabs.map((tab) => (
                            <div key={tab.id} id={`section-${tab.id}`} className="scroll-mt-8 pb-12 border-b border-neutral-100 last:border-0 last:pb-0">
                                {tab.id !== 'personal' && (
                                    <h2 className="text-xl font-bold text-neutral-900 mb-6">{tab.label}</h2>
                                )}
                                
                                {tab.id === 'personal' && (
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
                                
                                {tab.id === 'summary' && <SummaryForm data={data.professionalSummary || {}} fullResumeData={data} onChange={(s) => updateField('professionalSummary', s)} />}
                                {tab.id === 'experience' && <ExperienceForm data={data.workExperience || []} onChange={(e) => updateField('workExperience', e)} />}
                                {tab.id === 'education' && <EducationForm data={data.education || []} onChange={(e) => updateField('education', e)} />}
                                {tab.id === 'skills' && <SkillsForm data={data.skills || []} jobTitle={data.personalInfo?.professionalTitle} onChange={(s) => updateField('skills', s)} />}
                                {tab.id === 'projects' && <ProjectsForm data={data.projects || []} onChange={(p) => updateField('projects', p)} />}
                                {tab.id === 'certifications' && <CertificationsForm data={data.certifications || []} onChange={(c) => updateField('certifications', c)} />}
                                {tab.id === 'achievements' && <AchievementsForm data={data.achievements || []} onChange={(a) => updateField('achievements', a)} />}
                                {tab.id === 'volunteer' && <VolunteerForm data={data.volunteerExperience || []} onChange={(v) => updateField('volunteerExperience', v)} />}
                                {tab.id === 'languages' && <LanguagesForm data={data.languages || []} onChange={(l) => updateField('languages', l)} />}
                                {tab.id === 'publications' && <PublicationsForm data={data.publications || []} onChange={(p) => updateField('publications', p)} />}
                                {tab.id === 'affiliations' && <AffiliationsForm data={data.professionalAffiliations || []} onChange={(a) => updateField('professionalAffiliations', a)} />}
                                {tab.id === 'references' && <ReferencesForm data={data.references || []} onChange={(r) => updateField('references', r)} />}
                                {tab.id === 'additional' && <AdditionalInfoForm data={data.additionalInfo || {}} onChange={(a) => updateField('additionalInfo', a)} />}
                                {tab.id === 'custom' && <CustomSectionsForm data={data.customSections || []} onChange={(c) => updateField('customSections', c)} />}
                            </div>
                        ))}
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
