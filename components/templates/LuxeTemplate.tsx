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
                    {(personalInfo?.location || personalInfo?.city) && (
                        <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{personalInfo.location || [personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
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
                            &quot;{professionalSummary.summaryText}&quot;
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
                                            <div className="text-base font-sans font-semibold text-slate-600 uppercase tracking-wider mt-1">{job.companyName}</div>
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

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section className="flex flex-col gap-8">
                        <div className="flex items-center gap-6">
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap", activeTheme.accent)}>
                                Selection of Projects
                            </h2>
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b")}></div>
                        </div>

                        <div className="flex flex-col gap-10">
                            {projects.map((project, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="flex justify-between items-baseline">
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-medium text-slate-900">{project.projectName}</h3>
                                            <div className="text-base font-sans font-semibold text-slate-600 uppercase tracking-wider mt-1">
                                                {project.role} {project.clientOrOrganization && ` • ${project.clientOrOrganization}`}
                                            </div>
                                        </div>
                                        <span className="text-sm font-sans font-bold text-slate-400 uppercase tracking-widest tabular-nums italic">
                                            {project.startDate} — {project.endDate}
                                        </span>
                                    </div>

                                    {project.description && <p className="text-slate-600 leading-relaxed max-w-prose italic opacity-90">{project.description}</p>}

                                    {project.toolsUsed && project.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mt-1">
                                            {project.toolsUsed.map((tool, t) => (
                                                <span key={t} className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 border border-slate-100 px-2 py-0.5 rounded">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <section className="flex flex-col gap-6">
                        <div className="flex items-center gap-6">
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap", activeTheme.accent)}>
                                Achievements & Awards
                            </h2>
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b")}></div>
                        </div>
                        <div className="grid grid-cols-2 gap-12">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="font-medium text-slate-900 leading-tight">{ach.achievementTitle}</div>
                                    <div className="text-slate-600 font-sans text-sm font-medium uppercase tracking-wide">{ach.issuingBody} {ach.year && `• ${ach.year}`}</div>
                                    {ach.description && <p className="text-sm text-slate-500 italic mt-1">{ach.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Second Grid for Extras */}
                <div className="grid grid-cols-2 gap-16">
                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section className="flex flex-col gap-6">
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", activeTheme.accent)}>
                                Languages
                            </h2>
                            <div className="flex flex-col gap-3">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center py-1 border-b border-slate-50">
                                        <span className="text-slate-800 font-medium">{lang.languageName}</span>
                                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section className="flex flex-col gap-6">
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", activeTheme.accent)}>
                                Affiliations
                            </h2>
                            <div className="flex flex-col gap-4">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="font-medium text-slate-900 leading-tight">{aff.organizationName}</div>
                                        <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400">{aff.roleOrMembership}</div>
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
                                Certifications & Recognitions
                            </h2>
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b")}></div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="font-medium text-slate-900">{cert.certificationName}</div>
                                    <div className="text-xs font-sans text-slate-400 font-bold uppercase tracking-tight mt-1">{(cert.issuer || cert.issuingOrganization)} • {(cert.issueDate || cert.issueYear)}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer & Publications */}
                {(volunteerExperience && volunteerExperience.length > 0) || (publications && publications.length > 0) ? (
                    <div className="grid grid-cols-2 gap-16">
                        {volunteerExperience && volunteerExperience.length > 0 && (
                            <section className="flex flex-col gap-6">
                                <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", activeTheme.accent)}>
                                    Philanthropy
                                </h2>
                                <div className="flex flex-col gap-6">
                                    {volunteerExperience.map((vol, i) => (
                                        <div key={i} className="flex flex-col gap-1">
                                            <div className="font-medium text-slate-900 leading-tight">{vol.roleTitle}</div>
                                            <div className="text-slate-600 font-sans text-[10px] font-bold uppercase tracking-wide">{vol.organizationName}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {publications && publications.length > 0 && (
                            <section className="flex flex-col gap-6">
                                <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em]", activeTheme.accent)}>
                                    Publications
                                </h2>
                                <div className="flex flex-col gap-6">
                                    {publications.map((pub, i) => (
                                        <div key={i} className="flex flex-col gap-1">
                                            <div className="font-medium text-slate-900 leading-tight italic">&quot;{pub.title}&quot;</div>
                                            <div className="text-slate-600 font-sans text-[10px] font-bold uppercase tracking-wide">{pub.platformOrPublisher}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : null}

                {/* References */}
                {references && references.length > 0 && (
                    <section className="flex flex-col gap-6">
                        <div className="flex justify-center flex-wrap gap-12">
                            {references.map((ref, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Reference</div>
                                    <div className="font-medium text-slate-900 text-lg">{ref.referenceName}</div>
                                    <div className="text-sm text-slate-600 italic">{ref.role} • {ref.organization}</div>
                                    <div className="text-xs font-sans font-bold text-slate-400 mt-1 uppercase tracking-tighter">{ref.contactDetails || ref.availabilityStatement}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Additional Info */}
                {additionalInfo && (
                    <section className="border-t border-slate-100 pt-8 text-center max-w-3xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-slate-400">
                            {additionalInfo.securityClearance && <span>Clearance: {additionalInfo.securityClearance}</span>}
                            {additionalInfo.workAuthorization && <span>Auth: {additionalInfo.workAuthorization}</span>}
                            {additionalInfo.willingToRelocate && <span>Willing to Relocate</span>}
                            {additionalInfo.availability && <span>Availability: {additionalInfo.availability}</span>}
                        </div>
                        {additionalInfo.otherInfo && (
                            <p className="text-sm text-slate-500 italic leading-relaxed">
                                {additionalInfo.otherInfo}
                            </p>
                        )}
                    </section>
                )}
            </div>
        </div>
    )
}
