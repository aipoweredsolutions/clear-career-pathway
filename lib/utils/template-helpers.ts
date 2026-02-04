import { MOCK_PERSONAS } from '@/lib/constants/mock-data'
import { ResumeDocument } from '@/lib/types/resume'

// Helper for deep cloning
const deepClone = <T>(obj: T): T => {
    // Basic deep clone using JSON. This is safe for resume data which is JSON-serializable.
    return JSON.parse(JSON.stringify(obj))
}

export const getMockDataForTemplate = (templateId: string): ResumeDocument => {
    let mockData: ResumeDocument

    // Specialized Industry Personas
    if (templateId === 'ats-technical' || templateId === 'technical') {
        mockData = MOCK_PERSONAS.technical
    }
    else if (templateId === 'hospitality-elite' || templateId === 'service-pro') {
        mockData = MOCK_PERSONAS.hospitality
    }
    else if (templateId === 'cruise-excellence') {
        mockData = MOCK_PERSONAS.cruise
    }
    else if (templateId === 'academic') {
        mockData = MOCK_PERSONAS.academic
    }

    // New Category Personas
    else if (templateId === 'ats-classic' || templateId === 'classic') {
        mockData = MOCK_PERSONAS.legal
    }

    else if (templateId === 'chic' || templateId === 'artisan' || templateId === 'cute') {
        mockData = MOCK_PERSONAS.fashion
    }

    else if (
        templateId === 'ats-professional' ||
        templateId === 'ats-standard' ||
        templateId === 'professional' ||
        templateId === 'compact' ||
        templateId === 'minimal' ||
        templateId === 'ats-minimal'
    ) {
        mockData = MOCK_PERSONAS.corporate
    }

    // Role-specific Nursing Personas
    else if (templateId === 'ats-standard-nursing') {
        mockData = MOCK_PERSONAS.nurse_experienced
    }
    else if (templateId === 'creative-nursing') {
        mockData = MOCK_PERSONAS.nurse_entry
    }

    // Level-specific Personas
    else if (templateId === 'ats-graduate' || templateId === 'graduate') {
        mockData = MOCK_PERSONAS.graduate
    }
    else if (templateId === 'ats-executive' || templateId === 'executive' || templateId === 'luxe') {
        mockData = MOCK_PERSONAS.executive
    }
    else {
        // Default to the rich creative/professional persona
        mockData = MOCK_PERSONAS.creative
    }

    // Deep clone to prevent mutation of shared constants, then set the ID
    const cloned = deepClone(mockData)
    cloned.templateId = templateId
    return cloned
}
