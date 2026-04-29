'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { ResumeDocument } from '@/lib/types/resume'
import { ResumeDOCX } from '@/lib/docx/ResumeDOCX'
import { Button } from '@/components/ui/Button'
import { Download, FileText, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

import { saveAs } from 'file-saver'
import { UserSubscription } from '@/lib/types/resume'
import { canExportFormat, canDownloadTemplate } from '@/lib/supabase/subscriptions'
import { incrementExportCount } from '@/app/editor/actions'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

interface DownloadButtonsProps {
    data: ResumeDocument
    subscription: UserSubscription | null
    className?: string
    variant?: 'header' | 'toolbar' | 'standalone'
    previewElementId?: string
}

export function DownloadButtons({ data, subscription, className, variant = 'header', previewElementId = 'resume-preview' }: DownloadButtonsProps) {
    const router = useRouter()
    const [downloadingDocx, setDownloadingDocx] = useState(false)
    const [downloadingPdf, setDownloadingPdf] = useState(false)
    const fileName = `${data.personalInfo?.fullName?.replace(/\s+/g, '_') || 'resume'}`

    const handleDocxDownload = async () => {
        if (!canDownloadTemplate(data.templateId, subscription)) {
            toast.error('This premium template requires a Pro plan or single purchase.')
            router.push(`/pricing?template=${data.templateId}`)
            return
        }

        if (!canExportFormat(subscription, 'docx')) {
            toast.error('DOCX export requires a premium credit. Redirecting to plans...')
            setTimeout(() => router.push('/pricing'), 1500)
            return
        }

        setDownloadingDocx(true)
        try {
            const result = await incrementExportCount(data.id || '', 'docx')
            if (!result.success) {
                if (result.requiresPayment) {
                    toast.error('No download credits remaining. Please purchase a bundle or subscribe.')
                } else if (result.limitReached) {
                    toast.error('Monthly export limit reached. Please upgrade to Power User plan.')
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
        if (!canDownloadTemplate(data.templateId, subscription)) {
            toast.error('This premium template requires a Pro plan or single purchase.')
            router.push(`/pricing?template=${data.templateId}`)
            return
        }

        if (!canExportFormat(subscription, 'pdf')) {
            toast.error('Full PDF download requires a premium credit. Redirecting to plans...')
            setTimeout(() => router.push('/pricing'), 1500)
            return
        }

        setDownloadingPdf(true)
        try {
            const result = await incrementExportCount(data.id || '', 'pdf')
            if (!result.success) {
                if (result.requiresPayment) {
                    toast.error('No download credits remaining. Please purchase a bundle or subscribe.')
                } else if (result.limitReached) {
                    toast.error('Monthly export limit reached. Please upgrade to Power User plan.')
                } else {
                    toast.error('Failed to process download request. Please try again.')
                }
                return
            }

            // Dynamically import @react-pdf/renderer to generate the PDF
            const { pdf } = await import('@react-pdf/renderer')
            const { ResumePDF } = await import('@/lib/pdf/ResumePDF')

            const isWatermarked = !subscription || (subscription.status !== 'active' && (subscription as any).downloadCredits <= 0)
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
                    className="flex-1 text-xs font-bold py-2 border-neutral-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group"
                >
                    {downloadingPdf ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Wait...
                        </span>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            {(!canExportFormat(subscription, 'pdf') || !canDownloadTemplate(data.templateId, subscription)) && <Lock className="w-3 h-3 text-red-400 group-hover:text-red-500" />}
                            <Download className="w-3.5 h-3.5" />
                            PDF
                        </div>
                    )}
                </Button>

                {/* DOCX Download */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDocxDownload}
                    disabled={downloadingDocx}
                    className="flex-1 text-xs font-bold py-2 border-neutral-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 group"
                >
                    {downloadingDocx ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Wait...
                        </span>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            {(!canExportFormat(subscription, 'docx') || !canDownloadTemplate(data.templateId, subscription)) && <Lock className="w-3 h-3 text-blue-400 group-hover:text-blue-500" />}
                            <FileText className="w-3.5 h-3.5" />
                            DOCX
                        </div>
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
                className="hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 group"
            >
                {downloadingDocx ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <div className="flex items-center">
                        {!canExportFormat(subscription, 'docx') && <Lock className="w-3 h-3 mr-2 text-blue-400 group-hover:text-blue-600" />}
                        <FileText className="w-4 h-4 mr-2" />
                        Download DOCX
                    </div>
                )}
            </Button>

            {/* PDF Download */}
            <Button
                variant="primary"
                size="sm"
                onClick={handlePdfDownload}
                disabled={downloadingPdf}
                className="shadow-lg shadow-primary-200 transition-all duration-300 group"
            >
                {downloadingPdf ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <div className="flex items-center">
                        {(!canExportFormat(subscription, 'pdf') || !canDownloadTemplate(data.templateId, subscription)) && <Lock className="w-3 h-3 mr-2 text-white/70" />}
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                    </div>
                )}
            </Button>
        </div>
    )
}
