import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Bauhaus Template - Modern Overhaul
 * 
 * Inspired by the Bauhaus movement: form follows function.
 * Uses bold primary colors, geometric structures, and clean sans-serif typography.
 * 100% ATS-compliant single-column architecture with elite visual styling.
 */
export function ATSBauhausTemplate({ data, className, accentColor = 'bg-red-600 text-red-600' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        achievements,
        customSections,
        languages,
        references
    } = data

    // Extract colors
    const colorMatch = accentColor.match(/(?:bg|text)-([a-z]+-[0-9]+)/)
    const baseColor = colorMatch ? colorMatch[1] : 'neutral-900'
    
    const bgColorClass = `bg-${baseColor}`
    const textColorClass = `text-${baseColor}`
    const borderColorClass = `border-${baseColor}`

    const SectionHeader = ({ title, num }: { title: string, num: string }) => (
        <div className="flex items-end gap-4 mb-6 mt-10 sm:mt-12 group">
            <div className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-white font-black text-xl sm:text-2xl shrink-0 transition-all group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.05)]",
                bgColorClass
            )} aria-hidden="true">
                {num}
            </div>
            <div className="flex-grow pb-2">
                <h2 className={cn("text-sm sm:text-[16px] font-black uppercase tracking-[0.4em] mb-2 sm:mb-4", textColorClass)}>
                    {title}
                </h2>
                <div className="h-1.5 sm:h-2 w-full bg-neutral-900" />
            </div>
        </div>
    )

    const contactLines: string[] = []
    if (personalInfo?.email) contactLines.push(personalInfo.email)
    if (personalInfo?.phone) contactLines.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactLines.push(loc)

    return (
        <div
            className={cn('w-full bg-white text-neutral-900 leading-relaxed p-6 sm:p-10 md:p-12', className)}
            style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
        >
            {/* ── BAUHAUS MASTHEAD ── */}
            <header className="mb-12 sm:mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
                    <div className="flex-1 w-full min-w-0">
                        {personalInfo?.fullName && (
                            <div className="mb-6 sm:mb-8">
                                {(() => {
                                    const parts = personalInfo.fullName.split(' ')
                                    const last = parts.pop()
                                    const rest = parts.join(' ')
                                    return (
                                        <div className="flex flex-col leading-[0.85] break-words">
                                            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black uppercase tracking-[-0.08em] text-neutral-950">{rest}</h1>
                                            <h1 className={cn("text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extralight uppercase tracking-[-0.08em]", textColorClass)}>{last}</h1>
                                        </div>
                                    )
                                })()}
                            </div>
                        )}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                            <div className={cn("h-3 sm:h-4 w-28 sm:w-40 shrink-0", bgColorClass)} />
                            {personalInfo?.professionalTitle && (
                                <div className="text-[12px] sm:text-[14px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase text-neutral-400 break-words">
                                    {personalInfo.professionalTitle}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="text-[10px] sm:text-[11px] font-black text-neutral-400 tracking-[0.2em] flex flex-row md:flex-col flex-wrap gap-2 md:gap-3 md:text-right uppercase italic w-full md:w-auto">
                        {contactLines.map((line, i) => (
                            <span key={i} className="whitespace-nowrap border-b-2 md:border-b-0 md:border-r-4 pb-1 md:pb-0 pr-0 md:pr-4 border-neutral-100">{line}</span>
                        ))}
                        {personalInfo?.linkedinUrl && (
                            <span className={cn("font-black tracking-[0.2em] md:tracking-[0.3em] mt-0 md:mt-2", textColorClass)}>
                                {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* DOCUMENT TYPE OVERRIDES */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-3xl ml-6 sm:ml-12 md:ml-16">
                    <div className="mb-8 space-y-1 text-sm sm:text-[15px] text-neutral-800">
                        <p className="font-black text-neutral-300 mb-6 tracking-[0.3em] uppercase text-[10px] sm:text-[11px]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-black text-lg sm:text-[20px] tracking-tighter">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-bold uppercase tracking-widest text-[11px] sm:text-[12px]">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-black text-neutral-800">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="mb-8">
                        <p className="text-sm sm:text-[15px] font-black text-neutral-900 italic border-l-4 sm:border-l-8 border-neutral-100 pl-4 sm:pl-8 py-2">
                            Dear {data.coverLetter?.recipientName || 'Hiring Lead'},
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-12 sm:mb-16">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-sm sm:text-[15px] leading-[1.8] mb-6 text-justify text-neutral-700 font-medium">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-sm">Your cover letter will appear here...</p>}
                    </div>

                    <div className="flex items-center gap-6 sm:gap-10 pt-10 sm:pt-16 border-t-4 sm:border-t-8 border-neutral-955">
                        <div className={cn("w-12 h-12 sm:w-16 sm:h-16", bgColorClass)} />
                        <div>
                            <p className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-1">Authenticated By</p>
                            <p className="text-xl sm:text-[28px] font-black tracking-[-0.05em] uppercase">{data.personalInfo?.fullName}</p>
                        </div>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="ml-6 sm:ml-12 md:ml-16 space-y-12 sm:space-y-16">
                    <SectionHeader title="Verification Network" num="01" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                        {data.references?.map((ref, i) => (
                            <div key={i} className=" flex flex-col gap-2 group">
                                <span className="font-black text-neutral-955 text-lg sm:text-[22px] tracking-tight group-hover:translate-x-2 transition-transform">{ref.referenceName || ref.name}</span>
                                <div className={cn("text-[11px] sm:text-[12px] font-black uppercase tracking-[0.25em] mb-2", textColorClass)}>
                                    {ref.role || ref.title}
                                </div>
                                <div className="text-sm sm:text-[15px] text-neutral-600 font-bold border-l-2 sm:border-l-4 border-neutral-100 pl-4 sm:pl-6">
                                    {ref.organization || ref.company}
                                </div>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <div className="text-xs sm:text-[13px] text-neutral-400 font-black mt-4 py-3 border-y border-neutral-50">
                                        {ref.contactDetails || ref.contactInfo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-12 sm:space-y-16">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Core Objective" num="01" />
                            <div className="ml-8 sm:ml-16 md:ml-20">
                                <p className="text-sm sm:text-[16px] font-medium text-neutral-700 leading-[1.8] text-justify italic border-l-4 sm:border-l-[8px] border-neutral-50 pl-4 sm:pl-8">
                                    {professionalSummary.summaryText}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Career Chronology" num="02" />
                            <div className="space-y-12 sm:space-y-16 ml-8 sm:ml-16 md:ml-20">
                                {workExperience.map((job, i) => (
                                    <div key={i} className={cn("relative group", job.forcePageBreak && "force-page-break")}>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 gap-2 md:gap-6">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl sm:text-[24px] font-black uppercase text-neutral-950 tracking-tight leading-tight mb-2 group-hover:translate-x-2 transition-transform break-words">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className={cn("text-[12px] sm:text-[14px] font-black uppercase tracking-[0.25em] break-words", textColorClass)}>
                                                    {job.companyName} <span className="text-neutral-200 mx-2 sm:mx-4">/</span> {job.location}
                                                </div>
                                            </div>
                                            <div className="text-[11px] sm:text-[13px] font-black text-neutral-300 uppercase tracking-[0.3em] sm:tracking-[0.4em] shrink-0 tabular-nums">
                                                {job.startDate} — {job.isCurrent ? 'ACTIVE' : job.endDate}
                                            </div>
                                        </div>
                                        
                                        {job.roleDescription && (
                                            <p className="text-sm sm:text-[15px] font-bold text-neutral-500 mb-6 leading-relaxed italic opacity-80 max-w-3xl">
                                                {job.roleDescription}
                                            </p>
                                        )}
                                        
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-4">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-sm sm:text-[15px] text-neutral-800 flex gap-4 sm:gap-6 leading-relaxed group/item">
                                                        <span className={cn("shrink-0 w-2 h-2 sm:w-3 sm:h-3 mt-1.5 sm:mt-2", bgColorClass, "opacity-20 group-hover/item:opacity-100 transition-opacity")} />
                                                        <span className="font-medium">{ach.achievementText}</span>
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
                            <SectionHeader title="Technical Domain" num="03" />
                            <div className="ml-8 sm:ml-16 md:ml-20">
                                {(() => {
                                    const grouped = skills.reduce((acc, skill) => {
                                        const type = skill.skillType || 'professional'
                                        if (!acc[type]) acc[type] = []
                                        acc[type].push(skill)
                                        return acc
                                    }, {} as Record<string, typeof skills>)

                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                            {Object.entries(grouped).map(([type, list]) => (
                                                <div key={type} className="">
                                                    <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-neutral-300 mb-4 sm:mb-6">
                                                        {type}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 sm:gap-4">
                                                        {list.map((s, i) => (
                                                            <span 
                                                                key={i} 
                                                                className={cn("text-[11px] sm:text-[13px] font-black px-4 py-2 sm:px-6 sm:py-3 border-2 sm:border-[4px] uppercase tracking-widest transition-all hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.05)]", borderColorClass, textColorClass)}
                                                            >
                                                                {s.skillName}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                })()}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Academic Base" num="04" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 ml-8 sm:ml-16 md:ml-20">
                                {education.map((edu, i) => (
                                    <div key={i} className={cn("group", edu.forcePageBreak && "force-page-break")}>
                                        <h3 className="text-md sm:text-[18px] font-black uppercase text-neutral-955 mb-2 tracking-tight group-hover:translate-x-1 transition-transform break-words">
                                            {edu.degree}
                                        </h3>
                                        <div className={cn("text-xs sm:text-[13px] font-black uppercase tracking-[0.2em] break-words", textColorClass)}>
                                            {edu.institutionName} <span className="text-neutral-200 mx-2">/</span> {edu.endYear}
                                        </div>
                                        {edu.gpa && (
                                            <div className="text-[10px] sm:text-[12px] text-neutral-400 font-black uppercase tracking-widest border-t border-neutral-50 pt-2 sm:pt-4 mt-2 sm:mt-4">SCORE: {edu.gpa}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Auxiliary Section (Projects, Certs, Languages) */}
                    {(projects?.length || certifications?.length || languages?.length) && (
                        <section>
                            <SectionHeader title="Auxiliary Data" num="05" />
                            <div className="ml-8 sm:ml-16 md:ml-20 space-y-12 sm:space-y-16">
                                {projects && projects.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                                        {projects.map((proj, i) => (
                                            <div key={i} className={cn(proj.forcePageBreak && "force-page-break")}>
                                                <h4 className="text-sm sm:text-[16px] font-black uppercase text-neutral-900 mb-2">{proj.projectName}</h4>
                                                <p className="text-xs sm:text-[14px] text-neutral-500 font-medium italic mb-3 sm:mb-4">{proj.description}</p>
                                                {proj.toolsUsed && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {proj.toolsUsed.map((t, ti) => (
                                                            <span key={ti} className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-neutral-100 px-2.5 py-1">{t}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                                    {certifications && certifications.length > 0 && (
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-neutral-200">Credentials</div>
                                            {certifications.map((c, i) => (
                                                <div key={i} className={cn("border-l-2 sm:border-l-4 border-neutral-100 pl-4 sm:pl-6 py-1 sm:py-2", c.forcePageBreak && "force-page-break")}>
                                                    <div className="text-sm font-black text-neutral-900 break-words">{c.certificationName}</div>
                                                    <div className={cn("text-[10px] sm:text-[11px] font-black uppercase tracking-widest mt-1", textColorClass)}>{c.issuingOrganization}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {languages && languages.length > 0 && (
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-neutral-200">Linguistics</div>
                                            <div className="flex flex-wrap gap-6 sm:gap-8">
                                                {languages.map((l, i) => (
                                                    <div key={i} className="flex flex-col gap-0.5">
                                                        <span className="text-md sm:text-[16px] font-black uppercase tracking-tighter text-neutral-955">{l.languageName}</span>
                                                        <span className={cn("text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em]", textColorClass)}>{l.proficiencyLevel}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Final Geometric element */}
                    <footer className="mt-20 ml-8 sm:ml-16 md:ml-20 pt-12 sm:pt-16 border-t-4 sm:border-t-8 border-neutral-950 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                        <div className="flex items-center gap-6 sm:gap-8">
                            <div className={cn("w-12 h-12 sm:w-16 sm:h-16 transition-transform hover:rotate-90", bgColorClass)} />
                            <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 sm:border-[4px] border-neutral-950" />
                            <div className={cn("w-12 h-12 sm:w-16 sm:h-16 rounded-full", bgColorClass, "opacity-10")} />
                        </div>
                        <div className="text-center md:text-right">
                            <div className="text-[10px] sm:text-[11px] font-black text-neutral-300 uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-1 sm:mb-2">Bauhaus Synthesis</div>
                            <div className="text-[12px] sm:text-[14px] font-black text-neutral-950 tracking-tighter">System 2026 Release</div>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    )
}
