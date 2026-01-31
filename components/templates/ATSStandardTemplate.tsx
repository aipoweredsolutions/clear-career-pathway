import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSStandardTemplate({ data, className }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        achievements,
        projects
    } = data

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] text-neutral-900",
            "font-sans",
            className
        )}>
            {/* Standard Left Header */}
            <header className="mb-10 flex border-b border-neutral-100 pb-6">
                <div className="flex-1">
                    <h1 className="text-4xl font-black text-neutral-900 tracking-tight leading-none mb-3">
                        {personalInfo?.fullName}
                    </h1>
                    <div className="text-sm font-bold text-neutral-400 uppercase tracking-[0.2em]">
                        {personalInfo?.professionalTitle}
                    </div>
                </div>
                <div className="text-right flex flex-col justify-end gap-1">
                    <div className="text-xs font-bold text-neutral-600">{personalInfo?.email}</div>
                    <div className="text-xs font-bold text-neutral-600">{personalInfo?.phone}</div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{personalInfo?.location}</div>
                </div>
            </header>

            <div className="space-y-10">
                {/* 1. Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase text-neutral-300 tracking-[0.3em] mb-3">01 // Profile</h2>
                        <p className="text-xs font-medium text-neutral-700 leading-relaxed border-l-2 border-neutral-100 pl-4">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* 2. Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase text-neutral-300 tracking-[0.3em] mb-6">02 // Experience</h2>
                        <div className="space-y-8">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wide">{job.jobTitle}</h3>
                                        <span className="text-[10px] font-bold text-neutral-400 italic bg-neutral-50 px-2 py-0.5 rounded">{job.startDate} — {job.isCurrent ? 'Current' : job.endDate}</span>
                                    </div>
                                    <div className="text-[10px] font-black text-primary-600 uppercase mb-3">{job.companyName} | {job.location}</div>
                                    {job.roleDescription && (
                                        <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-medium">{job.roleDescription}</p>
                                    )}
                                    {job.achievements && (
                                        <ul className="space-y-2 ml-4">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-xs text-neutral-700 leading-relaxed flex gap-3">
                                                    <span className="text-neutral-200 mt-1.5">•</span>
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

                {/* Skills - Categorized with Proficiency */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase text-neutral-300 tracking-[0.3em] mb-4">03 // Competencies</h2>
                        {(() => {
                            // Group skills by type
                            const groupedSkills = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const categoryLabels: Record<string, string> = {
                                technical: 'Technical',
                                professional: 'Professional',
                                tool: 'Tools',
                                industry: 'Industry'
                            }

                            // If only one category or all professional, use grid layout
                            if (Object.keys(groupedSkills).length === 1) {
                                return (
                                    <div className="grid grid-cols-4 gap-4">
                                        {skills.map((s, i) => (
                                            <div key={i} className="flex flex-col gap-1 border-t border-neutral-50 pt-2">
                                                <span className="text-[10px] font-black text-neutral-900">{s.skillName}</span>
                                                {s.proficiencyLevel && (
                                                    <span className="text-[8px] font-bold text-neutral-400 uppercase">{s.proficiencyLevel}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )
                            }

                            // Show categorized layout
                            return (
                                <div className="space-y-3">
                                    {Object.entries(groupedSkills).map(([type, skillsList]) => (
                                        <div key={type}>
                                            <div className="text-[9px] font-black text-neutral-400 uppercase tracking-wider mb-2">
                                                {categoryLabels[type] || type}
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                {skillsList.map((s, i) => (
                                                    <div key={i} className="flex flex-col gap-0.5">
                                                        <span className="text-[10px] font-black text-neutral-900">{s.skillName}</span>
                                                        {s.proficiencyLevel && (
                                                            <span className="text-[8px] font-bold text-neutral-400 uppercase">{s.proficiencyLevel}</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                    </section>
                )}

                {/* 4. Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase text-neutral-300 tracking-[0.3em] mb-4">04 // Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div>
                                        <span className="text-xs font-black text-neutral-900 uppercase tracking-wider">{edu.degree}</span>
                                        <div className="text-[10px] font-bold text-neutral-400 italic mt-0.5">{edu.institutionName}</div>
                                    </div>
                                    <span className="text-[10px] font-bold text-neutral-200">{edu.endYear}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
