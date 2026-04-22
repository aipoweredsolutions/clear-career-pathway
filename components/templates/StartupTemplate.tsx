import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Tailwind bg color for pills/accents
    theme?: 'vibrant-blue' | 'electric-purple' | 'cyber-lime' | 'black' | 'hot-pink'
}

export function StartupTemplate({ data, className, theme = 'vibrant-blue' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        projects,
        achievements,
        volunteerExperience,
        languages,
        publications,
        professionalAffiliations,
        references,
        additionalInfo
    } = data

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
        },
        'black': {
            primary: 'bg-neutral-900',
            secondary: 'bg-neutral-50',
            text: 'text-neutral-900',
            border: 'border-neutral-200',
            accent: 'text-neutral-950'
        },
        'hot-pink': {
            primary: 'bg-rose-500',
            secondary: 'bg-rose-50',
            text: 'text-rose-700',
            border: 'border-rose-200',
            accent: 'text-rose-600'
        }
    }

    const activeTheme = themeConfig[theme]

    return (
        <div className={cn("w-full bg-white min-h-[297mm] font-lato text-slate-900 flex flex-col", className)}>
            {/* High Impact Modern Header */}
            {/* Simple Header for ATS */}
            <header className={cn("p-12 border-b-8 shadow-sm", activeTheme.border)}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-2 leading-none">
                        {personalInfo?.fullName}
                    </h1>
                    <p className={cn("text-xl font-bold uppercase tracking-[0.3em]", activeTheme.accent)}>
                        {personalInfo?.professionalTitle}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-black uppercase tracking-widest text-slate-400 mt-6">
                        {personalInfo?.email && <div className="lowercase">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                        {personalInfo?.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
                    </div>
                </div>

                {professionalSummary?.summaryText && (
                    <div className="mt-12 border-l-8 pl-8 border-slate-100">
                        <p className="text-xl text-slate-700 leading-relaxed font-bold italic">
                            {professionalSummary.summaryText}
                        </p>
                    </div>
                )}
            </header>

            <main className="flex-1 p-12 space-y-20">
                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">
                            Core Arsenal
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((skill, i) => (
                                <span key={i} className={cn("px-5 py-2.5 rounded-xl border-2 text-sm font-black uppercase tracking-[0.2em]", activeTheme.border, activeTheme.accent)}>
                                    {skill.skillName}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-12">
                            The Journey
                        </h2>
                        <div className="space-y-16">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group border-l-4 border-slate-100 pl-12 pb-12 last:pb-0">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-6 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-3xl font-black text-slate-900 leading-none">{job.jobTitle}</h3>
                                            <div className={cn("text-xl font-black italic", activeTheme.accent)}>@{job.companyName}</div>
                                        </div>
                                        <div className="text-xs font-black text-slate-400 tabular-nums uppercase tracking-[0.3em] whitespace-nowrap">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && <p className="text-lg text-slate-500 font-bold mb-8 leading-relaxed italic">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc ml-6 space-y-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[15px] font-bold text-slate-700 leading-relaxed pl-2">
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

                {/* Integrated Secondary Sections Grid */}
                {/* Integrated Secondary Sections Stack */}
                <div className="flex flex-col gap-16 pt-16 border-t-[12px] border-slate-50">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Education</h2>
                            <div className="flex flex-col gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-2 border-l-4 border-slate-100 pl-8">
                                        <div className="text-2xl font-black text-slate-900 leading-none">{edu.degree}</div>
                                        <div className={cn("text-lg font-black uppercase tracking-widest", activeTheme.accent)}>{edu.institutionName}</div>
                                        <div className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] mt-4">Class of {edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Startup Wins / Achievements */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Scale Wins</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {achievements.map((ach, i) => (
                                    <div key={i} className="p-8 border-2 border-slate-100 rounded-3xl">
                                        <div className="font-black text-xl uppercase leading-tight text-slate-900 mb-2">{ach.achievementTitle}</div>
                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{ach.issuingBody}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Selected Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-12">Moonshots</h2>
                        <div className="flex flex-col gap-12">
                            {projects.map((project, i) => (
                                <div key={i} className="border-l-4 border-neutral-900 pl-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                                        <h4 className="text-3xl font-black tracking-tighter text-slate-900 leading-none">{project.projectName}</h4>
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">{project.startDate} — {project.endDate || 'Present'}</div>
                                    </div>
                                    <div className={cn("text-sm font-black uppercase mb-6 tracking-widest", activeTheme.accent)}>{project.role}</div>
                                    {project.description && <p className="text-[15px] font-medium text-slate-600 leading-relaxed mb-8">{project.description}</p>}
                                    {project.toolsUsed && project.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-3">
                                            {project.toolsUsed.map((tool, t) => (
                                                <span key={t} className="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 px-3 py-1 rounded-full">{tool}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className={cn("p-16 text-center text-[11px] font-black uppercase tracking-[1.5em] text-slate-300 mt-auto border-t border-slate-50 bg-slate-50/30", activeTheme.secondary)}>
                Startup Standard Evolution
            </footer>
        </div>
    )
}
