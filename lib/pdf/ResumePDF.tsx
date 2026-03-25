import React from 'react'
import { Document } from '@react-pdf/renderer'
import { ResumeDocument } from '@/lib/types/resume'
import { registerFonts } from './theme/fonts'
import { createStyles } from './theme/styles'
import { SidebarLayout } from './templates/SidebarLayout'
import { StandardLayout } from './templates/StandardLayout'

// Initialize fonts
registerFonts()

interface ResumePDFProps {
    data: ResumeDocument
    isWatermarked?: boolean
}

/**
 * Refactored Dynamic PDF Template Generator
 * Dispatches to specific layout components based on template metadata
 */
export const ResumePDF = ({ data, isWatermarked = false }: ResumePDFProps) => {
    const templateId = (data.templateId || 'classic').toLowerCase()
    const styles = createStyles(templateId)

    // Layout Dispatch Logic
    const isSidebarLayout = (
        templateId.startsWith('modern') || 
        templateId.startsWith('technical') || 
        templateId.startsWith('startup') || 
        templateId.startsWith('chic') || 
        templateId.startsWith('creative') || 
        templateId.startsWith('split-contrast') || 
        templateId.startsWith('cute') || 
        templateId.startsWith('service') || 
        templateId.startsWith('hospitality') || 
        templateId.startsWith('cruise') || 
        templateId.startsWith('nursing') || 
        templateId.startsWith('chef') || 
        templateId.startsWith('hotel') ||
        templateId.startsWith('revenue-leader') ||
        templateId.startsWith('military-transition') ||
        templateId.startsWith('real-estate-pro') ||
        templateId.startsWith('trades-pro') ||
        templateId.startsWith('international-cv')
    ) && !templateId.startsWith('ats')

    return (
        <Document
            title={`${data.personalInfo?.fullName || 'Resume'} - Clear Career Path`}
            author="Clear Career Path"
            subject="Resume"
            keywords="resume, cv, career"
        >
            {isSidebarLayout ? (
                <SidebarLayout 
                    data={data} 
                    styles={styles} 
                    templateId={templateId} 
                    isWatermarked={isWatermarked} 
                />
            ) : (
                <StandardLayout 
                    data={data} 
                    styles={styles} 
                    templateId={templateId} 
                    isWatermarked={isWatermarked} 
                />
            )}
        </Document>
    )
}
