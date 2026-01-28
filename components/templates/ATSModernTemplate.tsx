import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSModernTemplate({ data, className }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        achievements
    } = data

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] p-12 text-neutral-800 font-sans leading-normal",
            className
        )}>
            {/* Split Header */}
            <header className="flex justify-between items-start border-b border-neutral-200 pb-8 mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight leading-none mb-2">
                        {personalInfo?.fullName}
                    </h1>
                    <div className="text-base font-medium text-neutral-500 tracking-widest uppercase">
                        {personalInfo?.professionalTitle}
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{personalInfo?.location || personalInfo?.city}</div>
                    <div className="text-sm font-semibold text-neutral-900">{personalInfo?.email}</div>
                    <div className="text-sm font-semibold text-neutral-900">{personalInfo?.phone}</div>
                </div>
            </header>

            <div className="flex gap-12">
                {/* Main Content Area */}
                <div className="flex-1 space-y-10">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">About Me</h2>
                            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Professional History</h2>
                            <div className="space-y-8">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-sm font-black text-neutral-900">{job.jobTitle}</h3>
                                            <span className="text-[10px] font-bold text-neutral-400">{job.startDate} — {job.isCurrent ? 'Present' : job.endDate}</span>
                                        </div>
                                        <div className="text-[10px] font-black text-neutral-950 uppercase tracking-widest mb-3">{job.companyName}</div>
                                        {job.achievements && (
                                            <ul className="space-y-2">
                                                {job.achievements.map((a, j) => (
                                                    <li key={j} className="text-xs text-neutral-600 leading-relaxed flex gap-3">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-100 mt-1.5 shrink-0" />
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
                </div>

                {/* Right Column Area for Skills/Edu (Remains single-column for Parsers but visually structured) */}
                <aside className="w-56 shrink-0 space-y-10">
                    {/* Professional Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Expertise</h2>
                            <div className="grid grid-cols-1 gap-2">
                                {skills.map((s, i) => (
                                    <div key={i} className="flex justify-between items-center group">
                                        <span className="text-[10px] font-bold text-neutral-700">{s.skillName}</span>
                                        <div className="h-px bg-neutral-100 flex-1 mx-2" />
                                        <div className="w-1 h-1 rounded-full bg-primary-500" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="text-[10px] font-black text-neutral-900 uppercase tracking-wider mb-1">{edu.degree}</div>
                                        <div className="text-[10px] font-bold text-neutral-400 mb-1">{edu.institutionName}</div>
                                        <div className="text-[10px] font-bold text-neutral-300 italic">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    )
}
