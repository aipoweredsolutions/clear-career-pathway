import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function MinimalTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications, projects, languages, volunteerExperience, achievements, customSections, publications, professionalAffiliations } = data

    return (
        <div className={cn('w-full bg-white font-lato flex flex-col items-center text-center', className)}>
            {/* Centered Header with minimal styling */}
            <header className="mb-6 max-w-2xl w-full border-b border-neutral-100 pb-4">
                <h1 className="text-4xl font-bold tracking-normal text-neutral-900 mb-3">{personalInfo?.fullName}</h1>
                {personalInfo?.professionalTitle && (
                    <p className="text-sm font-medium text-neutral-500 mb-4 uppercase tracking-widest">{personalInfo.professionalTitle}</p>
                )}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.location && <span>{personalInfo.location}</span>}
                    {personalInfo?.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
                    {personalInfo?.websiteUrl && <span>{personalInfo.websiteUrl}</span>}
                </div>
            </header>

            {/* Content Flow - Single Column, Centered Max Width */}
            <div className="w-full max-w-2xl space-y-6 text-left">
                {professionalSummary && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-[0.2em] mb-4', accentColor)}>About</h2>
                        <p className="text-neutral-600 leading-relaxed">{professionalSummary.summaryText}</p>
                    </section>
                )}

                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-6', accentColor)}>Experience</h2>
                        <div className="space-y-8">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-neutral-900">{job.companyName}</h3>
                                        <span className="text-xs text-neutral-400 tabular-nums">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-neutral-500 mb-2">{job.jobTitle}{job.location ? ` · ${job.location}` : ''}</div>
                                    {job.roleDescription && <p className="text-sm text-neutral-600 leading-relaxed mb-2">{job.roleDescription}</p>}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1 mt-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-sm text-neutral-600 flex gap-2">
                                                    <span className="text-neutral-300 shrink-0 mt-1">—</span>
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

                {projects && projects.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-6', accentColor)}>Projects</h2>
                        <div className="space-y-5">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-neutral-900">{proj.projectName}</h3>
                                        <span className="text-xs text-neutral-400 tabular-nums">
                                            {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                        </span>
                                    </div>
                                    {proj.role && <div className="text-sm font-medium text-neutral-500 mb-1">{proj.role}</div>}
                                    {proj.description && <p className="text-sm text-neutral-600 leading-relaxed">{proj.description}</p>}
                                    {proj.outcomes && <p className="text-xs text-neutral-400 mt-1 italic">{proj.outcomes}</p>}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <p className="text-xs text-neutral-400 mt-1">{proj.toolsUsed.join(' · ')}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills && skills.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-4', accentColor)}>Skills</h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
                            {skills.map((skill, i) => (
                                <span key={i}>{skill.skillName}</span>
                            ))}
                        </div>
                    </section>
                )}

                {education && education.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-6', accentColor)}>Education</h2>
                        <div className="space-y-5">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <div className="font-bold text-neutral-900">{edu.institutionName}</div>
                                        <div className="text-xs text-neutral-400">{edu.endYear}</div>
                                    </div>
                                    <div className="text-sm text-neutral-500">{edu.degree}{(edu.major || edu.fieldOfStudy) ? ` · ${edu.major || edu.fieldOfStudy}` : ''}</div>
                                    {edu.gpa && <div className="text-xs text-neutral-400 mt-0.5">GPA: {edu.gpa}</div>}
                                    {edu.achievements && <div className="text-xs text-neutral-500 mt-0.5 italic">{edu.achievements}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {certifications && certifications.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-4', accentColor)}>Certifications</h2>
                        <div className="space-y-3">
                            {certifications.map((cert, i) => (
                                <div key={i}>
                                    <div className="text-sm font-bold text-neutral-900">{cert.certificationName}</div>
                                    <div className="text-xs text-neutral-500">{cert.issuingOrganization}{cert.issueYear ? ` · ${cert.issueYear}` : ''}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {(languages && languages.length > 0) && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-4', accentColor)}>Languages</h2>
                        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-neutral-600">
                            {languages.map((lang, i) => (
                                <span key={i}><span className="font-medium text-neutral-900">{lang.languageName}</span> <span className="text-neutral-400 capitalize">({lang.proficiencyLevel})</span></span>
                            ))}
                        </div>
                    </section>
                )}

                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-4', accentColor)}>Volunteering</h2>
                        <div className="space-y-3">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <div className="font-bold text-neutral-900 text-sm">{vol.roleTitle}</div>
                                        <div className="text-xs text-neutral-400">{vol.startDate}{vol.endDate ? ` — ${vol.endDate}` : ''}</div>
                                    </div>
                                    <div className="text-xs text-neutral-500">{vol.organizationName}</div>
                                    {vol.contributions && <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{vol.contributions}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {achievements && achievements.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-4', accentColor)}>Achievements</h2>
                        <div className="space-y-3">
                            {achievements.map((ach, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <div className="font-bold text-neutral-900 text-sm">{ach.achievementTitle}</div>
                                        {ach.year && <div className="text-xs text-neutral-400">{ach.year}</div>}
                                    </div>
                                    {ach.issuingBody && <div className="text-xs text-neutral-500">{ach.issuingBody}</div>}
                                    {ach.description && <p className="text-sm text-neutral-600 mt-0.5">{ach.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {publications && publications.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-4', accentColor)}>Publications</h2>
                        <div className="space-y-3">
                            {publications.map((pub, i) => (
                                <div key={i}>
                                    <div className="font-bold text-neutral-900 text-sm">{pub.title}</div>
                                    <div className="text-xs text-neutral-500">{pub.platformOrPublisher}{pub.publicationYear ? ` · ${pub.publicationYear}` : ''}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <section>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-4', accentColor)}>Affiliations</h2>
                        <div className="space-y-3">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i}>
                                    <div className="font-bold text-neutral-900 text-sm">{aff.organizationName}</div>
                                    <div className="text-xs text-neutral-500">{aff.roleOrMembership}{aff.yearsActive ? ` · ${aff.yearsActive}` : ''}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {customSections?.map((sec, idx) => (
                    <section key={idx}>
                        <h2 className={cn('text-xs font-bold uppercase tracking-widest mb-4', accentColor)}>{sec.title}</h2>
                        <ul className="space-y-1">
                            {sec.items?.map((item, j) => (
                                <li key={j} className="text-sm text-neutral-600 flex gap-2">
                                    <span className="text-neutral-300 shrink-0">—</span>
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    )
}
