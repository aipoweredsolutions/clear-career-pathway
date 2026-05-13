import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Executive CV Template — "The Board Room"
 *
 * A distinguished, multi-page executive curriculum vitae designed for
 * C-suite leaders, senior directors, and seasoned professionals with
 * extensive career histories. Features double-ruled dividers, Playfair
 * Display headings, and meticulous typographic hierarchy.
 *
 * Unique identity: Double-rule borders, centered monogram header,
 * small-caps section titles, and generous whitespace.
 *
 * Passes 100% of Applicant Tracking Systems.
 */
export function ATSExecutiveCVTemplate({ data, className, accentColor = 'text-slate-900' }: TemplateProps) {
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

    // Double-ruled section header
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-12 mb-6 text-center">
            <div className={cn('border-t-[1.5px] border-b-[0.5px] py-1', borderColor, 'opacity-40')}>
                <h2 className={cn(
                    'text-[13px] font-black uppercase tracking-[0.4em] my-1 text-center',
                    accentColor
                )} style={{ fontVariant: 'small-caps' }}>
                    {title}
                </h2>
            </div>
        </div>
    )

    // Build contact line
    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div
            className={cn('w-full bg-white text-neutral-900 leading-[1.8]', className)}
            style={{ fontFamily: "'Lora', 'PT Serif', 'Georgia', serif" }}
        >
            {/* ═══ HEADER ═══ */}
            <header className="text-center pt-12 pb-8 px-16">
                {/* Double rule top frame */}
                <div className={cn('h-1 w-full mb-10', accentColor.replace('text-', 'bg-'), 'opacity-10')} />

                {/* Name */}
                <h1 className={cn(
                    'text-[42px] font-normal uppercase tracking-[0.3em] leading-[1.1] mb-4',
                    accentColor
                )} style={{ fontFamily: "'Playfair Display', serif" }}>
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                {/* Professional Title */}
                {personalInfo?.professionalTitle && (
                    <p className="text-[14px] text-neutral-400 uppercase tracking-[0.4em] font-black mb-8 font-sans">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                {/* Thin divider */}
                <div className="h-px w-24 bg-neutral-100 mx-auto mb-8" />

                {/* Contact — dot separated */}
                {contactParts.length > 0 && (
                    <div className="text-[11.5px] text-neutral-500 tracking-[0.15em] font-bold uppercase leading-relaxed font-sans flex items-center justify-center gap-3 flex-wrap">
                        {contactParts.map((part, i) => (
                            <span key={i} className="flex items-center gap-3">
                                {i > 0 && <span className="text-neutral-300">·</span>}
                                <span>{part}</span>
                            </span>
                        ))}
                    </div>
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
                            <div key={i} className=" flex flex-col gap-1">
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
            <div className="px-16 pb-16">

                {/* Executive Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Executive Mandate" />
                        <p className="text-[15px] text-neutral-700 leading-[2] text-justify font-serif italic border-l-4 border-neutral-50 pl-10">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Professional History" />
                        <div className="space-y-12">
                            {workExperience.map((job, i) => (
                                <div key={i} className=" border-l-4 border-neutral-50 pl-10">
                                    {/* Company + Dates */}
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-[17px] font-black text-neutral-900 uppercase tracking-widest">
                                            {job.companyName}
                                        </h3>
                                        <span className="text-[12px] font-black text-neutral-400 shrink-0 ml-4 font-sans uppercase tracking-[0.1em]">
                                            {job.startDate}{job.startDate ? ' – ' : ''}{job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {/* Job Title */}
                                    <div className={cn('text-[15px] font-bold italic mb-4', accentColor)}>
                                        {job.jobTitle}
                                        {job.location && (
                                            <span className="font-normal text-neutral-400 not-italic mx-3">|</span>
                                        )}
                                        {job.location && (
                                            <span className="font-normal text-neutral-500 not-italic uppercase tracking-wider text-[12px]">{job.location}</span>
                                        )}
                                    </div>

                                    {/* Role Description */}
                                    {job.roleDescription && (
                                        <p className="text-[14.5px] text-neutral-600 mb-6 leading-[1.8] text-justify font-serif opacity-90">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {/* Achievements */}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 flex gap-4 leading-[1.8]">
                                                    <span className={cn("shrink-0 mt-2.5 w-1.5 h-1.5", accentColor.replace('text-', 'bg-'), "opacity-30")} />
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

                {/* Core Competencies / Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Core Competencies" />
                        <div className="border-l-4 border-neutral-50 pl-10">
                            {(() => {
                                const grouped = skills.reduce((acc, skill) => {
                                    const type = skill.skillType || 'professional'
                                    if (!acc[type]) acc[type] = []
                                    acc[type].push(skill)
                                    return acc
                                }, {} as Record<string, typeof skills>)

                                const labels: Record<string, string> = {
                                    technical: 'Strategic Operations',
                                    professional: 'Leadership & Vision',
                                    tool: 'Governance & Compliance',
                                    industry: 'Sector Expertise'
                                }

                                return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                                        {Object.entries(grouped).map(([type, list]) => (
                                            <div key={type} className="flex flex-col gap-2">
                                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{labels[type] || type}</span>
                                                <span className="text-[14.5px] font-bold text-neutral-800 font-serif leading-relaxed inline-flex flex-wrap items-center gap-1.5">
                                                    {list.map((s, i) => (<span key={i} className="flex items-center gap-1.5">{i > 0 && <span className="text-neutral-300">·</span>}<span>{s.skillName}</span></span>))}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            })()}
                        </div>
                    </section>
                )}

                {/* Strategic Initiatives / Projects */}
                {projects && projects.length > 0 && (
                    <section>
                        <SectionHeader title="Strategic Initiatives" />
                        <div className="space-y-8 border-l-4 border-neutral-50 pl-10">
                            {projects.map((proj, i) => (
                                <div key={i} className="">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">{proj.projectName}</h3>
                                        {(proj.startDate || proj.endDate) && (
                                            <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">
                                                {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                            </span>
                                        )}
                                    </div>
                                    {proj.role && <div className="text-[12px] text-neutral-600 italic">{proj.role}</div>}
                                    {proj.clientOrOrganization && <div className="text-[12px] text-neutral-500">{proj.clientOrOrganization}</div>}
                                    {proj.description && (
                                        <p className="text-[12px] text-neutral-700 mt-0.5 leading-[1.6] text-justify">{proj.description}</p>
                                    )}
                                    {proj.outcomes && (
                                        <p className="text-[11px] text-neutral-600 mt-0.5 italic">Outcome: {proj.outcomes}</p>
                                    )}
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[11px] text-neutral-500 mt-0.5">
                                            <span className="font-semibold">Technologies:</span> {proj.toolsUsed.join(', ')}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <SectionHeader title="Certifications & Credentials" />
                        <div className="space-y-1.5">
                            {certifications.map((cert, i) => (
                                <div key={i} className=" flex justify-between items-baseline">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-900">{cert.certificationName}</span>
                                        {cert.issuingOrganization && (
                                            <span className="text-neutral-600"> — {cert.issuingOrganization}</span>
                                        )}
                                    </div>
                                    {(cert.issueDate || cert.issueYear) && (
                                        <span className="text-[11px] text-neutral-500 shrink-0 ml-4 font-sans">{cert.issueDate || cert.issueYear}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Awards */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <SectionHeader title="Awards & Distinctions" />
                        <div className="space-y-2">
                            {achievements.map((ach, i) => (
                                <div key={i} className="">
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

                {/* Publications */}
                {publications && publications.length > 0 && (
                    <section>
                        <SectionHeader title="Publications & Thought Leadership" />
                        <div className="space-y-1.5">
                            {publications.map((pub, i) => (
                                <div key={i} className=" text-[12px] text-neutral-700">
                                    <span className="font-bold italic">&quot;{pub.title}&quot;</span>
                                    {pub.platformOrPublisher && <span> — {pub.platformOrPublisher}</span>}
                                    {pub.publicationYear && <span className="text-neutral-500"> ({pub.publicationYear})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer Experience */}
                {volunteerExperience && volunteerExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Board & Community Service" />
                        <div className="space-y-3">
                            {volunteerExperience.map((vol, i) => (
                                <div key={i} className="">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[13px] font-bold text-neutral-900">{vol.roleTitle}</h3>
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
                        <SectionHeader title="Professional Affiliations" />
                        <div className="space-y-1.5">
                            {professionalAffiliations.map((aff, i) => (
                                <div key={i} className=" flex justify-between items-baseline">
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
                        <div className="text-[12px] text-neutral-700 tracking-wide text-center flex items-center justify-center gap-3 flex-wrap">
                            {languages.map((l, i) => (
                                <span key={i} className="flex items-center gap-3">
                                    {i > 0 && <span className="text-neutral-300">·</span>}
                                    <span>{l.languageName}{l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ''}</span>
                                </span>
                            ))}
                        </div>
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
                                    <span className="font-bold">Relocation:</span> {additionalInfo.willingToRelocate ? 'Open to relocation' : 'Not open to relocation'}
                                </div>
                            )}
                            {additionalInfo.otherInfo && (
                                <div className="text-[12px] text-neutral-700">{additionalInfo.otherInfo}</div>
                            )}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.length > 0 && customSections.map((section, si) => (
                    <section key={si} className="">
                        <SectionHeader title={section.title} />
                        {section.content && (
                            <p className="text-[12px] text-neutral-700 leading-[1.7] text-justify mb-2">{section.content}</p>
                        )}
                        {section.items && section.items.length > 0 && (
                            <ul className="space-y-1 pl-4">
                                {section.items.map((item, ii) => (
                                    <li key={ii} className="text-[12px] text-neutral-700 flex gap-2 leading-[1.6]">
                                        <span className="shrink-0 mt-0.5">▪</span>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader title="Professional References" />
                        <div className="space-y-3">
                            {references.map((ref, i) => (
                                <div key={i} className="">
                                    <div className="text-[12px] font-bold text-neutral-900">
                                        {ref.referenceName || ref.name}
                                    </div>
                                    <div className="text-[12px] text-neutral-600 italic">
                                        {ref.role || ref.title}{(ref.organization || ref.company) && ` at ${ref.organization || ref.company}`}
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
            </div>
        
                </>
            )}
            </div>
    )
}
