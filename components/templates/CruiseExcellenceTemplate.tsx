import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Anchor, MapPin, Mail, Phone, Globe, Linkedin, ShieldCheck, Ship } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function CruiseExcellenceTemplate({ data, className, accentColor = 'text-sky-800' }: TemplateProps) {
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
        if (accentColor.includes('sky')) return 'bg-sky-800'
        if (accentColor.includes('blue')) return 'bg-blue-900'
        if (accentColor.includes('coral')) return 'bg-rose-500'
        if (accentColor.includes('navy')) return 'bg-slate-900'
        return 'bg-sky-800'
    }

    const bgColor = getBgColor()

    return (
        <div className={cn("w-full bg-white aspect-[210/297] text-slate-900 font-sans leading-relaxed flex flex-col", className)}>
            {/* Split Header */}
            <header className="flex h-64 border-b-2 border-slate-100">
                <div className="w-1/3 bg-slate-50 flex items-center justify-center p-8 overflow-hidden">
                    {personalInfo?.photoUrl ? (
                        <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden">
                            <img
                                src={personalInfo.photoUrl}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-48 h-48 rounded-full bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
                            <Ship className="w-12 h-12 mb-2" />
                            <span className="text-[10px] uppercase font-bold">Officer Photo</span>
                        </div>
                    )}
                </div>
                <div className="flex-1 p-12 flex flex-col justify-center bg-white relative overflow-hidden">
                    <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-5 translate-x-10 -translate-y-10", accentColor)}>
                        <Anchor className="w-full h-full" />
                    </div>
                    <h1 className={cn("text-5xl font-black tracking-tighter mb-2 italic", accentColor)}>
                        {personalInfo?.fullName || 'Root User'}
                    </h1>
                    <p className="text-xl font-bold text-slate-400 tracking-widest uppercase mb-4">
                        {personalInfo?.professionalTitle || 'Maritime Professional'}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-500">
                        {personalInfo?.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {personalInfo.email}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {personalInfo.phone}</div>}
                        {(personalInfo?.city || personalInfo?.country) && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 min-h-0">
                {/* Main Content */}
                <main className="flex-1 p-12 flex flex-col gap-10 overflow-hidden border-r border-slate-100">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3", accentColor)}>
                                <div className={cn("w-2 h-2 rounded-full", bgColor)} />
                                Professional Profile
                            </h2>
                            <p className="text-slate-600 font-medium">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section className="flex flex-col gap-6">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-2 flex items-center gap-3", accentColor)}>
                                <div className={cn("w-2 h-2 rounded-full", bgColor)} />
                                Maritime & Hospitality History
                            </h2>
                            <div className="flex flex-col gap-8">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                                        <div className={cn("absolute top-0 -left-[9px] w-4 h-4 rounded-full border-2 border-white shadow-sm", bgColor)} />
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-xl font-bold text-slate-900">{job.jobTitle}</h3>
                                            <span className="text-xs font-black text-slate-400 tabular-nums bg-slate-50 px-2 py-1 rounded">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-sky-600 mb-3">{job.companyName}</div>
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-1.5">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-sm text-slate-600 flex gap-2">
                                                        <span className="text-slate-300">•</span>
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
                </main>

                {/* Sidebar */}
                <aside className="w-80 bg-slate-50/50 p-10 flex flex-col gap-10">
                    {/* Specialized Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6", accentColor)}>
                                Specialized Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 shadow-sm">
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Maritime Certs */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6", accentColor)}>
                                Licensure & Certs
                            </h2>
                            <div className="space-y-4">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex gap-3">
                                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-800 leading-tight">{cert.certificationName}</div>
                                            <div className="text-[11px] text-slate-500 font-medium uppercase mt-1">{cert.issuingOrganization}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages - CRITICAL for Cruise */}
                    {languages && languages.length > 0 && (
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6", accentColor)}>
                                Language Matrix
                            </h2>
                            <div className="space-y-4">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-700">{lang.languageName}</span>
                                        <span className={cn("text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white", bgColor)}>
                                            {lang.proficiencyLevel}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6", accentColor)}>
                                Academic History
                            </h2>
                            <div className="space-y-5">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="text-sm font-bold text-slate-800">{edu.institutionName}</div>
                                        <div className="text-xs text-slate-500 font-medium mt-1">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>
            </div>

            {/* Nautical Footer */}
            <footer className={cn("h-1 flex items-center justify-between px-12", bgColor)}>
                <div className="w-1/4 h-px bg-white/30" />
                <Anchor className="w-4 h-4 text-white/50" />
                <div className="w-1/4 h-px bg-white/30" />
            </footer>
        </div>
    )
}
