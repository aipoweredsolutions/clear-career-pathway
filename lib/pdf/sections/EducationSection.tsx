import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Section } from './CommonSections'
import { getSectionTitle } from '../theme/titles'

export const EducationSection = ({ data, styles, templateId, index }: any) => {
    if (!data.education?.length) return null

    return (
        <Section title={getSectionTitle(templateId, 'education', index)} styles={styles} templateId={templateId} index={index}>
            {data.education.map((edu: any, i: number) => {
                if (templateId.startsWith('ats-gold-standard')) {
                    return (
                        <View key={i} style={styles.experienceItem} wrap={false}>
                            <View style={styles.experienceHeader}>
                                <Text style={[styles.jobTitle, { fontSize: 12, color: '#171717' }]}>
                                    {edu.degree}{edu.fieldOfStudy || edu.major ? `, ${edu.fieldOfStudy || edu.major}` : ''}
                                </Text>
                                <Text style={styles.date}>{edu.endYear || edu.startYear || 'Present'}</Text>
                            </View>
                            <Text style={[styles.company, { fontSize: 10.5, fontStyle: 'italic', marginTop: 2, marginBottom: 4, opacity: 0.7 }]}>
                                {edu.institutionName}
                                {edu.location ? <Text style={{ fontStyle: 'normal', opacity: 0.5 }}>  /  {edu.location}</Text> : ''}
                            </Text>
                            {edu.gpa && (
                                <Text style={[styles.description, { textTransform: 'uppercase', fontSize: 8, letterSpacing: 1 }]}>GPA: {edu.gpa}</Text>
                            )}
                        </View>
                    )
                }

                if (templateId.startsWith('elite-london')) {
                    return (
                        <View key={i} style={styles.experienceItem} wrap={false}>
                            <View style={styles.experienceHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.jobTitle, { fontSize: 12, textTransform: 'none' }]}>{edu.degree}</Text>
                                    <Text style={[styles.company, { fontSize: 10, marginTop: 1, opacity: 0.8 }]}>{edu.institutionName}</Text>
                                </View>
                                <Text style={[styles.date, { textAlign: 'right', color: '#a3a3a3' }]}>
                                    {[edu.startYear, edu.endYear].filter(Boolean).join(' — ')}
                                </Text>
                            </View>
                            {edu.description && <Text style={[styles.description, { fontStyle: 'italic', marginTop: 2, color: '#737373' }]}>{edu.description}</Text>}
                        </View>
                    )
                }

                return (
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
                    </View>
                )
            })}
        </Section>
    )
}

