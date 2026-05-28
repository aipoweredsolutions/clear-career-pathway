"use client"

import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * Meridian Professional Template — "The Modern Two-Column"
 *
 * A sophisticated two-column layout optimized for modern professionals.
 * Features balanced typography with professional header styling.
 * Left sidebar holds education, skills, and languages with clean organization.
 * Right main column features summary and work experience with refined formatting.
 *
 * Note: Two-column layout is optimized for visual appeal, not ATS parsing.
 */
export function MeridianProfessionalTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
        additionalInfo,
        customSections
    } = data

    const borderColorClass = accentColor.replace('text-', 'border-').split(' ')[0]
    const bgColorClass = accentColor.replace('text-', 'bg-').split(' ')[0]

    // Split name
    const nameParts = (personalInfo?.fullName || 'YOUR NAME').split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Sidebar section header
    const SidebarHeader = ({ title }: { title: string }) => (
        <div className="mt-6 mb-3 first:mt-0">
            <h2 className={cn('text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900 pb-2')}>
                {title}
            </h2>
            <div className="h-[1.5px] w-full bg-neutral-300" />
        </div>
    )

    // Main section header
    const MainHeader = ({ title }: { title: string }) => (
        <div className="mt-6 mb-3 first:mt-0">
            <h2 className={cn('text-[11px] font-bold uppercase tracking-[0.2em] pb-2', accentColor)}>
                {title}
            </h2>
            <div className="h-[1.5px] w-full bg-neutral-300" />
        </div>
    )

    // Format dates
    const fmtYear = (d?: string) => {
        if (!d) return ''
        const p = new Date(d)
        return isNaN(p.getTime()) ? d : p.getFullYear().toString()
    }
    const fmtDateRange = (start?: string, end?: string, isCurrent?: boolean) => {
        const s = fmtYear(start)
        const e = isCurrent ? 'Present' : fmtYear(end)
        if (s && e) return `${s} — ${e}`
        return s || e || ''
    }
    const fmtFullDate = (d?: string) => {
        if (!d) return ''
        const p = new Date(d)
        if (isNaN(p.getTime())) return d
        return p.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
    const fmtFullRange = (start?: string, end?: string, isCurrent?: boolean) => {
        const s = fmtFullDate(start)
        const e = isCurrent ? 'Present' : fmtFullDate(end)
        if (s && e) return `${s} — ${e}`
        return s || e || ''
    }

    // Group skills
    const groupedSkills = skills?.reduce((acc, s) => {
        const t = s.skillType || 'professional'
        if (!acc[t]) acc[t] = []
        acc[t].push(s)
        return acc
    }, {} as Record<string, typeof skills>) || {}

    return (
        <div className={cn('w-full flex flex-col bg-white text-neutral-800 font-sans leading-snug min-h-full', className)}>

            {/* ═══ HEADER ═══ */}
            <header className="w-full px-10 py-7 flex justify-between items-start bg-white border-b-2 border-neutral-200">
                <div className="flex-1">
                    <h1 className="leading-[1.1] mb-2">
                        <span className={cn('text-[32px] font-bold tracking-tight', accentColor)}>
                            {personalInfo?.fullName || 'YOUR NAME'}
                        </span>
                    </h1>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                        {personalInfo?.professionalTitle || 'PROFESSIONAL TITLE'}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2 text-[10px] text-neutral-600 mt-1">
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-400 text-[9px] uppercase tracking-wider font-semibold">Phone</span>
                            <span className="font-medium">{personalInfo.phone}</span>
                        </div>
                    )}
                    {(personalInfo?.city || personalInfo?.country || personalInfo?.location) && (
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-400 text-[9px] uppercase tracking-wider font-semibold">Location</span>
                            <span className="font-medium">{personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
                        </div>
                    )}
                    {personalInfo?.email && (
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-400 text-[9px] uppercase tracking-wider font-semibold">Email</span>
                            <span className="font-medium">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-400 text-[9px] uppercase tracking-wider font-semibold">LinkedIn</span>
                            <span className="font-medium">{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </div>
                    )}
                    {personalInfo?.portfolioUrl && (
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-400 text-[9px] uppercase tracking-wider font-semibold">Portfolio</span>
                            <span className="font-medium">{personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* ═══ DOCUMENT TYPE OVERRIDES ═══ */}
            {data.documentType === 'cover_letter' ? (
                <div className="px-8 pb-10 pt-8 bg-white flex-1">
                    <div className="mb-6 space-y-1 text-[12px]">
                        <p className="font-bold text-neutral-400 mb-4">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-bold text-neutral-900">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-bold text-neutral-900">{data.coverLetter.companyName}</p>}
                    </div>
                    <p className="text-[12px] mb-4 text-neutral-800">Dear {data.coverLetter?.recipientName || 'Hiring Manager'},</p>
                    <div className="mb-8">
                        {data.coverLetter?.content?.split('\n').map((p, i) => (
                            <p key={i} className="text-[12px] leading-[1.6] mb-3 text-justify text-neutral-700">{p}</p>
                        )) || <p className="text-neutral-400 italic text-[12px]">Your cover letter will appear here...</p>}
                    </div>
                    <div className="space-y-3 text-neutral-800">
                        <p className="text-[12px]">Sincerely,</p>
                        <p className="font-bold text-[12px] text-neutral-900">{personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="px-8 pb-10 pt-8 bg-white flex-1">
                    <h2 className={cn('text-xs font-black uppercase tracking-widest mb-5 border-b border-neutral-200 pb-2', accentColor)}>Professional References</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {references?.map((ref, i) => (
                            <div key={i} className="flex flex-col gap-0.5">
                                <span className="font-bold text-neutral-900 text-[12px]">{ref.referenceName || ref.name}</span>
                                <span className="text-[11px] text-neutral-600 italic">{ref.role || ref.title}{(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}</span>
                                {(ref.contactDetails || ref.contactInfo) && <span className="text-[11px] text-neutral-500 mt-1">{ref.contactDetails || ref.contactInfo}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex w-full flex-1">
                    {/* ─── LEFT SIDEBAR (Light Gray Background) ─── */}
                    <aside className="w-[34%] shrink-0 bg-[#fafafa] px-7 py-7 border-r border-neutral-200">
                        
                        {/* Education */}
                        {education && education.length > 0 && (
                            <section>
                                <SidebarHeader title="Education" />
                                <div className="space-y-4">
                                    {education.map((edu, i) => (
                                        <div key={i}>
                                            <h3 className="text-[11px] font-bold text-neutral-900 leading-tight">
                                                {edu.degree}
                                            </h3>
                                            {(edu.major || edu.fieldOfStudy) && (
                                                <p className="text-[10px] text-neutral-700 mt-1">
                                                    {edu.major || edu.fieldOfStudy}
                                                </p>
                                            )}
                                            <p className="text-[10px] text-neutral-600 mt-1">{edu.institutionName}</p>
                                            <p className="text-[10px] text-neutral-500 mt-1">
                                                {fmtDateRange(edu.startYear?.toString(), edu.endYear?.toString())}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Core Skills (Professional) */}
                        {groupedSkills['professional'] && groupedSkills['professional'].length > 0 && (
                            <section>
                                <SidebarHeader title="Core Skills" />
                                <ul className="flex flex-col gap-2">
                                    {groupedSkills['professional'].map((s, i) => (
                                        <li key={i} className="text-[10px] text-neutral-700 flex items-start gap-2">
                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                                            <span>{s.skillName}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Tools (Technical) */}
                        {groupedSkills['technical'] && groupedSkills['technical'].length > 0 && (
                            <section>
                                <SidebarHeader title="Technical Skills" />
                                <ul className="flex flex-col gap-2">
                                    {groupedSkills['technical'].map((s, i) => (
                                        <li key={i} className="text-[10px] text-neutral-700 flex items-start gap-2">
                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                                            <span>{s.skillName}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section>
                                <SidebarHeader title="Languages" />
                                <div className="space-y-2">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex justify-between items-center text-[10px]">
                                            <span className="text-neutral-800 font-medium">{l.languageName}</span>
                                            {l.proficiencyLevel && <span className="text-[9px] text-neutral-500 capitalize">{l.proficiencyLevel}</span>}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications in Sidebar */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <SidebarHeader title="Certifications" />
                                <div className="space-y-3">
                                    {certifications.map((c, i) => (
                                        <div key={i}>
                                            <div className="text-[10px] font-bold text-neutral-900 leading-tight">{c.certificationName}</div>
                                            {c.issuingOrganization && (
                                                <div className="text-[9px] text-neutral-600 mt-0.5">
                                                    {c.issuingOrganization}{(c.issueYear || c.issueDate) && ` • ${c.issueYear || c.issueDate}`}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Volunteer */}
                        {volunteerExperience && volunteerExperience.length > 0 && (
                            <section>
                                <SidebarHeader title="Volunteer" />
                                <div className="space-y-3">
                                    {volunteerExperience.map((vol, i) => (
                                        <div key={i}>
                                            <h3 className="text-[10px] font-bold text-neutral-900">{vol.roleTitle}</h3>
                                            <p className="text-[10px] text-neutral-600 mt-0.5">{vol.organizationName}</p>
                                            <p className="text-[9px] text-neutral-500 mt-0.5">
                                                {vol.startDate}{vol.endDate ? ` – ${vol.endDate}` : ''}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>

                    {/* ─── MAIN CONTENT (White Background) ─── */}
                    <main className="w-[66%] px-9 py-7 bg-white">

                        {/* Summary */}
                        {professionalSummary?.summaryText && (
                            <section>
                                <MainHeader title="Professional Summary" />
                                <p className="text-[11px] text-neutral-700 leading-[1.6]">
                                    {professionalSummary.summaryText}
                                </p>
                            </section>
                        )}

                        {/* Professional History */}
                        {workExperience && workExperience.length > 0 && (
                            <section>
                                <MainHeader title="Professional Experience" />
                                <div className="space-y-5">
                                    {workExperience.map((job, i) => (
                                        <div key={i}>
                                            {/* Title */}
                                            <h3 className="text-[12px] font-bold text-neutral-900 mb-1">
                                                {job.jobTitle}
                                            </h3>
                                            
                                            {/* Company & Date row */}
                                            <div className="flex items-center justify-between text-[10px] text-neutral-600 mb-2.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{job.companyName}</span>
                                                    {job.location && (
                                                        <>
                                                            <span className="text-neutral-300">•</span>
                                                            <span>{job.location}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <span className="text-neutral-500">{fmtFullRange(job.startDate, job.endDate, job.isCurrent)}</span>
                                            </div>

                                            {/* Description */}
                                            {job.roleDescription && (
                                                <p className="text-[10.5px] text-neutral-700 leading-[1.6] mb-2.5">
                                                    {job.roleDescription}
                                                </p>
                                            )}

                                            {/* Achievements */}
                                            {job.achievements && job.achievements.length > 0 && (
                                                <ul className="space-y-2">
                                                    {job.achievements.map((a, j) => (
                                                        <li key={j} className="text-[10.5px] text-neutral-700 leading-[1.5] flex gap-2.5">
                                                            <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                                                            <span>{a.achievementText}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {projects && projects.length > 0 && (
                            <section>
                                <MainHeader title="Key Projects" />
                                <div className="space-y-4">
                                    {projects.map((proj, i) => (
                                        <div key={i}>
                                            <h3 className="text-[11px] font-bold text-neutral-900 mb-1">{proj.projectName}</h3>
                                            {proj.role && <p className="text-[10px] text-neutral-500 italic mb-1">{proj.role}</p>}
                                            {proj.description && (
                                                <p className="text-[10.5px] text-neutral-700 leading-[1.6]">{proj.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* References */}
                        {references && references.length > 0 && (
                            <section>
                                <MainHeader title="References" />
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    {references.map((ref, i) => (
                                        <div key={i} className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
                                            <span className="text-[11px] font-bold text-neutral-900 block mb-1">{ref.referenceName || ref.name}</span>
                                            <span className="text-[10px] text-neutral-600 block mb-2">
                                                {ref.role || ref.title}{(ref.organization || ref.company) && `, ${ref.organization || ref.company}`}
                                            </span>
                                            {((ref as any).email || ref.contactDetails || (ref as any).contactInfo) && (
                                                <div className="text-[9px] text-neutral-500">
                                                    {((ref as any).email || ref.contactDetails || (ref as any).contactInfo)}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Custom Sections */}
                        {customSections && customSections.map((s, si) => (
                            <section key={si}>
                                <MainHeader title={s.title} />
                                {s.content && <p className="text-[11px] text-neutral-700 leading-[1.6] mb-2">{s.content}</p>}
                                {s.items && s.items.length > 0 && (
                                    <ul className="space-y-2">
                                        {s.items.map((item, ii) => (
                                            <li key={ii} className="text-[10.5px] text-neutral-700 flex gap-2.5 leading-[1.5]">
                                                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                                                <span>{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </main>
                </div>
            )}
        </div>
    )
}
