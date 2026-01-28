import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    mode?: 'standard' | 'dark' | 'devops'
}

export function TechnicalTemplate({ data, className, mode = 'standard' }: TemplateProps) {
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

    const isDark = mode === 'dark' || mode === 'devops' // DevOps also uses dark variant usually, or maybe distinct

    // Refined theme logic
    const bgColor = isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200'
    const textColor = isDark ? 'text-neutral-100' : 'text-neutral-800'
    const mutedText = isDark ? 'text-neutral-400' : 'text-neutral-500'
    const codeBg = isDark ? 'bg-neutral-800' : 'bg-neutral-50'
    const accentColor = mode === 'devops' ? 'text-emerald-400 border-emerald-500' : 'text-violet-500 border-violet-600'
    const topBorder = mode === 'devops' ? 'border-emerald-500' : 'border-violet-600'

    return (
        <div className={cn("w-full font-mono aspect-[210/297] p-10 border-t-8 text-sm", bgColor, topBorder, className)}>
            {/* Header with terminal style */}
            <div className={cn("mb-8 p-6 rounded-lg font-mono relative", codeBg)}>
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className={cn("text-xs mb-2", mutedText)}>{`// ${personalInfo?.professionalTitle || 'Developer'}`}</div>
                <h1 className={cn("text-4xl font-bold mb-2 tracking-tighter", textColor)}>
                    {`const developer = "${personalInfo?.fullName || 'Anonymous'}";`}
                </h1>
                <div className={cn("flex flex-wrap gap-4 text-xs font-medium mt-4", accentColor.split(' ')[0])}>
                    <span>{`email: "${personalInfo?.email || ''}"`}</span>
                    <span>{`github: "${personalInfo?.websiteUrl || ''}"`}</span>
                    <span>{`loc: "${personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}"`}</span>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-8">
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className={cn("text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>{`function`}</span> workExperience()
                            </h2>
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="pl-4 border-l border-neutral-200 dark:border-neutral-800">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className={cn("text-base font-bold", textColor)}>{job.jobTitle}</h3>
                                            <span className={cn("text-xs font-mono", mutedText)}>
                                                {job.startDate} -- {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        <div className={cn("text-xs font-mono mb-2", mutedText)}>at {job.companyName}</div>
                                        <p className={cn("text-sm leading-relaxed mb-2 opacity-90", textColor)}>{job.roleDescription}</p>
                                        {job.achievements && (
                                            <div className={cn("p-3 rounded text-xs leading-relaxed font-mono", codeBg, mutedText)}>
                                                {job.achievements.map(a => `> ${a.achievementText}\n`)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className={cn("text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>{`class`}</span> Projects()
                            </h2>
                            <div className="space-y-6">
                                {projects.map((project, i) => (
                                    <div key={i} className="pl-4 border-l border-neutral-200 dark:border-neutral-800">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className={cn("text-base font-bold", textColor)}>{project.projectName}</h3>
                                            <span className={cn("text-xs font-mono", mutedText)}>
                                                {project.startDate} -- {project.endDate || 'active'}
                                            </span>
                                        </div>
                                        <div className={cn("text-xs font-mono mb-2", mutedText)}>{`> role: "${project.role}";`}</div>
                                        {project.description && <p className={cn("text-sm opacity-90 mb-2", textColor)}>{project.description}</p>}
                                        {project.toolsUsed && project.toolsUsed.length > 0 && (
                                            <div className={cn("text-[10px] font-mono", accentColor.split(' ')[0])}>
                                                {`using [${project.toolsUsed.map(t => `"${t}"`).join(', ')}];`}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-8">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className={cn("text-lg font-bold mb-4 border-b pb-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>const</span> stack
                            </h2>
                            <div className="space-y-2">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex justify-between items-center bg-transparent border-b border-neutral-100 dark:border-neutral-800 py-1">
                                        <span className={cn("text-xs font-bold", textColor)}>{skill.skillName}</span>
                                        <span className={cn("text-[10px]", mutedText)}>{skill.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && (
                        <section>
                            <h2 className={cn("text-lg font-bold mb-4 border-b pb-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>import</span> education
                            </h2>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-4">
                                    <div className={cn("font-bold text-sm", textColor)}>{edu.institutionName}</div>
                                    <div className={cn("text-xs", mutedText)}>{edu.degree}</div>
                                    <div className={cn("text-[10px] mt-1", mutedText)}>{edu.endYear}</div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Certs & Awards */}
                    {(certifications && certifications.length > 0) ? (
                        <section>
                            <h2 className={cn("text-sm font-bold mb-4 border-b pb-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>require</span> certifications
                            </h2>
                            <div className="space-y-3">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="text-xs">
                                        <div className={cn("font-bold", textColor)}>{cert.certificationName}</div>
                                        <div className={cn("text-[10px]", mutedText)}>{cert.issuingOrganization} | {cert.issueYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold mb-4 border-b pb-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>export</span> languages
                            </h2>
                            <div className="space-y-1">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between text-xs">
                                        <span className={textColor}>{lang.languageName}</span>
                                        <span className={mutedText}>{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold mb-4 border-b pb-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>extends</span> membership
                            </h2>
                            <div className="space-y-3">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i} className="text-xs">
                                        <div className={cn("font-bold", textColor)}>{aff.organizationName}</div>
                                        <div className={cn("text-[10px]", mutedText)}>{aff.roleOrMembership}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements & Awards */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold mb-4 border-b pb-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>yield</span> achievements
                            </h2>
                            <div className="space-y-3">
                                {achievements.map((ach, i) => (
                                    <div key={i} className="text-xs">
                                        <div className={cn("font-bold", textColor)}>{ach.achievementTitle}</div>
                                        {ach.issuingBody && <div className={cn("text-[10px]", mutedText)}>{ach.issuingBody} {ach.year && `| ${ach.year}`}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Volunteer Experience */}
                    {volunteerExperience && volunteerExperience.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold mb-4 border-b pb-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>void</span> volunteer()
                            </h2>
                            <div className="space-y-3">
                                {volunteerExperience.map((vol, i) => (
                                    <div key={i} className="text-xs">
                                        <div className={cn("font-bold", textColor)}>{vol.roleTitle}</div>
                                        <div className={cn("text-[10px]", mutedText)}>{vol.organizationName}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Publications */}
                    {publications && publications.length > 0 && (
                        <section>
                            <h2 className={cn("text-sm font-bold mb-4 border-b pb-2", textColor, accentColor.split(' ')[1])}>
                                <span className={accentColor.split(' ')[0]}>echo</span> publications
                            </h2>
                            <div className="space-y-3">
                                {publications.map((pub, i) => (
                                    <div key={i} className="text-xs">
                                        <div className={cn("font-bold", textColor)}>{pub.title}</div>
                                        <div className={cn("text-[10px]", mutedText)}>{pub.platformOrPublisher} {pub.publicationYear && `| ${pub.publicationYear}`}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* References & Info - Footer area */}
            <div className="mt-12 pt-8 border-t border-dashed border-neutral-700">
                <div className="grid grid-cols-2 gap-8">
                    {references && references.length > 0 && (
                        <section>
                            <div className={cn("text-xs font-bold mb-4", accentColor.split(' ')[0])}>{`// References`}</div>
                            <div className="space-y-3">
                                {references.map((ref, i) => (
                                    <div key={i} className="text-[10px]">
                                        <span className={textColor}>{ref.referenceName}</span>
                                        <span className={mutedText}> -- {ref.role} @ {ref.organization}</span>
                                        <div className={mutedText}>{ref.contactDetails || ref.availabilityStatement}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {additionalInfo && (
                        <section className={cn("text-[10px] p-4 rounded", codeBg)}>
                            <div className={cn("font-bold mb-2", accentColor.split(' ')[0])}>{`/* Metadata */`}</div>
                            <div className="space-y-1">
                                {additionalInfo.securityClearance && <div>{`clearance: "${additionalInfo.securityClearance}";`}</div>}
                                {additionalInfo.workAuthorization && <div>{`auth: "${additionalInfo.workAuthorization}";`}</div>}
                                {additionalInfo.willingToRelocate !== undefined && <div>{`relocate: ${additionalInfo.willingToRelocate};`}</div>}
                                {additionalInfo.availability && <div>{`availability: "${additionalInfo.availability}";`}</div>}
                                {additionalInfo.otherInfo && <div>{`info: "${additionalInfo.otherInfo}";`}</div>}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
