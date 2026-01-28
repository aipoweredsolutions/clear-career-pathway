import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    theme?: 'standard' | 'gold'
}

export function ExecutiveTemplate({ data, className, theme = 'standard' }: TemplateProps) {
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

    const isGold = theme === 'gold'
    const accentText = isGold ? 'text-amber-700' : 'text-neutral-900'
    const accentBorder = isGold ? 'border-amber-200' : 'border-neutral-300'
    const bg = isGold ? 'bg-amber-50/30' : 'bg-stone-50'

    return (
        <div className={cn("w-full text-neutral-900 min-h-[11in] shadow-sm p-16 font-serif", bg, className)}>
            {/* Centered Header */}
            <header className={cn("text-center border-b-2 pb-10 mb-12", accentBorder)}>
                <h1 className={cn("text-5xl font-bold uppercase tracking-widest mb-4", accentText)}>{personalInfo?.fullName}</h1>
                <div className="text-xl text-neutral-600 mb-6 italic">{personalInfo?.professionalTitle}</div>

                <div className="flex justify-center flex-wrap gap-6 text-sm font-medium text-neutral-500 uppercase tracking-wide">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    <span className="text-neutral-300">|</span>
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    <span className="text-neutral-300">|</span>
                    {personalInfo?.location && <span>{personalInfo.location}</span>}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>LinkedIn</span>
                        </>
                    )}
                </div>
            </header>

            {/* Summary - Centered & Prominent */}
            {professionalSummary && (
                <section className="mb-12 max-w-3xl mx-auto text-center">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest mb-4 inline-block border-b-2 pb-1", accentBorder, accentText)}>Executive Profile</h2>
                    <p className="text-lg leading-relaxed text-neutral-700">{professionalSummary.summaryText}</p>
                </section>
            )}

            {/* Two Column Layout */}
            <div className="grid grid-cols-3 gap-12">
                {/* Main Column */}
                <div className="col-span-2 space-y-10">
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className={cn("text-xl font-bold uppercase tracking-widest mb-8 border-b border-neutral-200 pb-2", accentText)}>Professional Experience</h2>
                            <div className="space-y-8">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-bold text-neutral-900">{job.jobTitle}</h3>
                                            <span className="text-sm font-medium text-neutral-500 italic">
                                                {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        <div className="text-lg text-neutral-700 mb-4">{job.companyName}</div>
                                        <p className="text-neutral-600 mb-4 leading-relaxed">{job.roleDescription}</p>

                                        {job.achievements && (
                                            <ul className="list-disc ml-5 space-y-2 text-neutral-600 text-sm">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j}>{ach.achievementText}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="col-span-1 space-y-10 border-l border-neutral-200 pl-10">
                    {/* Core Competencies */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Core Competencies</h2>
                            <div className="flex flex-col gap-3">
                                {skills.map((skill, i) => (
                                    <div key={i} className="text-neutral-700 font-medium pb-2 border-b border-neutral-100 last:border-0">
                                        {skill.skillName}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900">{edu.institutionName}</div>
                                        <div className="text-sm text-neutral-600 italic mt-1">{edu.degree}</div>
                                        <div className="text-xs text-neutral-400 mt-1">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Languages</h2>
                            <div className="space-y-3">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-neutral-800">{lang.languageName}</span>
                                        <span className="text-neutral-500 italic uppercase text-[10px] tracking-tighter">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Achievements */}
                    {(certifications && certifications.length > 0) || (achievements && achievements.length > 0) ? (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Distinctions</h2>
                            <div className="space-y-6">
                                {achievements?.map((ach, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-sm">{ach.achievementTitle}</div>
                                        <div className="text-xs text-neutral-500 mt-1">{ach.issuingBody} {ach.year && `| ${ach.year}`}</div>
                                    </div>
                                ))}
                                {certifications?.map((cert, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-sm">{cert.certificationName}</div>
                                        <div className="text-xs text-neutral-500 mt-1">{(cert.issuer || cert.issuingOrganization)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {/* Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Affiliations</h2>
                            <div className="space-y-4">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-sm">{aff.organizationName}</div>
                                        <div className="text-xs text-neutral-500 mt-1">{aff.roleOrMembership}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Projects Section - Full Width */}
            {projects && projects.length > 0 && (
                <section className="mt-16 border-t pt-10">
                    <h2 className={cn("text-xl font-bold uppercase tracking-widest mb-8 text-center", accentText)}>Significant Projects</h2>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                        {projects.map((project, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex justify-between items-baseline border-b border-neutral-100 pb-2">
                                    <h3 className="font-bold text-neutral-900">{project.projectName}</h3>
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{project.startDate}</span>
                                </div>
                                <div className="text-sm font-medium text-neutral-600 italic">{project.role}</div>
                                {project.description && <p className="text-sm text-neutral-600 leading-relaxed">{project.description}</p>}
                                {project.toolsUsed && project.toolsUsed.length > 0 && (
                                    <div className="text-[10px] font-bold text-neutral-400 mt-1">
                                        TECH: {project.toolsUsed.join(' • ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Bottom Grid for Volunteer & Publications */}
            {(volunteerExperience && volunteerExperience.length > 0) || (publications && publications.length > 0) ? (
                <div className="mt-16 grid grid-cols-2 gap-12 border-t pt-10">
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Philanthropy</h2>
                            <div className="space-y-6">
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-sm">{vol.roleTitle}</div>
                                        <div className="text-xs text-neutral-600 mt-1 italic">{vol.organizationName}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {publications && publications.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-6", accentText)}>Publications</h2>
                            <div className="space-y-6">
                                {publications.map((pub, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-sm italic">&quot;{pub.title}&quot;</div>
                                        <div className="text-xs text-neutral-600 mt-1">{pub.platformOrPublisher}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            ) : null}

            {/* References */}
            {references && references.length > 0 && (
                <section className="mt-16 border-t pt-10 text-center">
                    <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-8", accentText)}>Professional References</h2>
                    <div className="flex justify-center flex-wrap gap-16">
                        {references.map((ref, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="font-bold text-neutral-900 uppercase tracking-tighter">{ref.referenceName}</div>
                                <div className="text-sm text-neutral-600">{ref.role} | {ref.organization}</div>
                                <div className="text-xs text-neutral-400 mt-1 font-mono">{ref.contactDetails || ref.availabilityStatement}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Additional Info */}
            {additionalInfo && (
                <section className="mt-12 text-center max-w-4xl mx-auto border-t border-neutral-100 pt-8">
                    <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 mb-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        {additionalInfo.securityClearance && <span>Clearance: {additionalInfo.securityClearance}</span>}
                        {additionalInfo.workAuthorization && <span>Authorization: {additionalInfo.workAuthorization}</span>}
                        {additionalInfo.availability && <span>Available: {additionalInfo.availability}</span>}
                        {additionalInfo.willingToRelocate && <span>Willing to Relocate</span>}
                    </div>
                    {additionalInfo.otherInfo && (
                        <p className="text-xs text-neutral-400 leading-relaxed uppercase tracking-widest">
                            {additionalInfo.otherInfo}
                        </p>
                    )}
                </section>
            )}
        </div>
    )
}
