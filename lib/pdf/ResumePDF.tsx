import React from 'react'
import { Document } from '@react-pdf/renderer'
import { ResumeDocument } from '@/lib/types/resume'
import { registerFonts } from './theme/fonts'
import { createStyles } from './theme/styles'
import { SidebarLayout } from './templates/SidebarLayout'
import { StandardLayout } from './templates/StandardLayout'
import { AtsProfessionalPDF } from './templates/AtsProfessionalPDF'
import { EliteAlpinePDF } from './templates/EliteAlpinePDF'

// Initialize fonts
registerFonts()

interface ResumePDFProps {
    data: ResumeDocument
    isWatermarked?: boolean
}

/**
 * Template-specific PDF generator registry.
 * Maps template ID prefixes to dedicated layout components.
 * Templates not listed here fall through to the generic StandardLayout or SidebarLayout.
 */
const TEMPLATE_GENERATORS: Record<string, React.ComponentType<any>> = {
    'ats-professional': AtsProfessionalPDF,
    'elite-alpine': EliteAlpinePDF,
}

/**
 * Resolves the best matching generator for a given templateId
 * by checking registered prefixes from most-specific to least.
 */
function resolveGenerator(templateId: string): React.ComponentType<any> | null {
    // Sort keys by length descending so longer (more specific) prefixes match first
    const sortedKeys = Object.keys(TEMPLATE_GENERATORS).sort((a, b) => b.length - a.length)
    for (const prefix of sortedKeys) {
        if (templateId.startsWith(prefix)) {
            return TEMPLATE_GENERATORS[prefix]
        }
    }
    return null
}

/**
 * Factory PDF Generator.
 * Dispatches to template-specific components when available,
 * otherwise falls back to the generic two-layout system.
 */
export const ResumePDF = ({ data, isWatermarked = false }: ResumePDFProps) => {
    const templateId = (data.templateId || 'classic').toLowerCase()
    const styles = createStyles(templateId)

    // Try to find a dedicated generator for this template
    const SpecificGenerator = resolveGenerator(templateId)

    // Detect if template should use sidebar layout (Two-Column) - used for fallback
    const isSidebarLayout = 
        templateId.startsWith('elegant-split') || 
        templateId.startsWith('prestige') ||
        templateId.startsWith('ats-sterling') ||
        templateId.startsWith('ats-classic-left') ||
        templateId.includes('sidebar')

    return (
        <Document
            title={`${data.personalInfo?.fullName || 'Resume'} - Clear Career Path`}
            author="Clear Career Path"
            subject="Resume"
            keywords="resume, cv, career"
        >
            {SpecificGenerator ? (
                <SpecificGenerator
                    data={data}
                    styles={styles}
                    isWatermarked={isWatermarked}
                />
            ) : isSidebarLayout ? (
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
