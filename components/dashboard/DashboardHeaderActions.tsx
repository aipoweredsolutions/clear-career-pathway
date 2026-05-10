'use client'

import React, { useState } from 'react'
import { Plus, FileText, Upload } from 'lucide-react'
import { ResumeUploadModal } from './ResumeUploadModal'
import { createResume } from '@/app/dashboard/actions'

export function DashboardHeaderActions() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    return (
        <div className="flex flex-wrap items-center gap-4">
            <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="group h-16 px-10 bg-white border-2 border-primary-100 text-primary-600 rounded-2xl hover:border-primary-600 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-900/5"
            >
                <Upload className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                Upload Resume
            </button>

            <form action={createResume.bind(null, 'resume')}>
                <button type="submit" className="group h-16 px-10 bg-white border-2 border-primary-100 text-primary-600 rounded-2xl hover:border-primary-600 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-900/5">
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 group-hover:scale-110" />
                    New Resume
                </button>
            </form>

            <form action={createResume.bind(null, 'cover_letter')}>
                <button type="submit" className="group h-16 px-10 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-600/30">
                    <FileText className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]" />
                    AI Cover Letter
                </button>
            </form>

            <form action={createResume.bind(null, 'references')}>
                <button type="submit" className="group h-16 px-8 bg-neutral-900 text-white rounded-2xl hover:bg-neutral-800 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-xl shadow-neutral-900/20">
                    <FileText className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]" />
                    References
                </button>
            </form>

            <ResumeUploadModal 
                isOpen={isUploadModalOpen} 
                onClose={() => setIsUploadModalOpen(false)} 
            />
        </div>
    )
}
