import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Tailwind text- class (e.g., 'text-slate-900')
}

export function ATSTimelineTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        languages
    } = data

    // Extract base color for borders/accents
    const borderColorClass = accentColor.replace('text-', 'border-')
    const bgColorClass = accentColor.replace('text-', 'bg-')

    return (
        <div className={cn("w-full bg-white font-sans text-neutral-800 leading-relaxed", className)}>
            {/* Elegant Header */}
            <header className="mb-12 border-b-2 pb-8 border-neutral-100 italic">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className={cn("text-5xl font-black tracking-tighter leading-none mb-3", accentColor)}>
                            {personalInfo?.fullName}
                        </h1>
                        <p className="text-xl font-medium text-neutral-500 tracking-tight">
                            {personalInfo?.professionalTitle}
                        </p>
                    </div>
                    <div className="text-right flex flex-col gap-1 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                    </div>
                </div>
            </header>

            <div className="space-y-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className="relative pl-12">
                        <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-full opacity-10", bgColorClass)} />
                        <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-40", accentColor)}>Executive Profile</h2>
                        <p className="text-base font-medium leading-relaxed max-w-3xl">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience with Timeline */}
                {workExperience && workExperience.length > 0 && (
                    <section className="relative">
                        <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-8 pl-12 opacity-40", accentColor)}>Career Milestone</h2>

                        {/* Timeline Line */}
                        <div className={cn("absolute left-0 top-12 bottom-0 w-0.5 rounded-full opacity-10", bgColorClass)} />

                        <div className="space-y-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative pl-12">
                                    {/* Timeline Dot */}
                                    <div className={cn("absolute -left-[5px] top-2 w-3 h-3 rounded-full border-2 bg-white", borderColorClass)} />

                                    <div className="flex justify-between items-baseline mb-3">
                                        <div>
                                            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{job.jobTitle}</h3>
                                            <div className={cn("text-lg font-bold italic", accentColor)}>{job.companyName}</div>
                                        </div>
                                        <div className="text-sm font-black text-neutral-400 tabular-nums uppercase tracking-wider">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-sm text-neutral-600 mb-4 leading-relaxed max-w-3xl">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="grid grid-cols-1 gap-3">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-sm text-neutral-700 leading-relaxed flex items-start gap-4">
                                                    <span className={cn("mt-2.5 w-1 h-1 rounded-full flex-shrink-0", bgColorClass)} />
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

                {/* Bottom Section */}
                <div className="flex flex-col gap-8 pt-4 border-t border-neutral-50">
                    {/* Education & Certs */}
                    <div className="space-y-8">
                        {education && education.length > 0 && (
                            <section>
                                <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6 opacity-40", accentColor)}>Academic Foundation</h2>
                                <div className="space-y-6">
                                    {education.map((edu, i) => (
                                        <div key={i} className="flex justify-between items-baseline">
                                            <div>
                                                <div className="text-lg font-black text-neutral-900">{edu.degree}</div>
                                                <div className="text-sm font-bold text-neutral-500 italic">{edu.institutionName}</div>
                                            </div>
                                            <div className="text-xs font-black text-neutral-300 uppercase tracking-widest">{edu.endYear}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {certifications && certifications.length > 0 && (
                            <section>
                                <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-40", accentColor)}>Credentials</h2>
                                <div className="flex flex-wrap gap-x-8 gap-y-2">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="text-sm">
                                            <span className="font-bold text-neutral-800">{cert.certificationName}</span>
                                            <span className="text-neutral-400"> • {cert.issuingOrganization}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Skills & Langs */}
                    <div className="space-y-8">
                        {skills && skills.length > 0 && (
                            <section>
                                <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6 opacity-40", accentColor)}>Core Expertise</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, i) => (
                                        <span key={i} className={cn("px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border", borderColorClass, accentColor, "bg-neutral-50")}>
                                            {skill.skillName}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-40", accentColor)}>Linguistics</h2>
                                <div className="space-y-2">
                                    {languages.map((lang, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="font-bold text-neutral-700 italic">{lang.languageName}</span>
                                            <span className="text-neutral-400 font-medium">{lang.proficiencyLevel}</span>
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
