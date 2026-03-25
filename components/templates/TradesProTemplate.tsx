import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { HardHat, Hammer, Construction, ShieldCheck, Ruler, Truck, ClipboardList, PenTool as Tool } from 'lucide-react'

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
            <header className={cn('p-10 flex flex-col md:flex-row justify-between items-start md:items-center text-white relative overflow-hidden', accentColor)}>
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Construction className="w-64 h-64 -rotate-12" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">{personalInfo?.fullName}</h1>
                    <p className="text-xl font-bold uppercase tracking-widest text-white/80 mb-6">{personalInfo?.professionalTitle || "Skilled Trade Professional"}</p>
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-black uppercase tracking-widest text-white/70">
                        {personalInfo?.location && <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white" /> {personalInfo.location}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-2 tracking-tighter">{personalInfo.phone}</div>}
                        {personalInfo?.email && <div className="flex items-center gap-2 lowercase tracking-tight">{personalInfo.email}</div>}
                    </div>
                </div>
                <div className="mt-8 md:mt-0 px-6 py-4 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center gap-4 relative z-10 shrink-0">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <HardHat className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Safety Status</div>
                        <div className="text-sm font-black uppercase tracking-tight text-white leading-none mt-1 shadow-sm">Certified & Compliant</div>
                    </div>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-12 gap-0">
                {/* Content: Experience, Projects, Certs */}
                <main className="col-span-8 p-12 space-y-12">
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 mb-6 flex items-center gap-3">
                                <ClipboardList className="w-4 h-4 text-orange-500" /> Professional Summary
                            </h2>
                            <p className="text-[14px] leading-relaxed text-neutral-700 font-bold">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Trade Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 mb-10 flex items-center gap-3">
                                <Hammer className="w-4 h-4 text-orange-500" /> Work History
                            </h2>
                            <div className="space-y-10">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-black text-neutral-900 tracking-tight leading-none uppercase">{job.jobTitle}</h3>
                                            <span className="text-xs font-black text-white px-3 py-1 rounded-full tabular-nums uppercase tracking-tighter" style={{ backgroundColor: accentColor.includes('orange') ? '#ea580c' : '#171717' }}>{job.startDate} – {job.isCurrent ? 'Present' : job.endDate}</span>
                                        </div>
                                        <div className="text-sm font-black text-neutral-500 mb-4 flex items-center gap-2">
                                            {job.companyName} {job.location && <span className="text-[11px] font-bold opacity-60 uppercase tracking-widest">| {job.location}</span>}
                                        </div>
                                        {job.roleDescription && <p className="text-[13px] text-neutral-800 leading-snug mb-4 font-medium">{job.roleDescription}</p>}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="grid grid-cols-1 gap-2 border-l-4 border-neutral-100 pl-4">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="flex gap-3 text-[13px] text-neutral-700 leading-snug">
                                                        <ShieldCheck className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                                        <span className="font-bold">{ach.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Project Highlights (Crucial for Trades) */}
                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 mb-8 flex items-center gap-3">
                                <Ruler className="w-4 h-4 text-orange-500" /> Key Project Highlights
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {projects.map((proj, i) => (
                                    <div key={i} className="p-6 bg-neutral-50 border border-neutral-200 rounded-3xl group transition-all hover:bg-neutral-900 hover:border-neutral-950 hover:text-white">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="font-black text-base uppercase tracking-tight group-hover:text-orange-400">{proj.projectName}</div>
                                            <div className="text-[10px] font-black uppercase text-neutral-400 group-hover:text-neutral-500">{proj.startDate} {proj.endDate && ` — ${proj.endDate}`}</div>
                                        </div>
                                        <p className="text-[12px] leading-snug font-bold opacity-80 group-hover:opacity-100">{proj.description}</p>
                                        {proj.outcomes && <div className="mt-4 text-[11px] font-black uppercase tracking-widest text-orange-600 group-hover:text-orange-400">{proj.outcomes}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Sidebar: Skills, Equipment, Certs */}
                <aside className="col-span-4 bg-neutral-900 text-white p-10 space-y-12">
                    {/* Equipment & Tech Proficiency */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 flex items-center gap-2">
                                <Tool className="w-4 h-4 text-orange-500" /> Equipment & Tools
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-2 bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors">
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Training */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-orange-500" /> Certifications
                            </h2>
                            <div className="space-y-4">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="group cursor-default">
                                        <div className="font-black text-xs leading-tight mb-1 group-hover:text-orange-400 transition-colors">{cert.certificationName}</div>
                                        <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{cert.issuingOrganization}</div>
                                        {cert.issueYear && <div className="text-[10px] text-orange-500 font-black mt-1 tabular-nums">{cert.issueYear}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education / Apprenticeship */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 flex items-center gap-2">
                                <Truck className="w-4 h-4 text-orange-500" /> Training
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-black text-xs leading-tight uppercase tracking-tight mb-1">{edu.institutionName}</div>
                                        <div className="text-[11px] text-white/60 font-bold italic mb-1">{edu.degree}</div>
                                        <div className="text-[10px] text-orange-500 font-black tabular-nums">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>
            </div>
            
            <footer className="px-10 py-6 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400 border-t border-neutral-100 flex items-center justify-center gap-12">
                <span>Heavy Duty Performance</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span>Professional Craftsmanship</span>
            </footer>
        </div>
    )
}
