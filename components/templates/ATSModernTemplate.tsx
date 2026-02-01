import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSModernTemplate({ data, className }: TemplateProps) {
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
            "w-full bg-white aspect-[210/297] p-12 text-neutral-800 font-sans leading-normal",
            className
        )}>
            {/* Split Header */}
            <header className="flex justify-between items-start border-b border-neutral-200 pb-8 mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight leading-none mb-2">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <div className="text-base font-medium text-neutral-500 tracking-widest uppercase">
                        {personalInfo?.professionalTitle || 'Professional Role'}
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}
                    </div>
                    {personalInfo?.email && <div className="text-sm font-semibold text-neutral-900">{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="text-sm font-semibold text-neutral-900">{personalInfo.phone}</div>}
                    {personalInfo?.linkedinUrl && <div className="text-[10px] font-bold text-primary-600 uppercase">LinkedIn</div>}
                </div>
            </header>

            <div className="flex gap-12">
                {/* Main Content Area */}
                <div className="flex-1 space-y-10">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Profile</h2>
                            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Experience</h2>
                            <div className="space-y-8">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-sm font-black text-neutral-900">{job.jobTitle}</h3>
                                            <span className="text-[10px] font-bold text-neutral-400">{job.startDate} — {job.isCurrent ? 'Present' : job.endDate}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline mb-3">
                                            <div className="text-[10px] font-black text-neutral-950 uppercase tracking-widest">{job.companyName}</div>
                                            {job.location && <div className="text-[10px] text-neutral-400 italic">{job.location}</div>}
                                        </div>
                                        {job.achievements && (
                                            <ul className="space-y-2">
                                                {job.achievements.map((a, j) => (
                                                    <li key={j} className="text-xs text-neutral-700 leading-relaxed flex gap-3">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-200 mt-1.5 shrink-0" />
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
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Featured Projects</h2>
                            <div className="space-y-6">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-sm font-black text-neutral-900">{proj.projectName}</h3>
                                            <span className="text-[10px] font-bold text-neutral-400">{proj.role}</span>
                                        </div>
                                        <p className="text-xs text-neutral-600 leading-relaxed italic mb-1">{proj.description}</p>
                                        {proj.toolsUsed && <div className="text-[9px] font-bold text-primary-400 uppercase tracking-wider">{proj.toolsUsed.join(' • ')}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column Area for Skills/Edu */}
                <aside className="w-56 shrink-0 space-y-10">
                    {/* Skills - Grouped */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Competencies</h2>
                            <div className="space-y-4">
                                {Object.entries(skills.reduce((acc, s) => {
                                    const t = s.skillType || 'professional';
                                    if (!acc[t]) acc[t] = [];
                                    acc[t].push(s);
                                    return acc;
                                }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                    <div key={type}>
                                        <div className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-2 border-l-2 border-primary-500 pl-2">{type}</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {list.map((s, i) => (
                                                <span key={i} className="text-[10px] font-bold text-neutral-700 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">{s.skillName}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Learning</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="text-[10px] font-black text-neutral-900 uppercase tracking-wider mb-1">{edu.degree}</div>
                                        <div className="text-[10px] font-bold text-neutral-500 mb-1">{edu.institutionName}</div>
                                        <div className="text-[9px] font-bold text-neutral-400 italic">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certs & Honors */}
                    {(certifications?.length || achievements?.length) ? (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Validation</h2>
                            <div className="space-y-4">
                                {certifications && certifications.map((c, i) => (
                                    <div key={i} className="text-[10px] text-neutral-600">
                                        <div className="font-bold text-neutral-800">{c.certificationName}</div>
                                        <div className="opacity-70">{c.issuingOrganization}</div>
                                    </div>
                                ))}
                                {achievements && achievements.map((a, i) => (
                                    <div key={i} className="text-[10px] text-neutral-600">
                                        <div className="font-bold text-neutral-800">{a.achievementTitle}</div>
                                        <div className="opacity-70">{a.issuingBody}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">Languages</h2>
                            <div className="space-y-2">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-neutral-700">{l.languageName}</span>
                                        <span className="text-[9px] font-black text-primary-500 uppercase">{l.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((s, i) => (
                        <section key={i}>
                            <h2 className="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em] mb-4">{s.title}</h2>
                            {s.content && <p className="text-[10px] text-neutral-600 mb-2">{s.content}</p>}
                            {s.items && (
                                <ul className="space-y-1">
                                    {s.items.map((item, j) => (
                                        <li key={j} className="text-[10px] text-neutral-700">• {item.text}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </aside>
            </div>
        </div>
    )
}

