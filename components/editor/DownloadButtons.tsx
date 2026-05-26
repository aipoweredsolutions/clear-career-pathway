'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { ResumeDocument } from '@/lib/types/resume'
// ResumeDOCX is dynamically imported inside the handleDocxDownload function
import { Button } from '@/components/ui/Button'
import { Download, FileText, Loader2, Lock, Clipboard, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resumeToPlainText } from '@/lib/utils/resume-to-text'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { incrementExportCount } from '@/app/editor/actions'
import { trackEvent } from '@/lib/utils/analytics'
import { templateRegistry } from '@/lib/templates/registry'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'

interface DownloadButtonsProps {
    data: ResumeDocument
    className?: string
    variant?: 'header' | 'toolbar' | 'standalone'
    previewElementId?: string
}

export function DownloadButtons({ data, className, variant = 'header', previewElementId = 'resume-preview' }: DownloadButtonsProps) {
    const { profile } = useAuth()
    const router = useRouter()
    
    const isPro = profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'enterprise'
    const [downloadingDocx, setDownloadingDocx] = useState(false)
    const [downloadingPdf, setDownloadingPdf] = useState(false)
    const [copied, setCopied] = useState(false)
    const defaultFileName = (data.title && data.title !== 'Untitled Document' && data.title !== 'New Resume') 
        ? data.title.replace(/\s+/g, '_') 
        : (data.personalInfo?.fullName?.replace(/\s+/g, '_') || 'resume')
    const [customFileName, setCustomFileName] = useState(defaultFileName)
    const [downloadTemplateId, setDownloadTemplateId] = useState<string>('')
    
    const activeTemplateId = downloadTemplateId || data.templateId
    const template = templateRegistry.find(t => activeTemplateId === t.id || activeTemplateId.startsWith(t.id + '-'))
    const isPremiumTemplate = template ? template.isPremium : true

    const copyToClipboard = async () => {
        const text = resumeToPlainText(data)
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            toast.success('Resume copied as plain text!')
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error('Failed to copy text.')
        }
    }

    const handleDocxDownload = async () => {
        trackEvent('export_intent', { format: 'docx', templateId: data.templateId })
        // Check if template is premium and user is NOT pro
        if (isPremiumTemplate && !isPro) {
            trackEvent('paywall_viewed', { format: 'docx', reason: 'premium_template', templateId: data.templateId })
            toast.error('This premium template requires a Pro plan.')
            router.push(`/pricing?template=${data.templateId}`)
            return
        }

        setDownloadingDocx(true)
        try {
            const result = await incrementExportCount(data.id || '', 'docx')
            if (!result.success) {
                if (result.requiresPayment) {
                    trackEvent('paywall_viewed', { format: 'docx', reason: 'out_of_credits' })
                    toast.error('No download credits remaining. Please purchase a bundle or subscribe.')
                } else if (result.limitReached) {
                    trackEvent('paywall_viewed', { format: 'docx', reason: 'limit_reached' })
                    toast.error('Monthly export limit reached. Please upgrade to Power User plan.')
                } else {
                    toast.error('Failed to process download request. Please try again.')
                }
                return
            }

            const { ResumeDOCX } = await import('@/lib/docx/ResumeDOCX')
            await ResumeDOCX.download({ ...data, templateId: activeTemplateId }, `${customFileName || defaultFileName}.docx`)
        } catch (error) {
            console.error('DOCX download failed:', error)
            toast.error('Failed to download DOCX. Please try again.')
        } finally {
            setDownloadingDocx(false)
        }
    }

    const handlePdfDownload = async () => {
        trackEvent('export_intent', { format: 'pdf', templateId: data.templateId })
        if (isPremiumTemplate && !isPro) {
            trackEvent('paywall_viewed', { format: 'pdf', reason: 'premium_template', templateId: data.templateId })
            toast.error('This premium template requires a Pro plan.')
            router.push(`/pricing?template=${data.templateId}`)
            return
        }

        setDownloadingPdf(true)
        try {
            const result = await incrementExportCount(data.id || '', 'pdf')
            if (!result.success) {
                if (result.requiresPayment) {
                    trackEvent('paywall_viewed', { format: 'pdf', reason: 'out_of_credits' })
                    toast.error('No download credits remaining. Please purchase a bundle or subscribe.')
                } else if (result.limitReached) {
                    trackEvent('paywall_viewed', { format: 'pdf', reason: 'limit_reached' })
                    toast.error('Monthly export limit reached. Please upgrade to Power User plan.')
                } else {
                    toast.error('Failed to process download request. Please try again.')
                }
                return
            }

            toast.info('Generating paginated PDF...', { id: 'pdf-gen' })

            // Dynamically import html2pdf
            const html2pdf = (await import('html2pdf.js')).default

            // Ensure React has committed the template changes to the DOM
            await new Promise(resolve => setTimeout(resolve, 100))

            const element = document.getElementById('download-preview')
            if (!element) {
                toast.error('Could not find the resume preview element.')
                return
            }

            // Temporarily reset transforms for accurate capture
            const originalTransform = element.style.transform
            element.style.transform = 'none'

            const isA4 = data.formatting?.paperSize === 'a4'
            const pdfFormat = isA4 ? 'a4' : 'letter'

            const opt: any = {
                margin: [0, 0, 0, 0], // Margins handled by template HTML
                filename: `${customFileName || defaultFileName}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { unit: 'mm', format: pdfFormat, orientation: 'portrait' },
                // Intelligent page breaks to prevent cutting text in half
                pagebreak: { 
                    mode: ['css', 'legacy'],
                    avoid: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', '.break-inside-avoid']
                }
            }

            const pdfWorker = html2pdf().set(opt).from(element)
            
            await pdfWorker.toPdf().get('pdf').then((pdf: any) => {
                const totalPages = pdf.internal.getNumberOfPages()
                
                // Add continuation header for multi-page resumes
                for (let i = 2; i <= totalPages; i++) {
                    pdf.setPage(i)
                    
                    // Add a subtle white background block at the top to clear space if needed
                    pdf.setFillColor(255, 255, 255)
                    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 15, 'F')
                    
                    // Draw the continuation header
                    pdf.setFontSize(9)
                    pdf.setTextColor(150, 150, 150) // Subtle gray
                    const name = data.personalInfo?.fullName || 'Resume'
                    pdf.text(`${name} • Page ${i} (Continuation)`, 15, 10)
                }
            })
            
            await pdfWorker.save()

            element.style.transform = originalTransform
            toast.success('PDF downloaded successfully!', { id: 'pdf-gen' })
        } catch (error) {
            console.error('PDF generation failed:', error)
            toast.error('Failed to generate PDF. Please try again.', { id: 'pdf-gen' })
        } finally {
            setDownloadingPdf(false)
        }
    }

    if (variant === 'toolbar') {
        return (
            <div className={cn('flex flex-col gap-3', className)}>
                {/* Hidden Render Container for PDF */}
                <div className="absolute -left-[9999px] -top-[9999px] opacity-0" aria-hidden="true">
                    <div 
                        id="download-preview" 
                        className="bg-white" 
                        style={{ 
                            width: data.formatting?.paperSize === 'a4' ? '210mm' : '8.5in', 
                            minHeight: data.formatting?.paperSize === 'a4' ? '297mm' : '11in' 
                        }}
                    >
                        <TemplateRenderer
                            templateId={activeTemplateId}
                            data={{...data, templateId: activeTemplateId}}
                        />
                    </div>
                </div>

                {/* Template Selection */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Export Template</label>
                    <select
                        value={downloadTemplateId}
                        onChange={(e) => setDownloadTemplateId(e.target.value)}
                        className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs font-bold text-neutral-900 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
                    >
                        <option value="">Use Preview Template</option>
                        {templateRegistry.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>

                {/* Filename Input */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Filename</label>
                    <input 
                        type="text" 
                        value={customFileName}
                        onChange={(e) => setCustomFileName(e.target.value)}
                        placeholder="e.g. John_Doe_Resume"
                        className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs font-bold text-neutral-900 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
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
                                {(!isPro && isPremiumTemplate) && <Lock className="w-3 h-3 text-red-400 group-hover:text-red-500" />}
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
                                {(!isPro && isPremiumTemplate) && <Lock className="w-3 h-3 text-blue-400 group-hover:text-blue-500" />}
                                <FileText className="w-3.5 h-3.5" />
                                DOCX
                            </div>
                        )}
                    </Button>
                </div>
            </div>
        )
    }

    // Header variant (default)
    return (
        <div className={cn('flex items-center gap-4', className)}>
            {/* Hidden Render Container for PDF */}
            <div className="absolute -left-[9999px] -top-[9999px] opacity-0" aria-hidden="true">
                <div 
                    id="download-preview" 
                    className="bg-white" 
                    style={{ 
                        width: data.formatting?.paperSize === 'a4' ? '210mm' : '8.5in', 
                        minHeight: data.formatting?.paperSize === 'a4' ? '297mm' : '11in' 
                    }}
                >
                    <TemplateRenderer
                        templateId={activeTemplateId}
                        data={{...data, templateId: activeTemplateId}}
                    />
                </div>
            </div>

            {/* Template Selection */}
            <div className="hidden md:flex flex-col gap-1">
                <select
                    value={downloadTemplateId}
                    onChange={(e) => setDownloadTemplateId(e.target.value)}
                    className="w-32 lg:w-48 bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1.5 text-[11px] font-bold text-neutral-900 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
                >
                    <option value="">Use Preview Template</option>
                    {templateRegistry.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>

            {/* Filename Input */}
            <div className="hidden md:flex flex-col gap-1">
                <input 
                    type="text" 
                    value={customFileName}
                    onChange={(e) => setCustomFileName(e.target.value)}
                    placeholder="Filename..."
                    className="w-32 lg:w-48 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-[11px] font-bold text-neutral-900 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-right"
                />
            </div>

            <div className="flex items-center gap-2">
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
                            {!isPro && isPremiumTemplate && <Lock className="w-3 h-3 mr-2 text-blue-400 group-hover:text-blue-600" />}
                            <FileText className="w-4 h-4 mr-2" />
                            DOCX
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
                            {!isPro && isPremiumTemplate && <Lock className="w-3 h-3 mr-2 text-white/70" />}
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                        </div>
                    )}
                </Button>

                {/* Copy Plain Text */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-neutral-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
                    title="Copy as Plain Text (for application portals)"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                    ) : (
                        <Clipboard className="w-4 h-4" />
                    )}
                </Button>
            </div>
        </div>
    )
}
