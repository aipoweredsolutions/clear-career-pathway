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

            <div className="flex flex-1">
                {/* Main Content Column */}
                <main className="flex-[1.8] p-8 pt-5 flex flex-col gap-6 border-r border-slate-100">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={cn("w-1.5 h-6 rounded-full", primaryBg)} />
                                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Profile</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed font-normal text-lg">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={cn("w-1.5 h-6 rounded-full", primaryBg)} />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Experience</h2>
                            </div>
                            <div className="flex flex-col gap-8">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="relative pl-8">
                                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-slate-200 border-2 border-white" />
                                        {i !== workExperience.length - 1 && (
                                            <div className="absolute left-[5.5px] top-4 bottom-[-32px] w-[1px] bg-slate-100" />
                                        )}

                                        <div className="flex flex-col gap-1 mb-3">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="text-xl font-bold text-slate-900">{job.jobTitle}</h3>
                                                <span className="text-xs font-black text-slate-300 tabular-nums uppercase">
                                                    {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-md font-bold text-slate-500">{job.companyName}</span>
                                                {job.location && <span className="text-xs text-slate-300">• {job.location}</span>}
                                            </div>
                                        </div>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            {job.roleDescription}
                                        </p>

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-2">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="flex gap-3 text-sm text-slate-600">
                                                        <span className="text-slate-300 mt-1">•</span>
                                                        <span>{ach.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={cn("w-1.5 h-6 rounded-full", primaryBg)} />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Key Projects</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                {projects.map((project, i) => (
                                    <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-slate-900">{project.projectName}</h3>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Code className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{project.description}</p>
                                        {project.toolsUsed && project.toolsUsed.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.toolsUsed.map((tool, t) => (
                                                    <span key={t} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white border border-slate-200 text-slate-500 rounded-md">
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
                </main>

                {/* Sidebar Column */}
                <aside className="flex-1 p-10 pt-8 bg-slate-50/50 flex flex-col gap-10">
                    {/* Social/Links */}
                    {(personalInfo?.linkedinUrl || personalInfo?.websiteUrl) && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Connect</h2>
                            <div className="flex flex-col gap-3">
                                {personalInfo.linkedinUrl && (
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                        <Linkedin className="w-4 h-4 text-slate-400" />
                                        <span>LinkedIn Profile</span>
                                    </div>
                                )}
                                {personalInfo.websiteUrl && (
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                        <Globe className="w-4 h-4 text-slate-400" />
                                        <span>Portfolio</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Expertise/Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="w-4 h-4 text-slate-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Expertise</h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-700">{skill.skillName}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full transition-all duration-1000", primaryBg)} style={{ width: i % 3 === 0 ? '95%' : i % 3 === 1 ? '85%' : '90%' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <GraduationCap className="w-4 h-4 text-slate-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Education</h2>
                            </div>
                            <div className="flex flex-col gap-6">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight mb-1">{edu.degree}</div>
                                        <div className="text-sm font-bold text-slate-600">{edu.institutionName}</div>
                                        <div className="text-xs font-black text-slate-300 tabular-nums uppercase mt-1">
                                            {edu.startYear} — {edu.endYear}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Award className="w-4 h-4 text-slate-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Recognition</h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="text-sm font-bold text-slate-700">{cert.certificationName}</div>
                                        <div className="text-xs text-slate-500 font-medium">{cert.issuingOrganization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Languages className="w-4 h-4 text-slate-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Languages</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((lang, i) => (
                                    <div key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600">
                                        {lang.languageName} <span className="text-slate-300">({lang.proficiencyLevel})</span>
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
