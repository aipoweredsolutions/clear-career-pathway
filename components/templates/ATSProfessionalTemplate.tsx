import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function ATSProfessionalTemplate({ data, className }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        projects,
        additionalInfo,
        languages,
        professionalAffiliations
    } = data

    return (
        <div className={cn(
            "w-full bg-white aspect-[210/297] p-12 text-neutral-900",
            "font-sans",
            className
        )}>
            {/* Header - Name centered */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-3">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                {/* Contact Details - Single line with minimal icons */}
                <div className="flex items-center justify-center gap-4 text-sm text-neutral-700 flex-wrap">
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-neutral-900">☎</span>
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo?.email && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-neutral-900">✉</span>
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-neutral-900">in</span>
                            <span>{personalInfo.linkedinUrl}</span>
                        </div>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-neutral-900">📍</span>
                            <span>
                                {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                            </span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {professionalSummary?.summaryText && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2 border-neutral-900">
                        Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed text-neutral-800">
                        {professionalSummary.summaryText}
                    </p>
                </section>
            )}

            {/* Core Skills */}
            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2 border-neutral-900">
                        Core Skills
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {skills.map((skill, index) => (
                            <span key={skill.id || index} className="text-neutral-800">
                                {skill.skillName}
                                {index < skills.length - 1 && ''}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Work Experience */}
            {workExperience && workExperience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2 border-neutral-900">
                        Work Experience
                    </h2>
                    <div className="space-y-4">
                        {workExperience.map((job, index) => (
                            <div key={job.id || index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-base font-bold">
                                        {job.jobTitle}
                                    </h3>
                                    <span className="text-sm text-neutral-600">
                                        {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                    </span>
                                </div>
                                <div className="text-sm font-semibold text-neutral-700 mb-2">
                                    {job.companyName}
                                    {job.location && ` | ${job.location}`}
                                </div>
                                {job.roleDescription && (
                                    <p className="text-sm text-neutral-800 mb-2 leading-relaxed">
                                        {job.roleDescription}
                                    </p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="list-disc list-outside ml-5 space-y-1">
                                        {job.achievements.map((achievement, achIndex) => (
                                            <li key={achievement.id || achIndex} className="text-sm text-neutral-800 leading-relaxed">
                                                {achievement.achievementText}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2 border-neutral-900">
                        Education
                    </h2>
                    <div className="space-y-3">
                        {education.map((edu, index) => (
                            <div key={edu.id || index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-base font-bold">
                                        {edu.degree}
                                        {edu.major && ` in ${edu.major}`}
                                    </h3>
                                    <span className="text-sm text-neutral-600">
                                        {edu.endYear}
                                    </span>
                                </div>
                                <div className="text-sm text-neutral-700">
                                    {edu.institutionName}
                                    {edu.location && ` | ${edu.location}`}
                                </div>
                                {edu.gpa && (
                                    <div className="text-sm text-neutral-700">
                                        GPA: {edu.gpa}
                                    </div>
                                )}
                                {edu.achievements && (
                                    <div className="text-sm text-neutral-800 mt-1">
                                        {edu.achievements}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2 border-neutral-900">
                        Certifications
                    </h2>
                    <div className="space-y-2">
                        {certifications.map((cert, index) => (
                            <div key={cert.id || index} className="text-sm">
                                <span className="font-bold">{cert.certificationName}</span>
                                <span className="text-neutral-700"> – {cert.issuingOrganization}</span>
                                {cert.issueYear && (
                                    <span className="text-neutral-600"> ({cert.issueYear})</span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2 border-neutral-900">
                        Projects
                    </h2>
                    <div className="space-y-3">
                        {projects.map((project, index) => (
                            <div key={project.id || index}>
                                <h3 className="text-base font-bold mb-1">
                                    {project.projectName}
                                    {project.role && ` – ${project.role}`}
                                </h3>
                                {project.clientOrOrganization && (
                                    <div className="text-sm text-neutral-700 mb-1">
                                        {project.clientOrOrganization}
                                    </div>
                                )}
                                {project.description && (
                                    <p className="text-sm text-neutral-800 leading-relaxed mb-1">
                                        {project.description}
                                    </p>
                                )}
                                {project.toolsUsed && project.toolsUsed.length > 0 && (
                                    <div className="text-sm text-neutral-700">
                                        <span className="font-semibold">Technologies:</span> {project.toolsUsed.join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Additional Information */}
            {(languages && languages.length > 0) ||
                (professionalAffiliations && professionalAffiliations.length > 0) ||
                additionalInfo?.otherInfo && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2 border-neutral-900">
                            Additional Information
                        </h2>

                        {languages && languages.length > 0 && (
                            <div className="mb-2">
                                <span className="text-sm font-bold">Languages: </span>
                                <span className="text-sm text-neutral-800">
                                    {languages.map(lang => `${lang.languageName} (${lang.proficiencyLevel})`).join(', ')}
                                </span>
                            </div>
                        )}

                        {professionalAffiliations && professionalAffiliations.length > 0 && (
                            <div className="mb-2">
                                <span className="text-sm font-bold">Professional Affiliations: </span>
                                <span className="text-sm text-neutral-800">
                                    {professionalAffiliations.map(aff => aff.organizationName).join(', ')}
                                </span>
                            </div>
                        )}

                        {additionalInfo?.otherInfo && (
                            <p className="text-sm text-neutral-800 leading-relaxed">
                                {additionalInfo.otherInfo}
                            </p>
                        )}
                    </section>
                )}
        </div>
    )
}
