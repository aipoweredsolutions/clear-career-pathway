import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSMinimalTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
        references,
        customSections
    } = data

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-tight",
            className
        )}>
            {/* Minimal Header */}
            <header className="mb-5">
                <h1 className={cn("text-3xl font-light tracking-tight mb-1", accentColor)}>
                    {personalInfo?.fullName?.toUpperCase() || 'YOUR NAME'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <div className="text-[12px] font-medium text-neutral-400 uppercase tracking-[0.3em] mb-3">
                        {personalInfo.professionalTitle}
                    </div>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-500 font-medium uppercase tracking-widest">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && (
                        <>
                            <span>/</span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <>
                            <span>/</span>
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </>
                    )}
                </div>
            </header>

            <div className="space-y-5">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <p className="text-[12px] text-neutral-600 leading-relaxed">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Experience</h2>
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-1">
                                        <h3 className="text-sm font-bold text-neutral-800">{job.jobTitle}</h3>
                                        <span className="text-[11px] font-bold text-neutral-400">{job.startDate} — {job.isCurrent ? 'Current' : job.endDate}</span>
                                    </div>
                                    <div className={cn("text-[11px] font-bold mb-2", accentColor)}>{job.companyName.toUpperCase()}</div>
                                    <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed">{job.roleDescription}</p>
                                    {job.achievements && (
                                        <div className="space-y-1">
                                            {job.achievements.map((a, j) => (
                                                <div key={j} className="text-[12px] text-neutral-600 flex gap-2">
                                                    <span className="text-neutral-300">•</span>
                                                    <span>{a.achievementText}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Projects</h2>
                        <div className="space-y-4">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-1">
                                        <h3 className="text-[12px] font-bold text-neutral-800">{proj.projectName}</h3>
                                        <span className="text-[11px] font-bold text-neutral-400 uppercase">{proj.role}</span>
                                    </div>
                                    <p className="text-[12px] text-neutral-600 leading-relaxed italic">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-1">
                                        <h3 className="text-[12px] font-bold text-neutral-800">{edu.degree}</h3>
                                        <span className="text-[11px] font-bold text-neutral-400">{edu.endYear}</span>
                                    </div>
                                    <div className="text-[11px] font-bold text-neutral-500 italic">{edu.institutionName}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills - Grouped Minimal */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Competencies</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type}>
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5">{type}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {list.map((s, i) => (
                                            <span key={i} className="text-[11px] font-bold text-neutral-700">{s.skillName}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications & Awards */}
                {(certifications?.length || achievements?.length) ? (
                    <div className="grid grid-cols-1 gap-6 border-t border-neutral-100 pt-6">
                        {certifications && certifications.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Certifications</h2>
                                <div className="space-y-2">
                                    {certifications.map((c, i) => (
                                        <div key={i} className="text-[11px] font-bold text-neutral-600">
                                            {c.certificationName}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {achievements && achievements.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Awards</h2>
                                <div className="space-y-2">
                                    {achievements.map((a, i) => (
                                        <div key={i} className="text-[11px] font-bold text-neutral-600">
                                            {a.achievementTitle}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : null}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Languages</h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {languages.map((l, i) => (
                                <div key={i} className="text-[11px] font-bold text-neutral-600">
                                    {l.languageName} <span className="text-neutral-300">({l.proficiencyLevel})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">References</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {references.map((ref, i) => (
                                <div key={i} className="text-[12px] text-neutral-600">
                                    {ref.referenceName && <span className="font-bold text-neutral-800">{ref.referenceName}</span>}
                                    {ref.role && <span> — {ref.role}</span>}
                                    {ref.organization && <div className="italic">{ref.organization}</div>}
                                    {ref.contactDetails && <div className="text-neutral-400 mt-0.5">{ref.contactDetails}</div>}
                                    {ref.availabilityStatement && <div className="text-neutral-400 italic mt-0.5">{ref.availabilityStatement}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

