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
    },
    {
        slug: 'senior-software-engineer-resume-template',
        name: 'Executive Leadership',
        industry: 'Technology',
        title: 'Senior Software Engineer Resume Template',
        description: 'An authoritative ATS format for senior developers and engineering managers. Focuses on leadership impact and complex system architecture.',
        atsScore: 98,
        whyItWorks: 'Senior roles require high information density. This template manages long experience sections without breaking the ATS parsing sequence.',
        bestFor: 'Senior Engineers, Tech Leads, and Engineering Managers.',
        templateId: 'ats-executive-gold',
        sampleDataKey: 'software_engineer'
    },
    {
        slug: 'no-experience-resume-template',
        name: 'Clean Minimalist',
        industry: 'General',
        title: 'Resume Template for No Experience',
        description: 'A clean, effective ATS resume template for those with no work experience. Highlights education, volunteering, and transferable skills.',
        atsScore: 99,
        whyItWorks: 'Focuses on the skills and education headers to ensure the resume isn\'t rejected for lack of "Experience" block keywords.',
        bestFor: 'Students, First-time job seekers, and Volunteers.',
        templateId: 'ats-minimal-black',
        sampleDataKey: 'graduate'
    },
    {
        slug: 'ats-friendly-resume-template',
        name: 'Professional Blue Accent',
        industry: 'General',
        title: '100% ATS Friendly Resume Template',
        description: 'The ultimate ATS-optimized resume template. Zero graphics, single-column, and standard fonts for maximum compatibility.',
        atsScore: 100,
        whyItWorks: 'Engineered specifically for systems like Workday and Taleo. Uses standard headers and a flat hierarchy.',
        bestFor: 'Corporate applicants and High-volume job applications.',
        templateId: 'ats-professional-navy',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'modern-resume-template-free',
        name: 'Modern Clean',
        industry: 'General',
        title: 'Modern Resume Template - Free Download',
        description: 'A stylish yet machine-readable resume template that gives you a modern edge without sacrificing ATS score.',
        atsScore: 97,
        whyItWorks: 'Balances modern typography with a conservative structure, making it perfect for human recruiters and robot screeners alike.',
        bestFor: 'Modern professionals in Tech, Marketing, and Design.',
        templateId: 'ats-modern-violet',
    },
    // Country-Specific (Programmatic SEO)
    {
        slug: 'best-cv-template-kenya',
        name: 'Professional Kenyan CV',
        industry: 'General',
        title: 'Best CV Template in Kenya (PDF & Word format)',
        description: 'A compliant, widely accepted CV format in Kenya PDF & Word compatible. Optimized for Kenyan employers and ATS systems.',
        atsScore: 98,
        whyItWorks: 'Follows the standard Kenyan resume format expectations while ensuring full ATS readability.',
        bestFor: 'Job seekers in Kenya across all industries.',
        templateId: 'ats-professional-navy',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'resume-format-in-kenya',
        name: 'Standard Kenyan Format',
        industry: 'General',
        title: 'Standard Resume Format in Kenya',
        description: 'The definitive resume format in Kenya. Download this template to ensure your application meets local standards.',
        atsScore: 99,
        whyItWorks: 'Strikes the right balance between modern aesthetics and the traditional CV structure preferred in Nairobi and across Kenya.',
        bestFor: 'Freshers and experienced professionals in Kenya.',
        templateId: 'ats-classic-left',
        sampleDataKey: 'software_engineer'
    },
    // Hidden Opportunities
    {
        slug: 'download-resume-template-word-format',
        name: 'Word Export Ready',
        industry: 'General',
        title: 'Download Resume Template Word Format',
        description: 'A highly optimized, clean resume template that looks perfect when downloaded as a Word document or PDF.',
        atsScore: 100,
        whyItWorks: 'Uses system-safe fonts and standard margins to ensure flawless export.',
        bestFor: 'Users who need editable offline formats.',
        templateId: 'ats-minimal-black',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'one-page-resume-template-free',
        name: 'One Page Minimalist',
        industry: 'General',
        title: 'One Page Resume Template Free',
        description: 'A condensed, high-impact one-page resume template. Perfect for getting your most important metrics noticed immediately.',
        atsScore: 95,
        whyItWorks: 'Forces conciseness and prioritizes recent achievements, which recruiters love.',
        bestFor: 'Recent graduates and professionals with less than 10 years of experience.',
        templateId: 'ats-modern-blue',
        sampleDataKey: 'graduate'
    },
    {
        slug: 'clean-resume-template-ats',
        name: 'Clean ATS Layout',
        industry: 'General',
        title: 'Clean Resume Template for ATS',
        description: 'An ultra-clean, minimalist ATS resume template with plenty of whitespace and perfect machine readability.',
        atsScore: 100,
        whyItWorks: 'No tables, no graphics, no columns. Just pure, clean, parsable data.',
        bestFor: 'Anyone applying through Workday, Greenhouse, or Lever.',
        templateId: 'ats-technical-cyan',
        sampleDataKey: 'software_engineer'
    },
    // Global Markets (Programmatic SEO)
    {
        slug: 'best-cv-template-uk',
        name: 'Standard UK CV format',
        industry: 'General',
        title: 'Best CV Template UK (ATS Friendly)',
        description: 'A traditional, highly effective UK CV template that meets the strict parsing requirements of British employers and recruiting agencies.',
        atsScore: 98,
        whyItWorks: 'UK CVs typically require more detail and a specific chronological structure. This template handles larger text blocks while maintaining ATS compatibility.',
        bestFor: 'Job seekers applying to roles in the United Kingdom.',
        templateId: 'ats-classic-left',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'resume-format-india',
        name: 'Indian Professional Format',
        industry: 'General',
        title: 'Best Resume Format for India (Free Download)',
        description: 'The standard, widely accepted resume format in India. Includes standardized sections for extensive educational backgrounds and personal details often expected by Indian recruiters.',
        atsScore: 99,
        whyItWorks: 'Designed to handle the high density of information typical in Indian resumes without triggering ATS clutter filters.',
        bestFor: 'Freshers and experienced professionals across India.',
        templateId: 'ats-technical-cyan',
        sampleDataKey: 'software_engineer'
    },
    {
        slug: 'cv-format-dubai-uae',
        name: 'Middle East Executive',
        industry: 'General',
        title: 'Best CV Format for Dubai & UAE',
        description: 'A premium, executive-style CV format perfect for the Dubai and UAE job markets. Highly professional and ATS optimized.',
        atsScore: 96,
        whyItWorks: 'The UAE market values strong executive summaries and clear multinational experience mapping, which this layout emphasizes.',
        bestFor: 'Expatriates and local professionals applying in the UAE.',
        templateId: 'ats-executive-gold',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'cv-format-south-africa',
        name: 'South African Standard',
        industry: 'General',
        title: 'Standard CV Format South Africa',
        description: 'A clean, compliant CV template tailored for the South African job market, ensuring perfect parsing by major local ATS platforms.',
        atsScore: 98,
        whyItWorks: 'Follows local conventions for education and reference listings while keeping the code structure machine-readable.',
        bestFor: 'Job seekers in South Africa.',
        templateId: 'ats-minimal-black',
        sampleDataKey: 'graduate'
    },
    {
        slug: 'resume-format-australia',
        name: 'Australian Professional',
        industry: 'General',
        title: 'Best Resume Format Australia',
        description: 'An optimized resume format designed specifically for the Australian job market and local Applicant Tracking Systems.',
        atsScore: 97,
        whyItWorks: 'Australian resumes often emphasize core competencies early. This template prioritizes a strong skills matrix.',
        bestFor: 'Professionals and tradespeople in Australia.',
        templateId: 'ats-modern-blue',
        sampleDataKey: 'software_engineer'
    },
    {
        slug: 'resume-format-canada',
        name: 'Canadian Standard ATS',
        industry: 'General',
        title: 'Standard Resume Format Canada',
        description: 'A crisp, no-nonsense Canadian resume format. 100% compliant with North American ATS parsing rules.',
        atsScore: 100,
        whyItWorks: 'Strict adherence to the North American chronological standard, eliminating parsing errors.',
        bestFor: 'Job seekers applying within Canada.',
        templateId: 'ats-professional-navy',
        sampleDataKey: 'software_engineer'
    },

    // ─── Free Two-Column Designer Templates ──────────────────────────────────
    {
        slug: 'elegant-split-resume-template',
        name: 'Elegant Split',
        industry: 'General',
        title: 'Elegant Two-Column Resume Template (Free)',
        description: 'A premium two-column resume template with a dark sidebar and white main content area. Sophisticated, modern, and completely free to download.',
        atsScore: 65,
        whyItWorks: 'Visually distinctive layout that impresses human recruiters and hiring managers at creative or modern tech companies.',
        bestFor: 'Professionals in tech, design, marketing, or sales applying to companies that prioritise design-forward candidates.',
        templateId: 'elegant-split-slate',
        sampleDataKey: 'marketing_manager'
    },
    {
        slug: 'prestige-resume-template',
        name: 'Prestige',
        industry: 'General',
        title: 'Prestige Two-Column Resume Template (Free)',
        description: 'An elegant European-inspired two-column resume with a large serif name header, gold accent rule, and italic professional title. Free to download.',
        atsScore: 70,
        whyItWorks: 'Sophisticated design signals credibility. Ideal for roles where presentation and professionalism matter as much as content.',
        bestFor: 'Business professionals, consultants, lawyers, academics, and finance professionals seeking to make a strong first impression.',
        templateId: 'prestige-gold',
        sampleDataKey: 'sales_executive'
    }
];

export function getTemplateBySlug(slug: string) {
    return SEO_TEMPLATES.find(t => t.slug === slug);
}
