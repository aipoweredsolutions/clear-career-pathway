import { ResumeDocument } from '../types/resume'
import * as MOCK_CORE from '../constants/mock-data'
import * as MOCK_ADDITIONAL from '../constants/mock-data-additional'
import * as MOCK_HOSPITALITY from '../constants/mock-data-hospitality'
import { MOCK_TRADES_DATA } from '../constants/mock-data-trades'

/**
 * Maps a templateId to the most appropriate mock persona data.
 * This ensures that when a user previews a template in the Studio,
 * the content matches the intent and style of that specific template.
 */
export function getMockDataForTemplate(templateId: string): ResumeDocument {
    const id = templateId.toLowerCase()

    // Default fallback to the premium designer persona
    const baseData = (() => {
        // --- 1. ATS & Professional Series ---
        if (id.startsWith('ats-gold-standard')) return MOCK_CORE.MOCK_ATS_GOLD_DATA
        if (id.startsWith('ats-classic')) return MOCK_CORE.MOCK_LEGAL_DATA
        if (id.startsWith('ats-minimal')) return MOCK_CORE.MOCK_ATS_MINIMAL_DATA
        if (id.startsWith('ats-executive')) return MOCK_CORE.MOCK_ATS_EXECUTIVE_DATA
        if (id.startsWith('ats-modern')) return MOCK_CORE.MOCK_ATS_MODERN_DATA
        if (id.startsWith('ats-graduate')) return MOCK_CORE.MOCK_ATS_GRADUATE_DATA
        if (id.startsWith('ats-nursing')) return MOCK_CORE.MOCK_NURSE_EXPERIENCED_DATA
        if (id.startsWith('ats-academia')) return MOCK_CORE.MOCK_ACADEMIC_DATA
        if (id.startsWith('ats-timeline')) return MOCK_CORE.MOCK_ATS_TIMELINE_DATA
        if (id.startsWith('ats-hospitality')) return MOCK_HOSPITALITY.MOCK_HOSPITALITY_DATA
        if (id.startsWith('ats-standard')) {
            if (id.includes('nursing')) return MOCK_CORE.MOCK_NURSE_EXPERIENCED_DATA
            return MOCK_CORE.MOCK_CORPORATE_DATA
        }

        // --- 2. Executive & Leadership Series ---
        if (id.startsWith('executive')) return MOCK_CORE.MOCK_EXECUTIVE_TEMPLATE_DATA
        if (id.startsWith('revenue-leader')) return MOCK_ADDITIONAL.MOCK_SALES_DATA
        if (id.startsWith('professional')) return MOCK_CORE.MOCK_PROFESSIONAL_TEMPLATE_DATA
        if (id.startsWith('corporate')) return MOCK_CORE.MOCK_CORPORATE_DATA

        // --- 3. Creative & Modern Series ---
        if (id.startsWith('creative')) return MOCK_CORE.MOCK_CREATIVE_TEMPLATE_DATA
        if (id.startsWith('modern')) return MOCK_CORE.MOCK_PREVIEW_DATA // Designers
        if (id.startsWith('vibrant')) return MOCK_CORE.MOCK_CREATIVE_TEMPLATE_DATA
        if (id.startsWith('bold')) return MOCK_CORE.MOCK_FASHION_DATA
        if (id.startsWith('chic')) return MOCK_CORE.MOCK_FASHION_DATA
        if (id.startsWith('artisan')) return MOCK_CORE.MOCK_ARTISAN_TEMPLATE_DATA
        if (id.startsWith('startup')) return MOCK_CORE.MOCK_STARTUP_TEMPLATE_DATA

        // --- 4. Technical & Engineering Series ---
        if (id.startsWith('technical')) return MOCK_CORE.MOCK_TECHNICAL_TEMPLATE_DATA
        if (id.startsWith('devops')) return MOCK_CORE.MOCK_TECHNICAL_DATA
        if (id.startsWith('it-')) return MOCK_CORE.MOCK_TECHNICAL_DATA

        // --- 5. Industry Specific Series ---
        if (id.startsWith('hospitality-elite')) return MOCK_HOSPITALITY.MOCK_HOSPITALITY_DATA
        if (id.startsWith('cruise-excellence')) return MOCK_HOSPITALITY.MOCK_CRUISE_DATA
        if (id.startsWith('hotel-luxury')) return MOCK_HOSPITALITY.MOCK_HOSPITALITY_DATA
        if (id.startsWith('chef-culinary')) return MOCK_HOSPITALITY.MOCK_HOSPITALITY_DATA
        if (id.startsWith('cruise-officer')) return MOCK_HOSPITALITY.MOCK_CRUISE_DATA
        
        if (id.startsWith('classic-clean')) return MOCK_CORE.MOCK_LEGAL_DATA
        if (id.startsWith('legal-expert')) return MOCK_CORE.MOCK_LEGAL_DATA
        if (id.startsWith('medical')) return MOCK_CORE.MOCK_NURSE_EXPERIENCED_DATA
        if (id.startsWith('healthcare')) return MOCK_CORE.MOCK_NURSE_EXPERIENCED_DATA
        if (id.startsWith('academic')) return MOCK_CORE.MOCK_ACADEMIC_DATA
        
        if (id.startsWith('trades-pro')) return MOCK_TRADES_DATA
        if (id.startsWith('service-pro')) return MOCK_CORE.MOCK_SERVICE_PRO_DATA
        if (id.startsWith('real-estate')) return MOCK_ADDITIONAL.MOCK_SALES_DATA
        if (id.startsWith('military')) return MOCK_CORE.MOCK_ATS_TIMELINE_DATA // Transition focus
        if (id.startsWith('international-cv')) return MOCK_CORE.MOCK_ATS_TIMELINE_DATA

        // --- 6. Specialized Layouts ---
        if (id.startsWith('split-contrast')) return MOCK_CORE.MOCK_SPLIT_CONTRAST_DATA
        if (id.startsWith('compact')) return MOCK_CORE.MOCK_CORPORATE_DATA
        if (id.startsWith('minimal')) return MOCK_CORE.MOCK_ATS_MINIMAL_DATA
        if (id.startsWith('graduate')) return MOCK_CORE.MOCK_ATS_GRADUATE_DATA
        if (id.startsWith('luxe')) return MOCK_CORE.MOCK_LUXE_TEMPLATE_DATA

        // --- 7. Fallbacks ---
        if (id.includes('project-manager')) return MOCK_ADDITIONAL.MOCK_PROJECT_MANAGER_DATA
        if (id.includes('marketing')) return MOCK_ADDITIONAL.MOCK_MARKETING_DATA
        if (id.includes('finance')) return MOCK_ADDITIONAL.MOCK_FINANCE_DATA
        if (id.includes('hr')) return MOCK_ADDITIONAL.MOCK_HR_DATA
        if (id.includes('teacher')) return MOCK_ADDITIONAL.MOCK_TEACHER_DATA

        return MOCK_CORE.MOCK_PREVIEW_DATA
    })()

    // Global name override for consistent branding across previews
    // EXCEPT for the Gold Standard which uses its own executive persona
    const finalName = id.includes('gold-standard') 
        ? baseData.personalInfo?.fullName || 'Your Name'
        : 'Alexandra Morgan'

    return {
        ...baseData,
        personalInfo: {
            ...baseData.personalInfo,
            fullName: finalName
        }
    }
}
