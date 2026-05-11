import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Academia CV Template — "The Distinguished Scholar"
 *
 * A prestigious academic curriculum vitae inspired by elite research institution
 * formatting. Features a bold serif name header, contact row with icon markers,
 * ALL-CAPS section headers with full-width underlines, and cream-colored
 * dissertation/advisor highlight boxes.
 *
 * Unique identity: Large bold serif header, icon-prefixed contact row,
 * education with dissertation boxes, citation-formatted publications,
 * structured references with name/title/org/contact format.
 *
 * 100% ATS-compliant single-column layout.
 */
export function ATSAcademiaCVTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
        references,
        languages,
        professionalAffiliations,
        customSections
    } = data

    const sectionOrder = data.sectionOrder || [
        'professionalSummary',
        'education',
        'workExperience',
        'publications',
        'skills',
        'professionalAffiliations',
        'volunteerExperience',
        'achievements',
        'certifications',
        'projects',
        'languages',
        'references'
    ]

    // Section header — ALL CAPS with full-width underline
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-10 mb-5 first:mt-0">
            <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-neutral-900 mb-2.5 pb-2 border-b border-neutral-300"
                style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                {title}
            </h2>
        </div>
    )

    // Build contact parts with markers
    const ContactItem = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
        <span className="flex items-center gap-1.5 text-[10.5px] text-neutral-600">
            <span className="text-neutral-400">{icon}</span>
            {children}
        </span>
    )

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case 'professionalSummary':
                return professionalSummary?.summaryText ? (
                    <section key={sectionId}>
                        <SectionHeader title="Research Overview" />
                        <p className="text-[12.5px] text-neutral-700 leading-[1.85] text-justify"
                           style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                ) : null

            case 'education':
                return education && education.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Education" />
                        <div className="space-y-7">
                            {education.map((edu, i) => (
                                <div key={i} className="break-inside-avoid">
                                    {/* Degree + Dates */}
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[13px] font-bold text-neutral-900"
                                            style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {edu.degree}
                                            {edu.major ? ` in ${edu.major}` : ''}
                                            {edu.gpa ? `, ${edu.gpa}` : ''}
                                        </h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4">
                                            {edu.startYear && `${edu.startYear} – `}{edu.endYear}
                                        </span>
                                    </div>

                                    {/* Institution — italic */}
                                    <p className="text-[12px] text-neutral-500 italic mb-2"
                                       style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                        {edu.institutionName}{edu.location ? `, ${edu.location}` : ''}
                                    </p>

                                    {/* Dissertation / Advisor box */}
                                    {edu.achievements && (
                                        <div className="bg-[#faf8f5] border-l-[3px] border-neutral-300 px-4 py-3 text-[11.5px] text-neutral-600 leading-relaxed"
                                             style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {edu.achievements}
                                        </div>
                                    )}

                                    {edu.coursework && (
                                        <p className="text-[11px] text-neutral-500 mt-2 italic">
                                            Relevant Coursework: {edu.coursework}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'workExperience':
                return workExperience && workExperience.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Academic Appointments" />
                        <div className="space-y-7">
                            {workExperience.map((job, i) => (
                                <div key={i} className="break-inside-avoid">
                                    {/* Title + Dates */}
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[13px] font-bold text-neutral-900"
                                            style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {job.jobTitle}
                                        </h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4">
                                            {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {/* Department / Institution — italic */}
                                    <p className="text-[12px] text-neutral-500 italic mb-2"
                                       style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                        {job.companyName}{job.location ? `, ${job.location}` : ''}
                                    </p>

                                    {/* Role Description */}
                                    {job.roleDescription && (
                                        <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed italic"
                                           style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {/* Achievements */}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1.5 ml-4">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[12px] text-neutral-700 flex gap-2.5 leading-[1.7]"
                                                    style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                                    <span className="text-neutral-400 mt-[2px] shrink-0">▪</span>
                                                    <span>{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'publications':
                return publications && publications.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Publications & Presentations" />
                        <div className="space-y-4 border-l-[3px] border-neutral-100 pl-5">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-[12px] text-neutral-700 leading-relaxed break-inside-avoid"
                                     style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                    <span className="italic">{pub.title}</span>
                                    {pub.platformOrPublisher && (
                                        <span>. {pub.platformOrPublisher}</span>
                                    )}
                                    {pub.publicationYear && (
                                        <span> ({pub.publicationYear})</span>
                                    )}
                                    {pub.url && (
                                        <span className="text-[10px] text-neutral-400 ml-1">[{pub.url}]</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Research Expertise & Methods" />
                        <div className="space-y-3">
                            {(() => {
                                const grouped = skills.reduce((acc, skill) => {
                                    const type = skill.skillType || 'professional'
                                    if (!acc[type]) acc[type] = []
                                    acc[type].push(skill)
                                    return acc
                                }, {} as Record<string, typeof skills>)

                                const labels: Record<string, string> = {
                                    technical: 'Methods & Techniques',
                                    professional: 'Core Competencies',
                                    tool: 'Tools & Software',
                                    industry: 'Domain Expertise'
                                }

                                return Object.entries(grouped).map(([type, list]) => (
                                    <div key={type} className="flex gap-3 text-[12px]">
                                        <span className="font-bold text-neutral-900 min-w-[160px] shrink-0"
                                              style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {labels[type] || type}:
                                        </span>
                                        <span className="text-neutral-600" style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {list.map(s => s.skillName).join('  ·  ')}
                                        </span>
                                    </div>
                                ))
                            })()}
                        </div>
                    </section>
                ) : null

            case 'professionalAffiliations':
                return professionalAffiliations && professionalAffiliations.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Professional Memberships" />
                        <div className="space-y-2.5">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="break-inside-avoid flex justify-between items-baseline">
                                    <span className="text-[12px] text-neutral-800" style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                        {aff.organizationName}
                                        {aff.roleOrMembership && <span className="text-neutral-500"> — {aff.roleOrMembership}</span>}
                                    </span>
                                    {aff.yearsActive && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4">{aff.yearsActive}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'volunteerExperience':
                return volunteerExperience && volunteerExperience.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Service & Outreach" />
                        <div className="space-y-5">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[13px] font-bold text-neutral-900"
                                            style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {vol.roleTitle}
                                        </h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4">
                                            {vol.startDate}{vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                        </span>
                                    </div>
                                    <p className="text-[12px] text-neutral-500 italic mb-1"
                                       style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                        {vol.organizationName}
                                    </p>
                                    {vol.contributions && (
                                        <p className="text-[12px] text-neutral-600 leading-[1.7]"
                                           style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {vol.contributions}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'achievements':
                return achievements && achievements.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Honors & Awards" />
                        <div className="space-y-2.5">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex justify-between items-baseline break-inside-avoid">
                                    <div className="text-[12px]" style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                        <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                        {ach.issuingBody && <span className="text-neutral-500"> — {ach.issuingBody}</span>}
                                    </div>
                                    {ach.year && <span className="text-[11px] text-neutral-500 shrink-0 ml-4">{ach.year}</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'certifications':
                return certifications && certifications.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Certifications & Training" />
                        <div className="space-y-2">
                            {certifications.map((cert, i) => (
                                <div key={i} className="break-inside-avoid flex justify-between items-baseline">
                                    <div className="text-[12px]" style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                        <span className="font-bold text-neutral-900">{cert.certificationName}</span>
                                        <span className="text-neutral-500"> — {cert.issuingOrganization}</span>
                                    </div>
                                    {cert.issueYear && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4">{cert.issueYear}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'projects':
                return projects && projects.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Funded Research & Grants" />
                        <div className="space-y-5">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[13px] font-bold text-neutral-900"
                                            style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {proj.projectName}
                                        </h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[11px] text-neutral-500 shrink-0 ml-4">
                                                {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && (
                                        <p className="text-[11px] text-neutral-500 italic mb-1">{proj.role}</p>
                                    )}
                                    {proj.description && (
                                        <p className="text-[12px] text-neutral-600 leading-[1.7]"
                                           style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                            {proj.description}
                                        </p>
                                    )}
                                    {proj.outcomes && (
                                        <p className="text-[11px] text-neutral-500 mt-1 italic">
                                            Outcome: {proj.outcomes}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'languages':
                return languages && languages.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="Languages" />
                        <div className="flex flex-wrap gap-x-8 gap-y-1 text-[12px]" style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                            {languages.map((lang, i) => (
                                <span key={i} className="text-neutral-700">
                                    <span className="font-bold">{lang.languageName}</span>
                                    <span className="text-neutral-400 ml-1">({lang.proficiencyLevel})</span>
                                </span>
                            ))}
                        </div>
                    </section>
                ) : null

            case 'references':
                return references && references.length > 0 ? (
                    <section key={sectionId}>
                        <SectionHeader title="References" />
                        <div className="space-y-5">
                            {references.map((ref, i) => (
                                <div key={i} className="break-inside-avoid"
                                     style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                    <p className="text-[13px] font-bold text-neutral-900 mb-0.5">
                                        {ref.referenceName || ref.name}
                                    </p>
                                    <p className="text-[12px] text-neutral-600">
                                        {ref.role || ref.title}
                                    </p>
                                    {(ref.organization || ref.company) && (
                                        <p className="text-[12px] text-neutral-600">
                                            {ref.organization || ref.company}
                                        </p>
                                    )}
                                    {(ref.contactDetails || ref.contactInfo) && (
                                        <p className="text-[11.5px] text-neutral-500 mt-1">
                                            {ref.contactDetails || ref.contactInfo}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null

            default:
                return null
        }
    }

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-normal', className)}
            style={{ fontFamily: "'Georgia', 'Lora', serif" }}
        >
            {/* ═══ HEADER ═══ */}
            <header className="text-center pt-10 pb-6 px-12">
                {/* Name — Large bold serif */}
                <h1 className="text-[32px] font-bold text-neutral-900 leading-tight mb-2"
                    style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                {/* Professional Title */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[13px] text-neutral-500 tracking-wide mb-5"
                       style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Contact Row — icon-prefixed */}
                <div className="flex items-center justify-center gap-x-5 flex-wrap text-[10.5px] text-neutral-500 border-t border-neutral-200 pt-4">
                    {personalInfo?.email && (
                        <ContactItem icon="✉">
                            <span>{personalInfo.email}</span>
                        </ContactItem>
                    )}
                    {personalInfo?.phone && (
                        <ContactItem icon="✆">
                            <span>{personalInfo.phone}</span>
                        </ContactItem>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <ContactItem icon="◉">
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </ContactItem>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <ContactItem icon="⊕">
                            <span>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </ContactItem>
                    )}
                    {personalInfo?.portfolioUrl && (
                        <ContactItem icon="⊕">
                            <span>{personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </ContactItem>
                    )}
                    {personalInfo?.websiteUrl && (
                        <ContactItem icon="⊕">
                            <span>{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </ContactItem>
                    )}
                </div>
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
                            <div key={i} className="break-inside-avoid flex flex-col gap-1">
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


            {/* ═══ BODY ═══ */}
            <div className="px-12 pb-12">
                {sectionOrder.map(sectionId => renderSection(sectionId))}

                {/* Custom Sections */}
                {customSections && customSections.length > 0 && customSections.map((section, si) => (
                    <section key={`custom-${si}`} className="break-inside-avoid">
                        <SectionHeader title={section.title} />
                        {section.content && (
                            <p className="text-[12px] text-neutral-700 leading-[1.7] text-justify mb-2"
                               style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                                {section.content}
                            </p>
                        )}
                        {section.items && section.items.length > 0 && (
                            <ul className="space-y-1 ml-4">
                                {section.items.map((item, ii) => (
                                    <li key={ii} className="text-[12px] text-neutral-700 flex gap-2 leading-[1.6]">
                                        <span className="shrink-0">▪</span>
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
