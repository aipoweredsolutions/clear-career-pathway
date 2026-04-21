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
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm p-10 flex flex-col', className)}>
            {/* Compact Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-neutral-900 pb-6 mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-neutral-900 uppercase tracking-tighter leading-none mb-2">{personalInfo?.fullName}</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">{personalInfo?.professionalTitle}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-[11px] text-neutral-500 font-bold uppercase tracking-wide">
                    {personalInfo?.email && <div className="border border-neutral-100 px-2 py-1 rounded bg-neutral-50">{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="border border-neutral-100 px-2 py-1 rounded bg-neutral-50">{personalInfo.phone}</div>}
                    {personalInfo?.location && <div className="border border-neutral-100 px-2 py-1 rounded bg-neutral-50">{personalInfo.location}</div>}
                </div>
            </header>

            <div className="space-y-10 flex-1">
                {/* Profile Summary */}
                {professionalSummary && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-3">Professional Profile</h2>
                        <p className="text-neutral-700 leading-relaxed text-[14px] font-medium">{professionalSummary.summaryText}</p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Professional Experience</h2>
                        <div className="space-y-8">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">{job.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="text-xs text-neutral-500 mb-4 font-bold uppercase tracking-widest">{job.companyName}{job.location ? ` · ${job.location}` : ''}</div>
                                    {job.roleDescription && <p className="text-neutral-700 leading-relaxed text-[13px] mb-4">{job.roleDescription}</p>}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-2 mt-2 ml-4 border-l-2 border-neutral-50 pl-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="flex gap-3">
                                                    <span className="text-neutral-200 mt-1 shrink-0">•</span>
                                                    <span className="text-[13px] text-neutral-600 leading-relaxed font-medium">{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills/Expertise - Grid for efficiency */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Core Competencies</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className={cn('text-[11px] text-neutral-900 border border-neutral-100 px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider', 'bg-neutral-50')}>
                                    {skill.skillName}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-[14px] uppercase tracking-tight">{edu.institutionName}</div>
                                        <div className="text-xs text-neutral-500 font-medium mb-1">{edu.degree}{(edu.major || edu.fieldOfStudy) ? ` · ${edu.major || edu.fieldOfStudy}` : ''}</div>
                                        <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Recognition */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Certifications</h2>
                            <div className="space-y-4">
                                {certifications.map((cert, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-[13px] leading-tight mb-1">{cert.certificationName}</div>
                                        <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{cert.issuingOrganization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((proj, i) => (
                                <div key={i} className="p-5 border border-neutral-50 rounded bg-neutral-50/20">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-bold text-neutral-900 text-[15px] uppercase tracking-tight">{proj.projectName}</h3>
                                        <span className="text-[9px] font-black text-neutral-300 uppercase shrink-0 ml-4">{proj.endDate || proj.startDate}</span>
                                    </div>
                                    <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest mb-3">{proj.role}</div>
                                    {proj.description && <p className="text-[12px] text-neutral-600 leading-relaxed font-medium">{proj.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12 mt-auto">
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-4">Languages</h2>
                            <div className="flex flex-col gap-2">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between text-[11px] border-b border-neutral-50 pb-1">
                                        <span className="font-bold text-neutral-800 uppercase tracking-wide">{lang.languageName}</span>
                                        <span className="text-neutral-400 italic">({lang.proficiencyLevel})</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-4">Volunteer</h2>
                            <div className="space-y-3">
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-neutral-900 text-[12px] uppercase tracking-tight">{vol.roleTitle}</div>
                                        <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{vol.organizationName}</div>
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
