import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSTechnicalTemplate({ data, className }: TemplateProps) {
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
        customSections
    } = data

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] p-10 text-neutral-900 font-mono text-[11px] leading-relaxed",
            className
        )}>
            {/* Technical Header */}
            <header className="mb-6 border-b-2 border-neutral-900 pb-4">
                <h1 className="text-2xl font-bold mb-1 tracking-tight">
                    {personalInfo?.fullName || 'Root@User'}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-neutral-600 font-bold uppercase tracking-wider">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <>
                            <span>|</span>
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span>|</span>
                            <span>LinkedIn</span>
                        </>
                    )}
                    {personalInfo?.githubUrl && (
                        <>
                            <span>|</span>
                            <span>GitHub</span>
                        </>
                    )}
                </div>
            </header>

            <div className="space-y-6">
                {/* Technical Skills - Show this first for tech ATS */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-white bg-neutral-900 px-2 py-1 mb-3 inline-block">01. Technical Stack</h2>
                        {(() => {
                            const groupedSkills = skills.reduce((acc, skill) => {
                                const type = skill.skillType || 'technical'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)

                            const categoryLabels: Record<string, string> = {
                                technical: 'Languages & Frameworks',
                                tool: 'Tools & Platforms',
                                industry: 'Technologies',
                                professional: 'Methodologies'
                            }

                            return (
                                <div className="border border-neutral-100 p-4 rounded bg-neutral-50/50 space-y-3">
                                    {Object.entries(groupedSkills).map(([type, skillsList]) => (
                                        <div key={type} className="grid grid-cols-[140px_1fr] gap-4 items-start">
                                            <span className="text-[10px] font-black text-neutral-600 uppercase tracking-wider">
                                                {categoryLabels[type] || type}:
                                            </span>
                                            <div className="flex flex-wrap gap-2 text-[10px]">
                                                {skillsList.map((s, i) => (
                                                    <span key={i} className="font-bold">[{s.skillName}]</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-white bg-neutral-900 px-2 py-1 mb-3 inline-block">02. Engineering Tenure</h2>
                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{job.jobTitle.toUpperCase()} @ {job.companyName.toUpperCase()}</h3>
                                        <span className="text-[10px] text-neutral-400">{job.startDate} {"->"} {job.isCurrent ? 'HEAD' : job.endDate}</span>
                                    </div>
                                    <p className="text-neutral-500 italic mb-2">{`// ${job.location || 'Distributed'}`}</p>
                                    {job.achievements && (
                                        <ul className="space-y-1 border-l border-neutral-200 pl-4 py-1">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="flex gap-2">
                                                    <span className="text-primary-600 font-bold">$</span>
                                                    <span>{a.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-white bg-neutral-900 px-2 py-1 mb-3 inline-block">03. Repositories</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="border border-neutral-100 p-3 rounded">
                                    <div className="font-bold mb-1">{proj.projectName}</div>
                                    <div className="text-[10px] text-neutral-400 mb-2 italic">Role: {proj.role}</div>
                                    <p className="text-[10px] text-neutral-600 mb-2 line-clamp-3">{proj.description}</p>
                                    {proj.toolsUsed && (
                                        <div className="flex flex-wrap gap-1">
                                            {proj.toolsUsed.map((t, j) => (
                                                <span key={j} className="text-[9px] px-1.5 py-0.5 bg-neutral-100 rounded">#{t}</span>
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
                        <h2 className="text-xs font-black uppercase text-white bg-neutral-900 px-2 py-1 mb-3 inline-block">04. Education</h2>
                        <div className="space-y-2">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between">
                                    <div>
                                        <span className="font-bold">{edu.degree}</span> in <span className="italic">{edu.institutionName}</span>
                                        {edu.gpa && <span className="text-neutral-400 ml-2">[GPA: {edu.gpa}]</span>}
                                    </div>
                                    <span className="font-bold opacity-50">{edu.endYear}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Bottom Metadata */}
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-neutral-200">
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-neutral-400 mb-2">Certifications</h2>
                            <div className="space-y-1">
                                {certifications.map((c, i) => (
                                    <div key={i} className="font-bold text-neutral-700">
                                        - {c.certificationName} ({c.issuingOrganization})
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-neutral-400 mb-2">Spoken Languages</h2>
                            <div className="flex flex-wrap gap-x-4">
                                {languages.map((l, i) => (
                                    <div key={i} className="font-bold">
                                        {l.languageName}: <span className="text-primary-600">{l.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <section key={i}>
                        <h2 className="text-xs font-black uppercase text-white bg-neutral-900 px-2 py-1 mb-3 inline-block">05. {s.title}</h2>
                        {s.content && <p className="mb-2">{s.content}</p>}
                        {s.items && (
                            <div className="grid grid-cols-2 gap-2">
                                {s.items.map((item, j) => (
                                    <div key={j}>--{item.text}</div>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </div>
    )
}

