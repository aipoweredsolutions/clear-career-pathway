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
 * ELITE KYOTO TEMPLATE
 * A sophisticated multipage-ready executive template.
 * Features ultra-clean typography, wide-tracked headers, and a structured grid for skills.
 * Inspired by high-end professional CVs.
 */
export function EliteHaskinsTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
        customSections,
        additionalInfo
    } = data

    // Helper to split skills into "Professional" and "Technical" if they aren't already
    const technicalSkills = skills?.filter(s => s.skillType === 'technical' || s.skillType === 'tool') || []
    const professionalSkills = skills?.filter(s => s.skillType === 'professional' || !s.skillType || s.skillType === 'industry') || []

    const SectionHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
        <div className={cn("mb-4 mt-8 first:mt-0", className)}>
            <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] text-neutral-800">
                {children}
            </h2>
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-900 font-sans leading-relaxed p-0",
            className
        )}>
            {/* ═══════════════════════════════════════════════ */}
            {/* PAGE 1 HEADER                                  */}
            {/* ═══════════════════════════════════════════════ */}
            <header className="text-center mb-10">
                <h1 className="text-[48px] font-serif font-light uppercase tracking-[0.2em] text-neutral-900 leading-none mb-3">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                
                {personalInfo?.professionalTitle && (
                    <div className="text-[12px] font-medium uppercase tracking-[0.4em] text-neutral-500 mb-6">
                        {personalInfo.professionalTitle}
                    </div>
                )}

                <div className="h-px bg-neutral-200 w-full mb-3" />
                
                {/* Contact Info Row */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 text-[11px] text-neutral-500 tracking-wide">
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.phone && personalInfo?.email && <span className="text-neutral-300">|</span>}
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.email && (personalInfo?.city || personalInfo?.country) && <span className="text-neutral-300">|</span>}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                    )}
                    {personalInfo?.linkedinUrl && <span className="text-neutral-300">|</span>}
                    {personalInfo?.linkedinUrl && <span>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                </div>

                <div className="h-px bg-neutral-200 w-full mt-3" />
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

                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section className="mb-10">
                        <SectionHeader>Professional Summary</SectionHeader>
                        <p className="text-[12px] leading-[1.8] text-neutral-600 text-justify">
                            {professionalSummary.summaryText}
                        </p>
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
                                            <span className="text-neutral-400 mx-2">|</span>
                                            <span className="font-medium text-neutral-700">{job.companyName}</span>
                                            {job.location && <span className="text-neutral-500">, {job.location}</span>}
                                        </div>
                                        <div className="text-[11px] font-medium text-neutral-500 whitespace-nowrap ml-4">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1.5 ml-1">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[11.5px] text-neutral-600 leading-[1.6] flex gap-3 items-start">
                                                    <span className="text-neutral-900 mt-[7px] w-[3px] h-[3px] rounded-full bg-neutral-400 shrink-0" />
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
                    <section className="mb-10 page-break-before-auto">
                        <SectionHeader>Education & Certification</SectionHeader>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i} className=" flex justify-between items-start">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-800">{edu.degree}</span>
                                        <span className="text-neutral-400 mx-2">|</span>
                                        <span className="text-neutral-600">{edu.institutionName}</span>
                                        {edu.location && <span className="text-neutral-500">, {edu.location}</span>}
                                    </div>
                                    <div className="text-[11px] font-medium text-neutral-400">
                                        {[edu.startYear, edu.endYear].filter(Boolean).join(' — ')}
                                    </div>
                                </div>
                            ))}
                            {certifications?.map((cert, i) => (
                                <div key={i} className=" flex justify-between items-start">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-800">{cert.certificationName}</span>
                                        <span className="text-neutral-400 mx-2">|</span>
                                        <span className="text-neutral-600">{cert.issuingOrganization}</span>
                                    </div>
                                    <div className="text-[11px] font-medium text-neutral-400">
                                        {cert.issueYear}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Skills Grid */}
                {professionalSkills.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>Professional Skills</SectionHeader>
                        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                            {professionalSkills.map((s, i) => (
                                <div key={i} className="text-[11.5px] text-neutral-600 border-l border-neutral-100 pl-3 py-0.5">
                                    {s.skillName}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Technical Skills Grid */}
                {technicalSkills.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>Technical Skills</SectionHeader>
                        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                            {technicalSkills.map((s, i) => (
                                <div key={i} className="text-[11.5px] text-neutral-600 border-l border-neutral-100 pl-3 py-0.5">
                                    {s.skillName}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Development */}
                {(achievements && achievements.length > 0 || additionalInfo?.otherInfo) && (
                    <section className="mb-10">
                        <SectionHeader>Professional Development</SectionHeader>
                        <div className="space-y-4">
                            {achievements?.map((ach, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div className="text-[12px]">
                                        <span className="font-bold text-neutral-800">{ach.achievementTitle}</span>
                                        {ach.issuingBody && (
                                            <>
                                                <span className="text-neutral-400 mx-2">|</span>
                                                <span className="text-neutral-600">{ach.issuingBody}</span>
                                            </>
                                        )}
                                    </div>
                                    {ach.year && <div className="text-[11px] font-medium text-neutral-400">{ach.year}</div>}
                                </div>
                            ))}
                            {additionalInfo?.otherInfo && (
                                <p className="text-[11.5px] text-neutral-600 leading-relaxed italic">
                                    {additionalInfo.otherInfo}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* References */}
                {references && references.length > 0 && (
                    <section className="mb-10">
                        <SectionHeader>Professional References</SectionHeader>
                        <div className="grid grid-cols-2 gap-8">
                            {references.map((ref, i) => (
                                <div key={i} className=" text-[12px] space-y-1">
                                    <div className="font-bold text-neutral-800">{ref.referenceName || ref.name}</div>
                                    <div className="text-neutral-500 font-medium uppercase tracking-wider text-[10px]">
                                        {ref.role}{ref.organization ? `, ${ref.organization}` : ''}
                                    </div>
                                    {ref.contactDetails && <div className="text-neutral-500 italic text-[11px]">{ref.contactDetails}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
            
            {/* Footer / Page Numbering Hint (Visual Only) */}
            <footer className="mt-20 pt-10 border-t border-neutral-50 flex justify-between items-center text-[9px] text-neutral-300 uppercase tracking-widest">
                <span>{personalInfo?.fullName} — Executive CV</span>
                <span>Page 1 of 2</span>
            </footer>
        
                </>
            )}
            </div>
    )
}

export default EliteHaskinsTemplate
