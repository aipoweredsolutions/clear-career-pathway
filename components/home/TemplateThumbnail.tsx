'use client'

import React from 'react'
import NextImage from 'next/image'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { TemplateMetadata } from '@/lib/types/resume'
import {
    MOCK_PREVIEW_DATA,
    MOCK_EXECUTIVE_DATA,
    MOCK_GRADUATE_DATA,
    MOCK_NURSE_EXPERIENCED_DATA,
    MOCK_TECHNICAL_DATA,
    MOCK_HOSPITALITY_DATA,
    MOCK_CRUISE_DATA,
    MOCK_ACADEMIC_DATA,
    MOCK_CORPORATE_DATA,
    MOCK_LEGAL_DATA,
    MOCK_FASHION_DATA,
    MOCK_ATS_PROFESSIONAL_DATA,
    MOCK_ATS_MINIMAL_DATA,
    MOCK_ATS_EXECUTIVE_DATA,
    MOCK_ATS_MODERN_DATA,
    MOCK_ATS_GRADUATE_DATA,
    MOCK_ATS_TIMELINE_DATA,
    MOCK_SERVICE_PRO_DATA,
    MOCK_TECHNICAL_TEMPLATE_DATA,
    MOCK_EXECUTIVE_TEMPLATE_DATA,
    MOCK_CREATIVE_TEMPLATE_DATA,
    MOCK_PROFESSIONAL_TEMPLATE_DATA,
    MOCK_LUXE_TEMPLATE_DATA,
    MOCK_STARTUP_TEMPLATE_DATA,
    MOCK_ARTISAN_TEMPLATE_DATA,
    MOCK_SPLIT_CONTRAST_DATA,
    MOCK_COMPACT_TEMPLATE_DATA,
    MOCK_GRADUATE_TEMPLATE_DATA,
    MOCK_CUTE_TEMPLATE_DATA
} from '@/lib/constants/mock-data'
import { cn } from '@/lib/utils'

interface TemplateThumbnailProps {
    template: TemplateMetadata
    activeColorId?: string
    className?: string
}

export function TemplateThumbnail({ template, activeColorId, className }: TemplateThumbnailProps) {
    // Get appropriate sample data based on template type
    const getSampleData = () => {
        // ATS templates - use dedicated ATS mock data
        if (template.id.startsWith('ats-')) {
            if (template.id.includes('nursing')) return MOCK_NURSE_EXPERIENCED_DATA
            if (template.id.includes('professional')) return MOCK_ATS_PROFESSIONAL_DATA
            if (template.id.includes('technical')) return MOCK_TECHNICAL_DATA
            if (template.id.includes('standard')) return MOCK_CORPORATE_DATA
            if (template.id.includes('classic')) return MOCK_LEGAL_DATA
            if (template.id.includes('executive')) return MOCK_ATS_EXECUTIVE_DATA
            if (template.id.includes('graduate')) return MOCK_ATS_GRADUATE_DATA
            if (template.id.includes('modern')) return MOCK_ATS_MODERN_DATA
            if (template.id.includes('mini')) return MOCK_ATS_MINIMAL_DATA
            if (template.id.includes('timeline')) return MOCK_ATS_TIMELINE_DATA
            return MOCK_CORPORATE_DATA
        }

        // Industry and specialized variants
        if (template.id.includes('nursing')) return MOCK_NURSE_EXPERIENCED_DATA

        // Visual templates - use dedicated template mock data
        if (template.id === 'technical') return MOCK_TECHNICAL_TEMPLATE_DATA
        if (template.id === 'executive') return MOCK_EXECUTIVE_TEMPLATE_DATA
        if (template.id === 'creative') return MOCK_CREATIVE_TEMPLATE_DATA
        if (template.id === 'professional') return MOCK_PROFESSIONAL_TEMPLATE_DATA
        if (template.id === 'luxe') return MOCK_LUXE_TEMPLATE_DATA
        if (template.id === 'startup' || template.id === 'startups') return MOCK_STARTUP_TEMPLATE_DATA
        if (template.id === 'artisan') return MOCK_ARTISAN_TEMPLATE_DATA
        if (template.id === 'split-contrast') return MOCK_SPLIT_CONTRAST_DATA
        if (template.id === 'compact') return MOCK_COMPACT_TEMPLATE_DATA
        if (template.id === 'graduate') return MOCK_GRADUATE_TEMPLATE_DATA
        if (template.id === 'cute') return MOCK_CUTE_TEMPLATE_DATA
        if (template.id === 'minimal') return MOCK_ATS_MINIMAL_DATA
        if (template.id === 'modern') return MOCK_CORPORATE_DATA
        if (template.id === 'classic') return MOCK_LEGAL_DATA

        // Industry-specific templates
        if (template.id === 'hospitality-elite') return MOCK_HOSPITALITY_DATA
        if (template.id === 'cruise-excellence') return MOCK_CRUISE_DATA
        if (template.id === 'service-pro') return MOCK_SERVICE_PRO_DATA
        if (template.id === 'academic') return MOCK_ACADEMIC_DATA
        if (template.id === 'chic') return MOCK_FASHION_DATA

        // Default to comprehensive preview data
        return MOCK_PREVIEW_DATA
    }

    // Get color suffix for template
    const colorSuffix = activeColorId && activeColorId !== 'standard' && activeColorId !== 'std' && activeColorId !== 'clean'
        ? `-${activeColorId}`
        : ''

    return (
        <div className={cn("relative w-full h-full bg-white overflow-hidden", className)}>
            {template.previewImage ? (
                <div className="relative w-full h-full">
                    <NextImage
                        src={template.previewImage}
                        alt={template.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            ) : (
                <div
                    className="w-full h-full transform scale-[0.35] origin-top-left flex justify-center bg-white"
                    style={{ width: '286%', height: '286%' }}
                >
                    <TemplateRenderer
                        templateId={`${template.id}${colorSuffix}`}
                        data={getSampleData() as any}
                        className="shadow-none pointer-events-none select-none w-[210mm] min-h-[297mm]"
                    />
                </div>
            )}

            {/* Subtle overlay to indicate it's a preview */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white/10" />
        </div>
    )
}
