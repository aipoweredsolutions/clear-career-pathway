import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ATS Professional Template - Corporate Elite Overhaul
 * 
 * Designed for mid-to-senior level professionals. 
 * Focuses on 'Authority' through bold structural elements, 
 * sophisticated typographic hierarchy, and clear section demarcation.
 */
export function ATSProfessionalTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-12 mb-6 group break-inside-avoid">
            <div className="flex items-end justify-between border-b-2 border-neutral-900 pb-2">
                <h2 className={cn("text-[14px] font-black uppercase tracking-[0.4em] leading-none", accentColor)}>
                    {title}
                </h2>
                <div className="w-12 h-1 bg-neutral-100" />
            </div>
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed p-12 md:p-16",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── ELITE CORPORATE HEADER ── */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                <div className="flex-1">
                    <h1 className="text-[48px] font-black tracking-[-0.04em] leading-[0.9] mb-4 text-neutral-900">
                        {personalInfo?.fullName || 'Professional Name'}
                    </h1>
                    {personalInfo?.professionalTitle && (
                        <div className={cn("text-[14px] font-black uppercase tracking-[0.3em] opacity-40", accentColor)}>
                            {personalInfo.professionalTitle}
                        </div>
                    )}
                </div>

                <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
                    <div className="text-[12px] font-black text-neutral-800 tracking-tight">
                        {loc}
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                        {personalInfo?.email && <div className="text-[11px] font-bold text-neutral-400 tracking-tight">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div className="text-[11px] font-bold text-neutral-400 tracking-tight">{personalInfo.phone}</div>}
                    </div>
                    {personalInfo?.linkedinUrl && (
                        <div className={cn("text-[10px] font-black uppercase tracking-widest mt-2 border-b-2", accentColor.replace('text-', 'border-').split(' ')[0])}>
                            {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                        </div>
                    )}
                </div>
            </header>

            {/* --- DOCUMENT TYPE OVERRIDES --- */}
            {data.documentType === 'cover_letter' ? (
                <div className="max-w-2xl">
                    <div className="mb-12 space-y-1 text-[14px] text-neutral-800">
                        <p className="font-black text-neutral-200 mb-8 tracking-widest uppercase text-[10px]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        {data.coverLetter?.recipientName && <p className="font-black text-neutral-900">{data.coverLetter.recipientName}</p>}
                        {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-black uppercase tracking-widest text-[11px] mt-1">{data.coverLetter.recipientTitle}</p>}
                        {data.coverLetter?.companyName && <p className="font-black text-neutral-700">{data.coverLetter.companyName}</p>}
                    </div>
                    
                    <div className="mb-10">
                        <p className="text-[15px] font-black text-neutral-900 uppercase tracking-tight">
                            Subject: Application for {personalInfo?.professionalTitle || 'the Position'}
                        </p>
                        <p className="text-[14px] font-bold text-neutral-400 mt-6 italic">
                            Dear {data.coverLetter?.recipientName || 'Hiring Authority'},
                        </p>
                    </div>

                    <div className="prose prose-neutral max-w-none mb-16">
                        {data.coverLetter?.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-[14px] leading-[1.8] mb-6 text-justify text-neutral-700 font-medium">
                                {para}
                            </p>
                        )) || <p className="text-neutral-300 italic text-[14px]">Your cover letter will appear here...</p>}
                    </div>

                    <div className="space-y-6 text-neutral-800 pt-10 border-t-4 border-neutral-900">
                        <div>
                            <p className="text-[14px] mb-2 font-black uppercase tracking-widest text-neutral-300">Respectfully,</p>
                            <p className={cn("text-[28px] font-black tracking-tighter", accentColor)}>{data.personalInfo?.fullName}</p>
                        </div>
                    </div>
                </div>
            ) : data.documentType === 'references' ? (
                <div className="space-y-12">
                    <SectionHeader title="Industry Endorsements" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        {data.references?.map((ref, i) => (
                            <div key={i} className="break-inside-avoid flex flex-col gap-2 p-8 border-l-4 border-neutral-900 bg-neutral-50/30">
                                <span className="font-black text-neutral-900 text-[18px] tracking-tight">{ref.referenceName || ref.name}</span>
                                <div className={cn("text-[12px] font-black uppercase tracking-[0.25em] mb-4 opacity-50", accentColor)}>
                                    {ref.role || ref.title}
                                </div>
                                <div className="text-[14px] text-neutral-600 font-bold italic">
                                    {ref.organization || ref.company}
                                </div>
                                {(ref.contactDetails || ref.contactInfo) && (
                                    <div className="text-[12px] text-neutral-400 font-black mt-6 pt-6 border-t border-neutral-100">
                                        {ref.contactDetails || ref.contactInfo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {/* Executive Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <SectionHeader title="Executive Core" />
                            <p className="text-[14px] leading-[1.8] text-neutral-700 font-medium text-justify border-l-4 border-neutral-100 pl-8 ml-4">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <SectionHeader title="Professional Trajectory" />
                            <div className="flex flex-col gap-16 mt-4">
                                {workExperience.map((job, index) => (
                                    <div key={index} className="break-inside-avoid group">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-6 gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-[20px] font-black text-neutral-900 tracking-tighter leading-none mb-3 group-hover:translate-x-2 transition-transform duration-300">
                                                    {job.jobTitle}
                                                </h3>
                                                <div className={cn("text-[13px] font-black uppercase tracking-[0.25em] opacity-40", accentColor)}>
                                                    {job.companyName}
                                                    {job.location && <span className="text-neutral-200 font-normal mx-4 opacity-40">/</span>}
                                                    {job.location}
                                                </div>
                                            </div>
                                            <div className="text-[12px] font-black text-neutral-300 uppercase tracking-[0.3em] shrink-0 tabular-nums">
                                                {job.startDate} — {job.isCurrent ? 'HEAD' : job.endDate}
                                            </div>
                                        </div>

                                        {job.roleDescription && (
                                            <p className="text-[14px] text-neutral-500 mb-8 leading-relaxed font-bold italic opacity-70 border-l-4 border-neutral-50 pl-8 ml-4">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="grid grid-cols-1 gap-y-6 pl-12">
                                                {job.achievements.map((a, j) => (
                                                    <li key={j} className="text-[14.5px] text-neutral-800 leading-relaxed flex gap-6 font-medium">
                                                        <span className={cn("w-1.5 h-1.5 rounded-full mt-2.5 shrink-0", accentColor.replace('text-', 'bg-').split(' ')[0])} />
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

                    {/* Skill Matrix */}
                    {skills && skills.length > 0 && (
                        <section>
                            <SectionHeader title="Skill Integration" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 px-8">
                                {Object.entries(skills.reduce((acc, s) => {
                                    const t = s.skillType || 'professional';
                                    if (!acc[t]) acc[t] = [];
                                    acc[t].push(s);
                                    return acc;
                                }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                    <div key={type} className="flex flex-col gap-4 group">
                                        <div className={cn("text-[11px] font-black text-neutral-200 uppercase tracking-[0.4em] mb-2 group-hover:text-neutral-400 transition-colors", accentColor)}>
                                            {type}
                                        </div>
                                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                                            {list.map((s, i) => (
                                                <div key={i} className="text-[14px] text-neutral-900 font-black tracking-tight flex items-center gap-4">
                                                    {s.skillName}
                                                    {i < list.length - 1 && <span className="w-1 h-1 rounded-full bg-neutral-100" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Academic Foundation */}
                    {education && education.length > 0 && (
                        <section>
                            <SectionHeader title="Academic Credentials" />
                            <div className="flex flex-col gap-10 px-8">
                                {education.map((edu, index) => (
                                    <div key={index} className="break-inside-avoid flex flex-col md:flex-row justify-between items-start md:items-baseline gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-[18px] font-black text-neutral-900 tracking-tight leading-none mb-3">
                                                {edu.degree}{edu.major && ` in ${edu.major}`}
                                            </h3>
                                            <div className="text-[12px] font-black text-neutral-400 uppercase tracking-[0.2em] italic">
                                                {edu.institutionName}
                                                {edu.location && <span className="mx-4 opacity-30 font-normal not-italic">/</span>}
                                                {edu.location}
                                            </div>
                                        </div>
                                        <div className="text-[12px] font-black text-neutral-200 uppercase tracking-[0.3em] shrink-0 tabular-nums">
                                            {edu.endYear}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Credentials & Service */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mt-20 border-t-4 border-neutral-900 pt-16 px-8">
                        {certifications && certifications.length > 0 && (
                            <section>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-200 mb-8 italic">Verified Licensure</h3>
                                <div className="space-y-6">
                                    {certifications.map((c, i) => (
                                        <div key={i} className="break-inside-avoid flex flex-col gap-1 border-l-4 border-neutral-50 pl-6">
                                            <div className="text-[15px] font-black text-neutral-900 tracking-tight leading-tight">{c.certificationName}</div>
                                            <div className="text-[11px] font-black text-neutral-400 uppercase tracking-widest mt-1">
                                                {c.issuingOrganization} {c.issueYear && `· ${c.issueYear}`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {languages && languages.length > 0 && (
                            <section>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-200 mb-8 italic">Linguistic Mastery</h3>
                                <div className="space-y-4">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex justify-between items-center pb-4 border-b border-neutral-50 last:border-0 group">
                                            <span className="text-[15px] font-black text-neutral-900 tracking-tighter group-hover:translate-x-2 transition-transform">{l.languageName}</span>
                                            <span className={cn("text-[11px] font-black uppercase tracking-[0.2em] opacity-40", accentColor)}>{l.proficiencyLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
