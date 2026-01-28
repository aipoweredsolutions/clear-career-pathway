import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSExecutiveTemplate({ data, className }: TemplateProps) {
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
            "w-full bg-white aspect-[210/297] p-12 text-neutral-900",
            "font-sans",
            className
        )}>
            {/* Executive Header */}
            <header className="border-b-4 border-neutral-800 pb-6 mb-8">
                <h1 className="text-4xl font-black tracking-tighter text-neutral-900 mb-2 uppercase">
                    {personalInfo?.fullName}
                </h1>
                <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-primary-700 tracking-wider">
                        {personalInfo?.professionalTitle?.toUpperCase()}
                    </div>
                    <div className="flex gap-4 text-[10px] font-bold text-neutral-500">
                        <span>{personalInfo?.email}</span>
                        <span>•</span>
                        <span>{personalInfo?.phone}</span>
                        <span>•</span>
                        <span>{personalInfo?.location || personalInfo?.city}</span>
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
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase">{job.startDate} — {job.isCurrent ? 'Present' : job.endDate}</span>
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

                {/* Skills Grid */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 mb-4 ml-1">Strategic Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="text-[10px] font-bold px-3 py-1 bg-neutral-100 text-neutral-700 rounded uppercase">
                                    {s.skillName}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 mb-4 ml-1">Academic Background</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-xs">
                                        <span className="font-black text-neutral-900">{edu.degree}</span>
                                        <span className="text-neutral-500 mx-2">•</span>
                                        <span className="font-bold text-neutral-600 italic">{edu.institutionName}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-neutral-400">{edu.endYear}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
