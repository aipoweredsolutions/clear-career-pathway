import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    theme?: 'sage' | 'terracotta' | 'slate'
}

export function ArtisanTemplate({ data, className, theme = 'sage' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications } = data

    const themeConfig = {
        sage: {
            accent: 'text-emerald-800',
            bg: 'bg-emerald-50/50',
            border: 'border-emerald-100',
            dot: 'bg-emerald-200'
        },
        terracotta: {
            accent: 'text-orange-900',
            bg: 'bg-orange-50/50',
            border: 'border-orange-100',
            dot: 'bg-orange-200'
        },
        slate: {
            accent: 'text-slate-800',
            bg: 'bg-slate-50',
            border: 'border-slate-200',
            dot: 'bg-slate-300'
        }
    }

    const activeTheme = themeConfig[theme]

    return (
        <div className={cn("w-full bg-white aspect-[210/297] p-16 font-serif text-slate-900 leading-relaxed", className)}>
            {/* Header - Simple & Clean */}
            <header className="mb-20 flex justify-between items-end border-b pb-12 border-slate-100">
                <div className="flex flex-col gap-2">
                    <h1 className={cn("text-6xl font-medium tracking-tight", activeTheme.accent)}>
                        {personalInfo.fullName}
                    </h1>
                    <p className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
                        {personalInfo.professionalTitle}
                    </p>
                </div>

                <div className="text-right font-sans text-xs font-bold text-slate-500 flex flex-col gap-1.5 uppercase tracking-widest">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                </div>
            </header>

            <div className="flex flex-col gap-20">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className="flex flex-col gap-6">
                        <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">About</div>
                        <p className="text-xl text-slate-700 font-medium leading-relaxed max-w-4xl">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Main Experience Flow - Offset Layout */}
                {workExperience && workExperience.length > 0 && (
                    <section className="flex flex-col gap-10">
                        <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-2">Experience</div>
                        <div className="flex flex-col gap-16">
                            {workExperience.map((job, i) => (
                                <div key={i} className="grid grid-cols-12 gap-8">
                                    {/* Left Side: Date/Company */}
                                    <div className="col-span-4 flex flex-col gap-1">
                                        <div className="text-sm font-sans font-black text-slate-400 tabular-nums uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                        <div className={cn("text-lg font-bold font-sans", activeTheme.accent)}>{job.companyName}</div>
                                    </div>

                                    {/* Right Side: Title/Description */}
                                    <div className="col-span-8 flex flex-col gap-4">
                                        <h3 className="text-2xl font-medium text-slate-900">{job.jobTitle}</h3>
                                        {job.roleDescription && (
                                            <p className="text-slate-600 leading-relaxed opacity-90">{job.roleDescription}</p>
                                        )}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="list-none flex flex-col gap-4 mt-2">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="flex gap-4 items-start text-slate-700">
                                                        <span className={cn("mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0", activeTheme.dot)}></span>
                                                        <span className="leading-relaxed opacity-90">{ach.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Bottom Sections Grid */}
                <div className="grid grid-cols-2 gap-20">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Education</div>
                            <div className="flex flex-col gap-8">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="font-medium text-slate-900 text-xl leading-tight">{edu.degree}</div>
                                        <div className="text-slate-500 font-sans text-xs font-bold uppercase tracking-widest mt-1">{edu.institutionName}</div>
                                        <div className="text-[10px] font-sans text-slate-300 font-black uppercase tracking-widest mt-1">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Expertise */}
                    {skills && skills.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Expertise</div>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-slate-800 font-sans font-bold text-sm uppercase tracking-wider">{skill.skillName}</span>
                                        <div className={cn("h-0.5 w-full rounded-full opacity-30", activeTheme.dot)}></div>
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
