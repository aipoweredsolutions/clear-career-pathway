'use client'

import React, { useState } from 'react'
import { Plus, FileText, Upload } from 'lucide-react'
import { ResumeUploadModal } from './ResumeUploadModal'
import { createResume } from '@/app/dashboard/actions'

export function DashboardEmptyStateActions() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="h-16 px-10 bg-white border-2 border-primary-600 text-primary-600 rounded-2xl hover:bg-primary-50 transition-all font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
            >
                <Upload className="w-5 h-5" />
                Upload Existing Resume
            </button>
            
            <form action={createResume.bind(null, 'resume')}>
                <button type="submit" className="h-16 px-10 bg-white border-2 border-neutral-200 text-neutral-900 rounded-2xl hover:border-primary-600 transition-all font-black text-xs uppercase tracking-widest shadow-xl">
                    Create First Resume
                </button>
            </form>
            
            <form action={createResume.bind(null, 'cover_letter')}>
                <button type="submit" className="h-16 px-10 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-600/30">
                    AI Cover Letter
                </button>
            </form>

            <ResumeUploadModal 
                isOpen={isUploadModalOpen} 
                onClose={() => setIsUploadModalOpen(false)} 
            />
        </div>
    )
}
