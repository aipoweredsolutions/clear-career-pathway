import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function SterlingCorporateTemplate({ data, className, accentColor = 'text-slate-800' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        skills,
        workExperience,
        education,
        certifications,
        projects,
        achievements,
        languages,
        customSections
    } = data

    // Group skills by type for "Core Competencies" sidebar
    const groupedSkills = skills?.reduce((acc, s) => {
        const type = s.skillType || 'professional'
        if (!acc[type]) acc[type] = []
        acc[type].push(s)
        return acc
    }, {} as Record<string, typeof skills>) || {}

    const formatSkillTypeLabel = (type: string) => {
        return type
            .replace(/_/g, ' ')
            .split(' ')
            .map(w => w.toUpperCase())
            .join(' & ')
    }

    // Section header for the left column
    const SidebarTitle = ({ children }: { children: React.ReactNode }) => (
        <div className="mb-5">
            <h2 className="text-[13px] font-bold text-slate-800 mb-2.5 tracking-wide">
                {children}
            </h2>
            <div className="w-full h-[1.5px] bg-slate-300" />
        </div>
    )

    // Section header for the main column
    const MainTitle = ({ children }: { children: React.ReactNode }) => (
        <div className="mb-4 mt-7 first:mt-0">
            <h2 className="text-[15px] font-bold text-slate-800 mb-2.5 tracking-wide">
                {children}
            </h2>
            <div className="w-full h-[1.5px] bg-slate-300" />
        </div>
    )

    return (
        <div className={cn(
            "w-full flex bg-white text-slate-800 font-sans leading-relaxed min-h-full",
            className
        )}>
            {/* ─── LEFT SIDEBAR (35%) ─── */}
            <div className="w-[35%] shrink-0 bg-[#f8fafc] flex flex-col pt-12 pb-12 px-9 border-r border-slate-200">
                {/* Profile Photo - Optional */}
                {personalInfo?.photoUrl && (
                    <div className="flex justify-center mb-10">
                        <img 
                            src={personalInfo.photoUrl} 
                            alt={personalInfo.fullName} 
                            className="w-28 h-28 rounded-full object-cover border-3 border-white shadow-md"
                        />
                    </div>
                )}

                <div className="space-y-8 flex-1">
                    {/* Contact */}
                    <section>
                        <SidebarTitle>Contact</SidebarTitle>
                        <div className="space-y-3">
                            {personalInfo?.email && (
                                <div className="text-[10.5px] text-slate-700">
                                    <div className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 mb-1">Email</div>
                                    <div className="break-all">{personalInfo.email}</div>
                                </div>
                            )}
                            {personalInfo?.phone && (
                                <div className="text-[10.5px] text-slate-700">
                                    <div className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 mb-1">Phone</div>
                                    <div>{personalInfo.phone}</div>
                                </div>
                            )}
                            {(personalInfo?.city || personalInfo?.country) && (
                                <div className="text-[10.5px] text-slate-700">
                                    <div className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 mb-1">Location</div>
                                    <div>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</div>
                                </div>
                            )}
                            {personalInfo?.linkedinUrl && (
                                <div className="text-[10.5px] text-slate-700">
                                    <div className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 mb-1">LinkedIn</div>
                                    <div className="break-all">{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>
                                </div>
                            )}
                            {personalInfo?.websiteUrl && (
                                <div className="text-[10.5px] text-slate-700">
                                    <div className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 mb-1">Website</div>
                                    <div className="break-all">{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <SidebarTitle>Education</SidebarTitle>
                            <div className="space-y-5">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="text-[11px] font-bold text-slate-900 leading-tight mb-1.5">
                                            {edu.degree}
                                        </h3>
                                        {(edu.major || edu.fieldOfStudy) && (
                                            <p className="text-[10px] text-slate-700 mb-1">
                                                {edu.major || edu.fieldOfStudy}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-slate-600 leading-snug mb-1">
                                            {edu.institutionName}
                                        </p>
                                        {edu.endYear && (
                                            <span className="text-[10px] text-slate-500">
                                                {edu.endYear}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Core Competencies */}
                    {skills && skills.length > 0 && (
                        <section>
                            <SidebarTitle>Core Competencies</SidebarTitle>
                            <div className="space-y-5">
                                {Object.entries(groupedSkills).map(([type, list]) => (
                                    <div key={type}>
                                        <h4 className="text-[9px] font-bold text-slate-500 mb-2.5 tracking-wider uppercase">
                                            {formatSkillTypeLabel(type)}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {list?.map((s, i) => (
                                                <span key={i} className="bg-slate-200 text-slate-800 text-[10px] px-2.5 py-1 rounded-sm font-medium">
                                                    {s.skillName}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <SidebarTitle>Languages</SidebarTitle>
                            <div className="space-y-2.5">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between items-baseline">
                                        <span className="text-[10.5px] font-bold text-slate-800">{l.languageName}</span>
                                        <span className="text-[9.5px] text-slate-500 capitalize">{l.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* ─── MAIN CONTENT (65%) ─── */}
            <div className="w-[65%] shrink-0 pt-12 pb-12 px-11">
                {/* Header (Name & Title) */}
                <header className="mb-10 border-b-2 border-slate-200 pb-6">
                    <h1 className="text-[34px] font-bold text-slate-900 leading-[1.1] mb-2.5 tracking-tight">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-[0.2em]">
                        {personalInfo?.professionalTitle || 'Professional Title'}
                    </p>
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


                <div className="space-y-7">
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <MainTitle>Professional Summary</MainTitle>
                            <p className="text-[11px] leading-[1.6] text-slate-700">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Professional Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <MainTitle>Professional Experience</MainTitle>
                            <div className="space-y-6">
                                {workExperience.map((job, i) => (
                                    <div key={i}>
                                        {/* Row 1: Title and Dates */}
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-[12px] font-bold text-slate-900">
                                                {job.jobTitle}
                                            </h3>
                                            <span className="text-[10px] text-slate-500 font-medium">
                                                {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        
                                        {/* Row 2: Company and Location */}
                                        <div className="flex justify-between items-baseline mb-3">
                                            <span className="text-[11px] font-semibold text-slate-700">
                                                {job.companyName}
                                            </span>
                                            {job.location && (
                                                <span className="text-[10px] text-slate-500">
                                                    {job.location}
                                                </span>
                                            )}
                                        </div>

                                        {/* Role Description */}
                                        {job.roleDescription && (
                                            <p className="text-[10.5px] text-slate-600 mb-2.5 leading-[1.6]">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {/* Achievements */}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-2">
                                                {job.achievements.map((a, j) => (
                                                    <li key={j} className="text-[10.5px] text-slate-700 leading-[1.6] flex gap-2.5">
                                                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
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
                            <MainTitle>Key Projects</MainTitle>
                            <div className="space-y-5">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1.5">
                                            <h3 className="text-[11.5px] font-bold text-slate-900">{proj.projectName}</h3>
                                            {proj.role && <span className="text-[10px] text-slate-500">{proj.role}</span>}
                                        </div>
                                        {proj.description && (
                                            <p className="text-[10.5px] text-slate-700 leading-[1.6]">{proj.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <MainTitle>Certifications</MainTitle>
                            <div className="space-y-3">
                                {certifications.map((c, i) => (
                                    <div key={i} className="flex justify-between items-baseline">
                                        <h3 className="text-[11px] font-bold text-slate-800">{c.certificationName}</h3>
                                        <span className="text-[10px] text-slate-500">
                                            {c.issuingOrganization}{c.issueYear ? ` • ${c.issueYear}` : ''}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements / Awards */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <MainTitle>Awards & Recognition</MainTitle>
                            <div className="space-y-3">
                                {achievements.map((a, i) => (
                                    <div key={i} className="flex justify-between items-baseline">
                                        <h3 className="text-[11px] font-bold text-slate-800">{a.achievementTitle}</h3>
                                        <span className="text-[10px] text-slate-500">
                                            {a.issuingBody}{a.year ? ` • ${a.year}` : ''}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((s, i) => (
                        <section key={i}>
                            <MainTitle>{s.title}</MainTitle>
                            {s.content && <p className="text-[10.5px] text-slate-700 leading-[1.6] mb-2">{s.content}</p>}
                            {s.items && (
                                <ul className="space-y-2">
                                    {s.items.map((item, j) => (
                                        <li key={j} className="text-[10.5px] text-slate-700 flex gap-2.5 leading-[1.6]">
                                            <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
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
        </div>
    )
}

