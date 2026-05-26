import React from 'react'
import { Page, View, Text } from '@react-pdf/renderer'
import { ContactInfo } from '../sections/ContactInfo'
import { RenderSection } from '../sections/DynamicSections'

export const EliteAlpinePDF = ({ data, styles, isWatermarked }: any) => {
    const defaultOrder = [
        'professionalSummary',
        'workExperience',
        'education',
        'skills',
        'projects',
        'certifications',
        'achievements',
        'languages',
        'references'
    ]

    const sectionOrder = data.sectionOrder && data.sectionOrder.length > 0 ? data.sectionOrder : defaultOrder

    return (
        <Page size={data.formatting?.paperSize === 'a4' ? 'A4' : 'LETTER'} style={[styles.page, { padding: 40 }]}>
            {/* Repeating header for page 2+ */}
            <View 
                fixed 
                style={styles.pageHeader}
                render={({ pageNumber }) => (
                    pageNumber > 1 ? (
                        <View style={{ width: '100%', alignItems: 'flex-start' }}>
                            <Text style={styles.pageHeaderName}>{data.personalInfo?.fullName}</Text>
                            <View style={styles.pageHeaderLine} />
                        </View>
                    ) : null
                )} 
            />

            {/* Elite Alpine Header (Left-aligned, elegant) */}
            <View style={{ marginBottom: 25 }}>
                <Text style={{ fontSize: 32, fontWeight: 900, textTransform: 'uppercase', letterSpacing: -0.5, marginBottom: 4 }}>
                    {data.personalInfo?.fullName || 'Untitled'}
                </Text>
                <Text style={{ fontSize: 12, letterSpacing: 1.5, color: styles.name?.color || '#334155', marginBottom: 12 }}>
                    {data.personalInfo?.professionalTitle || ''}
                </Text>
                <ContactInfo data={data} styles={styles} separator="   •   " />
            </View>

            {/* Render Body Sections */}
            {sectionOrder.map((sectionId: string, index: number) => (
                <RenderSection 
                    key={sectionId} 
                    sectionId={sectionId} 
                    data={data} 
                    styles={styles} 
                    templateId="elite-alpine" 
                    index={index} 
                />
            ))}
            
            {isWatermarked && <Text style={styles.watermark} fixed>Created with Clear Career Path</Text>}
        </Page>
    )
}
