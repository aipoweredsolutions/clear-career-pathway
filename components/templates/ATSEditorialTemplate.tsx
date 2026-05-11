import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Editorial Template
 *
 * Inspired by magazine editorial layouts. Bold oversized name as visual anchor,
 * serif typeface, dotted leader lines connecting titles to dates.
 *
 * 100% ATS-compliant single-column layout.
 */
export function ATSEditorialTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex flex-col mb-4 mt-6">
            <h2 className={cn('text-[10px] font-black uppercase tracking-[0.6em] mb-4', accentColor)}>
                {title}
            </h2>
            <div className="h-px w-full bg-neutral-100" />
        </div>
    )

    // Dotted leader row: title .......... date (the editorial signature element)
    const LeaderRow = ({ title, sub, date, children }: { title: string; sub?: string; date?: string; children?: React.ReactNode }) => (
        <div className="mb-5 last:mb-0 break-inside-avoid">
            <div className="flex items-baseline w-full mb-1">
                <h3 className="text-[13px] font-black text-neutral-900 tracking-tight shrink-0">
                    {title}
                </h3>
                {date && (
                    <>
                        <div className="flex-grow border-b border-dotted border-neutral-200 mx-6 relative top-[-4px]" />
                        <span className="text-[11px] font-black text-neutral-300 shrink-0 font-sans tracking-widest uppercase">
                            {date}
                        </span>
                    </>
                )}
            </div>
            {sub && (
                <div className="text-[11px] font-bold text-neutral-400 italic mb-2">{sub}</div>
            )}
            {children}
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-snug p-10', className)}
            style={{ fontFamily: "'Lora', 'Georgia', serif" }}
        >
            {/* ── EDITORIAL MASTHEAD ── */}
            <header className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-4 border-b-2 border-neutral-900">
                    <h1 className="text-[32px] font-black leading-[0.85] tracking-tighter text-neutral-900 uppercase">
                        {personalInfo?.fullName ? (
                            <>
                                <span className="block">{personalInfo.fullName.split(' ')[0]}</span>
                                <span className={cn('block', accentColor)}>{personalInfo.fullName.split(' ').slice(1).join(' ')}.</span>
                            </>
                        ) : 'NAME.'}
                    </h1>
                    <div className="md:text-right max-w-[300px]">
                        {personalInfo?.professionalTitle && (
                            <p className="text-[11px] font-bold text-neutral-400 italic uppercase tracking-widest leading-relaxed">
                                {personalInfo.professionalTitle}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap justify-between items-center py-6 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-neutral-400">
                    {contactParts.map((part, i) => (
                        <span key={i}>{part}</span>
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
                    {/* Pull-Quote Summary */}
                    {professionalSummary?.summaryText && (
                        <section className="mb-6">
                            <p className={cn('text-[12px] italic leading-relaxed font-medium px-4', accentColor)}>
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="The Portfolio" />
                            <div className="space-y-5">
                                {workExperience.map((job, i) => (
                                    <LeaderRow
                                        key={i}
                                        title={job.jobTitle.toUpperCase()}
                                        sub={`${job.companyName}${job.location ? '  |  ' + job.location : ''}`}
                                        date={`${job.startDate} — ${job.isCurrent ? 'Present' : job.endDate}`}
                                    >
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-4 pl-4 border-l-2 border-neutral-50">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[11px] text-neutral-700 leading-relaxed font-medium">
                                                        {ach.achievementText}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </LeaderRow>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <SectionHeader title="Selected Works" />
                            <div className="space-y-4">
                                {projects.map((proj, i) => (
                                    <LeaderRow
                                        key={i}
                                        title={proj.projectName.toUpperCase()}
                                        sub={proj.role}
                                        date={proj.startDate ? proj.startDate.split(' ')[1] || proj.startDate : undefined}
                                    >
                                        {proj.description && (
                                            <p className="text-[11px] text-neutral-700 leading-relaxed font-medium pl-4 border-l-2 border-neutral-50">
                                                {proj.description}
                                            </p>
                                        )}
                                        {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                            <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">
                                                {proj.toolsUsed.join('  ·  ')}
                                            </p>
                                        )}
                                    </LeaderRow>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Academic History" />
                            <div className="space-y-3">
                                {education.map((edu, i) => (
                                    <LeaderRow
                                        key={i}
                                        title={`${edu.degree}${edu.major ? ` IN ${edu.major.toUpperCase()}` : ''}`}
                                        sub={`${edu.institutionName}${edu.location ? '  |  ' + edu.location : ''}`}
                                        date={edu.endYear?.toString()}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <SectionHeader title="Credentials" />
                            <div className="space-y-3">
                                {certifications.map((cert, i) => (
                                    <LeaderRow
                                        key={i}
                                        title={cert.certificationName.toUpperCase()}
                                        sub={cert.issuingOrganization}
                                        date={cert.issueYear?.toString()}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Volunteer */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Community" />
                            <div className="space-y-4">
                                {volunteerExperience.map((vol, i) => (
                                    <LeaderRow
                                        key={i}
                                        title={vol.roleTitle.toUpperCase()}
                                        sub={vol.organizationName}
                                        date={vol.startDate ? vol.startDate.split(' ')[1] || vol.startDate : undefined}
                                    >
                                        {vol.description && (
                                            <p className="text-[11px] text-neutral-700 leading-relaxed font-medium pl-4 border-l-2 border-neutral-50">
                                                {vol.description}
                                            </p>
                                        )}
                                    </LeaderRow>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Publications */}
                    {publications && publications.length > 0 && (
                        <section>
                            <SectionHeader title="Publications" />
                            <div className="space-y-3">
                                {publications.map((pub, i) => (
                                    <LeaderRow
                                        key={i}
                                        title={pub.title.toUpperCase()}
                                        sub={pub.journalOrPublisher}
                                        date={pub.year?.toString()}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <SectionHeader title="Expertise" />
                            <div className="flex flex-col gap-y-3 px-4">
                                {Object.entries(skills.reduce((acc, s) => {
                                    const t = s.skillType || 'professional'
                                    if (!acc[t]) acc[t] = []
                                    acc[t].push(s)
                                    return acc
                                }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                    <div key={type} className="flex flex-col gap-2 break-inside-avoid">
                                        <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em]">
                                            {type}
                                        </div>
                                        <p className="text-[11px] text-neutral-800 font-bold leading-relaxed">
                                            {list.map(s => s.skillName).join('  ·  ')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <SectionHeader title="Languages" />
                            <p className="text-[11px] text-neutral-800 font-bold px-4">
                                {languages.map(l => `${l.languageName}${l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}`).join('  ·  ')}
                            </p>
                        </section>
                    )}

                    {/* Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section>
                            <SectionHeader title="Affiliations" />
                            <div className="flex flex-col gap-1.5 px-4">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i} className="text-[11px] text-neutral-700 font-medium break-inside-avoid">
                                        <span className="font-black text-neutral-900">{aff.organizationName}</span>
                                        {aff.role && <span className="text-neutral-400 italic ml-2">— {aff.role}</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((section, i) => (
                        <section key={i} className="break-inside-avoid">
                            <SectionHeader title={section.title} />
                            {section.content && (
                                <p className="text-[11px] text-neutral-700 leading-relaxed font-medium px-4">{section.content}</p>
                            )}
                            {section.items && section.items.length > 0 && (
                                <div className="space-y-2 px-4">
                                    {section.items.map((item, j) => (
                                        <LeaderRow key={j} title={item.text} date={item.date} />
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            )}
        </div>
    )
}
