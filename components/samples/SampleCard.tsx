'use client'

import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { Button } from '@/components/ui/Button'
import { ExternalLink, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { TemplatePreviewDialog } from '../home/TemplatePreviewDialog'
import { TemplateThumbnail } from '../home/TemplateThumbnail'
import { templateRegistry } from '@/lib/templates/registry'

interface SampleCardProps {
    sample: ResumeDocument
    category: string
    description: string
}

export function SampleCard({ sample, category, description }: SampleCardProps) {
    const [copied, setCopied] = React.useState(false)
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)

    // Find the template metadata from registry
    const templateMetadata = templateRegistry.find(t => t.id === sample.templateId) || null

    const handleCopy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="group bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
            {/* Preview Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02] origin-top">
                    {templateMetadata && (
                        <TemplateThumbnail
                            template={templateMetadata}
                        />
                    )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex flex-col gap-3 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full max-w-[200px]">
                        <Link href={`/editor/setup?template=${sample.templateId}&sample=${sample.id}`} className="w-full">
                            <Button variant="primary" size="lg" className="w-full shadow-lg">
                                Use This Sample
                            </Button>
                        </Link>
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                            onClick={() => setIsPreviewOpen(true)}
                        >
                            Quick Preview
                        </Button>
                    </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-sm">
                        {category}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-neutral-900 mb-2 leading-tight">
                    {sample.personalInfo?.professionalTitle || sample.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <Link href={`/editor/setup?template=${sample.templateId}&sample=${sample.id}`} className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1.5 transition-colors">
                        Get Started <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                        onClick={handleCopy}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                        title="Copy Sample Link"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <TemplatePreviewDialog
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                template={templateMetadata}
            />
        </div>
    )
}
