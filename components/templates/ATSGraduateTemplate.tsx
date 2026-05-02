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
        <div className="flex items-center gap-4 mb-6 mt-10">
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
            "w-full bg-white text-neutral-800 font-sans leading-relaxed p-12",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── FRESH HEADER ── */}
            <header className="mb-12 border-b-4 border-neutral-50 pb-12">
                <h1 className="text-[48px] font-black text-neutral-900 tracking-tight leading-none mb-6">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-[14px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-neutral-50 border border-neutral-100", accentColor)}>
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-6 text-[11px] font-black text-neutral-400 uppercase tracking-widest">
                        {contactParts.map((part, i) => (
                            <React.Fragment key={i}>
                                <span>{part}</span>
                                {i < contactParts.length - 1 && <span className="text-neutral-100">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </header>

            <div className="pb-12">
                {/* Education - Priority 1 for Grads */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Academic Foundation" />
                        <div className="space-y-8 px-4">
                            {education.map((edu, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-3">
                                        <h3 className="text-[20px] font-black text-neutral-900 tracking-tight">{edu.institutionName}</h3>
                                        <span className="text-[12px] font-black text-neutral-300 uppercase tracking-widest">{edu.startYear} — {edu.endYear}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-4">
                                        <div className="text-[15px] font-bold text-neutral-500 italic">
                                            {edu.degree}{edu.major ? ` in ${edu.major}` : ''}
                                        </div>
                                        {edu.location && <div className="text-[11px] font-bold text-neutral-300 uppercase tracking-widest">{edu.location}</div>}
                                    </div>
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {edu.gpa && (
                                            <div className={cn("text-[10px] font-black px-3 py-1 rounded border-2 uppercase tracking-widest", borderColorClass.replace('border-', 'border-opacity-10 border-'), accentColor)}>
                                                GPA: {edu.gpa}
                                            </div>
                                        )}
                                        {edu.achievements && (
                                            <div className="text-[10px] font-black px-3 py-1 bg-neutral-50 rounded border border-neutral-100 text-neutral-400 uppercase tracking-widest">
                                                {edu.achievements}
                                            </div>
                                        )}
                                    </div>
                                    {edu.coursework && (
                                        <div className="text-[13px] text-neutral-600 leading-relaxed p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-50 border-dashed">
                                            <span className="font-black text-neutral-400 uppercase tracking-[0.1em] block mb-2 text-[10px]">Specialized Curriculum</span>
                                            {edu.coursework}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="p-8 rounded-3xl border-2 border-neutral-50 hover:bg-neutral-50/50 transition-all">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-[16px] font-black text-neutral-900 uppercase tracking-tight">{proj.projectName}</h3>
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", accentColor)}>{proj.role}</span>
                                    </div>
                                    <p className="text-[13px] text-neutral-600 leading-relaxed font-medium mb-6">{proj.description}</p>
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
                                            <span key={i} className={cn("text-[11px] font-black px-4 py-2 rounded-xl border-2 transition-all shadow-sm", borderColorClass.replace('border-', 'border-opacity-10 border-'), accentColor)}>
                                                {s.skillName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Professional Exposure" />
                        <div className="space-y-10 px-4">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-4">
                                        <div>
                                            <h3 className="text-[18px] font-black text-neutral-900 tracking-tight leading-none mb-2">{job.jobTitle}</h3>
                                            <div className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest">{job.companyName}</div>
                                        </div>
                                        <div className={cn("text-[11px] font-black uppercase tracking-widest shrink-0", accentColor)}>
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>
                                    {job.achievements && (
                                        <ul className="space-y-3 pl-6">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 leading-relaxed flex gap-4 font-medium">
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
                <div className="mt-20 pt-12 border-t-2 border-neutral-50 grid grid-cols-1 md:grid-cols-2 gap-16 px-4">
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

