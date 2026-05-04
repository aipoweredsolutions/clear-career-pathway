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
 * Inspired by transit maps. Features a continuous vertical route line with 
 * "station" dots for sections and items.
 * 
 * 100% ATS-compliant single-column layout. The vertical line is a border,
 * and dots are decorative spans.
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
        achievements,
        customSections
    } = data

    // Extract colors
    const colorMatch = accentColor.match(/(?:bg|text)-([a-z]+-[0-9]+)/)
    const baseColor = colorMatch ? colorMatch[1] : 'neutral-900'
    
    const bgColorClass = `bg-${baseColor}`
    const textColorClass = `text-${baseColor}`
    const borderColorClass = `border-${baseColor}`

    // Major station marker (Section Header)
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="relative mt-5 mb-3">
            {/* Station Dot */}
            <div className={cn("absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-white", bgColorClass)} aria-hidden="true" />
            {/* Header Text */}
            <div className="flex items-center">
                <div className={cn("w-6 border-t-4 mr-3", borderColorClass)} />
                <h2 className={cn("text-[13px] font-black uppercase tracking-widest", textColorClass)}>
                    {title}
                </h2>
            </div>
        </div>
    )

    // Minor station marker (Item)
    const ItemMarker = () => (
        <div className={cn("absolute -left-[7px] top-2 w-3 h-3 rounded-full border-2 bg-white", borderColorClass)} aria-hidden="true" />
    )

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
            className={cn('w-full bg-white text-neutral-800 leading-relaxed', className)}
            style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
            <div className="pl-6">
                {/* ── HEADER (Destination Board) ── */}
                <header className="mb-6 relative">
                    <div className={cn("border-2 p-4 sm:p-5 bg-neutral-50/50 relative z-10", borderColorClass)}>
                        <h1 className="text-[28px] font-black uppercase tracking-tight mb-1">
                            {personalInfo?.fullName || 'YOUR NAME'}
                        </h1>
                        {personalInfo?.professionalTitle && (
                            <p className={cn("text-[11px] font-bold uppercase tracking-widest mb-3", textColorClass)}>
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

                {/* ── BODY (The Route Line) ── */}
                <div className={cn("relative border-l-2 ml-6 pl-6 pb-4", borderColorClass)}>
                    
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
                                    <div key={i} className="relative">
                                        <ItemMarker />
                                        <h3 className="text-[13px] font-black text-neutral-900">
                                            {job.jobTitle}
                                        </h3>
                                        <div className="text-[11px] font-bold text-neutral-600 mt-0.5 mb-1">
                                            {job.companyName}
                                            {job.location && <span className="text-neutral-400 font-normal"> · {job.location}</span>}
                                            <span className="text-neutral-400 font-normal"> · {formatDateRange(job.startDate, job.endDate, job.isCurrent)}</span>
                                        </div>
                                        
                                        {job.roleDescription && (
                                            <p className="text-[11px] text-neutral-700 mb-2 leading-relaxed max-w-[90%]">
                                                {job.roleDescription}
                                            </p>
                                        )}
                                        
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-1.5 pl-2 max-w-[90%]">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[11px] text-neutral-700 flex gap-3 leading-relaxed">
                                                        <span className={cn("shrink-0 font-bold", textColorClass)}>›</span>
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
                                    <div key={i} className="relative">
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

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <SectionHeader title="Skills" />
                            <div className="relative">
                                <ItemMarker />
                                {(() => {
                                    const grouped = skills.reduce((acc, skill) => {
                                        const type = skill.skillType || 'professional'
                                        if (!acc[type]) acc[type] = []
                                        acc[type].push(skill)
                                        return acc
                                    }, {} as Record<string, typeof skills>)

                                    return (
                                        <div className="space-y-3 max-w-[90%]">
                                            {Object.entries(grouped).map(([type, list]) => (
                                                <div key={type} className="text-[13px] text-neutral-700">
                                                    <span className={cn("font-bold uppercase tracking-widest mr-2 text-[11px]", textColorClass)}>{type}</span>
                                                    <span className="font-medium">{list.map(s => s.skillName).join(' · ')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                })()}
                            </div>
                        </section>
                    )}
                    
                    {/* End Terminal Marker */}
                    <div className={cn("absolute -bottom-1 -left-[14px] w-6 h-6 rounded-full border-[6px] border-white z-10", bgColorClass)} aria-hidden="true" />
                    
                </div>
            </div>
        </div>
    )
}
