'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { getSampleDataForTemplate } from '@/lib/utils/template-sample-data'
import { Skeleton } from '@/components/ui/Skeleton'

interface Props {
    templateId: string
    sampleDataKey: string
    title: string
}

export function LiveTemplatePreview({ templateId, sampleDataKey, title }: Props) {
    const [isVisible, setIsVisible] = useState(false)
    const [scale, setScale] = useState(0.28) // Default fallback scale
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // 1. Intersection Observer for lazy loading
        const visObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    visObserver.disconnect()
                }
            },
            { threshold: 0.05, rootMargin: '200px' }
        )
        visObserver.observe(containerRef.current)

        // 2. Resize Observer for dynamic scaling based on container width
        // A4 width (210mm) is approx 793.7px at 96 DPI
        const resObserver = new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect
            setScale(width / 793.7)
        })
        resObserver.observe(containerRef.current)

        return () => {
            visObserver.disconnect()
            resObserver.disconnect()
        }
    }, [])

    // Pass sampleDataKey for role-specific data matching
    const sampleData = getSampleDataForTemplate(templateId, sampleDataKey)

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden flex items-start justify-center bg-white">
            {isVisible ? (
                <div
                    className="absolute top-0 left-0 origin-top-left shadow-2xl transition-opacity duration-1000 animate-in fade-in"
                    style={{
                        transform: `scale(${scale})`,
                        width: '210mm',
                        height: '297mm', // Adding height prevents clipping issues during scaling
                    }}
                >
                    <TemplateRenderer 
                        templateId={templateId} 
                        data={sampleData} 
                        className="w-full h-full mx-auto pointer-events-none select-none" 
                    />
                </div>
            ) : (
                <div className="p-4 w-full space-y-4 opacity-10">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="pt-8 space-y-2">
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-2 w-full" />
                    </div>
                </div>
            )}
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </div>
    )
}
