import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSGraduateTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-snug",
            className
        )}>
            {/* Graduate Header - Clean & Approachable */}
            <header className="mb-8">
                <h1 className="text-3xl font-black text-neutral-900 mb-2">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3 italic">
                        {personalInfo.professionalTitle}
                    </div>
                )}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                    {personalInfo?.email && <span className={cn("hover:opacity-80 transition-opacity", accentColor)}>{personalInfo.email}</span>}
                    {personalInfo?.phone && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>LinkedIn</span>
                        </>
                    )}
                    {personalInfo?.portfolioUrl && (
                        <>
                            <span className="text-neutral-300">|</span>
                            <span>Portfolio</span>
                        </>
                    )}
                </div>
            </header>

            <div className="space-y-6">
                {/* Summary - Optional but good if they have a clear career objective */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-3", accentColor)}>Objective & Profile</h2>
                        <p className="text-xs text-neutral-700 leading-relaxed">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* EDUCATION FIRST for Graduates */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-3", accentColor)}>Academic Foundation</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-black text-neutral-900">{edu.institutionName}</h3>
                                        <span className="text-[10px] font-bold text-neutral-400">{edu.startYear} — {edu.endYear}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <div className="text-xs font-bold text-neutral-600 italic">
                                            {edu.degree}{edu.major ? ` in ${edu.major}` : ''}
                                        </div>
                                        {edu.location && <div className="text-[10px] text-neutral-400">{edu.location}</div>}
                                    </div>
                                    <div className="flex gap-4 mb-2">
                                        {edu.gpa && <div className="text-[10px] font-bold text-neutral-700 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">GPA: {edu.gpa}</div>}
                                        {edu.achievements && <div className="text-[10px] text-neutral-500 italic">{edu.achievements}</div>}
                                    </div>
                                    {edu.coursework && (
                                        <div className="text-[10px] text-neutral-600 leading-relaxed bg-neutral-50/50 p-2 rounded border border-dashed border-neutral-100">
                                            <span className="font-black text-neutral-500 uppercase tracking-tighter mr-2">Key Coursework:</span>
                                            {edu.coursework}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* SKILLS - Categorized */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-3", accentColor)}>Skills & Toolsets</h2>
                        {(() => {
                            const groupedSkills = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'professional'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const labels: Record<string, string> = {
                                technical: 'Technical',
                                tool: 'Tools',
                                professional: 'Professional',
                                industry: 'Domain'
                            }

                            return (
                                <div className="space-y-2">
                                    {Object.entries(groupedSkills).map(([type, list]) => (
                                        <div key={type} className="flex gap-3">
                                            <span className="text-[9px] font-black uppercase text-neutral-400 w-20 shrink-0 pt-1 tracking-tighter">{labels[type] || type}:</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {list.map((s, si) => (
                                                    <span key={si} className="text-[10px] font-bold px-2 py-0.5 bg-white border border-neutral-200 text-neutral-700 rounded-md">
                                                        {s.skillName}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                    </section>
                )}

                {/* PROJECTS - Crucial for Grads */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-3", accentColor)}>Key Projects & Research</h2>
                        <div className="space-y-4">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider">{proj.projectName}</h3>
                                        <span className="text-[9px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded uppercase">{proj.role}</span>
                                    </div>
                                    <p className="text-xs text-neutral-600 mb-1 leading-relaxed">{proj.description}</p>
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[9px] font-bold text-neutral-400">TECHNOLOGIES: {proj.toolsUsed.join(' • ')}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* INTERNSHIPS / EXPERIENCE */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-3", accentColor)}>Professional Experience</h2>
                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-black text-neutral-900">{job.jobTitle}</h3>
                                        <span className="text-[10px] font-bold text-neutral-400">{job.startDate} — {job.isCurrent ? 'Present' : job.endDate}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{job.companyName}</div>
                                        {job.location && <div className="text-[10px] text-neutral-400 px-2 border border-neutral-100 rounded">{job.location}</div>}
                                    </div>
                                    {job.achievements && (
                                        <ul className="space-y-1 ml-4 list-disc marker:text-neutral-300">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-xs text-neutral-700 leading-relaxed">{a.achievementText}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* AWARDS & CERTIFICATIONS */}
                {(achievements?.length || certifications?.length) ? (
                    <section>
                        <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-3", accentColor)}>Honors & Certifications</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {certifications && certifications.length > 0 && (
                                <div className="space-y-1.5">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="text-[10px] leading-tight">
                                            <span className="font-black text-neutral-800">{cert.certificationName}</span>
                                            <span className="text-neutral-400 ml-1">({cert.issueYear})</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {achievements && achievements.length > 0 && (
                                <div className="space-y-1.5">
                                    {achievements.map((ach, i) => (
                                        <div key={i} className="text-[10px] leading-tight">
                                            <span className="font-black text-neutral-800">{ach.achievementTitle}</span>
                                            {ach.year && <span className="text-neutral-400 ml-1">({ach.year})</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                ) : null}

                {/* VOLUNTEER & OTHER */}
                {(volunteerExperience?.length || languages?.length || professionalAffiliations?.length) ? (
                    <div className="grid grid-cols-1 gap-6">
                        {volunteerExperience && volunteerExperience.length > 0 && (
                            <section>
                                <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-2", accentColor)}>Volunteerism</h2>
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i} className="mb-2">
                                        <div className="text-[10px] font-black text-neutral-800">{vol.roleTitle}</div>
                                        <div className="text-[10px] text-neutral-500">{vol.organizationName}</div>
                                    </div>
                                ))}
                            </section>
                        )}
                        <div className="space-y-6">
                            {languages && languages.length > 0 && (
                                <section>
                                    <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-2", accentColor)}>Languages</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {languages.map((l, i) => (
                                            <div key={i} className="text-[10px]">
                                                <span className="font-bold">{l.languageName}</span>
                                                <span className="text-neutral-400 ml-1">({l.proficiencyLevel})</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                ) : null}

                {/* CUSTOM SECTIONS - Very Important for Grads */}
                {customSections && customSections.length > 0 && (
                    <div className="space-y-6">
                        {customSections.map((section, i) => (
                            <section key={i}>
                                <h2 className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-b border-neutral-200 pb-1.5 mb-3", accentColor)}>{section.title}</h2>
                                {section.content && <p className="text-xs text-neutral-700 mb-2">{section.content}</p>}
                                {section.items && section.items.length > 0 && (
                                    <ul className="space-y-1.5 ml-4 list-disc marker:text-neutral-300">
                                        {section.items.map((item, j) => (
                                            <li key={j} className="text-xs text-neutral-700 leading-relaxed">{item.text}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

