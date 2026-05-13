import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Cornerstone Template — "The Foundation"
 *
 * A refined, executive-grade resume template inspired by elite financial
 * institutions and FTSE-100 board presentations. Features centered serif
 * typography with generous letter-spacing, a warm copper accent rule,
 * uppercase section headers with double underlines (thick top, thin bottom), 
 * and an italic serif professional summary.
 *
 * Unique identity: Centered serif name with wide tracking, 
 * horizontal rules above and below the pipe-separated contact row,
 * double underline section headers.
 *
 * 100% ATS-compliant single-column layout, natively handles multiple pages.
 */
export function ATSCornerstoneTemplate({ data, className, accentColor = 'text-amber-900' }: TemplateProps) {
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
        customSections
    } = data

    const borderColorClass = accentColor.replace('text-', 'border-')
    const bgColorClass = accentColor.replace('text-', 'bg-')

    // Section header: uppercase, wide-tracked, accent-colored, with double underline
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-8 mb-4">
            <h2 className={cn(
                'text-[14px] font-bold uppercase tracking-[0.3em] mb-2',
                accentColor
            )} style={{ fontFamily: "'Georgia', 'Lora', 'Times New Roman', serif" }}>
                {title}
            </h2>
            <div className={cn('h-[2px] w-full mb-[2px]', bgColorClass)} />
            <div className={cn('h-[1px] w-full opacity-60', bgColorClass)} />
        </div>
    )

    // Build contact parts
    const contactParts: string[] = []
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.portfolioUrl) contactParts.push(personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, ''))

    // Format date range
    const formatDateRange = (start?: string, end?: string, isCurrent?: boolean) => {
        const formatStr = (dStr?: string) => {
            if (!dStr) return ''
            const d = new Date(dStr)
            if (isNaN(d.getTime())) return dStr
            return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
        }

        const s = formatStr(start)
        const e = isCurrent ? 'PRESENT' : formatStr(end)

        if (s && e) return `${s} — ${e}`
        if (s) return s
        return ''
    }

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-[1.7]', className)}
            style={{ fontFamily: "'Georgia', 'Lora', 'Times New Roman', serif" }}
        >
            {/* ═══ HEADER ═══ */}
            <header className="text-center mb-6">
                {/* Name — Centered serif, uppercase, wide tracking */}
                <h1 className={cn(
                    'text-[32px] font-bold uppercase tracking-[0.3em] leading-tight mb-2',
                    accentColor
                )} style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                {/* Professional Title — Small caps style */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[12.5px] font-bold uppercase tracking-[0.35em] text-neutral-400 mb-5" 
                       style={{ fontFamily: "'Georgia', serif" }}>
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Top thin line */}
                <div className="h-[1px] w-full bg-neutral-200/80 mt-5 mb-3" />

                {/* Contact row — pipe separated */}
                {contactParts.length > 0 && (
                    <div className="flex items-center justify-center gap-3 flex-wrap text-[11px] font-medium text-neutral-500 tracking-wider mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                        {contactParts.map((part, i) => (
                            <span key={i} className="flex items-center gap-3">
                                {i > 0 && <span className="text-neutral-300">|</span>}
                                <span>{part}</span>
                            </span>
                        ))}
                    </div>
                )}

                {/* Bottom thin line */}
                <div className="h-[1px] w-full bg-neutral-200/80 mb-2" />
            </header>

            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="px-8 sm:px-12 pb-12 pt-4">
                    <div className="mb-8 space-y-1 text-[13px] text-neutral-800">
                        <p className="font-bold text-neutral-400 mb-6">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-bold">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-bold">{data.coverLetter.companyName}</p>}
                    </div>
                    <div className="mb-6"><p className="text-[13px] text-neutral-800">Dear {data.coverLetter?.recipientName || 'Hiring Manager'},</p></div>
                    <div className="prose prose-neutral max-w-none mb-12">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[13px] leading-relaxed mb-4 text-justify text-neutral-800">{para}</p>
                        )) || <p className="text-neutral-400 italic text-[13px]">Your cover letter will appear here...</p>}
                    </div>
                    <div className="space-y-4 text-neutral-800">
                        <p className="text-[13px]">Sincerely,</p>
                        <p className="font-bold text-[13px]">{data.personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="px-8 sm:px-12 pb-12 pt-4">
                    <SectionHeader title="Professional References" />
                    <div className="grid grid-cols-1 gap-6">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="font-bold text-neutral-900 text-[13px]">{ref.referenceName || ref.name}</span>
                                <span className="text-[12px] text-neutral-600 italic">{ref.role || ref.title}{(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}</span>
                                {(ref.contactDetails || ref.contactInfo) && <span className="text-[12px] text-neutral-500 mt-1">{ref.contactDetails || ref.contactInfo}</span>}
                                {ref.availabilityStatement && <span className="text-[11px] text-neutral-400 italic mt-1">{ref.availabilityStatement}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>

            {/* ═══ BODY ═══ */}
            <div className="px-1 sm:px-2">
                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Professional Summary" />
                        <div className="px-2">
                            <p className="text-[12.5px] text-neutral-700 leading-[1.8] italic text-justify"
                               style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-5 px-2">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    {/* Company + Location + Dates */}
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="text-[14px] font-bold text-neutral-900"
                                                style={{ fontFamily: "'Georgia', serif" }}>
                                                {job.companyName}
                                            </h3>
                                            {job.location && (
                                                <>
                                                    <span className="text-neutral-300 mx-1">·</span>
                                                    <span className="text-[12px] text-neutral-400 italic">
                                                        {job.location}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <span className="text-[11px] font-bold text-neutral-300 shrink-0 ml-4 uppercase tracking-[0.2em]"
                                              style={{ fontFamily: "'Georgia', serif" }}>
                                            {formatDateRange(job.startDate, job.endDate, job.isCurrent)}
                                        </span>
                                    </div>

                                    {/* Job Title — italic, accent-colored */}
                                    <p className={cn('text-[13px] font-bold italic mb-2.5', accentColor)}
                                       style={{ fontFamily: "'Georgia', serif" }}>
                                        {job.jobTitle}
                                    </p>

                                    {/* Role Description */}
                                    {job.roleDescription && (
                                        <p className="text-[12px] text-neutral-600 mb-2.5 leading-[1.7] text-justify"
                                           style={{ fontFamily: "'Georgia', serif" }}>
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {/* Achievements */}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1.5 ml-1">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[12px] text-neutral-600 flex gap-3 leading-[1.6]">
                                                    <span className="shrink-0 mt-[8px] w-1 h-1 rounded-full bg-neutral-300" />
                                                    <span className="text-justify" style={{ fontFamily: "'Georgia', serif" }}>{ach.achievementText}</span>
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
                        <div className="space-y-4 px-2">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[13.5px] font-bold text-neutral-900"
                                            style={{ fontFamily: "'Georgia', serif" }}>
                                            {edu.degree}
                                            {edu.major ? ` in ${edu.major}` : ''}
                                            {edu.fieldOfStudy && !edu.major ? ` in ${edu.fieldOfStudy}` : ''}
                                        </h3>
                                        <span className="text-[11px] font-bold text-neutral-300 shrink-0 ml-4 uppercase tracking-[0.2em]">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                    <p className="text-[12.5px] text-neutral-500 italic"
                                       style={{ fontFamily: "'Georgia', serif" }}>
                                        {edu.institutionName}{edu.location && `, ${edu.location}`}
                                    </p>
                                    {edu.gpa && (
                                        <div className="text-[11.5px] text-neutral-500 mt-1">GPA: {edu.gpa}</div>
                                    )}
                                    {edu.achievements && (
                                        <div className="text-[11.5px] text-neutral-500 italic mt-1 leading-relaxed">{edu.achievements}</div>
                                    )}
                                    {edu.coursework && (
                                        <div className="text-[11.5px] text-neutral-500 mt-1">
                                            <span className="font-bold">Relevant Coursework:</span> {edu.coursework}
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
                        <SectionHeader title="Core Competencies" />
                        <div className="px-2">
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            if (Object.keys(grouped).length === 1) {
                                return (
                                    <div className="text-[12.5px] text-neutral-600 leading-relaxed flex flex-wrap items-center gap-1.5"
                                         style={{ fontFamily: "'Georgia', serif" }}>
                                        {skills.map((s, i) => (
                                            <span key={i} className="flex items-center gap-1.5">
                                                {i > 0 && <span className="opacity-40 text-neutral-300">|</span>}
                                                <span>{s.skillName}</span>
                                            </span>
                                        ))}
                                    </div>
                                )
                            }

                            const labels: Record<string, string> = {
                                technical: 'Technical',
                                professional: 'Professional',
                                tool: 'Tools & Platforms',
                                industry: 'Industry Expertise'
                            }

                            return (
                                <div className="space-y-2.5">
                                    {Object.entries(grouped).map(([type, list]) => (
                                        <div key={type} className="text-[12.5px] text-neutral-600 flex gap-3"
                                             style={{ fontFamily: "'Georgia', serif" }}>
                                            <span className={cn("font-bold shrink-0 min-w-[140px] italic text-neutral-800")}>{labels[type] || type}:</span>
                                            <span className="inline-flex flex-wrap items-center gap-1.5">
                                                {list.map((s, i) => (
                                                    <span key={i} className="flex items-center gap-1.5">
                                                        {i > 0 && <span className="opacity-40 text-neutral-300">|</span>}
                                                        <span>{s.skillName}</span>
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Key Projects" />
                        <div className="space-y-4 px-2">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[13px] font-bold text-neutral-900"
                                            style={{ fontFamily: "'Georgia', serif" }}>
                                            {proj.projectName}
                                        </h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[11px] font-bold text-neutral-300 shrink-0 ml-4 uppercase tracking-[0.2em]">
                                                {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && (
                                        <p className={cn("text-[12.5px] font-bold italic mb-1", accentColor)}>
                                            {proj.role}
                                        </p>
                                    )}
                                    {proj.description && (
                                        <p className="text-[12px] text-neutral-600 leading-[1.7] text-justify mb-1"
                                           style={{ fontFamily: "'Georgia', serif" }}>
                                            {proj.description}
                                        </p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[11.5px] text-neutral-500 mt-1">
                                            <span className="font-bold">Technologies:</span> {proj.toolsUsed.join(' · ')}
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
                        <div className="space-y-2 px-2">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-[12.5px]" style={{ fontFamily: "'Georgia', serif" }}>
                                        <span className="font-bold text-neutral-900">{cert.certificationName}</span>
                                        {cert.issuingOrganization && (
                                            <span className="text-neutral-500"> — {cert.issuingOrganization}</span>
                                        )}
                                    </div>
                                    {(cert.issueDate || cert.issueYear) && (
                                        <span className="text-[11px] font-bold text-neutral-300 shrink-0 ml-4 tracking-wider uppercase">
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
                        <SectionHeader title="Awards & Achievements" />
                        <div className="space-y-2.5 px-2">
                            {achievements.map((ach, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <div className="text-[12.5px]" style={{ fontFamily: "'Georgia', serif" }}>
                                            <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                            {ach.issuingBody && <span className="text-neutral-500"> — {ach.issuingBody}</span>}
                                        </div>
                                        {ach.year && <span className="text-[11px] font-bold text-neutral-300 shrink-0 ml-4 tracking-wider uppercase">{ach.year}</span>}
                                    </div>
                                    {ach.description && (
                                        <p className="text-[11.5px] text-neutral-500 mt-0.5 leading-relaxed italic text-justify">{ach.description}</p>
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
                        <div className="space-y-2 px-2">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-[12.5px] text-neutral-600 leading-relaxed"
                                     style={{ fontFamily: "'Georgia', serif" }}>
                                    <span className="italic">&quot;{pub.title}&quot;</span>
                                    {pub.platformOrPublisher && <span className="font-bold text-neutral-900"> — {pub.platformOrPublisher}</span>}
                                    {pub.publicationYear && <span className="text-neutral-400"> ({pub.publicationYear})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer Experience */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Community Engagement" />
                        <div className="space-y-3 px-2">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900"
                                            style={{ fontFamily: "'Georgia', serif" }}>
                                            {vol.roleTitle}
                                        </h3>
                                        <span className="text-[11px] font-bold text-neutral-300 shrink-0 ml-4 uppercase tracking-[0.2em]">
                                            {vol.startDate}{vol.endDate ? ` — ${vol.endDate}` : vol.startDate ? ' — PRESENT' : ''}
                                        </span>
                                    </div>
                                    <div className="text-[12px] text-neutral-500 italic">{vol.organizationName}</div>
                                    {vol.contributions && (
                                        <p className="text-[12px] text-neutral-600 mt-1 leading-[1.7] text-justify">{vol.contributions}</p>
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
                        <div className="space-y-1.5 px-2">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-[12.5px]" style={{ fontFamily: "'Georgia', serif" }}>
                                        <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                        {aff.roleOrMembership && <span className="text-neutral-500"> — {aff.roleOrMembership}</span>}
                                    </div>
                                    {aff.yearsActive && (
                                        <span className="text-[11px] font-bold text-neutral-300 shrink-0 ml-4 tracking-wider uppercase">{aff.yearsActive}</span>
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
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[12.5px] px-2"
                             style={{ fontFamily: "'Georgia', serif" }}>
                            {languages.map((l, i) => (
                                <span key={i} className="text-neutral-600">
                                    <span className="font-bold text-neutral-900">{l.languageName}</span>
                                    {l.proficiencyLevel && <span className="text-neutral-400 ml-1.5 italic">({l.proficiencyLevel})</span>}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader title="References" />
                        <div className="space-y-4 px-2">
                            {references.map((ref, i) => (
                                <div key={i}>
                                    <div className="text-[13px] font-bold text-neutral-900"
                                         style={{ fontFamily: "'Georgia', serif" }}>
                                        {ref.referenceName || ref.name}
                                    </div>
                                    <div className="text-[12px] text-neutral-600 italic mt-0.5">
                                        {ref.role || ref.title}{(ref.organization || ref.company) && `, ${ref.organization || ref.company}`}
                                    </div>
                                    {(ref.contactDetails || ref.contactInfo) && (
                                        <div className="text-[11.5px] text-neutral-500 mt-1">{ref.contactDetails || ref.contactInfo}</div>
                                    )}
                                    {ref.availabilityStatement && (
                                        <div className="text-[11.5px] text-neutral-400 italic mt-0.5">{ref.availabilityStatement}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Additional Information */}
                {additionalInfo && (additionalInfo.workAuthorization || additionalInfo.securityClearance || additionalInfo.availability || additionalInfo.otherInfo) && (
                    <section>
                        <SectionHeader title="Additional Information" />
                        <div className="space-y-1 text-[12px] text-neutral-600 px-2" style={{ fontFamily: "'Georgia', serif" }}>
                            {additionalInfo.workAuthorization && (
                                <div><span className="font-bold text-neutral-900">Work Authorization:</span> {additionalInfo.workAuthorization}</div>
                            )}
                            {additionalInfo.securityClearance && (
                                <div><span className="font-bold text-neutral-900">Security Clearance:</span> {additionalInfo.securityClearance}</div>
                            )}
                            {additionalInfo.availability && (
                                <div><span className="font-bold text-neutral-900">Availability:</span> {additionalInfo.availability}</div>
                            )}
                            {additionalInfo.willingToRelocate !== undefined && (
                                <div><span className="font-bold text-neutral-900">Relocation:</span> {additionalInfo.willingToRelocate ? 'Open to relocation' : 'Not available'}</div>
                            )}
                            {additionalInfo.otherInfo && (
                                <div className="mt-2 text-justify">{additionalInfo.otherInfo}</div>
                            )}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.length > 0 && customSections.map((section, si) => (
                    <section key={si}>
                        <SectionHeader title={section.title} />
                        <div className="px-2">
                            {section.content && (
                                <p className="text-[12px] text-neutral-600 leading-[1.7] text-justify mb-2"
                                   style={{ fontFamily: "'Georgia', serif" }}>
                                    {section.content}
                                </p>
                            )}
                            {section.items && section.items.length > 0 && (
                                <ul className="space-y-1">
                                    {section.items.map((item, ii) => (
                                        <li key={ii} className="text-[12px] text-neutral-600 flex gap-3 leading-[1.7]">
                                            <span className="shrink-0 mt-[8px] w-[3px] h-[3px] rounded-full bg-neutral-300" />
                                            <span className="text-justify">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        
                </>
            )}
            </div>
    )
}
