import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Editorial Template
 * 
 * Inspired by magazine editorial layouts. Features a bold, oversized name as a 
 * visual anchor, with body content in a refined serif typeface. Summary acts as a pull quote.
 * Dotted leader lines connect job titles to dates.
 * 
 * 100% ATS-compliant single-column layout.
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
        publications,
        languages
    } = data

    const borderColorClass = accentColor.replace('text-', 'border-')

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex flex-col mb-10 mt-16">
            <h2 className={cn(
                'text-[10px] font-black uppercase tracking-[0.6em] mb-4',
                accentColor
            )}>
                {title}
            </h2>
            <div className="h-px w-full bg-neutral-100" />
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-relaxed p-12', className)}
            style={{ fontFamily: "'Lora', 'Georgia', serif" }}
        >
            {/* ── EDITORIAL MASTHEAD ── */}
            <header className="mb-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 pb-12 border-b-4 border-neutral-900">
                    <h1 className="text-[64px] font-black leading-[0.8] tracking-tighter text-neutral-900 uppercase">
                        {personalInfo?.fullName ? (
                            <>
                                <span className="block">{personalInfo.fullName.split(' ')[0]}</span>
                                <span className={cn("block", accentColor)}>{personalInfo.fullName.split(' ').slice(1).join(' ')}.</span>
                            </>
                        ) : 'NAME.'}
                    </h1>
                    <div className="md:text-right max-w-[300px]">
                        {personalInfo?.professionalTitle && (
                            <p className="text-[14px] font-bold text-neutral-400 italic uppercase tracking-widest leading-relaxed">
                                {personalInfo.professionalTitle}
                            </p>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-between items-center py-6 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-neutral-400">
                    {contactParts.map((part, i) => (
                        <span key={i}>{part}</span>
                    ))}
                </div>
            </header>

            <div className="pb-12">
                {/* Pull-Quote Summary */}
                {professionalSummary?.summaryText && (
                    <section className="mb-20 mt-12 px-12">
                        <div className="relative">
                            <span className={cn("absolute -top-10 -left-10 text-[120px] font-serif opacity-10 leading-none", accentColor)}>&ldquo;</span>
                            <p className={cn("text-[20px] italic leading-[1.6] text-center font-medium", accentColor)}>
                                {professionalSummary.summaryText}
                            </p>
                            <span className={cn("absolute -bottom-20 -right-10 text-[120px] font-serif opacity-10 leading-none", accentColor)}>&rdquo;</span>
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="The Portfolio" />
                        <div className="space-y-12">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex items-baseline w-full mb-3">
                                        <h3 className="text-[18px] font-black text-neutral-900 tracking-tight shrink-0">
                                            {job.jobTitle.toUpperCase()}
                                        </h3>
                                        <div className="flex-grow border-b border-dotted border-neutral-200 mx-6 relative top-[-4px]"></div>
                                        <span className="text-[12px] font-black text-neutral-300 shrink-0 font-sans tracking-widest uppercase">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    
                                    <div className="text-[14px] font-bold text-neutral-400 italic mb-6">
                                        {job.companyName}{job.location && <span className="mx-3 opacity-30 font-normal">|</span>}{job.location}
                                    </div>
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-4 pl-4 border-l-2 border-neutral-50">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 leading-relaxed font-medium">
                                                    {ach.achievementText}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Academic History" />
                        <div className="space-y-8">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex items-baseline w-full mb-3">
                                        <h3 className="text-[16px] font-black text-neutral-900 tracking-tight shrink-0">
                                            {edu.degree} {edu.major && `IN ${edu.major.toUpperCase()}`}
                                        </h3>
                                        <div className="flex-grow border-b border-dotted border-neutral-200 mx-6 relative top-[-4px]"></div>
                                        <span className="text-[12px] font-black text-neutral-300 shrink-0 font-sans tracking-widest">
                                            {edu.endYear}
                                        </span>
                                    </div>
                                    <div className="text-[14px] font-bold text-neutral-400 italic">
                                        {edu.institutionName}{edu.location && <span className="mx-3 opacity-30 font-normal">|</span>}{edu.location}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Expertise" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 px-4">
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
                                    <p className="text-[15px] text-neutral-800 font-bold leading-relaxed italic">
                                        {list.map(s => s.skillName).join('  ·  ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
