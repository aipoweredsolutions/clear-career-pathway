import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSExecutiveTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    // Extract base color for borders
    const borderColorClass = accentColor.replace('text-', 'border-')
    const bgColorClass = accentColor.replace('text-', 'bg-')
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
        languages,
        professionalAffiliations,
        customSections
    } = data

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-[14px] font-black uppercase tracking-[0.25em] text-neutral-900 mb-6 flex items-center gap-4">
            {children}
            <div className="h-px flex-1 bg-neutral-100" />
        </h2>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed",
            className
        )}>
            {/* Executive Header — Power Header */}
            <header className={cn("border-b-[6px] pb-10 mb-12", borderColorClass)}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex-1">
                        <h1 className={cn("text-[52px] font-black tracking-[-0.04em] leading-[0.9] mb-4 uppercase", accentColor)}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        {personalInfo?.professionalTitle && (
                            <div className={cn("text-[16px] font-black tracking-[0.15em] uppercase opacity-80", accentColor)}>
                                {personalInfo.professionalTitle}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 text-[12px] font-bold text-neutral-500 uppercase tracking-wider text-right">
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        )}
                        {personalInfo?.linkedinUrl && <span className={accentColor}>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                    </div>
                </div>
            </header>

            <div className="space-y-12 pb-12">
                {/* Strategic Profile */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionTitle>Executive Mandate</SectionTitle>
                        <div className="p-8 bg-neutral-50/50 border-l-[6px] border-neutral-900 rounded-r-2xl">
                            <p className="text-[15px] font-medium leading-relaxed text-neutral-700 text-justify">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    </section>
                )}

                {/* Core Competencies — High-Contrast Grid */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionTitle>Strategic Competencies</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-3">
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{type}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {list.map((s, i) => (
                                            <span key={i} className="text-[12px] font-bold px-3 py-1 bg-white text-neutral-800 rounded border-[1.5px] border-neutral-200">
                                                {s.skillName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Tenure — Refined Timeline */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionTitle>Career Trajectory</SectionTitle>
                        <div className="space-y-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative pl-10 border-l-[3px] border-neutral-100">
                                    <div className={cn("absolute top-1.5 -left-[9px] w-4 h-4 rounded-full border-[3px] border-white ring-2 ring-neutral-100", bgColorClass)} />
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                                        <div>
                                            <h3 className="text-[18px] font-black text-neutral-900 leading-tight mb-1">{job.jobTitle}</h3>
                                            <div className={cn("text-[13px] font-black uppercase tracking-wider", accentColor)}>
                                                {job.companyName} <span className="text-neutral-300 font-normal mx-2">|</span> {job.location}
                                            </div>
                                        </div>
                                        <span className="text-[12px] font-black text-neutral-400 uppercase tracking-[0.1em] bg-neutral-50 px-3 py-1 rounded">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[14.5px] text-neutral-600 mb-6 leading-relaxed font-medium">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 flex gap-4 leading-relaxed group">
                                                    <span className={cn("mt-2.5 w-1.5 h-1.5 rounded-full shrink-0", bgColorClass, "opacity-30 group-hover:opacity-100 transition-opacity")} />
                                                    <span className="font-medium">{a.achievementText}</span>
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
                        <SectionHeader title="Key Strategic Initiatives" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((proj, i) => (
                                <div key={i} className="bg-neutral-50 p-6 rounded-2xl border-[1.5px] border-neutral-100 group hover:border-neutral-200 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-[13px] font-black uppercase tracking-wider">{proj.projectName}</h3>
                                        <div className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white rounded border border-neutral-200", accentColor)}>{proj.role}</div>
                                    </div>
                                    <p className="text-[13px] text-neutral-600 leading-relaxed font-medium">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education & Other Credentials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t-[3px] border-neutral-100">
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-neutral-900 mb-6">Academic Background</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="text-[14px] font-black text-neutral-900 uppercase leading-tight mb-1">{edu.degree}</div>
                                        <div className="text-[13px] font-bold text-neutral-500 italic mb-1">{edu.institutionName}</div>
                                        <div className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="space-y-12">
                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-neutral-900 mb-6">Certifications</h2>
                                <div className="space-y-4">
                                    {certifications.map((c, i) => (
                                        <div key={i} className="flex flex-col gap-0.5">
                                            <div className="text-[13px] font-bold text-neutral-800">{c.certificationName}</div>
                                            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{c.issuingOrganization}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-neutral-900 mb-6">Languages</h2>
                                <div className="flex flex-wrap gap-4">
                                    {languages.map((l, i) => (
                                        <div key={i} className="text-[13px] font-bold px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100">
                                            {l.languageName} <span className={cn("text-[10px] uppercase font-black ml-1 opacity-50", accentColor)}>{l.proficiencyLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <section key={i}>
                        <SectionTitle>{s.title}</SectionTitle>
                        {s.content && <p className="text-[14px] text-neutral-700 leading-relaxed font-medium mb-4">{s.content}</p>}
                        {s.items && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {s.items.map((item, j) => (
                                    <li key={j} className="text-[12px] text-neutral-600 font-bold uppercase tracking-tight flex items-center gap-3">
                                        <div className={cn("w-1.5 h-1.5 rounded-full", bgColorClass)} />
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    )
}

