'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { ResumeDocument } from '@/lib/types/resume'
import { ResumeDOCX } from '@/lib/docx/ResumeDOCX'
import { Button } from '@/components/ui/Button'
import { Download, FileText, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pdf } from '@react-pdf/renderer'
import { ResumePDF } from '@/lib/pdf/ResumePDF'
import { saveAs } from 'file-saver'
import { UserSubscription } from '@/lib/types/resume'
import { canExportFormat } from '@/lib/supabase/subscriptions'
import { incrementExportCount } from '@/app/editor/actions'

interface DownloadButtonsProps {
    data: ResumeDocument
    subscription: UserSubscription | null
    className?: string
    variant?: 'header' | 'toolbar' | 'standalone'
    previewElementId?: string
}

export function DownloadButtons({ data, subscription, className, variant = 'header', previewElementId = 'resume-preview' }: DownloadButtonsProps) {
    const [downloadingDocx, setDownloadingDocx] = useState(false)
    const [downloadingPdf, setDownloadingPdf] = useState(false)
    const fileName = `${data.personalInfo?.fullName?.replace(/\s+/g, '_') || 'resume'}`

    const handleDocxDownload = async () => {
        if (!canExportFormat(subscription, 'docx')) {
            toast.error('DOCX export is available on paid plans. Please upgrade to download in Word format.')
            return
        }

        setDownloadingDocx(true)
        try {
            const result = await incrementExportCount()
            if (!result.success) {
                if (result.limitReached) {
                    toast.error('Monthly export limit reached. Please upgrade to Premium for unlimited downloads.')
                } else {
                    toast.error('Failed to process download request. Please try again.')
                }
                return
            }

            await ResumeDOCX.download(data, `${fileName}.docx`)
        } catch (error) {
            console.error('DOCX download failed:', error)
            toast.error('Failed to download DOCX. Please try again.')
        } finally {
            setDownloadingDocx(false)
        }
    }

    const handlePdfDownload = async () => {
        setDownloadingPdf(true)
        try {
            const result = await incrementExportCount()
            if (!result.success) {
                if (result.limitReached) {
                    toast.error('Monthly export limit reached. Please upgrade to Premium for unlimited downloads.')
                } else {
                    toast.error('Failed to process download request. Please try again.')
                }
                return
            }

            // Use @react-pdf/renderer to generate the PDF
            // This matches the PDF engine used for the preview
            const isWatermarked = !subscription || subscription.status !== 'active'
            console.log('[PDF Download] Generating PDF for template:', data.templateId)
            const doc = <ResumePDF data={data} isWatermarked={isWatermarked} />
            const asBlob = await pdf(doc).toBlob()
            saveAs(asBlob, `${fileName}.pdf`)
            console.log('[PDF Download] PDF generated successfully')

        } catch (error) {
            console.error('PDF generation failed:', error)
            toast.error('Failed to generate PDF. Please try again.')
        } finally {
            setDownloadingPdf(false)
        }
    }

    if (variant === 'toolbar') {
        return (
            <div className={cn('flex items-center gap-2', className)}>
                {/* PDF Download */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePdfDownload}
                    disabled={downloadingPdf}
                    className="flex-1 text-xs font-bold py-2 border-neutral-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
                >
                    {downloadingPdf ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Generating...
                        </span>
                    ) : (
                        <>
                            <Download className="w-3.5 h-3.5 mr-2" />
                            PDF
                        </>
                    )}
                </Button>

                {/* DOCX Download */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDocxDownload}
                    disabled={downloadingDocx}
                    className="flex-1 text-xs font-bold py-2 border-neutral-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
                >
                    {downloadingDocx ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Generating...
                        </span>
                    ) : (
                        <>
                            <FileText className="w-3.5 h-3.5 mr-2" />
                            DOCX
                        </>
                    )}
                </Button>
            </div>
        )
    }

    // Header variant (default)
    return (
        <div className={cn('flex items-center gap-3', className)}>
            {/* DOCX Download */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleDocxDownload}
                disabled={downloadingDocx}
                className="hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
            >
                {downloadingDocx ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <FileText className="w-4 h-4 mr-2" />
                        DOCX
                    </>
                )}
            </Button>

            {/* PDF Download */}
            <Button
                variant="outline"
                size="sm"
                onClick={handlePdfDownload}
                disabled={downloadingPdf}
                className="hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
            >
                {downloadingPdf ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                    </>
                )}
            </Button>
        </div>
    )
}
