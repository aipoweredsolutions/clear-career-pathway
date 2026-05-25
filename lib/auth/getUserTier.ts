import { createAdminClient } from '@/lib/supabase/server'
import { getTierLimits, TierLimits } from '@/lib/config/tiers'

interface UserTierInfo extends TierLimits {
    bonusAICredits: number
    effectiveAICredits: number
    currentMonthAICount: number
    currentMonthExportCount: number
    totalDocumentCount: number
    isPro: boolean
    isLifetime: boolean
    usagePeriodKey: string
}

// In-memory cache for 60 seconds
const tierCache = new Map<string, { data: UserTierInfo; timestamp: number }>()
const CACHE_TTL = 60 * 1000 // 60 seconds

export async function getUserTier(userId: string): Promise<UserTierInfo> {
    const now = Date.now()
    const cached = tierCache.get(userId)

    if (cached && (now - cached.timestamp < CACHE_TTL)) {
        return cached.data
    }

    const supabase = createAdminClient()

    // 1. Fetch profile and subscription first to determine the billing cycle
    const [profileRes, subRes] = await Promise.all([
        supabase.from('profiles').select('subscription_tier, bonus_ai_credits').eq('id', userId).single(),
        supabase.from('user_subscriptions').select('*, tier:subscription_tiers(name)').eq('user_id', userId).maybeSingle()
    ])

    let tierName = 'free'
    if (subRes.data && (subRes.data.status === 'active' || subRes.data.status === 'trialing')) {
        tierName = (subRes.data.tier as any)?.name || 'free'
    } else {
        tierName = profileRes.data?.subscription_tier || 'free'
    }

    const limits = getTierLimits(tierName)
    const bonusCredits = profileRes.data?.bonus_ai_credits || 0

    // 2. Calculate the usage period key
    // If they have a subscription, the reset happens on their billing anniversary (current_period_start)
    // Otherwise, fallback to the calendar month (YYYY-MM)
    let usagePeriodKey = new Date().toISOString().substring(0, 7) // Fallback: '2024-05'
    
    if (subRes.data?.current_period_start) {
        // Use the start of the current billing cycle as the key
        // This ensures the counter resets exactly when Paddle starts a new period
        usagePeriodKey = new Date(subRes.data.current_period_start).toISOString().substring(0, 10) // '2024-05-16'
    }

    // 3. Fetch usage and document count using the dynamic key
    const [usageRes, docRes] = await Promise.all([
        supabase.from('user_usage').select('*').eq('user_id', userId).eq('month_year', usagePeriodKey).maybeSingle(),
        supabase.from('documents').select('id', { count: 'exact', head: true }).eq('user_id', userId)
    ])

    const usage = usageRes.data

    const info: UserTierInfo = {
        ...limits,
        bonusAICredits: bonusCredits,
        effectiveAICredits: limits.aiCreditsPerMonth + bonusCredits,
        currentMonthAICount: usage?.ai_count || 0,
        currentMonthExportCount: usage?.export_count || 0,
        totalDocumentCount: docRes.count || 0,
        isPro: limits.proFeatures,
        isLifetime: tierName === 'lifetime_pro',
        usagePeriodKey: usagePeriodKey
    }

    tierCache.set(userId, { data: info, timestamp: now })
    return info
}
