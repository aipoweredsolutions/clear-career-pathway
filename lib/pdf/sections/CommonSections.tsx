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
