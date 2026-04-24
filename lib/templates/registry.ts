import { TemplateMetadata } from '../types/resume'

export const templateRegistry: TemplateMetadata[] = [
    // --- 0. ATS GOLD STANDARD (The Definitive ATS Template) ---
    {
        id: 'ats-gold-standard',
        name: 'ATS Gold Standard',
        description: 'The definitive ATS-compliant résumé. Centered header with elegantly spaced typography, clean single-column layout, and warm gold accents. Passes 100% of Applicant Tracking Systems with maximum recruiter readability. The gold standard for professional résumés across all industries.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical', 'academic'],
            industries: ['General', 'Business', 'Finance', 'Tech', 'Legal', 'Healthcare', 'Education']
        },
        isPremium: true,
        colors: [
            { id: 'gold', name: 'Gold Standard', hex: '#b8860b' },
            { id: 'black', name: 'Classic Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'slate', name: 'Slate', hex: '#475569' }
        ]
    },

    // --- 1. ATS PROFESSIONAL (Maximum ATS Compatibility) ---
    {
        id: 'ats-professional',
        name: 'Professional Blue Accent',
        description: 'Designed to pass through Applicant Tracking Systems with 99% success rate. Uses clean single-column layout, standard fonts, and zero graphics. Ideal when applying through online portals at Fortune 500 companies, government positions, or any role where your resume must first pass automated screening.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['General', 'Business', 'Tech', 'Finance', 'Legal', 'Healthcare']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Standard Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'blue', name: 'Professional Blue', hex: '#2563eb' },
            { id: 'green', name: 'Forest Green', hex: '#065f46' }
        ]
    },

    // --- 2. ATS ULTRA-MINIMAL ---
    {
        id: 'ats-minimal',
        name: 'Elegant Minimal',
        description: 'The ultimate in simplicity and ATS compatibility. Maximum whitespace and zero decorative elements ensure perfect parsing by any system, old or new. When you absolutely must pass automated screening, this is your safest choice. Works for any industry or career level.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['corporate', 'creative'],
            industries: ['General']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'slate', name: 'Slate Gray', hex: '#475569' },
            { id: 'teal', name: 'Muted Teal', hex: '#0d9488' }
        ]
    },

    // --- 3. ATS CLASSIC SERIF ---
    {
        id: 'ats-classic',
        name: 'Executive Classic',
        description: 'Combines ATS compatibility with traditional elegance. Serif typography for law firms, financial institutions, and conservative industries. Passes automated screening while maintaining professional gravitas. Perfect when you need both modern technology and timeless presentation.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Legal', 'Finance', 'Education']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'slate', name: 'Slate Gray', hex: '#475569' },
            { id: 'maroon', name: 'Deep Maroon', hex: '#7f1d1d' }
        ]
    },

    // --- 4. ATS EXECUTIVE BOLD ---
    {
        id: 'ats-executive',
        name: 'Executive Leadership',
        description: 'ATS-compliant template designed for leadership roles. Bold section headers emphasize strategic achievements and executive presence. Passes automated screening while commanding attention. Perfect for C-suite, VP, and director-level positions in competitive markets.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Management', 'C-Suite']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'gold', name: 'Premium Gold', hex: '#b45309' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'emerald', name: 'Deep Emerald', hex: '#064e3b' }
        ]
    },

    // --- 5. ATS MODERN CLEAN ---
    {
        id: 'ats-modern',
        name: 'Modern Professional',
        description: 'Contemporary design meets ATS requirements. Clean sans-serif typography and subtle hierarchy create modern appeal while ensuring perfect parsing. Ideal for tech companies, SaaS startups, and marketing roles where you need both style and substance.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Tech', 'SaaS', 'Marketing']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'blue', name: 'Modern Blue', hex: '#2563eb' },
            { id: 'violet', name: 'Modern Violet', hex: '#7c3aed' },
            { id: 'teal', name: 'Modern Teal', hex: '#0d9488' },
            { id: 'slate', name: 'Modern Slate', hex: '#475569' }
        ]
    },

    // --- 6. ATS TIMELINE PRO ---
    {
        id: 'ats-timeline',
        name: 'ATS Timeline Pro',
        description: 'Elite professional template that combines a visual timeline with 100% ATS compatibility. Features refined typography, elegant whitespace, and a linear structure that ensures perfect parsing. Ideal for senior professionals and executives who want a distinctive yet safe visual identity.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Finance', 'Consulting', 'Tech', 'Legal']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Elite Black', hex: '#000000' },
            { id: 'navy', name: 'Midnight Navy', hex: '#0f172a' },
            { id: 'slate', name: 'Silver Slate', hex: '#334155' },
            { id: 'charcoal', name: 'Charcoal Gold', hex: '#1e293b' },
            { id: 'emerald', name: 'Deep Emerald', hex: '#064e3b' }
        ]
    },

    // --- 7. HOSPITALITY ATS PRO ---
    {
        id: 'ats-hospitality',
        name: 'ATS Hospitality Pro',
        description: 'ATS-compliant design strictly optimized for the hospitality industry. Prominently features language proficiencies, core competencies, and critical certifications like ServSafe. Evaluates perfectly in applicant tracking systems for Hotel Managers, Guest Services, Executive Chefs, and Concierge roles.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['service', 'corporate'],
            industries: ['Hospitality', 'Tourism', 'Service', 'F&B', 'Events']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Classic Black', hex: '#000000' },
            { id: 'navy', name: 'Resort Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal Night', hex: '#374151' },
            { id: 'emerald', name: 'Emerald', hex: '#064e3b' },
            { id: 'slate', name: 'Cool Slate', hex: '#334155' }
        ]
    },

    // --- 8. ATS TECHNICAL ---
    {
        id: 'ats-technical',
        name: 'ATS Dev-Console',
        description: 'Built for developers who need ATS compatibility. Monospaced format highlights technical skills, programming languages, and GitHub repositories. Passes automated screening while speaking the language of tech recruiters. Essential for software engineering roles at major tech companies.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['technical'],
            industries: ['Software', 'Engineering', 'AI']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'green', name: 'Matrix Green', hex: '#064e3b' },
            { id: 'cyan', name: 'Cyber Cyan', hex: '#0891b2' },
            { id: 'orange', name: 'Terminal Orange', hex: '#ea580c' },
            { id: 'slate', name: 'Carbon Slate', hex: '#334155' }
        ]
    },

    // --- 9. ATS NURSING RN ---
    {
        id: 'ats-nursing',
        name: 'ATS Nursing RN',
        description: 'Purpose-built for Registered Nurses, LPNs, and advanced-practice clinicians. Features clinical-focused sections for licensures (RN, CCRN, BLS, ACLS), patient care metrics, and unit specializations. 100% ATS-compliant for hospital portals like Workday and Taleo. Passes automated screening at every major healthcare system.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Healthcare', 'Nursing', 'Medical', 'Clinical']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Clinical Teal', hex: '#0f766e' },
            { id: 'blue', name: 'Scrub Blue', hex: '#1e40af' },
            { id: 'emerald', name: 'Medical Green', hex: '#065f46' },
            { id: 'rose', name: 'Heart Rose', hex: '#be123c' },
            { id: 'slate', name: 'Slate Gray', hex: '#475569' }
        ]
    },

    // --- 10. ATS ACADEMIA ---
    {
        id: 'ats-academia',
        name: 'ATS Scholar CV',
        description: 'The definitive ATS-compliant academic curriculum vitae. Publication-first layout with dedicated sections for research grants, teaching experience, and professional society memberships. Scholarly serif typography preserves academic gravitas while ensuring perfect parsing by university HR systems. Essential for professors, postdocs, and research scientists.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['academic'],
            industries: ['Education', 'Research', 'Science', 'University']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Oxford Slate', hex: '#334155' },
            { id: 'navy', name: 'Academic Navy', hex: '#1e3a8a' },
            { id: 'maroon', name: 'Scholar Maroon', hex: '#7f1d1d' },
            { id: 'emerald', name: 'Ivy Green', hex: '#064e3b' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' }
        ]
    },

    // --- 11. ATS NEW GRAD ---
    {
        id: 'ats-graduate',
        name: 'ATS New Grad',
        description: 'Designed specifically for recent graduates entering competitive job markets. Education-first layout with dedicated sections for coursework, projects, and internships. ATS-optimized to help you land interviews even with limited work experience. Your launchpad to career success.',
        suitableFor: {
            careerLevels: ['student', 'entry'],
            jobTypes: ['corporate', 'academic'],
            industries: ['General', 'Education']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'maroon', name: 'Academic Maroon', hex: '#9f1239' },
            { id: 'navy', name: 'University Navy', hex: '#1e3a8a' },
            { id: 'green', name: 'Campus Green', hex: '#065f46' },
            { id: 'charcoal', name: 'Gray Charcoal', hex: '#374151' }
        ]
    },

    // --- 12. CLASSIC CLEAN ---
    {
        id: 'classic-clean',
        name: 'Classic Clean',
        description: 'The timeless, no-frills single-column résumé with centered name, pipe-separated contact info, and ruled section headers. Built for maximum ATS compatibility and recruiter readability. Ideal for professionals in any industry who want a clean, traditional, and universally accepted format.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'academic', 'technical'],
            industries: ['General', 'Business', 'Finance', 'Legal', 'Healthcare', 'Education']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'maroon', name: 'Deep Maroon', hex: '#7f1d1d' },
            { id: 'slate', name: 'Slate Gray', hex: '#475569' }
        ]
    },

    // --- 13. ATS EXECUTIVE CV (Optimized for long histories) ---
    {
        id: 'ats-executive-cv',
        name: 'Executive CV Pro',
        description: 'Elite professional CV designed for comprehensive career histories and senior-level roles. Optimized for multi-page layouts with high information density, sophisticated Playfair typography, and clear hierarchical structure. 100% ATS-compliant while maintaining an authoritative executive presence.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate', 'academic'],
            industries: ['C-Suite', 'Management', 'Legal', 'Consulting', 'Academic']
        },
        isPremium: true,
        previewImage: '/templates/ats-executive-navy-preview.png',
        colors: [
            { id: 'standard', name: 'Executive Slate', hex: '#334155' },
            { id: 'black', name: 'Ebony Black', hex: '#000000' },
            { id: 'navy', name: 'Midnight Navy', hex: '#0f172a' },
            { id: 'emerald', name: 'Deep Emerald', hex: '#064e3b' },
            { id: 'maroon', name: 'Bordeaux Maroon', hex: '#4c0519' }
        ]
    },

    // --- 14. ATS MINIMALIST MONO ---
    {
        id: 'ats-minimal-mono',
        name: 'Minimalist Mono',
        description: 'A high-end, Swiss-inspired minimalist design that focuses on bold typography and strategic negative space. Ideal for creative technologists, designers, and modern professionals who want to make a powerful, clean statement. 100% ATS-compliant with a hyper-modern aesthetic.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['technical', 'creative', 'corporate'],
            industries: ['Tech', 'Design', 'Media', 'Marketing']
        },
        isPremium: true,
        previewImage: '/templates/ats-minimal-black-preview.png',
        colors: [
            { id: 'black', name: 'Deep Black', hex: '#000000' },
            { id: 'slate', name: 'Cool Slate', hex: '#334155' },
            { id: 'zinc', name: 'Brushed Zinc', hex: '#52525b' }
        ]
    },

    // --- 15. ATS ROYAL SCHOLAR ---
    {
        id: 'ats-royal-scholar',
        name: 'Royal Scholar',
        description: 'A prestigious, academic-style design featuring double ruled borders and heavy serif typography. Built for professionals in Law, Research, and Higher Education. Provides an authoritative and institutional presence while maintaining full machine readability.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['academic', 'corporate'],
            industries: ['Law', 'Academia', 'Consulting', 'Research']
        },
        isPremium: true,
        previewImage: '/templates/ats-academia-navy-preview.png',
        colors: [
            { id: 'standard', name: 'Oxford Blue', hex: '#1e3a8a' },
            { id: 'black', name: 'Scholastic Black', hex: '#000000' },
            { id: 'burgundy', name: 'Cambridge Burgundy', hex: '#7f1d1d' },
            { id: 'forest', name: 'Ivy Forest', hex: '#064e3b' }
        ]
    },
    // --- 16. ATS CHRONOGRAPH ---
    {
        id: 'ats-chronograph',
        name: 'Chronograph Timeline',
        description: 'A structured timeline format where dates are rigidly aligned on the left margin and content flows on the right, separated by a thin vertical rule. Features an asymmetric header and monospaced accents. 100% ATS-compliant timeline layout.',
        suitableFor: {
            careerLevels: ['mid', 'senior'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Consulting', 'Finance', 'Project Management']
        },
        isPremium: true,
        colors: [
            { id: 'ink', name: 'Ink Black', hex: '#0a0a0a' },
            { id: 'graphite', name: 'Graphite', hex: '#374151' },
            { id: 'steel', name: 'Steel Blue', hex: '#1e40af' },
            { id: 'oxblood', name: 'Oxblood', hex: '#7f1d1d' }
        ]
    },

    // --- 17. ATS MASTHEAD ---
    {
        id: 'ats-masthead',
        name: 'Masthead Typography',
        description: 'A strong, minimalist header section enclosed between double rules, featuring extreme letter-spacing and clear typographical hierarchy. Understated dashed-line section headers create an elegant, editorial feel.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'creative'],
            industries: ['Marketing', 'Communications', 'Design', 'Media']
        },
        isPremium: true,
        colors: [
            { id: 'charcoal', name: 'Charcoal', hex: '#262626' },
            { id: 'slate', name: 'Warm Slate', hex: '#44403c' },
            { id: 'prussian', name: 'Prussian Blue', hex: '#172554' },
            { id: 'espresso', name: 'Espresso', hex: '#451a03' }
        ]
    },

    // --- 18. ATS BAUHAUS ---
    {
        id: 'ats-bauhaus',
        name: 'Bauhaus Geometric',
        description: 'Inspired by Bauhaus design principles: geometric clarity and functional hierarchy. Each section is introduced by a large colored block containing a number. A distinctive visual identity that remains strictly single-column and machine readable.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['creative', 'technical'],
            industries: ['Design', 'Architecture', 'Tech', 'Brand Strategy']
        },
        isPremium: true,
        colors: [
            { id: 'vermillion', name: 'Vermillion', hex: '#dc2626' },
            { id: 'cobalt', name: 'Cobalt', hex: '#1d4ed8' },
            { id: 'onyx', name: 'Onyx', hex: '#171717' },
            { id: 'brass', name: 'Brass', hex: '#a16207' }
        ]
    },

    // --- 19. ATS EDITORIAL ---
    {
        id: 'ats-editorial',
        name: 'Magazine Editorial',
        description: 'Inspired by magazine layouts. Features a bold, oversized name as a visual anchor, body content in a refined serif typeface, and a pull-quote style summary. Dotted leader lines connect job titles to dates.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'creative'],
            industries: ['Journalism', 'Publishing', 'Executive', 'Communications']
        },
        isPremium: true,
        colors: [
            { id: 'ink', name: 'Ink', hex: '#171717' },
            { id: 'sepia', name: 'Sepia', hex: '#292524' },
            { id: 'navy', name: 'Deep Navy', hex: '#0f172a' },
            { id: 'burgundy', name: 'Burgundy', hex: '#4c0519' }
        ]
    },

    // --- 20. ATS GRIDLINE ---
    {
        id: 'ats-gridline',
        name: 'Gridline Structural',
        description: 'Inspired by engineering dot-grid notebooks. Uses a subtle dot-grid background pattern (CSS-only) behind a rigorously structured card layout. Appeals to precision, structure, and systematic thinking.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['technical', 'corporate'],
            industries: ['Engineering', 'Data Science', 'Product Management']
        },
        isPremium: true,
        colors: [
            { id: 'blueprint', name: 'Blueprint', hex: '#1e40af' },
            { id: 'carbon', name: 'Carbon', hex: '#262626' },
            { id: 'emerald', name: 'Emerald', hex: '#065f46' },
            { id: 'copper', name: 'Copper', hex: '#9a3412' }
        ]
    },

    // --- 21. ATS METRO ---
    {
        id: 'ats-metro',
        name: 'Metro Transit',
        description: 'Inspired by transit maps and wayfinding systems. A continuous colored vertical line runs down the page, with "station" dots at each major section. The header uses a destination board aesthetic.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['corporate', 'technical', 'service'],
            industries: ['Operations', 'Logistics', 'Supply Chain', 'Urban Planning']
        },
        isPremium: true,
        colors: [
            { id: 'central', name: 'Central Line', hex: '#b91c1c' },
            { id: 'district', name: 'District Line', hex: '#047857' },
            { id: 'victoria', name: 'Victoria Line', hex: '#1d4ed8' },
            { id: 'metropolitan', name: 'Metropolitan', hex: '#6b21a8' },
            { id: 'onyx', name: 'Onyx', hex: '#171717' }
        ]
    },
    // --- 22. ATS CLASSIC LEFT ---
    {
        id: 'ats-classic-left',
        name: 'Classic Left Header',
        description: 'A premium, high-impact ATS-compliant template that breaks from traditional layouts with a sophisticated left-aligned column for headers and dates. Engineered with a strictly linear DOM structure to ensure 100% machine readability while providing a unique, executive visual identity.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'academic'],
            industries: ['Finance', 'Legal', 'Business', 'Management', 'Accounting']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'slate', name: 'Slate Gray', hex: '#475569' },
            { id: 'maroon', name: 'Deep Maroon', hex: '#7f1d1d' }
        ]
    }
]
