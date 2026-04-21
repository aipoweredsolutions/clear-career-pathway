import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSClassicTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
        customSections
    } = data

    // Extract base color for borders/accents
    const borderColorClass = accentColor.replace('text-', 'border-')

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-serif leading-snug",
            className
        )}>
            {/* Header */}
            <header className={cn("text-center border-b pb-4 mb-6", borderColorClass)}>
                <h1 className={cn("text-2xl font-bold uppercase mb-2", accentColor)}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="text-[11px] text-neutral-600 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && (
                        <>
                            <span>/</span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <>
                            <span>/</span>
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span>/</span>
                            <span>LinkedIn</span>
                        </>
                    )}
                    {personalInfo?.portfolioUrl && (
                        <>
                            <span>/</span>
                            <span>Portfolio</span>
                        </>
                    )}
                </div>
            </header>

            <div className="space-y-6">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className={cn("text-sm font-bold uppercase border-b mb-2", accentColor, borderColorClass)}>Summary</h2>
                        <p className="text-[12px] text-neutral-800 leading-relaxed italic">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className={cn("text-sm font-bold uppercase border-b mb-2", accentColor, borderColorClass)}>Professional Experience</h2>
                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-bold">{job.companyName}</h3>
                                        <span className="text-xs italic">{job.startDate} – {job.isCurrent ? 'Present' : job.endDate}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="text-xs font-semibold italic">{job.jobTitle}</div>
                                        {job.location && <div className="text-xs text-neutral-500">{job.location}</div>}
                                    </div>
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc list-outside ml-4 space-y-0.5">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[12px] text-neutral-800">{ach.achievementText}</li>
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
                        <h2 className={cn("text-sm font-bold uppercase border-b mb-2", accentColor, borderColorClass)}>Education</h2>
                        <div className="space-y-3">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-bold">{edu.institutionName}</h3>
                                        <span className="text-xs italic">{edu.endYear}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <div className="text-xs italic">{edu.degree}{edu.major ? `, ${edu.major}` : ''}</div>
                                        {edu.location && <div className="text-xs text-neutral-500">{edu.location}</div>}
                                    </div>
                                    <div className="flex gap-4">
                                        {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                                        {edu.achievements && <div className="text-xs italic opacity-70">{edu.achievements}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className={cn("text-sm font-bold uppercase border-b mb-2", accentColor, borderColorClass)}>Projects</h2>
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-xs font-bold uppercase tracking-wider">{proj.projectName}</h3>
                                        <span className="text-xs italic text-neutral-500">{proj.role}</span>
                                    </div>
                                    <p className="text-xs text-neutral-800 leading-normal">{proj.description}</p>
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[10px] text-neutral-500 uppercase mt-0.5">Technologies: {proj.toolsUsed.join(' • ')}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills - Grouped for Better ATS Handling */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className={cn("text-sm font-bold uppercase border-b mb-2", accentColor, borderColorClass)}>Core Competencies</h2>
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            return (
                                <div className="space-y-1">
                                    {Object.entries(grouped).map(([type, list]) => (
                                        <div key={type} className="text-xs">
                                            <span className="font-bold uppercase text-[11px] w-24 inline-block">{type}:</span>
                                            <span>{list.map(s => s.skillName).join(' • ')}</span>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                    </section>
                )}

                {/* Certifications & Awards */}
                {(certifications?.length || achievements?.length) ? (
                    <section>
                        <h2 className={cn("text-sm font-bold uppercase border-b mb-2", accentColor, borderColorClass)}>Honors & Certifications</h2>
                        <div className="grid grid-cols-1 gap-y-2">
                            {certifications && certifications.map((cert, i) => (
                                <div key={i} className="text-xs mb-1">
                                    <span className="font-bold">{cert.certificationName}</span>
                                    {cert.issueYear && <span className="text-neutral-500 ml-1">({cert.issueYear})</span>}
                                </div>
                            ))}
                            {achievements && achievements.map((ach, i) => (
                                <div key={i} className="text-xs mb-1">
                                    <span className="font-bold">{ach.achievementTitle}</span>
                                    {ach.year && <span className="text-neutral-500 ml-1">({ach.year})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}

                {/* Additional Sections */}
                {(languages?.length || professionalAffiliations?.length || volunteerExperience?.length) ? (
                    <section>
                        <h2 className={cn("text-sm font-bold uppercase border-b mb-2", accentColor, borderColorClass)}>Additional Information</h2>
                        <div className="grid grid-cols-1 gap-y-2">
                            {languages && (
                                <div className="text-xs">
                                    <span className="font-bold mr-2 uppercase text-[11px]">Languages:</span>
                                    {languages.map(l => `${l.languageName} (${l.proficiencyLevel})`).join(', ')}
                                </div>
                            )}
                            {professionalAffiliations && (
                                <div className="text-xs">
                                    <span className="font-bold mr-2 uppercase text-[11px]">Affiliations:</span>
                                    {professionalAffiliations.map(p => p.organizationName).join(', ')}
                                </div>
                            )}
                            {volunteerExperience && (
                                <div className="text-xs">
                                    <span className="font-bold mr-2 uppercase text-[11px]">Volunteer Experience:</span>
                                    {volunteerExperience.map(v => `${v.roleTitle} at ${v.organizationName}`).join(' • ')}
                                </div>
                            )}
                        </div>
                    </section>
                ) : null}

                {/* Custom Sections */}
                {customSections && customSections.map((section, i) => (
                    <section key={i}>
                        <h2 className={cn("text-sm font-bold uppercase border-b mb-2", accentColor, borderColorClass)}>{section.title}</h2>
                        {section.content && <p className="text-xs mb-2">{section.content}</p>}
                        {section.items && section.items.map((item, j) => (
                            <div key={j} className="text-xs mb-1">• {item.text}</div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    )
}

