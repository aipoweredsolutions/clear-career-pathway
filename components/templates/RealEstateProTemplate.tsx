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
            <header className={cn('px-10 py-12 flex justify-between items-end border-b-8', accentColor)}>
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-extralight uppercase tracking-widest text-white leading-none mb-4">{personalInfo?.fullName}</h1>
                    <p className="text-xl font-bold uppercase tracking-[0.3em] text-stone-400 mb-8">{personalInfo?.professionalTitle || "Licensed Real Estate Professional"}</p>
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-widest text-stone-300">
                        {personalInfo?.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-stone-500" /> {personalInfo.location}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-2 text-stone-100">{personalInfo.phone}</div>}
                        {personalInfo?.email && <div className="flex items-center gap-2 lowercase tracking-normal text-stone-100">{personalInfo.email}</div>}
                    </div>
                </div>
                {personalInfo?.photoUrl && (
                    <div className="hidden lg:block w-40 h-40 rounded-full overflow-hidden border-8 border-white/10 shadow-2xl skew-x-3 -mr-4 mb-4 grayscale hover:grayscale-0 transition-all duration-700 relative">
                        <Image src={personalInfo.photoUrl} alt={personalInfo.fullName || 'Photo'} fill className="object-cover" unoptimized={personalInfo.photoUrl.startsWith('data:')} />
                    </div>
                )}
            </header>

    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm text-stone-950 flex flex-col', className)}>
            {/* Header: Luxury Branding */}
            <header className={cn('px-12 py-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b-[12px] shadow-2xl shrink-0', accentColor)}>
                <div className="max-w-4xl">
                    <h1 className="text-7xl font-extralight uppercase tracking-[0.2em] text-white leading-none mb-6">{personalInfo?.fullName}</h1>
                    <p className="text-2xl font-bold uppercase tracking-[0.4em] text-stone-400 mb-12">{personalInfo?.professionalTitle || "Licensed Real Estate Professional"}</p>
                    <div className="flex flex-wrap gap-x-12 gap-y-4 text-xs font-black uppercase tracking-[0.4em] text-stone-300 opacity-80">
                        {personalInfo?.location && <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-stone-500" /> {personalInfo.location}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-3 text-stone-100">{personalInfo.phone}</div>}
                        {personalInfo?.email && <div className="flex items-center gap-3 lowercase tracking-normal text-stone-100">{personalInfo.email}</div>}
                    </div>
                </div>
                {personalInfo?.photoUrl && (
                    <div className="hidden lg:block w-56 h-56 rounded-full overflow-hidden border-[12px] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] grayscale hover:grayscale-0 transition-all duration-1000 relative z-10">
                        <Image src={personalInfo.photoUrl} alt={personalInfo.fullName || 'Photo'} fill className="object-cover" unoptimized={personalInfo.photoUrl.startsWith('data:')} />
                    </div>
                )}
            </header>

            <main className="flex-1 p-12 space-y-20">
                {/* Market Perspective / Summary */}
                {professionalSummary?.summaryText && (
                    <section className="relative">
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-12 flex items-center gap-6">
                            Market Perspective <div className="flex-1 h-px bg-stone-100" />
                        </h2>
                        <div className="relative pl-16">
                            <span className="absolute left-0 top-0 text-9xl font-serif text-stone-100 font-black leading-none italic pointer-events-none -mt-4 -ml-4">&quot;</span>
                            <p className="text-2xl font-light leading-relaxed text-stone-700 italic max-w-5xl relative z-10">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    </section>
                )}

                {/* Performance History - Single Column Vertical Journey */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-16 flex items-center gap-6">
                            Transactional Portfolio <div className="flex-1 h-px bg-stone-100" />
                        </h2>
                        <div className="space-y-20">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group relative">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 gap-6 border-b border-stone-100 pb-8">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-4xl font-extralight text-stone-900 tracking-widest uppercase italic leading-none">{job.jobTitle}</h3>
                                            <div className="flex items-center gap-3 text-xl font-bold text-stone-400 uppercase tracking-widest">
                                                <Home className="w-5 h-5 opacity-30" /> {job.companyName}
                                            </div>
                                        </div>
                                        <div className="text-xs font-black text-stone-300 px-8 py-3 bg-stone-900 rounded-full tabular-nums uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.location && <div className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em] mb-8">{job.location}</div>}
                                    
                                    {job.roleDescription && <p className="text-lg text-stone-600 font-medium mb-10 leading-relaxed italic max-w-4xl">{job.roleDescription}</p>}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                            {job.achievements.map((ach, j) => (
                                                <div key={j} className="flex gap-6 p-8 bg-stone-50 rounded-[2rem] border border-stone-100 shadow-sm hover:bg-white hover:border-stone-200 hover:shadow-2xl transition-all duration-500 group/item">
                                                    <TrendingUp className="w-6 h-6 text-stone-300 group-hover/item:text-stone-900 transition-colors shrink-0 mt-1" />
                                                    <span className="text-[15px] font-bold text-stone-800 leading-relaxed italic">{ach.achievementText}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Integrated Skills & Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-16 border-t-[12px] border-stone-50">
                    {/* Performance Metrics */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-12">Key Performance Metrics</h2>
                            <div className="grid grid-cols-1 gap-12">
                                {achievements.map((ach, i) => (
                                    <div key={i} className="flex flex-col border-l-4 border-stone-900 pl-8">
                                        <div className="text-5xl font-extralight text-stone-900 tracking-tighter leading-none mb-3 tabular-nums">{ach.achievementTitle}</div>
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
                                    <span key={i} className="px-8 py-4 bg-white border-2 border-stone-100 text-[11px] font-black uppercase tracking-[0.3em] text-stone-600 rounded-2xl shadow-sm hover:border-stone-900 transition-colors">
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Academic & Licensure Combined */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {/* Licensure & Awards */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-12">Licensure & Awards</h2>
                            <div className="space-y-8">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="p-4 bg-stone-50 rounded-2xl shrink-0 group-hover:bg-stone-900 transition-colors">
                                            <CertIcon className="w-6 h-6 text-stone-300 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <div className="font-black text-stone-900 text-lg leading-tight uppercase tracking-tight mb-2">{cert.certificationName}</div>
                                            <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">{cert.issuingOrganization} {cert.issueYear && `| ${cert.issueYear}`}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Academic Foundation */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-stone-300 mb-12">Academic Foundation</h2>
                            <div className="space-y-12">
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
