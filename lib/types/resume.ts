// TypeScript types for resume/CV data structures
// Matches the database schema exactly

export type CareerLevel = 'student' | 'entry' | 'mid' | 'senior' | 'executive'
export type JobType = 'corporate' | 'creative' | 'technical' | 'academic' | 'freelance' | 'service' | 'management'
export type DocumentType = 'resume' | 'cv' | 'cover_letter' | 'career_blog' | 'references'
export type SkillType = 'technical' | 'professional' | 'tool' | 'industry'
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type LanguageProficiency = 'basic' | 'intermediate' | 'fluent' | 'native'

export interface PersonalInfo {
    id?: string
    documentId?: string
    fullName: string
    professionalTitle?: string
    email?: string
    phone?: string
    city?: string
    country?: string
    location?: string // Combined city, country
    linkedinUrl?: string
    githubUrl?: string
    websiteUrl?: string
    portfolioUrl?: string
    photoUrl?: string
}

export interface ProfessionalSummary {
    id?: string
    documentId?: string
    headline?: string
    summaryText?: string
    valueProposition?: string
}

export interface Skill {
    id?: string
    documentId?: string
    skillName: string
    skillType?: SkillType
    proficiencyLevel?: ProficiencyLevel
    displayOrder?: number
}

export interface WorkAchievement {
    id?: string
    workExperienceId?: string
    achievementText: string
    metrics?: string
    displayOrder?: number
}

export interface WorkExperience {
    id?: string
    documentId?: string
    jobTitle: string
    companyName: string
    location?: string
    isRemote?: boolean
    startDate: string // ISO date string
    endDate?: string // ISO date string or null for current
    isCurrent?: boolean
    roleDescription?: string
    achievements?: WorkAchievement[]
    displayOrder?: number
    forcePageBreak?: boolean
}

export interface Project {
    id?: string
    documentId?: string
    projectName: string
    clientOrOrganization?: string
    role?: string
    description?: string
    toolsUsed?: string[]
    outcomes?: string
    projectUrl?: string
    startDate?: string
    endDate?: string
    displayOrder?: number
    forcePageBreak?: boolean
}

export interface Education {
    id?: string
    documentId?: string
    degree: string
    major?: string
    fieldOfStudy?: string
    institutionName: string
    location?: string
    startYear?: number
    endYear?: number
    gpa?: string
    achievements?: string
    coursework?: string
    displayOrder?: number
    forcePageBreak?: boolean
}

export interface Certification {
    id?: string
    documentId?: string
    certificationName: string
    issuingOrganization: string
    issuer?: string // Alias for issuingOrganization
    issueYear?: number
    issueDate?: string // Alias or string representation
    credentialId?: string
    credentialUrl?: string
    displayOrder?: number
    forcePageBreak?: boolean
}

export interface Achievement {
    id?: string
    documentId?: string
    achievementTitle: string
    issuingBody?: string
    year?: number
    date?: string // Added for compatibility
    description?: string
    displayOrder?: number
    forcePageBreak?: boolean
}

export interface Publication {
    id?: string
    documentId?: string
    title: string
    platformOrPublisher?: string
    publicationYear?: number
    url?: string
    displayOrder?: number
}

export interface VolunteerExperience {
    id?: string
    documentId?: string
    roleTitle: string
    organizationName: string
    startDate?: string
    endDate?: string
    contributions?: string
    displayOrder?: number
    forcePageBreak?: boolean
}

export interface Language {
    id?: string
    documentId?: string
    languageName: string
    proficiencyLevel: LanguageProficiency
    displayOrder?: number
}

export interface ProfessionalAffiliation {
    id?: string
    documentId?: string
    organizationName: string
    roleOrMembership?: string
    yearsActive?: string
    displayOrder?: number
}

export interface Reference {
    id?: string
    documentId?: string
    referenceName?: string
    name?: string // Added for compatibility
    role?: string
    title?: string // Added for compatibility
    organization?: string
    company?: string // Added for compatibility
    contactDetails?: string
    contactInfo?: string // Added for compatibility
    availabilityStatement?: string
    displayOrder?: number
}

export interface AdditionalInfo {
    id?: string
    documentId?: string
    securityClearance?: string
    workAuthorization?: string
    willingToRelocate?: boolean
    availability?: string
    otherInfo?: string
}

export interface CoverLetterContent {
    recipientName?: string
    recipientTitle?: string
    companyName?: string
    companyAddress?: string
    jobTitle?: string
    jobDescription?: string
    tone?: 'formal' | 'confident' | 'persuasive' | 'professional'
    content?: string
}

export interface CustomSectionItem {
    id?: string
    customSectionId?: string
    text: string
    displayOrder?: number
}

export interface CustomSection {
    id?: string
    documentId?: string
    title: string
    icon?: string
    items?: CustomSectionItem[]
    content?: string
    displayOrder?: number
}

export interface ResumeDocument {
    id?: string
    userId?: string
    documentType: DocumentType
    title: string
    templateId: string
    careerLevel?: CareerLevel
    jobType?: JobType
    industryFocus?: string
    isPublished?: boolean
    createdAt?: string
    updatedAt?: string

    // Formatting Options
    formatting?: {
        fontSize?: 'small' | 'medium' | 'large'
        lineHeight?: 'tight' | 'normal' | 'relaxed'
        margin?: 'narrow' | 'normal' | 'wide'
        paperSize?: 'letter' | 'a4'
        themeColor?: string
    }
    sectionOrder?: string[]

    // Related data
    personalInfo?: PersonalInfo
    professionalSummary?: ProfessionalSummary
    skills?: Skill[]
    workExperience?: WorkExperience[]
    projects?: Project[]
    education?: Education[]
    certifications?: Certification[]
    achievements?: Achievement[]
    publications?: Publication[]
    volunteerExperience?: VolunteerExperience[]
    languages?: Language[]
    professionalAffiliations?: ProfessionalAffiliation[]
    references?: Reference[]
    additionalInfo?: AdditionalInfo
    coverLetter?: CoverLetterContent
    customSections?: CustomSection[]
}

// Template metadata
export interface TemplateMetadata {
    id: string
    name: string
    description: string
    suitableFor: {
        careerLevels: CareerLevel[]
        jobTypes: JobType[]
        industries?: string[]
    }
    previewImage?: string
    isPremium?: boolean
    // New fields for color picker
    colors?: {
        id: string // e.g., 'blue', 'green', 'dark'
        name: string
        hex: string // Primary hex code for the dot
    }[]
}

// Subscription types
export interface SubscriptionTier {
    id: string
    name: string
    displayName: string
    priceMonthly?: number
    priceYearly?: number
    maxDocuments?: number
    maxExportsPerMonth?: number
    aiImprovementsPerMonth?: number
    features: string[]
}

export interface UserSubscription {
    id: string
    userId: string
    tierId: string
    tier?: SubscriptionTier
    paddleSubscriptionId?: string
    paddleCustomerId?: string
    status: 'active' | 'canceled' | 'past_due'
    currentPeriodStart?: string
    currentPeriodEnd?: string
    createdAt: string
    updatedAt: string
}
