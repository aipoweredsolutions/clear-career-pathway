import { ResumeDocument } from '@/lib/types/resume'
import { SEO_TEMPLATES } from '@/lib/constants/templates-seo'
import {
    MOCK_PREVIEW_DATA,
    MOCK_ATS_PROFESSIONAL_DATA,
    MOCK_ATS_MINIMAL_DATA,
    MOCK_ATS_EXECUTIVE_DATA,
    MOCK_ATS_MODERN_DATA,
    MOCK_ATS_GRADUATE_DATA,
    MOCK_ATS_TIMELINE_DATA,
    MOCK_NURSE_EXPERIENCED_DATA,
    MOCK_ACADEMIC_DATA,
    MOCK_TECHNICAL_DATA,
    MOCK_HOSPITALITY_DATA,
    MOCK_CORPORATE_DATA,
    MOCK_LEGAL_DATA,
    MOCK_SERVICE_PRO_DATA,
    MOCK_EXECUTIVE_TEMPLATE_DATA,
    MOCK_CREATIVE_TEMPLATE_DATA,
    MOCK_ATS_GOLD_DATA,
    MOCK_CORNERSTONE_DATA,
} from '@/lib/constants/mock-data'
import {
    MOCK_MARKETING_DATA,
    MOCK_SALES_DATA,
    MOCK_PROJECT_MANAGER_DATA,
    MOCK_DATA_SCIENTIST_DATA,
    MOCK_HR_DATA,
    MOCK_TEACHER_DATA,
    MOCK_FINANCE_DATA,
} from '@/lib/constants/mock-data-additional'

/**
 * Map of SEO sampleDataKey → curated resume data.
 * This ensures every resume example on the /resume-examples page
 * shows role-specific, realistic content rather than generic filler.
 */
const SAMPLE_DATA_BY_KEY: Record<string, ResumeDocument> = {
    // Technology
    'software-engineer':           MOCK_ATS_MODERN_DATA,
    'data-scientist':              MOCK_DATA_SCIENTIST_DATA,
    'product-manager':             MOCK_ATS_PROFESSIONAL_DATA,
    'ux-designer':                 MOCK_CREATIVE_TEMPLATE_DATA,
    'devops-engineer':             MOCK_TECHNICAL_DATA,
    'frontend-developer':          MOCK_ATS_MODERN_DATA,

    // Healthcare
    'registered-nurse':            MOCK_NURSE_EXPERIENCED_DATA,
    'medical-assistant':           MOCK_ATS_PROFESSIONAL_DATA,
    'pharmacist':                  MOCK_ACADEMIC_DATA,
    'physical-therapist':          MOCK_HOSPITALITY_DATA,

    // Finance
    'financial-analyst':           MOCK_FINANCE_DATA,
    'accountant':                  MOCK_FINANCE_DATA,
    'investment-banker':           MOCK_EXECUTIVE_TEMPLATE_DATA,

    // Marketing
    'marketing-manager':           MOCK_MARKETING_DATA,
    'digital-marketing-specialist': MOCK_MARKETING_DATA,
    'content-writer':              MOCK_CREATIVE_TEMPLATE_DATA,

    // Sales
    'sales-manager':               MOCK_SALES_DATA,
    'account-executive':           MOCK_SALES_DATA,

    // Education
    'teacher':                     MOCK_TEACHER_DATA,
    'professor':                   MOCK_ACADEMIC_DATA,

    // Creative
    'graphic-designer':            MOCK_CREATIVE_TEMPLATE_DATA,

    // Human Resources
    'hr-manager':                  MOCK_HR_DATA,
    'recruiter':                   MOCK_HR_DATA,

    // Operations
    'project-manager':             MOCK_PROJECT_MANAGER_DATA,
    'operations-manager':          MOCK_CORPORATE_DATA,
    'business-analyst':            MOCK_PROJECT_MANAGER_DATA,

    // Legal / General
    'legal':                       MOCK_LEGAL_DATA,
    'social-worker':               MOCK_SERVICE_PRO_DATA,
    'cybersecurity-analyst':       MOCK_TECHNICAL_DATA,
}

/**
 * Returns the curated sample data for a given template ID or sampleDataKey.
 * This is the single source of truth used by both the gallery thumbnail
 * (TemplatePreview) and the template detail page, ensuring visual consistency.
 *
 * Priority:
 * 1. Exact sampleDataKey match (role-specific content from SEO_TEMPLATES)
 * 2. templateId-based fuzzy match (fallback for gallery/editor previews)
 */
export function getSampleDataForTemplate(templateId: string, sampleDataKey?: string): ResumeDocument {
    let baseData = MOCK_PREVIEW_DATA

    // 1. Try exact sampleDataKey match first (most specific)
    if (sampleDataKey && SAMPLE_DATA_BY_KEY[sampleDataKey]) {
        baseData = SAMPLE_DATA_BY_KEY[sampleDataKey]
    } else {
        // 2. Fallback: fuzzy match by templateId
        const id = templateId.toLowerCase()

        if (id.includes('nursing'))                                                   baseData = MOCK_NURSE_EXPERIENCED_DATA
        else if (id.includes('academia') || id.includes('scholar') || id.includes('royal')) baseData = MOCK_ACADEMIC_DATA
        else if (id.includes('executive-cv') || id.includes('elite-london') || id.includes('elite-haskins')) baseData = MOCK_EXECUTIVE_TEMPLATE_DATA
        else if (id.includes('executive') || id.includes('elite'))                                         baseData = MOCK_ATS_EXECUTIVE_DATA
        else if (id.includes('professional'))                                              baseData = MOCK_ATS_PROFESSIONAL_DATA
        else if (id.includes('technical') || id.includes('gridline'))                      baseData = MOCK_TECHNICAL_DATA
        else if (id.includes('hospitality'))                                               baseData = MOCK_HOSPITALITY_DATA
        else if (id.includes('graduate') || id.includes('internship') || id.includes('no-experience')) baseData = MOCK_ATS_GRADUATE_DATA
        else if (id.includes('modern') || id.includes('minimalist-mono') || id.includes('bauhaus')) baseData = MOCK_ATS_MODERN_DATA
        else if (id.includes('minimal'))                                                   baseData = MOCK_ATS_MINIMAL_DATA
        else if (id.includes('timeline') || id.includes('chronograph'))                   baseData = MOCK_ATS_TIMELINE_DATA
        else if (id.includes('metro'))                                                     baseData = MOCK_TECHNICAL_DATA
        else if (id.includes('classic-left') || id.includes('masthead') || id.includes('editorial')) baseData = MOCK_LEGAL_DATA
        else if (id.includes('classic'))                                                   baseData = MOCK_LEGAL_DATA
        else if (id.includes('gold-standard'))                                             baseData = MOCK_ATS_GOLD_DATA
        else if (id.includes('cornerstone'))                                              baseData = MOCK_CORNERSTONE_DATA
        else if (id.includes('meridian'))                                                  baseData = MOCK_CORPORATE_DATA
        else if (id.includes('sterling'))                                                  baseData = MOCK_CORPORATE_DATA
        else if (id.includes('service'))                                                   baseData = MOCK_SERVICE_PRO_DATA
        else if (id.includes('creative') || id.includes('artisan'))                       baseData = MOCK_CREATIVE_TEMPLATE_DATA
        else if (id.includes('elegant-split'))                                             baseData = MOCK_ATS_MODERN_DATA
        else if (id.includes('prestige'))                                                  baseData = MOCK_CORPORATE_DATA
    }

    // Merge SEO template specific data if sampleDataKey matches
    if (sampleDataKey) {
        const seoTemplate = SEO_TEMPLATES.find(t => t.sampleDataKey === sampleDataKey)
        if (seoTemplate) {
            // Deep clone to avoid mutating the base mock data constants
            const mergedData = JSON.parse(JSON.stringify(baseData)) as ResumeDocument
            const jobTitleClean = seoTemplate.title.replace(' Resume Example', '')

            // Inject SEO-specific summary
            if (mergedData.professionalSummary) {
                mergedData.professionalSummary.summaryText = seoTemplate.description || seoTemplate.howToWrite.intro
            }

            // Inject SEO-specific skills
            if (seoTemplate.keySkills && seoTemplate.keySkills.length > 0) {
                mergedData.skills = seoTemplate.keySkills.map((skill, index) => ({
                    skillName: skill,
                    skillType: 'professional',
                    proficiencyLevel: 'expert',
                    displayOrder: index
                }))
            }

            // Inject SEO-specific experience bullets and update job title
            if (mergedData.personalInfo) {
                mergedData.personalInfo.professionalTitle = jobTitleClean
            }
            if (mergedData.workExperience && mergedData.workExperience.length > 0) {
                mergedData.workExperience[0].jobTitle = jobTitleClean
                if (seoTemplate.exampleBullets && seoTemplate.exampleBullets.length > 0) {
                    mergedData.workExperience[0].achievements = seoTemplate.exampleBullets.map((bullet, index) => ({
                        achievementText: bullet,
                        displayOrder: index
                    }))
                }
            }
            
            return mergedData
        }
    }

    return baseData
}

