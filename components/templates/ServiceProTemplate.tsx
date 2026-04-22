import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import NextImage from 'next/image'
import { User, Mail, Phone, MapPin, Star, Award, CheckCircle2 } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ServiceProTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        languages,
        achievements,
        additionalInfo
    } = data

    const getBgColor = () => {
        if (accentColor.includes('slate')) return 'bg-slate-900'
        if (accentColor.includes('teal')) return 'bg-teal-700'
        if (accentColor.includes('orange')) return 'bg-orange-600'
        if (accentColor.includes('purple')) return 'bg-purple-700'
        return 'bg-slate-900'
    }

    const bgColor = getBgColor()

    return (
        <div className={cn("w-full bg-white min-h-[297mm] text-slate-900 font-sans leading-relaxed flex flex-col p-12", className)}>
            <div className="border-[6px] border-slate-900 flex-1 flex flex-col">
                {/* Header Section: Integrated Identity */}
                {/* Header Section: Integrated Identity */}
                <header className="flex flex-col border-b-[6px] border-slate-900">
                    <div className="flex-1 p-12 flex flex-col justify-center">
                        <h1 className="text-7xl font-black tracking-tighter mb-4 leading-none uppercase">
                            {personalInfo?.fullName}
                        </h1>
                        <div className={cn("inline-block px-8 py-3 text-white text-2xl font-black uppercase tracking-[0.2em] shadow-xl", bgColor)}>
                            {personalInfo?.professionalTitle}
                        </div>

                        <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4 text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                            {personalInfo?.email && <div className="lowercase truncate shrink-0 max-w-[250px]">{personalInfo.email}</div>}
                            {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                            {(personalInfo?.city || personalInfo?.country) && <div>{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-12 space-y-20">
                    {/* About Section - Full Width */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-10 flex items-center gap-6">
                                Strategic Overview <div className="flex-1 h-px bg-slate-200" />
                            </h2>
                            <p className="text-2xl text-slate-900 font-black leading-snug italic border-l-[12px] pl-12 border-slate-100 italic">
                                &quot;{professionalSummary.summaryText}&quot;
                            </p>
                        </section>
                    )}

                    {/* Core Skills - Linearized for ATS */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-12 flex items-center gap-6">
                                Professional Arsenal <div className="flex-1 h-px bg-slate-200" />
                            </h2>
                            <div className="flex flex-col gap-8">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-950">
                                            <span>{skill.skillName}</span>
                                            <span className="opacity-30">{skill.proficiencyLevel}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Work History - Strong Vertical Stack */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-16 flex items-center gap-6">
                                Performance Journey <div className="flex-1 h-px bg-slate-200" />
                            </h2>
                            <div className="space-y-20">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="group relative">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 gap-6 border-b-4 border-slate-900 pb-8">
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">{job.jobTitle}</h3>
                                                <div className="text-2xl font-black text-slate-400 uppercase tracking-widest italic">{job.companyName}</div>
                                            </div>
                                            <div className="text-xs font-black text-white px-8 py-3 bg-slate-900 rounded-lg tabular-nums uppercase tracking-widest">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </div>
                                        </div>
                                        
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="list-disc ml-8 mt-12 space-y-6">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-lg font-black text-slate-700 leading-snug tracking-tight pl-2">
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

                    {/* Integrated Certifications & Academic Grid */}
                    {/* Integrated Certifications & Academic Stack */}
                    <div className="flex flex-col gap-20 pt-16 border-t-[12px] border-slate-200">
                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-10">Credentials & Awards</h2>
                                <div className="space-y-8">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="flex gap-6 items-start p-8 bg-slate-50 border-2 border-slate-900">
                                            <div>
                                                <div className="text-xl font-black leading-tight uppercase tracking-tight mb-2">{cert.certificationName}</div>
                                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-loose">{cert.issuingOrganization}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {education && education.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-300 mb-10">Foundational Training</h2>
                                <div className="space-y-12">
                                    {education.map((edu, i) => (
                                        <div key={i} className="relative pl-12 border-l-8 border-slate-900">
                                            <div className="text-2xl font-black uppercase tracking-tighter leading-none mb-3">{edu.institutionName}</div>
                                            <div className="text-lg font-black text-slate-400 uppercase italic mb-4">{edu.degree}</div>
                                            <div className="text-[11px] font-black text-slate-300 tabular-nums tracking-[0.4em] uppercase">Graduated {edu.endYear}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>

                <footer className="p-12 text-center text-[10px] font-black uppercase tracking-[1.5em] text-slate-200 bg-slate-900 mt-auto">
                    Service Professional Grade Portfolio
                </footer>
            </div>
        </div>
    )
}
