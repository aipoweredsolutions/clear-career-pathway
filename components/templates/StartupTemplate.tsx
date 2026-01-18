import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Tailwind bg color for pills/accents
    theme?: 'vibrant-blue' | 'electric-purple' | 'cyber-lime'
}

export function StartupTemplate({ data, className, theme = 'vibrant-blue' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications } = data

    const themeConfig = {
        'vibrant-blue': {
            primary: 'bg-blue-600',
            secondary: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-200',
            accent: 'text-blue-600'
        },
        'electric-purple': {
            primary: 'bg-purple-600',
            secondary: 'bg-purple-50',
            text: 'text-purple-700',
            border: 'border-purple-200',
            accent: 'text-purple-600'
        },
        'cyber-lime': {
            primary: 'bg-lime-500',
            secondary: 'bg-lime-50',
            text: 'text-lime-700',
            border: 'border-lime-300',
            accent: 'text-lime-600'
        }
    }

    const activeTheme = themeConfig[theme]

    return (
        <div className={cn("w-full bg-white aspect-[210/297] grid grid-cols-12 font-sans text-slate-900", className)}>
            {/* Left Column - Main Content */}
            <div className="col-span-8 p-12 flex flex-col gap-10">
                <header>
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-2">
                        {personalInfo.fullName}
                    </h1>
                    <p className={cn("text-xl font-bold uppercase tracking-tight", activeTheme.accent)}>
                        {personalInfo.professionalTitle}
                    </p>

                    {professionalSummary?.summaryText && (
                        <p className="mt-6 text-slate-600 leading-relaxed text-lg font-medium">
                            {professionalSummary.summaryText}
                        </p>
                    )}
                </header>

                {workExperience && workExperience.length > 0 && (
                    <section className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">Experience</h2>
                            <div className={cn("flex-1 h-1", activeTheme.primary)}></div>
                        </div>

                        <div className="flex flex-col gap-10">
                            {workExperience.map((job, i) => (
                                <div key={i} className="flex flex-col gap-2 relative pl-6 border-l-2 border-slate-100">
                                    <div className={cn("absolute -left-[5px] top-2 w-2 h-2 rounded-full", activeTheme.primary)}></div>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-xl font-bold text-slate-900">{job.jobTitle}</h3>
                                        <span className="text-xs font-black text-slate-400 uppercase tabular-nums">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className={cn("text-md font-bold", activeTheme.text)}>{job.companyName}</div>
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-2 mt-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="pl-1">
                                                    {ach.achievementText}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Right Column - Sidebar */}
            <div className={cn("col-span-4 p-12 border-l border-slate-100 flex flex-col gap-12", activeTheme.secondary)}>
                {/* Contact Info */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Connect</h3>
                    <div className="flex flex-col gap-3 text-sm font-bold text-slate-700">
                        {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.location && <div>{personalInfo.location}</div>}
                        {personalInfo.linkedinUrl && <div className="text-blue-600">LinkedIn</div>}
                        {personalInfo.websiteUrl && <div className="text-blue-600">Portfolio</div>}
                    </div>
                </section>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section className="flex flex-col gap-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Stacks</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className={cn("px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-sm", activeTheme.primary)}>
                                    {skill.skillName}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section className="flex flex-col gap-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Learning</h3>
                        <div className="flex flex-col gap-6">
                            {education.map((edu, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="font-bold text-slate-900 text-sm leading-tight">{edu.degree}</div>
                                    <div className="text-slate-600 text-xs font-bold leading-tight">{edu.institutionName}</div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="flex flex-col gap-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Certificates</h3>
                        <div className="flex flex-col gap-4">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="font-bold text-slate-900 text-xs">{cert.certificationName}</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">{cert.issuer}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
