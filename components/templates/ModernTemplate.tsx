import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ModernTemplate({ data, className, accentColor = 'bg-slate-900' }: TemplateProps) {
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
        additionalInfo,
        customSections
    } = data

    return (
        <div className={cn("w-full bg-white aspect-[210/297] grid grid-cols-12 shadow-sm font-sans", className)}>
            {/* Sidebar - Dark */}
            <div className={cn("col-span-4 text-white p-8", accentColor)}>
                <div className="mb-8 text-center">
                    {/* Initials Circle */}
                    <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 border-2 border-white/20">
                        <span className="text-3xl font-bold">{personalInfo?.fullName?.split(' ').map((n: any) => n[0]).join('')}</span>
                    </div>

                    <h2 className="text-xl font-bold mb-2">{personalInfo?.professionalTitle}</h2>

                    <div className="text-sm space-y-2 opacity-90">
                        {personalInfo?.email && <div className="break-all">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {(personalInfo?.city || personalInfo?.country) && <div>{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>}
                        {personalInfo?.linkedinUrl && <div className="break-all">{personalInfo.linkedinUrl}</div>}
                        {personalInfo?.websiteUrl && <div className="break-all">{personalInfo.websiteUrl}</div>}
                    </div>
                </div>

                {/* Sidebar Sections */}
                {skills && skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b border-white/20 pb-2 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className="bg-white/10 px-2 py-1 rounded text-sm">{skill.skillName}</span>
                            ))}
                        </div>
                    </div>
                )}

                {education && education.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b border-white/20 pb-2 mb-4">Education</h3>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="font-bold">{edu.institutionName}</div>
                                    <div className="text-sm opacity-80">{edu.degree}</div>
                                    <div className="text-xs opacity-60">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                )}

                {languages && languages.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b border-white/20 pb-2 mb-4">Languages</h3>
                        <div className="space-y-1 text-sm">
                            {languages.map((lang, i) => (
                                <div key={i} className="flex justify-between">
                                    <span>{lang.languageName}</span>
                                    <span className="opacity-70 text-xs">{lang.proficiencyLevel}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b border-white/20 pb-2 mb-4">Affiliations</h3>
                        <div className="space-y-4">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i}>
                                    <div className="font-bold text-sm">{aff.organizationName}</div>
                                    <div className="text-xs opacity-80">{aff.roleOrMembership}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content - Light */}
            <div className="col-span-8 p-10 text-slate-800">
                <header className="mb-10 border-b-2 border-slate-100 pb-6">
                    <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">{personalInfo?.fullName}</h1>
                    {professionalSummary && (
                        <p className="text-lg text-slate-600 leading-relaxed">{professionalSummary.summaryText}</p>
                    )}
                </header>

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">Experience</h3>
                        <div className="space-y-8">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h4 className="text-xl font-bold text-slate-800">{job.jobTitle}</h4>
                                        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                            {job.startDate} - {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    <div className="text-slate-600 font-medium mb-3">{job.companyName}</div>
                                    <p className="text-slate-600 mb-3">{job.roleDescription}</p>
                                    {job.achievements && (
                                        <ul className="list-disc list-outside ml-5 text-sm text-slate-600 space-y-1">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j}>{ach.achievementText}</li>
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
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">Projects</h3>
                        <div className="space-y-6">
                            {projects.map((project, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold text-slate-800">{project.projectName}</h4>
                                        {project.startDate && (
                                            <span className="text-xs text-slate-500 font-mono">
                                                {project.startDate} {project.endDate ? `- ${project.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm font-semibold text-slate-600 mb-1">
                                        {project.role && <span>{project.role}</span>}
                                        {project.clientOrOrganization && <span> | {project.clientOrOrganization}</span>}
                                    </div>
                                    {project.description && <p className="text-slate-600 mb-2 text-sm">{project.description}</p>}
                                    {project.toolsUsed && project.toolsUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.toolsUsed.map((tool, t) => (
                                                <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
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

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">Certifications</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-2">
                                    <div>
                                        <div className="font-bold text-slate-800">{cert.certificationName}</div>
                                        <div className="text-sm text-slate-500">{cert.issuingOrganization}</div>
                                    </div>
                                    {cert.issueYear && <div className="text-sm font-mono text-slate-400">{cert.issueYear}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">Achievements</h3>
                        <div className="grid grid-cols-1 gap-6">
                            {achievements.map((ach, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold text-slate-800">{ach.achievementTitle}</h4>
                                        {ach.year && <span className="text-sm font-mono text-slate-400">{ach.year}</span>}
                                    </div>
                                    <div className="text-sm text-slate-600 font-semibold mb-1">{ach.issuingBody}</div>
                                    {ach.description && <p className="text-sm text-slate-600 leading-relaxed">{ach.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">Volunteering</h3>
                        <div className="space-y-4">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-slate-800">{vol.roleTitle}</h4>
                                        <span className="text-xs text-slate-500">{vol.startDate} - {vol.endDate}</span>
                                    </div>
                                    <div className="text-sm text-slate-600 mb-1">{vol.organizationName}</div>
                                    {vol.contributions && <p className="text-sm text-slate-600">{vol.contributions}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications */}
                {publications && publications.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">Publications</h3>
                        <div className="space-y-2">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-sm">
                                    <span className="font-bold text-slate-800 italic">{pub.title}</span>
                                    <span className="text-slate-600"> — {pub.platformOrPublisher}</span>
                                    {pub.publicationYear && <span className="text-slate-500"> ({pub.publicationYear})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Additional Info */}
                {additionalInfo && (
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">Additional Info</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            {additionalInfo.securityClearance && <div><span className="font-bold text-slate-800">Clearance:</span> <span className="text-slate-600">{additionalInfo.securityClearance}</span></div>}
                            {additionalInfo.workAuthorization && <div><span className="font-bold text-slate-800">Authorization:</span> <span className="text-slate-600">{additionalInfo.workAuthorization}</span></div>}
                            {additionalInfo.availability && <div><span className="font-bold text-slate-800">Availability:</span> <span className="text-slate-600">{additionalInfo.availability}</span></div>}
                            {additionalInfo.willingToRelocate !== undefined && <div><span className="font-bold text-slate-800">Relocate:</span> <span className="text-slate-600">{additionalInfo.willingToRelocate ? 'Yes' : 'No'}</span></div>}
                        </div>
                        {additionalInfo.otherInfo && <p className="text-slate-700 leading-relaxed italic">{additionalInfo.otherInfo}</p>}
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">References</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {references.map((ref, i) => (
                                <div key={i} className="text-sm">
                                    <div className="font-bold text-slate-800">{ref.referenceName}</div>
                                    <div className="text-slate-600 italic mb-1">{ref.role} — {ref.organization}</div>
                                    <div className="text-xs text-slate-500">{ref.contactDetails || ref.availabilityStatement}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.length > 0 && customSections.map((section, idx) => (
                    <section key={section.id || idx} className="mb-10">
                        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6 uppercase tracking-wider">{section.title}</h3>
                        {section.items && section.items.length > 0 ? (
                            <ul className="list-disc list-outside ml-5 text-sm text-slate-600 space-y-1">
                                {section.items.map((item, iIdx) => (
                                    <li key={item.id || iIdx}>{item.text}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-600 leading-relaxed">{section.content}</p>
                        )}
                    </section>
                ))}
            </div>
        </div >
    )
}
