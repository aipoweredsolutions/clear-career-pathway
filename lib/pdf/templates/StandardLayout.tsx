import React from 'react'
import { Page, View, Image, Text } from '@react-pdf/renderer'
import { ContactInfo } from '../sections/ContactInfo'
import { RenderSection } from '../sections/DynamicSections'

export const StandardLayout = ({ data, styles, templateId, isWatermarked }: any) => {
    let defaultOrder = [
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

    // Sync PDF default order with specific hardcoded DOM templates
    if (templateId.startsWith('ats-professional')) {
        defaultOrder = [
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
    } else if (templateId.startsWith('ats-graduate') || templateId === 'graduate') {
        defaultOrder = [
            'professionalSummary',
            'education',
            'skills',
            'projects',
            'workExperience',
            'certifications',
            'achievements',
            'languages',
            'references'
        ]
    }

    const sectionOrder = data.sectionOrder && data.sectionOrder.length > 0 ? data.sectionOrder : defaultOrder

    return (
        <Page size="A4" style={[styles.page, { padding: 40 }]}>
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
            ) : templateId.startsWith('ats-executive') ? (
                <View style={[styles.header, { borderBottomWidth: 4, borderBottomColor: styles.name.color || '#171717', paddingBottom: 15, marginBottom: 20 }]}>
                    <Text style={[styles.name, { fontSize: 32, marginBottom: 6, letterSpacing: -0.5, textTransform: 'uppercase' }]}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Text style={[styles.title, { fontSize: 11, marginBottom: 0, letterSpacing: 1, textTransform: 'uppercase' }]}>{data.personalInfo?.professionalTitle || data.personalInfo?.title || ''}</Text>
                        <ContactInfo data={data} styles={styles} />
                    </View>
                </View>
            ) : templateId.startsWith('ats-gold-standard') ? (
                <View style={[styles.header, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 25, paddingTop: 5 }]}>
                    <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                        <Text style={[styles.name, { 
                            fontSize: 24, 
                            letterSpacing: 2, 
                            marginBottom: 4, 
                            fontFamily: 'Playfair Display',
                            textTransform: 'uppercase'
                        }]}>
                            {data.personalInfo?.fullName || 'Untitled'}
                        </Text>
                        <Text style={[styles.title, { 
                            fontSize: 9, 
                            letterSpacing: 2.5, 
                            marginBottom: 15, 
                            color: '#94a3b8',
                            textTransform: 'uppercase'
                        }]}>
                            {data.personalInfo?.professionalTitle || data.personalInfo?.title || ''}
                        </Text>
                        <View style={{ 
                            width: '90%', 
                            borderTopWidth: 0.5, 
                            borderBottomWidth: 0.5, 
                            borderColor: '#e2e8f0', 
                            paddingVertical: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ContactInfo data={data} styles={styles} separator="|" />
                        </View>
                    </View>
                </View>
            ) : templateId.startsWith('elite-london') ? (
                <View style={[styles.header, { borderBottomWidth: 0, marginBottom: 20 }]}>
                    <Text style={[styles.name, { fontSize: 36, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }]}>
                        {data.personalInfo?.fullName || 'Untitled'}
                    </Text>
                    <Text style={[styles.title, { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 15, color: '#64748b' }]}>
                        {data.personalInfo?.professionalTitle || ''}
                    </Text>
                    <View style={{ width: '100%', borderTopWidth: 1.5, borderColor: '#171717', paddingTop: 8, paddingBottom: 8 }}>
                        <ContactInfo data={data} styles={styles} separator="|" />
                    </View>
                </View>
            ) : (
                <View style={styles.header}>
                    <View style={{ 
                        flex: styles.header.flexDirection === 'row' ? 1 : undefined,
                        alignItems: styles.header.textAlign === 'center' ? 'center' : 'flex-start',
                        width: styles.header.flexDirection === 'row' ? 'auto' : '100%'
                    }}>
                        <Text style={[styles.name, { textAlign: styles.header.textAlign as any }]}>{data.personalInfo?.fullName || 'Untitled'}</Text>
                        {(data.personalInfo?.professionalTitle || data.personalInfo?.title) && (
                            <Text style={[styles.title, { textAlign: styles.header.textAlign as any, marginBottom: styles.header.flexDirection === 'row' ? 0 : 6 }]}>{data.personalInfo?.professionalTitle || data.personalInfo?.title}</Text>
                        )}
                    </View>
                    <View style={{ 
                        alignItems: styles.header.textAlign === 'center' ? 'center' : 'flex-end', 
                        marginTop: 0,
                        width: styles.header.flexDirection === 'row' ? 'auto' : '100%'
                    }}>
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
