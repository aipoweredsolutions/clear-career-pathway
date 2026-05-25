import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSExecutiveTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    // Extract base color for borders
    const borderColorClass = accentColor.replace('text-', 'border-')
    const bgColorClass = accentColor.replace('text-', 'bg-')
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
        customSections
    } = data

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-[14px] font-black uppercase tracking-[0.25em] text-neutral-900 mb-3 flex items-center gap-4">
            {children}
            <div className="h-px flex-1 bg-neutral-100" />
        </h2>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed",
            className
        )}>
            {/* Executive Header — Power Header */}
            <header className={cn("border-b-[4px] pb-5 mb-3", borderColorClass)}>
                <div className="flex flex-col justify-between items-start gap-4">
                    <div className="w-full">
                        <h1 className={cn("text-[40px] font-black tracking-[-0.04em] leading-none mb-3 uppercase break-words", accentColor)}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        {personalInfo?.professionalTitle && (
                            <div className={cn("text-[14px] font-black tracking-[0.15em] uppercase opacity-80", accentColor)}>
                                {personalInfo.professionalTitle}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        )}
                        {personalInfo?.linkedinUrl && <span className={accentColor}>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                    </div>
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


            <div className="space-y-4 pb-6">
                {/* Strategic Profile */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionTitle>Executive Mandate</SectionTitle>
                        <div className="p-6 bg-neutral-50/50 border-l-[4px] border-neutral-900 rounded-r-xl">
                            <p className="text-[13px] font-medium leading-relaxed text-neutral-700 text-justify">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    </section>
                )}

                {/* Core Competencies — High-Contrast Grid */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionTitle>Strategic Competencies</SectionTitle>
                        <div className="flex flex-col gap-y-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-2">
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{type}</div>
                                    <ul className="text-[13px] font-bold text-neutral-800 leading-relaxed italic flex flex-wrap m-0 p-0 list-none">
                                        {list.map((s, i) => (
                                            <li key={i} className="flex items-center">
                                                {s.skillName}
                                                {i < list.length - 1 && (
                                                    <span className="mx-2 text-neutral-300 font-normal select-none" aria-hidden="true">•</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Tenure — Refined Timeline */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionTitle>Career Trajectory</SectionTitle>
                        <div className="space-y-5">
                            {workExperience.map((job, i) => (
                                <div key={i} className=" relative pl-6 border-l-[2px] border-neutral-100">
                                    <div className={cn("absolute top-1.5 -left-[7px] w-3 h-3 rounded-full border-[2px] border-white ring-2 ring-neutral-100", bgColorClass)} />
                                    
                                    <div className="flex flex-col justify-between items-start mb-3 gap-1">
                                        <div>
                                            <h3 className="text-[13.5px] font-black text-neutral-900 leading-tight mb-1">{job.jobTitle}</h3>
                                            <div className={cn("text-[11.5px] font-black uppercase tracking-wider", accentColor)}>
                                                {job.companyName} <span className="text-neutral-300 font-normal mx-2">|</span> {job.location}
                                            </div>
                                        </div>
                                        <span className="text-[12px] font-black text-neutral-400 uppercase tracking-[0.1em] bg-neutral-50 px-3 py-1 rounded">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[13px] text-neutral-600 mb-3 leading-relaxed font-medium">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[12.5px] text-neutral-700 flex gap-3 leading-relaxed group">
                                                    <span className={cn("mt-2.5 w-1.5 h-1.5 rounded-full shrink-0", bgColorClass, "opacity-30 group-hover:opacity-100 transition-opacity")} />
                                                    <span className="font-medium">{a.achievementText}</span>
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
                        <SectionTitle>Key Strategic Initiatives</SectionTitle>
                        <div className="flex flex-col gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className=" bg-neutral-50 p-5 rounded-xl border-[1.5px] border-neutral-100 group hover:border-neutral-200 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-[13px] font-black uppercase tracking-wider">{proj.projectName}</h3>
                                        <div className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white rounded border border-neutral-200", accentColor)}>{proj.role}</div>
                                    </div>
                                    <p className="text-[13px] text-neutral-600 leading-relaxed font-medium">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education & Other Credentials */}
                <div className="flex flex-col gap-5 pt-5 border-t-[3px] border-neutral-100">
                    {education && education.length > 0 && (
                        <section>
                            <SectionTitle>Academic Background</SectionTitle>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i} className="">
                                        <div className="text-[13px] font-black text-neutral-900 uppercase leading-tight mb-1">{edu.degree}</div>
                                        <div className="text-[13px] font-bold text-neutral-500 italic mb-1">{edu.institutionName}</div>
                                        <div className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">{edu.endYear}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="space-y-6">
                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <SectionTitle>Certifications</SectionTitle>
                                <div className="space-y-4">
                                    {certifications.map((c, i) => (
                                        <div key={i} className=" flex flex-col gap-0.5">
                                            <div className="text-[13px] font-bold text-neutral-800">{c.certificationName}</div>
                                            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{c.issuingOrganization}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section>
                                <SectionTitle>Languages</SectionTitle>
                                <ul className="text-[13px] font-bold text-neutral-800 leading-relaxed italic flex flex-wrap m-0 p-0 list-none">
                                    {languages.map((l, i) => (
                                        <li key={i} className="flex items-center">
                                            {l.languageName} <span className={cn("text-[10px] uppercase font-black ml-1 mr-1 opacity-50", accentColor)}>[{l.proficiencyLevel}]</span>
                                            {i < languages.length - 1 && (
                                                <span className="mx-2 text-neutral-300 font-normal select-none" aria-hidden="true">•</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <section key={i} className="">
                        <SectionTitle>{s.title}</SectionTitle>
                        {s.content && <p className="text-[14px] text-neutral-700 leading-relaxed font-medium mb-4">{s.content}</p>}
                        {s.items && (
                            <ul className="flex flex-col gap-3">
                                {s.items.map((item, j) => (
                                    <li key={j} className="text-[12px] text-neutral-600 font-bold uppercase tracking-tight flex items-center gap-3">
                                        <div className={cn("w-1.5 h-1.5 rounded-full", bgColorClass)} />
                                        {item.text}
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

