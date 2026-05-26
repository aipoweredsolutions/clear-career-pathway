import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

export interface TemplateProps {
    data: ResumeDocument
    className?: string
    accentColor?: string
}

// -- Helpers & Types --
const getThemeClasses = (accentColor: string) => ({
    borderColorClass: accentColor.replace('text-', 'border-').split(' ')[0],
    bgColorClass: accentColor.replace('text-', 'bg-').split(' ')[0],
    accentColor
})

type Theme = ReturnType<typeof getThemeClasses>

// -- Subcomponents --
const SectionHeader = ({ title, theme }: { title: string, theme: Theme }) => (
    <div className="flex items-center gap-4 mb-5 mt-8 ">
        <h2 className={cn("text-[12px] font-black uppercase tracking-[0.3em] shrink-0", theme.accentColor)}>
            {title}
        </h2>
        <div className="h-[1px] flex-1 bg-neutral-100" />
        <div className={cn("w-1.5 h-1.5 rotate-45 shrink-0", theme.bgColorClass)} />
    </div>
)

const ChronographMasthead = ({ data, theme }: { data: ResumeDocument, theme: Theme }) => {
    const { personalInfo } = data
    return (
        <header className="mb-10 border-b-2 border-neutral-50 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="flex-1">
                    <h1 className="text-[42px] font-black tracking-[-0.06em] leading-none mb-3 text-neutral-950 uppercase whitespace-nowrap truncate">
                        {personalInfo?.fullName || 'CHRONO PROFESSIONAL'}
                    </h1>
                    <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-neutral-400">
                        {personalInfo?.professionalTitle}
                    </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2 text-[11px] font-black uppercase tracking-widest text-neutral-400 text-left md:text-right">
                    <div>{[personalInfo?.city, personalInfo?.country].filter(Boolean).join(' // ')}</div>
                    <div className={cn("text-neutral-900", theme.accentColor)}>{personalInfo?.email}</div>
                    <div>{personalInfo?.phone}</div>
                    {personalInfo?.linkedinUrl && (
                        <div className="mt-2 pt-2 border-t border-neutral-50">
                            {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

const ChronographCoverLetter = ({ data, theme }: { data: ResumeDocument, theme: Theme }) => (
    <div className="max-w-2xl mx-auto py-10">
        <div className="mb-12 space-y-1 text-[14px]">
            <div className="text-neutral-300 font-black uppercase tracking-[0.3em] text-[10px] mb-8">Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            {data.coverLetter?.recipientName && <p className="font-black text-neutral-900">{data.coverLetter.recipientName}</p>}
            {data.coverLetter?.recipientTitle && <p className="text-neutral-400 font-black uppercase tracking-widest text-[11px]">{data.coverLetter.recipientTitle}</p>}
            {data.coverLetter?.companyName && <p className="font-black text-neutral-600 italic">{data.coverLetter.companyName}</p>}
        </div>

        <div className="prose prose-neutral max-w-none mb-16">
            {data.coverLetter?.content?.split('\n').map((para, i) => (
                <p key={i} className="text-[14px] leading-[1.85] mb-6 text-neutral-700 font-medium">
                    {para}
                </p>
            )) || <p className="text-neutral-300 italic text-[14px]">Narrative pending...</p>}
        </div>

        <div className="pt-10 border-t border-neutral-50 flex items-center gap-6">
            <div className={cn("w-12 h-12 rounded-full border-4", theme.borderColorClass)} />
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-1">Signed</p>
                <p className={cn("text-[24px] font-black tracking-tighter uppercase", theme.accentColor)}>{data.personalInfo?.fullName}</p>
            </div>
        </div>
    </div>
)

const ChronographReferences = ({ data, theme }: { data: ResumeDocument, theme: Theme }) => (
    <div className="space-y-16">
        <SectionHeader title="References" theme={theme} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data.references?.map((ref, i) => (
                <div key={i} className=" flex gap-8 p-8 border border-neutral-50 bg-neutral-50/20 rounded-lg group">
                    <div className={cn("w-1 h-full rounded-full transition-all group-hover:scale-y-110", theme.bgColorClass, "opacity-10 group-hover:opacity-100")} />
                    <div className="flex flex-col gap-2">
                        <span className="font-black text-neutral-950 text-[18px] tracking-tight">{ref.referenceName || ref.name}</span>
                        <div className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme.accentColor)}>
                            {ref.role || ref.title}
                        </div>
                        <div className="text-[14px] text-neutral-600 font-bold mb-4">
                            {ref.organization || ref.company}
                        </div>
                        <div className="text-[12px] text-neutral-400 font-black tabular-nums border-t border-neutral-100 pt-4">
                            {ref.contactDetails || ref.contactInfo}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const ChronographSummary = ({ summaryText, theme }: { summaryText: string, theme: Theme }) => (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
            <h2 className={cn("text-[11px] font-black uppercase tracking-[0.5em] text-neutral-300", theme.accentColor)}>Professional Summary</h2>
        </div>
        <div className="md:col-span-8">
            <p className="text-[16px] leading-[1.8] text-neutral-800 font-medium text-justify">
                {summaryText}
            </p>
        </div>
    </section>
)

const ChronographExperience = ({ workExperience, theme }: { workExperience: NonNullable<ResumeDocument['workExperience']>, theme: Theme }) => (
    <section>
        <SectionHeader title="Professional Experience" theme={theme} />
        <div className="space-y-8">
            {workExperience.map((job, i) => (
                <div key={i} className={cn("grid grid-cols-1 md:grid-cols-12 gap-10 group", job.forcePageBreak && "force-page-break")}>
                    {/* Temporal Meta */}
                    <div className="md:col-span-4 flex flex-col items-start md:items-end gap-2">
                        <div className="text-[12px] font-black text-neutral-950 tabular-nums uppercase tracking-widest bg-neutral-950 text-white px-3 py-1">
                            {job.startDate} — {job.isCurrent ? 'ACTIVE' : job.endDate}
                        </div>
                        <div className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-40", theme.accentColor)}>
                            {job.location}
                        </div>
                    </div>

                    {/* Narrative */}
                    <div className="md:col-span-8 relative">
                        <div className={cn("absolute -left-10 top-0 bottom-0 w-[2px]", theme.bgColorClass, "opacity-5 group-hover:opacity-30 transition-opacity")} />
                        <div className="flex flex-col gap-2 mb-6">
                            <h3 className="text-[22px] font-black text-neutral-950 tracking-tight leading-none group-hover:translate-x-1 transition-transform">
                                {job.jobTitle}
                            </h3>
                            <div className="text-[15px] font-black uppercase tracking-[0.15em] text-neutral-400">
                                {job.companyName}
                            </div>
                        </div>

                        {job.roleDescription && (
                            <p className="text-[14px] text-neutral-500 mb-4 leading-relaxed font-bold italic border-l-4 border-neutral-50 pl-6">
                                {job.roleDescription}
                            </p>
                        )}

                        {job.achievements && job.achievements.length > 0 && (
                            <ul className="space-y-4">
                                {job.achievements.map((ach, j) => (
                                    <li key={j} className="text-[14.5px] text-neutral-800 leading-relaxed flex gap-4 font-medium">
                                        <div className="flex flex-col items-center gap-1 shrink-0 mt-1.5">
                                            <div className={cn("w-1 h-1 rounded-full", theme.bgColorClass)} />
                                            <div className="w-[1px] h-full bg-neutral-100" />
                                        </div>
                                        <span>{ach.achievementText}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </section>
)

const ChronographSkills = ({ skills, theme }: { skills: NonNullable<ResumeDocument['skills']>, theme: Theme }) => (
    <section>
        <SectionHeader title="Technical Skills" theme={theme} />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
                <div className="text-[10px] font-black text-neutral-200 uppercase tracking-[0.5em] mb-4">Core Skillsets</div>
            </div>
            <div className="md:col-span-8">
                {(() => {
                    const grouped = skills.reduce((acc, skill) => {
                        const type = skill.skillType || 'professional'
                        if (!acc[type]) acc[type] = []
                        acc[type].push(skill)
                        return acc
                    }, {} as Record<string, typeof skills>)

                    return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                            {Object.entries(grouped).map(([type, list]) => (
                                <div key={type} className="">
                                    <div className={cn("text-[9px] font-black uppercase tracking-[0.4em] mb-4 opacity-40", theme.accentColor)}>
                                        {type}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {list.map((s, i) => (
                                            <div key={i} className="text-[14px] text-neutral-950 font-black tracking-tight flex items-center justify-between border-b border-neutral-50 pb-2 hover:border-neutral-200 transition-colors">
                                                {s.skillName}
                                                <div className={cn("w-2 h-2 rounded-full", theme.bgColorClass, "opacity-10")} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                })()}
            </div>
        </div>
    </section>
)

const ChronographEducation = ({ education, theme }: { education: NonNullable<ResumeDocument['education']>, theme: Theme }) => (
    <section>
        <SectionHeader title="Education" theme={theme} />
        <div className="space-y-12">
            {education.map((edu, i) => (
                <div key={i} className={cn("grid grid-cols-1 md:grid-cols-12 gap-10 group", edu.forcePageBreak && "force-page-break")}>
                    <div className="md:col-span-4 flex flex-col items-start md:items-end">
                        <div className="text-[12px] font-black text-neutral-950 tabular-nums tracking-widest border-2 border-neutral-950 px-3 py-1">
                            {edu.endYear}
                        </div>
                    </div>
                    <div className="md:col-span-8">
                        <h3 className="text-[20px] font-black text-neutral-950 tracking-tight leading-none mb-3 uppercase">
                            {edu.degree}{edu.major && ` // ${edu.major}`}
                        </h3>
                        <div className={cn("text-[12px] font-black uppercase tracking-[0.3em] opacity-40 mb-4", theme.accentColor)}>
                            {edu.institutionName}
                        </div>
                        {edu.gpa && (
                            <div className="inline-block bg-neutral-50 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest">
                                Metric: {edu.gpa}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </section>
)

const ChronographSupplemental = ({ 
    projects, 
    certifications, 
    languages, 
    theme 
}: { 
    projects?: ResumeDocument['projects'], 
    certifications?: ResumeDocument['certifications'], 
    languages?: ResumeDocument['languages'], 
    theme: Theme 
}) => {
    if (!certifications?.length && !languages?.length && !projects?.length) return null
    return (
        <section>
            <SectionHeader title="Additional Information" theme={theme} />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4" />
                <div className="md:col-span-8 space-y-16">
                    {projects && projects.length > 0 && (
                        <div className="space-y-10">
                            {projects.map((proj, i) => (
                                <div key={i} className={cn(proj.forcePageBreak && "force-page-break")}>
                                    <h4 className="text-[14px] font-black uppercase text-neutral-900 tracking-widest mb-3">{proj.projectName}</h4>
                                    <p className="text-[13px] text-neutral-500 font-medium leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-neutral-50">
                        {certifications && certifications.length > 0 && (
                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Certifications</div>
                                {certifications.map((c, i) => (
                                    <div key={i} className={cn("group", c.forcePageBreak && "force-page-break")}>
                                        <div className="text-[13px] font-black text-neutral-950 leading-tight group-hover:text-primary-600 transition-colors">{c.certificationName}</div>
                                        <div className={cn("text-[10px] font-black uppercase tracking-widest mt-1 opacity-40", theme.accentColor)}>{c.issuingOrganization}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {languages && languages.length > 0 && (
                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Languages</div>
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-neutral-50 pb-2">
                                        <span className="text-[14px] font-black text-neutral-950 tracking-tighter">{l.languageName}</span>
                                        <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] opacity-40", theme.accentColor)}>{l.proficiencyLevel}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}



/**
 * ATS Chronograph Template - Elite Overhaul
 * 
 * "Temporal Precision" design.
 * Focuses on chronometric layout, utilizing a left-aligned metadata column 
 * and a right-aligned narrative column. 
 * High-fidelity typography (Inter) with sharp geometric markers.
 */
export function ATSChronographTemplate({ data, className, accentColor = 'text-emerald-600' }: TemplateProps) {
    const theme = getThemeClasses(accentColor)

    return (
        <div 
            className={cn("w-full bg-white text-neutral-900 font-sans leading-relaxed p-10 md:p-12", className)}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            <ChronographMasthead data={data} theme={theme} />

            {/* DOCUMENT TYPE OVERRIDES */}
            {data.documentType === 'cover_letter' ? (
                <ChronographCoverLetter data={data} theme={theme} />
            ) : data.documentType === 'references' ? (
                <ChronographReferences data={data} theme={theme} />
            ) : (
                <div className="space-y-10">
                    {data.professionalSummary?.summaryText && (
                        <ChronographSummary summaryText={data.professionalSummary.summaryText} theme={theme} />
                    )}

                    {data.workExperience && data.workExperience.length > 0 && (
                        <ChronographExperience workExperience={data.workExperience} theme={theme} />
                    )}

                    {data.skills && data.skills.length > 0 && (
                        <ChronographSkills skills={data.skills} theme={theme} />
                    )}

                    {data.education && data.education.length > 0 && (
                        <ChronographEducation education={data.education} theme={theme} />
                    )}

                    <ChronographSupplemental 
                        projects={data.projects} 
                        certifications={data.certifications} 
                        languages={data.languages} 
                        theme={theme} 
                    />
                </div>
            )}
        </div>
    )
}
