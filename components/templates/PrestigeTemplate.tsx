import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    accentColor?: string
}

const THEMES: Record<string, { line: string; headerText: string; sectionLabel: string; bullet: string }> = {
    gold:      { line: '#C9A84C',  headerText: '#1a1a1a', sectionLabel: '#8B6914', bullet: '#C9A84C' },
    teal:      { line: '#0F766E',  headerText: '#0f2027', sectionLabel: '#0F766E', bullet: '#0F766E' },
    charcoal:  { line: '#374151',  headerText: '#111827', sectionLabel: '#374151', bullet: '#374151' },
    rose:      { line: '#9F1239',  headerText: '#1a0a0e', sectionLabel: '#9F1239', bullet: '#9F1239' },
    navy:      { line: '#1e3a8a',  headerText: '#0f172a', sectionLabel: '#1e3a8a', bullet: '#1e3a8a' },
}

export function PrestigeTemplate({ data, accentColor = 'gold' }: TemplateProps) {
    const theme = THEMES[accentColor] || THEMES.gold
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
        volunteerExperience,
        customSections,
    } = data

    const formatDate = (d?: string) => {
        if (!d || d === 'Present') return 'Present'
        const [yr, mo] = d.split('-')
        if (!mo) return yr
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        return `${months[parseInt(mo, 10) - 1]} ${yr}`
    }

    const LeftLabel = ({ children }: { children: React.ReactNode }) => (
        <div
            className="text-[9px] font-black uppercase tracking-[0.22em] mb-3 pb-1.5"
            style={{ color: theme.sectionLabel, borderBottom: `1px solid ${theme.line}` }}
        >
            {children}
        </div>
    )

    const RightSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-6">
            <div
                className="text-[9px] font-black uppercase tracking-[0.22em] mb-3 pb-1.5"
                style={{ color: theme.sectionLabel, borderBottom: `1.5px solid ${theme.line}` }}
            >
                {title}
            </div>
            {children}
        </div>
    )

    const technicalSkills = skills?.filter(s => s.skillType === 'technical') || []
    const professionalSkills = skills?.filter(s => s.skillType !== 'technical') || []
    const allSkills = skills || []

    return (
        <div className="w-full bg-white min-h-full" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

            {/* ═══ FULL-WIDTH HEADER ═══ */}
            <div className="px-10 pt-9 pb-5">
                {/* Name row + Contact row */}
                <div className="flex justify-between items-start">
                    {/* Name */}
                    <h1
                        className="text-[36px] font-bold leading-none tracking-tight"
                        style={{ color: theme.headerText }}
                    >
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>

                    {/* Contact block — right-aligned */}
                    <div className="text-right space-y-0.5 mt-1">
                        {personalInfo?.phone && (
                            <div className="text-[10px] text-neutral-500">{personalInfo.phone}</div>
                        )}
                        {personalInfo?.email && (
                            <div className="text-[10px] text-neutral-500">{personalInfo.email}</div>
                        )}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <div className="text-[10px] text-neutral-500">
                                {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                            </div>
                        )}
                        {personalInfo?.linkedinUrl && (
                            <div className="text-[10px] text-neutral-500">
                                {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </div>
                        )}
                    </div>
                </div>

                {/* Professional Title — italic, below name */}
                {personalInfo?.professionalTitle && (
                    <p
                        className="text-[12px] italic mt-1.5"
                        style={{ color: theme.sectionLabel }}
                    >
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Divider */}
                <div className="mt-4" style={{ borderTop: `2px solid ${theme.line}` }} />
            </div>

            {/* ═══ TWO-COLUMN BODY ═══ */}
            <div className="flex px-10 pb-9 gap-8">

                {/* LEFT COLUMN — 38% */}
                <div className="w-[38%] shrink-0 space-y-6">

                    {/* Summary (left side for this template) */}
                    {professionalSummary?.summaryText && (
                        <div>
                            <LeftLabel>Professional Overview</LeftLabel>
                            <p className="text-[10px] text-neutral-600 leading-relaxed">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    )}

                    {/* Skills */}
                    {allSkills.length > 0 && (
                        <div>
                            <LeftLabel>Skills</LeftLabel>
                            {technicalSkills.length > 0 && professionalSkills.length > 0 ? (
                                <div className="space-y-3">
                                    {technicalSkills.length > 0 && (
                                        <div>
                                            <div className="text-[8px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Technical</div>
                                            <div className="flex flex-wrap gap-1">
                                                {technicalSkills.map((s, i) => (
                                                    <span key={i} className="text-[9px] text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-sm">
                                                        {s.skillName}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {professionalSkills.length > 0 && (
                                        <div>
                                            <div className="text-[8px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Professional</div>
                                            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                                                {professionalSkills.map((s, i) => (
                                                    <div key={i} className="flex items-center gap-1.5">
                                                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: theme.bullet }} />
                                                        <span className="text-[9px] text-neutral-700 leading-tight">{s.skillName}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* All skills in a simple 2-column grid */
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                                    {allSkills.map((s, i) => (
                                        <div key={i} className="flex items-center gap-1.5">
                                            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: theme.bullet }} />
                                            <span className="text-[9px] text-neutral-700 leading-tight">{s.skillName}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <div>
                            <LeftLabel>Languages</LeftLabel>
                            <div className="space-y-1.5">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-[10px] font-semibold text-neutral-800">{l.languageName}</span>
                                        <span className="text-[9px] italic text-neutral-400 capitalize">{l.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <div>
                            <LeftLabel>Certifications</LeftLabel>
                            <div className="space-y-2.5">
                                {certifications.map((c, i) => (
                                    <div key={i} className="break-inside-avoid">
                                        <div className="text-[10px] font-semibold text-neutral-800 leading-snug">{c.certificationName}</div>
                                        <div className="text-[9px] italic text-neutral-400">
                                            {c.issuingOrganization}{c.issueYear ? ` · ${c.issueYear}` : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Awards / Achievements */}
                    {achievements && achievements.length > 0 && (
                        <div>
                            <LeftLabel>Recognition</LeftLabel>
                            <div className="space-y-2.5">
                                {achievements.map((a, i) => (
                                    <div key={i}>
                                        <div className="text-[10px] font-semibold text-neutral-800 leading-snug">{a.achievementTitle}</div>
                                        <div className="text-[9px] italic text-neutral-400">
                                            {a.issuingBody}{a.year ? ` · ${a.year}` : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Volunteer */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <div>
                            <LeftLabel>Volunteering</LeftLabel>
                            <div className="space-y-3">
                                {volunteerExperience.map((v, i) => (
                                    <div key={i} className="break-inside-avoid">
                                        <div className="text-[10px] font-bold text-neutral-800">{v.roleTitle}</div>
                                        <div className="text-[9px] italic text-neutral-400">{v.organizationName}</div>
                                        {v.contributions && (
                                            <p className="text-[9px] text-neutral-600 leading-relaxed mt-0.5">{v.contributions}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN — 62% */}
                <div className="flex-1">

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <RightSection title="Work Experience">
                            <div className="space-y-5">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-[12px] font-bold text-neutral-900">{job.jobTitle}</h3>
                                            <span className="text-[9px] text-neutral-400 shrink-0 ml-2">
                                                {formatDate(job.startDate)} — {job.isCurrent ? 'Present' : formatDate(job.endDate)}
                                            </span>
                                        </div>
                                        <div className="text-[10px] italic text-neutral-500 mb-1.5">
                                            {job.companyName}{job.location ? `, ${job.location}` : ''}
                                        </div>
                                        {job.roleDescription && (
                                            <p className="text-[10px] text-neutral-600 leading-relaxed mb-1.5 italic">{job.roleDescription}</p>
                                        )}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-1">
                                                {job.achievements.map((a, j) => (
                                                    <li key={j} className="flex gap-2 text-[10px] text-neutral-700 leading-relaxed">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: theme.bullet }} />
                                                        <span>{a.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </RightSection>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <RightSection title="Projects">
                            <div className="space-y-4">
                                {projects.map((p, i) => (
                                    <div key={i} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-[11px] font-bold text-neutral-900">{p.projectName}</h3>
                                            {p.role && <span className="text-[9px] italic text-neutral-400">{p.role}</span>}
                                        </div>
                                        {p.description && <p className="text-[10px] text-neutral-600 leading-relaxed">{p.description}</p>}
                                        {p.outcomes && <p className="text-[9px] text-neutral-400 italic">{p.outcomes}</p>}
                                        {p.toolsUsed && p.toolsUsed.length > 0 && (
                                            <div className="text-[9px] text-neutral-400 mt-0.5">{p.toolsUsed.join(' · ')}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </RightSection>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <RightSection title="Education">
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i} className="break-inside-avoid flex justify-between items-start">
                                        <div>
                                            <div className="text-[11px] font-bold text-neutral-900 leading-snug">
                                                {edu.degree}{edu.major || edu.fieldOfStudy ? ` in ${edu.major || edu.fieldOfStudy}` : ''}
                                            </div>
                                            <div className="text-[10px] italic text-neutral-500">{edu.institutionName}</div>
                                            {edu.coursework && (
                                                <div className="text-[9px] text-neutral-400 mt-0.5 leading-snug">Courses: {edu.coursework}</div>
                                            )}
                                            {edu.gpa && <div className="text-[9px] text-neutral-400 mt-0.5">GPA: {edu.gpa}</div>}
                                        </div>
                                        <div className="text-[9px] text-neutral-400 shrink-0 ml-2 mt-0.5">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </RightSection>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((s, i) => (
                        <RightSection key={i} title={s.title} className="break-inside-avoid">
                            {s.content && <p className="text-[10px] text-neutral-600 leading-relaxed mb-2">{s.content}</p>}
                            {s.items && s.items.length > 0 && (
                                <ul className="space-y-1">
                                    {s.items.map((item, j) => (
                                        <li key={j} className="flex gap-2 text-[10px] text-neutral-700 leading-relaxed">
                                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: theme.bullet }} />
                                            <span>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </RightSection>
                    ))}
                </div>
            </div>
        </div>
    )
}
