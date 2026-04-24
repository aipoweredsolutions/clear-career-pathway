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
 * Inspired by magazine editorial layouts. Features a bold, oversized name as a 
 * visual anchor, with body content in a refined serif typeface. Summary acts as a pull quote.
 * Dotted leader lines connect job titles to dates.
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
        languages
    } = data

    const borderColorClass = accentColor.replace('text-', 'border-')

    // Editorial-style widely spaced section header
    const SectionHeader = ({ title }: { title: string }) => (
        <h2 className={cn(
            'text-[11px] font-black uppercase tracking-[0.5em] mt-10 mb-6',
            accentColor
        )}>
            {title.split('').join(' ')}
        </h2>
    )

    // Build contact info
    const contactLines: string[] = []
    if (personalInfo?.email) contactLines.push(personalInfo.email)
    if (personalInfo?.phone) contactLines.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactLines.push(loc)
    if (personalInfo?.linkedinUrl) contactLines.push(personalInfo.linkedinUrl)
    if (personalInfo?.githubUrl) contactLines.push(personalInfo.githubUrl)
    
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
            style={{ fontFamily: "'Georgia', 'Times New Roman', Times, serif" }}
        >
            {/* ── HEADER ── */}
            <header className="mb-8">
                <div className="flex justify-between items-end mb-4">
                    {/* Name */}
                    {personalInfo?.fullName ? (
                        <h1 className="text-5xl font-light leading-none tracking-tight">
                            {(() => {
                                const parts = personalInfo.fullName.split(' ')
                                const last = parts.pop()
                                const rest = parts.join(' ')
                                return (
                                    <>
                                        <span className="block">{rest}</span>
                                        <span className={cn("block font-bold", accentColor)}>{last}.</span>
                                    </>
                                )
                            })()}
                        </h1>
                    ) : (
                        <h1 className="text-5xl font-bold leading-none tracking-tight">YOUR NAME.</h1>
                    )}
                    
                    {/* Title */}
                    {personalInfo?.professionalTitle && (
                        <div className="text-right max-w-[200px]">
                            <p className="text-sm font-bold text-neutral-500 italic leading-snug">
                                {personalInfo.professionalTitle}
                            </p>
                        </div>
                    )}
                </div>

                {/* Contact Bar */}
                <hr className={cn("border-t-2 mb-2", borderColorClass)} />
                <div className="text-center text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-500">
                    {contactLines.join('  ·  ')}
                </div>
                <hr className={cn("border-t-2 mt-2", borderColorClass)} />
            </header>

            {/* ── BODY ── */}
            <div>
                {/* Professional Summary as Pull Quote */}
                {professionalSummary?.summaryText && (
                    <section className="mb-10 mt-6 px-4">
                        <p className={cn("text-lg italic leading-relaxed text-center", accentColor)}>
                            &quot;{professionalSummary.summaryText}&quot;
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    {/* Header with Dotted Leader */}
                                    <div className="flex items-baseline w-full mb-1">
                                        <h3 className="text-[13px] font-bold text-neutral-900 shrink-0">
                                            {job.jobTitle}
                                        </h3>
                                        <div className="flex-grow border-b-2 border-dotted border-neutral-300 mx-3 relative top-[-4px]"></div>
                                        <span className="text-[11px] font-bold text-neutral-500 shrink-0 font-sans tracking-widest">
                                            {formatDateRange(job.startDate, job.endDate, job.isCurrent)}
                                        </span>
                                    </div>
                                    
                                    <div className="text-[12px] italic text-neutral-600 mb-3">
                                        {job.companyName}{job.location && `, ${job.location}`}
                                    </div>
                                    
                                    {job.roleDescription && (
                                        <p className="text-[12px] text-neutral-700 mb-2 leading-[1.6]">
                                            {job.roleDescription}
                                        </p>
                                    )}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1.5 pl-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[12px] text-neutral-700 flex gap-3 leading-[1.6]">
                                                    <span className={cn("shrink-0 font-bold", accentColor)}>—</span>
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
                        <div className="space-y-5">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex items-baseline w-full mb-1">
                                        <h3 className="text-[13px] font-bold text-neutral-900 shrink-0">
                                            {edu.degree} {edu.major && `in ${edu.major}`}
                                        </h3>
                                        <div className="flex-grow border-b-2 border-dotted border-neutral-300 mx-3 relative top-[-4px]"></div>
                                        <span className="text-[11px] font-bold text-neutral-500 shrink-0 font-sans tracking-widest">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                    <div className="text-[12px] italic text-neutral-600">
                                        {edu.institutionName}{edu.location && `, ${edu.location}`}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-500 font-sans mt-1">GPA: {edu.gpa}</div>
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
                        <div className="space-y-5">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex items-baseline w-full mb-1">
                                        <h3 className="text-[13px] font-bold text-neutral-900 shrink-0">
                                            {proj.projectName}
                                        </h3>
                                        <div className="flex-grow border-b-2 border-dotted border-neutral-300 mx-3 relative top-[-4px]"></div>
                                        {proj.startDate && (
                                            <span className="text-[11px] font-bold text-neutral-500 shrink-0 font-sans tracking-widest">
                                                {formatDateRange(proj.startDate, proj.endDate, false)}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && (
                                        <div className="text-[12px] italic text-neutral-600 mb-2">
                                            {proj.role}
                                        </div>
                                    )}
                                    {proj.description && (
                                        <p className="text-[12px] text-neutral-700 leading-[1.6]">
                                            {proj.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills - Editorial Style */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Skills" />
                        <div className="space-y-3 font-sans">
                            {(() => {
                                const grouped = skills.reduce((acc, skill) => {
                                    const type = skill.skillType || 'professional'
                                    if (!acc[type]) acc[type] = []
                                    acc[type].push(skill)
                                    return acc
                                }, {} as Record<string, typeof skills>)

                                return Object.entries(grouped).map(([type, list]) => (
                                    <div key={type} className="text-[11px] text-neutral-600 leading-relaxed">
                                        <span className={cn("font-bold uppercase tracking-widest mr-2", accentColor)}>{type}:</span>
                                        <span className="font-medium">{list.map(s => s.skillName).join(' · ')}</span>
                                    </div>
                                ))
                            })()}
                        </div>
                    </section>
                )}
                
                {/* Certifications & Awards */}
                {(certifications?.length || achievements?.length) ? (
                    <section>
                        <SectionHeader title="Honors" />
                        <div className="space-y-4">
                            {certifications && certifications.map((cert, i) => (
                                <div key={`cert-${i}`} className="flex items-baseline w-full">
                                    <div className="text-[12px] shrink-0">
                                        <span className="font-bold text-neutral-900">{cert.certificationName}</span>
                                        <span className="italic text-neutral-600 ml-2">{cert.issuingOrganization}</span>
                                    </div>
                                    <div className="flex-grow border-b border-dotted border-neutral-300 mx-3 relative top-[-4px]"></div>
                                    <span className="text-[11px] font-bold text-neutral-500 shrink-0 font-sans tracking-widest">
                                        {cert.issueYear || cert.issueDate}
                                    </span>
                                </div>
                            ))}
                            {achievements && achievements.map((ach, i) => (
                                <div key={`ach-${i}`} className="flex items-baseline w-full">
                                    <div className="text-[12px] shrink-0">
                                        <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                        <span className="italic text-neutral-600 ml-2">{ach.issuingBody}</span>
                                    </div>
                                    <div className="flex-grow border-b border-dotted border-neutral-300 mx-3 relative top-[-4px]"></div>
                                    <span className="text-[11px] font-bold text-neutral-500 shrink-0 font-sans tracking-widest">
                                        {ach.year}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                ): null}

            </div>
        </div>
    )
}
