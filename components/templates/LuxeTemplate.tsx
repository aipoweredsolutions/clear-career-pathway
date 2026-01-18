import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Expecting color class like 'border-amber-500' or 'text-amber-600'
    theme?: 'gold' | 'emerald' | 'charcoal'
}

export function LuxeTemplate({ data, className, theme = 'gold' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications } = data

    const themeColors = {
        gold: {
            text: 'text-amber-700',
            border: 'border-amber-200',
            bg: 'bg-amber-50/50',
            accent: 'text-amber-600'
        },
        emerald: {
            text: 'text-emerald-800',
            border: 'border-emerald-200',
            bg: 'bg-emerald-50/30',
            accent: 'text-emerald-700'
        },
        charcoal: {
            text: 'text-slate-800',
            border: 'border-slate-200',
            bg: 'bg-slate-50',
            accent: 'text-slate-600'
        }
    }

    const activeTheme = themeColors[theme]

    return (
        <div className={cn("w-full bg-white aspect-[210/297] p-16 text-slate-900 font-serif leading-relaxed", className)}>
            {/* Elegant Header - Centered */}
            <header className="flex flex-col items-center text-center mb-16">
                <h1 className={cn("text-5xl font-medium tracking-tight mb-4", activeTheme.text)}>
                    {personalInfo?.fullName}
                </h1>

                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm font-sans uppercase tracking-[0.2em] text-slate-500">
                    <span>{personalInfo?.professionalTitle}</span>
                    {personalInfo?.email && (
                        <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="lowercase font-normal tracking-normal">{personalInfo.email}</span>
                        </>
                    )}
                    {personalInfo?.phone && (
                        <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {personalInfo?.location && (
                        <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{personalInfo.location}</span>
                        </>
                    )}
                </div>

                <div className={cn("w-32 h-px mt-8", activeTheme.border, "border-b-2")}></div>
            </header>

            <div className="flex flex-col gap-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className="flex flex-col items-center text-center px-12">
                        <p className="text-lg text-slate-700 italic leading-relaxed max-w-3xl">
                            "{professionalSummary.summaryText}"
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section className="flex flex-col gap-8">
                        <div className="flex items-center gap-6">
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap", activeTheme.accent)}>
                                Professional Experience
                            </h2>
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b")}></div>
                        </div>

                        <div className="flex flex-col gap-10">
                            {workExperience.map((job, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="flex justify-between items-baseline">
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-medium text-slate-900">{job.jobTitle}</h3>
                                            <div className="text-md font-sans font-semibold text-slate-600 uppercase tracking-wider mt-1">{job.companyName}</div>
                                        </div>
                                        <span className="text-sm font-sans font-bold text-slate-400 uppercase tracking-widest tabular-nums italic">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    <p className="text-slate-600 leading-relaxed max-w-prose italic opacity-90">{job.roleDescription}</p>

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-none flex flex-col gap-3 mt-1">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-4 items-start text-slate-700">
                                                    <span className={cn("mt-2.5 w-1.5 h-1.5 rotate-45 flex-shrink-0", activeTheme.border, "border")}></span>
                                                    <span className="leading-relaxed">{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-16">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section className="flex flex-col gap-6">
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", activeTheme.accent)}>
                                Education
                            </h2>
                            <div className="flex flex-col gap-6">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="font-medium text-slate-900 text-lg leading-tight">{edu.degree}</div>
                                        <div className="text-slate-600 font-sans text-sm font-medium uppercase tracking-wide">{edu.institutionName}</div>
                                        <div className="text-xs font-sans text-slate-400 font-bold uppercase tracking-widest mt-1">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section className="flex flex-col gap-6">
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", activeTheme.accent)}>
                                Expertise
                            </h2>
                            <div className="grid grid-cols-1 gap-2">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex items-center gap-3 py-1 border-b border-slate-50">
                                        <span className="text-slate-800 font-medium">{skill.skillName}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="flex flex-col gap-6">
                        <div className="flex items-center gap-6">
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b")}></div>
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap", activeTheme.accent)}>
                                Certifications & Affiliations
                            </h2>
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b")}></div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="font-medium text-slate-900">{cert.certificationName}</div>
                                    <div className="text-xs font-sans text-slate-400 font-bold uppercase tracking-tight mt-1">{cert.issuer} • {cert.issueDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
