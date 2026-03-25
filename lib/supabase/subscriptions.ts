import { SupabaseClient } from '@supabase/supabase-js'
import { UserSubscription } from '@/lib/types/resume'

/**
 * Fetches the user's current subscription from Supabase
 */
export async function fetchUserSubscription(supabase: SupabaseClient, userId: string): Promise<(UserSubscription & { downloadCredits?: number }) | null> {
    const { data: profile } = await supabase
        .from('profiles')
        .select('download_credits')
        .eq('id', userId)
        .single()

    const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*, tier:subscription_tiers(name)')
        .eq('user_id', userId)
        .maybeSingle()

    if (error || !data) {
        if (error) console.error('Error fetching subscription:', error)
        return profile ? { downloadCredits: profile.download_credits } as any : null
    }

    const tierName = (data.tier as any)?.name || 'free'

    // Map snake_case from DB to camelCase for the app
    return {
        id: data.id,
        userId: data.user_id,
        tierId: tierName, // Use the name as the tierId in the app
        paddleSubscriptionId: data.paddle_subscription_id,
        paddleCustomerId: data.paddle_customer_id,
        status: data.status,
        currentPeriodStart: data.current_period_start,
        currentPeriodEnd: data.current_period_end,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        downloadCredits: profile?.download_credits || 0
    }
}



/**
 * Checks if a user has access to a specific feature or template
 */
export function hasPremiumAccess(subscription: UserSubscription | null): boolean {
    if (!subscription) return false

    // Check if subscription is active
    if (subscription.status !== 'active') {
        // We might want to allow past_due for a grace period, but let's be strict for now
        return false
    }

    // Check if the tier is 'premium' or 'pro'
    return subscription.tierId === 'premium' || subscription.tierId === 'pro'
}

/**
 * Checks if a user can export a document based on their tier or credits
 */
export function canExportFormat(subscription: (UserSubscription & { downloadCredits?: number }) | null, format: 'pdf' | 'docx' | 'md' | 'html'): boolean {
    const tier = subscription?.tierId || 'free'
    const credits = subscription?.downloadCredits || 0

    // If they have credits, they can download PDF or DOCX
    if (credits > 0 && (format === 'pdf' || format === 'docx')) {
        return true
    }

    if (format === 'pdf') {
        return tier !== 'free'
    }

    if (format === 'docx') {
        return tier === 'starter' || tier === 'premium' || tier === 'pro' || tier === 'basic' || tier === 'power'
    }

    if (format === 'md' || format === 'html') {
        return tier === 'premium' || tier === 'pro' || tier === 'power'
    }

    return false
}


