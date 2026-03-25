import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Shield, Target, Award, MapPin, ExternalLink, Globe, Award as CertIcon } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function MilitaryTransitionTemplate({ data, className, accentColor = 'bg-slate-900 text-white' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications, projects, languages, achievements, customSections, professionalAffiliations } = data

    // Focus on Military-to-Civilian translation: Unified structure, clear rank/role distinction, 
    // prominence for skills/clearances.
    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm text-slate-950 flex flex-col', className)}>
            {/* Header: High Contrast & Authoritative */}
            <header className={cn('px-10 py-12 flex justify-between items-center shadow-2xl relative overflow-hidden', accentColor)}>
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Shield className="w-48 h-48 rotate-12" />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-3">{personalInfo?.fullName}</h1>
                    <p className="text-lg font-bold uppercase tracking-widest opacity-80 mb-6">{personalInfo?.professionalTitle || "Military Veteran | Leadership & Operations"}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest opacity-70">
                        {personalInfo?.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {personalInfo.location}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-2">{personalInfo.phone}</div>}
                        {personalInfo?.email && <div className="flex items-center gap-2 lowercase tracking-tight">{personalInfo.email}</div>}
                    </div>
                </div>
                {personalInfo?.photoUrl && (
                    <div className="hidden md:block w-32 h-32 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl relative z-10 shrink-0">
                        <Image src={personalInfo.photoUrl} alt={personalInfo.fullName || 'Photo'} fill className="object-cover grayscale" unoptimized={personalInfo.photoUrl.startsWith('data:')} />
                    </div>
                )}
            </header>

            <div className="flex-1 grid grid-cols-12 gap-0">
                {/* Sidebar: Skills & Support */}
                <aside className="col-span-4 bg-slate-50 border-r border-slate-200 p-8 space-y-10">
                    {/* Core Competencies (Civilian Translated) */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                                <Target className="w-4 h-4" /> Core Competencies
                            </h2>
                            <div className="space-y-3">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-800">
                                            <span>{skill.skillName}</span>
                                            {skill.proficiencyLevel && <span className="text-[10px] text-slate-400">{skill.proficiencyLevel}</span>}
                                        </div>
                                        <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                                            <div 
                                                className={cn("h-full", accentColor.split(' ')[0])} 
                                                style={{ width: `${skill.proficiencyLevel === 'expert' ? '100%' : skill.proficiencyLevel === 'advanced' ? '85%' : skill.proficiencyLevel === 'intermediate' ? '65%' : '40%'}` }} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Licensure */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                                <CertIcon className="w-4 h-4" /> Certifications
                            </h2>
                            <div className="space-y-4">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                                        <div className="font-bold text-slate-900 text-[11px] leading-tight mb-1">{cert.certificationName}</div>
                                        <div className="text-[10px] text-slate-500 font-medium">{cert.issuingOrganization}</div>
                                        {cert.issueYear && <div className="text-[10px] text-slate-400 mt-1">{cert.issueYear}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Languages
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl">
                                        <span className="font-bold text-xs">{lang.languageName}</span>
                                        <span className="text-[10px] uppercase font-black text-slate-400">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main: Experience & Achievements */}
                <main className="col-span-8 p-10 space-y-12 bg-white">
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Executive Summary</h2>
                            <p className="text-[13px] leading-relaxed text-slate-700 font-medium">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Service & Professional Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 font-serif">Service & Professional Experience</h2>
                            <div className="space-y-10 relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-slate-100 before:-ml-4">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute top-2 left-0 w-3 h-3 rounded-full border-2 border-slate-300 bg-white -ml-[21px]" />
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">{job.jobTitle}</h3>
                                            <span className="text-xs font-black text-slate-400 tabular-nums lowercase tracking-tighter">{job.startDate} – {job.isCurrent ? 'Present' : job.endDate}</span>
                                        </div>
                                        <div className="text-sm font-bold text-slate-600 mb-4 flex items-center gap-2">
                                            {job.companyName} {job.location && <span className="text-[11px] font-medium opacity-60">| {job.location}</span>}
                                        </div>
                                        {job.roleDescription && <p className="text-[13px] text-slate-700 leading-snug mb-3">{job.roleDescription}</p>}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-2 mb-4">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="flex gap-3 text-[13px] text-slate-800 leading-snug">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
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

                    {/* Education & Scholastic Achievement */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Education & Scholastic Achievement</h2>
                            <div className="grid grid-cols-2 gap-8">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-black text-slate-900 text-sm leading-tight mb-1 uppercase tracking-tight">{edu.institutionName}</div>
                                        <div className="text-xs font-bold text-slate-600 leading-tight mb-1">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
                                        <div className="text-[11px] font-black text-slate-400 tabular-nums lowercase">{edu.endYear}</div>
                                        {edu.achievements && <p className="text-[11px] text-slate-500 mt-2 italic">{edu.achievements}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Awards & Distinctions */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Service Awards & Distinctions</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {achievements.map((ach, i) => (
                                    <div key={i} className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                                        <Award className="w-6 h-6 text-slate-400 shrink-0 mt-1" />
                                        <div>
                                            <div className="font-black text-slate-900 text-sm tracking-tight">{ach.achievementTitle}</div>
                                            {ach.issuingBody && <div className="text-xs font-bold text-slate-500 mb-1">{ach.issuingBody} {ach.year && `| ${ach.year}`}</div>}
                                            {ach.description && <p className="text-[12px] text-slate-600 leading-snug">{ach.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
            
            <footer className={cn("p-6 text-center text-[10px] font-black uppercase tracking-[0.5em] opacity-40 border-t border-slate-100", accentColor.includes('white') ? 'text-white' : 'text-slate-900')}>
                Integrity • Service • Excellence
            </footer>
        </div>
    )
}
