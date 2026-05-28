import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Professional Template - Corporate Elite Overhaul (V2)
 * 
 * "Industrial Authority" design.
 * Designed for senior executives and high-stakes professionals.
 * Focuses on 'Weight' and 'Precision' through heavy typography, 
 * sharp structural lines, and high-density content layouts.
 */
export function ATSProfessionalTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        projects,
        achievements,
        languages,
        references
    } = data

    const borderColorClass = accentColor.replace('text-', 'border-').split(' ')[0]
    const bgColorClass = accentColor.replace('text-', 'bg-').split(' ')[0]

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-8 mb-5 group relative">
            <div className="flex items-center gap-4 border-b border-neutral-300 pb-2.5">
                <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.15em] leading-none shrink-0", accentColor)}>
                    {title}
                </h2>
                <div className="flex-1 h-px bg-neutral-200" />
            </div>
            <div className={cn("absolute -bottom-px left-0 w-16 h-0.5", bgColorClass)} />
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── PROFESSIONAL HEADER ── */}
            <header className="flex flex-col gap-4 mb-8 border-b-2 border-neutral-900 pb-6">
                <div className="w-full relative">
                    <h1 className="text-[36px] font-bold tracking-tight leading-none mb-2 text-neutral-950">
                        {personalInfo?.fullName || 'Professional'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <div className="flex items-center gap-3">
                            <div className={cn("h-0.5 w-8", bgColorClass)} />
                            <div className={cn("text-[12px] font-semibold tracking-wide", accentColor)}>
                                {personalInfo.professionalTitle}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11.5px] text-neutral-600 border-l-2 border-neutral-200 pl-4 py-1">
                    {(personalInfo?.location || personalInfo?.city || personalInfo?.country) && (
                        <div className="font-medium text-neutral-900">
                            {personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}
                        </div>
                    )}
                    {personalInfo?.email && <div className={cn("font-medium", accentColor)}>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="tabular-nums">{personalInfo.phone}</div>}
                    {personalInfo?.linkedinUrl && (
                        <div className="text-neutral-500">
                            {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                        </div>
                    )}
                </div>
            </header>

            {/* DOCUMENT TYPE OVERRIDES */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-3xl">
                    <div className="mb-10 space-y-2 text-[15px]">
                        <div className="text-neutral-300 font-black uppercase tracking-[0.4em] text-[11px] mb-8">Serial {" // "} {Math.random().toString(36).substring(7).toUpperCase()}</div>
                        {data.coverLetter?.recipientName && <p className="font-black text-neutral-950 text-[18px] tracking-tight">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-black uppercase tracking-widest text-[12px]">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-black text-neutral-700 italic border-l-4 border-neutral-100 pl-4">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="prose prose-neutral max-w-none mb-16">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[15px] leading-[1.8] mb-6 text-justify text-neutral-800 font-medium border-l-2 border-neutral-50 pl-8 ml-2">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[15px]">Narrative pending extraction...</p>}
                    </div>

                    <div className="pt-10 border-t-8 border-neutral-950 flex flex-col gap-4">
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-300">Respectfully Signed,</p>
                        <p className={cn("text-[48px] font-black tracking-[-0.05em] uppercase", accentColor)}>{data.personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="space-y-8">
                    <SectionHeader title="Validated Endorsements" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="flex gap-6 p-8 bg-neutral-950 text-white shadow-lg relative overflow-hidden group">
                                <div className={cn("absolute top-0 right-0 w-24 h-24 rotate-45 translate-x-12 -translate-y-12 opacity-10", bgColorClass)} />
                                <div className="flex flex-col gap-2 relative z-10">
                                    <span className="font-black text-[20px] tracking-tighter leading-none">{ref.referenceName || ref.name}</span>
                                    <div className={cn("text-[11px] font-black uppercase tracking-[0.3em] opacity-60", accentColor)}>
                                        {ref.role || ref.title}
                                    </div>
                                    <div className="text-[14px] font-bold text-neutral-400 italic mb-4">
                                        {ref.organization || ref.company}
                                    </div>
                                    <div className="text-[12px] font-black text-neutral-500 tabular-nums pt-4 border-t border-neutral-800">
                                        {ref.contactDetails || ref.contactInfo}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Executive Summary */}
                    {professionalSummary?.summaryText && (
                        <section className="relative mb-7">
                            <div className="flex items-center gap-4 mb-3">
                                <h2 className={cn("text-[10.5px] font-bold uppercase tracking-[0.15em] whitespace-nowrap", accentColor)}>
                                    Professional Summary
                                </h2>
                                <div className="flex-1 h-px bg-neutral-200" />
                            </div>
                            <p className="text-[12.5px] leading-[1.7] text-neutral-700 font-normal">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Work Experience" />
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="group relative">
                                        {/* Header Row */}
                                        <div className="flex flex-col gap-1 mb-2.5 border-l-2 border-neutral-900 pl-4">
                                            <div>
                                                <h3 className="text-[14px] font-bold text-neutral-950 tracking-tight leading-tight">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-2 text-[11.5px] font-medium text-neutral-600">
                                                    {job.companyName}
                                                    {job.location && <span className="text-neutral-300">/</span>}
                                                    {job.location && <span className="text-neutral-500">{job.location}</span>}
                                                </div>
                                            </div>
                                            <div className="text-[11px] font-medium text-neutral-500 tabular-nums">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="ml-5">
                                            {job.roleDescription && (
                                                <p className="text-[12px] text-neutral-600 mb-2.5 leading-[1.65] font-normal italic">
                                                    {job.roleDescription}
                                                </p>
                                            )}

                                            {job.achievements && job.achievements.length > 0 && (
                                                <ul className="space-y-2">
                                                    {job.achievements.map((a, j) => (
                                                        <li key={j} className="text-[12.5px] text-neutral-700 leading-[1.65] flex gap-3 font-normal">
                                                            <div className="shrink-0 mt-2">
                                                                <div className={cn("w-1 h-1 rounded-full", bgColorClass)} />
                                                            </div>
                                                            <span>{a.achievementText}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills Section */}
                    <div className="pt-4">
                        <SectionHeader title={"Skills"} />
                        <div className="flex flex-col gap-6 px-2">
                            {skills && Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-2 border-b border-neutral-100 pb-4 last:border-0 last:pb-0 group">
                                    <div className={cn("text-[10px] font-bold uppercase tracking-[0.12em] shrink-0 pb-1", accentColor)}>
                                        {type}
                                    </div>
                                    <div className="flex flex-wrap gap-2 flex-1">
                                        {list.map((s, i) => (
                                            <div key={i} className="text-[11.5px] text-neutral-800 font-medium tracking-normal px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-sm hover:border-neutral-400 hover:bg-white transition-all duration-200">
                                                {s.skillName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Data Sections */}
                    <div className="space-y-10 mt-8 pt-6 border-t border-neutral-200">
                        {/* Education */}
                        {education && education.length > 0 && (
                            <section>
                                <h3 className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-5">Education</h3>
                                <div className="space-y-6">
                                    {education.map((edu, i) => (
                                        <div key={i} className="group relative pl-5 border-l-2 border-neutral-200 hover:border-neutral-900 transition-colors">
                                            <div className="text-[11.5px] font-medium text-neutral-500 tabular-nums mb-1">
                                                {edu.endYear}
                                            </div>
                                            <h4 className="text-[13px] font-bold text-neutral-950 tracking-tight leading-tight mb-1">
                                                {edu.degree}
                                            </h4>
                                            <div className={cn("text-[11px] font-medium text-neutral-600")}>
                                                {edu.institutionName} {edu.location && ` · ${edu.location}`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {certifications && certifications.length > 0 && (
                            <section>
                                <h3 className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-5">Certifications</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {certifications.map((c, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-neutral-50 group hover:bg-neutral-100 transition-all duration-200 border-l-2 border-neutral-200">
                                            <div className="text-[12px] font-semibold tracking-tight">{c.certificationName}</div>
                                            <div className={cn("text-[10px] font-medium text-neutral-500")}>{c.issueYear}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {languages && languages.length > 0 && (
                            <section>
                                <h3 className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-5">Languages</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex justify-between items-center pb-3 border-b border-neutral-100 group">
                                            <span className="text-[12px] font-semibold text-neutral-950 tracking-tight group-hover:translate-x-1 transition-transform">{l.languageName}</span>
                                            <span className={cn("text-[10px] font-medium capitalize text-neutral-500")}>{l.proficiencyLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Final Signature Terminal */}
                    <footer className="pt-12 flex justify-between items-end gap-6">
                        <div className="space-y-2">
                            <div className={cn("h-3 w-40", bgColorClass)} />
                            <div className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.6em]">Corporate // Elite // Protocol // V2.5</div>
                        </div>
                        <div className="text-[9px] font-black text-neutral-200 uppercase tracking-[0.3em] tabular-nums">
                            Authenticated Record: {Math.random().toString(36).substring(2, 12).toUpperCase()}
                        </div>
                    </footer>
                </div>
            )}
        </div>
    )
}
