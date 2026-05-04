import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSGoldStandardTemplate({ data, className, accentColor = 'text-amber-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        projects,
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
        <div className="mt-5 mb-3">
            <h2 className={cn(
                'text-[13px] font-black uppercase tracking-[0.4em] mb-2',
                accentColor
            )}>
                {title}
            </h2>
            <div className="flex flex-col gap-[2px]">
                <div className={cn('h-[2px] w-full', borderColorClass.replace('border-', 'bg-'))} />
                <div className={cn('h-[0.5px] w-full opacity-30', borderColorClass.replace('border-', 'bg-'))} />
            </div>
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
            className={cn(
                'w-full bg-white text-neutral-900 leading-snug p-10',
                className
            )}
            style={{ fontFamily: "'Lora', 'PT Serif', serif" }}
        >
            {/* ── STATELY HEADER ── */}
            <header className="text-center mb-6 pt-2">
                <h1 
                    className={cn(
                        'text-[32px] font-medium uppercase tracking-[0.15em] leading-none mb-4 whitespace-nowrap',
                        accentColor
                    )}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                {personalInfo?.professionalTitle && (
                    <p className="text-[11px] text-neutral-400 font-black uppercase tracking-[0.3em] mb-4">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-[10px] text-neutral-500 font-bold uppercase tracking-[0.15em] border-y border-neutral-100 py-4 max-w-4xl mx-auto">
                    {contactParts.map((part, i) => (
                        <React.Fragment key={i}>
                            <span className="whitespace-nowrap">{part}</span>
                            {i < contactParts.length - 1 && (
                                <span className={cn("text-[16px] font-light opacity-30", accentColor)}>|</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            {/* ── BODY ── */}
            <div>

                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Professional Summary" />
                        <p className="text-[12px] text-neutral-700 leading-relaxed font-medium px-4">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-5 px-4">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-start mb-3 gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-[13px] font-bold text-neutral-900 tracking-tight leading-tight">
                                                {job.companyName}
                                                {job.location && (
                                                    <span className="font-normal text-neutral-400 ml-4 italic">{job.location}</span>
                                                )}
                                            </h3>
                                            <div className={cn("text-[11px] font-bold italic mt-1 opacity-80", accentColor)}>
                                                {job.jobTitle}
                                            </div>
                                        </div>
                                        <span className="text-[12px] font-black text-neutral-300 uppercase tracking-widest mt-1">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-600 mb-3 leading-relaxed font-medium">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[11px] text-neutral-700 flex gap-4 leading-relaxed">
                                                    <span className={cn("shrink-0 w-1.5 h-1.5 rounded-full mt-2.5", borderColorClass.replace('border-', 'bg-'), "opacity-20")} />
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

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Education" />
                        <div className="space-y-3 px-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-[13px] font-bold text-neutral-900 tracking-tight">
                                            {edu.degree}{edu.major && ` in ${edu.major}`}
                                        </h3>
                                        <span className="text-[12px] font-black text-neutral-300 uppercase tracking-widest">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                    <div className="text-[11px] font-bold text-neutral-500 italic opacity-80">
                                        {edu.institutionName}
                                        {edu.location && <span className="font-normal mx-2 opacity-50">/</span>}
                                        {edu.location}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[12px] text-neutral-400 mt-2 font-black uppercase tracking-widest">Cumulative GPA: {edu.gpa}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Expertise" />
                        <div className="flex flex-col gap-y-3 px-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-3">
                                    <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">{type}</div>
                                    <p className="text-[11px] font-bold text-neutral-800 leading-relaxed">
                                        {list.map(s => s.skillName).join('  •  ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages & Affiliations */}
                {(languages?.length || professionalAffiliations?.length) ? (
                    <div className="flex flex-col gap-5 mt-6 pt-4 border-t border-neutral-50 px-4">
                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-6">Languages</h2>
                                <div className="space-y-3">
                                    {languages.map((l, i) => (
                                        <div key={i} className="text-[13px] font-bold text-neutral-700">
                                            {l.languageName} <span className="text-neutral-300 mx-2 italic font-medium">[{l.proficiencyLevel}]</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {professionalAffiliations && professionalAffiliations.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-6">Affiliations</h2>
                                <div className="space-y-4">
                                    {professionalAffiliations.map((aff, i) => (
                                        <div key={i} className="text-[12px] font-bold text-neutral-600 leading-tight">
                                            <div className="text-neutral-800 uppercase tracking-tight">{aff.organizationName}</div>
                                            <div className="italic opacity-60 mt-1">{aff.roleOrMembership}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
