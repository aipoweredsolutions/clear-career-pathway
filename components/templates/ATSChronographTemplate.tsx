import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Chronograph Template
 * 
 * A structured timeline format where dates are rigidly aligned on the left margin
 * and content flows on the right, separated by a thin vertical rule. Features an
 * asymmetric header with the name anchored top-left and contact details stacked
 * top-right in a monospaced column.
 * 
 * 100% ATS-compliant: dates and content are inline within flex rows,
 * read linearly by all ATS parsers.
 */
export function ATSChronographTemplate({ data, className, accentColor = 'text-neutral-950' }: TemplateProps) {
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
        customSections
    } = data

    const borderColorClass = accentColor.replace('text-', 'border-')

    // Section header with underline rule
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-8 mb-4">
            <h2 className={cn(
                'text-[11px] font-black uppercase tracking-[0.3em] pb-1.5',
                accentColor
            )}>
                {title}
            </h2>
            <hr className={cn('border-t', borderColorClass, 'opacity-30')} />
        </div>
    )

    // Timeline row: date on left, content on right with vertical divider
    const TimelineRow = ({ date, children }: { date: string; children: React.ReactNode }) => (
        <div className="flex items-start gap-0 mb-6 last:mb-0">
            {/* Date column — fixed width */}
            <div className="w-[110px] shrink-0 pt-0.5">
                <span className="text-[11px] font-bold text-neutral-400 tracking-wide" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                    {date}
                </span>
            </div>
            {/* Vertical divider */}
            <div className={cn('w-px shrink-0 self-stretch mr-5', 'bg-neutral-200')} />
            {/* Content column */}
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    )

    // Build contact info
    const contactLines: string[] = []
    if (personalInfo?.email) contactLines.push(personalInfo.email)
    if (personalInfo?.phone) contactLines.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactLines.push(loc)
    if (personalInfo?.linkedinUrl) contactLines.push(personalInfo.linkedinUrl)
    if (personalInfo?.githubUrl) contactLines.push(personalInfo.githubUrl)
    if (personalInfo?.portfolioUrl) contactLines.push(personalInfo.portfolioUrl)

    // Format dates helper
    const formatDateRange = (start?: string, end?: string, isCurrent?: boolean) => {
        const s = start ? new Date(start).getFullYear() : ''
        const e = isCurrent ? 'Present' : (end ? new Date(end).getFullYear() : '')
        if (s && e) return `${s} – ${e}`
        if (s) return `${s}`
        return ''
    }

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-relaxed', className)}
            style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
            {/* ── HEADER ── */}
            <header className="flex justify-between items-start mb-2 pb-5 border-b border-neutral-200">
                {/* Left: Name + Title */}
                <div>
                    <h1 className={cn('text-[28px] font-light tracking-[0.4em] uppercase leading-tight mb-1', accentColor)}>
                        {personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <p className="text-[12px] text-neutral-500 italic tracking-wide">
                            {personalInfo.professionalTitle}
                        </p>
                    )}
                </div>
                {/* Right: Contact details in monospaced stack */}
                <div className="text-right flex flex-col gap-0.5 pt-1">
                    {contactLines.map((line, i) => (
                        <div
                            key={i}
                            className="text-[10px] font-medium text-neutral-400 tracking-wide"
                            style={{ fontFamily: "'Courier New', Courier, monospace" }}
                        >
                            {line}
                        </div>
                    ))}
                </div>
            </header>

            {/* ── BODY ── */}
            <div>
                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Professional Summary" />
                        <p className="text-[12px] text-neutral-700 leading-[1.75] max-w-[95%]">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        {workExperience.map((job, i) => (
                            <TimelineRow
                                key={i}
                                date={formatDateRange(job.startDate, job.endDate, job.isCurrent)}
                            >
                                <h3 className={cn('text-[13px] font-bold tracking-tight', accentColor)}>
                                    {job.jobTitle}
                                </h3>
                                <div className="text-[11px] font-semibold text-neutral-500 mt-0.5">
                                    {job.companyName?.toUpperCase()}
                                    {job.location && <span className="font-normal"> · {job.location}</span>}
                                </div>
                                {job.roleDescription && (
                                    <p className="text-[11px] text-neutral-600 mt-2 leading-[1.6]">
                                        {job.roleDescription}
                                    </p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {job.achievements.map((ach, j) => (
                                            <li key={j} className="text-[11px] text-neutral-700 flex gap-2 leading-[1.6]">
                                                <span className="shrink-0 mt-0.5">•</span>
                                                <span>{ach.achievementText}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </TimelineRow>
                        ))}
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Education" />
                        {education.map((edu, i) => (
                            <TimelineRow key={i} date={edu.endYear?.toString() || edu.startYear?.toString() || ''}>
                                <h3 className={cn('text-[13px] font-bold', accentColor)}>
                                    {edu.degree}
                                    {edu.major ? ` in ${edu.major}` : ''}
                                    {edu.fieldOfStudy && !edu.major ? ` in ${edu.fieldOfStudy}` : ''}
                                </h3>
                                <div className="text-[11px] text-neutral-500 mt-0.5">
                                    {edu.institutionName}
                                    {edu.location && `, ${edu.location}`}
                                </div>
                                {edu.gpa && (
                                    <div className="text-[10px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</div>
                                )}
                                {edu.achievements && (
                                    <div className="text-[10px] text-neutral-500 italic mt-0.5">{edu.achievements}</div>
                                )}
                                {edu.coursework && (
                                    <div className="text-[10px] text-neutral-500 mt-0.5">
                                        <span className="font-semibold">Coursework:</span> {edu.coursework}
                                    </div>
                                )}
                            </TimelineRow>
                        ))}
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Projects" />
                        {projects.map((proj, i) => (
                            <TimelineRow
                                key={i}
                                date={proj.startDate ? `${new Date(proj.startDate).getFullYear()}${proj.endDate ? ` – ${new Date(proj.endDate).getFullYear()}` : ''}` : ''}
                            >
                                <h3 className={cn('text-[13px] font-bold', accentColor)}>{proj.projectName}</h3>
                                {proj.role && (
                                    <div className="text-[11px] text-neutral-500 italic">{proj.role}</div>
                                )}
                                {proj.description && (
                                    <p className="text-[11px] text-neutral-600 mt-1 leading-[1.6]">{proj.description}</p>
                                )}
                                {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                    <div className="text-[10px] text-neutral-400 mt-1">
                                        <span className="font-semibold">Tech:</span> {proj.toolsUsed.join(', ')}
                                    </div>
                                )}
                            </TimelineRow>
                        ))}
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

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <SectionHeader title="Certifications" />
                        {certifications.map((cert, i) => (
                            <TimelineRow key={i} date={cert.issueYear?.toString() || cert.issueDate || ''}>
                                <div className="text-[12px]">
                                    <span className="font-bold text-neutral-900">{cert.certificationName}</span>
                                    {cert.issuingOrganization && (
                                        <span className="text-neutral-500"> — {cert.issuingOrganization}</span>
                                    )}
                                </div>
                            </TimelineRow>
                        ))}
                    </section>
                )}

                {/* Achievements & Awards */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Awards & Honors" />
                        {achievements.map((ach, i) => (
                            <TimelineRow key={i} date={ach.year?.toString() || ''}>
                                <div className="text-[12px]">
                                    <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                    {ach.issuingBody && (
                                        <span className="text-neutral-500"> — {ach.issuingBody}</span>
                                    )}
                                </div>
                                {ach.description && (
                                    <p className="text-[11px] text-neutral-600 mt-0.5 leading-[1.6]">{ach.description}</p>
                                )}
                            </TimelineRow>
                        ))}
                    </section>
                )}

                {/* Publications */}
                {publications && publications.length > 0 && (
                    <section>
                        <SectionHeader title="Publications" />
                        {publications.map((pub, i) => (
                            <TimelineRow key={i} date={pub.publicationYear?.toString() || ''}>
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">&quot;{pub.title}&quot;</span>
                                    {pub.platformOrPublisher && <span> — {pub.platformOrPublisher}</span>}
                                </div>
                            </TimelineRow>
                        ))}
                    </section>
                )}

                {/* Volunteer Experience */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Volunteer Experience" />
                        {volunteerExperience.map((vol, i) => (
                            <TimelineRow
                                key={i}
                                date={vol.startDate ? `${new Date(vol.startDate).getFullYear()}${vol.endDate ? ` – ${new Date(vol.endDate).getFullYear()}` : ' – Present'}` : ''}
                            >
                                <h3 className={cn('text-[13px] font-bold', accentColor)}>{vol.roleTitle}</h3>
                                <div className="text-[11px] text-neutral-500 italic">{vol.organizationName}</div>
                                {vol.contributions && (
                                    <p className="text-[11px] text-neutral-600 mt-1 leading-[1.6]">{vol.contributions}</p>
                                )}
                            </TimelineRow>
                        ))}
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
                                            <span className="text-neutral-500"> — {aff.roleOrMembership}</span>
                                        )}
                                    </div>
                                    {aff.yearsActive && (
                                        <span className="text-[11px] text-neutral-400 shrink-0 ml-4">{aff.yearsActive}</span>
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
                        <p className="text-[12px] text-neutral-700">
                            {languages.map((l, i) => (
                                <span key={i}>
                                    {l.languageName}
                                    {l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}
                                    {i < languages.length - 1 ? '  ·  ' : ''}
                                </span>
                            ))}
                        </p>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader title="References" />
                        <div className="space-y-3">
                            {references.map((ref, i) => (
                                <div key={i} className="text-[12px]">
                                    <div className="font-bold text-neutral-900">
                                        {ref.referenceName || ref.name}
                                    </div>
                                    <div className="text-neutral-600">
                                        {ref.role || ref.title}
                                        {(ref.organization || ref.company) && ` at ${ref.organization || ref.company}`}
                                    </div>
                                    {(ref.contactDetails || ref.contactInfo) && (
                                        <div className="text-neutral-400 text-[11px]">{ref.contactDetails || ref.contactInfo}</div>
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
                            <p className="text-[12px] text-neutral-700 leading-[1.7] mb-2">{section.content}</p>
                        )}
                        {section.items && section.items.length > 0 && (
                            <ul className="space-y-1">
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
