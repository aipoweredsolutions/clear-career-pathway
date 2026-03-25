import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import NextImage from 'next/image'
import { 
    Mail, Phone, MapPin, Linkedin, Globe, Award, Star, 
    Utensils, Flame, Coffee, Briefcase, GraduationCap, 
    Anchor, Ship, ShieldCheck, Waves, Compass, Languages,
    Menu, ChefHat, Bell, ConciergeBell
} from 'lucide-react'

interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
    variant?: 'cruise' | 'culinary' | 'hotel' | 'elite'
}

/**
 * HospitalityProTemplate
 * A unified professional template for the hospitality industry.
 * Supports specialized modes for Maritime/Cruise, Culinary/Chefs, and Luxury Hotel/Service.
 */
export function HospitalityProTemplate({ 
    data, 
    className, 
    accentColor = 'text-amber-700',
    variant = 'hotel' 
}: TemplateProps) {
    const {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        certifications,
        languages,
        achievements,
        projects,
        volunteerExperience,
        professionalAffiliations,
        customSections
    } = data

    // Dynamic configuration based on variant
    const config = {
        cruise: {
            headerBg: 'bg-slate-900',
            headerText: 'text-white',
            sidebarBg: 'bg-slate-50/80',
            fontFamily: 'font-sans',
            primaryIcon: Ship,
            accentIcon: Anchor,
            decorativeIcon: Waves,
            sidebarSide: 'left' as const,
            borderColor: 'border-slate-100',
            pillBg: 'bg-blue-600',
            pillText: 'text-white'
        },
        culinary: {
            headerBg: 'bg-slate-950',
            headerText: 'text-white',
            sidebarBg: 'bg-slate-50',
            fontFamily: 'font-sans',
            primaryIcon: ChefHat,
            accentIcon: Utensils,
            decorativeIcon: Flame,
            sidebarSide: 'left' as const,
            borderColor: 'border-slate-200',
            pillBg: 'bg-red-700',
            pillText: 'text-white'
        },
        hotel: {
            headerBg: 'bg-slate-50/30',
            headerText: 'text-slate-900',
            sidebarBg: 'bg-white',
            fontFamily: 'font-serif',
            primaryIcon: ConciergeBell,
            accentIcon: Star,
            decorativeIcon: Bell,
            sidebarSide: 'left' as const,
            borderColor: 'border-slate-100',
            pillBg: 'bg-amber-600',
            pillText: 'text-white'
        },
        elite: {
            headerBg: 'bg-white',
            headerText: 'text-slate-900',
            sidebarBg: 'bg-slate-50',
            fontFamily: 'font-serif',
            primaryIcon: Award,
            accentIcon: ShieldCheck,
            decorativeIcon: Star,
            sidebarSide: 'left' as const,
            borderColor: 'border-slate-200',
            pillBg: 'bg-slate-800',
            pillText: 'text-white'
        }
    }[variant]

    const getBgColor = () => {
        const color = accentColor.replace('text-', '')
        if (color.includes('amber')) return 'bg-amber-700'
        if (color.includes('blue')) return 'bg-blue-800'
        if (color.includes('red')) return 'bg-red-700'
        if (color.includes('green')) return 'bg-green-800'
        if (color.includes('slate')) return 'bg-slate-800'
        if (color.includes('orange')) return 'bg-orange-600'
        return `bg-${color}`
    }

    const bgColor = getBgColor()

    return (
        <div className={cn(
            "w-full bg-white min-h-[297mm] flex flex-col relative", 
            config.fontFamily,
            className
        )}>
            {/* Unified Header */}
            <header className={cn(
                "p-12 flex justify-between items-center relative overflow-hidden",
                config.headerBg,
                config.headerText,
                variant === 'hotel' && "border-b-4 border-double border-slate-200 text-center flex-col gap-6"
            )}>
                {/* Decorative Background Icon */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <config.decorativeIcon className="w-full h-full scale-150 rotate-12" />
                </div>

                <div className={cn(
                    "z-10 flex flex-col gap-2 relative",
                    variant === 'hotel' ? "items-center" : "items-start"
                )}>
                    {variant !== 'hotel' && (
                        <div className="flex items-center gap-4 mb-2">
                            <config.accentIcon className={cn("w-8 h-8", accentColor)} />
                            <div className={cn("h-0.5 w-12", variant === 'cruise' ? "bg-white/20" : "bg-slate-200")} />
                        </div>
                    )}
                    
                    <h1 className={cn(
                        "font-black tracking-tighter uppercase leading-none italic",
                        variant === 'hotel' ? "text-6xl font-light not-italic tracking-[0.2em]" : "text-7xl"
                    )}>
                        {personalInfo?.fullName || 'Professional User'}
                    </h1>
                    
                    <p className={cn(
                        "font-bold tracking-[0.3em] uppercase italic opacity-80",
                        variant === 'hotel' ? "text-xl font-medium not-italic tracking-[0.4em] mt-2" : "text-2xl"
                    )}>
                        {personalInfo?.professionalTitle || 'Hospitality Expert'}
                    </p>

                    <div className={cn(
                        "flex flex-wrap gap-6 mt-8 text-[11px] font-black uppercase tracking-[0.2em] opacity-60",
                        variant === 'hotel' && "justify-center mt-4"
                    )}>
                        {personalInfo?.email && <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {personalInfo.email}</span>}
                        {personalInfo?.phone && <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {personalInfo.phone}</span>}
                        {(personalInfo?.city || personalInfo?.country) && <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {[personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>}
                    </div>
                </div>

                {/* Photo Section */}
                {personalInfo?.photoUrl ? (
                    <div className="relative z-10 shrink-0 mt-4 md:mt-0">
                        <div className={cn(
                            "w-52 h-52 overflow-hidden shadow-2xl relative",
                            variant === 'culinary' ? "rounded-2xl border-4 border-slate-700" : "rounded-full border-4 border-white"
                        )}>
                            <NextImage
                                src={personalInfo.photoUrl}
                                alt={personalInfo.fullName || 'Professional'}
                                fill
                                className="object-cover"
                                unoptimized={personalInfo.photoUrl.startsWith('data:')}
                            />
                        </div>
                        {variant === 'cruise' && (
                            <div className="absolute -bottom-4 right-1/2 translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
                                Certified Officer
                            </div>
                        )}
                    </div>
                ) : variant === 'hotel' ? null : (
                    <div className="w-48 h-48 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center opacity-40 z-10">
                        <config.primaryIcon className="w-12 h-12 mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Photo</span>
                    </div>
                )}
            </header>

            <div className={cn(
                "flex flex-1 overflow-hidden",
                (config.sidebarSide as string) === 'right' && "flex-row-reverse"
            )}>
                {/* Secondary Content Bar (Sidebar) */}
                <aside className={cn(
                    "w-80 flex flex-col gap-10 p-10 border-r",
                    config.sidebarBg,
                    config.borderColor,
                    variant === 'culinary' && "italic"
                )}>
                    {/* Skills Mode */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.4em] mb-6 pb-2 border-b-2", accentColor, config.borderColor)}>
                                Signature Skills
                            </h2>
                            <div className="flex flex-col gap-4">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[13px] font-black uppercase italic tracking-tighter text-slate-800">{skill.skillName}</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">{skill.proficiencyLevel}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                                            <div 
                                                className={cn("h-full transition-all duration-1000", bgColor)}
                                                style={{ 
                                                    width: skill.proficiencyLevel === 'expert' ? '100%' : 
                                                           skill.proficiencyLevel === 'advanced' ? '80%' : 
                                                           skill.proficiencyLevel === 'intermediate' ? '60%' : '40%' 
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certs & Licensure */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.4em] mb-6 pb-2 border-b-2", accentColor, config.borderColor)}>
                                Licensure & Certs
                            </h2>
                            <div className="space-y-6">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <config.accentIcon className={cn("w-5 h-5 shrink-0 mt-1 opacity-50", accentColor)} />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-black text-slate-800 leading-tight uppercase italic">{cert.certificationName}</span>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-widest">{cert.issuingOrganization}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Communications / Languages */}
                    {languages && languages.length > 0 && (
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 italic">
                            <h2 className={cn("text-[10px] font-black uppercase tracking-[0.4em] mb-4 not-italic", accentColor)}>
                                Communication
                            </h2>
                            <div className="space-y-4">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                                        <span className="text-slate-800">{lang.languageName}</span>
                                        <span className="text-slate-400 italic text-[9px]">{lang.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Affiliations */}
                    {professionalAffiliations && professionalAffiliations.length > 0 && (
                        <section>
                            <h2 className={cn("text-xs font-black uppercase tracking-[0.4em] mb-4 pb-2 border-b-2", accentColor, config.borderColor)}>
                                Affiliations
                            </h2>
                            <div className="space-y-4 font-sans not-italic">
                                {professionalAffiliations.map((aff, i) => (
                                    <div key={i} className="flex flex-col gap-0.5">
                                        <span className="text-[12px] font-bold text-slate-800 leading-tight">{aff.organizationName}</span>
                                        <span className="text-[10px] text-slate-500 uppercase font-medium">{aff.roleOrMembership}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-14 flex flex-col gap-14 overflow-hidden bg-white">
                    {/* Professional Statement */}
                    {professionalSummary?.summaryText && (
                        <section className={cn(
                            "relative italic",
                            variant === 'culinary' ? "bg-slate-50 p-8 rounded-3xl border-l-8 border-slate-900" : "text-center px-12"
                        )}>
                            {variant === 'hotel' && <span className="absolute top-0 left-0 text-7xl text-slate-100 -translate-y-6 select-none leading-none font-serif">&ldquo;</span>}
                            <p className={cn(
                                "text-slate-600 leading-relaxed font-light",
                                variant === 'culinary' ? "text-2xl font-medium" : "text-xl"
                            )}>
                                {professionalSummary.summaryText}
                            </p>
                            {variant === 'hotel' && <span className="absolute bottom-0 right-0 text-7xl text-slate-100 translate-y-6 select-none leading-none font-serif">&rdquo;</span>}
                        </section>
                    )}

                    {/* Professional Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section className="space-y-10">
                            <h2 className={cn("text-sm font-black uppercase tracking-[0.5em] flex items-center gap-8", accentColor)}>
                                <span className="whitespace-nowrap">Career Record</span>
                                <div className="h-px flex-1 bg-slate-100" />
                            </h2>

                            <div className="space-y-16">
                                {workExperience.map((job, i) => (
                                    <div key={i} className="flex flex-col gap-4 relative">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">
                                                {job.jobTitle}
                                            </h3>
                                            <div className={cn(
                                                "text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shrink-0 ml-4",
                                                config.pillBg, config.pillText
                                            )}>
                                                {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                                            <Briefcase className="w-5 h-5 text-slate-200" />
                                            {job.companyName} {job.location && <span className="opacity-30">|</span>} {job.location}
                                        </div>
                                        {job.roleDescription && (
                                            <p className="text-lg text-slate-600 font-light leading-relaxed italic">{job.roleDescription}</p>
                                        )}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <div className="grid grid-cols-1 gap-4 mt-2">
                                                {job.achievements.map((ach, j) => (
                                                    <div key={j} className="flex gap-4 text-slate-700 italic border-l-4 border-slate-50 pl-6 group-hover:border-slate-100 transition-colors">
                                                        <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0 opacity-40 shadow-sm", bgColor)} />
                                                        <span className="text-base font-light leading-snug">{ach.achievementText}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Academic Foundation & Recognition */}
                    <div className="grid grid-cols-2 gap-14 mt-auto pt-14 border-t border-slate-50">
                        {education && education.length > 0 && (
                            <section className="space-y-8">
                                <h2 className={cn("text-xs font-black uppercase tracking-[0.4em]", accentColor)}>
                                    Academic Record
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu, i) => (
                                        <div key={i} className="flex flex-col gap-1 border-l-2 pl-4 border-slate-100 italic">
                                            <span className="text-lg font-black text-slate-800 leading-tight uppercase">{edu.degree}</span>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{edu.institutionName} • {edu.endYear}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {achievements && achievements.length > 0 && (
                            <section className="space-y-8">
                                <h2 className={cn("text-xs font-black uppercase tracking-[0.4em]", accentColor)}>
                                    Awards & Honors
                                </h2>
                                <div className="space-y-6">
                                    {achievements.map((ach, i) => (
                                        <div key={i} className="flex gap-3 group">
                                            <config.accentIcon className={cn("w-5 h-5 shrink-0 mt-1 opacity-30", accentColor)} />
                                            <div className="flex flex-col">
                                                <span className="text-base font-black text-slate-800 leading-tight uppercase italic">{ach.achievementTitle}</span>
                                                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-widest">{ach.issuingBody}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>
            </div>

            {/* Nautical / Hospitality Base */}
            <footer className={cn("h-4 w-full flex justify-center", bgColor)}>
                <div className="w-1/3 h-full bg-slate-950/20" />
            </footer>
        </div>
    )
}
