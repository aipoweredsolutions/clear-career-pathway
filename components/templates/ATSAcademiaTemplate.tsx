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
        if (accentColor.includes('slate')) return 'border-slate-300'
        if (accentColor.includes('blue')) return 'border-blue-200'
        if (accentColor.includes('maroon') || accentColor.includes('rose') || accentColor.includes('red')) return 'border-red-200'
        if (accentColor.includes('emerald') || accentColor.includes('green')) return 'border-emerald-200'
        if (accentColor.includes('neutral')) return 'border-neutral-200'
        return 'border-slate-200'
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

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2 className={cn("text-[13px] font-black uppercase tracking-[0.25em] mb-4 pb-2 border-b-[1.5px]", accentColor, borderColor)}>
            {children}
        </h2>
    )

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case 'professionalSummary':
                return professionalSummary?.summaryText ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Research Profile</SectionTitle>
                        <p className="text-[13.5px] leading-[1.8] text-neutral-700 font-serif text-justify">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                ) : null

            case 'education':
                return education && education.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Education</SectionTitle>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={edu.id || i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[15px] font-bold text-neutral-900 font-serif">
                                            {edu.degree}{edu.major ? ` in ${edu.major}` : ''}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ''}
                                        </h3>
                                        <span className="text-[11px] font-bold text-neutral-500 ml-4 shrink-0 uppercase tracking-widest">
                                            {edu.startYear && `${edu.startYear} — `}{edu.endYear}
                                        </span>
                                    </div>
                                    <p className={cn("text-[13.5px] font-bold italic", accentColor)}>
                                        {edu.institutionName}
                                        {edu.location && <span className="text-neutral-400 font-normal not-italic mx-2">|</span>}
                                        {edu.location && <span className="font-normal not-italic text-neutral-500">{edu.location}</span>}
                                    </p>
                                    {edu.gpa && <p className="text-[11px] text-neutral-400 mt-1 uppercase tracking-tighter font-bold">GPA: <span className="text-neutral-600">{edu.gpa}</span></p>}
                                    {edu.achievements && <p className="text-[13px] text-neutral-600 mt-2 italic font-serif leading-relaxed border-l-2 border-neutral-100 pl-4">{edu.achievements}</p>}
                                    {edu.coursework && (
                                        <p className="text-[12px] text-neutral-500 mt-2 font-serif">
                                            <span className="font-bold text-neutral-700">Dissertation: </span>{edu.coursework}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'publications':
                return publications && publications.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Selected Publications</SectionTitle>
                        <div className="space-y-4">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-[13.5px] text-neutral-700 font-serif leading-[1.7] flex gap-4">
                                    <span className="text-neutral-300 font-bold tabular-nums">{(i + 1).toString().padStart(2, '0')}</span>
                                    <div>
                                        <span className="font-bold text-neutral-900 leading-snug block mb-0.5">{pub.title}</span>
                                        <span className="italic text-neutral-600"> {pub.platformOrPublisher}</span>
                                        {pub.publicationYear && <span className="text-neutral-400 font-bold"> · {pub.publicationYear}</span>}
                                        {pub.url && <span className="text-neutral-300 text-[11px] ml-2 block font-sans tracking-tight">DOI / URL: {pub.url}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'workExperience':
                return workExperience && workExperience.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Academic Appointments</SectionTitle>
                        <div className="space-y-7">
                            {workExperience.map((job, i) => (
                                <div key={job.id || i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[15px] font-bold text-neutral-900 font-serif">{job.jobTitle}</h3>
                                        <span className="text-[11px] font-bold text-neutral-400 shrink-0 ml-4 uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <p className={cn("text-[13.5px] font-bold", accentColor)}>
                                        {job.companyName}
                                        {job.location && <span className="text-neutral-300 font-normal mx-2">|</span>}
                                        {job.location && <span className="text-neutral-500 font-normal">{job.location}</span>}
                                    </p>

                                    {job.roleDescription && (
                                        <p className="text-[13px] text-neutral-600 mt-2 font-serif italic leading-relaxed">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="mt-3 space-y-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex items-start gap-3 text-[13.5px] text-neutral-700 leading-relaxed">
                                                    <span className="text-neutral-200 mt-2 shrink-0 font-bold text-lg leading-none">·</span>
                                                    <span className="font-serif font-medium">{ach.achievementText}</span>
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
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Research Grants & Projects</SectionTitle>
                        <div className="space-y-6">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[15px] font-bold text-neutral-900 font-serif">{proj.projectName}</h3>
                                        {proj.startDate && (
                                            <span className="text-[11px] font-bold text-neutral-400 shrink-0 ml-4 uppercase tracking-widest">
                                                {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && <p className={cn("text-[12px] font-bold uppercase tracking-wider", accentColor)}>{proj.role}</p>}
                                    {proj.description && <p className="text-[13.5px] text-neutral-600 mt-2 font-serif leading-relaxed">{proj.description}</p>}
                                    {proj.outcomes && <p className="text-[11px] text-neutral-400 mt-2 italic font-serif">Key Outcomes: <span className="text-neutral-500">{proj.outcomes}</span></p>}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {proj.toolsUsed.map((tool, ti) => (
                                                <span key={ti} className="text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'certifications':
                return certifications && certifications.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Professional Affiliations</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                            {certifications.map((cert, i) => (
                                <div key={cert.id || i} className="text-[13px] border-b border-neutral-50 pb-2">
                                    <span className="font-bold text-neutral-900 block leading-tight mb-1">{cert.certificationName}</span>
                                    <span className="text-neutral-400 text-[10px] font-black uppercase tracking-widest">{cert.issuingOrganization} {cert.issueYear && `· ${cert.issueYear}`}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Methodologies & Proficiencies</SectionTitle>
                        {(() => {
                            const grouped = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const categoryLabels: Record<string, string> = {
                                technical: 'Primary Research Methods',
                                professional: 'Expertise Areas',
                                tool: 'Laboratory & Computing Tools',
                                industry: 'Academic Disciplines'
                            }

                            return (
                                <div className="space-y-4">
                                    {Object.entries(grouped).map(([type, groupSkills]) => (
                                        <div key={type} className="flex flex-col gap-1">
                                            <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", accentColor)}>
                                                {categoryLabels[type] || type}:
                                            </span>
                                            <span className="text-[13.5px] text-neutral-700 font-serif font-medium leading-relaxed">
                                                {groupSkills.map(s => s.skillName).join('  ·  ')}
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
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Honors & Awards</SectionTitle>
                        <div className="space-y-4">
                            {achievements.map((ach, i) => (
                                <div key={i} className="text-[13.5px] border-l-4 border-neutral-50 pl-5 py-1">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                        {ach.year && <span className={cn("text-[11px] font-black uppercase tracking-widest", accentColor)}>{ach.year}</span>}
                                    </div>
                                    {ach.issuingBody && <span className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider leading-none">{ach.issuingBody}</span>}
                                    {ach.description && <p className="text-[12px] text-neutral-500 font-serif mt-1 italic">{ach.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'languages':
                return languages && languages.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Languages</SectionTitle>
                        <div className="flex flex-wrap gap-x-10 gap-y-2 text-[13.5px]">
                            {languages.map((lang, i) => (
                                <span key={i} className="text-neutral-700 font-serif">
                                    <span className="font-bold text-neutral-900">{lang.languageName}</span>
                                    <span className="text-neutral-400 ml-2 italic">— {lang.proficiencyLevel}</span>
                                </span>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'professionalAffiliations':
                return professionalAffiliations && professionalAffiliations.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Service & Societies</SectionTitle>
                        <div className="space-y-3">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="text-[13.5px] font-serif border-b border-neutral-50 pb-2">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                        {aff.yearsActive && <span className="text-neutral-400 text-[11px] font-bold uppercase tracking-widest">{aff.yearsActive}</span>}
                                    </div>
                                    {aff.roleOrMembership && <span className="text-neutral-500 text-[12px] italic">— {aff.roleOrMembership}</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'volunteerExperience':
                return volunteerExperience && volunteerExperience.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Community Engagement</SectionTitle>
                        <div className="space-y-4">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="flex justify-between items-baseline text-[13.5px] font-serif">
                                    <div>
                                        <span className="font-bold text-neutral-900">{vol.roleTitle}</span>
                                        <span className="text-neutral-400 font-normal mx-2">|</span>
                                        <span className="text-neutral-500 font-medium">{vol.organizationName}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-neutral-400 shrink-0 ml-4 uppercase tracking-widest">
                                        {vol.startDate} — {vol.endDate}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'references':
                return references && references.length > 0 ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>References</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {references.map((ref, i) => (
                                <div key={i} className="text-[13.5px] font-serif bg-neutral-50/50 p-5 rounded-2xl border border-neutral-100">
                                    <p className="font-bold text-neutral-900 text-base mb-1">{ref.referenceName}</p>
                                    {ref.role && <p className="text-neutral-600 font-medium leading-tight mb-0.5">{ref.role}</p>}
                                    {ref.organization && <p className="text-neutral-400 font-bold text-[11px] uppercase tracking-widest">{ref.organization}</p>}
                                    {ref.contactDetails && <p className="text-neutral-400 font-medium italic mt-4 pt-4 border-t border-neutral-200">{ref.contactDetails}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'additionalInfo':
                if (!additionalInfo) return null
                const hasContent = additionalInfo.securityClearance || additionalInfo.workAuthorization || additionalInfo.availability || additionalInfo.otherInfo
                return hasContent ? (
                    <section key={sectionId} className="mb-8">
                        <SectionTitle>Notes</SectionTitle>
                        <div className="text-[13.5px] text-neutral-600 font-serif space-y-1 bg-neutral-50 p-5 rounded-2xl italic">
                            {additionalInfo.workAuthorization && <p><span className="font-bold not-italic text-neutral-800 mr-2">Work Authorization: </span>{additionalInfo.workAuthorization}</p>}
                            {additionalInfo.availability && <p><span className="font-bold not-italic text-neutral-800 mr-2">Availability: </span>{additionalInfo.availability}</p>}
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
            "w-full bg-white text-neutral-900 font-serif leading-normal",
            className
        )}
        style={{ fontFamily: "'Lora', 'PT Serif', 'Georgia', serif" }}
        >
            {/* Header — Scholarly elegance */}
            <header className="mb-10 text-center pt-8">
                <h1 className={cn("text-[38px] font-serif font-black tracking-tight mb-2 leading-none", accentColor)}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <p className="text-[14px] text-neutral-500 font-serif uppercase tracking-[0.3em] font-bold mb-6">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Thin rule */}
                <div className={cn("h-[1.5px] w-12 mx-auto mb-6", borderColor.replace('border-', 'bg-'))} />

                {/* Contact Row */}
                <div className="flex items-center justify-center gap-x-6 gap-y-2 text-[12px] text-neutral-500 font-bold uppercase tracking-wider flex-wrap">
                    {personalInfo?.email && (
                        <span>{personalInfo.email}</span>
                    )}
                    {personalInfo?.phone && (
                        <span className="text-neutral-200">|</span>
                    )}
                    {personalInfo?.phone && (
                        <span>{personalInfo.phone}</span>
                    )}
                    {personalInfo?.websiteUrl && (
                        <>
                            <span className="text-neutral-200">|</span>
                            <span>{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span className="text-neutral-200">|</span>
                            <span>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <>
                            <span className="text-neutral-200">|</span>
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </>
                    )}
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
                <>


            {/* Dynamic Content Sections */}
            <div className="pb-10">
                {sectionOrder.map(sectionId => renderSection(sectionId))}
            </div>
        
                </>
            )}
            </div>
    )
}
