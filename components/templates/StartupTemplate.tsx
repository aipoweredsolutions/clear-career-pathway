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
        }
    }

    const activeTheme = themeConfig[theme]

    return (
        <div className={cn("w-full bg-white aspect-[210/297] grid grid-cols-12 font-sans text-slate-900", className)}>
            {/* Left Column - Main Content */}
            <div className="col-span-8 p-12 flex flex-col gap-10">
                <header>
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-2">
                        {personalInfo?.fullName}
                    </h1>
                    <p className={cn("text-xl font-bold uppercase tracking-tight", activeTheme.accent)}>
                        {personalInfo?.professionalTitle}
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
                                    <div className={cn("text-base font-bold", activeTheme.text)}>{job.companyName}</div>
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc list-outside ml-4 text-slate-600 flex flex-col gap-2 mt-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="pl-1 text-sm">
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

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">Projects</h2>
                            <div className={cn("flex-1 h-1", activeTheme.primary)}></div>
                        </div>
                        <div className="flex flex-col gap-8">
                            {projects.map((project, i) => (
                                <div key={i} className="flex flex-col gap-2 relative pl-6 border-l-2 border-slate-100">
                                    <div className={cn("absolute -left-[5px] top-2 w-2 h-2 rounded-full", activeTheme.primary)}></div>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="text-lg font-bold text-slate-900">{project.projectName}</h4>
                                        <span className="text-xs font-black text-slate-400 uppercase tabular-nums">{project.startDate} — {project.endDate}</span>
                                    </div>
                                    <div className={cn("text-sm font-bold opacity-80", activeTheme.text)}>{project.role}</div>
                                    {project.description && <p className="text-sm text-slate-600 leading-relaxed mt-1">{project.description}</p>}
                                    {project.toolsUsed && project.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {project.toolsUsed.map((tool, t) => (
                                                <span key={t} className="text-[10px] font-black uppercase tracking-widest text-slate-400">#{tool}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteering */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">Philanthropy</h2>
                            <div className={cn("flex-1 h-1", activeTheme.primary)}></div>
                        </div>
                        <div className="flex flex-col gap-6">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="flex flex-col gap-1 relative pl-6">
                                    <div className={cn("absolute left-0 top-1.5 w-1.5 h-1.5 rounded-sm", activeTheme.primary)}></div>
                                    <div className="font-bold text-slate-900">{vol.roleTitle}</div>
                                    <div className="text-sm text-slate-500 font-bold uppercase tracking-tight">{vol.organizationName}</div>
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
                        {personalInfo?.email && <div className="break-all">{personalInfo?.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo?.phone}</div>}
                        {(personalInfo?.location || personalInfo?.city) && <div>{personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>}
                        {personalInfo?.linkedinUrl && <div className="text-blue-600">LinkedIn</div>}
                        {personalInfo?.websiteUrl && <div className="text-blue-600">Portfolio</div>}
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
                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Certificates</h3>
                        <div className="flex flex-col gap-4">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="font-bold text-slate-900 text-xs">{cert.certificationName}</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">{(cert.issuer || cert.issuingOrganization)}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Wins</h3>
                        <div className="flex flex-col gap-4">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="font-bold text-slate-900 text-xs">{ach.achievementTitle}</div>
                                    {ach.issuingBody && <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">{ach.issuingBody}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Languages</h3>
                        <div className="flex flex-col gap-2">
                            {languages.map((lang, i) => (
                                <div key={i} className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-slate-900">{lang.languageName}</span>
                                    <span className={cn("text-[9px] uppercase tracking-tighter opacity-70", activeTheme.text)}>{lang.proficiencyLevel}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Vouch</h3>
                        <div className="flex flex-col gap-4">
                            {references.map((ref, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="font-bold text-slate-900 text-xs">{ref.referenceName}</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">{ref.organization}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Metadata */}
                {additionalInfo && (
                    <section className="flex flex-col gap-4 pt-4 border-t border-slate-200/50">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Brief</h3>
                        <div className="flex flex-col gap-2 text-[10px] font-bold text-slate-600">
                            {additionalInfo.securityClearance && <div>CLEARANCE: {additionalInfo.securityClearance}</div>}
                            {additionalInfo.workAuthorization && <div>AUTH: {additionalInfo.workAuthorization}</div>}
                            {additionalInfo.willingToRelocate && <div>RELOCATE: YES</div>}
                            {additionalInfo.availability && <div>START: {additionalInfo.availability}</div>}
                            {additionalInfo.otherInfo && <div className="mt-2 italic opacity-80 leading-relaxed">{additionalInfo.otherInfo}</div>}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
