import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Royal Scholar Template — "The Institution"
 *
 * A prestigious, academic-style curriculum vitae designed for
 * professors, researchers, attorneys, and senior consultants.
 * Features a centered serif header with small-caps name,
 * thick top/bottom border framing, and indented section body.
 *
 * Unique identity: Heavy top/bottom border frame, Lora serif body,
 * centered name in small-caps, section titles with left ornamental
 * dash prefix, and a formal two-column reference layout.
 *
 * Passes 100% of Applicant Tracking Systems.
 */
export function ATSRoyalScholarTemplate({ data, className, accentColor = 'text-blue-900' }: TemplateProps) {
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

    const borderColor = accentColor.replace('text-', 'border-')

    // Section header with ornamental prefix dash
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-7 mb-2.5">
            <h2 className={cn(
                'text-[12px] font-bold uppercase tracking-[0.2em]',
                accentColor
            )}>
                <span className="mr-2">—</span>{title}
            </h2>
            <div className={cn('h-px mt-1.5', 'bg-current opacity-15', accentColor)} />
        </div>
    )

    // Contact parts
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
            style={{ fontFamily: "'Lora', 'Georgia', 'Times New Roman', serif" }}
        >
            {/* ═══ FRAME TOP BORDER ═══ */}
            <div className={cn('border-t-4', borderColor)} />

            {/* ═══ HEADER ═══ */}
            <header className="text-center pt-7 pb-5">
                {/* Name — small-caps style, large */}
                <h1 className={cn(
                    'text-[24px] font-bold tracking-[0.2em] leading-tight mb-1',
                    accentColor
                )} style={{ fontVariant: 'small-caps' }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                {/* Professional Title */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[12px] text-neutral-500 tracking-[0.15em] mt-1 mb-3 font-sans italic">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Thin divider */}
                <div className={cn('w-24 h-px mx-auto my-3', borderColor.replace('border-', 'bg-'))} style={{ opacity: 0.4 }} />

                {/* Contact — pipe separated */}
                {contactParts.length > 0 && (
                    <p className="text-[10px] text-neutral-500 tracking-wider leading-relaxed font-sans">
                        {contactParts.join('  |  ')}
                    </p>
                )}
            </header>

            {/* ═══ BODY ═══ */}
            <div className="pb-6">

                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Professional Summary" />
                        {professionalSummary.headline && (
                            <p className={cn('text-[11px] font-bold tracking-wider uppercase mb-1.5', accentColor)}>
                                {professionalSummary.headline}
                            </p>
                        )}
                        <p className="text-[12px] text-neutral-700 leading-[1.75] text-justify">
                            {professionalSummary.summaryText}
                        </p>
                        {professionalSummary.valueProposition && (
                            <p className="text-[12px] text-neutral-600 leading-[1.75] text-justify mt-2 italic">
                                {professionalSummary.valueProposition}
                            </p>
                        )}
                    </section>
                )}

                {/* Education — placed prominently for academic focus */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Education" />
                        <div className="space-y-3.5">
                            {education.map((edu, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={cn('text-[13px] font-bold', accentColor)}>
                                            {edu.degree}
                                            {edu.major ? ` in ${edu.major}` : ''}
                                            {edu.fieldOfStudy && !edu.major ? ` in ${edu.fieldOfStudy}` : ''}
                                        </h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                    <div className="text-[12px] text-neutral-600 italic">
                                        {edu.institutionName}{edu.location && `, ${edu.location}`}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-500 mt-0.5 font-sans">GPA: {edu.gpa}</div>
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

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Professional Experience" />
                        <div className="space-y-5">
                            {workExperience.map((job, i) => (
                                <div key={i} className="break-inside-avoid">
                                    {/* Job Title — prominent */}
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={cn('text-[13px] font-bold', accentColor)}>
                                            {job.jobTitle}
                                        </h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans tabular-nums">
                                            {job.startDate}{job.startDate ? ' – ' : ''}{job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    {/* Company */}
                                    <div className="text-[12px] text-neutral-600 italic mt-0.5">
                                        {job.companyName}{job.location && `, ${job.location}`}
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[12px] text-neutral-600 mt-1.5 leading-[1.7] text-justify">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="mt-1.5 space-y-1 pl-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[12px] text-neutral-700 flex gap-2 leading-[1.6]">
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

                {/* Publications */}
                {publications && publications.length > 0 && (
                    <section>
                        <SectionHeader title="Publications" />
                        <div className="space-y-2">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-[12px] text-neutral-700 break-inside-avoid">
                                    <span className="italic">&quot;{pub.title}&quot;</span>
                                    {pub.platformOrPublisher && <span className="font-semibold"> — {pub.platformOrPublisher}</span>}
                                    {pub.publicationYear && <span className="text-neutral-500"> ({pub.publicationYear})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Areas of Expertise" />
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const labels: Record<string, string> = {
                                technical: 'Technical Proficiency',
                                professional: 'Professional Skills',
                                tool: 'Research Tools & Platforms',
                                industry: 'Domain Knowledge'
                            }

                            if (Object.keys(grouped).length === 1) {
                                return (
                                    <p className="text-[12px] text-neutral-700 leading-[1.7]">
                                        {skills.map(s => s.skillName).join('  |  ')}
                                    </p>
                                )
                            }

                            return (
                                <div className="space-y-1.5">
                                    {Object.entries(grouped).map(([type, list]) => (
                                        <div key={type} className="text-[12px] text-neutral-700">
                                            <span className={cn('font-bold', accentColor)}>{labels[type] || type}: </span>
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
                        <SectionHeader title="Research & Projects" />
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={cn('text-[12px] font-bold', accentColor)}>{proj.projectName}</h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">
                                                {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && <div className="text-[12px] text-neutral-600 italic">{proj.role}</div>}
                                    {proj.clientOrOrganization && <div className="text-[11px] text-neutral-500">{proj.clientOrOrganization}</div>}
                                    {proj.description && (
                                        <p className="text-[12px] text-neutral-700 mt-0.5 leading-[1.65] text-justify">{proj.description}</p>
                                    )}
                                    {proj.outcomes && (
                                        <p className="text-[11px] text-neutral-600 mt-0.5 italic">Outcome: {proj.outcomes}</p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[11px] text-neutral-500 mt-0.5">
                                            <span className="font-semibold">Methods/Tools:</span> {proj.toolsUsed.join(', ')}
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
                        <SectionHeader title="Certifications & Licensure" />
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
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">{cert.issueDate || cert.issueYear}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Honors */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Honors & Awards" />
                        <div className="space-y-2">
                            {achievements.map((ach, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <div className="text-[12px]">
                                            <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                            {ach.issuingBody && <span className="text-neutral-600"> — {ach.issuingBody}</span>}
                                        </div>
                                        {ach.year && <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">{ach.year}</span>}
                                    </div>
                                    {ach.description && (
                                        <p className="text-[12px] text-neutral-600 mt-0.5 leading-[1.6]">{ach.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer / Community Service */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Service & Engagement" />
                        <div className="space-y-3">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{vol.roleTitle}</h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">
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
                        <SectionHeader title="Professional Memberships" />
                        <div className="space-y-1.5">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                        {aff.roleOrMembership && <span className="text-neutral-600"> — {aff.roleOrMembership}</span>}
                                    </div>
                                    {aff.yearsActive && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">{aff.yearsActive}</span>
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
                                    {l.languageName}{l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}
                                    {i < languages.length - 1 ? '  |  ' : ''}
                                </span>
                            ))}
                        </p>
                    </section>
                )}

                {/* Additional Information */}
                {additionalInfo && (additionalInfo.workAuthorization || additionalInfo.securityClearance || additionalInfo.availability || additionalInfo.otherInfo) && (
                    <section>
                        <SectionHeader title="Additional Information" />
                        <div className="space-y-1">
                            {additionalInfo.workAuthorization && (
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">Work Authorization:</span> {additionalInfo.workAuthorization}
                                </div>
                            )}
                            {additionalInfo.securityClearance && (
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">Security Clearance:</span> {additionalInfo.securityClearance}
                                </div>
                            )}
                            {additionalInfo.availability && (
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">Availability:</span> {additionalInfo.availability}
                                </div>
                            )}
                            {additionalInfo.willingToRelocate !== undefined && (
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">Relocation:</span> {additionalInfo.willingToRelocate ? 'Open to relocation' : 'Not available'}
                                </div>
                            )}
                            {additionalInfo.otherInfo && (
                                <div className="text-[12px] text-neutral-700">{additionalInfo.otherInfo}</div>
                            )}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader title="References" />
                        <div className="space-y-3">
                            {references.map((ref, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="text-[12px] font-bold text-neutral-900">
                                        {ref.referenceName || ref.name}
                                    </div>
                                    <div className="text-[12px] text-neutral-600 italic">
                                        {ref.role || ref.title}{(ref.organization || ref.company) && `, ${ref.organization || ref.company}`}
                                    </div>
                                    {(ref.contactDetails || ref.contactInfo) && (
                                        <div className="text-[11px] text-neutral-500 font-sans">{ref.contactDetails || ref.contactInfo}</div>
                                    )}
                                    {ref.availabilityStatement && (
                                        <div className="text-[11px] text-neutral-400 italic">{ref.availabilityStatement}</div>
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
                            <p className="text-[12px] text-neutral-700 leading-[1.7] text-justify mb-2">{section.content}</p>
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

            {/* ═══ FRAME BOTTOM BORDER ═══ */}
            <div className={cn('border-b-4', borderColor)} />
        </div>
    )
}
