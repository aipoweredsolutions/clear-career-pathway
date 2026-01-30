import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Star, Heart, Cloud } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    colorTheme?: 'pink' | 'mint' | 'lavender' | 'sky' | 'peach' | 'black'
}

export function CuteTemplate({ data, className, colorTheme = 'pink' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills } = data

    const colors = {
        pink: { bg: 'bg-pink-50', header: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200', accent: 'bg-pink-200' },
        mint: { bg: 'bg-teal-50', header: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200', accent: 'bg-teal-200' },
        lavender: { bg: 'bg-purple-50', header: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', accent: 'bg-purple-200' },
        sky: { bg: 'bg-sky-50', header: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-200', accent: 'bg-sky-200' },
        peach: { bg: 'bg-orange-50', header: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', accent: 'bg-orange-200' },
        black: { bg: 'bg-neutral-50', header: 'bg-neutral-200', text: 'text-neutral-900', border: 'border-neutral-300', accent: 'bg-neutral-300' },
    }

    const theme = colors[colorTheme]

    return (
        <div className={cn("w-full aspect-[210/297] font-sans p-8 rounded-xl", theme.bg, className)}>
            {/* Playful Header card */}
            <header className={cn("rounded-3xl p-8 mb-8 text-center relative overflow-hidden", theme.header)}>
                <div className="relative z-10">
                    <h1 className={cn("text-4xl font-extrabold tracking-tight mb-2", theme.text)}>
                        {personalInfo?.fullName}
                    </h1>
                    <p className="text-lg text-neutral-600 font-medium mb-4">
                        {personalInfo?.professionalTitle} <Star className={cn("inline w-4 h-4 mb-1", theme.text)} fill="currentColor" />
                    </p>

                    <div className="flex justify-center flex-wrap gap-3 text-sm font-medium text-neutral-600">
                        {personalInfo?.email && <span className="bg-white/50 px-3 py-1 rounded-full">{personalInfo.email}</span>}
                        {personalInfo?.phone && <span className="bg-white/50 px-3 py-1 rounded-full">{personalInfo.phone}</span>}
                        {personalInfo?.city && <span className="bg-white/50 px-3 py-1 rounded-full">{personalInfo.city}</span>}
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className={cn("absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-50", theme.accent)} />
                <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-50", theme.accent)} />
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Sidebar */}
                <div className="col-span-4 space-y-8">
                    {/* About Me Bubble */}
                    {professionalSummary?.summaryText && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-white transition-colors">
                            <h2 className={cn("text-lg font-bold mb-3 flex items-center", theme.text)}>
                                <Heart className="w-5 h-5 mr-2" fill="currentColor" /> About Me
                            </h2>
                            <p className="text-sm text-neutral-600 leading-relaxed text-pretty">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    )}

                    {/* Skills Pills */}
                    {skills && skills.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h2 className={cn("text-lg font-bold mb-4 flex items-center", theme.text)}>
                                <Star className="w-5 h-5 mr-2" fill="currentColor" /> Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className={cn("text-xs font-bold px-3 py-1.5 rounded-full", theme.accent, theme.text.replace('text-', 'text-opacity-80 text-'))}>
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h2 className={cn("text-lg font-bold mb-4 flex items-center", theme.text)}>
                                <Cloud className="w-5 h-5 mr-2" fill="currentColor" /> Education
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-800 text-sm">{edu.institutionName}</div>
                                        <div className="text-xs text-neutral-500 font-semibold">{edu.degree}</div>
                                        <div className="text-xs text-neutral-400 mt-1">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="col-span-8 space-y-6">
                    {/* Experience Cards */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className={cn("text-2xl font-bold mb-6 px-2", theme.text)}>Work Experience</h2>
                            <div className="space-y-4">
                                {workExperience.map((exp, i) => (
                                    <div key={i} className={cn("bg-white p-6 rounded-2xl shadow-sm border-l-4", theme.border)}>
                                        <div className={cn("w-1 h-full absolute left-0 top-0 rounded-l-2xl", theme.accent)}></div>

                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-bold text-neutral-800">{exp.jobTitle}</h3>
                                            <span className="text-xs font-bold px-2 py-1 rounded bg-neutral-100 text-neutral-500">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-semibold text-neutral-500 mb-3">{exp.companyName}</div>
                                        <p className="text-sm text-neutral-600 mb-4">{exp.roleDescription}</p>

                                        {exp.achievements && exp.achievements.length > 0 && (
                                            <div className="bg-neutral-50 p-4 rounded-xl">
                                                <ul className="space-y-2">
                                                    {exp.achievements.map((ach, j) => (
                                                        <li key={j} className="text-sm text-neutral-600 flex items-start">
                                                            <span className={cn("mr-2 font-bold", theme.text)}>•</span>
                                                            {ach.achievementText}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
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
