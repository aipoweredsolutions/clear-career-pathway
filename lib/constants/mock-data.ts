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

// --- 12. Technical Template Persona ---
export const MOCK_TECHNICAL_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-technical-template',
    title: 'Technical Resume',
    documentType: 'resume',
    templateId: 'technical',
    personalInfo: {
        fullName: 'Ryan Mitchell',
        professionalTitle: 'Full Stack Software Engineer',
        email: 'ryan.mitchell@devmail.com',
        phone: '+1 (555) 111-2222',
        city: 'San Jose',
        country: 'CA',
        location: 'San Jose, CA',
        linkedinUrl: 'linkedin.com/in/ryanmitchell-dev',
        websiteUrl: 'github.com/ryanmitchell',
        portfolioUrl: 'ryanmitchell.dev'
    },
    professionalSummary: {
        summaryText: 'Innovative Full Stack Engineer with 7+ years of experience building scalable web applications using modern JavaScript frameworks. Expert in React, Node.js, and cloud infrastructure. Passionate about clean code, test-driven development, and mentoring junior developers. Proven track record of delivering high-performance applications serving millions of users.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Full Stack Engineer',
            companyName: 'StreamTech Solutions',
            location: 'San Jose, CA',
            startDate: '2021-02',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Building real-time streaming platform serving 5M+ concurrent users.',
            achievements: [
                { achievementText: 'Architected microservices infrastructure reducing API response time by 60%' },
                { achievementText: 'Led migration from monolith to serverless architecture, cutting infrastructure costs by $200K annually' },
                { achievementText: 'Implemented comprehensive testing strategy achieving 95% code coverage' },
                { achievementText: 'Mentored 6 junior engineers, 4 promoted to mid-level within 12 months' }
            ]
        },
        {
            jobTitle: 'Full Stack Developer',
            companyName: 'AppWorks Inc',
            location: 'Mountain View, CA',
            startDate: '2018-06',
            endDate: '2021-01',
            isCurrent: false,
            roleDescription: 'Developed customer-facing web applications for SaaS platform.',
            achievements: [
                { achievementText: 'Built responsive dashboard used by 100K+ daily active users' },
                { achievementText: 'Optimized database queries reducing page load time by 45%' },
                { achievementText: 'Implemented OAuth 2.0 authentication improving security compliance' }
            ]
        },
        {
            jobTitle: 'Junior Software Developer',
            companyName: 'CodeCraft Studios',
            location: 'Palo Alto, CA',
            startDate: '2017-01',
            endDate: '2018-05',
            isCurrent: false,
            roleDescription: 'Contributed to front-end development of e-commerce platform.',
            achievements: [
                { achievementText: 'Developed reusable React components adopted across 8 projects' },
                { achievementText: 'Fixed 150+ bugs improving overall application stability' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'San Jose State University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            location: 'San Jose, CA',
            endYear: 2016,
            gpa: '3.7'
        }
    ],
    skills: [
        { skillName: 'JavaScript/TypeScript', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'React/Next.js', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Node.js/Express', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'PostgreSQL/MongoDB', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'AWS/Docker', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'GraphQL/REST APIs', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Git/CI/CD', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Jest/Testing', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    projects: [
        {
            projectName: 'Open Source Contribution - React Query',
            role: 'Contributor',
            description: 'Contributed bug fixes and documentation improvements to popular data-fetching library.',
            toolsUsed: ['React', 'TypeScript', 'Jest'],
            startDate: '2022',
            endDate: 'Present'
        },
        {
            projectName: 'Personal Finance Tracker',
            role: 'Creator',
            description: 'Built full-stack application for tracking expenses with data visualization.',
            toolsUsed: ['Next.js', 'Prisma', 'PostgreSQL', 'Chart.js'],
            outcomes: '2K+ stars on GitHub',
            startDate: '2023',
            endDate: '2023'
        }
    ]
}

// --- 13. Executive Template Persona ---
export const MOCK_EXECUTIVE_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-executive-template',
    title: 'Executive Resume',
    documentType: 'resume',
    templateId: 'executive',
    personalInfo: {
        fullName: 'Catherine Williams',
        professionalTitle: 'Chief Marketing Officer',
        email: 'c.williams@executive.com',
        phone: '+1 (555) 333-4444',
        city: 'Chicago',
        country: 'IL',
        location: 'Chicago, IL',
        linkedinUrl: 'linkedin.com/in/catherinewilliams-cmo'
    },
    professionalSummary: {
        summaryText: 'Visionary Chief Marketing Officer with 20+ years of experience driving brand growth and market expansion for Fortune 500 companies. Expert in digital transformation, customer acquisition, and building high-performing marketing teams. Proven track record of increasing revenue by $500M+ through strategic marketing initiatives and data-driven decision making.'
    },
    workExperience: [
        {
            jobTitle: 'Chief Marketing Officer',
            companyName: 'Global Retail Corporation',
            location: 'Chicago, IL',
            startDate: '2019-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading global marketing strategy for $5B retail company with 500+ stores worldwide.',
            achievements: [
                { achievementText: 'Drove 35% revenue growth over 4 years through omnichannel marketing strategy' },
                { achievementText: 'Built and led marketing organization of 150+ professionals across 12 countries' },
                { achievementText: 'Launched successful brand repositioning campaign increasing brand awareness by 60%' },
                { achievementText: 'Implemented marketing automation platform generating $100M in incremental revenue' },
                { achievementText: 'Managed annual marketing budget of $200M with consistent ROI of 5:1' }
            ]
        },
        {
            jobTitle: 'VP of Marketing',
            companyName: 'TechGrowth Enterprises',
            location: 'San Francisco, CA',
            startDate: '2014-06',
            endDate: '2018-12',
            isCurrent: false,
            roleDescription: 'Led marketing for B2B SaaS company during hypergrowth phase.',
            achievements: [
                { achievementText: 'Scaled company from $50M to $300M ARR in 4 years' },
                { achievementText: 'Built demand generation engine producing 10,000+ qualified leads monthly' },
                { achievementText: 'Led successful IPO marketing strategy and investor relations' }
            ]
        },
        {
            jobTitle: 'Director of Digital Marketing',
            companyName: 'Consumer Brands Inc',
            location: 'New York, NY',
            startDate: '2009-03',
            endDate: '2014-05',
            isCurrent: false,
            roleDescription: 'Pioneered digital marketing transformation for traditional consumer goods company.',
            achievements: [
                { achievementText: 'Increased digital revenue from 5% to 35% of total sales' },
                { achievementText: 'Launched e-commerce platform generating $150M in first year' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Kellogg School of Management, Northwestern',
            degree: 'Master of Business Administration',
            location: 'Evanston, IL',
            endYear: 2008
        },
        {
            institutionName: 'University of Michigan',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Marketing',
            location: 'Ann Arbor, MI',
            endYear: 2004
        }
    ],
    skills: [
        { skillName: 'Strategic Marketing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Brand Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Digital Transformation', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Team Leadership', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'P&L Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Customer Analytics', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    professionalAffiliations: [
        {
            organizationName: 'American Marketing Association',
            roleOrMembership: 'Board Member',
            yearsActive: '2020-Present'
        }
    ]
}

// --- 14. Creative Template Persona ---
export const MOCK_CREATIVE_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-creative-template',
    title: 'Creative Resume',
    documentType: 'resume',
    templateId: 'creative',
    personalInfo: {
        fullName: 'Jordan Blake',
        professionalTitle: 'Creative Director & Brand Strategist',
        email: 'jordan@blakecreative.com',
        phone: '+1 (555) 777-8888',
        city: 'Brooklyn',
        country: 'NY',
        location: 'Brooklyn, NY',
        portfolioUrl: 'jordanblake.com',
        linkedinUrl: 'linkedin.com/in/jordanblake',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Award-winning Creative Director with 10+ years of experience crafting compelling brand narratives and visual identities. Specialized in integrated campaigns that blend storytelling, design, and technology. Led creative teams that have won 15+ industry awards including Cannes Lions and D&AD. Passionate about pushing creative boundaries while delivering measurable business results.'
    },
    workExperience: [
        {
            jobTitle: 'Creative Director',
            companyName: 'Visionary Creative Agency',
            location: 'Brooklyn, NY',
            startDate: '2020-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading creative vision for boutique agency serving premium lifestyle brands.',
            achievements: [
                { achievementText: 'Directed 25+ integrated campaigns generating 200M+ impressions' },
                { achievementText: 'Won Gold Lion at Cannes for innovative AR brand experience' },
                { achievementText: 'Grew agency revenue by 150% through new client acquisition' },
                { achievementText: 'Built and mentored creative team of 12 designers and copywriters' }
            ]
        },
        {
            jobTitle: 'Senior Art Director',
            companyName: 'Modern Brand Studio',
            location: 'Manhattan, NY',
            startDate: '2016-01',
            endDate: '2020-02',
            isCurrent: false,
            roleDescription: 'Created visual concepts for Fortune 500 brands and startups.',
            achievements: [
                { achievementText: 'Designed brand identity for 3 companies that achieved unicorn status' },
                { achievementText: 'Led rebranding project featured in Communication Arts and Print Magazine' },
                { achievementText: 'Directed photo and video shoots with budgets up to $500K' }
            ]
        },
        {
            jobTitle: 'Art Director',
            companyName: 'Digital First Agency',
            location: 'San Francisco, CA',
            startDate: '2013-06',
            endDate: '2015-12',
            isCurrent: false,
            roleDescription: 'Designed digital-first campaigns for tech startups.',
            achievements: [
                { achievementText: 'Created viral social campaign reaching 50M+ users organically' },
                { achievementText: 'Designed UI/UX for mobile app with 4.8 App Store rating' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'School of Visual Arts',
            degree: 'Bachelor of Fine Arts',
            fieldOfStudy: 'Advertising',
            location: 'New York, NY',
            endYear: 2013
        }
    ],
    skills: [
        { skillName: 'Creative Direction', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Brand Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Adobe Creative Suite', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Figma', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Art Direction', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Copywriting', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Video Production', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    achievements: [
        {
            achievementTitle: 'Gold Lion - Cannes Lions',
            issuingBody: 'Cannes Lions International Festival',
            year: 2022,
            description: 'Best Use of AR/VR Technology'
        },
        {
            achievementTitle: 'D&AD Yellow Pencil',
            issuingBody: 'D&AD Awards',
            year: 2021,
            description: 'Brand Identity Design'
        }
    ],
    customSections: [
        {
            title: 'Featured Work',
            items: [
                { text: 'Nike "Just Do It" Campaign Refresh - 100M+ Impressions' },
                { text: 'Spotify Brand Evolution - Featured in Fast Company' }
            ]
        }
    ]
}

// --- 15. Professional Template Persona ---
export const MOCK_PROFESSIONAL_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-professional-template',
    title: 'Professional Resume',
    documentType: 'resume',
    templateId: 'professional',
    personalInfo: {
        fullName: 'Daniel Foster',
        professionalTitle: 'Business Development Manager',
        email: 'daniel.foster@bizdev.com',
        phone: '+1 (555) 999-0000',
        city: 'Dallas',
        country: 'TX',
        location: 'Dallas, TX',
        linkedinUrl: 'linkedin.com/in/danielfoster-bd'
    },
    professionalSummary: {
        summaryText: 'Strategic Business Development Manager with 8+ years of experience driving revenue growth and forging strategic partnerships. Proven track record of exceeding sales targets by 30%+ annually and closing deals worth $50M+. Expert in relationship building, contract negotiation, and market expansion. Strong analytical skills combined with exceptional communication abilities.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Business Development Manager',
            companyName: 'Enterprise Solutions Group',
            location: 'Dallas, TX',
            startDate: '2020-04',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading business development initiatives for enterprise software company.',
            achievements: [
                { achievementText: 'Generated $25M in new business revenue over 3 years' },
                { achievementText: 'Established strategic partnerships with 15 Fortune 500 companies' },
                { achievementText: 'Expanded market presence into 3 new geographic regions' },
                { achievementText: 'Achieved 135% of annual quota for 3 consecutive years' }
            ]
        },
        {
            jobTitle: 'Business Development Associate',
            companyName: 'TechVentures Inc',
            location: 'Austin, TX',
            startDate: '2016-08',
            endDate: '2020-03',
            isCurrent: false,
            roleDescription: 'Identified and pursued new business opportunities in technology sector.',
            achievements: [
                { achievementText: 'Closed 40+ deals with average contract value of $500K' },
                { achievementText: 'Built pipeline of $15M in qualified opportunities' },
                { achievementText: 'Reduced sales cycle from 9 months to 6 months through process optimization' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Texas at Dallas',
            degree: 'Bachelor of Business Administration',
            fieldOfStudy: 'Marketing',
            location: 'Dallas, TX',
            endYear: 2016,
            gpa: '3.6'
        }
    ],
    skills: [
        { skillName: 'Business Development', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Strategic Partnerships', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Salesforce CRM', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Contract Negotiation', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Market Analysis', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Presentation Skills', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'Certified Business Development Professional',
            issuingOrganization: 'CBDP',
            issueYear: 2019
        }
    ]
}

// --- 16. Luxe Template Persona ---
export const MOCK_LUXE_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-luxe-template',
    title: 'Luxury Executive Resume',
    documentType: 'resume',
    templateId: 'luxe',
    personalInfo: {
        fullName: 'Sophia Laurent',
        professionalTitle: 'Luxury Brand Director',
        email: 'sophia.laurent@luxebrands.com',
        phone: '+33 6 12 34 56 78',
        city: 'Paris',
        country: 'France',
        location: 'Paris, France',
        linkedinUrl: 'linkedin.com/in/sophialaurent',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Distinguished Luxury Brand Director with 15+ years of experience in haute couture and premium lifestyle sectors. Expert in brand positioning, heritage storytelling, and cultivating exclusive clientele relationships. Proven success in elevating brand prestige while driving 40%+ revenue growth. Fluent in French, English, and Italian with deep understanding of global luxury markets.'
    },
    workExperience: [
        {
            jobTitle: 'Brand Director',
            companyName: 'Maison de Luxe',
            location: 'Paris, France',
            startDate: '2018-09',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Overseeing brand strategy and global market positioning for prestigious fashion house.',
            achievements: [
                { achievementText: 'Orchestrated brand repositioning increasing average transaction value by 45%' },
                { achievementText: 'Curated exclusive events for UHNW clientele generating €20M in annual revenue' },
                { achievementText: 'Expanded brand presence into Asian markets with 8 flagship boutiques' },
                { achievementText: 'Collaborated with renowned artists on limited edition collections sold out within 48 hours' }
            ]
        },
        {
            jobTitle: 'Senior Marketing Manager',
            companyName: 'Prestige Maison',
            location: 'Milan, Italy',
            startDate: '2013-03',
            endDate: '2018-08',
            isCurrent: false,
            roleDescription: 'Led marketing initiatives for luxury leather goods and accessories.',
            achievements: [
                { achievementText: 'Developed influencer strategy reaching 50M+ affluent consumers' },
                { achievementText: 'Managed €15M marketing budget with 6:1 ROI' },
                { achievementText: 'Launched successful capsule collection in partnership with celebrity designer' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'HEC Paris',
            degree: 'Master in Luxury Brand Management',
            location: 'Paris, France',
            endYear: 2012
        },
        {
            institutionName: 'Sorbonne University',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Art History',
            location: 'Paris, France',
            endYear: 2010
        }
    ],
    skills: [
        { skillName: 'Luxury Brand Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Client Relations (UHNW)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Heritage Storytelling', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Event Curation', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Market Positioning', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    languages: [
        { languageName: 'French', proficiencyLevel: 'native' },
        { languageName: 'English', proficiencyLevel: 'fluent' },
        { languageName: 'Italian', proficiencyLevel: 'fluent' },
        { languageName: 'Mandarin', proficiencyLevel: 'intermediate' }
    ]
}

// --- 17. Startup Template Persona ---
export const MOCK_STARTUP_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-startup-template',
    title: 'Startup Resume',
    documentType: 'resume',
    templateId: 'startup',
    personalInfo: {
        fullName: 'Alex Chen',
        professionalTitle: 'Product Manager | Growth Hacker',
        email: 'alex@startupmail.io',
        phone: '+1 (555) 123-9999',
        city: 'San Francisco',
        country: 'CA',
        location: 'San Francisco, CA',
        linkedinUrl: 'linkedin.com/in/alexchen-pm',
        websiteUrl: 'alexchen.io'
    },
    professionalSummary: {
        summaryText: 'Entrepreneurial Product Manager with 6+ years of experience building 0-to-1 products in fast-paced startup environments. Expert in lean methodology, growth hacking, and data-driven product decisions. Successfully launched 5 products with combined 2M+ users. Passionate about solving hard problems and creating products people love.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Product Manager',
            companyName: 'RocketShip (YC S21)',
            location: 'San Francisco, CA',
            startDate: '2022-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading product for Series B fintech startup disrupting payments.',
            achievements: [
                { achievementText: 'Launched MVP in 8 weeks, acquired 100K users in first 3 months' },
                { achievementText: 'Drove 10x user growth through viral referral mechanics' },
                { achievementText: 'Improved activation rate from 15% to 45% through onboarding optimization' },
                { achievementText: 'Led product strategy for successful $30M Series B raise' }
            ]
        },
        {
            jobTitle: 'Product Manager',
            companyName: 'GrowthLabs (Acquired)',
            location: 'Palo Alto, CA',
            startDate: '2019-06',
            endDate: '2021-12',
            isCurrent: false,
            roleDescription: 'Built growth team and owned entire product lifecycle.',
            achievements: [
                { achievementText: 'Scaled product from 0 to 500K users in 18 months' },
                { achievementText: 'Implemented growth experiments increasing MRR by 200%' },
                { achievementText: 'Led product through acquisition by Fortune 500 company' }
            ]
        },
        {
            jobTitle: 'Associate Product Manager',
            companyName: 'TechStartup Inc',
            location: 'Mountain View, CA',
            startDate: '2018-01',
            endDate: '2019-05',
            isCurrent: false,
            roleDescription: 'First PM hire, wore multiple hats across product and growth.',
            achievements: [
                { achievementText: 'Shipped 15+ features based on user feedback and data analysis' },
                { achievementText: 'Reduced churn by 30% through retention initiatives' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Stanford University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            location: 'Stanford, CA',
            endYear: 2017
        }
    ],
    skills: [
        { skillName: 'Product Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Growth Hacking', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'A/B Testing', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'SQL/Analytics', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Lean Startup', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'User Research', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Figma/Design', skillType: 'technical', proficiencyLevel: 'intermediate' }
    ],
    projects: [
        {
            projectName: 'Side Project - TaskFlow',
            role: 'Founder',
            description: 'Built productivity app as nights/weekends project.',
            outcomes: '10K+ downloads, featured on Product Hunt',
            startDate: '2023',
            endDate: 'Present'
        }
    ]
}

// --- 18. Artisan Template Persona ---
export const MOCK_ARTISAN_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-artisan-template',
    title: 'Artisan Resume',
    documentType: 'resume',
    templateId: 'artisan',
    personalInfo: {
        fullName: 'Maya Patel',
        professionalTitle: 'Ceramic Artist & Studio Owner',
        email: 'maya@artisanstudio.com',
        phone: '+1 (555) 246-8135',
        city: 'Portland',
        country: 'OR',
        location: 'Portland, OR',
        portfolioUrl: 'mayapatelceramics.com',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Award-winning ceramic artist specializing in functional stoneware and sculptural pieces. 12+ years of experience creating handcrafted pottery using traditional techniques and sustainable practices. Work featured in 20+ galleries nationwide and collected by museums. Passionate about teaching ceramics and building community through art.'
    },
    workExperience: [
        {
            jobTitle: 'Owner & Lead Artist',
            companyName: 'Earthen Studio',
            location: 'Portland, OR',
            startDate: '2016-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Operating independent ceramics studio creating custom pieces and teaching workshops.',
            achievements: [
                { achievementText: 'Built thriving studio business with $200K+ annual revenue' },
                { achievementText: 'Created signature collection sold in 15 boutique retailers nationwide' },
                { achievementText: 'Taught 50+ workshops to 500+ students over 7 years' },
                { achievementText: 'Commissioned for large-scale installation at Portland Art Museum' }
            ]
        },
        {
            jobTitle: 'Resident Artist',
            companyName: 'Craftworks Collective',
            location: 'Seattle, WA',
            startDate: '2012-06',
            endDate: '2016-02',
            isCurrent: false,
            roleDescription: 'Created functional pottery and taught community classes.',
            achievements: [
                { achievementText: 'Developed unique glaze formulations featured in Ceramics Monthly' },
                { achievementText: 'Sold work at 10+ juried craft fairs with $50K+ in sales' },
                { achievementText: 'Mentored 5 emerging ceramic artists' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Rhode Island School of Design',
            degree: 'Master of Fine Arts',
            fieldOfStudy: 'Ceramics',
            location: 'Providence, RI',
            endYear: 2012
        },
        {
            institutionName: 'Portland State University',
            degree: 'Bachelor of Fine Arts',
            fieldOfStudy: 'Studio Art',
            location: 'Portland, OR',
            endYear: 2009
        }
    ],
    skills: [
        { skillName: 'Wheel Throwing', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Glaze Chemistry', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Kiln Firing', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Hand Building', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Teaching/Instruction', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Small Business Management', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    achievements: [
        {
            achievementTitle: 'Best in Show',
            issuingBody: 'American Craft Council',
            year: 2021,
            description: 'Portland Craft Fair'
        },
        {
            achievementTitle: 'Emerging Artist Award',
            issuingBody: 'National Council on Education for the Ceramic Arts',
            year: 2015
        }
    ],
    customSections: [
        {
            title: 'Exhibitions',
            items: [
                { text: 'Solo Exhibition - "Earth & Fire" at Portland Contemporary (2023)' },
                { text: 'Group Show - Museum of Arts and Design, New York (2022)' },
                { text: 'Juried Exhibition - Smithsonian Craft Show, Washington DC (2020)' }
            ]
        }
    ]
}

// --- 19. Split Contrast Template Persona ---
export const MOCK_SPLIT_CONTRAST_DATA: ResumeDocument = {
    id: 'preview-split-contrast',
    title: 'Split Contrast Resume',
    documentType: 'resume',
    templateId: 'split-contrast',
    personalInfo: {
        fullName: 'Marcus Thompson',
        professionalTitle: 'Cybersecurity Analyst',
        email: 'marcus.thompson@securemail.com',
        phone: '+1 (555) 369-2580',
        city: 'Washington',
        country: 'DC',
        location: 'Washington, DC',
        linkedinUrl: 'linkedin.com/in/marcusthompson-security'
    },
    professionalSummary: {
        summaryText: 'Dedicated Cybersecurity Analyst with 7+ years of experience protecting enterprise systems and data. Expert in threat detection, incident response, and security architecture. CISSP certified with proven track record of preventing security breaches and reducing vulnerabilities by 80%. Strong technical skills combined with ability to communicate complex security concepts to non-technical stakeholders.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Cybersecurity Analyst',
            companyName: 'Federal Security Solutions',
            location: 'Washington, DC',
            startDate: '2020-07',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading security operations for government contractor protecting critical infrastructure.',
            achievements: [
                { achievementText: 'Detected and mitigated 50+ security threats preventing potential data breaches' },
                { achievementText: 'Implemented SIEM solution reducing incident response time by 60%' },
                { achievementText: 'Conducted security audits identifying and remediating 200+ vulnerabilities' },
                { achievementText: 'Led team of 5 analysts in 24/7 security operations center' }
            ]
        },
        {
            jobTitle: 'Cybersecurity Analyst',
            companyName: 'TechDefense Corp',
            location: 'Arlington, VA',
            startDate: '2017-03',
            endDate: '2020-06',
            isCurrent: false,
            roleDescription: 'Monitored networks and systems for security incidents.',
            achievements: [
                { achievementText: 'Responded to 100+ security incidents with 99% resolution rate' },
                { achievementText: 'Developed security policies adopted across organization' },
                { achievementText: 'Achieved zero successful phishing attacks through employee training program' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'George Washington University',
            degree: 'Master of Science',
            fieldOfStudy: 'Cybersecurity',
            location: 'Washington, DC',
            endYear: 2019
        },
        {
            institutionName: 'Virginia Tech',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            location: 'Blacksburg, VA',
            endYear: 2016
        }
    ],
    skills: [
        { skillName: 'Threat Detection', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Incident Response', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'SIEM (Splunk)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Penetration Testing', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Network Security', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Python/Scripting', skillType: 'technical', proficiencyLevel: 'intermediate' }
    ],
    certifications: [
        {
            certificationName: 'Certified Information Systems Security Professional (CISSP)',
            issuingOrganization: 'ISC2',
            issueYear: 2021
        },
        {
            certificationName: 'Certified Ethical Hacker (CEH)',
            issuingOrganization: 'EC-Council',
            issueYear: 2019
        },
        {
            certificationName: 'CompTIA Security+',
            issuingOrganization: 'CompTIA',
            issueYear: 2017
        }
    ]
}

// --- 20. Compact Template Persona ---
export const MOCK_COMPACT_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-compact-template',
    title: 'Compact Resume',
    documentType: 'resume',
    templateId: 'compact',
    personalInfo: {
        fullName: 'Lisa Anderson',
        professionalTitle: 'Administrative Manager',
        email: 'lisa.anderson@office.com',
        phone: '+1 (555) 147-2589',
        city: 'Minneapolis',
        country: 'MN',
        location: 'Minneapolis, MN',
        linkedinUrl: 'linkedin.com/in/lisaanderson-admin'
    },
    professionalSummary: {
        summaryText: 'Highly organized Administrative Manager with 10+ years of experience supporting C-level executives and managing office operations. Expert in streamlining processes, coordinating complex schedules, and maintaining confidentiality. Proficient in Microsoft Office Suite and project management tools. Known for exceptional attention to detail and proactive problem-solving.'
    },
    workExperience: [
        {
            jobTitle: 'Administrative Manager',
            companyName: 'Corporate Headquarters Inc',
            location: 'Minneapolis, MN',
            startDate: '2018-05',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Managing administrative operations for executive team of 8 C-suite leaders.',
            achievements: [
                { achievementText: 'Streamlined expense reporting process saving 20 hours per month' },
                { achievementText: 'Coordinated 50+ executive meetings and events annually' },
                { achievementText: 'Implemented new filing system improving document retrieval by 40%' },
                { achievementText: 'Supervised team of 4 administrative assistants' }
            ]
        },
        {
            jobTitle: 'Executive Assistant',
            companyName: 'Business Solutions Group',
            location: 'St. Paul, MN',
            startDate: '2014-02',
            endDate: '2018-04',
            isCurrent: false,
            roleDescription: 'Provided high-level administrative support to CEO and COO.',
            achievements: [
                { achievementText: 'Managed complex calendars with 100+ appointments monthly' },
                { achievementText: 'Organized international travel for 20+ business trips per year' },
                { achievementText: 'Prepared presentations and reports for board meetings' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Minnesota',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Business Administration',
            location: 'Minneapolis, MN',
            endYear: 2013
        }
    ],
    skills: [
        { skillName: 'Office Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Microsoft Office Suite', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Calendar Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Project Coordination', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Communication', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Problem Solving', skillType: 'professional', proficiencyLevel: 'advanced' }
    ]
}

// --- 21. Graduate Template Persona ---
export const MOCK_GRADUATE_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-graduate-template',
    title: 'Graduate Resume',
    documentType: 'resume',
    templateId: 'graduate',
    personalInfo: {
        fullName: 'Taylor Brooks',
        professionalTitle: 'Recent Finance Graduate',
        email: 'taylor.brooks@university.edu',
        phone: '+1 (555) 753-9514',
        city: 'Boston',
        country: 'MA',
        location: 'Boston, MA',
        linkedinUrl: 'linkedin.com/in/taylorbrooks-finance'
    },
    professionalSummary: {
        summaryText: 'Motivated finance graduate with strong analytical skills and passion for investment banking. Completed rigorous coursework in financial modeling, corporate finance, and valuation. Gained practical experience through competitive internship at top-tier investment bank. Seeking analyst position to leverage quantitative skills and drive value for clients.'
    },
    workExperience: [
        {
            jobTitle: 'Investment Banking Summer Analyst',
            companyName: 'Goldman Sachs',
            location: 'New York, NY',
            startDate: '2023-06',
            endDate: '2023-08',
            isCurrent: false,
            roleDescription: 'Supported M&A team in executing transactions for healthcare clients.',
            achievements: [
                { achievementText: 'Built financial models for 3 M&A transactions totaling $2B in deal value' },
                { achievementText: 'Prepared pitch books and presentations for client meetings' },
                { achievementText: 'Conducted industry research and comparable company analysis' },
                { achievementText: 'Received offer for full-time analyst position' }
            ]
        },
        {
            jobTitle: 'Finance Intern',
            companyName: 'Boston Consulting Group',
            location: 'Boston, MA',
            startDate: '2022-06',
            endDate: '2022-08',
            isCurrent: false,
            roleDescription: 'Assisted consulting team with financial analysis for client projects.',
            achievements: [
                { achievementText: 'Analyzed financial statements for Fortune 500 client' },
                { achievementText: 'Created Excel models to support strategic recommendations' },
                { achievementText: 'Presented findings to senior partners and clients' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Boston College',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Finance',
            location: 'Chestnut Hill, MA',
            endYear: 2024,
            gpa: '3.85',
            achievements: 'Summa Cum Laude, Dean\'s List (All Semesters)',
            coursework: 'Corporate Finance, Investment Analysis, Financial Modeling, Econometrics'
        }
    ],
    skills: [
        { skillName: 'Financial Modeling', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Excel (VBA)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Valuation', skillType: 'professional', proficiencyLevel: 'intermediate' },
        { skillName: 'Bloomberg Terminal', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'PowerPoint', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Financial Analysis', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    volunteerExperience: [
        {
            roleTitle: 'Treasurer',
            organizationName: 'Finance Club',
            startDate: '2022',
            endDate: '2024',
            contributions: 'Managed $25,000 budget and organized networking events with 200+ attendees'
        }
    ],
    certifications: [
        {
            certificationName: 'Bloomberg Market Concepts (BMC)',
            issuingOrganization: 'Bloomberg',
            issueYear: 2023
        }
    ]
}

// --- 22. Cute Template Persona ---
export const MOCK_CUTE_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-cute-template',
    title: 'Cute Resume',
    documentType: 'resume',
    templateId: 'cute',
    personalInfo: {
        fullName: 'Emma Rose',
        professionalTitle: 'Social Media Coordinator',
        email: 'emma.rose@creative.com',
        phone: '+1 (555) 852-9630',
        city: 'Austin',
        country: 'TX',
        location: 'Austin, TX',
        linkedinUrl: 'linkedin.com/in/emmarose-social',
        portfolioUrl: 'emmarose.co'
    },
    professionalSummary: {
        summaryText: 'Creative and enthusiastic Social Media Coordinator with 4+ years of experience building engaging online communities. Passionate about creating authentic content that resonates with audiences. Expert in Instagram, TikTok, and emerging platforms. Proven ability to grow followers by 300%+ and drive meaningful engagement through storytelling and visual creativity.'
    },
    workExperience: [
        {
            jobTitle: 'Social Media Coordinator',
            companyName: 'Bloom Beauty Co',
            location: 'Austin, TX',
            startDate: '2021-09',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Managing social media presence for sustainable beauty brand.',
            achievements: [
                { achievementText: 'Grew Instagram following from 5K to 50K in 2 years' },
                { achievementText: 'Created viral TikTok content reaching 5M+ views' },
                { achievementText: 'Increased engagement rate from 2% to 8% through authentic storytelling' },
                { achievementText: 'Collaborated with 20+ micro-influencers on successful campaigns' }
            ]
        },
        {
            jobTitle: 'Social Media Intern',
            companyName: 'Creative Collective',
            location: 'Austin, TX',
            startDate: '2020-06',
            endDate: '2021-08',
            isCurrent: false,
            roleDescription: 'Supported social media team for lifestyle brand clients.',
            achievements: [
                { achievementText: 'Created content calendars for 5 client accounts' },
                { achievementText: 'Designed graphics and wrote copy for 100+ social posts' },
                { achievementText: 'Monitored analytics and provided monthly performance reports' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Texas at Austin',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Communications',
            location: 'Austin, TX',
            endYear: 2020,
            gpa: '3.5'
        }
    ],
    skills: [
        { skillName: 'Social Media Strategy', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Content Creation', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Canva', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Instagram/TikTok', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Copywriting', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Community Management', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Photography', skillType: 'technical', proficiencyLevel: 'intermediate' }
    ],
    projects: [
        {
            projectName: 'Personal Brand - @EmmaRoseCreates',
            role: 'Creator',
            description: 'Built personal brand sharing social media tips and creative inspiration.',
            outcomes: '15K followers, partnered with 5 brands',
            startDate: '2021',
            endDate: 'Present'
        }
    ]
}

export const MOCK_PERSONAS = {
    creative: MOCK_CREATIVE_TEMPLATE_DATA, // Updated
    executive: MOCK_EXECUTIVE_TEMPLATE_DATA, // Updated
    graduate: MOCK_GRADUATE_TEMPLATE_DATA, // Updated
    nurse_experienced: MOCK_NURSE_EXPERIENCED_DATA,
    nurse_entry: MOCK_NURSE_ENTRY_DATA,
    technical: MOCK_TECHNICAL_TEMPLATE_DATA, // Updated
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
    service_pro: MOCK_SERVICE_PRO_DATA,
    // New templates added
    professional: MOCK_PROFESSIONAL_TEMPLATE_DATA,
    luxe: MOCK_LUXE_TEMPLATE_DATA,
    startup: MOCK_STARTUP_TEMPLATE_DATA,
    artisan: MOCK_ARTISAN_TEMPLATE_DATA,
    split_contrast: MOCK_SPLIT_CONTRAST_DATA,
    compact: MOCK_COMPACT_TEMPLATE_DATA,
    cute: MOCK_CUTE_TEMPLATE_DATA
}
