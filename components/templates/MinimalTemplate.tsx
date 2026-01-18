import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function MinimalTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills } = data

    return (
        <div className={cn("w-full bg-white aspect-[210/297] p-16 font-sans flex flex-col items-center text-center", className)}>
            {/* Centered Header with minimal styling */}
            <header className="mb-12 max-w-2xl w-full border-b border-neutral-100 pb-8">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">{personalInfo.fullName}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedinUrl && <span>LinkedIn</span>}
                </div>
            </header>

            {/* Content Flow - Single Column, Centered Max Width */}
            <div className="w-full max-w-2xl space-y-12 text-left">
                {professionalSummary && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4", accentColor)}>About</h2>
                        <p className="text-neutral-600 leading-relaxed">{professionalSummary.summaryText}</p>
                    </section>
                )}

                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-6", accentColor)}>Experience</h2>
                        <div className="space-y-10">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-neutral-900">{job.companyName}</h3>
                                        <span className="text-xs text-neutral-400 tabular-nums">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-neutral-500 mb-3">{job.jobTitle}</div>
                                    <p className="text-sm text-neutral-600 leading-relaxed">{job.roleDescription}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills && skills.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-4", accentColor)}>Skills</h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
                            {skills.map((skill, i) => (
                                <span key={i}>{skill.skillName}</span>
                            ))}
                        </div>
                    </section>
                )}

                {education && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-widest mb-6", accentColor)}>Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="font-bold text-neutral-900 text-sm">{edu.institutionName}</div>
                                    <div className="text-sm text-neutral-500">{edu.degree}</div>
                                    <div className="text-xs text-neutral-400 mt-1">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
