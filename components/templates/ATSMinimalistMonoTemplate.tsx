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
 * A Swiss-inspired monochromatic design built on precise typographic
 * contrast and disciplined negative space. Clean hairline dividers,
 * tracked uppercase section labels, and em-dash bullet points create
 * a distinctly modern, editorial rhythm.
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

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-8 mb-4">
            <h2 className={cn(
                'text-[11px] font-black uppercase tracking-[0.35em] mb-2',
                accentColor
            )}>
                {title}
            </h2>
            <div className="h-[0.5px] bg-neutral-300" />
        </div>
    )

    // Inline contact builder
    const contactParts: string[] = []
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))

    const isSerif = data.formatting?.fontFamily === 'serif'
    const fontStack = isSerif 
        ? "'Georgia', 'Times New Roman', serif" 
        : "'Inter', 'Helvetica Neue', Arial, sans-serif"

    return (
        <div
            className={cn('w-full bg-white text-neutral-900 leading-snug', className)}
            style={{ fontFamily: fontStack }}
        >
            {/* ── HEADER ── */}
            <header className="pb-6">
                {/* Name */}
                <h1 className={cn(
                    'text-[32px] font-black leading-none tracking-tight uppercase',
                    accentColor
                )}>
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                {/* Professional Title */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.25em] mt-2">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Contact Info — inline bar */}
                {contactParts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-neutral-500 tracking-wide mt-3">
                        {contactParts.map((part, i) => (
                            <span key={i} className="flex items-center gap-3">
                                {i > 0 && <span className="text-neutral-300">|</span>}
                                <span>{part}</span>
                            </span>
                        ))}
                    </div>
                )}

                {/* Separator */}
                <div className="h-[1.5px] bg-neutral-900 mt-5" />
            </header>

            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="pb-12 pt-4">
                    <div className="mb-8 space-y-1 text-[12px] text-neutral-800">
                        <p className="font-semibold text-neutral-400 mb-4 text-[10px] uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-bold">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-bold">{data.coverLetter.companyName}</p>}
                    </div>
                    <div className="mb-6"><p className="text-[12px] text-neutral-800">Dear {data.coverLetter?.recipientName || 'Hiring Manager'},</p></div>
                    <div className="mb-10">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[12px] leading-[1.8] mb-4 text-neutral-700">{para}</p>
                        )) || <p className="text-neutral-400 italic text-[12px]">Your cover letter will appear here...</p>}
                    </div>
                    <div className="space-y-3 text-neutral-800">
                        <p className="text-[12px]">Sincerely,</p>
                        <p className="font-bold text-[12px]">{data.personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="pb-12 pt-4">
                    <SectionHeader title="Professional References" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="flex flex-col gap-0.5">
                                <span className="font-bold text-neutral-900 text-[12px]">{ref.referenceName || ref.name}</span>
                                <span className="text-[11px] text-neutral-600 italic">{ref.role || ref.title}{(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}</span>
                                {(ref.contactDetails || ref.contactInfo) && <span className="text-[10px] text-neutral-500 mt-1">{ref.contactDetails || ref.contactInfo}</span>}
                                {ref.availabilityStatement && <span className="text-[10px] text-neutral-400 italic mt-0.5">{ref.availabilityStatement}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>

            {/* ── BODY ── */}
            <div className="pb-12">

                {/* Career Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Career Summary" />
                        <p className="text-[12px] text-neutral-700 leading-[1.8]">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Skills — grouped by type */}
                {skills && skills.length > 0 && (() => {
                    const grouped = skills.reduce((acc, s) => {
                        const type = s.skillType || 'General';
                        if (!acc[type]) acc[type] = [];
                        acc[type].push(s);
                        return acc;
                    }, {} as Record<string, typeof skills>);

                    return (
                        <section>
                            <SectionHeader title="Skills" />
                            <div className="space-y-2.5">
                                {Object.entries(grouped).map(([type, list]) => (
                                    <div key={type}>
                                        {Object.keys(grouped).length > 1 && (
                                            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">
                                                {type}
                                            </div>
                                        )}
                                        <div className="flex flex-wrap items-center gap-y-1">
                                            {list.map((s, i) => (
                                                <span key={i} className="flex items-center">
                                                    {i > 0 && <span className="text-neutral-300 mx-2">·</span>}
                                                    <span className="text-[11px] text-neutral-700 font-medium">{s.skillName}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })()}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i} className={cn(job.forcePageBreak && "force-page-break")}>
                                    {/* Job header row */}
                                    <div className="flex justify-between items-start gap-4 mb-1">
                                        <h3 className={cn('text-[14px] font-bold leading-snug', accentColor)}>
                                            {job.jobTitle}
                                        </h3>
                                        <span className="text-[10px] text-neutral-400 shrink-0 mt-0.5 tabular-nums">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    {/* Company & location */}
                                    <div className="text-[11px] text-neutral-500 mb-2">
                                        {job.companyName}{job.location && ` · ${job.location}`}
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-600 leading-relaxed mb-2">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1.5">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[11px] text-neutral-700 flex gap-3 leading-relaxed">
                                                    <span className="shrink-0 text-neutral-300 font-bold">—</span>
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
                                <div key={i} className={cn(edu.forcePageBreak && "force-page-break")}>
                                    <div className="flex justify-between items-baseline gap-4">
                                        <h3 className={cn('text-[12px] font-bold', accentColor)}>
                                            {edu.degree}{edu.major ? `, ${edu.major}` : ''}
                                        </h3>
                                        <span className="text-[10px] text-neutral-400 shrink-0 tabular-nums">{edu.endYear || edu.startYear}</span>
                                    </div>
                                    <div className="text-[11px] text-neutral-500 mt-0.5">
                                        {edu.institutionName}{edu.location && ` — ${edu.location}`}
                                    </div>
                                    {edu.gpa && <div className="text-[10px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</div>}
                                    {edu.coursework && (
                                        <div className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed italic">
                                            Coursework: {edu.coursework}
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
                                <div key={i} className={cn("flex justify-between items-baseline gap-4", cert.forcePageBreak && "force-page-break")}>
                                    <div className="text-[11px]">
                                        <span className="font-bold text-neutral-800">{cert.certificationName}</span>
                                        {cert.issuingOrganization && (
                                            <span className="text-neutral-500"> — {cert.issuingOrganization}</span>
                                        )}
                                    </div>
                                    {(cert.issueDate || cert.issueYear) && (
                                        <span className="text-[10px] text-neutral-400 shrink-0 tabular-nums">{cert.issueDate || cert.issueYear}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Projects" />
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i} className={cn(proj.forcePageBreak && "force-page-break")}>
                                    <div className="flex justify-between items-baseline gap-4">
                                        <h3 className={cn('text-[12px] font-bold', accentColor)}>{proj.projectName}</h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[10px] text-neutral-400 shrink-0 tabular-nums">
                                                {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.description && (
                                        <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">{proj.description}</p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[10px] text-neutral-400 mt-1 flex flex-wrap gap-x-3">
                                            {proj.toolsUsed.map((tool, j) => (
                                                <span key={j}>{tool}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements / Awards */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Awards" />
                        <div className="space-y-1.5">
                            {achievements.map((ach, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline gap-4">
                                        <div className="text-[11px]">
                                            <span className="font-bold text-neutral-800">{ach.achievementTitle}</span>
                                            {ach.issuingBody && <span className="text-neutral-500"> — {ach.issuingBody}</span>}
                                        </div>
                                        {ach.year && <span className="text-[10px] text-neutral-400 shrink-0 tabular-nums">{ach.year}</span>}
                                    </div>
                                    {ach.description && (
                                        <p className="text-[10px] text-neutral-500 mt-0.5 leading-[1.6]">{ach.description}</p>
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

                {/* Volunteering */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Volunteering" />
                        <div className="space-y-2.5">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline gap-4">
                                        <h3 className="text-[12px] font-bold text-neutral-800">{vol.roleTitle}</h3>
                                        <span className="text-[10px] text-neutral-400 shrink-0 tabular-nums">
                                            {vol.startDate}{vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-neutral-500">{vol.organizationName}</div>
                                    {vol.contributions && (
                                        <p className="text-[10px] text-neutral-500 mt-0.5 leading-[1.6]">{vol.contributions}</p>
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
                                <div key={i} className="flex justify-between items-baseline gap-4">
                                    <div className="text-[11px]">
                                        <span className="font-bold text-neutral-800">{aff.organizationName}</span>
                                        {aff.roleOrMembership && <span className="text-neutral-500"> — {aff.roleOrMembership}</span>}
                                    </div>
                                    {aff.yearsActive && (
                                        <span className="text-[10px] text-neutral-400 shrink-0 tabular-nums">{aff.yearsActive}</span>
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
                        <div className="text-[11px] text-neutral-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                            {languages.map((l, i) => (
                                <span key={i} className="flex items-center gap-3">
                                    {i > 0 && <span className="text-neutral-300">·</span>}
                                    <span>{l.languageName}{l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}</span>
                                </span>
                            ))}
                        </div>
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

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader title="References" />
                        <div className="space-y-2.5">
                            {references.map((ref, i) => (
                                <div key={i}>
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
            </div>
        
                </>
            )}
            </div>
    )
}
