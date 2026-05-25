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
        <div className="mt-8 mb-6 group relative">
            <div className="flex items-center gap-4 border-b-2 border-neutral-900 pb-3">
                <h2 className={cn("text-[13px] font-black uppercase tracking-[0.4em] leading-none shrink-0", accentColor)}>
                    {title}
                </h2>
                <div className="flex-1 h-[2px] bg-neutral-100" />
                <div className={cn("w-3 h-3 border-4", borderColorClass, "shrink-0")} />
            </div>
            <div className={cn("absolute -bottom-[4px] left-0 w-20 h-1", bgColorClass)} />
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── ELITE CORPORATE MASTHEAD ── */}
            <header className="flex flex-col gap-4 mb-8 border-b-4 border-neutral-900 pb-6">
                <div className="w-full relative">
                    <div className={cn("absolute -top-10 -left-2 text-[64px] font-black opacity-[0.03] select-none uppercase tracking-tighter leading-none -z-10")}>
                        {personalInfo?.fullName?.split(' ')[0] || 'ELITE'}
                    </div>

                    <h1 className="text-[38px] font-black tracking-[-0.07em] leading-none mb-3 text-neutral-950 uppercase break-words">
                        {personalInfo?.fullName || 'Professional'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <div className="flex items-center gap-4">
                            <div className={cn("h-1 w-10", bgColorClass)} />
                            <div className={cn("text-[13px] font-black uppercase tracking-[0.3em] opacity-40", accentColor)}>
                                {personalInfo.professionalTitle}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-black uppercase tracking-widest text-neutral-400 border-l-4 border-neutral-100 pl-4 py-1">
                    <div className="text-neutral-950 tracking-normal normal-case text-[12px]">
                        {personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}
                    </div>
                    {personalInfo?.email && <div className={cn("text-neutral-900", accentColor)}>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="tabular-nums">{personalInfo.phone}</div>}
                    {personalInfo?.linkedinUrl && (
                        <div className="lowercase tracking-tight opacity-60">
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
                        <section className="relative">
                            <div className="flex items-center gap-4 mb-4">
                                <h2 className={cn("text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap", accentColor)}>
                                    Executive Synopsis
                                </h2>
                                <div className="flex-1 h-px bg-neutral-100" />
                            </div>
                            <p className="text-[13px] leading-[1.7] text-neutral-800 font-medium text-justify">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Professional Trajectory" />
                            <div className="space-y-7">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="group relative">
                                        {/* Temporal & Header Row */}
                                        <div className="flex flex-col gap-1 mb-3 border-l-4 border-neutral-900 pl-5">
                                            <div>
                                                <h3 className="text-[16px] font-black text-neutral-950 tracking-tighter leading-tight uppercase">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-neutral-400">
                                                    {job.companyName}
                                                    {job.location && <span className="opacity-30">/</span>}
                                                    {job.location && <span className="opacity-60">{job.location}</span>}
                                                </div>
                                            </div>
                                            <div className="text-[11px] font-black text-neutral-950 tabular-nums uppercase tracking-widest">
                                                {job.startDate} — {job.isCurrent ? 'ACTIVE' : job.endDate}
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="ml-6">
                                            {job.roleDescription && (
                                                <p className="text-[12px] text-neutral-500 mb-3 leading-[1.7] font-bold italic opacity-80">
                                                    {job.roleDescription}
                                                </p>
                                            )}

                                            {job.achievements && job.achievements.length > 0 && (
                                                <ul className="space-y-2">
                                                    {job.achievements.map((a, j) => (
                                                        <li key={j} className="text-[12.5px] text-neutral-800 leading-[1.6] flex gap-3 font-medium">
                                                            <div className="shrink-0 mt-2">
                                                                <div className={cn("w-1.5 h-1.5 rounded-sm rotate-45", bgColorClass)} />
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

                    {/* Matrix Section */}
                    <div className="pt-4">
                        <SectionHeader title={"Competency Matrix"} />
                        <div className="flex flex-col gap-8 px-2">
                            {skills && Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-2 border-b border-neutral-100 pb-4 last:border-0 last:pb-0 group">
                                    <div className={cn("text-[10px] font-black uppercase tracking-[0.3em] shrink-0 pb-1", accentColor)}>
                                        {type}
                                    </div>
                                    <div className="flex flex-wrap gap-2 flex-1">
                                        {list.map((s, i) => (
                                            <div key={i} className="text-[12px] text-neutral-900 font-bold tracking-tight px-3 py-1.5 bg-neutral-50 border border-neutral-100 rounded-sm hover:border-neutral-900 hover:bg-white transition-all duration-300">
                                                {s.skillName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Data Sections */}
                    <div className="space-y-12 mt-8 pt-8 border-t-2 border-neutral-100">
                        {/* Education */}
                        {education && education.length > 0 && (
                            <section>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-6 italic">Academic Credentials</h3>
                                <div className="space-y-8">
                                    {education.map((edu, i) => (
                                        <div key={i} className="group relative pl-6 border-l-4 border-neutral-50 hover:border-neutral-950 transition-colors">
                                            <div className="text-[13px] font-black text-neutral-950 tabular-nums tracking-widest mb-1">
                                                {edu.endYear}
                                            </div>
                                            <h4 className="text-[14px] font-black text-neutral-950 tracking-tighter leading-none mb-1 uppercase">
                                                {edu.degree}
                                            </h4>
                                            <div className={cn("text-[11px] font-black uppercase tracking-[0.2em] opacity-40", accentColor)}>
                                                {edu.institutionName} {" // "} {edu.location}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {certifications && certifications.length > 0 && (
                            <section>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-6 italic">Validation & Certs</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {certifications.map((c, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-neutral-50 group hover:bg-neutral-950 hover:text-white transition-all duration-300 border-l-2 border-neutral-200">
                                            <div className="text-[13px] font-black tracking-tight">{c.certificationName}</div>
                                            <div className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", accentColor)}>{c.issueYear}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {languages && languages.length > 0 && (
                            <section>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-6 italic">Linguistic Mastery</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex justify-between items-center pb-3 border-b border-neutral-50 group">
                                            <span className="text-[13px] font-black text-neutral-950 tracking-tighter group-hover:translate-x-1 transition-transform">{l.languageName}</span>
                                            <span className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-40", accentColor)}>{l.proficiencyLevel}</span>
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
