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
        projects,
        publications
    } = data

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] p-10 text-neutral-900 font-mono text-[11px] leading-relaxed",
            className
        )}>
            {/* Technical Header */}
            <header className="mb-6 border-b-2 border-neutral-900 pb-4">
                <h1 className="text-2xl font-bold mb-1 tracking-tight">
                    {personalInfo?.fullName}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-neutral-600 font-bold uppercase tracking-wider">
                    <span>{personalInfo?.email}</span>
                    <span>|</span>
                    <span>{personalInfo?.phone}</span>
                    <span>|</span>
                    <span>{personalInfo?.city}</span>
                    {personalInfo?.websiteUrl && (
                        <>
                            <span>|</span>
                            <span>{personalInfo.websiteUrl?.replace(/^https?:\/\//, '')}</span>
                        </>
                    )}
                </div>
            </header>

            <div className="space-y-6">
                {/* Technical Skills - Show this first for tech ATS */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-white bg-neutral-900 px-2 py-1 mb-3 inline-block">01. Technical Stack</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 border border-neutral-100 p-4 rounded bg-neutral-50/50">
                            {skills.reduce((acc: any[], skill, i) => {
                                const groupIndex = Math.floor(i / 3);
                                if (!acc[groupIndex]) acc[groupIndex] = [];
                                acc[groupIndex].push(skill);
                                return acc;
                            }, []).map((group, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex flex-wrap gap-2 text-[10px]">
                                        {group.map((s: any, j: number) => (
                                            <span key={j} className="font-bold">[{s.skillName}]</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-white bg-neutral-900 px-2 py-1 mb-3 inline-block">02. Experience</h2>
                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{job.jobTitle.toUpperCase()} @ {job.companyName.toUpperCase()}</h3>
                                        <span className="text-[10px] text-neutral-400">{job.startDate} {"->"} {job.isCurrent ? 'HEAD' : job.endDate}</span>
                                    </div>
                                    <p className="text-neutral-500 italic mb-2">{`// ${job.location}`}</p>
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
                        <h2 className="text-xs font-black uppercase text-white bg-neutral-900 px-2 py-1 mb-3 inline-block">03. Repositories & Tools</h2>
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
                        {education.map((edu, i) => (
                            <div key={i} className="flex justify-between">
                                <div>
                                    <span className="font-bold">{edu.degree}</span> in <span className="italic">{edu.institutionName}</span>
                                </div>
                                <span className="font-bold opacity-50">{edu.endYear}</span>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    )
}
