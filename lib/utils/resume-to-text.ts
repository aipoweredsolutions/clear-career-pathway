import { ResumeDocument } from '../types/resume'

export function resumeToPlainText(data: ResumeDocument): string {
    const lines: string[] = []

    // 1. Header
    const name = data.personalInfo?.fullName || 'Untitled Resume'
    lines.push(name.toUpperCase())
    if (data.personalInfo?.professionalTitle) {
        lines.push(data.personalInfo.professionalTitle)
    }
    
    const contact = [
        data.personalInfo?.email,
        data.personalInfo?.phone,
        data.personalInfo?.city && data.personalInfo?.country ? `${data.personalInfo.city}, ${data.personalInfo.country}` : data.personalInfo?.city || data.personalInfo?.country,
        data.personalInfo?.linkedinUrl,
        data.personalInfo?.websiteUrl
    ].filter(Boolean)
    
    if (contact.length > 0) {
        lines.push(contact.join(' | '))
    }
    lines.push('\n')

    // 2. Summary
    if (data.professionalSummary?.summaryText) {
        lines.push('PROFESSIONAL SUMMARY')
        lines.push('=' .repeat(20))
        lines.push(data.professionalSummary.summaryText)
        lines.push('\n')
    }

    // 3. Experience
    if (data.workExperience && data.workExperience.length > 0) {
        lines.push('WORK EXPERIENCE')
        lines.push('=' .repeat(20))
        data.workExperience.forEach(exp => {
            const titleLine = [exp.jobTitle, exp.companyName].filter(Boolean).join(' at ')
            const dateLine = [exp.startDate, exp.isCurrent ? 'Present' : exp.endDate].filter(Boolean).join(' - ')
            lines.push(`${titleLine} (${dateLine})`)
            if (exp.location) lines.push(exp.location)
            if (exp.roleDescription) lines.push(exp.roleDescription)
            if (exp.achievements && exp.achievements.length > 0) {
                exp.achievements.forEach(ach => {
                    lines.push(`• ${ach.achievementText}`)
                })
            }
            lines.push('')
        })
        lines.push('\n')
    }

    // 4. Skills
    if (data.skills && data.skills.length > 0) {
        lines.push('SKILLS')
        lines.push('=' .repeat(20))
        const skillNames = data.skills.map(s => s.skillName)
        lines.push(skillNames.join(', '))
        lines.push('\n')
    }

    // 5. Education
    if (data.education && data.education.length > 0) {
        lines.push('EDUCATION')
        lines.push('=' .repeat(20))
        data.education.forEach(edu => {
            const degreeLine = [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ')
            lines.push(`${edu.institutionName} - ${degreeLine}`)
            if (edu.location) lines.push(edu.location)
            const dateLine = [edu.startYear?.toString(), edu.endYear?.toString()].filter(Boolean).join(' - ')
            if (dateLine) lines.push(dateLine)
            lines.push('')
        })
        lines.push('\n')
    }

    // 6. Projects
    if (data.projects && data.projects.length > 0) {
        lines.push('PROJECTS')
        lines.push('=' .repeat(20))
        data.projects.forEach(proj => {
            lines.push(proj.projectName)
            if (proj.description) lines.push(proj.description)
            if (proj.projectUrl) lines.push(`URL: ${proj.projectUrl}`)
            lines.push('')
        })
    }

    return lines.join('\n')
}
