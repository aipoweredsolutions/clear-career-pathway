import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    font?: 'sans' | 'serif'
}

export function ChicTemplate({ data, className, font = 'sans' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills } = data

    const fontClass = font === 'serif' ? 'font-serif' : 'font-sans'
    const titleFont = font === 'serif' ? 'font-serif' : 'font-sans'

    return (
        <div className={cn("w-full bg-white aspect-[210/297] p-16 flex flex-col", fontClass, className)}>
            {/* Minimalist Header */}
            <header className="mb-20">
                <h1 className={cn("text-6xl font-extralight tracking-tight text-neutral-900 mb-4", titleFont)}>{personalInfo.fullName}</h1>
                <div className="flex items-center gap-6 text-sm text-neutral-400 font-medium uppercase tracking-widest">
                    <span>{personalInfo.professionalTitle}</span>
                    {personalInfo.location && (
                        <>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                            <span>{personalInfo.location}</span>
                        </>
                    )}
                    {personalInfo.email && (
                        <>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                            <span className="lowercase">{personalInfo.email}</span>
                        </>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-16 flex-1">
                {/* Main Content */}
                <div className="col-span-8 space-y-16">
                    {professionalSummary && (
                        <section>
                            <p className="text-xl leading-relaxed text-neutral-600 font-light">{professionalSummary.summaryText}</p>
                        </section>
                    )}

                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-8 border-b border-neutral-100 pb-4">Experience</h2>
                            <div className="space-y-12">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-medium text-neutral-900">{job.companyName}</h3>
                                            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest group-hover:text-neutral-500 transition-colors">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-neutral-500 mb-4 uppercase tracking-wide font-medium">{job.jobTitle}</div>
                                        <p className="text-neutral-600 leading-loose mx-w-prose">{job.roleDescription}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-12 pt-2">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-8 border-b border-neutral-100 pb-4">Expertise</h2>
                            <div className="flex flex-col gap-3">
                                {skills.map((skill, i) => (
                                    <span key={i} className="text-neutral-600 font-medium text-sm">{skill.skillName}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-8 border-b border-neutral-100 pb-4">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="text-sm font-bold text-neutral-900">{edu.institutionName}</div>
                                        <div className="text-sm text-neutral-500 mt-1">{edu.degree}</div>
                                        <div className="text-xs text-neutral-400 mt-2">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
