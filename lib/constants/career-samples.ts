import { ResumeDocument } from "@/lib/types/resume";

export const CAREER_SAMPLES: Record<string, ResumeDocument> = {
    software_engineer: {
        id: 'sample-sse',
        title: 'Senior Software Engineer Sample',
        documentType: 'resume',
        templateId: 'technical',
        personalInfo: {
            fullName: 'David Chen',
            professionalTitle: 'Senior Full Stack Engineer',
            email: 'david.chen@example.com',
            phone: '+1 (555) 123-4567',
            city: 'San Francisco',
            country: 'CA',
            location: 'San Francisco, CA',
            linkedinUrl: 'linkedin.com/in/dchen-dev',
            websiteUrl: 'davidchen.io',
        },
        professionalSummary: {
            summaryText: 'Performance-driven Full Stack Engineer with 10+ years of experience in architecting scalable web applications and distributed systems. Expert in React, Node.js, and AWS. Proven track record of optimizing system performance by 50% and leading cross-functional teams to deliver high-impact products in fast-paced startup environments.'
        },
        workExperience: [
            {
                jobTitle: 'Staff Software Engineer',
                companyName: 'CloudScale AI',
                location: 'San Francisco, CA',
                startDate: '2021-01',
                endDate: 'Present',
                isCurrent: true,
                roleDescription: 'Leading the infrastructure team to build internal tools and scaling the core platform to handle 1M+ concurrent users.',
                achievements: [
                    { achievementText: 'Architected and deployed a microservices-based communication layer, reducing latency by 40%.' },
                    { achievementText: 'Implemented automated CI/CD pipelines that reduced deployment errors by 75% and increased release frequency by 3x.' },
                    { achievementText: 'Managed a budget of $500k/year for cloud infrastructure, achieving 25% cost reduction through strategic resource allocation.' }
                ]
            },
            {
                jobTitle: 'Senior Software Engineer',
                companyName: 'DataViz Hub',
                location: 'Austin, TX',
                startDate: '2018-05',
                endDate: '2020-12',
                isCurrent: false,
                roleDescription: 'Focused on developing real-time data visualization dashboards for enterprise clients.',
                achievements: [
                    { achievementText: 'Developed a custom WebGL-based visualization engine that rendered 1M+ data points at 60fps.' },
                    { achievementText: 'Mentored 5 junior developers, 3 of whom were promoted to senior roles within 18 months.' }
                ]
            }
        ],
        education: [
            {
                institutionName: 'Stanford University',
                degree: 'Master of Science',
                major: 'Computer Science',
                endYear: 2016
            },
            {
                institutionName: 'UC Berkeley',
                degree: 'Bachelor of Science',
                major: 'Computer Science',
                endYear: 2014
            }
        ],
        skills: [
            { skillName: 'TypeScript', skillType: 'technical', proficiencyLevel: 'expert' },
            { skillName: 'React / Next.js', skillType: 'technical', proficiencyLevel: 'expert' },
            { skillName: 'Node.js', skillType: 'technical', proficiencyLevel: 'expert' },
            { skillName: 'AWS (S3, EC2, Lambda)', skillType: 'technical', proficiencyLevel: 'advanced' },
            { skillName: 'PostgreSQL', skillType: 'technical', proficiencyLevel: 'advanced' },
            { skillName: 'Docker / Kubernetes', skillType: 'technical', proficiencyLevel: 'advanced' }
        ],
        certifications: [
            {
                certificationName: 'AWS Certified Solutions Architect – Professional',
                issuingOrganization: 'Amazon Web Services',
                issueYear: 2023
            },
            {
                certificationName: 'Certified Kubernetes Administrator (CKA)',
                issuingOrganization: 'The Linux Foundation',
                issueYear: 2022
            }
        ],
        projects: [
            {
                projectName: 'Open Source UI Library',
                role: 'Maintainer',
                description: 'A React component library focused on accessibility and performance.',
                toolsUsed: ['React', 'TypeScript', 'Storybook'],
                startDate: '2020',
                endDate: 'Present'
            }
        ]
    },
    marketing_manager: {
        id: 'sample-marketing',
        title: 'Marketing Manager Sample',
        documentType: 'resume',
        templateId: 'modern',
        personalInfo: {
            fullName: 'Sarah Jenkins',
            professionalTitle: 'Digital Marketing Manager',
            email: 'sarah.j@example.com',
            phone: '+1 (555) 987-6543',
            city: 'Chicago',
            country: 'IL',
            location: 'Chicago, IL',
            linkedinUrl: 'linkedin.com/in/sajenkins',
        },
        professionalSummary: {
            summaryText: 'Strategic Marketing Leader with 7+ years of experience in driving brand growth through data-driven campaigns and creative storytelling. Specialized in SEO/SEM, content strategy, and multi-channel marketing. Increased organic traffic by 150% and lead generation by 80% for a mid-market e-commerce brand.'
        },
        workExperience: [
            {
                jobTitle: 'Digital Marketing Manager',
                companyName: 'LuxeLiving E-commerce',
                location: 'Chicago, IL',
                startDate: '2020-09',
                endDate: 'Present',
                isCurrent: true,
                roleDescription: 'Overseeing all digital marketing efforts, including paid search, social media, and email marketing.',
                achievements: [
                    { achievementText: 'Managed a monthly ad spend of $100k, achieving a consistent 4.5x ROAS across Google and Meta.' },
                    { achievementText: 'Launched a brand ambassador program that generated $500k in attributed revenue in the first year.' },
                    { achievementText: 'Redesigned email marketing automation flows, resulting in a 25% increase in repeat customer rate.' }
                ]
            },
            {
                jobTitle: 'Content Strategist',
                companyName: 'Bright Agency',
                location: 'Evanston, IL',
                startDate: '2017-06',
                endDate: '2020-08',
                isCurrent: false,
                roleDescription: 'Developed and executed content strategies for B2B tech clients.',
                achievements: [
                    { achievementText: 'Produced a viral whitepaper series that generated 10,000+ downloads and 500+ MQLs.' },
                    { achievementText: 'Improved search engine rankings for 15+ high-competition keywords to position #1-3.' }
                ]
            }
        ],
        education: [
            {
                institutionName: 'Northwestern University',
                degree: 'Bachelor of Science',
                major: 'Marketing & Communications',
                endYear: 2017
            }
        ],
        skills: [
            { skillName: 'Google Analytics 4', skillType: 'technical', proficiencyLevel: 'expert' },
            { skillName: 'HubSpot', skillType: 'technical', proficiencyLevel: 'expert' },
            { skillName: 'SEO / Keyword Research', skillType: 'professional', proficiencyLevel: 'expert' },
            { skillName: 'Meta Ads Manager', skillType: 'technical', proficiencyLevel: 'advanced' },
            { skillName: 'Content Strategy', skillType: 'professional', proficiencyLevel: 'expert' }
        ],
        certifications: [
            {
                certificationName: 'Google Analytics Individual Qualification',
                issuingOrganization: 'Google',
                issueYear: 2023
            },
            {
                certificationName: 'HubSpot Inbound Marketing Certification',
                issuingOrganization: 'HubSpot Academy',
                issueYear: 2022
            }
        ],
        languages: [
            { languageName: 'English', proficiencyLevel: 'native' },
            { languageName: 'Spanish', proficiencyLevel: 'fluent' }
        ]
    },
    sales_executive: {
        id: 'sample-sales',
        title: 'Sales Executive Sample',
        documentType: 'resume',
        templateId: 'professional',
        personalInfo: {
            fullName: 'Michael Rivera',
            professionalTitle: 'Account Executive',
            email: 'm.rivera@example.com',
            phone: '+1 (555) 444-3333',
            city: 'Atlanta',
            country: 'GA',
            location: 'Atlanta, GA',
        },
        professionalSummary: {
            summaryText: 'Results-oriented Sales Professional with 5+ years of experience in B2B SaaS sales. Consistent over-achiever with 120% average quota attainment. Expert in consultative selling, relationship management, and pipeline acceleration. Skilled in leveraging CRM data to drive strategic territory growth.'
        },
        workExperience: [
            {
                jobTitle: 'Account Executive',
                companyName: 'SaaS Pulse Technologies',
                location: 'Atlanta, GA',
                startDate: '2021-03',
                endDate: 'Present',
                isCurrent: true,
                roleDescription: 'Managing full-cycle sales for mid-market accounts in the Southeast territory.',
                achievements: [
                    { achievementText: 'Closed $1.5M in new business revenue in FY2023, representing 130% of annual target.' },
                    { achievementText: 'Reduced sales cycle length by 15 days through more effective multi-stakeholder navigation.' },
                    { achievementText: 'Awarded "Top Performer of the Year" in 2022 among a team of 30 AEs.' }
                ]
            },
            {
                jobTitle: 'Sales Development Representative',
                companyName: 'LeadGen Solutions',
                location: 'Remote',
                startDate: '2019-01',
                endDate: '2021-02',
                isCurrent: false,
                roleDescription: 'Prospected and qualified outbound leads for the enterprise sales team.',
                achievements: [
                    { achievementText: 'Consistently exceeded monthly meeting quotas by 20%, generating $3M+ in pipeline.' },
                    { achievementText: 'Developed a personalized outreach sequence that increased response rates from 3% to 12%.' }
                ]
            }
        ],
        education: [
            {
                institutionName: 'University of Georgia',
                degree: 'Bachelor of Business Administration',
                major: 'Sales & Marketing',
                endYear: 2018
            }
        ],
        skills: [
            { skillName: 'Salesforce CRM', skillType: 'technical', proficiencyLevel: 'expert' },
            { skillName: 'Consultative Selling', skillType: 'professional', proficiencyLevel: 'expert' },
            { skillName: 'Pipeline Management', skillType: 'professional', proficiencyLevel: 'advanced' },
            { skillName: 'Cold Calling / Outreach', skillType: 'professional', proficiencyLevel: 'expert' },
            { skillName: 'Negotiation', skillType: 'professional', proficiencyLevel: 'advanced' }
        ],
        achievements: [
            {
                achievementTitle: 'President\'s Club 2023',
                issuingBody: 'SaaS Pulse Technologies',
                year: 2023,
                description: 'Awarded to top 5% of sales performers globally.'
            }
        ]
    },
    graphic_designer: {
        id: 'sample-designer',
        title: 'Graphic Designer Sample',
        documentType: 'resume',
        templateId: 'artisan',
        personalInfo: {
            fullName: 'Elena Moretti',
            professionalTitle: 'Brand & Visual Designer',
            email: 'elena.m@example.com',
            phone: '+39 333 444 5555',
            city: 'Milan',
            country: 'Italy',
            location: 'Milan, Italy',
            portfolioUrl: 'elenamoretti.design'
        },
        professionalSummary: {
            summaryText: 'Multidisciplinary Designer with 6+ years of experience in creating cohesive brand identities and compelling visual narratives. Expert in Adobe Creative Cloud and Figma. Passionate about minimalism, typography, and sustainable design practices.'
        },
        workExperience: [
            {
                jobTitle: 'Senior Brand Designer',
                companyName: 'Studio Vento',
                location: 'Milan, IT',
                startDate: '2021-02',
                endDate: 'Present',
                isCurrent: true,
                roleDescription: 'Leading branding projects for luxury and hospitality clients across Europe.',
                achievements: [
                    { achievementText: 'Redesigned the identity for a boutique hotel chain, increasing direct bookings by 30% through improved visual trust.' },
                    { achievementText: 'Curated and executed a city-wide outdoor campaign that reached 1M+ impressions.' }
                ]
            }
        ],
        education: [
            {
                institutionName: 'Politecnico di Milano',
                degree: 'Master of Design',
                major: 'Visual Communication',
                endYear: 2018
            }
        ],
        skills: [
            { skillName: 'Brand Identity', skillType: 'professional', proficiencyLevel: 'expert' },
            { skillName: 'Adobe Illustrator', skillType: 'technical', proficiencyLevel: 'expert' },
            { skillName: 'Typography', skillType: 'professional', proficiencyLevel: 'expert' },
            { skillName: 'Layout Design', skillType: 'professional', proficiencyLevel: 'advanced' }
        ],
        customSections: [
            {
                title: 'Exhibitions',
                items: [
                    { text: 'Milan Design Week 2023 - "Future of Sustainable Packaging"' },
                    { text: 'TypoBerlin 2022 - Guest Speaker' }
                ]
            }
        ],
        languages: [
            { languageName: 'Italian', proficiencyLevel: 'native' },
            { languageName: 'English', proficiencyLevel: 'fluent' },
            { languageName: 'French', proficiencyLevel: 'intermediate' }
        ]
    },
    graduate: {
        id: 'sample-grad',
        title: 'Recent Graduate Sample',
        documentType: 'resume',
        templateId: 'graduate',
        personalInfo: {
            fullName: 'Oliver Thompson',
            professionalTitle: 'Aspiring Business Analyst',
            email: 'o.thompson@example.com',
            phone: '+1 (555) 777-8888',
            city: 'London',
            country: 'UK',
            location: 'London, UK'
        },
        professionalSummary: {
            summaryText: 'First-class Honours graduate in Business Management with a strong foundation in data analysis and strategic planning. Eager to apply analytical skills and a detail-oriented mindset to drive operational efficiency in a dynamic corporate environment.'
        },
        workExperience: [
            {
                jobTitle: 'Summer Analyst Intern',
                companyName: 'Global Advisory Partners',
                location: 'London, UK',
                startDate: '2023-06',
                endDate: '2023-09',
                isCurrent: false,
                roleDescription: 'Supported the research team in market analysis and competitor benchmarking.',
                achievements: [
                    { achievementText: 'Conducted a deep-dive research project on emerging fintech trends, presented to the senior partners.' },
                    { achievementText: 'Assisted in the preparation of client pitch decks that resulted in two new project approvals.' }
                ]
            }
        ],
        education: [
            {
                institutionName: 'London School of Economics (LSE)',
                degree: 'Bachelor of Science',
                major: 'Business Management',
                endYear: 2024,
                gpa: '3.9',
                coursework: 'Strategic Management, Econometrics, Corporate Finance, Data Operations'
            }
        ],
        skills: [
            { skillName: 'Data Visualization', skillType: 'professional', proficiencyLevel: 'intermediate' },
            { skillName: 'Microsoft Excel (VBA)', skillType: 'technical', proficiencyLevel: 'advanced' },
            { skillName: 'Market Research', skillType: 'professional', proficiencyLevel: 'advanced' },
            { skillName: 'Presentation Skills', skillType: 'professional', proficiencyLevel: 'expert' }
        ],
        volunteerExperience: [
            {
                roleTitle: 'Treasurer',
                organizationName: 'LSE Student Union',
                startDate: '2022',
                endDate: '2024',
                contributions: 'Managed an annual budget of £50,000, ensuring transparent allocation of funds for 20+ student societies.'
            }
        ]
    }
}
