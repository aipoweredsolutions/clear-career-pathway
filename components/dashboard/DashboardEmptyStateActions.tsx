'use client'

import React, { useState } from 'react'
import { Plus, FileText, Upload, Sparkles } from 'lucide-react'
import { ResumeUploadModal } from './ResumeUploadModal'
import { createResume } from '@/app/dashboard/actions'
import { cn } from '@/lib/utils'

export function DashboardEmptyStateActions() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-3xl mx-auto">
            <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="group relative flex-1 h-20 bg-white border-2 border-neutral-100 rounded-3xl hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5 transition-all flex flex-col items-center justify-center gap-1"
            >
                <Upload className="w-6 h-6 text-neutral-400 group-hover:text-primary-500 transition-colors group-hover:-translate-y-1" />
                <span className="font-black text-[10px] uppercase tracking-widest text-neutral-600 group-hover:text-primary-700">Upload Existing</span>
            </button>
            
            <form action={createResume.bind(null, 'resume')} className="flex-1">
                <button type="submit" className="group relative w-full h-20 bg-neutral-900 border-2 border-neutral-900 rounded-3xl hover:bg-neutral-800 hover:border-neutral-800 transition-all flex flex-col items-center justify-center gap-1 shadow-2xl shadow-neutral-900/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Plus className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    <span className="font-black text-[10px] uppercase tracking-widest text-white">Create New Resume</span>
                </button>
            </form>
            
            <form action={createResume.bind(null, 'cover_letter')} className="flex-1">
                <button type="submit" className="group relative w-full h-20 bg-primary-600 border-2 border-primary-600 rounded-3xl hover:bg-primary-500 hover:border-primary-500 transition-all flex flex-col items-center justify-center gap-1 shadow-2xl shadow-primary-600/30 overflow-hidden">
                    <Sparkles className="absolute top-2 right-2 w-4 h-4 text-primary-300 animate-pulse" />
                    <FileText className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
                    <span className="font-black text-[10px] uppercase tracking-widest text-white">AI Cover Letter</span>
                </button>
            </form>

            <ResumeUploadModal 
                isOpen={isUploadModalOpen} 
                onClose={() => setIsUploadModalOpen(false)} 
            />
        </div>
    )
}
