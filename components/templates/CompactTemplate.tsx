import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function CompactTemplate({ data, className, accentColor = 'bg-neutral-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications, projects, languages, volunteerExperience, achievements, customSections, professionalAffiliations } = data

    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm', className)}>
            {/* Compact Header */}
            <header className="flex justify-between items-end border-b-2 border-neutral-900 pb-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 uppercase tracking-tight leading-none">{personalInfo?.fullName}</h1>
                    <p className="text-neutral-500 font-medium mt-1">{personalInfo?.professionalTitle}</p>
                </div>
                <div className="text-right text-xs text-neutral-500 space-y-1">
                    {personalInfo?.email && <div>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo?.location && <div>{personalInfo.location}</div>}
                    {personalInfo?.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Column (Main) */}
                <div className="col-span-8 space-y-5">
                    {professionalSummary && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-2 text-neutral-900">Profile</h2>
                            <p className="text-neutral-700 leading-snug text-[13px]">{professionalSummary.summaryText}</p>
                        </section>
                    )}

                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-3 text-neutral-900">Experience</h2>
                            <div className="space-y-4">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline font-bold text-neutral-900">
                                            <span>{job.jobTitle}</span>
                                            <span className="text-xs font-normal text-neutral-500">{job.startDate} – {job.isCurrent ? 'Present' : job.endDate}</span>
                                        </div>
                                        <div className="text-xs text-neutral-600 mb-1 font-medium">{job.companyName}{job.location ? ` · ${job.location}` : ''}</div>
                                        {job.roleDescription && <p className="text-neutral-700 leading-snug text-[12px] mb-1">{job.roleDescription}</p>}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-0.5 mt-1">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="flex gap-1.5">
                                                        <span className="text-neutral-400 mt-0.5 shrink-0">·</span>
                                                        <span className="text-[12px] text-neutral-700 leading-snug">{ach.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-3 text-neutral-900">Projects</h2>
                            <div className="space-y-3">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline font-bold text-neutral-900">
                                            <span>{proj.projectName}</span>
                                            <span className="text-xs font-normal text-neutral-500">{proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}</span>
                                        </div>
                                        <div className="text-xs text-neutral-600 mb-1 font-medium">{proj.role}{proj.clientOrOrganization ? ` · ${proj.clientOrOrganization}` : ''}</div>
                                        {proj.description && <p className="text-[12px] text-neutral-700 leading-snug">{proj.description}</p>}
                                        {proj.outcomes && <p className="text-[11px] text-neutral-500 mt-0.5 italic">{proj.outcomes}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-3 text-neutral-900">Awards & Achievements</h2>
                            <div className="space-y-2">
                                {achievements.map((ach, i) => (
                                    <div key={i} className="flex justify-between items-start">
                                        <div>
                                            <div className="font-bold text-neutral-900 text-[13px]">{ach.achievementTitle}</div>
                                            {ach.issuingBody && <div className="text-xs text-neutral-500">{ach.issuingBody}</div>}
                                            {ach.description && <div className="text-[12px] text-neutral-600">{ach.description}</div>}
                                        </div>
                                        {ach.year && <div className="text-xs text-neutral-400 ml-3 shrink-0">{ach.year}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {customSections?.map((sec, idx) => (
                        <section key={idx}>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-3 text-neutral-900">{sec.title}</h2>
                            <ul className="space-y-0.5">
                                {sec.items?.map((item, j) => (
                                    <li key={j} className="flex gap-1.5">
                                        <span className="text-neutral-400 mt-0.5 shrink-0">·</span>
                                        <span className="text-[12px] text-neutral-700 leading-snug">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>

                {/* Right Column (Sidebar) */}
                <div className="col-span-4 space-y-5">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-2 text-neutral-900">Skills</h2>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((skill, i) => (
                                    <span key={i} className={cn('text-[10px] text-white px-2 py-0.5 rounded-sm', accentColor)}>
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-2 text-neutral-900">Education</h2>
                            <div className="space-y-3">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-[13px]">{edu.institutionName}</div>
                                        <div className="text-xs text-neutral-600">{edu.degree}{(edu.major || edu.fieldOfStudy) ? ` · ${edu.major || edu.fieldOfStudy}` : ''}</div>
                                        {edu.gpa && <div className="text-[11px] text-neutral-500">GPA: {edu.gpa}</div>}
                                        <div className="text-[11px] text-neutral-400">{edu.startYear ? `${edu.startYear} – ` : ''}{edu.endYear}</div>
                                        {edu.achievements && <div className="text-[11px] text-neutral-500 italic mt-0.5">{edu.achievements}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-2 text-neutral-900">Certifications</h2>
                            <div className="space-y-2">
                                {certifications.map((cert, i) => (
                                    <div key={i}>
                                        <div className="font-semibold text-neutral-900 text-[12px] leading-tight">{cert.certificationName}</div>
                                        <div className="text-[11px] text-neutral-500">{cert.issuingOrganization}{cert.issueYear ? ` · ${cert.issueYear}` : ''}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-2 text-neutral-900">Languages</h2>
                            <div className="space-y-1">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between text-[12px]">
                                        <span className="font-medium text-neutral-800">{lang.languageName}</span>
                                        <span className="text-neutral-500 capitalize">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-2 text-neutral-900">Volunteer</h2>
                            <div className="space-y-2">
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i}>
                                        <div className="font-semibold text-neutral-900 text-[12px]">{vol.roleTitle}</div>
                                        <div className="text-[11px] text-neutral-500">{vol.organizationName}</div>
                                        {vol.contributions && <div className="text-[11px] text-neutral-600 leading-snug mt-0.5">{vol.contributions}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-1 mb-2 text-neutral-900">Affiliations</h2>
                            <div className="space-y-2">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i}>
                                        <div className="font-semibold text-neutral-900 text-[12px] leading-tight">{aff.organizationName}</div>
                                        <div className="text-[11px] text-neutral-500">{aff.roleOrMembership}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
