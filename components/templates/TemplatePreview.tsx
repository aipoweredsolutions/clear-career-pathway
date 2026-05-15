'use client'

import React from 'react'
import { TemplateRenderer } from './TemplateRenderer'
import { ResumeDocument } from '@/lib/types/resume'
import { getSampleDataForTemplate } from '@/lib/utils/template-sample-data'
import { cn } from '@/lib/utils'

interface TemplatePreviewProps {
    templateId: string
    sampleDataKey?: string
    scale?: number
    className?: string
}


export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
    templateId,
    sampleDataKey,
    scale = 0.35,
    className
}) => {
    // A4 aspect ratio base dimensions (800 × 1131 ≈ A4 at 96dpi)
    const baseWidth  = 800
    const baseHeight = 1131

    const data = getSampleDataForTemplate(templateId, sampleDataKey)

    return (
        <div
            className={cn(
                'relative overflow-hidden bg-white shadow-sm border border-neutral-200 pointer-events-none rounded-lg w-full',
                className
            )}
            style={{
                aspectRatio: '210/297'
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
