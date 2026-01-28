'use client'

import React from 'react'
import { PDFViewer, usePDF } from '@react-pdf/renderer'
import { ResumePDF } from '@/lib/pdf/ResumePDF'
import { ResumeDocument } from '@/lib/types/resume'
import { Download, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PDFPreviewProps {
    data: ResumeDocument
    isAuthenticated: boolean
    templateName: string
}

export default function PDFPreview({ data, isAuthenticated, templateName }: PDFPreviewProps) {
    const [instance, updateInstance] = usePDF({ document: <ResumePDF data={data} /> })

    // Force update when data changes
    React.useEffect(() => {
        updateInstance(<ResumePDF data={data} />)
    }, [data, updateInstance])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 bg-white shadow-2xl rounded-lg overflow-hidden border border-neutral-200 relative">
                <PDFViewer key={data.templateId} width="100%" height="100%" showToolbar={false} className="border-none">
                    <ResumePDF key={data.templateId} data={data} />
                </PDFViewer>

                {/* Overlay removed to allow preview for all users */}
            </div>

            <div className="mt-4 xl:hidden">
                <a
                    href={instance.url || '#'}
                    download={`${templateName.replace(/\s+/g, '_')}_Preview.pdf`}
                    className="block w-full"
                >
                    <Button
                        variant="primary"
                        className="w-full font-bold"
                        disabled={instance.loading}
                    >
                        {instance.loading ? 'Generating...' : 'Download PDF Preview'}
                    </Button>
                </a>
            </div>

            {/* Hidden hook trigger for parent or handled internally */}
            <div id="pdf-instance-data" data-url={instance.url} data-loading={instance.loading} className="hidden" />
        </div>
    )
}
