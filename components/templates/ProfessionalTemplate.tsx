import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Linkedin, Globe, Award, GraduationCap, Briefcase, Code, Star, Languages } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Expecting a Tailwind color class like 'text-blue-900' or 'bg-blue-900'
}

export function ProfessionalTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        projects,
        languages,
        achievements
    } = data

    // Extracting hex color if accentColor is a hex or using slate-900 as default
    // For this template, we'll use a sophisticated Slate/Navy palette by default
    const primaryColor = accentColor.includes('text-') ? accentColor : 'text-slate-900'
    const primaryBg = accentColor.replace('text-', 'bg-') || 'bg-slate-900'

    return (
        <div className={cn("w-full bg-white text-slate-900 font-lato leading-relaxed flex flex-col items-stretch", className)}>
            {/* Elegant Top Header */}
            <header className="p-8 pb-5 flex flex-col gap-6 border-b-4 border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex-1">
                        <h1 className={cn("text-5xl font-black tracking-normal uppercase mb-2", primaryColor)}>
                            {personalInfo?.fullName}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className={cn("h-1 w-12", primaryBg)} />
                            <p className="text-xl font-bold text-slate-500 uppercase tracking-widest">
                                {personalInfo?.professionalTitle}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-sm font-medium text-slate-600">
                        {personalInfo?.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span>{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo?.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span>{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ── MAIN BODY ── */}
            <main className="p-12 pt-8 flex flex-col gap-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={cn("w-2 h-8 rounded-full", primaryBg)} />
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Executive Summary</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-normal text-xl max-w-5xl">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Integrated Expertise Skills - Full Width Wrap */}
                {skills && skills.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <Star className="w-5 h-5 text-slate-400" />
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Core Expertise</h2>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((skill, i) => (
                                <div key={i} className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:border-slate-300 transition-all">
                                    {skill.skillName}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Experience - Strong Vertical Journey */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <Briefcase className="w-5 h-5 text-slate-400" />
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Professional Experience</h2>
                        </div>
                        <div className="flex flex-col gap-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative pl-10">
                                    <div className={cn("absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm", primaryBg)} />
                                    {i !== workExperience.length - 1 && (
                                        <div className="absolute left-[7.5px] top-6 bottom-[-48px] w-[1px] bg-slate-100" />
                                    )}

                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 mb-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{job.jobTitle}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className={cn("text-lg font-bold uppercase tracking-wider", primaryColor)}>{job.companyName}</span>
                                                {job.location && <span className="text-xs text-slate-300 font-black uppercase tracking-tighter">• {job.location}</span>}
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-slate-950 bg-slate-50 px-6 py-2 rounded-full tabular-nums uppercase border border-slate-100">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium italic opacity-80">
                                        {job.roleDescription}
                                    </p>

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-4 text-[15px] text-slate-700 font-medium">
                                                    <span className={cn("text-lg mt-0.5", primaryColor)}>▹</span>
                                                    <span className="leading-snug">{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Integrated Row for Education & Projects */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-12 border-t border-slate-100">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <GraduationCap className="w-5 h-5 text-slate-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Academic Foundation</h2>
                            </div>
                            <div className="flex flex-col gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{edu.degree}</div>
                                        <div className="text-md font-bold text-slate-500 uppercase tracking-widest">{edu.institutionName}</div>
                                        <div className="text-[11px] font-black text-slate-300 tabular-nums uppercase mt-2">
                                            {edu.startYear} — {edu.endYear}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects - Compact Cards */}
                    {projects && projects.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <Code className="w-5 h-5 text-slate-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Key Projects</h2>
                            </div>
                            <div className="flex flex-col gap-6">
                                {projects.map((project, i) => (
                                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{project.projectName}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed italic mb-4 opacity-80">{project.description}</p>
                                        {project.toolsUsed && project.toolsUsed.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.toolsUsed.map((tool, t) => (
                                                    <span key={t} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg">
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Final Row for Certifications & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-12 border-t border-slate-100">
                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <Award className="w-5 h-5 text-slate-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Professional Recognition</h2>
                            </div>
                            <div className="flex flex-col gap-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className={cn("w-2 h-2 rounded-full", primaryBg)} />
                                        <div className="flex flex-col">
                                            <div className="text-md font-bold text-slate-800">{cert.certificationName}</div>
                                            <div className="text-xs text-slate-400 font-black uppercase tracking-widest">{cert.issuingOrganization}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <Languages className="w-5 h-5 text-slate-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Linguistic Range</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {languages.map((lang, i) => (
                                    <div key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 shadow-sm flex items-center gap-3">
                                        {lang.languageName}
                                        <span className="text-slate-300 bg-slate-50 px-2 py-0.5 rounded text-[9px]">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    )
}
