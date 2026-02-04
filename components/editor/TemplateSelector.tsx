'use client'

import React, { useState } from 'react'
import NextImage from 'next/image'
import { Check, X, Maximize2, Minimize2, File, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { templateRegistry } from '@/lib/templates/registry'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { Button } from '@/components/ui/Button'
import { TemplateMetadata, ResumeDocument, UserSubscription } from '@/lib/types/resume'
import { hasPremiumAccess } from '@/lib/supabase/subscriptions'
import { Lock } from 'lucide-react'

interface TemplateSelectorProps {
    currentTemplateId: string
    onSelect: (templateId: string) => void
    realData?: ResumeDocument | null
    subscription: UserSubscription | null
}

import { getMockDataForTemplate } from '@/lib/utils/template-helpers'

const getPreviewData = (templateId: string, realData?: ResumeDocument | null) => {
    if (realData) {
        return { ...realData, templateId }
    }
    return getMockDataForTemplate(templateId)
}

export function TemplateSelector({ currentTemplateId, onSelect, realData, subscription }: TemplateSelectorProps) {
    const [previewTemplate, setPreviewTemplate] = useState<TemplateMetadata | null>(null)
    const [paperSize, setPaperSize] = useState<'letter' | 'a4'>('a4')
    const [isMaximized, setIsMaximized] = useState(false)

    const handleSelect = () => {
        if (previewTemplate) {
            if (previewTemplate.isPremium && !hasPremiumAccess(subscription)) {
                toast.error('This is a premium template. Please upgrade to use it.')
                return
            }
            onSelect(previewTemplate.id)
            setPreviewTemplate(null)
            setIsMaximized(false)
        }
    }

    if (previewTemplate) {
        return (
            <div className={cn(
                "flex flex-col bg-neutral-100 animate-in fade-in slide-in-from-right duration-300",
                isMaximized ? "fixed inset-0 z-[100]" : "absolute inset-0 z-50 h-full"
            )}>
                {/* Preview Header */}
                <div className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shadow-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setPreviewTemplate(null)
                                setIsMaximized(false)
                            }}
                            className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-neutral-500" />
                        </button>
                        <div>
                            <h3 className="font-bold text-neutral-900 leading-tight text-sm">{previewTemplate.name}</h3>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-primary-600">Preview Mode</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Paper Size Toggle */}
                        <div className="flex bg-neutral-100 rounded-md p-0.5 mr-1">
                            <button
                                onClick={() => setPaperSize('letter')}
                                className={cn(
                                    "px-2 py-1 text-[10px] font-bold rounded transition-all",
                                    paperSize === 'letter' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
                                )}
                            >
                                LTR
                            </button>
                            <button
                                onClick={() => setPaperSize('a4')}
                                className={cn(
                                    "px-2 py-1 text-[10px] font-bold rounded transition-all",
                                    paperSize === 'a4' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
                                )}
                            >
                                A4
                            </button>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMaximized(!isMaximized)}
                            className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
                        >
                            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </Button>

                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSelect}
                            className="shadow-sm text-xs py-1.5"
                        >
                            {previewTemplate.isPremium && !hasPremiumAccess(subscription) ? (
                                <span className="flex items-center gap-1.5">
                                    <Lock className="w-3 h-3" />
                                    Upgrade to Use
                                </span>
                            ) : (
                                "Use Template"
                            )}
                        </Button>
                    </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 overflow-auto bg-neutral-200/50 p-6 flex justify-center min-h-0 bg-[radial-gradient(#c5c5c5_1px,transparent_1px)] [background-size:16px_16px]">
                    <div className={cn(
                        "origin-top shadow-2xl transition-all duration-500 ease-out bg-white",
                        isMaximized ? "scale-100" : "scale-[0.55] sm:scale-[0.75]"
                    )}>
                        <TemplateRenderer
                            templateId={previewTemplate.id}
                            data={getPreviewData(previewTemplate.id, realData)}
                            className={cn(
                                "transition-all duration-300",
                                paperSize === 'a4' ? 'w-[210mm] min-h-[297mm]' : 'w-[8.5in] min-h-[11in]'
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {templateRegistry.map((template) => (
                <button
                    key={template.id}
                    onClick={() => setPreviewTemplate(template)}
                    className={cn(
                        "relative group flex flex-col items-center p-3 rounded-xl border-2 transition-all hover:border-primary-400 hover:bg-white text-left overflow-hidden",
                        currentTemplateId === template.id
                            ? "border-primary-600 bg-primary-50/50 ring-2 ring-primary-100 shadow-sm"
                            : "border-neutral-200 bg-neutral-50/50 shadow-sm"
                    )}
                >
                    {/* Real Mini Preview */}
                    <div className="w-full aspect-[210/297] bg-white rounded-lg border border-neutral-200 mb-4 overflow-hidden shadow-sm group-hover:shadow-md transition-all relative">
                        {template.previewImage ? (
                            <div className="relative w-full h-full">
                                <NextImage
                                    src={template.previewImage}
                                    alt={template.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 400px) 50vw, 20vw"
                                />
                            </div>
                        ) : (
                            <div className="absolute inset-0 origin-top left-0 right-0 scale-[0.25] pointer-events-none">
                                <TemplateRenderer
                                    templateId={template.id}
                                    data={getPreviewData(template.id, realData)}
                                    className="w-[210mm] h-[297mm]"
                                />
                            </div>
                        )}

                        {/* Active Indicator Over Preview */}
                        {currentTemplateId === template.id && (
                            <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1.5 shadow-lg z-10 animate-in zoom-in-50 duration-200">
                                <Check className="w-4 h-4" />
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur-sm text-primary-600 font-bold text-[10px] px-3 py-1.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                Click to Preview
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-sm font-bold text-neutral-900 truncate">
                                {template.name}
                            </h3>
                            {template.isPremium && (
                                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                    Pro
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-neutral-500 line-clamp-1 italic">
                            {template.suitableFor.industries?.slice(0, 2).join(', ')}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    )
}
