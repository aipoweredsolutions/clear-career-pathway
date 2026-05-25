import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    accentColor?: string  // e.g. 'slate' | 'forest' | 'burgundy' | 'gold'
}

const THEMES: Record<string, { sidebar: string; accent: string; pill: string; dot: string }> = {
    slate:    { sidebar: 'bg-slate-900',   accent: 'text-slate-200',  pill: 'bg-slate-700',   dot: 'bg-slate-300' },
    forest:   { sidebar: 'bg-emerald-950', accent: 'text-emerald-300',pill: 'bg-emerald-800', dot: 'bg-emerald-400' },
    burgundy: { sidebar: 'bg-rose-950',    accent: 'text-rose-300',   pill: 'bg-rose-900',    dot: 'bg-rose-400' },
    gold:     { sidebar: 'bg-amber-950',   accent: 'text-amber-300',  pill: 'bg-amber-800',   dot: 'bg-amber-400' },
    navy:     { sidebar: 'bg-blue-950',    accent: 'text-blue-300',   pill: 'bg-blue-900',    dot: 'bg-blue-400' },
    black:    { sidebar: 'bg-neutral-950', accent: 'text-neutral-300',pill: 'bg-neutral-800', dot: 'bg-neutral-400' },
    charcoal: { sidebar: 'bg-neutral-800', accent: 'text-neutral-200',pill: 'bg-neutral-700', dot: 'bg-neutral-300' },
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
        <div className="mb-5">
            <div className={cn('text-[9px] font-black uppercase tracking-[0.25em] mb-3 pb-1.5 border-b border-white/20', theme.accent)}>
                {title}
            </div>
            {children}
        </div>
    )

    const MainSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-5">
            <div className="flex items-center gap-3 mb-3">
                <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500 whitespace-nowrap">{title}</h2>
                <div className="flex-1 h-px bg-neutral-200" />
            </div>
            {children}
        </div>
    )

    return (
        <div className="w-full h-full bg-white flex min-h-[1123px] overflow-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {/* ═══ LEFT SIDEBAR ═══ */}
            <div className={cn('w-[30%] shrink-0 pl-6 pr-5 pt-8 pb-8 flex flex-col', theme.sidebar)}>
                {/* Name & Title */}
                <div className="mb-6 pb-4 border-b border-white/20">
                    <h1 className="text-[20px] font-bold text-white leading-tight mb-1 break-words whitespace-nowrap truncate">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <p className={cn('text-[11px] font-medium italic leading-snug', theme.accent)}>
                            {personalInfo.professionalTitle}
                        </p>
                    )}
                </div>

                {/* Contact */}
                <SidebarSection title="Contact">
                    <div className="space-y-2">
                        {personalInfo?.email && (
                            <div className="text-[10px] text-white/80 break-all leading-snug truncate">{personalInfo.email}</div>
                        )}
                        {personalInfo?.phone && (
                            <div className="text-[10px] text-white/80">{personalInfo.phone}</div>
                        )}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <div className="text-[10px] text-white/80">
                                {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                            </div>
                        )}
                        {personalInfo?.linkedinUrl && (
                            <div className="text-[10px] text-white/70 break-all leading-snug">{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>
                        )}
                        {personalInfo?.websiteUrl && (
                            <div className="text-[10px] text-white/70 break-all leading-snug">{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>
                        )}
                    </div>
                </SidebarSection>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <SidebarSection title="Skills">
                        <div className="space-y-1.5">
                            {skills.map((s, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', theme.dot)} />
                                    <span className="text-[10px] text-white/85 leading-snug break-words">{s.skillName}</span>
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <SidebarSection title="Languages">
                        <div className="space-y-2">
                            {languages.map((l, i) => (
                                <div key={i}>
                                    <div className="text-[10px] font-bold text-white">{l.languageName}</div>
                                    <div className={cn('text-[9px] capitalize', theme.accent)}>{l.proficiencyLevel}</div>
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <SidebarSection title="Certifications">
                        <div className="space-y-3">
                            {certifications.map((c, i) => (
                                <div key={i} className="">
                                    <div className="text-[10px] font-bold text-white leading-snug break-words">{c.certificationName}</div>
                                    {c.issuingOrganization && (
                                        <div className="text-[9px] text-white/60">{c.issuingOrganization}{c.issueYear ? ` · ${c.issueYear}` : ''}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <SidebarSection title="Awards">
                        <div className="space-y-3">
                            {achievements.map((a, i) => (
                                <div key={i}>
                                    <div className="text-[10px] font-bold text-white leading-snug">{a.achievementTitle}</div>
                                    {a.issuingBody && (
                                        <div className="text-[9px] text-white/60">{a.issuingBody}{a.year ? ` · ${a.year}` : ''}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}
            </div>

            {/* ═══ RIGHT MAIN COLUMN ═══ */}
            <div className="flex-1 min-w-0 pl-8 pr-10 pt-8 pb-8" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <MainSection title="Profile">
                        <p className="text-[11px] text-neutral-600 leading-relaxed">
                            {professionalSummary.summaryText}
                        </p>
                    </MainSection>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <MainSection title="Experience">
                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={i} className="">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[13px] font-bold text-neutral-900 leading-tight">{job.jobTitle}</h3>
                                        <span className="text-[9px] text-neutral-400 font-medium shrink-0 ml-2">
                                            {formatDate(job.startDate)} — {job.isCurrent ? 'Present' : formatDate(job.endDate)}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-neutral-500 italic mb-2">
                                        {job.companyName}{job.location ? ` · ${job.location}` : ''}
                                    </div>
                                    {job.roleDescription && (
                                        <p className="text-[10px] text-neutral-600 mb-2 leading-relaxed italic">{job.roleDescription}</p>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[10px] text-neutral-700 leading-relaxed flex gap-2.5">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
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
                                <div key={i} className="">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{p.projectName}</h3>
                                        {p.role && <span className="text-[9px] text-neutral-400 italic">{p.role}</span>}
                                    </div>
                                    {p.description && (
                                        <p className="text-[10px] text-neutral-600 leading-relaxed">{p.description}</p>
                                    )}
                                    {p.toolsUsed && p.toolsUsed.length > 0 && (
                                        <div className="text-[9px] text-neutral-400 mt-1">{p.toolsUsed.join(' · ')}</div>
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
                                <div key={i} className=" flex justify-between items-start">
                                    <div>
                                        <div className="text-[12px] font-bold text-neutral-900 leading-tight">
                                            {edu.degree}{edu.major || edu.fieldOfStudy ? ` in ${edu.major || edu.fieldOfStudy}` : ''}
                                        </div>
                                        <div className="text-[10px] text-neutral-500 italic">{edu.institutionName}</div>
                                        {edu.gpa && <div className="text-[9px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</div>}
                                    </div>
                                    <div className="text-[9px] text-neutral-400 shrink-0 ml-2 mt-0.5">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </MainSection>
                )}

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <MainSection key={i} title={s.title}>
                        {s.content && <p className="text-[10px] text-neutral-600 leading-relaxed mb-2">{s.content}</p>}
                        {s.items && s.items.length > 0 && (
                            <ul className="space-y-1">
                                {s.items.map((item, j) => (
                                    <li key={j} className="text-[10px] text-neutral-700 leading-relaxed flex gap-2.5">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
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
