'use client'

import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Linkedin, Globe, Link as LinkIcon } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

/**
 * ELITE ALPINE TEMPLATE
 * Inspired by high-end executive layouts with centered headers, gray section bars,
 * and elegant serif typography. Single-column design for maximum ATS readability.
 */
export function EliteAlpineTemplate({ data, className, accentColor = 'text-neutral-900' }: TemplateProps) {
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
        customSections
    } = data

    // Section Header with Gray Bar
    const SectionHeader = ({ children }: { children: React.ReactNode }) => (
        <div className="w-full bg-neutral-100 py-1.5 px-4 mb-5 text-center">
            <h2 className="text-[14px] font-serif font-bold uppercase tracking-[0.25em] text-neutral-800 leading-none">
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
            {/* HEADER — Centered & Elegant                    */}
            {/* ═══════════════════════════════════════════════ */}
            <header className="text-center mb-6 pt-2">
                <h1 className="text-[42px] font-serif font-bold text-neutral-900 tracking-tight leading-tight mb-1">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                
                {personalInfo?.professionalTitle && (
                    <div className="text-[14px] font-medium text-neutral-500 mb-5">
                        {personalInfo.professionalTitle}
                    </div>
                )}

                {/* Contact Info Grid/Row */}
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11.5px] text-neutral-600 mb-6">
                    {personalInfo?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {(personalInfo?.city || personalInfo?.country) && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </div>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </div>
                    )}
                    {personalInfo?.websiteUrl && (
                        <div className="flex items-center gap-1.5">
                            <LinkIcon className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </div>
                    )}
                </div>

                {/* Main Divider Line */}
                <div className="h-0.5 bg-neutral-900 w-full mb-1" />
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
            {/* BODY SECTIONS                                  */}
            {/* ═══════════════════════════════════════════════ */}
            <div className="space-y-10">

                {/* Professional Summary */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader>Professional Summary</SectionHeader>
                        <p className="text-[12.5px] leading-[1.8] text-neutral-700 text-justify px-2">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}

                {/* Professional Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader>Professional Experience</SectionHeader>
                        <div className="space-y-8 px-2">
                            {workExperience.map((job, i) => (
                                <div key={i} className=" relative">
                                    {/* Job Title + Date row */}
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[14.5px] font-serif font-bold text-neutral-900 leading-tight">
                                            {job.jobTitle}
                                        </h3>
                                        <div className="bg-neutral-100 px-3 py-1 rounded text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                                            {job.startDate} – {job.isCurrent ? 'Present' : job.endDate}
                                        </div>
                                    </div>

                                    {/* Company + Location row */}
                                    <div className="flex justify-between items-baseline mb-3">
                                        <span className="text-[11.5px] font-bold text-neutral-500 uppercase tracking-[0.1em]">
                                            {job.companyName}
                                        </span>
                                        {job.location && (
                                            <span className="text-[11px] italic text-neutral-400">
                                                {job.location}
                                            </span>
                                        )}
                                    </div>

                                    {/* Achievements */}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-2 ml-1">
                                            {job.achievements.map((a, j) => (
                                                <li key={j} className="text-[12px] text-neutral-600 leading-[1.6] flex gap-3 items-start">
                                                    <span className="text-neutral-300 mt-[7px] w-[4px] h-[4px] rounded-full bg-neutral-400 shrink-0" />
                                                    <span>{a.achievementText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    
                                    {/* Decorative subtle divider between entries if not last */}
                                    {i < workExperience.length - 1 && (
                                        <div className="border-t border-neutral-100 border-dashed w-1/4 mt-8 mx-auto" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}



                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <SectionHeader>Education</SectionHeader>
                        <div className="space-y-6 px-2">
                            {education.map((edu, i) => (
                                <div key={i} className=" flex justify-between items-start">
                                    <div>
                                        <h3 className="text-[13px] font-serif font-bold text-neutral-900 leading-tight">
                                            {edu.degree}{edu.major ? ` in ${edu.major}` : ''}
                                        </h3>
                                        <p className="text-[11.5px] text-neutral-500 font-semibold uppercase tracking-wide mt-0.5">
                                            {edu.institutionName}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] font-bold text-neutral-400">
                                            {[edu.startYear, edu.endYear].filter(Boolean).join(' – ')}
                                        </div>
                                        {edu.location && <div className="text-[10px] italic text-neutral-300 mt-0.5">{edu.location}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {customSections && customSections.map((s, i) => (
                    <section key={i} className="">
                        <SectionHeader>{s.title}</SectionHeader>
                        <div className="px-2">
                            {s.content && <p className="text-[12px] text-neutral-700 leading-relaxed mb-3">{s.content}</p>}
                            {s.items && (
                                <ul className="space-y-2 ml-1">
                                    {s.items.map((item, j) => (
                                        <li key={j} className="text-[12px] text-neutral-600 flex gap-3 items-start leading-[1.6]">
                                            <span className="mt-[7px] w-[4px] h-[4px] rounded-full bg-neutral-400 shrink-0" />
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
                        <SectionHeader>Professional References</SectionHeader>
                        <div className="grid grid-cols-2 gap-8 px-2">
                            {references.map((ref, i) => (
                                <div key={i} className=" space-y-1">
                                    <h3 className="text-[13px] font-serif font-bold text-neutral-900 leading-tight">
                                        {ref.referenceName || ref.name}
                                    </h3>
                                    {ref.role && (
                                        <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">
                                            {ref.role}{ref.organization ? `, ${ref.organization}` : ''}
                                        </p>
                                    )}
                                    {ref.contactDetails && (
                                        <p className="text-[11.5px] text-neutral-600 italic">
                                            {ref.contactDetails}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Grid (Core Competencies) */}
                {skills && skills.length > 0 && (
                    <section className="force-page-break">
                        <SectionHeader>Core Competencies</SectionHeader>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-2 px-6">
                            {skills.map((s, i) => (
                                <div key={i} className="flex justify-between items-center text-[12px] py-1 border-b border-neutral-50">
                                    <span className="font-medium text-neutral-700">{s.skillName}</span>
                                    {s.proficiencyLevel && (
                                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-300">{s.proficiencyLevel}</span>
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

export default EliteAlpineTemplate
