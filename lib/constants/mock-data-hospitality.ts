import { ResumeDocument } from "../types/resume"

export const MOCK_HOSPITALITY_DATA: ResumeDocument = {
    id: 'preview-hospitality',
    title: 'Hospitality Manager Resume',
    documentType: 'resume',
    templateId: 'hospitality-elite',
    personalInfo: {
        fullName: 'Isabella Vanni',
        professionalTitle: 'VIP Guest Relations Manager',
        email: 'isabella.vanni@luxuryresorts.com',
        phone: '+39 02 123 4567',
        city: 'Milan',
        country: 'Italy',
        location: 'Milan, Italy',
        linkedinUrl: 'linkedin.com/in/isabellavanni',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Dedicated Hospitality Professional with 12+ years of experience in ultra-luxury hotel environments. Specialized in high-net-worth guest relations and VIP protocols. Committed to delivering seamless, 5-star service experiences through meticulous attention to detail and cultural emotional intelligence.'
    },
    workExperience: [
        {
            jobTitle: 'Guest Relations Manager',
            companyName: 'Il Palazzo Luxury Hotel',
            location: 'Milan, Italy',
            startDate: '2019-05',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Overseeing the VIP guest experience for a 150-room boutique luxury hotel.',
            achievements: [
                { achievementText: 'Increased guest satisfaction scores by 25% through personalized arrival protocols' },
                { achievementText: 'Managed a team of 12 concierge and guest service professionals' },
                { achievementText: 'Reduced guest complaint resolution time by 40% with a new digital tracking system' }
            ]
        },
        {
            jobTitle: 'Senior Concierge',
            companyName: 'The Grand Resort',
            location: 'Amalfi Coast, Italy',
            startDate: '2015-03',
            endDate: '2019-04',
            isCurrent: false,
            roleDescription: 'Providing elite concierge services to international clientele in a high-volume seasonal resort.',
            achievements: [
                { achievementText: 'Awarded "Employee of the Year" twice for exceptional guest feedback' },
                { achievementText: 'Developed a local partnership network with 50+ exclusive vendors' },
                { achievementText: 'Curated customized luxury itineraries for over 200 VIP families per season' }
            ]
        },
        {
            jobTitle: 'Front Desk Supervisor',
            companyName: 'Boutique Firenze',
            location: 'Florence, Italy',
            startDate: '2012-06',
            endDate: '2015-02',
            isCurrent: false,
            roleDescription: 'Managed check-in operations and night audit procedures for an exclusive 50-room boutique property.',
            achievements: [
                { achievementText: 'Trained and onboarded 15 new front desk agents on property management systems' },
                { achievementText: 'Implemented an automated upselling protocol that increased room revenue by 12%' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Ecole hôtelière de Lausanne',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'International Hospitality Management',
            location: 'Switzerland',
            endYear: 2014
        }
    ],
    skills: [
        { skillName: 'VIP Protocol', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Luxury Service Standards', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Opera PMS', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'Multicultural Communication', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Crisis Management', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    languages: [
        { languageName: 'Italian', proficiencyLevel: 'native' },
        { languageName: 'English', proficiencyLevel: 'fluent' },
        { languageName: 'French', proficiencyLevel: 'fluent' },
        { languageName: 'German', proficiencyLevel: 'intermediate' }
    ],
    certifications: [
        {
            certificationName: 'Certified Hospitality Supervisor (CHS)',
            issuingOrganization: 'AHLEI',
            issueYear: 2018
        },
        {
            certificationName: 'Sommelier Level 1',
            issuingOrganization: 'Court of Master Sommeliers',
            issueYear: 2016
        }
    ]
}

export const MOCK_CRUISE_DATA: ResumeDocument = {
    id: 'preview-cruise',
    title: 'Cruise Ship Officer Resume',
    documentType: 'resume',
    templateId: 'cruise-excellence',
    personalInfo: {
        fullName: 'Capt. Marcus Thorne',
        professionalTitle: 'Guest Operations Officer',
        email: 'm.thorne@maritime-exec.com',
        phone: '+44 20 7946 0000',
        city: 'Southampton',
        country: 'UK',
        location: 'Southampton, UK',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Maritime professional with 15 years of experience in cruise ship operations and guest management. Expert in large-scale logistics, safety compliance, and delivering world-class entertainment and hospitality at sea. Proven leader in fast-paced, multi-cultural environments.'
    },
    workExperience: [
        {
            jobTitle: 'Guest Operations Officer',
            companyName: 'Azure Seas Cruises',
            location: 'International Waters',
            startDate: '2017-08',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Managing all non-technical guest operations for a 3,000-passenger luxury cruise liner.',
            achievements: [
                { achievementText: 'Coordinated turnaround operations for 45 successful Mediterranean voyages' },
                { achievementText: 'Oversaw a department of 150 staff members from 30 different nations' },
                { achievementText: 'Maintained a 98% safety compliance rating across all quarterly external audits' }
            ]
        },
        {
            jobTitle: 'Assistant Hotel Manager',
            companyName: 'Star Horizon Lines',
            location: 'Caribbean Fleet',
            startDate: '2012-05',
            endDate: '2017-07',
            isCurrent: false,
            roleDescription: 'Assisting in the management of onboard hotel operations including F&B and housekeeping.',
            achievements: [
                { achievementText: 'Reduced onboard food waste by 18% through optimized inventory management' },
                { achievementText: 'Led the launch of two new specialty restaurants on the flagship vessel' },
                { achievementText: 'Managed housekeeping rotations for 1,200 cabins, maintaining a pristine standard of cleanliness' }
            ]
        },
        {
            jobTitle: 'Purser / Chief Receptionist',
            companyName: 'Royal Odyssey Cruises',
            location: 'Global Deployments',
            startDate: '2008-03',
            endDate: '2012-04',
            isCurrent: false,
            roleDescription: 'Handled guest accounts, currency exchange, and general inquiries at the main purser desk.',
            achievements: [
                { achievementText: 'Processed over $500k in daily onboard transactions accurately across 4 currencies' },
                { achievementText: 'Pioneered an interactive digital directory that decreased guest inquiries at the desk by 30%' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Warsash Maritime Academy',
            degree: 'BSc (Hons)',
            fieldOfStudy: 'Maritime Business and Operations',
            location: 'UK',
            endYear: 2011
        }
    ],
    skills: [
        { skillName: 'Maritime Safety (STCW)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Large-Scale Event Planning', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'International Maritime Law', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Team Leadership', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Budgeting & Cost Control', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Spanish', proficiencyLevel: 'fluent' },
        { languageName: 'Portuguese', proficiencyLevel: 'intermediate' }
    ],
    certifications: [
        {
            certificationName: 'STCW Basic Safety Training',
            issuingOrganization: 'IMO',
            issueYear: 2022
        },
        {
            certificationName: 'Crowd Management Certificate',
            issuingOrganization: 'Maritime Authority',
            issueYear: 2021
        }
    ]
}
