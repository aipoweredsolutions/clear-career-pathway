import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    VerticalAlign,
    ShadingType
} from 'docx'
import { ResumeDocument } from '@/lib/types/resume'
import { saveAs } from 'file-saver'

interface DOCXTheme {
    primary: string
    secondary: string
    accent: string
    hasSidebar: boolean
}

export class ResumeDOCX {
    private static getTheme(templateId: string = ''): DOCXTheme {
        const id = templateId.toLowerCase()
        const hasSidebar = id.startsWith('modern') || id.startsWith('professional') || id.startsWith('technical') || id.startsWith('startup') || id.startsWith('cute')

        if (id.includes('teal')) return { primary: '134E4A', secondary: '14B8A6', accent: '134E4A', hasSidebar }
        if (id.includes('slate')) return { primary: '0F172A', secondary: '64748B', accent: '0F172A', hasSidebar }
        if (id.includes('navy')) return { primary: '0F172A', secondary: '334155', accent: '0F172A', hasSidebar }
        if (id.includes('gold')) return { primary: '92400E', secondary: 'D97706', accent: '92400E', hasSidebar }

        return {
            primary: '111827',
            secondary: '4B5563',
            accent: '3B82F6',
            hasSidebar
        }
    }

    static async download(data: ResumeDocument, filename: string = 'resume.docx') {
        const theme = this.getTheme(data.templateId)

        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 720,
                            right: 720,
                            bottom: 720,
                            left: 720,
                        },
                    },
                },
                children: theme.hasSidebar
                    ? [this.createSidebarLayout(data, theme)]
                    : this.createStandardLayout(data, theme)
            }],
        })

        const blob = await Packer.toBlob(doc)
        saveAs(blob, filename)
    }

    private static createSidebarLayout(data: ResumeDocument, theme: DOCXTheme): Table {
        return new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE },
                insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
                new TableRow({
                    children: [
                        // Sidebar Cell
                        new TableCell({
                            width: { size: 30, type: WidthType.PERCENTAGE },
                            shading: { fill: theme.primary, type: ShadingType.CLEAR },
                            margins: { top: 400, bottom: 400, left: 300, right: 300 },
                            children: [
                                new Paragraph({
                                    children: [new TextRun({ text: data.personalInfo?.fullName || '', bold: true, size: 60, color: 'FFFFFF' })],
                                    alignment: AlignmentType.CENTER,
                                }),
                                new Paragraph({
                                    children: [new TextRun({ text: data.personalInfo?.professionalTitle || '', color: 'FFFFFF', size: 16 })],
                                    alignment: AlignmentType.CENTER,
                                    spacing: { after: 400 },
                                }),

                                this.sidebarHeading('Contact'),
                                ...[
                                    data.personalInfo?.email,
                                    data.personalInfo?.phone,
                                    data.personalInfo?.location || `${data.personalInfo?.city || ''}, ${data.personalInfo?.country || ''}`.trim(),
                                    data.personalInfo?.websiteUrl,
                                    data.personalInfo?.linkedinUrl
                                ].filter(Boolean).map(text => new Paragraph({
                                    children: [new TextRun({ text: String(text), color: 'FFFFFF', size: 16 })],
                                    spacing: { after: 100 },
                                })),

                                ...(data.skills && data.skills.length > 0 ? [
                                    this.sidebarHeading('Skills'),
                                    ...data.skills.map(s => new Paragraph({
                                        children: [new TextRun({ text: `• ${s.skillName}`, color: 'FFFFFF', size: 16 })],
                                        spacing: { after: 80 },
                                    }))
                                ] : []),

                                ...(data.languages && data.languages.length > 0 ? [
                                    this.sidebarHeading('Languages'),
                                    ...data.languages.map(l => new Paragraph({
                                        children: [new TextRun({ text: `${l.languageName} (${l.proficiencyLevel})`, color: 'FFFFFF', size: 16 })],
                                        spacing: { after: 80 },
                                    }))
                                ] : []),

                                ...(data.education && data.education.length > 0 ? [
                                    this.sidebarHeading('Education'),
                                    ...data.education.flatMap(edu => [
                                        new Paragraph({
                                            children: [new TextRun({ text: edu.institutionName, bold: true, color: 'FFFFFF', size: 18 })],
                                        }),
                                        new Paragraph({
                                            children: [new TextRun({ text: `${edu.degree}${edu.major ? ' in ' + edu.major : ''}`, color: 'FFFFFF', size: 14, italics: true })],
                                        }),
                                        new Paragraph({
                                            children: [new TextRun({ text: edu.endYear ? String(edu.endYear) : '', color: 'FFFFFF', size: 14 })],
                                            spacing: { after: 200 },
                                        }),
                                    ])
                                ] : []),
                            ],
                        }),
                        // Main Content Cell
                        new TableCell({
                            width: { size: 70, type: WidthType.PERCENTAGE },
                            margins: { top: 400, bottom: 400, left: 400, right: 400 },
                            children: [
                                ...(data.professionalSummary?.summaryText ? [
                                    this.mainHeading('Profile', theme),
                                    new Paragraph({
                                        text: data.professionalSummary.summaryText,
                                        spacing: { after: 300 },
                                    }),
                                ] : []),

                                ...(data.workExperience && data.workExperience.length > 0 ? [
                                    this.mainHeading('Experience', theme),
                                    ...data.workExperience.flatMap(exp => [
                                        new Paragraph({
                                            children: [
                                                new TextRun({ text: exp.jobTitle, bold: true, size: 24, color: theme.primary }),
                                                new TextRun({ text: `\t${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}`, bold: true, size: 18 }),
                                            ],
                                            tabStops: [{ type: AlignmentType.RIGHT, position: 7500 }],
                                        }),
                                        new Paragraph({
                                            children: [new TextRun({ text: exp.companyName, italics: true, color: '666666' })],
                                            spacing: { after: 150 },
                                        }),
                                        ...(exp.roleDescription ? [new Paragraph({ text: exp.roleDescription, spacing: { after: 100 } })] : []),
                                        ...(exp.achievements?.map(ach => new Paragraph({
                                            bullet: { level: 0 },
                                            text: ach.achievementText,
                                            spacing: { after: 50 },
                                        })) || []),
                                        new Paragraph({ text: '', spacing: { after: 200 } }),
                                    ])
                                ] : []),

                                ...(data.projects && data.projects.length > 0 ? [
                                    this.mainHeading('Projects', theme),
                                    ...data.projects.flatMap(proj => [
                                        new Paragraph({
                                            children: [new TextRun({ text: proj.projectName, bold: true, color: theme.primary, size: 20 })],
                                        }),
                                        new Paragraph({
                                            children: [new TextRun({ text: proj.role ? (proj.role + ' | ') : '', italics: true })],
                                        }),
                                        new Paragraph({
                                            text: proj.description || '',
                                            spacing: { after: 200 },
                                        }),
                                    ])
                                ] : []),

                                ...(data.certifications && data.certifications.length > 0 ? [
                                    this.mainHeading('Certifications', theme),
                                    ...data.certifications.map(cert => new Paragraph({
                                        children: [
                                            new TextRun({ text: cert.certificationName, bold: true }),
                                            new TextRun({ text: ` — ${cert.issuingOrganization} (${cert.issueYear || ''})` })
                                        ],
                                        spacing: { after: 100 }
                                    }))
                                ] : []),

                                ...(data.customSections?.map(section => (
                                    [
                                        this.mainHeading(section.title, theme),
                                        ...(section.items || []).map(item => new Paragraph({
                                            text: item.text || (item as any).content || '',
                                            bullet: { level: 0 },
                                            spacing: { after: 50 }
                                        }))
                                    ]
                                )).flat() || [])
                            ],
                        }),
                    ],
                }),
            ],
        })
    }

    private static createStandardLayout(data: ResumeDocument, theme: DOCXTheme): any[] {
        return [
            new Paragraph({
                text: data.personalInfo?.fullName || '',
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
                text: data.personalInfo?.professionalTitle || '',
                alignment: AlignmentType.CENTER,
                spacing: { before: 100, after: 200 },
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
                children: [
                    new TextRun({ text: [
                        data.personalInfo?.email,
                        data.personalInfo?.phone,
                        data.personalInfo?.location || `${data.personalInfo?.city || ''}, ${data.personalInfo?.country || ''}`.trim()
                    ].filter(Boolean).join('  •  ') }),
                ],
            }),

            ...(data.professionalSummary?.summaryText ? [
                this.standardSectionHeading('Professional Summary', theme),
                new Paragraph({ text: data.professionalSummary.summaryText, spacing: { after: 300 } }),
            ] : []),

            ...(data.workExperience && data.workExperience.length > 0 ? [
                this.standardSectionHeading('Experience', theme),
                ...data.workExperience.flatMap(exp => [
                    new Paragraph({
                        children: [
                            new TextRun({ text: exp.jobTitle, bold: true, size: 22 }),
                            new TextRun({ text: `\t${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}`, bold: true }),
                        ],
                        tabStops: [{ type: AlignmentType.RIGHT, position: 9000 }],
                    }),
                    new Paragraph({
                        children: [new TextRun({ text: exp.companyName, italics: true })],
                        spacing: { after: 100 }
                    }),
                    ...(exp.roleDescription ? [new Paragraph({ text: exp.roleDescription })] : []),
                    ...(exp.achievements?.map(ach => new Paragraph({
                        bullet: { level: 0 },
                        text: ach.achievementText,
                    })) || []),
                    new Paragraph({ text: '', spacing: { after: 200 } }),
                ])
            ] : []),

            ...(data.projects && data.projects.length > 0 ? [
                this.standardSectionHeading('Projects', theme),
                ...data.projects.flatMap(proj => [
                    new Paragraph({ children: [new TextRun({ text: proj.projectName, bold: true })] }),
                    new Paragraph({ text: proj.description || '', spacing: { after: 200 } }),
                ])
            ] : []),

            ...(data.education && data.education.length > 0 ? [
                this.standardSectionHeading('Education', theme),
                ...data.education.map(edu => new Paragraph({
                    children: [
                        new TextRun({ text: edu.institutionName, bold: true }),
                        new TextRun({ text: ` — ${edu.degree}${edu.major ? ' in ' + edu.major : ''} (${edu.endYear || ''})` }),
                    ],
                    spacing: { after: 100 },
                }))
            ] : []),

            ...(data.skills && data.skills.length > 0 ? [
                this.standardSectionHeading('Skills', theme),
                new Paragraph({ text: data.skills.map(s => s.skillName).join(', '), spacing: { after: 200 } })
            ] : []),

            ...(data.certifications && data.certifications.length > 0 ? [
                this.standardSectionHeading('Certifications', theme),
                ...data.certifications.map(cert => new Paragraph({
                    children: [new TextRun({ text: `${cert.certificationName} — ${cert.issuingOrganization} (${cert.issueYear || ''})` })],
                    spacing: { after: 100 },
                }))
            ] : []),

            ...(data.languages && data.languages.length > 0 ? [
                this.standardSectionHeading('Languages', theme),
                new Paragraph({ text: data.languages.map(l => `${l.languageName} (${l.proficiencyLevel})`).join(', ') })
            ] : []),

            ...(data.customSections?.map(section => (
                [
                    this.standardSectionHeading(section.title, theme),
                    ...(section.items || []).map(item => new Paragraph({
                        text: item.text || (item as any).content || (item as any).title || '',
                        bullet: { level: 0 },
                        spacing: { after: 50 }
                    }))
                ]
            )).flat() || [])
        ]
    }

    private static sidebarHeading(text: string): Paragraph {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text.toUpperCase(),
                    bold: true,
                    color: 'FFFFFF',
                    size: 20,
                    underline: { type: 'single', color: 'FFFFFF' }
                })
            ],
            spacing: { before: 300, after: 150 },
        })
    }

    private static mainHeading(text: string, theme: DOCXTheme): Paragraph {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text.toUpperCase(),
                    bold: true,
                    color: theme.primary,
                    size: 18,
                })
            ],
            border: {
                bottom: { color: theme.primary, space: 1, style: BorderStyle.SINGLE, size: 2 },
            },
            spacing: { before: 400, after: 200 },
        })
    }

    private static standardSectionHeading(text: string, theme: DOCXTheme): Paragraph {
        return new Paragraph({
            children: [
                new TextRun({ text: text.toUpperCase(), bold: true, color: theme.primary, size: 18 })
            ],
            border: {
                bottom: { color: theme.primary, space: 1, style: BorderStyle.SINGLE, size: 2 },
            },
            spacing: { before: 400, after: 200 },
        })
    }
}
