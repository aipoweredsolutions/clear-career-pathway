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
            <header className={cn('px-12 py-16 flex flex-col md:flex-row justify-between items-start md:items-end shadow-2xl relative overflow-hidden shrink-0', accentColor)}>
                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                    <Shield className="w-80 h-80 rotate-12" />
                </div>
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-4">{personalInfo?.fullName}</h1>
                    <p className="text-2xl font-bold uppercase tracking-[0.2em] opacity-90 mb-10">{personalInfo?.professionalTitle || "Military Veteran | Strategy & Operations"}</p>
                    
                    <div className="flex flex-wrap gap-x-12 gap-y-4 text-xs font-black uppercase tracking-[0.3em] opacity-80">
                        {personalInfo?.location && <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> {personalInfo.location}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-3"><Phone className="w-4 h-4" /> {personalInfo.phone}</div>}
                        {personalInfo?.email && <div className="flex items-center gap-3 lowercase tracking-tight max-w-[250px] truncate"><Mail className="w-4 h-4" /> {personalInfo.email}</div>}
                    </div>
                </div>
                {personalInfo?.photoUrl && (
                    <div className="hidden md:block w-48 h-48 rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl relative z-10 shrink-0">
                        <Image src={personalInfo.photoUrl} alt={personalInfo.fullName || 'Photo'} fill className="object-cover grayscale" unoptimized={personalInfo.photoUrl.startsWith('data:')} />
                    </div>
                )}
            </header>

            <main className="flex-1 p-12 space-y-16">
                {/* Executive Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-8 flex items-center gap-4">
                            Strategic Profile <div className="flex-1 h-px bg-slate-100" />
                        </h2>
                        <p className="text-xl leading-relaxed text-slate-800 font-bold border-l-8 pl-12 border-slate-100 uppercase tracking-tight">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Core Competencies - Integrated Horizontal Cloud */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-12 flex items-center gap-4">
                            Core Capabilities <div className="flex-1 h-px bg-slate-100" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex flex-col gap-3 group">
                                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 group-hover:text-slate-500 transition-colors">
                                        <span>{skill.skillName}</span>
                                        <span className="opacity-30">{skill.proficiencyLevel}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div 
                                            className={cn("h-full transition-all duration-1000", accentColor.split(' ')[0])} 
                                            style={{ width: `${skill.proficiencyLevel === 'expert' ? '100%' : skill.proficiencyLevel === 'advanced' ? '85%' : skill.proficiencyLevel === 'intermediate' ? '65%' : '40%'}` }} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Service Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-12 flex items-center gap-4">
                            Professional Service <div className="flex-1 h-px bg-slate-100" />
                        </h2>
                        <div className="space-y-16">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group relative pl-16 border-l-4 border-slate-50 last:border-0 pb-16 last:pb-0">
                                    <div className={cn("absolute -left-[14px] top-1 w-6 h-6 rounded-full border-4 border-white shadow-xl transition-transform group-hover:scale-125", accentColor.split(' ')[0])} />
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-6 gap-6">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase leading-none">{job.jobTitle}</h3>
                                            <div className="text-xl font-bold text-slate-500 uppercase tracking-[0.1em] italic">{job.companyName}</div>
                                        </div>
                                        <div className="text-xs font-black text-white px-8 py-3 bg-neutral-900 rounded-lg tabular-nums uppercase tracking-widest whitespace-nowrap">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.location && (
                                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
                                            <MapPin className="w-4 h-4 opacity-50" /> {job.location}
                                        </div>
                                    )}

                                    {job.roleDescription && <p className="text-[15px] text-slate-700 leading-relaxed mb-8 font-black uppercase tracking-tight italic opacity-70 border-b border-slate-50 pb-8">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-4 text-[14px] text-slate-800 leading-relaxed font-bold">
                                                    <Target className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
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

                {/* Secondary Grid for ATS but single column content logic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t-[12px] border-slate-50">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-10">Academic Excellence</h2>
                            <div className="space-y-10">
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
                            <div className="space-y-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-neutral-900 hover:text-white transition-all duration-300 cursor-default">
                                        <div className="font-black text-sm leading-tight mb-2 uppercase tracking-tight">{cert.certificationName}</div>
                                        <div className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em]">{cert.issuingOrganization}</div>
                                        {cert.issueYear && <div className="text-[10px] font-black mt-4 border-t border-slate-200/50 pt-3 opacity-30">Valid Since {cert.issueYear}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Awards & Distinctions - High Impact Reveal */}
                {achievements && achievements.length > 0 && (
                    <section className="bg-slate-50 p-12 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-12">Service Awards & Distinctions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className={cn("p-4 rounded-2xl shrink-0 shadow-lg", accentColor.split(' ')[0])}>
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-900 text-lg tracking-tighter uppercase leading-none mb-2">{ach.achievementTitle}</div>
                                        <div className="text-[11px] font-black text-slate-400 mb-4 uppercase tracking-widest">{ach.issuingBody} {ach.year && `| ${ach.year}`}</div>
                                        {ach.description && <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic">{ach.description}</p>}
                                    </div>
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
