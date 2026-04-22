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

                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, margin: 0, color: '#fff', letterSpacing: '-0.5px' }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', margin: '8px 0 12px' }}>
                            {personalInfo?.professionalTitle || 'Sales & Business Development Leader'}
                        </p>
                        {/* Contact row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                            {personalInfo?.email && <span>{personalInfo.email}</span>}
                            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                            {(personalInfo?.city || personalInfo?.country) && (
                                <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                            )}
                            {personalInfo?.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
                        </div>
                    </div>

                {/* KPI strip — Simplified for ATS */}
                {achievements && achievements.length > 0 && (
                    <div style={{
                        marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex', gap: 12, position: 'relative', zIndex: 1, flexWrap: 'wrap',
                    }}>
                        {achievements.slice(0, 4).map((ach, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: 12, padding: '12px 20px',
                                minWidth: 140, border: '1px solid rgba(255,255,255,0.2)',
                            }}>
                                <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                                    {ach.achievementTitle?.match(/(\d[\d,.%$M+KBx]*)/i)?.[1] ?? '★'}
                                </div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
                                    {ach.achievementTitle?.replace(/\d[\d,.%$M+KBx]*/i, '').trim().slice(0, 30) || ach.achievementTitle?.slice(0, 30)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </header>

            {/* ─────────────────────────────────────────
                BODY — Single Column Stack
            ───────────────────────────────────────── */}
            <main style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 36 }}>

                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section aria-label="Professional Summary">
                        <SectionHeading label="Value Proposition" c={c} />
                        <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Integrated Skills - Full Width Cloud */}
                {skills && skills.length > 0 && (
                    <section aria-label="Skills">
                        <SectionHeading label="Core Performance Capabilities" c={c} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {skills.map((skill: any, i: number) => (
                                <span key={i} style={{
                                    background: '#f8fafc', color: c.primary,
                                    border: `1px solid ${c.border}`,
                                    borderRadius: 10, padding: '6px 14px',
                                    fontSize: 11, fontWeight: 700,
                                    textTransform: 'uppercase', letterSpacing: '0.05em'
                                }}>
                                    {skill.skillName}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section aria-label="Work Experience">
                        <SectionHeading label="Professional Trajectory" c={c} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                            {workExperience.map((job: any, i: number) => (
                                <div key={i} style={{ borderLeft: `4px solid ${c.primary}20`, paddingLeft: 24, position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: -7, top: 4, width: 10, height: 10, borderRadius: '50%', background: c.primary }} />
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0, color: c.primary, letterSpacing: '-0.2px' }}>{job.jobTitle}</h3>
                                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: c.accent }}>{job.companyName}</span>
                                                {job.location && <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{job.location}</span>}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 11, fontWeight: 900, color: '#fff', background: '#0f172a', padding: '6px 16px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && (
                                        <p style={{ fontSize: 13, color: '#475569', margin: '12px 0 16px', lineHeight: 1.7, fontWeight: 500, fontStyle: 'italic' }}>{job.roleDescription}</p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            {job.achievements.map((ach: any, j: number) => (
                                                <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 13, color: '#334155', lineHeight: 1.6, background: '#f8fafc', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                                    <span style={{ color: c.accent, fontWeight: 900, flexShrink: 0 }}>▸</span>
                                                    <span style={{ fontWeight: 600 }}>{ach.achievementText}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Integrated Row for Education & Certifications */}
                {/* Stack for Education & Certifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 20, borderTop: `8px solid #f8fafc` }}>
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section aria-label="Education">
                            <SectionHeading label="Foundational Education" c={c} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {education.map((edu: any, i: number) => (
                                    <div key={i} style={{ borderLeft: `2px solid ${c.border}`, paddingLeft: 16 }}>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: c.primary }}>{edu.degree}</div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: c.accent, marginTop: 2 }}>{edu.institutionName}</div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            Class of {edu.endYear}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section aria-label="Certifications">
                            <SectionHeading label="Professional Credentials" c={c} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {certifications.map((cert: any, i: number) => (
                                    <div key={i} style={{ 
                                        padding: '12px 20px', background: '#fff', border: `1px solid ${c.border}`, 
                                        borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 4
                                    }}>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: c.primary, lineHeight: 1.3 }}>{cert.certificationName}</div>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{cert.issuingOrganization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Key Initiatives & Recognition Column */}
                {/* Key Initiatives & Recognition Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section aria-label="Projects">
                            <SectionHeading label="Strategic Deal Portfolio" c={c} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {projects.map((proj: any, i: number) => (
                                    <div key={i} style={{
                                        background: '#0f172a', borderRadius: 20,
                                        padding: '24px', color: '#fff'
                                    }}>
                                        <h4 style={{ fontSize: 16, fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>{proj.projectName}</h4>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: c.accent, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{proj.clientOrOrganization}</div>
                                        {proj.description && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>{proj.description}</p>}
                                        {proj.outcomes && (
                                            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <span style={{ fontSize: 10, color: c.accent }}>IMPACT:</span> {proj.outcomes}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Recognition */}
                    {achievements && achievements.length > 0 && (
                        <section aria-label="Achievements">
                            <SectionHeading label="Executive Recognition" c={c} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {achievements.map((ach: any, i: number) => (
                                    <div key={i} style={{
                                        padding: '16px', background: '#f8fafc', border: `1px solid ${c.border}`,
                                        borderRadius: 20,
                                    }}>
                                        <div style={{ fontSize: 13, fontWeight: 900, color: c.primary, lineHeight: 1.3 }}>{ach.achievementTitle}</div>
                                        {ach.issuingBody && (
                                            <div style={{ fontSize: 11, fontWeight: 700, color: c.accent, marginTop: 4, textTransform: 'uppercase' }}>{ach.issuingBody}</div>
                                        )}
                                        {ach.description && <p style={{ fontSize: 11, color: '#64748b', margin: '8px 0 0', lineHeight: 1.6, fontWeight: 500 }}>{ach.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Final Row for Associations & Languages */}
                {/* Associations & Languages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    {/* Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section aria-label="Professional Affiliations">
                            <SectionHeading label="Leadership Affiliations" c={c} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {professionalAffiliations.map((aff: any, i: number) => (
                                    <div key={i} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: c.primary }}>{aff.organizationName}</div>
                                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 2 }}>{aff.roleOrMembership}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section aria-label="Languages">
                            <SectionHeading label="Linguistic Range" c={c} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {languages.map((lang: any, i: number) => (
                                    <div key={i} style={{ 
                                        padding: '8px 16px', background: '#fff', border: `1px solid ${c.border}`, 
                                        borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12
                                    }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: '#334155' }}>{lang.languageName}</span>
                                        <span style={{ fontSize: 10, fontWeight: 900, color: c.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

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
