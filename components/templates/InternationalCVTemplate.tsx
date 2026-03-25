import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Globe, Plane, Award, MapPin, Mail, Phone, Linkedin, User, Calendar, Flag } from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

export function InternationalCVTemplate({ data, className, accentColor = 'bg-blue-900 border-blue-900' }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, certifications, projects, languages, achievements, customSections, professionalAffiliations } = data

    // Professional, internationally-focussed CV. 
    // Emphasizes personal details (as expected in EU/Middle East/Asia), 
    // languages, and global career progression.
    return (
        <div className={cn('w-full bg-white min-h-[297mm] font-sans text-sm text-neutral-900 flex flex-col', className)}>
            <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
                {/* Lateral Sidebar (Common in International CVs) */}
                <aside className={cn('col-span-4 p-10 space-y-12 text-white/90 shadow-2xl z-10', accentColor)}>
                    {/* Photo & Identity */}
                    <div className="flex flex-col items-center justify-center text-center space-y-6 mb-12">
                        {personalInfo?.photoUrl ? (
                            <div className="w-48 h-48 rounded-3xl overflow-hidden border-8 border-white/20 shadow-2xl relative">
                                <Image src={personalInfo.photoUrl} alt={personalInfo.fullName || 'Photo'} fill className="object-cover" unoptimized={personalInfo.photoUrl.startsWith('data:')} />
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-3xl bg-white/10 flex items-center justify-center border-4 border-dashed border-white/20">
                                <User className="w-16 h-16 text-white/30" />
                            </div>
                        )}
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none text-white">{personalInfo?.fullName}</h1>
                            <p className="text-sm font-bold uppercase tracking-widest text-white/60">{personalInfo?.professionalTitle || "Professional Curriculum Vitae"}</p>
                        </div>
                    </div>

                    {/* Personal Details (Required for many International CV formats) */}
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-6 flex items-center gap-2">
                            <div className="w-1 h-3 bg-white" /> Personal Information
                        </h2>
                        <div className="space-y-4 text-xs">
                            <div className="flex items-center gap-4">
                                <Mail className="w-4 h-4 text-white/40" />
                                <span className="font-bold tracking-tight lowercase truncate">{personalInfo?.email}</span>
                            </div>
                            {personalInfo?.phone && (
                                <div className="flex items-center gap-4">
                                    <Phone className="w-4 h-4 text-white/40" />
                                    <span className="font-bold tabular-nums">{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo?.location && (
                                <div className="flex items-center gap-4">
                                    <MapPin className="w-4 h-4 text-white/40" />
                                    <span className="font-bold tracking-tight">{personalInfo.location}</span>
                                </div>
                            )}
                            {personalInfo?.linkedinUrl && (
                                <div className="flex items-center gap-4">
                                    <Linkedin className="w-4 h-4 text-white/40" />
                                    <span className="font-bold tracking-tight text-[10px] italic">LinkedIn Profile</span>
                                </div>
                            )}
                            {/* Dummy Global Persona Info (Typically found in these formats) */}
                            <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-4">
                                <Flag className="w-4 h-4 text-white/40" />
                                <span className="font-bold tracking-tight uppercase tracking-widest">Global Mobility: Active</span>
                            </div>
                        </div>
                    </section>

                    {/* Multilingual Proficiency */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 flex items-center gap-2">
                                <div className="w-1 h-3 bg-white" /> Languages
                            </h2>
                            <div className="space-y-6">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.1em]">
                                            <span>{lang.languageName}</span>
                                            <span className="text-[10px] text-white/40">{lang.proficiencyLevel}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                                                style={{ width: `${lang.proficiencyLevel === 'native' ? '100%' : lang.proficiencyLevel === 'fluent' ? '85%' : lang.proficiencyLevel === 'intermediate' ? '60%' : '35%'}` }} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Technical & Soft Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 flex items-center gap-2">
                                <div className="w-1 h-3 bg-white" /> Key Competencies
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all duration-300">
                                        {skill.skillName}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main: Experience & Professional Journey */}
                <main className="col-span-8 p-12 space-y-12 bg-white">
                    {/* Professional Summary */}
                    {professionalSummary?.summaryText && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-3">
                                <Plane className="w-4 h-4 text-blue-900" /> Career Profile
                            </h2>
                            <p className="text-[14px] leading-relaxed text-neutral-700 font-medium">
                                {professionalSummary.summaryText}
                            </p>
                        </section>
                    )}

                    {/* Professional Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 mb-10 flex items-center gap-3">
                                <Globe className="w-4 h-4 text-blue-900" /> Global Experience
                            </h2>
                            <div className="space-y-12 relative border-l-2 border-neutral-100 pl-8 ml-2">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="relative group">
                                        <div className="absolute top-1 -left-[41px] w-6 h-6 rounded-full bg-white border-2 border-neutral-200 group-hover:border-blue-900 transition-all duration-300 flex items-center justify-center p-1 shadow-sm">
                                            <div className="w-full h-full rounded-full bg-neutral-100 group-hover:bg-blue-900 transition-all duration-300" />
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-2 gap-2">
                                            <h3 className="text-xl font-black text-neutral-900 tracking-tighter leading-none uppercase">{job.jobTitle}</h3>
                                            <span className="text-xs font-black text-blue-900/60 tabular-nums uppercase underline underline-offset-4 decoration-2 decoration-blue-900/10">{job.startDate} – {job.isCurrent ? 'Present' : job.endDate}</span>
                                        </div>
                                        <div className="text-sm font-black text-neutral-500 mb-4 flex items-center gap-2">
                                            {job.companyName} {job.location && <span className="text-[11px] font-bold opacity-40 uppercase ml-auto tracking-widest">{job.location}</span>}
                                        </div>
                                        {job.roleDescription && <p className="text-[13px] text-neutral-700 leading-snug mb-4 font-medium italic">{job.roleDescription}</p>}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className="grid grid-cols-1 gap-3">
                                                {job.achievements.map((ach, j) => (
                                                    <li key={j} className="flex gap-4 text-[13px] text-neutral-800 leading-snug items-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-900/20 mt-2 shrink-0 group-hover:bg-blue-900 transition-colors" />
                                                        <span>{ach.achievementText}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Academic Foundation */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 mb-8 flex items-center gap-3">
                                <Award className="w-4 h-4 text-blue-900" /> Academic Foundation
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-neutral-100 pt-8">
                                {education.map((edu, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="font-black text-sm text-neutral-900 tracking-tight uppercase leading-tight mb-1">{edu.institutionName}</div>
                                        <div className="text-xs font-bold text-neutral-500 mb-2">{edu.degree}{edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ''}</div>
                                        <div className="text-[10px] font-black text-blue-900/50 tabular-nums uppercase tracking-[0.2em]">{edu.endYear}</div>
                                        {edu.achievements && <p className="text-[11px] text-neutral-400 mt-2 font-medium italic">{edu.achievements}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* International Certifications & Recognition */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 font-serif">Credentialing & Awards</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex gap-6 items-center p-5 bg-neutral-50 border-r-4 border-blue-900 rounded-xl">
                                        <Award className="w-8 h-8 text-blue-900/10" />
                                        <div>
                                            <div className="font-black text-xs uppercase tracking-tight text-neutral-900">{cert.certificationName}</div>
                                            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{cert.issuingOrganization}</div>
                                        </div>
                                        {cert.issueYear && <div className="text-[10px] text-blue-900 font-black ml-auto tabular-nums">{cert.issueYear}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
            
            <footer className="p-8 text-center text-[10px] font-black uppercase tracking-[0.8em] text-neutral-300 border-t border-neutral-50">
                Global Standards Compliant
            </footer>
        </div>
    )
}
