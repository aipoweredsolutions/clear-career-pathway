import { ResumeDocument } from "../types/resume"

export const MOCK_TRADES_DATA: ResumeDocument = {
    id: 'preview-trades',
    title: 'Master Electrician Resume',
    documentType: 'resume',
    templateId: 'trades-pro',
    personalInfo: {
        fullName: 'Robert Garcia',
        professionalTitle: 'Master Electrician & Project Foreman',
        email: 'r.garcia@trades-exec.com',
        phone: '+1 (480) 555-0122',
        city: 'Phoenix',
        country: 'AZ',
        location: 'Phoenix, AZ',
        linkedinUrl: 'linkedin.com/in/robertgarcia-electric'
    },
    professionalSummary: {
        summaryText: 'Red-Seal Certified Master Electrician with 15+ years of experience in residential, commercial, and industrial electrical systems. Expert in complex circuitry, national electrical codes (NEC), and leading large-scale renovation projects. Proven track record of maintaining zero-incident safety records across hundred-million dollar job sites. Skilled in blueprint reading, load calculations, and mentoring junior apprentices. Dedicated to high-quality craftsmanship and rigorous safety compliance in every project.'
    },
    workExperience: [
        {
            jobTitle: 'Electrical Project Foreman',
            companyName: 'Desert Sun Electrical Solutions',
            location: 'Phoenix, AZ',
            startDate: '2018-05',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing all electrical operations for multi-unit commercial developments and industrial warehouse builds.',
            achievements: [
                { achievementText: 'Managed a team of 15 journeymen and 5 apprentices through the successful completion of a $12M data center project' },
                { achievementText: 'Consistently delivered projects 10% under labor budget through optimized material staging and crew scheduling' },
                { achievementText: 'Implemented a new digital safety tracking system that contributed to a 3-year streak of zero lost-time incidents' },
                { achievementText: 'Coordinated directly with general contractors and architects to resolve 500+ potential circuitry conflicts during the design phase' }
            ]
        },
        {
            jobTitle: 'Journeyman Electrician',
            companyName: 'Peak Performance Power',
            location: 'Scottsdale, AZ',
            startDate: '2012-03',
            endDate: '2018-04',
            isCurrent: false,
            roleDescription: 'Lead electrician for high-end residential custom homes and luxury retail build-outs.',
            achievements: [
                { achievementText: 'Spearheaded the electrical installation for 20+ custom estates with individual build values exceeding $5M' },
                { achievementText: 'Expertly installed advanced smart-home systems (Control4, Lutron) and complex home automation networks' },
                { achievementText: 'Awarded "Craftsman of the Year" twice by the regional building association for excellence in conduit layout' }
            ]
        },
        {
            jobTitle: 'Electrical Apprentice',
            companyName: 'Valley Wire & Light',
            location: 'Phoenix, AZ',
            startDate: '2008-01',
            endDate: '2012-02',
            isCurrent: false,
            roleDescription: 'Assisted senior electricians in wiring new residential developments and performing maintenance calls.',
            achievements: [
                { achievementText: 'Successfully completed 8,000+ hours of on-the-job training and passed the state journeyman exam with a 98% score' },
                { achievementText: 'Managed inventory and tool maintenance for 5 mobile service trucks, reducing tool loss by 30%' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Arizona State Trade Institute',
            degree: 'Certificate of Mastery',
            fieldOfStudy: 'Electrical Systems Tech',
            location: 'Phoenix, AZ',
            endYear: 2012
        }
    ],
    skills: [
        { skillName: 'NEC Code Compliance', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Blueprint Reading', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Load Calculations', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'PLC Programming', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Smart Home Automation', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'OSHA 30 Certified', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Team Leadership', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Project Estimation', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'Master Electrician License',
            issuingOrganization: 'State of Arizona',
            issueYear: 2018
        },
        {
            certificationName: 'OSHA 30-Hour Safety Certification',
            issuingOrganization: 'OSHA',
            issueYear: 2020
        },
        {
            certificationName: 'Red Seal Certified',
            issuingOrganization: 'Trades Commission',
            issueYear: 2015
        }
    ],
    projects: [
        {
            projectName: 'Phoenix Data Center North',
            description: 'Lead electrical foreman for a 50,000 sq. ft. Tier 4 data center. Managed full redundancy power systems and backup generator integration.',
            toolsUsed: ['AutoCAD', 'Heavy-Duty Conduit', 'Industrial Switchgear'],
            startDate: '2021',
            endDate: '2022',
            outcomes: 'Zero downtime recorded since go-live; completed 2 weeks ahead of schedule.'
        },
        {
            projectName: 'The Grand Luxury Condos',
            description: 'Electrical design-build for a 150-unit luxury residential tower. Integrated custom lighting control and solar energy systems.',
            startDate: '2019',
            endDate: '2020'
        }
    ]
}
