import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Section, SkillBadge } from './CommonSections'
import { getSectionTitle } from '../theme/titles'

export const SkillsSection = ({ data, styles, templateId, index, isSidebar = false }: any) => {
    if (!data.skills?.length) return null

    const title = isSidebar ? 'SKILLS' : getSectionTitle(templateId, 'skills', index)
    const containerStyle = isSidebar ? styles.sidebarSection : styles.section

    return (
        <Section title={title} styles={styles} templateId={templateId} index={index}>
            <View style={styles.skillRow}>
                {data.skills.map((skill: any, i: number) => (
                    <SkillBadge key={i} text={typeof skill === 'string' ? skill : skill.skillName} styles={styles} />
                ))}
            </View>
        </Section>
    )
}

