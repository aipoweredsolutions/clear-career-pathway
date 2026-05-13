import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Hospitality Template - Boutique Elite Overhaul
 * 
 * Designed for high-end service professionals (Luxury Hotels, Fine Dining, Estate Management).
 * Combines rigorous ATS structural integrity with a 'boutique branding' aesthetic.
 */
export function ATSHospitalityTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        languages,
        achievements,
        volunteerExperience,
        projects,
        customSections,
        professionalAffiliations
    } = data

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex items-center gap-4 mb-4 mt-8 first:mt-0 ">
            <h2 className={cn("text-[11px] font-black uppercase tracking-[0.4em] shrink-0", accentColor)}>
                {title}
            </h2>
            <div className="flex-1 h-[1px] bg-neutral-100" />
        </div>
    )

    return (
        <div 
            className={cn(
                "w-full bg-white text-neutral-900 font-sans leading-relaxed p-10 md:p-14",
                className
            )}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── BOUTIQUE HEADER ── */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 mb-8 border-b border-neutral-100">
                <div className="flex-1">
                    <h1 className="text-[36px] font-black tracking-[-0.03em] leading-none mb-3 text-neutral-900 whitespace-nowrap truncate">
                        {personalInfo?.fullName || 'Guest Name'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-[13px] font-black uppercase tracking-[0.3em] opacity-50", accentColor)}>
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                </div>

                <div className="shrink-0 text-left md:text-right space-y-1">
                    <div className="text-[12px] font-bold text-neutral-800">
                        {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}
                    </div>
                    {personalInfo?.email && <div className="text-[11px] font-medium text-neutral-400 tracking-tight">{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="text-[11px] font-medium text-neutral-400 tracking-tight">{personalInfo.phone}</div>}
                    {personalInfo?.linkedinUrl && (
                        <div className={cn("text-[10px] font-black uppercase tracking-widest mt-2", accentColor)}>
                            {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                        </div>
                    )}
                </div>
            </header>

            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-2xl mx-auto">
                    <div className="mb-10 space-y-1 text-[14px] text-neutral-800">
                        <p className="font-bold text-neutral-300 mb-8 font-mono">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-black text-neutral-900">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-1">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-black text-neutral-700">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="mb-8">
                        <p className="text-[14px] font-black text-neutral-900 italic">
                            Dear {data.coverLetter?.recipientName || 'General Manager'},
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-12">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[14px] leading-[1.8] mb-6 text-justify text-neutral-700 font-medium">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[13px]">Your cover letter will appear here...</p>}
                    </div>

                    <div className="space-y-4 text-neutral-800 pt-6 border-t border-neutral-50">
                        <div>
                            <p className="text-[13px] mb-1 font-bold uppercase tracking-widest text-neutral-300">Cordially,</p>
                            <p className={cn("text-[18px] font-black tracking-tight", accentColor)}>{data.personalInfo?.fullName}</p>
                        </div>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="space-y-6">
                    <SectionHeader title="Industry References" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.references?.map((ref, i) => (
                            <div key={i} className=" flex flex-col gap-0.5 p-4 bg-neutral-50/50 rounded-lg border border-neutral-100">
                                <span className="font-black text-neutral-900 text-[13px]">{ref.referenceName || ref.name}</span>
                                <div className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-1", accentColor)}>
                                    {ref.role || ref.title}
                                </div>
                                <div className="text-[11px] text-neutral-500 font-medium italic">
                                    {ref.organization || ref.company}
                                </div>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <div className="text-[10px] text-neutral-400 font-bold mt-2 pt-2 border-t border-neutral-100">
                                        {ref.contactDetails || ref.contactInfo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* Professional Profile */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Executive Profile" />
                            <p className="text-[12px] leading-[1.7] text-neutral-700 font-medium text-justify">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Expertise Row (Skills & Languages) */}
                    {(skills?.length || languages?.length) ? (
                        <section>
                            <SectionHeader title="Core Expertise" />
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-3">
                                <div className="md:col-span-8 flex flex-wrap gap-x-4 gap-y-2">
                                    {skills?.map((s, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className={cn("w-1 h-1 rounded-full", accentColor.replace('text-', 'bg-').split(' ')[0])} />
                                            <span className="text-[11px] font-black text-neutral-800 uppercase tracking-tight">{s.skillName}</span>
                                        </div>
                                    ))}
                                </div>
                                {languages && (
                                    <div className="md:col-span-4 pl-0 md:pl-4 border-l-0 md:border-l border-neutral-50 space-y-1">
                                        <div className="text-[8px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-1">Linguistic Skills</div>
                                        {languages.map((l, i) => (
                                            <div key={i} className="flex justify-between items-baseline text-[10px]">
                                                <span className="font-bold text-neutral-700">{l.languageName}</span>
                                                <span className="text-neutral-400 italic text-[9px]">{l.proficiencyLevel}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    ) : null}

                    {/* Professional Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Service History" />
                            <div className="flex flex-col gap-6 mt-3">
                                {workExperience.map((job, i) => (
                                    <div key={i} className=" group">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-2 gap-1">
                                            <div className="flex-1">
                                                <h3 className="text-[14px] font-black text-neutral-900 tracking-tight leading-none mb-1 group-hover:translate-x-0.5 transition-transform duration-300">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className={cn("text-[11px] font-black uppercase tracking-[0.1em] opacity-60", accentColor)}>
                                                    {job.companyName}
                                                    {job.location && <span className="text-neutral-200 font-normal mx-2 opacity-40">/</span>}
                                                    {job.location}
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] shrink-0 tabular-nums">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </div>
                                        </div>

                                        {job.roleDescription && (
                                            <p className="text-[12px] text-neutral-500 mb-2 leading-relaxed font-medium italic opacity-80 border-l-2 border-neutral-50 pl-4">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="grid grid-cols-1 gap-y-2 pl-4">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="text-[12px] text-neutral-700 leading-snug flex gap-3 font-medium">
                                                        <span className={cn("w-1 h-1 rounded-full mt-1.5 shrink-0 opacity-30", accentColor.replace('text-', 'bg-').split(' ')[0])} />
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

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <SectionHeader title="Licensure & Credentials" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                                {certifications.map((cert, i) => (
                                    <div key={i} className=" flex justify-between items-center p-3 bg-neutral-50/30 rounded border border-neutral-50">
                                        <div>
                                            <div className="text-[11px] font-black text-neutral-800 tracking-tight leading-none mb-0.5">{cert.certificationName}</div>
                                            <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">{cert.issuingOrganization}</div>
                                        </div>
                                        {cert.issueYear && <span className="text-[10px] font-black text-neutral-200 tabular-nums">{cert.issueYear}</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Academic Foundation */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Academic Foundation" />
                            <div className="flex flex-col gap-4 mt-3">
                                {education.map((edu, i) => (
                                    <div key={i} className=" flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="text-[12px] font-black text-neutral-900 tracking-tight leading-tight mb-0.5">
                                                {edu.degree}
                                            </div>
                                            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest italic">{edu.institutionName}</div>
                                            {edu.achievements && <div className="text-[9px] text-neutral-300 mt-1 font-medium leading-relaxed">{edu.achievements}</div>}
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className={cn("text-[11px] font-black tabular-nums", accentColor)}>{edu.endYear}</div>
                                            {edu.gpa && <div className="text-[9px] font-bold text-neutral-200 mt-0.5 uppercase tracking-widest">{`GPA ${edu.gpa}`}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Honors & Affiliations */}
                    {(achievements?.length || professionalAffiliations?.length) ? (
                        <section>
                            <SectionHeader title="Honors & Service" />
                            <div className="space-y-2 mt-3">
                                {achievements?.map((ach, i) => (
                                    <div key={i} className="text-[11px] flex items-center gap-3">
                                        <span className="text-[9px] font-black text-neutral-300 shrink-0 w-12 uppercase tracking-widest">{ach.year || 'Award'}</span>
                                        <span className="font-bold text-neutral-800">{ach.achievementTitle}</span>
                                        {ach.issuingBody && <span className="text-neutral-400 italic">— {ach.issuingBody}</span>}
                                    </div>
                                ))}
                                {professionalAffiliations?.map((aff, i) => (
                                    <div key={i} className="text-[11px] flex items-center gap-3">
                                        <span className="text-[9px] font-black text-neutral-300 shrink-0 w-12 uppercase tracking-widest">Member</span>
                                        <span className="font-bold text-neutral-800">{aff.organizationName}</span>
                                        {aff.roleOrMembership && <span className="text-neutral-400 italic">— {aff.roleOrMembership}</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {/* Custom Sections */}
                    {customSections?.map((sec, idx) => (
                        <section key={idx} className="mb-4">
                            <SectionHeader title={sec.title} />
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 pl-4">
                                {sec.items?.map((item, j) => (
                                    <li key={j} className="text-[12px] text-neutral-700 flex gap-3">
                                        <span className="text-neutral-200 mt-1 shrink-0 font-bold">•</span>
                                        <span className="font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            )}
        </div>
    )
}
