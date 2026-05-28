import { TemplateMetadata } from '../types/resume'

export const templateRegistry: TemplateMetadata[] = [

    // --- 1. ELITE ALPINE (Executive Single-Column) ---
    {
        id: 'elite-alpine',
        name: 'Elite Alpine',
        description: 'A premium, high-density executive layout with a sophisticated left-aligned header and subtle vertical rules. This single-column layout is engineered for both visual excellence and 100% ATS readability, making it the gold standard for senior directors and C-suite leaders.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate', 'management'],
            industries: ['Operations', 'Executive Management', 'Finance', 'Tech Leadership', 'Strategy']
        },
        isPremium: true,
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'Executive Black', hex: '#000000' },
            { id: 'midnight', name: 'Midnight Blue', hex: '#0f172a' },
            { id: 'slate', name: 'Slate Gray', hex: '#334155' }
        ]
    },

    // --- 2. ELITE LONDON (Executive Multi-Page) ---
    {
        id: 'elite-london',
        name: 'Elite London Executive',
        description: 'A premium, multi-page executive template inspired by elite corporate standards. Features bold all-caps headers, centered name with wide tracking, and optimized information density. Perfectly structured for professionals with extensive experience who require a multi-page layout with repeating headers.',
        suitableFor: {
            careerLevels: ['senior', 'executive', 'mid'],
            jobTypes: ['corporate', 'management', 'academic'],
            industries: ['Executive Leadership', 'Strategy', 'Consulting', 'Operations', 'Finance']
        },
        isPremium: true,
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'London Black', hex: '#000000' },
            { id: 'navy', name: 'Regent Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Tower Charcoal', hex: '#374151' }
        ]
    },

    // --- 3. ELITE KYOTO (Multipage Executive) ---
    {
        id: 'elite-kyoto',
        name: 'Elite Kyoto',
        description: 'A minimalist, zen-inspired executive layout with generous white space and clean typography. Features clean horizontal dividers, a grid-based skills matrix, and high information density without sacrificing visual breathing room. Perfect for established professionals with extensive experience.',
        suitableFor: {
            careerLevels: ['senior', 'executive', 'mid'],
            jobTypes: ['corporate', 'management', 'academic'],
            industries: ['Executive Leadership', 'Strategy', 'Consulting', 'Operations', 'Academic Research']
        },
        isPremium: true,
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'Professional Black', hex: '#000000' },
            { id: 'navy', name: 'Executive Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Deep Charcoal', hex: '#374151' }
        ]
    },

    // --- 4. ELITE SUMMIT (Modern Sans-Serif) ---
    {
        id: 'elite-summit',
        name: 'Elite Summit',
        description: 'A bold, modern executive layout with high-contrast headers and a structured, professional feel. Engineered for maximum ATS readability while providing a clean, architectural aesthetic. Ideal for tech leaders, modern corporate roles, and minimalist-leaning executives.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical', 'creative'],
            industries: ['Tech', 'Marketing', 'Consulting', 'Business', 'Operations']
        },
        isPremium: true,
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'Modern Black', hex: '#000000' },
            { id: 'zinc', name: 'Cool Zinc', hex: '#52525b' },
            { id: 'slate', name: 'Deep Slate', hex: '#334155' }
        ]
    },

    // --- 1. ATS PROFESSIONAL (Maximum ATS Compatibility) ---
    {
        id: 'ats-professional',
        name: 'Professional Elite',
        description: 'Our flagship "Global Corporate" redesign. Features a stately, high-authority centered layout with wide-tracked uppercase titles and minimalist contact separators. Engineered for senior-level corporate roles where executive presence and institutional gravity are paramount. 100% ATS-compliant.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Management', 'Finance', 'Operations', 'Business', 'Legal', 'Healthcare']
        },
        isPremium: true,
        atsCompliant: true,
        previewImage: '/templates/ats-professional-navy-preview.png',
        colors: [
            { id: 'black', name: 'Elite Black', hex: '#000000' },
            { id: 'navy', name: 'Midnight Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal Gold', hex: '#374151' },
            { id: 'blue', name: 'Corporate Blue', hex: '#2563eb' },
            { id: 'slate', name: 'Slate Gray', hex: '#475569' }
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
        atsCompliant: true,
        previewImage: '/templates/ats-classic-navy-preview.png',
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
        atsCompliant: true,
        previewImage: '/templates/ats-executive-gold-preview.png',
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
        atsCompliant: true,
        previewImage: '/templates/ats-modern-blue-preview.png',
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
        atsCompliant: true,
        previewImage: '/templates/ats-timeline-emerald-preview.png',
        colors: [
            { id: 'black', name: 'Elite Black', hex: '#000000' },
            { id: 'navy', name: 'Midnight Navy', hex: '#0f172a' },
            { id: 'slate', name: 'Silver Slate', hex: '#334155' },
            { id: 'charcoal', name: 'Charcoal Gold', hex: '#1e293b' },
            { id: 'emerald', name: 'Deep Emerald', hex: '#064e3b' }
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
        atsCompliant: true,
        previewImage: '/templates/ats-nursing-blue-preview.png',
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
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
        atsCompliant: true,
        previewImage: '/templates/ats-academia-navy-preview.png',
        colors: [
            { id: 'black', name: 'Oxford Black', hex: '#000000' },
            { id: 'navy', name: 'Academic Navy', hex: '#1e3a8a' },
            { id: 'maroon', name: 'Scholar Maroon', hex: '#7f1d1d' },
            { id: 'emerald', name: 'Ivy Green', hex: '#064e3b' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' }
        ]
    },

    // --- 11. ATS NEW GRAD ---
    {
        id: 'ats-graduate',
        name: 'Graduate Rising Star',
        description: 'A fresh, approachable "Rising Star" redesign for recent graduates. Features an education-first hierarchy, card-inspired project sections, and sophisticated academic badges. Optimized to maximize the impact of research and internships for those entering elite career paths.',
        suitableFor: {
            careerLevels: ['student', 'entry'],
            jobTypes: ['corporate', 'academic', 'technical'],
            industries: ['Education', 'Tech', 'Business', 'Research']
        },
        isPremium: true,
        atsCompliant: true,
        previewImage: '/templates/ats-graduate-navy-preview.png',
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'sky', name: 'Sky Blue', hex: '#0ea5e9' },
            { id: 'indigo', name: 'Indigo', hex: '#6366f1' },
            { id: 'emerald', name: 'Emerald', hex: '#10b981' },
            { id: 'amber', name: 'Amber Gold', hex: '#f59e0b' },
            { id: 'rose', name: 'Rose', hex: '#f43f5e' }
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
        atsCompliant: true,
        colors: [
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
        atsCompliant: true,
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
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'Scholastic Black', hex: '#000000' },
            { id: 'navy', name: 'Oxford Blue', hex: '#1e3a8a' },
            { id: 'burgundy', name: 'Cambridge Burgundy', hex: '#7f1d1d' },
            { id: 'forest', name: 'Ivy Forest', hex: '#064e3b' }
        ]
    },
    // --- 16. ATS CHRONOGRAPH ---
    {
        id: 'ats-chronograph',
        name: 'Chronograph Temporal',
        description: 'A "Temporal Elite" redesign featuring an architectural timeline rule and bold, monospaced date markers. Engineered for professionals with extensive, progressive career histories. Delivers a sophisticated chronological narrative that anchors your experience in precision.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Management', 'Finance', 'Consulting', 'Project Management', 'Engineering']
        },
        isPremium: true,
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'Ink Black', hex: '#000000' },
            { id: 'slate', name: 'Slate Gray', hex: '#4b5563' },
            { id: 'blue', name: 'Steel Blue', hex: '#1e40af' },
            { id: 'emerald', name: 'Forest Green', hex: '#065f46' }
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
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'Classic Black', hex: '#000000' },
            { id: 'charcoal', name: 'Charcoal', hex: '#262626' },
            { id: 'slate', name: 'Warm Slate', hex: '#44403c' },
            { id: 'prussian', name: 'Prussian Blue', hex: '#172554' },
            { id: 'espresso', name: 'Espresso', hex: '#451a03' }
        ]
    },

    // --- 18b. ATS CORNERSTONE ---
    {
        id: 'ats-cornerstone',
        name: 'Cornerstone Executive',
        description: 'A soft, modern executive-grade template inspired by contemporary design systems. Features rounded section badges, clean sans-serif typography, and pill-shaped contact tags for an airy, breathable aesthetic. Engineered for modern professionals who demand approachability alongside perfect ATS compliance.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate', 'management'],
            industries: ['Finance', 'Investment Banking', 'Legal', 'Consulting', 'Executive Management']
        },
        isPremium: true,
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'Institutional Black', hex: '#0c0a09' },
            { id: 'copper', name: 'Heritage Copper', hex: '#78350f' },
            { id: 'charcoal', name: 'Boardroom Charcoal', hex: '#44403c' },
            { id: 'navy', name: 'Fiduciary Navy', hex: '#1e3a8a' },
            { id: 'burgundy', name: 'Claret Burgundy', hex: '#881337' },
            { id: 'forest', name: 'Sovereign Green', hex: '#064e3b' }
        ]
    },

    // --- 18c. MERIDIAN PROFESSIONAL (Modern Two-Column) ---
    {
        id: 'meridian-professional',
        name: 'Meridian Professional',
        description: 'A bold, modern two-column resume featuring a dramatic split-weight header with sophisticated typography. Left sidebar holds contact details, education, skills, and languages with clean organization. Right main column features professional summary and work experience with refined formatting. Perfectly suited for product managers, tech leaders, and modern professionals. Note: Two-column layout is not ATS-optimized.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical', 'creative'],
            industries: ['Tech', 'Product Management', 'Fintech', 'SaaS', 'Consulting', 'Marketing']
        },
        isPremium: true,
        atsCompliant: false,
        colors: [
            { id: 'black', name: 'Precision Black', hex: '#171717' },
            { id: 'charcoal', name: 'Modern Charcoal', hex: '#374151' },
            { id: 'navy', name: 'Digital Navy', hex: '#1e3a8a' },
            { id: 'slate', name: 'Cool Slate', hex: '#334155' },
            { id: 'emerald', name: 'Innovation Green', hex: '#064e3b' }
        ]
    },

    // --- 21. ATS METRO (Removed) ---

    // --- 22. CLASSIC LEFT HEADER (Unique Layout) ---
    {
        id: 'classic-left-header',
        name: 'Classic Left Header',
        description: 'A distinctive professional template with a sophisticated left-aligned layout for headers and dates. Features clean typography and a unique visual structure that stands out while maintaining professional credibility. Best for creative corporate roles and modern business professionals. Note: Unconventional layout is not ATS-optimized.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'academic'],
            industries: ['Finance', 'Legal', 'Business', 'Management', 'Accounting']
        },
        isPremium: true,
        atsCompliant: false,
        colors: [
            { id: 'black',   name: 'Standard Black', hex: '#000000' },
            { id: 'navy',    name: 'Navy',            hex: '#1e3a8a' },
            { id: 'charcoal',name: 'Charcoal',        hex: '#374151' },
            { id: 'slate',   name: 'Slate Gray',      hex: '#475569' },
            { id: 'maroon',  name: 'Deep Maroon',     hex: '#7f1d1d' }
        ]
    },

    // --- 25. STERLING CORPORATE (Two-Column Executive) ---
    {
        id: 'sterling-corporate',
        name: 'Sterling Corporate',
        description: 'A polished two-column corporate template inspired by Fortune 500 executive résumés. Features a bold header with professional title in small caps, elegant sidebar with contact details, education, and grouped core competencies. Ideal for operations directors, strategy leads, and senior management professionals. Note: Two-column layout with sidebar is not ATS-optimized.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Operations', 'Management', 'Finance', 'Consulting', 'Strategy', 'Business']
        },
        isPremium: false,
        atsCompliant: false,
        colors: [
            { id: 'black', name: 'Corporate Black', hex: '#000000' },
            { id: 'corporate', name: 'Corporate Blue', hex: '#1d4ed8' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'navy', name: 'Midnight Navy', hex: '#1e3a8a' },
            { id: 'emerald', name: 'Deep Emerald', hex: '#047857' },
            { id: 'slate', name: 'Cool Slate', hex: '#475569' }
        ]
    },




    // --- 23. ELEGANT SPLIT (Two-Column, Free, Non-ATS) ---
    {
        id: 'elegant-split',
        name: 'Elegant Split',
        description: 'A visually striking two-column layout with a dark sidebar and a clean white content area. Dark panel holds contact details, skills, and certifications while the main column showcases your experience and education. Bold, modern, and free to use.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'creative', 'technical'],
            industries: ['General', 'Tech', 'Marketing', 'Design', 'Finance', 'Sales']
        },
        isPremium: false,
        atsCompliant: false,
        colors: [
            { id: 'black', name: 'Classic Black', hex: '#000000' },
            { id: 'slate',    name: 'Midnight Slate', hex: '#0f172a' },
            { id: 'navy',     name: 'Deep Navy',       hex: '#1e3a8a' },
            { id: 'forest',   name: 'Forest Green',    hex: '#064e3b' },
            { id: 'burgundy', name: 'Burgundy',        hex: '#4c0519' },
            { id: 'gold',     name: 'Dark Gold',       hex: '#78350f' }
        ]
    },

    // --- 24. PRESTIGE (Two-Column, Free, Non-ATS) ---
    {
        id: 'prestige',
        name: 'Prestige',
        description: 'An elegant two-column résumé with a wide serif header, gold accent rule, and italic professional title — inspired by premium European CV design. Skills and profile on the left, experience and education on the right. Sophisticated and free to use.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'creative', 'academic'],
            industries: ['General', 'Business', 'Law', 'Consulting', 'Academia', 'Finance', 'Healthcare']
        },
        isPremium: false,
        atsCompliant: false,
        colors: [
            { id: 'black',    name: 'Classic Black', hex: '#000000' },
            { id: 'gold',     name: 'Classic Gold',    hex: '#C9A84C' },
            { id: 'teal',     name: 'Sophisticated Teal', hex: '#0F766E' },
            { id: 'charcoal', name: 'Charcoal',        hex: '#374151' },
            { id: 'rose',     name: 'Burgundy Rose',   hex: '#9F1239' },
            { id: 'navy',     name: 'Oxford Navy',     hex: '#1e3a8a' }
        ]
    },

    // --- 25. ATS ACADEMIA CV (Distinguished Scholar) ---
    {
        id: 'ats-academia-cv',
        name: 'Distinguished Scholar CV',
        description: 'A prestigious academic curriculum vitae designed for professors, researchers, and postdoctoral scholars. Features bold serif headers, dissertation highlight boxes, citation-formatted publications, professional memberships with dates, and structured academic references. Optimized for research institutions, tenure-track applications, and fellowship submissions.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['academic', 'technical', 'corporate'],
            industries: ['Academia', 'Research', 'Education', 'Science', 'Healthcare', 'Policy']
        },
        isPremium: true,
        atsCompliant: true,
        colors: [
            { id: 'black', name: 'Classic Black', hex: '#171717' },
            { id: 'navy', name: 'Oxford Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'maroon', name: 'Academic Maroon', hex: '#7f1d1d' },
            { id: 'forest', name: 'Forest Green', hex: '#064e3b' }
        ]
    },
]
