'use client'

import React, { useState } from 'react'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { TemplateMetadata } from '@/lib/types/resume'
import { MOCK_PREVIEW_DATA } from '@/lib/constants/mock-data'
import { CAREER_SAMPLES } from '@/lib/constants/career-samples'
import { cn } from '@/lib/utils'

interface TemplateThumbnailProps {
    template: TemplateMetadata
    activeColorId?: string
    className?: string
}

export function TemplateThumbnail({ template, activeColorId, className }: TemplateThumbnailProps) {
    const [imageError, setImageError] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const previewUrl = template.previewImage || `/templates/${template.id}-preview.png`

    // Fallback data for live rendering if image fails
    const getSampleData = () => {
        if (template.id.startsWith('ats')) return CAREER_SAMPLES.sales_executive
        if (template.id === 'technical') return CAREER_SAMPLES.software_engineer
        if (template.id === 'modern' || template.id === 'startup') return CAREER_SAMPLES.marketing_manager
        if (template.id === 'cute') return CAREER_SAMPLES.graphic_designer
        if (template.id === 'executive' || template.id === 'luxe') return require('@/lib/constants/mock-data').MOCK_EXECUTIVE_DATA
        if (template.id === 'graduate') return CAREER_SAMPLES.graduate
        if (template.id === 'academic') return CAREER_SAMPLES.education_expert
        return MOCK_PREVIEW_DATA
    }

    const colorSuffix = activeColorId && activeColorId !== 'standard' && activeColorId !== 'std' && activeColorId !== 'clean'
        ? `-${activeColorId}`
        : ''

    return (
        <div className={cn("relative w-full h-full bg-neutral-100 overflow-hidden", className)}>
            {!imageError ? (
                <img
                    src={previewUrl}
                    alt={template.name}
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-500",
                        isLoaded ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setImageError(true)}
                />
            ) : (
                /* Fallback to scaled down live preview - Only if static image fails */
                <div className="w-full h-full transform scale-[0.35] origin-top-left flex justify-center bg-white" style={{ width: '286%', height: '286%' }}>
                    <TemplateRenderer
                        templateId={`${template.id}${colorSuffix}`}
                        data={getSampleData() as any}
                        className="shadow-none pointer-events-none select-none w-[210mm] min-h-[297mm]"
                    />
                </div>
            )}

            {/* Loading state for static image */}
            {!isLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
                    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    )
}
