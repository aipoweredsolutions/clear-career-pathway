import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface GraduateTemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Tailwind text/bg color class (e.g., 'text-blue-900')
}

export function GraduateTemplate({ data, className, accentColor = 'text-blue-900' }: GraduateTemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        education,
        workExperience,
        skills,
        projects,
        volunteerExperience,
        certifications,
        achievements,
        languages,
        publications,
        professionalAffiliations,
        references,
        additionalInfo
    } = data

    // Helper for date formatting
    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    }

    const formatYear = (year?: number) => {
        return year ? year.toString() : ''
    }

    return (
        <div className={cn("w-full bg-white text-neutral-900 font-serif leading-relaxed", className)} id="resume-preview">
            {/* Header */}
            <header className="text-center mb-10">
                <h1 className={cn("text-4xl font-normal uppercase tracking-widest mb-3", accentColor)}>
                    {personalInfo?.fullName}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600 font-medium">
                    {personalInfo?.email && (
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {personalInfo.email}
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {personalInfo.phone}
                        </div>
                    )}
                    {(personalInfo?.location || personalInfo?.city) && (
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {personalInfo.location || [personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                        </div>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <span className="truncate max-w-[150px]">{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Career Objective */}
            {professionalSummary?.summaryText && (
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        Career Objective
                    </h2>
                    <p className="text-sm leading-relaxed text-neutral-800">
                        {professionalSummary.summaryText}
                    </p>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu, idx) => (
                            <div key={edu.id || idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-neutral-900">{edu.institutionName}</h3>
                                    <span className="text-sm font-medium text-neutral-600 whitespace-nowrap">
                                        {formatYear(edu.startYear)} – {formatYear(edu.endYear) || 'Present'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="text-sm font-semibold text-neutral-800">
                                        {edu.degree} {edu.major && `in ${edu.major}`}
                                    </div>
                                    {edu.location && <span className="text-xs text-neutral-500 italic">{edu.location}</span>}
                                </div>

                                {edu.coursework && (
                                    <div className="text-sm mt-1">
                                        <span className="font-semibold text-neutral-700">Relevant Coursework: </span>
                                        <span className="text-neutral-600">{edu.coursework}</span>
                                    </div>
                                )}
                                {edu.achievements && (
                                    <p className="text-sm text-neutral-600 mt-1 italic">
                                        Honors: {edu.achievements}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Internships or Work Experience */}
            {workExperience && workExperience.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        Internships & Work Experience
                    </h2>
                    <div className="space-y-5">
                        {workExperience.map((exp, idx) => (
                            <div key={exp.id || idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-neutral-900">{exp.companyName}</h3>
                                    <span className="text-sm font-medium text-neutral-600 whitespace-nowrap">
                                        {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-sm font-semibold italic text-neutral-800">{exp.jobTitle}</div>
                                    {exp.location && <span className="text-xs text-neutral-500">{exp.location}</span>}
                                </div>
                                {exp.roleDescription && (
                                    <p className="text-sm text-neutral-700 mb-2 leading-relaxed">
                                        {exp.roleDescription}
                                    </p>
                                )}
                                {exp.achievements && exp.achievements.length > 0 && (
                                    <ul className="list-disc list-outside ml-4 space-y-1">
                                        {exp.achievements.map((ach, aIdx) => (
                                            <li key={ach.id || aIdx} className="text-sm text-neutral-700 leading-snug pl-1 marker:text-neutral-400">
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
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        Academic & Personal Projects
                    </h2>
                    <div className="space-y-4">
                        {projects.map((proj, idx) => (
                            <div key={proj.id || idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-neutral-900">{proj.projectName}</h3>
                                    {proj.startDate && (
                                        <span className="text-sm text-neutral-500">
                                            {formatDate(proj.startDate)} – {formatDate(proj.endDate)}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-neutral-700 leading-relaxed">
                                    {proj.description && <span>{proj.description} </span>}
                                    {proj.outcomes && <span className="block mt-1 font-medium text-neutral-800">Outcome: {proj.outcomes}</span>}
                                </p>
                                {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                    <div className="text-xs text-neutral-500 mt-1">
                                        Tools: {proj.toolsUsed.join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-800">
                        {skills.map((skill, idx) => (
                            <div key={skill.id || idx} className="flex items-center gap-2">
                                <span className={cn("w-1.5 h-1.5 rounded-full", accentColor.replace('text-', 'bg-'))} />
                                <span className="font-medium">{skill.skillName}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications & Awards */}
            {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        Certifications & Awards
                    </h2>
                    <div className="space-y-3">
                        {certifications?.map((cert, idx) => (
                            <div key={cert.id || idx} className="text-sm">
                                <span className="font-bold text-neutral-900">{cert.certificationName}</span>
                                <span className="text-neutral-600"> – {cert.issuingOrganization}</span>
                                {cert.issueYear && <span className="text-neutral-500 font-medium"> ({cert.issueYear})</span>}
                            </div>
                        ))}
                        {achievements?.map((ach, idx) => (
                            <div key={ach.id || idx} className="text-sm">
                                <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                {ach.issuingBody && <span className="text-neutral-600"> – {ach.issuingBody}</span>}
                                {ach.year && <span className="text-neutral-500 font-medium"> ({ach.year})</span>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Volunteering / Extracurriculars */}
            {volunteerExperience && volunteerExperience.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        Volunteering & Extracurriculars
                    </h2>
                    <div className="space-y-4">
                        {volunteerExperience.map((vol, idx) => (
                            <div key={vol.id || idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-neutral-900">{vol.organizationName}</h3>
                                    <span className="text-sm text-neutral-500 whitespace-nowrap">
                                        {formatDate(vol.startDate)} – {formatDate(vol.endDate)}
                                    </span>
                                </div>
                                <div className="text-sm font-semibold italic text-neutral-800 mb-1">{vol.roleTitle}</div>
                                {vol.contributions && (
                                    <p className="text-sm text-neutral-700 leading-snug">
                                        {vol.contributions}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages & Affiliations */}
            {((languages && languages.length > 0) || (professionalAffiliations && professionalAffiliations.length > 0)) && (
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        Languages & Affiliations
                    </h2>
                    <div className="grid grid-cols-2 gap-8 text-sm">
                        {languages && languages.length > 0 && (
                            <div>
                                <h3 className="font-bold text-neutral-900 mb-2 uppercase text-xs tracking-tighter">Languages</h3>
                                <ul className="space-y-1">
                                    {languages.map((lang, idx) => (
                                        <li key={lang.id || idx} className="text-neutral-700">
                                            {lang.languageName} <span className="text-neutral-400 italic">({lang.proficiencyLevel})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {professionalAffiliations && professionalAffiliations.length > 0 && (
                            <div>
                                <h3 className="font-bold text-neutral-900 mb-2 uppercase text-xs tracking-tighter">Affiliations</h3>
                                <ul className="space-y-1">
                                    {professionalAffiliations.map((aff, idx) => (
                                        <li key={aff.id || idx} className="text-neutral-700 text-xs">
                                            <span className="font-bold">{aff.organizationName}</span>
                                            {aff.roleOrMembership && <span> – {aff.roleOrMembership}</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* References */}
            {references && references.length > 0 && (
                <section className="mb-6">
                    <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2 border-neutral-300", accentColor)}>
                        References
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                        {references.map((ref, idx) => (
                            <div key={ref.id || idx} className="text-sm">
                                <div className="font-bold text-neutral-900">{ref.referenceName}</div>
                                <div className="text-neutral-600 text-xs">{ref.role} | {ref.organization}</div>
                                <div className="text-neutral-400 text-xs mt-1">{ref.contactDetails || ref.availabilityStatement}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Additional Info */}
            {additionalInfo && (
                <section className="mt-8 pt-6 border-t border-neutral-100">
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                        {additionalInfo.securityClearance && <span>Clearance: {additionalInfo.securityClearance}</span>}
                        {additionalInfo.workAuthorization && <span>Authorization: {additionalInfo.workAuthorization}</span>}
                        {additionalInfo.availability && <span>Start Date: {additionalInfo.availability}</span>}
                        {additionalInfo.willingToRelocate && <span>Willing to Relocate: Yes</span>}
                    </div>
                    {additionalInfo.otherInfo && (
                        <p className="text-sm text-neutral-500 italic leading-relaxed">
                            {additionalInfo.otherInfo}
                        </p>
                    )}
                </section>
            )}
        </div>
    )
}
