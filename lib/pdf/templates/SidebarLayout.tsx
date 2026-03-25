import React from 'react'
import { Page, View, Image, Text } from '@react-pdf/renderer'
import { ContactInfo } from '../sections/ContactInfo'
import { SkillsSection } from '../sections/SkillsSection'
import { RenderSection } from '../sections/DynamicSections'

export const SidebarLayout = ({ data, styles, templateId, isWatermarked }: any) => {
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
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                {/* Sidebar */}
                <View style={styles.sidebar} fixed>
                    {data.personalInfo?.photoUrl && (
                        <View style={{ marginBottom: 20, alignItems: 'center' }}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image
                                src={data.personalInfo.photoUrl}
                                style={styles.photo}
                            />
                        </View>
                    )}

                    {!data.personalInfo?.photoUrl && templateId.startsWith('modern') && (
                         <View style={styles.initialsCircle}>
                            <Text style={styles.initialsText}>
                                {data.personalInfo?.fullName ? data.personalInfo.fullName.split(' ').map((n: any) => n[0]).join('') : 'RN'}
                            </Text>
                        </View>
                    )}

                    <ContactInfo data={data} styles={styles} isSidebar={true} />
                    
                    <SkillsSection data={data} styles={styles} templateId={templateId} isSidebar={true} />
                </View>

                {/* Main Content */}
                <View style={styles.mainContent}>
                    {templateId.startsWith('technical') ? (
                        <View style={styles.terminalHeader}>
                            <View style={styles.terminalDots}>
                                <View style={[styles.terminalDot, { backgroundColor: '#ff5f56' }]} />
                                <View style={[styles.terminalDot, { backgroundColor: '#ffbd2e' }]} />
                                <View style={[styles.terminalDot, { backgroundColor: '#27c93f' }]} />
                            </View>
                            <Text style={[styles.name, { fontSize: 20 }]}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                            <Text style={styles.title}>{data.personalInfo?.title || ''}</Text>
                        </View>
                    ) : (
                        <View style={styles.header}>
                            <Text style={styles.name}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                            <Text style={styles.title}>{data.personalInfo?.title || ''}</Text>
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
                </View>
            </View>
            {isWatermarked && <Text style={styles.watermark} fixed>Created with Clear Career Path</Text>}
        </Page>
    )
}
