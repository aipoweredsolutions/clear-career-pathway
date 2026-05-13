'use client'

import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * LONDON EXECUTIVE TEMPLATE
 * A high-end, clean, and authoritative multi-page template inspired by elite corporate CVs.
 * Features a bold centered header, all-caps section titles, and a dedicated multi-page logic.
 */
export function EliteLondonTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
        references,
    } = data

    const SectionHeader = ({ children }: { children: React.ReactNode }) => (
        <div className="mb-6 mt-10 first:mt-0">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-neutral-800 mb-2">
                {children}
            </h2>
            <div className="h-px bg-neutral-200 w-full" />
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed p-0",
            className
        )}>
            {/* ═══════════════════════════════════════════════ */}
            {/* HEADER                                         */}
            {/* ═══════════════════════════════════════════════ */}
            <header className="text-center mb-10">
                <h1 className="text-[44px] font-bold uppercase tracking-[0.15em] text-neutral-900 leading-none mb-4">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                
                {personalInfo?.professionalTitle && (
                    <div className="text-[13px] font-medium uppercase tracking-[0.3em] text-neutral-500 mb-6">
                        {personalInfo.professionalTitle}
                    </div>
                )}

                <div className="h-px bg-neutral-900 w-full mb-3" />
                
                {/* Contact Info Row */}
                <div className="flex flex-wrap justify-center items-center gap-x-6 text-[10.5px] text-neutral-600 tracking-wider">
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.email && <span className="text-neutral-300">|</span>}
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {(personalInfo?.city || personalInfo?.country) && <span className="text-neutral-300">|</span>}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                    )}
                    {personalInfo?.linkedinUrl && <span className="text-neutral-300">|</span>}
                    {personalInfo?.linkedinUrl && <span>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
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


            {/* ═══════════════════════════════════════════════ */}
            {/* BODY CONTENT                                   */}
            {/* ═══════════════════════════════════════════════ */}
            <div className="space-y-2">

                {/* Professional Overview */}
                {professionalSummary?.summaryText && (
                    <section className="mb-10">
                        <SectionHeader>Professional Overview</SectionHeader>
                        <p className="text-[12px] leading-[1.8] text-neutral-700 text-justify">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Core Competencies */}
                {skills && skills.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>Core Competencies</SectionHeader>
                        <div className="grid grid-cols-1 gap-y-3">
                            {/* Grouping skills by type for better presentation */}
                            {Object.entries(skills.reduce((acc, s) => {
                                const type = s.skillType || 'General'
                                if (!acc[type]) acc[type] = []
                                acc[type].push(s)
                                return acc
                            }, {} as Record<string, typeof skills>)).map(([type, list]) => (
                                <div key={type} className="flex gap-4 items-start">
                                    <span className="text-[11px] font-bold text-neutral-900 w-24 shrink-0 capitalize">{type}:</span>
                                    <span className="text-[11px] text-neutral-600 leading-relaxed">
                                        {list.map(s => s.skillName).join(', ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>Work Experience</SectionHeader>
                        <div className="space-y-8">
                            {workExperience.map((job, i) => (
                                <div key={i} className="">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <div className="text-[13px]">
                                            <span className="font-bold text-neutral-900">{job.jobTitle}</span>
                                            <span className="text-neutral-400 mx-2 italic font-normal">
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </span>
                                        </div>
                                        <div className="text-[12px] font-medium text-neutral-700">
                                            {job.companyName}
                                            {job.location && <span className="text-neutral-400 font-normal"> · {job.location}</span>}
                                        </div>
                                    </div>

                                    {job.roleDescription && (
                                        <p className="text-[11.5px] text-neutral-600 italic mb-3 leading-relaxed">
                                            {job.roleDescription}
                                        </p>
                                    )}

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-2 ml-4">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[11.5px] text-neutral-600 leading-[1.6] list-disc marker:text-neutral-400">
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

                {/* Education */}
                {education && education.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>Education</SectionHeader>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i} className=" flex justify-between items-start">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-800">{edu.degree}</span>
                                        <div className="text-neutral-600 mt-0.5">{edu.institutionName}</div>
                                        {edu.achievements && <div className="text-[11px] text-neutral-500 mt-1 italic">{edu.achievements}</div>}
                                    </div>
                                    <div className="text-[11px] font-bold text-neutral-400">
                                        {[edu.startYear, edu.endYear].filter(Boolean).join(' — ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>Certifications</SectionHeader>
                        <div className="space-y-4">
                            {certifications.map((cert, i) => (
                                <div key={i} className=" flex justify-between items-start text-[12px]">
                                    <div>
                                        <span className="font-bold text-neutral-800">{cert.certificationName}</span>
                                        <div className="text-neutral-500 text-[11px]">{cert.issuingOrganization}</div>
                                    </div>
                                    <div className="text-[11px] font-bold text-neutral-400">{cert.issueYear}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>Languages</SectionHeader>
                        <div className="flex flex-wrap gap-x-8 gap-y-2">
                            {languages.map((l, i) => (
                                <div key={i} className="text-[12px] text-neutral-700">
                                    <span className="font-bold">{l.languageName}</span>
                                    <span className="text-neutral-400 mx-2">—</span>
                                    <span className="italic">{l.proficiencyLevel}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>References</SectionHeader>
                        <div className="grid grid-cols-2 gap-8">
                            {references.map((ref, i) => (
                                <div key={i} className=" text-[12px] space-y-1">
                                    <div className="font-bold text-neutral-800">{ref.referenceName || ref.name}</div>
                                    <div className="text-neutral-500 italic text-[11px]">
                                        {ref.role}{ref.organization ? `, ${ref.organization}` : ''}
                                    </div>
                                    {ref.contactDetails && (
                                        <div className="text-neutral-400 text-[11px] flex gap-4">
                                            <span>{ref.contactDetails}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        
                </>
            )}
            </div>
    )
}

export default EliteLondonTemplate
