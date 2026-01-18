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

    if (instance.loading) {
        return (
            <Button disabled variant="primary" size="sm">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Preparing...
            </Button>
        )
    }

    if (instance.error) {
        return (
            <Button disabled variant="danger" size="sm">
                Error
            </Button>
        )
    }

    return (
        <a href={instance.url!} download={fileName}>
            <Button variant="primary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
            </Button>
        </a>
    )
}
