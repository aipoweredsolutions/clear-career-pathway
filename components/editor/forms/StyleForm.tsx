'use client'

import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'
import { Palette, Type, MoveHorizontal, File, Layout, Check } from 'lucide-react'
import { templateRegistry } from '@/lib/templates/registry'

interface StyleFormProps {
    data: ResumeDocument
    onChange: (data: ResumeDocument) => void
}

export function StyleForm({ data, onChange }: StyleFormProps) {
    const updateFormatting = (key: string, value: string) => {
        onChange({
            ...data,
            formatting: {
                ...data.formatting,
                [key]: value
            }
        })
    }

    const currentTemplate = templateRegistry.find(t => t.id === data.templateId)

    const ACCENT_COLORS = [
        { id: 'text-neutral-900', hex: '#171717', name: 'Classic Onyx' },
        { id: 'text-blue-900', hex: '#1e3a8a', name: 'Royal Navy' },
        { id: 'text-blue-700', hex: '#1d4ed8', name: 'Regent Blue' },
        { id: 'text-slate-700', hex: '#334155', name: 'Slate Reserve' },
        { id: 'text-emerald-800', hex: '#064e3b', name: 'Forest Deep' },
        { id: 'text-teal-700', hex: '#0f766e', name: 'Teal Authority' },
        { id: 'text-rose-800', hex: '#9f1239', name: 'Burgundy Heritage' },
        { id: 'text-amber-700', hex: '#b45309', name: 'Bronze Executive' }
    ]

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Template Identification */}
            <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-neutral-100">
                    <Layout className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Active Template</p>
                    <h3 className="text-lg font-bold text-neutral-900">{currentTemplate?.name || 'Professional Standard'}</h3>
                </div>
            </div>

            {/* Accent Color Picker */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-primary-600" />
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">Brand Accent</h4>
                </div>
                <p className="text-xs text-neutral-500 mb-4">Select a curated tone to define your professional presence.</p>
                
                <div className="grid grid-cols-4 gap-4">
                    {ACCENT_COLORS.map((color) => {
                        const isSelected = data.formatting?.accentColor === color.id || (!data.formatting?.accentColor && color.id === 'text-neutral-900')
                        return (
                            <button
                                key={color.id}
                                onClick={() => updateFormatting('accentColor', color.id)}
                                className={cn(
                                    "group relative flex flex-col items-center gap-2 transition-all",
                                    isSelected ? "scale-105" : "hover:scale-105"
                                )}
                            >
                                <div 
                                    className={cn(
                                        "w-12 h-12 rounded-2xl border-4 transition-all flex items-center justify-center shadow-sm",
                                        isSelected 
                                            ? "border-primary-500 ring-4 ring-primary-100 shadow-lg" 
                                            : "border-transparent group-hover:border-neutral-200"
                                    )}
                                    style={{ backgroundColor: color.hex }}
                                >
                                    {isSelected && <Check className="w-6 h-6 text-white drop-shadow-md" />}
                                </div>
                                <span className={cn(
                                    "text-[10px] font-bold text-center leading-tight transition-colors",
                                    isSelected ? "text-primary-600" : "text-neutral-400 group-hover:text-neutral-600"
                                )}>
                                    {color.name}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </section>

            <div className="h-px bg-neutral-100" />

            {/* Typography & Layout */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Font Size */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Type className="w-4 h-4 text-neutral-400" />
                        <h4 className="text-[11px] font-black text-neutral-500 uppercase tracking-widest">Typography</h4>
                    </div>
                    <div className="flex bg-neutral-100 p-1 rounded-xl">
                        {['small', 'medium', 'large'].map((size) => {
                            const active = data.formatting?.fontSize === size || (!data.formatting?.fontSize && size === 'medium')
                            return (
                                <button
                                    key={size}
                                    onClick={() => updateFormatting('fontSize', size)}
                                    className={cn(
                                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize",
                                        active ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    {size}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Line Spacing */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Layout className="w-4 h-4 text-neutral-400" />
                        <h4 className="text-[11px] font-black text-neutral-500 uppercase tracking-widest">Density</h4>
                    </div>
                    <div className="flex bg-neutral-100 p-1 rounded-xl">
                        {['tight', 'normal', 'relaxed'].map((space) => {
                            const active = data.formatting?.lineHeight === space || (!data.formatting?.lineHeight && space === 'normal')
                            return (
                                <button
                                    key={space}
                                    onClick={() => updateFormatting('lineHeight', space)}
                                    className={cn(
                                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize",
                                        active ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    {space}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Margins */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <MoveHorizontal className="w-4 h-4 text-neutral-400" />
                        <h4 className="text-[11px] font-black text-neutral-500 uppercase tracking-widest">Margins</h4>
                    </div>
                    <div className="flex bg-neutral-100 p-1 rounded-xl">
                        {['narrow', 'normal', 'wide'].map((margin) => {
                            const active = data.formatting?.margin === margin || (!data.formatting?.margin && margin === 'normal')
                            return (
                                <button
                                    key={margin}
                                    onClick={() => updateFormatting('margin', margin)}
                                    className={cn(
                                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize",
                                        active ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    {margin}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Paper Size */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-neutral-400" />
                        <h4 className="text-[11px] font-black text-neutral-500 uppercase tracking-widest">Paper</h4>
                    </div>
                    <div className="flex bg-neutral-100 p-1 rounded-xl">
                        {['letter', 'a4'].map((paper) => {
                            const active = data.formatting?.paperSize === paper || (!data.formatting?.paperSize && paper === 'letter')
                            return (
                                <button
                                    key={paper}
                                    onClick={() => updateFormatting('paperSize', paper)}
                                    className={cn(
                                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all uppercase",
                                        active ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    {paper === 'letter' ? 'US Letter' : 'A4'}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
