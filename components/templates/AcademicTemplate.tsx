import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    density?: 'comfortable' | 'compact'
}

export function AcademicTemplate({ data, className, density = 'comfortable' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, publications, achievements, certifications, languages, volunteerExperience, customSections, projects, professionalAffiliations } = data

    const spacing = density === 'compact' ? 'space-y-3' : 'space-y-4'
    const itemSpacing = density === 'compact' ? 'space-y-2' : 'space-y-3'

    return (
        <div
            className={cn('w-full bg-white text-neutral-900', className)}
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
        >
            {/* Header - Academic Standard */}
            <header className="text-center mb-4 border-b-4 border-black pb-4">
                <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">
                    {personalInfo?.fullName}
                </h1>
                {personalInfo?.professionalTitle && (
                    <div className="text-sm font-bold uppercase tracking-widest mb-2">
                        {personalInfo.professionalTitle}
                    </div>
                )}
                <div className="flex justify-center flex-wrap gap-x-4 text-sm text-black">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
                </div>
                <div className="flex justify-center flex-wrap gap-x-4 text-sm mt-1">
                    {personalInfo?.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
                    {personalInfo?.websiteUrl && <span>{personalInfo.websiteUrl}</span>}
                    {personalInfo?.portfolioUrl && <span>{personalInfo.portfolioUrl}</span>}
                </div>
            </header>

            <div className={spacing}>
                {/* Research Interests / Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Research Interests</h2>
                        <p className="text-sm text-justify ml-2">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Education - Top Priority in Academia */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Education</h2>
                        <div className={cn('ml-2', itemSpacing)}>
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold">{edu.institutionName}{edu.location ? `, ${edu.location}` : ''}</div>
                                        <div className="italic">{edu.degree}{edu.major ? ` in ${edu.major}` : ''}{edu.fieldOfStudy && !edu.major ? ` in ${edu.fieldOfStudy}` : ''}</div>
                                        {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
                                        {edu.achievements && <div className="text-sm italic">{edu.achievements}</div>}
                                        {edu.coursework && <div className="text-sm">Relevant Coursework: {edu.coursework}</div>}
                                    </div>
                                    <div className="text-sm font-medium ml-4 shrink-0">{edu.startYear ? `${edu.startYear}–` : ''}{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications - Key for Academic */}
                {publications && publications.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Publications</h2>
                        <ol className="list-decimal list-outside ml-6 space-y-2 text-sm">
                            {publications.map((pub, i) => (
                                <li key={i}>
                                    <span className="font-bold">{pub.title}</span>. {pub.platformOrPublisher}, {pub.publicationYear}.
                                    {pub.url && <span className="text-neutral-600"> Available: {pub.url}</span>}
                                </li>
                            ))}
                        </ol>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Professional Experience</h2>
                        <div className={cn('ml-2', itemSpacing)}>
                            {workExperience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm">
                                        <span>{exp.jobTitle}, {exp.companyName}{exp.location ? `, ${exp.location}` : ''}</span>
                                        <span className="ml-4 shrink-0">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                    </div>
                                    {exp.roleDescription && (
                                        <div className="text-sm mt-1 text-justify">
                                            {exp.roleDescription}
                                        </div>
                                    )}
                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <ul className="list-disc list-outside ml-5 mt-1 space-y-0.5 text-sm">
                                            {exp.achievements.map((ach, j) => (
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
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Research Projects</h2>
                        <div className={cn('ml-2', itemSpacing)}>
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm">
                                        <span>{proj.projectName}{proj.clientOrOrganization ? `, ${proj.clientOrOrganization}` : ''}</span>
                                        <span className="ml-4 shrink-0">{proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}</span>
                                    </div>
                                    {proj.role && <div className="italic text-sm">{proj.role}</div>}
                                    {proj.description && <div className="text-sm mt-1 text-justify">{proj.description}</div>}
                                    {proj.outcomes && <div className="text-sm text-neutral-700 mt-0.5 italic">{proj.outcomes}</div>}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-sm text-neutral-600 mt-0.5">Tools: {proj.toolsUsed.join(', ')}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Awards */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Awards & Honors</h2>
                        <div className={cn('ml-2', itemSpacing)}>
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex justify-between items-start text-sm">
                                    <div>
                                        <span className="font-bold">{ach.achievementTitle}</span>
                                        {ach.issuingBody && <span>, {ach.issuingBody}</span>}
                                        {ach.description && <div className="italic">{ach.description}</div>}
                                    </div>
                                    {ach.year && <div className="ml-4 shrink-0">{ach.year}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Certifications</h2>
                        <div className={cn('ml-2', itemSpacing)}>
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex justify-between items-start text-sm">
                                    <div>
                                        <span className="font-bold">{cert.certificationName}</span>
                                        <span>, {cert.issuingOrganization}</span>
                                    </div>
                                    {cert.issueYear && <div className="ml-4 shrink-0">{cert.issueYear}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer Experience */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Service & Leadership</h2>
                        <div className={cn('ml-2', itemSpacing)}>
                            {volunteerExperience.map((vol, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm">
                                        <span>{vol.roleTitle}, {vol.organizationName}</span>
                                        <span className="ml-4 shrink-0">{vol.startDate} – {vol.endDate}</span>
                                    </div>
                                    {vol.contributions && <div className="text-sm mt-0.5 text-justify">{vol.contributions}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Affiliations */}
                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Professional Memberships</h2>
                        <div className={cn('ml-2', itemSpacing)}>
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="flex justify-between items-start text-sm">
                                    <div>
                                        <span className="font-bold">{aff.organizationName}</span>
                                        {aff.roleOrMembership && <span>, {aff.roleOrMembership}</span>}
                                    </div>
                                    {aff.yearsActive && <div className="ml-4 shrink-0 italic">{aff.yearsActive}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills - Simple List */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Technical Skills</h2>
                        <div className="ml-2 text-sm">
                            {(() => {
                                const grouped: Record<string, string[]> = {}
                                skills.forEach(s => {
                                    const type = s.skillType || 'general'
                                    if (!grouped[type]) grouped[type] = []
                                    grouped[type].push(s.skillName)
                                })
                                const labels: Record<string, string> = {
                                    technical: 'Technical',
                                    professional: 'Professional',
                                    tool: 'Tools & Software',
                                    industry: 'Industry Knowledge',
                                    general: 'General'
                                }
                                return Object.entries(grouped).map(([type, skillNames], idx) => (
                                    <div key={idx} className="flex gap-2 mb-1">
                                        <span className="font-bold">{labels[type] || type}:</span>
                                        <span>{skillNames.join(', ')}</span>
                                    </div>
                                ))
                            })()}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Languages</h2>
                        <div className="ml-2 text-sm">
                            {languages.map((lang, i) => (
                                <span key={i}>
                                    <span className="font-bold">{lang.languageName}</span> ({lang.proficiencyLevel}){i < languages.length - 1 ? '; ' : ''}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections?.map((sec, idx) => (
                    <section key={idx}>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">{sec.title}</h2>
                        <ul className="list-disc list-outside ml-6 space-y-1 text-sm">
                            {sec.items?.map((item, j) => (
                                <li key={j}>{item.text}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    )
}
