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
            <header className={cn('p-12 flex flex-col md:flex-row justify-between items-start md:items-center text-white relative overflow-hidden shrink-0', accentColor)}>
                <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
                    <Construction className="w-80 h-80 -rotate-12" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-3">{personalInfo?.fullName}</h1>
                    <p className="text-2xl font-bold uppercase tracking-[0.2em] text-white/80 mb-8">{personalInfo?.professionalTitle || "Skilled Trade Professional"}</p>
                    <div className="flex flex-wrap gap-x-12 gap-y-4 text-xs font-black uppercase tracking-widest text-white/70">
                        {personalInfo?.location && <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> {personalInfo.location}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-3"><Phone className="w-4 h-4" /> {personalInfo.phone}</div>}
                        {personalInfo?.email && <div className="flex items-center gap-3"><Mail className="w-4 h-4" /> <span className="lowercase">{personalInfo.email}</span></div>}
                    </div>
                </div>
                <div className="mt-10 md:mt-0 px-8 py-6 bg-black/30 rounded-3xl backdrop-blur-md border border-white/20 flex items-center gap-6 relative z-10 shrink-0 shadow-2xl">
                    <div className="p-4 bg-white/20 rounded-2xl">
                        <HardHat className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">Status</div>
                        <div className="text-lg font-black uppercase tracking-tight text-white leading-none">Ready for Duty</div>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-12 space-y-16">
                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-8 flex items-center gap-4">
                            <ClipboardList className="w-5 h-5 text-orange-600" /> Operational Overview
                        </h2>
                        <p className="text-[18px] leading-relaxed text-neutral-800 font-black border-l-8 pl-10 border-neutral-100 italic">
                            &quot;{professionalSummary.summaryText}&quot;
                        </p>
                    </section>
                )}

                {/* Performance History */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-12 flex items-center gap-4">
                            <Hammer className="w-5 h-5 text-orange-600" /> Professional Experience
                        </h2>
                        <div className="space-y-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group relative pl-12 border-l-4 border-neutral-100 last:border-0 pb-12 last:pb-0">
                                    <div className={cn("absolute -left-[14px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-md", accentColor)} />
                                    
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
                                        <div className="flex items-center gap-2 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">
                                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                                        </div>
                                    )}

                                    {job.roleDescription && <p className="text-[15px] text-neutral-700 leading-relaxed mb-6 font-bold">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-4 text-[14px] text-neutral-700 leading-snug p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                                    <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0" />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t-[8px] border-neutral-100 pt-16">
                    {/* Equipment & Tech Proficiency */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-10 flex items-center gap-4">
                                <Tool className="w-5 h-5 text-orange-600" /> Technical Arsenal
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-6 py-3 bg-neutral-900 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Training */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-10 flex items-center gap-4">
                                <ShieldCheck className="w-5 h-5 text-orange-600" /> Credentials
                            </h2>
                            <div className="space-y-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="p-6 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
                                        <div className="font-black text-sm uppercase tracking-tight mb-2 text-neutral-900">{cert.certificationName}</div>
                                        <div className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] mb-4">{cert.issuingOrganization}</div>
                                        {cert.issueYear && <div className="text-[10px] font-black text-orange-600 tabular-nums uppercase border-t border-neutral-200 pt-3">Valid Since {cert.issueYear}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Project Showcase */}
                {projects && projects.length > 0 && (
                    <section className="bg-neutral-900 text-white p-12 rounded-[40px] shadow-2xl">
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-white/30 mb-12 flex items-center gap-4">
                            <Ruler className="w-5 h-5 text-orange-500" /> Signature Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {projects.map((proj, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-black text-2xl uppercase tracking-tighter group-hover:text-orange-500 transition-colors leading-none">{proj.projectName}</h3>
                                        <div className="text-[10px] font-black uppercase text-white/40">{proj.startDate} {proj.endDate && `— ${proj.endDate}`}</div>
                                    </div>
                                    <p className="text-[14px] leading-relaxed font-bold opacity-70 mb-6">{proj.description}</p>
                                    {proj.outcomes && <div className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">{proj.outcomes}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Training / Apprenticeship */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-300 mb-10">Vocational Foundation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
