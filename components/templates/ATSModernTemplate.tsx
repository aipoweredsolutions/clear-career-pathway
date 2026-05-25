import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSModernTemplate({ data, className, accentColor = 'text-indigo-600' }: TemplateProps) {
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
        <div className="flex items-center gap-4 mb-8 mt-12 group">
            <div className={cn("w-1.5 h-6 rounded-full shrink-0", bgColorClass)} />
            <h2 className={cn("text-[13px] font-black uppercase tracking-[0.4em] shrink-0", accentColor)}>
                {title}
            </h2>
            <div className="flex-1 h-px bg-neutral-100" />
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-800 font-sans leading-relaxed p-8 md:p-10 relative overflow-hidden",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── ELITE MODERN HEADER ── */}
            <header className="relative mb-8">
                <div className="absolute -left-16 -top-16 w-32 h-32 rounded-full bg-neutral-50 blur-3xl -z-10" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex-1">
                        <h1 className="text-[32px] font-black tracking-[-0.04em] leading-none mb-2 uppercase text-neutral-950 whitespace-nowrap truncate">
                            {personalInfo?.fullName || 'MODERN ELITE'}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className={cn("h-[2px] w-8", bgColorClass)} />
                            <div className={cn("text-[15px] font-black uppercase tracking-[0.25em] opacity-50", accentColor)}>
                                {personalInfo?.professionalTitle}
                            </div>
                        </div>
                    </div>
                    
                    <div className="shrink-0 flex flex-col gap-1 text-[11px] font-black uppercase tracking-widest text-neutral-400 text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-neutral-100 pl-4 md:pl-0 md:pr-4 py-1">
                        <div className="text-neutral-900">{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>
                        <div>{personalInfo?.email}</div>
                        <div>{personalInfo?.phone}</div>
                        {personalInfo?.linkedinUrl && (
                            <div className={cn("mt-1 text-[10px]", accentColor)}>
                                {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* DOCUMENT TYPE OVERRIDES */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-2xl">
                    <div className="mb-8 space-y-1 text-[14px]">
                        <p className="text-neutral-300 font-black uppercase tracking-widest text-[10px] mb-6 italic">Date {" // "} {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-black text-neutral-950 text-[16px]">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-black uppercase tracking-[0.2em] text-[11px]">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-black text-neutral-700">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="prose prose-neutral max-w-none mb-10">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[14px] leading-[1.8] mb-4 text-neutral-800 font-medium">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[14px]">Content Pending...</p>}
                    </div>

                    <div className="pt-6 border-t-2 border-neutral-950 inline-block">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-2">Sincerely,</p>
                        <p className={cn("text-[24px] font-black tracking-tighter uppercase", accentColor)}>{data.personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="space-y-8">
                    <SectionHeader title="Professional Endorsements" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="flex flex-col gap-2 p-6 bg-neutral-50/50 border-t-4 border-neutral-900 group hover:bg-white transition-colors duration-300 shadow-sm hover:shadow-md">
                                <span className="font-black text-neutral-950 text-[16px] tracking-tight">{ref.referenceName || ref.name}</span>
                                <div className={cn("text-[11px] font-black uppercase tracking-[0.2em]", accentColor)}>
                                    {ref.role || ref.title}
                                </div>
                                <div className="text-[13px] text-neutral-600 font-bold mb-2 italic">
                                    {ref.organization || ref.company}
                                </div>
                                <div className="text-[11px] text-neutral-400 font-black tabular-nums pt-3 border-t border-neutral-100">
                                    {ref.contactDetails || ref.contactInfo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    {/* Executive Summary */}
                    {professionalSummary?.summaryText && (
                        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-12">
                                <SectionHeader title="Performance Summary" />
                                <p className="text-[14px] leading-[1.7] text-neutral-800 font-medium text-justify px-6 border-l-4 border-neutral-50">
                                    {professionalSummary.summaryText}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Professional Experience" />
                            <div className="space-y-8 mt-4">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="group relative">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 gap-2">
                                            <div className="flex-1">
                                                <h3 className="text-[20px] font-black text-neutral-950 tracking-tighter leading-none mb-2 group-hover:translate-x-1 transition-transform">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[10px] text-neutral-500 font-bold uppercase tracking-[0.1em] border-y border-neutral-50 py-2">
                                                    <span>{job.companyName}</span>
                                                    <span className={cn("w-1 h-1 rounded-full", bgColorClass, "opacity-20")} />
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>
                                            <div className="text-[11px] font-black text-neutral-950 tabular-nums uppercase tracking-widest border border-neutral-950 px-2 py-0.5 shrink-0">
                                                {job.startDate} — {job.isCurrent ? 'PRESENT' : job.endDate}
                                            </div>
                                        </div>

                                        {job.roleDescription && (
                                            <p className="text-[13.5px] text-neutral-500 mb-6 leading-relaxed font-bold italic border-l-4 border-neutral-50 pl-8 ml-4">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="grid grid-cols-1 gap-y-3 pl-12 border-l-2 border-neutral-50 ml-4">
                                                {job.achievements.map((a, j) => (
                                                    <li key={j} className="text-[14.5px] text-neutral-800 leading-relaxed flex gap-4 font-medium relative">
                                                        <span className={cn("absolute -left-[54px] top-2.5 w-2 h-2 rounded-full border-4 border-white", bgColorClass)} />
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
                            <div className="space-y-8 px-4">
                                {Object.entries(skills.reduce((acc, s) => {
                                    const t = s.skillType || 'professional';
                                    if (!acc[t]) acc[t] = [];
                                    acc[t].push(s);
                                    return acc;
                                }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                    <div key={type} className="group">
                                        <div className={cn("text-[9px] font-black uppercase tracking-[0.4em] mb-4 opacity-40", accentColor)}>
                                            {type}
                                        </div>
                                        <div className="flex flex-wrap gap-x-4 gap-y-3">
                                            {list.map((s, i) => (
                                                <div key={i} className="text-[13px] text-neutral-950 font-black tracking-tight bg-neutral-50 px-3 py-1.5 rounded border border-neutral-100 hover:border-neutral-300 transition-colors">
                                                    {s.skillName}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Academic Credentials" />
                            <div className="space-y-8 px-4">
                                {education.map((edu, i) => (
                                    <div key={i} className="group">
                                        <div className="text-[12px] font-black text-neutral-950 tabular-nums uppercase tracking-widest mb-3">
                                            {edu.endYear || 'Current'}
                                        </div>
                                        <h3 className="text-[16px] font-black text-neutral-950 tracking-tight leading-tight uppercase group-hover:text-neutral-600 transition-colors">
                                            {edu.degree}
                                        </h3>
                                        <div className={cn("text-[11px] font-black uppercase tracking-[0.2em] opacity-40 mt-1", accentColor)}>
                                            {edu.institutionName}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Credentials & Languages */}
                    {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
                        <div className="space-y-10 mt-10 pt-10 border-t-2 border-neutral-950">
                            {certifications && certifications.length > 0 && (
                                <section>
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-8 italic">Verified Licenses</h3>
                                    <div className="space-y-6 px-4">
                                        {certifications.map((c, i) => (
                                            <div key={i} className="flex flex-col gap-1 border-l-4 border-neutral-50 pl-6 hover:border-neutral-200 transition-colors">
                                                <div className="text-[14px] font-black text-neutral-950 tracking-tight">{c.certificationName}</div>
                                                <div className={cn("text-[10px] font-black uppercase tracking-widest mt-1 opacity-40", accentColor)}>
                                                    {c.issuingOrganization}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {languages && languages.length > 0 && (
                                <section>
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-8 italic">Linguistic Mastery</h3>
                                    <div className="space-y-4 px-4">
                                        {languages.map((l, i) => (
                                            <div key={i} className="flex justify-between items-center pb-4 border-b border-neutral-50 group max-w-md">
                                                <span className="text-[14px] font-black text-neutral-950 tracking-tighter group-hover:translate-x-2 transition-transform">{l.languageName}</span>
                                                <span className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-40", accentColor)}>{l.proficiencyLevel}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Footer Terminal */}
            <footer className="mt-16 flex justify-between items-end opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="text-[9px] font-black uppercase tracking-[0.5em] text-neutral-400">
                    Modern Elite {" // "} Revision {Math.floor(Math.random() * 1000)}
                </div>
                <div className={cn("h-1 w-16", bgColorClass)} />
            </footer>
        </div>
    )
}

