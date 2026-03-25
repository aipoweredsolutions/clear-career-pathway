import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function LegalExpertTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications, projects, languages, achievements, customSections, professionalAffiliations } = data

    // Legal templates are ultra-traditional: serif fonts, centered headers, minimal graphics, double ruled lines.
    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-serif p-12 text-neutral-900', className)}>
            {/* Header: Centered & Traditional */}
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{personalInfo?.fullName}</h1>
                
                {personalInfo?.professionalTitle && (
                    <div className="text-lg italic text-neutral-800 mb-6">
                        {personalInfo.professionalTitle}
                    </div>
                )}

                <div className="border-t-[1.5px] border-b-[1.5px] border-neutral-900 py-4 max-w-3xl mx-auto">
                    <div className="text-xs uppercase tracking-wider space-x-2 text-neutral-600 font-medium">
                        {personalInfo?.location && <span>{personalInfo.location}</span>}
                        {(personalInfo?.location && personalInfo?.phone) && <span>•</span>}
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                        {(personalInfo?.phone && personalInfo?.email) && <span>•</span>}
                        {personalInfo?.email && <span className="lowercase">{personalInfo.email}</span>}
                    </div>
                    {personalInfo?.linkedinUrl && (
                        <div className="text-[10px] mt-2 text-neutral-400 font-mono italic">
                            {personalInfo.linkedinUrl}
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-8">

                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-900 mb-3 pb-1", accentColor)}>Professional Profile</h2>
                        <p className="text-[13px] leading-relaxed text-justify indent-8">{professionalSummary.summaryText}</p>
                    </section>
                )}

                {/* Experience (Indented Style) */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-900 mb-4 pb-1", accentColor)}>Legal Experience</h2>
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i} className="pl-4">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-sm tracking-wide uppercase">{job.companyName}</h3>
                                        <span className="text-xs font-bold italic tabular-nums">{job.startDate} – {job.isCurrent ? 'Present' : job.endDate}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-sm font-bold italic text-neutral-700">{job.jobTitle}</span>
                                        {job.location && <span className="text-[11px] text-neutral-500 uppercase tracking-tighter">{job.location}</span>}
                                    </div>
                                    {job.roleDescription && <p className="text-[13px] leading-snug mb-2 text-neutral-800">{job.roleDescription}</p>}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-outside list-disc pl-5 space-y-1">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[13px] leading-normal text-neutral-800 italic">
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

                {/* Education (Crucial for Legal) */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-900 mb-4 pb-1", accentColor)}>Education & Clerkships</h2>
                        <div className="space-y-5">
                            {education.map((edu, i) => (
                                <div key={i} className="pl-4">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-sm tracking-wide uppercase">{edu.institutionName}</h3>
                                        <span className="text-xs font-bold tabular-nums">{edu.endYear}</span>
                                    </div>
                                    <div className="text-[13px] font-bold italic text-neutral-700">
                                        {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 text-[12px] text-neutral-600 mt-1">
                                        {edu.gpa && <span><span className="font-bold">GPA:</span> {edu.gpa}</span>}
                                        {edu.achievements && <span className="italic">{edu.achievements}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Bar Admissions */}
                <div className="grid grid-cols-2 gap-12">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-900 mb-3 pb-1", accentColor)}>Practice Areas</h2>
                            <ul className="list-none space-y-1">
                                {skills.map((skill, i) => (
                                    <li key={i} className="text-[13px] flex items-center gap-2">
                                        <div className="w-1 h-1 bg-neutral-900" />
                                        {skill.skillName}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-900 mb-3 pb-1", accentColor)}>Languages</h2>
                            <div className="space-y-1">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-baseline text-[13px]">
                                        <span className="font-bold italic">{lang.languageName}</span>
                                        <span className="text-[11px] text-neutral-500 uppercase tracking-widest">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Professional Affiliations */}
                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-900 mb-3 pb-1", accentColor)}>Professional Affiliations</h2>
                        <div className="space-y-2 pl-4">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="text-[13px]">
                                    <span className="font-bold uppercase tracking-tight">{aff.organizationName}</span>
                                    {aff.roleOrMembership && <span className="italic text-neutral-600"> — {aff.roleOrMembership}</span>}
                                    {aff.yearsActive && <span className="text-xs text-neutral-400 ml-2">({aff.yearsActive})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections (Publications, etc.) */}
                {customSections?.map((sec, idx) => (
                    <section key={idx}>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-900 mb-3 pb-1", accentColor)}>{sec.title}</h2>
                        <ul className="list-none space-y-3 pl-4">
                            {sec.items?.map((item, j) => (
                                <li key={j} className="text-[13px] leading-snug text-neutral-800">
                                    <span className="font-bold mr-2">§</span>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            {/* Footer Footer Footer */}
            <footer className="mt-16 text-center text-[10px] text-neutral-300 uppercase tracking-[0.3em]">
                Privileged & Confidential
            </footer>
        </div>
    )
}
