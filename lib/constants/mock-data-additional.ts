import { ResumeDocument } from "../types/resume"

// Marketing Manager Mock Data
export const MOCK_MARKETING_DATA: ResumeDocument = {
    id: 'preview-marketing',
    title: 'Marketing Manager Resume',
    documentType: 'resume',
    templateId: 'ats-professional',
    personalInfo: {
        fullName: 'Jessica Martinez',
        professionalTitle: 'Senior Marketing Manager | Growth Strategist',
        email: 'jessica.martinez@example.com',
        phone: '+1 (555) 234-8765',
        city: 'Austin',
        country: 'TX',
        location: 'Austin, TX',
        linkedinUrl: 'linkedin.com/in/jessicamartinez',
        websiteUrl: 'jessicamartinez.com'
    },
    professionalSummary: {
        summaryText: 'Results-driven Marketing Manager with 8+ years driving growth for B2B SaaS companies. Expert in demand generation, content marketing, and marketing automation. Proven track record of increasing MQLs by 200%, reducing CAC by 40%, and scaling marketing teams from 2 to 15 members. Skilled in data-driven decision making and cross-functional collaboration.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Marketing Manager',
            companyName: 'CloudTech Solutions',
            location: 'Austin, TX',
            startDate: '2020-06',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading demand generation and content marketing strategies for B2B SaaS platform serving 5,000+ enterprise clients.',
            achievements: [
                { achievementText: 'Increased Marketing Qualified Leads (MQLs) by 215% year-over-year through multi-channel campaigns' },
                { achievementText: 'Reduced Customer Acquisition Cost (CAC) by 42% while maintaining lead quality and conversion rates' },
                { achievementText: 'Built and managed marketing team of 8, including content writers, designers, and marketing automation specialists' },
                { achievementText: 'Launched account-based marketing (ABM) program targeting Fortune 500 companies, generating $2.5M in pipeline' },
                { achievementText: 'Implemented marketing automation workflows in HubSpot, increasing email engagement by 68%' },
                { achievementText: 'Developed content strategy resulting in 300% increase in organic traffic and 150% boost in demo requests' }
            ]
        },
        {
            jobTitle: 'Marketing Manager',
            companyName: 'GrowthLab Inc',
            location: 'San Francisco, CA',
            startDate: '2018-03',
            endDate: '2020-05',
            isCurrent: false,
            roleDescription: 'Managed end-to-end marketing campaigns for fast-growing startup in the marketing analytics space.',
            achievements: [
                { achievementText: 'Grew monthly website traffic from 10K to 150K visitors through SEO and content marketing initiatives' },
                { achievementText: 'Launched product marketing campaigns for 3 major feature releases, driving 45% increase in product adoption' },
                { achievementText: 'Managed $500K annual marketing budget, optimizing spend across paid channels for 3.5x ROI' },
                { achievementText: 'Created and executed social media strategy across LinkedIn, Twitter, and Facebook, growing followers by 400%' },
                { achievementText: 'Coordinated with sales team to implement lead scoring system, improving sales efficiency by 35%' }
            ]
        },
        {
            jobTitle: 'Digital Marketing Specialist',
            companyName: 'MediaWave Agency',
            location: 'Los Angeles, CA',
            startDate: '2016-08',
            endDate: '2018-02',
            isCurrent: false,
            roleDescription: 'Executed digital marketing campaigns for diverse client portfolio across e-commerce, SaaS, and professional services.',
            achievements: [
                { achievementText: 'Managed Google Ads and Facebook Ads campaigns with combined monthly budget of $200K' },
                { achievementText: 'Achieved average ROAS of 4.2x across all paid advertising campaigns' },
                { achievementText: 'Implemented email marketing automation for 15+ clients, increasing average open rates by 28%' },
                { achievementText: 'Conducted A/B testing on landing pages, improving conversion rates by an average of 35%' }
            ]
        },
        {
            jobTitle: 'Marketing Coordinator',
            companyName: 'TechStart Ventures',
            location: 'San Diego, CA',
            startDate: '2015-01',
            endDate: '2016-07',
            isCurrent: false,
            roleDescription: 'Supported marketing initiatives for portfolio of early-stage technology startups.',
            achievements: [
                { achievementText: 'Coordinated event marketing for 12 industry conferences, generating 500+ qualified leads' },
                { achievementText: 'Created marketing collateral including whitepapers, case studies, and sales presentations' },
                { achievementText: 'Managed social media accounts and email newsletters for 8 portfolio companies' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of California, Los Angeles',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Marketing',
            location: 'Los Angeles, CA',
            startYear: 2011,
            endYear: 2015,
            gpa: '3.7',
            achievements: 'Cum Laude, Dean\'s List (6 semesters), Marketing Club President'
        }
    ],
    skills: [
        { skillName: 'Digital Marketing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'SEO/SEM', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Google Analytics', skillType: 'tool', proficiencyLevel: 'expert' },
        { skillName: 'HubSpot', skillType: 'tool', proficiencyLevel: 'expert' },
        { skillName: 'Content Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Marketing Automation', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'A/B Testing', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Social Media Marketing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Email Marketing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Salesforce', skillType: 'tool', proficiencyLevel: 'intermediate' },
        { skillName: 'Adobe Creative Suite', skillType: 'tool', proficiencyLevel: 'intermediate' },
        { skillName: 'Google Ads', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'Facebook Ads Manager', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'Hootsuite', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'Mailchimp', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'Team Leadership', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Budget Management', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Data Analysis', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'Google Analytics Individual Qualification',
            issuingOrganization: 'Google',
            issuer: 'Google',
            issueYear: 2023,
            issueDate: '2023-06'
        },
        {
            certificationName: 'HubSpot Inbound Marketing Certification',
            issuingOrganization: 'HubSpot Academy',
            issuer: 'HubSpot',
            issueYear: 2022,
            issueDate: '2022-09'
        },
        {
            certificationName: 'Facebook Blueprint Certification',
            issuingOrganization: 'Meta',
            issuer: 'Meta',
            issueYear: 2021,
            issueDate: '2021-11'
        }
    ],
    projects: [
        {
            projectName: 'ABM Campaign for Enterprise Clients',
            clientOrOrganization: 'CloudTech Solutions',
            role: 'Campaign Lead',
            description: 'Designed and executed account-based marketing campaign targeting 50 Fortune 500 companies',
            toolsUsed: ['HubSpot', 'LinkedIn Sales Navigator', 'Terminus', 'Salesforce'],
            outcomes: 'Generated $2.5M in qualified pipeline, closed 8 enterprise deals worth $1.2M ARR',
            startDate: '2022-01',
            endDate: '2022-12'
        },
        {
            projectName: 'Content Marketing Transformation',
            clientOrOrganization: 'GrowthLab Inc',
            role: 'Content Strategy Lead',
            description: 'Overhauled content marketing strategy with focus on SEO and thought leadership',
            toolsUsed: ['Ahrefs', 'SEMrush', 'WordPress', 'Google Analytics'],
            outcomes: '300% increase in organic traffic, 150% boost in demo requests, established CEO as industry thought leader',
            startDate: '2019-03',
            endDate: '2020-02'
        }
    ],
    achievements: [
        {
            achievementTitle: 'Marketing Excellence Award',
            issuingBody: 'CloudTech Solutions',
            year: 2023,
            description: 'Recognized for outstanding contribution to company growth and marketing innovation'
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Mandarin', proficiencyLevel: 'fluent' }
    ]
}

// Sales Professional Mock Data
export const MOCK_SALES_DATA: ResumeDocument = {
    id: 'preview-sales',
    title: 'Sales Director Resume',
    documentType: 'resume',
    templateId: 'ats-professional',
    personalInfo: {
        fullName: 'Michael Sterling',
        professionalTitle: 'Regional Sales Director | B2B Enterprise Specialist',
        email: 'm.sterling@example.com',
        phone: '+1 (555) 345-6789',
        city: 'Chicago',
        country: 'IL',
        location: 'Chicago, IL',
        linkedinUrl: 'linkedin.com/in/msterling-sales'
    },
    professionalSummary: {
        summaryText: 'Dynamic Sales Leader with 12+ years of experience exceeding revenue targets in highly competitive B2B markets. Expert in consultative selling, key account management, and high-performance team building. Consistently ranked in the top 1% of the global sales force with a career average of 125% quota attainment. Strong track record of penetrating new markets and scaling expansion-stage startups.'
    },
    workExperience: [
        {
            jobTitle: 'Regional Sales Director',
            companyName: 'ScaleForce Systems',
            location: 'Chicago, IL',
            startDate: '2020-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Overseeing the Midwest sales region for an enterprise cybersecurity firm, managing $20M in recurring revenue.',
            achievements: [
                { achievementText: 'Grew regional annual recurring revenue (ARR) from $8M to $22M in 3 years' },
                { achievementText: 'Built and mentored a team of 15 Account Executives and 4 SDRs, leading to a 40% increase in team productivity' },
                { achievementText: 'Personalized 5-year strategic sales roadmap focusing on Fortune 500 manufacturing firms' },
                { achievementText: 'Implemented a new CRM pipeline management system that reduced sales cycle length from 9 to 6 months' },
                { achievementText: 'Negotiated and closed 12 multi-year enterprise contracts worth a total of $15M' }
            ]
        },
        {
            jobTitle: 'Senior Account Executive',
            companyName: 'DataGrid SaaS',
            location: 'San Francisco, CA',
            startDate: '2016-05',
            endDate: '2019-12',
            isCurrent: false,
            roleDescription: 'Spearheaded territory expansion in the tech-heavy Bay Area market for cloud infrastructure services.',
            achievements: [
                { achievementText: 'Awarded "President’s Club" for 4 consecutive years for exceeding $3M annual quota' },
                { achievementText: 'Secured first-ever enterprise contracts with 5 major tech giants, generating $2M in initial revenue' },
                { achievementText: 'Developed a consultative sales training module adopted by the entire North American sales force' },
                { achievementText: 'Maintained a 98% customer retention rate through proactive account management and solution tailoring' }
            ]
        },
        {
            jobTitle: 'Account Manager',
            companyName: 'BizCore Solutions',
            location: 'Denver, CO',
            startDate: '2012-08',
            endDate: '2016-04',
            isCurrent: false,
            roleDescription: 'Managed a portfolio of 40 mid-market accounts while driving upsell and cross-sell opportunities.',
            achievements: [
                { achievementText: 'Increased portfolio revenue by 75% within 2 years through strategic cross-selling of software modules' },
                { achievementText: 'Named Salesperson of the Year in 2014 out of a pool of 120 representatives' },
                { achievementText: 'Consistently maintained top metrics for customer satisfaction and referral leads' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Michigan',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Business Administration',
            location: 'Ann Arbor, MI',
            startYear: 2008,
            endYear: 2012,
            achievements: 'Specialization in Strategic Management, Sales Competition Winner'
        }
    ],
    skills: [
        { skillName: 'Sales Leadership', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Consultative Selling', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Salesforce CRM', skillType: 'tool', proficiencyLevel: 'expert' },
        { skillName: 'Enterprise Negotiation', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Account Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Pipeline Forecasting', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Revenue Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'HubSpot', skillType: 'tool', proficiencyLevel: 'advanced' }
    ]
}

// Project Manager Mock Data
export const MOCK_PROJECT_MANAGER_DATA: ResumeDocument = {
    id: 'preview-pm',
    title: 'Senior Project Manager Resume',
    documentType: 'resume',
    templateId: 'ats-standard',
    personalInfo: {
        fullName: 'Sarah Jenkins, PMP',
        professionalTitle: 'Senior IT Project Manager | Agile & Scrum Expert',
        email: 's.jenkins@example.com',
        phone: '+1 (555) 456-7890',
        city: 'Seattle',
        country: 'WA',
        location: 'Seattle, WA',
        linkedinUrl: 'linkedin.com/in/sjenkins-pmp'
    },
    professionalSummary: {
        summaryText: 'Results-oriented Senior Project Manager with 10+ years of experience leading complex IT infrastructure and software development projects. Certified PMP and Scrum Master with a proven track record of delivering $5M+ projects 15% under budget and 10% ahead of schedule. Expert in aligning cross-functional teams with organizational goals using Agile, Lean, and Waterfall methodologies.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Project Manager',
            companyName: 'Global Stream Technologies',
            location: 'Seattle, WA',
            startDate: '2019-06',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing a portfolio of digital transformation projects for a multinational logistics provider.',
            achievements: [
                { achievementText: 'Successfully migrated 100% of global on-premise servers to AWS, resulting in $2M annual cost savings' },
                { achievementText: 'Implemented an Agile framework across 5 development squads, increasing feature velocity by 30%' },
                { achievementText: 'Managed a cross-functional budget of $8.5M with Zero variance from approved estimates' },
                { achievementText: 'Led the development of a real-time tracking application used by 12,000 field employees' }
            ]
        },
        {
            jobTitle: 'IT Project Manager',
            companyName: 'Innovate Systems',
            location: 'Bellevue, WA',
            startDate: '2015-03',
            endDate: '2019-05',
            isCurrent: false,
            roleDescription: 'Coordinated infrastructure upgrades and security compliance projects for mid-level enterprises.',
            achievements: [
                { achievementText: 'Delivered an enterprise-wide cybersecurity overhaul 2 months ahead of the regulatory deadline' },
                { achievementText: 'Reduced project risks by 40% through the implementation of a proprietary risk assessment matrix' },
                { achievementText: 'Streamlined resource allocation using Jira, improving team utilization rates by 25%' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Washington',
            degree: 'Master of Science',
            fieldOfStudy: 'Project Management',
            location: 'Seattle, WA',
            startYear: 2012,
            endYear: 2014
        }
    ],
    skills: [
        { skillName: 'Agile/Scrum', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Jira & Confluence', skillType: 'tool', proficiencyLevel: 'expert' },
        { skillName: 'AWS Infrastructure', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Budget Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'PMP Certified', skillType: 'industry', proficiencyLevel: 'expert' },
        { skillName: 'Waterfall Methodology', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Risk Mitigation', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'Project Management Professional (PMP)',
            issuingOrganization: 'PMI',
            issueYear: 2015
        },
        {
            certificationName: 'Certified Scrum Master (CSM)',
            issuingOrganization: 'Scrum Alliance',
            issueYear: 2016
        }
    ]
}

// Data Scientist Mock Data
export const MOCK_DATA_SCIENTIST_DATA: ResumeDocument = {
    id: 'preview-ds',
    title: 'Lead Data Scientist Resume',
    documentType: 'resume',
    templateId: 'ats-technical',
    personalInfo: {
        fullName: 'Dr. Alex Rivera',
        professionalTitle: 'Lead Data Scientist | Machine Learning & Analytics',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 567-8901',
        city: 'Boston',
        country: 'MA',
        location: 'Boston, MA',
        linkedinUrl: 'linkedin.com/in/drarivera-ds'
    },
    professionalSummary: {
        summaryText: 'Innovation-focused Data Scientist with a PhD and 8 years of experience building scalable ML solutions. Architected predictive models that increased enterprise revenue by $25M annually. Expert in Python, TensorFlow, and SpARK with a deep background in natural language processing (NLP) and computer vision.'
    },
    workExperience: [
        {
            jobTitle: 'Lead Data Scientist',
            companyName: 'Visionary AI',
            location: 'Boston, MA',
            startDate: '2020-04',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading a team of 8 data scientists and ML engineers to build AI-driven diagnostic tools.',
            achievements: [
                { achievementText: 'Developed a deep learning model for image recognition with 99.4% accuracy, outperforming existing benchmarks' },
                { achievementText: 'Implemented a recommendation engine that increased user click-through rate (CTR) by 45%' },
                { achievementText: 'Collaborated with the DevOps team to deploy models as microservices in Kubernetes' },
                { achievementText: 'Authored 4 peer-reviewed papers on transformer architectures for medical diagnostics' }
            ]
        },
        {
            jobTitle: 'Senior Data Scientist',
            companyName: 'DataNexus Corp',
            location: 'Cambridge, MA',
            startDate: '2016-09',
            endDate: '2020-03',
            isCurrent: false,
            roleDescription: 'Applied statistical modeling to optimize complex logistical chains.',
            achievements: [
                { achievementText: 'Built a custom time-series forecasting model that reduced inventory waste by $3.5M annually' },
                { achievementText: 'Launched a real-time anomaly detection system for payment processing, identifying $1M in fraud monthly' },
                { achievementText: 'Mentored 5 junior analysts in Python and statistical best practices' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'MIT',
            degree: 'PhD',
            fieldOfStudy: 'Computer Science (Machine Learning)',
            location: 'Cambridge, MA',
            startYear: 2011,
            endYear: 2016
        }
    ],
    skills: [
        { skillName: 'Python (NumPy, Pandas)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'TensorFlow/PyTorch', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Apache Spark', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'NLP & LLMs', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'SQL & NoSQL', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'A/B Testing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Docker/Kubernetes', skillType: 'tool', proficiencyLevel: 'intermediate' }
    ]
}

// HR Manager Mock Data
export const MOCK_HR_DATA: ResumeDocument = {
    id: 'preview-hr',
    title: 'Senior HR Manager Resume',
    documentType: 'resume',
    templateId: 'ats-standard',
    personalInfo: {
        fullName: 'Elena Gomez, SHRM-CP',
        professionalTitle: 'Senior HR Manager | Talent Strategy & Operations',
        email: 'e.gomez@example.com',
        phone: '+1 (555) 678-9012',
        city: 'Miami',
        country: 'FL',
        location: 'Miami, FL',
        linkedinUrl: 'linkedin.com/in/egomez-hr'
    },
    professionalSummary: {
        summaryText: 'Strategic HR Leader with 10+ years of experience transforming organizational culture and operational efficiency. Expert in scaling mid-size tech firms from 50 to 500+ employees while maintaining high engagement levels. Proven track record of reducing employee turnover by 30% through innovative wellness and compensation programs.'
    },
    workExperience: [
        {
            jobTitle: 'Senior HR Manager',
            companyName: 'BrightPulse Tech',
            location: 'Miami, FL',
            startDate: '2018-11',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Overseeing all HR functions for a fast-growing Fintech startup.',
            achievements: [
                { achievementText: 'Spearheaded a rapid hiring initiative, onboarding 200+ employees in 18 months with high retention' },
                { achievementText: 'Launched a comprehensive Diversity, Equity, and Inclusion (DEI) program resulting in a 25% increase in diverse hires' },
                { achievementText: 'Renegotiated employee benefit packages, saving the company $150K annually while improving coverage' },
                { achievementText: 'Implemented an AI-driven HRIS system that reduced administrative processing time by 50%' }
            ]
        },
        {
            jobTitle: 'Human Resources Generalist',
            companyName: 'Oceanic Logistics',
            location: 'Fort Lauderdale, FL',
            startDate: '2014-05',
            endDate: '2018-10',
            isCurrent: false,
            roleDescription: 'Managed employee relations, payroll, and compliance for a staff of 350.',
            achievements: [
                { achievementText: 'Resolved 100% of complex employee relations issues within a 48-hour internal benchmark' },
                { achievementText: 'Restructured the performance review process, leading to a 20% increase in manager-reported team clarity' },
                { achievementText: 'Managed full-cycle payroll processing with a 99.9% accuracy rate' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Florida International University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Human Resources Management',
            location: 'Miami, FL',
            startYear: 2010,
            endYear: 2014,
            achievements: 'SHRM Chapter President'
        }
    ],
    skills: [
        { skillName: 'Talent Acquisition', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Employee Relations', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'SHRM Certified', skillType: 'industry', proficiencyLevel: 'expert' },
        { skillName: 'Compensation Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Workday HRIS', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'Conflict Resolution', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Payroll Administration', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'SHRM-CP',
            issuingOrganization: 'SHRM',
            issueYear: 2017
        }
    ]
}

// Teacher/Educator Mock Data
export const MOCK_TEACHER_DATA: ResumeDocument = {
    id: 'preview-teacher',
    title: 'Senior Educator Resume',
    documentType: 'resume',
    templateId: 'ats-classic',
    personalInfo: {
        fullName: 'Thomas Miller',
        professionalTitle: 'Senior High School Educator | Curriculum Specialist',
        email: 't.miller@example.com',
        phone: '+1 (555) 789-0123',
        city: 'Denver',
        country: 'CO',
        location: 'Denver, CO',
        linkedinUrl: 'linkedin.com/in/tmiller-edu'
    },
    professionalSummary: {
        summaryText: 'Passionate and dedicated Educator with 15 years of experience in secondary education and curriculum development. Specialized in STEM integration and personalized learning strategies. Proven success in improving student standardized test scores by 20% and fostering a collaborative, technology-driven classroom environment.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Mathematics Instructor',
            companyName: 'Peak View High School',
            location: 'Denver, CO',
            startDate: '2015-08',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading the High School Mathematics Department and teaching AP Calculus B/C.',
            achievements: [
                { achievementText: 'Developed an interactive online math portal now used across the entire district' },
                { achievementText: 'Mentored 10 novice teachers through the state certification process' },
                { achievementText: 'Achceived a 95% pass rate on AP Calculus exams for 5 consecutive years' },
                { achievementText: 'Integrated 1:1 iPad learning initiatives, resulting in higher student engagement metrics' }
            ]
        },
        {
            jobTitle: 'Secondary School Teacher',
            companyName: 'Lakewood Academy',
            location: 'Lakewood, CO',
            startDate: '2008-08',
            endDate: '2015-06',
            isCurrent: false,
            roleDescription: 'Taught general mathematics and introductory computer science.',
            achievements: [
                { achievementText: 'Introduced the first-ever Computer Science club, growing it to 60+ members' },
                { achievementText: 'Winner of the "Innovative Teacher of the Year" award in 2012' },
                { achievementText: 'Published 3 articles on educational technology in national teaching journals' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Colorado',
            degree: 'Master of Education',
            fieldOfStudy: 'Educational Leadership',
            location: 'Boulder, CO',
            startYear: 2010,
            endYear: 2012
        }
    ],
    skills: [
        { skillName: 'Curriculum Development', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'STEM Integration', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Educational Technology', skillType: 'tool', proficiencyLevel: 'expert' },
        { skillName: 'Differentiated Instruction', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Student Mentorship', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Classroom Management', skillType: 'professional', proficiencyLevel: 'expert' }
    ]
}

// Financial Analyst Mock Data
export const MOCK_FINANCE_DATA: ResumeDocument = {
    id: 'preview-finance',
    title: 'Financial Analyst Resume',
    documentType: 'resume',
    templateId: 'ats-professional',
    personalInfo: {
        fullName: 'David Chen, CFA',
        professionalTitle: 'Senior Financial Analyst | Investment Strategy',
        email: 'david.chen@example.com',
        phone: '+1 (555) 876-5432',
        city: 'New York',
        country: 'NY',
        location: 'New York, NY',
        linkedinUrl: 'linkedin.com/in/davidchen-cfa'
    },
    professionalSummary: {
        summaryText: 'CFA-certified Senior Financial Analyst with 7+ years of experience in financial modeling, forecasting, and investment analysis. Proven expertise in driving data-driven business decisions, optimizing financial performance, and presenting complex financial information to C-suite executives. Skilled in advanced Excel, SQL, and financial modeling with track record of identifying $15M+ in cost savings and revenue opportunities.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Financial Analyst',
            companyName: 'Goldman Sachs',
            location: 'New York, NY',
            startDate: '2021-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading financial analysis and modeling for Investment Banking Division, supporting M&A transactions and strategic initiatives.',
            achievements: [
                { achievementText: 'Built comprehensive financial models for 15+ M&A transactions totaling $8B in deal value' },
                { achievementText: 'Identified $12M in cost synergies through detailed operational analysis during due diligence process' },
                { achievementText: 'Developed automated reporting dashboard in Tableau, reducing monthly reporting time by 60%' },
                { achievementText: 'Presented investment recommendations to senior leadership, resulting in approval of 3 strategic acquisitions' },
                { achievementText: 'Mentored team of 3 junior analysts, improving team productivity by 35%' },
                { achievementText: 'Implemented new forecasting methodology that improved accuracy by 25%' }
            ]
        },
        {
            jobTitle: 'Financial Analyst',
            companyName: 'JPMorgan Chase',
            location: 'New York, NY',
            startDate: '2018-07',
            endDate: '2021-02',
            isCurrent: false,
            roleDescription: 'Conducted financial analysis and modeling to support corporate finance and treasury operations.',
            achievements: [
                { achievementText: 'Managed quarterly forecasting process for $500M business unit, achieving 95% forecast accuracy' },
                { achievementText: 'Developed variance analysis reports identifying $5M in budget optimization opportunities' },
                { achievementText: 'Created financial models for capital allocation decisions across 8 business segments' },
                { achievementText: 'Automated monthly financial reporting using VBA and SQL, saving 40 hours per month' },
                { achievementText: 'Collaborated with FP&A team on annual budgeting process for $2B division' }
            ]
        },
        {
            jobTitle: 'Junior Financial Analyst',
            companyName: 'Deloitte Consulting',
            location: 'Chicago, IL',
            startDate: '2017-06',
            endDate: '2018-06',
            isCurrent: false,
            roleDescription: 'Supported financial advisory engagements for Fortune 500 clients across various industries.',
            achievements: [
                { achievementText: 'Conducted financial due diligence for 8 client transactions ranging from $50M to $500M' },
                { achievementText: 'Built detailed financial models analyzing profitability and cash flow projections' },
                { achievementText: 'Prepared client presentations and investment memorandums for executive stakeholders' },
                { achievementText: 'Performed industry research and competitive analysis to support valuation work' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Pennsylvania - Wharton School',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Finance',
            location: 'Philadelphia, PA',
            startYear: 2013,
            endYear: 2017,
            gpa: '3.85',
            achievements: 'Summa Cum Laude, Beta Gamma Sigma Honor Society, Finance Department Award'
        }
    ],
    skills: [
        { skillName: 'Financial Modeling', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Excel (Advanced)', skillType: 'tool', proficiencyLevel: 'expert' },
        { skillName: 'VBA & Macros', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Tableau', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'SQL', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Bloomberg Terminal', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'SAP', skillType: 'tool', proficiencyLevel: 'intermediate' },
        { skillName: 'Oracle Financials', skillType: 'tool', proficiencyLevel: 'intermediate' },
        { skillName: 'Power BI', skillType: 'tool', proficiencyLevel: 'advanced' },
        { skillName: 'GAAP', skillType: 'industry', proficiencyLevel: 'expert' },
        { skillName: 'IFRS', skillType: 'industry', proficiencyLevel: 'advanced' },
        { skillName: 'Forecasting & Budgeting', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Variance Analysis', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Valuation (DCF, Comps)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Financial Reporting', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Data Analysis', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Strategic Planning', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'Chartered Financial Analyst (CFA)',
            issuingOrganization: 'CFA Institute',
            issuer: 'CFA Institute',
            issueYear: 2020,
            issueDate: '2020-09',
            credentialId: 'CFA-2020-12345'
        },
        {
            certificationName: 'Financial Modeling & Valuation Analyst (FMVA)',
            issuingOrganization: 'Corporate Finance Institute',
            issuer: 'CFI',
            issueYear: 2019,
            issueDate: '2019-06'
        }
    ],
    projects: [
        {
            projectName: 'M&A Financial Model Standardization',
            clientOrOrganization: 'Goldman Sachs',
            role: 'Project Lead',
            description: 'Developed standardized financial modeling templates for M&A transactions',
            toolsUsed: ['Excel', 'VBA', 'Power Query'],
            outcomes: 'Reduced model build time by 50%, improved consistency across team, adopted firm-wide',
            startDate: '2022-01',
            endDate: '2022-06'
        }
    ],
    professionalAffiliations: [
        {
            organizationName: 'CFA Society New York',
            roleOrMembership: 'Active Member',
            yearsActive: '2020-Present'
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Mandarin', proficiencyLevel: 'fluent' }
    ]
}
