import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSMinimalTemplate({ data, className }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        projects
    } = data

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] p-10 text-neutral-900 font-sans leading-tight",
            className
        )}>
            {/* Minimal Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-light tracking-tight mb-1">
                    {personalInfo?.fullName?.toUpperCase()}
                </h1>
                <div className="flex gap-4 text-[10px] text-neutral-500 font-medium uppercase tracking-widest">
                    <span>{personalInfo?.email}</span>
                    <span>/</span>
                    <span>{personalInfo?.phone}</span>
                    <span>/</span>
                    <span>{personalInfo?.city}</span>
                </div>
            </header>

            <div className="space-y-8">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <p className="text-xs text-neutral-600 leading-relaxed uppercase tracking-wide">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Main Content Sections */}
                <div className="space-y-8">
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Experience</h2>
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-end mb-1">
                                            <h3 className="text-sm font-bold text-neutral-800">{job.jobTitle}</h3>
                                            <span className="text-[10px] font-bold text-neutral-400">{job.startDate} — {job.isCurrent ? 'Current' : job.endDate}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-primary-600 mb-2">{job.companyName.toUpperCase()}</div>
                                        <p className="text-xs text-neutral-600 mb-2 leading-relaxed">{job.roleDescription}</p>
                                        {job.achievements && (
                                            <div className="space-y-1">
                                                {job.achievements.map((a, j) => (
                                                    <div key={j} className="text-xs text-neutral-600 flex gap-2">
                                                        <span className="text-neutral-300">•</span>
                                                        <span>{a.achievementText}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-end mb-1">
                                            <h3 className="text-xs font-bold text-neutral-800">{edu.degree}</h3>
                                            <span className="text-[10px] font-bold text-neutral-400">{edu.endYear}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-neutral-500 italic">{edu.institutionName}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Core Competencies</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {skills.map((s, i) => (
                                    <div key={i} className="text-[10px] font-bold text-neutral-600 border-l border-neutral-100 pl-2">
                                        {s.skillName}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
