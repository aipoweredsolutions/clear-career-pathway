import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    theme?: 'gray' | 'slate' | 'warm' | 'black' | 'navy'
}

export function SplitContrastTemplate({ data, className, theme = 'gray' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, projects } = data

    const themeConfig = {
        gray: {
            sidebar: 'bg-neutral-50',
            accent: 'text-neutral-900',
            border: 'border-neutral-200'
        },
        slate: {
            sidebar: 'bg-slate-50',
            accent: 'text-slate-900',
            border: 'border-slate-200'
        },
        warm: {
            sidebar: 'bg-stone-50',
            accent: 'text-stone-900',
            border: 'border-stone-200'
        },
        black: {
            sidebar: 'bg-neutral-900',
            accent: 'text-neutral-50',
            border: 'border-neutral-800'
        },
        navy: {
            sidebar: 'bg-slate-900',
            accent: 'text-slate-50',
            border: 'border-slate-800'
        }
    }

    const activeTheme = themeConfig[theme]

    return (
        <div className={cn("w-full bg-white min-h-[297mm] font-sans text-slate-900 flex flex-col", className)}>
            {/* High Impact Header */}
            {/* Simple Header for ATS */}
            <header className={cn("p-12 border-b-8 shadow-sm flex flex-col gap-6", activeTheme.sidebar, activeTheme.border)}>
                <div className="flex-1">
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4 leading-none uppercase">
                        {personalInfo?.fullName}
                    </h1>
                    <p className="text-2xl font-bold text-slate-500 tracking-widest uppercase">
                        {personalInfo?.professionalTitle}
                    </p>
                </div>
                
                {/* Integrated Contact Info */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-black uppercase tracking-widest text-slate-400 shrink-0">
                    {personalInfo?.email && <div className="lowercase">{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo?.city && <div>{personalInfo.city}, {personalInfo.country}</div>}
                    {personalInfo?.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
                </div>
            </header>

            <main className="flex-1 p-12 space-y-16">
                {/* Statement */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Expert Statement</h2>
                        <p className="text-2xl text-slate-800 leading-snug font-black border-l-8 pl-10 border-slate-100 italic">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Expertise & Skills - Horizontal Cloud for space efficiency but vertical parsing */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Core Expertise</h2>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((skill, i) => (
                                <div key={i} className={cn("px-6 py-3 rounded-full border-2 text-xs font-black uppercase tracking-widest transition-transform hover:-translate-y-1", activeTheme.border, activeTheme.accent)}>
                                    {skill.skillName}
                                    <span className="ml-3 opacity-30">/</span>
                                    <span className="ml-3 opacity-50">{skill.proficiencyLevel}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-12">Professional Journey</h2>
                        <div className="space-y-16">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-6 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">{job.jobTitle}</h3>
                                            <div className="text-xl font-bold text-slate-500 italic uppercase tracking-wide">{job.companyName}</div>
                                        </div>
                                        <div className="text-sm font-black text-white px-5 py-2 bg-neutral-900 rounded-full tabular-nums uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>
                                    
                                    {job.roleDescription && <p className="text-lg text-slate-700 font-medium mb-8 leading-relaxed italic opacity-80">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc ml-8 space-y-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-slate-600 leading-relaxed text-sm font-bold pl-2">
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

                {/* Unified Footer Stats - Projects & Education */}
                <div className="flex flex-col gap-16 pt-16 border-t-8 border-slate-50">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Academic Foundation</h2>
                            <div className="flex flex-col gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">{edu.degree}</div>
                                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{edu.institutionName}</div>
                                        <div className="text-[11px] font-black text-slate-300 mt-2 uppercase tabular-nums">Completed {edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Selected Work */}
                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Signature Projects</h2>
                            <div className="flex flex-col gap-10">
                                {projects.map((project, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">{project.projectName}</div>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed italic">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            
            <footer className={cn("p-12 text-center text-[11px] font-black uppercase tracking-[1em] text-slate-400 mt-auto", activeTheme.sidebar)}>
                Split Contrast Standard
            </footer>
        </div>
    )
}
