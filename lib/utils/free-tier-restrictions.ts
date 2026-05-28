/**
 * Free Tier Restrictions & Utilities
 * 
 * This module handles all free tier limitations and upgrade prompts
 */

import { UserSubscription } from '@/lib/types/resume'
import { templateRegistry } from '@/lib/templates/registry'

// Free tier template IDs (only these are available for free users)
export const FREE_TIER_TEMPLATES = [
    'ats-professional',
    'ats-modern',
    'ats-classic'
]

// Free tier limits
export const FREE_TIER_LIMITS = {
    MAX_DOCUMENTS: 1,
    MAX_EXPORTS_PER_MONTH: 1,
    AI_IMPROVEMENTS_PER_MONTH: 0, // No AI features for free
    ALLOWED_EXPORT_FORMATS: ['pdf'], // Only PDF, no DOCX
    WATERMARK_ENABLED: false, // Set to true to add watermark to free exports
    MAX_SECTIONS: 10, // Limit number of sections (optional)
}

/**
 * Check if user is on free tier
 */
export function isFreeTier(subscription: UserSubscription | null): boolean {
    if (!subscription || !subscription.tierId) return true
    return subscription.tierId.toLowerCase() === 'free' || subscription.tierId.toLowerCase() === 'free_starter'
}

/**
 * Check if user can create a new document
 */
export function canCreateDocument(
    subscription: UserSubscription | null,
    currentDocumentCount: number
): { allowed: boolean; reason?: string } {
    if (!isFreeTier(subscription)) {
        return { allowed: true }
    }

    if (currentDocumentCount >= FREE_TIER_LIMITS.MAX_DOCUMENTS) {
        return {
            allowed: false,
            reason: `Free tier is limited to ${FREE_TIER_LIMITS.MAX_DOCUMENTS} resume. Upgrade to Pro to create unlimited resumes.`
        }
    }

    return { allowed: true }
}

/**
 * Check if user can access a specific template
 */
export function canAccessTemplate(
    templateId: string,
    subscription: UserSubscription | null
): { allowed: boolean; reason?: string } {
    if (!isFreeTier(subscription)) {
        return { allowed: true }
    }

    // Check if template is in free tier list
    if (FREE_TIER_TEMPLATES.includes(templateId)) {
        return { allowed: true }
    }

    return {
        allowed: false,
        reason: 'This is a premium template. Upgrade to Pro to access all templates.'
    }
}

/**
 * Get list of templates available to user
 */
export function getAvailableTemplates(subscription: UserSubscription | null) {
    if (!isFreeTier(subscription)) {
        return templateRegistry // All templates
    }

    // Only free tier templates
    return templateRegistry.filter(t => FREE_TIER_TEMPLATES.includes(t.id))
}

/**
 * Check if user can export in a specific format
 */
export function canExportInFormat(
    format: 'pdf' | 'docx',
    subscription: UserSubscription | null,
    exportsThisMonth: number
): { allowed: boolean; reason?: string } {
    if (!isFreeTier(subscription)) {
        return { allowed: true }
    }

    // Check export limit
    if (exportsThisMonth >= FREE_TIER_LIMITS.MAX_EXPORTS_PER_MONTH) {
        return {
            allowed: false,
            reason: `Free tier is limited to ${FREE_TIER_LIMITS.MAX_EXPORTS_PER_MONTH} export per month. Upgrade to Pro for unlimited exports.`
        }
    }

    // Check format
    if (!FREE_TIER_LIMITS.ALLOWED_EXPORT_FORMATS.includes(format)) {
        return {
            allowed: false,
            reason: `${format.toUpperCase()} export is only available in Pro. Upgrade to export in multiple formats.`
        }
    }

    return { allowed: true }
}

/**
 * Check if user can use AI features
 */
export function canUseAIFeatures(
    subscription: UserSubscription | null,
    aiUsageThisMonth: number
): { allowed: boolean; reason?: string } {
    if (!isFreeTier(subscription)) {
        return { allowed: true }
    }

    if (FREE_TIER_LIMITS.AI_IMPROVEMENTS_PER_MONTH === 0) {
        return {
            allowed: false,
            reason: 'AI features are only available in Pro. Upgrade to get unlimited AI-powered improvements.'
        }
    }

    if (aiUsageThisMonth >= FREE_TIER_LIMITS.AI_IMPROVEMENTS_PER_MONTH) {
        return {
            allowed: false,
            reason: `You've used all ${FREE_TIER_LIMITS.AI_IMPROVEMENTS_PER_MONTH} AI improvements this month. Upgrade to Pro for unlimited AI features.`
        }
    }

    return { allowed: true }
}

/**
 * Get upgrade message for a specific feature
 */
export function getUpgradeMessage(feature: 'template' | 'export' | 'ai' | 'document' | 'format'): string {
    const messages = {
        template: 'Unlock all premium templates with Pro',
        export: 'Get unlimited exports with Pro',
        ai: 'Get unlimited AI improvements with Pro',
        document: 'Create unlimited resumes with Pro',
        format: 'Export in PDF and DOCX with Pro'
    }
    return messages[feature] || 'Upgrade to Pro for full access'
}

/**
 * Get feature comparison for upgrade prompts
 */
export function getFeatureComparison() {
    return {
        free: {
            name: 'Free Starter',
            price: '$0',
            features: [
                '1 resume',
                '3 basic templates',
                '1 PDF export per month',
                'Basic editor',
                'No AI features'
            ]
        },
        pro: {
            name: 'Pro Monthly',
            price: '$14.99/month',
            features: [
                'Unlimited resumes',
                'All 27+ templates',
                'Unlimited PDF & DOCX exports',
                'Unlimited AI improvements',
                'Cover letter generator',
                'ATS compliance scoring',
                'Priority support'
            ]
        }
    }
}

/**
 * Check if user should see upgrade prompt
 */
export function shouldShowUpgradePrompt(
    subscription: UserSubscription | null,
    context: 'template_selection' | 'export' | 'ai_feature' | 'document_limit'
): boolean {
    if (!isFreeTier(subscription)) {
        return false
    }

    // Show upgrade prompts for free users in specific contexts
    return true
}

/**
 * Get remaining usage for free tier
 */
export function getRemainingUsage(
    subscription: UserSubscription | null,
    currentUsage: {
        documents: number
        exportsThisMonth: number
        aiUsageThisMonth: number
    }
) {
    if (!isFreeTier(subscription)) {
        return {
            documents: 'unlimited',
            exports: 'unlimited',
            aiImprovements: 'unlimited'
        }
    }

    return {
        documents: Math.max(0, FREE_TIER_LIMITS.MAX_DOCUMENTS - currentUsage.documents),
        exports: Math.max(0, FREE_TIER_LIMITS.MAX_EXPORTS_PER_MONTH - currentUsage.exportsThisMonth),
        aiImprovements: Math.max(0, FREE_TIER_LIMITS.AI_IMPROVEMENTS_PER_MONTH - currentUsage.aiUsageThisMonth)
    }
}
