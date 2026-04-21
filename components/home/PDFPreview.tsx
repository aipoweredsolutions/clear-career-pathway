'use client'

import React from 'react'
import { PDFViewer, usePDF } from '@react-pdf/renderer'
import { ResumePDF } from '@/lib/pdf/ResumePDF'
import { ResumeDocument } from '@/lib/types/resume'

interface PDFPreviewProps {
    data: ResumeDocument
    isAuthenticated: boolean
    templateName: string
    onUrlUpdate?: (url: string | null) => void
}

/**
 * Headless component that handles PDF generation and provides the URL via callback
 */
export function PDFUrlGenerator({ data, onUrlUpdate }: { data: ResumeDocument; onUrlUpdate: (url: string | null) => void }) {
    const [instance, updateInstance] = usePDF({ document: <ResumePDF data={data} /> })

    // Sync instance URL with parent
    React.useEffect(() => {
        onUrlUpdate(instance.url)
    }, [instance.url, onUrlUpdate])

    // Force update when data changes
    React.useEffect(() => {
        updateInstance(<ResumePDF data={data} />)
    }, [data, updateInstance])

    return null
}

export default function PDFPreview({ data, isAuthenticated, templateName, onUrlUpdate }: PDFPreviewProps) {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 bg-white shadow-2xl rounded-lg overflow-hidden border border-neutral-200 relative text-center">
                <PDFViewer key={data.templateId} width="100%" height="100%" showToolbar={false} className="border-none">
                    <ResumePDF key={data.templateId} data={data} />
                </PDFViewer>
                
                {/* We still render the generator here to sync URL if this component is used standalone */}
                {onUrlUpdate && <PDFUrlGenerator data={data} onUrlUpdate={onUrlUpdate} />}
            </div>
        </div>
    )
}
