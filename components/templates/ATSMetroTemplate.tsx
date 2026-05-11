import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Metro Template
 *
 * Inspired by transit maps. Continuous vertical route line with
 * "station" dots for sections and item markers for entries.
 *
 * 100% ATS-compliant single-column layout.
 */
export function ATSMetroTemplate({ data, className, accentColor = 'bg-red-700 text-red-700' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        volunteerExperience,
        languages,
        professionalAffiliations,
        publications,
        references,
        customSections
    } = data

    const colorMatch = accentColor.match(/(?:bg|text)-([a-z]+-[0-9]+)/)
    const baseColor = colorMatch ? colorMatch[1] : 'neutral-900'
    const bgColorClass = `bg-${baseColor}`
    const textColorClass = `text-${baseColor}`
    const borderColorClass = `border-${baseColor}`

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="relative mt-5 mb-3">
            <div className={cn('absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-white', bgColorClass)} aria-hidden="true" />
            <div className="flex items-center">
                <div className={cn('w-6 border-t-4 mr-3', borderColorClass)} />
                <h2 className={cn('text-[13px] font-black uppercase tracking-widest', textColorClass)}>
                    {title}
                </h2>
            </div>
        </div>
    )

    const ItemMarker = () => (
        <div className={cn('absolute -left-[7px] top-2 w-3 h-3 rounded-full border-2 bg-white', borderColorClass)} aria-hidden="true" />
    )

    const contactLines: string[] = []
    if (personalInfo?.email) contactLines.push(personalInfo.email)
    if (personalInfo?.phone) contactLines.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactLines.push(loc)
    if (personalInfo?.linkedinUrl) contactLines.push(personalInfo.linkedinUrl)

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
            <div className="pl-6">
                {/* ── HEADER (Destination Board) ── */}
                <header className="mb-6 relative">
                    <div className={cn('border-2 p-4 sm:p-5 bg-neutral-50/50 relative z-10', borderColorClass)}>
                        <h1 className="text-[28px] font-black uppercase tracking-tight mb-1">
                            {personalInfo?.fullName || 'YOUR NAME'}
                        </h1>
                        {personalInfo?.professionalTitle && (
                            <p className={cn('text-[11px] font-bold uppercase tracking-widest mb-3', textColorClass)}>
                                {personalInfo.professionalTitle}
                            </p>
                        )}
                        <div className="text-[10px] font-medium text-neutral-600 tracking-wider flex flex-wrap gap-x-3 gap-y-1">
                            {contactLines.map((line, i) => (
                                <React.Fragment key={i}>
                                    <span>{line}</span>
                                    {i < contactLines.length - 1 && <span>·</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </header>

                {/* DOCUMENT TYPE OVERRIDES */}
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
                        <h2 className={cn('text-sm font-black uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2', accentColor)}>Professional References</h2>
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
                        {/* ── BODY (The Route Line) ── */}
                        <div className={cn('relative border-l-2 ml-6 pl-6 pb-4', borderColorClass)}>

                            {/* Professional Summary */}
                            {professionalSummary?.summaryText && (
                                <section className="relative">
                                    <SectionHeader title="Profile" />
                                    <p className="text-[11px] text-neutral-700 leading-relaxed max-w-[90%] font-medium">
                                        {professionalSummary.summaryText}
                                    </p>
                                </section>
                            )}

                            {/* Work Experience */}
                            {workExperience && workExperience.length > 0 && (
                                <section>
                                    <SectionHeader title="Experience" />
                                    <div className="space-y-5">
                                        {workExperience.map((job, i) => (
                                            <div key={i} className="break-inside-avoid relative">
                                                <ItemMarker />
                                                <h3 className="text-[13px] font-black text-neutral-900">{job.jobTitle}</h3>
                                                <div className="text-[11px] font-bold text-neutral-600 mt-0.5 mb-1">
                                                    {job.companyName}
                                                    {job.location && <span className="text-neutral-400 font-normal"> · {job.location}</span>}
                                                    <span className="text-neutral-400 font-normal"> · {formatDateRange(job.startDate, job.endDate, job.isCurrent)}</span>
                                                </div>
                                                {job.roleDescription && (
                                                    <p className="text-[11px] text-neutral-700 mb-2 leading-relaxed max-w-[90%]">{job.roleDescription}</p>
                                                )}
                                                {job.achievements && job.achievements.length > 0 && (
                                                    <ul className="space-y-1.5 pl-2 max-w-[90%]">
                                                        {job.achievements.map((ach, j) => (
                                                            <li key={j} className="text-[11px] text-neutral-700 flex gap-3 leading-relaxed">
                                                                <span className={cn('shrink-0 font-bold', textColorClass)}>›</span>
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

                            {/* Projects */}
                            {projects && projects.length > 0 && (
                                <section>
                                    <SectionHeader title="Projects" />
                                    <div className="space-y-4">
                                        {projects.map((proj, i) => (
                                            <div key={i} className="break-inside-avoid relative">
                                                <ItemMarker />
                                                <h3 className="text-[13px] font-black text-neutral-900">{proj.projectName}</h3>
                                                {proj.role && (
                                                    <div className="text-[11px] font-bold text-neutral-600 mt-0.5">{proj.role}</div>
                                                )}
                                                {proj.description && (
                                                    <p className="text-[11px] text-neutral-700 mt-1 leading-relaxed max-w-[90%]">{proj.description}</p>
                                                )}
                                                {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                                    <div className={cn('text-[10px] font-bold uppercase tracking-wider mt-1', textColorClass)}>
                                                        {proj.toolsUsed.join(' · ')}
                                                    </div>
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
                                            <div key={i} className="break-inside-avoid relative">
                                                <ItemMarker />
                                                <h3 className="text-[14px] font-black text-neutral-900">
                                                    {edu.degree} {edu.major && `in ${edu.major}`}
                                                </h3>
                                                <div className="text-[13px] font-bold text-neutral-600 mt-0.5">
                                                    {edu.institutionName}
                                                    <span className="text-neutral-400 font-normal"> · {edu.endYear || edu.startYear}</span>
                                                </div>
                                                {edu.gpa && (
                                                    <div className="text-[12px] text-neutral-500 font-medium mt-1">GPA: {edu.gpa}</div>
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
                                            <div key={i} className="break-inside-avoid relative">
                                                <ItemMarker />
                                                <h3 className="text-[13px] font-black text-neutral-900">{cert.certificationName}</h3>
                                                <div className="text-[11px] text-neutral-500 font-medium">
                                                    {cert.issuingOrganization}
                                                    {cert.issueYear && <span className="ml-2">· {cert.issueYear}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Volunteer */}
                            {volunteerExperience && volunteerExperience.length > 0 && (
                                <section>
                                    <SectionHeader title="Volunteer" />
                                    <div className="space-y-4">
                                        {volunteerExperience.map((vol, i) => (
                                            <div key={i} className="break-inside-avoid relative">
                                                <ItemMarker />
                                                <h3 className="text-[13px] font-black text-neutral-900">{vol.roleTitle}</h3>
                                                <div className="text-[11px] font-bold text-neutral-600 mt-0.5">
                                                    {vol.organizationName}
                                                    {vol.startDate && <span className="text-neutral-400 font-normal"> · {formatDateRange(vol.startDate, vol.endDate)}</span>}
                                                </div>
                                                {vol.contributions && (
                                                    <p className="text-[11px] text-neutral-700 mt-1 leading-relaxed max-w-[90%]">{vol.contributions}</p>
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
                                            <div key={i} className="break-inside-avoid relative">
                                                <ItemMarker />
                                                <h3 className="text-[13px] font-black text-neutral-900">{pub.title}</h3>
                                                <div className="text-[11px] text-neutral-500 font-medium">
                                                    {pub.platformOrPublisher}
                                                    {pub.publicationYear && <span className="ml-2">· {pub.publicationYear}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Skills */}
                            {skills && skills.length > 0 && (
                                <section>
                                    <SectionHeader title="Skills" />
                                    <div className="relative">
                                        <ItemMarker />
                                        <div className="space-y-3 max-w-[90%]">
                                            {Object.entries(skills.reduce((acc, skill) => {
                                                const type = skill.skillType || 'professional'
                                                if (!acc[type]) acc[type] = []
                                                acc[type].push(skill)
                                                return acc
                                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                                <div key={type} className="text-[13px] text-neutral-700">
                                                    <span className={cn('font-bold uppercase tracking-widest mr-2 text-[11px]', textColorClass)}>{type}</span>
                                                    <span className="font-medium">{list.map(s => s.skillName).join(' · ')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Languages */}
                            {languages && languages.length > 0 && (
                                <section>
                                    <SectionHeader title="Languages" />
                                    <div className="relative">
                                        <ItemMarker />
                                        <div className="flex flex-wrap gap-x-5 gap-y-1 max-w-[90%]">
                                            {languages.map((l, i) => (
                                                <span key={i} className="text-[12px] text-neutral-700 font-medium">
                                                    {l.languageName}
                                                    {l.proficiencyLevel && <span className={cn('ml-1 text-[11px] font-bold', textColorClass)}>({l.proficiencyLevel})</span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Affiliations */}
                            {professionalAffiliations && professionalAffiliations.length > 0 && (
                                <section>
                                    <SectionHeader title="Affiliations" />
                                    <div className="relative">
                                        <ItemMarker />
                                        <div className="space-y-1 max-w-[90%]">
                                            {professionalAffiliations.map((aff, i) => (
                                                <div key={i} className="break-inside-avoid text-[12px] text-neutral-700">
                                                    <span className="font-bold">{aff.organizationName}</span>
                                                    {aff.roleOrMembership && <span className="text-neutral-400 font-normal"> · {aff.roleOrMembership}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Custom Sections */}
                            {customSections && customSections.map((section, i) => (
                                <section key={i} className="break-inside-avoid">
                                    <SectionHeader title={section.title} />
                                    {section.content && (
                                        <p className="text-[11px] text-neutral-700 leading-relaxed max-w-[90%] font-medium">{section.content}</p>
                                    )}
                                    {section.items && section.items.length > 0 && (
                                        <div className="space-y-2">
                                            {section.items.map((item, j) => (
                                                <div key={j} className="relative">
                                                    <ItemMarker />
                                                    <p className="text-[12px] text-neutral-700 font-medium max-w-[90%]">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            ))}
                            
                            {/* References */}
                            {references && references.length > 0 && (
                                <section className="relative">
                                    <SectionHeader title="Network" />
                                    <div className="space-y-6">
                                        {references.map((ref, i) => (
                                            <div key={i} className="break-inside-avoid relative">
                                                <ItemMarker />
                                                <h3 className="text-[13px] font-black text-neutral-900">{ref.referenceName || ref.name}</h3>
                                                <div className="text-[11px] font-bold text-neutral-600 mt-0.5">
                                                    {ref.role || ref.title}
                                                    {(ref.organization || ref.company) && <span className="text-neutral-400 font-normal"> · {ref.organization || ref.company}</span>}
                                                </div>
                                                {(ref.contactDetails || ref.contactInfo) && (
                                                    <div className="text-[10px] font-medium text-neutral-500 mt-1">
                                                        {ref.contactDetails || ref.contactInfo}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* End Terminal Marker */}
                            <div className={cn('absolute -bottom-1 -left-[14px] w-6 h-6 rounded-full border-[6px] border-white z-10', bgColorClass)} aria-hidden="true" />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
