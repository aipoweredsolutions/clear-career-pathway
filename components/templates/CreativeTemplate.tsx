import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function CreativeTemplate({ data, className, accentColor = 'bg-rose-500' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills } = data

    // Extract color base for text- and border- classes
    const colorBase = accentColor.replace('bg-', '')
    const textColorClass = `text-${colorBase}`
    const borderColorClass = `border-${colorBase}`
    const lightBgClass = `bg-${colorBase.split('-')[0]}-50`
    const lightTextClass = `text-${colorBase.split('-')[0]}-100`

    return (
        <div className={cn("w-full bg-white text-neutral-800 aspect-[210/297] font-sans pb-10", className)}>
            {/* Heavy Header with Accent Color */}
            {/* Simple Header for ATS */}
            <header className={cn("p-10 border-b-4", borderColorClass)}>
                <h1 className={cn("text-5xl font-black tracking-tight mb-4", textColorClass)}>
                    {personalInfo?.fullName}
                </h1>
                <p className="text-2xl font-medium mb-6 text-neutral-600 tracking-wide">
                    {personalInfo?.professionalTitle}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-neutral-500 uppercase tracking-widest">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo?.location && <span>| {personalInfo.location}</span>}
                    {personalInfo?.linkedinUrl && <span>| {personalInfo.linkedinUrl}</span>}
                </div>
            </header>

            <div className="p-10 space-y-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className="border-l-4 border-neutral-100 pl-8 py-2">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-neutral-400">Professional Objective</h2>
                        <p className="text-neutral-800 leading-relaxed text-lg font-medium">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-black text-neutral-900 mb-10 flex items-center gap-4">
                            Experience
                        </h2>
                        <div className="space-y-12">
                            {workExperience.map((exp, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                                        <div>
                                            <h3 className="text-2xl font-black text-neutral-900 leading-none mb-2">{exp.jobTitle}</h3>
                                            <div className={cn("text-lg font-bold uppercase tracking-wide", textColorClass)}>{exp.companyName}</div>
                                        </div>
                                        <div className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mt-2 md:mt-0">
                                            {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                        </div>
                                    </div>

                                    <p className="text-neutral-600 leading-relaxed font-medium text-[15px]">{exp.roleDescription}</p>

                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <ul className="list-disc ml-6 space-y-2 mt-4">
                                            {exp.achievements.map((ach, j) => (
                                                <li key={j} className="text-sm text-neutral-700 leading-relaxed font-bold pl-2">
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

                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-black text-neutral-900 mb-8 flex items-center gap-4">
                            Core Competencies
                        </h2>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className={cn("w-2 h-2 rounded-full", accentColor)} />
                                    <span className="text-[15px] font-black uppercase tracking-widest text-neutral-700">
                                        {skill.skillName}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-black text-neutral-900 mb-10 flex items-center gap-4">
                            Education
                        </h2>
                        <div className="space-y-8">
                            {education.map((edu, i) => (
                                <div key={i} className="border-l-4 border-neutral-100 pl-6 py-2">
                                    <div className="font-black text-xl text-neutral-900 mb-1">{edu.institutionName}</div>
                                    <div className={cn("text-sm font-black uppercase tracking-widest mb-4", textColorClass)}>{edu.degree}</div>
                                    <div className="flex items-center text-xs font-black text-neutral-400 tracking-[0.2em] uppercase">
                                        <span>Graduated</span>
                                        <span className={cn("ml-4", textColorClass)}>{edu.endYear}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
