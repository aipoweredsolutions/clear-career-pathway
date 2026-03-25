import { ResumeDocument } from '@/lib/types/resume'

export interface ATSFeedback {
    id: string
    type: 'success' | 'warning' | 'error'
    message: string
    section: string
    category: 'structure' | 'impact' | 'keywords' | 'ats'
}

export interface ATSAnalysis {
    score: number
    breakdown: {
        structure: number
        impact: number
        keywords: number
        ats: number
    }
    feedback: ATSFeedback[]
}

/**
 * Advanced Resume Strength Analysis Algorithm
 * Evaluates a resume based on completeness, impact, and standard ATS rules.
 */
export function analyzeATS(data: ResumeDocument): ATSAnalysis {
    const feedback: ATSFeedback[] = []

    // Breakdown scores (out of 100 each)
    let structureScore = 0
    let impactScore = 0
    let keywordsScore = 0
    let atsScore = 95 // Default high because our templates are clean

    // 1. Structure Analysis (0-100)
    let structureRaw = 0
    if (data.personalInfo?.fullName) structureRaw += 20
    if (data.personalInfo?.email && data.personalInfo?.phone) structureRaw += 20
    if (data.professionalSummary?.summaryText) structureRaw += 20
    if (data.workExperience && data.workExperience.length > 0) structureRaw += 20
    if (data.education && data.education.length > 0) structureRaw += 10
    if (data.skills && data.skills.length > 0) structureRaw += 10
    structureScore = structureRaw

    if (!data.personalInfo?.linkedinUrl) {
        feedback.push({ id: 'pi-linkedin', type: 'warning', message: 'Add a LinkedIn profile to increase recruiter interest.', section: 'Contact', category: 'ats' })
    }

    // 2. Impact Analysis (0-100)
    let impactRaw = 30 // Base
    const numberRegex = /\d+%|\d+\s?%|\$\d+|\d+\s?k|\d+\s?million|\d+\s?users/i
    const weakVerbs = ['responsible for', 'duties included', 'helped with', 'worked on', 'assisted in', 'handled', 'participated in']

    let hasQuantified = false
    let weakVerbCount = 0
    let totalBullets = 0

    data.workExperience?.forEach(exp => {
        exp.achievements?.forEach(ach => {
            totalBullets++
            if (numberRegex.test(ach.achievementText)) hasQuantified = true
            if (weakVerbs.some(verb => ach.achievementText.toLowerCase().includes(verb))) weakVerbCount++
        })
    })

    if (hasQuantified) impactRaw += 40
    else feedback.push({ id: 'imp-quant', type: 'warning', message: 'Add measurable metrics (%, $, numbers) to your work achievements.', section: 'Experience', category: 'impact' })

    if (totalBullets >= 10) impactRaw += 30
    else if (totalBullets > 0) impactRaw += 15

    if (weakVerbCount > 0) {
        impactRaw -= Math.min(20, weakVerbCount * 5)
        feedback.push({ id: 'imp-weak', type: 'warning', message: `Found ${weakVerbCount} weak action phrases. Use power verbs like "Executed" or "Spearheaded".`, section: 'Experience', category: 'impact' })
    }
    impactScore = Math.max(0, Math.min(100, impactRaw))

    // 3. Keywords Analysis (0-100)
    let kwRaw = 0
    const skillsCount = data.skills?.length || 0
    if (skillsCount >= 12) kwRaw += 80
    else if (skillsCount >= 5) kwRaw += 50
    else if (skillsCount > 0) kwRaw += 30

    if (skillsCount < 10) {
        feedback.push({ id: 'kw-low', type: 'warning', message: 'Include at least 10-15 relevant industry skills for better matching.', section: 'Skills', category: 'keywords' })
    }

    // Check if skills are also mentioned in summary or experience
    const allText = (data.professionalSummary?.summaryText || '') +
        (data.workExperience?.map(e => (e.roleDescription || '') + e.achievements?.map(a => a.achievementText).join(' ')).join(' ') || '')

    let keywordDensityCount = 0
    data.skills?.forEach(skill => {
        if (allText.toLowerCase().includes((skill.skillName || '').toLowerCase())) keywordDensityCount++
    })

    if (keywordDensityCount > 5) kwRaw += 20
    keywordsScore = Math.min(100, kwRaw)

    // 4. ATS Compatibility (0-100)
    // Since we control formatting, we check for content quality that affects parsing
    if (data.personalInfo?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
        atsScore -= 20
        feedback.push({ id: 'ats-email', type: 'error', message: 'Invalid email format may cause parsing issues.', section: 'Contact', category: 'ats' })
    }

    // Final Score (Weighted average)
    const finalScore = Math.round(
        (structureScore * 0.25) +
        (impactScore * 0.40) +
        (keywordsScore * 0.25) +
        (atsScore * 0.10)
    )

    return {
        score: finalScore,
        breakdown: {
            structure: structureScore,
            impact: impactScore,
            keywords: keywordsScore,
            ats: atsScore
        },
        feedback: feedback.sort((a, b) => (a.type === 'error' ? -1 : 1))
    }
}

