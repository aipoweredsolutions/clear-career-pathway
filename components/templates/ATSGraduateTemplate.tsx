import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSGraduateTemplate({ data, className }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        projects,
        certifications
    } = data

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] p-12 text-neutral-900 font-sans leading-snug",
            className
        )}>
            {/* Graduate Header - Clean & Approachable */}
            <header className="mb-10">
                <h1 className="text-3xl font-black text-neutral-900 mb-1">
                    {personalInfo?.fullName}
                </h1>
                <div className="flex gap-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    <span>{personalInfo?.email}</span>
                    <span>|</span>
                    <span>{personalInfo?.phone}</span>
                    <span>|</span>
                    <span>{personalInfo?.city}</span>
                </div>
            </header>

            <div className="space-y-8">
                {/* EDUCATION FIRST for Graduates */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-primary-600 tracking-[0.2em] border-b border-primary-50 pb-2 mb-4">Academic Qualifications</h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-sm font-black text-neutral-900">{edu.institutionName}</h3>
                                        <span className="text-xs font-bold text-neutral-400">{edu.startYear} — {edu.endYear}</span>
                                    </div>
                                    <div className="text-xs font-bold text-neutral-600 italic mb-2">{edu.degree} in {edu.major}</div>
                                    <div className="text-xs text-neutral-500 mb-2">GPA: {edu.gpa || 'N/A'}</div>
                                    {edu.coursework && (
                                        <div className="text-xs text-neutral-600 leading-relaxed">
                                            <span className="font-bold opacity-50">Relevant Coursework: </span>
                                            {edu.coursework}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* SKILLS */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-primary-600 tracking-[0.2em] border-b border-primary-50 pb-2 mb-4">Core Competencies</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="text-[10px] font-bold px-3 py-1 bg-primary-50 text-primary-700 rounded-lg">
                                    {s.skillName}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* PROJECTS - Crucial for Grads */}
                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-primary-600 tracking-[0.2em] border-b border-primary-50 pb-2 mb-4">Key Projects</h2>
                        <div className="space-y-4">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider">{proj.projectName}</h3>
                                        <span className="text-[10px] font-bold text-neutral-300 italic">{proj.role}</span>
                                    </div>
                                    <p className="text-xs text-neutral-600 mb-2 leading-relaxed">{proj.description}</p>
                                    {proj.toolsUsed && (
                                        <div className="text-[10px] font-bold text-neutral-400">STACK: {proj.toolsUsed.join(', ')}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* INTERNSHIPS / EXPERIENCE */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black uppercase text-primary-600 tracking-[0.2em] border-b border-primary-50 pb-2 mb-4">Work & Internships</h2>
                        <div className="space-y-6">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-sm font-black text-neutral-900">{job.jobTitle}</h3>
                                        <span className="text-[10px] font-bold text-neutral-400">{job.startDate} — {job.endDate}</span>
                                    </div>
                                    <div className="text-[10px] font-black text-neutral-400 uppercase mb-2">{job.companyName}</div>
                                    {job.achievements && (
                                        <ul className="space-y-1.5 ml-4 list-disc marker:text-primary-300">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-xs text-neutral-600 leading-relaxed italic">{a.achievementText}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
