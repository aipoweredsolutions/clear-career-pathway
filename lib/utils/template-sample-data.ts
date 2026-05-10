import { ResumeDocument } from '@/lib/types/resume'
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
} from '@/lib/constants/mock-data'

/**
 * Returns the curated sample data for a given template ID.
 * This is the single source of truth used by both the gallery thumbnail
 * (TemplatePreview) and the template detail page, ensuring visual consistency.
 */
export function getSampleDataForTemplate(templateId: string): ResumeDocument {
    const id = templateId.toLowerCase()

    if (id.includes('nursing'))                                                   return MOCK_NURSE_EXPERIENCED_DATA
    if (id.includes('academia') || id.includes('scholar') || id.includes('royal')) return MOCK_ACADEMIC_DATA
    if (id.includes('executive-cv') || id.includes('elite-london') || id.includes('elite-haskins')) return MOCK_EXECUTIVE_TEMPLATE_DATA
    if (id.includes('executive') || id.includes('elite'))                                         return MOCK_ATS_EXECUTIVE_DATA
    if (id.includes('professional'))                                              return MOCK_ATS_PROFESSIONAL_DATA
    if (id.includes('technical') || id.includes('gridline'))                      return MOCK_TECHNICAL_DATA
    if (id.includes('hospitality'))                                               return MOCK_HOSPITALITY_DATA
    if (id.includes('graduate') || id.includes('internship') || id.includes('no-experience')) return MOCK_ATS_GRADUATE_DATA
    if (id.includes('modern') || id.includes('minimalist-mono') || id.includes('bauhaus')) return MOCK_ATS_MODERN_DATA
    if (id.includes('minimal'))                                                   return MOCK_ATS_MINIMAL_DATA
    if (id.includes('timeline') || id.includes('chronograph'))                   return MOCK_ATS_TIMELINE_DATA
    if (id.includes('metro'))                                                     return MOCK_TECHNICAL_DATA
    if (id.includes('classic-left') || id.includes('masthead') || id.includes('editorial')) return MOCK_LEGAL_DATA
    if (id.includes('classic'))                                                   return MOCK_LEGAL_DATA
    if (id.includes('gold-standard'))                                             return MOCK_ATS_GOLD_DATA
    if (id.includes('service'))                                                   return MOCK_SERVICE_PRO_DATA
    if (id.includes('creative') || id.includes('artisan'))                       return MOCK_CREATIVE_TEMPLATE_DATA
    // Two-column non-ATS templates
    if (id.includes('elegant-split'))                                             return MOCK_ATS_MODERN_DATA
    if (id.includes('prestige'))                                                  return MOCK_CORPORATE_DATA

    return MOCK_PREVIEW_DATA
}
