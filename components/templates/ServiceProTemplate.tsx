import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
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
        <div className={cn("w-full bg-white aspect-[210/297] text-slate-900 font-sans leading-relaxed flex flex-col p-8", className)}>
            <div className="border-4 border-slate-900 flex-1 flex flex-col">
                {/* Header Section */}
                <header className="flex items-stretch border-b-4 border-slate-900">
                    <div className="flex-1 p-10 flex flex-col justify-center">
                        <h1 className="text-6xl font-black tracking-tight mb-2">
                            {personalInfo?.fullName}
                        </h1>
                        <div className={cn("inline-block px-4 py-1 text-white text-lg font-bold uppercase tracking-widest", bgColor)}>
                            {personalInfo?.professionalTitle}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-500 uppercase">
                            {personalInfo?.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {personalInfo.email}</div>}
                            {personalInfo?.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {personalInfo.phone}</div>}
                            {(personalInfo?.city || personalInfo?.country) && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>}
                        </div>
                    </div>

                    {/* Small Photo Area */}
                    <div className="w-56 bg-slate-100 border-l-4 border-slate-900 flex items-center justify-center overflow-hidden">
                        {personalInfo?.photoUrl ? (
                            <img
                                src={personalInfo.photoUrl}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center text-slate-400">
                                <User className="w-16 h-16" />
                            </div>
                        )}
                    </div>
                </header>

                <div className="flex flex-1 min-h-0">
                    {/* Left - Main Details */}
                    <main className="flex-1 p-10 flex flex-col gap-10 overflow-hidden border-r-4 border-slate-900">
                        {/* Summary */}
                        {professionalSummary?.summaryText && (
                            <section>
                                <h2 className="text-xl font-black uppercase tracking-tighter mb-4 border-b-2 border-slate-900 inline-block px-1">
                                    About Me
                                </h2>
                                <p className="text-slate-700 font-medium text-lg leading-snug">
                                    {professionalSummary.summaryText}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {workExperience && workExperience.length > 0 && (
                            <section className="flex flex-col gap-6">
                                <h2 className="text-xl font-black uppercase tracking-tighter mb-2 border-b-2 border-slate-900 inline-block px-1">
                                    Work History
                                </h2>
                                <div className="flex flex-col gap-8">
                                    {workExperience.map((job, i) => (
                                        <div key={i} className="flex flex-col">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-2xl font-black text-slate-900">{job.jobTitle}</h3>
                                                <span className="text-xs font-black bg-slate-900 text-white px-3 py-1 uppercase tracking-widest">
                                                    {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                                </span>
                                            </div>
                                            <div className="text-lg font-bold text-slate-500 mb-4">{job.companyName}</div>
                                            {job.achievements && job.achievements.length > 0 && (
                                                <div className="grid grid-cols-1 gap-3">
                                                    {job.achievements.map((ach, j) => (
                                                        <div key={j} className="flex gap-4">
                                                            <CheckCircle2 className={cn("w-5 h-5 shrink-0 mt-0.5", accentColor)} />
                                                            <span className="text-slate-600 font-bold leading-tight">{ach.achievementText}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    {/* Right - Skills & Certs */}
                    <aside className="w-72 bg-slate-50 p-8 flex flex-col gap-10">
                        {/* Key Skills */}
                        {skills && skills.length > 0 && (
                            <section>
                                <h2 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
                                    <Star className="w-5 h-5 fill-slate-900" />
                                    Skills
                                </h2>
                                <div className="space-y-4">
                                    {skills.map((skill, i) => (
                                        <div key={i} className="flex flex-col gap-1">
                                            <div className="flex justify-between items-center text-xs font-black uppercase">
                                                <span>{skill.skillName}</span>
                                                <span className="text-slate-400">{skill.proficiencyLevel?.charAt(0)}</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-200 border border-slate-300">
                                                <div
                                                    className={cn("h-full", bgColor)}
                                                    style={{
                                                        width: skill.proficiencyLevel === 'expert' ? '100%' :
                                                            skill.proficiencyLevel === 'advanced' ? '80%' :
                                                                skill.proficiencyLevel === 'intermediate' ? '60%' : '40%'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <h2 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    Awards & Certs
                                </h2>
                                <div className="space-y-6">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="flex flex-col">
                                            <div className="text-sm font-black text-slate-900 leading-tight mb-1">{cert.certificationName}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{cert.issuingOrganization}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-lg font-black uppercase mb-6">Languages</h2>
                                <div className="flex flex-wrap gap-2">
                                    {languages.map((lang, i) => (
                                        <div key={i} className="px-3 py-1.5 border-2 border-slate-900 text-[10px] font-black uppercase tracking-widest">
                                            {lang.languageName}: {lang.proficiencyLevel}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {education && education.length > 0 && (
                            <section>
                                <h2 className="text-lg font-black uppercase mb-6">Education</h2>
                                {education.map((edu, i) => (
                                    <div key={i} className="mb-4">
                                        <div className="text-xs font-black uppercase leading-tight">{edu.institutionName}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">{edu.degree} — {edu.endYear}</div>
                                    </div>
                                ))}
                            </section>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    )
}
