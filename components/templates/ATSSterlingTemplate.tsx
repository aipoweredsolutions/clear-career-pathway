import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSSterlingTemplate({ data, className, accentColor = 'text-blue-700' }: TemplateProps) {
    const accentBorder = accentColor.replace('text-', 'border-')

    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        projects,
        achievements,
        languages,
        customSections
    } = data

    // Group skills by type for "Core Competencies" sidebar
    const groupedSkills = skills?.reduce((acc, s) => {
        const type = s.skillType || 'professional'
        if (!acc[type]) acc[type] = []
        acc[type].push(s)
        return acc
    }, {} as Record<string, typeof skills>) || {}

    const formatSkillTypeLabel = (type: string) => {
        return type
            .replace(/_/g, ' ')
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' & ')
    }

    // Section header for the left column
    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-[16px] font-bold text-neutral-900 mb-4 tracking-tight leading-none">
            {children}
        </h2>
    )

    // Section header for the right sidebar
    const SidebarTitle = ({ children }: { children: React.ReactNode }) => (
        <h2 className={cn("text-[15px] font-bold mb-4 tracking-tight leading-none", accentColor)}>
            {children}
        </h2>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed",
            className
        )}>
            {/* ═══════════════════════════════════════════════ */}
            {/* HEADER — Large Name + Professional Title       */}
            {/* ═══════════════════════════════════════════════ */}
            <header className="mb-6">
                <h1 className="text-[36px] font-bold text-neutral-900 tracking-tight leading-[1.1] mb-1">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400 mb-4">
                        {personalInfo.professionalTitle}
                    </div>
                )}
                <div className="h-px bg-neutral-300 w-full" />
            </header>

            {/* ═══════════════════════════════════════════════ */}
            {/* TWO-COLUMN BODY                                */}
            {/* ═══════════════════════════════════════════════ */}
            <div className="flex gap-0">
                {/* ─── LEFT COLUMN (Main Content ~62%) ─── */}
                <div className="flex-[62] pr-8 border-r border-neutral-200">
                    <div className="space-y-6">

                        {/* Professional Summary */}
                        {professionalSummary?.summaryText && (
                            <section>
                                <SectionTitle>Professional Summary</SectionTitle>
                                <p className="text-[12px] leading-[1.7] text-neutral-600">
                                    {professionalSummary.summaryText}
                                </p>
                            </section>
                        )}

                        {/* Professional Experience */}
                        {workExperience && workExperience.length > 0 && (
                            <section>
                                <SectionTitle>Professional Experience</SectionTitle>
                                <div className="space-y-5">
                                    {workExperience.map((job, i) => (
                                        <div key={i}>
                                            {/* Job Title + Date row */}
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h3 className="text-[13px] font-bold text-neutral-900 leading-tight">
                                                    {job.jobTitle}
                                                </h3>
                                                <span className="text-[11px] text-neutral-500 whitespace-nowrap ml-4">
                                                    {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                                </span>
                                            </div>

                                            {/* Company + Location row */}
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className={cn("text-[12px] font-semibold", accentColor)}>
                                                    {job.companyName}
                                                </span>
                                                {job.location && (
                                                    <span className="text-[11px] text-neutral-400 ml-4">
                                                        {job.location}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Role Description */}
                                            {job.roleDescription && (
                                                <p className="text-[11.5px] text-neutral-500 italic mb-2 leading-relaxed">
                                                    {job.roleDescription}
                                                </p>
                                            )}

                                            {/* Achievements */}
                                            {job.achievements && job.achievements.length > 0 && (
                                                <ul className="space-y-1.5 ml-0">
                                                    {job.achievements.map((a, j) => (
                                                        <li key={j} className="text-[11.5px] text-neutral-600 leading-[1.6] flex gap-2">
                                                            <span className="text-neutral-900 mt-[7px] w-[3px] h-[3px] rounded-full bg-neutral-400 shrink-0" />
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
                                <SectionTitle>Key Projects</SectionTitle>
                                <div className="space-y-4">
                                    {projects.map((proj, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-[12px] font-bold text-neutral-900">{proj.projectName}</h3>
                                                {proj.role && <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{proj.role}</span>}
                                            </div>
                                            {proj.description && (
                                                <p className="text-[11.5px] text-neutral-600 leading-relaxed">{proj.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Custom Sections */}
                        {customSections && customSections.map((s, i) => (
                            <section key={i}>
                                <SectionTitle>{s.title}</SectionTitle>
                                {s.content && <p className="text-[11.5px] text-neutral-600 leading-relaxed mb-2">{s.content}</p>}
                                {s.items && (
                                    <ul className="space-y-1">
                                        {s.items.map((item, j) => (
                                            <li key={j} className="text-[11.5px] text-neutral-600 flex gap-2">
                                                <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-neutral-400 shrink-0" />
                                                {item.text}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>
                </div>

                {/* ─── RIGHT COLUMN (Sidebar ~38%) ─── */}
                <div className="flex-[38] pl-8">
                    <div className="space-y-6">

                        {/* Contact */}
                        <section>
                            <SidebarTitle>Contact</SidebarTitle>
                            <div className="space-y-2.5">
                                {personalInfo?.email && (
                                    <div className="flex items-center gap-2.5 text-[11px] text-neutral-600">
                                        <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span>{personalInfo.email}</span>
                                    </div>
                                )}
                                {personalInfo?.phone && (
                                    <div className="flex items-center gap-2.5 text-[11px] text-neutral-600">
                                        <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span>{personalInfo.phone}</span>
                                    </div>
                                )}
                                {(personalInfo?.city || personalInfo?.country) && (
                                    <div className="flex items-center gap-2.5 text-[11px] text-neutral-600">
                                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                                    </div>
                                )}
                                {personalInfo?.linkedinUrl && (
                                    <div className="flex items-center gap-2.5 text-[11px] text-neutral-600">
                                        <Linkedin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                    </div>
                                )}
                                {personalInfo?.websiteUrl && (
                                    <div className="flex items-center gap-2.5 text-[11px] text-neutral-600">
                                        <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span>{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Education */}
                        {education && education.length > 0 && (
                            <section>
                                <SidebarTitle>Education</SidebarTitle>
                                <div className="space-y-4">
                                    {education.map((edu, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className={cn("text-[12px] font-bold leading-tight", accentColor)}>
                                                    {edu.degree}{edu.major ? ` (${edu.major})` : ''}
                                                </h3>
                                                {edu.endYear && (
                                                    <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                                                        {edu.endYear}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-neutral-500 leading-snug">
                                                {edu.institutionName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Core Competencies (Skills grouped by type) */}
                        {skills && skills.length > 0 && (
                            <section>
                                <SidebarTitle>Core Competencies</SidebarTitle>
                                <div className="space-y-4">
                                    {Object.entries(groupedSkills).map(([type, list]) => (
                                        <div key={type}>
                                            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                                                {formatSkillTypeLabel(type)}
                                            </h4>
                                            <div className="space-y-1">
                                                {list?.map((s, i) => (
                                                    <p key={i} className="text-[11px] text-neutral-600 leading-snug pl-3 relative">
                                                        <span className="absolute left-0 top-[6px] w-[4px] h-[1px] bg-neutral-300" />
                                                        {s.skillName}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <SidebarTitle>Certifications</SidebarTitle>
                                <div className="space-y-2.5">
                                    {certifications.map((c, i) => (
                                        <div key={i}>
                                            <p className="text-[11.5px] font-semibold text-neutral-800 leading-tight">{c.certificationName}</p>
                                            <p className="text-[10px] text-neutral-400">{c.issuingOrganization}{c.issueYear ? ` • ${c.issueYear}` : ''}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section>
                                <SidebarTitle>Languages</SidebarTitle>
                                <div className="space-y-1.5">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex justify-between items-baseline">
                                            <span className="text-[11px] text-neutral-700">{l.languageName}</span>
                                            <span className="text-[10px] text-neutral-400 capitalize">{l.proficiencyLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Achievements / Awards */}
                        {achievements && achievements.length > 0 && (
                            <section>
                                <SidebarTitle>Awards</SidebarTitle>
                                <div className="space-y-2.5">
                                    {achievements.map((a, i) => (
                                        <div key={i}>
                                            <p className="text-[11.5px] font-semibold text-neutral-800 leading-tight">{a.achievementTitle}</p>
                                            <p className="text-[10px] text-neutral-400">{a.issuingBody}{a.year ? ` • ${a.year}` : ''}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
