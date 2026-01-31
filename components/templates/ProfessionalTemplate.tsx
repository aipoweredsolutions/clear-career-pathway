import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Expecting text color class like 'text-navy-900'
}

export function ProfessionalTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
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

    return (
        <div className={cn("w-full bg-white aspect-[210/297] text-slate-950 font-sans leading-relaxed flex flex-col gap-8", className)}>
            {/* Header */}
            <header className="flex flex-col items-start gap-6">
                <div className="w-full flex justify-between items-end border-b-2 border-slate-900 pb-8">
                    <div>
                        <h1 className={cn("text-6xl font-black tracking-tighter mb-2", accentColor)}>
                            {personalInfo?.fullName}
                        </h1>
                        <p className="text-2xl font-medium text-slate-500 tracking-tight">
                            {personalInfo?.professionalTitle}
                        </p>
                    </div>

                    <div className="text-right text-sm font-medium text-slate-500 space-y-1.5 opacity-80 mix-blend-multiply">
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {(personalInfo?.city || personalInfo?.country) && <div>{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>}
                        {(personalInfo?.linkedinUrl || personalInfo?.websiteUrl) && (
                            <div className="flex gap-4 justify-end mt-2">
                                {personalInfo?.linkedinUrl && <span className="underline decoration-2 decoration-slate-200 hover:decoration-slate-400 transition-all">LinkedIn</span>}
                                {personalInfo?.websiteUrl && <span className="underline decoration-2 decoration-slate-200 hover:decoration-slate-400 transition-all">Portfolio</span>}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Summary */}
            {professionalSummary?.summaryText && (
                <section className="flex flex-col gap-4">
                    <h2 className={cn("text-xl font-bold uppercase tracking-[0.2em]", accentColor)}>
                        Professional Summary
                    </h2>
                    <p className="text-slate-700 leading-relaxed text-lg max-w-5xl opacity-90">
                        {professionalSummary.summaryText}
                    </p>
                </section>
            )}

            {/* Experience */}
            {workExperience && workExperience.length > 0 && (
                <section className="flex flex-col gap-8">
                    <h2 className={cn("text-xl font-bold uppercase tracking-[0.2em] border-b-2 border-slate-100 pb-2 flex items-center gap-4", accentColor)}>
                        <span>Experience</span>
                        <div className="h-px flex-1 bg-slate-100" />
                    </h2>
                    <div className="flex flex-col gap-10">
                        {workExperience.map((job, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-xl font-bold text-slate-900">{job.jobTitle}</h3>
                                    <span className="text-sm font-bold text-slate-400 tabular-nums uppercase tracking-wide">
                                        {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                    </span>
                                </div>
                                <div className="text-lg font-medium text-slate-600 mb-2">{job.companyName}</div>
                                {job.roleDescription && (
                                    <p className="text-slate-600 leading-relaxed mb-3">{job.roleDescription}</p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="space-y-2 mt-1">
                                        {job.achievements.map((ach, j) => (
                                            <li key={j} className="flex gap-3 text-slate-600 leading-snug">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0 element-bullet" />
                                                <span>{ach.achievementText}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="flex flex-col gap-6">
                    <h2 className={cn("text-xl font-bold uppercase tracking-[0.2em] border-b-2 border-slate-100 pb-2", accentColor)}>
                        Education
                    </h2>
                    <div className="grid grid-cols-1 gap-6">
                        {education.map((edu, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between items-baseline">
                                    <div className="text-lg font-bold text-slate-900">{edu.institutionName}</div>
                                    <span className="text-sm font-bold text-slate-400 tabular-nums">{edu.endYear}</span>
                                </div>
                                <div className="text-slate-600 font-medium">{edu.degree}</div>
                                {edu.fieldOfStudy && <div className="text-slate-500 text-sm italic">{edu.fieldOfStudy}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="flex flex-col gap-6 mt-4">
                    <h2 className={cn("text-xl font-bold uppercase tracking-[0.2em] border-b-2 border-slate-100 pb-2", accentColor)}>
                        Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <div key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm font-bold text-slate-700">
                                {skill.skillName}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications & Achievements */}
            {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
                <section className="flex flex-col gap-4">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Certifications & Honors
                    </h2>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                        {certifications?.map((cert, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="font-bold text-slate-900 text-sm">{cert.certificationName}</div>
                                <div className="text-xs text-slate-500">{(cert.issuer || cert.issuingOrganization)} • {(cert.issueDate || cert.issueYear)}</div>
                            </div>
                        ))}
                        {achievements?.map((ach, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="font-bold text-slate-900 text-sm">{ach.achievementTitle}</div>
                                <div className="text-xs text-slate-500">{ach.issuingBody} {ach.year && `• ${ach.year}`}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="flex flex-col gap-6">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Projects
                    </h2>
                    <div className="flex flex-col gap-6">
                        {projects.map((project, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-bold text-slate-900">{project.projectName}</h3>
                                    {project.startDate && (
                                        <span className="text-sm font-semibold text-slate-500 tabular-nums">
                                            {project.startDate} {project.endDate ? `— ${project.endDate}` : ''}
                                        </span>
                                    )}
                                </div>
                                <div className="text-base font-medium text-slate-700">
                                    {project.role && <span>{project.role}</span>}
                                    {project.clientOrOrganization && <span> | {project.clientOrOrganization}</span>}
                                </div>
                                {project.description && (
                                    <p className="text-slate-600 mt-1">{project.description}</p>
                                )}
                                {project.toolsUsed && project.toolsUsed.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {project.toolsUsed.map((tool, t) => (
                                            <span key={t} className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100">
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

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Languages
                    </h2>
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {languages.map((lang, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="font-bold text-slate-800">{lang.languageName}</span>
                                <span className="text-slate-500 text-sm">({lang.proficiencyLevel})</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Volunteer Experience */}
            {volunteerExperience && volunteerExperience.length > 0 && (
                <section className="flex flex-col gap-6">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Volunteer Experience
                    </h2>
                    <div className="flex flex-col gap-6">
                        {volunteerExperience.map((vol, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-bold text-slate-900">{vol.roleTitle}</h3>
                                    <span className="text-sm font-semibold text-slate-500 tabular-nums">
                                        {vol.startDate} — {vol.endDate}
                                    </span>
                                </div>
                                <div className="text-base font-medium text-slate-700">{vol.organizationName}</div>
                                {vol.contributions && (
                                    <p className="text-slate-600 mt-1">{vol.contributions}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Publications */}
            {publications && publications.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Publications
                    </h2>
                    <div className="flex flex-col gap-3">
                        {publications.map((pub, i) => (
                            <div key={i} className="flex flex-col gap-0.5">
                                <div className="font-bold text-slate-900">{pub.title}</div>
                                <div className="text-sm text-slate-600">
                                    {pub.platformOrPublisher} {pub.publicationYear && `(${pub.publicationYear})`}
                                </div>
                                {pub.url && <div className="text-sm text-blue-600 underline">{pub.url}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Professional Affiliations */}
            {professionalAffiliations && professionalAffiliations.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Affiliations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {professionalAffiliations.map((aff, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="font-bold text-slate-900">{aff.organizationName}</span>
                                <span className="text-sm text-slate-600">{aff.roleOrMembership}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* References */}
            {references && references.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        References
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {references.map((ref, i) => (
                            <div key={i} className="flex flex-col gap-1 text-sm">
                                <div className="font-bold text-slate-900">{ref.referenceName}</div>
                                <div className="text-slate-700">{ref.role}</div>
                                <div className="text-slate-600 italic">{ref.organization}</div>
                                {ref.contactDetails && <div className="text-slate-500 mt-1">{ref.contactDetails}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Additional Info */}
            {additionalInfo && (
                <section className="flex flex-col gap-4 mt-4 bg-slate-50 p-8 rounded-xl border border-slate-100">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest", accentColor)}>
                        Additional Information
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {additionalInfo.securityClearance && <div>Clearance: {additionalInfo.securityClearance}</div>}
                        {additionalInfo.workAuthorization && <div>Authorization: {additionalInfo.workAuthorization}</div>}
                        {additionalInfo.availability && <div>Availability: {additionalInfo.availability}</div>}
                        {additionalInfo.willingToRelocate !== undefined && <div>Relocate: {additionalInfo.willingToRelocate ? 'YES' : 'NO'}</div>}
                    </div>
                    {additionalInfo.otherInfo && (
                        <p className="text-slate-700 leading-relaxed border-t border-slate-200 pt-4 mt-2">
                            {additionalInfo.otherInfo}
                        </p>
                    )}
                </section>
            )}
        </div>
    )
}
