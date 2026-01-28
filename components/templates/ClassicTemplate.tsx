import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface ClassicTemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ClassicTemplate({ data, className = '', accentColor = 'text-blue-800' }: ClassicTemplateProps) {
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
        additionalInfo,
        customSections
    } = data

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Present'
        try {
            return format(new Date(dateString), 'MMM yyyy')
        } catch {
            return dateString
        }
    }

    const borderClass = accentColor.replace('text-', 'border-')

    return (
        <div className={cn("resume-text bg-white p-8 max-w-[8.5in] mx-auto", className)}>
            {/* Personal Information */}
            {personalInfo && (
                <header className={cn("mb-6 text-center border-b-2 pb-4", borderClass)}>
                    <h1 className={cn("resume-heading text-3xl mb-2 uppercase tracking-wide", accentColor)}>{personalInfo.fullName}</h1>
                    {personalInfo.professionalTitle && (
                        <p className="text-lg text-neutral-700 mb-3">{personalInfo.professionalTitle}</p>
                    )}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-neutral-600">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.city && personalInfo.country && (
                            <span>{personalInfo.city}, {personalInfo.country}</span>
                        )}
                        {personalInfo.linkedinUrl && (
                            <span className="break-all">{personalInfo.linkedinUrl}</span>
                        )}
                        {personalInfo.websiteUrl && (
                            <span className="break-all">{personalInfo.websiteUrl}</span>
                        )}
                    </div>
                </header>
            )}

            {/* Professional Summary */}
            {professionalSummary?.summaryText && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed">{professionalSummary.summaryText}</p>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Skills
                    </h2>
                    <div className="text-sm">
                        {/* Group skills by type */}
                        {['technical', 'professional', 'tool'].map(type => {
                            const skillsOfType = skills.filter(s => s.skillType === type)
                            if (skillsOfType.length === 0) return null

                            return (
                                <div key={type} className="mb-2">
                                    <span className="font-semibold capitalize">{type} Skills: </span>
                                    <span>{skillsOfType.map(s => s.skillName).join(', ')}</span>
                                </div>
                            )
                        })}
                        {/* Ungrouped skills */}
                        {skills.filter(s => !s.skillType).length > 0 && (
                            <div className="mb-2">
                                {skills.filter(s => !s.skillType).map(s => s.skillName).join(', ')}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Work Experience */}
            {workExperience && workExperience.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Professional Experience
                    </h2>
                    {workExperience
                        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                        .map((job, index) => (
                            <div key={job.id || index} className="mb-4">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="resume-heading text-base font-bold">{job.jobTitle}</h3>
                                    <span className="text-sm text-neutral-700">
                                        {formatDate(job.startDate)} - {job.isCurrent ? 'Present' : formatDate(job.endDate)}
                                    </span>
                                </div>
                                <div className="text-sm text-neutral-700 mb-2">
                                    <span className="font-semibold">{job.companyName}</span>
                                    {job.location && <span> | {job.location}</span>}
                                    {job.isRemote && <span> | Remote</span>}
                                </div>
                                {job.roleDescription && (
                                    <p className="text-sm mb-2">{job.roleDescription}</p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                                        {job.achievements
                                            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                                            .map((achievement, idx) => (
                                                <li key={achievement.id || idx}>{achievement.achievementText}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Education
                    </h2>
                    {education
                        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                        .map((edu, index) => (
                            <div key={edu.id || index} className="mb-3">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="resume-heading text-base font-bold">
                                        {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                                    </h3>
                                    {edu.endYear && (
                                        <span className="text-sm text-neutral-700">
                                            {edu.startYear && `${edu.startYear} - `}{edu.endYear}
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-neutral-700">
                                    <span className="font-semibold">{edu.institutionName}</span>
                                    {edu.location && <span> | {edu.location}</span>}
                                </div>
                                {edu.achievements && (
                                    <p className="text-sm mt-1">{edu.achievements}</p>
                                )}
                            </div>
                        ))}
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Projects
                    </h2>
                    {projects.map((project, index) => (
                        <div key={project.id || index} className="mb-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="resume-heading text-base font-bold">{project.projectName}</h3>
                                {project.startDate && (
                                    <span className="text-sm text-neutral-700">
                                        {formatDate(project.startDate)} {project.endDate ? `- ${formatDate(project.endDate)}` : ''}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-neutral-700 mb-1">
                                {project.role && <span className="font-semibold">{project.role}</span>}
                                {project.clientOrOrganization && <span> | {project.clientOrOrganization}</span>}
                            </div>
                            {project.description && (
                                <p className="text-sm mb-1">{project.description}</p>
                            )}
                            {project.toolsUsed && project.toolsUsed.length > 0 && (
                                <div className="text-sm text-neutral-600 italic">
                                    Tools: {project.toolsUsed.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Certifications
                    </h2>
                    {certifications
                        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                        .map((cert, index) => (
                            <div key={cert.id || index} className="mb-2 text-sm">
                                <span className="font-semibold">{cert.certificationName}</span>
                                <span> - {cert.issuingOrganization}</span>
                                {cert.issueYear && <span> ({cert.issueYear})</span>}
                                {cert.credentialId && <span> | Credential ID: {cert.credentialId}</span>}
                            </div>
                        ))}
                </section>
            )}

            {/* Achievements & Awards */}
            {achievements && achievements.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Achievements & Awards
                    </h2>
                    {achievements.map((ach, index) => (
                        <div key={ach.id || index} className="mb-2 text-sm">
                            <span className="font-semibold">{ach.achievementTitle}</span>
                            {ach.issuingBody && <span> - {ach.issuingBody}</span>}
                            {ach.year && <span> ({ach.year})</span>}
                            {ach.description && <p className="mt-1">{ach.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Languages
                    </h2>
                    <div className="text-sm">
                        {languages.map((lang, index) => (
                            <span key={lang.id || index}>
                                <span className="font-semibold">{lang.languageName}</span> ({lang.proficiencyLevel})
                                {index < languages.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Volunteer Experience */}
            {volunteerExperience && volunteerExperience.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Volunteer Experience
                    </h2>
                    {volunteerExperience.map((vol, index) => (
                        <div key={vol.id || index} className="mb-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="resume-heading text-base font-bold">{vol.roleTitle}</h3>
                                <span className="text-sm text-neutral-700">
                                    {formatDate(vol.startDate)} - {formatDate(vol.endDate)}
                                </span>
                            </div>
                            <div className="text-sm font-semibold text-neutral-700 mb-1">{vol.organizationName}</div>
                            {vol.contributions && <p className="text-sm">{vol.contributions}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Publications */}
            {publications && publications.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Publications
                    </h2>
                    {publications.map((pub, index) => (
                        <div key={pub.id || index} className="mb-2 text-sm">
                            <span className="font-bold italic">{pub.title}</span>
                            {pub.platformOrPublisher && <span>, {pub.platformOrPublisher}</span>}
                            {pub.publicationYear && <span> ({pub.publicationYear})</span>}
                            {pub.url && <div className="text-blue-600 underline text-xs">{pub.url}</div>}
                        </div>
                    ))}
                </section>
            )}

            {/* Professional Affiliations */}
            {professionalAffiliations && professionalAffiliations.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Professional Affiliations
                    </h2>
                    {professionalAffiliations.map((aff, index) => (
                        <div key={aff.id || index} className="mb-1 text-sm">
                            <span className="font-bold">{aff.organizationName}</span>
                            {aff.roleOrMembership && <span> - {aff.roleOrMembership}</span>}
                        </div>
                    ))}
                </section>
            )}

            {/* References */}
            {references && references.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        References
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {references.map((ref, index) => (
                            <div key={ref.id || index} className="text-sm">
                                {ref.referenceName && <div className="font-bold">{ref.referenceName}</div>}
                                {ref.role && <div>{ref.role}</div>}
                                {ref.organization && <div className="italic">{ref.organization}</div>}
                                {ref.contactDetails && <div className="text-neutral-600">{ref.contactDetails}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Additional Information */}
            {additionalInfo && (
                <section className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        Additional Information
                    </h2>
                    <div className="text-sm space-y-1">
                        {additionalInfo.securityClearance && <div><span className="font-semibold">Security Clearance:</span> {additionalInfo.securityClearance}</div>}
                        {additionalInfo.workAuthorization && <div><span className="font-semibold">Work Authorization:</span> {additionalInfo.workAuthorization}</div>}
                        {additionalInfo.willingToRelocate !== undefined && <div><span className="font-semibold">Willing to Relocate:</span> {additionalInfo.willingToRelocate ? 'Yes' : 'No'}</div>}
                        {additionalInfo.availability && <div><span className="font-semibold">Availability:</span> {additionalInfo.availability}</div>}
                        {additionalInfo.otherInfo && <p className="mt-2">{additionalInfo.otherInfo}</p>}
                    </div>
                </section>
            )}

            {/* Custom Sections */}
            {customSections && customSections.length > 0 && customSections.map((section, idx) => (
                <section key={section.id || idx} className="mb-6">
                    <h2 className={cn("resume-heading text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1", accentColor, borderClass)}>
                        {section.title}
                    </h2>
                    {section.items && section.items.length > 0 ? (
                        <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                            {section.items.map((item, iIdx) => (
                                <li key={item.id || iIdx}>{item.text}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm leading-relaxed">{section.content}</p>
                    )}
                </section>
            ))}
        </div>
    )
}
