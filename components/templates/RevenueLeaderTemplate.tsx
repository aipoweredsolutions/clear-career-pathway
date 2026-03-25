'use client'

import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

// Minimal color map from accentColor prop strings
const COLOR_MAP: Record<string, { primary: string; accent: string; accentLight: string; border: string }> = {
    'text-blue-900':    { primary: '#1e3a8a', accent: '#2563eb', accentLight: '#eff6ff', border: '#bfdbfe' },
    'text-emerald-800': { primary: '#065f46', accent: '#059669', accentLight: '#ecfdf5', border: '#6ee7b7' },
    'text-slate-800':   { primary: '#1e293b', accent: '#475569', accentLight: '#f8fafc', border: '#cbd5e1' },
    'text-violet-800':  { primary: '#4c1d95', accent: '#7c3aed', accentLight: '#f5f3ff', border: '#ddd6fe' },
    'text-orange-700':  { primary: '#9a3412', accent: '#ea580c', accentLight: '#fff7ed', border: '#fed7aa' },
}

const defaultColors = COLOR_MAP['text-blue-900']

export function RevenueLeaderTemplate({ data, className, accentColor = 'text-blue-900' }: TemplateProps) {
    const c = COLOR_MAP[accentColor] ?? defaultColors

    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        languages,
        achievements,
        projects,
        volunteerExperience,
        professionalAffiliations,
        publications,
        additionalInfo,
    } = data

    const initials = personalInfo?.fullName
        ? personalInfo.fullName.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase()
        : 'RL'

    return (
        <div
            className={cn('w-full bg-white text-slate-900 font-sans leading-normal', className)}
            style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", fontSize: '12px' }}
        >
            {/* ─────────────────────────────────────────
                HEADER — Name, Title, Contact
            ───────────────────────────────────────── */}
            <header
                style={{
                    background: `linear-gradient(135deg, #0f172a 0%, ${c.primary} 100%)`,
                    color: '#fff',
                    padding: '32px 36px 28px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle diagonal grid */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.04,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
                    backgroundSize: '20px 20px',
                    pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', position: 'relative', zIndex: 1 }}>
                    {/* Avatar circle */}
                    <div style={{
                        width: 64, height: 64, borderRadius: 14,
                        backgroundColor: `${c.accent}40`,
                        border: `2px solid ${c.accent}80`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: 22, fontWeight: 900, color: '#fff',
                    }}>
                        {initials}
                    </div>

                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1, margin: 0, color: '#fff', letterSpacing: '-0.5px' }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '6px 0 10px' }}>
                            {personalInfo?.professionalTitle || 'Sales & Business Development Leader'}
                        </p>
                        {/* Contact row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: 10, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
                            {personalInfo?.email && <span>{personalInfo.email}</span>}
                            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                            {(personalInfo?.city || personalInfo?.country) && (
                                <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                            )}
                            {personalInfo?.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
                            {personalInfo?.websiteUrl && <span>{personalInfo.websiteUrl}</span>}
                        </div>
                    </div>
                </div>

                {/* KPI strip — auto-populated from achievements if available */}
                {achievements && achievements.length > 0 && (
                    <div style={{
                        marginTop: 20, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', gap: 12, position: 'relative', zIndex: 1, flexWrap: 'wrap',
                    }}>
                        {achievements.slice(0, 4).map((ach, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.07)',
                                borderRadius: 10, padding: '10px 18px',
                                textAlign: 'center', minWidth: 100, border: '1px solid rgba(255,255,255,0.12)',
                            }}>
                                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                                    {ach.achievementTitle?.match(/(\d[\d,.%$M+KBx]*)/i)?.[1] ?? '★'}
                                </div>
                                <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
                                    {ach.achievementTitle?.replace(/\d[\d,.%$M+KBx]*/i, '').trim().slice(0, 22) || ach.achievementTitle?.slice(0, 22)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </header>

            {/* ─────────────────────────────────────────
                BODY — 2-column below
            ───────────────────────────────────────── */}
            <div style={{ display: 'flex', flex: 1 }}>

                {/* ── Main Content ── */}
                <main style={{ flex: 1, padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>

                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section aria-label="Professional Summary">
                            <SectionHeading label="Value Proposition" c={c} />
                            <p style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.7, margin: 0 }}>
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section aria-label="Work Experience">
                            <SectionHeading label="Professional Experience" c={c} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                {workExperience.map((job: any, i: number) => (
                                    <div key={i} style={{ borderLeft: `2px solid ${c.border}`, paddingLeft: 14 }}>
                                        {/* Title + Date */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                                            <h3 style={{ fontSize: 13, fontWeight: 800, margin: 0, color: c.primary }}>{job.jobTitle}</h3>
                                            <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', flexShrink: 0 }}>
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        {/* Company + Location */}
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '2px 0 6px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: c.accent }}>{job.companyName}</span>
                                            {job.location && <span style={{ fontSize: 10, color: '#94a3b8' }}>{job.location}</span>}
                                        </div>
                                        {job.roleDescription && (
                                            <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 6px', lineHeight: 1.6 }}>{job.roleDescription}</p>
                                        )}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                                {job.achievements.map((ach: any, j: number) => (
                                                    <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11, color: '#334155', lineHeight: 1.55 }}>
                                                        <span style={{ color: c.accent, fontWeight: 900, marginTop: 1, flexShrink: 0 }}>▸</span>
                                                        {ach.achievementText}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects / Key Deals */}
                    {projects && projects.length > 0 && (
                        <section aria-label="Projects">
                            <SectionHeading label="Key Deals &amp; Initiatives" c={c} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {projects.map((proj: any, i: number) => (
                                    <div key={i} style={{
                                        background: c.accentLight, borderRadius: 10,
                                        border: `1px solid ${c.border}`,
                                        padding: '12px 14px',
                                    }}>
                                        <h4 style={{ fontSize: 12, fontWeight: 800, margin: '0 0 3px', color: c.primary }}>{proj.projectName}</h4>
                                        {proj.clientOrOrganization && (
                                            <div style={{ fontSize: 10, fontWeight: 700, color: c.accent, marginBottom: 4 }}>{proj.clientOrOrganization}</div>
                                        )}
                                        {proj.description && <p style={{ fontSize: 10, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{proj.description}</p>}
                                        {proj.outcomes && (
                                            <div style={{ fontSize: 10, fontWeight: 700, color: c.accent, marginTop: 6, paddingTop: 6, borderTop: `1px solid ${c.border}` }}>
                                                {proj.outcomes}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Publications */}
                    {publications && publications.length > 0 && (
                        <section aria-label="Publications">
                            <SectionHeading label="Publications &amp; Thought Leadership" c={c} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {publications.map((pub: any, i: number) => (
                                    <div key={i} style={{ fontSize: 11, color: '#334155', lineHeight: 1.55 }}>
                                        <span style={{ fontWeight: 700, color: c.primary }}>&ldquo;{pub.title}&rdquo;</span>
                                        {pub.platformOrPublisher && <span style={{ color: '#64748b' }}> — {pub.platformOrPublisher}</span>}
                                        {pub.publicationYear && <span style={{ color: '#94a3b8' }}> ({pub.publicationYear})</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Volunteer */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section aria-label="Volunteer Experience">
                            <SectionHeading label="Community Leadership" c={c} />
                            {volunteerExperience.map((vol: any, i: number) => (
                                <div key={i} style={{ marginBottom: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <h4 style={{ fontSize: 12, fontWeight: 700, margin: 0, color: c.primary }}>{vol.roleTitle}</h4>
                                        <span style={{ fontSize: 10, color: '#94a3b8' }}>{vol.startDate} — {vol.endDate || 'Present'}</span>
                                    </div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: c.accent, margin: '2px 0 4px' }}>{vol.organizationName}</div>
                                    {vol.contributions && <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.55 }}>{vol.contributions}</p>}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Additional Info */}
                    {additionalInfo?.otherInfo && (
                        <section aria-label="Additional Information">
                            <SectionHeading label="Additional Information" c={c} />
                            <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.65, margin: 0 }}>{additionalInfo.otherInfo}</p>
                        </section>
                    )}
                </main>

                {/* ── Sidebar ── */}
                <aside style={{
                    width: 220,
                    flexShrink: 0,
                    background: '#f8fafc',
                    borderLeft: '1px solid #e2e8f0',
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 22,
                }}>

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section aria-label="Skills">
                            <SidebarHeading label="Core Competencies" c={c} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                {skills.map((skill: any, i: number) => (
                                    <span key={i} style={{
                                        background: c.accentLight, color: c.primary,
                                        border: `1px solid ${c.border}`,
                                        borderRadius: 6, padding: '3px 8px',
                                        fontSize: 9.5, fontWeight: 700,
                                    }}>
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section aria-label="Education">
                            <SidebarHeading label="Education" c={c} />
                            {education.map((edu: any, i: number) => (
                                <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: c.primary, lineHeight: 1.3 }}>{edu.institutionName}</div>
                                    <div style={{ fontSize: 10.5, color: '#475569', marginTop: 1, lineHeight: 1.4 }}>
                                        {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                                    </div>
                                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>
                                        {edu.startYear ? `${edu.startYear} – ` : ''}{edu.endYear || 'Present'}
                                    </div>
                                    {edu.gpa && <div style={{ fontSize: 10, fontWeight: 700, color: c.accent, marginTop: 2 }}>GPA: {edu.gpa}</div>}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section aria-label="Certifications">
                            <SidebarHeading label="Certifications" c={c} />
                            {certifications.map((cert: any, i: number) => (
                                <div key={i} style={{ marginBottom: 10, display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.accent, marginTop: 4, flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: c.primary, lineHeight: 1.3 }}>{cert.certificationName}</div>
                                        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>
                                            {cert.issuingOrganization}{cert.issueYear ? ` · ${cert.issueYear}` : ''}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Achievements / Recognition */}
                    {achievements && achievements.length > 0 && (
                        <section aria-label="Achievements">
                            <SidebarHeading label="Recognition" c={c} />
                            {achievements.map((ach: any, i: number) => (
                                <div key={i} style={{
                                    background: c.accentLight, border: `1px solid ${c.border}`,
                                    borderRadius: 8, padding: '8px 10px', marginBottom: 8,
                                }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: c.primary, lineHeight: 1.3 }}>{ach.achievementTitle}</div>
                                    {ach.issuingBody && (
                                        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>
                                            {ach.issuingBody}{ach.year ? ` · ${ach.year}` : ''}
                                        </div>
                                    )}
                                    {ach.description && <p style={{ fontSize: 10, color: '#64748b', margin: '4px 0 0', lineHeight: 1.5 }}>{ach.description}</p>}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section aria-label="Languages">
                            <SidebarHeading label="Languages" c={c} />
                            {languages.map((lang: any, i: number) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{lang.languageName}</span>
                                    <span style={{
                                        background: c.accentLight, color: c.accent,
                                        border: `1px solid ${c.border}`,
                                        borderRadius: 4, padding: '2px 6px',
                                        fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
                                    }}>
                                        {lang.proficiencyLevel}
                                    </span>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Professional Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section aria-label="Professional Affiliations">
                            <SidebarHeading label="Affiliations" c={c} />
                            {professionalAffiliations.map((aff: any, i: number) => (
                                <div key={i} style={{ marginBottom: 8 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: c.primary, lineHeight: 1.3 }}>{aff.organizationName}</div>
                                    {aff.roleOrMembership && <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>{aff.roleOrMembership}</div>}
                                </div>
                            ))}
                        </section>
                    )}
                </aside>
            </div>

            {/* Footer accent bar */}
            <div style={{ height: 5, background: `linear-gradient(90deg, ${c.primary}, ${c.accent})` }} />
        </div>
    )
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionHeading({ label, c }: { label: string; c: typeof defaultColors }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <h2 style={{
                fontSize: 10, fontWeight: 900, textTransform: 'uppercase',
                letterSpacing: '0.2em', color: c.primary, margin: 0, whiteSpace: 'nowrap',
            }}>
                {label}
            </h2>
            <div style={{ flex: 1, height: 1.5, background: c.border, borderRadius: 2 }} />
        </div>
    )
}

function SidebarHeading({ label, c }: { label: string; c: typeof defaultColors }) {
    return (
        <div style={{ marginBottom: 10, paddingBottom: 6, borderBottom: `2px solid ${c.primary}20` }}>
            <h2 style={{
                fontSize: 9.5, fontWeight: 900, textTransform: 'uppercase',
                letterSpacing: '0.18em', color: c.primary, margin: 0,
            }}>
                {label}
            </h2>
        </div>
    )
}
