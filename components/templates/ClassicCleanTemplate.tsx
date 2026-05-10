import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ClassicCleanTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        languages,
        achievements,
        projects,
        volunteerExperience,
        professionalAffiliations,
        customSections,
    } = data

    // Section divider – full-width horizontal rule
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-5 mb-2">
            <h2 className={cn('text-[13px] font-bold', accentColor)}>{title}</h2>
            <hr className="border-t border-neutral-300 mt-0.5" />
        </div>
    )

    const contactParts = [
        personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', '),
        personalInfo?.phone,
        personalInfo?.email,
        personalInfo?.linkedinUrl,
        personalInfo?.portfolioUrl,
    ].filter(Boolean)

    return (
        <div
            className={cn(
                'w-full bg-white text-neutral-900 font-serif leading-snug',
                className
            )}
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
            {/* ── HEADER ── */}
            <header className="text-center pt-8 pb-3">
                <h1 className="text-[22px] font-bold uppercase tracking-widest text-neutral-900 leading-tight">
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <p className="text-[12px] text-neutral-600 mt-1 tracking-wide">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Contact row */}
                {contactParts.length > 0 && (
                    <>
                        <hr className="border-t border-neutral-300 mt-3 mx-4" />
                        <p className="text-[11px] text-neutral-700 mt-1.5 tracking-wide">
                            {contactParts.join('  |  ')}
                        </p>
                    </>
                )}
            </header>
            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="px-8 sm:px-12 pb-12 pt-8">
                    <div className="mb-8 space-y-1 text-[13px] text-neutral-800">
                        <p className="font-bold text-neutral-400 mb-6">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-bold">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-600">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-bold">{data.coverLetter.companyName}</p>}
                    </div>
                    <div className="mb-6"><p className="text-[13px] text-neutral-800">Dear {data.coverLetter?.recipientName || 'Hiring Manager'},</p></div>
                    <div className="prose prose-neutral max-w-none mb-12">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[13px] leading-relaxed mb-4 text-justify text-neutral-800">{para}</p>
                        )) || <p className="text-neutral-400 italic text-[13px]">Your cover letter will appear here...</p>}
                    </div>
                    <div className="space-y-4 text-neutral-800">
                        <p className="text-[13px]">Sincerely,</p>
                        <p className="font-bold text-[13px]">{data.personalInfo?.fullName}</p>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="px-8 sm:px-12 pb-12 pt-8">
                    <h2 className={cn("text-sm font-black uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2", accentColor)}>Professional References</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="font-bold text-neutral-900 text-[13px]">{ref.referenceName || ref.name}</span>
                                <span className="text-[12px] text-neutral-600 italic">{ref.role || ref.title}{(ref.organization || ref.company) ? `, ${ref.organization || ref.company}` : ''}</span>
                                {(ref.contactDetails || ref.contactInfo) && <span className="text-[12px] text-neutral-500 mt-1">{ref.contactDetails || ref.contactInfo}</span>}
                                {ref.availabilityStatement && <span className="text-[11px] text-neutral-400 italic mt-1">{ref.availabilityStatement}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>


            {/* ── BODY ── */}
            <div className="pb-10">

                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Professional Summary" />
                        <p className="text-[11px] text-neutral-700 leading-relaxed text-justify">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Work Experience" />
                        <div className="space-y-4">
                            {workExperience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">
                                            {job.jobTitle}
                                        </h3>
                                    </div>
                                    <div className="flex justify-between items-baseline text-[11px] text-neutral-600 mt-0.5">
                                        <span>{job.companyName}</span>
                                        <span className="shrink-0 ml-2">
                                            {job.startDate}
                                            {job.startDate ? ' \u2013 ' : ''}
                                            {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    {job.location && (
                                        <div className="text-[11px] text-neutral-500 italic">
                                            {job.location}
                                        </div>
                                    )}
                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-700 mt-1 leading-relaxed text-justify">
                                            {job.roleDescription}
                                        </p>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="mt-1 space-y-0.5 pl-4">
                                            {job.achievements.map((ach, j) => (
                                                <li
                                                    key={j}
                                                    className="text-[11px] text-neutral-700 flex gap-2 leading-relaxed"
                                                >
                                                    <span className="shrink-0 mt-0.5">•</span>
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

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Projects" />
                        <div className="space-y-3">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">
                                            {proj.projectName}
                                        </h3>
                                        {proj.startDate && (
                                            <span className="text-[11px] text-neutral-500 shrink-0 ml-2">
                                                {proj.startDate}{proj.endDate ? ` \u2013 ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && (
                                        <div className="text-[11px] text-neutral-600 italic">{proj.role}</div>
                                    )}
                                    {proj.description && (
                                        <p className="text-[11px] text-neutral-700 mt-0.5 leading-relaxed">
                                            {proj.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Education" />
                        <div className="space-y-3">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">
                                            {edu.degree}
                                            {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                                        </h3>
                                    </div>
                                    <div className="flex justify-between items-baseline text-[11px] text-neutral-600">
                                        <span>{edu.institutionName}</span>
                                        <span className="shrink-0 ml-2">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-500">GPA: {edu.gpa}</div>
                                    )}
                                    {edu.achievements && (
                                        <div className="text-[11px] text-neutral-500 italic">{edu.achievements}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <SectionHeader title="Certifications" />
                        <div className="space-y-2">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div>
                                        <span className="text-[12px] font-bold text-neutral-900">
                                            {cert.certificationName}
                                        </span>
                                        {cert.issuingOrganization && (
                                            <span className="text-[11px] text-neutral-600 ml-2">
                                                — {cert.issuingOrganization}
                                            </span>
                                        )}
                                    </div>
                                    {cert.issueDate && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-2">
                                            {cert.issueDate}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements / Awards */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Awards & Honors" />
                        <div className="space-y-2">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div>
                                        <span className="text-[12px] font-bold text-neutral-900">
                                            {ach.achievementTitle}
                                        </span>
                                        {ach.issuingBody && (
                                            <span className="text-[11px] text-neutral-600 ml-2">
                                                — {ach.issuingBody}
                                            </span>
                                        )}
                                    </div>
                                    {ach.year && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-2">{ach.year}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer Experience */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Volunteer Experience" />
                        <div className="space-y-3">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{vol.roleTitle}</h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-2">
                                            {vol.startDate}{vol.endDate ? ` \u2013 ${vol.endDate}` : vol.startDate ? ' \u2013 Present' : ''}
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-neutral-600">{vol.organizationName}</div>
                                    {vol.contributions && (
                                        <p className="text-[11px] text-neutral-700 mt-0.5 leading-relaxed">
                                            {vol.contributions}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Affiliations */}
                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <section>
                        <SectionHeader title="Professional Affiliations" />
                        <div className="space-y-1.5">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div>
                                        <span className="text-[12px] font-bold text-neutral-900">
                                            {aff.organizationName}
                                        </span>
                                        {aff.roleOrMembership && (
                                            <span className="text-[11px] text-neutral-600 ml-2">
                                                — {aff.roleOrMembership}
                                            </span>
                                        )}
                                    </div>
                                    {aff.yearsActive && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-2">
                                            {aff.yearsActive}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <SectionHeader title="Languages" />
                        <p className="text-[11px] text-neutral-700 text-center tracking-wide">
                            {languages.map((l, i) => (
                                <span key={i}>
                                    {l.languageName}
                                    {l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}
                                    {i < languages.length - 1 ? '  |  ' : ''}
                                </span>
                            ))}
                        </p>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Skills" />
                        <p className="text-[11px] text-neutral-700 text-center tracking-wide leading-relaxed">
                            {skills.map((s, i) => (
                                <span key={i}>
                                    {s.skillName}
                                    {i < skills.length - 1 ? '  |  ' : ''}
                                </span>
                            ))}
                        </p>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.length > 0 && customSections.map((section, si) => (
                    <section key={si}>
                        <SectionHeader title={section.title} />
                        {section.content && (
                            <p className="text-[11px] text-neutral-700 leading-relaxed text-justify mb-2">
                                {section.content}
                            </p>
                        )}
                        {section.items && section.items.length > 0 && (
                            <ul className="space-y-0.5 pl-4">
                                {section.items.map((item, ii) => (
                                    <li key={ii} className="text-[11px] text-neutral-700 flex gap-2 leading-relaxed">
                                        <span className="shrink-0 mt-0.5">•</span>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        
                </>
            )}
            </div>
    )
}
