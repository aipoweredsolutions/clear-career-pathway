import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Chronograph Template
 * 
 * A structured timeline format where dates are rigidly aligned on the left margin
 * and content flows on the right, separated by a thin vertical rule. Features an
 * asymmetric header with the name anchored top-left and contact details stacked
 * top-right in a monospaced column.
 * 
 * 100% ATS-compliant: dates and content are inline within flex rows,
 * read linearly by all ATS parsers.
 */
export function ATSChronographTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        achievements,
        publications,
        volunteerExperience,
        languages,
        professionalAffiliations,
        references,
        customSections
    } = data

    const borderColorClass = accentColor.replace('text-', 'border-')

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-16 mb-8">
            <h2 className={cn(
                'text-[10px] font-black uppercase tracking-[0.4em] mb-4',
                accentColor
            )}>
                {title}
            </h2>
            <div className="h-px w-full bg-neutral-100" />
        </div>
    )

    const TimelineRow = ({ date, children }: { date: string; children: React.ReactNode }) => (
        <div className="flex items-start gap-10 mb-10 group last:mb-0">
            <div className="w-[120px] shrink-0 pt-1 text-right">
                <span className="text-[11px] font-black text-neutral-300 uppercase tracking-widest font-mono">
                    {date}
                </span>
            </div>
            <div className="w-px shrink-0 self-stretch bg-neutral-100 relative">
                <div className={cn("absolute top-2 -left-1 w-2 h-2 rounded-full border-2 border-white", accentColor.replace('text-', 'bg-'))} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
                {children}
            </div>
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-relaxed p-12', className)}
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* ── CHRONO HEADER ── */}
            <header className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16 pb-12 border-b-4 border-neutral-900">
                <div className="flex-1">
                    <h1 className="text-[48px] font-black tracking-tighter leading-none mb-4 text-neutral-900 uppercase">
                        {personalInfo?.fullName || 'NAME.'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <p className={cn("text-[14px] font-bold uppercase tracking-[0.3em] opacity-60", accentColor)}>
                            {personalInfo.professionalTitle}
                        </p>
                    )}
                </div>
                <div className="shrink-0 text-right space-y-2 pt-2">
                    {contactParts.map((part, i) => (
                        <div key={i} className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] font-mono">
                            {part}
                        </div>
                    ))}
                </div>
            </header>

            <div className="pb-12">
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section className="mb-16">
                        <SectionHeader title="Executive Overview" />
                        <div className="flex gap-10">
                            <div className="w-[120px] shrink-0" />
                            <div className="w-px shrink-0 bg-transparent" />
                            <p className="text-[14px] leading-relaxed text-neutral-600 font-medium text-justify italic">
                                {`"${professionalSummary.summaryText}"`}
                            </p>
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Career Progression" />
                        {workExperience.map((job, i) => (
                            <TimelineRow
                                key={i}
                                date={job.startDate ? `${job.startDate.split(' ')[1] || job.startDate} — ${job.isCurrent ? 'NOW' : job.endDate.split(' ')[1] || job.endDate}` : ''}
                            >
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight leading-none mb-2">
                                    {job.jobTitle.toUpperCase()}
                                </h3>
                                <div className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
                                    {job.companyName}
                                    {job.location && <span className="mx-3 opacity-30 font-normal">/</span>}
                                    {job.location}
                                </div>
                                {job.roleDescription && (
                                    <p className="text-[13px] text-neutral-500 mb-6 leading-relaxed italic">
                                        {job.roleDescription}
                                    </p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="space-y-3">
                                        {job.achievements.map((ach, j) => (
                                            <li key={j} className="text-[13px] text-neutral-700 flex gap-4 leading-relaxed font-medium">
                                                <span className={cn("w-1 h-1 rounded-full mt-2.5 shrink-0", accentColor.replace('text-', 'bg-'))} />
                                                <span>{ach.achievementText}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </TimelineRow>
                        ))}
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Academic Timeline" />
                        {education.map((edu, i) => (
                            <TimelineRow key={i} date={edu.endYear?.toString() || 'PREV'}>
                                <h3 className="text-[16px] font-black text-neutral-900 tracking-tight mb-2">
                                    {edu.degree.toUpperCase()}
                                    {edu.major && <span className="text-neutral-300 font-normal ml-3">/ {edu.major.toUpperCase()}</span>}
                                </h3>
                                <div className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest">
                                    {edu.institutionName}
                                    {edu.location && <span className="mx-3 opacity-30 font-normal">|</span>}
                                    {edu.location}
                                </div>
                                {edu.gpa && (
                                    <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mt-3">
                                        {`Academic Performance: ${edu.gpa}`}
                                    </div>
                                )}
                            </TimelineRow>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Core Inventory" />
                        <div className="flex gap-10">
                            <div className="w-[120px] shrink-0" />
                            <div className="w-px shrink-0 bg-neutral-100" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 pl-10">
                                {Object.entries(skills.reduce((acc, s) => {
                                    const t = s.skillType || 'professional';
                                    if (!acc[t]) acc[t] = [];
                                    acc[t].push(s);
                                    return acc;
                                }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                    <div key={type} className="flex flex-col gap-4">
                                        <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em]">
                                            {type}
                                        </div>
                                        <div className="flex flex-wrap gap-2.5">
                                            {list.map((s, i) => (
                                                <span key={i} className="text-[12px] font-bold text-neutral-800 border-b-2 border-neutral-50 pb-1">
                                                    {s.skillName}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
