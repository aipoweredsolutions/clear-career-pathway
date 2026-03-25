import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Section } from './CommonSections'
import { getSectionTitle } from '../theme/titles'

export const EducationSection = ({ data, styles, templateId, index }: any) => {
    if (!data.education?.length) return null

    return (
        <Section title={getSectionTitle(templateId, 'education', index)} styles={styles}>
            {data.education.map((edu: any, i: number) => (
                <View key={i} style={styles.experienceItem} wrap={false}>
                    <View style={styles.experienceHeader}>
                        <Text style={styles.jobTitle}>{edu.degree}{edu.fieldOfStudy || edu.major ? `, ${edu.fieldOfStudy || edu.major}` : ''}</Text>
                        <Text style={styles.date}>{edu.startYear ? `${edu.startYear} — ` : ''}{edu.endYear || 'Present'}</Text>
                    </View>
                    <View style={styles.experienceHeader}>
                        <Text style={styles.company}>{edu.institutionName}</Text>
                        <Text style={styles.location}>{edu.location}</Text>
                    </View>
                    {edu.gpa && (
                        <Text style={styles.description}>GPA: {edu.gpa}</Text>
                    )}
                    {edu.achievements && (
                        <Text style={styles.description}>{edu.achievements}</Text>
                    )}
                </View>
            ))}
        </Section>
    )
}

