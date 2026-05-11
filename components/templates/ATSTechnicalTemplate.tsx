import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSTechnicalTemplate({ data, className, accentColor = 'text-emerald-500' }: TemplateProps) {
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

    const SectionHeader = ({ num, title }: { num: string; title: string }) => (
        <div className="flex items-center gap-3 mb-3 mt-6">
            <div className={cn("px-3 py-1 text-[11px] font-black text-white rounded-sm", bgColorClass)}>
                {num}
            </div>
            <h2 className={cn("text-[13px] font-black uppercase tracking-[0.2em]", accentColor)}>
                {title}
            </h2>
            <div className="flex-1 h-px bg-neutral-100 opacity-20" />
        </div>
    )

    const contactParts: string[] = []
    if (personalInfo?.phone) contactParts.push(personalInfo.phone)
    if (personalInfo?.email) contactParts.push(personalInfo.email)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactParts.push(loc)
    if (personalInfo?.githubUrl) contactParts.push(personalInfo.githubUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-mono text-[12px] leading-relaxed p-10",
            className
        )}
        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
            {/* ── TERMINAL HEADER ── */}
            <header className="mb-6 border-b-2 border-neutral-50 pb-6">
                <div className="flex justify-between items-start gap-10">
                    <div className="flex-1">
                        <h1 className="text-[42px] font-black tracking-tight leading-none mb-4 text-neutral-900">
                            {personalInfo?.fullName?.toUpperCase() || 'ROOT@SYSTEM'}
                        </h1>
                        {personalInfo?.professionalTitle && (
                            <div className={cn("text-[16px] font-bold opacity-60", accentColor)}>
                                {`// ${personalInfo.professionalTitle}`}
                            </div>
                        )}
                    </div>
                    <div className="shrink-0 text-right space-y-2 pt-2">
                        {contactParts.map((part, i) => (
                            <div key={i} className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                                {part}
                            </div>
                        ))}
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


            <div>
                {/* Skills - Critical for Tech */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader num="01" title="System_Core" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
                            {Object.entries(skills.reduce((acc, s) => {
                                const t = s.skillType || 'technical';
                                if (!acc[t]) acc[t] = [];
                                acc[t].push(s);
                                return acc;
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="space-y-4">
                                    <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.3em]">
                                        {`# ${type.toUpperCase()}`}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {list.map((s, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-neutral-50 rounded text-[11px] font-bold text-neutral-700">
                                                {`[${s.skillName}]`}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader num="02" title="Runtime_History" />
                        <div className="space-y-6 px-6">
                            {workExperience.map((job, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <div>
                                            <h3 className="text-[16px] font-black text-neutral-900 tracking-tight">
                                                {job.jobTitle.toUpperCase()}
                                            </h3>
                                            <div className="text-[12px] font-bold text-neutral-400 mt-1 uppercase tracking-widest">
                                                {`@ ${job.companyName}`}
                                            </div>
                                        </div>
                                        <div className={cn("text-[11px] font-black uppercase tracking-[0.2em]", accentColor)}>
                                            {job.startDate} {"=>"} {job.isCurrent ? 'HEAD' : job.endDate}
                                        </div>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[13px] text-neutral-500 mb-3 leading-relaxed italic border-l-2 border-neutral-100 pl-6">
                                            {`/* ${job.roleDescription} */`}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3 pl-6">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[12px] text-neutral-700 flex gap-4 leading-relaxed font-bold">
                                                    <span className={cn("shrink-0", accentColor)}>$</span>
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
                        <SectionHeader num="03" title="Active_Repos" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
                            {projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid p-5 border border-neutral-50 rounded bg-neutral-50/20">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-[14px] font-black text-neutral-900 uppercase tracking-tight">{proj.projectName}</h3>
                                        <span className={cn("text-[10px] font-black uppercase opacity-40", accentColor)}>{`::${proj.role}`}</span>
                                    </div>
                                    <p className="text-[11px] text-neutral-600 leading-relaxed mb-4 italic">{proj.description}</p>
                                    {proj.toolsUsed && (
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100">
                                            {proj.toolsUsed.map((t, j) => (
                                                <span key={j} className="text-[10px] font-bold text-neutral-300">#{t}</span>
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
                        <SectionHeader num="04" title="Foundation_Layer" />
                        <div className="space-y-4 px-6">
                            {education.map((edu, i) => (
                                <div key={i} className="break-inside-avoid flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="text-[16px] font-black text-neutral-900 tracking-tight leading-none mb-2 uppercase">
                                            {edu.degree}
                                        </div>
                                        <div className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest">{edu.institutionName}</div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className={cn("text-[13px] font-black", accentColor)}>{edu.endYear}</div>
                                        {edu.gpa && <div className="text-[10px] font-bold text-neutral-300 mt-1 uppercase tracking-widest">{`GPA: ${edu.gpa}`}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer Metadata */}
                <div className="mt-10 pt-6 border-t border-neutral-50 grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-6">Verified_Credentials</h2>
                            <div className="space-y-4">
                                {certifications.map((c, i) => (
                                    <div key={i} className="break-inside-avoid flex flex-col gap-1">
                                        <div className="text-[13px] font-bold text-neutral-800">{`> ${c.certificationName}`}</div>
                                        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-4">
                                            {c.issuingOrganization}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-6">Language_Bindings</h2>
                            <div className="flex flex-wrap gap-8">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-[13px] font-bold text-neutral-800 tracking-tight">{l.languageName}</span>
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest opacity-60", accentColor)}>
                                            {`[${l.proficiencyLevel}]`}
                                        </span>
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

