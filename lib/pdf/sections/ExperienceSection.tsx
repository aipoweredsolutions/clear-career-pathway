import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Section, BulletPoint } from './CommonSections'
import { getSectionTitle } from '../theme/titles'

export const ExperienceSection = ({ data, styles, templateId, index }: any) => {
    if (!data.workExperience?.length) return null

    return (
        <Section title={getSectionTitle(templateId, 'workExperience', index)} styles={styles} templateId={templateId} index={index}>
            {data.workExperience.map((exp: any, i: number) => {
                if (templateId.startsWith('ats-gold-standard')) {
                    return (
                        <View key={i} style={styles.experienceItem} wrap={false} break={exp.forcePageBreak}>
                            <View style={styles.experienceHeader}>
                                <Text style={[styles.company, { fontSize: 13, color: '#171717' }]}>
                                    {exp.companyName}
                                    {exp.location ? <Text style={{ color: '#94a3b8', fontWeight: 'normal', fontStyle: 'italic' }}>  {exp.location}</Text> : ''}
                                </Text>
                                <Text style={styles.date}>{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</Text>
                            </View>
                            <Text style={[styles.jobTitle, { fontSize: 10.5, fontStyle: 'italic', marginTop: 2, marginBottom: 6, opacity: 0.8 }]}>
                                {exp.jobTitle}
                            </Text>
                            {exp.roleDescription && (
                                <Text style={[styles.description, { marginBottom: 8 }]}>{exp.roleDescription}</Text>
                            )}
                            {exp.achievements?.map((ach: any, j: number) => (
                                <BulletPoint key={j} text={ach.achievementText} styles={styles} templateId={templateId} />
                            ))}
                        </View>
                    )
                }

                if (templateId.startsWith('elite-london')) {
                    return (
                        <View key={i} style={styles.experienceItem} wrap={false} break={exp.forcePageBreak}>
                            <View style={[styles.experienceHeader, { marginBottom: 4 }]}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.jobTitle, { fontSize: 13, textTransform: 'none' }]}>
                                        {exp.jobTitle}
                                        <Text style={{ color: '#a3a3a3', fontWeight: 'normal', fontStyle: 'italic', fontSize: 10 }}>   {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</Text>
                                    </Text>
                                </View>
                                <Text style={[styles.company, { textAlign: 'right', fontSize: 11 }]}>
                                    {exp.companyName}
                                    {exp.location ? <Text style={{ color: '#a3a3a3', fontWeight: 'normal' }}> · {exp.location}</Text> : ''}
                                </Text>
                            </View>
                            {exp.roleDescription && (
                                <Text style={[styles.description, { fontStyle: 'italic', marginBottom: 4, color: '#525252' }]}>{exp.roleDescription}</Text>
                            )}
                            {exp.achievements?.map((ach: any, j: number) => (
                                <BulletPoint key={j} text={ach.achievementText} styles={styles} templateId={templateId} />
                            ))}
                        </View>
                    )
                }

                return (
                    <View key={i} style={styles.experienceItem} wrap={false} break={exp.forcePageBreak}>
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
                            <BulletPoint key={j} text={ach.achievementText} styles={styles} templateId={templateId} />
                        ))}
                    </View>
                )
            })}
        </Section>
    )
}

