import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Metro Template - Elite Overhaul
 * 
 * Inspired by modern transit maps and architectural blueprints.
 * Uses a precise route-line system to guide the eye through the career trajectory.
 * 100% ATS-compliant single-column layout with high-fidelity design accents.
 */
export function ATSMetroTemplate({ data, className, accentColor = 'text-blue-600' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        volunteerExperience,
        languages,
        professionalAffiliations,
        publications,
        references,
        customSections
    } = data

    // Extract color for geometric elements
    const bgColorClass = accentColor.replace('text-', 'bg-').split(' ')[0]
    const borderColorClass = accentColor.replace('text-', 'border-').split(' ')[0]

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="relative mt-12 mb-8 group break-inside-avoid">
            {/* The "Station" Node */}
            <div className={cn(
                "absolute -left-[35px] top-1.5 w-6 h-6 rounded-full border-[5px] border-white z-20 shadow-sm transition-transform group-hover:scale-110",
                bgColorClass
            )} />
            <div className="flex items-center gap-4">
                <h2 className={cn("text-[13px] font-black uppercase tracking-[0.3em] leading-none", accentColor)}>
                    {title}
                </h2>
                <div className="h-[1px] flex-1 bg-neutral-100" />
            </div>
        </div>
    )

    const ItemMarker = () => (
        <div className={cn(
            "absolute -left-[29px] top-2.5 w-3 h-3 rounded-full border-2 bg-white z-10",
            borderColorClass
        )} />
    )

    const contactParts: string[] = []
    if (personalInfo?.location || (personalInfo?.city && personalInfo?.country)) {
        contactParts.push(personalInfo.location || `${personalInfo.city}, ${personalInfo.country}`)
    }
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)

    return (
        <div 
            className={cn("w-full bg-white text-neutral-900 font-sans leading-relaxed p-12 md:p-16", className)}
            style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
        >
            {/* ── METRO MASTHEAD ── */}
            <header className="mb-16 relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b-4 border-neutral-900">
                    <div className="flex-1">
                        <h1 className="text-[56px] font-black tracking-[-0.05em] leading-[0.85] mb-4 text-neutral-900">
                            {personalInfo?.fullName || 'Transit Professional'}
                        </h1>
                        {personalInfo?.professionalTitle && (
                            <div className={cn("text-[14px] font-black uppercase tracking-[0.4em] opacity-40", accentColor)}>
                                {personalInfo.professionalTitle}
                            </div>
                        )}
                    </div>

                    <div className="shrink-0 flex flex-col items-start md:items-end gap-1 text-[11px] font-black uppercase tracking-widest text-neutral-400">
                        {contactParts.map((part, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {i > 0 && <span className="hidden md:block opacity-20">/</span>}
                                {part}
                            </div>
                        ))}
                        {personalInfo?.linkedinUrl && (
                            <div className={cn("mt-2 border-b-2 leading-none", borderColorClass)}>
                                {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-2xl ml-8">
                    <div className="mb-12 space-y-1 text-[14px] text-neutral-800">
                        <p className="font-black text-neutral-300 mb-8 tracking-widest uppercase text-[10px]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-black text-neutral-900">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-black uppercase tracking-widest text-[11px] mt-1">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-black text-neutral-700">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="mb-10">
                        <p className="text-[14px] font-black text-neutral-900 italic">
                            Dear {data.coverLetter?.recipientName || 'Hiring Lead'},
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-16">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[14px] leading-[1.8] mb-6 text-justify text-neutral-700 font-medium">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[14px]">Your cover letter will appear here...</p>}
                    </div>

                    <div className="space-y-6 text-neutral-800 pt-10 border-t-2 border-neutral-100">
                        <div>
                            <p className="text-[14px] mb-2 font-black uppercase tracking-widest text-neutral-300">Onward,</p>
                            <p className={cn("text-[28px] font-black tracking-tighter", accentColor)}>{data.personalInfo?.fullName}</p>
                        </div>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="ml-8 space-y-12">
                    <SectionHeader title="Industry Connections" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="break-inside-avoid flex flex-col gap-2 p-8 bg-neutral-50/50 rounded-2xl border border-neutral-100">
                                <span className="font-black text-neutral-900 text-[18px] tracking-tight">{ref.referenceName || ref.name}</span>
                                <div className={cn("text-[12px] font-black uppercase tracking-[0.25em] mb-4 opacity-50", accentColor)}>
                                    {ref.role || ref.title}
                                </div>
                                <div className="text-[14px] text-neutral-600 font-bold italic">
                                    {ref.organization || ref.company}
                                </div>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <div className="text-[12px] text-neutral-400 font-black mt-6 pt-6 border-t border-neutral-100/50">
                                        {ref.contactDetails || ref.contactInfo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="relative ml-6 pl-10">
                    {/* ── THE ROUTE LINE ── */}
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", bgColorClass, "opacity-10")} />
                    
                    {/* Profile */}
                    {professionalSummary?.summaryText && (
                        <section className="relative">
                            <SectionHeader title="Executive Core" />
                            <p className="text-[14px] leading-[1.8] text-neutral-700 font-medium text-justify">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Professional Route" />
                            <div className="space-y-16">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="break-inside-avoid relative group">
                                        <ItemMarker />
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-[20px] font-black text-neutral-900 tracking-tighter leading-none mb-3 group-hover:translate-x-1 transition-transform">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className={cn("text-[13px] font-black uppercase tracking-[0.25em] opacity-40", accentColor)}>
                                                    {job.companyName}
                                                    {job.location && <span className="text-neutral-200 font-normal mx-4 opacity-40">/</span>}
                                                    {job.location}
                                                </div>
                                            </div>
                                            <div className="text-[12px] font-black text-neutral-300 uppercase tracking-[0.3em] shrink-0 tabular-nums">
                                                {job.startDate} — {job.isCurrent ? 'ACTIVE' : job.endDate}
                                            </div>
                                        </div>

                                        {job.roleDescription && (
                                            <p className="text-[14px] text-neutral-500 mb-8 leading-relaxed font-bold italic opacity-70">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-6">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[14.5px] text-neutral-800 leading-relaxed flex gap-6 font-medium">
                                                        <span className={cn("w-1.5 h-1.5 rounded-full mt-2.5 shrink-0", bgColorClass)} />
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

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <SectionHeader title="Capability Matrix" />
                            <div className="relative">
                                <ItemMarker />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {Object.entries(skills.reduce((acc, skill) => {
                                        const type = skill.skillType || 'professional'
                                        if (!acc[type]) acc[type] = []
                                        acc[type].push(skill)
                                        return acc
                                    }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                        <div key={type} className="flex flex-col gap-3">
                                            <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em]">
                                                {type}
                                            </div>
                                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                                {list.map((s, i) => (
                                                    <div key={i} className="text-[14px] text-neutral-900 font-black tracking-tight flex items-center gap-4">
                                                        {s.skillName}
                                                        {i < list.length - 1 && <span className="w-1 h-1 rounded-full bg-neutral-100" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Academic Terminal" />
                            <div className="space-y-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="break-inside-avoid relative">
                                        <ItemMarker />
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-6">
                                            <div className="flex-1">
                                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight leading-none mb-3">
                                                    {edu.degree}{edu.major && ` in ${edu.major}`}
                                                </h3>
                                                <div className="text-[12px] font-black text-neutral-400 uppercase tracking-[0.2em] italic">
                                                    {edu.institutionName}
                                                    {edu.location && <span className="mx-4 opacity-30 font-normal not-italic">/</span>}
                                                    {edu.location}
                                                </div>
                                            </div>
                                            <div className="text-[12px] font-black text-neutral-200 uppercase tracking-[0.3em] shrink-0 tabular-nums">
                                                {edu.endYear}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Additional */}
                    {(certifications?.length || languages?.length || projects?.length) ? (
                        <section>
                            <SectionHeader title="Auxiliary Data" />
                            <div className="relative space-y-12">
                                <ItemMarker />
                                {projects && projects.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {projects.map((proj, i) => (
                                            <div key={i} className="break-inside-avoid flex flex-col gap-2 p-6 bg-neutral-50/30 rounded-xl">
                                                <h4 className="text-[14px] font-black uppercase text-neutral-900">{proj.projectName}</h4>
                                                <p className="text-[12px] text-neutral-500 italic font-medium">{proj.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {certifications && certifications.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="text-[10px] font-black text-neutral-200 uppercase tracking-widest mb-4">Credentials</div>
                                            {certifications.map((c, i) => (
                                                <div key={i} className="text-[13px] font-black text-neutral-900 leading-tight">
                                                    {c.certificationName}
                                                    <span className="text-neutral-400 font-bold ml-2">[{c.issuingOrganization}]</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {languages && languages.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="text-[10px] font-black text-neutral-200 uppercase tracking-widest mb-4">Linguistics</div>
                                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                {languages.map((l, i) => (
                                                    <div key={i} className="text-[13px] font-black text-neutral-900">
                                                        {l.languageName}
                                                        <span className={cn("ml-2 opacity-30 text-[11px]", accentColor)}>{l.proficiencyLevel}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    ) : null}

                    {/* End Terminal Marker */}
                    <div className={cn("absolute -bottom-1 -left-[35px] w-6 h-6 rounded-full border-[5px] border-white z-20 shadow-sm", bgColorClass)} />
                </div>
            )}
        </div>
    )
}
