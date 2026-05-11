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
        <div className="flex items-end gap-6 mb-10 mt-16 group break-inside-avoid">
            <div className={cn(
                "w-16 h-16 flex items-center justify-center text-white font-black text-2xl shrink-0 transition-all group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.05)]",
                bgColorClass
            )} aria-hidden="true">
                {num}
            </div>
            <div className="flex-grow pb-2">
                <h2 className={cn("text-[16px] font-black uppercase tracking-[0.4em] mb-4", textColorClass)}>
                    {title}
                </h2>
                <div className="h-2 w-full bg-neutral-900" />
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
            className={cn('w-full bg-white text-neutral-900 leading-relaxed p-12 md:p-16', className)}
            style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
        >
            {/* ── BAUHAUS MASTHEAD ── */}
            <header className="mb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div className="flex-1">
                        {personalInfo?.fullName && (
                            <div className="mb-8">
                                {(() => {
                                    const parts = personalInfo.fullName.split(' ')
                                    const last = parts.pop()
                                    const rest = parts.join(' ')
                                    return (
                                        <div className="flex flex-col leading-[0.8]">
                                            <h1 className="text-[84px] font-black uppercase tracking-[-0.08em] text-neutral-950">{rest}</h1>
                                            <h1 className={cn("text-[84px] font-extralight uppercase tracking-[-0.08em]", textColorClass)}>{last}</h1>
                                        </div>
                                    )
                                })()}
                            </div>
                        )}
                        <div className="flex items-center gap-8">
                            <div className={cn("h-4 w-40", bgColorClass)} />
                            {personalInfo?.professionalTitle && (
                                <div className="text-[14px] font-black tracking-[0.5em] uppercase text-neutral-400">
                                    {personalInfo.professionalTitle}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="text-[11px] font-black text-neutral-400 tracking-[0.2em] flex flex-col gap-3 text-right uppercase italic">
                        {contactLines.map((line, i) => (
                            <span key={i} className="whitespace-nowrap border-r-4 pr-4 border-neutral-100">{line}</span>
                        ))}
                        {personalInfo?.linkedinUrl && (
                            <span className={cn("font-black tracking-[0.3em] mt-2", textColorClass)}>
                                {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* DOCUMENT TYPE OVERRIDES */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-3xl ml-20">
                    <div className="mb-12 space-y-1 text-[15px] text-neutral-800">
                        <p className="font-black text-neutral-300 mb-10 tracking-[0.3em] uppercase text-[11px]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-black text-[20px] tracking-tighter">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-bold uppercase tracking-widest text-[12px]">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-black text-neutral-800">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="mb-10">
                        <p className="text-[15px] font-black text-neutral-900 italic border-l-8 border-neutral-100 pl-8 py-2">
                            Dear {data.coverLetter?.recipientName || 'Hiring Lead'},
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-20">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[15px] leading-[1.9] mb-8 text-justify text-neutral-700 font-medium">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[15px]">Your cover letter will appear here...</p>}
                    </div>

                    <div className="flex items-center gap-10 pt-16 border-t-8 border-neutral-950">
                        <div className={cn("w-20 h-20", bgColorClass)} />
                        <div>
                            <p className="text-[13px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-2">Authenticated By</p>
                            <p className="text-[32px] font-black tracking-[-0.05em] uppercase">{data.personalInfo?.fullName}</p>
                        </div>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="ml-20 space-y-16">
                    <SectionHeader title="Verification Network" num="01" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="break-inside-avoid flex flex-col gap-3 group">
                                <span className="font-black text-neutral-950 text-[22px] tracking-tight group-hover:translate-x-2 transition-transform">{ref.referenceName || ref.name}</span>
                                <div className={cn("text-[12px] font-black uppercase tracking-[0.3em] mb-4", textColorClass)}>
                                    {ref.role || ref.title}
                                </div>
                                <div className="text-[15px] text-neutral-600 font-bold border-l-4 border-neutral-100 pl-6">
                                    {ref.organization || ref.company}
                                </div>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <div className="text-[13px] text-neutral-400 font-black mt-6 py-4 border-y border-neutral-50">
                                        {ref.contactDetails || ref.contactInfo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-16">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Core Objective" num="01" />
                            <div className="ml-24">
                                <p className="text-[16px] font-medium text-neutral-700 leading-[1.9] text-justify italic border-l-[12px] border-neutral-50 pl-12">
                                    {professionalSummary.summaryText}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Career Chronology" num="02" />
                            <div className="space-y-16 ml-24">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="break-inside-avoid relative group">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-6 gap-6">
                                            <div className="flex-1">
                                                <h3 className="text-[24px] font-black uppercase text-neutral-950 tracking-tight leading-none mb-3 group-hover:translate-x-2 transition-transform">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className={cn("text-[14px] font-black uppercase tracking-[0.3em]", textColorClass)}>
                                                    {job.companyName} <span className="text-neutral-200 mx-4">/</span> {job.location}
                                                </div>
                                            </div>
                                            <div className="text-[13px] font-black text-neutral-300 uppercase tracking-[0.4em] shrink-0 tabular-nums">
                                                {job.startDate} — {job.isCurrent ? 'ACTIVE' : job.endDate}
                                            </div>
                                        </div>
                                        
                                        {job.roleDescription && (
                                            <p className="text-[15px] font-bold text-neutral-500 mb-8 leading-relaxed italic opacity-80 max-w-3xl">
                                                {job.roleDescription}
                                            </p>
                                        )}
                                        
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-6">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[15px] text-neutral-800 flex gap-8 leading-relaxed group/item">
                                                        <span className={cn("shrink-0 w-3 h-3 mt-2", bgColorClass, "opacity-20 group-hover/item:opacity-100 transition-opacity")} />
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
                            <div className="ml-24">
                                {(() => {
                                    const grouped = skills.reduce((acc, skill) => {
                                        const type = skill.skillType || 'professional'
                                        if (!acc[type]) acc[type] = []
                                        acc[type].push(skill)
                                        return acc
                                    }, {} as Record<string, typeof skills>)

                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                            {Object.entries(grouped).map(([type, list]) => (
                                                <div key={type} className="break-inside-avoid">
                                                    <div className="text-[11px] font-black uppercase tracking-[0.5em] text-neutral-300 mb-8">
                                                        {type}
                                                    </div>
                                                    <div className="flex flex-wrap gap-4">
                                                        {list.map((s, i) => (
                                                            <span 
                                                                key={i} 
                                                                className={cn("text-[13px] font-black px-6 py-3 border-[4px] uppercase tracking-widest transition-all hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.05)]", borderColorClass, textColorClass)}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 ml-24">
                                {education.map((edu, i) => (
                                    <div key={i} className="break-inside-avoid group">
                                        <h3 className="text-[18px] font-black uppercase text-neutral-950 mb-3 tracking-tight group-hover:translate-x-1 transition-transform">
                                            {edu.degree}
                                        </h3>
                                        <div className={cn("text-[13px] font-black uppercase tracking-[0.25em] mb-4", textColorClass)}>
                                            {edu.institutionName} <span className="text-neutral-200 mx-2">/</span> {edu.endYear}
                                        </div>
                                        {edu.gpa && (
                                            <div className="text-[12px] text-neutral-400 font-black uppercase tracking-widest border-t border-neutral-50 pt-4 mt-4">SCORE: {edu.gpa}</div>
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
                            <div className="ml-24 space-y-16">
                                {projects && projects.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {projects.map((proj, i) => (
                                            <div key={i} className="break-inside-avoid">
                                                <h4 className="text-[16px] font-black uppercase text-neutral-900 mb-2">{proj.projectName}</h4>
                                                <p className="text-[14px] text-neutral-500 font-medium italic mb-4">{proj.description}</p>
                                                {proj.toolsUsed && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {proj.toolsUsed.map((t, ti) => (
                                                            <span key={ti} className="text-[10px] font-black uppercase tracking-widest bg-neutral-100 px-3 py-1">{t}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                    {certifications && certifications.length > 0 && (
                                        <div className="space-y-6">
                                            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-200">Credentials</div>
                                            {certifications.map((c, i) => (
                                                <div key={i} className="border-l-4 border-neutral-100 pl-6 py-2">
                                                    <div className="text-[14px] font-black text-neutral-900">{c.certificationName}</div>
                                                    <div className={cn("text-[11px] font-black uppercase tracking-widest mt-1", textColorClass)}>{c.issuingOrganization}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {languages && languages.length > 0 && (
                                        <div className="space-y-6">
                                            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-200">Linguistics</div>
                                            <div className="flex flex-wrap gap-8">
                                                {languages.map((l, i) => (
                                                    <div key={i} className="flex flex-col gap-1">
                                                        <span className="text-[16px] font-black uppercase tracking-tighter text-neutral-950">{l.languageName}</span>
                                                        <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", textColorClass)}>{l.proficiencyLevel}</span>
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
                    <footer className="mt-32 ml-24 pt-20 border-t-8 border-neutral-950 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex items-center gap-8">
                            <div className={cn("w-16 h-16 transition-transform hover:rotate-90", bgColorClass)} />
                            <div className="w-16 h-16 border-[4px] border-neutral-950" />
                            <div className={cn("w-16 h-16 rounded-full", bgColorClass, "opacity-10")} />
                        </div>
                        <div className="text-right">
                            <div className="text-[11px] font-black text-neutral-300 uppercase tracking-[0.5em] mb-2">Bauhaus Synthesis</div>
                            <div className="text-[14px] font-black text-neutral-950 tracking-tighter">System 2026 Release</div>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    )
}
