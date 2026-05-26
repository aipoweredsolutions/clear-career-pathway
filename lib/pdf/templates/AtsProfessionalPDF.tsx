import React from 'react'
import { Page, View, Text } from '@react-pdf/renderer'
import { ContactInfo } from '../sections/ContactInfo'
import { RenderSection } from '../sections/DynamicSections'

export const AtsProfessionalPDF = ({ data, styles, isWatermarked }: any) => {
    // ATS Professional specific section order
    const defaultOrder = [
        'professionalSummary',
        'skills',
        'workExperience',
        'education',
        'certifications',
        'achievements',
        'projects',
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
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={styles.pageHeaderName}>{data.personalInfo?.fullName}</Text>
                            <View style={styles.pageHeaderLine} />
                        </View>
                    ) : null
                )} 
            />

            {/* ATS Professional Header */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {data.personalInfo?.fullName || 'Your Name'}
                </Text>
                <Text style={{ fontSize: 11, letterSpacing: 2, color: styles.name?.color || '#1e3a8a', marginBottom: 12, textTransform: 'uppercase' }}>
                    {data.personalInfo?.professionalTitle || ''}
                </Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#e5e7eb', marginBottom: 10 }} />
                <ContactInfo data={data} styles={styles} separator=" | " />
                <View style={{ width: '100%', height: 1, backgroundColor: '#e5e7eb', marginTop: 10 }} />
            </View>

            {/* Render Body Sections */}
            {sectionOrder.map((sectionId: string, index: number) => (
                <RenderSection 
                    key={sectionId} 
                    sectionId={sectionId} 
                    data={data} 
                    styles={styles} 
                    templateId="ats-professional" 
                    index={index} 
                />
            ))}
            
            {isWatermarked && <Text style={styles.watermark} fixed>Created with Clear Career Path</Text>}
        </Page>
    )
}
