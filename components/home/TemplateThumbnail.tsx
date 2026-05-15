'use client'

import React from 'react'
import NextImage from 'next/image'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { TemplateMetadata } from '@/lib/types/resume'
import {
    MOCK_PREVIEW_DATA
} from '@/lib/constants/mock-data'
import { cn } from '@/lib/utils'
import { getSampleDataForTemplate } from '@/lib/utils/template-sample-data'

interface TemplateThumbnailProps {
    template: TemplateMetadata
    activeColorId?: string
    className?: string
    priority?: boolean
}

export function TemplateThumbnail({ template, activeColorId, className, priority = false }: TemplateThumbnailProps) {
    // Get appropriate sample data based on template type
    const getSampleData = () => {
        return getSampleDataForTemplate(template.id)
    }

    const isEliteOrGold = 
        template.id === 'ats-gold-standard' || 
        template.id.startsWith('elite-') || 
        template.id === 'ats-nursing' ||
        template.id === 'ats-professional'
    const [imageError, setImageError] = React.useState(isEliteOrGold)

    // Reset error state when template changes
    React.useEffect(() => {
        setImageError(isEliteOrGold)
    }, [template.id, isEliteOrGold])

    return (
        <div className={cn("relative w-full h-full bg-neutral-100 overflow-hidden", className)}>
            <LazyTemplatePreview
                template={template}
                colorSuffix={activeColorId ? `-${activeColorId}` : ''}
                data={getSampleData()}
                force={isEliteOrGold} // Still force render the top ones immediately for hero
            />

            {/* Subtle overlay to indicate it's a preview */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/5" />
        </div>
    )
}

function LazyTemplatePreview({ template, colorSuffix, data, force = false }: { template: TemplateMetadata, colorSuffix: string, data: any, force?: boolean }) {
    const [isVisible, setIsVisible] = React.useState(force)
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (force) return

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
