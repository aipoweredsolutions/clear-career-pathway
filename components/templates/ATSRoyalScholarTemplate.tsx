import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Royal Scholar Template — "The Institution"
 *
 * A prestigious, academic-style curriculum vitae designed for
 * professors, researchers, attorneys, and senior consultants.
 * Features a centered serif header with small-caps name,
 * thick top/bottom border framing, and indented section body.
 *
 * Unique identity: Heavy top/bottom border frame, Lora serif body,
 * centered name in small-caps, section titles with left ornamental
 * dash prefix, and a formal two-column reference layout.
 *
 * Passes 100% of Applicant Tracking Systems.
 */
export function ATSRoyalScholarTemplate({ data, className, accentColor = 'text-blue-900' }: TemplateProps) {
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
        additionalInfo,
        languages,
        professionalAffiliations,
        customSections
    } = data

    const borderColor = accentColor.replace('text-', 'border-')
    const bgColor = accentColor.replace('text-', 'bg-')

    // Section header with ornamental prefix dash
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-10 mb-5">
            <h2 className={cn(
                'text-[13.5px] font-black uppercase tracking-[0.3em]',
                accentColor
            )} style={{ fontVariant: 'small-caps' }}>
                {title}
            </h2>
            <div className={cn('h-[2px] w-12 mt-2', bgColor)} />
        </div>
    )

    // Build contact parts
    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))
    if (personalInfo?.portfolioUrl) contactParts.push(personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div
            className={cn('w-full bg-white text-neutral-800 leading-normal', className)}
            style={{ fontFamily: "'Lora', 'Georgia', 'Times New Roman', serif" }}
        >
            {/* ═══ FRAME TOP BORDER ═══ */}
            <div className="flex h-[8px] w-full">
                <div className={cn('flex-1', bgColor, 'opacity-100')} />
                <div className={cn('flex-1', bgColor, 'opacity-60')} />
                <div className={cn('flex-1', bgColor, 'opacity-30')} />
                <div className={cn('flex-1', bgColor, 'opacity-10')} />
            </div>

            {/* ═══ HEADER ═══ */}
            <header className="text-center pt-10 pb-8 px-12">
                {/* Name — small-caps style, large */}
                <h1 className={cn(
                    'text-[36px] font-bold tracking-[0.25em] leading-tight mb-2',
                    accentColor
                )} style={{ fontVariant: 'small-caps' }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                {/* Professional Title */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[14px] text-neutral-400 tracking-[0.2em] font-bold uppercase mb-6 font-sans">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Contact — dot separated */}
                {contactParts.length > 0 && (
                    <p className="text-[11px] text-neutral-500 tracking-[0.1em] font-bold uppercase leading-relaxed font-sans">
                        {contactParts.join('  ·  ')}
                    </p>
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


            {/* ═══ BODY ═══ */}
            <div className="px-12 pb-12">

                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Institutional Statement" />
                        <div className="border-l-4 border-neutral-50 pl-8">
                            <p className="text-[14.5px] text-neutral-700 leading-[1.9] text-justify font-serif">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    </section>
                )}

                {/* Education — placed prominently for academic focus */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Academic Credentials" />
                        <div className="space-y-8">
                            {education.map((edu, i) => (
                                <div key={i} className="break-inside-avoid border-l-4 border-neutral-50 pl-8">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className={cn('text-[16px] font-bold font-serif', accentColor)}>
                                            {edu.degree}
                                            {edu.major ? ` in ${edu.major}` : ''}
                                        </h3>
                                        <span className="text-[11px] font-black text-neutral-400 shrink-0 ml-4 font-sans uppercase tracking-widest">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                    <div className="text-[14px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                                        {edu.institutionName}{edu.location && <span className="mx-2 opacity-30">|</span>}{edu.location}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-400 font-bold uppercase tracking-tighter">Scholastic Standing: <span className="text-neutral-700">{edu.gpa}</span></div>
                                    )}
                                    {edu.achievements && (
                                        <div className="text-[13px] text-neutral-500 italic mt-3 leading-relaxed border-t border-neutral-100 pt-3">{edu.achievements}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Career History" />
                        <div className="space-y-10">
                            {workExperience.map((job, i) => (
                                <div key={i} className="break-inside-avoid border-l-4 border-neutral-50 pl-8">
                                    {/* Job Title — prominent */}
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className={cn('text-[17px] font-bold font-serif', accentColor)}>
                                            {job.jobTitle}
                                        </h3>
                                        <span className="text-[11px] font-black text-neutral-400 shrink-0 ml-4 font-sans uppercase tracking-widest tabular-nums">
                                            {job.startDate}{job.startDate ? ' – ' : ''}{job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    {/* Company */}
                                    <div className="text-[14px] font-bold text-neutral-500 uppercase tracking-wider mb-4">
                                        {job.companyName}{job.location && <span className="mx-2 opacity-30">|</span>}{job.location}
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[14px] text-neutral-600 mb-4 leading-[1.8] text-justify font-serif italic opacity-80">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-2.5">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 flex gap-4 leading-[1.8]">
                                                    <span className={cn("shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full", bgColor, "opacity-30")} />
                                                    <span className="font-medium font-serif">{ach.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications */}
                {publications && publications.length > 0 && (
                    <section>
                        <SectionHeader title="Scholarly Publications" />
                        <div className="space-y-4">
                            {publications.map((pub, i) => (
                                <div key={i} className="text-[14px] text-neutral-700 break-inside-avoid border-l-4 border-neutral-50 pl-8 leading-relaxed">
                                    <span className="italic font-serif">&quot;{pub.title}&quot;</span>
                                    {pub.platformOrPublisher && <span className="font-bold text-neutral-900 block mt-1"> — {pub.platformOrPublisher}</span>}
                                    {pub.publicationYear && <span className="text-[11px] font-black text-neutral-400 uppercase tracking-widest block mt-0.5">{pub.publicationYear}</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Core Expertise" />
                        <div className="border-l-4 border-neutral-50 pl-8">
                            {(() => {
                                const grouped = skills.reduce((acc, skill) => {
                                    const type = skill.skillType || 'professional'
                                    if (!acc[type]) acc[type] = []
                                    acc[type].push(skill)
                                    return acc
                                }, {} as Record<string, typeof skills>)

                                const labels: Record<string, string> = {
                                    technical: 'Technical Proficiency',
                                    professional: 'Executive Competencies',
                                    tool: 'Analytical Tools',
                                    industry: 'Domain Expertise'
                                }

                                return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                        {Object.entries(grouped).map(([type, list]) => (
                                            <div key={type} className="flex flex-col gap-1.5">
                                                <span className={cn('text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400')}>{labels[type] || type}</span>
                                                <span className="text-[14px] font-bold text-neutral-700 font-serif leading-relaxed">{list.map(s => s.skillName).join('  ·  ')}</span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            })()}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Research & Initiatives" />
                        <div className="space-y-8">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid border-l-4 border-neutral-50 pl-8">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className={cn('text-[15px] font-bold font-serif', accentColor)}>{proj.projectName}</h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[11px] font-black text-neutral-400 shrink-0 ml-4 font-sans uppercase tracking-widest">
                                                {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && <div className="text-[12px] text-neutral-400 font-bold uppercase tracking-widest mb-3">{proj.role}</div>}
                                    {proj.description && (
                                        <p className="text-[14px] text-neutral-700 leading-[1.8] text-justify font-serif">{proj.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <SectionHeader title="Certifications & Licensure" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 border-l-4 border-neutral-50 pl-8">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex flex-col gap-0.5">
                                    <div className="text-[14px] font-bold text-neutral-900 leading-tight">
                                        {cert.certificationName}
                                    </div>
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                        {cert.issuingOrganization} {cert.issueYear && `· ${cert.issueYear}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Honors */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Honors & Awards" />
                        <div className="space-y-2">
                            {achievements.map((ach, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <div className="text-[12px]">
                                            <span className="font-bold text-neutral-900">{ach.achievementTitle}</span>
                                            {ach.issuingBody && <span className="text-neutral-600"> — {ach.issuingBody}</span>}
                                        </div>
                                        {ach.year && <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">{ach.year}</span>}
                                    </div>
                                    {ach.description && (
                                        <p className="text-[12px] text-neutral-600 mt-0.5 leading-[1.6]">{ach.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer / Community Service */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Service & Engagement" />
                        <div className="space-y-3">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-neutral-900">{vol.roleTitle}</h3>
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">
                                            {vol.startDate}{vol.endDate ? ` – ${vol.endDate}` : vol.startDate ? ' – Present' : ''}
                                        </span>
                                    </div>
                                    <div className="text-[12px] text-neutral-600 italic">{vol.organizationName}</div>
                                    {vol.contributions && (
                                        <p className="text-[12px] text-neutral-700 mt-0.5 leading-[1.6]">{vol.contributions}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Affiliations */}
                {professionalAffiliations && professionalAffiliations.length > 0 && (
                    <section>
                        <SectionHeader title="Professional Memberships" />
                        <div className="space-y-1.5">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-900">{aff.organizationName}</span>
                                        {aff.roleOrMembership && <span className="text-neutral-600"> — {aff.roleOrMembership}</span>}
                                    </div>
                                    {aff.yearsActive && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">{aff.yearsActive}</span>
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
                        <p className="text-[12px] text-neutral-700 tracking-wide">
                            {languages.map((l, i) => (
                                <span key={i}>
                                    {l.languageName}{l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}
                                    {i < languages.length - 1 ? '  |  ' : ''}
                                </span>
                            ))}
                        </p>
                    </section>
                )}

                {/* Additional Information */}
                {additionalInfo && (additionalInfo.workAuthorization || additionalInfo.securityClearance || additionalInfo.availability || additionalInfo.otherInfo) && (
                    <section>
                        <SectionHeader title="Additional Information" />
                        <div className="space-y-1">
                            {additionalInfo.workAuthorization && (
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">Work Authorization:</span> {additionalInfo.workAuthorization}
                                </div>
                            )}
                            {additionalInfo.securityClearance && (
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">Security Clearance:</span> {additionalInfo.securityClearance}
                                </div>
                            )}
                            {additionalInfo.availability && (
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">Availability:</span> {additionalInfo.availability}
                                </div>
                            )}
                            {additionalInfo.willingToRelocate !== undefined && (
                                <div className="text-[12px] text-neutral-700">
                                    <span className="font-bold">Relocation:</span> {additionalInfo.willingToRelocate ? 'Open to relocation' : 'Not available'}
                                </div>
                            )}
                            {additionalInfo.otherInfo && (
                                <div className="text-[12px] text-neutral-700">{additionalInfo.otherInfo}</div>
                            )}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader title="References" />
                        <div className="space-y-3">
                            {references.map((ref, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="text-[12px] font-bold text-neutral-900">
                                        {ref.referenceName || ref.name}
                                    </div>
                                    <div className="text-[12px] text-neutral-600 italic">
                                        {ref.role || ref.title}{(ref.organization || ref.company) && `, ${ref.organization || ref.company}`}
                                    </div>
                                    {(ref.contactDetails || ref.contactInfo) && (
                                        <div className="text-[11px] text-neutral-500 font-sans">{ref.contactDetails || ref.contactInfo}</div>
                                    )}
                                    {ref.availabilityStatement && (
                                        <div className="text-[11px] text-neutral-400 italic">{ref.availabilityStatement}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.length > 0 && customSections.map((section, si) => (
                    <section key={si}>
                        <SectionHeader title={section.title} />
                        {section.content && (
                            <p className="text-[12px] text-neutral-700 leading-[1.7] text-justify mb-2">{section.content}</p>
                        )}
                        {section.items && section.items.length > 0 && (
                            <ul className="space-y-1 pl-4">
                                {section.items.map((item, ii) => (
                                    <li key={ii} className="text-[12px] text-neutral-700 flex gap-2 leading-[1.6]">
                                        <span className="shrink-0 mt-0.5">•</span>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>

            {/* ═══ FRAME BOTTOM BORDER ═══ */}
            <div className={cn('border-b-4', borderColor)} />
        
                </>
            )}
            </div>
    )
}
