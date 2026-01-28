'use client'

import React from 'react'
import { usePDF } from '@react-pdf/renderer'
import { ResumeDocument } from '@/lib/types/resume'
import { ResumePDF } from '@/lib/pdf/ResumePDF'
import { Button } from '@/components/ui/Button'
import { Download, Loader2 } from 'lucide-react'

interface PDFDownloadButtonProps {
    data: ResumeDocument
    fileName?: string
}

export function PDFDownloadButton({ data, fileName = 'resume.pdf' }: PDFDownloadButtonProps) {
    const [instance, updateInstance] = usePDF({ document: <ResumePDF data={data} /> })

    // Force update when data changes (important for template switching)
    // Using a small debounce to prevent "signal is aborted" errors during rapid changes
    React.useEffect(() => {
        const timer = setTimeout(() => {
            updateInstance(<ResumePDF data={data} key={`${data.templateId}-${Date.now()}`} />)
        }, 200)
        return () => clearTimeout(timer)
    }, [data, data.templateId, updateInstance])

    return (
        <a href={instance.url || '#'} download={fileName} className="block w-full">
            <Button
                variant="outline"
                className="w-full text-xs font-bold py-5 border-neutral-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 transition-all duration-300"
                disabled={instance.loading}
            >
                {instance.loading ? (
                    <span className="flex items-center gap-2 italic">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Generating...
                    </span>
                ) : (
                    <>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                    </>
                )}
            </Button>
        </a>
    )
}
