import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    theme?: 'gray' | 'slate' | 'warm'
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
        }
    }

    const activeTheme = themeConfig[theme]

    return (
        <div className={cn("w-full bg-white aspect-[210/297] grid grid-cols-12 font-sans text-slate-900 overflow-hidden", className)}>
            {/* Sidebar - Minimal Contrast */}
            <div className={cn("col-span-4 p-10 flex flex-col gap-10 border-r", activeTheme.sidebar, activeTheme.border)}>
                {/* Contact */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Contact</h3>
                    <div className="flex flex-col gap-2 text-sm font-medium">
                        {personalInfo?.email && <div className="break-all">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.city && <div>{personalInfo.city}, {personalInfo.country}</div>}
                        {personalInfo?.linkedinUrl && <div className="text-slate-500 underline underline-offset-4">LinkedIn</div>}
                    </div>
                </section>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Expertise</h3>
                        <div className="flex flex-col gap-2">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-slate-700">{skill.skillName}</span>
                                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full", activeTheme.accent.replace('text-', 'bg-'))}
                                            style={{ width: skill.proficiencyLevel === 'expert' ? '100%' : skill.proficiencyLevel === 'advanced' ? '75%' : '50%' }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Education</h3>
                        <div className="flex flex-col gap-6">
                            {education.map((edu, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="font-bold text-slate-800 text-sm leading-tight">{edu.degree}</div>
                                    <div className="text-slate-500 text-xs font-medium">{edu.institutionName}</div>
                                    <div className="text-[10px] font-bold text-slate-400 mt-1">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Main Content */}
            <div className="col-span-8 p-12 flex flex-col gap-12">
                <header>
                    <h1 className="text-6xl font-black tracking-tighter text-slate-900 mb-2 leading-none">
                        {personalInfo?.fullName}
                    </h1>
                    <p className="text-xl font-medium text-slate-500 tracking-tight">
                        {personalInfo?.professionalTitle}
                    </p>
                </header>

                {professionalSummary?.summaryText && (
                    <section className="flex flex-col gap-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Statement</h2>
                        <p className="text-lg text-slate-700 leading-relaxed font-medium">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {workExperience && workExperience.length > 0 && (
                    <section className="flex flex-col gap-8">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Experience</h2>
                        <div className="flex flex-col gap-10">
                            {workExperience.map((job, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{job.jobTitle}</h3>
                                        <span className="text-xs font-bold text-slate-400 uppercase tabular-nums">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="text-base font-bold text-slate-500 italic">{job.companyName}</div>
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="flex flex-col gap-3 mt-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-slate-600 leading-relaxed pl-4 border-l-2 border-slate-100 italic">
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

                {projects && projects.length > 0 && (
                    <section className="flex flex-col gap-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Selected Work</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {projects.map((project, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="font-bold text-slate-900">{project.projectName}</div>
                                    <p className="text-xs text-slate-500 line-clamp-2">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
