import { TemplateMetadata } from '../types/resume'

export const templateRegistry: TemplateMetadata[] = [
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

    // --- 3. ATS ULTRA-MINIMAL ---
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

    // --- 4. ATS CLASSIC SERIF ---
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

    // --- 5. ATS EXECUTIVE BOLD ---
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

    // --- 6. ATS MODERN CLEAN ---
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

    // --- 7. HOSPITALITY PRO (Unified Maritime, Culinary, Hotel) ---
    {
        id: 'hospitality-pro',
        name: 'Hospitality Pro (3-in-1)',
        description: 'The ultimate professional toolkit for the hospitality industry. This intelligent template automatically adapts its design, icons, and layout based on your role—whether you are an Executive Chef, a Cruise Ship Officer, or a Luxury Hotel Manager. Features high-impact photo support, maritime certification tracking, and specialized skill metrics.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Hospitality', 'Cruise', 'Culinary', 'Tourism', 'Luxury Service']
        },
        isPremium: true,
        colors: [
            { id: 'gold', name: 'Luxury Gold (Hotel)', hex: '#b45309' },
            { id: 'navy', name: 'Maritime Navy (Cruise)', hex: '#1e3a8a' },
            { id: 'red', name: 'Signature Red (Chef)', hex: '#b91c1c' },
            { id: 'emerald', name: 'Deep Emerald (Resort)', hex: '#064e3b' },
            { id: 'black', name: 'Executive Onyx', hex: '#111827' }
        ]
    },

    // --- 9. VISUAL TIMELINE (Creative) ---
    {
        id: 'creative',
        name: 'Visual Timeline',
        description: 'Tell your career story visually with a unique timeline structure and vibrant accent colors. Features timeline dots and creative section headers that make your progression memorable. Perfect for designers, marketers, content creators, and roles where creativity is valued.',
        suitableFor: {
            careerLevels: ['entry', 'mid'],
            jobTypes: ['creative', 'freelance'],
            industries: ['Design', 'Marketing']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Midnight', hex: '#111827' },
            { id: 'purple', name: 'Purple', hex: '#9333ea' },
            { id: 'orange', name: 'Orange', hex: '#ea580c' },
            { id: 'pink', name: 'Pink', hex: '#db2777' },
            { id: 'indigo', name: 'Indigo Flare', hex: '#4f46e5' }
        ]
    },

    // --- 10. ATS TIMELINE PRO ---
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

    // --- 11. NURSING PROFESSIONAL (NEW - ATS-Standard based) ---
    {
        id: 'ats-standard-nursing',
        name: 'Nursing Professional',
        description: 'Specialized clinical layout optimized for healthcare systems. Features dedicated sections for certifications, licensures (RN, CCRN, etc.), and clinical rotations. ATS-compliant for hospital application portals while maintaining high readability for nurse managers.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Healthcare', 'Nursing', 'Medical']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Clinical Black', hex: '#000000' },
            { id: 'blue', name: 'Scrub Blue', hex: '#1e40af' },
            { id: 'teal', name: 'Medical Teal', hex: '#0f766e' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'slate', name: 'Slate', hex: '#475569' }
        ]
    },

    // --- 12. HOSPITALITY ATS PRO ---
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

    // --- 13. CARE CREATIVE (NEW - Creative based) ---
    {
        id: 'creative-nursing',
        name: 'Care & Compassion',
        description: 'Warm, approachable design specifically for patient-facing roles. Ideal for pediatric nurses, school nurses, and caregivers who want to highlight their philosophy of care. Uses soft colors and a visual layout to convey empathy and professionalism.',
        suitableFor: {
            careerLevels: ['entry', 'mid'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Healthcare', 'Pediatrics', 'Non-profit']
        },
        isPremium: true,
        colors: [
            { id: 'pink', name: 'Compassion Pink', hex: '#db2777' },
            { id: 'blue', name: 'Pediatric Blue', hex: '#3b82f6' },
            { id: 'purple', name: 'Gentle Purple', hex: '#9333ea' },
            { id: 'orange', name: 'Warm Orange', hex: '#ea580c' },
            { id: 'black', name: 'Midnight', hex: '#111827' }
        ]
    },

    // --- 14. ATS TECHNICAL ---
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

    // --- 15a. ATS NURSING RN ---
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

    // --- 15b. ATS ACADEMIA ---
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

    // --- 15. ATS NEW GRAD ---
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

    // --- 16. MODERN ---
    {
        id: 'modern',
        name: 'Modern One',
        description: 'Make a strong first impression with a bold sidebar that highlights your skills and contact info at a glance. The two-column layout maximizes space while maintaining readability. Ideal for tech professionals, project managers, and anyone with diverse skill sets to showcase.',
        suitableFor: {
            careerLevels: ['mid', 'senior'],
            jobTypes: ['technical', 'creative', 'corporate'],
            industries: ['Tech', 'Startup', 'Media']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Stealth Black', hex: '#111827' },
            { id: 'slate', name: 'Dark Slate', hex: '#0f172a' },
            { id: 'teal', name: 'Teal', hex: '#115e59' },
            { id: 'blue', name: 'Blue', hex: '#1e3a8a' },
            { id: 'violet', name: 'Violet', hex: '#5b21b6' }
        ]
    },

    // --- 18. EXECUTIVE ---
    {
        id: 'executive',
        name: 'Executive Board',
        description: 'Command attention with centered headers, elegant serif typography, and a layout designed for leadership. Features gold and classic color options that convey authority and experience. Ideal for C-suite executives, board members, senior partners, and established industry leaders.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Management', 'C-Suite', 'Legal']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Premium Black', hex: '#000000' },
            { id: 'standard', name: 'Classic Slate', hex: '#d6d3d1' },
            { id: 'gold', name: 'Gold', hex: '#f59e0b' },
            { id: 'navy', name: 'Presidential Navy', hex: '#0f172a' },
            { id: 'emerald', name: 'Royal Emerald', hex: '#064e3b' }
        ]
    },

    // --- 19. CHIC ---
    {
        id: 'chic',
        name: 'Chic Minimalist',
        description: 'Inspired by high-end fashion magazines and luxury brands. Features sophisticated serif typography, generous whitespace, and an editorial aesthetic. Perfect for roles in luxury retail, publishing, art galleries, or any position where refined taste and attention to detail are paramount.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Luxury', 'Fashion', 'Art']
        },
        isPremium: true,
        colors: [
            { id: 'std', name: 'Standard Black', hex: '#000000' },
            { id: 'navy', name: 'Onyx Navy', hex: '#0f172a' },
            { id: 'slate', name: 'Modern Slate', hex: '#334155' },
            { id: 'charcoal', name: 'Deep Charcoal', hex: '#1f2937' },
            { id: 'serif', name: 'Serif Mode', hex: '#f5f5f4' }
        ]
    },

    // --- 20. TECHNICAL (Dev Terminal) ---
    {
        id: 'technical',
        name: 'Dev Terminal',
        description: 'Speaks the language of developers with monospaced fonts, terminal-style headers, and code-block aesthetics. Features light and dark modes plus a DevOps theme. Perfect for software engineers, DevOps specialists, data scientists, and anyone who lives in the command line.',
        suitableFor: {
            careerLevels: ['mid', 'senior'],
            jobTypes: ['technical'],
            industries: ['Software', 'Engineering', 'Data']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Terminal Black', hex: '#000000' },
            { id: 'standard', name: 'Light Mode', hex: '#ffffff' },
            { id: 'dark', name: 'Dark Mode', hex: '#171717' },
            { id: 'devops', name: 'DevOps Theme', hex: '#064e3b' },
            { id: 'slate', name: 'Code Slate', hex: '#334155' }
        ]
    },

    // --- 21. ACADEMIC ---
    {
        id: 'academic',
        name: 'Academic CV',
        description: 'Built for academia where comprehensive CVs are expected. Prioritizes publications, research, grants, and teaching experience. Compact spacing allows 2-3 pages without feeling cluttered. Essential for professors, researchers, PhD candidates, and academic positions.',
        suitableFor: {
            careerLevels: ['student', 'senior', 'executive'],
            jobTypes: ['academic'],
            industries: ['Education', 'Research', 'Science']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Formal Black', hex: '#000000' },
            { id: 'clean', name: 'Clean White', hex: '#ffffff' },
            { id: 'dense', name: 'Compact Gray', hex: '#e5e7eb' },
            { id: 'navy', name: 'Oxford Navy', hex: '#1e3a8a' },
            { id: 'maroon', name: 'Scholar Maroon', hex: '#7f1d1d' }
        ]
    },

    // --- 22. COMPACT ---
    {
        id: 'compact',
        name: 'Compact Pro',
        description: 'Maximize every inch with a high-density two-column layout that fits extensive experience on one page. Features compact spacing and skill badges. Perfect for mid-career professionals with diverse backgrounds or anyone who needs to condense 10+ years into one powerful page.',
        suitableFor: {
            careerLevels: ['entry', 'mid'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Finance', 'Consulting']
        },
        isPremium: true,
        colors: [
            { id: 'dark', name: 'Dark Onyx', hex: '#171717' },
            { id: 'black', name: 'Matte Black', hex: '#000000' },
            { id: 'blue', name: 'Electric Blue', hex: '#2563eb' },
            { id: 'emerald', name: 'Emerald', hex: '#10b981' },
            { id: 'navy', name: 'Deep Navy', hex: '#1e3a8a' }
        ]
    },

    // --- 23. PROFESSIONAL ---
    {
        id: 'professional',
        name: 'Professional',
        description: 'A sophisticated two-column layout that balances high-impact content with elegant sidebar details. Features a clean visual timeline, skill proficiency bars, and modern typography. Designed for professionals who want to stand out to both recruiters and hiring managers.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['General', 'Business', 'Legal', 'Tech']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Sharp Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#0f172a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'blue', name: 'Muted Blue', hex: '#1e3a8a' },
            { id: 'green', name: 'Dark Green', hex: '#064e3b' }
        ]
    },

    // --- 24. LUXE ---
    {
        id: 'luxe',
        name: 'The Luxe',
        description: 'Exude sophistication with center-aligned headers and refined serif typography. Features gold, emerald, and charcoal color themes that convey prestige. Built for executive presence and commanding attention. Perfect for senior leadership roles in finance, law, and luxury sectors.',
        suitableFor: {
            careerLevels: ['senior', 'executive'],
            jobTypes: ['corporate'],
            industries: ['Finance', 'Legal', 'Management', 'Luxury']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Rich Black', hex: '#000000' },
            { id: 'gold', name: 'Gold Leaf', hex: '#b45309' },
            { id: 'emerald', name: 'Royal Emerald', hex: '#064e3b' },
            { id: 'charcoal', name: 'Deep Charcoal', hex: '#1e293b' },
            { id: 'navy', name: 'Majestic Navy', hex: '#0f172a' }
        ]
    },

    // --- 25. STARTUP ---
    {
        id: 'startup',
        name: 'The Startup',
        description: 'High-energy layout with vibrant colors and component-based design. Features bold sidebar, hashtag-style skills, and modern aesthetics. Perfect for tech startups, SaaS companies, digital agencies, and innovative roles where energy and forward-thinking are valued.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['technical', 'creative'],
            industries: ['Tech', 'SaaS', 'Digital']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Founders Black', hex: '#111827' },
            { id: 'vibrant-blue', name: 'Vibrant Blue', hex: '#2563eb' },
            { id: 'electric-purple', name: 'Electric Purple', hex: '#9333ea' },
            { id: 'cyber-lime', name: 'Cyber Lime', hex: '#84cc16' },
            { id: 'hot-pink', name: 'Neon Pink', hex: '#f43f5e' }
        ]
    },

    // --- 26. ARTISAN ---
    {
        id: 'artisan',
        name: 'The Artisan',
        description: 'Sophisticated offset layout with earthy tones and organic feel. Features sage, terracotta, and slate color themes that feel warm and approachable. Ideal for creative professionals, educators, healthcare workers, and roles where human connection matters.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Design', 'Art', 'Education', 'Health']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Artisan Black', hex: '#1c1917' },
            { id: 'sage', name: 'Earthy Sage', hex: '#064e3b' },
            { id: 'terracotta', name: 'Terracotta', hex: '#c2410c' },
            { id: 'slate', name: 'Natural Slate', hex: '#334155' },
            { id: 'clay', name: 'Warm Clay', hex: '#a8a29e' }
        ]
    },

    // --- 27. SPLIT-CONTRAST ---
    {
        id: 'split-contrast',
        name: 'The Split-Contrast',
        description: 'Bold, modern layout using subtle dual-tone background to create visual hierarchy. Features skill proficiency bars and clean typography. Perfect for analysts, consultants, strategists, and professionals who need to convey both creativity and analytical thinking.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Finance', 'Consulting', 'Tech']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Modern Black', hex: '#111827' },
            { id: 'gray', name: 'Pure Gray', hex: '#f9fafb' },
            { id: 'slate', name: 'Cool Slate', hex: '#f8fafc' },
            { id: 'warm', name: 'Soft Warmth', hex: '#fafaf9' },
            { id: 'navy', name: 'Contrast Navy', hex: '#0f172a' }
        ]
    },

    // --- 29. GRADUATE (Original) ---
    {
        id: 'graduate',
        name: 'Graduate Professional',
        description: 'Education-first layout designed for recent graduates and early career professionals. Prioritizes academic achievements, coursework, and university projects. Clean hierarchy helps you stand out even with limited work experience. Perfect for your first professional role.',
        suitableFor: {
            careerLevels: ['student', 'entry'],
            jobTypes: ['corporate', 'academic', 'technical'],
            industries: ['General']
        },
        isPremium: true,
        colors: [
            { id: 'black', name: 'Standard Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'teal', name: 'Teal', hex: '#0f766e' },
            { id: 'maroon', name: 'Maroon', hex: '#9f1239' },
            { id: 'slate', name: 'Modern Slate', hex: '#475569' }
        ]
    },

    // --- 30. MINIMAL (Clean Slate) ---
    {
        id: 'minimal',
        name: 'Clean Slate',
        description: 'Less is more. Features centered text, generous whitespace, and zero visual distractions. Lets your experience speak for itself without competing design elements. Ideal for writers, consultants, strategists, and professionals who value substance over style.',
        suitableFor: {
            careerLevels: ['mid', 'senior'],
            jobTypes: ['creative', 'corporate'],
            industries: ['Writing', 'Marketing', 'General']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Pure Black', hex: '#000000' },
            { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'slate', name: 'Slate Gray', hex: '#475569' },
            { id: 'teal', name: 'Muted Teal', hex: '#0d9488' }
        ]
    },

    // --- 31. REVENUE LEADER ---
    {
        id: 'revenue-leader',
        name: 'Revenue Leader',
        description: 'Built for sales professionals, business developers, account executives, and revenue-focused leaders. The dark gradient header features a live KPI metrics strip drawn straight from your achievements — quota attainment, ARR, deal count, and more. A clean two-column layout separates your accomplishments and key deals from skills and credentials. ATS-compatible, multi-page ready, and designed to make numbers impossible to miss.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Sales', 'Business Development', 'Growth', 'SaaS', 'Finance', 'Consulting']
        },
        isPremium: true,
        colors: [
            { id: 'blue', name: 'Pipeline Blue', hex: '#1e3a8a' },
            { id: 'green', name: 'Revenue Green', hex: '#065f46' },
            { id: 'slate', name: 'Deal Slate', hex: '#1e293b' },
            { id: 'violet', name: 'Strategy Violet', hex: '#4c1d95' },
            { id: 'orange', name: 'Growth Orange', hex: '#9a3412' }
        ]
    },

    // --- 32. CLASSIC CLEAN ---
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
    // --- 33. LEGAL EXPERT ---
    {
        id: 'legal-expert',
        name: 'Legal Practitioner',
        description: 'Ultra-traditional, serif-driven layout designed specifically for the legal industry. Adheres to strict law firm standards with double-ruled headers and an emphasis on bar admissions, clerkships, and publication history. Command respect with timeless professional gravitas.',
        suitableFor: {
            careerLevels: ['mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'academic'],
            industries: ['Legal', 'Law', 'Governance', 'Compliance']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Legal Onyx', hex: '#111827' },
            { id: 'navy', name: 'Solicitor Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Charcoal', hex: '#374151' },
            { id: 'burgundy', name: 'Precedent Burgundy', hex: '#7f1d1d' }
        ]
    },
    // --- 34. MILITARY TRANSITION ---
    {
        id: 'military-transition',
        name: 'Military Transition Pro',
        description: 'Designed to help veterans translate complex military service into civilian-friendly professional achievements. Features high-visibility sections for core competencies, technical certifications, and security clearances. Authoritative and organized for transition success.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'technical'],
            industries: ['Defense', 'Operations', 'Logistics', 'Security', 'General']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Duty Slate', hex: '#0f172a' },
            { id: 'olive', name: 'Service Green', hex: '#3f6212' },
            { id: 'navy', name: 'Command Navy', hex: '#1e3a8a' },
            { id: 'charcoal', name: 'Onyx', hex: '#111827' }
        ]
    },
    // --- 35. REAL ESTATE PRO ---
    {
        id: 'real-estate-pro',
        name: 'Real Estate & Property Pro',
        description: 'Sophisticated, metrics-driven design for real estate agents and property managers. Highlights sales performance, transaction volume, and client outcomes with high-impact visual strips. Supports professional photography for personal branding excellence.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'creative'],
            industries: ['Real Estate', 'Property Management', 'Construction', 'Sales']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Luxury Stone', hex: '#1c1917' },
            { id: 'gold', name: 'Premium Gold', hex: '#b45309' },
            { id: 'slate', name: 'Modern Slate', hex: '#334155' },
            { id: 'maroon', name: 'Estate Maroon', hex: '#7f1d1d' }
        ]
    },
    // --- 36. SKILLED TRADES PRO ---
    {
        id: 'trades-pro',
        name: 'Skilled Trades & Construction',
        description: 'Rugged, high-visibility layout for masters of the trade. Prioritizes project highlights, safety certifications, and specialized equipment proficiency. Perfect for showing the heavy-duty impact of your craftsmanship and field leadership.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior'],
            jobTypes: ['technical'],
            industries: ['Construction', 'HVAC', 'Electrical', 'Automotive', 'Logistics']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Project Orange', hex: '#ea580c' },
            { id: 'yellow', name: 'Safety Yellow', hex: '#eab308' },
            { id: 'black', name: 'Steel Black', hex: '#171717' },
            { id: 'blue', name: 'Workshop Blue', hex: '#2563eb' }
        ]
    },
    // --- 37. INTERNATIONAL CV ---
    {
        id: 'international-cv',
        name: 'International Expat CV',
        description: 'Global-standard curriculum vitae optimized for international job markets (EU, Middle East, Asia). Features detailed personal profile sidebars, multilingual proficiency tracking, and a layout that emphasizes cross-border career progression.',
        suitableFor: {
            careerLevels: ['entry', 'mid', 'senior', 'executive'],
            jobTypes: ['corporate', 'academic', 'technical'],
            industries: ['International Business', 'NGO', 'Education', 'Diplomatic']
        },
        isPremium: true,
        colors: [
            { id: 'standard', name: 'Global Blue', hex: '#1e3a8a' },
            { id: 'slate', name: 'Oxford Slate', hex: '#334155' },
            { id: 'emerald', name: 'Expedition Green', hex: '#064e3b' },
            { id: 'black', name: 'Midnight', hex: '#111827' }
        ]
    }
]
