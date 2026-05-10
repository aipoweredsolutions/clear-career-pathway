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
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const sampleData = getSampleDataForTemplate(templateId)

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden flex items-start justify-center bg-white">
            {isVisible ? (
                <div className="absolute top-0 origin-top transform scale-[0.25] w-[400%] shadow-2xl transition-opacity duration-1000 animate-in fade-in">
                    <TemplateRenderer 
                        templateId={templateId} 
                        data={sampleData} 
                        className="w-[210mm] min-h-[297mm] mx-auto" 
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
