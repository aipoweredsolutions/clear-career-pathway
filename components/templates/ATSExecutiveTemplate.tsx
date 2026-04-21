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

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-snug",
            className
        )}>
            {/* Executive Header */}
            <header className={cn("border-b-4 pb-6 mb-8", borderColorClass)}>
                <h1 className={cn("text-4xl font-black tracking-tighter mb-2 uppercase", accentColor)}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="flex justify-between items-center">
                    <div className={cn("text-sm font-bold tracking-wider", accentColor)}>
                        {personalInfo?.professionalTitle?.toUpperCase() || 'EXECUTIVE LEADERSHIP'}
                    </div>
                    <div className="flex gap-4 text-[11px] font-bold text-neutral-500 uppercase tracking-tight">
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.phone && (
                            <>
                                <span>•</span>
                                <span>{personalInfo.phone}</span>
                            </>
                        )}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <>
                                <span>•</span>
                                <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <div className="space-y-8">
                {/* Summary Section */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 mb-3 ml-1">Executive Profile</h2>
                        <div className="p-4 bg-neutral-50 border-l-4 border-neutral-900">
                            <p className="text-xs font-medium leading-relaxed text-neutral-700">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 mb-5 ml-1">Professional Tenure</h2>
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative pl-6 border-l border-neutral-200">
                                    <div className="absolute top-1 -left-[5px] w-2 h-2 rounded-full bg-neutral-800" />
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-sm font-black text-neutral-900">{job.jobTitle}</h3>
                                        <span className="text-[11px] font-bold text-neutral-400 uppercase">{job.startDate} — {job.isCurrent ? 'Present' : job.endDate}</span>
                                    </div>
                                    <div className="text-[11px] font-bold text-neutral-500 italic mb-3">{job.companyName} | {job.location}</div>
                                    <p className="text-xs text-neutral-700 mb-3 leading-relaxed font-medium">{job.roleDescription}</p>
                                    {job.achievements && (
                                        <ul className="space-y-1.5">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-xs text-neutral-600 flex gap-3">
                                                    <span className="text-neutral-400 font-bold">▶</span>
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
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 mb-4 ml-1">Strategic Projects</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="bg-neutral-50 p-4 rounded border-l-2 border-neutral-500">
                                    <h3 className="text-[11px] font-black uppercase mb-1">{proj.projectName}</h3>
                                    <div className={cn("text-[11px] font-bold mb-2 uppercase", accentColor)}>{proj.role}</div>
                                    <p className="text-[11px] text-neutral-600 leading-normal">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Grid - Grouped */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 mb-4 ml-1">Core Competencies</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-2">
                                    <div className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">{type}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {list.map((s, i) => (
                                            <span key={i} className="text-[11px] font-bold px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded border border-neutral-200">
                                                {s.skillName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 mb-4 ml-1">Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-xs">
                                        <span className="font-black text-neutral-900 uppercase">{edu.degree}</span>
                                        <span className="text-neutral-500 mx-2">•</span>
                                        <span className="font-bold text-neutral-600 italic">{edu.institutionName}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-neutral-400">{edu.endYear}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Multi-section bottom (Certs, Languages, etc) */}
                <div className="grid grid-cols-1 gap-8 pt-4 border-t border-neutral-100">
                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-3">Certifications</h2>
                            <div className="space-y-2">
                                {certifications.map((c, i) => (
                                    <div key={i} className="text-[11px] font-bold text-neutral-700">
                                        {c.certificationName} <span className="text-neutral-400 font-normal">| {c.issuingOrganization}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-3">Languages</h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {languages.map((l, i) => (
                                    <div key={i} className="text-[11px] font-bold text-neutral-700">
                                        {l.languageName} <span className={cn("uppercase", accentColor)}>({l.proficiencyLevel})</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <section key={i}>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 mb-3 ml-1">{s.title}</h2>
                        {s.content && <p className="text-xs text-neutral-700 leading-relaxed font-medium mb-2">{s.content}</p>}
                        {s.items && (
                            <ul className="grid grid-cols-1 gap-2">
                                {s.items.map((item, j) => (
                                    <li key={j} className="text-[11px] text-neutral-600 font-bold uppercase tracking-tight">• {item.text}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    )
}

