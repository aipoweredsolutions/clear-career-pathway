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
            location: 'Boston, MA (Hybrid)',
            startDate: '2023-06',
            endDate: '2023-08',
            isCurrent: false,
            roleDescription: 'Developed full-stack features for internal analytics dashboard serving 500+ daily active users.',
            achievements: [
                { achievementText: 'Optimized complex SQL queries, reducing dashboard load time by 40% and improving overall UX' },
                { achievementText: 'Implemented an automated testing suite utilizing Jest and PyTest, covering 90% of the new codebase' },
                { achievementText: 'Collaborated with cross-functional teams to integrate OAuth 2.0 authentication protocols securely' }
            ]
        },
        {
            jobTitle: 'Research Assistant (AI/ML)',
            companyName: 'MIT CSAIL',
            location: 'Cambridge, MA',
            startDate: '2022-09',
            endDate: '2023-05',
            isCurrent: false,
            roleDescription: 'Assisted in research on weak supervision and zero-shot learning models under Prof. Harrison.',
            achievements: [
                { achievementText: 'Co-authored a research paper on natural language processing submitted to NeurIPS 2023' },
                { achievementText: 'Engineered a scalable data processing pipeline in Python for cleaning and analyzing a 1TB+ dataset' },
                { achievementText: 'Trained and fine-tuned BERT-based transformer models on high-performance computing clusters' }
            ]
        },
        {
            jobTitle: 'Teaching Assistant (Data Structures)',
            companyName: 'MIT Department of EECS',
            location: 'Cambridge, MA',
            startDate: '2022-01',
            endDate: '2022-05',
            isCurrent: false,
            roleDescription: 'Led recitation sections and provided academic support for 60+ undergraduate students.',
            achievements: [
                { achievementText: 'Hosted weekly office hours to assist students with algorithm optimization and debugging in C++' },
                { achievementText: 'Graded assignments and provided detailed feedback, maintaining an average student rating of 4.8/5.0' }
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
        professionalTitle: 'Critical Care Nurse Specialist & Unit Lead',
        email: 'sarah.jenkins.rn@example.com',
        phone: '+1 (555) 555-0123',
        city: 'Chicago',
        country: 'IL',
        location: 'Chicago, IL',
        linkedinUrl: 'linkedin.com/in/sarahjenkinsrn',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        headline: 'CCRN Certified ICU Nurse with 12+ Years Excellence',
        summaryText: 'Compassionate, resilient, and highly skilled Critical Care Registered Nurse with over 12 years of experience in high-acuity Level I Trauma Centers. Expert in advanced life support protocols, complex patient stabilization, and interdisciplinary collaboration in high-pressure environments. Proven track record of improving patient outcomes through evidence-based practice, rigid protocol adherence, and the mentorship of 30+ junior nursing staff. CCRN and TNCC certified with deep expertise in ventilator management, CRRT, and hemodynamic monitoring. Dedicated to delivering dignified, high-quality care to patients and their families during their most critical moments.'
    },
    workExperience: [
        {
            jobTitle: 'Senior ICU Nurse & Unit Lead (CCRN)',
            companyName: 'Chicago Memorial Hospital',
            location: 'Chicago, IL',
            startDate: '2018-05',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Lead nurse for a high-acuity 20-bed Medical ICU, overseeing the clinical care of patients requiring mechanical ventilation, CRRT, and advanced hemodynamic support.',
            achievements: [
                { achievementText: 'Reduced ventilator-associated pneumonia (VAP) rates by 40% over three years through the implementation of a strict "VAP Bundle" compliance initiative' },
                { achievementText: 'Precepted and successfully onboarded 25+ new graduate nurses and travel nurses, ensuring rapid unit integration and clinical skill acquisition' },
                { achievementText: 'Served as a core member of the Rapid Response Team (RRT), responding to 50+ critical calls annually with a 95% successful resuscitation and stabilization rate' },
                { achievementText: 'Collaborated with the Pulmonary team to implement early mobility protocols for intubated patients, reducing average ICU length of stay by 1.5 days' },
                { achievementText: 'Chaired the Unit Practice Council (UPC), leading several quality improvement projects that resulted in a 20% increase in staff retention' },
                { achievementText: 'Maintained 100% accuracy in the documentation of complex patient data using Epic EHR, ensuring seamless care transitions during shift handovers' }
            ]
        },
        {
            jobTitle: 'Registered Nurse - Progressive Care / Telemetry',
            companyName: 'Lakeside Medical Center',
            location: 'Evanston, IL',
            startDate: '2014-06',
            endDate: '2018-04',
            isCurrent: false,
            roleDescription: 'Provided specialized nursing care for cardiac and post-surgical patients requiring continuous rhythm monitoring.',
            achievements: [
                { achievementText: 'Recognized as "Nurse of the Year" in 2016 for exceptional clinical judgment and advocacy for patient family members' },
                { achievementText: 'Implemented a new "Bedside Shift Report" protocol that increased HCAHPS patient satisfaction scores by 15% within the first year' },
                { achievementText: 'Consistently managed a 4:1 patient-to-nurse ratio on a busy telemetry floor while maintaining 98% positive peer review scores' },
                { achievementText: 'Acted as the "Charge Nurse" during night shifts, managing unit staffing and troubleshooting clinical emergencies' }
            ]
        },
        {
            jobTitle: 'Medical-Surgical Nurse',
            companyName: 'Mercy General Hospital',
            location: 'Chicago, IL',
            startDate: '2012-06',
            endDate: '2014-05',
            isCurrent: false,
            roleDescription: 'Managed comprehensive care for a diverse patient population on a busy 30-bed Med-Surg and post-operative unit.',
            achievements: [
                { achievementText: 'Administered complex medication regimens and treatments to 6-8 patients per shift with zero clinical errors over 2 years' },
                { achievementText: 'Participated in the hospital-wide Wound Care Committee, helping to modernize pressure ulcer prevention and treatment protocols' },
                { achievementText: 'Commended by hospital leadership for excellence in discharge planning and thorough patient education, reducing 30-day readmission rates' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Illinois at Chicago',
            degree: 'Bachelor of Science in Nursing (BSN)',
            location: 'Chicago, IL',
            endYear: 2012,
            gpa: '3.8',
            achievements: 'Magna Cum Laude, Sigma Theta Tau International Honor Society of Nursing'
        }
    ],
    skills: [
        { skillName: 'Critical Care Nursing (ICU/CCU)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Advanced Cardiac Life Support (ACLS)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Ventilator & Airway Management', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Hemodynamic Monitoring (Swan-Ganz)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Epic EHR & Documentation', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Patient & Family Advocacy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Clinical Precepting & Mentorship', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Infection Control & Prevention', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'Critical Care Registered Nurse (CCRN)',
            issuingOrganization: 'AACN',
            issueYear: 2019
        },
        {
            certificationName: 'Trauma Nursing Core Course (TNCC)',
            issuingOrganization: 'Emergency Nurses Association',
            issueYear: 2018
        },
        {
            certificationName: 'Advanced Cardiac Life Support (ACLS)',
            issuingOrganization: 'American Heart Association',
            issueYear: 2012
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
        professionalTitle: 'Registered Nurse (RN) | BSN Graduate',
        email: 'm.ross@example.com',
        phone: '+1 (555) 999-8888',
        city: 'Seattle',
        country: 'WA',
        location: 'Seattle, WA',
        linkedinUrl: 'linkedin.com/in/michaelrossrn'
    },
    professionalSummary: {
        summaryText: 'Dedicated and highly energetic Registered Nurse with recent BSN graduate status and comprehensive clinical rotation experience in Pediatrics, Medical-Surgical, and Emergency Room settings. Proven ability to remain calm and effective in fast-paced environments. Passionate about pediatric patient care, family education, and evidence-based practice. Strong technical foundation in physical assessment, medication administration, and electronic health records (Epic). Eager to launch a nursing career at a premier healthcare institution like Seattle Children\'s Hospital, contributing to high-quality patient outcomes and team excellence.'
    },
    education: [
        {
            institutionName: 'University of Washington',
            degree: 'Bachelor of Science in Nursing (BSN)',
            location: 'Seattle, WA',
            endYear: 2024,
            gpa: '3.85',
            achievements: 'President\'s List (All Semesters), Pediatric Nursing Clinical Excellence Award, Alpha Tau Delta Professional Nursing Fraternity'
        }
    ],
    workExperience: [
        {
            jobTitle: 'Certified Nursing Assistant (CNA)',
            companyName: 'Evergreen Senior Living',
            location: 'Bellevue, WA',
            startDate: '2022-01',
            endDate: '2024-05',
            isCurrent: true,
            roleDescription: 'Provided compassionate daily living assistance and basic clinical support to 15+ residents in a premier assisted living facility while concurrently completing a full-time BSN program.',
            achievements: [
                { achievementText: 'Maintained a 100% attendance record and repeatedly commended by family members for compassionate and dignified bedside manner' },
                { achievementText: 'Assisted in organizing and leading therapeutic recreational activities, resulting in a documented 20% increase in resident social engagement' },
                { achievementText: 'Collaborated closely with the nursing staff to report subtle changes in resident vital signs or condition, preventing several potential medical emergencies' }
            ]
        },
        {
            jobTitle: 'Pediatric Clinical Rotation (Student Nurse)',
            companyName: 'Seattle Children\'s Hospital',
            location: 'Seattle, WA',
            startDate: '2023-09',
            endDate: '2023-12',
            isCurrent: false,
            roleDescription: 'Completed 120 hours of intensive clinical practice in an acute pediatric care unit, managing diverse patient cases under licensed supervision.',
            achievements: [
                { achievementText: 'Assisted in the care of 4-5 pediatric patients per shift, conducting head-to-toe assessments and documenting vital signs with high precision' },
                { achievementText: 'Developed age-appropriate educational materials for pediatric diabetic patients and their families, improving discharge readiness' },
                { achievementText: 'Obtained hands-on experience in pediatric IV therapy, catheterization, and post-operative recovery monitoring' }
            ]
        },
        {
            jobTitle: 'Medical-Surgical Clinical Rotation',
            companyName: 'Harborview Medical Center',
            location: 'Seattle, WA',
            startDate: '2023-01',
            endDate: '2023-04',
            isCurrent: false,
            roleDescription: 'Completed 90 hours of clinical practice on a high-acuity Level I trauma unit, focusing on complex surgical recovery.',
            achievements: [
                { achievementText: 'Administered oral and IV medications under instructor supervision with zero clinical errors during the entire rotation' },
                { achievementText: 'Performed complex wound dressing changes, central line care, and Foley catheter insertions for post-operative trauma patients' },
                { achievementText: 'Participated actively in daily interdisciplinary rounds, presenting concise patient updates to the attending surgical team' },
                { achievementText: 'Demonstrated proficiency in Epic EHR for real-time charting of patient assessments, interventions, and care plans' }
            ]
        },
        {
            jobTitle: 'Emergency Room Shadow Program',
            companyName: 'Swedish Medical Center',
            location: 'Seattle, WA',
            startDate: '2022-09',
            endDate: '2022-12',
            isCurrent: false,
            roleDescription: 'Shadowed senior RNs in a high-volume urban emergency department to gain exposure to acute triage and stabilization.',
            achievements: [
                { achievementText: 'Assisted in rapid triage assessments and ensured safe patient transport to appropriate care bays during surge periods' },
                { achievementText: 'Gained intensive exposure to acute trauma interventions, stroke protocols, and critical patient stabilization techniques' }
            ]
        }
    ],
    skills: [
        { skillName: 'Pediatric Acute Care', skillType: 'professional', proficiencyLevel: 'intermediate' },
        { skillName: 'Patient & Family Education', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Medication Administration (IV/Oral)', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Physical Assessment (Head-to-Toe)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Epic EHR & Documentation', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Wound Care & Sterile Technique', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Crisis Intervention & Stress Residency', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Infection Control Protocols', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'Basic Life Support (BLS)',
            issuingOrganization: 'American Heart Association',
            issueYear: 2023
        },
        {
            certificationName: 'Certified Nursing Assistant (CNA)',
            issuingOrganization: 'Washington State Department of Health',
            issueYear: 2021
        }
    ],
    volunteerExperience: [
        {
            roleTitle: 'Medical First Aid Volunteer',
            organizationName: 'Seattle Marathon',
            startDate: '2023-11',
            endDate: '2023-11',
            contributions: 'Provided critical first aid, monitoring, and hydration support at the finish-line medical tents for 5,000+ runners.'
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
            roleDescription: 'Managed infrastructure for an enterprise real-time data processing pipeline handling 50TB+ daily operations.',
            achievements: [
                { achievementText: 'Migrated legacy monolithic applications to a microservices architecture on AWS ECS, improving deployment velocity by 3x' },
                { achievementText: 'Built an automated, multi-region disaster recovery system utilizing Terraform, achieving an RTO of < 15 minutes' },
                { achievementText: 'Integrated Datadog and PagerDuty for comprehensive monitoring and incident response, reducing MTTR by 45%' },
                { achievementText: 'Mentored a team of 3 junior engineers on infrastructure-as-code best practices and Linux system administration' }
            ]
        },
        {
            jobTitle: 'Cloud Infrastructure Engineer',
            companyName: 'FinServe Analytics',
            location: 'Chicago, IL',
            startDate: '2015-06',
            endDate: '2018-01',
            isCurrent: false,
            roleDescription: 'Maintained secure cloud environments for a fintech startup subject to strict SOC2 compliance.',
            achievements: [
                { achievementText: 'Implemented automated security scanning in Jenkins CI pipelines using SonarQube and Trivy' },
                { achievementText: 'Optimized AWS RDS instances and caching layers, leading to a 30% reduction in database latency' },
                { achievementText: 'Automated routine server patching and AMI generation via HashiCorp Packer and Ansible' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Illinois at Urbana-Champaign',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Engineering',
            location: 'Urbana, IL',
            endYear: 2015,
            gpa: '3.7'
        }
    ],
    projects: [
        {
            projectName: 'Open Source Kubernetes Scaler',
            role: 'Creator & Maintainer',
            description: 'A custom K8s controller written in Go that scales pods based on external metrics (e.g., Kafka lag).',
            toolsUsed: ['Go', 'Kubernetes', 'Docker'],
            outcomes: 'Garnered 1.2k+ GitHub stars; featured in KubeWeekly newsletter.',
            startDate: '2022-01',
            endDate: 'Present'
        }
    ],
    certifications: [
        {
            certificationName: 'AWS Certified Solutions Architect – Professional',
            issuingOrganization: 'Amazon Web Services',
            issueYear: 2022
        },
        {
            certificationName: 'Certified Kubernetes Administrator (CKA)',
            issuingOrganization: 'Cloud Native Computing Foundation',
            issueYear: 2021
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
        summaryText: 'Award-winning General Manager with 15+ years of experience in luxury hospitality and resort management. Proven expertise in opening 5-star properties, driving operational excellence, and curating exceptional guest experiences for high-net-worth individuals. Recognized for increasing REVPAR by 25% year-over-year while maintaining Forbes 5-Star status. Expert in P&L management, strategic branding, and building diverse, high-performing service teams in competitive international markets. Bilingual leader focused on staff retention, operational efficiency, and long-term guest loyalty.'
    },
    skills: [
        { skillName: 'Luxury Operations', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Revenue Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Guest Relations', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'P&L Management ($40M+)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Team Leadership (200+)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Strategic Planning', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Food & Beverage Ops', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Opera / HMS Systems', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Crisis Management', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Sustainability Initiatives', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    workExperience: [
        {
            jobTitle: 'General Manager',
            companyName: 'The Azure Resort & Spa',
            location: 'Miami Beach, FL',
            startDate: '2019-05',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Overseeing all operations for a 250-room luxury oceanfront resort with multiple F&B outlets, a world-class spa, and extensive event spaces.',
            achievements: [
                { achievementText: 'Achieved Forbes 5-Star rating within 18 months of opening through rigorous staff training and service standard implementation' },
                { achievementText: 'Increased gross operating profit by 18% through strategic F&B partnerships and overhead cost optimization' },
                { achievementText: 'Maintained 95% employee retention rate during post-pandemic recovery by implementing wellness and professional development programs' },
                { achievementText: 'Launched "Azure Loyalty Circle," increasing return-guest bookings by 30% in the first year' },
                { achievementText: 'Managed a successful $5M capital expenditure project for beachfront restoration and pool deck upgrades' },
                { achievementText: 'Negotiated high-profile partnerships with international luxury brands for onboard retail and guest amenities' }
            ]
        },
        {
            jobTitle: 'Director of Operations',
            companyName: 'Grand Continental Hotel',
            location: 'Chicago, IL',
            startDate: '2015-02',
            endDate: '2019-04',
            isCurrent: false,
            roleDescription: 'Managed daily operations for a historic 400-room city center hotel catering to corporate and leisure travelers.',
            achievements: [
                { achievementText: 'Spearheaded $12M full-property renovation project completing on time and 5% under budget' },
                { achievementText: 'Implemented new guest feedback system improving TripAdvisor ranking from #25 to #4 within 24 months' },
                { achievementText: 'Reduced utility expenditures by 12% through the implementation of smart-building technologies and sustainability training' },
                { achievementText: 'Revamped the hotel’s flagship restaurant concept, resulting in a 40% increase in non-guest dinner covers' },
                { achievementText: 'Established a mentorship program that promoted 15 junior staff members to management roles' }
            ]
        },
        {
            jobTitle: 'Front Office Manager',
            companyName: 'St. Regis Bal Harbour',
            location: 'Miami, FL',
            startDate: '2011-06',
            endDate: '2015-01',
            isCurrent: false,
            roleDescription: 'Led a team of 45 associates across reception, concierge, and valet services for a premier luxury destination.',
            achievements: [
                { achievementText: 'Maintained a 98% "Likelihood to Recommend" score on internal guest satisfaction surveys' },
                { achievementText: 'Optimized labor costs by 15% through more efficient scheduling based on occupancy forecasting models' },
                { achievementText: 'Coordinated arrivals for high-level diplomatic delegations and celebrities ensuring maximum privacy and security' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Cornell University',
            degree: 'Master of Management in Hospitality',
            location: 'Ithaca, NY',
            endYear: 2014,
            achievements: 'Dean’s List, Excellence in Leadership Award'
        },
        {
            institutionName: 'Ecole hôtelière de Lausanne',
            degree: 'Bachelor in Hospitality Management',
            location: 'Lausanne, Switzerland',
            endYear: 2011,
            achievements: 'Summa Cum Laude'
        }
    ],
    certifications: [
        { certificationName: 'CHAE (Certified Hospitality Accountant Executive)', issuingOrganization: 'HFTP', issueYear: 2018 },
        { certificationName: 'Certification in Hotel Industry Analytics (CHIA)', issuingOrganization: 'AHLEI', issueYear: 2016 },
        { certificationName: 'Sommelier Guild - Level II', issuingOrganization: 'CMS', issueYear: 2013 }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Spanish', proficiencyLevel: 'native' },
        { languageName: 'French', proficiencyLevel: 'fluent' },
        { languageName: 'German', proficiencyLevel: 'intermediate' }
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
        summaryText: 'Dynamic and charismatic Cruise Director with 12+ years of experience on international luxury liners. Expert in large-scale entertainment programming, passenger logistics, and emergency crisis management. Fluent in 4 languages with a consistent track record of achieving highest-in-fleet guest satisfaction scores. Specialized in high-stakes operational coordination, multi-cultural team leadership, and curating world-class onboard enrichment experiences. Certified in advanced maritime safety protocols and passenger psychology.'
    },
    workExperience: [
        {
            jobTitle: 'Cruise Director',
            companyName: 'Royal Horizon Cruises',
            location: 'Mediterranean / Caribbean',
            startDate: '2018-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing total guest entertainment and onboard experience for 3,000+ passengers per voyage, managing a department of 120+ staff.',
            achievements: [
                { achievementText: 'Consistently rated #1 Cruise Director in fleet of 15 ships based on guest NPS and feedback surveys' },
                { achievementText: 'Managed department budget of $4.5M annually with zero overspend while increasing revenue from onboard activities by 22%' },
                { achievementText: 'Redesigned onboard enrichment program featuring industry experts, increasing passenger participation by 45%' },
                { achievementText: 'Orchestrated the launch of "The Theater at Sea," a $25M entertainment venue, coordinating technical and artistic teams' },
                { achievementText: 'Successfully managed 3 emergency dry-dock evacuations with 100% passenger safety compliance and positive sentiment' },
                { achievementText: 'Collaborated with shore-excursion teams to design exclusive private island events for premium tier guests' }
            ]
        },
        {
            jobTitle: 'Assistant Cruise Director',
            companyName: 'Oceanic Voyages',
            location: 'Asia Pacific',
            startDate: '2014-06',
            endDate: '2018-02',
            isCurrent: false,
            roleDescription: 'Supported Cruise Director in daily scheduling, logistics, and hosting of major events for a premium boutique cruise line.',
            achievements: [
                { achievementText: 'Launched new "Cultural Immersion" shore excursion series across 12 Asian ports of call' },
                { achievementText: 'Hosted nightly flagship theater shows for audiences of 1,000+ with 98% positive ratings' },
                { achievementText: 'Improved shore-excursion conversion rates by 15% through more engaging onboard presentations' },
                { achievementText: 'Coordinated complex port-day logistics for over 2,000 passengers in restricted deep-water ports' }
            ]
        },
        {
            jobTitle: 'Entertainment Host',
            companyName: 'Star Lines International',
            location: 'South America',
            startDate: '2012-01',
            endDate: '2014-05',
            isCurrent: false,
            roleDescription: 'Front-line guest engagement role responsible for daytime activities and evening event moderation.',
            achievements: [
                { achievementText: 'Voted "Star Performer of the Year" twice by departmental leadership' },
                { achievementText: 'Assisted in the development of a bilingual daily newsletter distributed to all cabins' },
                { achievementText: 'Successfully managed crowd control for large deck parties and sail-away celebrations' }
            ]
        }
    ],
    skills: [
        { skillName: 'Public Speaking', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Event Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Crisis Management (STCW)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Multicultural Leadership', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Logistical Strategy', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Budget Oversight', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Adobe Creative Suite', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Customer Service Strategy', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'STCW Basic Safety Training (Updated 2023)',
            issuingOrganization: 'Maritime & Coastguard Agency',
            issueYear: 2023
        },
        {
            certificationName: 'Advanced Crowd Management & Passenger Safety',
            issuingOrganization: 'Royal Horizon Training Academy',
            issueYear: 2022
        },
        {
            certificationName: 'Maritime Security Officer (MSO)',
            issuingOrganization: 'International Maritime Security Corp',
            issueYear: 2020
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Italian', proficiencyLevel: 'native' },
        { languageName: 'German', proficiencyLevel: 'fluent' },
        { languageName: 'Spanish', proficiencyLevel: 'fluent' },
        { languageName: 'French', proficiencyLevel: 'intermediate' }
    ],
    customSections: [
        {
            title: 'Fleet Achievements',
            items: [
                { text: 'Recipient of the "Crystal Anchor Award" for Excellence in Service (2023)' },
                { text: 'Featured speaker at the Global Cruise Entertainment Summit (2022)' }
            ]
        }
    ]
}

export const MOCK_ACADEMIC_DATA: ResumeDocument = {
    id: 'preview-academic',
    title: 'Academic CV',
    documentType: 'resume',
    templateId: 'academic',
    personalInfo: {
        fullName: 'Dr. Emily Carter, Ph.D.',
        professionalTitle: 'Assistant Professor of Molecular Biology',
        email: 'e.carter@university.edu',
        phone: '(617) 555-0102',
        city: 'Cambridge',
        country: 'MA',
        location: 'Cambridge, MA',
        websiteUrl: 'scholar.google.com/emilycarter',
        linkedinUrl: 'linkedin.com/in/emilycarter-phd'
    },
    professionalSummary: {
        summaryText: 'Dedicated Research Scientist and Educator with 12+ years of experience specializing in molecular biology, genetics, and CRISPR-Cas9 technologies. Proven track record of securing over $2.5M in competitive federal grant funding (NSF, NIH) and publishing original research in high-impact journals including Nature and Cell. Experienced in leading diverse research laboratories, mentoring over 50 graduate and undergraduate students, and developing innovative curriculum for advanced genomic studies. Committed to fostering inclusive STEM environments and advancing the field through collaborative international research initiatives.'
    },
    workExperience: [
        {
            jobTitle: 'Assistant Professor',
            companyName: 'Cambridge University',
            location: 'Cambridge, MA',
            startDate: '2020-09',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Principal Investigator of the Carter Lab, leading a research team focused on gene editing applications and genomic stability.',
            achievements: [
                { achievementText: 'Awarded $1.2M NSF CAREER Grant for pioneering research on CRISPR-Cas9 off-target mitigation strategies' },
                { achievementText: 'Developed and taught "Advanced Genomic Engineering" (BIO450) to cohorts of 250+ students with 95% positive feedback' },
                { achievementText: 'Established a cross-departmental biotechnology consortium that facilitated 3 major industry-academia partnerships' },
                { achievementText: 'Secured an additional $500K in private foundation funding for lab equipment upgrades and specialized sequencing tools' },
                { achievementText: 'Mentored 4 Ph.D. candidates to successful dissertation defense and placement in top-tier postdoctoral fellowships' }
            ]
        },
        {
            jobTitle: 'Postdoctoral Fellow',
            companyName: 'Broad Institute of MIT and Harvard',
            location: 'Cambridge, MA',
            startDate: '2017-06',
            endDate: '2020-08',
            isCurrent: false,
            roleDescription: 'Conducted high-throughput genomic sequencing research under the direction of Dr. David Liu.',
            achievements: [
                { achievementText: 'Published 3 first-author papers in Nature and Cell, garnering over 800 citations within the first two years' },
                { achievementText: 'Optimized base-editing protocols that improved efficiency by 40% across various mammalian cell lines' },
                { achievementText: 'Co-authored a successful NIH R01 grant application resulting in $2M in total funding' },
                { achievementText: 'Served as a peer reviewer for 5 major scientific journals in the field of molecular genetics' }
            ]
        },
        {
            jobTitle: 'Graduate Research Assistant',
            companyName: 'Stanford University Department of Biology',
            location: 'Stanford, CA',
            startDate: '2012-09',
            endDate: '2017-05',
            isCurrent: false,
            roleDescription: 'Doctoral research focused on epigenetic regulation in Arabidopsis thaliana.',
            achievements: [
                { achievementText: 'Discovered a novel methyltransferase complex involved in stress response pathways' },
                { achievementText: 'Presented research findings at 10+ international conferences, including the Keystone Symposia' },
                { achievementText: 'Recipient of the Stanford Graduate Fellowship (SGF) for outstanding academic potential' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Stanford University',
            degree: 'Ph.D. in Biology',
            location: 'Stanford, CA',
            endYear: 2017,
            achievements: 'Dissertation: "Mechanisms of Epigenetic Inheritance and Genomic Stability"'
        },
        {
            institutionName: 'Yale University',
            degree: 'Bachelor of Science in Molecular Biology',
            location: 'New Haven, CT',
            endYear: 2012,
            achievements: 'Summa Cum Laude, Phi Beta Kappa, Beckman Scholars Program'
        }
    ],
    publications: [
        {
            title: 'Novel Mechanisms of CRISPR-Cas9 Specificity and Off-Target Prevention',
            platformOrPublisher: 'Nature',
            publicationYear: 2019,
            url: 'nature.com/articles/xxxx'
        },
        {
            title: 'Genomic Editing in Mammalian Cells via Prime Editing Systems',
            platformOrPublisher: 'Cell',
            publicationYear: 2018
        },
        {
            title: 'Epigenetic Landscapes of Plant Stress Responses',
            platformOrPublisher: 'Genetics',
            publicationYear: 2016
        },
        {
            title: 'A Comprehensive Manual for Laboratory Gene Editing',
            platformOrPublisher: 'Academic Press',
            publicationYear: 2021
        }
    ],
    skills: [
        { skillName: 'Molecular Cloning', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'CRISPR-Cas9 Systems', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Next-Gen Sequencing (NGS)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Bioinformatics (R/Python)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Confocal Microscopy', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Grant Writing & Administration', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Public Speaking & Lecturing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Team Management', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        { certificationName: 'Biosafety Officer Certification', issuingOrganization: 'ABSA International', issueYear: 2021 }
    ],
    customSections: [
        {
            title: 'Grants & Awards',
            items: [
                { text: 'NSF CAREER Award ($1.2M), 2022-2027' },
                { text: 'NIH Postdoctoral NRSA Fellowship, 2018-2020' },
                { text: 'Burroughs Wellcome Fund Career Award, 2023' }
            ]
        }
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
        headline: 'Chartered Financial Analyst (CFA) | MBA Candidate',
        summaryText: 'Results-driven Senior Financial Analyst with 8+ years of progressive experience in corporate finance, financial modeling, and strategic business planning. Proven track record of improving forecast accuracy by 25% and identifying cost-saving opportunities worth $2M+ in enterprise environments. Expert in SAP S/4HANA, Oracle Hyperion, and advanced Tableau visualization. Adept at transforming complex datasets into actionable insights for C-suite stakeholders.'
    },
    skills: [
        { skillName: 'Financial Modeling & Valuation', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Budgeting & Forecasting', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'SAP S/4HANA / Oracle ERP', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Advanced Data Analysis (SQL)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Strategic Business Planning', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'GAAP / IFRS Compliance', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Risk Management', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Capital Budgeting', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Tableau / Power BI', skillType: 'technical', proficiencyLevel: 'expert' }
    ],
    workExperience: [
        {
            jobTitle: 'Senior Financial Analyst',
            companyName: 'Global Corp Holdings',
            location: 'New York, NY',
            startDate: '2020-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Lead for division-wide FP&A activities, managing a portfolio budget of $50M and coordinating with 12 international business units.',
            achievements: [
                { achievementText: 'Developed automated dashboard for real-time expense tracking, reducing monthly reporting turnaround by 20 hours' },
                { achievementText: 'Led the quarterly forecasting process for North American operations, improving variance analysis accuracy to within 1.5%' },
                { achievementText: 'Partnered with operations team to identify supply chain inefficiencies, resulting in $650k direct annual savings' },
                { achievementText: 'Spearheaded the integration of a new AI-driven forecasting tool, reducing manual data entry efforts by 40%' },
                { achievementText: 'Presented monthly financial performance reviews to the Executive Committee, highlighting key growth drivers and risks' }
            ]
        },
        {
            jobTitle: 'Financial Analyst',
            companyName: 'Stratton Oakmont Inc.',
            location: 'New York, NY',
            startDate: '2017-06',
            endDate: '2020-02',
            isCurrent: false,
            roleDescription: 'Supported senior management with high-stakes ad-hoc reporting and financial analysis during multiple M&A cycles.',
            achievements: [
                { achievementText: 'Built dynamic financial models for potential target acquisitions, influencing key investment decisions totaling $150M' },
                { achievementText: 'Streamlined the month-end close process through automation, cutting the reporting timeline by 3 business days' },
                { achievementText: 'Analyzed regional sales performance data to identify underperforming markets, leading to a strategic pivot that increased ROI by 10%' },
                { achievementText: 'Administered the corporate expense management system, ensuring 100% compliance with internal audit standards' }
            ]
        },
        {
            jobTitle: 'Junior Financial Consultant',
            companyName: 'Beacon Street Advisory',
            location: 'Boston, MA',
            startDate: '2015-06',
            endDate: '2017-05',
            isCurrent: false,
            roleDescription: 'Provided analytical support for small-to-medium enterprise clients focusing on cash flow optimization.',
            achievements: [
                { achievementText: 'Conducted market size analysis for 15+ clients entering new vertical markets' },
                { achievementText: 'Assisted in the preparation of series A funding decks for 5 tech startups' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Stern School of Business, New York University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Finance & Accounting',
            location: 'New York, NY',
            endYear: 2017,
            gpa: '3.8',
            achievements: 'Magna Cum Laude, Stern Scholar, Beta Alpha Psi'
        }
    ],
    certifications: [
        {
            certificationName: 'Chartered Financial Analyst (CFA) - Level III',
            issuingOrganization: 'CFA Institute',
            issueYear: 2021
        },
        {
            certificationName: 'Certified Management Accountant (CMA)',
            issuingOrganization: 'IMA',
            issueYear: 2018
        },
        {
            certificationName: 'FMVA® Certification',
            issuingOrganization: 'Corporate Finance Institute',
            issueYear: 2019
        }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Mandarin', proficiencyLevel: 'fluent' },
        { languageName: 'Cantonese', proficiencyLevel: 'intermediate' }
    ],
    customSections: [
        {
            title: 'Technical Projects',
            items: [
                { text: 'ERP System Migration: Led the data validation phase of a company-wide migration to SAP S/4HANA (2022)' },
                { text: 'Post-Merger Integration: Harmonized financial reporting standards for two $10M subsidiaries (2020)' }
            ]
        }
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
        summaryText: 'Results-driven Corporate Attorney with 7+ years of experience in complex mergers & acquisitions, venture capital financing, and securities law. Admitted to the New York and DC Bars. Proven ability to draft and negotiate high-stakes transactional documents, manage comprehensive due diligence for multi-billion dollar deals, and provide strategic regulatory counsel to Fortune 500 clients and emerging startups. Exceptional legal researcher with a commitment to meticulous detail and delivering superior client service in fast-paced, high-pressure environments.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Associate Attorney',
            companyName: 'Pearson, Specter & Litt LLP',
            location: 'Washington, DC',
            startDate: '2021-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Lead associate in the Corporate Practice Group focusing on cross-border M&A and private equity transactions.',
            achievements: [
                { achievementText: 'Represented a global tech conglomerate in a $3.2B cross-border acquisition, overseeing a team of 15 junior associates and managing due diligence across 12 jurisdictions' },
                { achievementText: 'Drafted and negotiated definitive purchase agreements, complex operating agreements, and executive employment contracts' },
                { achievementText: 'Advised series B and C startup clients on corporate governance, intellectual property licensing, and equity incentive structures' },
                { achievementText: 'Successfully closed 25+ mid-market transactions with a combined deal value exceeding $1.5B' },
                { achievementText: 'Spearheaded the firm’s "Legal Tech Initiative," implementing AI-driven document review tools that increased department efficiency by 30%' }
            ]
        },
        {
            jobTitle: 'Associate Attorney',
            companyName: 'Pearson, Specter & Litt LLP',
            location: 'Washington, DC',
            startDate: '2019-09',
            endDate: '2020-12',
            isCurrent: false,
            roleDescription: 'Corporate associate handling foundational transactional work and regulatory filings.',
            achievements: [
                { achievementText: 'Conducted comprehensive legal research on SEC compliance and FINRA regulations for financial services clients' },
                { achievementText: 'Managed the closing process for 10+ private placements, ensuring all regulatory filings were completed on schedule' },
                { achievementText: 'Assisted partners in preparing for high-stakes litigation related to shareholder derivative suits' }
            ]
        },
        {
            jobTitle: 'Summer Associate',
            companyName: 'Hamlin, Hamlin & McGill',
            location: 'New York, NY',
            startDate: '2018-05',
            endDate: '2018-08',
            isCurrent: false,
            roleDescription: 'Supported senior partners with litigation research and corporate restructuring projects.',
            achievements: [
                { achievementText: 'Authored 10+ legal memoranda on complex antitrust and competition law issues for Fortune 100 clients' },
                { achievementText: 'Contributed to a winning defense strategy in a high-profile white-collar crime investigation' },
                { achievementText: 'Assisted in the pro bono representation of non-profit organizations seeking 501(c)(3) status' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Georgetown University Law Center',
            degree: 'Juris Doctor (J.D.)',
            location: 'Washington, DC',
            endYear: 2019,
            achievements: 'Cum Laude, Georgetown Law Journal (Executive Editor), Order of the Coif'
        },
        {
            institutionName: 'University of Virginia',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Political Science & Philosophy',
            location: 'Charlottesville, VA',
            endYear: 2016,
            achievements: 'Echols Scholar, Dean\'s List (All Semesters)'
        }
    ],
    skills: [
        { skillName: 'Mergers & Acquisitions', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Securities Regulation (SEC)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Contract Negotiation', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Private Equity / Venture Capital', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Corporate Governance', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Legal Research (Westlaw/LexisNexis)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Due Diligence Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Intellectual Property Basics', skillType: 'professional', proficiencyLevel: 'intermediate' }
    ],
    professionalAffiliations: [
        {
            organizationName: 'American Bar Association',
            roleOrMembership: 'Chair, Young Lawyers Division - Business Law Section',
            yearsActive: '2019-Present'
        },
        {
            organizationName: 'New York State Bar Association',
            roleOrMembership: 'Member',
            yearsActive: '2020-Present'
        },
        {
            organizationName: 'District of Columbia Bar',
            roleOrMembership: 'Member',
            yearsActive: '2019-Present'
        }
    ],
    customSections: [
        {
            title: 'Representative Matters',
            items: [
                { text: 'Counsel to "Project Apollo": $1.5B divestiture of non-core assets for a leading healthcare provider (2022)' },
                { text: 'Lead Associate for "GreenTech Series C": $80M equity financing round led by top-tier VC firms (2021)' }
            ]
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
        professionalTitle: 'Art Director & Visual Stylist',
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
        summaryText: 'Visionary Art Director and Brand Strategist with 10+ years of experience defining the visual identity for world-class luxury and high-fashion labels. Expert in conceptualizing multi-channel editorial campaigns, leading high-performance creative teams, and overseeing large-scale photo and video productions from concept to post-production. Deeply integrated in the intersection of fashion, technology, and art, with a proven ability to anticipate global trends and translate brand heritage into modern, immersive narratives that resonate with affluent global audiences.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Art Director',
            companyName: 'VOGUE Italia (Remote)',
            location: 'Milan / LA',
            startDate: '2021-02',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing the visual evolution of digital and print editorials, managing a global network of contributors and creative agencies.',
            achievements: [
                { achievementText: 'Led creative direction for the "Metamorphosis" September Issue digital campaign, achieving a record-breaking 12M+ cross-platform impressions' },
                { achievementText: 'Manage and mentor a diverse team of 15+ creatives, including senior photographers, digital artists, and lead stylists' },
                { achievementText: 'Pioneered the integration of AR/VR elements into monthly digital covers, increasing subscriber engagement by 45%' },
                { achievementText: 'Curated exclusive branded content partnerships for maisons such as Chanel, Gucci, and Prada, ensuring aesthetic alignment with Vogue’s heritage' },
                { achievementText: 'Oversaw a $2M annual creative budget, optimizing production costs by 15% through strategic vendor negotiation' }
            ]
        },
        {
            jobTitle: 'Visual Lead & Stylist',
            companyName: 'Refinery29 / Vice Media',
            location: 'New York, NY',
            startDate: '2017-06',
            endDate: '2021-01',
            isCurrent: false,
            roleDescription: 'Created high-impact visual assets for world-leading lifestyle and fashion verticals, focusing on youth culture and sustainability.',
            achievements: [
                { achievementText: 'Conceptualized and styled over 150+ high-profile photo shoots for "Money Diaries" and "Fashion Week" special features' },
                { achievementText: 'Developed and launched the agency’s new visual identity guidelines, ensuring consistency across 8 global social media channels' },
                { achievementText: 'Collaborated with the commercial team to pitch and execute $500K+ sponsored content campaigns for major retail partners' },
                { achievementText: 'Awarded "Creative of the Year" internal honor for the 2019 Sustainability in Fashion initiative' }
            ]
        },
        {
            jobTitle: 'Junior Art Director',
            companyName: 'Boutique Creative Agency',
            location: 'Paris, France',
            startDate: '2014-06',
            endDate: '2017-05',
            isCurrent: false,
            roleDescription: 'Assisted in the creative execution of luxury jewelry and accessory campaigns.',
            achievements: [
                { achievementText: 'Contributed to the visual rebranding of a historic French heritage label, leading to a 20% increase in Millennial market share' },
                { achievementText: 'Managed post-production workflows for 50+ commercial projects, ensuring 100% on-time delivery' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Parsons School of Design',
            degree: 'Bachelor of Fine Arts',
            fieldOfStudy: 'Fashion Communication & Marketing',
            location: 'New York, NY',
            endYear: 2017,
            achievements: 'Honors, Excellence in Visual Narratives Award'
        },
        {
            institutionName: 'Institut Français de la Mode (IFM)',
            degree: 'Foundational Certificate',
            fieldOfStudy: 'Luxury Management',
            location: 'Paris, France',
            endYear: 2014
        }
    ],
    skills: [
        { skillName: 'Creative Direction', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Adobe Creative Cloud (Expert)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Editorial Styling', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Trend Forecasting (WGSN)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Production Management', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Art History & Theory', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Digital Content Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Photography Direction', skillType: 'technical', proficiencyLevel: 'expert' }
    ],
    languages: [
        { languageName: 'English', proficiencyLevel: 'native' },
        { languageName: 'Italian', proficiencyLevel: 'native' },
        { languageName: 'French', proficiencyLevel: 'fluent' },
        { languageName: 'Spanish', proficiencyLevel: 'intermediate' }
    ],
    customSections: [
        {
            title: 'Exhibitions & Features',
            items: [
                { text: 'Solo Exhibition: "The Future of Heritage," LA Gallery of Art (2023)' },
                { text: 'Guest Curator: Sustainable Fashion Summit, Milan (2022)' },
                { text: 'Featured Speaker: "Digital Storytelling in Luxury," Art Institute of Chicago (2021)' },
                { text: 'Work published in: i-D, Dazed & Confused, and Business of Fashion' }
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
        summaryText: 'Results-driven Senior Project Manager with 10+ years of experience leading cross-functional teams in high-growth agile environments. PMP certified with deep expertise in the full software development lifecycle (SDLC), strategic stakeholder management, and complex risk mitigation. Proven track record of delivering multi-million dollar enterprise projects on time and 15% under budget while maintaining a consistent 95% client satisfaction rate. Exceptional leader skilled in process optimization, team mentorship, and driving operational excellence across globally distributed organizations.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Project Manager',
            companyName: 'TechVision Solutions',
            location: 'Denver, CO',
            startDate: '2020-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading enterprise software implementation projects for Fortune 500 clients with total portfolio budgets exceeding $10M.',
            achievements: [
                { achievementText: 'Successfully delivered 15 major projects with an average 18% cost savings through rigorous resource allocation and vendor management' },
                { achievementText: 'Implemented a standardized agile framework across 6 product teams, increasing overall delivery velocity by 40% in the first year' },
                { achievementText: 'Managed high-level stakeholder relationships with C-level executives, maintaining 98% satisfaction scores across all project phases' },
                { achievementText: 'Spearheaded the migration of legacy data systems to cloud infrastructure for a $20M retail client, completing the transition 2 weeks ahead of schedule' },
                { achievementText: 'Mentored 5 junior project managers, 3 of whom were promoted to senior roles within 18 months' }
            ]
        },
        {
            jobTitle: 'Project Manager',
            companyName: 'Digital Dynamics Inc',
            location: 'Boulder, CO',
            startDate: '2016-06',
            endDate: '2019-12',
            isCurrent: false,
            roleDescription: 'Coordinated complex software development projects for mid-market clients in the fintech and healthcare sectors.',
            achievements: [
                { achievementText: 'Led a cross-functional team of 20 developers and designers through 12 successful product launches with 100% on-time delivery' },
                { achievementText: 'Reduced project delivery cycles by 25% through the implementation of automated testing and CI/CD pipelines' },
                { achievementText: 'Authored comprehensive project documentation and training manuals adopted as the company-wide standard' },
                { achievementText: 'Negotiated contract terms with external vendors, saving the company $100K in annual licensing fees' }
            ]
        },
        {
            jobTitle: 'Associate Project Manager',
            companyName: 'Creative Apps LLC',
            location: 'Austin, TX',
            startDate: '2014-01',
            endDate: '2016-05',
            isCurrent: false,
            roleDescription: 'Assisted senior project managers in tracking project milestones, budgets, and resource allocation.',
            achievements: [
                { achievementText: 'Coordinated weekly sprint planning and retrospective meetings for 3 active development teams' },
                { achievementText: 'Optimized internal project tracking in JIRA, improving reporting accuracy by 30%' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Colorado',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Business Administration & Information Systems',
            location: 'Boulder, CO',
            endYear: 2013,
            gpa: '3.8',
            achievements: 'Dean\'s List, Beta Gamma Sigma International Business Honor Society'
        }
    ],
    skills: [
        { skillName: 'Project Management (PMP)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Agile / Scrum / Kanban', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'JIRA / Confluence / Asana', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Risk Management & Mitigation', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Stakeholder Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Budget Planning (CapEx/OpEx)', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'SDLC Methodologies', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Strategic Planning', skillType: 'professional', proficiencyLevel: 'advanced' }
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
        },
        {
            certificationName: 'AWS Certified Cloud Practitioner',
            issuingOrganization: 'Amazon Web Services',
            issueYear: 2021
        }
    ],
    customSections: [
        {
            title: 'Key Projects',
            items: [
                { text: 'Global ERP Rollout: Led $5M multi-country ERP implementation for a manufacturing client (2022)' },
                { text: 'FinTech App Launch: Managed the development and launch of a mobile banking app with 1M+ downloads (2019)' }
            ]
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
        professionalTitle: 'Senior Data Analyst',
        email: 'robert.chen@example.com',
        phone: '+1 (555) 456-7890',
        city: 'Austin',
        country: 'TX',
        location: 'Austin, TX',
        linkedinUrl: 'linkedin.com/in/robertchen-data'
    },
    professionalSummary: {
        summaryText: 'Detail-oriented Senior Data Analyst with 8+ years of experience transforming complex multi-source datasets into actionable business insights for tech leaders. Expert in SQL, Python, and Tableau with a deep background in statistical modeling, A/B testing, and predictive analytics. Proven ability to drive data-informed decision making that improves customer retention by 20% and identifies significant operational cost-saving opportunities. Dedicated to creating high-impact visualizations that clarify complex trends for non-technical stakeholders.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Data Analyst',
            companyName: 'DataFirst Analytics',
            location: 'Austin, TX',
            startDate: '2021-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Analyzing large-scale customer behavior data for a leading e-commerce platform to optimize marketing strategies and product roadmaps.',
            achievements: [
                { achievementText: 'Built and deployed predictive churn models using Python that increased customer retention by 22% and recovered $1.5M in annual revenue' },
                { achievementText: 'Designed and automated a suite of executive reporting dashboards in Tableau, reducing manual reporting time by 40 hours per month' },
                { achievementText: 'Identified $750K in annual cost-saving opportunities through deep-dive analysis of supply chain logistics and fulfillment data' },
                { achievementText: 'Lead quarterly data workshops for product managers to improve data literacy and autonomous insight generation across the company' }
            ]
        },
        {
            jobTitle: 'Data Analyst',
            companyName: 'Tech Innovations Corp',
            location: 'Houston, TX',
            startDate: '2019-01',
            endDate: '2021-02',
            isCurrent: false,
            roleDescription: 'Supported business intelligence initiatives through comprehensive data analysis, reporting, and database management.',
            achievements: [
                { achievementText: 'Developed complex SQL queries and stored procedures to extract insights from 50M+ record databases with 30% faster execution time' },
                { achievementText: 'Collaborated with the product team to design and analyze 20+ A/B tests on core features, resulting in an 18% improvement in user engagement' },
                { achievementText: 'Automated routine data cleaning and ET processes using Python scripts, ensuring 99.9% data accuracy for regional sales reports' }
            ]
        },
        {
            jobTitle: 'Junior Business Analyst',
            companyName: 'Insight Solutions',
            location: 'Dallas, TX',
            startDate: '2018-06',
            endDate: '2018-12',
            isCurrent: false,
            roleDescription: 'Assisted in the preparation of weekly market performance reports and competitor analysis.',
            achievements: [
                { achievementText: 'Maintained accuracy of the CRM database for a sales team of 50+, identifying and resolving 500+ duplicate records' },
                { achievementText: 'Supported the annual budget planning process by providing historical trend analysis and revenue projections' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Texas at Austin',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Statistics & Data Science',
            location: 'Austin, TX',
            endYear: 2018,
            gpa: '3.8',
            achievements: 'Presidential Scholarship, Dean\'s List (3 years)'
        }
    ],
    skills: [
        { skillName: 'Advanced SQL (BigQuery/PostgreSQL)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Python (Pandas/Scikit-learn)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Tableau Desktop & Server', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'A/B Testing & Hypothesis Testing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Statistical Modeling', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Predictive Analytics', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Excel (VBA/PowerPivot)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'ETL Pipelines', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'Google Data Analytics Professional Certificate',
            issuingOrganization: 'Google',
            issueYear: 2020
        },
        {
            certificationName: 'Tableau Desktop Specialist',
            issuingOrganization: 'Tableau',
            issueYear: 2019
        }
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
        summaryText: 'Strategic Executive Leader with 20+ years of experience driving operational excellence, hypergrowth, and sustainable revenue for multi-national technology corporations. Proven track record of scaling organizations from late-stage startup to $500M+ ARR while maintaining high capital efficiency. Expert in building world-class cross-functional teams, orchestrating complex digital transformations, and executing high-value strategic initiatives that deliver measurable bottom-line impact. Passionate about fostering a culture of innovation, operational transparency, and lifelong leadership development.'
    },
    workExperience: [
        {
            jobTitle: 'Chief Operating Officer',
            companyName: 'InnovateTech Solutions',
            location: 'Boston, MA',
            startDate: '2018-06',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing all global operational functions including product strategy, customer success, business operations, and supply chain for a market-leading SaaS company.',
            achievements: [
                { achievementText: 'Orchestrated the scale-up of operations from $25M to $150M ARR in 4 years while improving gross margins by 10 bps through offshore center utilization' },
                { achievementText: 'Led a diverse organization of 350+ employees across 5 continents, achieving an 85% internal talent mobility rate' },
                { achievementText: 'Implemented a proprietary operational maturity framework that improved customer retention from 82% to 96% and reduced churn by $5M annually' },
                { achievementText: 'Led a successful Series D fundraising round resulting in $120M in investment at a $1.2B valuation' },
                { achievementText: 'Pioneered the company’s ESG initiative, resulting in a 30% reduction in carbon footprint across global data centers' }
            ]
        },
        {
            jobTitle: 'VP of Operations',
            companyName: 'CloudFirst Technologies',
            location: 'Cambridge, MA',
            startDate: '2013-02',
            endDate: '2018-05',
            isCurrent: false,
            roleDescription: 'Managed entire operations and customer support lifecycle for a top-tier enterprise cloud hosting platform.',
            achievements: [
                { achievementText: 'Redesigned the service delivery model resulting in $12M annual operational cost savings without compromising service levels' },
                { achievementText: 'Improved company-wide Net Promoter Score (NPS) from 45 to 72 through a customer-centric restructuring of the support organization' },
                { achievementText: 'Managed a $40M OpEx budget with consistent 5% year-over-year efficiency gains through automation and process re-engineering' },
                { achievementText: 'Spearheaded the integration of three post-acquisition entities, harmonizing cultures and systems within 12 months' }
            ]
        },
        {
            jobTitle: 'Senior Director of Business Operations',
            companyName: 'Beringer Analytics Corp',
            location: 'New York, NY',
            startDate: '2008-01',
            endDate: '2013-01',
            isCurrent: false,
            roleDescription: 'Led internal business operations and strategic planning for a global analytics firm.',
            achievements: [
                { achievementText: 'Developed the company’s first comprehensive 5-year strategic roadmap, leading to a 40% increase in market share' },
                { achievementText: 'Optimized the sales operations process, reducing the average sales cycle by 45 days' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Harvard Business School',
            degree: 'Master of Business Administration (MBA)',
            location: 'Boston, MA',
            endYear: 2008,
            achievements: 'Baker Scholar (Top 5% of Class)'
        },
        {
            institutionName: 'Massachusetts Institute of Technology (MIT)',
            degree: 'Bachelor of Science in Industrial Engineering',
            location: 'Cambridge, MA',
            endYear: 2002,
            achievements: 'Dean\'s List, Tau Beta Pi Engineering Honor Society'
        }
    ],
    skills: [
        { skillName: 'Strategic Planning & Execution', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'P&L Management ($100M+)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Global Team Leadership', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Process Transformation & Lean', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Board & Investor Relations', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Digital Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'M&A and Post-Merger Integration', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Talent Development', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    certifications: [
        {
            certificationName: 'Six Sigma Black Belt',
            issuingOrganization: 'ASQ',
            issueYear: 2012
        }
    ],
    customSections: [
        {
            title: 'Board Experience',
            items: [
                { text: 'Independent Director, TechGrowth Foundation (2020-Present)' },
                { text: 'Advisory Board Member, Boston Innovation Hub (2018-2022)' }
            ]
        }
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
        professionalTitle: 'Senior UX/UI Designer & Product Strategist',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 234-5678',
        city: 'Portland',
        country: 'OR',
        location: 'Portland, OR',
        linkedinUrl: 'linkedin.com/in/alexrivera-ux',
        portfolioUrl: 'alexrivera.design'
    },
    professionalSummary: {
        summaryText: 'Creative and data-driven Senior UX/UI Designer with 8+ years of experience crafting intuitive digital experiences for high-traffic web and mobile applications. Expert in design systems, user-centric research, and accessible interface design. Proven ability to lead cross-functional teams from discovery to launch, resulting in a 45% increase in user engagement for market-leading products. Passionate about bridging the gap between user needs and business goals through elegant, technical design solutions.'
    },
    workExperience: [
        {
            jobTitle: 'Senior UX/UI Designer',
            companyName: 'DesignLab Studio',
            location: 'Portland, OR',
            startDate: '2021-04',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading design initiatives for mobile and web platforms serving 5M+ monthly active users in the fintech space.',
            achievements: [
                { achievementText: 'Spearheaded the complete redesign of the core mobile application, resulting in a 45% increase in user engagement and 20% growth in conversion rates' },
                { achievementText: 'Developed and maintained a comprehensive design system (Carbon) used by 12 product teams, reducing design-to-development handoff time by 35%' },
                { achievementText: 'Conducted over 100+ user interviews and usability tests, translating findings into actionable product roadmap items' },
                { achievementText: 'Mentored a team of 4 junior designers and 2 interns, facilitating weekly design critiques and professional development sessions' },
                { achievementText: 'Collaborated directly with the CTO to implement WCAG 2.1 accessibility standards across the entire product suite' }
            ]
        },
        {
            jobTitle: 'UX Designer',
            companyName: 'Creative Digital Agency',
            location: 'Seattle, WA',
            startDate: '2018-06',
            endDate: '2021-03',
            isCurrent: false,
            roleDescription: 'Owned the end-to-end design process for a diverse portfolio of B2B and B2C clients across retail, healthcare, and education.',
            achievements: [
                { achievementText: 'Delivered high-fidelity prototypes and wireframes for 20+ successful client launches, consistently receiving 95%+ client satisfaction ratings' },
                { achievementText: 'Partnered with the marketing team to optimize landing pages, leading to an average 30% increase in lead generation for retail clients' },
                { achievementText: 'Facilitated collaborative design workshops with stakeholders to define product vision and user personas for early-stage startups' },
                { achievementText: 'Integrated motion design principles into web interfaces, improving user feedback loops and overall "delight" metrics' }
            ]
        },
        {
            jobTitle: 'Junior Visual Designer',
            companyName: 'Pixel Perfect Media',
            location: 'Portland, OR',
            startDate: '2016-01',
            endDate: '2018-05',
            isCurrent: false,
            roleDescription: 'Assisted in the creation of visual assets for branding, social media, and web interfaces.',
            achievements: [
                { achievementText: 'Developed 50+ social media ad sets that outperformed previous benchmarks by 15% in CTR' },
                { achievementText: 'Contributed to the visual rebranding of a regional non-profit, including logo design and style guide development' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Portland State University',
            degree: 'Bachelor of Fine Arts',
            fieldOfStudy: 'Graphic Design',
            location: 'Portland, OR',
            endYear: 2016,
            achievements: 'Honors, Excellence in Digital Design Award'
        },
        {
            institutionName: 'Nielsen Norman Group (NN/g)',
            degree: 'UX Certification',
            location: 'Online',
            endYear: 2019
        }
    ],
    skills: [
        { skillName: 'Figma / Adobe XD / Sketch', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Design Systems (Atoms to Pages)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'User Research & Interviewing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Prototyping (Low to High Fidelity)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'HTML5 / CSS3 / JavaScript Basics', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Accessibility (WCAG 2.1)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Visual Storytelling', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Stakeholder Management', skillType: 'professional', proficiencyLevel: 'advanced' }
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
        professionalTitle: 'Marketing Specialist & Content Creator',
        email: 'emily.watson@example.com',
        phone: '+1 (555) 678-9012',
        city: 'Philadelphia',
        country: 'PA',
        location: 'Philadelphia, PA',
        linkedinUrl: 'linkedin.com/in/emilywatson-marketing'
    },
    professionalSummary: {
        summaryText: 'Enthusiastic and creative Marketing Graduate with a strong foundation in digital marketing strategy, social media management, and data-driven storytelling. Proven track record in internship roles where I managed social accounts for 10+ clients and contributed to campaigns that saw a 35% increase in follower engagement. Skilled in Adobe Creative Suite, SEO basics, and Google Analytics. Committed to staying ahead of industry trends and leveraging emerging technologies to drive brand growth and user acquisition.'
    },
    workExperience: [
        {
            jobTitle: 'Marketing Intern',
            companyName: 'BrandWorks Agency',
            location: 'Philadelphia, PA',
            startDate: '2023-06',
            endDate: '2023-12',
            isCurrent: false,
            roleDescription: 'Supported the senior marketing team in executing digital campaigns for clients in the lifestyle and tech sectors.',
            achievements: [
                { achievementText: 'Created and scheduled content for 15+ social media accounts, generating over 100K+ total impressions in 6 months' },
                { achievementText: 'Assisted in the development of 10+ email marketing campaigns, achieving an average open rate of 28% (5% above industry benchmark)' },
                { achievementText: 'Conducted in-depth competitor analysis for 5 major client pitches, identifying key market gaps and opportunities for differentiation' },
                { achievementText: 'Coordinated a small local influencer outreach program that resulted in 5 brand partnerships and a 10% uptick in regional sales' }
            ]
        },
        {
            jobTitle: 'Social Media Strategy Lead (Volunteer)',
            companyName: 'Temple University Student Union',
            location: 'Philadelphia, PA',
            startDate: '2022-09',
            endDate: '2024-05',
            isCurrent: false,
            roleDescription: 'Managed all digital communications for the largest student organization on campus with over 10,000 active members.',
            achievements: [
                { achievementText: 'Grew the organization’s Instagram and TikTok following by 55% through original video content and strategic hashtag use' },
                { achievementText: 'Organized and promoted 20+ campus-wide events with an average attendance increase of 25% year-over-year' },
                { achievementText: 'Managed a team of 4 student contributors, overseeing content calendars and ensuring consistent brand voice' }
            ]
        },
        {
            jobTitle: 'Campus Brand Ambassador',
            companyName: 'Red Bull North America',
            location: 'Philadelphia, PA',
            startDate: '2021-08',
            endDate: '2022-05',
            isCurrent: false,
            roleDescription: 'Executed experiential marketing events and drove brand awareness through grassroots initiatives.',
            achievements: [
                { achievementText: 'Distinguished as "Top Regional Ambassador" for Q4 2021 based on event participation and product distribution targets' },
                { achievementText: 'Successfully networked with 15+ student organizations to secure high-visibility event sponsorships' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Temple University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Marketing & Digital Media',
            location: 'Philadelphia, PA',
            endYear: 2024,
            gpa: '3.8',
            achievements: 'Summa Cum Laude, American Marketing Association (Temple Chapter) Vice President'
        }
    ],
    skills: [
        { skillName: 'Social Media Strategy (IG, TikTok, LinkedIn)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Content Creation (Copywriting/Video)', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Adobe Illustrator & Photoshop', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'SEO & SEM Basics', skillType: 'technical', proficiencyLevel: 'intermediate' },
        { skillName: 'Google Analytics & Search Console', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Canva & Figma Basics', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Email Marketing (Mailchimp)', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Market Research', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        { certificationName: 'Google Ads Search Certification', issuingOrganization: 'Google', issueYear: 2023 },
        { certificationName: 'HubSpot Inbound Marketing', issuingOrganization: 'HubSpot Academy', issueYear: 2024 }
    ],
    customSections: [
        {
            title: 'Volunteer Experience',
            items: [
                { text: 'Marketing Mentor, Big Brothers Big Sisters of PA (2023-Present)' },
                { text: 'Digital Lead, Local Food Bank Annual Drive (2022)' }
            ]
        }
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
        professionalTitle: 'Senior Operations & Supply Chain Manager',
        email: 'm.johnson@example.com',
        phone: '+1 (555) 890-1234',
        city: 'Atlanta',
        country: 'GA',
        location: 'Atlanta, GA',
        linkedinUrl: 'linkedin.com/in/marcusjohnson-ops'
    },
    professionalSummary: {
        summaryText: 'Accomplished Operations and Supply Chain Manager with 12+ years of progressive experience in large-scale logistics, manufacturing, and process improvement. Six Sigma Black Belt certified with a deep expertise in Lean manufacturing principles and just-in-time (JIT) inventory systems. Proven ability to reduce operational costs by over 20% while significantly improving quality, throughput, and safety standards. Exceptional leader with a track record of managing multi-site operations and cross-functional teams of up to 150 associates.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Operations Manager',
            companyName: 'LogisticsPro Solutions',
            location: 'Atlanta, GA',
            startDate: '2019-08',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing all operational functions for a 500,000 sq. ft. distribution center handling 100,000+ high-value shipments monthly.',
            achievements: [
                { achievementText: 'Reduced total operational costs by 22% ($1.2M annually) through a comprehensive process optimization and automation initiative' },
                { achievementText: 'Improved on-time delivery (OTD) rates from 87% to 98.5% within the first 18 months of leadership' },
                { achievementText: 'Led a diverse team of 150+ warehouse staff, supervisors, and administrative personnel to achieve a 95% safety rating' },
                { achievementText: 'Spearheaded the implementation of a new Tier 1 WMS (Manhattan Associates), reducing picking errors by 50%' },
                { achievementText: 'Negotiated new carrier contracts resulting in a $300K reduction in annual freight expenditures' }
            ]
        },
        {
            jobTitle: 'Operations Supervisor',
            companyName: 'Supply Chain Dynamics Inc.',
            location: 'Charlotte, NC',
            startDate: '2015-03',
            endDate: '2019-07',
            isCurrent: false,
            roleDescription: 'Supervised day-to-day warehouse operations, inventory control, and outbound logistics for a major retail supplier.',
            achievements: [
                { achievementText: 'Implemented Lean 5S principles across the facility, resulting in a 15% increase in space utilization and worker productivity' },
                { achievementText: 'Trained and developed a high-performing team of 40 associates, resulting in 10 internal promotions to lead roles' },
                { achievementText: 'Achieved a 99.9% inventory accuracy rate through the introduction of a daily cycle counting program' },
                { achievementText: 'Successfully managed a $2M facility renovation project with zero downtime in outbound shipping' }
            ]
        },
        {
            jobTitle: 'Logistics Coordinator',
            companyName: 'FastShip Logistics',
            location: 'Raleigh, NC',
            startDate: '2013-01',
            endDate: '2015-02',
            isCurrent: false,
            roleDescription: 'Coordinated complex inbound and outbound shipment schedules for domestic and international freight.',
            achievements: [
                { achievementText: 'Managed relationships with over 25 carrier partners, ensuring competitive pricing and reliable service levels' },
                { achievementText: 'Reduced expedited shipping costs by 18% through improved demand forecasting and route consolidation' },
                { achievementText: 'Resolved over 500+ service escalations annually, maintaining a 98% positive vendor feedback score' }
            ]
        },
        {
            jobTitle: 'Warehouse Lead',
            companyName: 'Global Parts Distribution',
            location: 'Richmond, VA',
            startDate: '2011-06',
            endDate: '2012-12',
            isCurrent: false,
            roleDescription: 'Front-line leadership role overseeing a small team responsible for receiving and quality control.',
            achievements: [
                { achievementText: 'Improved receiving dock turnaround time by 25% through a revised unloading protocol' },
                { achievementText: 'Reduced damaged-in-transit claims by 10% through a new pallet-stacking training initiative' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Georgia State University',
            degree: 'Bachelor of Business Administration',
            fieldOfStudy: 'Supply Chain Management & Operations',
            location: 'Atlanta, GA',
            endYear: 2012,
            achievements: 'Dean\'s List, Logistics Society President'
        }
    ],
    skills: [
        { skillName: 'Supply Chain Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Lean Six Sigma (Black Belt)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Inventory Control & Optimization', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'WMS / ERP (Manhattan, SAP)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Process Re-engineering', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Budgeting & P&L Oversight', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Vendor Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Data Analytics (SQL/Tableau)', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'Six Sigma Black Belt',
            issuingOrganization: 'ASQ',
            issueYear: 2018
        },
        {
            certificationName: 'APICS CPIM (Certified in Planning and Inventory Management)',
            issuingOrganization: 'ASCM',
            issueYear: 2016
        },
        {
            certificationName: 'OSHA 30-Hour General Industry Safety',
            issuingOrganization: 'OSHA',
            issueYear: 2020
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
        professionalTitle: 'Senior Customer Success & Support Manager',
        email: 'carlos.rodriguez@example.com',
        phone: '+1 (555) 345-6789',
        city: 'Phoenix',
        country: 'AZ',
        location: 'Phoenix, AZ',
        linkedinUrl: 'linkedin.com/in/carlosrodriguez-service'
    },
    professionalSummary: {
        summaryText: 'Empathetic and results-oriented Customer Service Leader with 12+ years of experience building and scaling high-performing support organizations for B2B SaaS and consumer tech. Expert in developing multi-channel service strategies (Phone, Email, Chat, Social) that significantly improve customer satisfaction (CSAT) while reducing total operational costs. Proven track record of achieving consistent 95%+ CSAT scores and reducing average response times by over 60% through automation and agent empowerment. Deeply skilled in workforce management, CRM implementation, and VOC (Voice of Customer) programs.'
    },
    workExperience: [
        {
            jobTitle: 'Customer Service & Success Manager',
            companyName: 'ServiceFirst Technologies',
            location: 'Phoenix, AZ',
            startDate: '2020-02',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading a high-impact team of 30 support specialists and team leads for a rapidly growing fintech platform.',
            achievements: [
                { achievementText: 'Spearheaded a CSAT improvement initiative that raised scores from 82% to 97% in under 12 months' },
                { achievementText: 'Reduced First Response Time (FRT) from 4 hours to 45 minutes by implementing AI-driven triage and prioritized routing' },
                { achievementText: 'Launched an external Knowledge Base and help center that deflected 35% of common incoming tickets, saving $250K in annual support costs' },
                { achievementText: 'Developed a comprehensive "Agent Excellence" training program that decreased new hire onboarding time by 50%' },
                { achievementText: 'Collaborated with the Product team to advocate for key features based on support data, reducing high-frequency bugs by 20%' }
            ]
        },
        {
            jobTitle: 'Senior Customer Support Lead',
            companyName: 'TechSupport Solutions',
            location: 'Tempe, AZ',
            startDate: '2016-05',
            endDate: '2020-01',
            isCurrent: false,
            roleDescription: 'Managed a team of 12 junior specialists providing technical support for enterprise software clients.',
            achievements: [
                { achievementText: 'Maintained a personal 99% customer satisfaction rating while managing a team that handled over 50,000 queries annually' },
                { achievementText: 'Mentored and coached 15+ specialists, 8 of whom were promoted to senior or management tiers' },
                { achievementText: 'Redesigned the escalation workflow, improving resolution time for complex technical issues by 30%' },
                { achievementText: 'Recipient of the "Integrative Service Leader" award for excellence in cross-departmental communication' }
            ]
        },
        {
            jobTitle: 'Customer Support Advocate',
            companyName: 'GlobalConnect BPO',
            location: 'Phoenix, AZ',
            startDate: '2013-06',
            endDate: '2016-04',
            isCurrent: false,
            roleDescription: 'Front-line support role providing high-volume assistance for major retail and travel brands.',
            achievements: [
                { achievementText: 'Ranked in the top 5% of agents for "Quality Assurance" scores across a 500-person site' },
                { achievementText: 'Consistently exceeded daily KPIs for ticket volume and average handle time (AHT)' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Arizona State University',
            degree: 'Bachelor of Arts',
            fieldOfStudy: 'Business Communications',
            location: 'Tempe, AZ',
            endYear: 2013,
            achievements: 'Honors, Leadership Scholarship Recipient'
        }
    ],
    skills: [
        { skillName: 'Customer Success Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Team Leadership & Coaching', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Zendesk / Salesforce / Intercom', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Workforce Planning', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Conflict Resolution', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Service Level Agreement (SLA) Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Data Analysis (Excel/PowerBI)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Public Speaking', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        { certificationName: 'COPC Implementation Leader', issuingOrganization: 'COPC Inc.', issueYear: 2021 },
        { certificationName: 'Customer Success Manager (CSM) Level I', issuingOrganization: 'SuccessHacker', issueYear: 2019 }
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
        professionalTitle: 'Senior Full Stack Software Engineer',
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
        summaryText: 'Innovative and performance-driven Senior Full Stack Engineer with 10+ years of experience building scalable, high-availability web applications for global tech leaders. Expert in modern JavaScript ecosystems (React, Next.js, Node.js), distributed systems, and cloud-native architecture (AWS/Docker/Kubernetes). Proven track record of spearheading complex digital transformations, optimizing large-scale API performance, and mentoring high-growth engineering teams. Committed to technical excellence, automated testing, and delivering user-centric products that serve millions of concurrent users.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Staff Software Engineer',
            companyName: 'StreamTech Solutions',
            location: 'San Jose, CA',
            startDate: '2021-02',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Technical lead for the core streaming platform, managing infrastructure and backend systems for 5M+ concurrent global sessions.',
            achievements: [
                { achievementText: 'Architected a new microservices-based video ingestion pipeline, reducing latency by 40% and infrastructure overhead by $500K/year' },
                { achievementText: 'Led a cross-functional team of 15 engineers in the migration from an on-premise monolith to a serverless AWS architecture with zero downtime' },
                { achievementText: 'Implemented an automated performance regression testing suite, identifying 50+ critical bottlenecks before deployment' },
                { achievementText: 'Mentored 10+ mid-level engineers, fostering a culture of peer reviews and design document excellence' },
                { achievementText: 'Developed an internal React-based dashboard for real-time system monitoring, reducing incident response time by 30%' }
            ]
        },
        {
            jobTitle: 'Full Stack Developer',
            companyName: 'AppWorks Inc',
            location: 'Mountain View, CA',
            startDate: '2018-06',
            endDate: '2021-01',
            isCurrent: false,
            roleDescription: 'Developed and maintained key features for a leading B2B SaaS project management platform.',
            achievements: [
                { achievementText: 'Engineered a real-time collaborative editor used by 250K+ teams, utilizing WebSockets and CRDTs' },
                { achievementText: 'Refactored legacy Redux application to modern React Context and Hooks, improving bundle size by 25%' },
                { achievementText: 'Built and documented a comprehensive internal API that currently handles 1B+ requests per month' },
                { achievementText: 'Successfully reduced the frontend build/deploy Pipeline time by 50% using Webpack optimizations' }
            ]
        },
        {
            jobTitle: 'Junior Software Engineer',
            companyName: 'CodeCraft Studios',
            location: 'Palo Alto, CA',
            startDate: '2016-01',
            endDate: '2018-05',
            isCurrent: false,
            roleDescription: 'Worked on diverse software projects for Silicon Valley startups focusing on e-commerce and social apps.',
            achievements: [
                { achievementText: 'Directly contributed to the launch of 5 award-winning MVP products for early-stage clients' },
                { achievementText: 'Resolved over 300+ tracked bugs, improving overall application stability and user feedback scores' },
                { achievementText: 'Developed a reusable UI component library that accelerated the agency’s development lifecycle by 20%' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'San Jose State University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            location: 'San Jose, CA',
            endYear: 2015,
            achievements: 'Summa Cum Laude, President of the ACM Student Chapter'
        }
    ],
    skills: [
        { skillName: 'React / Next.js / Vue.js', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Node.js / Express / Fastify', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Go / Python / TypeScript', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'PostgreSQL / MongoDB / Redis', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'AWS (EKS, Lambda, RDS, S3)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Docker / Kubernetes / Terraform', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'GraphQL / Apollo / tRPC', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Jest / Cypress / TDD', skillType: 'technical', proficiencyLevel: 'expert' }
    ],
    projects: [
        {
            projectName: 'React Query Contributor',
            role: 'Core Contributor',
            description: 'Regularly contributing performance optimizations and bug fixes to one of the most popular data-fetching libraries in the React ecosystem.',
            toolsUsed: ['TypeScript', 'Jest', 'GitHub Actions'],
            startDate: '2022',
            endDate: 'Present'
        },
        {
            projectName: 'OpenSource Finance Hub',
            role: 'Founder',
            description: 'Built a self-hosted personal finance tracking suite with automated banking integrations and real-time visualization.',
            toolsUsed: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
            outcomes: '5,000+ stars on GitHub, Featured in "The Developer Digest"',
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
        professionalTitle: 'Chief Marketing Officer & Growth Strategist',
        email: 'c.williams@executive.com',
        phone: '+1 (555) 333-4444',
        city: 'Chicago',
        country: 'IL',
        location: 'Chicago, IL',
        linkedinUrl: 'linkedin.com/in/catherinewilliams-cmo'
    },
    professionalSummary: {
        summaryText: 'Visionary and results-driven Chief Marketing Officer with over 20 years of experience orchestrating global brand transformations and high-stakes market expansions for Fortune 500 organizations. Expert in digital disruptive strategy, advanced customer acquisition, and high-performance team leadership. Proven track record of spearheading initiatives that delivered over $750M in incremental revenue and 45% YOY growth in brand equity. Adept at leveraging data analytics and AI to optimize marketing ROI and cultivate long-term consumer loyalty. Passionate about building sustainable, value-driven brands that define their categories.'
    },
    workExperience: [
        {
            jobTitle: 'Chief Marketing Officer',
            companyName: 'Global Retail Corporation',
            location: 'Chicago, IL',
            startDate: '2019-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing the global marketing vision and execution for a $5B retail powerhouse with a presence in 50+ countries and 800+ brick-and-mortar locations.',
            achievements: [
                { achievementText: 'Engineered an omnichannel digital-first strategy that drove a 35% increase in total revenue and a 60% surge in e-commerce performance over 4 years' },
                { achievementText: 'Spearheaded a comprehensive global brand repositioning campaign, "The Future of Retail," resulting in a 25-point lift in brand sentiment and 40% growth in Gen Z market share' },
                { achievementText: 'Built and mentored a world-class marketing organization of 200+ professionals, reducing turnover by 15% and fostering a culture of agile experimentation' },
                { achievementText: 'Pioneered an AI-driven personalization engine that enhanced customer lifetime value (CLV) by 22% and automated $100M in repeat sales' },
                { achievementText: 'Optimized an annual marketing budget of $250M, achieving a record-breaking 6:1 ROI through strategic channel diversification and programmatic media buying' },
                { achievementText: 'Established the company’s first "Sustainable Impact" program, which became the top-performing marketing asset in terms of social engagement and earned media' }
            ]
        },
        {
            jobTitle: 'VP of Marketing & Digital Strategy',
            companyName: 'TechGrowth Enterprises',
            location: 'San Francisco, CA',
            startDate: '2014-06',
            endDate: '2018-12',
            isCurrent: false,
            roleDescription: 'Led global marketing and demand generation for a B2B SaaS platform during its hypergrowth stage from Series C to Post-IPO.',
            achievements: [
                { achievementText: 'Scaled annual recurring revenue (ARR) from $50M to $350M in 48 months through a robust account-based marketing (ABM) framework' },
                { achievementText: 'Architected a lead-to-revenue engine that generated 15,000+ qualified MQLs monthly with a 20% conversion-to-closed-won rate' },
                { achievementText: 'Orchestrated the marketing launch of the company’s IPO on the NYSE, securing $400M in public funding and widespread media coverage' },
                { achievementText: 'Partnered with Product teams to launch 12+ major feature releases, achieving a 90% adoption rate within the first 6 months' }
            ]
        },
        {
            jobTitle: 'Director of Digital Transformation & Customer Experience',
            companyName: 'Consumer Brands Inc',
            location: 'New York, NY',
            startDate: '2009-03',
            endDate: '2014-05',
            isCurrent: false,
            roleDescription: 'Pioneered the digital-first pivot for a traditional $2B beverage company, modernizing the customer journey and tech stack.',
            achievements: [
                { achievementText: 'Increased digital-attributed revenue from 2% to 40% of total sales through the launch of a D2C subscription platform' },
                { achievementText: 'Led the redesign of the mobile experience, winning "Best in Class" eCommerce UX award and boosting mobile checkout by 75%' },
                { achievementText: 'Implemented the first-ever global CRM (Salesforce) across 15 regional offices, harmonizing customer data for 20M+ users' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Kellogg School of Management, Northwestern University',
            degree: 'Master of Business Administration (MBA)',
            location: 'Evanston, IL',
            endYear: 2008,
            achievements: 'Dean\'s List for Academic Excellence, Kellogg Marketing Award'
        },
        {
            institutionName: 'University of Michigan',
            degree: 'Bachelor of Arts in Marketing & Economics',
            location: 'Ann Arbor, MI',
            endYear: 2004,
            achievements: 'Summa Cum Laude, President of Michigan Marketing Association'
        }
    ],
    skills: [
        { skillName: 'Strategic Brand Vision', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Global P&L Management ($300M+)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Digital Transformation & MarTech', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Growth Hacking & Performance Marketing', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'M&A and Post-Merger Integration', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Executive Leadership & Mentoring', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Customer Insights & Data Analytics', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Stakeholder & Investor Relations', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    professionalAffiliations: [
        {
            organizationName: 'Forbes Marketing Council',
            roleOrMembership: 'Charter Member & Contributor',
            yearsActive: '2016-Present'
        },
        {
            organizationName: 'American Marketing Association (AMA)',
            roleOrMembership: 'Board Member, Chicago Chapter',
            yearsActive: '2018-Present'
        }
    ],
    customSections: [
        {
            title: 'Awards & Honors',
            items: [
                { text: 'AdAge "CMO of the Year" Finalist (2022)' },
                { text: 'Marketing Week "Top 100 Most Influential Marketers" (2021)' },
                { text: 'Digital Innovation Award, Retail Excellence Summit (2020)' }
            ]
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
        professionalTitle: 'Creative Director & Brand Architect',
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
        summaryText: 'Multi-disciplinary, award-winning Creative Director with 12+ years of experience blending conceptual storytelling with technical design precision. Expert in building iconic visual identities for global lifestyle, tech, and luxury brands. Recognized for a unique ability to translate complex business objectives into "stop-and-stare" visual narratives. Led high-performance creative teams that have collectively secured 15+ industry awards, including Cannes Lions, D&AD, and AIGA recognitions. Obsessed with the intersection of art, technology, and human behavior.'
    },
    workExperience: [
        {
            jobTitle: 'Creative Director',
            companyName: 'Visionary Creative Agency',
            location: 'Brooklyn, NY',
            startDate: '2020-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Steering the creative ship for a boutique agency, managing a diverse roster of premium clients and driving the overall artistic vision.',
            achievements: [
                { achievementText: 'Directed 25+ integrated high-impact campaigns for clients like Nike, Spotify, and Aesop, generating over 350M+ combined digital impressions' },
                { achievementText: 'Won a Gold Lion at Cannes for "The Unseen Connection," an industry-first augmented reality (AR) brand experience for a luxury watchmaker' },
                { achievementText: 'Grew agency annual recurring revenue by 150% in 3 years through strategic pitching and the introduction of motion design as a core service' },
                { achievementText: 'Transformed the internal creative process by implementing a structured "Discovery-Led" design framework, reducing project turnaround by 25%' },
                { achievementText: 'Mentored a cross-functional team of 15 designers, copywriters, and 3D artists, resulting in a 90% team retention rate and 4 internal promotions' }
            ]
        },
        {
            jobTitle: 'Senior Art Director',
            companyName: 'Modern Brand Studio',
            location: 'Manhattan, NY',
            startDate: '2016-01',
            endDate: '2020-02',
            isCurrent: false,
            roleDescription: 'Architected visual concepts and design systems for Fortune 500 brands and disruptive "Unicorn" startups.',
            achievements: [
                { achievementText: 'Spearheaded the rebranding of 3 tech startups from seed phase to Series C, all of which successfully achieved Unicorn status ($1B+ valuations)' },
                { achievementText: 'Led a global rebranding project for a heritage fashion label, featured as a cover story in Communication Arts and Print Magazine' },
                { achievementText: 'Produced and directed over 15 high-production photo and video shoots with individual budgets exceeding $500,000' },
                { achievementText: 'Collaborated with international photographers and stylists to define a new "Visual DNA" for the studio’s premier luxury client' }
            ]
        },
        {
            jobTitle: 'Art Director',
            companyName: 'Digital First Agency',
            location: 'San Francisco, CA',
            startDate: '2013-06',
            endDate: '2015-12',
            isCurrent: false,
            roleDescription: 'Focused on digital-native campaigns and product design for early-stage Silicon Valley ventures.',
            achievements: [
                { achievementText: 'Conceptualized a viral social media campaign that trended globally and reached 50M+ organic users within the first week' },
                { achievementText: 'Lead UX/UI designer for a fitness app that maintained a 4.9 App Store rating and was featured in "Apple’s Best of the Year"' },
                { achievementText: 'Worked directly with engineering teams to bridge the gap between creative vision and technical feasibility using early-stage Figma prototypes' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'School of Visual Arts (SVA)',
            degree: 'Bachelor of Fine Arts (BFA)',
            fieldOfStudy: 'Advertising & Design',
            location: 'New York, NY',
            endYear: 2013,
            achievements: 'Silas Rhodes Scholar, SVA Portfolio Award'
        }
    ],
    skills: [
        { skillName: 'Creative Direction & Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Brand Identity & Visual Systems', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Adobe Creative Cloud (Expert)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Figma & UI/UX Principles', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Motion Design (After Effects)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Copywriting & Conceptual Storytelling', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Video & Photoshoot Direction', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: '3D Design (Cinema 4D/Blender)', skillType: 'technical', proficiencyLevel: 'intermediate' }
    ],
    achievements: [
        {
            achievementTitle: 'Gold Lion - Best Use of AR',
            issuingBody: 'Cannes Lions International Festival of Creativity',
            year: 2022,
            description: 'For "The Unseen Connection" Luxury AR Experience'
        },
        {
            achievementTitle: 'Yellow Pencil - Branding',
            issuingBody: 'D&AD Awards',
            year: 2021,
            description: 'Recognizing excellence in corporate brand identity design'
        },
        {
            achievementTitle: 'Young Guns Winner',
            issuingBody: 'The One Club for Creativity',
            year: 2018,
            description: 'Top global creative professionals under the age of 30'
        }
    ],
    customSections: [
        {
            title: 'Featured Projects & Press',
            items: [
                { text: 'Nike "Run as One": 500M+ impressions, Featured in Hypebeast & Highsnobiety' },
                { text: 'Spotify "Wrapped" Evolution: Lead Creative on 2018/2019 global rollouts' },
                { text: 'AIGA National Design Conference: Keynote Speaker on "The Future of Branding"' }
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
        professionalTitle: 'Senior Business Development Manager & Strategic Lead',
        email: 'daniel.foster@bizdev.com',
        phone: '+1 (555) 999-0000',
        city: 'Dallas',
        country: 'TX',
        location: 'Dallas, TX',
        linkedinUrl: 'linkedin.com/in/danielfoster-bd'
    },
    professionalSummary: {
        summaryText: 'Dynamic and high-impact Business Development Professional with 10+ years of experience driving aggressive revenue growth and securing high-value strategic partnerships within the enterprise software sector. Proven architecture of market expansion strategies that have consistently exceeded sales quotas by 150%+ annually. Expert in full-cycle sales management, complex contract negotiation, and multi-layered relationship building with C-suite stakeholders. Recognized for a data-driven approach to pipeline management and a relentless focus on customer acquisition and long-term retention.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Business Development Manager',
            companyName: 'Enterprise Solutions Group',
            location: 'Dallas, TX',
            startDate: '2020-04',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading the regional business development division, overseeing a team of 8 senior associates and directing the expansion strategy for a $100M SaaS portfolio.',
            achievements: [
                { achievementText: 'Orchestrated the closing of a landmark $15M multi-year contract with a Fortune 100 client, the largest in company history' },
                { achievementText: 'Developed and executed a strategic expansion plan for the Latin American market, securing 25+ key partnerships in 18 months' },
                { achievementText: 'Increased qualified pipeline value from $10M to $65M within the first 24 months through improved lead scoring and SDR alignment' },
                { achievementText: 'Consistently ranked as "Top Global Performer" (out of 150 associates), achieving 155% of annual target in 2022' },
                { achievementText: 'Mentored 5 junior associates who all achieved at least 110% of their quotas within their first 12 months' },
                { achievementText: 'Implemented a new CRM-based forecasting model that improved revenue predictability for the board by 30%' }
            ]
        },
        {
            jobTitle: 'Business Development Associate',
            companyName: 'TechVentures Inc',
            location: 'Austin, TX',
            startDate: '2016-08',
            endDate: '2020-03',
            isCurrent: false,
            roleDescription: 'Responsible for outbound prospecting, client acquisition, and managing the initial sales lifecycle for high-growth tech accounts.',
            achievements: [
                { achievementText: 'Executed over 1,000+ discovery calls and successfully closed 45+ deals with an average contract value (ACV) of $600K' },
                { achievementText: 'Single-handedly built a regional sales pipeline of $18M in qualified opportunities from a zero-base' },
                { achievementText: 'Reduced the average sales cycle internally from 9 months to 5.5 months through the introduction of a semi-automated nurturing sequence' },
                { achievementText: 'Collaborated with the Product team to advocate for enterprise features that unlocked three new industry verticals' }
            ]
        },
        {
            jobTitle: 'Junior Account Executive',
            companyName: 'CloudScale Services',
            location: 'Austin, TX',
            startDate: '2014-06',
            endDate: '2016-07',
            isCurrent: false,
            roleDescription: 'Focused on territory management and lead conversion for a cloud infrastructure provider.',
            achievements: [
                { achievementText: 'Achieved 120% of quota in the first year and was promoted to Senior Associate within 18 months' },
                { achievementText: 'Developed a comprehensive "Sales Playbook" that was adopted across the national sales force' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Texas at Dallas',
            degree: 'Bachelor of Business Administration (BBA)',
            fieldOfStudy: 'Marketing & Global Business',
            location: 'Dallas, TX',
            endYear: 2014,
            achievements: 'Cum Laude, Beta Gamma Sigma Honor Society, Dean’s Excellence Award'
        }
    ],
    skills: [
        { skillName: 'Full-Cycle Sales & BD Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Strategic Partnership Development', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Salesforce & HubSpot CRM Specialist', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Complex Contract Negotiation (M&A)', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Market Research & Gap Analysis', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'C-Suite Communication & Presenting', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Pipeline Forecasting & Data Analytics', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'Certified Business Development Professional (CBDP)',
            issuingOrganization: 'Business Strategy Institute',
            issueYear: 2019
        },
        {
            certificationName: 'Advanced Negotiation Certification',
            issuingOrganization: 'The Gap Partnership',
            issueYear: 2021
        }
    ],
    customSections: [
        {
            title: 'Key Speaking Engagements',
            items: [
                { text: 'Speaker at Dallas Tech Summit: "Scaling SaaS through Strategic Alliances" (2022)' },
                { text: 'Guest Lecturer at UT Dallas: "Modern Sales Methodologies" (2021)' },
                { text: 'Panelist at Global BD Forum: "The Future of Partnership Ecosystems" (2020)' }
            ]
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
        professionalTitle: 'Global Luxury Brand Director',
        email: 'sophia.laurent@luxebrands.com',
        phone: '+33 6 12 34 56 78',
        city: 'Paris',
        country: 'France',
        location: 'Paris, France',
        linkedinUrl: 'linkedin.com/in/sophialaurent',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Distinguished Global Luxury Brand Director with over 15 years of experience elevating haute couture, fine jewelry, and premium lifestyle sectors. Proven expert in luxury brand positioning, heritage storytelling, and cultivating exclusive clientele relationships within the UHNW segment. Successfully orchestrated multiple brand turnarounds, driving a 45%+ increase in global revenue while enhancing prestige and market desirably. Fluent in French, English, and Italian with a deep-seated understanding of emerging luxury markets in Asia and the Middle East. Passionate about preserving artisan heritage while embracing digital innovation.'
    },
    workExperience: [
        {
            jobTitle: 'Global Brand Director',
            companyName: 'Maison de Luxe',
            location: 'Paris, France',
            startDate: '2018-09',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Defining and executing the global brand strategy for a multi-billion dollar heritage fashion house, overseeing all creative direction and market positioning.',
            achievements: [
                { achievementText: 'Orchestrated the successful repositioning of the "Heritage Collection," increasing average transaction value (ATV) by 45% and elevating the brand into the "Ultra-Luxe" category' },
                { achievementText: 'Curated and executed 10+ exclusive global events for UHNW clientele, including private runway shows in Macau and Dubai, generating €25M in direct sales' },
                { achievementText: 'Spearheaded the brand’s expansion into the Chinese market, overseeing the successful launch of 8 new flagship boutiques and achieving profitability in 12 months' },
                { achievementText: 'Led a cross-functional team of 45 creative directors, marketing leads, and CRM specialists to integrate a digital concierge service into the retail experience' },
                { achievementText: 'Collaborated with high-profile contemporary artists to launch three limited-edition capsule collections that sold out globally within 48 hours' }
            ]
        },
        {
            jobTitle: 'Senior Marketing & Communications Manager',
            companyName: 'Prestige Maison',
            location: 'Milan, Italy',
            startDate: '2013-03',
            endDate: '2018-08',
            isCurrent: false,
            roleDescription: 'Directed the product marketing and communication strategy for the luxury leather goods and accessories division.',
            achievements: [
                { achievementText: 'Developed and executed a global influencer and VIP strategy that reached 60M+ affluent consumers and increased organic brand mentions by 120%' },
                { achievementText: 'Managed an annual marketing budget of €18M with a consistent 7:1 ROI, optimized through data-driven media placements' },
                { achievementText: 'Launched the "Iconic Bag" global campaign, which resulted in a 3-year waitlist and a 35% increase in annual accessory revenue' },
                { achievementText: 'Coordinated the creative direction for the brand’s first-ever digital-only collection launch, garnering widespread industry praise' }
            ]
        },
        {
            jobTitle: 'Brand Manager - Haute Couture',
            companyName: 'L’Excellence Fashion',
            location: 'Paris, France',
            startDate: '2010-06',
            endDate: '2013-02',
            isCurrent: false,
            roleDescription: 'Owned the branding and market development for the custom-made couture division.',
            achievements: [
                { achievementText: 'Revitalized the couture department’s image, attracting a younger demographic and increasing new client inquiries by 50%' },
                { achievementText: 'Managed relationships with top-tier fashion publications, securing 15+ cover features for the brand’s premier collections' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'HEC Paris',
            degree: 'Master in Luxury Brand Management',
            location: 'Paris, France',
            endYear: 2010,
            achievements: 'Graduated with Highest Distinction'
        },
        {
            institutionName: 'Sorbonne University',
            degree: 'Bachelor of Arts in Art History & French Literature',
            location: 'Paris, France',
            endYear: 2008
        }
    ],
    skills: [
        { skillName: 'Luxury Brand Strategy & DNA Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'UHNW Client Relations & CRM Strategy', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Heritage Storytelling & Creative Direction', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Global Market Expansion (APAC/GCC Focus)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Public Relations & Medial Excellence', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Omnichannel Digital Luxury Experience', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Stakeholder & Investor Management', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    languages: [
        { languageName: 'French', proficiencyLevel: 'native' },
        { languageName: 'English', proficiencyLevel: 'fluent' },
        { languageName: 'Italian', proficiencyLevel: 'fluent' },
        { languageName: 'Mandarin', proficiencyLevel: 'intermediate' }
    ],
    customSections: [
        {
            title: 'Published Thought Leadership',
            items: [
                { text: '"The Future of Sustainable Luxury," Vogue Business (2023)' },
                { text: '"Digital Craftsmanship: Bridging Tradition and Tech," Financial Times (2021)' },
                { text: 'Keynote Speaker: International Luxury Summit, London (2022)' }
            ]
        }
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
        professionalTitle: 'Growth Product Manager | Entrepreneur-in-Residence',
        email: 'alex@startupmail.io',
        phone: '+1 (555) 123-9999',
        city: 'San Francisco',
        country: 'CA',
        location: 'San Francisco, CA',
        linkedinUrl: 'linkedin.com/in/alexchen-pm',
        websiteUrl: 'alexchen.io'
    },
    professionalSummary: {
        summaryText: 'Entrepreneurial and data-obsessed Product Manager with over 7 years of experience building 0-to-1 products and scaling high-growth startups within the YC and Sequoia ecosystems. Expert in lean startup methodology, rapid prototyping, and growth hacking. Successfully launched 5+ products that have reached a combined user base of 5M+ monthly active users (MAU). Proven track record of architecting viral growth loops and retention frameworks that survived multiple pivot cycles. Thrives in chaos and is deeply passionate about solving "wicked" problems through code, design, and market psychology.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Product Manager (Growth)',
            companyName: 'RocketShip (YC S21)',
            location: 'San Francisco, CA',
            startDate: '2022-01',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading the growth organization for a Series B fintech startup disruptive payroll for the global gig economy.',
            achievements: [
                { achievementText: 'Shipped the first MVP in just 8 weeks, acquiring 100K organic users in the first 3 months with a $0 CAC' },
                { achievementText: 'Designed and implemented a multi-stage viral referral engine that led to a 10x explosion in user growth within 6 months' },
                { achievementText: 'Spearheaded an A/B testing framework that increased Day-30 retention from 8% to 32% by optimizing the magic moment during onboarding' },
                { achievementText: 'Partnered directly with the CEO to architect the product narrative for a successful $40M Series B raise from top-tier VCs' },
                { achievementText: 'Built the first product analytics stack (Mixpanel/Segment) from the ground up, enabling data-driven decision making across the engineering team' }
            ]
        },
        {
            jobTitle: 'Product Manager / Core Employee #12',
            companyName: 'GrowthLabs (Acquired by PublicCo)',
            location: 'Palo Alto, CA',
            startDate: '2019-06',
            endDate: '2021-12',
            isCurrent: false,
            roleDescription: 'Owned the core product vision and end-to-end lifecycle for an AI-powered marketing automation tool.',
            achievements: [
                { achievementText: 'Scaled the product from a private beta of 100 users to over 750K MAUs through aggressive product-led growth (PLG) initiatives' },
                { achievementText: 'Implemented a dynamic pricing experiment that resulted in a 300% increase in monthly recurring revenue (MRR) in a single quarter' },
                { achievementText: 'Directed a cross-functional squad of 10 engineers and designers to launch a major mobile-first platform expansion' },
                { achievementText: 'Led the product-side due diligence during a $150M acquisition process by a Fortune 500 tech firm' }
            ]
        },
        {
            jobTitle: 'Founding Associate Product Manager',
            companyName: 'TechStartup Inc',
            location: 'Mountain View, CA',
            startDate: '2018-01',
            endDate: '2019-05',
            isCurrent: false,
            roleDescription: 'First PM hire responsible for setting the product culture and translating founder vision into actionable user stories.',
            achievements: [
                { achievementText: 'Designed and shipped 15+ "Big Rock" features based on qualitative user feedback and quantitative data signals' },
                { achievementText: 'Reduced churn by 35% within 6 months by launching a comprehensive customer feedback loop and bug prioritization system' },
                { achievementText: 'Coordinated the company’s first large-scale pilot program with 3 enterprise clients, leading to a $2M seed extension' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Stanford University',
            degree: 'Bachelor of Science in Computer Science & Human-Computer Interaction',
            location: 'Stanford, CA',
            endYear: 2017,
            achievements: 'President of Stanford Entrepreneurship Society'
        }
    ],
    skills: [
        { skillName: 'Product Strategy & Vision (0 to 1)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Growth Hacking & Viral Loops', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Lean UX & Rapid Prototyping', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'SQL / Mixpanel / Amplitude / Segment', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'A/B Testing & Multivariate Experiments', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Stakeholder Management (Board/Investors)', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Basic Python & React for Prototyping', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Agile & Kanban Methodologies', skillType: 'professional', proficiencyLevel: 'expert' }
    ],
    projects: [
        {
            projectName: 'TaskFlow Open Source App',
            role: 'Solo Creator',
            description: 'Built a lightweight, offline-first productivity app that gained a cult following on GitHub and Hacker News.',
            outcomes: '15,000+ stars on GitHub, Featured as #1 Product of the Day on Product Hunt',
            startDate: '2023',
            endDate: 'Present'
        },
        {
            projectName: 'The Growth Manual',
            role: 'Author',
            description: 'Weekly newsletter on startup growth strategies with 10k+ subscribers from the tech industry.',
            startDate: '2022'
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
        professionalTitle: 'Studio Ceramicist & Multimedia Artist',
        email: 'maya@artisanstudio.com',
        phone: '+1 (555) 246-8135',
        city: 'Portland',
        country: 'OR',
        location: 'Portland, OR',
        portfolioUrl: 'mayapatelceramics.com',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Award-winning Master Ceramicist with over 12 years of experience specializing in high-fire functional stoneware and conceptual sculptural installations. Deeply committed to the intersection of traditional craft and modern sustainable practices. Work is currently represented in 25+ galleries across North America and held in permanent collections at the Portland Museum of Art and several private foundations. Experienced in managing industrial-scale studio operations, mentoring emerging artists, and facilitating community-driven art workshops. Driven by the philosophy that functional objects should elevate the everyday human experience through texture, form, and story.'
    },
    workExperience: [
        {
            jobTitle: 'Founder & Lead Resident Artist',
            companyName: 'Earthen Studio & Collective',
            location: 'Portland, OR',
            startDate: '2016-03',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directing all artistic and business operations for a multi-disciplinary ceramic studio, overseeing production of signature lines and custom architectural commissions.',
            achievements: [
                { achievementText: 'Built a sustainable studio business from the ground up, currently generating $250K+ in annual revenue through a mix of wholesale, D2C, and commission work' },
                { achievementText: 'Designed and produced a signature "Coastal Texture" collection currently stocked by 20+ high-end retail partners nationwide, including West Elm (Local) and Anthropologie' },
                { achievementText: 'Successfully secured and executed a $50K public art commission for a permanent large-scale installation at the Portland International Airport' },
                { achievementText: 'Curated and taught over 50+ sold-out workshops, mentoring 1,000+ students in advanced wheel-throwing and glaze chemistry' },
                { achievementText: 'Maintained a zero-waste studio protocol, recycling 100% of scrap clay and implementing solar-powered kiln firing schedules' }
            ]
        },
        {
            jobTitle: 'Resident Artist & Instructor',
            companyName: 'Craftworks Collective',
            location: 'Seattle, WA',
            startDate: '2012-06',
            endDate: '2016-02',
            isCurrent: false,
            roleDescription: 'Focused on technical production and glaze development within a shared collaborative workspace.',
            achievements: [
                { achievementText: 'Formulated a proprietary "Obsidian Ash" glaze series that was featured as a technical case study in the June 2015 issue of Ceramics Monthly' },
                { achievementText: 'Achieved "Best in Sales" honors at 10 consecutive juried craft fairs, including the American Craft Council (ACC) show in San Francisco' },
                { achievementText: 'Mentored a cohort of 5 emerging ceramic artists through a 12-month residency program, resulting in 3 successful solo exhibitions' },
                { achievementText: 'Managed kiln schedules and maintenance for a 15-person collective, improving firing efficiency by 20% through optimized loading techniques' }
            ]
        },
        {
            jobTitle: 'Studio Assistant (Apprenticeship)',
            companyName: 'Red Hill Pottery',
            location: 'Providence, RI',
            startDate: '2010-01',
            endDate: '2012-05',
            isCurrent: false,
            roleDescription: 'Completed intensive apprenticeship under Master Potter Richard Sullivan, emphasizing production discipline and materials science.',
            achievements: [
                { achievementText: 'Processed over 2 tons of clay monthly and mastered the production of standard-ware for a high-volume studio' },
                { achievementText: 'Developed deep expertise in atmospheric firings including Wood, Salt, and Soda techniques' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Rhode Island School of Design (RISD)',
            degree: 'Master of Fine Arts (MFA)',
            fieldOfStudy: 'Ceramics & Material Science',
            location: 'Providence, RI',
            endYear: 2012,
            achievements: 'Graduate Fellowship Recipient, RISD Museum Solo Merit Award'
        },
        {
            institutionName: 'Portland State University',
            degree: 'Bachelor of Fine Arts (BFA)',
            fieldOfStudy: 'Studio Art & Design',
            location: 'Portland, OR',
            endYear: 2009
        }
    ],
    skills: [
        { skillName: 'Master-Level Wheel Throwing', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Glaze Chemistry & Formulation', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Industrial Kiln Management (Electric/Gas)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Architectural Installation Design', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Small Business Strategy & E-commerce', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Curriculum Development & Teaching', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Sustainability & Circular Economy in Art', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Multimedia (Wood/Metal) Integration', skillType: 'technical', proficiencyLevel: 'intermediate' }
    ],
    achievements: [
        {
            achievementTitle: 'Best in Show - Ceramics',
            issuingBody: 'American Craft Council (ACC)',
            year: 2021,
            description: 'Awarded for technical innovation and aesthetic excellence'
        },
        {
            achievementTitle: 'Emerging Artist of the Year',
            issuingBody: 'National Council on Education for the Ceramic Arts (NCECA)',
            year: 2015
        }
    ],
    customSections: [
        {
            title: 'Selected Exhibitions & Press',
            items: [
                { text: 'Solo: "Memory of Earth" - Portland Contemporary Gallery (2023)' },
                { text: 'Group: "Modern Craft" - Museum of Arts and Design, NYC (2022)' },
                { text: 'Press: Featured in Wallpaper* Magazine "Top Artists to Watch" (2021)' },
                { text: 'Public: Permanent Installation, Delta Wing - PDX Airport (2020)' }
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
        professionalTitle: 'Senior Cybersecurity Architect & Incident Lead',
        email: 'marcus.thompson@securemail.com',
        phone: '+1 (555) 369-2580',
        city: 'Washington',
        country: 'DC',
        location: 'Washington, DC',
        linkedinUrl: 'linkedin.com/in/marcusthompson-security'
    },
    professionalSummary: {
        summaryText: 'Battle-tested Senior Cybersecurity Architect with over 7 years of specialized experience defending high-value federal and corporate enterprise infrastructures. Expert in proactive threat hunting, complex incident response (IR), and the architecture of zero-trust security frameworks. CISSP and CEH certified with a proven record of neutralizing advanced persistent threats (APTs) and reducing organizational attack surface vulnerability by over 85%. Exceptional at translating technical risk into strategic board-level narratives and leading global security operations centers (SOC) through high-pressure breach scenarios.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Cybersecurity Architect / SOC Lead',
            companyName: 'Federal Security Solutions',
            location: 'Washington, DC',
            startDate: '2020-07',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Technical lead for a 24/7 security operations division defending critical national infrastructure against nation-state actors.',
            achievements: [
                { achievementText: 'Successfully detected and neutralized a significant APT lateral movement attempt, preventing an estimated $10M in potential data exfiltration' },
                { achievementText: 'Architected and deployed a Next-Gen SIEM (Splunk/Sentinel) solution across 5 federal agencies, reducing the mean time to respond (MTTR) by 60%' },
                { achievementText: 'Spearheaded a comprehensive cloud security migration (AWS/Azure), implementing automated CSPM tools that remediated 500+ misconfigurations in Q1' },
                { achievementText: 'Created an internal "Red Team" simulation program that improved the incident detection capabilities of the junior SOC staff by 40%' },
                { achievementText: 'Directed a response team of 10 analysts during the SolarWinds supply chain crisis, ensuring zero impact on core client assets through rapid patching and forensics' }
            ]
        },
        {
            jobTitle: 'Cybersecurity Analyst (Blue Team)',
            companyName: 'TechDefense Corp',
            location: 'Arlington, VA',
            startDate: '2017-03',
            endDate: '2020-06',
            isCurrent: false,
            roleDescription: 'Focused on continuous monitoring, digital forensics, and network hardening for a major aerospace contractor.',
            achievements: [
                { achievementText: 'Responded to over 250+ authenticated security incidents with a 100% successful remediation rate within established SLAs' },
                { achievementText: 'Developed and automated a baseline security policy for all company endpoints, reducing malware infection rates by 75% within 12 months' },
                { achievementText: 'Implemented a multi-factor authentication (MFA) roll-out for 5,000+ employees, effectively eliminating credential-stuffing attacks' },
                { achievementText: 'Conducted bi-annual "Phishing Survival" training sessions, reducing the employee click rate from 12% to less than 1%' }
            ]
        },
        {
            jobTitle: 'Junior Network Engineer',
            companyName: 'SecureConnect Systems',
            location: 'Blacksburg, VA',
            startDate: '2015-06',
            endDate: '2017-02',
            isCurrent: false,
            roleDescription: 'Supported the design and maintenance of secure network backbones for regional healthcare providers.',
            achievements: [
                { achievementText: 'Assisted in the configuration of over 50+ enterprise Firewalls and VPN concentrators' },
                { achievementText: 'Optimized network routing protocols that improved data throughput for imaging systems by 20%' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'George Washington University',
            degree: 'Master of Science in Cybersecurity Operations & Policy',
            location: 'Washington, DC',
            endYear: 2019,
            achievements: 'CyberCorps Scholarship for Service (SFS) Recipient'
        },
        {
            institutionName: 'Virginia Tech',
            degree: 'Bachelor of Science in Computer Science & Networking',
            location: 'Blacksburg, VA',
            endYear: 2015
        }
    ],
    skills: [
        { skillName: 'Threat Hunting & APT Neutralization', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Incident Response & Digital Forensics', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'SIEM / SOAR (Splunk, Sentinel, Palo Alto)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Cloud Security (AWS/Azure/GCP)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Zero trust Network Architecture (ZTNA)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Python / Bash Scripting for Automation', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Penetration Testing (Metasploit, Kali)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'NIST & ISO 27001 Compliance', skillType: 'professional', proficiencyLevel: 'expert' }
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
            certificationName: 'OSCP (Offensive Security Certified Professional)',
            issuingOrganization: 'Offensive Security',
            issueYear: 2022
        }
    ],
    customSections: [
        {
            title: 'Conference Presentations',
            items: [
                { text: 'DEF CON: "Defending Federal Pipelines from Nation-State Actors" (2022)' },
                { text: 'BSides DC: "Automating Blue Team Workflows with Python" (2021)' },
                { text: 'Guest Speaker: VT Cybersecurity Symposium (2020)' }
            ]
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
        fullName: 'Oliver Vance',
        professionalTitle: 'Lead Editorial Strategist & Content Director',
        email: 'oliver.vance@mediahub.com',
        phone: '+1 (555) 555-7777',
        city: 'New York',
        country: 'NY',
        location: 'New York, NY',
        linkedinUrl: 'linkedin.com/in/olivervance-media'
    },
    professionalSummary: {
        summaryText: 'Versatile and high-velocity Content Director with 10+ years of experience steering editorial strategy for major digital media platforms and legacy publications. Expert in high-volume content production, audience development via SEO/Social, and cross-platform brand storytelling. Successfully grew monthly unique visitors for "The Urban Daily" from 500K to 8M in under 3 years. Adept at managing large, remote teams of writers, editors, and videographers while maintaining rigorous quality standards and voice consistency. Passionate about the evolution of digital journalism and data-informed editorial decision making.'
    },
    workExperience: [
        {
            jobTitle: 'Lead Editorial Strategist / Content Director',
            companyName: 'MediaHub Global',
            location: 'New York, NY',
            startDate: '2019-11',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading the editorial vision and operational strategy for a portfolio of 5 digital lifestyle brands reaching 20M+ combined monthly readers.',
            achievements: [
                { achievementText: 'Orchestrated a comprehensive SEO-first content strategy that increased organic search traffic by 150% and reduced reliance on paid acquisition by 40%' },
                { achievementText: 'Launched the company’s first premium newsletter subscription service, achieving 50,000 paid subscribers and $2.5M in annual recurring revenue (ARR) in Year 1' },
                { achievementText: 'Built a centralized editorial "Newsroom" workflow that improved multi-platform publishing speed by 35% without increasing headcount' },
                { achievementText: 'Directed the creative production of 3 award-winning video series that collectively garnered 50M+ views on YouTube and Instagram' },
                { achievementText: 'Negotiated and managed high-value content syndication deals with Apple News, Google News, and MSN Media' },
                { achievementText: 'Implemented a data-driven content feedback loop using Parse.ly, resulting in a 25% increase in average time-on-page across all sites' }
            ]
        },
        {
            jobTitle: 'Senior Editor & Head of Special Projects',
            companyName: 'The Urban Daily',
            location: 'New York, NY',
            startDate: '2015-05',
            endDate: '2019-10',
            isCurrent: false,
            roleDescription: 'Owned the long-form investigative and high-profile feature department during a period of rapid digital expansion.',
            achievements: [
                { achievementText: 'Exceeded traffic targets by 200% for 3 consecutive years through a mix of viral storytelling and evergreen content optimization' },
                { achievementText: 'Edited and published a landmark investigative series on "Urban Sustainability" which won the National Press Club Award' },
                { achievementText: 'Managed a freelance budget of $500K annually, hiring and mentoring a diverse stable of 50+ international contributors' },
                { achievementText: 'Spearheaded the publication’s first-ever print-to-digital archival project, modernizing 20 years of content for the web' }
            ]
        },
        {
            jobTitle: 'Associate Editor',
            companyName: 'Metro Lifestyle Mag',
            location: 'Chicago, IL',
            startDate: '2012-06',
            endDate: '2015-04',
            isCurrent: false,
            roleDescription: 'Focused on daily news coverage, arts and culture reviews, and digital community management.',
            achievements: [
                { achievementText: 'Increased social media engagement by 300% through the introduction of interactive polls and video-led storytelling' },
                { achievementText: 'Wrote over 500+ articles ranging from breaking news to in-depth profile pieces for the digital edition' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'Columbia Graduate School of Journalism',
            degree: 'Master of Science in Digital Media',
            location: 'New York, NY',
            endYear: 2012,
            achievements: 'Digital Media Innovation Fellow'
        },
        {
            institutionName: 'Northwestern University',
            degree: 'Bachelor of Science in Journalism',
            location: 'Evanston, IL',
            endYear: 2010
        }
    ],
    skills: [
        { skillName: 'Editorial Strategy & Vision', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'High-Velocity Content Production', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Advanced SEO & SEM Strategy', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Audience Development & Growth', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Budget & Team Management ($500K+)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'CMS Mastery (WordPress, Drupal, Custom)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Google Analytics & Parse.ly Data Mastery', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Video & Podcast Production Oversight', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    customSections: [
        {
            title: 'Awards & Honors',
            items: [
                { text: 'National Press Club: Award for Online Excellence (2021)' },
                { text: 'Media Week: "30 Under 30" in Digital Publishing (2018)' },
                { text: 'Finalist: Pulitzer Prize in Explanatory Reporting (Project Contributor, 2019)' }
            ]
        }
    ]
}

// --- 21. Graduate Template Persona ---
export const MOCK_GRADUATE_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-graduate-template',
    title: 'New Graduate Resume',
    documentType: 'resume',
    templateId: 'graduate',
    personalInfo: {
        fullName: 'Liam O’Donnell',
        professionalTitle: 'Environmental Science Research Graduate',
        email: 'liam.odonnell@university.edu',
        phone: '+1 (555) 000-1111',
        city: 'Seattle',
        country: 'WA',
        location: 'Seattle, WA',
        linkedinUrl: 'linkedin.com/in/liam-odonnell-science'
    },
    professionalSummary: {
        summaryText: 'Rigorous and highly motivated Environmental Science graduate with a 3.96 GPA and a deep commitment to sustainable resource management and climate resilience. Proven expertise in data-driven environmental research, field-based ecological assessment, and the application of GIS for complex spatial analysis. Recognized for exceptional academic performance and a proactive approach to collaborative lab work. Eager to contribute technical proficiency in water quality monitoring and environmental impact assessment (EIA) to a forward-thinking environmental consultancy or research organization.'
    },
    education: [
        {
            institutionName: 'University of Washington',
            degree: 'Bachelor of Science in Environmental Science & Sustainability',
            location: 'Seattle, WA',
            endYear: 2024,
            gpa: '3.96',
            achievements: 'President’s List (All Semesters), Phi Beta Kappa, Environmental Research Excellence Award, Dean’s Senior Thesis Grant'
        }
    ],
    workExperience: [
        {
            jobTitle: 'Lead Environmental Research Assistant',
            companyName: 'University Coastal Ecology Lab',
            location: 'Seattle, WA',
            startDate: '2022-09',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Directed a team of 4 undergraduate students in the collection and analysis of coastal water quality data for a federally funded climate impact study.',
            achievements: [
                { achievementText: 'Processed and analyzed 1,000+ water samples for pH, salinity, and nitrogen levels, documenting 15% increase in acidity over 24 months' },
                { achievementText: 'Pioneered an automated data collection workflow using Python and Raspberry Pi sensors, reducing manual labor by 20 hours per week' },
                { achievementText: 'Presented preliminary research findings at the National Environmental Science Symposium (2023), receiving "Best Poster" out of 50+ entries' },
                { achievementText: 'Co-authored a peer-reviewed research paper titled "Urban Runoff Impacts on Puget Sound Biodiversity" (pending publication)' }
            ]
        },
        {
            jobTitle: 'Conservation Intern',
            companyName: 'Washington Department of Fish & Wildlife',
            location: 'Olympia, WA',
            startDate: '2023-06',
            endDate: '2023-08',
            isCurrent: false,
            roleDescription: 'Supported field biologists in the monitoring and preservation of native salmonid populations across three regional watersheds.',
            achievements: [
                { achievementText: 'Conducted detailed habitat assessments for 25+ miles of streams, identifying and mapping 12 key degradation zones using ArcGIS' },
                { achievementText: 'Assisted in the tagging and relocation of 500+ endangered fish, maintaining a 99% successful relocation rate' },
                { achievementText: 'Developed an educational pamphlet on "Riparian Zone Importance" that was distributed to 200+ local landowners' }
            ]
        },
        {
            jobTitle: 'Laboratory Technician (Work-Study)',
            companyName: 'UW Marine Chemistry Department',
            location: 'Seattle, WA',
            startDate: '2021-01',
            endDate: '2022-05',
            isCurrent: false,
            roleDescription: 'Managed equipment calibration and reagent preparation for a high-volume marine chemistry teaching lab.',
            achievements: [
                { achievementText: 'Ensured 100% compliance with OSHA safety standards for a lab serving 200+ students weekly' },
                { achievementText: 'Implemented a digital inventory tracking system that reduced lab supply waste by 15% annually' }
            ]
        }
    ],
    skills: [
        { skillName: 'Environmental Impact Assessment (EIA)', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'GIS & Spatial Analysis (ArcGIS/QGIS)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Field Data Collection & Ecological Sampling', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Python for Data Analysis & Automation', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Water Quality Monitoring & Chemistry', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Scientific Writing & Grant Support', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Project Management & Leadership', skillType: 'professional', proficiencyLevel: 'advanced' },
        { skillName: 'Public Speaking & Presentation', skillType: 'professional', proficiencyLevel: 'advanced' }
    ],
    certifications: [
        {
            certificationName: 'HAZWOPER 40-Hour Certification',
            issuingOrganization: 'OSHA',
            issueYear: 2024
        },
        {
            certificationName: 'PADI Advanced Open Water Diver (Scientific Focus)',
            issuingOrganization: 'PADI',
            issueYear: 2023
        }
    ],
    volunteerExperience: [
        {
            roleTitle: 'Volunteer Coordinator',
            organizationName: 'Seattle Stream Keepers',
            startDate: '2020-09',
            endDate: 'Present',
            contributions: 'Organizing bi-weekly stream clean-up events and tree planting initiatives involving 50+ local volunteers.'
        }
    ]
}

// --- 22. Cute Template Persona ---
export const MOCK_CUTE_TEMPLATE_DATA: ResumeDocument = {
    id: 'preview-cute-template',
    title: 'Cute & Modern Resume',
    documentType: 'resume',
    templateId: 'cute',
    personalInfo: {
        fullName: 'Zoe Bell',
        professionalTitle: 'Social Media Strategist & Brand Manager',
        email: 'hello@zoebell.com',
        phone: '+1 (555) 888-2222',
        city: 'Santa Monica',
        country: 'CA',
        location: 'Santa Monica, CA',
        linkedinUrl: 'linkedin.com/in/zoebell-social',
        portfolioUrl: 'zoebell.co',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    professionalSummary: {
        summaryText: 'Creative and trend-responsive Social Media Strategist with 6+ years of experience building vibrant online communities for lifestyle, beauty, and D2C brands. Expert in short-form video production (TikTok/Reels), influencer partnership management, and data-backed content planning. Proven ability to turn "followers into fans" and fans into loyal customers. Successfully increased organic engagement by 400% for a boutique skincare line and managed a combined social reach of 3M+ across platforms. Passionate about authentic storytelling, aesthetic consistency, and the latest digital subcultures.'
    },
    workExperience: [
        {
            jobTitle: 'Senior Social Media Strategist',
            companyName: 'Glow & Co Beauty',
            location: 'Los Angeles, CA',
            startDate: '2021-06',
            endDate: 'Present',
            isCurrent: true,
            roleDescription: 'Leading the creative social vision and influencer ecosystem for a high-growth, Gen-Z focused beauty brand.',
            achievements: [
                { achievementText: 'Designed and executed a TikTok-first growth strategy that resulted in 500K+ new followers and 3 viral products within 12 months' },
                { achievementText: 'Managed an influencer marketing budget of $500K, partnering with 200+ creators and achieving a 4x ROI on affiliate sales' },
                { achievementText: 'Conceptualized and produced weekly "Behind the Glow" video series which consistently maintains a 10% engagement rate (top 1% in industry)' },
                { achievementText: 'Collaborated with the Product team to launch a limited-edition "Community Choice" palette based on social sentiment data' },
                { achievementText: 'Built a dedicated community management team, reducing response time on social DMs to under 2 hours' }
            ]
        },
        {
            jobTitle: 'Social Media Coordinator',
            companyName: 'Urban Oasis Lifestyle',
            location: 'West Hollywood, CA',
            startDate: '2018-09',
            endDate: '2021-05',
            isCurrent: false,
            roleDescription: 'Focused on daily content creation, community engagement, and paid social campaign management.',
            achievements: [
                { achievementText: 'Pioneered the brand’s entry into Instagram Reels, driving a 250% increase in reach within the first 3 months of rollout' },
                { achievementText: 'Managed a highly successful 12-day "Holiday Giveaway" campaign that generated 50K+ new email leads and 100K+ comments' },
                { achievementText: 'Designed 100+ high-aesthetic Canva templates for social use, ensuring brand consistency across all digital touchpoints' },
                { achievementText: 'Provided weekly analytics reports to the Marketing Director, identifying key trends that informed the following month’s content calendar' }
            ]
        },
        {
            jobTitle: 'Digital Marketing Intern',
            companyName: 'Sunset PR Agency',
            location: 'Santa Monica, CA',
            startDate: '2017-06',
            endDate: '2018-08',
            isCurrent: false,
            roleDescription: 'Supported the PR and social teams in client outreach, content scheduling, and event coverage.',
            achievements: [
                { achievementText: 'Assisted in the onsite social coverage of 10+ major red-carpet events and product launches' },
                { achievementText: 'Conducted influencer research and outreach for a successful wellness brand launch' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Southern California (USC)',
            degree: 'Bachelor of Arts in Public Relations & Digital Media',
            location: 'Los Angeles, CA',
            endYear: 2018,
            achievements: 'Magna Cum Laude, President of PRSSA Chapter'
        }
    ],
    skills: [
        { skillName: 'Social Media Strategy (TikTok/IG/Pinterest)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Short-Form Video Production & Editing', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Influencer Discovery & Management', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Content Planning (Later, Planoly, Sprout)', skillType: 'technical', proficiencyLevel: 'expert' },
        { skillName: 'Graphic Design (Canva, Photoshop)', skillType: 'technical', proficiencyLevel: 'advanced' },
        { skillName: 'Community Management & CS', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Copywriting (Brand Voice Focused)', skillType: 'professional', proficiencyLevel: 'expert' },
        { skillName: 'Data Analytics & Trend Forecasting', skillType: 'technical', proficiencyLevel: 'advanced' }
    ],
    projects: [
        {
            projectName: 'The Aesthetic Feed Workshop',
            role: 'Creator',
            description: 'A monthly online workshop teaching small business owners how to build a cohesive visual brand on Instagram.',
            outcomes: '300+ graduates to date'
        }
    ],
    customSections: [
        {
            title: 'Interests & Passions',
            items: [
                { text: 'Aesthetic Interior Design & Thrifting' },
                { text: 'Sustainable Fashion & Slow Living' },
                { text: 'Exploring LA’s Best Coffee Shops' },
                { text: 'Modern Calligraphy & Stationery Design' }
            ]
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
    cute: MOCK_CUTE_TEMPLATE_DATA,
    ats_nursing: MOCK_NURSE_EXPERIENCED_DATA,
    ats_academia: MOCK_ACADEMIC_DATA
}
