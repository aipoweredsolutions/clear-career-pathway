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
import { templateRegistry } from '@/lib/templates/registry'

interface DOCXTheme {
    primary: string
    secondary: string
    accent: string
    hasSidebar: boolean
    isModern: boolean
    font: string
    isCentered: boolean
}

export class ResumeDOCX {
    private static getTheme(data: ResumeDocument): DOCXTheme {
        const id = (data.templateId || '').toLowerCase()
        const hasSidebar = 
            id.startsWith('elegant-split') || 
            id.startsWith('prestige') ||
            id.startsWith('sterling-corporate') ||
            id.startsWith('classic-left-header') ||
            id.startsWith('meridian-professional') ||
            id.includes('sidebar')

        const isCentered = id.startsWith('classic') ||
            id.startsWith('ats-professional') ||
            id.startsWith('ats-classic') ||
            id.startsWith('ats-nursing') ||
            id.startsWith('ats-academia') ||
            id.startsWith('ats-gold-standard') ||
            id.startsWith('elite-london') ||
            id.startsWith('elite-kyoto')

        const isModern = id.startsWith('ats-modern') || id.startsWith('modern') || id.startsWith('ats-masthead') || id.startsWith('elite-alpine') || id.startsWith('elite-summit');

        let primaryHex = '111827';
        let secondaryHex = '4B5563';
        const template = templateRegistry.find(t => t.id === id);
        if (template && template.colors && template.colors.length > 0) {
            const colorOption = template.colors.find(c => c.id === data.formatting?.themeColor) || template.colors[0];
            if (colorOption) {
                primaryHex = colorOption.hex.replace('#', '');
            }
        }

        let font = 'Arial';
        if (data.formatting?.fontFamily === 'serif') {
            font = 'Georgia';
        } else if (data.formatting?.fontFamily === 'sans') {
            font = 'Arial';
        } else {
            const isEtsyPremiumSerif = id.startsWith('ats-executive') || id === 'classic-clean' || id.startsWith('ats-royal') || id.startsWith('sterling-corporate') || id.startsWith('ats-academia') || id.startsWith('elite-london') || id.startsWith('elite-kyoto');
            const isStandardSerif = id.startsWith('ats-classic') || id.includes('serif') || id.startsWith('prestige') || id.startsWith('ats-gold');
            if (isEtsyPremiumSerif || isStandardSerif) font = 'Georgia';
            else if (id.includes('technical')) font = 'Courier New';
        }

        return {
            primary: primaryHex,
            secondary: secondaryHex,
            accent: primaryHex,
            hasSidebar,
            isModern,
            font,
            isCentered
        }
    }

    static async download(data: ResumeDocument, filename: string = 'resume.docx') {
        const theme = this.getTheme(data)
        const id = (data.templateId || '').toLowerCase()
        const isAtsProfessional = id.startsWith('ats-professional')
        const isEliteAlpine = id.startsWith('elite-alpine')

        const doc = new Document({
            styles: {
                default: {
                    document: {
                        run: {
                            font: theme.font,
                        },
                    },
                },
            },
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
                children: data.documentType === 'cover_letter'
                    ? this.createCoverLetterLayout(data, theme)
                    : isAtsProfessional
                        ? this.createAtsProfessionalLayout(data, theme)
                        : isEliteAlpine
                            ? this.createEliteAlpineLayout(data, theme)
                            : (theme.hasSidebar
                                ? [this.createSidebarLayout(data, theme)]
                                : this.createStandardLayout(data, theme))
            }],
        })

        const blob = await Packer.toBlob(doc)
        saveAs(blob, filename)
    }

    private static createCoverLetterLayout(data: ResumeDocument, theme: DOCXTheme): any[] {
        const { personalInfo, coverLetter } = data
        const align = AlignmentType.LEFT
        
        const today = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        const contentParas = (coverLetter?.content || '').split('\n').filter(Boolean).map(para => 
            new Paragraph({ text: para, spacing: { after: 240 }, alignment: AlignmentType.JUSTIFIED })
        )

        return [
            // Header
            new Paragraph({
                text: personalInfo?.fullName || '',
                heading: HeadingLevel.TITLE,
                alignment: align,
                spacing: { after: 100 }
            }),
            new Paragraph({
                alignment: align,
                spacing: { after: 400 },
                children: [
                    new TextRun({ text: [
                        personalInfo?.email,
                        personalInfo?.phone,
                        personalInfo?.location || `${personalInfo?.city || ''}, ${personalInfo?.country || ''}`.trim(),
                        personalInfo?.linkedinUrl ? 'LinkedIn' : ''
                    ].filter(Boolean).join('  •  '), color: '666666' }),
                ],
                border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 2 } }
            }),

            // Date
            new Paragraph({ children: [new TextRun({ text: today, bold: true })], spacing: { before: 200, after: 300 } }),

            // Recipient
            ...(coverLetter?.recipientName ? [new Paragraph({ children: [new TextRun({ text: coverLetter.recipientName, bold: true })] })] : []),
            ...(coverLetter?.recipientTitle ? [new Paragraph({ text: coverLetter.recipientTitle })] : []),
            ...(coverLetter?.companyName ? [new Paragraph({ children: [new TextRun({ text: coverLetter.companyName, bold: true })] })] : []),
            ...(coverLetter?.companyAddress ? [new Paragraph({ text: coverLetter.companyAddress, spacing: { after: 300 } })] : []),
            ...(!coverLetter?.companyAddress ? [new Paragraph({ text: '', spacing: { after: 300 } })] : []),

            // Subject
            new Paragraph({
                children: [new TextRun({ text: `Re: ${coverLetter?.jobTitle || 'Application'} Position`, bold: true })],
                spacing: { after: 300 }
            }),

            // Salutation
            new Paragraph({ text: `Dear ${coverLetter?.recipientName || 'Hiring Manager'},`, spacing: { after: 200 } }),

            // Body
            ...(contentParas.length > 0 ? contentParas : [new Paragraph({ text: 'Your cover letter content will appear here.', spacing: { after: 240 } })]),

            // Closing
            new Paragraph({ text: 'Sincerely,', spacing: { before: 200, after: 400 } }),
            new Paragraph({ children: [new TextRun({ text: personalInfo?.fullName || '', bold: true })] })
        ]
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

    private static createAtsProfessionalLayout(data: ResumeDocument, theme: DOCXTheme): any[] {
        const contactText = [
            data.personalInfo?.email,
            data.personalInfo?.phone,
            data.personalInfo?.location || `${data.personalInfo?.city || ''}, ${data.personalInfo?.country || ''}`.trim(),
            data.personalInfo?.linkedinUrl,
            data.personalInfo?.websiteUrl
        ].filter(Boolean).join('  |  ');

        const headerElements = [
            new Paragraph({
                children: [new TextRun({ text: (data.personalInfo?.fullName || '').toUpperCase(), bold: true, size: 48 })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 }
            }),
            new Paragraph({
                children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), color: theme.primary, size: 22 })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
            }),
            new Paragraph({
                border: {
                    top: { color: 'E5E7EB', space: 1, style: BorderStyle.SINGLE, size: 4 },
                    bottom: { color: 'E5E7EB', space: 1, style: BorderStyle.SINGLE, size: 4 }
                },
                alignment: AlignmentType.CENTER,
                spacing: { before: 100, after: 300 },
                children: [new TextRun({ text: contactText, color: '666666' })],
            }),
        ];

        return [
            ...headerElements,
            ...this.createBodyElements(data, theme)
        ];
    }

    private static createEliteAlpineLayout(data: ResumeDocument, theme: DOCXTheme): any[] {
        const contactText = [
            data.personalInfo?.email,
            data.personalInfo?.phone,
            data.personalInfo?.location || `${data.personalInfo?.city || ''}, ${data.personalInfo?.country || ''}`.trim(),
            data.personalInfo?.linkedinUrl,
            data.personalInfo?.websiteUrl
        ].filter(Boolean).join('   •   ');

        const headerElements = [
            new Paragraph({
                children: [new TextRun({ text: (data.personalInfo?.fullName || '').toUpperCase(), bold: true, size: 64 })],
                alignment: AlignmentType.LEFT,
                spacing: { after: 100 }
            }),
            new Paragraph({
                children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), color: theme.secondary, size: 24 })],
                alignment: AlignmentType.LEFT,
                spacing: { after: 100 },
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { after: 400 },
                children: [new TextRun({ text: contactText, color: '334155' })],
            }),
        ];

        return [
            ...headerElements,
            ...this.createBodyElements(data, theme)
        ];
    }

    private static createStandardLayout(data: ResumeDocument, theme: DOCXTheme): any[] {
        const id = (data.templateId || '').toLowerCase()
        const contactText = [
            data.personalInfo?.email,
            data.personalInfo?.phone,
            data.personalInfo?.location || `${data.personalInfo?.city || ''}, ${data.personalInfo?.country || ''}`.trim()
        ].filter(Boolean).join('  •  ');
        
        const contactBar = [
            data.personalInfo?.email,
            data.personalInfo?.phone,
            data.personalInfo?.location || `${data.personalInfo?.city || ''}, ${data.personalInfo?.country || ''}`.trim()
        ].filter(Boolean).join('  |  ');

        let headerElements: any[] = [];

        if (id.includes('technical')) {
            headerElements = [
                new Paragraph({
                    children: [new TextRun({ text: '[ * ]  [ * ]  [ * ]', color: '666666' })],
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: data.personalInfo?.fullName || 'Untitled', size: 40 })],
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: data.personalInfo?.professionalTitle || '', color: theme.primary, size: 24 })],
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: contactText, color: '666666' })],
                    spacing: { after: 400 }
                })
            ];
        } else if (id.includes('bauhaus')) {
            const name = data.personalInfo?.fullName || 'Untitled'
            const parts = name.split(' ')
            const last = parts.length >= 2 ? parts.pop() : ''
            const rest = parts.join(' ')
            headerElements = [
                new Paragraph({
                    children: [
                        new TextRun({ text: rest + ' ', bold: true, size: 80 }),
                        new TextRun({ text: last || '', color: theme.primary, size: 80 })
                    ],
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: '▬▬ ', color: '171717', size: 20 }),
                        new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), size: 20 })
                    ],
                    spacing: { after: 300 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: contactText, color: '666666' })],
                    spacing: { after: 600 }
                })
            ];
        } else if (id.startsWith('ats-academia-cv')) {
            headerElements = [
                new Paragraph({
                    children: [new TextRun({ text: data.personalInfo?.fullName || 'Your Name', bold: true, size: 48 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: data.personalInfo?.professionalTitle || '', color: '737373', size: 22 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    border: { bottom: { color: 'D4D4D4', space: 1, style: BorderStyle.SINGLE, size: 2 } },
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100, after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: contactText, color: '666666' })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 }
                })
            ];
        } else if (id.startsWith('ats-modern')) {
            headerElements = [
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                        top: { style: BorderStyle.NONE }, bottom: { color: 'F3F4F6', size: 4, space: 1, style: BorderStyle.SINGLE },
                        left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
                        insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 70, type: WidthType.PERCENTAGE },
                                    margins: { bottom: 300 },
                                    children: [
                                        new Paragraph({
                                            children: [new TextRun({ text: data.personalInfo?.fullName || 'Your Name', bold: true, size: 72 })],
                                            spacing: { after: 100 }
                                        }),
                                        new Paragraph({
                                            children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), bold: true, color: theme.primary, size: 22 })]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: { size: 30, type: WidthType.PERCENTAGE },
                                    margins: { bottom: 300 },
                                    children: [
                                        new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: [data.personalInfo?.city, data.personalInfo?.country].filter(Boolean).join(', '), bold: true, size: 20 })] }),
                                        new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: data.personalInfo?.email || '', color: '737373', size: 18 })] }),
                                        new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: data.personalInfo?.phone || '', color: '737373', size: 18 })] }),
                                        new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: (data.personalInfo?.linkedinUrl || '').replace(/^https?:\/\/(www\.)?/, '').toUpperCase(), bold: true, size: 16 })], spacing: { before: 100 } })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                new Paragraph({ text: '', spacing: { after: 400 } })
            ];
        } else if (id.includes('chronograph')) {
            headerElements = [
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.fullName || 'Untitled').toUpperCase(), size: 64 })],
                    spacing: { after: 150 }
                }),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                        top: { style: BorderStyle.NONE }, bottom: { color: theme.primary, size: 8, space: 1, style: BorderStyle.SINGLE },
                        left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
                        insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 40, type: WidthType.PERCENTAGE },
                                    margins: { bottom: 300 },
                                    children: [new Paragraph({ children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), size: 22 })] })]
                                }),
                                new TableCell({
                                    width: { size: 60, type: WidthType.PERCENTAGE },
                                    margins: { bottom: 300 },
                                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: contactText, color: '666666' })] })]
                                })
                            ]
                        })
                    ]
                }),
                new Paragraph({ text: '', spacing: { after: 400 } })
            ];
        } else if (id.startsWith('ats-gold-standard')) {
            headerElements = [
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.fullName || 'Untitled').toUpperCase(), size: 48 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), color: '94A3B8', size: 18 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 }
                }),
                new Paragraph({
                    border: { top: { color: 'E2E8F0', size: 2, space: 1, style: BorderStyle.SINGLE }, bottom: { color: 'E2E8F0', size: 2, space: 1, style: BorderStyle.SINGLE } },
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100, after: 100 },
                    children: [new TextRun({ text: contactBar, color: '666666' })]
                }),
                new Paragraph({ text: '', spacing: { after: 400 } })
            ];
        } else if (id.startsWith('ats-editorial')) {
            const name = data.personalInfo?.fullName || 'NAME'
            const parts = name.split(' ')
            headerElements = [
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: { bottom: { color: '171717', size: 4, space: 1, style: BorderStyle.SINGLE }, top: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    margins: { bottom: 300 },
                                    children: [
                                        new Paragraph({ children: [new TextRun({ text: (parts[0] || 'NAME').toUpperCase(), bold: true, size: 64 })] }),
                                        new Paragraph({ children: [new TextRun({ text: parts.slice(1).join(' ').toUpperCase() + (parts.length > 1 ? '.' : ''), bold: true, size: 64 })] })
                                    ]
                                }),
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    margins: { bottom: 300 },
                                    children: [
                                        new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), italics: true, color: 'A3A3A3', size: 22 })] })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                new Paragraph({ text: '', spacing: { after: 400 } })
            ];
        } else if (id.startsWith('ats-masthead')) {
            headerElements = [
                new Paragraph({ border: { bottom: { color: '171717', size: 4, space: 1, style: BorderStyle.SINGLE } }, spacing: { after: 300 } }),
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.fullName || 'Your Name').toUpperCase(), size: 48 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 150 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: data.personalInfo?.professionalTitle || '', italics: true, color: '737373', size: 22 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 }
                }),
                new Paragraph({ border: { bottom: { color: '171717', size: 4, space: 1, style: BorderStyle.SINGLE } }, spacing: { after: 300 } }),
                new Paragraph({
                    children: [new TextRun({ text: contactText, color: '666666' })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 600 }
                })
            ];
        } else if (id.startsWith('ats-cornerstone')) {
            headerElements = [
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.fullName || 'Your Name').toUpperCase(), bold: true, size: 48 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), bold: true, color: '78716C', size: 20 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: contactBar, color: '666666' })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Paragraph({ border: { bottom: { color: theme.primary || '78350F', size: 4, space: 1, style: BorderStyle.SINGLE } }, spacing: { after: 500 } })
            ];
        } else if (id.startsWith('ats-metro')) {
            headerElements = [
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    shading: { fill: '171717', type: ShadingType.CLEAR },
                                    margins: { top: 400, bottom: 400, left: 400, right: 200 },
                                    children: [
                                        new Paragraph({ children: [new TextRun({ text: (data.personalInfo?.fullName || 'Your Name').toUpperCase(), color: 'FFFFFF', size: 48 })], spacing: { after: 100 } }),
                                        new Paragraph({ children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), color: 'A3A3A3', size: 20 })] })
                                    ]
                                }),
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    shading: { fill: '171717', type: ShadingType.CLEAR },
                                    margins: { top: 400, bottom: 400, left: 200, right: 400 },
                                    children: [
                                        new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: contactText, color: 'FFFFFF' })] })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                new Paragraph({ text: '', spacing: { after: 600 } })
            ];
        } else if (id.startsWith('ats-minimal')) {
            headerElements = [
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.fullName || 'YOUR NAME').toUpperCase(), bold: true, size: 64 })],
                    spacing: { after: 100 }
                }),
                ...(data.personalInfo?.professionalTitle ? [
                    new Paragraph({ children: [new TextRun({ text: data.personalInfo.professionalTitle.toUpperCase(), bold: true, color: '737373', size: 22 })], spacing: { after: 200 } })
                ] : []),
                new Paragraph({
                    border: { bottom: { color: '171717', size: 3, space: 1, style: BorderStyle.SINGLE } },
                    children: [new TextRun({ text: contactBar, color: '666666' })],
                    spacing: { after: 400 }
                })
            ];
        } else if (id.startsWith('elite-london')) {
            headerElements = [
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.fullName || 'Untitled').toUpperCase(), bold: true, size: 68 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: (data.personalInfo?.professionalTitle || '').toUpperCase(), color: '737373', size: 20 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Paragraph({ border: { bottom: { color: '171717', size: 2, space: 1, style: BorderStyle.SINGLE } }, spacing: { after: 200 } }),
                new Paragraph({
                    children: [new TextRun({ text: contactBar, color: '666666' })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 500 }
                })
            ];
        } else {
            // Default StandardLayout
            const align = theme.isCentered ? AlignmentType.CENTER : AlignmentType.LEFT;
            if (theme.isModern) {
                headerElements = [
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        shading: { fill: theme.primary, type: ShadingType.CLEAR },
                                        margins: { top: 400, bottom: 400, left: 400, right: 400 },
                                        children: [
                                            new Paragraph({ children: [new TextRun({ text: data.personalInfo?.fullName || '', bold: true, size: 48, color: 'FFFFFF' })], alignment: align }),
                                            new Paragraph({ children: [new TextRun({ text: data.personalInfo?.professionalTitle || '', color: 'FFFFFF', size: 24 })], alignment: align, spacing: { before: 100, after: 200 } }),
                                            new Paragraph({ alignment: align, children: [new TextRun({ text: contactText, color: 'FFFFFF' })] }),
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    new Paragraph({ text: '', spacing: { after: 400 } })
                ];
            } else {
                headerElements = [
                    new Paragraph({ children: [new TextRun({ text: data.personalInfo?.fullName || '', bold: true, size: 52 })], alignment: align }),
                    new Paragraph({ children: [new TextRun({ text: data.personalInfo?.professionalTitle || '', color: theme.primary, size: 24 })], alignment: align, spacing: { before: 100, after: 200 } }),
                    new Paragraph({ alignment: align, spacing: { after: 400 }, children: [new TextRun({ text: contactText, color: '666666' })] }),
                ];
            }
        }

        return [
            ...headerElements,
            ...this.createBodyElements(data, theme)
        ]
    }

    private static createBodyElements(data: ResumeDocument, theme: DOCXTheme): any[] {
        return [
            ...(data.professionalSummary?.summaryText ? [
                this.standardSectionHeading('Professional Summary', theme),
                new Paragraph({ text: data.professionalSummary.summaryText, spacing: { after: 300 } }),
            ] : []),

            ...(data.workExperience && data.workExperience.length > 0 ? [
                this.standardSectionHeading('Experience', theme),
                ...data.workExperience.flatMap(exp => [
                    new Paragraph({
                        children: [
                            new TextRun({ text: exp.jobTitle, bold: true, size: 22, color: theme.primary }),
                            new TextRun({ text: `\t${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}`, bold: true, color: '666666' }),
                        ],
                        tabStops: [{ type: AlignmentType.RIGHT, position: 9000 }],
                    }),
                    new Paragraph({
                        children: [new TextRun({ text: exp.companyName, italics: true, color: theme.secondary })],
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
                        new TextRun({ text: edu.institutionName, bold: true, color: theme.primary }),
                        new TextRun({ text: ` — ${edu.degree}${edu.major ? ' in ' + edu.major : ''} (${edu.endYear || ''})`, color: '666666' }),
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
