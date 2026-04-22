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
            {/* Simple Header for ATS */}
            <header className="p-12 border-b-8 shadow-sm flex flex-col gap-6 border-slate-100">
                <div className="flex flex-col gap-2">
                    <h1 className={cn("text-5xl font-black mb-2 tracking-tighter leading-none text-slate-900")}>
                        {personalInfo?.fullName}
                    </h1>
                    <p className="text-xl font-bold uppercase tracking-[0.3em] text-slate-500">
                        {personalInfo?.professionalTitle}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-black uppercase tracking-widest text-slate-400 mt-6">
                        {personalInfo?.email && <div className="lowercase">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                        {personalInfo?.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
                    </div>
                </div>
            </header>

            {/* ── MAIN BODY ── */}
            <main className="p-12 pt-8 flex flex-col gap-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Executive Summary</h2>
                        <p className="text-slate-600 leading-relaxed font-normal text-xl max-w-5xl border-l-4 border-slate-100 pl-8">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Integrated Expertise Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Core Expertise</h2>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((skill, i) => (
                                <div key={i} className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:border-slate-300 transition-all">
                                    {skill.skillName}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Professional Experience</h2>
                        <div className="flex flex-col gap-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className="border-l-4 border-slate-100 pl-10 pb-12 last:pb-0">

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
                                        <ul className="list-disc ml-6 space-y-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[15px] text-slate-700 font-medium leading-snug pl-2">
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

                {/* Integrated Row for Education & Projects */}
                {/* Integrated Row for Education & Projects */}
                <div className="flex flex-col gap-16 pt-12 border-t border-slate-100">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Academic Foundation</h2>
                            <div className="flex flex-col gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-2 border-l-4 border-slate-100 pl-8">
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

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Key Projects</h2>
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
                {/* Row for Certifications & Languages */}
                <div className="flex flex-col gap-16 pt-12 border-t border-slate-100">
                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Professional Recognition</h2>
                            <div className="flex flex-col gap-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="flex flex-col border-l-4 border-slate-100 pl-4">
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
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Linguistic Range</h2>
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
