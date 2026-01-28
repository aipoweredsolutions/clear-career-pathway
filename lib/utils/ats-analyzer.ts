import { ResumeDocument } from '@/lib/types/resume'

export interface ATSFeedback {
    id: string
    type: 'success' | 'warning' | 'error'
    message: string
    section: string
}

export interface ATSAnalysis {
    score: number
    feedback: ATSFeedback[]
}

/**
 * Advanced ATS Analysis Algorithm
 * Evaluates a resume based on standard ATS parsing rules and recruiter preferences.
 */
export function analyzeATS(data: ResumeDocument): ATSAnalysis {
    let score = 0
    const feedback: ATSFeedback[] = []

    // 1. Contact Information (Weight: 20%)
    if (!data.personalInfo?.fullName) {
        feedback.push({ id: 'pi-name', type: 'error', message: 'Full name is missing.', section: 'Identity' })
    } else {
        score += 5
    }

    if (!data.personalInfo?.email) {
        feedback.push({ id: 'pi-email', type: 'error', message: 'Email address is missing.', section: 'Contact' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
        feedback.push({ id: 'pi-email-format', type: 'warning', message: 'Email format looks invalid.', section: 'Contact' })
        score += 2
    } else {
        score += 5
    }

    if (!data.personalInfo?.phone) {
        feedback.push({ id: 'pi-phone', type: 'warning', message: 'Phone number is missing.', section: 'Contact' })
    } else {
        score += 5
    }

    if (!data.personalInfo?.linkedinUrl) {
        feedback.push({ id: 'pi-linkedin', type: 'warning', message: 'LinkedIn profile is missing. 87% of recruiters check LinkedIn.', section: 'Contact' })
    } else {
        score += 5
    }

    // 2. Professional Summary (Weight: 15%)
    const summary = data.professionalSummary?.summaryText || ''
    if (summary.length === 0) {
        feedback.push({ id: 'sum-missing', type: 'error', message: 'Professional summary is missing.', section: 'Summary' })
    } else if (summary.length < 100) {
        feedback.push({ id: 'sum-short', type: 'warning', message: 'Summary is too short. Aim for 200-400 characters.', section: 'Summary' })
        score += 7
    } else if (summary.length > 800) {
        feedback.push({ id: 'sum-long', type: 'warning', message: 'Summary is too long. Keep it concise.', section: 'Summary' })
        score += 10
    } else {
        score += 15
    }

    // 3. Work Experience & Quantification (Weight: 35%)
    if (!data.workExperience || data.workExperience.length === 0) {
        feedback.push({ id: 'exp-missing', type: 'error', message: 'No work experience found.', section: 'Experience' })
    } else {
        score += 15 // Base points for having experience

        let hasQuantifiedAchievement = false
        const numberRegex = /\d+%|\d+\s?%|\$\d+|\d+\s?k|\d+\s?million|\d+\s?users/i

        data.workExperience.forEach((exp, idx) => {
            const achievements = exp.achievements || []

            if (achievements.length < 3 && idx === 0) {
                feedback.push({ id: `exp-ach-${idx}`, type: 'warning', message: `Current role should have at least 3 bullet points.`, section: 'Experience' })
            }

            achievements.forEach(ach => {
                if (numberRegex.test(ach.achievementText)) {
                    hasQuantifiedAchievement = true
                }
            })
        })

        if (hasQuantifiedAchievement) {
            score += 20
        } else {
            feedback.push({ id: 'exp-quant', type: 'warning', message: 'Try to quantify your achievements with numbers, percentages, or budgets.', section: 'Experience' })
            score += 5
        }
    }

    // 4. Skills & Keywords (Weight: 20%)
    const skills = data.skills || []
    if (skills.length === 0) {
        feedback.push({ id: 'skills-missing', type: 'error', message: 'No skills listed.', section: 'Skills' })
    } else if (skills.length < 8) {
        feedback.push({ id: 'skills-low', type: 'warning', message: 'Add at least 8-12 skills to increase keyword match.', section: 'Skills' })
        score += 10
    } else {
        score += 20
    }

    // 5. Education (Weight: 10%)
    if (!data.education || data.education.length === 0) {
        feedback.push({ id: 'edu-missing', type: 'warning', message: 'Education section is missing.', section: 'Education' })
    } else {
        score += 10
    }

    // Final Normalization
    return {
        score: Math.min(100, Math.round(score)),
        feedback: feedback.sort((a, b) => (a.type === 'error' ? -1 : 1))
    }
}
