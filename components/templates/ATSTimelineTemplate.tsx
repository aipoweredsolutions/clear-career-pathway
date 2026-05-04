import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Tailwind text- class (e.g., 'text-slate-900')
}

export function ATSTimelineTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        languages
    } = data

    // Extract base color for borders/accents
    const borderColorClass = accentColor.replace('text-', 'border-')
    const bgColorClass = accentColor.replace('text-', 'bg-')

    return (
        <div className={cn("w-full bg-white font-sans text-neutral-800 leading-snug", className)}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── HEADER ── */}
            <header className="mb-5 border-b border-neutral-200 pb-4">
                <div className="flex justify-between items-end gap-4">
                    <div>
                        <h1 className={cn("text-[28px] font-[900] tracking-tight leading-none mb-1 whitespace-nowrap", accentColor)}>
                            {personalInfo?.fullName}
                        </h1>
                        {personalInfo?.professionalTitle && (
                            <p className="text-[12px] font-semibold text-neutral-500 tracking-wide uppercase">
                                {personalInfo.professionalTitle}
                            </p>
                        )}
                    </div>
                    <div className="text-right flex flex-col gap-0.5 shrink-0">
                        {personalInfo?.email && <div className="text-[10px] font-medium text-neutral-500">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div className="text-[10px] font-medium text-neutral-500">{personalInfo.phone}</div>}
                        {(personalInfo?.location || personalInfo?.city) && (
                            <div className="text-[10px] font-medium text-neutral-500">
                                {personalInfo.location || [personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                            </div>
                        )}
                        {personalInfo?.linkedinUrl && (
                            <div className={cn("text-[9px] font-bold uppercase tracking-widest mt-0.5", accentColor)}>
                                {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ── BODY ── */}
            <div className="space-y-4">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className="relative pl-8">
                        <div className={cn("absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-15", bgColorClass)} />
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-1.5", accentColor)}>Profile</h2>
                        <p className="text-[11px] font-medium text-neutral-700 leading-relaxed">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience with Timeline */}
                {workExperience && workExperience.length > 0 && (
                    <section className="relative">
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-3 pl-8", accentColor)}>Career Timeline</h2>

                        {/* Timeline Line */}
                        <div className={cn("absolute left-[3px] top-7 bottom-0 w-px opacity-15", bgColorClass)} />

                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative pl-8">
                                    {/* Timeline Dot */}
                                    <div className={cn("absolute left-0 top-1 w-[7px] h-[7px] rounded-full border-[1.5px] bg-white", borderColorClass)} />

                                    <div className="flex justify-between items-baseline mb-1 gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[13px] font-bold text-neutral-900 tracking-tight leading-tight">{job.jobTitle}</h3>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={cn("text-[11px] font-semibold", accentColor)}>{job.companyName}</span>
                                                {job.location && <span className="text-[10px] text-neutral-400">· {job.location}</span>}
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-bold text-neutral-400 tabular-nums uppercase tracking-wider shrink-0">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-500 mb-1.5 leading-relaxed italic">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[11px] text-neutral-700 leading-relaxed flex items-start gap-2.5">
                                                    <span className={cn("mt-[5px] w-1 h-1 rounded-full flex-shrink-0", bgColorClass)} />
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

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", accentColor)}>Core Expertise</h2>
                        <ul className="text-[11px] font-medium text-neutral-800 leading-relaxed flex flex-wrap m-0 p-0 list-none">
                            {skills.map((skill, i) => (
                                <li key={i} className="flex items-center">
                                    {skill.skillName}
                                    {i < skills.length - 1 && (
                                        <span className="mx-1.5 text-neutral-300 font-normal select-none" aria-hidden="true">•</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", accentColor)}>Education</h2>
                        <div className="space-y-1.5">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-baseline gap-4">
                                    <div className="flex-1">
                                        <span className="text-[12px] font-bold text-neutral-900">{edu.degree}</span>
                                        {edu.fieldOfStudy && <span className="text-[11px] text-neutral-500"> — {edu.fieldOfStudy}</span>}
                                        <div className="text-[10px] font-medium text-neutral-400">{edu.institutionName}</div>
                                    </div>
                                    <div className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest shrink-0">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", accentColor)}>Certifications</h2>
                        <div className="space-y-1">
                            {certifications.map((cert, i) => (
                                <div key={i} className="text-[11px]">
                                    <span className="font-bold text-neutral-800">{cert.certificationName}</span>
                                    <span className="text-neutral-400 ml-1">· {cert.issuingOrganization}</span>
                                    {(cert.issueYear || cert.issueDate) && (
                                        <span className="text-neutral-300 ml-1">({cert.issueYear || cert.issueDate})</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", accentColor)}>Key Projects</h2>
                        <div className="space-y-2">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline gap-4">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{proj.projectName}</h3>
                                        {proj.role && <span className="text-[10px] font-medium text-neutral-400 shrink-0">{proj.role}</span>}
                                    </div>
                                    {proj.description && (
                                        <p className="text-[11px] text-neutral-600 leading-relaxed">{proj.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-1.5", accentColor)}>Languages</h2>
                        <ul className="text-[11px] font-medium text-neutral-800 flex flex-wrap m-0 p-0 list-none">
                            {languages.map((lang, i) => (
                                <li key={i} className="flex items-center">
                                    {lang.languageName}
                                    <span className={cn("text-[9px] uppercase font-bold ml-1 opacity-50", accentColor)}>[{lang.proficiencyLevel}]</span>
                                    {i < languages.length - 1 && (
                                        <span className="mx-1.5 text-neutral-300 font-normal select-none" aria-hidden="true">•</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    )
}
