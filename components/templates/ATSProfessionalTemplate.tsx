import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

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
        professionalAffiliations
    } = data

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mt-5 mb-3 group">
            <h2 className={cn("text-[12px] font-black uppercase tracking-[0.3em] mb-2", accentColor)}>
                {title}
            </h2>
            <div className="h-[0.5px] w-full bg-neutral-100" />
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.linkedinUrl) contactParts.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-snug p-10",
            className
        )}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* ── CORPORATE HEADER ── */}
            <header className="text-center mb-12">
                <h1 className="text-[40px] font-black tracking-[-0.02em] leading-none mb-4 text-neutral-900">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                {personalInfo?.professionalTitle && (
                    <div className={cn("text-[11px] font-bold uppercase tracking-[0.3em] mb-4 opacity-60", accentColor)}>
                        {personalInfo.professionalTitle}
                    </div>
                )}

                <div className="flex items-center justify-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-neutral-500 font-bold uppercase tracking-[0.1em] border-y border-neutral-50 py-4 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    {contactParts.map((part, i) => (
                        <React.Fragment key={i}>
                            <span>{part}</span>
                            {i < contactParts.length - 1 && <div className="w-1 h-1 rounded-full bg-neutral-200 shrink-0" />}
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


            <div>
                {/* Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Executive Overview" />
                        <p className="text-[12px] leading-relaxed text-neutral-700 font-medium px-4">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Professional History" />
                        <div className="space-y-5 px-4">
                            {workExperience.map((job, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-[16px] font-black text-neutral-900 tracking-tight leading-tight">
                                                {job.jobTitle}
                                            </h3>
                                            <div className="text-[11px] font-bold text-neutral-400 mt-0.5 uppercase tracking-wider">
                                                {job.companyName}
                                                {job.location && <span className="font-normal mx-3 opacity-30">/</span>}
                                                {job.location}
                                            </div>
                                        </div>
                                        <div className="text-[11px] font-black text-neutral-300 uppercase tracking-widest shrink-0 ml-6 mt-1">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[11px] text-neutral-600 mb-2 leading-relaxed font-medium">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 leading-relaxed flex gap-4 font-medium">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-100 mt-2.5 shrink-0" />
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

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Core Competencies" />
                        <div className="flex flex-col gap-y-3 px-4">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'professional';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex flex-col gap-2">
                                    <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-1">
                                        {type}
                                    </div>
                                    <ul className="text-[11px] text-neutral-800 font-bold leading-relaxed flex flex-wrap m-0 p-0 list-none">
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

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader title="Academic Credentials" />
                        <div className="space-y-3 px-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-[16px] font-black text-neutral-900 tracking-tight">
                                            {edu.degree}{edu.major && ` in ${edu.major}`}
                                        </h3>
                                        <span className="text-[11px] font-black text-neutral-300 uppercase tracking-widest shrink-0 ml-6">
                                            {edu.endYear}
                                        </span>
                                    </div>
                                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                                        {edu.institutionName}
                                        {edu.location && <span className="mx-3 opacity-30 font-normal">|</span>}
                                        {edu.location}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] font-black text-neutral-300 uppercase tracking-widest mt-3">
                                            GPA: <span className="text-neutral-700">{edu.gpa}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Additional Details */}
                <div className="flex flex-col gap-5 mt-6 pt-4 border-t border-neutral-50 px-4">
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-6">Certifications</h2>
                            <div className="space-y-4">
                                {certifications.map((c, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="text-[11px] font-bold text-neutral-800 leading-tight">{c.certificationName}</div>
                                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
                                            {c.issuingOrganization} {c.issueYear && `· ${c.issueYear}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-6">Languages</h2>
                            <div className="space-y-4">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between items-center pb-2 border-b border-neutral-50">
                                        <span className="text-[11px] font-bold text-neutral-800 tracking-tight">{l.languageName}</span>
                                        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">{l.proficiencyLevel}</span>
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
