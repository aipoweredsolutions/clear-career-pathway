import React from 'react'
import { ExperienceSection } from './ExperienceSection'
import { EducationSection } from './EducationSection'
import { SkillsSection } from './SkillsSection'
import { Section, BulletPoint } from './CommonSections'
import { getSectionTitle } from '../theme/titles'
import { Text, View } from '@react-pdf/renderer'

export const RenderSection = ({ sectionId, data, styles, templateId, index }: any) => {

    switch (sectionId) {
        case 'professionalSummary':
            if (!data.professionalSummary?.summaryText) return null
            const title = getSectionTitle(templateId, 'professionalSummary', index)
            if (templateId.startsWith('ats-editorial')) {
                return (
                    <Section title={title} styles={styles} isFirst={index === 0} templateId={templateId} index={index}>
                        <Text style={[styles.description, { fontSize: 11, fontStyle: 'italic', lineHeight: 1.6, paddingHorizontal: 15 }]}>
                            {data.professionalSummary.summaryText}
                        </Text>
                    </Section>
                )
            }
            if (templateId.startsWith('ats-executive')) {
                return (
                    <Section title={title} styles={styles} isFirst={index === 0} templateId={templateId} index={index}>
                        <View style={{ padding: 12, backgroundColor: '#f9fafb', borderLeftWidth: 4, borderLeftColor: styles.name.color || '#171717' }}>
                            <Text style={[styles.description, { fontSize: 10, lineHeight: 1.5, color: '#374151' }]}>{data.professionalSummary.summaryText}</Text>
                        </View>
                    </Section>
                )
            }
            return (
                <Section title={title} styles={styles} isFirst={index === 0} templateId={templateId} index={index}>
                    <Text style={styles.description}>{data.professionalSummary.summaryText}</Text>
                </Section>
            )
        case 'workExperience':
            return <ExperienceSection data={data} styles={styles} templateId={templateId} index={index} />
        case 'education':
            return <EducationSection data={data} styles={styles} templateId={templateId} index={index} />
        case 'skills':
            return <SkillsSection data={data} styles={styles} templateId={templateId} index={index} />
        case 'certifications':
            if (!data.certifications?.length) return null
            return (
                <Section title={getSectionTitle(templateId, 'certifications', index)} styles={styles} templateId={templateId} index={index}>
                    {data.certifications.map((cert: any, i: number) => (
                        <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                            <Text style={styles.company}>{cert.certificationName}</Text>
                            <Text style={styles.location}>{cert.issuingOrganization}{cert.issueYear ? ` • ${cert.issueYear}` : ''}</Text>
                        </View>
                    ))}
                </Section>
            )
        case 'projects':
            if (!data.projects?.length) return null
            return (
                <Section title={getSectionTitle(templateId, 'projects', index)} styles={styles} templateId={templateId} index={index}>
                    {data.projects.map((project: any, i: number) => (
                        <View key={i} style={styles.experienceItem} wrap={false} break={project.forcePageBreak}>
                            <View style={styles.experienceHeader}>
                                <Text style={styles.jobTitle}>{project.projectName}</Text>
                                <Text style={styles.date}>{project.startDate ? `${project.startDate} — ` : ''}{project.endDate || 'Present'}</Text>
                            </View>
                            {project.description && <Text style={styles.description}>{project.description}</Text>}
                            {project.toolsUsed && project.toolsUsed.length > 0 && (
                                <Text style={[styles.description, { fontStyle: 'italic', marginTop: 2 }]}>
                                    Technologies: {project.toolsUsed.join(', ')}
                                </Text>
                            )}
                        </View>
                    ))}
                </Section>
            )
        case 'achievements':
            if (!data.achievements?.length) return null
            return (
                <Section title={getSectionTitle(templateId, 'achievements', index)} styles={styles} templateId={templateId} index={index}>
                    {data.achievements.map((ach: any, i: number) => (
                        <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                            <Text style={styles.company}>{ach.achievementTitle}</Text>
                            <Text style={styles.location}>{ach.issuingBody}{ach.year ? ` • ${ach.year}` : ''}</Text>
                            {ach.description && <Text style={styles.description}>{ach.description}</Text>}
                        </View>
                    ))}
                </Section>
            )
        case 'volunteerExperience':
            if (!data.volunteerExperience?.length) return null
            return (
                <Section title={getSectionTitle(templateId, 'volunteerExperience', index)} styles={styles} templateId={templateId} index={index}>
                    {data.volunteerExperience.map((vol: any, i: number) => (
                        <View key={i} style={styles.experienceItem} wrap={false}>
                            <View style={styles.experienceHeader}>
                                <Text style={styles.jobTitle}>{vol.roleTitle}</Text>
                                <Text style={styles.date}>{vol.startDate} — {vol.endDate || 'Present'}</Text>
                            </View>
                            <Text style={styles.company}>{vol.organizationName}</Text>
                            {vol.contributions && <Text style={styles.description}>{vol.contributions}</Text>}
                        </View>
                    ))}
                </Section>
            )
        case 'publications':
            if (!data.publications?.length) return null
            return (
                <Section title={getSectionTitle(templateId, 'publications', index)} styles={styles} templateId={templateId} index={index}>
                    {data.publications.map((pub: any, i: number) => (
                        <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                            <Text style={styles.company}>&quot;{pub.title}&quot;</Text>
                            <Text style={styles.location}>{pub.platformOrPublisher}{pub.publicationYear ? ` • ${pub.publicationYear}` : ''}</Text>
                        </View>
                    ))}
                </Section>
            )
        case 'languages':
            if (!data.languages?.length) return null
            return (
                <Section title={getSectionTitle(templateId, 'languages', index)} styles={styles} templateId={templateId} index={index}>
                    <View style={styles.skillRow}>
                        {data.languages.map((lang: any, i: number) => (
                            <Text key={i} style={styles.description}>
                                <Text style={{ fontWeight: 'bold' }}>{lang.languageName}:</Text> {lang.proficiencyLevel}
                                {i < data.languages.length - 1 ? ' • ' : ''}
                            </Text>
                        ))}
                    </View>
                </Section>
            )
        case 'professionalAffiliations':
            if (!data.professionalAffiliations?.length) return null
            return (
                <Section title={getSectionTitle(templateId, 'professionalAffiliations', index)} styles={styles} templateId={templateId} index={index}>
                    {data.professionalAffiliations.map((aff: any, i: number) => (
                        <View key={i} style={{ marginBottom: 4 }} wrap={false}>
                            <Text style={styles.company}>{aff.organizationName}</Text>
                            {aff.roleOrMembership && <Text style={styles.description}>{aff.roleOrMembership}{aff.yearsActive ? ` (${aff.yearsActive})` : ''}</Text>}
                        </View>
                    ))}
                </Section>
            )
        case 'references':
            if (!data.references?.length) return null
            return (
                <Section title={getSectionTitle(templateId, 'references', index)} styles={styles} templateId={templateId} index={index}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                        {data.references.map((ref: any, i: number) => (
                            <View key={i} style={{ marginBottom: 8, width: '45%' }} wrap={false}>
                                <Text style={styles.company}>{ref.referenceName || ref.name}</Text>
                                <Text style={styles.location}>{ref.role || ref.title} at {ref.organization || ref.company}</Text>
                                <Text style={styles.description}>{ref.contactDetails || ref.contactInfo}</Text>
                            </View>
                        ))}
                    </View>
                </Section>
            )
        case 'additionalInfo':
            if (!data.additionalInfo && !data.additionalInfo?.otherInfo) return null
            return (
                <Section title={getSectionTitle(templateId, 'additionalInfo', index)} styles={styles} templateId={templateId} index={index}>
                    {data.additionalInfo.securityClearance && (
                        <Text style={styles.description}>
                            <Text style={{ fontWeight: 'bold' }}>Security Clearance:</Text> {data.additionalInfo.securityClearance}
                        </Text>
                    )}
                    {data.additionalInfo.workAuthorization && (
                        <Text style={styles.description}>
                            <Text style={{ fontWeight: 'bold' }}>Work Authorization:</Text> {data.additionalInfo.workAuthorization}
                        </Text>
                    )}
                    {data.additionalInfo.otherInfo && (
                        <Text style={styles.description}>{data.additionalInfo.otherInfo}</Text>
                    )}
                </Section>
            )
        default:
            return null
    }
}
