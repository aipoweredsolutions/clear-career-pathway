import React from 'react'
import { Page, View, Image, Text } from '@react-pdf/renderer'
import { ContactInfo } from '../sections/ContactInfo'
import { RenderSection } from '../sections/DynamicSections'

export const StandardLayout = ({ data, styles, templateId, isWatermarked }: any) => {
    const sectionOrder = data.sectionOrder || [
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

    return (
        <Page size="A4" style={[styles.page, { padding: 40 }]}>
            {templateId.startsWith('technical') ? (
                <View style={styles.terminalHeader}>
                    <View style={styles.terminalDots}>
                        <View style={[styles.terminalDot, { backgroundColor: '#ff5f56' }]} />
                        <View style={[styles.terminalDot, { backgroundColor: '#ffbd2e' }]} />
                        <View style={[styles.terminalDot, { backgroundColor: '#27c93f' }]} />
                    </View>
                    <Text style={[styles.name, { fontSize: 20 }]}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                    <Text style={styles.title}>{data.personalInfo?.title || ''}</Text>
                    <ContactInfo data={data} styles={styles} />
                </View>
            ) : (
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                        <Text style={styles.title}>{data.personalInfo?.title || ''}</Text>
                        <ContactInfo data={data} styles={styles} />
                    </View>
                    {data.personalInfo?.photoUrl && 
                     (templateId.includes('hospitality') || templateId.includes('cruise')) && 
                     !templateId.startsWith('ats') && (
                        /* eslint-disable-next-line jsx-a11y/alt-text */
                        <Image
                            src={data.personalInfo.photoUrl}
                            style={styles.photo}
                        />
                    )}
                </View>
            )}

            {sectionOrder.map((sectionId: string, index: number) => (
                <RenderSection 
                    key={sectionId} 
                    sectionId={sectionId} 
                    data={data} 
                    styles={styles} 
                    templateId={templateId} 
                    index={index} 
                />
            ))}
            
            {isWatermarked && <Text style={styles.watermark} fixed>Created with Clear Career Path</Text>}
        </Page>
    )
}
