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
 * ELITE SUMMIT TEMPLATE
 * A modern, minimal, and highly ATS-friendly template featuring clean sans-serif typography.
 * Distinguished by its ultra-wide tracking in the header and minimalist section dividers.
 */
export function EliteSummitTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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

    const SectionHeader = ({ children }: { children: React.ReactNode }) => (
        <div className="mb-4 mt-8 first:mt-0">
            <div className="h-px bg-neutral-100 w-full mb-4" />
            <h2 className="text-[13px] font-medium uppercase tracking-[0.3em] text-neutral-500">
                {children}
            </h2>
        </div>
    )

    return (
        <div className={cn(
            "w-full bg-white text-neutral-800 font-sans leading-relaxed p-0",
            className
        )}>
            {/* ═══════════════════════════════════════════════ */}
            {/* HEADER — Modern Sans-Serif                     */}
            {/* ═══════════════════════════════════════════════ */}
            <header className="text-center mb-10 pt-4">
                <h1 className="text-[42px] font-normal uppercase tracking-[0.35em] text-neutral-900 leading-tight mb-2">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                
                {personalInfo?.professionalTitle && (
                    <div className="text-[11px] font-medium uppercase tracking-[0.5em] text-neutral-400 mb-8">
                        {personalInfo.professionalTitle}
                    </div>
                )}

                <div className="h-px bg-neutral-200 w-full mb-3" />
                
                {/* Contact Info Row */}
                <div className="flex flex-wrap justify-center items-center gap-x-5 text-[10.5px] text-neutral-500 tracking-wider">
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
            <div className="space-y-1">

                {/* Professional Overview */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader>Professional Overview</SectionHeader>
                        <p className="text-[12px] leading-[1.8] text-neutral-600">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader>Work Experience</SectionHeader>
                        <div className="space-y-8">
                            {workExperience.map((job, i) => (
                                <div key={i} className="">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <div className="text-[12.5px]">
                                            <span className="font-bold text-neutral-900">{job.companyName}</span>
                                            <span className="text-neutral-400 mx-2">|</span>
                                            <span className="text-neutral-600">{job.location}</span>
                                            <span className="text-neutral-400 mx-2">,</span>
                                            <span className="font-medium text-neutral-500 italic">{job.jobTitle}</span>
                                        </div>
                                        <div className="text-[11px] font-medium text-neutral-400 whitespace-nowrap ml-4">
                                            {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1.5 ml-1">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[11.5px] text-neutral-600 leading-[1.6] flex gap-3 items-start">
                                                    <span className="text-neutral-300 mt-[8px] w-[3.5px] h-[3.5px] rounded-full bg-neutral-300 shrink-0" />
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
                    <section>
                        <SectionHeader>Education & Certification</SectionHeader>
                        <div className="space-y-5">
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
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader>Skills & Core Competencies</SectionHeader>
                        <div className="flex flex-wrap gap-x-8 gap-y-2 px-1">
                            {skills.map((s, i) => (
                                <div key={i} className="text-[11.5px] text-neutral-600 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-neutral-200 rounded-full" />
                                    {s.skillName}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <section key={i} className="">
                        <SectionHeader>{s.title}</SectionHeader>
                        <div className="px-1">
                            {s.content && <p className="text-[12px] text-neutral-600 leading-relaxed mb-3">{s.content}</p>}
                            {s.items && (
                                <ul className="space-y-2 ml-1">
                                    {s.items.map((item, j) => (
                                        <li key={j} className="text-[12px] text-neutral-600 flex gap-3 items-start leading-[1.6]">
                                            <span className="mt-[8px] w-[3.5px] h-[3.5px] rounded-full bg-neutral-300 shrink-0" />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                ))}

                {/* References */}
                {references && references.length > 0 && (
                    <section>
                        <SectionHeader>References</SectionHeader>
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
        
                </>
            )}
            </div>
    )
}

export default EliteSummitTemplate
