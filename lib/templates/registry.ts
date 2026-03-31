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
    }
]
