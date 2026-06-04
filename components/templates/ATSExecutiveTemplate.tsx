import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSExecutiveTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const borderColorClass = accentColor.replace('text-', 'border-')
    const bgColorClass = accentColor.replace('text-', 'bg-')

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
        languages,
        professionalAffiliations,
        customSections,
    } = data

    // Consistent section header — full-width underline below the title
    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <div className="mb-4">
            <h2 className={cn(
                'text-[11px] font-black uppercase tracking-[0.28em]',
                accentColor
            )}>
                {children}
            </h2>
            <div className={cn('h-[2px] w-full mt-1', bgColorClass, 'opacity-20')} />
        </div>
    )

    // Consistent date badge — plain text, no pill background
    const DateRange = ({ start, end, current }: { start?: string; end?: string; current?: boolean }) => (
        <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-[0.1em] shrink-0">
            {start}{start ? ' – ' : ''}{current ? 'Present' : end}
        </span>
    )

    return (
        <div className={cn('w-full bg-white text-neutral-900 font-sans leading-relaxed', className)}>

            {/* ── HEADER ── */}
            <header className="px-10 pt-9 pb-7">
                <h1 className="text-[38px] font-black tracking-[-0.03em] leading-none mb-2 uppercase break-words text-neutral-900">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <p className="text-[13px] font-black tracking-[0.15em] uppercase mb-4 text-neutral-900 opacity-70">
                        {personalInfo.professionalTitle}
                    </p>
                )}
                <div className="flex flex-wrap items-center gap-y-1 text-[11px] font-bold text-neutral-900 uppercase tracking-wider">
                    {[
                        personalInfo?.email,
                        personalInfo?.phone,
                        [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ') || null,
                        personalInfo?.linkedinUrl?.replace(/^https?:\/\/(www\.)?/, ''),
                        personalInfo?.websiteUrl?.replace(/^https?:\/\/(www\.)?/, ''),
                    ].filter(Boolean).map((item, i) => (
                        <span key={i} className="flex items-center gap-2">
                            {i > 0 && <span className="text-neutral-400 font-normal">·</span>}
                            <span>{item}</span>
                        </span>
                    ))}
                </div>
                {/* Border sits inside the padding so it matches section lines */}
                <div className={cn('h-[3px] w-full mt-5', bgColorClass)} />
            </header>

            {/* ── DOCUMENT TYPE OVERRIDES ── */}
            {data.documentType === 'cover_letter' ? (
                <div className="px-10 pb-12 pt-8">
                    <div className="mb-8 space-y-1 text-[13px] text-neutral-800">
                        <p className="font-bold text-neutral-400 mb-6">
                            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        {data.coverLetter?.recipientName && <p className="font-bold">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-bold">{data.coverLetter.companyName}</p>}
                    </div>
                    <p className="text-[13px] text-neutral-800 mb-6">Dear {data.coverLetter?.recipientName || 'Hiring Manager'},</p>
                    <div className="space-y-4 mb-12">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[13px] leading-relaxed text-neutral-800">{para}</p>
                        )) || <p className="text-neutral-400 italic text-[13px]">Your cover letter will appear here...</p>}
                    </div>
                    <div className="space-y-1 text-neutral-800">
                        <p className="text-[13px]">Sincerely,</p>
                        <p className="font-bold text-[13px]">{personalInfo?.fullName}</p>
                    </div>
                </div>

            ) : data.documentType === 'references' ? (
                <div className="px-10 pb-12 pt-8">
                    <SectionTitle>Professional References</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="font-bold text-neutral-900 text-[13px]">{ref.referenceName || ref.name}</span>
                                <span className="text-[12px] text-neutral-600 italic">
                                    {ref.role || ref.title}{(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}
                                </span>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <span className="text-[11px] text-neutral-500 mt-1">{ref.contactDetails || ref.contactInfo}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            ) : (
                <div className="px-10 py-8 space-y-7">

                    {/* Executive Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionTitle>Executive Profile</SectionTitle>
                            <p className="text-[13px] font-medium leading-[1.75] text-neutral-700">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Core Competencies */}
                    {skills && skills.length > 0 && (
                        <section>
                            <SectionTitle>Core Competencies</SectionTitle>
                            <div className="space-y-3">
                                {Object.entries(
                                    skills.reduce((acc, s) => {
                                        const t = s.skillType || 'professional'
                                        if (!acc[t]) acc[t] = []
                                        acc[t].push(s)
                                        return acc
                                    }, {} as Record<string, typeof skills>)
                                ).map(([type, list]) => (
                                    <div key={type} className="flex gap-3 items-baseline">
                                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] shrink-0 w-24">{type}</span>
                                        <span className="text-[12.5px] font-medium text-neutral-800 leading-relaxed">
                                            {list.map((s, i) => (
                                                <span key={i}>
                                                    {s.skillName}
                                                    {i < list.length - 1 && <span className="mx-2 text-neutral-300">·</span>}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Career Trajectory */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionTitle>Career Trajectory</SectionTitle>
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline gap-4 mb-1">
                                            <h3 className="text-[13.5px] font-black text-neutral-900 leading-tight">
                                                {job.jobTitle}
                                            </h3>
                                            <DateRange start={job.startDate} end={job.endDate} current={job.isCurrent} />
                                        </div>
                                        <div className={cn('text-[11.5px] font-black uppercase tracking-wider mb-3', accentColor)}>
                                            {job.companyName}
                                            {job.location && <span className="text-neutral-300 font-normal mx-2">|</span>}
                                            {job.location}
                                        </div>
                                        {job.roleDescription && (
                                            <p className="text-[12.5px] text-neutral-600 mb-3 leading-[1.7] font-medium">
                                                {job.roleDescription}
                                            </p>
                                        )}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-2">
                                                {job.achievements.map((a, j) => (
                                                    <li key={j} className="text-[12.5px] text-neutral-700 flex gap-3 leading-[1.7]">
                                                        <span className={cn('mt-[7px] w-1.5 h-1.5 rounded-full shrink-0', bgColorClass)} />
                                                        <span className="font-medium">{a.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                {/* Key Initiatives */}
                    {projects && projects.length > 0 && (
                        <section>
                            <SectionTitle>Key Initiatives</SectionTitle>
                            <div className="space-y-5">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline gap-4 mb-1">
                                            <h3 className="text-[13px] font-black text-neutral-900 uppercase tracking-wide">
                                                {proj.projectName}
                                            </h3>
                                            {proj.role && (
                                                <span className={cn('text-[10px] font-black uppercase tracking-widest shrink-0', accentColor)}>
                                                    {proj.role}
                                                </span>
                                            )}
                                        </div>
                                        {proj.description && (
                                            <p className="text-[12.5px] text-neutral-600 leading-[1.7] font-medium">{proj.description}</p>
                                        )}
                                        {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                            <p className="text-[11px] text-neutral-400 mt-1">{proj.toolsUsed.join(' · ')}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <SectionTitle>Honors & Recognition</SectionTitle>
                            <div className="space-y-2.5">
                                {achievements.map((a, i) => (
                                    <div key={i} className="flex justify-between items-baseline gap-4">
                                        <div className="text-[12.5px]">
                                            <span className="font-bold text-neutral-900">{a.achievementTitle}</span>
                                            {a.issuingBody && <span className="text-neutral-500"> — {a.issuingBody}</span>}
                                        </div>
                                        {a.year && <span className="text-[11px] text-neutral-400 shrink-0">{a.year}</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Publications */}
                    {publications && publications.length > 0 && (
                        <section>
                            <SectionTitle>Publications</SectionTitle>
                            <div className="space-y-2.5">
                                {publications.map((pub, i) => (
                                    <div key={i} className="text-[12.5px] text-neutral-700">
                                        <span className="italic">&ldquo;{pub.title}&rdquo;</span>
                                        {pub.platformOrPublisher && (
                                            <span className="font-bold text-neutral-900"> · {pub.platformOrPublisher}</span>
                                        )}
                                        {pub.publicationYear && (
                                            <span className="text-neutral-400"> ({pub.publicationYear})</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionTitle>Education</SectionTitle>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex justify-between items-start gap-4">
                                        <div>
                                            <div className="text-[13px] font-black text-neutral-900 uppercase leading-tight mb-0.5">
                                                {edu.degree}{edu.major ? ` in ${edu.major}` : ''}
                                            </div>
                                            <div className="text-[12px] font-bold text-neutral-500">{edu.institutionName}</div>
                                            {edu.gpa && <div className="text-[11px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</div>}
                                        </div>
                                        <span className="text-[11px] font-black text-neutral-400 uppercase tracking-widest shrink-0 mt-0.5">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <SectionTitle>Certifications</SectionTitle>
                            <div className="space-y-2.5">
                                {certifications.map((c, i) => (
                                    <div key={i} className="flex justify-between items-baseline gap-4">
                                        <div>
                                            <span className="text-[12.5px] font-bold text-neutral-800">{c.certificationName}</span>
                                            {c.issuingOrganization && (
                                                <span className="text-[11px] text-neutral-400 ml-2">· {c.issuingOrganization}</span>
                                            )}
                                        </div>
                                        {c.issueYear && (
                                            <span className="text-[11px] font-bold text-neutral-400 shrink-0">{c.issueYear}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Professional Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section>
                            <SectionTitle>Professional Affiliations</SectionTitle>
                            <div className="space-y-2">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i} className="flex justify-between items-baseline gap-4">
                                        <div className="text-[12.5px]">
                                            <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                            {aff.roleOrMembership && (
                                                <span className="text-neutral-500"> — {aff.roleOrMembership}</span>
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

                    {/* Volunteer */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <SectionTitle>Community & Service</SectionTitle>
                            <div className="space-y-3">
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline gap-4 mb-0.5">
                                            <h3 className="text-[12.5px] font-bold text-neutral-900">{vol.roleTitle}</h3>
                                            <span className="text-[11px] text-neutral-400 shrink-0">
                                                {vol.startDate}{vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                            </span>
                                        </div>
                                        <div className="text-[12px] text-neutral-500 italic mb-1">{vol.organizationName}</div>
                                        {vol.contributions && (
                                            <p className="text-[12px] text-neutral-600 leading-[1.65]">{vol.contributions}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <SectionTitle>Languages</SectionTitle>
                            <div className="flex flex-wrap gap-x-6 gap-y-1">
                                {languages.map((l, i) => (
                                    <span key={i} className="text-[12.5px] text-neutral-800">
                                        <span className="font-bold">{l.languageName}</span>
                                        {l.proficiencyLevel && (
                                            <span className="text-neutral-400 ml-1 text-[11px]">({l.proficiencyLevel})</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((s, i) => (
                        <section key={i}>
                            <SectionTitle>{s.title}</SectionTitle>
                            {s.content && (
                                <p className="text-[12.5px] text-neutral-700 leading-[1.7] font-medium mb-3">{s.content}</p>
                            )}
                            {s.items && s.items.length > 0 && (
                                <ul className="space-y-2">
                                    {s.items.map((item, j) => (
                                        <li key={j} className="text-[12.5px] text-neutral-700 flex gap-3 leading-[1.7]">
                                            <span className={cn('mt-[7px] w-1.5 h-1.5 rounded-full shrink-0', bgColorClass)} />
                                            <span className="font-medium">{item.text}</span>
                                        </li>
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
