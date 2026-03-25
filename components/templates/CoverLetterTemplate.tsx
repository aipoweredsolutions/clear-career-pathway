'use client'

import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface CoverLetterTemplateProps {
    data: ResumeDocument
    className?: string
}

export function CoverLetterTemplate({ data, className }: CoverLetterTemplateProps) {
    const { personalInfo, coverLetter } = data

    if (!coverLetter) return null

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className={cn("p-12 bg-white text-neutral-900 font-serif", className)}>
            {/* Header - Reuse the personal info style */}
            <div className="mb-12 border-b-2 border-neutral-900 pb-8">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{personalInfo?.fullName}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-neutral-600 uppercase tracking-widest">
                    <span>{personalInfo?.email}</span>
                    <span>{personalInfo?.phone}</span>
                    {personalInfo?.location && <span>{personalInfo.location}</span>}
                    {personalInfo?.linkedinUrl && <span>LinkedIn</span>}
                </div>
            </div>

            {/* Date and Recipient */}
            <div className="mb-10 space-y-1 text-base">
                <p className="font-bold text-neutral-400 mb-6">{today}</p>

                {coverLetter.recipientName && <p className="font-bold">{coverLetter.recipientName}</p>}
                {coverLetter.recipientTitle && <p className="text-neutral-600">{coverLetter.recipientTitle}</p>}
                {coverLetter.companyName && <p className="font-bold">{coverLetter.companyName}</p>}
                {coverLetter.companyAddress && <p className="text-neutral-600">{coverLetter.companyAddress}</p>}
            </div>

            {/* Subject Line */}
            <div className="mb-8">
                <p className="font-black text-lg uppercase tracking-tight">
                    Re: {coverLetter.jobTitle || 'Application'} Position
                </p>
            </div>

            {/* Salutation */}
            <div className="mb-6">
                <p className="text-lg">
                    Dear {coverLetter.recipientName || 'Hiring Manager'},
                </p>
            </div>

            {/* Body Content */}
            <div className="prose prose-neutral max-w-none mb-12">
                {coverLetter.content?.split('\n').map((para, i) => (
                    <p key={i} className="text-lg leading-relaxed mb-4 text-justify">
                        {para}
                    </p>
                )) || (
                        <p className="text-neutral-400 italic">Your AI-generated cover letter will appear here...</p>
                    )}
            </div>

            {/* Closing */}
            <div className="mt-12 space-y-8">
                <p className="text-lg">Sincerely,</p>
                <div>
                    <p className="text-2xl font-serif italic mb-1">{personalInfo?.fullName}</p>
                    <div className="h-px w-48 bg-neutral-900 mb-2" />
                    <p className="font-bold uppercase tracking-widest text-sm">{personalInfo?.fullName}</p>
                </div>
            </div>
        </div>
    )
}
