import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSGoldStandardTemplate({ data, className, accentColor = 'text-amber-900' }: TemplateProps) {
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
        references,
        customSections
    } = data

    const borderColorClass = accentColor.replace('text-', 'border-')

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-5 mb-3">
            <h2 className={cn(
                'text-[13px] font-black uppercase tracking-[0.4em] mb-2',
                accentColor
            )}>
                {title}
            </h2>
            <div className="flex flex-col gap-[2px]">
                <div className={cn('h-[2px] w-full', borderColorClass.replace('border-', 'bg-'))} />
                <div className={cn('h-[0.5px] w-full opacity-30', borderColorClass.replace('border-', 'bg-'))} />
            </div>
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div
            className={cn(
                'w-full bg-white text-neutral-900 leading-snug p-10',
                className
            )}
            style={{ fontFamily: "'Lora', 'PT Serif', serif" }}
        >
            {/* ── STATELY HEADER ── */}
            <header className="text-center mb-6 pt-2">
                <h1 
                    className={cn(
                        'text-[32px] font-medium uppercase tracking-[0.15em] leading-none mb-4 whitespace-nowrap',
                        accentColor
                    )}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {personalInfo?.fullName || 'YOUR NAME'}
                </h1>

                {personalInfo?.professionalTitle && (
                    <p className="text-[11px] text-neutral-400 font-black uppercase tracking-[0.3em] mb-4">
                        {personalInfo.professionalTitle}
                    </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-[10px] text-neutral-500 font-bold uppercase tracking-[0.15em] border-y border-neutral-100 py-4 max-w-4xl mx-auto">
                    {contactParts.map((part, i) => (
                        <React.Fragment key={i}>
                            <span className="whitespace-nowrap">{part}</span>
                            {i < contactParts.length - 1 && (
                                <span className={cn("text-[16px] font-light opacity-30", accentColor)}>|</span>
                            )}
                        </React.Fragment>
                    ))}
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


            {/* ── BODY ── */}
            <div>

                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Professional Summary" />
                        <p className="text-[12px] text-neutral-700 leading-relaxed font-medium px-4">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-5 px-4">
                            {workExperience.map((job, i) => (
                                <div key={i} className="break-inside-avoid group">
                                    <div className="flex justify-between items-start mb-3 gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-[13px] font-bold text-neutral-900 tracking-tight leading-tight">
                                                {job.companyName}
                                                {job.location && (
                                                    <span className="font-normal text-neutral-400 ml-4 italic">{job.location}</span>
                                                )}
                                            </h3>
                                            <div className={cn("text-[11px] font-bold italic mt-1 opacity-80", accentColor)}>
                                                {job.jobTitle}
                                            </div>
                                        </div>
                                        <span className="text-[12px] font-black text-neutral-300 uppercase tracking-widest mt-1">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-600 mb-3 leading-relaxed font-medium">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[11px] text-neutral-700 flex gap-4 leading-relaxed">
                                                    <span className={cn("shrink-0 w-1.5 h-1.5 rounded-full mt-2.5", borderColorClass.replace('border-', 'bg-'), "opacity-20")} />
                                                    <span className="font-medium">{ach.achievementText}</span>
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
                        <SectionHeader title="Key Projects" />
                        <div className="space-y-5 px-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-[13px] font-bold text-neutral-900 tracking-tight">
                                            {proj.projectName}
                                            {proj.role && <span className="font-normal text-neutral-400 ml-4 italic">{proj.role}</span>}
                                        </h3>
                                        <span className="text-[12px] font-black text-neutral-300 uppercase tracking-widest">
                                            {proj.startDate} {proj.endDate && `— ${proj.endDate}`}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-neutral-600 leading-relaxed font-medium mb-2">
                                        {proj.description}
                                    </p>
                                    {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                            Technologies: {proj.toolsUsed.join(' • ')}
                                        </div>
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
                        <div className="space-y-4 px-4">
                            {education.map((edu, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-[13px] font-bold text-neutral-900 tracking-tight">
                                            {edu.degree}{edu.major && ` in ${edu.major}`}
                                        </h3>
                                        <span className="text-[12px] font-black text-neutral-300 uppercase tracking-widest">
                                            {edu.endYear || edu.startYear}
                                        </span>
                                    </div>
                                    <div className="text-[11px] font-bold text-neutral-500 italic opacity-80">
                                        {edu.institutionName}
                                        {edu.location && <span className="font-normal mx-2 opacity-50">/</span>}
                                        {edu.location}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-400 mt-2 font-black uppercase tracking-widest">Cumulative GPA: {edu.gpa}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Expertise" />
                        <div className="flex flex-col gap-y-4 px-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="break-inside-avoid flex flex-col gap-2">
                                    <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">{type}</div>
                                    <p className="text-[11px] font-bold text-neutral-800 leading-relaxed">
                                        {list.map(s => s.skillName).join('  •  ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications & Publications */}
                {(certifications?.length || publications?.length) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 mt-6">
                        {certifications && certifications.length > 0 && (
                            <section>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">Certifications</h2>
                                <div className="space-y-3">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="break-inside-avoid">
                                            <div className="text-[12px] font-bold text-neutral-800 leading-tight">{cert.certificationName}</div>
                                            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1">
                                                {cert.issuingOrganization} {cert.issueYear && `• ${cert.issueYear}`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {publications && publications.length > 0 && (
                            <section>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">Publications</h2>
                                <div className="space-y-3">
                                    {publications.map((pub, i) => (
                                        <div key={i} className="break-inside-avoid">
                                            <div className="text-[12px] font-bold text-neutral-800 leading-tight">{pub.title}</div>
                                            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1">
                                                {pub.platformOrPublisher} {pub.publicationYear && `• ${pub.publicationYear}`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : null}

                {/* Languages & Volunteer */}
                {(languages?.length || volunteerExperience?.length) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 mt-10">
                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">Languages</h2>
                                <div className="space-y-2">
                                    {languages.map((l, i) => (
                                        <div key={i} className="break-inside-avoid text-[12px] font-bold text-neutral-800">
                                            {l.languageName} <span className="text-neutral-300 mx-2 italic font-medium">[{l.proficiencyLevel}]</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {volunteerExperience && volunteerExperience.length > 0 && (
                            <section>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">Volunteer</h2>
                                <div className="space-y-3">
                                    {volunteerExperience.map((vol, i) => (
                                        <div key={i} className="break-inside-avoid">
                                            <div className="text-[12px] font-bold text-neutral-800 leading-tight">{vol.roleTitle}</div>
                                            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1">
                                                {vol.organizationName}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : null}

                {/* Affiliations & References */}
                {(professionalAffiliations?.length || references?.length) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 mt-10 border-t border-neutral-50 pt-8">
                        {professionalAffiliations && professionalAffiliations.length > 0 && (
                            <section>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">Affiliations</h2>
                                <div className="space-y-3">
                                    {professionalAffiliations.map((aff, i) => (
                                        <div key={i} className="break-inside-avoid">
                                            <div className="text-[12px] font-bold text-neutral-800 leading-tight">{aff.organizationName}</div>
                                            <div className="text-[10px] italic opacity-60 mt-1">{aff.roleOrMembership}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {references && references.length > 0 && (
                            <section>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">References</h2>
                                <div className="space-y-3">
                                    {references.map((ref, i) => (
                                        <div key={i} className="break-inside-avoid">
                                            <div className="text-[12px] font-bold text-neutral-800 leading-tight">{ref.referenceName || ref.name}</div>
                                            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1">
                                                {ref.organization || ref.company} • {ref.role || ref.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : null}

                {/* Custom Sections */}
                {customSections && customSections.length > 0 && (
                    <div className="px-4 mt-10 space-y-8">
                        {customSections.map((section, i) => (
                            <section key={i} className="break-inside-avoid">
                                <SectionHeader title={section.title} />
                                <div className="text-[12px] text-neutral-700 leading-relaxed font-medium">
                                    {section.content}
                                    {section.items && section.items.length > 0 && (
                                        <ul className="mt-3 space-y-2">
                                            {section.items.map((item, j) => (
                                                <li key={j} className="flex gap-4">
                                                    <span className={cn("shrink-0 w-1.5 h-1.5 rounded-full mt-2", borderColorClass.replace('border-', 'bg-'), "opacity-20")} />
                                                    <span>{item.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        
                </>
            )}
            </div>
    )
}
