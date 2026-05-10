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
            ) : templateId.startsWith('ats-academia-cv') ? (
                <View style={[styles.header, { borderBottomWidth: 0, marginBottom: 20, alignItems: 'center', textAlign: 'center' }]}>
                    <Text style={[styles.name, { fontSize: 24, fontWeight: 'bold', marginBottom: 4 }]}>
                        {data.personalInfo?.fullName || 'Your Name'}
                    </Text>
                    <Text style={[styles.title, { fontSize: 11, letterSpacing: 1, color: '#737373', marginBottom: 12 }]}>
                        {data.personalInfo?.professionalTitle || ''}
                    </Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#d4d4d4', marginBottom: 10 }} />
                    <ContactInfo data={data} styles={styles} separator=" · " />
                </View>
            ) : templateId.startsWith('ats-modern') ? (
                <View style={[styles.header, { borderBottomWidth: 2, borderBottomColor: '#f3f4f6', pb: 15, mb: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.name, { fontSize: 36, fontWeight: 900, letterSpacing: -1, marginBottom: 4, lineHeight: 1 }]}>
                            {data.personalInfo?.fullName || 'Your Name'}
                        </Text>
                        <Text style={[styles.title, { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: styles.name.color || '#171717', opacity: 0.8 }]}>
                            {data.personalInfo?.professionalTitle || ''}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 2 }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#171717' }}>
                            {[data.personalInfo?.city, data.personalInfo?.country].filter(Boolean).join(', ')}
                        </Text>
                        <Text style={{ fontSize: 9, color: '#737373' }}>{data.personalInfo?.email}</Text>
                        <Text style={{ fontSize: 9, color: '#737373' }}>{data.personalInfo?.phone}</Text>
                        {data.personalInfo?.linkedinUrl && (
                            <Text style={{ fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: styles.name.color || '#171717', marginTop: 2 }}>
                                {data.personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                            </Text>
                        )}
                    </View>
                </View>
            ) : templateId.includes('chronograph') ? (
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
            ) : templateId.startsWith('ats-editorial') ? (
                <View style={[styles.header, { borderBottomWidth: 2, borderBottomColor: '#171717', paddingBottom: 15, marginBottom: 20 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
                        <View>
                            {(() => {
                                const name = data.personalInfo?.fullName || 'NAME'
                                const parts = name.split(' ')
                                return (
                                    <View>
                                        <Text style={[styles.name, { fontSize: 32, lineHeight: 0.85, marginBottom: 0, fontWeight: 900, textTransform: 'uppercase' }]}>
                                            {parts[0]}
                                        </Text>
                                        <Text style={[styles.name, { fontSize: 32, lineHeight: 0.85, marginBottom: 0, fontWeight: 900, textTransform: 'uppercase' }]}>
                                            {parts.slice(1).join(' ')}.
                                        </Text>
                                    </View>
                                )
                            })()}
                        </View>
                        <View style={{ maxWidth: 200, textAlign: 'right' }}>
                            <Text style={[styles.title, { fontSize: 11, fontStyle: 'italic', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: 2 }]}>
                                {data.personalInfo?.professionalTitle || ''}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : templateId.startsWith('ats-masthead') ? (
                <View style={[styles.header, { borderBottomWidth: 0, marginBottom: 30, alignItems: 'center' }]}>
                    <View style={{ width: '100%', height: 2, backgroundColor: '#171717', marginBottom: 15 }} />
                    <Text style={[styles.name, { fontSize: 24, letterSpacing: 8, fontWeight: 300, textTransform: 'uppercase', marginBottom: 6 }]}>
                        {data.personalInfo?.fullName || 'Your Name'}
                    </Text>
                    <Text style={[styles.title, { fontSize: 11, letterSpacing: 3, fontStyle: 'italic', color: '#737373', marginBottom: 15 }]}>
                        {data.personalInfo?.professionalTitle || ''}
                    </Text>
                    <View style={{ width: '100%', height: 2, backgroundColor: '#171717', marginBottom: 15 }} />
                    <ContactInfo data={data} styles={styles} separator="·" />
                </View>
            ) : templateId.startsWith('ats-metro') ? (
                <View style={[styles.header, { borderBottomWidth: 0, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#171717', padding: 20, borderRadius: 4 }]}>
                    <View>
                        <Text style={[styles.name, { fontSize: 24, color: '#ffffff', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }]}>
                            {data.personalInfo?.fullName || 'Your Name'}
                        </Text>
                        <Text style={[styles.title, { fontSize: 10, color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: 2 }]}>
                            {data.personalInfo?.professionalTitle || ''}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <ContactInfo data={data} styles={styles} />
                    </View>
                </View>
            ) : templateId.startsWith('elite-london') ? (
                <View style={[styles.header, { borderBottomWidth: 0, marginBottom: 25, alignItems: 'center', textAlign: 'center' }]}>
                    <Text style={[styles.name, { fontSize: 34, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }]}>
                        {data.personalInfo?.fullName || 'Untitled'}
                    </Text>
                    <Text style={[styles.title, { fontSize: 10, fontWeight: 'medium', textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 12, color: '#737373' }]}>
                        {data.personalInfo?.professionalTitle || ''}
                    </Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#171717', marginBottom: 10 }} />
                    <ContactInfo data={data} styles={styles} separator="|" />
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
