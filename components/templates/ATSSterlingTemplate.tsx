import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSSterlingTemplate({ data, className, accentColor = 'text-slate-800' }: TemplateProps) {
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
        <div className="mb-4">
            <h2 className="text-[16px] font-bold text-slate-800 font-serif mb-2">
                {children}
            </h2>
            <div className="w-full h-px bg-slate-200" />
        </div>
    )

    // Section header for the main column
    const MainTitle = ({ children }: { children: React.ReactNode }) => (
        <div className="mb-4 mt-6 first:mt-0">
            <h2 className="text-[18px] font-bold text-slate-800 font-serif mb-2">
                {children}
            </h2>
            <div className="w-full h-px bg-slate-200" />
        </div>
    )

    return (
        <div className={cn(
            "w-full flex bg-white text-slate-800 font-sans leading-relaxed min-h-full",
            className
        )}>
            {/* ─── LEFT SIDEBAR (~33%) ─── */}
            <div className="w-[33%] shrink-0 bg-[#f1f5f9] flex flex-col pt-10 pb-10 px-8">
                {/* Profile Photo */}
                <div className="flex justify-center mb-10">
                    {personalInfo?.photoUrl ? (
                        <img 
                            src={personalInfo.photoUrl} 
                            alt={personalInfo.fullName} 
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-slate-300 flex items-center justify-center border-4 border-white shadow-sm">
                            <span className="text-4xl text-white font-bold font-serif">
                                {personalInfo?.fullName?.charAt(0) || 'A'}
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-8 flex-1">
                    {/* Contact */}
                    <section>
                        <SidebarTitle>Contact</SidebarTitle>
                        <div className="space-y-3">
                            {personalInfo?.email && (
                                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                                    <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                    <span className="break-all">{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo?.phone && (
                                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                                    <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {(personalInfo?.city || personalInfo?.country) && (
                                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                    <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                                </div>
                            )}
                            {personalInfo?.linkedinUrl && (
                                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                                    <Linkedin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                    <span className="break-all">{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                </div>
                            )}
                            {personalInfo?.websiteUrl && (
                                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                                    <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                    <span className="break-all">{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
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
                                    <div key={i} className="break-inside-avoid">
                                        <h3 className="text-[12px] font-bold text-slate-800 leading-tight mb-1">
                                            {edu.degree}{edu.major ? `\n${edu.major}` : ''}
                                        </h3>
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-[11px] text-slate-600 leading-snug">
                                                {edu.institutionName}
                                            </p>
                                            {edu.endYear && (
                                                <span className="text-[11px] text-slate-500 whitespace-nowrap">
                                                    {edu.endYear}
                                                </span>
                                            )}
                                        </div>
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
                                        <h4 className="text-[10px] font-bold text-slate-500 mb-2 tracking-wide">
                                            {formatSkillTypeLabel(type)}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {list?.map((s, i) => (
                                                <span key={i} className="bg-slate-200/60 text-slate-700 text-[11px] px-2.5 py-1 rounded-sm">
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
                            <div className="space-y-2">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between items-baseline">
                                        <span className="text-[11px] font-bold text-slate-800">{l.languageName}</span>
                                        <span className="text-[10px] text-slate-500 capitalize">{l.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* ─── MAIN CONTENT (~67%) ─── */}
            <div className="w-[67%] shrink-0 pt-10 pb-10 px-10">
                {/* Header (Name & Title) */}
                <header className="mb-8">
                    <h1 className="text-[38px] font-bold text-slate-900 font-serif leading-[1.1] mb-2 tracking-tight">
                        {personalInfo?.fullName || 'Alexander J. Sterling'}
                    </h1>
                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest font-sans">
                        {personalInfo?.professionalTitle || 'SENIOR STRATEGY OPERATIONS DIRECTOR'}
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


                <div className="space-y-6">
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <MainTitle>Professional Summary</MainTitle>
                            <p className="text-[12px] leading-relaxed text-slate-600 text-justify">
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
                                    <div key={i} className="break-inside-avoid">
                                        {/* Row 1: Title and Dates */}
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="text-[13px] font-bold text-slate-900">
                                                {job.jobTitle}
                                            </h3>
                                            <span className="text-[11px] text-slate-500">
                                                {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        
                                        {/* Row 2: Company and Location */}
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="text-[12px] font-bold text-slate-700">
                                                {job.companyName}
                                            </span>
                                            {job.location && (
                                                <span className="text-[11px] italic text-slate-500">
                                                    {job.location}
                                                </span>
                                            )}
                                        </div>

                                        {/* Role Description */}
                                        {job.roleDescription && (
                                            <p className="text-[11.5px] text-slate-600 mb-2 leading-relaxed italic">
                                                {job.roleDescription}
                                            </p>
                                        )}

                                        {/* Achievements */}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="space-y-1.5 ml-1">
                                                {job.achievements.map((a, j) => (
                                                    <li key={j} className="text-[11.5px] text-slate-600 leading-relaxed flex gap-2.5">
                                                        <span className="text-slate-400 mt-[7px] w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                                                        <span className="text-justify">{a.achievementText}</span>
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
                                    <div key={i} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-[13px] font-bold text-slate-900">{proj.projectName}</h3>
                                            {proj.role && <span className="text-[11px] italic text-slate-500">{proj.role}</span>}
                                        </div>
                                        {proj.description && (
                                            <p className="text-[11.5px] text-slate-600 leading-relaxed text-justify">{proj.description}</p>
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
                                    <div key={i} className="break-inside-avoid flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-slate-800">{c.certificationName}</h3>
                                        <span className="text-[11px] text-slate-500">
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
                            <MainTitle>Awards</MainTitle>
                            <div className="space-y-3">
                                {achievements.map((a, i) => (
                                    <div key={i} className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold text-slate-800">{a.achievementTitle}</h3>
                                        <span className="text-[11px] text-slate-500">
                                            {a.issuingBody}{a.year ? ` • ${a.year}` : ''}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections && customSections.map((s, i) => (
                        <section key={i} className="break-inside-avoid">
                            <MainTitle>{s.title}</MainTitle>
                            {s.content && <p className="text-[11.5px] text-slate-600 leading-relaxed mb-2">{s.content}</p>}
                            {s.items && (
                                <ul className="space-y-1.5 ml-1">
                                    {s.items.map((item, j) => (
                                        <li key={j} className="text-[11.5px] text-slate-600 flex gap-2.5">
                                            <span className="mt-[7px] w-1 h-1 rounded-full bg-slate-400 shrink-0" />
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

