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
            {templateId.includes('technical') ? (
                <View style={styles.terminalHeader}>
                    <View style={styles.terminalDots}>
                        <View style={[styles.terminalDot, { backgroundColor: '#ff5f56' }]} />
                        <View style={[styles.terminalDot, { backgroundColor: '#ffbd2e' }]} />
                        <View style={[styles.terminalDot, { backgroundColor: '#27c93f' }]} />
                    </View>
                    <Text style={[styles.name, { fontSize: 20 }]}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                    <Text style={styles.title}>{data.personalInfo?.professionalTitle || data.personalInfo?.title || ''}</Text>
                    <ContactInfo data={data} styles={styles} />
                </View>
            ) : templateId.includes('bauhaus') ? (
                <View style={[styles.header, { borderBottomWidth: 0, marginBottom: 30 }]}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        {(() => {
                            const name = data.personalInfo?.fullName || 'Untitled'
                            const parts = name.split(' ')
                            if (parts.length >= 2) {
                                const last = parts.pop()
                                const rest = parts.join(' ')
                                return (
                                    <View>
                                        <Text style={[styles.name, { fontSize: 40, marginBottom: 0, fontWeight: 900 }]}>{rest}</Text>
                                        <Text style={[styles.name, { fontSize: 40, fontWeight: 300, color: styles.title.color }]}>{last}</Text>
                                    </View>
                                )
                            }
                            return <Text style={[styles.name, { fontSize: 40 }]}>{name}</Text>
                        })()}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15, marginBottom: 15 }}>
                            <View style={{ width: 40, height: 4, backgroundColor: '#171717' }} />
                            <Text style={[styles.title, { marginBottom: 0, fontSize: 10, letterSpacing: 2 }]}>
                                {data.personalInfo?.professionalTitle || data.personalInfo?.title || ''}
                            </Text>
                        </View>
                        <ContactInfo data={data} styles={styles} />
                    </View>
                </View>
            ) : templateId.includes('chronograph') ? (
                <View style={[styles.header, { alignItems: 'flex-start', textAlign: 'left', borderBottomWidth: 0 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', borderBottomWidth: 3, borderBottomColor: '#171717', paddingBottom: 10 }}>
                        <View>
                            <Text style={[styles.name, { fontSize: 32, marginBottom: 0 }]}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                            <Text style={[styles.title, { fontSize: 11, marginTop: 4, letterSpacing: 3 }]}>{data.personalInfo?.professionalTitle || data.personalInfo?.title || ''}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <ContactInfo data={data} styles={styles} />
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                        <Text style={styles.title}>{data.personalInfo?.professionalTitle || data.personalInfo?.title || ''}</Text>
                        <ContactInfo data={data} styles={styles} />
                    </View>
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
