import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Bauhaus Template
 * 
 * Inspired by Bauhaus design principles: geometric clarity, functional hierarchy.
 * Each section is introduced by a large square block containing a number, creating
 * a visual rhythm. 
 * 
 * 100% ATS-compliant single-column layout. Section numbers are pure CSS/span
 * decorations that don't interfere with parsing.
 */
export function ATSBauhausTemplate({ data, className, accentColor = 'bg-red-600 text-red-600' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        achievements,
        customSections
    } = data

    // Extract colors. We expect accentColor to have both bg- and text- variants passed, or just one.
    // To be safe, let's extract the color name.
    const colorMatch = accentColor.match(/(?:bg|text)-([a-z]+-[0-9]+)/)
    const baseColor = colorMatch ? colorMatch[1] : 'neutral-900'
    
    const bgColorClass = `bg-${baseColor}`
    const textColorClass = `text-${baseColor}`
    const borderColorClass = `border-${baseColor}`

    const activeSections = [
        professionalSummary?.summaryText ? 'profile' : null,
        workExperience && workExperience.length > 0 ? 'experience' : null,
        education && education.length > 0 ? 'education' : null,
        projects && projects.length > 0 ? 'projects' : null,
        skills && skills.length > 0 ? 'skills' : null,
        (certifications?.length || achievements?.length) ? 'awards' : null
    ].filter(Boolean)

    const SectionHeader = ({ title, sectionId }: { title: string, sectionId: string }) => {
        const numStr = (activeSections.indexOf(sectionId) + 1).toString().padStart(2, '0')
        
        return (
            <div className="flex items-end gap-4 mb-5 mt-8">
                <div className={cn("w-12 h-12 flex items-center justify-center text-white font-black text-sm shrink-0", bgColorClass)} aria-hidden="true">
                    {numStr}
                </div>
                <div className="flex-grow pb-1">
                    <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] mb-2", textColorClass)}>
                        {title}
                    </h2>
                    <hr className="border-t-2 border-neutral-900" />
                </div>
            </div>
        )
    }

    // Build contact info
    const contactLines: string[] = []
    if (personalInfo?.email) contactLines.push(personalInfo.email)
    if (personalInfo?.phone) contactLines.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactLines.push(loc)
    if (personalInfo?.linkedinUrl) contactLines.push(personalInfo.linkedinUrl)

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
            className={cn('w-full bg-white text-neutral-900 leading-relaxed', className)}
            style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
            {/* ── HEADER ── */}
            <header className="mb-10">
                {personalInfo?.fullName && (
                    <div className="mb-4">
                        {/* Split name for bold geometric effect if it has a space */}
                        {(() => {
                            const parts = personalInfo.fullName.split(' ')
                            if (parts.length >= 2) {
                                const last = parts.pop()
                                const rest = parts.join(' ')
                                return (
                                    <>
                                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{rest}</h1>
                                        <h1 className={cn("text-5xl font-light uppercase tracking-tighter leading-none", textColorClass)}>{last}</h1>
                                    </>
                                )
                            }
                            return <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{personalInfo.fullName}</h1>
                        })()}
                    </div>
                )}
                
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-1 bg-neutral-900 shrink-0" />
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-[10px] font-black tracking-[0.4em] mb-4 p-1 inline-block", accentColor)}>
                            {personalInfo.professionalTitle.toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="text-[11px] font-bold text-neutral-400 tracking-wider flex flex-wrap gap-x-4 gap-y-1">
                    {contactLines.map((line, i) => (
                        <React.Fragment key={i}>
                            <span>{line}</span>
                            {i < contactLines.length - 1 && <span className={textColorClass}>|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            {/* ── BODY ── */}
            <div>
                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Profile" sectionId="profile" />
                        <p className="text-[13px] font-medium text-neutral-700 leading-relaxed pl-16">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" sectionId="experience" />
                        <div className="space-y-6 pl-16">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <h3 className="text-[14px] font-black uppercase text-neutral-900">
                                        {job.jobTitle}
                                    </h3>
                                    <div className={cn("text-[11px] font-bold uppercase tracking-wider mb-2", textColorClass)}>
                                        {job.companyName} {job.location && `· ${job.location}`} · {formatDateRange(job.startDate, job.endDate, job.isCurrent)}
                                    </div>
                                    
                                    {job.roleDescription && (
                                        <p className="text-[12px] font-medium text-neutral-600 mb-2 leading-relaxed">
                                            {job.roleDescription}
                                        </p>
                                    )}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1 mt-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[12px] text-neutral-700 flex gap-3 leading-relaxed">
                                                    <span className={cn("shrink-0 font-black", textColorClass)}>▪</span>
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
                        <SectionHeader title="Education" sectionId="education" />
                        <div className="space-y-4 pl-16">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="text-[13px] font-black uppercase text-neutral-900">
                                        {edu.degree} {edu.major && `· ${edu.major}`}
                                    </h3>
                                    <div className={cn("text-[11px] font-bold uppercase tracking-wider", textColorClass)}>
                                        {edu.institutionName} · {edu.endYear || edu.startYear}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-500 font-medium mt-0.5">GPA: {edu.gpa}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                
                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Projects" sectionId="projects" />
                        <div className="space-y-4 pl-16">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <h3 className="text-[13px] font-black uppercase text-neutral-900">
                                        {proj.projectName}
                                    </h3>
                                    {proj.role && (
                                        <div className={cn("text-[11px] font-bold uppercase tracking-wider mb-1", textColorClass)}>
                                            {proj.role} {proj.startDate && `· ${formatDateRange(proj.startDate, proj.endDate, false)}`}
                                        </div>
                                    )}
                                    {proj.description && (
                                        <p className="text-[12px] font-medium text-neutral-600 leading-relaxed">
                                            {proj.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills - Bauhaus blocky style */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Skills" sectionId="skills" />
                        <div className="pl-16">
                            {(() => {
                                const grouped = skills.reduce((acc, skill) => {
                                    const type = skill.skillType || 'professional'
                                    if (!acc[type]) acc[type] = []
                                    acc[type].push(skill)
                                    return acc
                                }, {} as Record<string, typeof skills>)

                                return (
                                    <div className="space-y-4">
                                        {Object.entries(grouped).map(([type, list]) => (
                                            <div key={type}>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">
                                                    {type}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {list.map((s, i) => (
                                                        <span 
                                                            key={i} 
                                                            className={cn("text-[11px] font-bold px-3 py-1.5 border-2", borderColorClass, textColorClass)}
                                                        >
                                                            {s.skillName}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            })()}
                        </div>
                    </section>
                )}
                
                {/* Certifications & Awards */}
                {(certifications?.length || achievements?.length) ? (
                    <section>
                        <SectionHeader title="Awards" sectionId="awards" />
                        <div className="pl-16 space-y-4">
                            {certifications && certifications.map((cert, i) => (
                                <div key={`cert-${i}`}>
                                    <h3 className="text-[12px] font-black uppercase text-neutral-900">
                                        {cert.certificationName}
                                    </h3>
                                    <div className={cn("text-[11px] font-bold uppercase tracking-wider", textColorClass)}>
                                        {cert.issuingOrganization} {(cert.issueYear || cert.issueDate) && `· ${cert.issueYear || cert.issueDate}`}
                                    </div>
                                </div>
                            ))}
                            {achievements && achievements.map((ach, i) => (
                                <div key={`ach-${i}`}>
                                    <h3 className="text-[12px] font-black uppercase text-neutral-900">
                                        {ach.achievementTitle}
                                    </h3>
                                    <div className={cn("text-[11px] font-bold uppercase tracking-wider", textColorClass)}>
                                        {ach.issuingBody} {ach.year && `· ${ach.year}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ): null}

            </div>
        </div>
    )
}
