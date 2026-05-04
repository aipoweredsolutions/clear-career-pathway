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
        <div className="flex items-center gap-2 mb-2 mt-4 group">
            <div className={cn("w-1 h-5 rounded-full", bgColorClass)} />
            <h2 className={cn("text-[11px] font-black uppercase tracking-[0.2em]", accentColor)}>
                {title}
            </h2>
            <div className="flex-1 h-px bg-neutral-50" />
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-800 font-sans leading-relaxed p-10",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── MODERN MASTHEAD ── */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-[2px] border-neutral-50 pb-4 mb-4">
                <div className="flex-1">
                    <h1 className="text-[48px] font-[900] text-neutral-900 tracking-[-0.04em] leading-[0.9] mb-4 whitespace-nowrap">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-[14px] font-bold tracking-tight uppercase tracking-[0.2em] opacity-80", accentColor)}>
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                </div>
                
                <div className="shrink-0 flex flex-col gap-1.5 text-left md:text-right">
                    <div className="text-[12px] font-bold text-neutral-800">
                        {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}
                    </div>
                    {personalInfo?.email && <div className="text-[11px] font-medium text-neutral-500">{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="text-[11px] font-medium text-neutral-500">{personalInfo.phone}</div>}
                    {personalInfo?.linkedinUrl && <div className={cn("text-[10px] font-black uppercase tracking-widest mt-1", accentColor)}>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>}
                </div>
            </header>

            <div>
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Trajectory" />
                        <p className="text-[13px] text-neutral-700 leading-relaxed font-medium px-4">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-4 px-4">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex justify-between items-baseline mb-3 gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-[16px] font-black text-neutral-900 tracking-tight leading-tight group-hover:translate-x-1 transition-transform">{job.jobTitle}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">{job.companyName}</div>
                                                <div className="w-1 h-1 rounded-full bg-neutral-200" />
                                                <div className="text-[11px] font-black text-neutral-300 uppercase tracking-widest">{job.location}</div>
                                            </div>
                                        </div>
                                        <div className={cn("text-[12px] font-black uppercase tracking-[0.15em] shrink-0", accentColor)}>
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[13px] text-neutral-600 mb-3 leading-relaxed font-medium italic opacity-80 border-l-2 border-neutral-50 pl-6">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-2 pl-6">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[13px] text-neutral-700 leading-relaxed flex gap-4 font-medium">
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
                        <SectionHeader title="Core Competencies" />
                        <div className="flex flex-col gap-y-2 px-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-1.5">
                                    <div className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.2em]">
                                        {type}
                                    </div>
                                    <ul className="text-[12px] font-bold text-neutral-800 leading-relaxed flex flex-wrap m-0 p-0 list-none">
                                        {list.map((s, i) => (
                                            <li key={i} className="flex items-center">
                                                {s.skillName}
                                                {i < list.length - 1 && (
                                                    <span className="mx-2 text-neutral-300 font-normal select-none" aria-hidden="true">•</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Education" />
                        <div className="space-y-2 px-4">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-baseline gap-4">
                                    <div className="flex-1">
                                        <div className="text-[13px] font-black text-neutral-900 tracking-tight leading-tight">
                                            {edu.degree}
                                        </div>
                                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">{edu.institutionName}</div>
                                        {edu.gpa && <div className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest mt-0.5">GPA: {edu.gpa}</div>}
                                    </div>
                                    <div className={cn("text-[11px] font-black uppercase tracking-widest shrink-0", accentColor)}>{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Key Projects" />
                        <div className="flex flex-col gap-3 px-4">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[13px] font-black text-neutral-900 tracking-tight">{proj.projectName}</h3>
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", accentColor)}>{proj.role}</span>
                                    </div>
                                    <p className="text-[12px] text-neutral-600 leading-relaxed font-medium">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <SectionHeader title="Certifications" />
                        <div className="space-y-3 px-4">
                            {certifications.map((c, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="text-[12px] font-black text-neutral-900 leading-tight">{c.certificationName}</div>
                                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
                                        {c.issuingOrganization}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <SectionHeader title="Languages" />
                        <ul className="text-[12px] font-bold text-neutral-800 leading-relaxed flex flex-wrap m-0 p-0 list-none px-4">
                            {languages.map((l, i) => (
                                <li key={i} className="flex items-center">
                                    {l.languageName} <span className={cn("text-[10px] uppercase font-black ml-1 mr-1 opacity-50", accentColor)}>[{l.proficiencyLevel}]</span>
                                    {i < languages.length - 1 && (
                                        <span className="mx-2 text-neutral-300 font-normal select-none" aria-hidden="true">•</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    )
}

