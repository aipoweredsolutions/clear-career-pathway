import { ResumeDocument } from "@/lib/types/resume";

export const MOCK_PREVIEW_DATA: ResumeDocument = {
    id: 'preview',
    title: 'Preview Resume',
    documentType: 'resume',
    templateId: 'classic',
    personalInfo: {
        fullName: 'Alexandra Morgan',
        professionalTitle: 'Senior Product Designer & UX Strategist',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 012-3456',
        city: 'New York',
        country: 'NY',
        location: 'New York, NY',
        linkedinUrl: 'linkedin.com/in/alexmorgan',
        websiteUrl: 'alexmorgan.design',
        portfolioUrl: 'behance.net/alexmorgan'
    },
    professionalSummary: {
        summaryText: 'Award-winning Product Designer with 8+ years of experience creating intuitive, user-centered digital experiences for Fortune 500 companies and innovative startups. Specialized in design systems, accessibility, and data-driven design decisions. Proven track record of increasing user engagement by 40% and reducing customer support tickets by 35% through thoughtful UX improvements. Passionate about mentoring emerging designers and fostering collaborative, inclusive design cultures.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Product Designer',
            companyName: 'TechFlow Solutions',
            location: 'New York, NY',
            startDate: '2021-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading end-to-end design initiatives for enterprise SaaS platform serving 50,000+ users across 120 countries.',
            achievements: [
                { achievementText: 'Spearheaded complete platform redesign, resulting in 42% increase in user retention and 28% improvement in task completion rates' },
                { achievementText: 'Established comprehensive design system adopted by 6 product teams, reducing design-to-development handoff time by 60%' },
                { achievementText: 'Led accessibility initiative achieving WCAG 2.1 AA compliance, expanding market reach to government and enterprise clients' },
                { achievementText: 'Mentored team of 4 junior designers and conducted bi-weekly design critiques for 20+ cross-functional team members' },
                { achievementText: 'Facilitated cross-departmental workshops to align product vision with engineering constraints, ensuring on-time delivery of key Q4 features' },
                { achievementText: 'Optimized user onboarding flow, decreasing drop-off rate by 15% within the first month of launch' }
            ]
        },
        {
            jobTitle: 'Product Designer',
            companyName: 'Creative Pulse Agency',
            location: 'Brooklyn, NY',
            startDate: '2018-06',
            endDate: '2021-02',
            isCurrent: false,
            roleDescription: 'Designed digital products and marketing experiences for diverse client portfolio including fintech, healthcare, and e-commerce sectors.',
            achievements: [
                { achievementText: 'Delivered 22 mobile app designs for startups, with 85% achieving successful funding rounds' },
                { achievementText: 'Reduced design iteration cycles by 45% through implementation of rapid prototyping workflows' },
                { achievementText: 'Conducted user research sessions with 200+ participants, informing data-driven design decisions' },
                { achievementText: 'Collaborated with developers to ensure pixel-perfect implementation of UI designs for 3 major client projects' }
            ]
        },
        {
            jobTitle: 'UX/UI Designer',
            companyName: 'Digital Innovations Inc',
            location: 'Boston, MA',
            startDate: '2016-08',
            endDate: '2018-05',
            isCurrent: false,
            roleDescription: 'Created user interfaces for web and mobile applications in fast-paced startup environment.',
            achievements: [
                { achievementText: 'Designed responsive web platform that increased mobile conversions by 55%' },
                { achievementText: 'Collaborated with engineering team to implement component library used across 8 products' },
                { achievementText: 'Conducted A/B testing on 15+ design variations, improving click-through rates by 32%' }
            ]
        },
        {
            jobTitle: 'Junior UX Designer',
            companyName: 'StartupLab Incubator',
            location: 'San Francisco, CA',
            startDate: '2015-01',
            endDate: '2016-07',
            isCurrent: false,
            roleDescription: 'Supported design team in creating user experiences for early-stage startups in the incubator program.',
            achievements: [
                { achievementText: 'Designed user flows and wireframes for 8 mobile applications across various industries' },
                { achievementText: 'Conducted user testing sessions with 50+ participants, gathering actionable insights' },
                { achievementText: 'Created interactive prototypes using Sketch and InVision for client presentations' },
                { achievementText: 'Assisted in branding and visual identity development for 5 startup companies' }
            ]
        },
        {
            jobTitle: 'Graphic Design Intern',
            companyName: 'Creative Agency Co',
            location: 'Boston, MA',
            startDate: '2014-06',
            endDate: '2014-12',
            isCurrent: false,
            roleDescription: 'Supported creative team in producing marketing materials and digital assets for diverse client base.',
            achievements: [
                { achievementText: 'Assisted in branding projects for 10+ clients across retail, tech, and healthcare sectors' },
                { achievementText: 'Created social media graphics and email marketing templates that increased engagement by 25%' },
                { achievementText: 'Collaborated with senior designers on website redesign projects for 3 major clients' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Rhode Island School of Design',
            degree: 'Bachelor of Fine Arts',
            major: 'Graphic Design',
            fieldOfStudy: 'Digital Media',
            location: 'Providence, RI',
            startYear: 2012,
            endYear: 2016,
            gpa: '3.8',
            achievements: 'Summa Cum Laude, Dean\'s List (4 years)',
            coursework: 'Interactive Design, Typography, Design Thinking, Human-Computer Interaction'
        },
        {
            institutionName: 'General Assembly',
            degree: 'UX Design Immersive',
            location: 'New York, NY',
            endYear: 2017,
            achievements: 'Top Student Award'
        }
    ],
    skills: [
        { skillName: 'Figma', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Adobe Creative Suite', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Sketch', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Prototyping', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'User Research', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Usability Testing', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Design Systems', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'HTML/CSS', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'JavaScript', skillType: 'technical', proficiencyLevel: 'beginner' },
        { skillName: 'Agile/Scrum', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Accessibility (WCAG)', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Design Thinking', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'Google UX Design Professional Certificate',
            issuingOrganization: 'Coursera',
            issuer: 'Coursera',
            issueYear: 2023,
            issueDate: '2023-08',
            credentialId: 'GUX-2023-AM-8472'
        },
        {
            certificationName: 'Certified Scrum Master (CSM)',
            issuingOrganization: 'Scrum Alliance',
            issuer: 'Scrum Alliance',
            issueYear: 2022,
            issueDate: '2022-03',
            credentialId: 'CSM-2022-1847'
        },
        {
            certificationName: 'Accessibility Specialist Certification',
            issuingOrganization: 'International Association of Accessibility Professionals',
            issuer: 'IAAP',
            issueYear: 2021,
            issueDate: '2021-11'
        },
        {
            certificationName: 'Adobe Certified Expert (ACE)',
            issuingOrganization: 'Adobe',
            issuer: 'Adobe',
            issueYear: 2020,
            issueDate: '2020-05'
        }
    ],
    projects: [
        {
            projectName: 'Healthcare Patient Portal Redesign',
            clientOrOrganization: 'MediCare Plus',
            role: 'Lead Designer',
            description: 'Complete redesign of patient-facing portal serving 2M+ users, focusing on accessibility and mobile-first experience',
            toolsUsed: ['Figma', 'UserTesting', 'Hotjar', 'Miro'],
            outcomes: 'Increased patient engagement by 65%, reduced support calls by 40%',
            startDate: '2022-01',
            endDate: '2022-08'
        },
        {
            projectName: 'E-commerce Mobile App',
            clientOrOrganization: 'RetailHub',
            role: 'Product Designer',
            description: 'Designed iOS and Android shopping app with personalized recommendations and seamless checkout',
            toolsUsed: ['Sketch', 'Principle', 'Zeplin'],
            outcomes: 'Achieved 4.8 App Store rating, 500K+ downloads in first 6 months',
            startDate: '2020-03',
            endDate: '2020-10'
        },
        {
            projectName: 'Portfolio Website Redesign',
            clientOrOrganization: 'Personal Project',
            role: 'Designer & Developer',
            description: 'Complete overhaul of personal portfolio website showcasing design work and case studies with interactive elements',
            toolsUsed: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
            outcomes: '1000+ monthly visitors, featured on Awwwards and design blogs',
            startDate: '2021-01',
            endDate: '2021-03'
        },
        {
            projectName: 'Design System Documentation',
            clientOrOrganization: 'TechFlow Solutions',
            role: 'Lead Designer',
            description: 'Created comprehensive design system documentation with component library and usage guidelines',
            toolsUsed: ['Figma', 'Storybook', 'React', 'TypeScript'],
            outcomes: 'Adopted by 6 product teams, reduced design inconsistencies by 80%',
            startDate: '2022-06',
            endDate: '2022-12'
        }
    ],
    achievements: [
        {
            achievementTitle: 'UX Design Award',
            issuingBody: 'Awwwards',
            year: 2023,
            description: 'Site of the Day for TechFlow platform redesign'
        },
        {
            achievementTitle: 'Innovation Excellence Award',
            issuingBody: 'TechFlow Solutions',
            year: 2022,
            description: 'Recognized for outstanding contribution to product innovation'
        }
    ],
    publications: [
        {
            title: 'Designing for Accessibility: A Practical Guide',
            platformOrPublisher: 'UX Collective on Medium',
            publicationYear: 2023,
            url: 'medium.com/ux-collective/designing-for-accessibility'
        },
        {
            title: 'The Future of Design Systems',
            platformOrPublisher: 'Smashing Magazine',
            publicationYear: 2022,
            url: 'smashingmagazine.com/future-design-systems'
        }
    ],
    volunteerExperience: [
        {
            roleTitle: 'Design Mentor',
            organizationName: 'ADPList (Amazing Design People List)',
            startDate: '2021-01',
            endDate: 'Present',
            contributions: 'Provide pro-bono mentorship to 15+ aspiring designers, conducting monthly 1-on-1 sessions on portfolio development and career guidance'
        },
        {
            roleTitle: 'Workshop Facilitator',
            organizationName: 'Girls Who Code',
            startDate: '2020-06',
            endDate: '2023-12',
            contributions: 'Led quarterly design thinking workshops for high school students, introducing 100+ young women to UX/UI design careers'
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Spanish', proficiencyLevel: 'fluent' },
        { languageName: 'French', proficiencyLevel: 'intermediate' }
    ],
    professionalAffiliations: [
        {
            organizationName: 'IXDA (Interaction Design Association)',
            roleOrMembership: 'Active Member',
            yearsActive: '2018-Present'
        },
        {
            organizationName: 'AIGA (American Institute of Graphic Arts)',
            roleOrMembership: 'Member',
            yearsActive: '2016-Present'
        }
    ],
    additionalInfo: {
        availability: 'Available for freelance projects',
        willingToRelocate: false,
        otherInfo: 'Fluent in design tools and frameworks. Active speaker at design conferences.'
    },
    references: [
        {
            referenceName: 'James Wilson',
            role: 'VP of Product',
            organization: 'TechFlow Solutions',
            contactDetails: 'james.w@techflow.example.com',
            availabilityStatement: 'Available upon request'
        }
    ],
    customSections: [
        {
            title: 'Speaking Engagements',
            items: [
                { text: 'Keynote Speaker at UX Conference 2023 - "Empathy in Design"' },
                { text: 'Panelist at Product Design Summit 2022' }
            ]
        }
    ]
}

export const MOCK_EXECUTIVE_DATA: ResumeDocument = {
    id: 'preview-exec',
    title: 'Executive Resume',
    documentType: 'resume',
    templateId: 'modern',
    personalInfo: {
        fullName: 'James C. Sterling',
        professionalTitle: 'Chief Technology Officer | Strategic Leader',
        email: 'james.sterling@example.com',
        phone: '+1 (555) 987-6543',
        city: 'San Francisco',
        country: 'CA',
        location: 'San Francisco, CA',
        linkedinUrl: 'linkedin.com/in/jamessterling',
        websiteUrl: 'jamessterling.tech'
    },
    professionalSummary: {
        headline: 'Visionary Technology Executive',
        summaryText: 'Results-oriented Chief Technology Officer with 15+ years of experience leading global engineering teams and driving digital transformation for Fortune 500 enterprises. Proven track record of scaling high-growth startups to IPO. Expert in cloud architecture, AI/ML integration, and strategic roadmap execution. Adept at bridging the gap between technical innovation and business objectives to deliver sustainable revenue growth.'
    },
    workExperience: [
        {
            jobTitle: 'Chief Technology Officer',
            companyName: 'Quantum Systems',
            location: 'San Francisco, CA',
            startDate: '2019-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing all technology strategy and engineering operations for a $2B valuation fintech company.',
            achievements: [
                { achievementText: 'Led global team of 450+ engineers, product managers, and data scientists across 4 continents' },
                { achievementText: 'Architected migration to microservices, reducing infrastructure costs by 40% ($12M annually)' },
                { achievementText: 'Spearheaded AI initiatives that automated loan processing, increasing throughput by 300%' },
                { achievementText: 'Secured ISO 27001 certification and led GDPR compliance strategy for European expansion' },
                { achievementText: 'Authored and executed a 3-year technology roadmap aligned with corporate IPO goals' },
                { achievementText: 'Fostered a culture of innovation, resulting in 15 patent filings in 2023 alone' }
            ]
        },
        {
            jobTitle: 'VP of Engineering',
            companyName: 'Nebula Cloud',
            location: 'Seattle, WA',
            startDate: '2015-03',
            endDate: '2018-12',
            isCurrent: false,
            roleDescription: 'Scaled engineering organization from 40 to 200+ during Series B to Series D growth phase.',
            achievements: [
                { achievementText: 'Reduced time-to-market by 60% through implementation of CI/CD pipelines and DevOps culture' },
                { achievementText: 'Played key role in $400M acquisition due diligence and technical integration' },
                { achievementText: 'Constructed high-availability cloud infrastructure handling 50k requests per second with 99.999% uptime' }
            ]
        },
        {
            jobTitle: 'Senior Director of Engineering',
            companyName: 'Vertex Solutions',
            location: 'Austin, TX',
            startDate: '2012-01',
            endDate: '2015-02',
            isCurrent: false,
            roleDescription: 'Managed multiple specialized engineering teams delivering enterprise software solutions.',
            achievements: [
                { achievementText: 'Revitalized legacy codebase, improving system performance by 200%' },
                { achievementText: 'Implemented Agile methodologies across the organization, increasing delivery velocity by 40%' },
                { achievementText: 'Established an internship program that converted 80% of interns to full-time hires' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Stanford University',
            degree: 'Master of Science',
            fieldOfStudy: 'Computer Science (AI Specialization)',
            location: 'Stanford, CA',
            endYear: 2008,
            gpa: '3.9'
        },
        {
            institutionName: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Electrical Engineering & CS',
            location: 'Berkeley, CA',
            endYear: 2006
        }
    ],
    skills: [
        { skillName: 'Strategic Planning', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Cloud Architecture (AWS/Azure)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Machine Learning/AI', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Mergers & Acquisitions', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Team Leadership (500+)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Budget Management ($50M+)', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    professionalAffiliations: [
        {
            organizationName: 'Forbes Technology Council',
            roleOrMembership: 'Official Member and Contributor',
            yearsActive: '2020-Present'
        },
        {
            organizationName: 'Silicon Valley CTO Summit',
            roleOrMembership: 'Board Advisor',
            yearsActive: '2021-Present'
        }
    ],
    customSections: [
        {
            title: 'Board Memberships',
            items: [
                { text: 'Board Director at AlphaStart (Series A AI Startup)' },
                { text: 'Advisory Board Member at TechForGood Non-profit' }
            ]
        }
    ]
}

export const MOCK_GRADUATE_DATA: ResumeDocument = {
    id: 'preview-grad',
    title: 'Graduate Resume',
    documentType: 'resume',
    templateId: 'minimal',
    personalInfo: {
        fullName: 'Sarah Chen',
        professionalTitle: 'Computer Science Graduate',
        email: 'sarah.chen@uni.edu',
        phone: '+1 (555) 234-5678',
        city: 'Boston',
        country: 'MA',
        location: 'Boston, MA',
        linkedinUrl: 'linkedin.com/in/sarahchen-cs',
        portfolioUrl: 'sarahchen.dev'
    },
    professionalSummary: {
        summaryText: 'Motivated Computer Science graduate with strong foundation in full-stack development and algorithms. Demonstrated passion for solving complex problems through multiple internships and hackathon awards. Proficient in Python, Java, and React. Eager to launch career as a Software Engineer in a collaborative, innovative environment.'
    },
    education: [
        {
            institutionName: 'Massachusetts Institute of Technology (MIT)',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science and Engineering',
            location: 'Cambridge, MA',
            startYear: 2020,
            endYear: 2024,
            gpa: '3.92/4.0',
            achievements: 'Dean\'s List (All Semesters), Phi Beta Kappa',
            coursework: 'Data Structures & Algorithms, Artificial Intelligence, Distributed Systems, Web Development'
        }
    ],
    workExperience: [
        {
            jobTitle: 'Software Engineering Intern',
            companyName: 'DataCorp',
            location: 'Remote',
            startDate: '2023-06',
            endDate: '2023-08',
            isCurrent: false,
            roleDescription: 'Developed features for internal analytics dashboard using React and Python/Django.',
            achievements: [
                { achievementText: 'Optimized SQL queries reducing dashboard load time by 40%' },
                { achievementText: 'Implemented automated testing suite covering 90% of code base' }
            ]
        },
        {
            jobTitle: 'Research Assistant',
            companyName: 'MIT CSAIL',
            location: 'Cambridge, MA',
            startDate: '2022-09',
            endDate: '2023-05',
            isCurrent: false,
            roleDescription: 'Assisted in research on weak supervision in machine learning models.',
            achievements: [
                { achievementText: 'Co-authored paper submitted to NeurIPS 2023' },
                { achievementText: 'Built data processing pipeline for 1TB+ dataset' }
            ]
        }
    ],
    projects: [
        {
            projectName: 'EcoTracker App',
            role: 'Lead Developer',
            description: 'Mobile app tracking carbon footprint from grocery receipts',
            toolsUsed: ['React Native', 'Firebase', 'OCR API'],
            outcomes: 'Won 1st Place at HackMIT 2022 Sustainability Track',
            startDate: '2022-09',
            endDate: '2022-09'
        },
        {
            projectName: 'CourseScheduler',
            role: 'Full Stack Developer',
            description: 'Web app helping students plan optimal class schedules',
            toolsUsed: ['Vue.js', 'Node.js', 'MongoDB'],
            outcomes: 'Using by 500+ students during registration week',
            startDate: '2023-01',
            endDate: '2023-05'
        },
        {
            projectName: 'AI Sentiment Analyzer',
            role: 'Researcher',
            description: 'Developed a machine learning model to analyze sentiment in social media posts',
            toolsUsed: ['Python', 'TensorFlow', 'Twitter API'],
            outcomes: 'Achieved 89% accuracy on test dataset; published findings in undergraduate research journal',
            startDate: '2023-09',
            endDate: '2023-12'
        },
        {
            projectName: 'Distributed File System',
            role: 'Backend Engineer',
            description: 'Designed and implemented a fault-tolerant distributed file system',
            toolsUsed: ['Go', 'gRPC', 'Docker'],
            outcomes: 'Successfully handled node failures with zero data loss during simulation testing',
            startDate: '2024-01',
            endDate: '2024-04'
        }
    ],
    skills: [
        { skillName: 'Python', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Java', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'JavaScript/TypeScript', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'React', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'SQL', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Git', skillType: 'tool', proficiencyLevel: 'advanced' }
    ],
    volunteerExperience: [
        {
            roleTitle: 'President',
            organizationName: 'Women in CS Stick',
            startDate: '2022-09',
            endDate: '2024-05',
            contributions: 'Organized career fair with 30+ recruiting companies'
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Mandarin', proficiencyLevel: 'fluent' }
    ]
}




export const MOCK_NURSE_EXPERIENCED_DATA: ResumeDocument = {
    id: 'preview-nurse-exp',
    title: 'Senior ICU Nurse Resume',
    documentType: 'resume',
    templateId: 'ats-standard',
    personalInfo: {
        fullName: 'Sarah Jenkins, RN, CCRN',
        professionalTitle: 'Critical Care Nurse Specialist',
        email: 'sarah.jenkins.rn@example.com',
        phone: '+1 (555) 555-0123',
        city: 'Chicago',
        country: 'IL',
        location: 'Chicago, IL',
        linkedinUrl: 'linkedin.com/in/sarahjenkinsrn',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        headline: 'CCRN Certified ICU Nurse',
        summaryText: 'Compassionate and resilient Critical Care Registered Nurse with 10+ years of experience in Level I Trauma Centers. Expert in life support protocols, patient stabilization, and interdisciplinary collaboration. Proven track record of improving patient outcomes through evidence-based practice and mentorship of junior nursing staff. Committed to delivering dignified, high-quality care in high-pressure environments.'
    },
    workExperience: [
        {
            jobTitle: 'Senior ICU Nurse (CCRN)',
            companyName: 'Chicago Memorial Hospital',
            location: 'Chicago, IL',
            startDate: '2018-05',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Lead nurse for 20-bed Medical ICU, managing care for critically ill patients requiring mechanical ventilation, CRRT, and hemodynamic monitoring.',
            achievements: [
                { achievementText: 'Reduced ventilator-associated pneumonia (VAP) rates by 40% through strict protocol adherence initiatives' },
                { achievementText: 'Precepted and trained 25+ new graduate nurses, ensuring successful unit integration and skill acquisition' },
                { achievementText: 'Served on Rapid Response Team, responding to 50+ code blues annually with a 95% successful resuscitation rate' },
                { achievementText: 'Collaborated with multidisciplinary team to implement early mobility protocols, reducing average ICU length of stay by 1.5 days' },
                { achievementText: 'Chaired the Unit Practice Council, leading initiatives that improved staff retention by 20% over two years' }
            ]
        },
        {
            jobTitle: 'Registered Nurse - Telemetry',
            companyName: 'Lakeside Medical Center',
            location: 'Evanston, IL',
            startDate: '2014-06',
            endDate: '2018-04',
            isCurrent: false,
            roleDescription: 'Provided specialized care for cardiac patients, monitoring heart rhythms and administering cardiac medications.',
            achievements: [
                { achievementText: 'recognized as "Nurse of the Year" in 2016 for exceptional patient care and family advocacy' },
                { achievementText: 'Implemented new bedside shift report protocol that increased patient satisfaction scores by 15%' }
            ]
        },
        {
            jobTitle: 'Medical-Surgical Nurse',
            companyName: 'Mercy General Hospital',
            location: 'Chicago, IL',
            startDate: '2012-06',
            endDate: '2014-05',
            isCurrent: false,
            roleDescription: 'Managed care for a diverse patient population on a busy 30-bed Med-Surg unit.',
            achievements: [
                { achievementText: 'Administered medications and treatments to 6-8 patients per shift with 100% accuracy' },
                { achievementText: 'Participated in wound care committee, helping to update hospital-wide pressure ulcer prevention protocols' },
                { achievementText: 'Commended for excellent discharge planning and patient education' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Illinois at Chicago',
            degree: 'Bachelor of Science in Nursing (BSN)',
            location: 'Chicago, IL',
            endYear: 2014,
            gpa: '3.8',
            achievements: 'Magna Cum Laude, Sigma Theta Tau Honor Society'
        }
    ],
    skills: [
        { skillName: 'Critical Care Nursing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Advanced Cardiac Life Support (ACLS)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Patient Advocacy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Epic EHR', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Ventilator Management', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Trauma Care', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'Critical Care Registered Nurse (CCRN)',
            issuingOrganization: 'AACN',
            issueYear: 2019
        },
        {
            certificationName: 'Trauma Nursing Core Course (TNCC)',
            issuingOrganization: 'ENA',
            issueYear: 2018
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Spanish', proficiencyLevel: 'intermediate' }
    ]
}

export const MOCK_NURSE_ENTRY_DATA: ResumeDocument = {
    id: 'preview-nurse-entry',
    title: 'Entry Level Nurse Resume',
    documentType: 'resume',
    templateId: 'modern',
    personalInfo: {
        fullName: 'Michael Ross',
        professionalTitle: 'Registered Nurse',
        email: 'm.ross@example.com',
        phone: '+1 (555) 999-8888',
        city: 'Seattle',
        country: 'WA',
        location: 'Seattle, WA',
        linkedinUrl: 'linkedin.com/in/michaelrossrn'
    },
    professionalSummary: {
        summaryText: 'Dedicated and energetic Registered Nurse with recent BSN graduate status and clinical rotation experience in Pediatrics, Med-Surg, and ER settings. Passionate about pediatric care and family education. Strong foundation in medical terminology, patient assessment, and medication administration. Eager to launch nursing career at Seattle Children\'s Hospital.'
    },
    education: [
        {
            institutionName: 'University of Washington',
            degree: 'Bachelor of Science in Nursing (BSN)',
            location: 'Seattle, WA',
            endYear: 2024,
            gpa: '3.7',
            achievements: 'President\'s List, Pediatric Nursing Clinical Excellence Award'
        }
    ],
    workExperience: [
        {
            jobTitle: 'Pediatric Clinical Rotation (Student Nurse)',
            companyName: 'Seattle Children\'s Hospital',
            location: 'Seattle, WA',
            startDate: '2023-09',
            endDate: '2023-12',
            isCurrent: false,
            roleDescription: 'Completed 120 hours of clinical practice in acute pediatric care unit.',
            achievements: [
                { achievementText: 'Assisted in the care of 4-5 patients per shift under supervision, conducting assessments and documenting vitals' },
                { achievementText: 'Developed age-appropriate educational materials for diabetic patients' }
            ]
        },
        {
            jobTitle: 'Certified Nursing Assistant (CNA)',
            companyName: 'Evergreen Senior Living',
            location: 'Bellevue, WA',
            startDate: '2022-01',
            endDate: '2024-05',
            isCurrent: true,
            roleDescription: 'Provided daily living assistance to 15+ residents in assisted living facility while completing nursing degree.',
            achievements: [
                { achievementText: 'Maintained 100% attendance record and commended for compassionate bedside manner' },
                { achievementText: 'Assisted in organizing and leading recreational activities, improving resident engagement' },
                { achievementText: 'Collaborated with nursing staff to report changes in resident conditions promptly' }
            ]
        },
        {
            jobTitle: 'Medical-Surgical Clinical Rotation',
            companyName: 'Harborview Medical Center',
            location: 'Seattle, WA',
            startDate: '2023-01',
            endDate: '2023-04',
            isCurrent: false,
            roleDescription: 'Completed 90 hours of clinical practice on a high-acuity trauma unit.',
            achievements: [
                { achievementText: 'Administered oral and IV medications under instructor supervision with no errors' },
                { achievementText: 'Performed wound dressing changes and catheter care for post-operative patients' },
                { achievementText: 'Participated in interdisciplinary rounds, presenting patient updates to the care team' }
            ]
        }
    ],
    skills: [
        { skillName: 'Pediatric Care', skillType: 'professional', proficiencyLevel: 'intermediate' },
        { skillName: 'Patient Education', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Medication Administration', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Vital Signs Monitoring', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Compassionate Care', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Wound Care', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Infection Control', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Electronic Health Records (Epic)', skillType: 'technical', proficiencyLevel: 'intermediate' }
    ],
    certifications: [
        {
            certificationName: 'Basic Life Support (BLS)',
            issuingOrganization: 'American Heart Association',
            issueYear: 2023
        },
        {
            certificationName: 'Certified Nursing Assistant (CNA)',
            issuingOrganization: 'Washington State DOH',
            issueYear: 2021
        }
    ],
    volunteerExperience: [
        {
            roleTitle: 'Medical Volunteer',
            organizationName: 'Seattle Marathon',
            startDate: '2023-11',
            endDate: '2023-11',
            contributions: 'Provided first aid and hydration support at medical tents.'
        }
    ]
}

export const MOCK_PERSONAS = {
    creative: MOCK_PREVIEW_DATA,
    executive: MOCK_EXECUTIVE_DATA,
    graduate: MOCK_GRADUATE_DATA,
    nurse_experienced: MOCK_NURSE_EXPERIENCED_DATA,
    nurse_entry: MOCK_NURSE_ENTRY_DATA
}
