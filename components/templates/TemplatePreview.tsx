'use client'

import React from 'react'
import { TemplateRenderer } from './TemplateRenderer'
import { ResumeDocument } from '@/lib/types/resume'
import { getSampleDataForTemplate } from '@/lib/utils/template-sample-data'
import { cn } from '@/lib/utils'

interface TemplatePreviewProps {
    templateId: string
    sampleDataKey?: string  // kept for API compatibility but overridden by getSampleDataForTemplate
    scale?: number
    className?: string
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

    const data = getSampleDataForTemplate(templateId)

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
                    className="w-[210mm] min-h-[297mm] shadow-none"
                />
            </div>
        </div>
    )
}
