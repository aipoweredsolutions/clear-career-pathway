export interface TemplateSEO {
    slug: string;
    name: string;
    industry: string;
    title: string;
    description: string;
    atsScore: number;
    whyItWorks: string;
    bestFor: string;
    templateId: string;
    sampleDataKey: string;
    faqs?: { q: string; a: string }[];
    exampleBullets?: string[];
}

export const SEO_TEMPLATES: TemplateSEO[] = [
    {
        slug: 'software-engineer-resume-template-free',
        name: 'Metro ATS Format',
        industry: 'Technology',
        title: 'ATS Resume Template for Software Engineers',
        description: 'A robust, single-column ATS compliant resume template specifically designed for Software Engineers, Developers, and DevOps professionals. Ensures 100% parsing of technical skills and GitHub links.',
        atsScore: 99,
        whyItWorks: 'Engineering resumes often get rejected by ATS because of complex multi-column layouts used for listing tech stacks. The Metro format resolves this by using structured semantic lists that applicant tracking systems parse perfectly.',
        bestFor: 'Software Engineers, Data Scientists, DevOps, and IT Professionals.',
        templateId: 'ats-metro-district',
        sampleDataKey: 'software_engineer',
        faqs: [
            { q: "Is this template suitable for entry-level developers?", a: "Yes, the single-column layout is perfect for highlighting internships and projects for junior engineers." },
            { q: "Can I include my GitHub profile?", a: "Absolutely. The header and experience sections are optimized for clickable, parsable links." }
        ],
        exampleBullets: [
            "Architected and deployed a microservices-based communication layer, reducing latency by 40%.",
            "Implemented automated CI/CD pipelines that reduced deployment errors by 75%."
        ]
    },
    {
        slug: 'data-analyst-resume-template-free',
        name: 'Technical ATS Format',
        industry: 'IT & Data',
        title: 'Technical ATS Resume Template for Data Analysts',
        description: 'A dense but highly readable ATS format optimized for listing numerous programming languages, security protocols, and data tools.',
        atsScore: 99,
        whyItWorks: 'IT resumes fail when skills are comma-separated in a single massive block. This template categorizes skills into logical, parsable rows that guarantee high keyword-match scoring.',
        bestFor: 'Data Analysts, Cybersecurity Specialists, System Admins, and QA Engineers.',
        templateId: 'ats-technical-cyan',
        sampleDataKey: 'software_engineer',
        faqs: [
            { q: "How should I list my technical skills?", a: "Use the categorized skill blocks to separate languages from tools and databases for better ATS extraction." }
        ],
        exampleBullets: [
            "Developed real-time data visualization dashboards using Python and SQL.",
            "Optimized database queries, reducing data processing time by 30%."
        ]
    },
    {
        slug: 'accountant-resume-template',
        name: 'Classic Left ATS Format',
        industry: 'Finance',
        title: 'Professional ATS Resume Template for Accountants',
        description: 'A sophisticated, high-end ATS compliant resume template featuring a unique left-aligned header layout. Perfectly balances classic serif typography with modern machine readability.',
        atsScore: 100,
        whyItWorks: 'Many legacy ATS systems (like Taleo) prioritize top-down, left-to-right scanning. By placing headers and dates in a dedicated visual column while maintaining a linear DOM structure, this template maximizes both aesthetic appeal and parsing accuracy.',
        bestFor: 'Accountants, Lawyers, Business Managers, and Traditional Professionals.',
        templateId: 'ats-classic-left',
        sampleDataKey: 'sales_executive',
        faqs: [
            { q: "Is the left column ATS friendly?", a: "Yes. While it looks like a column, the underlying code is a linear vertical flow, which is the gold standard for ATS compatibility." }
        ],
        exampleBullets: [
            "Managed multi-million dollar budgets with 100% audit accuracy.",
            "Implemented new accounting software that reduced closing time by 5 days."
        ]
    },
    {
        slug: 'project-manager-resume-template',
        name: 'Timeline ATS Format',
        industry: 'Project Management',
        title: 'ATS Resume Template for Project Managers',
        description: 'A crisp, modern ATS template that beautifully visualizes career progression while maintaining strict parsing compliance for Agile and PMP skills.',
        atsScore: 97,
        whyItWorks: 'Project managers need to show concurrent projects. This layout uses structured date hierarchies that ATS systems recognize, proving your tenure without causing parsing errors.',
        bestFor: 'Project Managers, Scrum Masters, Operations Leads, and Product Owners.',
        templateId: 'ats-timeline-emerald',
        sampleDataKey: 'software_engineer',
        exampleBullets: [
            "Led cross-functional teams of 15+ to deliver $2M projects on time and under budget.",
            "Reduced project cycle time by 20% using Agile methodologies."
        ]
    },
    {
        slug: 'customer-service-resume-template',
        name: 'Hospitality ATS Format',
        industry: 'Customer Service',
        title: 'ATS Resume Template for Customer Service',
        description: 'A clean and accessible ATS format that effectively highlights customer service excellence, operational volume, and rapid career progression.',
        atsScore: 98,
        whyItWorks: 'In service industries, rapid progression and multiple roles at the same company are common. This template parses stacked roles flawlessly.',
        bestFor: 'Customer Service Reps, Retail Leaders, and Support Specialists.',
        templateId: 'ats-hospitality-navy',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'administrative-assistant-resume-template',
        name: 'Gold Standard ATS Format',
        industry: 'Administration',
        title: 'ATS Resume Template for Administrative Assistants',
        description: 'A highly structured, conservative ATS resume template tailored for administrative professionals, office managers, and executive assistants.',
        atsScore: 99,
        whyItWorks: 'Administrative roles often go through high-volume screening. This layout uses predictable, standard headers that recruiters and software love.',
        bestFor: 'Administrative Assistants, Office Managers, and Executive Assistants.',
        templateId: 'ats-gold-standard-charcoal',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'teacher-resume-template',
        name: 'Academia ATS Format',
        industry: 'Education',
        title: 'ATS Resume Template for Teachers & Educators',
        description: 'A specialized ATS resume for educators that balances standard machine readability with sections for certifications, curriculum development, and classroom wins.',
        atsScore: 100,
        whyItWorks: 'Teacher hiring systems prioritize certification codes. This template places certifications in standard blocks for instant extraction.',
        bestFor: 'Teachers, Professors, and Educational Consultants.',
        templateId: 'ats-academia-charcoal',
        sampleDataKey: 'education_expert'
    },
    {
        slug: 'internship-resume-template',
        name: 'Graduate ATS Format',
        industry: 'Entry Level',
        title: 'ATS Resume Template for Internships',
        description: 'An education-first ATS template designed to highlight degrees, academic projects, and coursework for students seeking internships.',
        atsScore: 99,
        whyItWorks: 'When you have limited experience, ATS systems can get confused. This template structures the Education and Projects sections to trigger standard parsing rules.',
        bestFor: 'Students, Recent Graduates, and Career Changers.',
        templateId: 'ats-graduate-navy',
        sampleDataKey: 'graduate'
    },
    {
        slug: 'sales-associate-resume-template',
        name: 'Masthead ATS Format',
        industry: 'Sales',
        title: 'ATS Resume Template for Sales Associates',
        description: 'A bold, revenue-focused ATS format that puts your quota achievements and client acquisition metrics front and center.',
        atsScore: 98,
        whyItWorks: 'Sales resumes need to show numbers. The Masthead template uses a prominent header for core competencies while keeping the experience section mathematically structured.',
        bestFor: 'Sales Associates, Account Executives, and Business Developers.',
        templateId: 'ats-masthead-prussian',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'graphic-designer-resume-template',
        name: 'Bauhaus ATS Format',
        industry: 'Creative',
        title: 'Creative ATS Resume Template for Designers',
        description: 'A unique ATS resume that brings architectural structure and design sensibility to a standard single-column text format.',
        atsScore: 95,
        whyItWorks: 'Designers face the hardest challenge: making a beautiful resume that an ATS can actually read. The Bauhaus layout uses standard HTML flow with intelligent styling.',
        bestFor: 'Graphic Designers, UX/UI Designers, and Product Designers.',
        templateId: 'ats-bauhaus-cobalt',
        sampleDataKey: 'graphic_designer'
    },
    // Variations
    {
        slug: 'entry-level-software-engineer-resume-template',
        name: 'Modern Professional',
        industry: 'Technology',
        title: 'Entry-Level Software Engineer Resume Template',
        description: 'A contemporary ATS-compliant template optimized for junior developers, focusing on projects, skills, and education.',
        atsScore: 99,
        whyItWorks: 'Features a skills-first layout to compensate for limited professional experience while maintaining perfect parsing.',
        bestFor: 'Junior Developers and Bootcamp Graduates.',
        templateId: 'ats-modern-blue',
        sampleDataKey: 'software_engineer'
    }
];

export function getTemplateBySlug(slug: string) {
    return SEO_TEMPLATES.find(t => t.slug === slug);
}
