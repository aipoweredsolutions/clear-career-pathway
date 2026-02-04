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

// --- NEW PERSONAS ---

export const MOCK_TECHNICAL_DATA: ResumeDocument = {
    id: 'preview-tech',
    title: 'Senior DevOps Engineer',
    documentType: 'resume',
    templateId: 'ats-technical',
    personalInfo: {
        fullName: 'David Kim',
        professionalTitle: 'Senior DevOps Engineer',
        email: 'root@davidkim.dev',
        phone: '+1 (415) 555-0199',
        city: 'Seattle',
        country: 'WA',
        location: 'Seattle, WA',
        linkedinUrl: 'linkedin.com/in/davidkim-devops',
        websiteUrl: 'github.com/davidkim-ops',
        portfolioUrl: 'davidkim.dev'
    },
    professionalSummary: {
        headline: 'Cloud Infrastructure Specialist',
        summaryText: 'Platform Engineer with 8+ years of experience designing scalable cloud infrastructure. Expert in Kubernetes, Terraform, and AWS/GCP environments. Passionate about automating deployment pipelines and optimizing system reliability (SRE). Proven track record of reducing infrastructure costs by 40% while improving system uptime to 99.99%.'
    },
    skills: [
        { skillName: 'Kubernetes (K8s)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Terraform / IaC', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'AWS / GCP / Azure', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'CI/CD (GitHub Actions)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Python / Go / Rust', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Prometheus / Grafana', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    workExperience: [
        {
            jobTitle: 'Staff Site Reliability Engineer',
            companyName: 'CloudScale Systems',
            location: 'Remote',
            startDate: '2021-04',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading the platform engineering team for a high-growth SaaS unicorn.',
            achievements: [
                { achievementText: 'Architected multi-region Kubernetes clusters serving 1M+ active users' },
                { achievementText: 'Implemented GitOps workflow using ArgoCD that reduced deployment time by 75%' },
                { achievementText: 'Developed custom autoscaling operators in Go, saving $50k/month in cloud spend' }
            ]
        },
        {
            jobTitle: 'Senior DevOps Engineer',
            companyName: 'TechStream Data',
            location: 'San Francisco, CA',
            startDate: '2018-02',
            endDate: '2021-03',
            isCurrent: false,
            roleDescription: 'Managed infrastructure for real-time data processing pipeline.',
            achievements: [
                { achievementText: 'Migrated legacy monolith to microservices architecture on AWS ECS' },
                { achievementText: 'Built automated disaster recovery system with RTO < 15 minutes' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Washington',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            location: 'Seattle, WA',
            endYear: 2017
        }
    ],
    projects: [
        {
            projectName: 'K8s-Auto-Scaler',
            role: 'Maintainer',
            description: 'Open source tool for custom metric based pod autoscaling',
            startDate: '2020',
            endDate: 'Present',
            toolsUsed: ['Go', 'Kubernetes API', 'Prometheus'],
            outcomes: '1.2k+ stars on GitHub'
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Korean', proficiencyLevel: 'fluent' }
    ],
    customSections: [
        {
            title: 'Technical Stack',
            content: 'Infrastructure: AWS, GCP, Terraform\nContainerization: Docker, Kubernetes\nLanguages: Go, Python, Bash, Rust\nObservability: Datadog, ELK Stack, Prometheus'
        }
    ]
}

export const MOCK_HOSPITALITY_DATA: ResumeDocument = {
    id: 'preview-hospitality',
    title: 'Hotel General Manager',
    documentType: 'resume',
    templateId: 'hospitality-elite',
    personalInfo: {
        fullName: 'Elena Rodriguez',
        professionalTitle: 'Luxury Hotel General Manager',
        email: 'elena.rodriguez@example.com',
        phone: '+1 (305) 555-0821',
        city: 'Miami',
        country: 'FL',
        location: 'Miami, FL',
        linkedinUrl: 'linkedin.com/in/elenarodriguez-hotel',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Award-winning General Manager with 12+ years of experience in luxury hospitality. Proven expertise in opening 5-star properties, driving operational excellence, and curating exceptional guest experiences. Recognized for increasing REVPAR by 25% year-over-year and maintaining Forbes 5-Star status. Bilingual leader focused on staff development and guest loyalty.'
    },
    skills: [
        { skillName: 'Luxury Operations', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Revenue Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Guest Relations', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'P&L Management ($40M+)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Team Leadership (200+)', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    workExperience: [
        {
            jobTitle: 'General Manager',
            companyName: 'The Azure Resort & Spa',
            location: 'Miami Beach, FL',
            startDate: '2019-05',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Overseeing all operations for a 250-room luxury oceanfront resort.',
            achievements: [
                { achievementText: 'Achieved Forbes 5-Star rating within 18 months of opening' },
                { achievementText: 'Increased gross operating profit by 15% through strategic F&B partnerships' },
                { achievementText: 'Maintained 95% employee retention rate during post-pandemic recovery' }
            ]
        },
        {
            jobTitle: 'Director of Operations',
            companyName: 'Grand Continental Hotel',
            location: 'Chicago, IL',
            startDate: '2015-02',
            endDate: '2019-04',
            isCurrent: false,
            roleDescription: 'Managed daily operations for a historic 400-room city center hotel.',
            achievements: [
                { achievementText: 'Spearheaded $12M renovation project completing on time and under budget' },
                { achievementText: 'Implemented new guest feedback system improving TripAdvisor ranking from #25 to #4' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Cornell University',
            degree: 'Master of Management in Hospitality',
            location: 'Ithaca, NY',
            endYear: 2014
        },
        {
            institutionName: 'Ecole hôtelière de Lausanne',
            degree: 'Bachelor in Hospitality Management',
            location: 'Lausanne, Switzerland',
            endYear: 2012
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Spanish', proficiencyLevel: 'native' },
        { languageName: 'French', proficiencyLevel: 'fluent' }
    ]
}

export const MOCK_CRUISE_DATA: ResumeDocument = {
    id: 'preview-cruise',
    title: 'Cruise Director Resume',
    documentType: 'resume',
    templateId: 'cruise-excellence',
    personalInfo: {
        fullName: 'Marco Rossi',
        professionalTitle: 'Cruise Director',
        email: 'marco.rossi@cruise-example.com',
        phone: '+44 7700 900077',
        city: 'Southampton',
        country: 'UK',
        location: 'Southampton, UK',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Dynamic and charismatic Cruise Director with 10 years of experience on international luxury liners. Expert in entertainment programming, passenger logistics, and crisis management. Fluent in 4 languages with a track record of achieving highest-in-fleet guest satisfaction scores. Certified in advanced maritime safety protocols.'
    },
    workExperience: [
        {
            jobTitle: 'Cruise Director',
            companyName: 'Royal Horizon Cruises',
            location: 'Mediterranean / Caribbean',
            startDate: '2018-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Responsible for total guest entertainment and onboard experience for 3,000+ passengers per voyage.',
            achievements: [
                { achievementText: ' consistently rated #1 Cruise Director in fleet based on guest feedback surveys' },
                { achievementText: 'Managed department budget of $2.5M annually with zero overspend' },
                { achievementText: 'Redesigned onboard enrichment program increasing participation by 40%' }
            ]
        },
        {
            jobTitle: 'Assistant Cruise Director',
            companyName: 'Oceanic Voyages',
            location: 'Asia Pacific',
            startDate: '2014-06',
            endDate: '2018-02',
            isCurrent: false,
            roleDescription: 'Supported Cruise Director in daily scheduling and hosting of major events.',
            achievements: [
                { achievementText: 'Launched new "Cultural Immersion" shore excursion series' },
                { achievementText: 'Hosted nightly theater shows for audiences of 800+' }
            ]
        }
    ],
    skills: [
        { skillName: 'Public Speaking', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Event Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Crisis Management (STCW)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Multicultural Leadership', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'STCW Basic Safety Training',
            issuingOrganization: 'Maritime & Coastguard Agency',
            issueYear: 2023
        },
        {
            certificationName: 'Crowd Management & Passenger Safety',
            issuingOrganization: 'Royal Horizon Training',
            issueYear: 2022
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Italian', proficiencyLevel: 'native' },
        { languageName: 'German', proficiencyLevel: 'fluent' },
        { languageName: 'Spanish', proficiencyLevel: 'intermediate' }
    ]
}

export const MOCK_ACADEMIC_DATA: ResumeDocument = {
    id: 'preview-academic',
    title: 'Academic CV',
    documentType: 'resume',
    templateId: 'academic',
    personalInfo: {
        fullName: 'Dr. Emily Carter, Ph.D.',
        professionalTitle: 'Assistant Professor of Biology',
        email: 'e.carter@university.edu',
        phone: '(617) 555-0102',
        city: 'Cambridge',
        country: 'MA',
        location: 'Cambridge, MA',
        websiteUrl: 'scholar.google.com/emilycarter'
    },
    professionalSummary: {
        summaryText: 'Research scientist and educator specializing in molecular biology and genetics. Proven track record of securing NSF grant funding and publishing in high-impact journals. Dedicated mentor to undergraduate and graduate students with a focus on diversity in STEM.'
    },
    workExperience: [
        {
            jobTitle: 'Assistant Professor',
            companyName: 'Cambridge University',
            location: 'Cambridge, MA',
            startDate: '2020-09',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading a research lab focused on gene editing applications.',
            achievements: [
                { achievementText: 'Awarded $1.2M NSF CAREER Grant for research on CRISPR off-target effects' },
                { achievementText: 'Teaching "Introduction to Genetics" (BIO101) to 200+ undergraduates annually' }
            ]
        },
        {
            jobTitle: 'Postdoctoral Fellow',
            companyName: 'Broad Institute',
            location: 'Cambridge, MA',
            startDate: '2017-06',
            endDate: '2020-08',
            isCurrent: false,
            roleDescription: 'Conducted research on genomic sequencing techniques.',
            achievements: [
                { achievementText: 'Published 3 first-author papers in Nature and Cell' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Stanford University',
            degree: 'Ph.D. in Biology',
            location: 'Stanford, CA',
            endYear: 2017
        },
        {
            institutionName: 'Yale University',
            degree: 'Bachelor of Science in Biology',
            location: 'New Haven, CT',
            endYear: 2012,
            achievements: 'Summa Cum Laude'
        }
    ],
    publications: [
        {
            title: 'Novel Mechanisms of CRISPR-Cas9 Specificity',
            platformOrPublisher: 'Nature',
            publicationYear: 2019,
            url: 'nature.com/articles/xxxx'
        },
        {
            title: 'Genomic Editing in Mammalian Cells',
            platformOrPublisher: 'Cell',
            publicationYear: 2018
        }
    ],
    skills: [
        { skillName: 'Molecular Biology', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Next-Gen Sequencing', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Data Analysis (R/Python)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Grant Writing', skillType: 'professional', proficiencyLevel: 'expert' }
    ]
}

// --- 2. Corporate / Finance Persona (for ATS Professional, Standard) ---
export const MOCK_CORPORATE_DATA: ResumeDocument = {
    id: 'preview-corp',
    title: 'Financial Analyst Resume',
    documentType: 'resume',
    templateId: 'ats-standard',
    personalInfo: {
        fullName: 'Michael Chang',
        professionalTitle: 'Senior Financial Analyst',
        email: 'michael.chang@fin-example.com',
        phone: '+1 (212) 555-0199',
        city: 'New York',
        country: 'NY',
        location: 'New York, NY',
        linkedinUrl: 'linkedin.com/in/michaelchang-fin'
    },
    professionalSummary: {
        headline: 'Chartered Financial Analyst (CFA)',
        summaryText: 'Detail-oriented Senior Financial Analyst with 6+ years of experience in corporate finance, financial modeling, and strategic planning. Proven track record of improving forecast accuracy by 25% and identifying cost-saving opportunities worth $2M+. Expert in SAP, Oracle, and Tableau. Strong communicator with ability to present complex financial data to non-financial stakeholders.'
    },
    skills: [
        { skillName: 'Financial Modeling', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Budgeting & Forecasting', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'SAP / Oracle ERP', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Data Analysis (SQL)', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Strategic Planning', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'GAAP / IFRS', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    workExperience: [
        {
            jobTitle: 'Senior Financial Analyst',
            companyName: 'Global Corp Holdings',
            location: 'New York, NY',
            startDate: '2020-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Lead for division-wide FP&A activities, managing a budget of $50M.',
            achievements: [
                { achievementText: 'Developed automated dashboard for real-time expense tracking, reducing monthly reporting time by 15 hours' },
                { achievementText: 'Led quarterly forecasting process, improving variance analysis accuracy to within 2%' },
                { achievementText: 'Partnered with operations team to identify supply chain inefficiencies, resulting in $500k annual savings' }
            ]
        },
        {
            jobTitle: 'Financial Analyst',
            companyName: 'Stratton Oakmont Inc.',
            location: 'New York, NY',
            startDate: '2017-06',
            endDate: '2020-02',
            isCurrent: false,
            roleDescription: 'Supported senior management with ad-hoc reporting and financial analysis.',
            achievements: [
                { achievementText: 'Built dynamic financial models for potential M&A targets, influencing key investment decisions' },
                { achievementText: 'Streamlined month-end close process, cutting timeline by 2 days' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Stern School of Business, NYU',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Finance & Accounting',
            location: 'New York, NY',
            endYear: 2017,
            gpa: '3.8',
            achievements: 'Magna Cum Laude'
        }
    ],
    certifications: [
        {
            certificationName: 'Chartered Financial Analyst (CFA) Level III',
            issuingOrganization: 'CFA Institute',
            issueYear: 2021
        },
        {
            certificationName: 'Certified Management Accountant (CMA)',
            issuingOrganization: 'IMA',
            issueYear: 2018
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Mandarin', proficiencyLevel: 'fluent' }
    ]
}

// --- 3. Legal Persona (for Classic Serif templates) ---
export const MOCK_LEGAL_DATA: ResumeDocument = {
    id: 'preview-legal',
    title: 'Attorney Resume',
    documentType: 'resume',
    templateId: 'ats-classic',
    personalInfo: {
        fullName: 'Sarah O\'Connor, J.D.',
        professionalTitle: 'Corporate Associate Attorney',
        email: 's.oconnor@legal-example.com',
        phone: '+1 (202) 555-0123',
        city: 'Washington',
        country: 'DC',
        location: 'Washington, DC',
        linkedinUrl: 'linkedin.com/in/sarahoconnor-law'
    },
    professionalSummary: {
        summaryText: 'Results-driven Corporate Attorney with 5 years of experience in mergers & acquisitions and securities law. Admitted to the New York and DC Bars. Proven ability to drafting complex transactional documents and conducting due diligence for high-value deals. Strong negotiator with a commitment to delivering exceptional client service.'
    },
    workExperience: [
        {
            jobTitle: 'Associate Attorney',
            companyName: 'Pearson, Specter & Litt',
            location: 'Washington, DC',
            startDate: '2019-09',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Member of the Corporate Practice Group focusing on M&A and regulatory compliance.',
            achievements: [
                { achievementText: 'Represented Fortune 500 client in a $2.5B cross-border acquisition, managing due diligence for 10+ subsidiaries' },
                { achievementText: 'Drafted and negotiated purchase agreements, shareholder agreements, and commercial contracts' },
                { achievementText: 'Advised startup clients on corporate governance and seed funding rounds' }
            ]
        },
        {
            jobTitle: 'Summer Associate',
            companyName: 'Hamlin, Hamlin & McGill',
            location: 'New York, NY',
            startDate: '2018-05',
            endDate: '2018-08',
            isCurrent: false,
            roleDescription: 'Assisted partners with legal research and motion drafting.',
            achievements: [
                { achievementText: 'Conducted extensive research on securities regulations, contributing to a winning defense strategy' },
                { achievementText: 'Prepared memos on complex antitrust issues for senior partners' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Georgetown University Law Center',
            degree: 'Juris Doctor (J.D.)',
            location: 'Washington, DC',
            endYear: 2019,
            achievements: 'Cum Laude, Georgetown Law Journal Editor'
        },
        {
            institutionName: 'University of Virginia',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Political Science',
            location: 'Charlottesville, VA',
            endYear: 2016
        }
    ],
    skills: [
        { skillName: 'Mergers & Acquisitions', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Contract Negotiation', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Due Diligence', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Legal Research', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Corporate Governance', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    professionalAffiliations: [
        {
            organizationName: 'American Bar Association',
            roleOrMembership: 'Member, Business Law Section',
            yearsActive: '2019-Present'
        },
        {
            organizationName: 'New York State Bar Association',
            roleOrMembership: 'Member',
            yearsActive: '2020-Present'
        }
    ]
}

// --- 4. Fashion / Creative Persona (for Chic, Artisan, Cute) ---
export const MOCK_FASHION_DATA: ResumeDocument = {
    id: 'preview-fashion',
    title: 'Art Director Resume',
    documentType: 'resume',
    templateId: 'chic',
    personalInfo: {
        fullName: 'Isabella Moretti',
        professionalTitle: 'Art Director & Stylist',
        email: 'bella.moretti@studio.com',
        phone: '+1 (323) 555-0888',
        city: 'Los Angeles',
        country: 'CA',
        location: 'Los Angeles, CA',
        portfolioUrl: 'isabellamoretti.style',
        linkedinUrl: 'linkedin.com/in/isabellamoretti',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Visionary Art Director with a background in high fashion and luxury brand editorial. 7+ years of experience leading visual storytelling teams, conceptualizing campaigns, and overseeing photo shoots. Expert in Adobe Creative Suite and trend forecasting. passionate about creating immersive visual narratives that resonate with global audiences.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Art Director',
            companyName: 'VOGUE Italia (Remote)',
            location: 'Milan / LA',
            startDate: '2021-02',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing visual concepts for digital and print editorials.',
            achievements: [
                { achievementText: 'Led creative direction for key September Issue digital campaign, achieving 5M+ impressions' },
                { achievementText: 'Manage team of 10 creatives including photographers, stylists, and set designers' },
                { achievementText: 'Collaborated with luxury brands (Gucci, Prada) on sponsored content integration' }
            ]
        },
        {
            jobTitle: 'Visual Stylist',
            companyName: 'Refinery29',
            location: 'New York, NY',
            startDate: '2017-06',
            endDate: '2021-01',
            isCurrent: false,
            roleDescription: 'Created visual assets for lifestyle and fashion verticals.',
            achievements: [
                { achievementText: 'Styled 50+ photo shoots for "Money Diaries" and "Fashion Week" features' },
                { achievementText: 'Developed new visual identity guidelines for social media channels' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Parsons School of Design',
            degree: 'Bachelor of Fine Arts',
            fieldOfStudy: 'Fashion Marketing',
            location: 'New York, NY',
            endYear: 2017
        }
    ],
    skills: [
        { skillName: 'Creative Direction', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Adobe Creative Suite', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Editorial Styling', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Trend Forecasting', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Photography', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Italian', proficiencyLevel: 'fluent' },
        { languageName: 'French', proficiencyLevel: 'intermediate' }
    ],
    customSections: [
        {
            title: 'Exhibitions',
            items: [
                { text: 'Modern Muse, LA Gallery (2023)' },
                { text: 'Sustainable Fashion Week, Guest Curator (2022)' }
            ]
        }
    ]
}

// --- 5. ATS Professional Persona (for ATS Professional template) ---
export const MOCK_ATS_PROFESSIONAL_DATA: ResumeDocument = {
    id: 'preview-ats-pro',
    title: 'ATS Professional Resume',
    documentType: 'resume',
    templateId: 'ats-professional',
    personalInfo: {
        fullName: 'Jennifer Martinez',
        professionalTitle: 'Senior Project Manager',
        email: 'j.martinez@example.com',
        phone: '+1 (555) 321-7890',
        city: 'Denver',
        country: 'CO',
        location: 'Denver, CO',
        linkedinUrl: 'linkedin.com/in/jennifermartinez-pm'
    },
    professionalSummary: {
        summaryText: 'Results-driven Project Manager with 8+ years of experience leading cross-functional teams in agile environments. PMP certified with expertise in software development lifecycle, stakeholder management, and risk mitigation. Proven track record of delivering complex projects on time and under budget while maintaining 95% client satisfaction rate.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Project Manager',
            companyName: 'TechVision Solutions',
            location: 'Denver, CO',
            startDate: '2020-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading enterprise software implementation projects for Fortune 500 clients with budgets up to $5M.',
            achievements: [
                { achievementText: 'Successfully delivered 12 major projects with average 15% cost savings through efficient resource allocation' },
                { achievementText: 'Implemented agile methodologies across 4 teams, increasing delivery velocity by 40%' },
                { achievementText: 'Managed stakeholder relationships with C-level executives, maintaining 98% satisfaction scores' }
            ]
        },
        {
            jobTitle: 'Project Manager',
            companyName: 'Digital Dynamics Inc',
            location: 'Boulder, CO',
            startDate: '2016-06',
            endDate: '2019-12',
            isCurrent: false,
            roleDescription: 'Coordinated software development projects for mid-market clients.',
            achievements: [
                { achievementText: 'Led team of 15 developers and designers through 8 successful product launches' },
                { achievementText: 'Reduced project delivery time by 25% through process optimization' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Colorado',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Business Administration',
            location: 'Boulder, CO',
            endYear: 2016,
            gpa: '3.7'
        }
    ],
    skills: [
        { skillName: 'Project Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Agile/Scrum', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'JIRA', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Risk Management', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Stakeholder Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Budget Planning', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'Project Management Professional (PMP)',
            issuingOrganization: 'PMI',
            issueYear: 2018
        },
        {
            certificationName: 'Certified Scrum Master (CSM)',
            issuingOrganization: 'Scrum Alliance',
            issueYear: 2017
        }
    ]
}

// --- 6. ATS Minimal Persona ---
export const MOCK_ATS_MINIMAL_DATA: ResumeDocument = {
    id: 'preview-ats-minimal',
    title: 'ATS Minimal Resume',
    documentType: 'resume',
    templateId: 'ats-minimal',
    personalInfo: {
        fullName: 'Robert Chen',
        professionalTitle: 'Data Analyst',
        email: 'robert.chen@example.com',
        phone: '+1 (555) 456-7890',
        city: 'Austin',
        country: 'TX',
        location: 'Austin, TX',
        linkedinUrl: 'linkedin.com/in/robertchen-data'
    },
    professionalSummary: {
        summaryText: 'Detail-oriented Data Analyst with 5+ years of experience transforming complex datasets into actionable business insights. Proficient in SQL, Python, and Tableau. Strong background in statistical analysis and data visualization with proven ability to drive data-informed decision making.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Data Analyst',
            companyName: 'DataFirst Analytics',
            location: 'Austin, TX',
            startDate: '2021-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Analyzing customer behavior data to optimize marketing strategies and improve conversion rates.',
            achievements: [
                { achievementText: 'Built predictive models that increased customer retention by 22%' },
                { achievementText: 'Created automated reporting dashboards reducing manual reporting time by 30 hours/month' },
                { achievementText: 'Identified $500K in cost-saving opportunities through data-driven analysis' }
            ]
        },
        {
            jobTitle: 'Data Analyst',
            companyName: 'Tech Innovations Corp',
            location: 'Houston, TX',
            startDate: '2019-01',
            endDate: '2021-02',
            isCurrent: false,
            roleDescription: 'Supported business intelligence initiatives through data analysis and reporting.',
            achievements: [
                { achievementText: 'Developed SQL queries to extract insights from 10M+ record databases' },
                { achievementText: 'Collaborated with product team to A/B test features, improving user engagement by 18%' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Texas at Austin',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Statistics',
            location: 'Austin, TX',
            endYear: 2018,
            gpa: '3.8'
        }
    ],
    skills: [
        { skillName: 'SQL', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Python', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Tableau', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Excel', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Statistical Analysis', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Data Visualization', skillType: 'professional', proficiencyLevel: 'expert' }
    ]
}

// --- 7. ATS Executive Persona ---
export const MOCK_ATS_EXECUTIVE_DATA: ResumeDocument = {
    id: 'preview-ats-exec',
    title: 'ATS Executive Resume',
    documentType: 'resume',
    templateId: 'ats-executive',
    personalInfo: {
        fullName: 'Victoria Thompson',
        professionalTitle: 'Chief Operating Officer',
        email: 'v.thompson@example.com',
        phone: '+1 (555) 789-0123',
        city: 'Boston',
        country: 'MA',
        location: 'Boston, MA',
        linkedinUrl: 'linkedin.com/in/victoriathompson-coo'
    },
    professionalSummary: {
        summaryText: 'Strategic executive leader with 18+ years of experience driving operational excellence and revenue growth for technology companies. Proven track record of scaling organizations from startup to $100M+ ARR. Expert in building high-performance teams, optimizing processes, and executing strategic initiatives that deliver measurable business impact.'
    },
    workExperience: [
        {
            jobTitle: 'Chief Operating Officer',
            companyName: 'InnovateTech Solutions',
            location: 'Boston, MA',
            startDate: '2018-06',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading all operational functions including product development, customer success, and business operations for a SaaS company.',
            achievements: [
                { achievementText: 'Scaled company from $25M to $120M ARR in 4 years while maintaining 85% gross margins' },
                { achievementText: 'Built and led cross-functional teams of 200+ employees across 5 departments' },
                { achievementText: 'Implemented operational frameworks that improved customer retention from 82% to 94%' },
                { achievementText: 'Led successful Series C fundraising resulting in $75M investment' }
            ]
        },
        {
            jobTitle: 'VP of Operations',
            companyName: 'CloudFirst Technologies',
            location: 'Cambridge, MA',
            startDate: '2013-02',
            endDate: '2018-05',
            isCurrent: false,
            roleDescription: 'Managed operations and customer success for enterprise cloud platform.',
            achievements: [
                { achievementText: 'Reduced operational costs by $8M annually through process optimization' },
                { achievementText: 'Improved NPS score from 42 to 68 through customer-centric initiatives' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Harvard Business School',
            degree: 'Master of Business Administration',
            location: 'Boston, MA',
            endYear: 2012
        },
        {
            institutionName: 'MIT',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Engineering',
            location: 'Cambridge, MA',
            endYear: 2005
        }
    ],
    skills: [
        { skillName: 'Strategic Planning', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'P&L Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Team Leadership', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Process Optimization', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Change Management', skillType: 'professional', proficiencyLevel: 'advanced' }
    ]
}

// --- 8. ATS Modern Persona ---
export const MOCK_ATS_MODERN_DATA: ResumeDocument = {
    id: 'preview-ats-modern',
    title: 'ATS Modern Resume',
    documentType: 'resume',
    templateId: 'ats-modern',
    personalInfo: {
        fullName: 'Alex Rivera',
        professionalTitle: 'UX/UI Designer',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 234-5678',
        city: 'Portland',
        country: 'OR',
        location: 'Portland, OR',
        linkedinUrl: 'linkedin.com/in/alexrivera-ux',
        portfolioUrl: 'alexrivera.design'
    },
    professionalSummary: {
        summaryText: 'Creative UX/UI Designer with 6+ years of experience crafting intuitive digital experiences for web and mobile applications. Passionate about user-centered design, accessibility, and creating interfaces that delight users. Proficient in Figma, Adobe XD, and design systems.'
    },
    workExperience: [
        {
            jobTitle: 'Senior UX/UI Designer',
            companyName: 'DesignLab Studio',
            location: 'Portland, OR',
            startDate: '2021-04',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading design initiatives for mobile and web applications serving 500K+ users.',
            achievements: [
                { achievementText: 'Redesigned mobile app resulting in 45% increase in user engagement' },
                { achievementText: 'Created comprehensive design system adopted across 8 product teams' },
                { achievementText: 'Conducted user research with 200+ participants to inform design decisions' }
            ]
        },
        {
            jobTitle: 'UX Designer',
            companyName: 'Creative Digital Agency',
            location: 'Seattle, WA',
            startDate: '2018-06',
            endDate: '2021-03',
            isCurrent: false,
            roleDescription: 'Designed user experiences for diverse client portfolio.',
            achievements: [
                { achievementText: 'Delivered 15+ client projects with 95% satisfaction rate' },
                { achievementText: 'Improved website conversion rates by average of 30% through UX optimization' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Portland State University',
            degree: 'Bachelor of Fine Arts',
            fieldOfStudy: 'Graphic Design',
            location: 'Portland, OR',
            endYear: 2018
        }
    ],
    skills: [
        { skillName: 'Figma', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Adobe XD', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'User Research', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Prototyping', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Design Systems', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Accessibility', skillType: 'professional', proficiencyLevel: 'advanced' }
    ]
}

// --- 9. ATS Graduate Persona ---
export const MOCK_ATS_GRADUATE_DATA: ResumeDocument = {
    id: 'preview-ats-grad',
    title: 'ATS Graduate Resume',
    documentType: 'resume',
    templateId: 'ats-graduate',
    personalInfo: {
        fullName: 'Emily Watson',
        professionalTitle: 'Recent Marketing Graduate',
        email: 'emily.watson@example.com',
        phone: '+1 (555) 678-9012',
        city: 'Philadelphia',
        country: 'PA',
        location: 'Philadelphia, PA',
        linkedinUrl: 'linkedin.com/in/emilywatson-marketing'
    },
    professionalSummary: {
        summaryText: 'Enthusiastic marketing graduate with strong foundation in digital marketing, social media strategy, and content creation. Completed internships at leading agencies where I contributed to campaigns that increased client engagement by 35%. Eager to apply creative problem-solving skills in an entry-level marketing role.'
    },
    workExperience: [
        {
            jobTitle: 'Marketing Intern',
            companyName: 'BrandWorks Agency',
            location: 'Philadelphia, PA',
            startDate: '2023-06',
            endDate: '2023-12',
            isCurrent: false,
            roleDescription: 'Supported marketing team in developing social media campaigns for B2C clients.',
            achievements: [
                { achievementText: 'Created social media content that generated 50K+ impressions across platforms' },
                { achievementText: 'Assisted in email marketing campaigns achieving 25% open rate' },
                { achievementText: 'Conducted market research for 3 major client pitches' }
            ]
        },
        {
            jobTitle: 'Social Media Coordinator',
            companyName: 'University Student Union',
            location: 'Philadelphia, PA',
            startDate: '2022-09',
            endDate: '2024-05',
            isCurrent: false,
            roleDescription: 'Managed social media accounts for student organization with 5,000+ followers.',
            achievements: [
                { achievementText: 'Grew Instagram following by 40% in one academic year' },
                { achievementText: 'Organized 10+ campus events with average attendance of 200+ students' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Temple University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Marketing',
            location: 'Philadelphia, PA',
            endYear: 2024,
            gpa: '3.6',
            achievements: 'Dean\'s List (3 semesters)'
        }
    ],
    skills: [
        { skillName: 'Social Media Marketing', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Content Creation', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Google Analytics', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Canva', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Email Marketing', skillType: 'professional', proficiencyLevel: 'intermediate' }
    ]
}

// --- 10. ATS Timeline Persona ---
export const MOCK_ATS_TIMELINE_DATA: ResumeDocument = {
    id: 'preview-ats-timeline',
    title: 'ATS Timeline Resume',
    documentType: 'resume',
    templateId: 'ats-timeline',
    personalInfo: {
        fullName: 'Marcus Johnson',
        professionalTitle: 'Operations Manager',
        email: 'm.johnson@example.com',
        phone: '+1 (555) 890-1234',
        city: 'Atlanta',
        country: 'GA',
        location: 'Atlanta, GA',
        linkedinUrl: 'linkedin.com/in/marcusjohnson-ops'
    },
    professionalSummary: {
        summaryText: 'Accomplished Operations Manager with 10+ years of progressive experience in supply chain management, logistics, and process improvement. Six Sigma certified with expertise in lean manufacturing principles. Proven ability to reduce costs while improving quality and efficiency.'
    },
    workExperience: [
        {
            jobTitle: 'Operations Manager',
            companyName: 'LogisticsPro Solutions',
            location: 'Atlanta, GA',
            startDate: '2019-08',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Managing daily operations for distribution center handling 50,000+ shipments monthly.',
            achievements: [
                { achievementText: 'Reduced operational costs by 18% through process optimization initiatives' },
                { achievementText: 'Improved on-time delivery rate from 87% to 96%' },
                { achievementText: 'Led team of 45 warehouse staff and supervisors' }
            ]
        },
        {
            jobTitle: 'Operations Supervisor',
            companyName: 'Supply Chain Dynamics',
            location: 'Charlotte, NC',
            startDate: '2015-03',
            endDate: '2019-07',
            isCurrent: false,
            roleDescription: 'Supervised warehouse operations and inventory management.',
            achievements: [
                { achievementText: 'Implemented new WMS system reducing picking errors by 40%' },
                { achievementText: 'Trained and developed 20+ team members' }
            ]
        },
        {
            jobTitle: 'Logistics Coordinator',
            companyName: 'FastShip Logistics',
            location: 'Raleigh, NC',
            startDate: '2013-01',
            endDate: '2015-02',
            isCurrent: false,
            roleDescription: 'Coordinated inbound and outbound shipments.',
            achievements: [
                { achievementText: 'Managed relationships with 15+ carrier partners' },
                { achievementText: 'Reduced shipping costs by 12% through carrier negotiations' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Georgia State University',
            degree: 'Bachelor of Business Administration',
            fieldOfStudy: 'Supply Chain Management',
            location: 'Atlanta, GA',
            endYear: 2012
        }
    ],
    skills: [
        { skillName: 'Supply Chain Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Lean Six Sigma', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Inventory Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'WMS Systems', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Process Improvement', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'Six Sigma Green Belt',
            issuingOrganization: 'ASQ',
            issueYear: 2018
        },
        {
            certificationName: 'APICS CPIM',
            issuingOrganization: 'APICS',
            issueYear: 2016
        }
    ]
}

// --- 11. Service Pro Persona ---
export const MOCK_SERVICE_PRO_DATA: ResumeDocument = {
    id: 'preview-service-pro',
    title: 'Service Professional Resume',
    documentType: 'resume',
    templateId: 'service-pro',
    personalInfo: {
        fullName: 'Carlos Rodriguez',
        professionalTitle: 'Customer Service Manager',
        email: 'carlos.rodriguez@example.com',
        phone: '+1 (555) 345-6789',
        city: 'Phoenix',
        country: 'AZ',
        location: 'Phoenix, AZ',
        linkedinUrl: 'linkedin.com/in/carlosrodriguez-service'
    },
    professionalSummary: {
        summaryText: 'Customer-focused Service Manager with 9+ years of experience building and leading high-performing support teams. Expert in developing service strategies that improve customer satisfaction while reducing operational costs. Proven track record of achieving 95%+ CSAT scores and reducing response times by 50%.'
    },
    workExperience: [
        {
            jobTitle: 'Customer Service Manager',
            companyName: 'ServiceFirst Technologies',
            location: 'Phoenix, AZ',
            startDate: '2020-02',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading customer service team of 25 representatives supporting B2B SaaS platform.',
            achievements: [
                { achievementText: 'Improved customer satisfaction score from 82% to 96% in 18 months' },
                { achievementText: 'Reduced average response time from 4 hours to 90 minutes' },
                { achievementText: 'Implemented knowledge base reducing ticket volume by 30%' },
                { achievementText: 'Developed training program that decreased onboarding time by 40%' }
            ]
        },
        {
            jobTitle: 'Senior Customer Support Specialist',
            companyName: 'TechSupport Solutions',
            location: 'Tempe, AZ',
            startDate: '2016-05',
            endDate: '2020-01',
            isCurrent: false,
            roleDescription: 'Provided technical support for enterprise software clients.',
            achievements: [
                { achievementText: 'Maintained 98% customer satisfaction rating across 2,000+ support tickets' },
                { achievementText: 'Mentored 10+ junior support specialists' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Arizona State University',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Communications',
            location: 'Tempe, AZ',
            endYear: 2015
        }
    ],
    skills: [
        { skillName: 'Customer Service', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Team Leadership', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Zendesk', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Salesforce', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Conflict Resolution', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Training & Development', skillType: 'professional', proficiencyLevel: 'advanced' }
    ]
}

export const MOCK_PERSONAS = {
    creative: MOCK_PREVIEW_DATA,
    executive: MOCK_EXECUTIVE_DATA,
    graduate: MOCK_GRADUATE_DATA,
    nurse_experienced: MOCK_NURSE_EXPERIENCED_DATA,
    nurse_entry: MOCK_NURSE_ENTRY_DATA,
    technical: MOCK_TECHNICAL_DATA,
    hospitality: MOCK_HOSPITALITY_DATA,
    cruise: MOCK_CRUISE_DATA,
    academic: MOCK_ACADEMIC_DATA,
    corporate: MOCK_CORPORATE_DATA,
    legal: MOCK_LEGAL_DATA,
    fashion: MOCK_FASHION_DATA,
    ats_professional: MOCK_ATS_PROFESSIONAL_DATA,
    ats_minimal: MOCK_ATS_MINIMAL_DATA,
    ats_executive: MOCK_ATS_EXECUTIVE_DATA,
    ats_modern: MOCK_ATS_MODERN_DATA,
    ats_graduate: MOCK_ATS_GRADUATE_DATA,
    ats_timeline: MOCK_ATS_TIMELINE_DATA,
    service_pro: MOCK_SERVICE_PRO_DATA
}
