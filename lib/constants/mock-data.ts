import { ResumeDocument } from "@/lib/types/resume";

export const MOCK_PREVIEW_DATA: ResumeDocument = {
    id: 'preview',
    title: 'Preview Resume',
    documentType: 'resume',
    templateId: 'classic',
    personalInfo: {
        fullName: 'Alex Morgan',
        professionalTitle: 'Senior Product Designer',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 012-3456',
        city: 'New York',
        country: 'NY',
        linkedinUrl: 'linkedin.com/in/alexmorgan'
    },
    professionalSummary: {
        summaryText: 'Creative and detail-oriented Product Designer with 6+ years of experience in building user-centric digital products. Proven track record of improving user engagement and streamlining design processes. Adept at collaborating with cross-functional teams to deliver high-quality solutions on time.'
    },
    workExperience: [
        {
            jobTitle: 'Senior UI/UX Designer',
            companyName: 'TechFlow Solutions',
            startDate: '2021',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading design initiatives for enterprise software applications.',
            achievements: [
                { achievementText: 'Spearheaded the redesign of the core platform, resulting in a 25% increase in user retention.' },
                { achievementText: 'Established a comprehensive design system used by 4 product teams.' },
                { achievementText: 'Mentored 3 junior designers and conducted weekly design reviews.' }
            ]
        },
        {
            jobTitle: 'Product Designer',
            companyName: 'Creative Pulse Agency',
            startDate: '2018',
            endDate: '2021',
            isCurrent: false,
            roleDescription: 'Designed marketing websites and mobile apps for various clients.',
            achievements: [
                { achievementText: 'Delivered 15+ mobile app designs for startups in fintech and healthcare.' },
                { achievementText: 'Reduced design handover time by 40% by implementing new prototyping tools.' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Rhode Island School of Design',
            degree: 'Bachelor of Fine Arts',
            major: 'Graphic Design',
            endYear: '2018'
        }
    ],
    skills: [
        { skillName: 'Figma', skillType: 'technical' },
        { skillName: 'Prototyping', skillType: 'technical' },
        { skillName: 'User Research', skillType: 'technical' },
        { skillName: 'HTML/CSS', skillType: 'technical' },
        { skillName: 'Agile', skillType: 'soft' }
    ]
}
