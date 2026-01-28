'use client'

import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { ResumeDocument } from '@/lib/types/resume'
import { ResumePDF } from '@/lib/pdf/ResumePDF'
import { Loader2 } from 'lucide-react'
import { UserSubscription } from '@/lib/types/resume'

interface PDFPreviewProps {
    data: ResumeDocument
    subscription?: UserSubscription | null
    className?: string
}

export function PDFPreview({ data, subscription, className }: PDFPreviewProps) {
    const [debouncedData, setDebouncedData] = React.useState(data)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedData(data)
        }, 500) // 0.5 second debounce for value updates
        return () => clearTimeout(timer)
    }, [data])

    const isWatermarked = !subscription || subscription.status !== 'active'

    return (
        <div className={className}>
            <PDFViewer key={debouncedData.templateId} className="w-full h-full border-none rounded-lg shadow-2xl" showToolbar={true}>
                <ResumePDF key={debouncedData.templateId} data={debouncedData} isWatermarked={isWatermarked} />
            </PDFViewer>
        </div>
    )
}
