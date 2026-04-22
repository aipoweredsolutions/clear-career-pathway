import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    mode?: 'standard' | 'dark' | 'devops'
}

export function TechnicalTemplate({ data, className, mode = 'standard' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        achievements,
        projects,
        languages,
        volunteerExperience,
        publications,
        professionalAffiliations,
        references,
        additionalInfo
    } = data

    const isDark = mode === 'dark' || mode === 'devops' // DevOps also uses dark variant usually, or maybe distinct

    // Refined theme logic
    const bgColor = isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200'
    const textColor = isDark ? 'text-neutral-100' : 'text-neutral-800'
    const mutedText = isDark ? 'text-neutral-400' : 'text-neutral-500'
    const codeBg = isDark ? 'bg-neutral-800' : 'bg-neutral-50'
    const accentColor = mode === 'devops' ? 'text-emerald-400 border-emerald-500' : 'text-violet-500 border-violet-600'
    const topBorder = mode === 'devops' ? 'border-emerald-500' : 'border-violet-600'

    return (
        <div className={cn("w-full font-mono aspect-[210/297] p-10 border-t-[12px] text-sm", bgColor, topBorder, className)}>
            {/* Header with terminal style */}
            {/* Simple Header for ATS */}
            <header className={cn("mb-12 p-8 border-b-8 shadow-sm flex flex-col gap-6", isDark ? 'border-neutral-700' : 'border-neutral-200', codeBg)}>
                <div className="flex flex-col gap-2">
                    <h1 className={cn("text-5xl font-black mb-2 tracking-tighter leading-none", textColor)}>
                        {personalInfo?.fullName}
                    </h1>
                    <p className={cn("text-xl font-bold uppercase tracking-[0.3em]", accentColor.split(' ')[0])}>
                        {personalInfo?.professionalTitle || 'Software Engineer'}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-black uppercase tracking-widest text-slate-400 mt-6">
                        {personalInfo?.email && <div className="lowercase">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                        {personalInfo?.websiteUrl && <div>{personalInfo.websiteUrl}</div>}
                    </div>
                </div>
            </header>

            <div className="space-y-16">
                {/* Profile / Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className={cn("text-lg font-black mb-6", textColor)}>
                            Summary
                        </h2>
                        <div className={cn("p-6 rounded-lg border-l-4 leading-relaxed", codeBg, accentColor.split(' ')[1])}>
                            {professionalSummary.summaryText}
                        </div>
                    </section>
                )}

                {/* Tech Stack */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className={cn("text-lg font-black mb-8 border-b pb-4", textColor, accentColor.split(' ')[1])}>
                            Technical Stack
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((skill, i) => (
                                <div key={i} className={cn("px-4 py-2 rounded-md font-bold text-xs flex items-center gap-3", codeBg, textColor, "border border-neutral-100 dark:border-neutral-800")}>
                                    <span className={accentColor.split(' ')[0]}>{"=>"}</span>
                                    {skill.skillName}
                                    <span className={cn("text-[9px] opacity-40 uppercase ml-2", mutedText)}>{skill.proficiencyLevel}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className={cn("text-lg font-black mb-10 border-b pb-4", textColor, accentColor.split(' ')[1])}>
                            Experience
                        </h2>
                        <div className="space-y-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative pl-10 border-l-2 border-dashed border-neutral-100 dark:border-neutral-800">
                                    <div className={cn("absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2", bgColor, accentColor.split(' ')[1])} />
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h3 className={cn("text-2xl font-black tracking-tight uppercase", textColor)}>{job.jobTitle}</h3>
                                            <div className={cn("text-lg font-bold italic", accentColor.split(' ')[0])}>@{job.companyName}</div>
                                        </div>
                                        <div className={cn("text-xs font-black tabular-nums border px-3 py-1 rounded-full", mutedText, "border-neutral-100 dark:border-neutral-800")}>
                                            {job.startDate} -- {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && <p className={cn("text-[15px] leading-relaxed mb-6 opacity-80", textColor)}>{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc ml-6 space-y-3">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className={cn("text-sm leading-relaxed pl-2", textColor)}>
                                                    {a.achievementText}
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
                    <section>
                        <h2 className={cn("text-lg font-black mb-10 border-b pb-4", textColor, accentColor.split(' ')[1])}>
                            Projects
                        </h2>
                        <div className="flex flex-col gap-8">
                            {projects.map((project, i) => (
                                <div key={i} className={cn("p-6 rounded-xl border-2", codeBg, "border-neutral-100 dark:border-neutral-800")}>
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                                        <h3 className={cn("text-xl font-black tracking-tight", textColor)}>{project.projectName}</h3>
                                        <span className={cn("text-[10px] uppercase font-black px-2 py-1 rounded bg-neutral-900 text-white", accentColor.split(' ')[0])}>
                                            {project.endDate || 'active'}
                                        </span>
                                    </div>
                                    <div className={cn("text-xs font-bold mb-4 opacity-70", accentColor.split(' ')[0])}>{project.role}</div>
                                    {project.description && <p className={cn("text-sm opacity-90 mb-6 leading-snug", textColor)}>{project.description}</p>}
                                    {project.toolsUsed && project.toolsUsed.length > 0 && (
                                        <div className={cn("text-[10px] font-bold tracking-widest uppercase opacity-40", textColor)}>
                                            {project.toolsUsed.join(' | ')}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Secondary Sections Grid but single column flow for ATS */}
                {/* Secondary Sections Stack */}
                <div className="flex flex-col gap-16 pt-12 border-t-2 border-dashed border-neutral-100 dark:border-neutral-800">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-black mb-8 uppercase tracking-[0.2em]", textColor)}>
                                Education
                            </h2>
                            <div className="flex flex-col gap-8">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className={cn("font-black text-lg uppercase tracking-tighter", textColor)}>{edu.institutionName}</div>
                                        <div className={cn("text-sm font-bold opacity-70 italic", accentColor.split(' ')[0])}>{edu.degree}</div>
                                        <div className={cn("text-[10px] font-black uppercase mt-2 opacity-40", mutedText)}>{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-black mb-8 uppercase tracking-[0.2em]", textColor)}>
                                Certifications
                            </h2>
                            <div className="space-y-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="p-4 border border-neutral-100 dark:border-neutral-800 rounded-lg">
                                        <div className={cn("font-black text-sm uppercase leading-tight", textColor)}>{cert.certificationName}</div>
                                        <div className={cn("text-[10px] font-bold opacity-50 uppercase mt-2", mutedText)}>{cert.issuingOrganization} | {cert.issueYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Metadata / Additional Info - Footer Style */}
                {/* Metadata / Additional Info */}
                <div className="mt-16 pt-12 border-t-4 border-neutral-900 dark:border-neutral-700">
                    <section className={cn("p-8 rounded-2xl", codeBg)}>
                        <div className="flex flex-col gap-8 text-[11px] font-bold uppercase tracking-widest">
                            {additionalInfo?.securityClearance && (
                                <div className="flex flex-col gap-1">
                                    <span className={mutedText}>Clearance</span>
                                    <span className={textColor}>{additionalInfo.securityClearance}</span>
                                </div>
                            )}
                            {additionalInfo?.workAuthorization && (
                                <div className="flex flex-col gap-1">
                                    <span className={mutedText}>Auth</span>
                                    <span className={textColor}>{additionalInfo.workAuthorization}</span>
                                </div>
                            )}
                            {additionalInfo?.availability && (
                                <div className="flex flex-col gap-1">
                                    <span className={mutedText}>Available</span>
                                    <span className={textColor}>{additionalInfo.availability}</span>
                                </div>
                            )}
                            {additionalInfo?.willingToRelocate !== undefined && (
                                <div className="flex flex-col gap-1">
                                    <span className={mutedText}>Relocate</span>
                                    <span className={textColor}>{additionalInfo.willingToRelocate ? 'YES' : 'NO'}</span>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
