'use client'

import React, { useState, useEffect } from 'react'
import { 
    X, 
    Target, 
    Plus, 
    Loader2, 
    Building2, 
    Briefcase, 
    Link as LinkIcon, 
    FileText, 
    Calendar,
    StickyNote
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { createApplication, JobStatus } from '@/lib/supabase/tracker'
import { fetchUserDocuments } from '@/lib/supabase/documents'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface AddApplicationModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    initialData?: {
        resume_document_id?: string
        company_name?: string
        role_title?: string
    }
}

export function AddApplicationModal({ isOpen, onClose, onSuccess, initialData }: AddApplicationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [documents, setDocuments] = useState<any[]>([])
    const [formData, setFormData] = useState({
        company_name: initialData?.company_name || '',
        role_title: initialData?.role_title || '',
        job_url: '',
        status: 'saved' as JobStatus,
        applied_date: new Date().toISOString().split('T')[0],
        notes: '',
        resume_document_id: initialData?.resume_document_id || ''
    })

    useEffect(() => {
        if (isOpen) {
            loadDocuments()
            if (initialData) {
                setFormData(prev => ({
                    ...prev,
                    ...initialData
                }))
            }
        }
    }, [isOpen, initialData])

    async function loadDocuments() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const docs = await fetchUserDocuments(supabase, user.id)
            setDocuments(docs)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await createApplication({
                ...formData,
                resume_document_id: formData.resume_document_id || null,
                applied_date: formData.status === 'saved' ? null : formData.applied_date
            })
            toast.success('Application tracked successfully!')
            onSuccess()
            onClose()
            // Reset form
            setFormData({
                company_name: '',
                role_title: '',
                job_url: '',
                status: 'saved',
                applied_date: new Date().toISOString().split('T')[0],
                notes: '',
                resume_document_id: ''
            })
        } catch (error: any) {
            toast.error(error.message || 'Failed to track application.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-neutral-100">
                <div className="flex items-center justify-between p-8 border-b border-neutral-50 bg-neutral-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-200">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-neutral-900 tracking-tight">Track Application</h2>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-0.5">Add to your professional pipeline</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-xl transition text-neutral-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                <Building2 className="w-3 h-3" /> Company Name
                            </label>
                            <input 
                                type="text"
                                required
                                value={formData.company_name}
                                onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                                placeholder="e.g. Google, Stripe"
                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                <Briefcase className="w-3 h-3" /> Role Title
                            </label>
                            <input 
                                type="text"
                                required
                                value={formData.role_title}
                                onChange={(e) => setFormData({...formData, role_title: e.target.value})}
                                placeholder="e.g. Senior Software Engineer"
                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                <LinkIcon className="w-3 h-3" /> Job URL (Optional)
                            </label>
                            <input 
                                type="url"
                                value={formData.job_url}
                                onChange={(e) => setFormData({...formData, job_url: e.target.value})}
                                placeholder="https://careers.company.com/job/123"
                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                <Target className="w-3 h-3" /> Status
                            </label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as JobStatus})}
                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition appearance-none"
                            >
                                <option value="saved">Saved</option>
                                <option value="applied">Applied</option>
                                <option value="interviewing">Interviewing</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> Applied Date
                            </label>
                            <input 
                                type="date"
                                disabled={formData.status === 'saved'}
                                value={formData.applied_date}
                                onChange={(e) => setFormData({...formData, applied_date: e.target.value})}
                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition disabled:opacity-50"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Link Resume (Optional)
                            </label>
                            <select 
                                value={formData.resume_document_id}
                                onChange={(e) => setFormData({...formData, resume_document_id: e.target.value})}
                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition appearance-none"
                            >
                                <option value="">Select a document</option>
                                {documents.map(doc => (
                                    <option key={doc.id} value={doc.id}>{doc.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                <StickyNote className="w-3 h-3" /> Notes
                            </label>
                            <textarea 
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                placeholder="Add any details about the interview process, referral, or company research..."
                                className="w-full h-32 bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button 
                            type="button"
                            onClick={onClose}
                            variant="outline"
                            className="flex-1 h-14 rounded-xl border-neutral-100 text-neutral-500 font-black text-xs uppercase tracking-widest hover:bg-neutral-50"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 h-14 rounded-xl bg-primary-600 text-white font-black text-xs uppercase tracking-widest hover:bg-primary-700 shadow-2xl shadow-primary-200"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start Tracking'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
