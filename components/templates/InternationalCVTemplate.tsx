import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Globe, Plane, Award, MapPin, Mail, Phone, Linkedin, User, Calendar, Flag } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function InternationalCVTemplate({ data, className, accentColor = 'bg-blue-900 border-blue-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, languages, skills, education } = data
    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm text-neutral-900 flex flex-col', className)}>
            {/* High Impact Header */}
            {/* Simple Header for ATS */}
            <header className={cn('p-12 border-b-8', accentColor.split(' ')[0].replace('bg-', 'border-'))}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-neutral-900">{personalInfo?.fullName}</h1>
                    <p className="text-xl font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6">{personalInfo?.professionalTitle || "Global Professional"}</p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-widest text-neutral-400">
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
                    </div>
                </div>
            </header>

            <main className="flex-1 p-12 space-y-12">
                {/* Profile Section */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-300 mb-6">
                            Executive Profile
                        </h2>
                        <p className="text-[16px] leading-relaxed text-neutral-700 font-medium border-l-4 pl-8 border-neutral-100">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-300 mb-10">
                            Professional Experience
                        </h2>
                        <div className="space-y-10">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group border-b border-neutral-50 pb-10 last:border-0">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-2xl font-black text-neutral-900 tracking-tight uppercase leading-none">{job.jobTitle}</h3>
                                            <div className="text-lg font-bold text-blue-900 uppercase tracking-wide">{job.companyName}</div>
                                        </div>
                                        <div className="text-xs font-black text-neutral-400 tabular-nums uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>
                                    
                                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">
                                        {job.location || "Global Operations"}
                                    </div>

                                    {job.roleDescription && <p className="text-[14px] text-neutral-600 leading-relaxed mb-6 font-medium italic opacity-80">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="grid grid-cols-1 gap-4 ml-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-4 text-[14px] text-neutral-800 leading-relaxed font-bold items-start group-hover:translate-x-1 transition-transform">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-2.5 shrink-0" />
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

                {/* Integrated Skills & Languages Grid for space efficiency but single column parsing */}
                <div className="flex flex-col gap-12 border-t border-neutral-100 pt-12">
                    {/* Multilingual Proficiency */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-300 mb-8">
                                Languages
                            </h2>
                            <div className="space-y-4">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs font-black uppercase tracking-widest max-w-sm border-b border-neutral-50 pb-2">
                                        <span className="text-neutral-800">{lang.languageName}</span>
                                        <span className="text-blue-900">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Key Competencies */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-300 mb-8">
                                Core Expertise
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {skills.map((skill, i) => (
                                    <span key={i} className="text-neutral-800 font-black uppercase tracking-widest text-sm">
                                        • {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Education Section */}
                {education && education.length > 0 && (
                    <section className="bg-neutral-50 p-10 rounded-3xl border border-neutral-100">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-300 mb-10">Education</h2>
                        <div className="flex flex-col gap-10">
                            {education.map((edu, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] mb-2">{edu.endYear}</div>
                                    <h3 className="font-black text-xl text-neutral-900 uppercase leading-tight mb-1 tracking-tighter">{edu.institutionName}</h3>
                                    <div className="text-[13px] font-bold text-neutral-500 uppercase tracking-wide">{edu.degree}</div>
                                    {edu.achievements && <p className="text-[12px] text-neutral-400 mt-4 font-medium italic border-t border-neutral-200/50 pt-4 leading-relaxed">{edu.achievements}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
            
            <footer className="p-10 text-center text-[11px] font-black uppercase tracking-[1em] text-neutral-300 border-t border-neutral-50 bg-neutral-50/50">
                International Standard CV
            </footer>
        </div>
    )
}
