import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSMinimalTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-5 mb-3">
            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-400 mb-2">{title}</h2>
            <div className="h-px w-full bg-neutral-100" />
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed",
            className
        )}>
            {/* Minimal Header — Sophisticated Lightness */}
            <header className="mb-6">
                <h1 className={cn("text-[28px] font-extralight tracking-[-0.05em] leading-none mb-3", accentColor)}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                
                <div className="flex flex-col gap-1">
                    {personalInfo?.professionalTitle && (
                        <div className="text-[13px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-neutral-500 font-bold uppercase tracking-[0.15em] items-center">
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.phone && (
                            <>
                                <span className="text-neutral-200">/</span>
                                <span>{personalInfo.phone}</span>
                            </>
                        )}
                        {(personalInfo?.city || personalInfo?.country) && (
                            <>
                                <span className="text-neutral-200">/</span>
                                <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                            </>
                        )}
                        {personalInfo?.linkedinUrl && (
                            <>
                                <span className="text-neutral-200">/</span>
                                <span className={accentColor}>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                            </>
                        )}
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


            <div>
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <p className="text-[11px] text-neutral-600 leading-relaxed font-medium">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Experience" />
                        <div className="space-y-5">
                            {workExperience.map((job, i) => (
                                <div key={i} className=" group">
                                    <div className="flex justify-between items-start mb-2 gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-[13px] font-black text-neutral-900 tracking-tight leading-tight">{job.jobTitle}</h3>
                                            <div className={cn("text-[12px] font-black uppercase tracking-wider mt-1 opacity-80", accentColor)}>
                                                {job.companyName} <span className="text-neutral-300 font-normal mx-2">|</span> {job.location}
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-black text-neutral-300 uppercase tracking-widest mt-1">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </span>
                                    </div>
                                    
                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-600 mb-2 leading-relaxed font-medium">{job.roleDescription}</p>
                                    )}

                                    {job.achievements && (
                                        <ul className="space-y-2">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[11px] text-neutral-600 flex gap-3 leading-relaxed">
                                                    <span className="text-neutral-200 mt-2.5 font-black shrink-0">—</span>
                                                    <span>{a.achievementText}</span>
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
                                <div key={i} className="">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-[12px] font-black text-neutral-900 uppercase tracking-wider">{proj.projectName}</h3>
                                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{proj.role}</span>
                                    </div>
                                    <p className="text-[11px] text-neutral-600 leading-relaxed font-medium italic">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills — Comma Separated But Bold */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Expertise" />
                        <div className="flex flex-col gap-y-6">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-2">
                                    <div className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.2em]">{type}</div>
                                    <ul className="text-[13px] font-bold text-neutral-700 leading-relaxed flex flex-wrap m-0 p-0 list-none">
                                        {list.map((s, i) => (
                                            <li key={i} className="flex items-center">
                                                {s.skillName}
                                                {i < list.length - 1 && (
                                                    <span className="mx-2 text-neutral-300 font-normal select-none" aria-hidden="true">·</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Education" />
                        <div className="space-y-2">
                            {education.map((edu, i) => (
                                <div key={i} className="">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[12px] font-black text-neutral-900 uppercase tracking-tight leading-tight">{edu.degree}</h3>
                                        <span className="text-[11px] font-black text-neutral-300 uppercase tracking-widest">{edu.endYear}</span>
                                    </div>
                                    <div className="text-[12px] font-bold text-neutral-500 italic opacity-80">{edu.institutionName}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Bottom Row — Certs, Languages, Refs */}
                <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-neutral-50">
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-300 mb-4">Certifications</h2>
                            <div className="space-y-3">
                                {certifications.map((c, i) => (
                                    <div key={i} className=" text-[11.5px] font-bold text-neutral-600 leading-tight">
                                        {c.certificationName}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-300 mb-4">Languages</h2>
                            <div className="space-y-2">
                                {languages.map((l, i) => (
                                    <div key={i} className="text-[11.5px] font-bold text-neutral-600">
                                        {l.languageName} <span className="text-neutral-300 ml-1">[{l.proficiencyLevel}]</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {references && references.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-300 mb-4">References</h2>
                            <div className="space-y-4">
                                {references.map((ref, i) => (
                                    <div key={i} className=" text-[11px] text-neutral-500 font-bold leading-tight">
                                        <div className="text-neutral-800">{ref.referenceName}</div>
                                        <div className="italic font-medium">{ref.role}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        
                </>
            )}
            </div>
    )
}

