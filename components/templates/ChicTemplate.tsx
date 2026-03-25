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
            <header className="mb-5">
                <h1 className={cn('text-6xl font-medium tracking-normal text-neutral-900 mb-2', titleFont)}>{personalInfo?.fullName}</h1>
                <div className="flex items-center gap-4 text-sm text-neutral-400 font-medium flex-wrap">
                    {personalInfo?.professionalTitle && <span className="uppercase tracking-widest">{personalInfo.professionalTitle}</span>}
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

            <div className="grid grid-cols-12 gap-8 flex-1">
                {/* Main Content */}
                <div className="col-span-8 space-y-5">
                    {professionalSummary && (
                        <section>
                            <p className="text-xl leading-relaxed text-neutral-600 font-light">{professionalSummary.summaryText}</p>
                        </section>
                    )}

                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-3 border-b border-neutral-100 pb-2">Experience</h2>
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-medium text-neutral-900">{job.companyName}</h3>
                                            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest group-hover:text-neutral-500 transition-colors">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-neutral-500 mb-3 uppercase tracking-wide font-medium">{job.jobTitle}{job.location ? ` · ${job.location}` : ''}</div>
                                        {job.roleDescription && <p className="text-neutral-600 leading-loose max-w-prose mb-3">{job.roleDescription}</p>}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-1.5">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-sm text-neutral-500 flex gap-3 leading-loose">
                                                        <span className="text-neutral-200 shrink-0">—</span>
                                                        <span>{ach.achievementText}</span>
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
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-5 border-b border-neutral-100 pb-2">Projects</h2>
                            <div className="space-y-8">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-medium text-neutral-900">{proj.projectName}</h3>
                                            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
                                                {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                                            </span>
                                        </div>
                                        {proj.role && <div className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wide">{proj.role}</div>}
                                        {proj.description && <p className="text-neutral-600 leading-relaxed mb-3">{proj.description}</p>}
                                        {proj.outcomes && <p className="text-sm text-neutral-400 font-medium italic mt-2">{proj.outcomes}</p>}
                                        {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {proj.toolsUsed.map((tool, t) => (
                                                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-neutral-50 px-2 py-1 rounded text-neutral-400 leading-none">{tool}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="col-span-4 space-y-12">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Expertise</h2>
                            <div className="flex flex-col gap-3">
                                {skills.map((skill, i) => (
                                    <span key={i} className="text-neutral-600 font-medium text-sm">{skill.skillName}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Education</h2>
                            <div className="space-y-8">
                                {education.map((edu, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="text-neutral-900 font-medium">{edu.institutionName}</div>
                                        <div className="text-sm text-neutral-500">{edu.degree}</div>
                                        <div className="text-xs font-bold text-neutral-300 uppercase tracking-widest pt-1">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Languages</h2>
                            <div className="space-y-4">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-neutral-900 font-medium text-sm">{lang.languageName}</span>
                                        <span className="text-xs text-neutral-400 italic">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Certs</h2>
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
                </aside>
            </div>
        </div>
    )
}
