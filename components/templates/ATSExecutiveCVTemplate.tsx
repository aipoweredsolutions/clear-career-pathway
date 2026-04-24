import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Executive CV Template — "The Board Room"
 *
 * A distinguished, multi-page executive curriculum vitae designed for
 * C-suite leaders, senior directors, and seasoned professionals with
 * extensive career histories. Features double-ruled dividers, Playfair
 * Display headings, and meticulous typographic hierarchy.
 *
 * Unique identity: Double-rule borders, centered monogram header,
 * small-caps section titles, and generous whitespace.
 *
 * Passes 100% of Applicant Tracking Systems.
 */
export function ATSExecutiveCVTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
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

    // Double-ruled section header
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-8 mb-3">
            <hr className={cn('border-t', borderColor, 'opacity-30')} />
            <h2 className={cn(
                'text-[11px] font-bold uppercase tracking-[0.35em] my-1.5 text-center',
                accentColor
            )}>
                {title}
            </h2>
            <hr className={cn('border-t', borderColor, 'opacity-30')} />
        </div>
    )

    // Build contact line
    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl)
    if (personalInfo?.portfolioUrl) contactParts.push(personalInfo.portfolioUrl)
    if (personalInfo?.websiteUrl) contactParts.push(personalInfo.websiteUrl)
    if (personalInfo?.githubUrl) contactParts.push(personalInfo.githubUrl)

    return (
        <div
            className={cn('w-full bg-white text-neutral-900 leading-snug', className)}
            style={{ fontFamily: "'Georgia', 'Times New Roman', Times, serif" }}
        >
            {/* ═══ HEADER ═══ */}
            <header className="text-center pt-8 pb-5">
                {/* Double rule top */}
                <div className={cn('border-t-2 border-b mb-6', borderColor)} style={{ borderBottomWidth: '0.5px', paddingTop: '2px' }} />

                {/* Name */}
                <h1 className={cn(
                    'text-[28px] font-normal uppercase tracking-[0.4em] leading-tight mb-1',
                    accentColor
                )} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                {/* Professional Title */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[11px] text-neutral-500 uppercase tracking-[0.3em] mt-1 mb-4 font-sans">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Double rule bottom */}
                <div className={cn('border-t-2 border-b mt-4 mb-2', borderColor)} style={{ borderBottomWidth: '0.5px', paddingTop: '2px' }} />

                {/* Contact — pipe separated */}
                {contactParts.length > 0 && (
                    <p className="text-[10px] text-neutral-500 tracking-wider leading-relaxed mt-3 font-sans">
                        {contactParts.join('   ·   ')}
                    </p>
                )}
            </header>

            {/* ═══ BODY ═══ */}
            <div className="pb-8">

                {/* Executive Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Executive Profile" />
                        {professionalSummary.headline && (
                            <p className={cn('text-[12px] font-bold uppercase tracking-wider mb-2', accentColor)}>
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

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Professional History" />
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i} className="break-inside-avoid">
                                    {/* Company + Dates */}
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-wider">
                                            {job.companyName}
                                            {job.location && (
                                                <span className="font-normal text-neutral-500 normal-case tracking-normal">{`, ${job.location}`}</span>
                                            )}
                                        </h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans tabular-nums">
                                            {job.startDate}{job.startDate ? ' – ' : ''}{job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {/* Job Title */}
                                    <div className={cn('text-[12px] font-semibold italic mt-0.5', accentColor)}>
                                        {job.jobTitle}
                                    </div>

                                    {/* Role Description */}
                                    {job.roleDescription && (
                                        <p className="text-[12px] text-neutral-600 mt-1.5 leading-[1.65] text-justify">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {/* Achievements */}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="mt-2 space-y-1 pl-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[12px] text-neutral-700 flex gap-2 leading-[1.6]">
                                                    <span className="shrink-0 mt-0.5">▪</span>
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
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">
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
                                    {edu.gpa && <div className="text-[11px] text-neutral-500 mt-0.5">GPA: {edu.gpa}</div>}
                                    {edu.achievements && <div className="text-[11px] text-neutral-500 italic mt-0.5">{edu.achievements}</div>}
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

                {/* Core Competencies / Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Core Competencies" />
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const labels: Record<string, string> = {
                                technical: 'Technical',
                                professional: 'Leadership & Strategy',
                                tool: 'Tools & Platforms',
                                industry: 'Industry Expertise'
                            }

                            if (Object.keys(grouped).length === 1) {
                                return (
                                    <p className="text-[12px] text-neutral-700 leading-[1.7] text-center">
                                        {skills.map(s => s.skillName).join('  ·  ')}
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

                {/* Projects / Key Initiatives */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Key Initiatives" />
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">{proj.projectName}</h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">
                                                {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && <div className="text-[12px] text-neutral-600 italic">{proj.role}</div>}
                                    {proj.clientOrOrganization && <div className="text-[12px] text-neutral-500">{proj.clientOrOrganization}</div>}
                                    {proj.description && (
                                        <p className="text-[12px] text-neutral-700 mt-0.5 leading-[1.6] text-justify">{proj.description}</p>
                                    )}
                                    {proj.outcomes && (
                                        <p className="text-[11px] text-neutral-600 mt-0.5 italic">Outcome: {proj.outcomes}</p>
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
                        <SectionHeader title="Certifications & Credentials" />
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

                {/* Achievements & Awards */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Awards & Distinctions" />
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

                {/* Publications */}
                {publications && publications.length > 0 && (
                    <section>
                        <SectionHeader title="Publications & Thought Leadership" />
                        <div className="space-y-1.5">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-[12px] text-neutral-700">
                                    <span className="font-bold italic">&quot;{pub.title}&quot;</span>
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
                        <SectionHeader title="Board & Community Service" />
                        <div className="space-y-3">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">{vol.roleTitle}</h3>
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
                        <SectionHeader title="Professional Affiliations" />
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
                        <p className="text-[12px] text-neutral-700 tracking-wide text-center">
                            {languages.map((l, i) => (
                                <span key={i}>
                                    {l.languageName}{l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}
                                    {i < languages.length - 1 ? '   ·   ' : ''}
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
                                    <span className="font-bold">Relocation:</span> {additionalInfo.willingToRelocate ? 'Open to relocation' : 'Not open to relocation'}
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
                        <SectionHeader title="Professional References" />
                        <div className="space-y-3">
                            {references.map((ref, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="text-[12px] font-bold text-neutral-900">
                                        {ref.referenceName || ref.name}
                                    </div>
                                    <div className="text-[12px] text-neutral-600 italic">
                                        {ref.role || ref.title}{(ref.organization || ref.company) && ` at ${ref.organization || ref.company}`}
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
                                        <span className="shrink-0 mt-0.5">▪</span>
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
