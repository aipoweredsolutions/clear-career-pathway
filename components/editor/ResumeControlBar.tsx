import React from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { Button } from '@/components/ui/Button'
import { DownloadButtons } from '@/components/editor/DownloadButtons'
import { Minimize2, Maximize2, Type, MoveHorizontal, File, Minus, Square, X } from 'lucide-react'
import { cn } from '@/lib/utils'

import { UserSubscription } from '@/lib/types/resume'

interface ResumeControlBarProps {
    data: ResumeDocument
    subscription: UserSubscription | null
    onUpdate: (data: ResumeDocument) => void
    isMaximized: boolean
    onToggleMaximize: () => void
    onClose?: () => void
    onMinimize?: () => void
    onMaximize?: () => void
}

export function ResumeControlBar({ data, subscription, onUpdate, isMaximized, onToggleMaximize, onClose, onMinimize, onMaximize }: ResumeControlBarProps) {
    const updateFormatting = (key: string, value: string) => {
        onUpdate({
            ...data,
            formatting: {
                ...data.formatting,
                [key]: value
            }
        })
    }

    return (
        <div className="bg-white border-b border-neutral-200 px-4 py-2 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                {/* Font Size */}
                <div className="flex items-center gap-2 border-r border-neutral-200 pr-4">
                    <Type className="w-4 h-4 text-neutral-400" />
                    <div className="flex bg-neutral-100 rounded-md p-0.5">
                        <button
                            onClick={() => updateFormatting('fontSize', 'small')}
                            className={cn(
                                "px-2 py-1 text-xs font-medium rounded transition-colors",
                                data.formatting?.fontSize === 'small' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            S
                        </button>
                        <button
                            onClick={() => updateFormatting('fontSize', 'medium')}
                            className={cn(
                                "px-2 py-1 text-xs font-medium rounded transition-colors",
                                (!data.formatting?.fontSize || data.formatting?.fontSize === 'medium') ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            M
                        </button>
                        <button
                            onClick={() => updateFormatting('fontSize', 'large')}
                            className={cn(
                                "px-2 py-1 text-xs font-medium rounded transition-colors",
                                data.formatting?.fontSize === 'large' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            L
                        </button>
                    </div>
                </div>

                {/* Margins */}
                <div className="flex items-center gap-2 border-r border-neutral-200 pr-4">
                    <MoveHorizontal className="w-4 h-4 text-neutral-400" />
                    <span className="text-xs font-medium text-neutral-500">Margin:</span>
                    <select
                        className="bg-neutral-100 border-none text-xs rounded h-7 focus:ring-0 cursor-pointer"
                        value={data.formatting?.margin || 'normal'}
                        onChange={(e) => updateFormatting('margin', e.target.value)}
                    >
                        <option value="narrow">Narrow</option>
                        <option value="normal">Normal</option>
                        <option value="wide">Wide</option>
                    </select>
                </div>

                {/* Line Height */}
                <div className="flex items-center gap-2 border-r border-neutral-200 pr-4">
                    <div className="flex flex-col gap-0.5 items-center justify-center w-4 h-4 text-neutral-400">
                        <div className="w-full h-px bg-current"></div>
                        <div className="w-full h-px bg-current"></div>
                        <div className="w-full h-px bg-current"></div>
                    </div>
                    <span className="text-xs font-medium text-neutral-500">Spacing:</span>
                    <select
                        className="bg-neutral-100 border-none text-xs rounded h-7 focus:ring-0 cursor-pointer"
                        value={data.formatting?.lineHeight || 'normal'}
                        onChange={(e) => updateFormatting('lineHeight', e.target.value)}
                    >
                        <option value="tight">Tight</option>
                        <option value="normal">Normal</option>
                        <option value="relaxed">Relaxed</option>
                    </select>
                </div>

                {/* Paper Size */}
                <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-neutral-400" />
                    <div className="flex bg-neutral-100 rounded-md p-0.5">
                        <button
                            onClick={() => updateFormatting('paperSize', 'letter')}
                            className={cn(
                                "px-2 py-1 text-xs font-medium rounded transition-colors",
                                (!data.formatting?.paperSize || data.formatting?.paperSize === 'letter') ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            US Letter
                        </button>
                        <button
                            onClick={() => updateFormatting('paperSize', 'a4')}
                            className={cn(
                                "px-2 py-1 text-xs font-medium rounded transition-colors",
                                data.formatting?.paperSize === 'a4' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            A4
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3 border-l border-neutral-200 pl-4 ml-auto">
                {/* Download buttons when maximized */}
                {isMaximized && (
                    <>
                        <DownloadButtons data={data} variant="toolbar" />
                        <div className="h-6 w-px bg-neutral-200" />
                    </>
                )}

                {/* Window Controls */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onMinimize}
                        className="w-8 h-8 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
                        title="Zoom Out / Minimize"
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={isMaximized ? onToggleMaximize : onMaximize}
                        className="w-8 h-8 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
                        title={isMaximized ? "Restore / Zoom In" : "Maximize Preview"}
                    >
                        {isMaximized ? (
                            <Square className="w-3.5 h-3.5 border-2 border-current rounded-sm" />
                        ) : (
                            <Square className="w-4 h-4" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose || onToggleMaximize}
                        className="w-8 h-8 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                        title="Close Preview"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
