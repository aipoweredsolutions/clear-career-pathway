'use client'

import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { FileText, MoreVertical, Trash2, Edit, Calendar, Plus, Copy, Globe, Shield } from 'lucide-react'
import { ResumeDocument } from '@/lib/types/resume'
import { deleteResume, createResume, duplicateResume, toggleResumeStatus } from '@/app/dashboard/actions'
import { UploadResumeCard } from './UploadResumeCard'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ResumeGridProps {
    resumes: ResumeDocument[]
}

export function ResumeGrid({ resumes }: ResumeGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Card */}
            <form action={async (formData: FormData) => { await createResume('resume') }}>
                <button
                    type="submit"
                    className="w-full h-full min-h-[250px] flex flex-col items-center justify-center bg-white border-2 border-dashed border-neutral-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group cursor-pointer"
                >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="w-8 h-8 text-primary-600" />
                    </div>
                    <span className="font-semibold text-neutral-900">Create New Resume</span>
                    <span className="text-sm text-neutral-500 mt-1">Start from scratch</span>
                </button>
            </form>

            {/* AI Upload Card */}
            <UploadResumeCard />

            {resumes.map((resume) => (
                <div key={resume.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                    {/* Card Preview Area */}
                    <div className="h-40 bg-neutral-100 relative group border-b border-neutral-100">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {resume.documentType === 'cover_letter' ? (
                                <Edit className="w-12 h-12 text-primary-200" />
                            ) : (
                                <FileText className="w-12 h-12 text-neutral-300" />
                            )}
                        </div>
                        {/* Overlay */}
                        <Link href={`/editor/${resume.id}`} className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-white text-neutral-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                                Open Editor
                            </span>
                        </Link>
                        {resume.documentType === 'cover_letter' && (
                            <div className="absolute top-3 left-3 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg">
                                Cover Letter
                            </div>
                        )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-[0.1em] px-1.5 py-0.5 rounded",
                                    resume.isPublished ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                                )}>
                                    {resume.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-neutral-900 truncate pr-2" title={resume.title}>
                                {resume.title || (resume.documentType === 'cover_letter' ? 'Untitled Cover Letter' : 'Untitled Resume')}
                            </h3>
                            {/* Simple Delete Button (Form) */}
                            <form action={async (formData: FormData) => { await deleteResume(resume.id || '') }}>
                                <button type="submit" className="text-neutral-400 hover:text-red-600 transition-colors p-1" title="Delete Resume">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </form>
                            {/* Duplicate Button */}
                            <button 
                                onClick={async () => {
                                    toast.promise(duplicateResume(resume.id || ''), {
                                        loading: 'Duplicating document...',
                                        success: (result) => {
                                            if (result.success) return 'Document duplicated!'
                                            throw new Error(result.error || 'Failed to duplicate')
                                        },
                                        error: (err) => err.message
                                    })
                                }}
                                className="text-neutral-400 hover:text-primary-600 transition-colors p-1" 
                                title="Duplicate Resume"
                            >
                                <Copy className="w-4 h-4" />
                            </button>

                            {/* Status Toggle */}
                            <button 
                                onClick={async () => {
                                    const nextStatus = !resume.isPublished
                                    toast.promise(toggleResumeStatus(resume.id || '', !!resume.isPublished), {
                                        loading: 'Updating status...',
                                        success: nextStatus ? 'Set to Published!' : 'Set to Draft!',
                                        error: 'Failed to update status'
                                    })
                                }}
                                className={cn(
                                    "transition-colors p-1",
                                    resume.isPublished ? "text-green-500 hover:text-green-700" : "text-neutral-400 hover:text-neutral-600"
                                )}
                                title={resume.isPublished ? 'Set to Draft' : 'Mark as Final/Published'}
                            >
                                {resume.isPublished ? <Globe className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                            </button>
                        </div>

                        <p className="text-sm text-neutral-500 mb-4 flex-1">
                            {resume.documentType === 'cover_letter'
                                ? (resume.coverLetter?.jobTitle || 'No Job Title Specified')
                                : `${resume.personalInfo?.fullName || 'No Name'} • ${resume.templateId || 'Classic'}`}
                        </p>

                        <div className="flex justify-between items-center text-xs text-neutral-400 pt-4 border-t border-neutral-100 mt-auto">
                            <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {resume.updatedAt ? formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true }) : 'Just now'}
                            </span>
                            <Link href={`/editor/${resume.id}`} className="text-primary-600 font-medium hover:underline flex items-center">
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
