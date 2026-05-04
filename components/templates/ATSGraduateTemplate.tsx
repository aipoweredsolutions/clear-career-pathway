import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSGraduateTemplate({ data, className, accentColor = 'text-sky-600' }: TemplateProps) {
    const borderColorClass = accentColor.replace('text-', 'border-')
    const bgColorClass = accentColor.replace('text-', 'bg-')
    
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        projects,
        certifications,
        achievements,
        publications,
        volunteerExperience,
        references,
        additionalInfo,
        languages,
        professionalAffiliations,
        customSections
    } = data

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex items-center gap-4 mb-3 mt-5">
            <h2 className={cn("text-[11px] font-black uppercase tracking-[0.25em]", accentColor)}>
                {title}
            </h2>
            <div className="flex-1 h-[2px] bg-neutral-50" />
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)

    return (
        <div className={cn(
            "w-full bg-white text-neutral-800 font-sans leading-snug px-10 py-8 relative overflow-hidden",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── IMPRESSIVE HEADER ── */}
            <header className="mb-8 relative">
                {/* Bleed Accent Stripe */}
                <div className={cn("absolute -top-10 left-0 w-[6px] h-[140%] rounded-br-2xl opacity-90", bgColorClass)} />
                
                <div className="pl-6">
                    <h1 className="text-[28px] sm:text-[32px] font-black tracking-tight leading-none mb-2 uppercase">
                        {personalInfo?.fullName ? (
                            <>
                                <span className="text-neutral-900">{personalInfo.fullName.split(' ').slice(0, -1).join(' ')} </span>
                                <span className={accentColor}>{personalInfo.fullName.split(' ').slice(-1).join(' ')}</span>
                            </>
                        ) : (
                            'Your Name'
                        )}
                    </h1>
                    
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-[12px] font-black uppercase tracking-[0.25em] mb-4 opacity-90", accentColor)}>
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                        {contactParts.map((part, i) => (
                            <div key={i} className="flex items-center gap-5">
                                <span>{part}</span>
                                {i < contactParts.length - 1 && (
                                    <span className={cn("w-1 h-1 rounded-full opacity-40", bgColorClass)} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Professional Summary */}
            {professionalSummary?.summaryText && (
                <section className="mb-8 pl-4">
                    <p className="text-[13px] font-medium leading-relaxed text-neutral-600 border-l-[1.5px] pl-6 py-1 italic relative">
                        <span className={cn("absolute left-[-1.5px] top-0 w-[1.5px] h-full opacity-30", bgColorClass)} />
                        "{professionalSummary.summaryText}"
                    </p>
                </section>
            )}

            <div>
                {/* Education - Priority 1 for Grads */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Academic Foundation" />
                        <div className="space-y-4 px-2">
                            {education.map((edu, i) => (
                                <div key={i} className={cn("group relative pl-5 border-l-2", borderColorClass.replace('border-', 'border-opacity-30 border-'))}>
                                    <div className={cn("absolute -left-[5px] top-1.5 w-2 h-2 rounded-full", bgColorClass)} />
                                    
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1">
                                        <h3 className="text-[13px] font-black text-neutral-900 tracking-tight">
                                            {edu.degree}{edu.major ? ` in ${edu.major}` : ''}
                                        </h3>
                                        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mt-1 sm:mt-0">
                                            {edu.startYear ? `${edu.startYear} — ` : ''}{edu.endYear || 'Present'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-3">
                                        <div className={cn("text-[12px] font-bold uppercase tracking-widest", accentColor)}>
                                            {edu.institutionName}
                                        </div>
                                        {edu.location && (
                                            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mt-1 sm:mt-0">
                                                {edu.location}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {(edu.gpa || edu.achievements || edu.coursework) && (
                                        <div className="text-[13px] leading-relaxed text-neutral-600 mt-3 space-y-1.5">
                                            {edu.gpa && (
                                                <div><span className="font-bold text-neutral-800">Cumulative GPA:</span> {edu.gpa}</div>
                                            )}
                                            {edu.achievements && (
                                                <div><span className="font-bold text-neutral-800">Honors & Awards:</span> {edu.achievements}</div>
                                            )}
                                            {edu.coursework && (
                                                <div><span className="font-bold text-neutral-800">Relevant Coursework:</span> {edu.coursework}</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects - Priority 2 for Grads */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Major Initiatives" />
                        <div className="space-y-3 px-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="py-2 border-b border-neutral-50 last:border-0">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-[12px] font-black text-neutral-900 uppercase tracking-tight">{proj.projectName}</h3>
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", accentColor)}>{proj.role}</span>
                                    </div>
                                    <p className="text-[11px] text-neutral-600 leading-relaxed font-medium mb-2">{proj.description}</p>
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {proj.toolsUsed.map((t, j) => (
                                                <span key={j} className="text-[9px] font-black px-2 py-1 bg-white border border-neutral-100 rounded text-neutral-400 uppercase tracking-tighter shadow-sm">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Skill Inventory" />
                        <div className="flex flex-col gap-y-5 px-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'Professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-2">
                                    <div className={cn("text-[11px] font-black uppercase tracking-[0.2em] border-b pb-1", borderColorClass.replace('border-', 'border-opacity-20 border-'), accentColor)}>
                                        {type}
                                    </div>
                                    <ul className="text-[13.5px] font-medium text-neutral-700 leading-relaxed flex flex-wrap m-0 p-0 list-none">
                                        {list.map((s, i) => (
                                            <li key={i} className="flex items-center">
                                                {s.skillName}
                                                {i < list.length - 1 && (
                                                    <span className="mx-2 text-neutral-400 font-normal select-none" aria-hidden="true">•</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Professional Exposure" />
                        <div className="space-y-5 px-4">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-4">
                                        <div>
                                            <h3 className="text-[13px] font-black text-neutral-900 tracking-tight leading-none mb-1">{job.jobTitle}</h3>
                                            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">{job.companyName}</div>
                                        </div>
                                        <div className={cn("text-[11px] font-black uppercase tracking-widest shrink-0", accentColor)}>
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>
                                    {job.achievements && (
                                        <ul className="space-y-3 pl-6">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[11px] text-neutral-700 leading-relaxed flex gap-3 font-medium">
                                                    <span className={cn("w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 opacity-20", bgColorClass)} />
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

                {/* Awards & Languages */}
                <div className="mt-6 pt-4 border-t border-neutral-50 flex flex-col gap-5 px-4">
                    {(achievements?.length || certifications?.length) ? (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-6">Honors & Awards</h2>
                            <div className="space-y-4">
                                {achievements?.map((ach, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="text-[14px] font-black text-neutral-800 leading-tight">{ach.achievementTitle}</div>
                                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
                                            {ach.issuingBody} {ach.year && `· ${ach.year}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}
                    
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-6">Communication</h2>
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

