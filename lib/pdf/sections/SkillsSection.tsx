import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Section, SkillBadge } from './CommonSections'
import { getSectionTitle } from '../theme/titles'

export const SkillsSection = ({ data, styles, templateId, index, isSidebar = false }: any) => {
    if (!data.skills?.length) return null

    const title = isSidebar ? 'SKILLS' : getSectionTitle(templateId, 'skills', index)
    const containerStyle = isSidebar ? styles.sidebarSection : styles.section

    const skills = data.skills || []
    
    // Group skills by type if they are objects
    const groupedSkills = skills.reduce((acc: any, skill: any) => {
        if (typeof skill === 'string') {
            if (!acc['General']) acc['General'] = []
            acc['General'].push(skill)
        } else {
            const type = skill.skillType || 'Professional'
            const formattedType = type.charAt(0).toUpperCase() + type.slice(1)
            if (!acc[formattedType]) acc[formattedType] = []
            acc[formattedType].push(skill.skillName)
        }
        return acc
    }, {})

    const groupEntries = Object.entries(groupedSkills)

    return (
        <Section title={title} styles={styles} templateId={templateId} index={index}>
            {templateId.startsWith('ats-gold-standard') ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
                    {groupEntries.map(([type, list]: [string, any], i: number) => (
                        <View key={i} style={{ width: '45%', marginBottom: 12 }}>
                            <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>{type}</Text>
                            <Text style={[styles.description, { fontSize: 10, fontStyle: 'italic', fontWeight: 'bold', color: '#1a1a1a', lineHeight: 1.4 }]}>
                                {list.join('  •  ')}
                            </Text>
                        </View>
                    ))}
                </View>
            ) : templateId.startsWith('elite-london') ? (
                <View style={{ gap: 8 }}>
                    {groupEntries.map(([type, list]: [string, any], i: number) => (
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#171717', width: 90, textTransform: 'capitalize' }}>{type}:</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 10, color: '#525252', lineHeight: 1.5 }}>
                                    {list.join(', ')}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            ) : groupEntries.length === 1 && groupEntries[0][0] === 'General' ? (
                <View style={styles.skillRow}>
                    {(groupEntries[0][1] as string[]).map((skill: string, i: number) => (
                        <SkillBadge key={i} text={skill} styles={styles} />
                    ))}
                </View>
            ) : (
                <View style={{ gap: 4 }}>
                    {groupEntries.map(([type, list]: [string, any], i: number) => (
                        <View key={i} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                            <Text style={[styles.description, { fontWeight: 'bold', width: 80 }]}>{type}:</Text>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                                {list.map((skill: string, j: number) => (
                                    <Text key={j} style={styles.description}>
                                        {skill}{j < list.length - 1 ? ',' : ''}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </Section>
    )
}

