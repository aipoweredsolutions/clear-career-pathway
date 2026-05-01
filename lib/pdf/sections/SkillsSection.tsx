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
            {groupEntries.length === 1 && groupEntries[0][0] === 'General' ? (
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

