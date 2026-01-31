import React from 'react'
import { Skill, SkillType } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

interface SkillsSectionProps {
    skills: Skill[]
    className?: string
    layout?: 'categorized' | 'inline' | 'grid' | 'two-column' | 'proficiency'
    sectionTitle?: string
    accentColor?: string
}

/**
 * ATS-Compliant Skills Section Component
 * 
 * This component provides multiple layout options for displaying skills
 * while maintaining ATS compatibility. All layouts use plain text and
 * standard formatting that can be parsed by Applicant Tracking Systems.
 */
export function ATSSkillsSection({
    skills,
    className,
    layout = 'categorized',
    sectionTitle = 'Skills',
    accentColor = 'text-neutral-900'
}: SkillsSectionProps) {
    if (!skills || skills.length === 0) return null

    // Group skills by type for categorized layouts
    const groupedSkills = skills.reduce((acc, skill) => {
        const type = skill.skillType || 'professional'
        if (!acc[type]) acc[type] = []
        acc[type].push(skill)
        return acc
    }, {} as Record<SkillType | string, Skill[]>)

    // Group skills by proficiency level
    const skillsByProficiency = skills.reduce((acc, skill) => {
        const level = skill.proficiencyLevel || 'advanced'
        if (!acc[level]) acc[level] = []
        acc[level].push(skill)
        return acc
    }, {} as Record<string, Skill[]>)

    const renderCategorizedLayout = () => (
        <div className="space-y-3">
            {Object.entries(groupedSkills).map(([type, skillsList]) => (
                <div key={type} className="flex gap-4">
                    <div className="w-32 flex-shrink-0">
                        <span className="text-xs font-bold text-neutral-700 capitalize">
                            {type === 'technical' ? 'Technical' :
                                type === 'professional' ? 'Professional' :
                                    type === 'tool' ? 'Tools' :
                                        type === 'industry' ? 'Industry' : type}:
                        </span>
                    </div>
                    <div className="flex-1 text-xs text-neutral-800">
                        {skillsList.map(s => s.skillName).join(', ')}
                    </div>
                </div>
            ))}
        </div>
    )

    const renderInlineLayout = () => (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-800">
            {skills.map((skill, index) => (
                <React.Fragment key={skill.id || index}>
                    <span>{skill.skillName}</span>
                    {index < skills.length - 1 && <span className="text-neutral-400">•</span>}
                </React.Fragment>
            ))}
        </div>
    )

    const renderGridLayout = () => {
        // Calculate optimal columns based on skill count
        const cols = skills.length > 20 ? 4 : skills.length > 12 ? 3 : 2
        return (
            <div className={cn(
                "grid gap-x-6 gap-y-2 text-xs",
                cols === 4 ? "grid-cols-4" : cols === 3 ? "grid-cols-3" : "grid-cols-2"
            )}>
                {skills.map((skill, index) => (
                    <div key={skill.id || index} className="text-neutral-800">
                        {skill.skillName}
                    </div>
                ))}
            </div>
        )
    }

    const renderTwoColumnLayout = () => {
        const midpoint = Math.ceil(skills.length / 2)
        const leftColumn = skills.slice(0, midpoint)
        const rightColumn = skills.slice(midpoint)

        return (
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div className="space-y-1">
                    {leftColumn.map((skill, index) => (
                        <div key={skill.id || index} className="flex items-start gap-2 text-xs">
                            <span className="text-neutral-400 mt-0.5">•</span>
                            <span className="text-neutral-800">{skill.skillName}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-1">
                    {rightColumn.map((skill, index) => (
                        <div key={skill.id || index} className="flex items-start gap-2 text-xs">
                            <span className="text-neutral-400 mt-0.5">•</span>
                            <span className="text-neutral-800">{skill.skillName}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderProficiencyLayout = () => {
        const proficiencyOrder = ['expert', 'advanced', 'intermediate', 'beginner']
        const orderedLevels = proficiencyOrder.filter(level => skillsByProficiency[level])

        return (
            <div className="space-y-3">
                {orderedLevels.map(level => (
                    <div key={level}>
                        <div className="text-xs font-bold text-neutral-700 capitalize mb-1">
                            {level}
                        </div>
                        <div className="text-xs text-neutral-800 ml-4">
                            {skillsByProficiency[level].map(s => s.skillName).join(', ')}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <section className={className}>
            <h2 className={cn(
                "text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2",
                accentColor
            )}>
                {sectionTitle}
            </h2>
            {layout === 'categorized' && renderCategorizedLayout()}
            {layout === 'inline' && renderInlineLayout()}
            {layout === 'grid' && renderGridLayout()}
            {layout === 'two-column' && renderTwoColumnLayout()}
            {layout === 'proficiency' && renderProficiencyLayout()}
        </section>
    )
}

/**
 * Compact Skills Section for sidebar layouts
 */
export function CompactSkillsSection({
    skills,
    className,
    sectionTitle = 'Skills',
    accentColor = 'text-neutral-900',
    showProficiency = false
}: {
    skills: Skill[]
    className?: string
    sectionTitle?: string
    accentColor?: string
    showProficiency?: boolean
}) {
    if (!skills || skills.length === 0) return null

    return (
        <section className={className}>
            <h3 className={cn(
                "text-sm font-bold uppercase tracking-wider mb-3",
                accentColor
            )}>
                {sectionTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <div key={skill.id || index} className="flex flex-col">
                        <span className="text-xs font-medium text-neutral-800">
                            {skill.skillName}
                        </span>
                        {showProficiency && skill.proficiencyLevel && (
                            <span className="text-[10px] text-neutral-500 uppercase">
                                {skill.proficiencyLevel}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

/**
 * Technical Skills Section with categorization
 * Optimized for technical/IT resumes
 */
export function TechnicalSkillsSection({
    skills,
    className,
    accentColor = 'text-neutral-900'
}: {
    skills: Skill[]
    className?: string
    accentColor?: string
}) {
    if (!skills || skills.length === 0) return null

    const groupedSkills = skills.reduce((acc, skill) => {
        const type = skill.skillType || 'other'
        if (!acc[type]) acc[type] = []
        acc[type].push(skill)
        return acc
    }, {} as Record<string, Skill[]>)

    // Define display order and labels for technical categories
    const categoryLabels: Record<string, string> = {
        technical: 'Languages & Frameworks',
        tool: 'Tools & Platforms',
        industry: 'Technologies',
        professional: 'Methodologies'
    }

    return (
        <section className={className}>
            <h2 className={cn(
                "text-lg font-bold uppercase tracking-wide mb-4 pb-1 border-b-2",
                accentColor
            )}>
                Technical Skills
            </h2>
            <div className="space-y-2">
                {Object.entries(groupedSkills).map(([type, skillsList]) => (
                    <div key={type} className="grid grid-cols-[140px_1fr] gap-4 items-start">
                        <span className="text-xs font-bold text-neutral-700">
                            {categoryLabels[type] || type}:
                        </span>
                        <span className="text-xs text-neutral-800 leading-relaxed">
                            {skillsList.map(s => s.skillName).join(', ')}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
