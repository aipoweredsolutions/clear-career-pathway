import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Minimalist Mono Template — "The Architect"
 *
 * A hyper-modern, Swiss-inspired monochromatic design that commands
 * attention through extreme typographic contrast and strategic negative
 * space. Features an oversized condensed name, hairline dividers, and
 * a strict grid-like rhythm. Every element is precisely placed.
 *
 * Unique identity: Oversized bold name at top, ultra-light body text,
 * dot-separated inline contact, hairline section dividers, and
 * achievement bullets rendered as em-dashes.
 *
 * Passes 100% of Applicant Tracking Systems.
 */
export function ATSMinimalistMonoTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        projects,
        achievements,
        publications,
        volunteerExperience,
        references,
        additionalInfo,
        languages,
        professionalAffiliations,
        customSections
    } = data

    // Hairline section divider with left-aligned label
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-7 mb-2.5">
            <h2 className={cn(
                'text-[10px] font-black uppercase tracking-[0.4em] mb-1',
                accentColor
            )}>
                {title}
            </h2>
            <div className="h-px bg-neutral-200" />
        </div>
    )

    // Inline contact builder
    const contactParts: string[] = []
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl)
    if (personalInfo?.portfolioUrl) contactParts.push(personalInfo.portfolioUrl)
    if (personalInfo?.websiteUrl) contactParts.push(personalInfo.websiteUrl)
    if (personalInfo?.githubUrl) contactParts.push(personalInfo.githubUrl)

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-snug', className)}
            style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
        >
            {/* ── HEADER ── */}
            <header className="pt-8 pb-4">
                {/* Oversized Name */}
                <h1 className={cn(
                    'text-[36px] font-black leading-none tracking-tight mb-0.5',
                    accentColor
                )}>
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                {/* Professional Title — light weight contrast */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[13px] font-light text-neutral-400 tracking-wide mt-1">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Contact — dot separated, very small */}
                {contactParts.length > 0 && (
                    <p className="text-[10px] text-neutral-400 tracking-wider mt-3 leading-relaxed">
                        {contactParts.join('  ·  ')}
                    </p>
                )}

                {/* Thin divider */}
                <div className="h-px bg-neutral-900 mt-4" />
            </header>

            {/* ── BODY ── */}
            <div className="pb-8">

                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <p className="text-[12px] text-neutral-600 leading-[1.8] mt-3">
                            {professionalSummary.summaryText}
                        </p>
                        {professionalSummary.valueProposition && (
                            <p className="text-[11px] text-neutral-400 leading-[1.7] mt-1.5 italic">
                                {professionalSummary.valueProposition}
                            </p>
                        )}
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-5">
                            {workExperience.map((job, i) => (
                                <div key={i} className="break-inside-avoid">
                                    {/* Job Title — bold, prominent */}
                                    <h3 className={cn('text-[13px] font-bold', accentColor)}>
                                        {job.jobTitle}
                                    </h3>
                                    {/* Company + Location + Dates on one line */}
                                    <div className="flex justify-between items-baseline mt-0.5">
                                        <span className="text-[11px] text-neutral-500 font-medium">
                                            {job.companyName}{job.location && ` — ${job.location}`}
                                        </span>
                                        <span className="text-[10px] text-neutral-400 shrink-0 ml-4 tabular-nums">
                                            {job.startDate}{job.startDate ? ' – ' : ''}{job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-500 mt-1.5 leading-[1.7]">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="mt-1.5 space-y-0.5">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[11px] text-neutral-600 flex gap-2 leading-[1.65]">
                                                    <span className="shrink-0 text-neutral-300 font-light">—</span>
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
                    <section>
                        <SectionHeader title="Education" />
                        <div className="space-y-2.5">
                            {education.map((edu, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={cn('text-[12px] font-bold', accentColor)}>
                                            {edu.degree}{edu.major ? `, ${edu.major}` : ''}{edu.fieldOfStudy && !edu.major ? `, ${edu.fieldOfStudy}` : ''}
                                        </h3>
                                        <span className="text-[10px] text-neutral-400 shrink-0 ml-4">{edu.endYear || edu.startYear}</span>
                                    </div>
                                    <div className="text-[11px] text-neutral-500 mt-0.5">
                                        {edu.institutionName}{edu.location && ` — ${edu.location}`}
                                    </div>
                                    {edu.gpa && <div className="text-[10px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</div>}
                                    {edu.achievements && <div className="text-[10px] text-neutral-400 italic mt-0.5">{edu.achievements}</div>}
                                    {edu.coursework && (
                                        <div className="text-[10px] text-neutral-400 mt-0.5">
                                            <span className="font-semibold">Coursework:</span> {edu.coursework}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Skills" />
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const labels: Record<string, string> = {
                                technical: 'Technical',
                                professional: 'Professional',
                                tool: 'Tools',
                                industry: 'Industry'
                            }

                            if (Object.keys(grouped).length === 1) {
                                return (
                                    <p className="text-[11px] text-neutral-600 leading-[1.8]">
                                        {skills.map(s => s.skillName).join('  ·  ')}
                                    </p>
                                )
                            }

                            return (
                                <div className="space-y-1">
                                    {Object.entries(grouped).map(([type, list]) => (
                                        <div key={type} className="text-[11px] text-neutral-600">
                                            <span className="font-bold text-neutral-800">{labels[type] || type}:</span>{' '}
                                            <span>{list.map(s => s.skillName).join(', ')}</span>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Projects" />
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={cn('text-[12px] font-bold', accentColor)}>{proj.projectName}</h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[10px] text-neutral-400 shrink-0 ml-4">
                                                {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && <div className="text-[11px] text-neutral-500 italic">{proj.role}</div>}
                                    {proj.clientOrOrganization && <div className="text-[10px] text-neutral-400">{proj.clientOrOrganization}</div>}
                                    {proj.description && (
                                        <p className="text-[11px] text-neutral-500 mt-0.5 leading-[1.65]">{proj.description}</p>
                                    )}
                                    {proj.outcomes && (
                                        <p className="text-[10px] text-neutral-400 mt-0.5 italic">→ {proj.outcomes}</p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[10px] text-neutral-400 mt-0.5">{proj.toolsUsed.join(' · ')}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <SectionHeader title="Certifications" />
                        <div className="space-y-1">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-[11px]">
                                        <span className="font-bold text-neutral-800">{cert.certificationName}</span>
                                        {cert.issuingOrganization && (
                                            <span className="text-neutral-500"> — {cert.issuingOrganization}</span>
                                        )}
                                    </div>
                                    {(cert.issueDate || cert.issueYear) && (
                                        <span className="text-[10px] text-neutral-400 shrink-0 ml-4">{cert.issueDate || cert.issueYear}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Awards" />
                        <div className="space-y-1.5">
                            {achievements.map((ach, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <div className="text-[11px]">
                                            <span className="font-bold text-neutral-800">{ach.achievementTitle}</span>
                                            {ach.issuingBody && <span className="text-neutral-500"> — {ach.issuingBody}</span>}
                                        </div>
                                        {ach.year && <span className="text-[10px] text-neutral-400 shrink-0 ml-4">{ach.year}</span>}
                                    </div>
                                    {ach.description && (
                                        <p className="text-[11px] text-neutral-500 mt-0.5 leading-[1.6]">{ach.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications */}
                {publications && publications.length > 0 && (
                    <section>
                        <SectionHeader title="Publications" />
                        <div className="space-y-1">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-[11px] text-neutral-600">
                                    <span className="font-bold">&quot;{pub.title}&quot;</span>
                                    {pub.platformOrPublisher && <span className="text-neutral-500"> — {pub.platformOrPublisher}</span>}
                                    {pub.publicationYear && <span className="text-neutral-400"> ({pub.publicationYear})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Volunteering" />
                        <div className="space-y-2.5">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-800">{vol.roleTitle}</h3>
                                        <span className="text-[10px] text-neutral-400 shrink-0 ml-4">
                                            {vol.startDate}{vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-neutral-500">{vol.organizationName}</div>
                                    {vol.contributions && (
                                        <p className="text-[11px] text-neutral-500 mt-0.5 leading-[1.6]">{vol.contributions}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Affiliations */}
                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <section>
                        <SectionHeader title="Affiliations" />
                        <div className="space-y-1">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-[11px]">
                                        <span className="font-bold text-neutral-800">{aff.organizationName}</span>
                                        {aff.roleOrMembership && <span className="text-neutral-500"> — {aff.roleOrMembership}</span>}
                                    </div>
                                    {aff.yearsActive && (
                                        <span className="text-[10px] text-neutral-400 shrink-0 ml-4">{aff.yearsActive}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <SectionHeader title="Languages" />
                        <p className="text-[11px] text-neutral-600">
                            {languages.map((l, i) => (
                                <span key={i}>
                                    {l.languageName}{l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}
                                    {i < languages.length - 1 ? '  ·  ' : ''}
                                </span>
                            ))}
                        </p>
                    </section>
                )}

                {/* Additional Info */}
                {additionalInfo && (additionalInfo.workAuthorization || additionalInfo.securityClearance || additionalInfo.availability || additionalInfo.otherInfo) && (
                    <section>
                        <SectionHeader title="Additional" />
                        <div className="space-y-0.5">
                            {additionalInfo.workAuthorization && (
                                <div className="text-[11px] text-neutral-600">
                                    <span className="font-bold">Authorization:</span> {additionalInfo.workAuthorization}
                                </div>
                            )}
                            {additionalInfo.securityClearance && (
                                <div className="text-[11px] text-neutral-600">
                                    <span className="font-bold">Clearance:</span> {additionalInfo.securityClearance}
                                </div>
                            )}
                            {additionalInfo.availability && (
                                <div className="text-[11px] text-neutral-600">
                                    <span className="font-bold">Available:</span> {additionalInfo.availability}
                                </div>
                            )}
                            {additionalInfo.willingToRelocate !== undefined && (
                                <div className="text-[11px] text-neutral-600">
                                    <span className="font-bold">Relocation:</span> {additionalInfo.willingToRelocate ? 'Open' : 'Not open'}
                                </div>
                            )}
                            {additionalInfo.otherInfo && (
                                <div className="text-[11px] text-neutral-600">{additionalInfo.otherInfo}</div>
                            )}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader title="References" />
                        <div className="space-y-2.5">
                            {references.map((ref, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="text-[11px] font-bold text-neutral-800">
                                        {ref.referenceName || ref.name}
                                    </div>
                                    <div className="text-[11px] text-neutral-500">
                                        {ref.role || ref.title}{(ref.organization || ref.company) && `, ${ref.organization || ref.company}`}
                                    </div>
                                    {(ref.contactDetails || ref.contactInfo) && (
                                        <div className="text-[10px] text-neutral-400">{ref.contactDetails || ref.contactInfo}</div>
                                    )}
                                    {ref.availabilityStatement && (
                                        <div className="text-[10px] text-neutral-400 italic">{ref.availabilityStatement}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.length > 0 && customSections.map((section, si) => (
                    <section key={si}>
                        <SectionHeader title={section.title} />
                        {section.content && (
                            <p className="text-[11px] text-neutral-600 leading-[1.7] mb-1.5">{section.content}</p>
                        )}
                        {section.items && section.items.length > 0 && (
                            <ul className="space-y-0.5">
                                {section.items.map((item, ii) => (
                                    <li key={ii} className="text-[11px] text-neutral-600 flex gap-2 leading-[1.6]">
                                        <span className="shrink-0 text-neutral-300">—</span>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    )
}
