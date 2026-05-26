import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Cornerstone Template — Rebuilt
 *
 * Modern executive single-column. Clean sans-serif throughout.
 * Accent system via Tailwind class string — no inline fontFamily anywhere.
 * Section headers: small-caps label + full-width rule with accent left cap.
 * Default accent: slate-800 (works without any colour selection).
 *
 * 100% ATS-compliant single-column layout.
 */
export function ATSCornerstoneTemplate({ data, className, accentColor = 'text-slate-800' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        achievements,
        publications,
        volunteerExperience,
        languages,
        professionalAffiliations,
        references,
        additionalInfo,
        customSections,
    } = data

    // Derive border / bg from the text- accent class
    const accentBorder = accentColor.replace('text-', 'border-').split(' ')[0]
    const accentBg     = accentColor.replace('text-', 'bg-').split(' ')[0]

    // ── Section header: sharp full-width rectangle ──────
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex items-center mb-5 mt-8 w-full">
            <h2 className={cn(
                'w-full text-[11px] font-bold uppercase tracking-widest px-4 py-2 bg-neutral-100 rounded-none',
                accentColor
            )}>
                {title}
            </h2>
        </div>
    )

    // ── Bullet point ──────────────────────────────────────────────────────────
    const Bullet = ({ text }: { text: string }) => (
        <li className="flex gap-3 text-[12.5px] text-neutral-600 leading-[1.75]">
            <span className={cn('shrink-0 mt-[9px] w-1.5 h-1.5 rounded-none', accentBg, 'opacity-70')} />
            <span>{text}</span>
        </li>
    )

    // ── Date formatter ────────────────────────────────────────────────────────
    const fmtDate = (d?: string) => {
        if (!d) return ''
        const parsed = new Date(d)
        if (isNaN(parsed.getTime())) return d
        return parsed.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    }
    const dateRange = (start?: string, end?: string, current?: boolean) => {
        const s = fmtDate(start)
        const e = current ? 'Present' : fmtDate(end)
        if (s && e) return `${s} – ${e}`
        return s || e || ''
    }

    // ── Contact row ───────────────────────────────────────────────────────────
    const contactParts: string[] = []
    if (personalInfo?.email)        contactParts.push(personalInfo.email)
    if (personalInfo?.phone)        contactParts.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc)                        contactParts.push(loc)
    if (personalInfo?.linkedinUrl)  contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))
    if (personalInfo?.portfolioUrl) contactParts.push(personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div className={cn(
            'w-full bg-white text-neutral-800 font-sans leading-relaxed',
            className
        )}>

            {/* ════════════════════════════════════════════
                HEADER
            ════════════════════════════════════════════ */}
            <header className="pb-6 mb-2 border-b border-neutral-100">
                {/* Name */}
                <h1 className="text-[34px] font-bold tracking-tight text-neutral-900 leading-none mb-2">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                {/* Professional title */}
                {personalInfo?.professionalTitle && (
                    <p className={cn('text-[14px] font-medium mb-6', accentColor)}>
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Contact row */}
                {contactParts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        {contactParts.map((part, i) => (
                            <span key={i} className="inline-flex items-center px-3 py-1 rounded-none bg-neutral-50 text-[11.5px] text-neutral-500 border border-neutral-100">
                                {part}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* ════════════════════════════════════════════
                COVER LETTER
            ════════════════════════════════════════════ */}
            {data.documentType === 'cover_letter' ? (
                <div className="pt-2 pb-12 space-y-6">
                    <div className="space-y-0.5 text-[12.5px]">
                        <p className="text-neutral-400 mb-5">
                            {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        {data.coverLetter?.recipientName  && <p className="font-semibold text-neutral-900">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName    && <p className="font-semibold text-neutral-900">{data.coverLetter.companyName}</p>}
                    </div>
                    <p className="text-[12.5px] text-neutral-800">
                        Dear {data.coverLetter?.recipientName || 'Hiring Manager'},
                    </p>
                    <div className="space-y-4">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[12.5px] leading-[1.75] text-neutral-700">{para}</p>
                        )) || (
                            <p className="text-neutral-400 italic text-[12.5px]">Your cover letter will appear here…</p>
                        )}
                    </div>
                    <div className="space-y-1 pt-4">
                        <p className="text-[12.5px] text-neutral-700">Sincerely,</p>
                        <p className="text-[12.5px] font-semibold text-neutral-900">{personalInfo?.fullName}</p>
                    </div>
                </div>

            /* ════════════════════════════════════════════
               REFERENCES PAGE
            ════════════════════════════════════════════ */
            ) : data.documentType === 'references' ? (
                <div className="pt-2 pb-12">
                    <SectionHeader title="Professional References" />
                    <div className="space-y-5">
                        {references?.map((ref, i) => (
                            <div key={i} className="space-y-0.5">
                                <p className="text-[13px] font-semibold text-neutral-900">
                                    {ref.referenceName || ref.name}
                                </p>
                                <p className="text-[12px] text-neutral-500">
                                    {ref.role || ref.title}
                                    {(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}
                                </p>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <p className="text-[11.5px] text-neutral-400">{ref.contactDetails || ref.contactInfo}</p>
                                )}
                                {ref.availabilityStatement && (
                                    <p className="text-[11px] text-neutral-400 italic">{ref.availabilityStatement}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            /* ════════════════════════════════════════════
               RESUME BODY
            ════════════════════════════════════════════ */
            ) : (
                <>
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Professional Summary" />
                            <p className="text-[12.5px] text-neutral-600 leading-[1.75]">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Experience" />
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        {/* Company + Date */}
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[13.5px] font-bold text-neutral-900">
                                                {job.companyName}
                                                {job.location && (
                                                    <span className="font-normal text-neutral-400 text-[12px] ml-2">
                                                        · {job.location}
                                                    </span>
                                                )}
                                            </h3>
                                            <span className="text-[11px] text-neutral-400 shrink-0">
                                                {dateRange(job.startDate, job.endDate, job.isCurrent)}
                                            </span>
                                        </div>

                                        {/* Job Title */}
                                        <p className={cn('text-[12.5px] font-semibold mb-2', accentColor)}>
                                            {job.jobTitle}
                                        </p>

                                        {/* Role description */}
                                        {job.roleDescription && (
                                            <p className="text-[12px] text-neutral-600 leading-[1.65] mb-2">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {/* Achievements */}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-1.5">
                                                {job.achievements.map((ach, j) => (
                                                    <Bullet key={j} text={ach.achievementText} />
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
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[13px] font-bold text-neutral-900">
                                                {edu.degree}
                                                {edu.major        ? ` in ${edu.major}`        : ''}
                                                {edu.fieldOfStudy && !edu.major ? ` in ${edu.fieldOfStudy}` : ''}
                                            </h3>
                                            <span className="text-[11px] text-neutral-400 shrink-0">
                                                {edu.endYear || edu.startYear}
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-neutral-500">
                                            {edu.institutionName}
                                            {edu.location && `, ${edu.location}`}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-[11.5px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</p>
                                        )}
                                        {edu.achievements && (
                                            <p className="text-[11.5px] text-neutral-400 italic mt-0.5 leading-relaxed">
                                                {edu.achievements}
                                            </p>
                                        )}
                                        {edu.coursework && (
                                            <p className="text-[11.5px] text-neutral-400 mt-0.5">
                                                <span className="font-semibold text-neutral-600">Coursework:</span> {edu.coursework}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills — Core Competencies */}
                    {skills && skills.length > 0 && (() => {
                        const grouped = skills.reduce((acc, s) => {
                            const t = s.skillType || 'professional'
                            if (!acc[t]) acc[t] = []
                            acc[t].push(s)
                            return acc
                        }, {} as Record<string, typeof skills>)

                        const labels: Record<string, string> = {
                            technical:    'Technical',
                            professional: 'Professional',
                            tool:         'Tools & Platforms',
                            industry:     'Industry Expertise',
                        }

                        const isUngrouped = Object.keys(grouped).length === 1

                        return (
                            <section>
                                <SectionHeader title="Core Competencies" />
                                {isUngrouped ? (
                                    <p className="text-[12.5px] text-neutral-600 leading-[1.7]">
                                        {skills.map((s, i) => (
                                            <span key={i}>
                                                {i > 0 && <span className="mx-2 text-neutral-300">·</span>}
                                                {s.skillName}
                                            </span>
                                        ))}
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {Object.entries(grouped).map(([type, list]) => (
                                            <div key={type} className="flex gap-3 text-[12px]">
                                                <span className="font-semibold text-neutral-700 shrink-0 w-36">
                                                    {labels[type] || type}
                                                </span>
                                                <span className="text-neutral-600">
                                                    {list.map((s, i) => (
                                                        <span key={i}>
                                                            {i > 0 && <span className="mx-2 text-neutral-300">·</span>}
                                                            {s.skillName}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )
                    })()}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <SectionHeader title="Key Projects" />
                            <div className="space-y-4">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[13px] font-bold text-neutral-900">
                                                {proj.projectName}
                                            </h3>
                                            {(proj.startDate || proj.endDate) && (
                                                <span className="text-[11px] text-neutral-400 shrink-0">
                                                    {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                                </span>
                                            )}
                                        </div>
                                        {proj.role && (
                                            <p className={cn('text-[12px] font-semibold mb-1', accentColor)}>
                                                {proj.role}
                                            </p>
                                        )}
                                        {proj.description && (
                                            <p className="text-[12px] text-neutral-600 leading-[1.65] mb-1">
                                                {proj.description}
                                            </p>
                                        )}
                                        {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                            <p className="text-[11.5px] text-neutral-400">
                                                <span className="font-semibold text-neutral-600">Stack:</span>{' '}
                                                {proj.toolsUsed.join(' · ')}
                                            </p>
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
                            <div className="space-y-2">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex items-baseline justify-between gap-4">
                                        <div className="text-[12.5px]">
                                            <span className="font-semibold text-neutral-900">{cert.certificationName}</span>
                                            {cert.issuingOrganization && (
                                                <span className="text-neutral-500"> · {cert.issuingOrganization}</span>
                                            )}
                                        </div>
                                        {(cert.issueDate || cert.issueYear) && (
                                            <span className="text-[11px] text-neutral-400 shrink-0">
                                                {cert.issueDate || cert.issueYear}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <SectionHeader title="Awards & Achievements" />
                            <div className="space-y-3">
                                {achievements.map((ach, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4">
                                            <div className="text-[12.5px]">
                                                <span className="font-semibold text-neutral-900">{ach.achievementTitle}</span>
                                                {ach.issuingBody && (
                                                    <span className="text-neutral-500"> · {ach.issuingBody}</span>
                                                )}
                                            </div>
                                            {ach.year && (
                                                <span className="text-[11px] text-neutral-400 shrink-0">{ach.year}</span>
                                            )}
                                        </div>
                                        {ach.description && (
                                            <p className="text-[11.5px] text-neutral-500 mt-0.5 leading-relaxed">
                                                {ach.description}
                                            </p>
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
                                    <div key={i} className="text-[12.5px] text-neutral-600 leading-relaxed">
                                        <span className="italic">&ldquo;{pub.title}&rdquo;</span>
                                        {pub.platformOrPublisher && (
                                            <span className="font-semibold text-neutral-800"> · {pub.platformOrPublisher}</span>
                                        )}
                                        {pub.publicationYear && (
                                            <span className="text-neutral-400"> ({pub.publicationYear})</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Volunteer */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Community Engagement" />
                            <div className="space-y-4">
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[13px] font-bold text-neutral-900">{vol.roleTitle}</h3>
                                            <span className="text-[11px] text-neutral-400 shrink-0">
                                                {vol.startDate}
                                                {vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-neutral-500">{vol.organizationName}</p>
                                        {vol.contributions && (
                                            <p className="text-[12px] text-neutral-600 mt-1 leading-[1.65]">
                                                {vol.contributions}
                                            </p>
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
                                    <div key={i} className="flex items-baseline justify-between gap-4">
                                        <div className="text-[12.5px]">
                                            <span className="font-semibold text-neutral-900">{aff.organizationName}</span>
                                            {aff.roleOrMembership && (
                                                <span className="text-neutral-500"> · {aff.roleOrMembership}</span>
                                            )}
                                        </div>
                                        {aff.yearsActive && (
                                            <span className="text-[11px] text-neutral-400 shrink-0">{aff.yearsActive}</span>
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
                            <div className="flex flex-wrap gap-x-6 gap-y-1">
                                {languages.map((l, i) => (
                                    <span key={i} className="text-[12.5px]">
                                        <span className="font-semibold text-neutral-900">{l.languageName}</span>
                                        {l.proficiencyLevel && (
                                            <span className="text-neutral-400 ml-1.5">({l.proficiencyLevel})</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* References */}
                    {references && references.length > 0 && (
                        <section>
                            <SectionHeader title="References" />
                            <div className="space-y-4">
                                {references.map((ref, i) => (
                                    <div key={i}>
                                        <p className="text-[13px] font-semibold text-neutral-900">
                                            {ref.referenceName || ref.name}
                                        </p>
                                        <p className="text-[12px] text-neutral-500 mt-0.5">
                                            {ref.role || ref.title}
                                            {(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}
                                        </p>
                                        {(ref.contactDetails || ref.contactInfo) && (
                                            <p className="text-[11.5px] text-neutral-400 mt-0.5">
                                                {ref.contactDetails || ref.contactInfo}
                                            </p>
                                        )}
                                        {ref.availabilityStatement && (
                                            <p className="text-[11px] text-neutral-400 italic mt-0.5">
                                                {ref.availabilityStatement}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Additional Information */}
                    {additionalInfo && (
                        additionalInfo.workAuthorization ||
                        additionalInfo.securityClearance ||
                        additionalInfo.availability ||
                        additionalInfo.otherInfo
                    ) && (
                        <section>
                            <SectionHeader title="Additional Information" />
                            <div className="space-y-1 text-[12px] text-neutral-600">
                                {additionalInfo.workAuthorization && (
                                    <p>
                                        <span className="font-semibold text-neutral-800">Work Authorisation: </span>
                                        {additionalInfo.workAuthorization}
                                    </p>
                                )}
                                {additionalInfo.securityClearance && (
                                    <p>
                                        <span className="font-semibold text-neutral-800">Security Clearance: </span>
                                        {additionalInfo.securityClearance}
                                    </p>
                                )}
                                {additionalInfo.availability && (
                                    <p>
                                        <span className="font-semibold text-neutral-800">Availability: </span>
                                        {additionalInfo.availability}
                                    </p>
                                )}
                                {additionalInfo.willingToRelocate !== undefined && (
                                    <p>
                                        <span className="font-semibold text-neutral-800">Relocation: </span>
                                        {additionalInfo.willingToRelocate ? 'Open to relocation' : 'Not seeking relocation'}
                                    </p>
                                )}
                                {additionalInfo.otherInfo && (
                                    <p className="mt-1">{additionalInfo.otherInfo}</p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((section, si) => (
                        <section key={si}>
                            <SectionHeader title={section.title} />
                            {section.content && (
                                <p className="text-[12px] text-neutral-600 leading-[1.65] mb-2">
                                    {section.content}
                                </p>
                            )}
                            {section.items && section.items.length > 0 && (
                                <ul className="space-y-1">
                                    {section.items.map((item, ii) => (
                                        <Bullet key={ii} text={item.text} />
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </>
            )}
        </div>
    )
}
