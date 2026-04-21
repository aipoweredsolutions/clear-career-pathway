import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    theme?: 'sage' | 'terracotta' | 'slate' | 'black' | 'clay'
}

export function ArtisanTemplate({ data, className, theme = 'sage' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        projects,
        languages,
        volunteerExperience,
        publications,
        professionalAffiliations,
        references,
        additionalInfo,
        achievements
    } = data

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
        },
        black: {
            accent: 'text-neutral-900',
            bg: 'bg-neutral-50',
            border: 'border-neutral-200',
            dot: 'bg-neutral-400'
        },
        clay: {
            accent: 'text-stone-800',
            bg: 'bg-stone-50',
            border: 'border-stone-200',
            dot: 'bg-stone-300'
        }
    }

    const activeTheme = themeConfig[theme]

    return (
        <div className={cn("w-full bg-white aspect-[210/297] p-10 font-playfair tracking-normal text-slate-900 leading-relaxed", className)}>
            {/* Header - Simple & Clean */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-8 border-slate-100 gap-6">
                <div className="flex flex-col gap-3">
                    <h1 className={cn("text-6xl font-black tracking-tight", activeTheme.accent)}>
                        {personalInfo?.fullName}
                    </h1>
                    <p className="font-sans text-sm font-black uppercase tracking-[0.4em] text-slate-400">
                        {personalInfo?.professionalTitle}
                    </p>
                </div>

                <div className="font-sans text-[11px] font-bold text-slate-500 flex flex-wrap md:flex-col gap-x-6 gap-y-1.5 uppercase tracking-widest">
                    {personalInfo?.email && <div className="flex items-center gap-2"><div className={cn("w-1.5 h-1.5 rounded-full", activeTheme.dot)} /> {personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="flex items-center gap-2"><div className={cn("w-1.5 h-1.5 rounded-full", activeTheme.dot)} /> {personalInfo.phone}</div>}
                    {(personalInfo?.location || personalInfo?.city) && <div className="flex items-center gap-2"><div className={cn("w-1.5 h-1.5 rounded-full", activeTheme.dot)} /> {personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>}
                </div>
            </header>

            <div className="flex flex-col gap-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className="flex flex-col gap-6">
                        <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Statement</div>
                        <p className="text-2xl text-slate-700 font-medium leading-relaxed max-w-5xl italic border-l-4 pl-8 border-slate-50">
                            &quot;{professionalSummary.summaryText}&quot;
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section className="flex flex-col gap-8">
                        <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-2 font-black">Professional Experience</div>
                        <div className="flex flex-col gap-10">
                            {workExperience.map((job, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-2">
                                        <div className="flex flex-col">
                                            <h3 className="text-3xl font-medium text-slate-900 tracking-tight">{job.jobTitle}</h3>
                                            <div className={cn("text-lg font-bold font-sans uppercase tracking-[0.1em]", activeTheme.accent)}>{job.companyName}</div>
                                        </div>
                                        <div className="text-sm font-sans font-black text-slate-400 tabular-nums uppercase tracking-widest whitespace-nowrap">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>
                                    
                                    {job.roleDescription && (
                                        <p className="text-[17px] text-slate-600 leading-relaxed font-medium">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-none flex flex-col gap-4 mt-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-6 items-start text-slate-700">
                                                    <span className={cn("mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0", activeTheme.dot)}></span>
                                                    <span className="leading-relaxed text-[15px] font-medium">{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Integrated Expertise & Education Section */}
                <div className="flex flex-col gap-12">
                    {/* Expertise Section */}
                    {skills && skills.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Core Expertise</div>
                            <div className="flex flex-wrap gap-x-12 gap-y-6">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-2 min-w-[120px]">
                                        <span className="text-slate-800 font-sans font-black text-[13px] uppercase tracking-widest">{skill.skillName}</span>
                                        <div className={cn("h-[3px] w-full rounded-full opacity-20", activeTheme.dot)}></div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {education && education.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Academic Foundation</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className={cn("p-8 rounded-2xl border transition-colors", activeTheme.bg, activeTheme.border)}>
                                        <div className="font-medium text-slate-900 text-2xl leading-tight mb-2">{edu.degree}</div>
                                        <div className="text-slate-600 font-sans text-xs font-black uppercase tracking-[0.2em] mb-4">{edu.institutionName}</div>
                                        <div className="text-[10px] font-sans text-slate-400 font-black uppercase tracking-[0.3em] pt-4 border-t border-slate-200/50">Class of {edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Projects - Full Width Stack */}
                {projects && projects.length > 0 && (
                    <section className="flex flex-col gap-10">
                        <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-2">Selected Works</div>
                        <div className="flex flex-col gap-12">
                            {projects.map((project, i) => (
                                <div key={i} className="flex flex-col gap-4 border-l-2 pl-10 border-slate-50 relative">
                                    <div className={cn("absolute -left-[5px] top-6 w-2 h-2 rounded-full", activeTheme.dot)} />
                                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-2">
                                        <h3 className="text-3xl font-medium text-slate-900">{project.projectName}</h3>
                                        <div className="text-sm font-sans font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                            {project.startDate} {project.endDate && `— ${project.endDate}`}
                                        </div>
                                    </div>
                                    <div className={cn("text-sm font-black font-sans uppercase tracking-[0.2em]", activeTheme.accent)}>{project.role}</div>
                                    {project.description && <p className="text-[16px] text-slate-600 leading-relaxed font-medium max-w-4xl">{project.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Final Grid for compact info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Languages</div>
                            <div className="flex flex-col gap-5">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-3">
                                        <span className="font-black text-slate-800 text-sm uppercase tracking-wide">{lang.languageName}</span>
                                        <span className="text-[10px] font-sans font-black text-slate-300 uppercase tracking-[0.2em]">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Recognition */}
                    {(certifications && certifications.length > 0) || (professionalAffiliations && professionalAffiliations.length > 0) || (achievements && achievements.length > 0) ? (
                        <section className="flex flex-col gap-8">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Credentials & Awards</div>
                            <div className="flex flex-col gap-6">
                                {achievements?.map((ach, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="font-bold text-slate-900 text-sm tracking-tight">{ach.achievementTitle}</div>
                                        <div className="text-[10px] font-sans font-black text-slate-400 uppercase tracking-widest">{ach.issuingBody} {ach.year && `• ${ach.year}`}</div>
                                    </div>
                                ))}
                                {certifications?.map((cert, i) => (
                                    <div key={i} className="flex flex-col gap-1 pt-4 border-t border-slate-50 first:pt-0 first:border-0">
                                        <div className="font-bold text-slate-900 text-sm tracking-tight">{cert.certificationName}</div>
                                        <div className="text-[10px] font-sans font-black text-slate-400 uppercase tracking-widest">{(cert.issuer || cert.issuingOrganization)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}
                </div>

                {/* References & Info - Centered/Stacked */}
                <div className="flex flex-col gap-16 mt-8">
                    {references && references.length > 0 && (
                        <section className="flex flex-col gap-10">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 text-center">Professional References</div>
                            <div className="flex justify-center flex-wrap gap-16">
                                {references.map((ref, i) => (
                                    <div key={i} className="flex flex-col items-center text-center gap-2">
                                        <div className="font-bold text-slate-900 uppercase tracking-tighter text-lg">{ref.referenceName}</div>
                                        <div className="text-sm text-slate-500 italic max-w-[250px]">{ref.role} • {ref.organization}</div>
                                        <div className="text-[10px] font-sans font-black text-slate-300 uppercase tracking-widest mt-2">{ref.contactDetails || ref.availabilityStatement}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {additionalInfo && (
                        <section className={cn("p-10 rounded-2xl text-center flex flex-col gap-6", activeTheme.bg)}>
                            <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-[11px] font-sans font-black text-slate-400 uppercase tracking-[0.3em]">
                                {additionalInfo.securityClearance && <span>Security Clearance: {additionalInfo.securityClearance}</span>}
                                {additionalInfo.workAuthorization && <span>Work Auth: {additionalInfo.workAuthorization}</span>}
                                {additionalInfo.willingToRelocate && <span>Willing to Relocate</span>}
                            </div>
                            {additionalInfo.otherInfo && (
                                <p className="text-[15px] text-slate-500 italic leading-relaxed max-w-3xl mx-auto border-t border-slate-200/50 pt-6 font-medium">
                                    &quot;{additionalInfo.otherInfo}&quot;
                                </p>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
