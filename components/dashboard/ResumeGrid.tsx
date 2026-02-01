import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { FileText, MoreVertical, Trash2, Edit, Calendar, Plus } from 'lucide-react'
import { ResumeDocument } from '@/lib/types/resume'
import { deleteResume, createResume } from '@/app/dashboard/actions'

interface ResumeGridProps {
    resumes: ResumeDocument[]
}

export function ResumeGrid({ resumes }: ResumeGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Card */}
            <form action={createResume}>
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

            {resumes.map((resume) => (
                <div key={resume.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                    {/* Card Preview Area */}
                    <div className="h-40 bg-neutral-100 relative group border-b border-neutral-100">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FileText className="w-12 h-12 text-neutral-300" />
                        </div>
                        {/* Overlay */}
                        <Link href={`/editor/${resume.id}`} className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-white text-neutral-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                                Open Editor
                            </span>
                        </Link>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-neutral-900 truncate pr-2" title={resume.title}>
                                {resume.title || 'Untitled Resume'}
                            </h3>
                            {/* Simple Delete Button (Form) */}
                            <form action={deleteResume.bind(null, resume.id || '')}>
                                <button type="submit" className="text-neutral-400 hover:text-red-600 transition-colors p-1" title="Delete Resume">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        <p className="text-sm text-neutral-500 mb-4 flex-1">
                            {resume.personalInfo?.fullName || 'No Name'} • {resume.templateId || 'Classic'}
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
