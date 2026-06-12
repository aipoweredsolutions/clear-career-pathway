'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FileText, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface TemplateDownloadButtonProps {
    templateId: string
    templateName: string
    sampleData: any
    className?: string
    compact?: boolean
}

export function TemplateDownloadButton({ templateId, templateName, sampleData, className, compact }: TemplateDownloadButtonProps) {
    const [downloading, setDownloading] = useState(false)

    const handleDownload = async () => {
        setDownloading(true)
        try {
            // Dynamically import the DOCX generator
            const { ResumeDOCX } = await import('@/lib/docx/ResumeDOCX')
            
            // Format the file name
            const fileName = `${templateName.replace(/\s+/g, '_')}_Template`
            
            // Generate and trigger download
            await ResumeDOCX.download(
                { ...sampleData, templateId },
                fileName
            )
            toast.success('Template downloaded successfully!')
        } catch (error) {
            console.error('Failed to download template:', error)
            toast.error('Failed to download the template.')
        } finally {
            setDownloading(false)
        }
    }

    return (
        <Button
            onClick={handleDownload}
            disabled={downloading}
            size={compact ? "sm" : "lg"}
            variant={compact ? "ghost" : "outline"}
            className={cn(
                compact 
                    ? "px-6 py-2 h-auto rounded-full font-bold text-[10px] uppercase tracking-widest bg-white/15 text-white hover:bg-white/25 hover:text-white backdrop-blur-sm transition-all"
                    : "shadow-2xl font-black tracking-widest uppercase text-xs border-neutral-700 bg-neutral-900/80 text-white hover:bg-neutral-800 hover:text-white backdrop-blur-sm",
                className
            )}
        >
            {downloading ? (
                <>
                    <Loader2 className={cn("animate-spin", compact ? "w-3 h-3 mr-1.5" : "w-4 h-4 mr-2")} />
                    {compact ? "..." : "Generating..."}
                </>
            ) : (
                <>
                    <FileText className={cn("text-blue-400", compact ? "w-3 h-3 mr-1.5" : "w-4 h-4 mr-2")} />
                    {compact ? "DOCX" : "Download DOCX"}
                </>
            )}
        </Button>
    )
}
