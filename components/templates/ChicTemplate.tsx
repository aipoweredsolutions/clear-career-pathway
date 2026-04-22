import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    font?: 'sans' | 'serif'
}

export function ChicTemplate({ data, className, font = 'sans' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications, projects, languages, volunteerExperience, achievements, customSections, publications, professionalAffiliations } = data

    const fontClass = font === 'serif' ? 'font-playfair' : 'font-lato'
    const titleFont = font === 'serif' ? 'font-playfair' : 'font-lato'

    return (
        <div className={cn('w-full bg-white min-h-[297mm] p-10 flex flex-col', fontClass, className)}>
            {/* Minimalist Header */}
            <header className="mb-8 border-b border-neutral-100 pb-6">
                <h1 className={cn('text-5xl font-medium tracking-tight text-neutral-900 mb-4', titleFont)}>{personalInfo?.fullName}</h1>
                <div className="flex items-center gap-4 text-sm text-neutral-500 font-medium flex-wrap">
                    {personalInfo?.professionalTitle && <span className="uppercase tracking-widest text-neutral-900">{personalInfo.professionalTitle}</span>}
                    {personalInfo?.location && (
                        <>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                            <span>{personalInfo.location}</span>
                        </>
                    )}
                    {personalInfo?.email && (
                        <>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                            <span className="lowercase">{personalInfo.email}</span>
                        </>
                    )}
                    {personalInfo?.phone && (
                        <>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                            <span className="lowercase">{personalInfo.linkedinUrl}</span>
                        </>
                    )}
                </div>
            </header>

            <div className="space-y-10 flex-1">
                {/* Profile Summary */}
                {professionalSummary && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Profile</h2>
                        <p className="text-xl leading-relaxed text-neutral-600 font-light max-w-4xl">{professionalSummary.summaryText}</p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Experience</h2>
                        <div className="space-y-8">
                            {workExperience.map((job, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-medium text-neutral-900">{job.companyName}</h3>
                                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-3">
                                        <div className="text-sm text-neutral-500 uppercase tracking-wide font-medium">{job.jobTitle}</div>
                                        {job.location && <div className="text-xs text-neutral-400 italic">{job.location}</div>}
                                    </div>
                                    {job.roleDescription && <p className="text-neutral-600 leading-loose max-w-4xl mb-4 text-[15px]">{job.roleDescription}</p>}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc ml-4 space-y-1 mt-2">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[14px] text-neutral-500 leading-relaxed pl-1">
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

                {/* Skills/Expertise */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Expertise</h2>
                        <div className="flex flex-wrap gap-x-8 gap-y-3">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-neutral-200 rounded-full" />
                                    <span className="text-neutral-700 font-medium text-sm tracking-wide">{skill.skillName}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Projects</h2>
                        <div className="space-y-8">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-medium text-neutral-900">{proj.projectName}</h3>
                                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
                                            {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                        </span>
                                    </div>
                                    {proj.role && <div className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wide">{proj.role}</div>}
                                    {proj.description && <p className="text-neutral-600 leading-relaxed mb-4 max-w-4xl">{proj.description}</p>}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {proj.toolsUsed.map((tool, t) => (
                                                <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-neutral-50 px-3 py-1 rounded text-neutral-400">{tool}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="text-neutral-900 font-medium text-lg">{edu.institutionName}</div>
                                        <div className="text-sm text-neutral-600">{edu.degree}</div>
                                        <div className="text-xs font-bold text-neutral-300 uppercase tracking-widest pt-1">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                {languages && languages.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Languages</h2>
                        <div className="space-y-3">
                            {languages.map((lang, i) => (
                                <div key={i} className="flex justify-between items-center max-w-xs">
                                    <span className="text-neutral-900 font-medium text-sm">{lang.languageName}</span>
                                    <span className="text-xs text-neutral-400 italic">{lang.proficiencyLevel}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {certifications && certifications.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-50 pb-2">Certifications</h2>
                        <div className="space-y-4">
                            {certifications.map((cert, i) => (
                                <div key={i}>
                                    <div className="text-neutral-900 font-medium text-sm">{cert.certificationName}</div>
                                    <div className="text-xs text-neutral-400 mt-1">{cert.issuingOrganization}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
