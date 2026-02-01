/**
 * Heuristic-based Resume Parser (Non-AI)
 * Splits raw text into likely sections based on common keywords.
 */

export interface ParsedSections {
    personalInfo: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    certifications: string;
    languages: string;
    awards: string;
    volunteer: string;
    publications: string;
    affiliations: string;
    references: string;
    other: string;
}

const SECTION_HEADERS = {
    summary: /summary|profile|professional profile|objective|about me/i,
    experience: /experience|work experience|employment history|work history|professional experience|professional background/i,
    education: /education|academic background|qualifications|academic history/i,
    skills: /skills|technical skills|expertise|competencies|tools|technologies|proficiencies/i,
    projects: /projects|selected projects|personal projects|notable projects/i,
    certifications: /certifications|licenses|certs|professional certifications/i,
    languages: /languages|linguistic skills/i,
    awards: /awards|achievements|honors|recognitions/i,
    volunteer: /volunteer|volunteering|community service|non-profit/i,
    publications: /publications|research|articles|papers/i,
    affiliations: /affiliations|associations|memberships/i,
    references: /references|recommendations/i,
};

export function splitSections(text: string): ParsedSections {
    const lines = text.split('\n');
    const sections: ParsedSections = {
        personalInfo: '',
        summary: '',
        experience: '',
        education: '',
        skills: '',
        projects: '',
        certifications: '',
        languages: '',
        awards: '',
        volunteer: '',
        publications: '',
        affiliations: '',
        references: '',
        other: ''
    };

    let currentSection: keyof ParsedSections = 'personalInfo';
    const foundLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Check if line is a header
        let foundHeader = false;

        // Simple header detection: short line (usually < 40 chars) and matches keywords
        if (line.length < 40) {
            for (const [key, regex] of Object.entries(SECTION_HEADERS)) {
                if (regex.test(line)) {
                    currentSection = key as keyof ParsedSections;
                    foundHeader = true;
                    break;
                }
            }
        }

        if (!foundHeader) {
            sections[currentSection] += line + '\n';
        }
    }

    return sections;
}

/**
 * Basic Contact Info Extraction (Non-AI)
 */
export function extractContactInfo(text: string) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const email = text.match(emailRegex)?.[0] || '';
    const phone = text.match(phoneRegex)?.[0] || '';
    const urls = text.match(urlRegex) || [];

    // First few lines are usually the name if it's a standard resume
    const firstLines = text.split('\n').filter(l => l.trim().length > 0).slice(0, 3);
    const fullName = firstLines[0] || '';

    return {
        fullName,
        email,
        phone,
        websites: urls
    };
}
