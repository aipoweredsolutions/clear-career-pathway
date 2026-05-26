import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Classic Left Template — Rebuilt
 *
 * Two-column editorial layout: narrow left label column, wide right content column.
 * CSS grid replaces all inline pixel widths — zero style={{}} attributes.
 * accentColor prop added (default: text-neutral-950).
 * Full section coverage added (was missing certs, achievements, projects, etc.).
 * Header corrected to left-aligned to match the body layout.
 *
 * 100% ATS-compliant — single logical reading order, no floats or absolute positioning.
 */
export function ATSClassicLeftTemplate({ data, className, accentColor = 'text-neutral-950' }: TemplateProps) {
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

    // Derive accent variants
    const accentBorder = accentColor.replace('text-', 'border-').split(' ')[0]

    // ── Section wrapper: label left / content right ───────────────────────────
    const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
        <section className="grid grid-cols-[10rem_1fr] gap-x-8 border-t border-neutral-100 pt-5 pb-1">
            <div className="pt-0.5">
                <h2 className={cn(
                    'text-[9.5px] font-black uppercase tracking-[0.22em] leading-none',
                    accentColor
                )}>
                    {label}
                </h2>
            </div>
            <div>{children}</div>
        </section>
    )

    // ── Bullet ────────────────────────────────────────────────────────────────
    const Bullet = ({ text }: { text: string }) => (
        <li className="flex gap-2.5 text-[12.5px] text-neutral-600 leading-[1.65] pl-0">
            <span className="shrink-0 mt-[7px] w-[3px] h-[3px] rounded-full bg-neutral-400" />
            <span>{text}</span>
        </li>
    )

    // ── Date range formatter ──────────────────────────────────────────────────
    const fmtDate = (d?: string) => {
        if (!d) return ''
        const p = new Date(d)
        if (isNaN(p.getTime())) return d
        return p.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    }
    const dateRange = (start?: string, end?: string, current?: boolean) => {
        const s = fmtDate(start)
        const e = current ? 'Present' : fmtDate(end)
        if (s && e) return `${s} – ${e}`
        return s || e || ''
    }

    // ── Contact parts ─────────────────────────────────────────────────────────
    const contact: string[] = []
    if (personalInfo?.email)        contact.push(personalInfo.email)
    if (personalInfo?.phone)        contact.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc)                        contact.push(loc)
    if (personalInfo?.linkedinUrl)  contact.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))
    if (personalInfo?.portfolioUrl) contact.push(personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, ''))
    if (personalInfo?.websiteUrl)   contact.push(personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div className={cn('w-full bg-white text-neutral-900 font-sans leading-relaxed p-10 md:p-12', className)}>

            {/* ════════════════════════════════════════════
                HEADER
            ════════════════════════════════════════════ */}
            <header className="pb-6">
                <h1 className="text-[28px] font-black tracking-tight text-neutral-950 leading-none mb-1.5">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                {personalInfo?.professionalTitle && (
                    <p className={cn('text-[13px] font-medium mb-3', accentColor)}>
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {contact.length > 0 && (
                    <div className="flex flex-wrap items-center gap-y-1">
                        {contact.map((part, i) => (
                            <span key={i} className="flex items-center">
                                {i > 0 && <span className="mx-3 text-neutral-300 text-[10px]">·</span>}
                                <span className="text-[11.5px] text-neutral-500">{part}</span>
                            </span>
                        ))}
                    </div>
                )}

                <div className={cn('h-[1.5px] w-full mt-4', accentBorder, 'border-t-[1.5px]')} />
            </header>

            {/* ════════════════════════════════════════════
                COVER LETTER
            ════════════════════════════════════════════ */}
            {data.documentType === 'cover_letter' ? (
                <div className="pb-12 space-y-5">
                    <div className="space-y-0.5 text-[12.5px]">
                        <p className="text-neutral-400 mb-5">
                            {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        {data.coverLetter?.recipientName  && <p className="font-semibold">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName    && <p className="font-semibold">{data.coverLetter.companyName}</p>}
                    </div>
                    <p className="text-[12.5px]">Dear {data.coverLetter?.recipientName || 'Hiring Manager'},</p>
                    <div className="space-y-4">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[12.5px] leading-[1.75] text-neutral-700">{para}</p>
                        )) || <p className="text-neutral-400 italic text-[12.5px]">Cover letter content will appear here…</p>}
                    </div>
                    <div className="pt-4 space-y-1">
                        <p className="text-[12.5px]">Sincerely,</p>
                        <p className="text-[12.5px] font-semibold">{personalInfo?.fullName}</p>
                    </div>
                </div>

            /* ════════════════════════════════════════════
               REFERENCES PAGE
            ════════════════════════════════════════════ */
            ) : data.documentType === 'references' ? (
                <div className="pb-12">
                    <Section label="References">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {references?.map((ref, i) => (
                                <div key={i} className="space-y-0.5">
                                    <p className="text-[13px] font-semibold text-neutral-900">{ref.referenceName || ref.name}</p>
                                    <p className="text-[12px] text-neutral-500">
                                        {ref.role || ref.title}
                                        {(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}
                                    </p>
                                    {(ref.contactDetails || ref.contactInfo) && (
                                        <p className="text-[11.5px] text-neutral-400">{ref.contactDetails || ref.contactInfo}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>

            /* ════════════════════════════════════════════
               RESUME BODY
            ════════════════════════════════════════════ */
            ) : (
                <div className="space-y-0">

                    {/* Profile / Summary */}
                    {professionalSummary?.summaryText && (
                        <Section label="Profile">
                            {professionalSummary.headline && (
                                <p className="text-[13px] font-semibold text-neutral-800 mb-1.5">
                                    {professionalSummary.headline}
                                </p>
                            )}
                            <p className="text-[12.5px] text-neutral-600 leading-[1.7]">
                                {professionalSummary.summaryText}
                            </p>
                        </Section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <Section label="Experience">
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[13.5px] font-bold text-neutral-900 leading-snug">
                                                {job.jobTitle}
                                                <span className="font-normal text-neutral-500"> · {job.companyName}</span>
                                            </h3>
                                            <span className="text-[11px] text-neutral-400 shrink-0 tabular-nums">
                                                {dateRange(job.startDate, job.endDate, job.isCurrent)}
                                            </span>
                                        </div>

                                        {job.location && (
                                            <p className="text-[11.5px] text-neutral-400 mb-2">{job.location}</p>
                                        )}

                                        {job.roleDescription && (
                                            <p className="text-[12.5px] text-neutral-600 leading-[1.65] mb-2">
                                                {job.roleDescription}
                                            </p>
                                        )}

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
                        </Section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <Section label="Education">
                            <div className="space-y-5">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[13.5px] font-bold text-neutral-900">
                                                {edu.degree}
                                                {edu.major ? ` · ${edu.major}` : ''}
                                                {edu.fieldOfStudy && !edu.major ? ` · ${edu.fieldOfStudy}` : ''}
                                            </h3>
                                            <span className="text-[11px] text-neutral-400 shrink-0 tabular-nums">
                                                {edu.endYear || edu.startYear}
                                            </span>
                                        </div>
                                        <p className="text-[12.5px] text-neutral-500 mb-1">
                                            {edu.institutionName}
                                            {edu.location && ` · ${edu.location}`}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-[11.5px] text-neutral-400">GPA: {edu.gpa}</p>
                                        )}
                                        {edu.achievements && (
                                            <p className="text-[11.5px] text-neutral-400 leading-relaxed mt-0.5">
                                                {edu.achievements}
                                            </p>
                                        )}
                                        {edu.coursework && (
                                            <p className="text-[11.5px] text-neutral-400 mt-0.5">
                                                <span className="font-medium text-neutral-600">Coursework:</span> {edu.coursework}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <Section label="Skills">
                            {(() => {
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
                                    industry:     'Domain',
                                }

                                const isFlat = Object.keys(grouped).length === 1

                                if (isFlat) {
                                    return (
                                        <p className="text-[12.5px] text-neutral-600 leading-[1.7]">
                                            {skills.map((s, i) => (
                                                <span key={i}>
                                                    {i > 0 && <span className="mx-2 text-neutral-300">·</span>}
                                                    {s.skillName}
                                                </span>
                                            ))}
                                        </p>
                                    )
                                }

                                return (
                                    <div className="space-y-2.5">
                                        {Object.entries(grouped).map(([type, list]) => (
                                            <div key={type} className="grid grid-cols-[7rem_1fr] gap-x-4 text-[12.5px]">
                                                <span className="font-medium text-neutral-500 capitalize">
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
                                )
                            })()}
                        </Section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <Section label="Projects">
                            <div className="space-y-5">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[13px] font-bold text-neutral-900">{proj.projectName}</h3>
                                            {(proj.startDate || proj.endDate) && (
                                                <span className="text-[11px] text-neutral-400 shrink-0">
                                                    {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                                </span>
                                            )}
                                        </div>
                                        {proj.role && (
                                            <p className="text-[12px] text-neutral-500 mb-1">{proj.role}</p>
                                        )}
                                        {proj.description && (
                                            <p className="text-[12.5px] text-neutral-600 leading-[1.65] mb-1">
                                                {proj.description}
                                            </p>
                                        )}
                                        {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                            <p className="text-[11.5px] text-neutral-400">
                                                <span className="font-medium text-neutral-600">Stack: </span>
                                                {proj.toolsUsed.join(' · ')}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <Section label="Certifications">
                            <div className="space-y-2">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex items-baseline justify-between gap-4">
                                        <div className="text-[12.5px]">
                                            <span className="font-medium text-neutral-900">{cert.certificationName}</span>
                                            {cert.issuingOrganization && (
                                                <span className="text-neutral-400"> · {cert.issuingOrganization}</span>
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
                        </Section>
                    )}

                    {/* Achievements */}
                    {achievements && achievements.length > 0 && (
                        <Section label="Achievements">
                            <div className="space-y-3">
                                {achievements.map((ach, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4">
                                            <div className="text-[12.5px]">
                                                <span className="font-medium text-neutral-900">{ach.achievementTitle}</span>
                                                {ach.issuingBody && (
                                                    <span className="text-neutral-400"> · {ach.issuingBody}</span>
                                                )}
                                            </div>
                                            {ach.year && (
                                                <span className="text-[11px] text-neutral-400 shrink-0">{ach.year}</span>
                                            )}
                                        </div>
                                        {ach.description && (
                                            <p className="text-[11.5px] text-neutral-400 mt-0.5 leading-relaxed">
                                                {ach.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Publications */}
                    {publications && publications.length > 0 && (
                        <Section label="Publications">
                            <div className="space-y-2">
                                {publications.map((pub, i) => (
                                    <p key={i} className="text-[12.5px] text-neutral-600 leading-relaxed">
                                        <span className="italic">&ldquo;{pub.title}&rdquo;</span>
                                        {pub.platformOrPublisher && (
                                            <span className="font-medium text-neutral-800"> · {pub.platformOrPublisher}</span>
                                        )}
                                        {pub.publicationYear && (
                                            <span className="text-neutral-400"> ({pub.publicationYear})</span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Volunteer */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <Section label="Volunteering">
                            <div className="space-y-5">
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[13px] font-bold text-neutral-900">
                                                {vol.roleTitle}
                                                <span className="font-normal text-neutral-500"> · {vol.organizationName}</span>
                                            </h3>
                                            <span className="text-[11px] text-neutral-400 shrink-0">
                                                {vol.startDate}
                                                {vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                            </span>
                                        </div>
                                        {vol.contributions && (
                                            <p className="text-[12.5px] text-neutral-600 leading-[1.65]">
                                                {vol.contributions}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <Section label="Affiliations">
                            <div className="space-y-1.5">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i} className="flex items-baseline justify-between gap-4">
                                        <div className="text-[12.5px]">
                                            <span className="font-medium text-neutral-900">{aff.organizationName}</span>
                                            {aff.roleOrMembership && (
                                                <span className="text-neutral-400"> · {aff.roleOrMembership}</span>
                                            )}
                                        </div>
                                        {aff.yearsActive && (
                                            <span className="text-[11px] text-neutral-400 shrink-0">{aff.yearsActive}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <Section label="Languages">
                            <div className="flex flex-wrap gap-x-8 gap-y-1.5">
                                {languages.map((l, i) => (
                                    <span key={i} className="text-[12.5px]">
                                        <span className="font-medium text-neutral-900">{l.languageName}</span>
                                        {l.proficiencyLevel && (
                                            <span className="text-neutral-400 ml-2">({l.proficiencyLevel})</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Additional Info */}
                    {additionalInfo && (
                        additionalInfo.workAuthorization ||
                        additionalInfo.securityClearance ||
                        additionalInfo.availability ||
                        additionalInfo.otherInfo
                    ) && (
                        <Section label="Additional">
                            <div className="space-y-1 text-[12.5px] text-neutral-600">
                                {additionalInfo.workAuthorization && (
                                    <p><span className="font-medium text-neutral-800">Work Authorisation: </span>{additionalInfo.workAuthorization}</p>
                                )}
                                {additionalInfo.securityClearance && (
                                    <p><span className="font-medium text-neutral-800">Security Clearance: </span>{additionalInfo.securityClearance}</p>
                                )}
                                {additionalInfo.availability && (
                                    <p><span className="font-medium text-neutral-800">Availability: </span>{additionalInfo.availability}</p>
                                )}
                                {additionalInfo.willingToRelocate !== undefined && (
                                    <p><span className="font-medium text-neutral-800">Relocation: </span>
                                        {additionalInfo.willingToRelocate ? 'Open to relocation' : 'Not seeking relocation'}
                                    </p>
                                )}
                                {additionalInfo.otherInfo && (
                                    <p className="mt-1">{additionalInfo.otherInfo}</p>
                                )}
                            </div>
                        </Section>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((section, si) => (
                        <Section key={si} label={section.title}>
                            {section.content && (
                                <p className="text-[12.5px] text-neutral-600 leading-[1.65] mb-2">
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
                        </Section>
                    ))}
                </div>
            )}
        </div>
    )
}
