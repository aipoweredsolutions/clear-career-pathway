'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { templates } from '@/lib/templates/registry'

interface TemplateSelectorProps {
    currentTemplateId: string
    onSelect: (templateId: string) => void
}

export function TemplateSelector({ currentTemplateId, onSelect }: TemplateSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {templates.map((template) => (
                <button
                    key={template.id}
                    onClick={() => onSelect(template.id)}
                    className={cn(
                        "relative group flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:border-primary-300 hover:bg-neutral-50 text-left",
                        currentTemplateId === template.id
                            ? "border-primary-600 bg-primary-50 ring-2 ring-primary-200 ring-offset-2"
                            : "border-neutral-200"
                    )}
                >
                    {/* Preview Placeholder */}
                    <div className="w-full aspect-[210/297] bg-white rounded border border-neutral-200 mb-3 overflow-hidden shadow-sm group-hover:shadow-md transition-all relative">
                        {/* We could render a mini preview here, but for now a placeholder graphic */}
                        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-xs text-neutral-400">
                            {template.name} Preview
                        </div>

                        {/* Active Indicator */}
                        {currentTemplateId === template.id && (
                            <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1 shadow-sm">
                                <Check className="w-3 h-3" />
                            </div>
                        )}
                    </div>

                    <div className="w-full">
                        <h3 className="text-sm font-semibold text-neutral-900 truncate">
                            {template.name}
                        </h3>
                        <p className="text-xs text-neutral-500 line-clamp-2">
                            {template.description}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    )
}
