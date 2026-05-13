import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Gridline Template
 * 
 * Inspired by engineering dot-grid notebooks. Uses a subtle dot-grid background 
 * pattern (CSS-only) behind a rigorously structured card layout. 
 * 
 * 100% ATS-compliant single-column layout. The dot background and card borders
 * are purely visual and ignored by parsers.
 */
export function ATSGridlineTemplate({ data, className, accentColor = 'text-blue-800' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        achievements
    } = data

    // Handle full tailwind text-color classes
    const borderColorClass = accentColor.replace('text-', 'border-')

    // Section wrapper with left label and content card
    const SectionBlock = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-6 last:mb-0">
            {/* Section Label */}
            <div className="mb-2">
                <h2 className={cn(
                    'inline-block px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] bg-white border border-neutral-200 rounded-sm shadow-sm',
                    accentColor, borderColorClass
                )}>
                    {title}
                </h2>
            </div>
            {/* Content Card */}
            <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-sm">
                {children}
            </div>
        </div>
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
            className={cn('w-full text-neutral-800 leading-relaxed relative overflow-hidden', className)}
            style={{ 
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                // CSS Dot Grid Pattern
                backgroundColor: '#f8fafc', // slate-50
                backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', // slate-300
                backgroundSize: '16px 16px'
            }}
        >
            <div className="p-8 sm:p-12 relative z-10 max-w-4xl mx-auto">

                {/* ── HEADER CARD ── */}
                <header className="bg-white border border-neutral-200 rounded-sm p-6 mb-8 shadow-sm">
                    <h1 className="text-3xl font-black uppercase tracking-wider mb-1">
                        {personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <p className={cn("text-sm font-bold uppercase tracking-widest mb-4", accentColor)}>
                            {personalInfo.professionalTitle}
                        </p>
                    )}
                    
                    <hr className="border-t border-neutral-100 mb-4" />
                    
                    <div className="text-[11px] font-medium text-neutral-500 tracking-wide flex flex-wrap gap-x-4 gap-y-1" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                        {contactLines.map((line, i) => (
                            <React.Fragment key={i}>
                                <span>{line}</span>
                                {i < contactLines.length - 1 && <span>·</span>}
                            </React.Fragment>
                        ))}
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
                            <div key={i} className=" flex flex-col gap-1">
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


                {/* ── BODY ── */}
                <div>
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <SectionBlock title="Summary">
                            <p className="text-[12px] font-medium text-neutral-700 leading-relaxed">
                                {professionalSummary.summaryText}
                            </p>
                        </SectionBlock>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <SectionBlock title="Experience">
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i} className=" border-l-2 pl-4 py-1 border-neutral-100">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-[14px] font-bold text-neutral-900">
                                                {job.jobTitle}
                                            </h3>
                                            <span className="text-[11px] font-bold text-neutral-400 font-mono">
                                                {formatDateRange(job.startDate, job.endDate, job.isCurrent)}
                                            </span>
                                        </div>
                                        <div className={cn("text-[12px] font-semibold mb-2", accentColor)}>
                                            {job.companyName} {job.location && <span className="text-neutral-400">· {job.location}</span>}
                                        </div>
                                        
                                        {job.roleDescription && (
                                            <p className="text-[12px] text-neutral-700 mb-2 leading-relaxed">
                                                {job.roleDescription}
                                            </p>
                                        )}
                                        
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-1.5 mt-2">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[12px] text-neutral-700 flex gap-3 leading-relaxed">
                                                        <span className="shrink-0 text-[10px] mt-1">○</span>
                                                        <span>{ach.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </SectionBlock>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <SectionBlock title="Education">
                            <div className="grid grid-cols-1 gap-4">
                                {education.map((edu, i) => (
                                    <div key={i} className=" border border-neutral-100 rounded p-3 bg-neutral-50/50">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-[13px] font-bold text-neutral-900">
                                                {edu.degree} {edu.major && `· ${edu.major}`}
                                            </h3>
                                            <span className="text-[11px] font-bold text-neutral-400 font-mono">
                                                {edu.endYear || edu.startYear}
                                            </span>
                                        </div>
                                        <div className={cn("text-[11px] font-semibold", accentColor)}>
                                            {edu.institutionName}
                                        </div>
                                        {edu.gpa && (
                                            <div className="text-[11px] text-neutral-500 mt-1">GPA: {edu.gpa}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </SectionBlock>
                    )}
                    
                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <SectionBlock title="Projects">
                            <div className="space-y-4">
                                {projects.map((proj, i) => (
                                    <div key={i} className=" border-l-2 pl-4 py-1 border-neutral-100">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-[13px] font-bold text-neutral-900">
                                                {proj.projectName}
                                            </h3>
                                            {proj.startDate && (
                                                <span className="text-[11px] font-bold text-neutral-400 font-mono">
                                                    {formatDateRange(proj.startDate, proj.endDate, false)}
                                                </span>
                                            )}
                                        </div>
                                        {proj.role && (
                                            <div className={cn("text-[11px] font-semibold mb-1", accentColor)}>
                                                {proj.role}
                                            </div>
                                        )}
                                        {proj.description && (
                                            <p className="text-[12px] text-neutral-600 leading-relaxed mb-2">
                                                {proj.description}
                                            </p>
                                        )}
                                        {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {proj.toolsUsed.map((t, ti) => (
                                                    <span key={ti} className="text-[9px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-sm">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </SectionBlock>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <SectionBlock title="Skills">
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
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
                                                    {type}
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {list.map((s, i) => (
                                                        <span 
                                                            key={i} 
                                                            className="text-[11px] font-medium px-2 py-1 bg-neutral-50 border border-neutral-200 rounded-sm text-neutral-700"
                                                        >
                                                            [{s.skillName}]
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            })()}
                        </SectionBlock>
                    )}
                    
                    {/* Certifications & Awards */}
                    {(certifications?.length || achievements?.length) ? (
                        <SectionBlock title="Validation">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {certifications && certifications.map((cert, i) => (
                                    <div key={`cert-${i}`} className=" border border-neutral-100 rounded p-3 bg-neutral-50/50">
                                        <h3 className="text-[12px] font-bold text-neutral-900 mb-1">
                                            {cert.certificationName}
                                        </h3>
                                        <div className="text-[11px] text-neutral-600">
                                            {cert.issuingOrganization}
                                        </div>
                                        {(cert.issueYear || cert.issueDate) && (
                                            <div className="text-[10px] font-mono text-neutral-400 mt-1">
                                                {cert.issueYear || cert.issueDate}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {achievements && achievements.map((ach, i) => (
                                    <div key={`ach-${i}`} className="border border-neutral-100 rounded p-3 bg-neutral-50/50">
                                        <h3 className="text-[12px] font-bold text-neutral-900 mb-1">
                                            {ach.achievementTitle}
                                        </h3>
                                        <div className="text-[11px] text-neutral-600">
                                            {ach.issuingBody}
                                        </div>
                                        {ach.year && (
                                            <div className="text-[10px] font-mono text-neutral-400 mt-1">
                                                {ach.year}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </SectionBlock>
                    ): null}

                </div>
                </>
            )}
            </div>
        </div>
    )
}
