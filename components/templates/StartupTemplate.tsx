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
            <header className={cn("p-12 relative overflow-hidden", activeTheme.secondary)}>
                <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
                    <div className={cn("w-96 h-96 rounded-full blur-3xl", activeTheme.primary)} />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div className="flex-1">
                        <h1 className="text-7xl font-black tracking-normal text-slate-900 mb-4 leading-none">
                            {personalInfo?.fullName}
                        </h1>
                        <p className={cn("text-2xl font-black uppercase tracking-[0.3em]", activeTheme.accent)}>
                            {personalInfo?.professionalTitle}
                        </p>
                    </div>

                    {/* Minimalist Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-xs font-black uppercase tracking-widest text-slate-500 shrink-0">
                        {personalInfo?.email && <div className="flex items-center gap-3 lowercase truncate shrink-0 max-w-[200px]">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-3">{personalInfo.phone}</div>}
                        {personalInfo?.location && <div className="flex items-center gap-3">{personalInfo.location}</div>}
                        {personalInfo?.linkedinUrl && <div className="flex items-center gap-3 text-blue-600">LinkedIn Profile</div>}
                    </div>
                </div>

                {professionalSummary?.summaryText && (
                    <p className="mt-12 text-slate-700 leading-relaxed text-2xl font-black italic max-w-4xl border-l-[12px] pl-12 border-slate-100">
                        &quot;{professionalSummary.summaryText}&quot;
                    </p>
                )}
            </header>

            <main className="flex-1 p-12 space-y-20">
                {/* Modern Skills Cloud - Integrated and High Visibility */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10 flex items-center gap-4">
                            Core Arsenal <div className={cn("flex-1 h-px", activeTheme.border)} />
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((skill, i) => (
                                <span key={i} className={cn("px-8 py-4 rounded-3xl text-white text-sm font-black uppercase tracking-[0.2em] shadow-xl hover:-translate-y-2 transition-transform duration-300", activeTheme.primary)}>
                                    {skill.skillName}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience - Single Column Vertical Stack */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-12 flex items-center gap-4">
                            The Journey <div className={cn("flex-1 h-px", activeTheme.border)} />
                        </h2>
                        <div className="space-y-20">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group relative pl-16 border-l-8 border-slate-50 last:border-0 pb-12 last:pb-0">
                                    <div className={cn("absolute -left-[14px] top-2 w-6 h-6 rounded-full border-4 border-white shadow-2xl transition-transform group-hover:scale-150", activeTheme.primary)} />
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-4xl font-black text-slate-900 leading-none">{job.jobTitle}</h3>
                                            <div className={cn("text-2xl font-black italic", activeTheme.accent)}>@{job.companyName}</div>
                                        </div>
                                        <div className={cn("text-xs font-black text-white px-8 py-3 rounded-full tabular-nums uppercase tracking-[0.3em] whitespace-nowrap", activeTheme.primary)}>
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && <p className="text-xl text-slate-500 font-bold mb-10 leading-relaxed italic">&quot;{job.roleDescription}&quot;</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-6 p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                                    <div className={cn("w-3 h-3 rounded-full mt-2 shrink-0", activeTheme.primary)} />
                                                    <span className="text-[15px] font-bold text-slate-700 leading-relaxed">{ach.achievementText}</span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-16 border-t-[12px] border-slate-50">
                    {/* Education / Learning */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">L&D Foundation</h2>
                            <div className="space-y-12">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-2 relative pl-8 border-l-4 border-slate-100">
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
                            <div className="space-y-8">
                                {achievements.map((ach, i) => (
                                    <div key={i} className="p-8 border-2 border-dashed rounded-3xl group hover:bg-slate-50 transition-colors">
                                        <div className="font-black text-xl uppercase leading-tight text-slate-900 mb-2">{ach.achievementTitle}</div>
                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{ach.issuingBody}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Selected Projects - Modern Cards */}
                {projects && projects.length > 0 && (
                    <section className="bg-neutral-900 text-white p-12 rounded-[64px] shadow-2xl relative overflow-hidden">
                        <div className={cn("absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-5 pointer-events-none rotate-45 bg-gradient-to-br from-white to-transparent", activeTheme.primary)} />
                        
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-white/30 mb-12 relative z-10">Moonshots</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                            {projects.map((project, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="text-3xl font-black tracking-tighter group-hover:text-blue-400 transition-colors">{project.projectName}</h4>
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{project.startDate} — {project.endDate || 'Present'}</div>
                                    </div>
                                    <div className={cn("text-sm font-black uppercase mb-6 tracking-widest", activeTheme.accent)}>{project.role}</div>
                                    {project.description && <p className="text-[15px] font-medium text-white/60 leading-relaxed mb-8">{project.description}</p>}
                                    {project.toolsUsed && project.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-3">
                                            {project.toolsUsed.map((tool, t) => (
                                                <span key={t} className="text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full group-hover:border-white/30 transition-colors">{tool}</span>
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
