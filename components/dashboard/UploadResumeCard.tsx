'use client'

import React, { useState } from 'react'
import { Upload, Sparkles } from 'lucide-react'
import { ResumeUploadModal } from './ResumeUploadModal'

export function UploadResumeCard() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="w-full h-full min-h-[250px] flex flex-col items-center justify-center bg-white border-2 border-dashed border-neutral-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group cursor-pointer relative overflow-hidden"
            >
                {/* Decorative background element */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-100/30 rounded-full blur-3xl group-hover:bg-primary-200/50 transition-all" />

                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:rotate-12">
                    <Upload className="w-8 h-8 text-primary-600" />
                </div>

                <div className="text-center px-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="font-semibold text-neutral-900">Upload Existing Resume</span>
                        <Sparkles className="w-4 h-4 text-primary-500 animate-pulse" />
                    </div>
                    <span className="text-sm text-neutral-500">PDF or DOCX • AI Powered Extraction</span>
                </div>

                {/* Visual badge/indicator */}
                <div className="mt-6 px-3 py-1 bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Recommended ✨
                </div>
            </div>

            <ResumeUploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
