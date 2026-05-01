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
    MOCK_ATS_GOLD_DATA,
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
        // ... (rest of the sample data logic remains the same)
        if (template.id.startsWith('ats-')) {
            if (template.id.includes('nursing')) return MOCK_NURSE_EXPERIENCED_DATA
            if (template.id.includes('academia') || template.id.includes('scholar')) return MOCK_ACADEMIC_DATA
            if (template.id.includes('professional')) return MOCK_ATS_PROFESSIONAL_DATA
            if (template.id.includes('technical')) return MOCK_TECHNICAL_DATA
            if (template.id.includes('gold-standard')) return MOCK_ATS_GOLD_DATA
            if (template.id.includes('standard')) return MOCK_CORPORATE_DATA
            if (template.id.includes('classic')) return MOCK_LEGAL_DATA
            if (template.id.includes('executive')) return MOCK_ATS_EXECUTIVE_DATA
            if (template.id.includes('graduate')) return MOCK_ATS_GRADUATE_DATA
            if (template.id.includes('modern')) return MOCK_ATS_MODERN_DATA
            if (template.id.includes('mini')) return MOCK_ATS_MINIMAL_DATA
            if (template.id.includes('hospitality')) return MOCK_HOSPITALITY_DATA
            if (template.id.includes('timeline')) return MOCK_ATS_TIMELINE_DATA
            return MOCK_CORPORATE_DATA
        }

        if (template.id.includes('nursing')) return MOCK_NURSE_EXPERIENCED_DATA
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
        if (template.id === 'hospitality-elite') return MOCK_HOSPITALITY_DATA
        if (template.id === 'cruise-excellence') return MOCK_CRUISE_DATA
        if (template.id === 'service-pro') return MOCK_SERVICE_PRO_DATA
        if (template.id === 'academic') return MOCK_ACADEMIC_DATA
        if (template.id === 'chic') return MOCK_FASHION_DATA
        if (template.id === 'legal-expert') return MOCK_LEGAL_DATA
        if (template.id === 'military-transition') return MOCK_ATS_EXECUTIVE_DATA
        if (template.id === 'real-estate-pro') return MOCK_LUXE_TEMPLATE_DATA
        if (template.id === 'trades-pro') return MOCK_SERVICE_PRO_DATA
        if (template.id === 'international-cv') return MOCK_EXECUTIVE_TEMPLATE_DATA
        if (template.id === 'revenue-leader') return MOCK_ATS_EXECUTIVE_DATA
        if (template.id === 'classic-clean') return MOCK_LEGAL_DATA
        if (template.id === 'elegant-split') return MOCK_ATS_MODERN_DATA
        if (template.id === 'prestige') return MOCK_CORPORATE_DATA
        return MOCK_PREVIEW_DATA
    }

    const [imageError, setImageError] = React.useState(template.id === 'ats-gold-standard')

    // Reset error state when template changes, or force it for gold standard
    React.useEffect(() => {
        setImageError(template.id === 'ats-gold-standard')
    }, [template.id])

    // Construct the static image path
    // Format: /templates/[id]-[color]-preview.png
    const colorId = activeColorId || (template.colors && template.colors[0]?.id) || 'standard'
    const staticImagePath = `/templates/${template.id}-${colorId}-preview.png`

    return (
        <div className={cn("relative w-full h-full bg-neutral-100 overflow-hidden", className)}>
            {!imageError ? (
                <div className="relative w-full h-full">
                    <NextImage
                        src={staticImagePath}
                        alt={template.name}
                        fill
                        className="object-cover object-top"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                <LazyTemplatePreview
                    template={template}
                    colorSuffix={activeColorId ? `-${activeColorId}` : ''}
                    data={getSampleData()}
                />
            )}

            {/* Subtle overlay to indicate it's a preview */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/5" />
        </div>
    )
}

function LazyTemplatePreview({ template, colorSuffix, data }: { template: TemplateMetadata, colorSuffix: string, data: any }) {
    const [isVisible, setIsVisible] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Introduce a slight delay so scrolling isn't completely blocked immediately
                setTimeout(() => setIsVisible(true), 150)
                observer.disconnect()
            }
        }, { rootMargin: '300px' })

        if (ref.current) {
            observer.observe(ref.current)
        }
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className="w-full h-full transform scale-[0.35] origin-top-left flex justify-center bg-white"
            style={{ width: '286%', height: '286%' }}
        >
            {isVisible ? (
                <TemplateRenderer
                    templateId={`${template.id}${colorSuffix}`}
                    data={data}
                    className="shadow-none pointer-events-none select-none w-[210mm] min-h-[297mm] overflow-hidden"
                />
            ) : (
                <div className="w-[210mm] min-h-[297mm] bg-neutral-100 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-neutral-400">
                        <div className="w-16 h-16 border-4 border-neutral-200 border-t-neutral-400 rounded-full animate-spin" />
                        <span className="text-2xl font-bold uppercase tracking-widest">Loading</span>
                    </div>
                </div>
            )}
        </div>
    )
}
