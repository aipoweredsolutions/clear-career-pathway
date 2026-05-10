import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function ATSBauhausTemplate({ data, className, accentColor = 'bg-red-600 text-red-600' }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        achievements,
        customSections,
        languages
    } = data

    // Extract colors
    const colorMatch = accentColor.match(/(?:bg|text)-([a-z]+-[0-9]+)/)
    const baseColor = colorMatch ? colorMatch[1] : 'neutral-900'
    
    const bgColorClass = `bg-${baseColor}`
    const textColorClass = `text-${baseColor}`
    const borderColorClass = `border-${baseColor}`

    const activeSections = [
        professionalSummary?.summaryText ? 'profile' : null,
        workExperience && workExperience.length > 0 ? 'experience' : null,
        education && education.length > 0 ? 'education' : null,
        projects && projects.length > 0 ? 'projects' : null,
        skills && skills.length > 0 ? 'skills' : null,
        (certifications?.length || achievements?.length) ? 'awards' : null,
        languages && languages.length > 0 ? 'languages' : null
    ].filter(Boolean)

    const SectionHeader = ({ title, sectionId }: { title: string, sectionId: string }) => {
        const numStr = (activeSections.indexOf(sectionId) + 1).toString().padStart(2, '0')
        
        return (
            <div className="flex items-end gap-6 mb-8 mt-12 group">
                <div className={cn("w-14 h-14 flex items-center justify-center text-white font-black text-xl shrink-0 transition-transform group-hover:scale-105", bgColorClass)} aria-hidden="true">
                    {numStr}
                </div>
                <div className="flex-grow pb-1">
                    <h2 className={cn("text-[15px] font-black uppercase tracking-[0.3em] mb-3", textColorClass)}>
                        {title}
                    </h2>
                    <div className="h-1.5 w-full bg-neutral-900" />
                </div>
            </div>
        )
    }

    const contactLines: string[] = []
    if (personalInfo?.email) contactLines.push(personalInfo.email)
    if (personalInfo?.phone) contactLines.push(personalInfo.phone)
    const loc = personalInfo?.location || [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')
    if (loc) contactLines.push(loc)
    if (personalInfo?.linkedinUrl) contactLines.push(personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ''))

    return (
        <div
            className={cn('w-full bg-white text-neutral-900 leading-relaxed p-12', className)}
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
        >
            {/* ── HEADER — GEOMETRIC MASTERY ── */}
            <header className="mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="flex-1">
                        {personalInfo?.fullName && (
                            <div className="mb-6">
                                {(() => {
                                    const parts = personalInfo.fullName.split(' ')
                                    const last = parts.pop()
                                    const rest = parts.join(' ')
                                    return (
                                        <div className="flex flex-col leading-[0.85]">
                                            <h1 className="text-[72px] font-black uppercase tracking-[-0.06em]">{rest}</h1>
                                            <h1 className={cn("text-[72px] font-extralight uppercase tracking-[-0.06em]", textColorClass)}>{last}</h1>
                                        </div>
                                    )
                                })()}
                            </div>
                        )}
                        <div className="flex items-center gap-6">
                            <div className={cn("h-3 w-32", bgColorClass)} />
                            {personalInfo?.professionalTitle && (
                                <div className="text-[14px] font-black tracking-[0.4em] uppercase text-neutral-400">
                                    {personalInfo.professionalTitle}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="text-[11px] font-black text-neutral-400 tracking-[0.15em] flex flex-col gap-2 text-right uppercase">
                        {contactLines.map((line, i) => (
                            <span key={i} className="whitespace-nowrap">{line}</span>
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


            {/* ── BODY ── */}
            <div className="pb-12">
                {/* Profile */}
                {professionalSummary?.summaryText && (
                    <section>
                        <SectionHeader title="Mandate" sectionId="profile" />
                        <div className="pl-20">
                            <p className="text-[15px] font-medium text-neutral-700 leading-[1.8] text-justify italic border-l-4 border-neutral-50 pl-10">
                                {professionalSummary.summaryText}
                            </p>
                        </div>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <SectionHeader title="Chronology" sectionId="experience" />
                        <div className="space-y-12 pl-20">
                            {workExperience.map((job, i) => (
                                <div key={i} className="relative">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-[18px] font-black uppercase text-neutral-900 tracking-tight">
                                            {job.jobTitle}
                                        </h3>
                                        <span className="text-[12px] font-black text-neutral-300 uppercase tracking-widest">
                                            {job.startDate} — {job.isCurrent ? 'Current' : job.endDate}
                                        </span>
                                    </div>
                                    <div className={cn("text-[13px] font-black uppercase tracking-[0.2em] mb-4", textColorClass)}>
                                        {job.companyName} <span className="text-neutral-200 mx-2">/</span> {job.location}
                                    </div>
                                    
                                    {job.roleDescription && (
                                        <p className="text-[14px] font-medium text-neutral-600 mb-6 leading-relaxed">
                                            {job.roleDescription}
                                        </p>
                                    )}
                                    
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-3">
                                            {job.achievements.map((ach, j) => (
                                                <li key={j} className="text-[14px] text-neutral-700 flex gap-4 leading-relaxed group">
                                                    <span className={cn("shrink-0 w-2 h-2 mt-2", bgColorClass, "opacity-20 group-hover:opacity-100 transition-opacity")} />
                                                    <span className="font-medium">{ach.achievementText}</span>
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
                        <SectionHeader title="Academic" sectionId="education" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pl-20">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="text-[15px] font-black uppercase text-neutral-900 mb-1">
                                        {edu.degree}
                                    </h3>
                                    <div className={cn("text-[12px] font-black uppercase tracking-widest mb-2", textColorClass)}>
                                        {edu.institutionName} <span className="text-neutral-200 mx-1">/</span> {edu.endYear}
                                    </div>
                                    {edu.gpa && (
                                        <div className="text-[11px] text-neutral-400 font-black uppercase tracking-widest">Score: {edu.gpa}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                
                {/* Skills — Bauhaus blocky style */}
                {skills && skills.length > 0 && (
                    <section>
                        <SectionHeader title="Expertise" sectionId="skills" />
                        <div className="pl-20">
                            {(() => {
                                const grouped = skills.reduce((acc, skill) => {
                                    const type = skill.skillType || 'professional'
                                    if (!acc[type]) acc[type] = []
                                    acc[type].push(skill)
                                    return acc
                                }, {} as Record<string, typeof skills>)

                                return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {Object.entries(grouped).map(([type, list]) => (
                                            <div key={type}>
                                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-4">
                                                    {type}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {list.map((s, i) => (
                                                        <span 
                                                            key={i} 
                                                            className={cn("text-[12px] font-black px-4 py-2 border-[3px] uppercase tracking-wider", borderColorClass, textColorClass)}
                                                        >
                                                            {s.skillName}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            })()}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <SectionHeader title="Lexicon" sectionId="languages" />
                        <div className="pl-20 flex flex-wrap gap-12">
                            {languages.map((l, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-[15px] font-black uppercase tracking-tight">{l.languageName}</span>
                                    <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", textColorClass)}>{l.proficiencyLevel}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                
                {/* Final Geometric element */}
                <div className="mt-24 pl-20 flex items-center gap-8">
                    <div className={cn("w-12 h-12 shrink-0", bgColorClass)} />
                    <div className="w-12 h-12 shrink-0 border-[3px] border-neutral-900" />
                    <div className={cn("w-12 h-12 shrink-0 rounded-full", bgColorClass, "opacity-20")} />
                    <div className="h-px flex-1 bg-neutral-100" />
                    <span className="text-[10px] font-black text-neutral-200 uppercase tracking-[0.5em]">Bauhaus System 2026</span>
                </div>
            </div>
        
                </>
            )}
            </div>
    )
}
