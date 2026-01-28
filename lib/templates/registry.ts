import { TemplateMetadata } from '../types/resume'

export const templateRegistry: TemplateMetadata[] = [
    // --- 1. ATS PROFESSIONAL (Maximum ATS Compatibility) ---
    {
        id: 'ats-professional',
        name: 'ATS Professional',
        description: 'Designed to pass through Applicant Tracking Systems with 99% success rate. Uses clean single-column layout, standard fonts, and zero graphics. Ideal when applying through online portals at Fortune 500 companies, government positions, or any role where your resume must first pass automated screening.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['General', 'Business', 'Tech', 'Finance', 'Legal', 'Healthcare']
        },
        previewImage: '/templates/ats-professional-preview.png',
        isPremium: false,
        colors: [
            { id: 'standard', name: 'Standard Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' }
        ]
    },

    // --- 2. CUTE (Playful, rounded) ---
    {
        id: 'cute',
        name: 'Cotton Candy',
        description: 'Stand out with soft pastels and rounded corners that showcase your creative personality. Perfect for roles in lifestyle brands, boutique agencies, or creative startups where personality matters as much as skills. Features playful color themes including pink, mint, lavender, and peach.',
        suitableFor: {
            careerLevels: ['student', 'entry', 'mid'],
            jobTypes: ['creative', 'freelance'],
            industries: ['Lifestyle', 'Fashion', 'Design']
        },
        previewImage: '/templates/cute-preview.png',
        isPremium: true,
        colors: [
            { id: 'pink', name: 'Pink', hex: '#fce7f3' },
            { id: 'mint', name: 'Mint', hex: '#ccfbf1' },
            { id: 'lavender', name: 'Lavender', hex: '#f3e8ff' },
            { id: 'sky', name: 'Sky', hex: '#e0f2fe' },
            { id: 'peach', name: 'Peach', hex: '#ffedd5' }
        ]
    },

    // --- 2. CHIC (Minimal, Serif, High-end) ---
    {
        id: 'chic',
        name: 'Chic Minimalist',
        description: 'Inspired by high-end fashion magazines and luxury brands. Features sophisticated serif typography, generous whitespace, and an editorial aesthetic. Perfect for roles in luxury retail, publishing, art galleries, or any position where refined taste and attention to detail are paramount.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Luxury', 'Fashion', 'Art']
        },
        previewImage: '/templates/chic-preview.png',
        isPremium: true,
        colors: [
            { id: 'std', name: 'Standard', hex: '#ffffff' }, // Black on white
            { id: 'serif', name: 'Serif Mode', hex: '#f5f5f4' } // Uses serif font variant
        ]
    },

    // --- 3. CLASSIC (The Standard) ---
    {
        id: 'classic',
        name: 'Professional Standard',
        description: 'The timeless choice trusted by professionals worldwide. Features clear hierarchy, professional color accents, and a layout that works for any industry. When in doubt, choose Classic—it never goes out of style and is respected by hiring managers across all sectors.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'academic'],
            industries: ['General', 'Business', 'Finance']
        },
        previewImage: '/templates/classic-preview.png',
        isPremium: false,
        colors: [
            { id: 'blue', name: 'Blue', hex: '#1e40af' },
            { id: 'green', name: 'Green', hex: '#047857' },
            { id: 'red', name: 'Red', hex: '#be123c' },
            { id: 'navy', name: 'Navy', hex: '#312e81' },
            { id: 'gray', name: 'Gray', hex: '#374151' }
        ]
    },

    // --- 4. MODERN (Sidebar, Dark/Light) ---
    {
        id: 'modern',
        name: 'Modern One',
        description: 'Make a strong first impression with a bold sidebar that highlights your skills and contact info at a glance. The two-column layout maximizes space while maintaining readability. Ideal for tech professionals, project managers, and anyone with diverse skill sets to showcase.',
        suitableFor: {
            careerLevels: ['mid', 'senior'],
            jobTypes: ['technical', 'creative', 'corporate'],
            industries: ['Tech', 'Startup', 'Media']
        },
        previewImage: '/templates/modern-preview.png',
        isPremium: true,
        colors: [
            { id: 'slate', name: 'Dark Slate', hex: '#0f172a' },
            { id: 'teal', name: 'Teal', hex: '#115e59' },
            { id: 'blue', name: 'Blue', hex: '#1e3a8a' },
            { id: 'violet', name: 'Violet', hex: '#5b21b6' }
        ]
    },

    // --- 5. TECHNICAL (Code, Terminal-like) ---
    {
        id: 'technical',
        name: 'Dev Terminal',
        description: 'Speaks the language of developers with monospaced fonts, terminal-style headers, and code-block aesthetics. Features light and dark modes plus a DevOps theme. Perfect for software engineers, DevOps specialists, data scientists, and anyone who lives in the command line.',
        suitableFor: {
            careerLevels: ['mid', 'senior'],
            jobTypes: ['technical'],
            industries: ['Software', 'Engineering', 'Data']
        },
        previewImage: '/templates/technical-preview.png',
        isPremium: false,
        colors: [
            { id: 'standard', name: 'Light Mode', hex: '#ffffff' },
            { id: 'dark', name: 'Dark Mode', hex: '#171717' },
            { id: 'devops', name: 'DevOps Theme', hex: '#064e3b' }
        ]
    },

    // --- 6. EXECUTIVE (Serif, Centered, Gold/Standard) ---
    {
        id: 'executive',
        name: 'Executive Board',
        description: 'Command attention with centered headers, elegant serif typography, and a layout designed for leadership. Features gold and classic color options that convey authority and experience. Ideal for C-suite executives, board members, senior partners, and established industry leaders.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Management', 'C-Suite', 'Legal']
        },
        previewImage: '/templates/executive-preview.png',
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Classic', hex: '#d6d3d1' },
            { id: 'gold', name: 'Gold', hex: '#f59e0b' }
        ]
    },

    // --- 7. ACADEMIC (Dense, Text-heavy) ---
    {
        id: 'academic',
        name: 'Academic CV',
        description: 'Built for academia where comprehensive CVs are expected. Prioritizes publications, research, grants, and teaching experience. Compact spacing allows 2-3 pages without feeling cluttered. Essential for professors, researchers, PhD candidates, and academic positions.',
        suitableFor: {
            careerLevels: ['student', 'senior', 'executive'],
            jobTypes: ['academic'],
            industries: ['Education', 'Research', 'Science']
        },
        previewImage: '/templates/academic-preview.png',
        isPremium: false,
        colors: [
            { id: 'clean', name: 'Clean', hex: '#ffffff' },
            { id: 'dense', name: 'Compact', hex: '#e5e7eb' }
        ]
    },

    // --- 8. CREATIVE (Timeline, Visual) ---
    {
        id: 'creative',
        name: 'Visual Timeline',
        description: 'Tell your career story visually with a unique timeline structure and vibrant accent colors. Features timeline dots and creative section headers that make your progression memorable. Perfect for designers, marketers, content creators, and roles where creativity is valued.',
        suitableFor: {
            careerLevels: ['entry', 'mid'],
            jobTypes: ['creative', 'freelance'],
            industries: ['Design', 'Marketing']
        },
        previewImage: '/templates/creative-preview.png',
        isPremium: true,
        colors: [
            { id: 'purple', name: 'Purple', hex: '#9333ea' },
            { id: 'orange', name: 'Orange', hex: '#ea580c' },
            { id: 'pink', name: 'Pink', hex: '#db2777' }
        ]
    },

    // --- 9. MINIMAL (Clean, Text-focused) ---
    {
        id: 'minimal',
        name: 'Clean Slate',
        description: 'Less is more. Features centered text, generous whitespace, and zero visual distractions. Lets your experience speak for itself without competing design elements. Ideal for writers, consultants, strategists, and professionals who value substance over style.',
        suitableFor: {
            careerLevels: ['mid', 'senior'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Writing', 'Marketing', 'General']
        },
        previewImage: '/templates/minimal-preview.png',
        isPremium: false,
        colors: [
            { id: 'standard', name: 'Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' }
        ]
    },

    // --- 10. COMPACT (Dense, Single Page optimized) ---
    {
        id: 'compact',
        name: 'Compact Pro',
        description: 'Maximize every inch with a high-density two-column layout that fits extensive experience on one page. Features compact spacing and skill badges. Perfect for mid-career professionals with diverse backgrounds or anyone who needs to condense 10+ years into one powerful page.',
        suitableFor: {
            careerLevels: ['entry', 'mid'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Finance', 'Consulting']
        },
        previewImage: '/templates/compact-preview.png',
        isPremium: true,
        colors: [
            { id: 'dark', name: 'Dark', hex: '#171717' },
            { id: 'blue', name: 'Blue', hex: '#2563eb' },
        ]
    },

    // --- 11. PROFESSIONAL (Clean, Single Column, Scannable) ---
    {
        id: 'professional',
        name: 'Professional',
        description: 'Designed for busy recruiters who spend 6 seconds per resume. Features scannable single-column layout, clear section breaks, and professional color accents. Works for any industry and career level. The safe, smart choice for competitive corporate roles.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['General', 'Business', 'Legal', 'Tech']
        },
        previewImage: '/templates/professional-preview.png',
        isPremium: false,
        colors: [
            { id: 'navy', name: 'Navy', hex: '#0f172a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'blue', name: 'Muted Blue', hex: '#1e3a8a' },
            { id: 'green', name: 'Dark Green', hex: '#064e3b' }
        ]
    },

    // --- 12. LUXE (High-end, Serif, Centered) ---
    {
        id: 'luxe',
        name: 'The Luxe',
        description: 'Exude sophistication with center-aligned headers and refined serif typography. Features gold, emerald, and charcoal color themes that convey prestige. Built for executive presence and commanding attention. Perfect for senior leadership roles in finance, law, and luxury sectors.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Finance', 'Legal', 'Management', 'Luxury']
        },
        previewImage: '/templates/luxe-preview.png',
        isPremium: true,
        colors: [
            { id: 'gold', name: 'Gold Leaf', hex: '#b45309' },
            { id: 'emerald', name: 'Royal Emerald', hex: '#064e3b' },
            { id: 'charcoal', name: 'Deep Charcoal', hex: '#1e293b' }
        ]
    },

    // --- 13. STARTUP (Vibrant, Component-based, Modern) ---
    {
        id: 'startup',
        name: 'The Startup',
        description: 'High-energy layout with vibrant colors and component-based design. Features bold sidebar, hashtag-style skills, and modern aesthetics. Perfect for tech startups, SaaS companies, digital agencies, and innovative roles where energy and forward-thinking are valued.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['technical', 'creative'],
            industries: ['Tech', 'SaaS', 'Digital']
        },
        previewImage: '/templates/startup-preview.png',
        isPremium: true,
        colors: [
            { id: 'vibrant-blue', name: 'Vibrant Blue', hex: '#2563eb' },
            { id: 'electric-purple', name: 'Electric Purple', hex: '#9333ea' },
            { id: 'cyber-lime', name: 'Cyber Lime', hex: '#84cc16' }
        ]
    },

    // --- 14. ARTISAN (Soft, Offset, Human-centric) ---
    {
        id: 'artisan',
        name: 'The Artisan',
        description: 'Sophisticated offset layout with earthy tones and organic feel. Features sage, terracotta, and slate color themes that feel warm and approachable. Ideal for creative professionals, educators, healthcare workers, and roles where human connection matters.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Design', 'Art', 'Education', 'Health']
        },
        previewImage: '/templates/artisan-preview.png',
        isPremium: true,
        colors: [
            { id: 'sage', name: 'Earthy Sage', hex: '#064e3b' },
            { id: 'terracotta', name: 'Terracotta', hex: '#c2410c' },
            { id: 'slate', name: 'Natural Slate', hex: '#334155' }
        ]
    },

    // --- 15. SPLIT-CONTRAST (Subtle Hierarchy, Modern) ---
    {
        id: 'split-contrast',
        name: 'The Split-Contrast',
        description: 'Bold, modern layout using subtle dual-tone background to create visual hierarchy. Features skill proficiency bars and clean typography. Perfect for analysts, consultants, strategists, and professionals who need to convey both creativity and analytical thinking.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Finance', 'Consulting', 'Tech']
        },
        previewImage: '/templates/split-contrast-preview.png',
        isPremium: true,
        colors: [
            { id: 'gray', name: 'Pure Gray', hex: '#f9fafb' },
            { id: 'slate', name: 'Cool Slate', hex: '#f8fafc' },
            { id: 'warm', name: 'Soft Warmth', hex: '#fafaf9' }
        ]
    },
    // --- 16. GRADUATE (Entry level, single column, education first) ---
    {
        id: 'graduate',
        name: 'Graduate Professional',
        description: 'Education-first layout designed for recent graduates and early career professionals. Prioritizes academic achievements, coursework, and university projects. Clean hierarchy helps you stand out even with limited work experience. Perfect for your first professional role.',
        suitableFor: {
            careerLevels: ['student', 'entry'],
            jobTypes: ['corporate', 'academic', 'technical'],
            industries: ['General']
        },
        previewImage: '/templates/graduate-preview.png',
        isPremium: false,
        colors: [
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'teal', name: 'Teal', hex: '#0f766e' },
            { id: 'maroon', name: 'Maroon', hex: '#9f1239' }
        ]
    },

    // --- 17. NEW ATS SERIES (7 NEW TEMPLATES) ---
    {
        id: 'ats-classic',
        name: 'ATS Classic Serif',
        description: 'Combines ATS compatibility with traditional elegance. Serif typography for law firms, financial institutions, and conservative industries. Passes automated screening while maintaining professional gravitas. Perfect when you need both modern technology and timeless presentation.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Legal', 'Finance', 'Education']
        },
        isPremium: false,
        colors: [
            { id: 'black', name: 'Standard', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' }
        ]
    },
    {
        id: 'ats-minimal',
        name: 'ATS Ultra-Minimal',
        description: 'The ultimate in simplicity and ATS compatibility. Maximum whitespace and zero decorative elements ensure perfect parsing by any system, old or new. When you absolutely must pass automated screening, this is your safest choice. Works for any industry or career level.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['corporate', 'creative'],
            industries: ['General']
        },
        isPremium: false,
        colors: [
            { id: 'black', name: 'Standard', hex: '#000000' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' }
        ]
    },
    {
        id: 'ats-executive',
        name: 'ATS Executive Bold',
        description: 'ATS-compliant template designed for leadership roles. Bold section headers emphasize strategic achievements and executive presence. Passes automated screening while commanding attention. Perfect for C-suite, VP, and director-level positions in competitive markets.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Management', 'C-Suite']
        },
        isPremium: false,
        colors: [
            { id: 'black', name: 'Standard', hex: '#000000' },
            { id: 'gold', name: 'Premium Gold', hex: '#b45309' }
        ]
    },
    {
        id: 'ats-technical',
        name: 'ATS Dev-Console',
        description: 'Built for developers who need ATS compatibility. Monospaced format highlights technical skills, programming languages, and GitHub repositories. Passes automated screening while speaking the language of tech recruiters. Essential for software engineering roles at major tech companies.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['technical'],
            industries: ['Software', 'Engineering', 'AI']
        },
        isPremium: false,
        colors: [
            { id: 'black', name: 'Standard', hex: '#000000' },
            { id: 'green', name: 'Matrix Green', hex: '#064e3b' }
        ]
    },
    {
        id: 'ats-modern',
        name: 'ATS Modern Clean',
        description: 'Contemporary design meets ATS requirements. Clean sans-serif typography and subtle hierarchy create modern appeal while ensuring perfect parsing. Ideal for tech companies, SaaS startups, and marketing roles where you need both style and substance.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Tech', 'SaaS', 'Marketing']
        },
        isPremium: false,
        colors: [
            { id: 'black', name: 'Standard', hex: '#000000' },
            { id: 'blue', name: 'Modern Blue', hex: '#2563eb' }
        ]
    },
    {
        id: 'ats-graduate',
        name: 'ATS New Grad',
        description: 'Designed specifically for recent graduates entering competitive job markets. Education-first layout with dedicated sections for coursework, projects, and internships. ATS-optimized to help you land interviews even with limited work experience. Your launchpad to career success.',
        suitableFor: {
            careerLevels: ['student', 'entry'],
            jobTypes: ['corporate', 'academic'],
            industries: ['General', 'Education']
        },
        isPremium: false,
        colors: [
            { id: 'black', name: 'Standard', hex: '#000000' },
            { id: 'maroon', name: 'Academic Maroon', hex: '#9f1239' }
        ]
    },
    {
        id: 'ats-standard',
        name: 'ATS Pro-Standard',
        description: 'The recruiter favorite. Left-aligned layout with perfectly structured headers that both humans and ATS systems love. High readability ensures your qualifications are never missed. The reliable, professional choice for any corporate role at any career level.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['General', 'Business']
        },
        isPremium: false,
        colors: [
            { id: 'black', name: 'Standard', hex: '#000000' },
            { id: 'slate', name: 'Slate Grey', hex: '#475569' }
        ]
    }
]
