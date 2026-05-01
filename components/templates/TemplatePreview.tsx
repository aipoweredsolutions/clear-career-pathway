'use client'

import React from 'react'
import { TemplateRenderer } from './TemplateRenderer'
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
import { cn } from '@/lib/utils'

interface TemplatePreviewProps {
    templateId: string
    sampleDataKey?: string  // kept for API compatibility but overridden by getSampleData
    scale?: number
    className?: string
}

/**
 * Returns the same curated sample data used by TemplateThumbnail,
 * so the gallery preview is identical to what the user will edit.
 */
function getSampleData(templateId: string): ResumeDocument {
    const id = templateId.toLowerCase()

    if (id.includes('nursing'))                                                   return MOCK_NURSE_EXPERIENCED_DATA
    if (id.includes('academia') || id.includes('scholar') || id.includes('royal')) return MOCK_ACADEMIC_DATA
    if (id.includes('executive-cv'))                                              return MOCK_EXECUTIVE_TEMPLATE_DATA
    if (id.includes('executive'))                                                 return MOCK_ATS_EXECUTIVE_DATA
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

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
    templateId,
    sampleDataKey,  // accepted but ignored — getSampleData() derives the right data
    scale = 0.25,
    className
}) => {
    // A4 aspect ratio base dimensions (800 × 1131 ≈ A4 at 96dpi)
    const baseWidth  = 800
    const baseHeight = 1131

    const data = getSampleData(templateId)

    return (
        <div
            className={cn(
                'relative overflow-hidden bg-white shadow-sm border border-neutral-200 pointer-events-none rounded-lg',
                className
            )}
            style={{
                width:  `${baseWidth  * scale}px`,
                height: `${baseHeight * scale}px`,
            }}
        >
            <div
                className="absolute top-0 left-0 origin-top-left bg-white"
                style={{
                    width:     `${baseWidth}px`,
                    height:    `${baseHeight}px`,
                    transform: `scale(${scale})`,
                }}
            >
                <TemplateRenderer
                    templateId={templateId}
                    data={data}
                    className="w-full h-full shadow-none !p-12"
                />
            </div>
        </div>
    )
}
