import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSModernTemplate({ data, className, accentColor = 'text-indigo-600' }: TemplateProps) {
    const borderColorClass = accentColor.replace('text-', 'border-')
    const bgColorClass = accentColor.replace('text-', 'bg-')
    
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        projects,
        achievements,
        publications,
        volunteerExperience,
        languages,
        professionalAffiliations,
        references,
        customSections
    } = data

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex items-center gap-4 mb-8 mt-12 group">
            <div className={cn("w-1.5 h-8 rounded-full", bgColorClass)} />
            <h2 className={cn("text-[13px] font-black uppercase tracking-[0.25em]", accentColor)}>
                {title}
            </h2>
            <div className="flex-1 h-px bg-neutral-50" />
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-800 font-sans leading-relaxed p-12",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── MODERN MASTHEAD ── */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b-[6px] border-neutral-50 pb-12 mb-12">
                <div className="flex-1">
                    <h1 className="text-[56px] font-[900] text-neutral-900 tracking-[-0.04em] leading-[0.9] mb-6">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-[18px] font-bold tracking-tight uppercase tracking-[0.2em] opacity-80", accentColor)}>
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                </div>
                
                <div className="shrink-0 flex flex-col gap-3 text-left md:text-right">
                    <div className="text-[14px] font-bold text-neutral-800">
                        {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}
                    </div>
                    {personalInfo?.email && <div className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors">{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="text-[13px] font-medium text-neutral-500">{personalInfo.phone}</div>}
                    <div className="flex flex-wrap md:justify-end gap-4 mt-2">
                        {personalInfo?.linkedinUrl && <div className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-neutral-50 rounded", accentColor)}>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>}
                    </div>
                </div>
            </header>

            <div className="pb-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Trajectory" />
                        <p className="text-[15px] text-neutral-700 leading-[1.8] font-medium px-4">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-12 px-4">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex justify-between items-baseline mb-4 gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-[20px] font-black text-neutral-900 tracking-tight leading-tight group-hover:translate-x-1 transition-transform">{job.jobTitle}</h3>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <div className="text-[14px] font-bold text-neutral-400 uppercase tracking-wider">{job.companyName}</div>
                                                <div className="w-1 h-1 rounded-full bg-neutral-200" />
                                                <div className="text-[12px] font-black text-neutral-300 uppercase tracking-widest">{job.location}</div>
                                            </div>
                                        </div>
                                        <div className={cn("text-[12px] font-black uppercase tracking-[0.15em] shrink-0", accentColor)}>
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[14px] text-neutral-600 mb-6 leading-relaxed font-medium italic opacity-80 border-l-2 border-neutral-50 pl-6">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3 pl-6">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 leading-relaxed flex gap-4 font-medium">
                                                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0 opacity-20", bgColorClass)} />
                                                    <span>{a.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Stack" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 px-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-4">
                                    <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">
                                        {type}
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {list.map((s, i) => (
                                            <span key={i} className={cn("text-[11px] font-black px-4 py-2 rounded-xl border-2 transition-all shadow-sm hover:shadow-md", borderColorClass.replace('border-', 'border-opacity-10 border-'), accentColor)}>
                                                {s.skillName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Academic" />
                        <div className="space-y-8 px-4">
                            {education.map((edu, i) => (
                                <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-neutral-50 rounded-2xl gap-6">
                                    <div className="flex-1">
                                        <div className="text-[18px] font-black text-neutral-900 tracking-tight leading-none mb-2">
                                            {edu.degree}
                                        </div>
                                        <div className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest">{edu.institutionName}</div>
                                    </div>
                                    <div className="text-left md:text-right shrink-0">
                                        <div className={cn("text-[14px] font-black", accentColor)}>{edu.endYear}</div>
                                        {edu.gpa && <div className="text-[11px] font-bold text-neutral-300 mt-1 uppercase tracking-widest">GPA: {edu.gpa}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Initiatives" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="group p-8 rounded-3xl border-2 border-neutral-50 hover:border-indigo-50 transition-all hover:bg-neutral-50/50">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-[16px] font-black text-neutral-900 tracking-tight uppercase tracking-tight">{proj.projectName}</h3>
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", accentColor)}>{proj.role}</span>
                                    </div>
                                    <p className="text-[13px] text-neutral-600 leading-relaxed font-medium">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 pt-12 border-t border-neutral-50 px-4">
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-6">Credentials</h2>
                            <div className="space-y-4">
                                {certifications.map((c, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="text-[14px] font-black text-neutral-900 leading-tight">{c.certificationName}</div>
                                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
                                            {c.issuingOrganization}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-6">Lexicon</h2>
                            <div className="flex flex-wrap gap-8">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-[14px] font-black text-neutral-800 tracking-tight uppercase">{l.languageName}</span>
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-60", accentColor)}>
                                            {l.proficiencyLevel}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}

