import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Home, Key, TrendingUp, Handshake, MapPin, ExternalLink, Globe, Award as CertIcon } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function RealEstateProTemplate({ data, className, accentColor = 'bg-stone-900 border-stone-800' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications, projects, languages, achievements, customSections, professionalAffiliations } = data

    // Sophisticated, professional layout for real estate & property management. 
    // Uses stone/neutral tones, sleek typography, and emphasizes transactions/metrics.
    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm text-stone-950 flex flex-col', className)}>
            {/* Header: Luxury Branding */}
            {/* Simple Header for ATS */}
            <header className={cn('px-12 py-12 border-b-8', accentColor.split(' ')[0].replace('bg-', 'border-'))}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-stone-900">{personalInfo?.fullName}</h1>
                    <p className="text-xl font-bold uppercase tracking-[0.2em] text-stone-500 mb-8">{personalInfo?.professionalTitle || "Licensed Real Estate Professional"}</p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-black uppercase tracking-[0.4em] text-stone-400">
                        {personalInfo?.location && <div>{personalInfo.location}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.email && <div className="lowercase">{personalInfo.email}</div>}
                        {personalInfo?.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
                    </div>
                </div>
            </header>

            <main className="flex-1 p-12 space-y-20">
                {/* Market Perspective / Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-8">
                            Market Perspective
                        </h2>
                        <p className="text-2xl font-light leading-relaxed text-stone-700 italic border-l-4 border-stone-100 pl-8">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Performance History */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-16">
                            Transactional Portfolio
                        </h2>
                        <div className="space-y-20">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group relative">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 gap-6 border-b border-stone-100 pb-8">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-4xl font-extralight text-stone-900 tracking-widest uppercase italic leading-none">{job.jobTitle}</h3>
                                            <div className="text-xl font-bold text-stone-400 uppercase tracking-widest">
                                                {job.companyName}
                                            </div>
                                        </div>
                                        <div className="text-xs font-black text-stone-300 px-8 py-3 bg-stone-900 rounded-full tabular-nums uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.location && <div className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em] mb-8">{job.location}</div>}
                                    
                                    {job.roleDescription && <p className="text-lg text-stone-600 font-medium mb-10 leading-relaxed italic max-w-4xl">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc ml-8 space-y-4 mt-8">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[15px] font-bold text-stone-800 leading-relaxed italic pl-2">
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

                {/* Integrated Skills & Metrics Grid */}
                <div className="flex flex-col gap-20 pt-16 border-t-[12px] border-stone-50">
                    {/* Performance Metrics */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-12">Key Performance Metrics</h2>
                            <div className="flex flex-col gap-10">
                                {achievements.map((ach, i) => (
                                    <div key={i} className="flex flex-col border-l-4 border-stone-900 pl-8">
                                        <div className="text-4xl font-extralight text-stone-900 tracking-tighter leading-none mb-3 tabular-nums">{ach.achievementTitle}</div>
                                        <div className="text-sm font-bold text-stone-400 uppercase tracking-widest leading-loose italic">{ach.description}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Expertise Areas */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-12">Core Capabilities</h2>
                            <div className="flex flex-wrap gap-4">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-6 py-3 bg-white border-2 border-stone-100 text-[11px] font-black uppercase tracking-[0.3em] text-stone-600 rounded-xl">
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Academic & Licensure Combined */}
                <div className="flex flex-col gap-20">
                    {/* Licensure & Awards */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-12">Licensure & Awards</h2>
                            <div className="flex flex-col gap-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="border-l-4 border-stone-100 pl-8 py-2">
                                        <div className="font-black text-stone-900 text-lg leading-tight uppercase tracking-tight mb-2">{cert.certificationName}</div>
                                        <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">{cert.issuingOrganization} {cert.issueYear && `| ${cert.issueYear}`}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Academic Foundation */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-12">Academic Foundation</h2>
                            <div className="flex flex-col gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="font-black text-stone-900 text-2xl tracking-widest uppercase italic leading-none">{edu.institutionName}</div>
                                        <div className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-4">{edu.degree}{edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ''}</div>
                                        <div className="text-[11px] font-black text-stone-300 tabular-nums tracking-[0.4em]">Completed {edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            
            <footer className="p-16 text-center text-[11px] font-black uppercase tracking-[2em] text-stone-300 border-t border-stone-50 bg-stone-50/30 mt-auto">
                Premium Portfolio Standard
            </footer>
        </div>
    )
}
