import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    theme?: 'standard' | 'gold'
}

export function ExecutiveTemplate({ data, className, theme = 'standard' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications } = data

    const isGold = theme === 'gold'
    const accentText = isGold ? 'text-amber-700' : 'text-neutral-900'
    const accentBorder = isGold ? 'border-amber-200' : 'border-neutral-300'
    const bg = isGold ? 'bg-amber-50/30' : 'bg-stone-50'

    return (
        <div className={cn("w-full text-neutral-900 min-h-[11in] shadow-sm p-16 font-serif", bg, className)}>
            {/* Centered Header */}
            <header className={cn("text-center border-b-2 pb-10 mb-12", accentBorder)}>
                <h1 className={cn("text-5xl font-bold uppercase tracking-widest mb-4", accentText)}>{personalInfo.fullName}</h1>
                <div className="text-xl text-neutral-600 mb-6 italic">{personalInfo.professionalTitle}</div>

                <div className="flex justify-center flex-wrap gap-6 text-sm font-medium text-neutral-500 uppercase tracking-wide">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    <span className="text-neutral-300">|</span>
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    <span className="text-neutral-300">|</span>
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedinUrl && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>LinkedIn</span>
                        </>
                    )}
                </div>
            </header>

            {/* Summary - Centered & Prominent */}
            {professionalSummary && (
                <section className="mb-12 max-w-3xl mx-auto text-center">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest mb-4 inline-block border-b-2 pb-1", accentBorder, accentText)}>Executive Profile</h2>
                    <p className="text-lg leading-relaxed text-neutral-700">{professionalSummary.summaryText}</p>
                </section>
            )}

            {/* Two Column Layout */}
            <div className="grid grid-cols-3 gap-12">
                {/* Main Column */}
                <div className="col-span-2 space-y-10">
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className={cn("text-xl font-bold uppercase tracking-widest mb-8 border-b border-neutral-200 pb-2", accentText)}>Professional Experience</h2>
                            <div className="space-y-8">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-bold text-neutral-900">{job.jobTitle}</h3>
                                            <span className="text-sm font-medium text-neutral-500 italic">
                                                {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        <div className="text-lg text-neutral-700 mb-4">{job.companyName}</div>
                                        <p className="text-neutral-600 mb-4 leading-relaxed">{job.roleDescription}</p>

                                        {job.achievements && (
                                            <ul className="list-disc ml-5 space-y-2 text-neutral-600 text-sm">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j}>{ach.achievementText}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="col-span-1 space-y-10 border-l border-neutral-200 pl-10">
                    {/* Core Competencies */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Core Competencies</h2>
                            <div className="flex flex-col gap-3">
                                {skills.map((skill, i) => (
                                    <div key={i} className="text-neutral-700 font-medium pb-2 border-b border-neutral-100 last:border-0">
                                        {skill.skillName}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900">{edu.institutionName}</div>
                                        <div className="text-sm text-neutral-600 italic mt-1">{edu.degree}</div>
                                        <div className="text-xs text-neutral-400 mt-1">{edu.endYear}</div>
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
