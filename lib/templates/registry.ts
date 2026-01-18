import { TemplateMetadata } from '../types/resume'

export const templateRegistry: TemplateMetadata[] = [
    // --- 1. ATS PROFESSIONAL (Maximum ATS Compatibility) ---
    {
        id: 'ats-professional',
        name: 'ATS Professional',
        description: 'Maximum ATS compatibility with clean single-column layout, standard fonts, and no graphics. Perfect for corporate and technical roles.',
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
        description: 'Playful, rounded design with soft pastel aesthetics. Perfect for creative personalities.',
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
        description: 'Sophisticated typography and generous whitespace. High-end editorial look.',
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
        description: 'The Gold Standard. ATS-optimized, clear hierarchy, and universally accepted.',
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
        description: 'Contemporary two-column layout with a bold sidebar for skills and contact info.',
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
        description: 'Monospaced font and code-block styling. Built for developers by developers.',
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
        description: 'Commanding presence with centered headers and elegant serif details.',
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
        description: 'Optimized for length. Prioritizes publications, research, and education.',
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
        description: 'Unique left-aligned timeline structure for showcasing career growth.',
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
        description: 'Centered, zero-distraction layout. Focuses purely on clarity and content.',
        suitableFor: {
            careerLevels: ['mid', 'senior'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Writing', 'Marketing', 'General']
        },
        previewImage: '/templates/classic-preview.png', // Temporary placeholder
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
        description: 'High-density layout designed to fit as much info as possible on one page.',
        suitableFor: {
            careerLevels: ['entry', 'mid'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Finance', 'Consulting']
        },
        previewImage: '/templates/modern-preview.png', // Temporary placeholder
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
        description: 'Clean, professional, and easy to scan. Optimized for recruiter review with a single-column layout.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['General', 'Business', 'Legal', 'Tech']
        },
        previewImage: '/templates/classic-preview.png', // Temporary placeholder
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
        description: 'Commanding elegance with center-aligned headers and refined serif typography. Built for executive presence.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Finance', 'Legal', 'Management', 'Luxury']
        },
        previewImage: '/templates/executive-preview.png', // Temporary placeholder
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
        description: 'Vibrant, high-energy layout with component-based skills and a bold sidebar. Perfect for tech and innovative roles.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['technical', 'creative'],
            industries: ['Tech', 'SaaS', 'Digital']
        },
        previewImage: '/templates/modern-preview.png', // Temporary placeholder
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
        description: 'Sophisticated offset layout with earthy tones and an organic feel. Ideal for creative and academic professionals.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Design', 'Art', 'Education', 'Health']
        },
        previewImage: '/templates/chic-preview.png', // Temporary placeholder
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
        description: 'Bold, modern layout using a subtle dual-tone background to create focus. Perfect for analysts, consultants, and leaders.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Finance', 'Consulting', 'Tech']
        },
        previewImage: '/templates/modern-preview.png', // Temporary placeholder
        isPremium: true,
        colors: [
            { id: 'gray', name: 'Pure Gray', hex: '#f9fafb' },
            { id: 'slate', name: 'Cool Slate', hex: '#f8fafc' },
            { id: 'warm', name: 'Soft Warmth', hex: '#fafaf9' }
        ]
    }
]
