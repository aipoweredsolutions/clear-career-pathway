export const getSectionTitle = (templateId: string, sectionId: string, index: number = 0) => {
    const id = templateId.toLowerCase()


    // 2. ATS Professional Specifics
    if (id.startsWith('ats-professional')) {
        switch (sectionId) {
            case 'professionalSummary': return 'Professional Summary'
            case 'workExperience': return 'Work Experience'
            case 'skills': return 'Core Skills'
            case 'achievements': return 'Achievements & Awards'
            case 'volunteerExperience': return 'Volunteer Experience'
            default: break
        }
    }

    // 3. Hospitality & Cruise Specifics
    if (id.startsWith('ats-hospitality') || id.startsWith('hospitality-elite') || id.startsWith('cruise-excellence')) {
        switch (sectionId) {
            case 'professionalSummary':
                if (id.startsWith('hospitality-elite')) return ''
                return id.startsWith('ats-hospitality') ? 'Professional Profile' : 'Professional Summary'
            case 'workExperience':
                if (id.startsWith('cruise')) return 'Maritime & Hospitality History'
                if (id.startsWith('ats-hospitality')) return 'Hospitality Experience'
                return 'Professional Experience'
            case 'skills': return id.startsWith('hospitality-elite') ? 'Expertise' : (id.startsWith('cruise') ? 'Skills' : 'Core Competencies & Languages')
            case 'certifications': return 'Licensure & Certifications'
            case 'achievements': return 'Recognition & Awards'
            case 'education': return id.startsWith('cruise') ? 'Academic History' : 'Education'
            case 'projects': return id.startsWith('cruise') ? 'Special Assignments' : 'Projects'
            case 'volunteerExperience': return id.startsWith('cruise') ? 'Volunteer Service' : 'Volunteer Experience'
            default: break
        }
    }

    // 4. Creative / About Me variants
    if (id.startsWith('creative')) {
        switch (sectionId) {
            case 'professionalSummary': return 'About Me'
            case 'workExperience': return 'Work Experience'
            default: break
        }
    }

    // 5. ATS Modern / Digital Focus
    if (id.startsWith('ats-modern')) {
        switch (sectionId) {
            case 'professionalSummary': return 'Profile'
            case 'skills': return 'Competencies'
            case 'education': return 'Learning'
            case 'achievements': return 'Validation'
            case 'certifications': return 'Certifications'
            case 'workExperience': return 'Experience'
            case 'projects': return 'Featured Projects'
            case 'languages': return 'Languages'
            default: break
        }
    }

    // 5. Timeline Pro / Executive Specifics
    if (id.startsWith('ats-timeline') || id.startsWith('ats-executive') || id.startsWith('executive') || id.startsWith('luxe')) {
        switch (sectionId) {
            case 'professionalSummary': return id.startsWith('ats-timeline') ? 'Executive Profile' : 'Professional Profile'
            case 'skills': return 'Core Expertise'
            case 'workExperience': return id.startsWith('ats-timeline') ? 'Career Milestone' : 'Professional Experience'
            case 'achievements': return 'Career Milestones'
            case 'education': return id.startsWith('ats-timeline') ? 'Academic Foundation' : 'Education'
            case 'certifications': return id.startsWith('ats-timeline') ? 'Credentials' : 'Certifications'
            case 'languages': return id.startsWith('ats-timeline') ? 'Linguistics' : 'Languages'
            default: break
        }
    }

    // 6. Artisan Label style
    if (id.startsWith('artisan')) {
        switch (sectionId) {
            case 'professionalSummary': return 'About'
            case 'workExperience': return 'Experience'
            case 'skills': return 'Expertise'
            case 'achievements': return 'Recognition'
            case 'volunteerExperience': return 'Philanthropy'
            default: break
        }
    }

    // 7. ATS Graduate Specifics
    if (id.startsWith('ats-graduate')) {
        switch (sectionId) {
            case 'professionalSummary': return 'Objective & Profile'
            case 'education': return 'Academic Foundation'
            case 'workExperience': return 'Professional Experience'
            case 'projects': return 'Key Projects & Research'
            case 'skills': return 'Skills & Toolsets'
            case 'achievements': return 'Honors & Certifications'
            case 'certifications': return 'Honors & Certifications'
            case 'volunteerExperience': return 'Volunteerism'
            default: break
        }
    }

    // 8. General ATS Nursing variant (Standard based)
    if (id.includes('nursing')) {
        switch (sectionId) {
            case 'workExperience': return 'Nursing Experience'
            case 'certifications': return 'Licensures & Certifications'
            default: break
        }
    }

    // 9. General ATS Fallback (Simplified for better parsing)
    if (id.startsWith('ats')) {
        switch (sectionId) {
            case 'professionalSummary': return 'Professional Summary'
            case 'workExperience': return 'Work Experience'
            case 'skills': return 'Skills & Competencies'
            case 'education': return 'Education'
            case 'projects': return 'Projects'
            case 'certifications': return 'Certifications'
            case 'achievements': return 'Achievements'
            case 'volunteerExperience': return 'Volunteer Experience'
            case 'languages': return 'Languages'
            case 'professionalAffiliations': return 'Professional Affiliations'
            case 'references': return 'References'
            default: break
        }
    }
    
    // Fallback/Default Section Titles
    switch (sectionId) {
        case 'professionalSummary': return 'Professional Summary'
        case 'workExperience': return 'Work Experience'
        case 'skills': return 'Skills'
        case 'education': return 'Education'
        case 'projects': return 'Projects'
        case 'certifications': return 'Certifications'
        case 'achievements': return 'Achievements'
        case 'volunteerExperience': return 'Volunteer'
        case 'languages': return 'Languages'
        case 'publications': return 'Publications'
        case 'professionalAffiliations': return 'Affiliations'
        case 'references': return 'References'
        default: return sectionId.replace(/([A-Z])/g, ' $1').trim()
    }
}
