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
 * and content flows on the right, separated by a thin vertical rule.
 *
 * 100% ATS-compliant: dates and content are inline within flex rows.
 */
export function ATSChronographTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
    const bgColorClass = accentColor.replace('text-', 'bg-')

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-6 mb-3">
            <h2 className={cn('text-[10px] font-black uppercase tracking-[0.4em] mb-4', accentColor)}>
                {title}
            </h2>
            <div className="h-px w-full bg-neutral-100" />
        </div>
    )

    const TimelineRow = ({ date, children }: { date: string; children: React.ReactNode }) => (
        <div className="flex items-start gap-6 mb-5 group last:mb-0">
            <div className="w-[120px] shrink-0 pt-1 text-right">
                <span className="text-[11px] font-black text-neutral-300 uppercase tracking-widest font-mono">
                    {date}
                </span>
            </div>
            <div className="w-px shrink-0 self-stretch bg-neutral-100 relative">
                <div className={cn('absolute top-2 -left-1 w-2 h-2 rounded-full border-2 border-white', bgColorClass)} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
                {children}
            </div>
        </div>
    )

    // Flat indented row (for sections without a meaningful date)
    const FlatRow = ({ children }: { children: React.ReactNode }) => (
        <div className="flex gap-6">
            <div className="w-[120px] shrink-0" />
            <div className="w-px shrink-0 bg-neutral-100" />
            <div className="flex-1 min-w-0 pl-0 pt-0.5">{children}</div>
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-snug p-10', className)}
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* ── CHRONO HEADER ── */}
            <header className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 pb-4 border-b-2 border-neutral-900">
                <div className="flex-1">
                    <h1 className="text-[28px] font-black tracking-tighter leading-none mb-2 text-neutral-900 uppercase">
                        {personalInfo?.fullName || 'NAME.'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <p className={cn('text-[11px] font-bold uppercase tracking-[0.2em] opacity-60', accentColor)}>
                            {personalInfo.professionalTitle}
                        </p>
                    )}
                </div>
                <div className="shrink-0 text-right space-y-2 pt-2">
                    {contactParts.map((part, i) => (
                        <div key={i} className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] font-mono">
                            {part}
                        </div>
                    ))}
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
                <div>
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section className="mb-6">
                            <SectionHeader title="Executive Overview" />
                            <FlatRow>
                                <p className="text-[11px] leading-relaxed text-neutral-600 font-medium italic">
                                    {`"${professionalSummary.summaryText}"`}
                                </p>
                            </FlatRow>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Career Progression" />
                            {workExperience.map((job, i) => (
                                <TimelineRow
                                    key={i}
                                    date={job.startDate ? `${job.startDate.split(' ')[1] || job.startDate} — ${job.isCurrent ? 'NOW' : (job.endDate?.split(' ')[1] || job.endDate || '')}` : ''}
                                >
                                    <h3 className="text-[13px] font-black text-neutral-900 tracking-tight leading-none mb-1">
                                        {job.jobTitle.toUpperCase()}
                                    </h3>
                                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                                        {job.companyName}
                                        {job.location && <span className="mx-3 opacity-30 font-normal">/</span>}
                                        {job.location}
                                    </div>
                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-500 mb-3 leading-relaxed italic">
                                            {job.roleDescription}
                                        </p>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[11px] text-neutral-700 flex gap-3 leading-relaxed font-medium">
                                                    <span className={cn('w-1 h-1 rounded-full mt-2.5 shrink-0', bgColorClass)} />
                                                    <span>{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
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
                                <TimelineRow key={i} date={proj.startDate ? proj.startDate.split(' ')[1] || proj.startDate : 'PROJECT'}>
                                    <h3 className="text-[13px] font-black text-neutral-900 tracking-tight leading-none mb-1">
                                        {proj.projectName.toUpperCase()}
                                    </h3>
                                    {proj.role && (
                                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                                            {proj.role}
                                        </div>
                                    )}
                                    {proj.description && (
                                        <p className="text-[11px] text-neutral-600 leading-relaxed mb-2">{proj.description}</p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.3em]">
                                            {proj.toolsUsed.join('  ·  ')}
                                        </div>
                                    )}
                                </TimelineRow>
                            ))}
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Academic Timeline" />
                            {education.map((edu, i) => (
                                <TimelineRow key={i} date={edu.endYear?.toString() || 'PREV'}>
                                    <h3 className="text-[13px] font-black text-neutral-900 tracking-tight mb-1">
                                        {edu.degree.toUpperCase()}
                                        {edu.major && <span className="text-neutral-300 font-normal ml-3">/ {edu.major.toUpperCase()}</span>}
                                    </h3>
                                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                                        {edu.institutionName}
                                        {edu.location && <span className="mx-3 opacity-30 font-normal">|</span>}
                                        {edu.location}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mt-3">
                                            {`Academic Performance: ${edu.gpa}`}
                                        </div>
                                    )}
                                </TimelineRow>
                            ))}
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <SectionHeader title="Certifications" />
                            {certifications.map((cert, i) => (
                                <TimelineRow key={i} date={cert.issueYear?.toString() || 'CERT'}>
                                    <h3 className="text-[13px] font-black text-neutral-900 tracking-tight leading-none mb-1">
                                        {cert.certificationName.toUpperCase()}
                                    </h3>
                                    {cert.issuingOrganization && (
                                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                                            {cert.issuingOrganization}
                                        </div>
                                    )}
                                </TimelineRow>
                            ))}
                        </section>
                    )}

                    {/* Volunteer Experience */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Volunteer Work" />
                            {volunteerExperience.map((vol, i) => (
                                <TimelineRow key={i} date={vol.startDate ? vol.startDate.split(' ')[1] || vol.startDate : 'VOL'}>
                                    <h3 className="text-[13px] font-black text-neutral-900 tracking-tight leading-none mb-1">
                                        {vol.roleTitle.toUpperCase()}
                                    </h3>
                                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                                        {vol.organizationName}
                                    </div>
                                    {vol.description && (
                                        <p className="text-[11px] text-neutral-600 leading-relaxed">{vol.description}</p>
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
                                <TimelineRow key={i} date={pub.year?.toString() || 'PUB'}>
                                    <h3 className="text-[13px] font-black text-neutral-900 tracking-tight leading-none mb-1">
                                        {pub.title.toUpperCase()}
                                    </h3>
                                    {pub.journalOrPublisher && (
                                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                                            {pub.journalOrPublisher}
                                        </div>
                                    )}
                                </TimelineRow>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <SectionHeader title="Core Inventory" />
                            <FlatRow>
                                <div className="flex flex-col gap-4 flex-1">
                                    {Object.entries(skills.reduce((acc, s) => {
                                        const t = s.skillType || 'professional'
                                        if (!acc[t]) acc[t] = []
                                        acc[t].push(s)
                                        return acc
                                    }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                        <div key={type} className="flex flex-col gap-2">
                                            <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em]">
                                                {type}
                                            </div>
                                            <div className="flex flex-wrap gap-2.5">
                                                {list.map((s, i) => (
                                                    <span key={i} className="text-[12px] font-bold text-neutral-800 border-b-2 border-neutral-50 pb-1">
                                                        {s.skillName}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FlatRow>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <SectionHeader title="Languages" />
                            <FlatRow>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex flex-col">
                                            <span className="text-[12px] font-black text-neutral-800">{l.languageName}</span>
                                            {l.proficiencyLevel && (
                                                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{l.proficiencyLevel}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </FlatRow>
                        </section>
                    )}

                    {/* Professional Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section>
                            <SectionHeader title="Affiliations" />
                            <FlatRow>
                                <div className="flex flex-col gap-1.5">
                                    {professionalAffiliations.map((aff, i) => (
                                        <div key={i} className="text-[11px] text-neutral-700">
                                            <span className="font-black text-neutral-900">{aff.organizationName}</span>
                                            {aff.role && <span className="text-neutral-400 font-normal ml-2">— {aff.role}</span>}
                                        </div>
                                    ))}
                                </div>
                            </FlatRow>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((section, i) => (
                        <section key={i}>
                            <SectionHeader title={section.title} />
                            {section.content && (
                                <FlatRow>
                                    <p className="text-[11px] text-neutral-700 leading-relaxed">{section.content}</p>
                                </FlatRow>
                            )}
                            {section.items && section.items.map((item, j) => (
                                <TimelineRow key={j} date={item.date || '—'}>
                                    <p className="text-[11px] text-neutral-700 leading-relaxed font-medium">{item.text}</p>
                                </TimelineRow>
                            ))}
                        </section>
                    ))}
                </div>
            )}
        </div>
    )
}
