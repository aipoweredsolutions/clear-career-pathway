import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ModernTemplate({ data, className, accentColor = 'bg-slate-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications } = data

    return (
        <div className={cn("w-full bg-white aspect-[210/297] grid grid-cols-12 shadow-sm font-sans", className)}>
            {/* Sidebar - Dark */}
            <div className={cn("col-span-4 text-white p-8", accentColor)}>
                <div className="mb-8 text-center">
                    {/* Initials Circle */}
                    <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 border-2 border-white/20">
                        <span className="text-3xl font-bold">{personalInfo.fullName.split(' ').map((n: any) => n[0]).join('')}</span>
                    </div>

                    <h2 className="text-xl font-bold mb-2">{personalInfo.professionalTitle}</h2>

                    <div className="text-sm space-y-2 opacity-90">
                        {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.location && <div>{personalInfo.location}</div>}
                        {personalInfo.linkedinUrl && <div className="break-all">{personalInfo.linkedinUrl}</div>}
                        {personalInfo.websiteUrl && <div className="break-all">{personalInfo.websiteUrl}</div>}
                    </div>
                </div>

                {/* Sidebar Sections */}
                {skills && skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b border-white/20 pb-2 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className="bg-white/10 px-2 py-1 rounded text-sm">{skill.skillName}</span>
                            ))}
                        </div>
                    </div>
                )}

                {education && education.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b border-white/20 pb-2 mb-4">Education</h3>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="font-bold">{edu.institutionName}</div>
                                    <div className="text-sm opacity-80">{edu.degree}</div>
                                    <div className="text-xs opacity-60">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content - Light */}
            <div className="col-span-8 p-10 text-slate-800">
                <header className="mb-10 border-b-2 border-slate-100 pb-6">
                    <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">{personalInfo.fullName}</h1>
                    {professionalSummary && (
                        <p className="text-lg text-slate-600 leading-relaxed">{professionalSummary.summaryText}</p>
                    )}
                </header>

                {workExperience && workExperience.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">Experience</h3>
                        <div className="space-y-8">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h4 className="text-xl font-bold text-slate-800">{job.jobTitle}</h4>
                                        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                            {job.startDate} - {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="text-slate-600 font-medium mb-3">{job.companyName}</div>
                                    <p className="text-slate-600 mb-3">{job.roleDescription}</p>
                                    {job.achievements && (
                                        <ul className="list-disc list-outside ml-5 text-sm text-slate-600 space-y-1">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j}>{ach.achievementText}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
