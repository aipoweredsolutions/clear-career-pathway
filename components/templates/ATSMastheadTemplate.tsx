import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Masthead Template
 * 
 * A strong, minimalist header section where the name, job title, and contact details
 * are prominently displayed using well-spaced typography, neatly sandwiched between
 * two horizontal rules. Features understated section labels with dashed line extensions.
 * 
 * 100% ATS-compliant single-column layout.
 */
export function ATSMastheadTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    // Section header: lowercase, small, with dashed line extending to right edge
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex items-center gap-4 mt-8 mb-4">
            <h2 className={cn(
                'text-[10px] font-black lowercase tracking-[0.2em] shrink-0',
                accentColor
            )}>
                {title}
            </h2>
            <div className={cn('flex-grow border-b border-dashed opacity-40 mt-1', borderColorClass)} />
        </div>
    )

    // Build contact info
    const contactLines1: string[] = []
    const contactLines2: string[] = []
    
    if (personalInfo?.email) contactLines1.push(personalInfo.email)
    if (personalInfo?.phone) contactLines1.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactLines1.push(loc)
        
    if (personalInfo?.linkedinUrl) contactLines2.push(personalInfo.linkedinUrl)
    if (personalInfo?.githubUrl) contactLines2.push(personalInfo.githubUrl)
    if (personalInfo?.portfolioUrl) contactLines2.push(personalInfo.portfolioUrl)

    // Format dates helper
    const formatDateRange = (start?: string, end?: string, isCurrent?: boolean) => {
        // Simple formatting for demonstration, assuming YYYY-MM-DD or similar
        const formatStr = (dStr?: string) => {
            if (!dStr) return ''
            const d = new Date(dStr)
            if(isNaN(d.getTime())) return dStr // fallback to original if unparseable
            return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        }
        
        const s = formatStr(start)
        const e = isCurrent ? 'Present' : formatStr(end)
        
        if (s && e) return `${s} – ${e}`
        if (s) return `${s}`
        return ''
    }

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-[1.8]', className)}
            style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
            {/* ── HEADER ── */}
            <header className="mb-6">
                <hr className={cn('border-t-2 mb-8', borderColorClass)} />
                
                <div className="text-center mb-6">
                    <h1 className={cn('text-[26px] font-light tracking-[0.5em] uppercase leading-none mb-3', accentColor)}>
                        {personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <p className="text-[14px] text-neutral-500 italic tracking-wider">
                            {personalInfo.professionalTitle}
                        </p>
                    )}
                </div>

                <div className="text-center text-[11px] font-medium text-neutral-600 tracking-wide space-y-1">
                    {contactLines1.length > 0 && (
                        <div>{contactLines1.join('  ·  ')}</div>
                    )}
                    {contactLines2.length > 0 && (
                        <div>{contactLines2.join('  ·  ')}</div>
                    )}
                </div>

                <hr className={cn('border-t-2 mt-8', borderColorClass)} />
            </header>

            {/* ── BODY ── */}
            <div>
                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="summary" />
                        <p className="text-[12.5px] text-neutral-700">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="experience" />
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <h3 className={cn('text-[14px] font-bold', accentColor)}>
                                        {job.jobTitle}
                                    </h3>
                                    <div className="text-[12.5px] font-semibold text-neutral-700">
                                        {job.companyName}
                                        {job.location && <span className="font-normal text-neutral-500">  ·  {job.location}</span>}
                                    </div>
                                    <div className="text-[11px] text-neutral-400 mb-2 font-medium">
                                        {formatDateRange(job.startDate, job.endDate, job.isCurrent)}
                                    </div>
                                    
                                    {job.roleDescription && (
                                        <p className="text-[12.5px] text-neutral-700 mb-2">
                                            {job.roleDescription}
                                        </p>
                                    )}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[12.5px] text-neutral-700 flex gap-3">
                                                    <span className="shrink-0 mt-px text-neutral-400">•</span>
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
                        <SectionHeader title="education" />
                        <div className="space-y-5">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className={cn('text-[14px] font-bold', accentColor)}>
                                        {edu.degree}
                                        {edu.major ? ` in ${edu.major}` : ''}
                                        {edu.fieldOfStudy && !edu.major ? ` in ${edu.fieldOfStudy}` : ''}
                                    </h3>
                                    <div className="text-[12.5px] font-semibold text-neutral-700">
                                        {edu.institutionName}
                                        {edu.location && `, ${edu.location}`}
                                        {(edu.endYear || edu.startYear) && <span className="font-normal text-neutral-500">  ·  {edu.endYear || edu.startYear}</span>}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-500 mt-1">GPA: {edu.gpa}</div>
                                    )}
                                    {edu.achievements && (
                                        <div className="text-[11px] text-neutral-500 italic mt-1">{edu.achievements}</div>
                                    )}
                                    {edu.coursework && (
                                        <div className="text-[11px] text-neutral-500 mt-1">
                                            <span className="font-semibold">Relevant Coursework:</span> {edu.coursework}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="projects" />
                        <div className="space-y-5">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <h3 className={cn('text-[14px] font-bold', accentColor)}>
                                        {proj.projectName}
                                    </h3>
                                    {proj.role && (
                                        <div className="text-[12.5px] font-semibold text-neutral-700">
                                            {proj.role}
                                            {proj.startDate && <span className="font-normal text-neutral-500">  ·  {formatDateRange(proj.startDate, proj.endDate, false)}</span>}
                                        </div>
                                    )}
                                    {proj.description && (
                                        <p className="text-[12.5px] text-neutral-700 mt-1">
                                            {proj.description}
                                        </p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[11px] text-neutral-500 mt-1">
                                            <span className="font-semibold">Technologies:</span> {proj.toolsUsed.join(' · ')}
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
                        <SectionHeader title="skills" />
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            if (Object.keys(grouped).length === 1) {
                                return (
                                    <p className="text-[12.5px] text-neutral-700 leading-relaxed">
                                        {skills.map(s => s.skillName).join('  ·  ')}
                                    </p>
                                )
                            }

                            return (
                                <div className="space-y-2">
                                    {Object.entries(grouped).map(([type, list]) => (
                                        <div key={type} className="text-[12.5px] text-neutral-700">
                                            <span className="font-semibold capitalize">{type}: </span>
                                            <span>{list.map(s => s.skillName).join('  ·  ')}</span>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                    </section>
                )}

                {/* Optional Sections Stacked Together */}
                {(certifications?.length || achievements?.length || publications?.length || volunteerExperience?.length || languages?.length || professionalAffiliations?.length) ? (
                    <div className="mt-8 space-y-6">
                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <SectionHeader title="certifications" />
                                <div className="space-y-2">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="text-[12.5px]">
                                            <span className="font-semibold text-neutral-900">{cert.certificationName}</span>
                                            {cert.issuingOrganization && (
                                                <span className="text-neutral-600">  ·  {cert.issuingOrganization}</span>
                                            )}
                                            {(cert.issueYear || cert.issueDate) && (
                                                <span className="text-neutral-400 font-medium">  ·  {cert.issueYear || cert.issueDate}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Achievements & Awards */}
                        {achievements && achievements.length > 0 && (
                            <section>
                                <SectionHeader title="awards" />
                                <div className="space-y-3">
                                    {achievements.map((ach, i) => (
                                        <div key={i}>
                                            <div className="text-[12.5px]">
                                                <span className="font-semibold text-neutral-900">{ach.achievementTitle}</span>
                                                {ach.issuingBody && (
                                                    <span className="text-neutral-600">  ·  {ach.issuingBody}</span>
                                                )}
                                                {ach.year && (
                                                    <span className="text-neutral-400 font-medium">  ·  {ach.year}</span>
                                                )}
                                            </div>
                                            {ach.description && (
                                                <p className="text-[11px] text-neutral-600 mt-1">{ach.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section>
                                <SectionHeader title="languages" />
                                <p className="text-[12.5px] text-neutral-700">
                                    {languages.map((l, i) => (
                                        <span key={i}>
                                            {l.languageName}
                                            {l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}
                                            {i < languages.length - 1 ? '  ·  ' : ''}
                                        </span>
                                    ))}
                                </p>
                            </section>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
