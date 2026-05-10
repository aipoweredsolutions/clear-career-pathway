'use client'

import React, { Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { MOCK_PREVIEW_DATA } from '@/lib/constants/mock-data'
import { CAREER_SAMPLES } from '@/lib/constants/career-samples'
import { getSampleDataForTemplate } from '@/lib/utils/template-sample-data'

function PreviewContent() {
    const params = useParams()
    const searchParams = useSearchParams()
    const templateId = (params?.templateId as string) || 'classic'
    const color = searchParams.get('color')

    // Resolve full ID if color is provided
    const fullId = color ? `${templateId}-${color}` : templateId

    // Choose sample data based on template type
    const getData = () => {
        return getSampleDataForTemplate(templateId)
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

export default function PreviewPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading Preview...</div>}>
            <PreviewContent />
        </Suspense>
    )
}
