'use client'

import React from 'react'
import NextImage from 'next/image'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { TemplateMetadata } from '@/lib/types/resume'
import {
    MOCK_MARKETING_DATA,
    MOCK_FINANCE_DATA,
    MOCK_SALES_DATA,
    MOCK_PROJECT_MANAGER_DATA,
    MOCK_DATA_SCIENTIST_DATA,
    MOCK_HR_DATA,
    MOCK_TEACHER_DATA
} from '@/lib/constants/mock-data-additional'
import { MOCK_EXECUTIVE_DATA, MOCK_GRADUATE_DATA, MOCK_PREVIEW_DATA, MOCK_NURSE_EXPERIENCED_DATA } from '@/lib/constants/mock-data'
import { MOCK_HOSPITALITY_DATA, MOCK_CRUISE_DATA } from '@/lib/constants/mock-data-hospitality'
import { CAREER_SAMPLES } from '@/lib/constants/career-samples'
import { cn } from '@/lib/utils'

interface TemplateThumbnailProps {
    template: TemplateMetadata
    activeColorId?: string
    className?: string
}

export function TemplateThumbnail({ template, activeColorId, className }: TemplateThumbnailProps) {
    // Get appropriate sample data based on template type
    const getSampleData = () => {
        // ATS templates - use professional data
        if (template.id.startsWith('ats-')) {
            if (template.id.includes('technical')) return MOCK_DATA_SCIENTIST_DATA
            if (template.id.includes('standard')) return MOCK_FINANCE_DATA
            if (template.id.includes('classic')) return MOCK_TEACHER_DATA
            if (template.id.includes('executive')) return MOCK_EXECUTIVE_DATA
            if (template.id.includes('graduate')) return MOCK_GRADUATE_DATA
            if (template.id.includes('modern')) return MOCK_MARKETING_DATA
            if (template.id.includes('minimal')) return MOCK_PROJECT_MANAGER_DATA
            if (template.id.includes('timeline')) return MOCK_NURSE_EXPERIENCED_DATA
            return MOCK_SALES_DATA
        }

        // Industry-specific templates
        if (template.id === 'technical' || template.id === 'tech') return MOCK_DATA_SCIENTIST_DATA
        if (template.id === 'modern' || template.id === 'startup' || template.id === 'startups') return MOCK_MARKETING_DATA
        if (template.id === 'creative' || template.id === 'cute') return CAREER_SAMPLES.graphic_designer
        if (template.id === 'executive' || template.id === 'luxe') return MOCK_EXECUTIVE_DATA
        if (template.id === 'graduate') return MOCK_GRADUATE_DATA
        if (template.id === 'academic') return MOCK_TEACHER_DATA
        if (template.id === 'professional') return MOCK_FINANCE_DATA
        if (template.id === 'minimal') return MOCK_PROJECT_MANAGER_DATA
        if (template.id === 'chic') return MOCK_HR_DATA
        if (template.id === 'artisan') return CAREER_SAMPLES.graphic_designer
        if (template.id === 'compact') return MOCK_SALES_DATA
        if (template.id === 'hospitality-elite') return MOCK_HOSPITALITY_DATA
        if (template.id === 'cruise-excellence') return MOCK_CRUISE_DATA
        if (template.id === 'service-pro') return MOCK_HOSPITALITY_DATA

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
