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

            <div className="flex-1 grid grid-cols-12 gap-0 relative">
                {/* Vertical Stripe */}
                <div className="absolute top-0 bottom-0 left-[35%] w-px bg-stone-200 hidden md:block" />

                {/* Sidebar: Performance & Stats */}
                <aside className="col-span-4 p-10 space-y-12 bg-stone-50/50">
                    {/* Key Metrics / Highlights */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">Performance Metrics</h2>
                            <div className="space-y-6">
                                {achievements.slice(0, 3).map((ach, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="text-3xl font-extralight text-stone-900 tracking-tighter leading-none mb-1 tabular-nums">{ach.achievementTitle}</div>
                                        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest leading-tight">{ach.description}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Expertise Areas */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">Core Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white border border-stone-200 text-[10px] font-black uppercase tracking-widest text-stone-600 rounded-lg shadow-sm">
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Licensure */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">Licensure & Awards</h2>
                            <div className="space-y-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <CertIcon className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-bold text-stone-900 text-xs leading-snug">{cert.certificationName}</div>
                                            <div className="text-[10px] text-stone-500 font-medium">{cert.issuingOrganization} {cert.issueYear && `| ${cert.issueYear}`}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">Languages</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white p-3 border border-stone-100 rounded-xl shadow-sm">
                                        <span className="font-bold text-xs tracking-tight">{lang.languageName}</span>
                                        <span className="text-[10px] uppercase font-black text-stone-400 tracking-tighter">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content */}
                <main className="col-span-8 p-12 space-y-12">
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section className="relative">
                            <span className="absolute -left-16 top-0 text-7xl font-serif text-stone-100 font-black leading-none italic pointer-events-none">&quot;</span>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">Market Perspective</h2>
                            <p className="text-[15px] font-light leading-relaxed text-stone-700 italic max-w-xl">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Transactional & Professional History */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-10">Professional History</h2>
                            <div className="space-y-12">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-light text-stone-900 tracking-widest uppercase italic">{job.jobTitle}</h3>
                                            <span className="text-xs font-bold text-stone-400 tabular-nums uppercase tracking-tighter">{job.startDate} – {job.isCurrent ? 'Present' : job.endDate}</span>
                                        </div>
                                        <div className="text-sm font-black text-stone-600 mb-4 flex items-center gap-2 border-b border-stone-100 pb-2">
                                            <Home className="w-4 h-4 text-stone-300" />
                                            {job.companyName} {job.location && <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest ml-auto">| {job.location}</span>}
                                        </div>
                                        {job.roleDescription && <p className="text-[13px] text-stone-700 leading-relaxed mb-4 font-medium">{job.roleDescription}</p>}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <div className="grid grid-cols-2 gap-4 mt-6">
                                                {job.achievements.map((ach, j) => (
                                                    <div key={j} className="flex gap-3 text-[12px] text-stone-800 leading-snug p-3 bg-stone-50 rounded-lg border border-stone-100 shadow-sm transition-all hover:bg-white hover:border-stone-200">
                                                        <TrendingUp className="w-4 h-4 text-stone-400 mt-1 shrink-0" />
                                                        <span className="font-medium italic leading-tight">{ach.achievementText}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Academic Foundation */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">Academic Foundation</h2>
                            <div className="grid grid-cols-2 gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="font-black text-stone-900 text-sm tracking-widest uppercase italic">{edu.institutionName}</div>
                                        <div className="text-xs font-bold text-stone-500 italic mb-1">{edu.degree}{edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ''}</div>
                                        <div className="text-[11px] font-black text-stone-300 tabular-nums tracking-[0.2em]">{edu.endYear}</div>
                                        {edu.achievements && <p className="text-[11px] text-stone-400 mt-2 font-medium">{edu.achievements}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
            
            <footer className="p-10 text-center text-[10px] font-black uppercase tracking-[0.8em] text-stone-300 border-t border-stone-100">
                Premium Real Estate Portfolio
            </footer>
        </div>
    )
}
