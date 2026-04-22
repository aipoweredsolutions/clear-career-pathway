import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string // Expecting color class like 'border-amber-500' or 'text-amber-600'
    theme?: 'gold' | 'emerald' | 'charcoal'
}

export function LuxeTemplate({ data, className, theme = 'gold' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        achievements,
        projects,
        languages,
        volunteerExperience,
        publications,
        professionalAffiliations,
        references,
        additionalInfo
    } = data

    const themeColors = {
        gold: {
            text: 'text-amber-700',
            border: 'border-amber-200',
            bg: 'bg-amber-50/50',
            accent: 'text-amber-600'
        },
        emerald: {
            text: 'text-emerald-800',
            border: 'border-emerald-200',
            bg: 'bg-emerald-50/30',
            accent: 'text-emerald-700'
        },
        charcoal: {
            text: 'text-slate-800',
            border: 'border-slate-200',
            bg: 'bg-slate-50',
            accent: 'text-slate-600'
        }
    }

    const activeTheme = themeColors[theme]

    return (
        <div className={cn("w-full bg-white min-h-[297mm] p-16 text-slate-900 font-playfair tracking-normal leading-relaxed flex flex-col", className)}>
            {/* Elegant Header - Centered & Authoritative */}
            <header className="flex flex-col items-center text-center mb-12 shrink-0">
                <h1 className={cn("text-7xl font-medium tracking-tight mb-6 uppercase", activeTheme.text)}>
                    {personalInfo?.fullName}
                </h1>

                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-sans uppercase tracking-[0.4em] text-slate-400">
                    <span className="font-black text-slate-900">{personalInfo?.professionalTitle}</span>
                    {personalInfo?.email && (
                        <>
                            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                            <span className="lowercase font-normal tracking-normal text-slate-500">{personalInfo.email}</span>
                        </>
                    )}
                    {personalInfo?.phone && (
                        <>
                            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                            <span className="text-slate-500 tracking-widest">{personalInfo.phone}</span>
                        </>
                    )}
                    {(personalInfo?.location || personalInfo?.city) && (
                        <>
                            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                            <span className="text-slate-500 tracking-wider font-bold">{personalInfo.location || [personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </>
                    )}
                </div>

                <div className={cn("w-48 h-1 mt-12 mb-4", activeTheme.border, "border-b-4 opacity-50")}></div>
            </header>

            <main className="flex-1 space-y-20">
                {/* Summary - Philosophical Profile */}
                {professionalSummary?.summaryText && (
                    <section className="px-16 border-l-4 border-slate-100">
                        <p className="text-2xl text-slate-600 italic leading-relaxed max-w-5xl">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience - Primary Vertical Flow */}
                {workExperience && workExperience.length > 0 && (
                    <section className="flex flex-col gap-10">
                        <div className="flex items-center gap-10">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.8em] whitespace-nowrap opacity-60", activeTheme.accent)}>
                                Professional Legacy
                            </h2>
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b-2 opacity-30")}></div>
                        </div>

                        <div className="flex flex-col gap-16">
                            {workExperience.map((job, i) => (
                                <div key={i} className="flex flex-col gap-6 relative pl-12 border-l-2 border-slate-50">
                                    <div className={cn("absolute -left-[5px] top-2 w-2 h-2 rounded-full", activeTheme.bg.replace('/30', '').replace('/50', ''))} />
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-6">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-4xl font-medium text-slate-900 tracking-tight leading-none">{job.jobTitle}</h3>
                                            <div className="text-xl font-sans font-black text-slate-400 uppercase tracking-[0.2em] italic">{job.companyName}</div>
                                        </div>
                                        <span className="text-xs font-sans font-black text-slate-950 px-6 py-2 bg-slate-50 rounded-full uppercase tracking-widest tabular-nums italic whitespace-nowrap">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    <p className="text-xl text-slate-600 leading-relaxed italic opacity-80 max-w-5xl">{job.roleDescription}</p>

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="list-disc ml-8 space-y-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-lg text-slate-800 font-medium leading-relaxed tracking-tight pl-2">
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

                {/* Integrated Stack for Education & Skills */}
                <div className="flex flex-col gap-20 pt-20 border-t-8 border-slate-50">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.8em] opacity-60", activeTheme.accent)}>
                                Academic Foundation
                            </h2>
                            <div className="flex flex-col gap-10">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="font-medium text-slate-900 text-3xl leading-tight tracking-tight">{edu.degree}</div>
                                        <div className="text-slate-500 font-sans text-sm font-black uppercase tracking-[0.2em] italic">{edu.institutionName}</div>
                                        <div className="text-[11px] font-sans text-slate-300 font-black uppercase tracking-[0.4em] mt-3">Conferred {edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Expertise */}
                    {skills && skills.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.8em] opacity-60", activeTheme.accent)}>
                                Strategic Expertise
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {skills.map((skill, i) => (
                                    <div key={i} className="px-8 py-4 bg-white border-2 border-slate-100 font-medium text-lg text-slate-900 shadow-sm">
                                        {skill.skillName}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Selection of Projects - High Impact Reveal */}
                {projects && projects.length > 0 && (
                    <section className="flex flex-col gap-12">
                        <div className="flex items-center gap-10">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.8em] whitespace-nowrap opacity-60", activeTheme.accent)}>
                                Curated Portfolio
                            </h2>
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b-2 opacity-30")}></div>
                        </div>

                        <div className="flex flex-col gap-16">
                            {projects.map((project, i) => (
                                <div key={i} className="flex flex-col gap-6 p-12 bg-slate-50/50 border border-slate-100 rounded-[3rem]">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-6">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-3xl font-medium text-slate-900 leading-none">{project.projectName}</h3>
                                            <div className="text-base font-sans font-black text-slate-400 uppercase tracking-widest italic">
                                                {project.role} {project.clientOrOrganization && ` • ${project.clientOrOrganization}`}
                                            </div>
                                        </div>
                                        <span className="text-xs font-sans font-black text-slate-300 uppercase tracking-widest tabular-nums italic">
                                            {project.startDate} — {project.endDate}
                                        </span>
                                    </div>

                                    {project.description && <p className="text-xl text-slate-600 leading-relaxed italic opacity-90 max-w-5xl">{project.description}</p>}

                                    {project.toolsUsed && project.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {project.toolsUsed.map((tool, t) => (
                                                <span key={t} className="text-[11px] font-sans font-black uppercase tracking-[0.2em] text-slate-950 bg-white shadow-sm border border-slate-100 px-6 py-2 rounded-full">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Honors */}
                {achievements && achievements.length > 0 && (
                    <section className="flex flex-col gap-10">
                        <div className="flex items-center gap-10">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.8em] whitespace-nowrap opacity-60", activeTheme.accent)}>
                                Honors & Distinctions
                            </h2>
                            <div className={cn("flex-1 h-px", activeTheme.border, "border-b-2 opacity-30")}></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex flex-col gap-3 group">
                                    <div className="font-medium text-slate-900 text-2xl leading-tight tracking-tight group-hover:text-slate-500 transition-colors">{ach.achievementTitle}</div>
                                    <div className="text-slate-400 font-sans text-xs font-black uppercase tracking-widest italic opacity-60">{ach.issuingBody} {ach.year && ` • ${ach.year}`}</div>
                                    {ach.description && <p className="text-lg text-slate-600 italic leading-snug mt-2 opacity-80">{ach.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Secondary Stack for Languages & Affiliations */}
                <div className="flex flex-col gap-20 pt-20 border-t-8 border-slate-50">
                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.8em] opacity-60", activeTheme.accent)}>
                                linguistic range
                            </h2>
                            <div className="flex flex-col gap-4">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50 group hover:border-slate-900 transition-colors">
                                        <span className="text-slate-900 font-medium text-xl leading-none">{lang.languageName}</span>
                                        <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-300">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section className="flex flex-col gap-8">
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.8em] opacity-60", activeTheme.accent)}>
                                Global Affiliations
                            </h2>
                            <div className="flex flex-col gap-8">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="font-medium text-slate-900 text-xl leading-tight">{aff.organizationName}</div>
                                        <div className="text-[11px] font-sans font-black uppercase tracking-[0.2em] text-slate-400 italic">{aff.roleOrMembership}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Certifications - Global Reveal */}
                {certifications && certifications.length > 0 && (
                    <section className="flex flex-col gap-12 bg-slate-50 p-16 rounded-[4rem] border-2 border-dashed border-slate-200">
                        <h2 className={cn("text-xs font-black uppercase tracking-[0.8em] text-center opacity-60 mb-6", activeTheme.accent)}>
                            Foundational Credentials
                        </h2>
                        <div className="flex flex-wrap justify-center gap-x-20 gap-y-12">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="font-medium text-slate-900 text-xl tracking-tight leading-none mb-3">{cert.certificationName}</div>
                                    <div className="text-[11px] font-sans text-slate-400 font-black uppercase tracking-widest mt-1 italic">{(cert.issuer || cert.issuingOrganization)} • {(cert.issueDate || cert.issueYear)}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* References - Elegant Conclusion */}
                {references && references.length > 0 && (
                    <section className="pt-20 border-t-8 border-slate-50">
                        <div className="flex justify-center flex-wrap gap-x-24 gap-y-16">
                            {references.map((ref, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 mb-6 italic">Endorsement</div>
                                    <div className="font-medium text-slate-900 text-3xl tracking-tight leading-none mb-4">{ref.referenceName}</div>
                                    <div className="text-lg text-slate-400 font-medium italic opacity-60 mb-4">{ref.role} • {ref.organization}</div>
                                    <div className="text-xs font-sans font-black text-slate-900 uppercase tracking-widest">{ref.contactDetails || ref.availabilityStatement}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Additional Info - Fine Print */}
                {additionalInfo && (
                    <section className="border-t-2 border-slate-100 pt-16 text-center max-w-5xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-8 text-[11px] font-sans font-black uppercase tracking-[0.3em] text-slate-300">
                            {additionalInfo.securityClearance && <span className="text-slate-500">Clearance: {additionalInfo.securityClearance}</span>}
                            {additionalInfo.workAuthorization && <span>Auth: {additionalInfo.workAuthorization}</span>}
                            {additionalInfo.willingToRelocate && <span className="italic">Available for Global Relocation</span>}
                            {additionalInfo.availability && <span>Availability: {additionalInfo.availability}</span>}
                        </div>
                        {additionalInfo.otherInfo && (
                            <p className="text-lg text-slate-400 italic font-medium leading-relaxed max-w-4xl mx-auto opacity-70">
                                {additionalInfo.otherInfo}
                            </p>
                        )}
                    </section>
                )}
            </main>

            <footer className={cn("p-12 text-center text-[12px] font-black uppercase tracking-[2em] opacity-30 mt-20 border-t border-slate-100 italic", activeTheme.text)}>
                Privileged Portfolio Standard
            </footer>
        </div>
    )
}
