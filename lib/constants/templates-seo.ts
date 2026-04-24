export const SEO_TEMPLATES = [
    {
        slug: 'software-engineer-ats-resume',
        name: 'Metro ATS Format',
        industry: 'Technology',
        title: 'ATS Resume Template for Software Engineers',
        description: 'A robust, single-column ATS compliant resume template specifically designed for Software Engineers, Developers, and DevOps professionals. Ensures 100% parsing of technical skills and GitHub links.',
        atsScore: 99,
        whyItWorks: 'Engineering resumes often get rejected by ATS because of complex multi-column layouts used for listing tech stacks. The Metro format resolves this by using structured semantic lists that applicant tracking systems parse perfectly.',
        bestFor: 'Software Engineers, Data Scientists, DevOps, and IT Professionals.',
        templateId: 'ats-metro-district',
        sampleDataKey: 'software_engineer'
    },
    {
        slug: 'executive-leadership-cv',
        name: 'Executive ATS Format',
        industry: 'Executive',
        title: 'Executive Level ATS Resume Template',
        description: 'An authoritative ATS-friendly resume format for C-level executives, VPs, and Directors. Focuses on quantifiable achievements and board-level metrics.',
        atsScore: 98,
        whyItWorks: 'Executive resumes tend to be lengthy. This template structures a comprehensive career history into easily parsable chunks, ensuring that your leadership metrics (P&L, headcount) are read accurately by enterprise hiring software.',
        bestFor: 'CEOs, CFOs, VPs, Directors, and Senior Managers.',
        templateId: 'ats-executive-cv-black',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'healthcare-nursing-ats-cv',
        name: 'Nursing ATS Format',
        industry: 'Healthcare',
        title: 'ATS Compliant CV Template for Healthcare Professionals',
        description: 'A clean, traditional ATS resume template ideal for Nurses, Doctors, and Healthcare Administrators. Perfectly formats licenses, certifications, and clinical experience.',
        atsScore: 100,
        whyItWorks: 'Healthcare hiring relies heavily on credential verification. This template strictly isolates certifications and licenses into standard ATS-readable blocks to ensure automated screening compliance.',
        bestFor: 'Registered Nurses, Physicians, Hospital Administrators, and Clinical Staff.',
        templateId: 'ats-nursing-blue',
        sampleDataKey: 'healthcare_professional'
    },
    {
        slug: 'marketing-manager-resume-template',
        name: 'Editorial ATS Format',
        industry: 'Marketing',
        title: 'ATS Resume Template for Marketing Professionals',
        description: 'A structured ATS resume for marketers that balances standard machine readability with a clean, editorial aesthetic to highlight campaign metrics.',
        atsScore: 97,
        whyItWorks: 'Marketers often use heavily graphic resumes that fail in ATS. This format uses bold typography and semantic headers to provide visual flair while remaining 100% text-based and readable by applicant tracking systems.',
        bestFor: 'Marketing Managers, Copywriters, Brand Strategists, and SEO Experts.',
        templateId: 'ats-editorial-navy',
        sampleDataKey: 'marketing_manager'
    },
    {
        slug: 'entry-level-graduate-resume',
        name: 'Graduate ATS Format',
        industry: 'Entry Level',
        title: 'Entry-Level ATS Resume Template for College Graduates',
        description: 'An education-first ATS template designed to highlight degrees, academic projects, and internships when professional experience is limited.',
        atsScore: 99,
        whyItWorks: 'When you have limited experience, ATS systems can get confused. This template structures the Education and Projects sections to trigger standard parsing rules, ensuring your degree and coursework are recognized as core qualifications.',
        bestFor: 'Recent College Graduates, Entry-Level Applicants, and Career Changers.',
        templateId: 'ats-graduate-navy',
        sampleDataKey: 'graduate'
    },
    {
        slug: 'creative-design-ats-resume',
        name: 'Bauhaus ATS Format',
        industry: 'Creative',
        title: 'Creative ATS Resume Template for Designers',
        description: 'A unique ATS resume that brings architectural structure and design sensibility to a standard single-column text format.',
        atsScore: 95,
        whyItWorks: 'Designers face the hardest challenge: making a beautiful resume that an ATS can actually read. The Bauhaus layout uses standard HTML flow with intelligent CSS styling to look like a high-end editorial piece while parsing perfectly.',
        bestFor: 'Graphic Designers, UX/UI Designers, Art Directors, and Product Designers.',
        templateId: 'ats-bauhaus-cobalt',
        sampleDataKey: 'graphic_designer'
    },
    {
        slug: 'finance-banking-resume-template',
        name: 'Gold Standard ATS Format',
        industry: 'Finance',
        title: 'ATS Resume Template for Finance & Banking',
        description: 'A highly structured, conservative ATS resume template tailored for Investment Bankers, Accountants, and Financial Analysts.',
        atsScore: 99,
        whyItWorks: 'Financial institutions use strict ATS platforms (like Workday or Taleo) that require rigid formatting. The Gold Standard template relies on traditional, predictable layouts that these legacy systems prefer.',
        bestFor: 'Financial Analysts, CPAs, Investment Bankers, and Auditors.',
        templateId: 'ats-gold-standard-charcoal',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'hospitality-retail-ats-resume',
        name: 'Hospitality ATS Format',
        industry: 'Hospitality',
        title: 'ATS Resume Template for Hospitality & Retail',
        description: 'A clean and accessible ATS format that effectively highlights customer service excellence, operational volume, and rapid career progression.',
        atsScore: 98,
        whyItWorks: 'In service industries, rapid progression and multiple roles at the same company are common. This template parses stacked roles flawlessly, ensuring your promotions are recognized by the software.',
        bestFor: 'General Managers, Retail Leaders, Event Coordinators, and Service Professionals.',
        templateId: 'ats-hospitality-navy',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'academic-research-cv-template',
        name: 'Academia ATS Format',
        industry: 'Education',
        title: 'Academic CV & ATS Resume Template',
        description: 'A specialized long-form CV template designed to gracefully handle extensive publications, research grants, and speaking engagements.',
        atsScore: 100,
        whyItWorks: 'Standard ATS parsers struggle with bibliographies and research citations. The Academia format uses distinct markdown-style separation to ensure your publications are indexed as achievements rather than garbled text.',
        bestFor: 'Professors, Researchers, Post-docs, and Curriculum Developers.',
        templateId: 'ats-academia-charcoal',
        sampleDataKey: 'education_expert'
    },
    {
        slug: 'project-manager-timeline-resume',
        name: 'Timeline ATS Format',
        industry: 'Project Management',
        title: 'ATS Resume Template for Project Managers',
        description: 'A crisp, modern ATS template that beautifully visualizes career progression while maintaining strict parsing compliance for Agile and PMP skills.',
        atsScore: 97,
        whyItWorks: 'Project managers need to show concurrent projects. This layout uses structured date hierarchies that ATS systems recognize, proving your tenure and project overlap without causing parsing errors.',
        bestFor: 'Project Managers, Scrum Masters, Operations Leads, and Product Owners.',
        templateId: 'ats-timeline-emerald',
        sampleDataKey: 'software_engineer'
    },
    {
        slug: 'sales-real-estate-ats-resume',
        name: 'Masthead ATS Format',
        industry: 'Sales',
        title: 'ATS Resume Template for Sales Professionals',
        description: 'A bold, revenue-focused ATS format that puts your quota achievements and client acquisition metrics front and center.',
        atsScore: 98,
        whyItWorks: 'Sales resumes need to pop while remaining parsable. The Masthead template uses a prominent header for core competencies while keeping the experience section mathematically structured for metric-extraction by ATS.',
        bestFor: 'Account Executives, Real Estate Agents, Sales Directors, and BDRs.',
        templateId: 'ats-masthead-prussian',
        sampleDataKey: 'sales_executive'
    },
    {
        slug: 'data-analyst-cybersecurity-resume',
        name: 'Technical ATS Format',
        industry: 'IT & Data',
        title: 'Technical ATS Resume Template for IT & Data',
        description: 'A dense but highly readable ATS format optimized for listing numerous programming languages, security protocols, and data tools.',
        atsScore: 99,
        whyItWorks: 'IT resumes fail when skills are comma-separated in a single massive block. This template categorizes skills into logical, parsable rows that guarantee high keyword-match scoring in tools like Greenhouse or Lever.',
        bestFor: 'Data Analysts, Cybersecurity Specialists, System Admins, and QA Engineers.',
        templateId: 'ats-technical-cyan',
        sampleDataKey: 'software_engineer'
    },
    {
        slug: 'classic-left-ats-resume',
        name: 'Classic Left ATS Format',
        industry: 'Business & Administration',
        title: 'Traditional ATS Resume Template with Left Header',
        description: 'A sophisticated, high-end ATS compliant resume template featuring a unique left-aligned header layout. Perfectly balances classic serif typography with modern machine readability.',
        atsScore: 100,
        whyItWorks: 'Many legacy ATS systems (like Taleo) prioritize top-down, left-to-right scanning. By placing headers and dates in a dedicated visual column while maintaining a linear DOM structure, this template maximizes both aesthetic appeal and parsing accuracy.',
        bestFor: 'Accountants, Lawyers, Business Managers, and Traditional Professionals.',
        templateId: 'ats-classic-left',
        sampleDataKey: 'sales_executive'
    }
]

export function getTemplateBySlug(slug: string) {
    return SEO_TEMPLATES.find(t => t.slug === slug)
}
