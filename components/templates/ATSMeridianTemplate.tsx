"use client"

import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Meridian Template — "The Modern Professional"
 *
 * A highly-compact, single-page optimized ATS template.
 * Split-weight header text with top-right right-aligned contact info.
 * Left sidebar holds education, skills, languages. 
 * Right main column features summary and work experience.
 *
 * ATS-compliant: linear DOM order, semantic headings, no absolute
 * positioning, clean text rendering.
 */
export function ATSMeridianTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
        <div className="mt-5 mb-2.5 first:mt-0">
            <h2 className={cn('text-[10px] font-black uppercase tracking-[0.25em] text-neutral-900 pb-1.5')}>
                {title}
            </h2>
            <div className="h-[2px] w-full bg-neutral-200" />
        </div>
    )

    // Main section header
    const MainHeader = ({ title }: { title: string }) => (
        <div className="mt-5 mb-3 first:mt-0">
            <h2 className={cn('text-[10px] font-black uppercase tracking-[0.25em] pb-1.5', accentColor)}>
                {title}
            </h2>
            <div className="h-[2px] w-full bg-neutral-200" />
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
            <header className="w-full px-8 py-6 flex justify-between items-center bg-white">
                <div>
                    <h1 className="leading-[1] mb-1.5 flex items-baseline gap-2">
                        <span className={cn('text-[36px] font-black uppercase tracking-tight', accentColor)}>
                            {firstName}
                        </span>
                        <span className={cn('text-[36px] font-light uppercase tracking-tight', accentColor)}>
                            {lastName}
                        </span>
                    </h1>
                    <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-neutral-500">
                        {personalInfo?.professionalTitle || 'PROFESSIONAL TITLE'}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-1.5 text-[9.5px] text-neutral-600">
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-neutral-400" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {(personalInfo?.city || personalInfo?.country || personalInfo?.location) && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-neutral-400" />
                            <span>{personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
                        </div>
                    )}
                    {personalInfo?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-neutral-400" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin className="w-3 h-3 text-neutral-400" />
                            <span>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </div>
                    )}
                    {personalInfo?.portfolioUrl && (
                        <div className="flex items-center gap-1.5">
                            <Globe className="w-3 h-3 text-neutral-400" />
                            <span>{personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="w-full h-px bg-neutral-200" />

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
                    {/* ─── LEFT SIDEBAR (Gray Background) ─── */}
                    <aside className="w-[32%] shrink-0 bg-[#f3f4f6] px-6 py-6 border-r border-neutral-200/60">
                        
                        {/* Education */}
                        {education && education.length > 0 && (
                            <section>
                                <SidebarHeader title="Education" />
                                <div className="space-y-3.5">
                                    {education.map((edu, i) => (
                                        <div key={i}>
                                            <h3 className="text-[10.5px] font-black text-neutral-900 leading-tight">
                                                {edu.degree}
                                            </h3>
                                            {(edu.major || edu.fieldOfStudy) && (
                                                <p className="text-[10px] text-neutral-700 mt-0.5">
                                                    {edu.major || edu.fieldOfStudy}
                                                </p>
                                            )}
                                            <p className="text-[10px] text-neutral-600 italic mt-0.5">{edu.institutionName}</p>
                                            <p className="text-[9.5px] text-neutral-500 mt-0.5">
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
                                <ul className="flex flex-col">
                                    {groupedSkills['professional'].map((s, i) => (
                                        <li key={i} className="py-1.5 text-[10px] text-neutral-700 border-b border-neutral-200/80 last:border-0">
                                            {s.skillName}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Tools (Technical) */}
                        {groupedSkills['technical'] && groupedSkills['technical'].length > 0 && (
                            <section>
                                <SidebarHeader title="Tools" />
                                <ul className="flex flex-col">
                                    {groupedSkills['technical'].map((s, i) => (
                                        <li key={i} className="py-1.5 text-[10px] text-neutral-700 border-b border-neutral-200/80 last:border-0">
                                            {s.skillName}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section>
                                <SidebarHeader title="Languages" />
                                <div className="space-y-0">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex justify-between items-center py-1.5 border-b border-neutral-200/80 last:border-0 text-[10px]">
                                            <span className="text-neutral-800">{l.languageName}</span>
                                            {l.proficiencyLevel && <span className="text-[9.5px] text-neutral-400 capitalize">{l.proficiencyLevel}</span>}
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
                                            <h3 className="text-[10.5px] font-black text-neutral-900">{vol.roleTitle}</h3>
                                            <p className="text-[10px] text-neutral-600 mt-0.5">{vol.organizationName}</p>
                                            <p className="text-[9.5px] text-neutral-500 mt-0.5">
                                                {vol.startDate}{vol.endDate ? ` – ${vol.endDate}` : ''}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>

                    {/* ─── MAIN CONTENT (White Background) ─── */}
                    <main className="w-[68%] px-8 py-6 bg-white">

                        {/* Summary */}
                        {professionalSummary?.summaryText && (
                            <section>
                                <MainHeader title="Summary" />
                                <p className="text-[10.5px] text-neutral-700 leading-[1.6] text-justify">
                                    {professionalSummary.summaryText}
                                </p>
                            </section>
                        )}

                        {/* Professional History */}
                        {workExperience && workExperience.length > 0 && (
                            <section>
                                <MainHeader title="Professional History" />
                                <div className="space-y-4">
                                    {workExperience.map((job, i) => (
                                        <div key={i}>
                                            {/* Title */}
                                            <h3 className="text-[11.5px] font-black text-neutral-900 mb-0.5">
                                                {job.jobTitle}
                                            </h3>
                                            
                                            {/* Company & Date row */}
                                            <div className="flex items-center text-[10px] text-neutral-500 mb-2 font-medium">
                                                <span className="italic">{job.companyName}</span>
                                                {(job.location || job.startDate) && <span className="mx-2 text-neutral-300">·</span>}
                                                {job.location && <span>{job.location}</span>}
                                                {(job.location && job.startDate) && <span className="mx-2 text-neutral-300">·</span>}
                                                <span>{fmtFullRange(job.startDate, job.endDate, job.isCurrent)}</span>
                                            </div>

                                            {/* Description */}
                                            {job.roleDescription && (
                                                <p className="text-[10.5px] text-neutral-700 leading-[1.6] mb-2 text-justify">
                                                    {job.roleDescription}
                                                </p>
                                            )}

                                            {/* Achievements */}
                                            {job.achievements && job.achievements.length > 0 && (
                                                <ul className="space-y-1.5">
                                                    {job.achievements.map((a, j) => (
                                                        <li key={j} className="text-[10.5px] text-neutral-700 leading-[1.5] flex gap-2">
                                                            <span className="mt-[6px] w-[3px] h-[3px] rounded-full bg-neutral-400 shrink-0" />
                                                            <span className="text-justify">{a.achievementText}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <MainHeader title="Certifications" />
                                <ul className="space-y-2">
                                    {certifications.map((c, i) => (
                                        <li key={i} className="text-[10.5px] text-neutral-700 flex items-start gap-2">
                                            <span className="mt-[6px] w-[3px] h-[3px] rounded-full bg-neutral-400 shrink-0" />
                                            <div>
                                                <span className="text-neutral-900">{c.certificationName}</span>
                                                {c.issuingOrganization && <span className="text-neutral-500"> — {c.issuingOrganization}</span>}
                                                {(c.issueYear || c.issueDate) && <span className="text-neutral-400">, {c.issueYear || c.issueDate}</span>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* References (2x2 Grid with borders) */}
                        {references && references.length > 0 && (
                            <section>
                                <MainHeader title="References" />
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    {references.map((ref, i) => (
                                        <div key={i} className="p-3 bg-neutral-50/50 border border-neutral-200 border-t-[2px] border-t-neutral-900 flex flex-col">
                                            <span className="text-[11px] font-black text-neutral-900 mb-0.5">{ref.referenceName || ref.name}</span>
                                            <span className="text-[9.5px] text-neutral-600 italic leading-tight mb-1.5">
                                                {ref.role || ref.title}{(ref.organization || ref.company) && `, ${ref.organization || ref.company}`}
                                            </span>
                                            
                                            <div className="mt-auto pt-1.5 space-y-0.5">
                                                {((ref as any).email || ref.contactDetails || (ref as any).contactInfo) && (
                                                    <div className="text-[9px] text-neutral-500 font-medium">
                                                        {((ref as any).email || ref.contactDetails || (ref as any).contactInfo)}
                                                    </div>
                                                )}
                                                {(ref as any).phone && (
                                                    <div className="text-[9px] text-neutral-500 font-medium">
                                                        {(ref as any).phone}
                                                    </div>
                                                )}
                                                {(ref as any).relationship && (
                                                    <div className="text-[8.5px] font-black uppercase tracking-widest text-neutral-400 mt-1.5">
                                                        {(ref as any).relationship}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Custom Sections */}
                        {customSections && customSections.map((s, si) => (
                            <section key={si}>
                                <MainHeader title={s.title} />
                                {s.content && <p className="text-[10.5px] text-neutral-700 leading-[1.6] text-justify mb-2">{s.content}</p>}
                                {s.items && s.items.length > 0 && (
                                    <ul className="space-y-1.5">
                                        {s.items.map((item, ii) => (
                                            <li key={ii} className="text-[10.5px] text-neutral-700 flex gap-2 leading-[1.5]">
                                                <span className="mt-[6px] w-[3px] h-[3px] rounded-full bg-neutral-400 shrink-0" />
                                                <span className="text-justify">{item.text}</span>
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
