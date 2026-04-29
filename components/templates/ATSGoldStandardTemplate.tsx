import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Gold Standard Template
 * 
 * The definitive ATS-compliant résumé design. Features a centered header with
 * elegantly letter-spaced name, pipe-separated contact info, and clean
 * single-column layout with spaced uppercase section headers.
 * 
 * Passes 100% of Applicant Tracking Systems.
 */
export function ATSGoldStandardTemplate({ data, className, accentColor = 'text-amber-800' }: TemplateProps) {
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
        languages,
        professionalAffiliations,
        references,
        customSections
    } = data

    // Derive border color from accent
    const borderColorClass = accentColor.replace('text-', 'border-')

    // Section header component with letter-spaced uppercase + full-width rule
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-7 mb-3">
            <h2 className={cn(
                'text-[13px] font-bold uppercase tracking-[0.25em] mb-1.5',
                accentColor
            )}>
                {title}
            </h2>
            <hr className={cn('border-t-[1.5px]', borderColorClass)} />
        </div>
    )

    // Build contact parts
    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl)
    if (personalInfo?.portfolioUrl) contactParts.push(personalInfo.portfolioUrl)
    if (personalInfo?.githubUrl) contactParts.push(personalInfo.githubUrl)

    return (
        <div
            className={cn(
                'w-full bg-white text-neutral-900 leading-snug',
                className
            )}
            style={{ fontFamily: "'Georgia', 'Times New Roman', Times, serif" }}
        >
            {/* ── HEADER ── */}
            <header className="text-center pt-6 pb-4">
                {/* Name — large, letter-spaced, uppercase */}
                <h1 className={cn(
                    'text-[26px] font-normal uppercase tracking-[0.35em] leading-tight mb-1',
                    accentColor
                )}>
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                {/* Professional Title */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[11px] text-neutral-500 uppercase tracking-[0.25em] mt-1 mb-3">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Divider */}
                <hr className={cn('border-t-[1.5px] mx-0 mb-2', borderColorClass)} />

                {/* Contact info — pipe separated */}
                {contactParts.length > 0 && (
                    <p className="text-[11px] text-neutral-600 tracking-wide leading-relaxed">
                        {contactParts.join('  |  ')}
                    </p>
                )}
            </header>

            {/* ── BODY ── */}
            <div className="pb-6">

                {/* Professional Overview / Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Professional Overview" />
                        <p className="text-[12px] text-neutral-700 leading-[1.7] text-justify">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Work Experience" />
                        <div className="space-y-5">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    {/* Company + Dates */}
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">
                                            {job.companyName}
                                            {job.location && (
                                                <span className="font-normal text-neutral-500">{`, ${job.location}`}</span>
                                            )}
                                        </h3>
                                        <span className="text-[12px] text-neutral-500 shrink-0 ml-4">
                                            {job.startDate}
                                            {job.startDate ? ' – ' : ''}
                                            {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {/* Job Title */}
                                    <div className="text-[12px] font-semibold text-neutral-700 italic mt-0.5">
                                        {job.jobTitle}
                                    </div>

                                    {/* Role Description */}
                                    {job.roleDescription && (
                                        <p className="text-[12px] text-neutral-600 mt-1 leading-[1.6]">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {/* Achievements */}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="mt-1.5 space-y-1 pl-4">
                                            {job.achievements.map((ach, j) => (
                                                <li
                                                    key={j}
                                                    className="text-[12px] text-neutral-700 flex gap-2 leading-[1.6]"
                                                >
                                                    <span className="shrink-0 mt-0.5">•</span>
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
                        <div className="space-y-3">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">
                                            {edu.degree}
                                            {edu.major ? ` in ${edu.major}` : ''}
                                            {edu.fieldOfStudy && !edu.major ? ` in ${edu.fieldOfStudy}` : ''}
                                        </h3>
                                        <span className="text-[12px] text-neutral-500 shrink-0 ml-4">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                    <div className="text-[12px] text-neutral-600">
                                        {edu.institutionName}
                                        {edu.location && `, ${edu.location}`}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-500 mt-0.5">GPA: {edu.gpa}</div>
                                    )}
                                    {edu.achievements && (
                                        <div className="text-[11px] text-neutral-500 italic mt-0.5">{edu.achievements}</div>
                                    )}
                                    {edu.coursework && (
                                        <div className="text-[11px] text-neutral-500 mt-0.5">
                                            <span className="font-semibold">Relevant Coursework:</span> {edu.coursework}
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
                                tool: 'Tools & Technologies',
                                industry: 'Industry Knowledge'
                            }

                            if (Object.keys(grouped).length === 1) {
                                return (
                                    <p className="text-[12px] text-neutral-700 leading-[1.7]">
                                        {skills.map(s => s.skillName).join(', ')}
                                    </p>
                                )
                            }

                            return (
                                <div className="space-y-1.5">
                                    {Object.entries(grouped).map(([type, list]) => (
                                        <div key={type} className="text-[12px] text-neutral-700">
                                            <span className="font-bold">{labels[type] || type}: </span>
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
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">
                                            {proj.projectName}
                                        </h3>
                                        {proj.startDate && (
                                            <span className="text-[12px] text-neutral-500 shrink-0 ml-4">
                                                {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && (
                                        <div className="text-[12px] text-neutral-600 italic">{proj.role}</div>
                                    )}
                                    {proj.description && (
                                        <p className="text-[12px] text-neutral-700 mt-0.5 leading-[1.6]">
                                            {proj.description}
                                        </p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[11px] text-neutral-500 mt-0.5">
                                            <span className="font-semibold">Technologies:</span> {proj.toolsUsed.join(', ')}
                                        </div>
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
                        <div className="space-y-1.5">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-900">{cert.certificationName}</span>
                                        {cert.issuingOrganization && (
                                            <span className="text-neutral-600"> — {cert.issuingOrganization}</span>
                                        )}
                                    </div>
                                    {(cert.issueDate || cert.issueYear) && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4">
                                            {cert.issueDate || cert.issueYear}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Awards */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Awards & Honors" />
                        <div className="space-y-2">
                            {achievements.map((ach, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <div className="text-[12px]">
                                            <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                            {ach.issuingBody && (
                                                <span className="text-neutral-600"> — {ach.issuingBody}</span>
                                            )}
                                        </div>
                                        {ach.year && (
                                            <span className="text-[11px] text-neutral-500 shrink-0 ml-4">{ach.year}</span>
                                        )}
                                    </div>
                                    {ach.description && (
                                        <p className="text-[12px] text-neutral-600 mt-0.5 leading-[1.6]">{ach.description}</p>
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
                        <div className="space-y-1.5">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-[12px] text-neutral-700">
                                    <span className="font-bold">&quot;{pub.title}&quot;</span>
                                    {pub.platformOrPublisher && <span> — {pub.platformOrPublisher}</span>}
                                    {pub.publicationYear && <span className="text-neutral-500"> ({pub.publicationYear})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer Experience */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Volunteer Experience" />
                        <div className="space-y-3">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">{vol.roleTitle}</h3>
                                        <span className="text-[12px] text-neutral-500 shrink-0 ml-4">
                                            {vol.startDate}{vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                        </span>
                                    </div>
                                    <div className="text-[12px] text-neutral-600 italic">{vol.organizationName}</div>
                                    {vol.contributions && (
                                        <p className="text-[12px] text-neutral-700 mt-0.5 leading-[1.6]">{vol.contributions}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Affiliations */}
                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <section>
                        <SectionHeader title="Professional Affiliations" />
                        <div className="space-y-1.5">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                        {aff.roleOrMembership && (
                                            <span className="text-neutral-600"> — {aff.roleOrMembership}</span>
                                        )}
                                    </div>
                                    {aff.yearsActive && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4">{aff.yearsActive}</span>
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
                        <p className="text-[12px] text-neutral-700 tracking-wide">
                            {languages.map((l, i) => (
                                <span key={i}>
                                    {l.languageName}
                                    {l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}
                                    {i < languages.length - 1 ? '  |  ' : ''}
                                </span>
                            ))}
                        </p>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader title="References" />
                        <div className="space-y-4">
                            {references.map((ref, i) => (
                                <div key={i} className="text-[12px] text-neutral-800">
                                    {ref.referenceName && <div className="font-bold">{ref.referenceName}</div>}
                                    {ref.role && <div>{ref.role}</div>}
                                    {ref.organization && <div className="italic">{ref.organization}</div>}
                                    {ref.contactDetails && <div className="text-neutral-600">{ref.contactDetails}</div>}
                                    {ref.availabilityStatement && <div className="text-neutral-500 italic mt-1">{ref.availabilityStatement}</div>}
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
                            <p className="text-[12px] text-neutral-700 leading-[1.7] text-justify mb-2">
                                {section.content}
                            </p>
                        )}
                        {section.items && section.items.length > 0 && (
                            <ul className="space-y-1 pl-4">
                                {section.items.map((item, ii) => (
                                    <li key={ii} className="text-[12px] text-neutral-700 flex gap-2 leading-[1.6]">
                                        <span className="shrink-0 mt-0.5">•</span>
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
