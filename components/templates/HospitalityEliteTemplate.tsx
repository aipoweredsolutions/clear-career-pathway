import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Linkedin, Globe, Award, Languages } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function HospitalityEliteTemplate({ data, className, accentColor = 'text-amber-700' }: TemplateProps) {
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

    // Map accentColor to bg color if needed
    const getBgColor = () => {
        if (accentColor.includes('amber')) return 'bg-amber-700'
        if (accentColor.includes('blue')) return 'bg-blue-800'
        if (accentColor.includes('red')) return 'bg-red-900'
        if (accentColor.includes('green')) return 'bg-green-800'
        if (accentColor.includes('slate')) return 'bg-slate-800'
        return 'bg-amber-700'
    }

    const bgColor = getBgColor()

    return (
        <div className={cn("w-full bg-white aspect-[210/297] text-slate-800 font-serif leading-relaxed flex flex-col", className)}>
            {/* Top Bar / Header */}
            <header className="flex border-b-8 border-slate-100">
                <div className="flex-1 p-12 flex flex-col justify-center">
                    <h1 className={cn("text-6xl font-black tracking-tight mb-2 uppercase", accentColor)}>
                        {personalInfo?.fullName || 'Root User'}
                    </h1>
                    <p className="text-2xl font-medium text-slate-500 tracking-[0.2em] uppercase">
                        {personalInfo?.professionalTitle || 'Luxury Hospitality Expert'}
                    </p>
                </div>

                {/* Photo Area */}
                <div className="w-64 bg-slate-50 flex items-center justify-center border-l-8 border-white overflow-hidden relative">
                    {personalInfo?.photoUrl ? (
                        <img
                            src={personalInfo.photoUrl}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center text-slate-300">
                            <div className="w-20 h-20 rounded-full bg-slate-200 mb-2" />
                            <span className="text-[10px] uppercase tracking-widest font-sans font-bold">Photo Placeholder</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Column - Sidebar */}
                <aside className="w-72 bg-slate-50 p-8 flex flex-col gap-10 border-r border-slate-100">
                    {/* Contact */}
                    <section>
                        <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6 pb-2 border-b-2 border-slate-200 font-sans", accentColor)}>
                            Contact
                        </h2>
                        <div className="space-y-4 font-sans text-sm">
                            {personalInfo?.email && (
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                    <span className="break-all">{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo?.phone && (
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {(personalInfo?.city || personalInfo?.country) && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                    <span>{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
                                </div>
                            )}
                            {personalInfo?.linkedinUrl && (
                                <div className="flex items-start gap-3">
                                    <Linkedin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                    <span className="break-all">LinkedIn</span>
                                </div>
                            )}
                            {personalInfo?.websiteUrl && (
                                <div className="flex items-start gap-3">
                                    <Globe className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                    <span className="break-all">Portfolio</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Expertise */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6 pb-2 border-b-2 border-slate-200 font-sans", accentColor)}>
                                Expertise
                            </h2>
                            <div className="flex flex-col gap-3 font-sans">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-sm font-bold text-slate-700">{skill.skillName}</span>
                                        {skill.proficiencyLevel && (
                                            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={cn("h-full", bgColor)}
                                                    style={{
                                                        width: skill.proficiencyLevel === 'expert' ? '100%' :
                                                            skill.proficiencyLevel === 'advanced' ? '80%' :
                                                                skill.proficiencyLevel === 'intermediate' ? '60%' : '40%'
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-6 pb-2 border-b-2 border-slate-200 font-sans", accentColor)}>
                                Languages
                            </h2>
                            <div className="space-y-4 font-sans text-sm">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="font-bold text-slate-700">{lang.languageName}</span>
                                        <span className="text-slate-400 italic">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Column - Main Content */}
                <main className="flex-1 p-12 flex flex-col gap-12 overflow-hidden">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <p className="text-xl text-slate-600 leading-relaxed italic">
                                &quot;{professionalSummary.summaryText}&quot;
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <h2 className={cn("text-lg font-black uppercase tracking-[0.2em] flex items-center gap-4 font-sans", accentColor)}>
                                <span>Professional Experience</span>
                                <div className="h-px flex-1 bg-slate-100" />
                            </h2>
                            <div className="flex flex-col gap-10">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-2xl font-bold text-slate-900">{job.jobTitle}</h3>
                                            <span className="text-sm font-bold text-slate-400 font-sans tabular-nums bg-slate-50 px-2 py-1 rounded">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        <div className="text-lg font-medium text-slate-500 uppercase tracking-widest font-sans">{job.companyName}</div>
                                        {job.roleDescription && (
                                            <p className="text-slate-600 mt-2">{job.roleDescription}</p>
                                        )}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-2 mt-4">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="flex gap-4 text-slate-600">
                                                        <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0 opacity-40", bgColor)} />
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

                    {/* Education & Certs */}
                    <div className="grid grid-cols-2 gap-12">
                        {education && education.length > 0 && (
                            <section className="flex flex-col gap-6">
                                <h2 className={cn("text-xs font-black uppercase tracking-[0.2em] font-sans", accentColor)}>
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu, i) => (
                                        <div key={i} className="flex flex-col gap-1 font-sans">
                                            <div className="font-bold text-slate-900 leading-tight">{edu.institutionName}</div>
                                            <div className="text-sm text-slate-600 font-medium">{edu.degree}</div>
                                            <div className="text-xs text-slate-400 tabular-nums">{edu.endYear}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {certifications && certifications.length > 0 && (
                            <section className="flex flex-col gap-6">
                                <h2 className={cn("text-xs font-black uppercase tracking-[0.2em] font-sans", accentColor)}>
                                    Certifications
                                </h2>
                                <div className="space-y-6">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="flex flex-col gap-1 font-sans">
                                            <div className="font-bold text-slate-900 leading-tight">{cert.certificationName}</div>
                                            <div className="text-sm text-slate-600">{cert.issuingOrganization}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>
            </div>

            {/* Footer decoration */}
            <div className={cn("h-4 w-full", bgColor)} />
        </div>
    )
}
