import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { getSectionTitle } from '../theme/titles'

interface SectionProps {
    title: string
    styles: any
    children: React.ReactNode
    isFirst?: boolean
    templateId?: string
    index?: number
}

export const Section = ({ title, styles, children, isFirst, templateId = '', index = 0 }: SectionProps) => {
    if (!title) return <View style={[styles.section, isFirst && styles.sectionFirst]}>{children}</View>
    
    if (templateId.includes('bauhaus')) {
        const numStr = (index + 1).toString().padStart(2, '0')
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 15, marginBottom: 15, marginTop: 10 }}>
                    <View style={{ width: 35, height: 35, backgroundColor: styles.sectionTitle.color || '#171717', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>{numStr}</Text>
                    </View>
                    <View style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#171717', paddingBottom: 2 }}>
                        <Text style={[styles.sectionTitle, { marginBottom: 0, paddingBottom: 0, borderBottomWidth: 0 }]}>{title}</Text>
                    </View>
                </View>
                <View style={{ paddingLeft: 50 }}>
                    {children}
                </View>
            </View>
        )
    }

    if (templateId.startsWith('ats-editorial')) {
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ marginTop: 24, marginBottom: 15 }}>
                    <Text style={[styles.sectionTitle, { 
                        fontSize: 8.5,
                        letterSpacing: 4,
                        marginBottom: 10, 
                        paddingBottom: 0, 
                        borderBottomWidth: 0,
                        fontWeight: 900
                    }]}>
                        {title}
                    </Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#f3f4f6' }} />
                </View>
                <View>
                    {children}
                </View>
            </View>
        )
    }

    if (templateId.startsWith('ats-gold-standard')) {
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ marginTop: 22, marginBottom: 12 }}>
                    <Text style={[styles.sectionTitle, { 
                        fontSize: 10,
                        letterSpacing: 3,
                        marginBottom: 4, 
                        paddingBottom: 0, 
                        borderBottomWidth: 0 
                    }]}>
                        {title}
                    </Text>
                    <View style={{ width: '100%', height: 1.5, backgroundColor: styles.sectionTitle.color || '#171717', marginBottom: 1 }} />
                    <View style={{ width: '100%', height: 0.5, backgroundColor: styles.sectionTitle.color || '#171717', opacity: 0.3 }} />
                </View>
                <View style={{ paddingLeft: 4, paddingRight: 4 }}>
                    {children}
                </View>
            </View>
        )
    }

    if (templateId.startsWith('ats-academia-cv')) {
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ marginTop: 22, marginBottom: 10 }}>
                    <Text style={[styles.sectionTitle, { 
                        fontSize: 11,
                        letterSpacing: 1.5,
                        marginBottom: 6, 
                        paddingBottom: 6, 
                        borderBottomWidth: 1,
                        borderBottomColor: '#a3a3a3',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                    }]}>
                        {title}
                    </Text>
                </View>
                <View>
                    {children}
                </View>
            </View>
        )
    }

    if (templateId.startsWith('ats-modern')) {
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 18, marginBottom: 10 }}>
                    <View style={{ width: 3.5, height: 16, backgroundColor: styles.sectionTitle.color || '#171717', borderRadius: 2 }} />
                    <Text style={[styles.sectionTitle, { 
                         fontSize: 9,
                         letterSpacing: 2,
                         marginBottom: 0, 
                         paddingBottom: 0, 
                         borderBottomWidth: 0,
                         fontWeight: 900,
                         textTransform: 'uppercase'
                    }]}>
                        {title}
                    </Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#f9fafb', marginLeft: 4 }} />
                </View>
                <View style={{ paddingLeft: 10 }}>
                    {children}
                </View>
            </View>
        )
    }

    if (templateId.startsWith('ats-sterling')) {
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ marginTop: 24, marginBottom: 12 }}>
                    <Text style={[styles.sectionTitle, { 
                        fontSize: 14,
                        fontFamily: 'Playfair Display',
                        marginBottom: 4, 
                        paddingBottom: 0, 
                        borderBottomWidth: 0,
                        fontWeight: 'bold',
                        color: '#1e293b'
                    }]}>
                        {title}
                    </Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#f1f5f9' }} />
                </View>
                <View>
                    {children}
                </View>
            </View>
        )
    }

    if (templateId.startsWith('elite-london')) {
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ marginTop: 24, marginBottom: 12 }}>
                    <Text style={[styles.sectionTitle, { 
                        fontSize: 10,
                        letterSpacing: 3,
                        marginBottom: 4, 
                        paddingBottom: 0, 
                        borderBottomWidth: 0,
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                    }]}>
                        {title}
                    </Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#e5e7eb' }} />
                </View>
                <View>
                    {children}
                </View>
            </View>
        )
    }

    if (templateId.startsWith('elite-parker')) {
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ marginTop: 24, marginBottom: 15 }}>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#f3f4f6', marginBottom: 12 }} />
                    <Text style={[styles.sectionTitle, { 
                        fontSize: 9,
                        letterSpacing: 4,
                        marginBottom: 0, 
                        paddingBottom: 0, 
                        borderBottomWidth: 0,
                        fontWeight: 'medium',
                        textTransform: 'uppercase',
                        color: '#737373'
                    }]}>
                        {title}
                    </Text>
                </View>
                <View>
                    {children}
                </View>
            </View>
        )
    }

    if (templateId.startsWith('ats-masthead')) {
        return (
            <View style={[styles.section, isFirst && styles.sectionFirst]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 10 }}>
                    <Text style={[styles.sectionTitle, { 
                        fontSize: 8,
                        letterSpacing: 2,
                        marginBottom: 0, 
                        paddingBottom: 0, 
                        borderBottomWidth: 0,
                        textTransform: 'lowercase',
                        fontWeight: 'bold',
                    }]}>
                        {title}
                    </Text>
                    <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#d4d4d4', borderStyle: 'dashed', marginTop: 2 }} />
                </View>
                <View>
                    {children}
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.section, isFirst && styles.sectionFirst]}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    )
}

export const BulletPoint = ({ text, styles }: { text: string; styles: any }) => (
    <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{text}</Text>
    </View>
)

export const SkillBadge = ({ text, styles }: { text: string; styles: any }) => (
    <View style={styles.skillBadge}>
        <Text style={styles.skillText}>{text}</Text>
    </View>
)
