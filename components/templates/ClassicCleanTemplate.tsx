import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * Classic Clean Template - High-Fidelity Minimalist Overhaul
 * 
 * A template that proves 'Minimal' doesn't mean 'Simple'. 
 * Focuses on extreme typographic precision, deliberate white space, 
 * and subtle, high-end design accents.
 */
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

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-10 mb-5 break-inside-avoid">
            <div className="flex items-center gap-6">
                <h2 className={cn('text-[11px] font-black uppercase tracking-[0.4em] shrink-0', accentColor)}>
                    {title}
                </h2>
                <div className="h-[0.5px] flex-1 bg-neutral-200" />
            </div>
        </div>
    )

    const contactParts = [
        personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', '),
        personalInfo?.phone,
        personalInfo?.email,
        personalInfo?.linkedinUrl,
    ].filter(Boolean)

    return (
        <div
            className={cn(
                'w-full bg-white text-neutral-900 font-serif leading-relaxed p-12 md:p-20',
                className
            )}
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
            {/* ── MINIMALIST HEADER ── */}
            <header className="text-center mb-16">
                <h1 className="text-[32px] font-black tracking-[-0.02em] text-neutral-900 leading-none mb-4">
                    {personalInfo?.fullName || 'Untitled'}
                </h1>
                
                {personalInfo?.professionalTitle && (
                    <p className={cn("text-[12px] font-bold uppercase tracking-[0.3em] mb-8 opacity-40", accentColor)}>
                        {personalInfo.professionalTitle}
                    </p>
                )}

                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-[11px] text-neutral-400 font-bold uppercase tracking-widest">
                    {contactParts.map((part, i) => (
                        <span key={i} className="flex items-center gap-8">
                            {part}
                            {i < contactParts.length - 1 && (
                                <div className="w-1 h-1 rounded-full bg-neutral-100 shrink-0" />
                            )}
                        </span>
                    ))}
                </div>
            </header>

            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-2xl mx-auto font-serif">
                    <div className="mb-12 space-y-1 text-[14px] text-neutral-800">
                        <p className="font-bold text-neutral-200 mb-8 tracking-widest uppercase text-[10px]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-black text-neutral-900">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-500 font-medium italic">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-bold text-neutral-700">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="mb-10">
                        <p className="text-[15px] font-bold text-neutral-900 italic">
                            To {data.coverLetter?.recipientName || 'the Hiring Team'},
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-16">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[15px] leading-[1.8] mb-6 text-justify text-neutral-700">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[14px]">Your cover letter will appear here...</p>}
                    </div>

                    <div className="space-y-6 text-neutral-800 pt-10 border-t border-neutral-50">
                        <div>
                            <p className="text-[14px] mb-2 font-medium opacity-50">Warmly,</p>
                            <p className={cn("text-[24px] font-black tracking-tighter", accentColor)}>{data.personalInfo?.fullName}</p>
                        </div>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="space-y-10">
                    <SectionHeader title="Professional References" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 px-4">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="break-inside-avoid flex flex-col gap-2 group">
                                <span className="font-black text-neutral-900 text-[16px] group-hover:text-neutral-500 transition-colors">{ref.referenceName || ref.name}</span>
                                <div className="text-[12px] text-neutral-400 font-bold uppercase tracking-widest italic mb-2">
                                    {ref.role || ref.title}
                                    {(ref.organization || ref.company) && <span className="mx-3 opacity-30">/</span>}
                                    {ref.organization || ref.company}
                                </div>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <div className="text-[13px] text-neutral-600 leading-relaxed pt-4 border-t border-neutral-50">
                                        {ref.contactDetails || ref.contactInfo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Overview" />
                            <p className="text-[14px] text-neutral-700 leading-[1.8] text-justify px-4 font-medium italic opacity-90">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Experience" />
                            <div className="flex flex-col gap-12 px-4 mt-2">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="break-inside-avoid group">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-5 gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight leading-none mb-2">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest italic">
                                                    {job.companyName}
                                                    {job.location && <span className="mx-3 opacity-20 not-italic">/</span>}
                                                    {job.location}
                                                </div>
                                            </div>
                                            <div className="text-[11px] font-black text-neutral-200 uppercase tracking-[0.2em] shrink-0 tabular-nums">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </div>
                                        </div>
                                        
                                        {job.roleDescription && (
                                            <p className="text-[14px] text-neutral-600 mb-6 leading-relaxed font-medium italic opacity-80 border-l-4 border-neutral-50 pl-8">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="grid grid-cols-1 gap-y-4 pl-8">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[14px] text-neutral-700 leading-relaxed flex gap-6">
                                                        <span className="text-neutral-100 mt-2 shrink-0 font-bold text-xl leading-none">·</span>
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
                            <SectionHeader title="Projects" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 px-4">
                                {projects.map((proj, i) => (
                                    <div key={i} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline mb-3">
                                            <h3 className="text-[15px] font-black text-neutral-900 tracking-tight uppercase">
                                                {proj.projectName}
                                            </h3>
                                        </div>
                                        {proj.role && (
                                            <div className="text-[11px] text-neutral-300 font-black uppercase tracking-widest mb-3 italic">
                                                {proj.role}
                                            </div>
                                        )}
                                        {proj.description && (
                                            <p className="text-[13px] text-neutral-600 leading-relaxed font-medium italic opacity-80 mb-4">
                                                {proj.description}
                                            </p>
                                        )}
                                        {proj.toolsUsed && (
                                            <div className="flex flex-wrap gap-2 text-[9px] font-bold text-neutral-200 uppercase tracking-widest">
                                                {proj.toolsUsed.map((t, ti) => (
                                                    <span key={ti}>{t}</span>
                                                ))}
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
                            <div className="flex flex-col gap-10 px-4 mt-2">
                                {education.map((edu, i) => (
                                    <div key={i} className="break-inside-avoid flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-[16px] font-black text-neutral-900 tracking-tight leading-none mb-2">
                                                {edu.degree}
                                                {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                                            </h3>
                                            <div className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest italic">
                                                {edu.institutionName}
                                                {edu.location && <span className="mx-3 opacity-20 not-italic">/</span>}
                                                {edu.location}
                                            </div>
                                        </div>
                                        <div className="text-[11px] font-black text-neutral-200 uppercase tracking-[0.2em] shrink-0 tabular-nums">
                                            {edu.endYear || edu.startYear}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Expertise Grid (Skills, Languages, Certs) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mt-16 px-4 border-t border-neutral-50 pt-12">
                        {skills && skills.length > 0 && (
                            <section>
                                <h3 className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30", accentColor)}>Expertise</h3>
                                <div className="flex flex-wrap gap-x-6 gap-y-3">
                                    {skills.map((s, i) => (
                                        <span key={i} className="text-[13px] font-bold text-neutral-700 tracking-tight flex items-center gap-3">
                                            {s.skillName}
                                            {i < skills.length - 1 && <span className="w-1 h-1 rounded-full bg-neutral-100" />}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {languages && languages.length > 0 && (
                            <section>
                                <h3 className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30", accentColor)}>Languages</h3>
                                <div className="space-y-3">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex justify-between items-center text-[13px]">
                                            <span className="font-black text-neutral-900">{l.languageName}</span>
                                            <span className="text-neutral-400 italic font-medium">{l.proficiencyLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {certifications && certifications.length > 0 && (
                            <section>
                                <h3 className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30", accentColor)}>Certifications</h3>
                                <div className="space-y-4">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="text-[13px]">
                                            <span className="font-black text-neutral-900 block leading-tight">{cert.certificationName}</span>
                                            <span className="text-neutral-400 text-[11px] font-bold uppercase tracking-widest">{cert.issuingOrganization}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Custom Sections */}
                    {customSections && customSections.length > 0 && customSections.map((section, si) => (
                        <section key={si} className="break-inside-avoid">
                            <SectionHeader title={section.title} />
                            <div className="px-4">
                                {section.content && <p className="text-[14px] text-neutral-700 leading-relaxed mb-6 font-medium italic">{section.content}</p>}
                                {section.items && (
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                        {section.items.map((item, ii) => (
                                            <li key={ii} className="text-[14px] text-neutral-700 flex gap-4 font-medium">
                                                <span className="text-neutral-100 mt-2 shrink-0 font-bold">•</span>
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
    )
}
