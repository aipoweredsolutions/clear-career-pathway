'use client'

import React, { useState } from 'react'
import { 
    MoreVertical, 
    ArrowRight, 
    ArrowLeft, 
    FileText, 
    ExternalLink, 
    Calendar,
    ChevronDown,
    ChevronUp,
    Edit3,
    Trash2,
    Link as LinkIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { JobApplication, JobStatus, updateApplicationStatus, deleteApplication } from '@/lib/supabase/tracker'
import { templateRegistry } from '@/lib/templates/registry'
import { toast } from 'sonner'
import Link from 'next/link'

interface Column {
    id: JobStatus
    title: string
    color: string
}

const COLUMNS: Column[] = [
    { id: 'saved', title: 'Saved', color: 'bg-neutral-100 text-neutral-500' },
    { id: 'applied', title: 'Applied', color: 'bg-blue-50 text-blue-600' },
    { id: 'interviewing', title: 'Interviewing', color: 'bg-amber-50 text-amber-600' },
    { id: 'offer', title: 'Offer', color: 'bg-emerald-50 text-emerald-600' },
    { id: 'rejected', title: 'Rejected', color: 'bg-rose-50 text-rose-400' },
]

export function JobTrackerBoard({ 
    applications, 
    onUpdate 
}: { 
    applications: JobApplication[]
    onUpdate: () => void 
}) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    async function handleStatusMove(id: string, newStatus: JobStatus) {
        try {
            await updateApplicationStatus(id, newStatus)
            onUpdate()
            toast.success(`Moved to ${newStatus}`)
        } catch (error) {
            toast.error('Failed to update status.')
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to remove this application?')) return
        try {
            await deleteApplication(id)
            onUpdate()
            toast.success('Application removed.')
        } catch (error) {
            toast.error('Failed to delete application.')
        }
    }

    const getTemplateColor = (templateId?: string) => {
        if (!templateId) return '#e5e7eb' // Gray-200
        const template = templateRegistry.find(t => t.id === templateId)
        return template?.colors?.[0]?.hex || '#e5e7eb'
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
            {COLUMNS.map((column) => (
                <div key={column.id} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">{column.title}</h3>
                            <span className="bg-neutral-200 text-neutral-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {applications.filter(a => a.status === column.id).length}
                            </span>
                        </div>
                        <div className={cn("w-2 h-2 rounded-full", column.color.split(' ')[0])} />
                    </div>

                    <div className="flex flex-col gap-4">
                        {applications
                            .filter(a => a.status === column.id)
                            .map((app) => (
                                <div 
                                    key={app.id}
                                    className={cn(
                                        "group bg-white rounded-2xl border border-neutral-100 shadow-lg shadow-neutral-200/20 hover:shadow-xl hover:shadow-neutral-200/40 transition-all overflow-hidden",
                                        expandedId === app.id && "ring-2 ring-primary-500 border-transparent shadow-2xl"
                                    )}
                                >
                                    {/* Card Header */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-4">
                                            <div 
                                                className="w-10 h-12 rounded-lg border border-neutral-100 shadow-sm shrink-0" 
                                                style={{ backgroundColor: getTemplateColor(app.documents?.template_id) }}
                                            />
                                            <div className="flex items-center gap-1">
                                                {column.id !== 'saved' && (
                                                    <button 
                                                        onClick={() => {
                                                            const prevStatus = COLUMNS[COLUMNS.findIndex(c => c.id === column.id) - 1]?.id
                                                            if (prevStatus) handleStatusMove(app.id, prevStatus)
                                                        }}
                                                        className="p-1.5 hover:bg-neutral-50 rounded-lg text-neutral-300 hover:text-neutral-600 transition disabled:opacity-0"
                                                    >
                                                        <ArrowLeft className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => {
                                                        const nextStatus = COLUMNS[COLUMNS.findIndex(c => c.id === column.id) + 1]?.id
                                                        if (nextStatus) handleStatusMove(app.id, nextStatus)
                                                    }}
                                                    disabled={column.id === 'rejected' || column.id === 'offer'}
                                                    className="p-1.5 hover:bg-neutral-50 rounded-lg text-neutral-300 hover:text-neutral-600 transition disabled:opacity-0"
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <h4 className="font-black text-neutral-950 tracking-tight leading-tight truncate">{app.company_name}</h4>
                                            <p className="text-xs font-bold text-neutral-500 truncate">{app.role_title}</p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400">
                                                <Calendar className="w-3 h-3" />
                                                {app.applied_date ? new Date(app.applied_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Saved'}
                                            </div>
                                            <button 
                                                onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                                                className="p-2 hover:bg-neutral-50 rounded-xl transition text-neutral-400 hover:text-primary-600"
                                            >
                                                {expandedId === app.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    {expandedId === app.id && (
                                        <div className="px-5 pb-5 pt-2 border-t border-neutral-50 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {app.notes && (
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Notes</p>
                                                    <p className="text-xs text-neutral-600 leading-relaxed font-medium bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                                                        {app.notes}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-2 gap-3">
                                                {app.job_url && (
                                                    <a 
                                                        href={app.job_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-50 text-neutral-600 text-xs font-black hover:bg-neutral-100 transition"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                        Job Link
                                                    </a>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(app.id)}
                                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-500 text-xs font-black hover:bg-rose-100 transition"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    Remove
                                                </button>
                                            </div>

                                            {app.resume_document_id && (
                                                <Link 
                                                    href={`/studio/${app.resume_document_id}`}
                                                    className="flex items-center justify-center gap-3 w-full h-12 rounded-xl bg-primary-600 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-700 transition shadow-lg shadow-primary-200"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                    Edit Linked Resume
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        
                        {applications.filter(a => a.status === column.id).length === 0 && (
                            <div className="border-2 border-dashed border-neutral-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center opacity-40">
                                <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Empty</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
