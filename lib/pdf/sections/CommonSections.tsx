import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { getSectionTitle } from '../theme/titles'

interface SectionProps {
    title: string
    styles: any
    children: React.ReactNode
    isFirst?: boolean
}

export const Section = ({ title, styles, children, isFirst }: SectionProps) => {
    if (!title) return <View style={[styles.section, isFirst && styles.sectionFirst]}>{children}</View>
    
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
