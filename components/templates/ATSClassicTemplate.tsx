import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Classic Template - Elite Overhaul
 * 
 * A high-fidelity, premium version of the traditional ATS-friendly resume.
 * Focuses on superior typography (Serif), rigorous visual hierarchy, 
 * and sophisticated use of white space.
 */
export function ATSClassicTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    // Extract base color for borders/accents
    const borderColorClass = accentColor.replace('text-', 'border-')

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="relative mb-4 mt-8 first:mt-0 group ">
            <h2 className={cn(
                "text-[13px] font-black uppercase tracking-[0.2em] mb-1.5",
                accentColor
            )}>
                {title}
            </h2>
            <div className={cn("h-[1.5px] w-full bg-neutral-900/10", borderColorClass.replace('border-', 'bg-').split(' ')[0])} />
        </div>
    )

    return (
        <div 
            className={cn(
                "w-full bg-white text-neutral-900 font-serif leading-relaxed p-12 md:p-16",
                className
            )}
            style={{ fontFamily: "'Lora', 'PT Serif', 'Georgia', serif" }}
        >
            {/* ── SOPHISTICATED HEADER ── */}
            <header className="text-center mb-10">
                <h1 className={cn("text-[42px] font-black tracking-[-0.02em] leading-[1.1] mb-3", accentColor)}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                
                {personalInfo?.professionalTitle && (
                    <div className="text-[14px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-6">
                        {personalInfo.professionalTitle}
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[11px] text-neutral-500 font-bold uppercase tracking-[0.1em] border-y border-neutral-50 py-4">
                    {personalInfo?.email && <span className="hover:text-neutral-900 transition-colors">{personalInfo.email}</span>}
                    {personalInfo?.phone && (
                        <>
                            <div className="w-1 h-1 rounded-full bg-neutral-200 shrink-0" />
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <>
                            <div className="w-1 h-1 rounded-full bg-neutral-200 shrink-0" />
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <div className="w-1 h-1 rounded-full bg-neutral-200 shrink-0" />
                            <span className="text-neutral-400">LinkedIn</span>
                        </>
                    )}
                </div>
            </header>

            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-2xl mx-auto">
                    <div className="mb-10 space-y-1 text-[14px] text-neutral-800">
                        <p className="font-bold text-neutral-300 mb-8">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-black text-neutral-900">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-500 font-medium italic">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-bold text-neutral-700">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="mb-8">
                        <p className="text-[14px] font-bold text-neutral-900">
                            Dear {data.coverLetter?.recipientName || 'Hiring Manager'},
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-12">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[14px] leading-[1.8] mb-6 text-justify text-neutral-800 font-serif">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[14px]">Your cover letter will appear here...</p>}
                    </div>

                    <div className="space-y-6 text-neutral-800 pt-8 border-t border-neutral-50">
                        <div>
                            <p className="text-[14px] mb-2 font-medium">Sincerely,</p>
                            <p className={cn("text-[20px] font-black tracking-tight", accentColor)}>{data.personalInfo?.fullName}</p>
                        </div>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="space-y-8">
                    <SectionHeader title="Professional References" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {data.references?.map((ref, i) => (
                            <div key={i} className=" flex flex-col gap-2 p-6 bg-neutral-50/50 rounded-sm border border-neutral-100">
                                <span className="font-black text-neutral-900 text-[15px]">{ref.referenceName || ref.name}</span>
                                <div className="text-[13px] text-neutral-500 font-bold uppercase tracking-wider italic">
                                    {ref.role || ref.title}
                                    {(ref.organization || ref.company) && <span className="mx-2 opacity-30 font-normal">/</span>}
                                    {ref.organization || ref.company}
                                </div>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <div className="text-[12px] text-neutral-600 font-medium mt-2 pt-2 border-t border-neutral-200">
                                        {ref.contactDetails || ref.contactInfo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-10">
                    {/* Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Executive Profile" />
                            <p className="text-[13.5px] text-neutral-700 leading-[1.8] text-justify font-medium">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Professional Experience" />
                            <div className="space-y-10 mt-6">
                                {workExperience.map((job, i) => (
                                    <div key={i} className=" group">
                                        <div className="flex justify-between items-start mb-3 gap-6">
                                            <div className="flex-1">
                                                <h3 className="text-[16px] font-black text-neutral-900 tracking-tight leading-none mb-1.5 group-hover:translate-x-1 transition-transform duration-300">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className={cn("text-[13px] font-bold italic opacity-80 uppercase tracking-wider", accentColor)}>
                                                    {job.companyName}
                                                    {job.location && <span className="text-neutral-300 font-normal mx-3 not-italic">|</span>}
                                                    {job.location && <span className="text-neutral-500 not-italic">{job.location}</span>}
                                                </div>
                                            </div>
                                            <div className="text-[12px] font-black text-neutral-300 uppercase tracking-[0.15em] shrink-0 mt-1 tabular-nums">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </div>
                                        </div>
                                        
                                        {job.roleDescription && (
                                            <p className="text-[13px] text-neutral-600 mb-4 leading-relaxed font-serif italic opacity-90 pl-6 border-l-2 border-neutral-50">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-2.5 pl-6">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[13.5px] text-neutral-700 leading-relaxed flex gap-4">
                                                        <span className="text-neutral-300 mt-2 shrink-0 font-bold text-lg leading-none">·</span>
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

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Education" />
                            <div className="space-y-6 mt-6">
                                {education.map((edu, i) => (
                                    <div key={i} className="">
                                        <div className="flex justify-between items-baseline mb-1.5 gap-6">
                                            <h3 className="text-[15px] font-black text-neutral-900 tracking-tight leading-none">
                                                {edu.degree}{edu.major ? `, ${edu.major}` : ''}
                                            </h3>
                                            <span className="text-[12px] font-black text-neutral-300 uppercase tracking-widest shrink-0 tabular-nums">
                                                {edu.endYear}
                                            </span>
                                        </div>
                                        <div className="text-[13px] font-bold text-neutral-400 italic">
                                            {edu.institutionName}
                                            {edu.location && <span className="mx-3 opacity-30 font-normal not-italic">|</span>}
                                            {edu.location && <span className="font-normal not-italic text-neutral-500">{edu.location}</span>}
                                        </div>
                                        {(edu.gpa || edu.achievements) && (
                                            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[11px] font-bold text-neutral-400 uppercase tracking-tight">
                                                {edu.gpa && <div>GPA: <span className="text-neutral-600">{edu.gpa}</span></div>}
                                                {edu.achievements && <div className="italic font-serif normal-case tracking-normal opacity-70">{"\""}{edu.achievements}{"\""}</div>}
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
                            <SectionHeader title="Selected Projects" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-6">
                                {projects.map((proj, i) => (
                                    <div key={i} className=" group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-[14px] font-black text-neutral-900 tracking-tight uppercase group-hover:text-neutral-600 transition-colors">
                                                {proj.projectName}
                                            </h3>
                                            <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">{proj.role}</span>
                                        </div>
                                        <p className="text-[12px] text-neutral-600 leading-relaxed font-medium mb-3 italic">
                                            {proj.description}
                                        </p>
                                        {proj.toolsUsed && proj.toolsUsed.length > 0 && (
                                            <div className="text-[9px] text-neutral-300 font-bold uppercase tracking-[0.2em] flex flex-wrap gap-2">
                                                {proj.toolsUsed.map((t, ti) => (
                                                    <span key={ti} className="border-b border-neutral-100 pb-0.5">{t}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <SectionHeader title="Expertise & Core Competencies" />
                            <div className="mt-6 space-y-6">
                                {Object.entries(skills.reduce((acc, skill) => {
                                    const type = skill.skillType || 'professional'
                                    if (!acc[type]) acc[type] = []
                                    acc[type].push(skill)
                                    return acc
                                }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                    <div key={type} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 border-b border-neutral-50 pb-4 last:border-0 group">
                                        <span className={cn("text-[10px] font-black uppercase text-neutral-300 tracking-[0.3em] w-32 shrink-0 md:pt-1 group-hover:text-neutral-500 transition-colors", accentColor)}>
                                            {type}:
                                        </span>
                                        <div className="text-[13.5px] text-neutral-800 font-bold leading-relaxed flex flex-wrap gap-x-4 gap-y-1">
                                            {list.map((s, i) => (
                                                <span key={i} className="flex items-center gap-4">
                                                    {s.skillName}
                                                    {i < list.length - 1 && <span className="w-1 h-1 rounded-full bg-neutral-200" />}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Additional */}
                    {(certifications?.length || achievements?.length || languages?.length) ? (
                        <section>
                            <SectionHeader title="Credentials & Honors" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-6">
                                {certifications && certifications.map((cert, i) => (
                                    <div key={`cert-${i}`} className="text-[13px] border-l-2 border-neutral-50 pl-4">
                                        <span className="font-black text-neutral-900 block leading-tight mb-1">{cert.certificationName}</span>
                                        <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">{cert.issuingOrganization} {cert.issueYear && `· ${cert.issueYear}`}</span>
                                    </div>
                                ))}
                                {achievements && achievements.map((ach, i) => (
                                    <div key={`ach-${i}`} className="text-[13px] border-l-2 border-neutral-50 pl-4">
                                        <span className="font-black text-neutral-900 block leading-tight mb-1">{ach.achievementTitle}</span>
                                        <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">{ach.issuingBody} {ach.year && `· ${ach.year}`}</span>
                                    </div>
                                ))}
                                {languages && (
                                    <div className="col-span-full pt-4">
                                        <div className="text-[10px] font-black uppercase text-neutral-300 tracking-[0.3em] mb-4">Linguistic Proficiencies:</div>
                                        <div className="flex flex-wrap gap-8">
                                            {languages.map((l, i) => (
                                                <div key={i} className="text-[13px] font-serif">
                                                    <span className="font-black text-neutral-900 mr-2">{l.languageName}</span>
                                                    <span className="text-neutral-400 italic">— {l.proficiencyLevel}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    ) : null}

                    {/* Custom Sections */}
                    {customSections && customSections.map((section, i) => (
                        <section key={i} className="">
                            <SectionHeader title={section.title} />
                            <div className="px-6">
                                {section.content && <p className="text-[13px] text-neutral-700 leading-relaxed mb-4">{section.content}</p>}
                                {section.items && (
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                        {section.items.map((item, j) => (
                                            <li key={j} className="text-[13px] text-neutral-700 flex gap-3">
                                                <span className="text-neutral-300 font-bold">•</span>
                                                <span>{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    ))}

                    {/* References */}
                    {references && references.length > 0 && (
                        <section>
                            <SectionHeader title="References" />
                            <div className="mt-4">
                                <p className="text-[13px] text-neutral-400 font-bold uppercase tracking-widest italic">Professional references available upon request.</p>
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}
