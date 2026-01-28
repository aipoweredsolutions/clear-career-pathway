import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSClassicTemplate({ data, className }: TemplateProps) {
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
        languages
    } = data

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] p-12 text-neutral-900 font-serif leading-snug",
            className
        )}>
            {/* Header */}
            <header className="text-center border-b border-neutral-300 pb-4 mb-6">
                <h1 className="text-2xl font-bold uppercase mb-2">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="text-xs text-neutral-600 space-x-2">
                    <span>{personalInfo?.email}</span>
                    <span>•</span>
                    <span>{personalInfo?.phone}</span>
                    <span>•</span>
                    <span>{personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span>•</span>
                            <span>{personalInfo.linkedinUrl}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Content Sidebar-less single column */}
            <div className="space-y-6">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-neutral-300 mb-2">Summary</h2>
                        <p className="text-xs text-neutral-800 leading-relaxed italic">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-neutral-300 mb-2">Experience</h2>
                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-sm font-bold">{job.companyName}</h3>
                                        <span className="text-xs italic">{job.startDate} – {job.isCurrent ? 'Present' : job.endDate}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="text-xs font-semibold italic">{job.jobTitle}</div>
                                        <div className="text-xs text-neutral-500">{job.location}</div>
                                    </div>
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc list-outside ml-4 space-y-0.5">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-xs text-neutral-800">{ach.achievementText}</li>
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
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-neutral-300 mb-2">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-sm font-bold">{edu.institutionName}</h3>
                                    <span className="text-xs italic">{edu.endYear}</span>
                                </div>
                                <div className="text-xs italic">{edu.degree}{edu.major ? `, ${edu.major}` : ''}</div>
                                {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-neutral-300 mb-2">Skills</h2>
                        <div className="text-xs leading-relaxed">
                            {skills.map(s => s.skillName).join(' • ')}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
