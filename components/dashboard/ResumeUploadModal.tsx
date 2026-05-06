'use client'

import React, { useState, useRef } from 'react'
import {
    X, Upload, FileText, Check, AlertCircle, Loader2, Sparkles,
    User, Briefcase, GraduationCap, List, ArrowRight, Save, Linkedin
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { toast } from 'sonner'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface ResumeUploadModalProps {
    isOpen: boolean
    onClose: () => void
}

type Step = 'upload' | 'review_text' | 'review_structured'

export function ResumeUploadModal({ isOpen, onClose }: ResumeUploadModalProps) {
    const [step, setStep] = useState<Step>('upload')
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [rawText, setRawText] = useState('')
    const [structuredData, setStructuredData] = useState<any>(null)
    const [isParsing, setIsParsing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    if (!isOpen) return null

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            const validTypes = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ]
            if (!validTypes.includes(selectedFile.type)) {
                toast.error('Invalid file type. Please upload a PDF or DOCX.')
                return
            }
            setFile(selectedFile)
            handleUpload(selectedFile)
        }
    }

    const handleUpload = async (fileToUpload: File) => {
        setIsUploading(true)
        setUploadProgress(10)

        const formData = new FormData()
        formData.append('file', fileToUpload)

        try {
            setUploadProgress(30)
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            setUploadProgress(70)
            const result = await response.json()

            if (result.success) {
                setRawText(result.data.rawText)
                setStep('review_text')
                setUploadProgress(100)
                toast.success('Document uploaded and text extracted!')
            } else {
                toast.error(result.error || 'Failed to upload document')
            }
        } catch (error) {
            console.error('Upload error:', error)
            toast.error('An error occurred during upload')
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    const handleConvertToSections = async () => {
        setIsParsing(true)
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'parse_resume_from_text',
                    content: rawText
                }),
            })

            const result = await response.json()
            if (result.data) {
                setStructuredData(result.data)
                setStep('review_structured')
                toast.success('AI has structured your resume!')
            } else {
                toast.error('Failed to structure resume content')
            }
        } catch (error) {
            console.error('Parsing error:', error)
            toast.error('An error occurred while parsing')
        } finally {
            setIsParsing(false)
        }
    }

    const handleSaveAndOpen = async () => {
        setIsSaving(true)
        try {
            const response = await fetch('/api/dashboard/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(structuredData),
            })

            const result = await response.json()
            if (result.success) {
                toast.success('Resume saved successfully!')
                router.push(`/editor/${result.id}`)
                onClose()
            } else {
                toast.error(result.error || 'Failed to save resume')
            }
        } catch (error) {
            console.error('Save error:', error)
            toast.error('An error occurred while saving')
        } finally {
            setIsSaving(false)
        }
    }

    const renderUploadStep = () => (
        <div className="flex flex-col items-center justify-center py-12">
            <div
                className={`w-full max-w-md p-10 border-2 border-dashed rounded-3xl transition-all flex flex-col items-center text-center cursor-pointer
                    ${file ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 hover:border-primary-400 hover:bg-neutral-50'}`}
                onClick={() => fileInputRef.current?.click()}
            >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg
                    ${file ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                    {isUploading ? <Loader2 className="w-10 h-10 animate-spin" /> : <Upload className="w-10 h-10" />}
                </div>
                <h4 className="text-xl font-bold text-neutral-900 mb-2">
                    {file ? file.name : 'Upload Your Resume'}
                </h4>
                <p className="text-neutral-500 text-sm mb-6">
                    Support PDF and DOCX formats (Max 10MB)
                </p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />

                {isUploading && (
                    <div className="w-full bg-neutral-100 rounded-full h-2 mt-4 overflow-hidden">
                        <div
                            className="bg-primary-600 h-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-neutral-400 font-medium">
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> PDF Support</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> DOCX Support</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> AI Parsing</span>
            </div>

            <div className="mt-12 bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4 max-w-md">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white shadow-lg shadow-blue-200">
                    <Linkedin className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm font-black text-blue-900 mb-1">Pro Tip: Import from LinkedIn</p>
                    <p className="text-xs text-blue-700 font-medium leading-relaxed">
                        Download your LinkedIn profile as a PDF and upload it here. Our AI will perfectly structure your entire profile into a premium resume.
                    </p>
                </div>
            </div>
        </div>
    )

    const renderReviewTextStep = () => (
        <div className="flex flex-col gap-6 py-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h4 className="text-lg font-bold text-neutral-950">Review Extracted Text</h4>
                    <p className="text-sm text-neutral-500">We&apos;ve extracted the raw text from your document. Review it before building sections.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Text Extracted
                </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-inner">
                <textarea
                    className="w-full h-80 p-6 text-sm text-neutral-700 font-mono bg-neutral-50/50 resize-none focus:outline-none"
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                />
            </div>

            <div className="flex justify-between items-center bg-primary-50/50 p-6 rounded-2xl border border-primary-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-neutral-900">Ready for AI Processing</p>
                        <p className="text-xs text-neutral-500">AI will structure this text into professional resume sections.</p>
                    </div>
                </div>
                <Button
                    onClick={handleConvertToSections}
                    disabled={isParsing}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8"
                >
                    {isParsing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Structuring...
                        </>
                    ) : (
                        <>
                            Convert to Resume Sections
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    )

    const renderReviewStructuredStep = () => (
        <div className="flex flex-col gap-8 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-bold text-neutral-950">Review Structured Content</h4>
                    <p className="text-sm text-neutral-500">Our AI has organized your info. You can make final edits before saving.</p>
                </div>
                <Button
                    onClick={handleSaveAndOpen}
                    disabled={isSaving}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save & Open in Editor
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* Personal Info */}
                <Card className="p-6 border-neutral-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:rotate-12 transition-transform">
                            <User className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-neutral-900">Personal Information</h5>
                    </div>
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            value={structuredData?.personalInfo?.fullName || ''}
                            onChange={(e) => setStructuredData({ ...structuredData, personalInfo: { ...structuredData.personalInfo, fullName: e.target.value } })}
                        />
                        <Input
                            label="Professional Title"
                            value={structuredData?.personalInfo?.professionalTitle || ''}
                            onChange={(e) => setStructuredData({ ...structuredData, personalInfo: { ...structuredData.personalInfo, professionalTitle: e.target.value } })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Email"
                                value={structuredData?.personalInfo?.email || ''}
                                onChange={(e) => setStructuredData({ ...structuredData, personalInfo: { ...structuredData.personalInfo, email: e.target.value } })}
                            />
                            <Input
                                label="Phone"
                                value={structuredData?.personalInfo?.phone || ''}
                                onChange={(e) => setStructuredData({ ...structuredData, personalInfo: { ...structuredData.personalInfo, phone: e.target.value } })}
                            />
                        </div>
                    </div>
                </Card>

                {/* Professional Summary */}
                <Card className="p-6 border-neutral-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:rotate-12 transition-transform">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-neutral-900">Professional Summary</h5>
                    </div>
                    <Textarea
                        label="Summary"
                        rows={8}
                        value={structuredData?.professionalSummary?.summaryText || ''}
                        onChange={(e) => setStructuredData({ ...structuredData, professionalSummary: { ...structuredData.professionalSummary, summaryText: e.target.value } })}
                    />
                </Card>

                {/* Work Experience */}
                <Card className="p-6 border-neutral-200 shadow-sm relative overflow-hidden group md:col-span-2">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:rotate-12 transition-transform">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-neutral-900">Work Experience</h5>
                    </div>
                    <div className="space-y-6">
                        {structuredData?.workExperience?.slice(0, 3).map((exp: any, idx: number) => (
                            <div key={idx} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <Input
                                        label="Job Title"
                                        value={exp.jobTitle || ''}
                                        onChange={(e) => {
                                            const newWork = [...structuredData.workExperience]
                                            newWork[idx].jobTitle = e.target.value
                                            setStructuredData({ ...structuredData, workExperience: newWork })
                                        }}
                                    />
                                    <Input
                                        label="Company"
                                        value={exp.companyName || ''}
                                        onChange={(e) => {
                                            const newWork = [...structuredData.workExperience]
                                            newWork[idx].companyName = e.target.value
                                            setStructuredData({ ...structuredData, workExperience: newWork })
                                        }}
                                    />
                                </div>
                                <Textarea
                                    label="Role Overview"
                                    rows={2}
                                    value={exp.roleDescription || ''}
                                    onChange={(e) => {
                                        const newWork = [...structuredData.workExperience]
                                        newWork[idx].roleDescription = e.target.value
                                        setStructuredData({ ...structuredData, workExperience: newWork })
                                    }}
                                    className="mb-3"
                                />
                                {exp.achievements && exp.achievements.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Achievements</p>
                                        {exp.achievements.map((ach: string, aIdx: number) => (
                                            <Input
                                                key={aIdx}
                                                value={ach}
                                                onChange={(e) => {
                                                    const newWork = [...structuredData.workExperience]
                                                    newWork[idx].achievements[aIdx] = e.target.value
                                                    setStructuredData({ ...structuredData, workExperience: newWork })
                                                }}
                                                className="bg-white"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Education */}
                <Card className="p-6 border-neutral-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:rotate-12 transition-transform">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-neutral-900">Education</h5>
                    </div>
                    <div className="space-y-4">
                        {structuredData?.education?.slice(0, 2).map((edu: any, idx: number) => (
                            <div key={idx} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                <Input
                                    label="Degree / Institution"
                                    value={`${edu.degree || ''} at ${edu.institutionName || ''}`}
                                    onChange={(e) => {
                                        // Simple split attempt for quick edit
                                        const [degree, institution] = e.target.value.split(' at ')
                                        const newEdu = [...structuredData.education]
                                        newEdu[idx].degree = degree || e.target.value
                                        newEdu[idx].institutionName = institution || ''
                                        setStructuredData({ ...structuredData, education: newEdu })
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Skills */}
                <Card className="p-6 border-neutral-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 group-hover:rotate-12 transition-transform">
                            <List className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-neutral-900">Skills</h5>
                    </div>
                    <Textarea
                        label="Top Skills (comma separated)"
                        rows={6}
                        value={Array.isArray(structuredData?.skills) ? structuredData.skills.join(', ') : (structuredData?.skills || '')}
                        onChange={(e) => setStructuredData({ ...structuredData, skills: e.target.value.split(',').map((s: string) => s.trim()) })}
                    />
                </Card>

                {/* Projects */}
                <Card className="p-6 border-neutral-200 shadow-sm relative overflow-hidden group md:col-span-2">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 group-hover:rotate-12 transition-transform">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-neutral-900">Projects</h5>
                    </div>
                    <div className="space-y-4">
                        {structuredData?.projects?.map((proj: any, idx: number) => (
                            <div key={idx} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                <Input
                                    label="Project Name"
                                    value={proj.projectName || ''}
                                    onChange={(e) => {
                                        const newProj = [...structuredData.projects]
                                        newProj[idx].projectName = e.target.value
                                        setStructuredData({ ...structuredData, projects: newProj })
                                    }}
                                    className="mb-3"
                                />
                                <Textarea
                                    label="Description"
                                    rows={2}
                                    value={proj.description || ''}
                                    onChange={(e) => {
                                        const newProj = [...structuredData.projects]
                                        newProj[idx].description = e.target.value
                                        setStructuredData({ ...structuredData, projects: newProj })
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Certifications & Languages */}
                <div className="grid grid-cols-1 gap-6 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 border-neutral-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:rotate-12 transition-transform">
                                    <Check className="w-5 h-5" />
                                </div>
                                <h5 className="font-bold text-neutral-900">Certifications</h5>
                            </div>
                            <Textarea
                                label="Certifications (comma separated)"
                                rows={4}
                                value={Array.isArray(structuredData?.certifications) ? structuredData.certifications.join(', ') : (structuredData?.certifications || '')}
                                onChange={(e) => setStructuredData({ ...structuredData, certifications: e.target.value.split(',').map((s: string) => s.trim()) })}
                            />
                        </Card>

                        <Card className="p-6 border-neutral-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 group-hover:rotate-12 transition-transform">
                                    <List className="w-5 h-5" />
                                </div>
                                <h5 className="font-bold text-neutral-900">Languages</h5>
                            </div>
                            <Textarea
                                label="Languages (comma separated)"
                                rows={4}
                                value={Array.isArray(structuredData?.languages) ? structuredData.languages.join(', ') : (structuredData?.languages || '')}
                                onChange={(e) => setStructuredData({ ...structuredData, languages: e.target.value.split(',').map((s: string) => s.trim()) })}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="px-10 py-8 border-b border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-black text-neutral-950 tracking-tight uppercase italic">
                                AI Resume Importer
                            </h2>
                        </div>
                        <p className="text-neutral-500 font-medium">
                            Import your existing resume and let AI do the heavy lifting.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-all shadow-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex w-full px-10 pt-8 gap-4">
                    {[
                        { id: 'upload', label: '1. Upload', active: step === 'upload', done: step !== 'upload' },
                        { id: 'review_text', label: '2. Extract', active: step === 'review_text', done: step === 'review_structured' },
                        { id: 'review_structured', label: '3. Structure', active: step === 'review_structured', done: false }
                    ].map((s) => (
                        <div key={s.id} className="flex-1 flex flex-col gap-2">
                            <div className={`h-1.5 rounded-full transition-all duration-500 ${s.active ? 'bg-primary-600 w-full' : s.done ? 'bg-emerald-500 w-full' : 'bg-neutral-100 w-full'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${s.active ? 'text-primary-600' : s.done ? 'text-emerald-500' : 'text-neutral-300'}`}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="px-10 pb-10">
                    {step === 'upload' && renderUploadStep()}
                    {step === 'review_text' && renderReviewTextStep()}
                    {step === 'review_structured' && renderReviewStructuredStep()}
                </div>

                {/* Footer buttons for going back if needed */}
                {step !== 'upload' && !isSaving && !isParsing && (
                    <div className="px-10 py-6 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between">
                        <button
                            onClick={() => setStep(step === 'review_structured' ? 'review_text' : 'upload')}
                            className="text-neutral-500 hover:text-neutral-900 font-bold text-sm flex items-center gap-2 px-4 py-2 hover:bg-white rounded-xl transition-all"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Back to previous step
                        </button>
                        <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest italic">
                            Clear Career Path AI Engine v1.2
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
