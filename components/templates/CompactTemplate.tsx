import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function CompactTemplate({ data, className, accentColor = 'bg-neutral-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills } = data

    return (
        <div className={cn("w-full bg-white aspect-[210/297] p-8 font-sans text-sm", className)}>
            {/* Compact Header */}
            <header className="flex justify-between items-end border-b-2 border-neutral-900 pb-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 uppercase tracking-tight leading-none">{personalInfo.fullName}</h1>
                    <p className="text-neutral-500 font-medium mt-1">{personalInfo.professionalTitle}</p>
                </div>
                <div className="text-right text-xs text-neutral-500 space-y-1">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Column (Main) */}
                <div className="col-span-8 space-y-6">
                    {professionalSummary && (
                        <section>
                            <h2 className="text-sm font-bold uppercase border-b border-neutral-200 pb-1 mb-2">Profile</h2>
                            <p className="text-neutral-700 leading-snug">{professionalSummary.summaryText}</p>
                        </section>
                    )}

                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase border-b border-neutral-200 pb-1 mb-3">Experience</h2>
                            <div className="space-y-4">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline font-bold text-neutral-900">
                                            <span>{job.jobTitle}</span>
                                            <span className="text-xs font-normal text-neutral-500">{job.startDate} - {job.isCurrent ? 'Pres' : job.endDate}</span>
                                        </div>
                                        <div className="text-xs text-neutral-600 mb-1 font-medium">{job.companyName}</div>
                                        <p className="text-neutral-700 leading-snug text-xs">{job.roleDescription}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar) */}
                <div className="col-span-4 space-y-6">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase border-b border-neutral-200 pb-1 mb-2">Skills</h2>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((skill, i) => (
                                    <span key={i} className={cn("text-[10px] text-white px-2 py-0.5 rounded-sm", accentColor)}>
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && (
                        <section>
                            <h2 className="text-sm font-bold uppercase border-b border-neutral-200 pb-1 mb-2">Education</h2>
                            <div className="space-y-3">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900">{edu.institutionName}</div>
                                        <div className="text-xs text-neutral-500">{edu.degree}</div>
                                        <div className="text-[10px] text-neutral-400 mt-0.5">{edu.endYear}</div>
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
