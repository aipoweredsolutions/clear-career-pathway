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

    // Detect if template should use sidebar layout (Two-Column)
    const isSidebarLayout = 
        templateId.startsWith('modern') || 
        templateId.startsWith('professional') || 
        templateId.startsWith('elegant') || 
        templateId.startsWith('prestige') ||
        templateId.includes('sidebar')

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
