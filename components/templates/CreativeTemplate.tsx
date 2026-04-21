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
            <header className={cn("text-white p-10 pb-12 print:text-white relative overflow-hidden", accentColor)}>
                <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12 -translate-y-1/2 translate-x-1/2">
                    <div className="w-96 h-96 rounded-full border-[40px] border-white" />
                </div>
                <h1 className="text-6xl font-black tracking-tight mb-4 relative z-10">
                    {personalInfo?.fullName}
                </h1>
                <p className={cn("text-2xl font-medium mb-8 opacity-90 tracking-wide relative z-10", lightTextClass)}>
                    {personalInfo?.professionalTitle}
                </p>

                <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm font-bold opacity-90 uppercase tracking-widest relative z-10">
                    {personalInfo?.email && <span className="hover:text-white transition-colors">{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo?.location && <span>• {personalInfo.location}</span>}
                    {personalInfo?.linkedinUrl && <span>• {personalInfo.linkedinUrl}</span>}
                </div>
            </header>

            <div className="p-10 space-y-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className={cn("p-8 rounded-3xl border-l-8", lightBgClass, borderColorClass)}>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-neutral-400")}>Professional Objective</h2>
                        <p className="text-neutral-800 leading-relaxed text-lg font-medium">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-black text-neutral-900 mb-10 flex items-center gap-4">
                            <span className={cn("w-12 h-2 rounded-full", accentColor)}></span>
                            Experience
                        </h2>
                        <div className="space-y-12 ml-6">
                            {workExperience.map((exp, i) => (
                                <div key={i} className="relative pl-10 border-l-2 border-neutral-100">
                                    {/* Timeline Dot */}
                                    <div className={cn("absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4", borderColorClass)} />

                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-neutral-900 leading-none mb-2">{exp.jobTitle}</h3>
                                            <div className={cn("text-lg font-bold uppercase tracking-wide", textColorClass)}>{exp.companyName}</div>
                                        </div>
                                        <div className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mt-2 md:mt-0">
                                            {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                        </div>
                                    </div>

                                    <p className="text-neutral-600 mb-6 leading-relaxed font-medium text-[15px]">{exp.roleDescription}</p>

                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <ul className="space-y-3">
                                            {exp.achievements.map((ach, j) => (
                                                <li key={j} className="text-sm text-neutral-700 flex items-start group">
                                                    <span className={cn("mr-4 font-black transition-transform group-hover:translate-x-1", textColorClass)}>➜</span>
                                                    <span className="leading-relaxed font-bold">{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Section - Now integrated and full width */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-black text-neutral-900 mb-8 flex items-center gap-4">
                            <span className={cn("w-12 h-2 rounded-full", accentColor)}></span>
                            Core Competencies
                        </h2>
                        <div className="flex flex-wrap gap-3 pl-6">
                            {skills.map((skill, i) => (
                                <span key={i} className={cn("px-5 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-widest border-2 transition-transform hover:-translate-y-1", lightBgClass, borderColorClass, textColorClass)}>
                                    {skill.skillName}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section - Now integrated */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-black text-neutral-900 mb-10 flex items-center gap-4">
                            <span className={cn("w-12 h-2 rounded-full", accentColor)}></span>
                            Education
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-6">
                            {education.map((edu, i) => (
                                <div key={i} className={cn("p-6 rounded-3xl border-2 border-neutral-100 hover:border-neutral-200 transition-colors bg-neutral-50/30", borderColorClass.replace('border-', 'hover:border-'))}>
                                    <div className="font-black text-xl text-neutral-900 mb-1">{edu.institutionName}</div>
                                    <div className={cn("text-sm font-black uppercase tracking-widest mb-4", textColorClass)}>{edu.degree}</div>
                                    <div className="flex justify-between items-center text-xs font-black text-neutral-400 tracking-[0.2em] uppercase pt-4 border-t border-neutral-100">
                                        <span>Graduated</span>
                                        <span className={cn(textColorClass)}>{edu.endYear}</span>
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
