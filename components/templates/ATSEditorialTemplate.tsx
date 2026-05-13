import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Editorial Template - Elite Overhaul
 * 
 * "Editorial Elegance" design.
 * High-end magazine layout inspired by the Economist and New York Times.
 * Uses a unique three-column header and a balanced single-column body.
 * 100% ATS-compliant, focused on readability and sophistication.
 */
export function ATSEditorialTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    const borderColorClass = accentColor.replace('text-', 'border-').split(' ')[0]
    const bgColorClass = accentColor.replace('text-', 'bg-').split(' ')[0]

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex flex-col mb-8 mt-14  group">
            <div className={cn("w-12 h-1 mb-4", bgColorClass)} />
            <h2 className={cn("text-[14px] font-black uppercase tracking-[0.4em] mb-2", accentColor)}>
                {title}
            </h2>
            <div className="h-[2px] w-full bg-neutral-950" />
        </div>
    )

    return (
        <div 
            className={cn("w-full bg-white text-neutral-950 font-sans leading-relaxed p-14 md:p-20", className)}
            style={{ fontFamily: "'Inter', 'Georgia', serif" }}
        >
            {/* ── EDITORIAL MASTHEAD ── */}
            <header className="mb-20 border-b-8 border-neutral-950 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                    <div className="md:col-span-8">
                        <h1 className="text-[56px] font-black tracking-[-0.04em] leading-[0.85] mb-6 uppercase text-neutral-950">
                            {personalInfo?.fullName || 'EDITORIAL LEAD'}
                        </h1>
                        <div className={cn("text-[13px] font-black uppercase tracking-[0.5em] italic opacity-40", accentColor)}>
                            {personalInfo?.professionalTitle || 'Subject Matter Expert'}
                        </div>
                    </div>
                    <div className="md:col-span-4 flex flex-col gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400 text-left md:text-right">
                        <div className="pb-2 border-b border-neutral-100">{personalInfo?.email}</div>
                        <div className="pb-2 border-b border-neutral-100">{personalInfo?.phone}</div>
                        <div>{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>
                        {personalInfo?.linkedinUrl && (
                            <div className={cn("mt-4 font-black tracking-wider break-all", accentColor)}>
                                {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* DOCUMENT TYPE OVERRIDES */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-2xl mx-auto py-10">
                    <div className="mb-16">
                        <div className="text-neutral-300 font-black uppercase tracking-[0.5em] text-[10px] mb-12">Correspondence {'//'} {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        <div className="space-y-1">
                            {data.coverLetter?.recipientName && <p className="text-[20px] font-black tracking-tight">{data.coverLetter.recipientName}</p>}
                            {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-bold uppercase tracking-widest text-[11px]">{data.coverLetter.recipientTitle}</p>}
                            {data.coverLetter?.companyName && <p className="font-bold text-neutral-600">{data.coverLetter.companyName}</p>}
                        </div>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-20">
                        <p className="text-[16px] font-black italic mb-8">Dear {data.coverLetter?.recipientName || 'Hiring Lead'},</p>
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[16px] leading-[2] mb-8 text-justify text-neutral-800 font-medium first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[16px]">Drafting in progress...</p>}
                    </div>

                    <div className="pt-16 border-t-4 border-neutral-950 flex flex-col items-start gap-4">
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-neutral-300">Faithfully,</p>
                        <p className={cn("text-[32px] font-black tracking-tighter uppercase", accentColor)}>{data.personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="space-y-16">
                    <SectionHeader title="Editorial Endorsements" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {data.references?.map((ref, i) => (
                            <div key={i} className=" group border-l-8 border-neutral-50 pl-10 py-4 transition-colors hover:border-neutral-950">
                                <span className="font-black text-neutral-950 text-[24px] tracking-tight mb-2 block">{ref.referenceName || ref.name}</span>
                                <div className={cn("text-[12px] font-black uppercase tracking-[0.3em] mb-4 opacity-40", accentColor)}>
                                    {ref.role || ref.title}
                                </div>
                                <div className="text-[16px] text-neutral-600 font-bold italic mb-6">
                                    {ref.organization || ref.company}
                                </div>
                                <div className="text-[13px] text-neutral-400 font-black border-t border-neutral-50 pt-4 uppercase tracking-widest">
                                    {ref.contactDetails || ref.contactInfo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-20">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <div className="flex gap-12 items-start">
                                <div className={cn("w-2 h-16 shrink-0", bgColorClass)} />
                                <p className="text-[18px] leading-[2.1] text-neutral-800 font-medium italic text-justify">
                                    {professionalSummary.summaryText}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Career Narrative" />
                            <div className="space-y-24">
                                {workExperience.map((job, i) => (
                                    <div key={i} className=" group">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 gap-8 border-b-2 border-neutral-50 pb-4">
                                            <div className="flex-1">
                                                <h3 className="text-[28px] font-black text-neutral-950 tracking-tight leading-none mb-3 group-hover:translate-x-2 transition-transform">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className={cn("text-[14px] font-black uppercase tracking-[0.3em] opacity-40", accentColor)}>
                                                    {job.companyName}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start md:items-end gap-1">
                                                <div className="text-[12px] font-black text-neutral-950 uppercase tracking-widest bg-neutral-950 text-white px-3 py-1">
                                                    {job.startDate} — {job.isCurrent ? 'PRESENT' : job.endDate}
                                                </div>
                                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">
                                                    {job.location}
                                                </div>
                                            </div>
                                        </div>

                                        {job.roleDescription && (
                                            <p className="text-[16px] text-neutral-500 mb-10 leading-relaxed font-bold italic max-w-4xl">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                                                {job.achievements.map((ach, j) => (
                                                    <div key={j} className="text-[15.5px] text-neutral-800 leading-relaxed flex gap-6 font-medium">
                                                        <span className={cn("shrink-0 font-black", accentColor)}>—</span>
                                                        <span>{ach.achievementText}</span>
                                                    </div>
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
                            <SectionHeader title="Expertise Portfolio" />
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                                {(() => {
                                    const grouped = skills.reduce((acc, skill) => {
                                        const type = skill.skillType || 'professional'
                                        if (!acc[type]) acc[type] = []
                                        acc[type].push(skill)
                                        return acc
                                    }, {} as Record<string, typeof skills>)

                                    return Object.entries(grouped).map(([type, list]) => (
                                        <div key={type} className="md:col-span-6  bg-neutral-50/50 p-10 rounded-2xl border border-neutral-100">
                                            <div className={cn("text-[10px] font-black uppercase tracking-[0.5em] mb-10 opacity-30", accentColor)}>
                                                {type}
                                            </div>
                                            <div className="flex flex-wrap gap-x-10 gap-y-6">
                                                {list.map((s, i) => (
                                                    <div key={i} className="text-[15px] text-neutral-950 font-black tracking-tight border-b-2 border-neutral-200 pb-1">
                                                        {s.skillName}
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
                            <SectionHeader title="Academic Credentials" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {education.map((edu, i) => (
                                    <div key={i} className=" group">
                                        <div className="flex items-center gap-6 mb-4">
                                            <div className="text-[13px] font-black text-neutral-200 tabular-nums uppercase tracking-[0.4em]">
                                                {edu.endYear}
                                            </div>
                                            <div className={cn("h-px flex-1 bg-neutral-100 group-hover:bg-neutral-950 transition-colors", bgColorClass)} />
                                        </div>
                                        <h3 className="text-[20px] font-black uppercase text-neutral-950 tracking-tight leading-none mb-3">
                                            {edu.degree}
                                        </h3>
                                        <div className={cn("text-[12px] font-black uppercase tracking-[0.3em] opacity-40 italic", accentColor)}>
                                            {edu.institutionName} {'//'} {edu.location}
                                        </div>
                                        {edu.gpa && (
                                            <div className="mt-4 text-[11px] font-black text-neutral-300 uppercase tracking-widest border-t border-neutral-50 pt-2">DISTINCTION: {edu.gpa}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Final Editorial Footer */}
                    <footer className="mt-32 pt-20 border-t-8 border-neutral-950 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="text-[11px] font-black text-neutral-200 uppercase tracking-[0.8em]">Editorial Collective</div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={cn("w-10 h-10", i % 2 === 0 ? "bg-neutral-950" : bgColorClass, i === 5 && "opacity-10")} />
                            ))}
                        </div>
                    </footer>
                </div>
            )}
        </div>
    )
}
