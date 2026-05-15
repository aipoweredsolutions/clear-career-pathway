'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { ResumeDocument } from '@/lib/types/resume'

interface Props {
    templateId: string
    sampleData: ResumeDocument
}

export function ScrollableDevicePreview({ templateId, sampleData }: Props) {
    const [zoom, setZoom] = useState(0.65)
    const [totalHeight, setTotalHeight] = useState(0)
    
    const containerRef = useRef<HTMLDivElement>(null)
    const measureRef = useRef<HTMLDivElement>(null)

    const paperSize = sampleData.formatting?.paperSize || 'a4'
    const isA4 = paperSize === 'a4'
    
    // Exact CSS dimensions
    const widthCSS = isA4 ? '210mm' : '8.5in'
    const heightCSS = isA4 ? '297mm' : '11in'
    
    // Pixel dimensions at 96 DPI for math calculations
    const pixelWidth = isA4 ? 793.7 : 816
    const pixelHeight = isA4 ? 1122.5 : 1056

    // Margins (in pixels) to simulate unprintable area / text flow gap
    const topMarginPx = 60
    const bottomMarginPx = 60

    useEffect(() => {
        if (!containerRef.current) return

        const widthObserver = new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect
            setZoom(width / pixelWidth)
        })
        widthObserver.observe(containerRef.current)

        return () => widthObserver.disconnect()
    }, [pixelWidth])

    useEffect(() => {
        if (!measureRef.current) return

        const heightObserver = new ResizeObserver((entries) => {
            const { height } = entries[0].contentRect
            if (height !== totalHeight) setTotalHeight(height)
        })
        heightObserver.observe(measureRef.current)

        return () => heightObserver.disconnect()
    }, [totalHeight])

    // Calculate number of pages based on the available content window
    const firstPageContentHeight = pixelHeight - bottomMarginPx
    const subsequentPageContentHeight = pixelHeight - topMarginPx - bottomMarginPx
    
    let numPages = 1
    if (totalHeight > firstPageContentHeight) {
        const remainingHeight = totalHeight - firstPageContentHeight
        numPages = 1 + Math.ceil(remainingHeight / subsequentPageContentHeight)
    }

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-[400px] sm:h-[600px] bg-neutral-200/80 overflow-y-auto overflow-x-hidden custom-scrollbar group/scroll flex flex-col items-center py-10"
        >
            <div 
                className="origin-top relative flex flex-col transition-transform duration-500" 
                style={{ zoom, gap: '40px' }}
            >
                {/* ── MEASUREMENT LAYER ── */}
                <div 
                    ref={measureRef} 
                    className="absolute top-0 left-0 opacity-0 pointer-events-none" 
                    style={{ width: widthCSS }}
                >
                    <TemplateRenderer templateId={templateId} data={sampleData} />
                </div>

                {/* ── VISUAL PAGES ── */}
                {Array.from({ length: numPages }).map((_, index) => {
                    // Calculate exactly which chunk of the continuous template to show on this page
                    let contentStart = 0
                    let contentHeight = 0
                    let topOffsetOnPaper = 0

                    if (index === 0) {
                        contentStart = 0
                        contentHeight = firstPageContentHeight
                        topOffsetOnPaper = 0
                    } else {
                        contentStart = firstPageContentHeight + (index - 1) * subsequentPageContentHeight
                        contentHeight = subsequentPageContentHeight
                        topOffsetOnPaper = topMarginPx
                    }

                    return (
                        <div 
                            key={index}
                            className="relative bg-white shadow-[0_20px_25px_rgba(0,0,0,0.1),0_8px_10px_rgba(0,0,0,0.05)] overflow-hidden"
                            style={{ width: widthCSS, height: heightCSS }}
                        >
                            {/* The "Printable Area" Clip Window */}
                            <div 
                                className="absolute left-0 w-full overflow-hidden"
                                style={{ 
                                    top: `${topOffsetOnPaper}px`, 
                                    height: `${contentHeight}px` 
                                }}
                            >
                                {/* The shifted template content */}
                                <div 
                                    className="absolute left-0 w-full"
                                    style={{ top: `-${contentStart}px` }}
                                >
                                    <TemplateRenderer
                                        templateId={templateId}
                                        data={sampleData}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Page number indicator at the bottom right */}
                            <div className="absolute bottom-4 right-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest z-10">
                                {index + 1} / {numPages}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


