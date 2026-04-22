import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { HardHat, Hammer, Construction, ShieldCheck, Ruler, Truck, ClipboardList, PenTool as Tool, MapPin, Phone, Mail } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function TradesProTemplate({ data, className, accentColor = 'bg-orange-600' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications, projects, languages, achievements, customSections, professionalAffiliations } = data

    // Rugged, professional layout for skilled trades (construction, HVAC, electrical, etc.)
    // High visibility for safety certs, equipment, and project highlights.
    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm text-neutral-950 flex flex-col', className)}>
            {/* Header: High Visibility */}
            {/* Simple Header for ATS */}
            <header className={cn('p-12 border-b-8 shadow-sm flex flex-col gap-6', accentColor.replace('bg-', 'border-'))}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-neutral-900">{personalInfo?.fullName}</h1>
                    <p className="text-xl font-bold uppercase tracking-[0.2em] text-neutral-500 mb-8">{personalInfo?.professionalTitle || "Skilled Trade Professional"}</p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-black uppercase tracking-widest text-neutral-400 mt-6">
                        {personalInfo?.email && <div className="lowercase">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                        {personalInfo?.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
                    </div>
                </div>
            </header>

            <main className="flex-1 p-12 space-y-16">
                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-8">
                            Operational Overview
                        </h2>
                        <p className="text-[18px] leading-relaxed text-neutral-800 font-black border-l-8 pl-10 border-neutral-100 italic">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Performance History */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-12">
                            Professional Experience
                        </h2>
                        <div className="space-y-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group border-l-4 border-neutral-100 pl-12 pb-12 last:pb-0">
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase leading-none">{job.jobTitle}</h3>
                                            <div className="text-xl font-bold text-neutral-500 uppercase tracking-wide italic">{job.companyName}</div>
                                        </div>
                                        <div className="text-xs font-black text-white px-6 py-2 bg-neutral-900 rounded-lg tabular-nums uppercase tracking-widest whitespace-nowrap">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>
                                    
                                    {job.location && (
                                        <div className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">
                                            {job.location}
                                        </div>
                                    )}

                                    {job.roleDescription && <p className="text-[15px] text-neutral-700 leading-relaxed mb-6 font-bold">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc ml-8 space-y-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 leading-snug pl-2">
                                                    <span className="font-bold opacity-90">{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Integrated Skills & Certs Grid */}
                {/* Integrated Skills & Certs Stack */}
                <div className="flex flex-col gap-16 border-t-[8px] border-neutral-100 pt-16">
                    {/* Equipment & Tech Proficiency */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-10">
                                Technical Arsenal
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-5 py-2.5 border-2 border-neutral-100 text-[11px] font-black uppercase tracking-widest rounded-xl text-neutral-900">
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Training */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-10">
                                Credentials
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="p-6 border-2 border-neutral-100 rounded-3xl">
                                        <div className="font-black text-sm uppercase tracking-tight mb-2 text-neutral-900">{cert.certificationName}</div>
                                        <div className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] mb-4">{cert.issuingOrganization}</div>
                                        {cert.issueYear && <div className="text-[10px] font-black text-orange-600 tabular-nums uppercase border-t border-neutral-100 pt-3">Valid Since {cert.issueYear}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Project Showcase */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-neutral-300 mb-12">
                            Signature Projects
                        </h2>
                        <div className="flex flex-col gap-12">
                            {projects.map((proj, i) => (
                                <div key={i} className="border-l-4 border-neutral-900 pl-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                                        <h3 className="font-black text-2xl uppercase tracking-tighter text-neutral-900 leading-none">{proj.projectName}</h3>
                                        <div className="text-[10px] font-black uppercase text-neutral-300">{proj.startDate} {proj.endDate && `— ${proj.endDate}`}</div>
                                    </div>
                                    <p className="text-[14px] leading-relaxed font-bold opacity-70 mb-6">{proj.description}</p>
                                    {proj.outcomes && <div className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600">{proj.outcomes}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Vocational Foundation */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-10">Vocational Foundation</h2>
                        <div className="flex flex-col gap-12">
                            {education.map((edu, i) => (
                                <div key={i} className="border-l-4 border-orange-600 pl-8">
                                    <h3 className="font-black text-xl uppercase tracking-tight mb-2">{edu.institutionName}</h3>
                                    <div className="text-[13px] font-bold text-neutral-500 italic mb-4 uppercase">{edu.degree}</div>
                                    <div className="text-[11px] font-black text-neutral-400 tabular-nums uppercase tracking-widest">{edu.endYear} Completion</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
            
            <footer className="p-12 text-center text-[11px] font-black uppercase tracking-[0.8em] text-neutral-300 border-t border-neutral-100 bg-neutral-50/30 flex flex-wrap items-center justify-center gap-12">
                <span>Heavy Duty Build</span>
                <span className="w-2 h-2 rounded-full bg-orange-600" />
                <span>Professional Grade Performance</span>
            </footer>
        </div>
    )
}
