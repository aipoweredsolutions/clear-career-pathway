import { ResumeDocument } from '@/lib/types/resume'

export const mockHeroResume: ResumeDocument = {
    id: 'hero-mock',
    userId: 'mock-user',
    documentType: 'resume',
    title: 'Senior Software Engineer',
    templateId: 'ats-executive',
    careerLevel: 'senior',
    jobType: 'technical',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    personalInfo: {
        fullName: 'Alexander Wright',
        professionalTitle: 'Senior Full Stack Engineer',
        email: 'alexander.wright@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedinUrl: 'linkedin.com/in/alexwright',
        githubUrl: 'github.com/awright'
    },
    professionalSummary: {
        headline: 'Innovative Senior Engineer specializing in scalable cloud architectures',
        summaryText: 'Results-driven Senior Full Stack Engineer with over 8 years of experience designing, building, and deploying scalable web applications and distributed systems. Proven track record of leading high-performing engineering teams to deliver robust software solutions that drive business growth and operational efficiency.'
    },
    workExperience: [
        {
            id: 'exp-1',
            jobTitle: 'Lead Software Engineer',
            companyName: 'TechNova Solutions',
            location: 'San Francisco, CA',
            startDate: '2020-03-01',
            isCurrent: true,
            achievements: [
                { achievementText: 'Architected a microservices-based platform migration, reducing system latency by 40% and increasing uptime to 99.99%.' },
                { achievementText: 'Led a cross-functional team of 8 engineers in developing a high-throughput event processing pipeline capable of handling 5M+ daily transactions.' },
                { achievementText: 'Implemented CI/CD automation that accelerated deployment frequency by 3x and reduced integration bugs by 60%.' }
            ]
        },
        {
            id: 'exp-2',
            jobTitle: 'Software Engineer II',
            companyName: 'InnoStream Tech',
            location: 'Austin, TX',
            startDate: '2016-06-01',
            endDate: '2020-02-01',
            achievements: [
                { achievementText: 'Developed and maintained core features of a SaaS platform used by over 50,000 enterprise customers.' },
                { achievementText: 'Optimized database query performance, cutting average load times by 2.5 seconds on critical dashboard views.' },
                { achievementText: 'Mentored 3 junior developers and established comprehensive code review guidelines.' }
            ]
        }
    ],
    education: [
        {
            id: 'edu-1',
            degree: 'Master of Science',
            fieldOfStudy: 'Computer Science',
            institutionName: 'Stanford University',
            location: 'Stanford, CA',
            endYear: 2016,
            gpa: '3.9'
        },
        {
            id: 'edu-2',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Software Engineering',
            institutionName: 'University of Texas',
            location: 'Austin, TX',
            endYear: 2014,
            gpa: '3.8'
        }
    ],
    skills: [
        { skillName: 'React / Next.js / TypeScript', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Node.js / Python / Go', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'AWS / Docker / Kubernetes', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'PostgreSQL / MongoDB / Redis', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'System Architecture & Design', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Agile Team Leadership', skillType: 'professional', proficiencyLevel: 'advanced' }
    ]
}
