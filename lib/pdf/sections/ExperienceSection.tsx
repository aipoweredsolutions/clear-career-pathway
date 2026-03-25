import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Section, BulletPoint } from './CommonSections'
import { getSectionTitle } from '../theme/titles'

export const ExperienceSection = ({ data, styles, templateId, index }: any) => {
    if (!data.workExperience?.length) return null

    return (
        <Section title={getSectionTitle(templateId, 'workExperience', index)} styles={styles}>
            {data.workExperience.map((exp: any, i: number) => (
                <View key={i} style={styles.experienceItem} wrap={false}>
                    <View style={styles.experienceHeader}>
                        <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                        <Text style={styles.date}>{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</Text>
                    </View>
                    <View style={styles.experienceHeader}>
                        <Text style={styles.company}>{exp.companyName}</Text>
                        <Text style={styles.location}>{exp.location}</Text>
                    </View>
                    {exp.roleDescription && (
                        <Text style={styles.description}>{exp.roleDescription}</Text>
                    )}
                    {exp.achievements?.map((ach: any, j: number) => (
                        <BulletPoint key={j} text={ach.achievementText} styles={styles} />
                    ))}
                </View>
            ))}
        </Section>
    )
}

