import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSModernTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    // Extract base color for borders/backgrounds
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
        references,
        customSections
    } = data

    return (
        <div className={cn(
            "w-full bg-white text-neutral-800 font-lato leading-normal",
            className
        )}>
            {/* Header */}
            <header className="flex justify-between items-start border-b-2 border-neutral-200 pb-6 mb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight leading-none mb-2">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-lg font-bold tracking-widest uppercase", accentColor)}>
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                </div>
                <div className="text-right space-y-1">
                    <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}
                    </div>
                    {personalInfo?.email && <div className="text-sm font-semibold text-neutral-800">{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="text-sm font-semibold text-neutral-800">{personalInfo.phone}</div>}
                    {personalInfo?.linkedinUrl && <div className="text-sm font-semibold text-neutral-800">{personalInfo.linkedinUrl}</div>}
                    {personalInfo?.portfolioUrl && <div className="text-sm font-semibold text-neutral-800">{personalInfo.portfolioUrl}</div>}
                </div>
            </header>

            <div className="space-y-8">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>Profile</h2>
                        <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Skills - Grouped horizontally if possible or full width */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>Competencies</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type}>
                                    <div className={cn("text-xs font-black text-neutral-500 uppercase tracking-widest mb-2 border-l-2 pl-2", borderColorClass)}>
                                        {type}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {list.map((s, i) => (
                                            <span key={i} className="text-sm font-bold text-neutral-700 bg-neutral-50 px-3 py-1 rounded border border-neutral-200">
                                                {s.skillName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>Experience</h2>
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-black text-neutral-900">{job.jobTitle}</h3>
                                        <span className={cn("text-sm font-extrabold", accentColor)}>
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-3">
                                        <div className="text-sm font-bold text-neutral-700 tracking-wide">{job.companyName}</div>
                                        {job.location && <div className="text-sm text-neutral-500 italic">{job.location}</div>}
                                    </div>
                                    {job.roleDescription && (
                                        <p className="text-sm text-neutral-800 mb-3 leading-relaxed">
                                            {job.roleDescription}
                                        </p>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-2">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-sm text-neutral-700 leading-relaxed flex gap-3">
                                                    <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", bgColorClass)} />
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
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>Featured Projects</h2>
                        <div className="space-y-6">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-black text-neutral-900">{proj.projectName}</h3>
                                        <span className="text-sm font-bold text-neutral-500">{proj.role}</span>
                                    </div>
                                    <p className="text-sm text-neutral-700 leading-relaxed mb-2">{proj.description}</p>
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className={cn("text-xs font-bold uppercase tracking-wider", accentColor)}>
                                            {proj.toolsUsed.join(' • ')}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <div className="text-base font-black text-neutral-900 mb-1">
                                            {edu.degree} {edu.major && `in ${edu.major}`}
                                        </div>
                                        <div className="text-sm font-bold text-neutral-700">{edu.institutionName}</div>
                                        {edu.achievements && (
                                            <div className="text-sm text-neutral-600 mt-1">{edu.achievements}</div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-neutral-500 italic">{edu.endYear}</div>
                                        {edu.gpa && <div className="text-sm text-neutral-600 mt-1">GPA: {edu.gpa}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications & Awards */}
                {(certifications?.length || achievements?.length) ? (
                    <section>
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>Validation & Awards</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {certifications && certifications.map((c, i) => (
                                <div key={`cert-${i}`} className="text-sm">
                                    <div className="font-bold text-neutral-900">{c.certificationName}</div>
                                    <div className="text-neutral-600">
                                        {c.issuingOrganization} {c.issueYear && `(${c.issueYear})`}
                                    </div>
                                </div>
                            ))}
                            {achievements && achievements.map((a, i) => (
                                <div key={`ach-${i}`} className="text-sm">
                                    <div className="font-bold text-neutral-900">{a.achievementTitle}</div>
                                    <div className="text-neutral-600">
                                        {a.issuingBody} {a.year && `(${a.year})`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>Languages</h2>
                        <div className="flex flex-wrap gap-6">
                            {languages.map((l, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-neutral-900">{l.languageName}</span>
                                    <span className={cn("text-xs font-black uppercase px-2 py-0.5 rounded bg-neutral-100", accentColor)}>
                                        {l.proficiencyLevel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>References</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {references.map((ref, i) => (
                                <div key={i} className="text-sm">
                                    {ref.referenceName && <div className="font-bold text-neutral-900">{ref.referenceName}</div>}
                                    {ref.role && <div className="text-neutral-700">{ref.role}</div>}
                                    {ref.organization && <div className="italic text-neutral-600 leading-tight">{ref.organization}</div>}
                                    {ref.contactDetails && <div className="text-neutral-500 mt-1">{ref.contactDetails}</div>}
                                    {ref.availabilityStatement && <div className="text-neutral-500 italic mt-1">{ref.availabilityStatement}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <section key={i}>
                        <h2 className={cn("text-sm font-black uppercase tracking-[0.2em] border-b pb-2 mb-4", borderColorClass, accentColor)}>{s.title}</h2>
                        {s.content && <p className="text-sm text-neutral-700 mb-3 leading-relaxed">{s.content}</p>}
                        {s.items && s.items.length > 0 && (
                            <ul className="space-y-2">
                                {s.items.map((item, j) => (
                                    <li key={j} className="text-sm text-neutral-700 leading-relaxed flex gap-3">
                                        <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", bgColorClass)} />
                                        <span>{item.text}</span>
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

