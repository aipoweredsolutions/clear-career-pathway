import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSHospitalityTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        languages,
        achievements,
        volunteerExperience,
        projects,
        customSections,
        professionalAffiliations
    } = data

    // Hospitality-specific ATS format focuses heavily on experience, cross-functional skills, certs (like ServSafe), and languages.
    // It's a clean, text-based single-column layout.

    return (
        <div className={cn("w-full bg-white text-neutral-950 font-sans leading-relaxed flex flex-col", className)}>
            {/* Header: Pure ATS */}
            <header className="flex flex-col items-center justify-center text-center border-b-2 pb-4 mb-6 border-neutral-300">
                <h1 className="text-3xl font-black uppercase tracking-widest text-neutral-900 mb-1">
                    {personalInfo?.fullName || 'Untitled'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <div className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-600 mb-3">
                        {personalInfo.professionalTitle}
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-neutral-600 font-medium">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <span>• {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
                    )}
                    {personalInfo?.linkedinUrl && <span>• {personalInfo.linkedinUrl}</span>}
                </div>
            </header>

            <div className="flex flex-col gap-6">
                {/* Executive Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b border-neutral-300 pb-1 mb-3", accentColor)}>
                            Professional Profile
                        </h2>
                        <p className="text-[13px] leading-relaxed text-justify text-neutral-800">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Core Competencies (Skills & Languages usually critical in hospitality) */}
                {(skills && skills.length > 0 || languages && languages.length > 0) && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b border-neutral-300 pb-1 mb-3", accentColor)}>
                            Core Competencies & Languages
                        </h2>
                        <div className="grid grid-cols-1 gap-4 text-[13px]">
                            {skills && skills.length > 0 && (
                                <div>
                                    <span className="font-bold">Skills: </span>
                                    <span>{skills.map(s => s.skillName).join(', ')}</span>
                                </div>
                            )}
                            {languages && languages.length > 0 && (
                                <div>
                                    <span className="font-bold">Languages: </span>
                                    <span>{languages.map(l => `${l.languageName} (${l.proficiencyLevel})`).join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Professional Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b border-neutral-300 pb-1 mb-4", accentColor)}>
                            Hospitality Experience
                        </h2>
                        <div className="flex flex-col gap-5">
                            {workExperience.map((job, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                                            {job.jobTitle}
                                        </h3>
                                        <span className="text-[12px] font-bold text-neutral-500 tabular-nums uppercase">
                                            {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="text-[13px] italic text-neutral-700 mb-2">
                                        {job.companyName}{job.location ? `, ${job.location}` : ''}
                                    </div>
                                    {job.roleDescription && (
                                        <p className="text-[13px] text-neutral-800 leading-snug mb-2">
                                            {job.roleDescription}
                                        </p>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-outside list-disc pl-4 space-y-1">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[13px] text-neutral-800 leading-snug">
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

                {/* Licensure & Certifications (Very important for Hospitality) */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b border-neutral-300 pb-1 mb-3", accentColor)}>
                            Licensure & Certifications
                        </h2>
                        <div className="flex flex-col gap-2">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex justify-between items-baseline text-[13px]">
                                    <div>
                                        <span className="font-bold">{cert.certificationName}</span>
                                        <span className="text-neutral-600"> — {cert.issuingOrganization}</span>
                                    </div>
                                    {cert.issueYear && <span className="text-[12px] text-neutral-500">{cert.issueYear}</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b border-neutral-300 pb-1 mb-3", accentColor)}>
                            Education
                        </h2>
                        <div className="flex flex-col gap-3">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start text-[13px]">
                                    <div>
                                        <div className="font-bold uppercase tracking-wide">{edu.institutionName}</div>
                                        <div className="text-neutral-700">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
                                        {edu.achievements && <div className="text-neutral-600 italic mt-0.5">{edu.achievements}</div>}
                                    </div>
                                    <span className="text-[12px] text-neutral-500 font-bold ml-4 shrink-0">
                                        {edu.endYear}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recognition & Awards */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b border-neutral-300 pb-1 mb-3", accentColor)}>
                            Recognition & Awards
                        </h2>
                        <ul className="list-outside list-disc pl-4 space-y-1.5">
                            {achievements.map((ach, i) => (
                                <li key={i} className="text-[13px] text-neutral-800">
                                    <span className="font-bold">{ach.achievementTitle}</span>
                                    {ach.issuingBody ? ` — ${ach.issuingBody}` : ''}
                                    {ach.year ? ` (${ach.year})` : ''}
                                    {ach.description ? `: ${ach.description}` : ''}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Additional / Professional Affiliations */}
                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <section>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b border-neutral-300 pb-1 mb-3", accentColor)}>
                            Professional Affiliations
                        </h2>
                        <ul className="list-outside list-disc pl-4 space-y-1">
                            {professionalAffiliations.map((aff, i) => (
                                <li key={i} className="text-[13px] text-neutral-800">
                                    <span className="font-bold">{aff.organizationName}</span>
                                    {aff.roleOrMembership ? ` — ${aff.roleOrMembership}` : ''}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections?.map((sec, idx) => (
                    <section key={idx}>
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.3em] border-b border-neutral-300 pb-1 mb-3", accentColor)}>
                            {sec.title}
                        </h2>
                        <ul className="list-outside list-disc pl-4 space-y-1 text-[13px] text-neutral-800">
                            {sec.items?.map((item, j) => (
                                <li key={j}>{item.text}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    )
}
