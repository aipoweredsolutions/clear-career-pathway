import { Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, AlignmentType } from 'docx'
import { ResumeDocument } from '@/lib/types/resume'
import { saveAs } from 'file-saver'

export class ResumeDOCX {
    static async download(data: ResumeDocument, filename: string = 'resume.docx') {
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    // Header
                    new Paragraph({
                        text: data.personalInfo?.fullName || '',
                        heading: HeadingLevel.TITLE,
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        text: data.personalInfo?.professionalTitle || '',
                        heading: HeadingLevel.HEADING_2,
                        alignment: AlignmentType.CENTER,
                    }),

                    // Contact Info
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: data.personalInfo?.email || '' }),
                            new TextRun({ text: ' • ' }),
                            new TextRun({ text: data.personalInfo?.phone || '' }),
                            new TextRun({ text: ' • ' }),
                            new TextRun({ text: `${data.personalInfo?.city || ''}, ${data.personalInfo?.country || ''}` }),
                        ],
                    }),

                    // Spacing
                    new Paragraph({ text: '' }),

                    // Summary
                    ...(data.professionalSummary?.summaryText ? [
                        new Paragraph({
                            text: 'Professional Summary',
                            heading: HeadingLevel.HEADING_1,
                        }),
                        new Paragraph({
                            text: data.professionalSummary.summaryText,
                        }),
                        new Paragraph({ text: '' }),
                    ] : []),

                    // Experience
                    ...(data.workExperience && data.workExperience.length > 0 ? [
                        new Paragraph({
                            text: 'Work Experience',
                            heading: HeadingLevel.HEADING_1,
                        }),
                        ...data.workExperience.flatMap(exp => [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: exp.jobTitle, bold: true, size: 24 }),
                                    new TextRun({ text: ` | ${exp.companyName}`, italics: true }),
                                    new TextRun({ text: `\t${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}`, bold: true }),
                                ]
                            }),
                            ...(exp.achievements?.map(ach => new Paragraph({
                                bullet: { level: 0 },
                                text: ach.achievementText
                            })) || []),
                            new Paragraph({ text: '' }),
                        ])
                    ] : []),

                    // Education
                    ...(data.education && data.education.length > 0 ? [
                        new Paragraph({
                            text: 'Education',
                            heading: HeadingLevel.HEADING_1,
                        }),
                        ...data.education.map(edu => new Paragraph({
                            text: `${edu.institutionName} - ${edu.degree} ${edu.major ? `in ${edu.major}` : ''} (${edu.endYear})`
                        }))
                    ] : []),

                    // Skills
                    ...(data.skills && data.skills.length > 0 ? [
                        new Paragraph({ text: '' }),
                        new Paragraph({
                            text: 'Skills',
                            heading: HeadingLevel.HEADING_1,
                        }),
                        new Paragraph({
                            text: data.skills.map(s => s.skillName).join(', ')
                        })
                    ] : []),
                ],
            }],
        })

        const blob = await Packer.toBlob(doc)
        saveAs(blob, filename)
    }
}
