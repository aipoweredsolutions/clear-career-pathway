'use client'

import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { MOCK_PREVIEW_DATA } from '@/lib/constants/mock-data'
import { CAREER_SAMPLES } from '@/lib/constants/career-samples'

export default function PreviewPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const templateId = (params?.templateId as string) || 'classic'
    const color = searchParams.get('color')

    // Resolve full ID if color is provided
    const fullId = color ? `${templateId}-${color}` : templateId

    // Choose sample data based on template type
    const getData = () => {
        if (templateId.startsWith('ats')) return CAREER_SAMPLES.sales_executive
        if (templateId === 'technical') return CAREER_SAMPLES.software_engineer
        if (templateId === 'modern' || templateId === 'startup') return CAREER_SAMPLES.marketing_manager
        if (templateId === 'cute') return CAREER_SAMPLES.graphic_designer
        if (templateId === 'graduate') return CAREER_SAMPLES.graduate
        if (templateId === 'academic') return CAREER_SAMPLES.education_expert
        return MOCK_PREVIEW_DATA
    }

    return (
        <div className="min-h-screen bg-white flex justify-center p-0">
            <TemplateRenderer
                templateId={fullId}
                data={getData() as any}
                className="w-[210mm] min-h-[297mm] shadow-none"
            />
        </div>
    )
}
