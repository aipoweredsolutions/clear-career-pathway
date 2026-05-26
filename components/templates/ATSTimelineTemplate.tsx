import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Tailwind text- class (e.g., 'text-slate-900')
}

/**
 * ATS Timeline Template — Rebuilt
 *
 * Stripped the timeline sidebar gimmick that broke ATS parsers.
 * Now a clean single-column layout with all sections supported.
 * Sans-serif, compact, professional. Section headers use a left-aligned
 * bold uppercase label with a subtle bottom border.
 *
 * 100% ATS-compliant single-column layout.
 */
export function ATSTimelineTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
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

    const bgColorClass = accentColor.replace('text-', 'bg-')

    // ── Section header ────────────────────────────────────────────────────────
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-7 mb-3 border-b border-neutral-100 pb-1">
            <h2 className={cn(
                'text-[13px] font-black uppercase tracking-[0.2em]',
                accentColor
            )}>
                {title}
            </h2>
        </div>
    )

    // ── Bullet ────────────────────────────────────────────────────────────────
    const Bullet = ({ text }: { text: string }) => (
        <li className="flex items-start gap-2.5 text-[11px] text-neutral-700 leading-relaxed">
            <span className={cn('mt-[6px] w-1 h-1 rounded-full shrink-0', bgColorClass)} />
            <span>{text}</span>
        </li>
    )

    // ── Date helpers ──────────────────────────────────────────────────────────
    const fmtDate = (d?: string) => {
        if (!d) return ''
        const parsed = new Date(d)
        if (isNaN(parsed.getTime())) return d
        return parsed.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    }
    const dateRange = (start?: string, end?: string, current?: boolean) => {
        const s = fmtDate(start)
        const e = current ? 'Present' : fmtDate(end)
        if (s && e) return `${s} — ${e}`
        return s || e || ''
    }

    // ── Contact parts ─────────────────────────────────────────────────────────
    const contactParts: string[] = []
    if (personalInfo?.email)        contactParts.push(personalInfo.email)
    if (personalInfo?.phone)        contactParts.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc)                        contactParts.push(loc)
    if (personalInfo?.linkedinUrl)  contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))
    if (personalInfo?.portfolioUrl) contactParts.push(personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div
            className={cn('w-full bg-white font-sans text-neutral-800 leading-snug', className)}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ════════ HEADER ════════ */}
            <header className="mb-4 border-b border-neutral-200 pb-4">
                <h1 className={cn(
                    'text-[28px] font-[900] tracking-tight leading-none mb-1',
                    accentColor
                )}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                {personalInfo?.professionalTitle && (
                    <p className="text-[12px] font-semibold text-neutral-500 tracking-wide uppercase mb-3">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {contactParts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        {contactParts.map((part, i) => (
                            <span key={i} className="flex items-center gap-3">
                                {i > 0 && (
                                    <span className="text-neutral-300 text-[8px]" aria-hidden="true">•</span>
                                )}
                                <span className="text-[10.5px] font-medium text-neutral-500">{part}</span>
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* ════════ COVER LETTER ════════ */}
            {data.documentType === 'cover_letter' ? (
                <div className="pt-4 pb-12 space-y-6">
                    <div className="space-y-0.5 text-[12.5px]">
                        <p className="text-neutral-400 mb-5">
                            {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        {data.coverLetter?.recipientName  && <p className="font-bold text-neutral-900">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName    && <p className="font-bold text-neutral-900">{data.coverLetter.companyName}</p>}
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
                        <p className="text-[12.5px] font-bold text-neutral-900">{personalInfo?.fullName}</p>
                    </div>
                </div>

            /* ════════ REFERENCES PAGE ════════ */
            ) : data.documentType === 'references' ? (
                <div className="pt-2 pb-12">
                    <SectionHeader title="Professional References" />
                    <div className="space-y-5">
                        {references?.map((ref, i) => (
                            <div key={i} className="space-y-0.5">
                                <p className="text-[12.5px] font-bold text-neutral-900">
                                    {ref.referenceName || ref.name}
                                </p>
                                <p className="text-[11.5px] text-neutral-500">
                                    {ref.role || ref.title}
                                    {(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}
                                </p>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <p className="text-[11px] text-neutral-400">{ref.contactDetails || ref.contactInfo}</p>
                                )}
                                {ref.availabilityStatement && (
                                    <p className="text-[10.5px] text-neutral-400 italic">{ref.availabilityStatement}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            /* ════════ RESUME BODY ════════ */
            ) : (
                <div className="space-y-1">
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Professional Profile" />
                            <p className="text-[11.5px] text-neutral-700 leading-relaxed">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Professional Experience" />
                            <div className="space-y-5">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline gap-4 mb-0.5">
                                            <h3 className="text-[13px] font-bold text-neutral-900 tracking-tight">
                                                {job.jobTitle}
                                            </h3>
                                            <span className="text-[10px] font-bold text-neutral-400 tabular-nums uppercase tracking-wider shrink-0">
                                                {dateRange(job.startDate, job.endDate, job.isCurrent)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className={cn('text-[11.5px] font-semibold', accentColor)}>
                                                {job.companyName}
                                            </span>
                                            {job.location && (
                                                <span className="text-[10.5px] text-neutral-400">· {job.location}</span>
                                            )}
                                        </div>

                                        {job.roleDescription && (
                                            <p className="text-[11px] text-neutral-500 mb-2 leading-relaxed italic">
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
                        </section>
                    )}

                    {/* Skills */}
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
                                <SectionHeader title="Technical Expertise" />
                                {isUngrouped ? (
                                    <div className="text-[11px] font-medium text-neutral-800 leading-relaxed flex flex-wrap items-center">
                                        {skills.map((s, i) => (
                                            <span key={i} className="flex items-center">
                                                {s.skillName}
                                                {i < skills.length - 1 && (
                                                    <span className="mx-1.5 text-neutral-300" aria-hidden="true">•</span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {Object.entries(grouped).map(([type, list]) => (
                                            <div key={type} className="flex gap-3 text-[11px]">
                                                <span className="font-bold text-neutral-700 shrink-0 w-32">
                                                    {labels[type] || type}
                                                </span>
                                                <span className="text-neutral-600 flex flex-wrap items-center">
                                                    {list.map((s, i) => (
                                                        <span key={i} className="flex items-center">
                                                            {s.skillName}
                                                            {i < list.length - 1 && (
                                                                <span className="mx-1.5 text-neutral-300" aria-hidden="true">•</span>
                                                            )}
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

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Education" />
                            <div className="space-y-3">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline gap-4">
                                            <h3 className="text-[12px] font-bold text-neutral-900">
                                                {edu.degree}
                                                {edu.major ? ` in ${edu.major}` : ''}
                                                {edu.fieldOfStudy && !edu.major ? ` in ${edu.fieldOfStudy}` : ''}
                                            </h3>
                                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest shrink-0">
                                                {edu.endYear || edu.startYear}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-neutral-500">
                                            {edu.institutionName}
                                            {edu.location && `, ${edu.location}`}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-[10.5px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</p>
                                        )}
                                        {edu.achievements && (
                                            <p className="text-[10.5px] text-neutral-400 italic mt-0.5 leading-relaxed">
                                                {edu.achievements}
                                            </p>
                                        )}
                                        {edu.coursework && (
                                            <p className="text-[10.5px] text-neutral-400 mt-0.5">
                                                <span className="font-semibold text-neutral-600">Coursework:</span> {edu.coursework}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <SectionHeader title="Key Projects" />
                            <div className="space-y-3">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline gap-4 mb-0.5">
                                            <h3 className="text-[12px] font-bold text-neutral-900">
                                                {proj.projectName}
                                            </h3>
                                            {(proj.startDate || proj.endDate) && (
                                                <span className="text-[10px] text-neutral-400 shrink-0">
                                                    {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                                </span>
                                            )}
                                        </div>
                                        {proj.role && (
                                            <p className={cn('text-[11px] font-semibold mb-0.5', accentColor)}>
                                                {proj.role}
                                            </p>
                                        )}
                                        {proj.description && (
                                            <p className="text-[11px] text-neutral-600 leading-relaxed mb-1">
                                                {proj.description}
                                            </p>
                                        )}
                                        {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                            <p className="text-[10.5px] text-neutral-400">
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
                            <div className="space-y-1.5">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex items-baseline justify-between gap-4">
                                        <div className="text-[11.5px]">
                                            <span className="font-bold text-neutral-800">{cert.certificationName}</span>
                                            {cert.issuingOrganization && (
                                                <span className="text-neutral-400"> · {cert.issuingOrganization}</span>
                                            )}
                                        </div>
                                        {(cert.issueYear || cert.issueDate) && (
                                            <span className="text-[10px] text-neutral-400 shrink-0">
                                                {cert.issueYear || cert.issueDate}
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
                            <div className="space-y-2.5">
                                {achievements.map((ach, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4">
                                            <div className="text-[11.5px]">
                                                <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                                {ach.issuingBody && (
                                                    <span className="text-neutral-500"> · {ach.issuingBody}</span>
                                                )}
                                            </div>
                                            {ach.year && (
                                                <span className="text-[10px] text-neutral-400 shrink-0">{ach.year}</span>
                                            )}
                                        </div>
                                        {ach.description && (
                                            <p className="text-[10.5px] text-neutral-500 mt-0.5 leading-relaxed">
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
                            <div className="space-y-1.5">
                                {publications.map((pub, i) => (
                                    <div key={i} className="text-[11.5px] text-neutral-600 leading-relaxed">
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

                    {/* Volunteer Experience */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Volunteer Experience" />
                            <div className="space-y-3">
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-4 mb-0.5">
                                            <h3 className="text-[12px] font-bold text-neutral-900">{vol.roleTitle}</h3>
                                            <span className="text-[10px] text-neutral-400 shrink-0">
                                                {vol.startDate}
                                                {vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-neutral-500">{vol.organizationName}</p>
                                        {vol.contributions && (
                                            <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
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
                                        <div className="text-[11.5px]">
                                            <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                            {aff.roleOrMembership && (
                                                <span className="text-neutral-500"> · {aff.roleOrMembership}</span>
                                            )}
                                        </div>
                                        {aff.yearsActive && (
                                            <span className="text-[10px] text-neutral-400 shrink-0">{aff.yearsActive}</span>
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
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                                {languages.map((l, i) => (
                                    <span key={i} className="text-[11.5px]">
                                        <span className="font-bold text-neutral-800">{l.languageName}</span>
                                        {l.proficiencyLevel && (
                                            <span className="text-neutral-400 ml-1">({l.proficiencyLevel})</span>
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
                            <div className="space-y-3">
                                {references.map((ref, i) => (
                                    <div key={i}>
                                        <p className="text-[12px] font-bold text-neutral-900">
                                            {ref.referenceName || ref.name}
                                        </p>
                                        <p className="text-[11px] text-neutral-500 mt-0.5">
                                            {ref.role || ref.title}
                                            {(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}
                                        </p>
                                        {(ref.contactDetails || ref.contactInfo) && (
                                            <p className="text-[10.5px] text-neutral-400 mt-0.5">
                                                {ref.contactDetails || ref.contactInfo}
                                            </p>
                                        )}
                                        {ref.availabilityStatement && (
                                            <p className="text-[10.5px] text-neutral-400 italic mt-0.5">
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
                            <div className="space-y-1 text-[11px] text-neutral-600">
                                {additionalInfo.workAuthorization && (
                                    <p>
                                        <span className="font-bold text-neutral-800">Work Authorisation: </span>
                                        {additionalInfo.workAuthorization}
                                    </p>
                                )}
                                {additionalInfo.securityClearance && (
                                    <p>
                                        <span className="font-bold text-neutral-800">Security Clearance: </span>
                                        {additionalInfo.securityClearance}
                                    </p>
                                )}
                                {additionalInfo.availability && (
                                    <p>
                                        <span className="font-bold text-neutral-800">Availability: </span>
                                        {additionalInfo.availability}
                                    </p>
                                )}
                                {additionalInfo.willingToRelocate !== undefined && (
                                    <p>
                                        <span className="font-bold text-neutral-800">Relocation: </span>
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
                                <p className="text-[11px] text-neutral-600 leading-relaxed mb-2">
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
                </div>
            )}
        </div>
    )
}
