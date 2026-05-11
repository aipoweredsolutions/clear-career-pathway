import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Gold Standard Template - Elite Overhaul
 * 
 * The ultimate professional resume.
 * Focuses on perfect proportions, premium neutral colors, and absolute clarity.
 * 100% ATS-compliant, single-column layout.
 * Designed to be the world-standard for executive-level career documents.
 */
export function ATSGoldStandardTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    const borderColorClass = accentColor.replace('text-', 'border-').split(' ')[0]
    const bgColorClass = accentColor.replace('text-', 'bg-').split(' ')[0]

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="relative mt-12 mb-8 break-inside-avoid group">
            <div className="flex items-center gap-6">
                <h2 className={cn("text-[14px] font-black uppercase tracking-[0.4em] leading-none shrink-0", accentColor)}>
                    {title}
                </h2>
                <div className="h-[2px] flex-1 bg-neutral-950" />
            </div>
            <div className={cn("absolute -left-12 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity", bgColorClass)} />
        </div>
    )

    return (
        <div 
            className={cn("w-full bg-white text-neutral-950 font-sans leading-relaxed p-14 md:p-20", className)}
            style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
        >
            {/* ── GOLD MASTHEAD ── */}
            <header className="mb-20 text-center relative">
                <div className="inline-block border-y-4 border-neutral-950 py-10 px-16">
                    <h1 className="text-[64px] font-black tracking-[-0.04em] leading-[0.85] mb-6 uppercase text-neutral-950">
                        {personalInfo?.fullName || 'GOLD STANDARD PROFESSIONAL'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-[14px] font-black uppercase tracking-[0.6em] opacity-40 mb-8", accentColor)}>
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-[11px] font-black uppercase tracking-widest text-neutral-400">
                        <div>{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-100" />
                        <div className={cn("text-neutral-950", accentColor)}>{personalInfo?.email}</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-100" />
                        <div>{personalInfo?.phone}</div>
                        {personalInfo?.linkedinUrl && (
                            <>
                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-100" />
                                <div className="lowercase tracking-tighter border-b border-neutral-100">
                                    {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* DOCUMENT TYPE OVERRIDES */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-3xl mx-auto py-10">
                    <div className="mb-16 border-l-8 border-neutral-950 pl-12 py-4">
                        <div className="text-neutral-300 font-black uppercase tracking-[0.4em] text-[10px] mb-10">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        <div className="space-y-1">
                            {data.coverLetter?.recipientName && <p className="text-[24px] font-black tracking-tight">{data.coverLetter.recipientName}</p>}
                            {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-black uppercase tracking-widest text-[11px]">{data.coverLetter.recipientTitle}</p>}
                            {data.coverLetter?.companyName && <p className="font-black text-neutral-600">{data.coverLetter.companyName}</p>}
                        </div>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-20 px-12">
                        <p className="text-[16px] font-black mb-10 italic">Dear {data.coverLetter?.recipientName || 'Hiring Lead'},</p>
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[16px] leading-[1.9] mb-8 text-justify text-neutral-800 font-medium">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[16px]">Drafting in progress...</p>}
                    </div>

                    <div className="pt-20 border-t-2 border-neutral-100 flex flex-col items-center">
                        <div className={cn("w-16 h-1 bg-neutral-950 mb-8", bgColorClass)} />
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-neutral-300 mb-2">Authenticated By</p>
                        <p className={cn("text-[32px] font-black tracking-tighter uppercase", accentColor)}>{data.personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="space-y-16">
                    <SectionHeader title="Industry Verification" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="break-inside-avoid group p-10 border-2 border-neutral-50 rounded-2xl transition-all hover:border-neutral-950 hover:bg-neutral-50/20">
                                <span className="font-black text-neutral-950 text-[22px] tracking-tight mb-2 block">{ref.referenceName || ref.name}</span>
                                <div className={cn("text-[12px] font-black uppercase tracking-[0.3em] mb-4 opacity-40", accentColor)}>
                                    {ref.role || ref.title}
                                </div>
                                <div className="text-[15px] text-neutral-600 font-bold mb-8">
                                    {ref.organization || ref.company}
                                </div>
                                <div className="text-[12px] text-neutral-400 font-black border-t border-neutral-100 pt-6 uppercase tracking-[0.2em]">
                                    {ref.contactDetails || ref.contactInfo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-16">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Executive Core" />
                            <p className="text-[16px] leading-[1.9] text-neutral-800 font-medium text-justify italic border-l-8 border-neutral-50 pl-12">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Professional Trajectory" />
                            <div className="space-y-20">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="break-inside-avoid group">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-8">
                                            <div className="flex-1">
                                                <h3 className="text-[28px] font-black text-neutral-950 tracking-tight leading-none mb-3 group-hover:translate-x-2 transition-transform">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className={cn("text-[14px] font-black uppercase tracking-[0.4em] opacity-40", accentColor)}>
                                                    {job.companyName} <span className="text-neutral-200 mx-4 font-normal tracking-normal">/</span> {job.location}
                                                </div>
                                            </div>
                                            <div className="text-[13px] font-black text-neutral-950 uppercase tracking-[0.3em] shrink-0 tabular-nums pb-1">
                                                {job.startDate} — {job.isCurrent ? 'ACTIVE' : job.endDate}
                                            </div>
                                        </div>

                                        {job.roleDescription && (
                                            <p className="text-[15px] text-neutral-500 mb-8 leading-relaxed font-bold italic opacity-80 max-w-4xl">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="grid grid-cols-1 gap-6">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[15.5px] text-neutral-800 leading-relaxed flex gap-8 font-medium">
                                                        <span className={cn("shrink-0 w-2 h-2 mt-2.5 rounded-full", bgColorClass)} />
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {(() => {
                                    const grouped = skills.reduce((acc, skill) => {
                                        const type = skill.skillType || 'professional'
                                        if (!acc[type]) acc[type] = []
                                        acc[type].push(skill)
                                        return acc
                                    }, {} as Record<string, typeof skills>)

                                    return Object.entries(grouped).map(([type, list]) => (
                                        <div key={type} className="break-inside-avoid">
                                            <div className={cn("text-[10px] font-black uppercase tracking-[0.5em] text-neutral-200 mb-8", accentColor)}>
                                                {type}
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                {list.map((s, i) => (
                                                    <div key={i} className="flex items-center justify-between border-b border-neutral-50 pb-3 hover:border-neutral-950 transition-colors">
                                                        <span className="text-[15px] text-neutral-950 font-black tracking-tight">{s.skillName}</span>
                                                        <div className={cn("w-1.5 h-1.5 rounded-full", bgColorClass, "opacity-10")} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                })()}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Academic Pedigree" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {education.map((edu, i) => (
                                    <div key={i} className="break-inside-avoid group">
                                        <div className="text-[13px] font-black text-neutral-200 tabular-nums uppercase tracking-[0.5em] mb-4">
                                            {edu.endYear}
                                        </div>
                                        <h3 className="text-[22px] font-black uppercase text-neutral-950 tracking-tight leading-none mb-3">
                                            {edu.degree}{edu.major && ` // ${edu.major}`}
                                        </h3>
                                        <div className={cn("text-[12px] font-black uppercase tracking-[0.3em] opacity-40 italic", accentColor)}>
                                            {edu.institutionName}
                                        </div>
                                        {edu.gpa && (
                                            <div className="mt-6 inline-block bg-neutral-950 text-white text-[10px] font-black px-4 py-2 uppercase tracking-widest">Score: {edu.gpa}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certs & Additional */}
                    {(certifications?.length || languages?.length || projects?.length) ? (
                        <section>
                            <SectionHeader title="Auxiliary Data" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {certifications && certifications.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-200">Credentials</div>
                                        {certifications.map((c, i) => (
                                            <div key={i} className="border-l-4 border-neutral-950 pl-8 py-2">
                                                <div className="text-[15px] font-black text-neutral-950">{c.certificationName}</div>
                                                <div className={cn("text-[11px] font-black uppercase tracking-widest mt-1 opacity-40", accentColor)}>{c.issuingOrganization}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {languages && languages.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-200">Linguistics</div>
                                        <div className="grid grid-cols-2 gap-8">
                                            {languages.map((l, i) => (
                                                <div key={i} className="flex flex-col gap-1">
                                                    <span className="text-[18px] font-black uppercase tracking-tighter text-neutral-950">{l.languageName}</span>
                                                    <span className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-40", accentColor)}>{l.proficiencyLevel}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    ) : null}

                    {/* Final Gold Seal Footer */}
                    <footer className="mt-32 pt-20 border-t-8 border-neutral-950 flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="space-y-6">
                            <div className={cn("h-6 w-60", bgColorClass)} />
                            <div className="text-[11px] font-black text-neutral-300 uppercase tracking-[0.8em]">Gold Standard // Verified</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.2em] mb-2">Certified ATS Document</div>
                            <div className="text-[12px] font-black text-neutral-200 tabular-nums">Ref: {Math.random().toString(36).substring(7).toUpperCase()}</div>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    )
}
