'use client'

import React from 'react'
import { X, Check } from 'lucide-react'
import { Dialog } from '@headlessui/react'
import { TemplateMetadata } from '@/lib/types/resume'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { MOCK_PREVIEW_DATA } from '@/lib/constants/mock-data'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface TemplatePreviewDialogProps {
    isOpen: boolean
    onClose: () => void
    template: TemplateMetadata | null
    initialColor?: string
}

export function TemplatePreviewDialog({ isOpen, onClose, template, initialColor }: TemplatePreviewDialogProps) {
    if (!template) return null

    // Create data with the selected template ID
    const previewData = {
        ...MOCK_PREVIEW_DATA,
        templateId: template.id
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${isOpen ? '' : 'hidden'}`}>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dialog Panel */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-white">
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900">{template.name}</h3>
                        <p className="text-sm text-neutral-500">{template.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={`/auth/signup?template=${template.id}`}>
                            <Button size="lg" className="shadow-lg">
                                Use This Template
                            </Button>
                        </Link>
                        <button
                            onClick={onClose}
                            className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex bg-neutral-100">
                    {/* Sidebar Info */}
                    <div className="w-64 bg-white border-r border-neutral-200 p-6 overflow-y-auto hidden lg:block">
                        <h4 className="font-semibold text-neutral-900 mb-4">Best Suited For</h4>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Industries</p>
                                <ul className="space-y-1">
                                    {template.suitableFor.industries?.map(ind => (
                                        <li key={ind} className="text-sm text-neutral-700 flex items-center">
                                            <Check className="w-3 h-3 mr-2 text-green-500" />
                                            {ind}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Career Level</p>
                                <div className="flex flex-wrap gap-2">
                                    {template.suitableFor.careerLevels.map(level => (
                                        <span key={level} className="text-xs bg-neutral-100 px-2 py-1 rounded capitalize text-neutral-600">
                                            {level}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Canvas */}
                    <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-neutral-100">
                        <div className="origin-top scale-[0.7] md:scale-[0.8] lg:scale-[0.9] shadow-2xl transition-all">
                            {/* 
                                Here we construct the variant ID dynamically.
                                Registry ID: 'cute'
                                Color ID: 'pink'
                                Render ID: 'cute-pink' (or just 'cute' if default)
                                
                                We need to be careful. My renderer expects 'cute-pink'.
                                But 'classic' + 'blue' -> 'classic-blue'.
                            */}
                            <TemplateRenderer
                                templateId={template.id === 'cute' ? `cute-${initialColor}` :
                                    template.id === 'modern' ? `modern-${initialColor}`.replace('-slate', '') : // modern default is dark/slate
                                        template.id === 'classic' ? `classic-${initialColor}`.replace('-blue', '') : // classic default is blue?
                                            `${template.id}-${initialColor}`.replace('-standard', '').replace('-undefined', '')}
                                data={previewData}
                                className="min-h-[11in] pointer-events-none select-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
