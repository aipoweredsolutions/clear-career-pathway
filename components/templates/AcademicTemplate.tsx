import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface TemplateProps {
    data: ResumeDocument
    className?: string
}

export function AcademicTemplate({ data, className }: TemplateProps) {
    const { personalInfo, professionalSummary, workExperience, education, skills, publications, achievements } = data

    return (
        <div className={cn("w-full bg-white text-neutral-900 min-h-[11in] font-serif p-10 leading-tight", className)} style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            {/* Header - Academic Standard */}
            <header className="border-b-4 border-black pb-4 mb-6 text-center">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
                    {personalInfo?.fullName}
                </h1>
                <div className="flex justify-center flex-wrap gap-x-4 text-sm text-black">
                    {personalInfo?.professionalTitle && <span className="font-bold">{personalInfo.professionalTitle}</span>}
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
                </div>
                {personalInfo?.linkedinUrl && <div className="text-sm mt-1">{personalInfo.linkedinUrl}</div>}
            </header>

            {/* Two Column Layout for Summary/Skills */}
            <div className="grid grid-cols-1 gap-6 mb-6">
                {professionalSummary?.summaryText && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Research Interests</h2>
                        <p className="text-sm text-justify ml-2">
                            {professionalSummary.summaryText}
                        </p>
                    </section>
                )}
            </div>

            <div className="space-y-6">
                {/* Education - Top Priority in Academia */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Education</h2>
                        <div className="space-y-3 ml-2">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold">{edu.institutionName}, {edu.location}</div>
                                        <div className="italic">{edu.degree}{edu.major ? ` in ${edu.major}` : ''}</div>
                                        {edu.fieldOfStudy && <div className="text-sm">Concentration: {edu.fieldOfStudy}</div>}
                                    </div>
                                    <div className="text-sm font-medium">{edu.endYear}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications - Key for Academic */}
                {publications && publications.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Publications</h2>
                        <ul className="list-decimal list-outside ml-6 space-y-2 text-sm">
                            {publications.map((pub, i) => (
                                <li key={i}>
                                    <span className="font-bold">{pub.title}</span>. {pub.platformOrPublisher}, {pub.publicationYear}.
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Experience */}
                {workExperience && workExperience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Professional Experience</h2>
                        <div className="space-y-4 ml-2">
                            {workExperience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline font-bold text-sm">
                                        <span>{exp.jobTitle}, {exp.companyName}</span>
                                        <span>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div className="text-sm mt-1 text-justify">
                                        {exp.roleDescription}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills - Simple List */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Skills</h2>
                        <div className="ml-2 text-sm">
                            {skills.map(s => s.skillName).join(' • ')}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
