import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    accentColor?: string  // e.g. 'slate' | 'forest' | 'burgundy' | 'gold'
}

const THEMES: Record<string, { sidebar: string; accent: string; pill: string; dot: string }> = {
    slate:    { sidebar: 'bg-slate-700',   accent: 'text-slate-100',  pill: 'bg-slate-600',   dot: 'bg-slate-300' },
    forest:   { sidebar: 'bg-emerald-800', accent: 'text-emerald-100',pill: 'bg-emerald-700', dot: 'bg-emerald-300' },
    burgundy: { sidebar: 'bg-rose-800',    accent: 'text-rose-100',   pill: 'bg-rose-700',    dot: 'bg-rose-300' },
    gold:     { sidebar: 'bg-amber-800',   accent: 'text-amber-100',  pill: 'bg-amber-700',   dot: 'bg-amber-300' },
    navy:     { sidebar: 'bg-blue-800',    accent: 'text-blue-100',   pill: 'bg-blue-700',    dot: 'bg-blue-300' },
    black:    { sidebar: 'bg-neutral-800', accent: 'text-neutral-100',pill: 'bg-neutral-700', dot: 'bg-neutral-300' },
    charcoal: { sidebar: 'bg-neutral-700', accent: 'text-neutral-100',pill: 'bg-neutral-600', dot: 'bg-neutral-300' },
}

export function ElegantSplitTemplate({ data, accentColor = 'slate' }: TemplateProps) {
    const theme = THEMES[accentColor] || THEMES.slate
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        languages,
        projects,
        achievements,
        customSections,
    } = data

    const formatDate = (d?: string) => {
        if (!d || d === 'Present') return 'Present'
        const [yr, mo] = d.split('-')
        if (!mo) return yr
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        return `${months[parseInt(mo, 10) - 1]} ${yr}`
    }

    const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-6">
            <div className={cn('text-[10px] font-bold uppercase tracking-[0.2em] mb-3 pb-2 border-b border-white/30', theme.accent)}>
                {title}
            </div>
            {children}
        </div>
    )

    const MainSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 whitespace-nowrap">{title}</h2>
                <div className="flex-1 h-[1.5px] bg-neutral-300" />
            </div>
            {children}
        </div>
    )

    return (
        <div className="w-full h-full bg-white flex min-h-[1123px] overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {/* ═══ LEFT SIDEBAR ═══ */}
            <div className={cn('w-[32%] shrink-0 pl-8 pr-6 pt-10 pb-10 flex flex-col', theme.sidebar)}>
                {/* Name & Title */}
                <div className="mb-8 pb-5 border-b border-white/30">
                    <h1 className="text-[22px] font-bold text-white leading-tight mb-2">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <p className={cn('text-[11px] font-medium leading-snug', theme.accent)}>
                            {personalInfo.professionalTitle}
                        </p>
                    )}
                </div>

                {/* Contact */}
                <SidebarSection title="Contact">
                    <div className="space-y-3">
                        {personalInfo?.email && (
                            <div className="text-[10.5px] text-white/90 break-all leading-snug">{personalInfo.email}</div>
                        )}
                        {personalInfo?.phone && (
                            <div className="text-[10.5px] text-white/90">{personalInfo.phone}</div>
                        )}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <div className="text-[10.5px] text-white/90">
                                {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                            </div>
                        )}
                        {personalInfo?.linkedinUrl && (
                            <div className="text-[10px] text-white/75 break-all leading-snug">{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>
                        )}
                        {personalInfo?.websiteUrl && (
                            <div className="text-[10px] text-white/75 break-all leading-snug">{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>
                        )}
                    </div>
                </SidebarSection>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <SidebarSection title="Skills">
                        <div className="space-y-2">
                            {skills.map((s, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <div className={cn('w-2 h-2 rounded-full shrink-0', theme.dot)} />
                                    <span className="text-[10.5px] text-white/90 leading-snug">{s.skillName}</span>
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <SidebarSection title="Languages">
                        <div className="space-y-2.5">
                            {languages.map((l, i) => (
                                <div key={i}>
                                    <div className="text-[10.5px] font-bold text-white">{l.languageName}</div>
                                    <div className={cn('text-[9.5px] capitalize', theme.accent)}>{l.proficiencyLevel}</div>
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <SidebarSection title="Certifications">
                        <div className="space-y-3.5">
                            {certifications.map((c, i) => (
                                <div key={i}>
                                    <div className="text-[10.5px] font-bold text-white leading-snug">{c.certificationName}</div>
                                    {c.issuingOrganization && (
                                        <div className="text-[9.5px] text-white/70 mt-1">{c.issuingOrganization}{c.issueYear ? ` · ${c.issueYear}` : ''}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <SidebarSection title="Awards">
                        <div className="space-y-3.5">
                            {achievements.map((a, i) => (
                                <div key={i}>
                                    <div className="text-[10.5px] font-bold text-white leading-snug">{a.achievementTitle}</div>
                                    {a.issuingBody && (
                                        <div className="text-[9.5px] text-white/70 mt-1">{a.issuingBody}{a.year ? ` · ${a.year}` : ''}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}
            </div>

            {/* ═══ RIGHT MAIN COLUMN ═══ */}
            <div className="flex-1 min-w-0 pl-10 pr-12 pt-10 pb-10" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <MainSection title="Professional Summary">
                        <p className="text-[11px] text-neutral-700 leading-[1.6]">
                            {professionalSummary.summaryText}
                        </p>
                    </MainSection>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <MainSection title="Experience">
                        <div className="space-y-5">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[12px] font-bold text-neutral-900 leading-tight">{job.jobTitle}</h3>
                                        <span className="text-[10px] text-neutral-500 font-medium shrink-0 ml-2">
                                            {formatDate(job.startDate)} — {job.isCurrent ? 'Present' : formatDate(job.endDate)}
                                        </span>
                                    </div>
                                    <div className="text-[10.5px] text-neutral-600 mb-2.5">
                                        {job.companyName}{job.location ? ` · ${job.location}` : ''}
                                    </div>
                                    {job.roleDescription && (
                                        <p className="text-[10.5px] text-neutral-700 mb-2.5 leading-[1.6]">{job.roleDescription}</p>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-2">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[10.5px] text-neutral-700 leading-[1.6] flex gap-2.5">
                                                    <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                                                    <span>{a.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </MainSection>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <MainSection title="Projects">
                        <div className="space-y-4">
                            {projects.map((p, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[11.5px] font-bold text-neutral-900">{p.projectName}</h3>
                                        {p.role && <span className="text-[10px] text-neutral-500">{p.role}</span>}
                                    </div>
                                    {p.description && (
                                        <p className="text-[10.5px] text-neutral-700 leading-[1.6]">{p.description}</p>
                                    )}
                                    {p.toolsUsed && p.toolsUsed.length > 0 && (
                                        <div className="text-[9.5px] text-neutral-500 mt-1">{p.toolsUsed.join(' · ')}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </MainSection>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <MainSection title="Education">
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <div className="text-[11.5px] font-bold text-neutral-900 leading-tight">
                                            {edu.degree}{edu.major || edu.fieldOfStudy ? ` in ${edu.major || edu.fieldOfStudy}` : ''}
                                        </div>
                                        <div className="text-[10.5px] text-neutral-600 mt-1">{edu.institutionName}</div>
                                        {edu.gpa && <div className="text-[10px] text-neutral-500 mt-0.5">GPA: {edu.gpa}</div>}
                                    </div>
                                    <div className="text-[10px] text-neutral-500 shrink-0 ml-2 mt-0.5">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </MainSection>
                )}

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <MainSection key={i} title={s.title}>
                        {s.content && <p className="text-[10.5px] text-neutral-700 leading-[1.6] mb-2">{s.content}</p>}
                        {s.items && s.items.length > 0 && (
                            <ul className="space-y-2">
                                {s.items.map((item, j) => (
                                    <li key={j} className="text-[10.5px] text-neutral-700 leading-[1.6] flex gap-2.5">
                                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </MainSection>
                ))}
            </div>
        </div>
    )
}
