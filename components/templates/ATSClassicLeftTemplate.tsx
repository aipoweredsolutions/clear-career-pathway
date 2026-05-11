import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { MapPin, Phone, Mail, Globe, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
}

export function ATSClassicLeftTemplate({ data }: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        languages,
        customSections,
    } = data

    // Configuration for the left sidebar offset
    const leftColumnWidth = '180px'
    const gap = '32px'

    const formatLocation = (city?: string, country?: string) => {
        if (city && country) return `${city}, ${country}`
        return city || country || ''
    }

    return (
        <div className="w-full max-w-[850px] mx-auto bg-white p-10 md:p-14 text-neutral-900 font-serif" style={{ minHeight: '1100px' }}>
            
            {/* Header Section */}
            <header className="text-center mb-10">
                <h1 className="text-[28px] font-bold text-neutral-900 mb-2 leading-tight">
                    {personalInfo?.fullName || 'Christopher Carter'}
                    {personalInfo?.professionalTitle && <span className="font-normal">, {personalInfo.professionalTitle}</span>}
                </h1>
                
                <div className="text-sm text-neutral-600 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                    {formatLocation(personalInfo?.city, personalInfo?.country) && (
                        <span>{formatLocation(personalInfo?.city, personalInfo?.country)}</span>
                    )}
                    {personalInfo?.phone && (
                        <>
                            <span className="text-neutral-300">•</span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {personalInfo?.email && (
                        <>
                            <span className="text-neutral-300">•</span>
                            <span>{personalInfo.email}</span>
                        </>
                    )}
                    {personalInfo?.linkedinUrl && (
                        <>
                            <span className="text-neutral-300">•</span>
                            <span>{personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </>
                    )}
                    {personalInfo?.websiteUrl && (
                        <>
                            <span className="text-neutral-300">•</span>
                            <span>{personalInfo.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </>
                    )}
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
                    <h2 className={cn("text-sm font-black uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2", '')}>Professional References</h2>
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


            <div className="flex flex-col gap-8">

                {/* PROFILE SECTION */}
                {(professionalSummary?.summaryText || professionalSummary?.headline) && (
                    <section className="border-t border-neutral-300 pt-6">
                        <h2 className="uppercase tracking-widest font-bold text-[11px] text-neutral-900 mb-4 font-sans" style={{ width: leftColumnWidth }}>
                            Profile
                        </h2>
                        <div style={{ paddingLeft: `calc(${leftColumnWidth} + ${gap})`, marginTop: '-34px' }}>
                            {professionalSummary.headline && (
                                <p className="font-bold mb-2 text-sm text-neutral-800">{professionalSummary.headline}</p>
                            )}
                            <div className="text-[13px] leading-relaxed text-neutral-700 whitespace-pre-wrap">
                                {professionalSummary.summaryText}
                            </div>
                        </div>
                    </section>
                )}

                {/* EDUCATION SECTION */}
                {education && education.length > 0 && (
                    <section className="border-t border-neutral-300 pt-6">
                        <h2 className="uppercase tracking-widest font-bold text-[11px] text-neutral-900 mb-6 font-sans">
                            Education
                        </h2>
                        <div className="flex flex-col gap-6" style={{ paddingLeft: `calc(${leftColumnWidth} + ${gap})` }}>
                            {education.map((edu, idx) => (
                                <div key={edu.id || idx} className="break-inside-avoid relative">
                                    <div 
                                        className="absolute top-[2px] text-[11px] text-neutral-500 font-sans tracking-wide"
                                        style={{ left: `calc(-1 * (${leftColumnWidth} + ${gap}))`, width: leftColumnWidth }}
                                    >
                                        {edu.startYear} - {edu.endYear || 'Present'}
                                    </div>
                                    
                                    <div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-[15px] font-bold text-neutral-900">
                                                {edu.degree}{edu.major ? `, ${edu.major}` : ''}
                                            </h3>
                                            <span className="text-[11px] text-neutral-500 font-sans">
                                                {formatLocation(edu.location)}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-neutral-800 mb-1">{edu.institutionName}</p>
                                        {(edu.gpa || edu.achievements) && (
                                            <div className="text-[12px] text-neutral-600 mt-2 space-y-1">
                                                {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                                {edu.achievements && <p className="whitespace-pre-wrap">{edu.achievements}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* EXPERIENCE SECTION */}
                {workExperience && workExperience.length > 0 && (
                    <section className="border-t border-neutral-300 pt-6">
                        <h2 className="uppercase tracking-widest font-bold text-[11px] text-neutral-900 mb-6 font-sans">
                            Experience
                        </h2>
                        <div className="flex flex-col gap-6" style={{ paddingLeft: `calc(${leftColumnWidth} + ${gap})` }}>
                            {workExperience.map((job, idx) => (
                                <div key={job.id || idx} className="break-inside-avoid relative">
                                    <div 
                                        className="absolute top-[2px] text-[11px] text-neutral-500 font-sans tracking-wide"
                                        style={{ left: `calc(-1 * (${leftColumnWidth} + ${gap}))`, width: leftColumnWidth }}
                                    >
                                        {job.startDate} - {job.isCurrent ? 'Present' : job.endDate}
                                    </div>
                                    
                                    <div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-[15px] font-bold text-neutral-900">
                                                {job.jobTitle}, {job.companyName}
                                            </h3>
                                            <span className="text-[11px] text-neutral-500 font-sans">
                                                {job.location}
                                            </span>
                                        </div>
                                        
                                        {job.roleDescription && (
                                            <div className="text-[13px] leading-relaxed text-neutral-700 mb-2 whitespace-pre-wrap italic">
                                                {job.roleDescription}
                                            </div>
                                        )}

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="list-disc list-outside ml-4 text-[13px] leading-relaxed text-neutral-700 space-y-1">
                                                {job.achievements.map((ach, i) => (
                                                    <li key={ach.id || i} className="pl-1">
                                                        {ach.achievementText}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* SKILLS SECTION */}
                {skills && skills.length > 0 && (
                    <section className="border-t border-neutral-300 pt-6">
                        <h2 className="uppercase tracking-widest font-bold text-[11px] text-neutral-900 mb-6 font-sans">
                            Skills
                        </h2>
                        <div className="flex flex-col gap-3" style={{ paddingLeft: `calc(${leftColumnWidth} + ${gap})` }}>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                {skills.map((skill, idx) => (
                                    <div key={skill.id || idx} className="flex justify-between items-baseline border-b border-neutral-100 pb-1">
                                        <span className="text-[13px] text-neutral-900 font-bold">{skill.skillName}</span>
                                        {skill.proficiencyLevel && (
                                            <span className="text-[11px] text-neutral-500 font-sans">{skill.proficiencyLevel}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* LANGUAGES SECTION */}
                {languages && languages.length > 0 && (
                    <section className="border-t border-neutral-300 pt-6">
                        <h2 className="uppercase tracking-widest font-bold text-[11px] text-neutral-900 mb-6 font-sans">
                            Languages
                        </h2>
                        <div className="flex flex-col gap-3" style={{ paddingLeft: `calc(${leftColumnWidth} + ${gap})` }}>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                {languages.map((lang, idx) => (
                                    <div key={lang.id || idx} className="flex justify-between items-baseline border-b border-neutral-100 pb-1">
                                        <span className="text-[13px] text-neutral-900 font-bold">{lang.languageName}</span>
                                        <span className="text-[11px] text-neutral-500 font-sans">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CUSTOM SECTIONS (Hobbies, etc) */}
                {customSections && customSections.length > 0 && customSections.map((section, idx) => (
                    <section key={section.id || idx} className="break-inside-avoid border-t border-neutral-300 pt-6">
                        <h2 className="uppercase tracking-widest font-bold text-[11px] text-neutral-900 mb-6 font-sans">
                            {section.title}
                        </h2>
                        <div style={{ paddingLeft: `calc(${leftColumnWidth} + ${gap})` }}>
                            {section.content && (
                                <div className="text-[13px] leading-relaxed text-neutral-700 whitespace-pre-wrap mb-4">
                                    {section.content}
                                </div>
                            )}
                            {section.items && section.items.length > 0 && (
                                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-neutral-800">
                                    {section.items.map((item, i) => (
                                        <li key={item.id || i} className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-neutral-300" />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                ))}

            </div>
        
                </>
            )}
            </div>
    )
}
