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
        <div className={cn("w-full bg-white text-neutral-800 aspect-[210/297] font-sans", className)}>
            {/* Heavy Header with Accent Color */}
            <header className={cn("text-white p-10 print:text-white", accentColor)}>
                <h1 className="text-5xl font-black tracking-tight mb-2">
                    {personalInfo?.fullName}
                </h1>
                <p className={cn("text-xl font-medium mb-6 opacity-90", lightTextClass)}>
                    {personalInfo?.professionalTitle}
                </p>

                <div className="flex flex-wrap gap-4 text-sm font-medium opacity-90">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo?.city && <span>• {personalInfo.city}, {personalInfo.country}</span>}
                    {personalInfo?.linkedinUrl && <span>• {personalInfo.linkedinUrl}</span>}
                </div>
            </header>

            <div className="p-10 grid grid-cols-12 gap-8">

                {/* Main Column */}
                <div className="col-span-8 space-y-8">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <div className={cn("bg-neutral-50 p-6 rounded-lg -ml-6 border-l-4", borderColorClass)}>
                            <h2 className={cn("text-lg font-bold mb-2 uppercase text-xs tracking-wider", textColorClass)}>About Me</h2>
                            <p className="text-neutral-700 leading-relaxed">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                                <span className={cn("w-8 h-1 mr-3 rounded-full", accentColor)}></span>
                                Work Experience
                            </h2>
                            <div className="space-y-10 pl-4 border-l-2 border-neutral-100 ml-3">
                                {workExperience.map((exp, i) => (
                                    <div key={i} className="relative pl-8">
                                        {/* Timeline Dot */}
                                        <div className={cn("absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4", borderColorClass)} />

                                        <div className="mb-2">
                                            <h3 className="text-xl font-bold text-neutral-900">{exp.jobTitle}</h3>
                                            <div className={cn("font-semibold", textColorClass)}>{exp.companyName}</div>
                                        </div>
                                        <div className="text-sm text-neutral-400 font-medium mb-4 uppercase tracking-wider">
                                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                        </div>

                                        <p className="text-neutral-600 mb-3">{exp.roleDescription}</p>

                                        {exp.achievements && exp.achievements.length > 0 && (
                                            <ul className="space-y-2">
                                                {exp.achievements.map((ach, j) => (
                                                    <li key={j} className="text-sm text-neutral-600 flex items-start">
                                                        <span className={cn("mr-2", textColorClass.replace('text-', 'text-opacity-70 text-'))}>➜</span>
                                                        {ach.achievementText}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Side Column */}
                <div className="col-span-4 space-y-10 pt-2">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <div>
                            <h2 className={cn("text-lg font-bold text-neutral-900 mb-4 border-b-2 pb-2", borderColorClass.replace('border-', 'border-opacity-20 border-'))}>Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-800">{edu.institutionName}</div>
                                        <div className={cn("text-sm font-semibold", textColorClass)}>{edu.degree}</div>
                                        <div className="text-neutral-500 text-xs mt-1">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <div>
                            <h2 className={cn("text-lg font-bold text-neutral-900 mb-4 border-b-2 pb-2", borderColorClass.replace('border-', 'border-opacity-20 border-'))}>Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className={cn("px-3 py-1.5 rounded-md text-sm font-semibold", lightBgClass, textColorClass)}>
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
