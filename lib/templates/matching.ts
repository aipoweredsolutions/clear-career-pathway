import { ResumeDocument, TemplateMetadata } from '../types/resume'

/**
 * Calculates a match score for a template based on the user's resume data.
 * Returns a score from 0 to 10.
 */
export function calculateTemplateMatchScore(template: TemplateMetadata, resume: ResumeDocument): number {
    let score = 0
    
    // 1. Career Level Matching (Critical)
    if (resume.careerLevel && template.suitableFor.careerLevels.includes(resume.careerLevel)) {
        score += 3
    }
    
    // 2. Job Type Matching (High Importance)
    if (resume.jobType && template.suitableFor.jobTypes.includes(resume.jobType)) {
        score += 3
    }
    
    // 3. Industry Matching (Contextual)
    if (resume.industryFocus && template.suitableFor.industries) {
        const userIndustry = resume.industryFocus.toLowerCase()
        const match = template.suitableFor.industries.some(ind => 
            ind.toLowerCase().includes(userIndustry) || userIndustry.includes(ind.toLowerCase())
        )
        if (match) {
            score += 3
        }
    }
    
    // 4. Premium Quality Bonus
    if (template.isPremium) {
        score += 1
    }
    
    return score
}

/**
 * Returns the recommended templates sorted by match score.
 */
export function getRecommendedTemplates(templates: TemplateMetadata[], resume: ResumeDocument) {
    return templates
        .map(template => ({
            template,
            score: calculateTemplateMatchScore(template, resume)
        }))
        .sort((a, b) => b.score - a.score)
}
