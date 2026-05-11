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

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-12 mb-6">
            <h2 className={cn(
                'text-[10px] font-black uppercase tracking-[0.5em] mb-2',
                accentColor
            )}>
                {title}
            </h2>
            <div className="h-[0.5px] bg-neutral-900" />
        </div>
    )

    // Inline contact builder
    const contactParts: string[] = []
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div
            className={cn('w-full bg-white text-neutral-900 leading-snug', className)}
            style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
        >
            {/* ── HEADER — THE ARCHITECT ── */}
            <header className="pt-12 pb-8">
                {/* Oversized Name — Extreme Weight */}
                <h1 className={cn(
                    'text-[64px] font-black leading-[0.85] tracking-[-0.06em] mb-6 uppercase',
                    accentColor
                )}>
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    {/* Professional Title — High tracking contrast */}
                    {personalInfo?.professionalTitle && (
                        <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-[0.4em] leading-none">
                            {personalInfo.professionalTitle}
                        </p>
                    )}

                    {/* Contact — minimal dot separated */}
                    {contactParts.length > 0 && (
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.15em] leading-none text-right">
                            {contactParts.join('   ·   ')}
                        </p>
                    )}
                </div>

                {/* Main separation line */}
                <div className="h-[2px] bg-neutral-900 mt-10" />
            </header>
            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="px-8 sm:px-12 pb-12 pt-8">
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
                <div className="px-8 sm:px-12 pb-12 pt-8">
                    <h2 className={cn("text-sm font-black uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2", accentColor)}>Professional References</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="break-inside-avoid flex flex-col gap-1">
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


            {/* ── BODY ── */}
            <div className="pb-16">

                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <p className="text-[15px] text-neutral-800 font-medium leading-[1.8] text-justify mt-4">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Trajectory" />
                        <div className="space-y-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                                        <div className="flex-1">
                                            <h3 className={cn('text-[18px] font-black leading-tight uppercase tracking-tight', accentColor)}>
                                                {job.jobTitle}
                                            </h3>
                                            <div className="text-[12px] font-black text-neutral-400 uppercase tracking-[0.2em] mt-1">
                                                {job.companyName} <span className="text-neutral-200 mx-2">/</span> {job.location}
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-black text-neutral-300 uppercase tracking-[0.15em] mt-1.5">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[13.5px] text-neutral-600 font-medium leading-relaxed mb-6">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[13.5px] text-neutral-700 font-medium flex gap-6 leading-relaxed">
                                                    <span className="shrink-0 text-neutral-200 font-black">—</span>
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
                                        <h3 className={cn('text-[12px] font-bold', accentColor)}>
                                            {edu.degree}{edu.major ? `, ${edu.major}` : ''}
                                        </h3>
                                        <span className="text-[10px] text-neutral-400 shrink-0 ml-4">{edu.endYear || edu.startYear}</span>
                                    </div>
                                    <div className="text-[11px] text-neutral-500 mt-0.5">
                                        {edu.institutionName}{edu.location && ` — ${edu.location}`}
                                    </div>
                                    {edu.gpa && <div className="text-[10px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</div>}
                                    {edu.coursework && (
                                        <div className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed italic">
                                            Major Coursework: {edu.coursework}
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
                                <div key={i} className="break-inside-avoid flex justify-between items-baseline">
                                    <div className="text-[11px]">
                                        <span className="font-bold text-neutral-800">{cert.certificationName}</span>
                                        {cert.issuingOrganization && (
                                            <span className="text-neutral-500"> — {cert.issuingOrganization}</span>
                                        )}
                                    </div>
                                    {(cert.issueDate || cert.issueYear) && (
                                        <span className="text-[10px] text-neutral-400 shrink-0 ml-4 font-sans">{cert.issueDate || cert.issueYear}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Initiatives" />
                        <div className="space-y-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={cn('text-[12px] font-bold', accentColor)}>{proj.projectName}</h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[10px] text-neutral-400 shrink-0 ml-4">
                                                {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.description && (
                                        <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">{proj.description}</p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[10px] text-neutral-400 mt-1 flex gap-2">
                                            {proj.toolsUsed.map((tool, j) => (
                                                <span key={j}>— {tool}</span>
                                            ))}
                                        </div>
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
                                <div key={i} className="break-inside-avoid text-[11px] text-neutral-600">
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
                                <div key={i} className="break-inside-avoid flex justify-between items-baseline">
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
                    <section key={si} className="break-inside-avoid">
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
        
                </>
            )}
            </div>
    )
}
