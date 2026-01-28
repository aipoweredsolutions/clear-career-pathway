import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { ResumeDocument } from '@/lib/types/resume'

/**
 * Dynamic PDF Template Generator
 * Supports multiple template styles based on templateId
 * Matches the preview templates for download consistency
 */

Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 'bold' }
    ]
})

// Helper to get template colors based on templateId
const getTemplateColors = (templateId: string) => {
    // New ATS Series
    if (templateId.startsWith('ats-')) {
        if (templateId.startsWith('ats-classic')) return { primary: '#1a1a1a', secondary: '#4b5563', text: '#1a1a1a', border: '#374151' }
        if (templateId.startsWith('ats-minimal')) return { primary: '#000000', secondary: '#9ca3af', text: '#1a1a1a', border: '#e5e7eb' }
        if (templateId.startsWith('ats-executive')) return { primary: '#111827', secondary: '#b45309', text: '#1a1a1a', border: '#111827' }
        if (templateId.startsWith('ats-technical')) return { primary: '#000000', secondary: '#064e3b', text: '#1a1a1a', border: '#171717' }
        if (templateId.startsWith('ats-modern')) return { primary: '#111827', secondary: '#2563eb', text: '#1a1a1a', border: '#e5e7eb' }
        if (templateId.startsWith('ats-graduate')) return { primary: '#1e3a8a', secondary: '#9f1239', text: '#1a1a1a', border: '#1e3a8a' }
        if (templateId.startsWith('ats-standard')) return { primary: '#111827', secondary: '#475569', text: '#1a1a1a', border: '#f1f5f9' }
        return { primary: '#1a1a1a', secondary: '#3b82f6', text: '#1a1a1a', border: '#e5e7eb' }
    }

    // Classic variants
    if (templateId.startsWith('classic')) {
        if (templateId.includes('blue')) return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#3b82f6' }
        if (templateId.includes('green')) return { primary: '#065f46', secondary: '#10b981', text: '#1a1a1a', border: '#10b981' }
        if (templateId.includes('red')) return { primary: '#881337', secondary: '#f43f5e', text: '#1a1a1a', border: '#f43f5e' }
        if (templateId.includes('purple')) return { primary: '#5b21b6', secondary: '#8b5cf6', text: '#1a1a1a', border: '#8b5cf6' }
        return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#3b82f6' }
    }
    // Modern variants
    if (templateId.startsWith('modern')) {
        if (templateId.includes('teal')) return { primary: '#134e4a', secondary: '#14b8a6', text: '#1a1a1a', border: '#134e4a', headerBg: '#134e4a' }
        if (templateId.includes('slate')) return { primary: '#0f172a', secondary: '#64748b', text: '#1a1a1a', border: '#0f172a', headerBg: '#0f172a' }
        if (templateId.includes('violet')) return { primary: '#4c1d95', secondary: '#8b5cf6', text: '#1a1a1a', border: '#4c1d95', headerBg: '#4c1d95' }
        return { primary: '#1e40af', secondary: '#3b82f6', text: '#1a1a1a', border: '#1e40af', headerBg: '#1e40af' }
    }
    // Executive variants
    if (templateId.startsWith('executive')) {
        if (templateId.includes('gold')) return { primary: '#92400e', secondary: '#d97706', text: '#1a1a1a', border: '#f59e0b' }
        return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#cbd5e1' }
    }
    // Creative variants
    if (templateId.startsWith('creative')) {
        if (templateId.includes('purple')) return { primary: '#7c3aed', secondary: '#a78bfa', text: '#1a1a1a', border: '#7c3aed' }
        if (templateId.includes('orange')) return { primary: '#ea580c', secondary: '#fb923c', text: '#1a1a1a', border: '#ea580c' }
        if (templateId.includes('pink')) return { primary: '#db2777', secondary: '#f472b6', text: '#1a1a1a', border: '#db2777' }
        return { primary: '#7c3aed', secondary: '#a78bfa', text: '#1a1a1a', border: '#7c3aed' }
    }
    // Professional variants
    if (templateId.startsWith('professional')) {
        return { primary: '#0f172a', secondary: '#475569', text: '#1a1a1a', border: '#cbd5e1' }
    }
    // Luxe variants
    if (templateId.startsWith('luxe')) {
        if (templateId.includes('gold')) return { primary: '#78350f', secondary: '#d97706', text: '#1a1a1a', border: '#fbbf24' }
        if (templateId.includes('emerald')) return { primary: '#064e3b', secondary: '#10b981', text: '#1a1a1a', border: '#34d399' }
        return { primary: '#27272a', secondary: '#71717a', text: '#1a1a1a', border: '#a1a1aa' }
    }
    // Graduate/Academic
    if (templateId.startsWith('graduate') || templateId.startsWith('academic')) {
        if (templateId.includes('navy')) return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#3b82f6' }
        if (templateId.includes('teal')) return { primary: '#115e59', secondary: '#14b8a6', text: '#1a1a1a', border: '#14b8a6' }
        return { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1a1a1a', border: '#cbd5e1' }
    }
    // Cute / Cotton Candy variants
    if (templateId.startsWith('cute')) {
        if (templateId.includes('pink')) return { primary: '#db2777', secondary: '#fbcfe8', text: '#831843', border: '#f9a8d4', headerBg: '#fdf2f8' }
        if (templateId.includes('mint')) return { primary: '#0d9488', secondary: '#ccfbf1', text: '#134e4a', border: '#99f6e4', headerBg: '#f0fdfa' }
        if (templateId.includes('lavender')) return { primary: '#7c3aed', secondary: '#e9d5ff', text: '#4c1d95', border: '#ddd6fe', headerBg: '#f5f3ff' }
        if (templateId.includes('sky')) return { primary: '#0284c7', secondary: '#e0f2fe', text: '#0c4a6e', border: '#bae6fd', headerBg: '#f0f9ff' }
        if (templateId.includes('peach')) return { primary: '#ea580c', secondary: '#ffedd5', text: '#7c2d12', border: '#fed7aa', headerBg: '#fff7ed' }
        return { primary: '#db2777', secondary: '#fbcfe8', text: '#831843', border: '#f9a8d4', headerBg: '#fdf2f8' }
    }
    // Default fallback
    return { primary: '#111827', secondary: '#3b82f6', text: '#1a1a1a', border: '#e5e7eb' }
}

// Dynamic styles factory
const createStyles = (templateId: string) => {
    const colors = getTemplateColors(templateId)
    const isModern = templateId.startsWith('modern') || templateId.startsWith('ats-modern') || templateId.startsWith('professional') || templateId.startsWith('ats-standard')
    const isExecutive = templateId.startsWith('executive') || templateId.startsWith('luxe') || templateId.startsWith('ats-executive') || templateId.startsWith('ats-classic')
    const isCute = templateId.startsWith('cute')

    return StyleSheet.create({
        page: {
            padding: 40,
            fontFamily: 'Helvetica',
            fontSize: 10,
            lineHeight: 1.6,
            color: isCute ? colors.text : colors.text, // uses text color from theme for cute
            backgroundColor: isCute ? colors.headerBg : '#ffffff', // page background matching theme for cute
        },
        header: {
            marginBottom: 20,
            textAlign: (isExecutive || isCute) ? 'center' : 'left',
            backgroundColor: (isModern || isCute) ? colors.headerBg || colors.primary : undefined,
            color: isModern ? '#ffffff' : (isCute ? colors.primary : undefined),
            padding: (isModern || isCute) ? 20 : 0,
            marginLeft: (isModern || isCute) ? -40 : 0,
            marginRight: (isModern || isCute) ? -40 : 0,
            marginTop: (isModern || isCute) ? -40 : 0,
            borderBottomWidth: (!isModern && !isExecutive && !isCute) ? 2 : 0,
            borderBottomColor: colors.primary,
            paddingBottom: (!isModern && !isExecutive && !isCute) ? 10 : (isCute ? 20 : 0),
            borderBottomLeftRadius: isCute ? 40 : 0,
            borderBottomRightRadius: isCute ? 40 : 0,
        },
        name: {
            fontSize: 22,
            fontWeight: 'bold',
            color: isModern ? '#ffffff' : colors.primary,
            marginBottom: 4,
            letterSpacing: isExecutive ? 2 : 1,
            textTransform: isExecutive ? 'uppercase' : 'none',
        },
        contactInfo: {
            flexDirection: 'row',
            justifyContent: isExecutive ? 'center' : 'flex-start',
            gap: 8,
            fontSize: 9,
            color: isModern ? '#ffffff' : '#4b5563',
            marginBottom: 10,
            flexWrap: 'wrap',
        },
        section: {
            marginTop: 15,
        },
        sectionTitle: {
            fontSize: 11,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottomWidth: 1.5,
            borderBottomColor: colors.border,
            color: colors.primary,
            paddingBottom: 3,
            marginBottom: 10,
            letterSpacing: 0.5,
        },
        experienceItem: {
            marginBottom: 12,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 2,
        },
        bold: {
            fontWeight: 'bold',
            color: colors.primary,
            fontSize: 10.5,
        },
        italic: {
            fontStyle: 'italic',
            color: '#4b5563',
        },
        date: {
            fontSize: 9,
            color: '#6b7280',
        },
        achievement: {
            flexDirection: 'row',
            marginLeft: 10,
            marginBottom: 2,
        },
        bullet: {
            width: 12,
            color: colors.secondary,
        },
        achievementText: {
            flex: 1,
            color: '#374151',
        },
        skillsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6,
        },
        skillTag: {
            paddingVertical: 2,
            paddingHorizontal: 6,
            backgroundColor: '#f3f4f6',
            borderRadius: 4,
            fontSize: 9,
            color: colors.primary,
        },
        // Two-column layout grid
        mainGrid: {
            flexDirection: isCute ? 'row-reverse' : 'row',
            gap: 20,
        },
        leftColumn: {
            flex: 2,
        },
        rightColumn: {
            flex: 1,
        }
    })
}

interface PDFDocumentProps {
    data: ResumeDocument
    isWatermarked?: boolean
}

export function ResumePDF({ data, isWatermarked = false }: PDFDocumentProps) {
    // Create dynamic styles based on template
    const styles = createStyles(data.templateId || 'classic')
    const tId = data.templateId || ''
    const isModern = tId.startsWith('modern') || tId.startsWith('ats-modern')
    const isTechnical = tId.startsWith('technical') || tId.startsWith('startup') || tId.startsWith('ats-technical')
    const isExecutive = tId.startsWith('executive') || tId.startsWith('luxe') || tId.startsWith('ats-executive') || tId.startsWith('ats-classic')
    const isStandard = tId.startsWith('professional') || tId.startsWith('ats-standard') || tId.startsWith('graduate') || tId.startsWith('ats-graduate')
    const isCute = tId.startsWith('cute')

    return (
        <Document title={`${data.personalInfo?.fullName || 'Resume'} - Clear Career Path`}>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.personalInfo?.fullName}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: (isModern || isTechnical) ? '#cbd5e1' : (isExecutive ? '#1a1a1a' : '#3b82f6'),
                        marginBottom: 8,
                        fontWeight: 'bold',
                        textAlign: isExecutive ? 'center' : 'left'
                    }}>
                        {data.personalInfo?.professionalTitle}
                    </Text>
                    <View style={styles.contactInfo}>
                        <Text style={{ color: isModern ? '#ffffff' : (isExecutive ? '#1a1a1a' : '#4b5563') }}>{data.personalInfo?.email}</Text>
                        <Text style={{ color: isModern ? '#ffffff' : (isExecutive ? '#1a1a1a' : '#4b5563') }}>• {data.personalInfo?.phone}</Text>
                        <Text style={{ color: isModern ? '#ffffff' : (isExecutive ? '#1a1a1a' : '#4b5563') }}>
                            • {data.personalInfo?.location || [data.personalInfo?.city, data.personalInfo?.country].filter(Boolean).join(', ')}
                        </Text>
                    </View>
                </View>

                {(isTechnical || isCute) ? (
                    <View style={styles.mainGrid}>
                        {/* Left Column */}
                        <View style={styles.leftColumn}>
                            {/* Professional Summary - Moved for technical, shown here for others */}
                            {(data.professionalSummary?.summaryText && !isCute) && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Summary</Text>
                                    <Text style={{ color: '#374151' }}>{data.professionalSummary.summaryText}</Text>
                                </View>
                            )}

                            {/* Experience */}
                            {data.workExperience && data.workExperience.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Experience</Text>
                                    {data.workExperience.map((exp, index) => (
                                        <View key={index} style={styles.experienceItem}>
                                            <View style={styles.row}>
                                                <Text style={styles.bold}>{exp.jobTitle}</Text>
                                                <Text style={styles.date}>
                                                    {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                                </Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.italic}>{exp.companyName}</Text>
                                            </View>
                                            {exp.roleDescription && (
                                                <Text style={{ marginTop: 4, marginBottom: 4, color: '#374151', fontSize: 9 }}>
                                                    {exp.roleDescription}
                                                </Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            )}

                            {/* Projects */}
                            {data.projects && data.projects.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Projects</Text>
                                    {data.projects.map((proj, index) => (
                                        <View key={index} style={styles.experienceItem}>
                                            <View style={styles.row}>
                                                <Text style={styles.bold}>{proj.projectName}</Text>
                                            </View>
                                            {proj.description && (
                                                <Text style={{ marginTop: 2, color: '#374151', fontSize: 9 }}>{proj.description}</Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Right Column */}
                        <View style={styles.rightColumn}>
                            {/* Professional Summary - Sidebar for Cute */}
                            {(data.professionalSummary?.summaryText && isCute) && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>About Me</Text>
                                    <Text style={{ color: isCute ? '#374151' : '#374151', fontSize: 9 }}>{data.professionalSummary.summaryText}</Text>
                                </View>
                            )}
                            {/* Skills */}
                            {data.skills && data.skills.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Skills</Text>
                                    <View style={styles.skillsContainer}>
                                        {data.skills.map((skill, i) => (
                                            <Text key={i} style={styles.skillTag}>
                                                {skill.skillName}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            )}

                            {/* Education */}
                            {data.education && data.education.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Education</Text>
                                    {data.education.map((edu, index) => (
                                        <View key={index} style={{ marginBottom: 8 }}>
                                            <Text style={styles.bold}>{edu.institutionName}</Text>
                                            <Text style={styles.date}>{edu.endYear}</Text>
                                            <Text style={styles.italic}>{edu.degree}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {/* Custom Sections (Sidebar) */}
                            {data.customSections && data.customSections.length > 0 && data.customSections.map((section, idx) => (
                                <View key={idx} style={styles.section} wrap={false}>
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                    {section.items && section.items.length > 0 ? (
                                        section.items.map((item, iIdx) => (
                                            <View key={iIdx} style={styles.achievement}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={styles.achievementText}>{item.text}</Text>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={{ fontSize: 9, color: '#374151' }}>{section.content}</Text>
                                    )}
                                </View>
                            ))}

                            {/* References (Sidebar) */}
                            {data.references && data.references.length > 0 && (
                                <View style={styles.section} wrap={false}>
                                    <Text style={styles.sectionTitle}>References</Text>
                                    {data.references.map((ref, index) => (
                                        <View key={index} style={{ marginBottom: 6 }}>
                                            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{ref.referenceName}</Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {ref.role}
                                            </Text>
                                            {ref.organization && <Text style={{ fontSize: 9, fontStyle: 'italic' }}>{ref.organization}</Text>}
                                            {ref.contactDetails && <Text style={{ fontSize: 9, color: '#4b5563' }}>{ref.contactDetails}</Text>}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                ) : (
                    <>
                        {/* Professional Summary */}
                        {data.professionalSummary?.summaryText && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Professional Summary</Text>
                                <Text style={{ color: '#374151' }}>{data.professionalSummary.summaryText}</Text>
                            </View>
                        )}

                        {/* Skills (show early for ATS) */}
                        {data.skills && data.skills.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Skills</Text>
                                <View style={styles.skillsContainer}>
                                    {data.skills.map((skill, i) => (
                                        <Text key={i} style={styles.skillTag}>
                                            {skill.skillName}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Experience */}
                        {data.workExperience && data.workExperience.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Professional Experience</Text>
                                {data.workExperience.map((exp, index) => (
                                    <View key={index} style={styles.experienceItem}>
                                        <View style={styles.row}>
                                            <Text style={styles.bold}>{exp.jobTitle}</Text>
                                            <Text style={styles.date}>
                                                {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                            </Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.italic}>{exp.companyName}</Text>
                                            {exp.location && <Text style={{ fontSize: 9, color: '#9ca3af' }}>{exp.location}</Text>}
                                        </View>
                                        {exp.roleDescription && (
                                            <Text style={{ marginTop: 4, marginBottom: 4, color: '#374151' }}>
                                                {exp.roleDescription}
                                            </Text>
                                        )}
                                        {exp.achievements?.map((ach, i) => (
                                            <View key={i} style={styles.achievement}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={styles.achievementText}>{ach.achievementText}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>Projects</Text>
                                {data.projects.map((proj, index) => (
                                    <View key={index} style={styles.experienceItem}>
                                        <View style={styles.row}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.bold}>{proj.projectName}</Text>
                                                {proj.role && <Text style={styles.italic}>{proj.role}</Text>}
                                            </View>
                                            {proj.startDate && (
                                                <Text style={styles.date}>
                                                    {proj.startDate} {proj.endDate ? `— ${proj.endDate}` : ''}
                                                </Text>
                                            )}
                                        </View>
                                        {proj.description && (
                                            <Text style={{ marginTop: 2, color: '#374151' }}>{proj.description}</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>Education</Text>
                                {data.education.map((edu, index) => (
                                    <View key={index} style={{ marginBottom: 8 }}>
                                        <View style={styles.row}>
                                            <Text style={styles.bold}>{edu.institutionName}</Text>
                                            <Text style={styles.date}>{edu.endYear}</Text>
                                        </View>
                                        <Text style={styles.italic}>
                                            {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                                        </Text>
                                        {edu.gpa && <Text style={{ fontSize: 9, color: '#6b7280' }}>GPA: {edu.gpa}</Text>}
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Certifications */}
                        {data.certifications && data.certifications.length > 0 && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>Certifications</Text>
                                {data.certifications.map((cert, index) => (
                                    <View key={index} style={{ marginBottom: 4 }}>
                                        <View style={styles.row}>
                                            <Text style={styles.bold}>{cert.certificationName}</Text>
                                            <Text style={styles.date}>{cert.issueYear}</Text>
                                        </View>
                                        <Text style={styles.italic}>{cert.issuingOrganization}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Volunteer Experience */}
                        {data.volunteerExperience && data.volunteerExperience.length > 0 && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>Volunteer Experience</Text>
                                {data.volunteerExperience.map((vol, index) => (
                                    <View key={index} style={{ marginBottom: 8 }}>
                                        <View style={styles.row}>
                                            <Text style={styles.bold}>{vol.roleTitle}</Text>
                                            <Text style={styles.date}>
                                                {vol.startDate} — {vol.endDate || 'Present'}
                                            </Text>
                                        </View>
                                        <Text style={styles.italic}>{vol.organizationName}</Text>
                                        {vol.contributions && (
                                            <Text style={{ fontSize: 9, marginTop: 2 }}>{vol.contributions}</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Languages */}
                        {data.languages && data.languages.length > 0 && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>Languages</Text>
                                {data.languages.map((lang, i) => (
                                    <Text key={i} style={{ fontSize: 9, marginBottom: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{lang.languageName}</Text>
                                        {lang.proficiencyLevel && ` — ${lang.proficiencyLevel}`}
                                    </Text>
                                ))}
                            </View>
                        )}

                        {/* Publications */}
                        {data.publications && data.publications.length > 0 && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>Publications</Text>
                                {data.publications.map((pub, index) => (
                                    <View key={index} style={{ marginBottom: 4 }}>
                                        <Text style={{ fontSize: 9, fontStyle: 'italic', fontWeight: 'bold' }}>
                                            {pub.title}
                                        </Text>
                                        {pub.platformOrPublisher && (
                                            <Text style={{ fontSize: 9 }}>
                                                {pub.platformOrPublisher} {pub.publicationYear && `(${pub.publicationYear})`}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Professional Affiliations */}
                        {data.professionalAffiliations && data.professionalAffiliations.length > 0 && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>Professional Affiliations</Text>
                                {data.professionalAffiliations.map((aff, index) => (
                                    <Text key={index} style={{ fontSize: 9, marginBottom: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{aff.organizationName}</Text>
                                        {aff.roleOrMembership && ` — ${aff.roleOrMembership}`}
                                    </Text>
                                ))}
                            </View>
                        )}

                        {/* Additional Information */}
                        {data.additionalInfo && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>Additional Information</Text>
                                {data.additionalInfo.securityClearance && (
                                    <Text style={{ fontSize: 9, marginBottom: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Security Clearance: </Text>
                                        {data.additionalInfo.securityClearance}
                                    </Text>
                                )}
                                {data.additionalInfo.workAuthorization && (
                                    <Text style={{ fontSize: 9, marginBottom: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Work Authorization: </Text>
                                        {data.additionalInfo.workAuthorization}
                                    </Text>
                                )}
                                {data.additionalInfo.availability && (
                                    <Text style={{ fontSize: 9, marginBottom: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Availability: </Text>
                                        {data.additionalInfo.availability}
                                    </Text>
                                )}
                            </View>
                        )}

                        {/* Custom Sections (Standard) */}
                        {data.customSections && data.customSections.length > 0 && data.customSections.map((section, idx) => (
                            <View key={idx} style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                                {section.items && section.items.length > 0 ? (
                                    section.items.map((item, iIdx) => (
                                        <View key={iIdx} style={styles.achievement}>
                                            <Text style={styles.bullet}>•</Text>
                                            <Text style={styles.achievementText}>{item.text}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={{ fontSize: 9, color: '#374151' }}>{section.content}</Text>
                                )}
                            </View>
                        ))}

                        {/* References */}
                        {data.references && data.references.length > 0 && (
                            <View style={styles.section} wrap={false}>
                                <Text style={styles.sectionTitle}>References</Text>
                                {data.references.map((ref, index) => (
                                    <View key={index} style={{ marginBottom: 6 }}>
                                        <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{ref.referenceName}</Text>
                                        <Text style={{ fontSize: 9 }}>
                                            {ref.role} {ref.organization && `at ${ref.organization}`}
                                        </Text>
                                        {ref.contactDetails && (
                                            <Text style={{ fontSize: 9, color: '#6b7280' }}>{ref.contactDetails}</Text>
                                        )}
                                        {ref.availabilityStatement && (
                                            <Text style={{ fontSize: 9, fontStyle: 'italic', color: '#6b7280' }}>
                                                {ref.availabilityStatement}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                )}
                {/* Watermark for free users */}
                {isWatermarked && (
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                            opacity: 0.5,
                        }}
                        fixed
                    >
                        <Text style={{ fontSize: 9, color: '#9ca3af', fontStyle: 'italic' }}>
                            Created with Clear Career Path — Building a path to your dream job.
                        </Text>
                    </View>
                )}
            </Page>
        </Document >
    )
}
