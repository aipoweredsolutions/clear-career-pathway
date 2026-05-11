import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSNursingTemplate({ data, className, accentColor = 'text-teal-800' }: TemplateProps) {
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
        if (accentColor.includes('teal')) return 'border-teal-700'
        if (accentColor.includes('blue')) return 'border-blue-800'
        if (accentColor.includes('emerald')) return 'border-emerald-700'
        if (accentColor.includes('rose')) return 'border-rose-700'
        if (accentColor.includes('slate')) return 'border-slate-600'
        return 'border-teal-700'
    }

    const getBgAccent = () => {
        if (accentColor.includes('teal')) return 'bg-teal-50'
        if (accentColor.includes('blue')) return 'bg-blue-50'
        if (accentColor.includes('emerald')) return 'bg-emerald-50'
        if (accentColor.includes('rose')) return 'bg-rose-50'
        if (accentColor.includes('slate')) return 'bg-slate-50'
        return 'bg-teal-50'
    }

    const borderColor = getBorderColor()
    const bgAccent = getBgAccent()

    // Render sections dynamically based on sectionOrder
    const sectionOrder = data.sectionOrder || [
        'professionalSummary',
        'certifications',
        'skills',
        'workExperience',
        'education',
        'achievements',
        'volunteerExperience',
        'languages',
        'professionalAffiliations',
        'references',
        'additionalInfo'
    ]

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case 'professionalSummary':
                return professionalSummary?.summaryText ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Clinical Summary
                        </h2>
                        <p className="text-[11.5px] leading-relaxed text-neutral-700">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                ) : null

            case 'certifications':
                return certifications && certifications.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Licensure & Certifications
                        </h2>
                        <div className="grid grid-cols-1 gap-2">
                            {certifications.map((cert, i) => (
                                <div key={cert.id || i} className="break-inside-avoid flex items-start gap-2">
                                    <span className={cn("text-[10px] mt-0.5", accentColor)}>✦</span>
                                    <div>
                                        <span className="text-[11px] font-bold text-neutral-900">{cert.certificationName}</span>
                                        <span className="text-[10px] text-neutral-500 ml-1.5">
                                            — {cert.issuingOrganization}
                                            {cert.issueYear && ` (${cert.issueYear})`}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Clinical Competencies
                        </h2>
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const categoryLabels: Record<string, string> = {
                                technical: 'Clinical / Technical',
                                professional: 'Core Competencies',
                                tool: 'Systems & Equipment',
                                industry: 'Specializations'
                            }

                            if (Object.keys(grouped).length === 1) {
                                return (
                                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px]">
                                        {skills.map((skill, index) => (
                                            <React.Fragment key={skill.id || index}>
                                                <span className="text-neutral-800">{skill.skillName}</span>
                                                {index < skills.length - 1 && <span className="text-neutral-300">|</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )
                            }

                            return (
                                <div className="space-y-1.5">
                                    {Object.entries(grouped).map(([type, groupSkills]) => (
                                        <div key={type} className="flex gap-2 text-[11px]">
                                            <span className={cn("font-bold min-w-[130px] shrink-0", accentColor)}>
                                                {categoryLabels[type] || type}:
                                            </span>
                                            <span className="text-neutral-700">
                                                {groupSkills.map(s => s.skillName).join(' • ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                    </section>
                ) : null

            case 'workExperience':
                return workExperience && workExperience.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Clinical Experience
                        </h2>
                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={job.id || i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{job.jobTitle}</h3>
                                        <span className="text-[10px] font-semibold text-neutral-500 shrink-0 ml-4">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className={cn("text-[11px] font-semibold", accentColor)}>{job.companyName}</span>
                                        {job.location && (
                                            <span className="text-[10px] text-neutral-400">| {job.location}</span>
                                        )}
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[10.5px] text-neutral-600 mt-1 italic">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="mt-1.5 space-y-0.5">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex items-start gap-2 text-[11px] text-neutral-700">
                                                    <span className={cn("mt-1 shrink-0", accentColor)}>▸</span>
                                                    <span>{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'education':
                return education && education.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Education
                        </h2>
                        <div className="space-y-2.5">
                            {education.map((edu, i) => (
                                <div key={edu.id || i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">
                                            {edu.degree}{edu.major ? `, ${edu.major}` : ''}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ''}
                                        </h3>
                                        <span className="text-[10px] font-semibold text-neutral-500 ml-4 shrink-0">
                                            {edu.startYear && `${edu.startYear} — `}{edu.endYear}
                                        </span>
                                    </div>
                                    <p className={cn("text-[11px] font-medium", accentColor)}>{edu.institutionName}</p>
                                    {edu.gpa && <p className="text-[10px] text-neutral-500">GPA: {edu.gpa}</p>}
                                    {edu.achievements && <p className="text-[10px] text-neutral-600 italic">{edu.achievements}</p>}
                                    {edu.coursework && (
                                        <p className="text-[10px] text-neutral-500 mt-0.5">
                                            <span className="font-semibold">Relevant Coursework: </span>{edu.coursework}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'achievements':
                return achievements && achievements.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Honors & Awards
                        </h2>
                        <div className="space-y-1">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px]">
                                    <span className={cn("mt-0.5", accentColor)}>✦</span>
                                    <div>
                                        <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                        {ach.issuingBody && <span className="text-neutral-500"> — {ach.issuingBody}</span>}
                                        {ach.year && <span className="text-neutral-400"> ({ach.year})</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'volunteerExperience':
                return volunteerExperience && volunteerExperience.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Community Service & Volunteer Work
                        </h2>
                        <div className="space-y-1.5">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="break-inside-avoid flex justify-between items-baseline text-[11px]">
                                    <div>
                                        <span className="font-bold text-neutral-900">{vol.roleTitle}</span>
                                        <span className={cn("ml-1", accentColor)}> — {vol.organizationName}</span>
                                    </div>
                                    <span className="text-[10px] text-neutral-400 shrink-0 ml-4">
                                        {vol.startDate} — {vol.endDate}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'languages':
                return languages && languages.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Languages
                        </h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px]">
                            {languages.map((lang, i) => (
                                <span key={i} className="text-neutral-700">
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
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Professional Memberships
                        </h2>
                        <div className="space-y-1">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="break-inside-avoid text-[11px]">
                                    <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                    {aff.roleOrMembership && <span className="text-neutral-500"> — {aff.roleOrMembership}</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'projects':
                return projects && projects.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Clinical Projects & Research
                        </h2>
                        <div className="space-y-2.5">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{proj.projectName}</h3>
                                        {proj.startDate && (
                                            <span className="text-[10px] text-neutral-400 shrink-0 ml-4">
                                                {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.description && <p className="text-[11px] text-neutral-600 mt-0.5">{proj.description}</p>}
                                    {proj.outcomes && <p className="text-[10px] text-neutral-500 mt-0.5 italic">Outcome: {proj.outcomes}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'publications':
                return publications && publications.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Publications
                        </h2>
                        <div className="space-y-1.5">
                            {publications.map((pub, i) => (
                                <div key={i} className="break-inside-avoid text-[11px]">
                                    <span className="font-bold text-neutral-900">{pub.title}</span>
                                    {pub.platformOrPublisher && <span className="text-neutral-500 italic"> — {pub.platformOrPublisher}</span>}
                                    {pub.publicationYear && <span className="text-neutral-400"> ({pub.publicationYear})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'references':
                return references && references.length > 0 ? (
                    <section key={sectionId} className="mb-5">
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            References
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {references.map((ref, i) => (
                                <div key={i} className="break-inside-avoid text-[11px]">
                                    <p className="font-bold text-neutral-900">{ref.referenceName}</p>
                                    {ref.role && <p className="text-neutral-600">{ref.role}{ref.organization ? `, ${ref.organization}` : ''}</p>}
                                    {ref.contactDetails && <p className="text-neutral-400">{ref.contactDetails}</p>}
                                    {ref.availabilityStatement && <p className="text-neutral-400 italic text-[10px]">{ref.availabilityStatement}</p>}
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
                        <h2 className={cn("text-[13px] font-bold uppercase tracking-[0.15em] mb-2 pb-1.5 border-b-2", accentColor, borderColor)}>
                            Additional Information
                        </h2>
                        <div className="text-[11px] text-neutral-700 space-y-0.5">
                            {additionalInfo.workAuthorization && <p><span className="font-semibold">Work Authorization: </span>{additionalInfo.workAuthorization}</p>}
                            {additionalInfo.availability && <p><span className="font-semibold">Availability: </span>{additionalInfo.availability}</p>}
                            {additionalInfo.willingToRelocate && <p><span className="font-semibold">Willing to Relocate: </span>Yes</p>}
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
            "w-full bg-white text-neutral-900",
            "font-sans",
            className
        )}>
            {/* Header - Medical Professional Style */}
            <header className="mb-5">
                <div className="text-center">
                    <h1 className={cn("text-2xl font-black uppercase tracking-[0.2em] mb-1", accentColor)}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <p className="text-[12px] font-bold text-neutral-600 uppercase tracking-[0.15em] mb-3">
                            {personalInfo.professionalTitle}
                        </p>
                    )}

                    {/* Contact Row */}
                    <div className="flex items-center justify-center gap-4 text-[10.5px] text-neutral-600 flex-wrap">
                        {personalInfo?.phone && (
                            <span>{personalInfo.phone}</span>
                        )}
                        {personalInfo?.email && (
                            <span className="flex items-center gap-4">
                                <span className="text-neutral-300">|</span>
                                {personalInfo.email}
                            </span>
                        )}
                        {personalInfo?.linkedinUrl && (
                            <span className="flex items-center gap-4">
                                <span className="text-neutral-300">|</span>
                                {personalInfo.linkedinUrl}
                            </span>
                        )}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <span className="flex items-center gap-4">
                                <span className="text-neutral-300">|</span>
                                {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                            </span>
                        )}
                    </div>
                </div>
            </header>
            {/* --- DOCUMENT TYPE OVERRIDES --- */}
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
                    <h2 className={cn("text-sm font-black uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2", accentColor)}>Professional References</h2>
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


            {/* Dynamic Content Sections */}
            {sectionOrder.map(sectionId => renderSection(sectionId))}
        
                </>
            )}
            </div>
    )
}
