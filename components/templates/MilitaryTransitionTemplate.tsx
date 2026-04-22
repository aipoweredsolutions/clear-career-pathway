import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Shield, Target, Award, MapPin, ExternalLink, Globe, Award as CertIcon, Phone, Mail } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function MilitaryTransitionTemplate({ data, className, accentColor = 'bg-slate-900 text-white' }: TemplateProps) {
    const { personalInfo, professionalSummary, skills, workExperience, education, certifications, achievements } = data
    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm text-slate-950 flex flex-col', className)}>
            {/* Header: High Contrast & Authoritative */}
            {/* Simple Header for ATS */}
            <header className={cn('px-12 py-12 border-b-8', accentColor.split(' ')[0].replace('bg-', 'border-'))}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-slate-900">{personalInfo?.fullName}</h1>
                    <p className="text-xl font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">{personalInfo?.professionalTitle || "Military Veteran | Strategy & Operations"}</p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.email && <div className="lowercase">{personalInfo.email}</div>}
                    </div>
                </div>
            </header>

            <main className="flex-1 p-12 space-y-16">
                {/* Executive Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-8">
                            Strategic Profile
                        </h2>
                        <p className="text-xl leading-relaxed text-slate-800 font-bold border-l-8 pl-12 border-slate-100 uppercase tracking-tight">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Core Competencies */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-12">
                            Core Capabilities
                        </h2>
                        <div className="flex flex-wrap gap-x-12 gap-y-6">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex flex-col gap-1 min-w-[150px]">
                                    <div className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900">
                                        {skill.skillName}
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        {skill.proficiencyLevel}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Service Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-12">
                            Professional Service
                        </h2>
                        <div className="space-y-16">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group border-l-4 border-slate-100 pl-12 pb-16 last:pb-0">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase leading-none">{job.jobTitle}</h3>
                                            <div className="text-xl font-bold text-slate-500 uppercase tracking-[0.1em] italic">{job.companyName}</div>
                                        </div>
                                        <div className="text-xs font-black text-slate-400 tabular-nums uppercase tracking-widest whitespace-nowrap">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.location && (
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
                                            {job.location}
                                        </div>
                                    )}

                                    {job.roleDescription && <p className="text-[15px] text-slate-700 leading-relaxed mb-8 font-black uppercase tracking-tight italic opacity-70">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc ml-6 space-y-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[14px] text-slate-800 leading-relaxed font-bold pl-2">
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

                {/* Secondary Grid for ATS but single column content logic */}
                <div className="flex flex-col gap-16 pt-16 border-t-[12px] border-slate-50">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-10">Education</h2>
                            <div className="flex flex-col gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="font-black text-slate-900 text-xl leading-tight uppercase tracking-tighter">{edu.institutionName}</div>
                                        <div className="text-sm font-bold text-slate-500 uppercase italic mb-4">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
                                        <div className="text-[11px] font-black text-slate-300 tabular-nums uppercase tracking-widest">Completed {edu.endYear}</div>
                                        {edu.achievements && <p className="text-[12px] text-slate-400 mt-4 italic font-medium leading-relaxed">{edu.achievements}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-10">Professional Credentials</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="p-6 border-2 border-slate-100 rounded-3xl">
                                        <div className="font-black text-sm leading-tight mb-2 uppercase tracking-tight text-slate-900">{cert.certificationName}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{cert.issuingOrganization}</div>
                                        {cert.issueYear && <div className="text-[10px] font-black mt-4 border-t border-slate-100 pt-3 text-slate-300">Valid Since {cert.issueYear}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Awards & Distinctions */}
                {achievements && achievements.length > 0 && (
                    <section className="bg-slate-50 p-12 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-12">Service Awards & Distinctions</h2>
                        <div className="flex flex-col gap-10">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="font-black text-slate-900 text-lg tracking-tighter uppercase leading-none">{ach.achievementTitle}</div>
                                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{ach.issuingBody} {ach.year && `| ${ach.year}`}</div>
                                    {ach.description && <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic">{ach.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
            
            <footer className={cn("p-12 text-center text-[12px] font-black uppercase tracking-[1.5em] opacity-30 border-t border-slate-100 mt-auto bg-slate-50/50", accentColor.includes('white') ? 'text-white' : 'text-slate-900')}>
                Integrity • Service • Excellence
            </footer>
        </div>
    )
}
