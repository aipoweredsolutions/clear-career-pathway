export type TierName = 'free' | 'starter' | 'pro_monthly' | 'power' | 'lifetime_pro' | 'single_export' | 'bundle'

export interface TierLimits {
    name: TierName
    displayName: string
    maxDocuments: number
    maxExportsPerMonth: number
    aiCreditsPerMonth: number
    proFeatures: boolean
    multiPage: boolean
}

export const TIER_CONFIG: Record<TierName, TierLimits> = {
    free: {
        name: 'free',
        displayName: 'Free Starter',
        maxDocuments: 1,
        maxExportsPerMonth: 1,
        aiCreditsPerMonth: 5,
        proFeatures: false,
        multiPage: false
    },
    starter: {
        name: 'starter',
        displayName: 'Starter',
        maxDocuments: 3,
        maxExportsPerMonth: 5,
        aiCreditsPerMonth: 20,
        proFeatures: false,
        multiPage: true
    },
    single_export: {
        name: 'single_export',
        displayName: 'Single Export',
        maxDocuments: 1,
        maxExportsPerMonth: 1,
        aiCreditsPerMonth: 5,
        proFeatures: true,
        multiPage: true
    },
    bundle: {
        name: 'bundle',
        displayName: 'Bundle',
        maxDocuments: 5,
        maxExportsPerMonth: 10,
        aiCreditsPerMonth: 50,
        proFeatures: true,
        multiPage: true
    },
    pro_monthly: {
        name: 'pro_monthly',
        displayName: 'Pro Monthly',
        maxDocuments: 50,
        maxExportsPerMonth: 100,
        aiCreditsPerMonth: 250,
        proFeatures: true,
        multiPage: true
    },
    power: {
        name: 'power',
        displayName: 'Power User',
        maxDocuments: 100,
        maxExportsPerMonth: 500,
        aiCreditsPerMonth: 1000,
        proFeatures: true,
        multiPage: true
    },
    lifetime_pro: {
        name: 'lifetime_pro',
        displayName: 'Lifetime Pro',
        maxDocuments: 1000,
        maxExportsPerMonth: 1000,
        aiCreditsPerMonth: 1000,
        proFeatures: true,
        multiPage: true
    }
}

export function getTierLimits(tierName: string | null | undefined): TierLimits {
    const name = (tierName?.toLowerCase() || 'free') as TierName
    return TIER_CONFIG[name] || TIER_CONFIG.free
}
