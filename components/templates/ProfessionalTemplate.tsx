import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Expecting text color class like 'text-navy-900'
}

export function ProfessionalTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications } = data

    return (
        <div className={cn("w-full bg-white aspect-[210/297] p-12 md:p-16 text-slate-950 font-sans leading-relaxed flex flex-col gap-8", className)}>
            {/* Header */}
            <header className="flex flex-col items-start gap-4">
                <div className="w-full flex justify-between items-baseline border-b-2 border-slate-100 pb-6">
                    <div>
                        <h1 className={cn("text-4xl font-extrabold tracking-tight mb-1", accentColor)}>
                            {personalInfo?.fullName}
                        </h1>
                        <p className="text-xl font-medium text-slate-600">
                            {personalInfo?.professionalTitle}
                        </p>
                    </div>

                    <div className="text-right text-sm text-slate-500 space-y-1">
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                        {(personalInfo?.linkedinUrl || personalInfo?.websiteUrl) && (
                            <div className="flex gap-3 justify-end mt-1">
                                {personalInfo?.linkedinUrl && <span className="underline opacity-80 decoration-slate-200">LinkedIn</span>}
                                {personalInfo?.websiteUrl && <span className="underline opacity-80 decoration-slate-200">Portfolio</span>}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Summary */}
            {professionalSummary?.summaryText && (
                <section className="flex flex-col gap-3">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest", accentColor)}>
                        Professional Summary
                    </h2>
                    <p className="text-slate-700 leading-relaxed max-w-4xl">
                        {professionalSummary.summaryText}
                    </p>
                </section>
            )}

            {/* Experience */}
            {workExperience && workExperience.length > 0 && (
                <section className="flex flex-col gap-6">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Professional Experience
                    </h2>
                    <div className="flex flex-col gap-8">
                        {workExperience.map((job, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-bold text-slate-900">{job.jobTitle}</h3>
                                    <span className="text-sm font-semibold text-slate-500 tabular-nums">
                                        {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                    </span>
                                </div>
                                <div className="text-md font-medium text-slate-700">{job.companyName}</div>
                                {job.roleDescription && (
                                    <p className="text-slate-600 mt-1">{job.roleDescription}</p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="list-disc list-outside ml-5 text-slate-600 flex flex-col gap-1.5 mt-1">
                                        {job.achievements.map((ach, j) => (
                                            <li key={j} className="pl-1">
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

            {/* Education */}
            {education && education.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Education
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {education.map((edu, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between items-baseline">
                                    <div className="font-bold text-slate-900">{edu.degree}</div>
                                    <span className="text-sm text-slate-500">{edu.endYear}</span>
                                </div>
                                <div className="text-slate-600 text-sm">{edu.institutionName}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="flex flex-col gap-4 mt-2">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Skills & Expertise
                    </h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {skills.map((skill, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={cn("w-1.5 h-1.5 rounded-full", accentColor.replace('text-', 'bg-'))} />
                                <span className="text-slate-700 font-medium">{skill.skillName}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className={cn("text-lg font-bold uppercase tracking-widest border-b border-slate-100 pb-1", accentColor)}>
                        Certifications
                    </h2>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                        {certifications.map((cert, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="font-bold text-slate-900 text-sm">{cert.certificationName}</div>
                                <div className="text-xs text-slate-500">{cert.issuer} • {cert.issueDate}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
