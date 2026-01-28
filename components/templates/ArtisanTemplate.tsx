import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    theme?: 'sage' | 'terracotta' | 'slate'
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
        }
    }

    const activeTheme = themeConfig[theme]

    return (
        <div className={cn("w-full bg-white aspect-[210/297] p-16 font-serif text-slate-900 leading-relaxed", className)}>
            {/* Header - Simple & Clean */}
            <header className="mb-20 flex justify-between items-end border-b pb-12 border-slate-100">
                <div className="flex flex-col gap-2">
                    <h1 className={cn("text-6xl font-medium tracking-tight", activeTheme.accent)}>
                        {personalInfo?.fullName}
                    </h1>
                    <p className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
                        {personalInfo?.professionalTitle}
                    </p>
                </div>

                <div className="text-right font-sans text-xs font-bold text-slate-500 flex flex-col gap-1.5 uppercase tracking-widest">
                    {personalInfo?.email && <div>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {(personalInfo?.location || personalInfo?.city) && <div>{personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>}
                </div>
            </header>

            <div className="flex flex-col gap-20">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className="flex flex-col gap-6">
                        <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">About</div>
                        <p className="text-xl text-slate-700 font-medium leading-relaxed max-w-4xl">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Main Experience Flow - Offset Layout */}
                {workExperience && workExperience.length > 0 && (
                    <section className="flex flex-col gap-10">
                        <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-2">Experience</div>
                        <div className="flex flex-col gap-16">
                            {workExperience.map((job, i) => (
                                <div key={i} className="grid grid-cols-12 gap-8">
                                    {/* Left Side: Date/Company */}
                                    <div className="col-span-4 flex flex-col gap-1">
                                        <div className="text-sm font-sans font-black text-slate-400 tabular-nums uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                        <div className={cn("text-lg font-bold font-sans", activeTheme.accent)}>{job.companyName}</div>
                                    </div>

                                    {/* Right Side: Title/Description */}
                                    <div className="col-span-8 flex flex-col gap-4">
                                        <h3 className="text-2xl font-medium text-slate-900">{job.jobTitle}</h3>
                                        {job.roleDescription && (
                                            <p className="text-slate-600 leading-relaxed opacity-90">{job.roleDescription}</p>
                                        )}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="list-none flex flex-col gap-4 mt-2">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="flex gap-4 items-start text-slate-700">
                                                        <span className={cn("mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0", activeTheme.dot)}></span>
                                                        <span className="leading-relaxed opacity-90">{ach.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Bottom Sections Grid */}
                <div className="grid grid-cols-2 gap-20">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Education</div>
                            <div className="flex flex-col gap-8">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="font-medium text-slate-900 text-xl leading-tight">{edu.degree}</div>
                                        <div className="text-slate-500 font-sans text-xs font-bold uppercase tracking-widest mt-1">{edu.institutionName}</div>
                                        <div className="text-[10px] font-sans text-slate-300 font-black uppercase tracking-widest mt-1">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Expertise */}
                    {skills && skills.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Expertise</div>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-slate-800 font-sans font-bold text-sm uppercase tracking-wider">{skill.skillName}</span>
                                        <div className={cn("h-0.5 w-full rounded-full opacity-30", activeTheme.dot)}></div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Additional Sections */}
                <div className="flex flex-col gap-20">
                    {/* Projects - Offset Layout */}
                    {projects && projects.length > 0 && (
                        <section className="flex flex-col gap-10">
                            <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-2">Projects</div>
                            <div className="flex flex-col gap-16">
                                {projects.map((project, i) => (
                                    <div key={i} className="grid grid-cols-12 gap-8">
                                        <div className="col-span-4">
                                            <div className="text-sm font-sans font-black text-slate-400 tabular-nums uppercase tracking-widest">
                                                {project.startDate} {project.endDate && `— ${project.endDate}`}
                                            </div>
                                            <div className={cn("text-lg font-bold font-sans mt-1", activeTheme.accent)}>{project.role}</div>
                                        </div>
                                        <div className="col-span-8">
                                            <h3 className="text-2xl font-medium text-slate-900 mb-2">{project.projectName}</h3>
                                            {project.description && <p className="text-slate-600 leading-relaxed opacity-90">{project.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-20">
                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section className="flex flex-col gap-8">
                                <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Languages</div>
                                <div className="flex flex-col gap-4">
                                    {languages.map((lang, i) => (
                                        <div key={i} className="flex justify-between border-b border-slate-50 pb-2">
                                            <span className="font-bold text-slate-800 italic">{lang.languageName}</span>
                                            <span className="text-xs font-sans font-bold text-slate-300 uppercase tracking-widest">{lang.proficiencyLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications, Affiliations & Achievements */}
                        {(certifications && certifications.length > 0) || (professionalAffiliations && professionalAffiliations.length > 0) || (achievements && achievements.length > 0) ? (
                            <section className="flex flex-col gap-8">
                                <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Awards & Recognition</div>
                                <div className="flex flex-col gap-6">
                                    {achievements?.map((ach, i) => (
                                        <div key={i} className="flex flex-col">
                                            <div className="font-bold text-slate-900 text-sm leading-tight">{ach.achievementTitle}</div>
                                            <div className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest mt-0.5">{ach.issuingBody} {ach.year && `• ${ach.year}`}</div>
                                        </div>
                                    ))}
                                    {certifications?.map((cert, i) => (
                                        <div key={i} className="flex flex-col pt-2 border-t border-slate-50 first:pt-0 first:border-0">
                                            <div className="font-bold text-slate-900 text-sm leading-tight">{cert.certificationName}</div>
                                            <div className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest mt-0.5">{(cert.issuer || cert.issuingOrganization)}</div>
                                        </div>
                                    ))}
                                    {professionalAffiliations?.map((aff, i) => (
                                        <div key={i} className="flex flex-col pt-2 border-t border-slate-50">
                                            <div className="font-bold text-slate-900 text-sm">{aff.organizationName}</div>
                                            <div className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest mt-0.5">{aff.roleOrMembership}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ) : null}
                    </div>

                    {/* Volunteer & Publications */}
                    {(volunteerExperience && volunteerExperience.length > 0) || (publications && publications.length > 0) ? (
                        <div className="grid grid-cols-2 gap-20">
                            {volunteerExperience && volunteerExperience.length > 0 && (
                                <section className="flex flex-col gap-8">
                                    <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Philanthropy</div>
                                    <div className="flex flex-col gap-6">
                                        {volunteerExperience.map((vol, i) => (
                                            <div key={i}>
                                                <div className="font-bold text-slate-900 text-sm leading-tight">{vol.roleTitle}</div>
                                                <div className="text-[10px] font-sans font-black text-slate-300 uppercase tracking-widest mt-1">{vol.organizationName}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {publications && publications.length > 0 && (
                                <section className="flex flex-col gap-8">
                                    <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Publications</div>
                                    <div className="flex flex-col gap-6">
                                        {publications.map((pub, i) => (
                                            <div key={i}>
                                                <div className="font-bold text-slate-900 text-sm leading-tight italic">&quot;{pub.title}&quot;</div>
                                                <div className="text-[10px] font-sans font-black text-slate-300 uppercase tracking-widest mt-1">{pub.platformOrPublisher}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    ) : null}

                    {/* References & Info */}
                    <div className="grid grid-cols-1 gap-20">
                        {references && references.length > 0 && (
                            <section className="flex flex-col gap-8">
                                <div className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">References</div>
                                <div className="grid grid-cols-2 gap-12">
                                    {references.map((ref, i) => (
                                        <div key={i} className="flex flex-col gap-1">
                                            <div className="font-bold text-slate-900 uppercase tracking-tighter">{ref.referenceName}</div>
                                            <div className="text-sm text-slate-500 italic leading-tight">{ref.role} | {ref.organization}</div>
                                            <div className="text-[10px] font-sans font-bold text-slate-300 uppercase tracking-widest mt-1">{ref.contactDetails || ref.availabilityStatement}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {additionalInfo && (
                            <section className="bg-slate-50 p-8 rounded border border-slate-100 flex flex-col gap-4">
                                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">
                                    {additionalInfo.securityClearance && <span>Clearance: {additionalInfo.securityClearance}</span>}
                                    {additionalInfo.workAuthorization && <span>Auth: {additionalInfo.workAuthorization}</span>}
                                    {additionalInfo.availability && <span>Available: {additionalInfo.availability}</span>}
                                    {additionalInfo.willingToRelocate && <span>Willing to Relocate</span>}
                                </div>
                                {additionalInfo.otherInfo && (
                                    <p className="text-sm text-slate-500 italic leading-relaxed text-center max-w-2xl mx-auto border-t border-slate-100 pt-4">
                                        &quot;{additionalInfo.otherInfo}&quot;
                                    </p>
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
