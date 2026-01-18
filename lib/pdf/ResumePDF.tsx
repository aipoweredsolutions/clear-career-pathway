import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { ResumeDocument } from '@/lib/types/resume'

// Register standard fonts
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf' },
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf', fontWeight: 'bold' },
    ]
})

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.5,
        color: '#000000',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
    },
    contact: {
        fontSize: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginBottom: 8,
        paddingBottom: 2,
    },
    experienceItem: {
        marginBottom: 10,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    jobTitle: {
        fontWeight: 'bold',
    },
    company: {
        fontStyle: 'italic',
    },
    date: {
        fontSize: 10,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    bulletText: {
        flex: 1,
    },
    skills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
})

interface PDFDocumentProps {
    data: ResumeDocument
}

export function ResumePDF({ data }: PDFDocumentProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.personalInfo?.fullName}</Text>
                    <Text style={styles.title}>{data.personalInfo?.professionalTitle}</Text>
                    <View style={styles.contact}>
                        {data.personalInfo?.email && <Text>{data.personalInfo.email}</Text>}
                        {data.personalInfo?.phone && <Text> • {data.personalInfo.phone}</Text>}
                        {data.personalInfo?.city && <Text> • {data.personalInfo.city}, {data.personalInfo.country}</Text>}
                        {data.personalInfo?.linkedinUrl && <Text> • {data.personalInfo.linkedinUrl}</Text>}
                    </View>
                </View>

                {/* Summary */}
                {data.professionalSummary?.summaryText && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text>{data.professionalSummary.summaryText}</Text>
                    </View>
                )}

                {/* Experience */}
                {data.workExperience && data.workExperience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {data.workExperience.map((exp, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <View style={styles.jobHeader}>
                                    <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                                    <Text style={styles.date}>
                                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                    </Text>
                                </View>
                                <Text style={styles.company}>{exp.companyName}</Text>
                                {exp.achievements?.map((ach, i) => (
                                    <View key={i} style={styles.bulletPoint}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.bulletText}>{ach.achievementText}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu, index) => (
                            <View key={index} style={{ marginBottom: 5 }}>
                                <View style={styles.jobHeader}>
                                    <Text style={{ fontWeight: 'bold' }}>{edu.institutionName}</Text>
                                    <Text style={styles.date}>{edu.endYear}</Text>
                                </View>
                                <Text>{edu.degree} {edu.major && `in ${edu.major}`}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skills}>
                            <Text>{data.skills.map(s => s.skillName).join(' • ')}</Text>
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    )
}
