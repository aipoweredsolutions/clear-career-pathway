import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSAcademiaTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
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
        professionalAffiliations
    } = data

    // Derive border color from accent
    const getBorderColor = () => {
        if (accentColor.includes('slate')) return 'border-slate-400'
        if (accentColor.includes('blue')) return 'border-blue-800'
        if (accentColor.includes('maroon') || accentColor.includes('rose') || accentColor.includes('red')) return 'border-red-900'
        if (accentColor.includes('emerald') || accentColor.includes('green')) return 'border-emerald-800'
        if (accentColor.includes('neutral')) return 'border-neutral-400'
        return 'border-slate-400'
    }

    const borderColor = getBorderColor()

    // Render sections dynamically based on sectionOrder
    const sectionOrder = data.sectionOrder || [
        'professionalSummary',
        'education',
        'publications',
        'workExperience',
        'projects',
        'certifications',
        'skills',
        'achievements',
        'languages',
        'professionalAffiliations',
        'volunteerExperience',
        'references',
        'additionalInfo'
    ]

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case 'professionalSummary':
                return professionalSummary?.summaryText ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Research Interests & Profile
                        </h2>
                        <p className="text-[11px] leading-relaxed text-neutral-700 font-serif">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                ) : null

            case 'education':
                return education && education.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Education
                        </h2>
                        <div className="space-y-3">
                            {education.map((edu, i) => (
                                <div key={edu.id || i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900 font-serif">
                                            {edu.degree}{edu.major ? ` in ${edu.major}` : ''}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ''}
                                        </h3>
                                        <span className="text-[10px] font-semibold text-neutral-500 ml-4 shrink-0">
                                            {edu.startYear && `${edu.startYear} — `}{edu.endYear}
                                        </span>
                                    </div>
                                    <p className={cn("text-[11px] font-semibold", accentColor)}>
                                        {edu.institutionName}
                                        {edu.location && <span className="text-neutral-400 font-normal"> — {edu.location}</span>}
                                    </p>
                                    {edu.gpa && <p className="text-[10px] text-neutral-500 mt-0.5">GPA: {edu.gpa}</p>}
                                    {edu.achievements && <p className="text-[10px] text-neutral-600 mt-0.5 italic font-serif">{edu.achievements}</p>}
                                    {edu.coursework && (
                                        <p className="text-[10px] text-neutral-500 mt-0.5">
                                            <span className="font-semibold">Dissertation / Thesis: </span>{edu.coursework}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'publications':
                return publications && publications.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Selected Publications
                        </h2>
                        <ol className="space-y-1.5 list-decimal list-inside">
                            {publications.map((pub, i) => (
                                <li key={i} className="text-[11px] text-neutral-700 font-serif leading-relaxed">
                                    <span className="font-bold text-neutral-900">{pub.title}</span>
                                    {pub.platformOrPublisher && <span className="italic"> {pub.platformOrPublisher}</span>}
                                    {pub.publicationYear && <span className="text-neutral-500"> ({pub.publicationYear})</span>}
                                    {pub.url && <span className="text-neutral-400 text-[10px] ml-1">[{pub.url}]</span>}
                                </li>
                            ))}
                        </ol>
                    </section>
                ) : null

            case 'workExperience':
                return workExperience && workExperience.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Academic & Professional Experience
                        </h2>
                        <div className="space-y-3.5">
                            {workExperience.map((job, i) => (
                                <div key={job.id || i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{job.jobTitle}</h3>
                                        <span className="text-[10px] font-semibold text-neutral-500 shrink-0 ml-4">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <p className={cn("text-[11px] font-semibold", accentColor)}>
                                        {job.companyName}
                                        {job.location && <span className="text-neutral-400 font-normal"> — {job.location}</span>}
                                    </p>

                                    {job.roleDescription && (
                                        <p className="text-[10.5px] text-neutral-600 mt-1 font-serif italic">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="mt-1 space-y-0.5">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex items-start gap-2 text-[11px] text-neutral-700">
                                                    <span className="text-neutral-400 mt-0.5 shrink-0">—</span>
                                                    <span className="font-serif">{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'projects':
                return projects && projects.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Research Projects & Grants
                        </h2>
                        <div className="space-y-2.5">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{proj.projectName}</h3>
                                        {proj.startDate && (
                                            <span className="text-[10px] text-neutral-400 shrink-0 ml-4">
                                                {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && <p className={cn("text-[10.5px]", accentColor)}>{proj.role}</p>}
                                    {proj.description && <p className="text-[11px] text-neutral-600 mt-0.5 font-serif">{proj.description}</p>}
                                    {proj.outcomes && <p className="text-[10px] text-neutral-500 mt-0.5 italic">Outcome: {proj.outcomes}</p>}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <p className="text-[10px] text-neutral-400 mt-0.5">
                                            Methods: {proj.toolsUsed.join(', ')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'certifications':
                return certifications && certifications.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Fellowships & Certifications
                        </h2>
                        <div className="space-y-1">
                            {certifications.map((cert, i) => (
                                <div key={cert.id || i} className="text-[11px]">
                                    <span className="font-bold text-neutral-900">{cert.certificationName}</span>
                                    <span className="text-neutral-500"> — {cert.issuingOrganization}</span>
                                    {cert.issueYear && <span className="text-neutral-400"> ({cert.issueYear})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Technical Proficiencies & Methodologies
                        </h2>
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const categoryLabels: Record<string, string> = {
                                technical: 'Research Methods & Tools',
                                professional: 'Core Expertise',
                                tool: 'Software & Platforms',
                                industry: 'Domains & Specializations'
                            }

                            if (Object.keys(grouped).length === 1) {
                                return (
                                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px]">
                                        {skills.map((skill, index) => (
                                            <React.Fragment key={skill.id || index}>
                                                <span className="text-neutral-700 font-serif">{skill.skillName}</span>
                                                {index < skills.length - 1 && <span className="text-neutral-300">•</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )
                            }

                            return (
                                <div className="space-y-1.5">
                                    {Object.entries(grouped).map(([type, groupSkills]) => (
                                        <div key={type} className="flex gap-2 text-[11px]">
                                            <span className={cn("font-bold min-w-[150px] shrink-0", accentColor)}>
                                                {categoryLabels[type] || type}:
                                            </span>
                                            <span className="text-neutral-700 font-serif">
                                                {groupSkills.map(s => s.skillName).join(' · ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                    </section>
                ) : null

            case 'achievements':
                return achievements && achievements.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Honors, Awards & Distinctions
                        </h2>
                        <div className="space-y-1">
                            {achievements.map((ach, i) => (
                                <div key={i} className="text-[11px]">
                                    <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                    {ach.issuingBody && <span className="text-neutral-500"> — {ach.issuingBody}</span>}
                                    {ach.year && <span className="text-neutral-400"> ({ach.year})</span>}
                                    {ach.description && <p className="text-[10px] text-neutral-500 font-serif ml-3">{ach.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'languages':
                return languages && languages.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Languages
                        </h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px]">
                            {languages.map((lang, i) => (
                                <span key={i} className="text-neutral-700 font-serif">
                                    <span className="font-bold">{lang.languageName}</span>
                                    <span className="text-neutral-400 ml-1">({lang.proficiencyLevel})</span>
                                </span>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'professionalAffiliations':
                return professionalAffiliations && professionalAffiliations.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Professional Societies & Memberships
                        </h2>
                        <div className="space-y-1">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="text-[11px] font-serif">
                                    <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                    {aff.roleOrMembership && <span className="text-neutral-500"> — {aff.roleOrMembership}</span>}
                                    {aff.yearsActive && <span className="text-neutral-400"> ({aff.yearsActive})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'volunteerExperience':
                return volunteerExperience && volunteerExperience.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Service & Outreach
                        </h2>
                        <div className="space-y-1.5">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="flex justify-between items-baseline text-[11px]">
                                    <div>
                                        <span className="font-bold text-neutral-900">{vol.roleTitle}</span>
                                        <span className="text-neutral-500"> — {vol.organizationName}</span>
                                    </div>
                                    <span className="text-[10px] text-neutral-400 shrink-0 ml-4">
                                        {vol.startDate} — {vol.endDate}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'references':
                return references && references.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            References
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {references.map((ref, i) => (
                                <div key={i} className="text-[11px] font-serif">
                                    <p className="font-bold text-neutral-900">{ref.referenceName}</p>
                                    {ref.role && <p className="text-neutral-600">{ref.role}{ref.organization ? `, ${ref.organization}` : ''}</p>}
                                    {ref.contactDetails && <p className="text-neutral-400">{ref.contactDetails}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'additionalInfo':
                if (!additionalInfo) return null
                const hasContent = additionalInfo.securityClearance || additionalInfo.workAuthorization || additionalInfo.availability || additionalInfo.otherInfo
                return hasContent ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 pb-1 border-b", accentColor, borderColor)}>
                            Additional Information
                        </h2>
                        <div className="text-[11px] text-neutral-700 font-serif space-y-0.5">
                            {additionalInfo.workAuthorization && <p><span className="font-semibold">Work Authorization: </span>{additionalInfo.workAuthorization}</p>}
                            {additionalInfo.availability && <p><span className="font-semibold">Availability: </span>{additionalInfo.availability}</p>}
                            {additionalInfo.otherInfo && <p>{additionalInfo.otherInfo}</p>}
                        </div>
                    </section>
                ) : null

            default:
                return null
        }
    }

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] text-neutral-900",
            "font-sans",
            className
        )}>
            {/* Header — Scholarly elegance */}
            <header className="mb-5 text-center">
                <h1 className={cn("text-2xl font-serif font-bold tracking-wide uppercase mb-0.5", accentColor)}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <p className="text-[12px] text-neutral-600 font-serif uppercase tracking-widest font-bold mb-2">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Thin rule */}
                <div className={cn("h-px w-24 mx-auto mb-2.5", borderColor.replace('border-', 'bg-'))} />

                {/* Contact Row */}
                <div className="flex items-center justify-center gap-4 text-[10.5px] text-neutral-600 flex-wrap">
                    {personalInfo?.email && (
                        <span>{personalInfo.email}</span>
                    )}
                    {personalInfo?.phone && (
                        <span className="text-neutral-300">|</span>
                    )}
                    {personalInfo?.phone && (
                        <span>{personalInfo.phone}</span>
                    )}
                    {personalInfo?.websiteUrl && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>{personalInfo.websiteUrl}</span>
                        </>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>{personalInfo.linkedinUrl}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Dynamic Content Sections */}
            {sectionOrder.map(sectionId => renderSection(sectionId))}
        </div>
    )
}
